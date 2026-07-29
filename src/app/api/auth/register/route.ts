import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { serverError, validationError } from "@/src/lib/api";
import { AUTH_COOKIE_NAME, assertAuthConfigured, authCookieOptions, createAuthToken } from "@/src/lib/auth";
import { createUser, findUserByEmail } from "@/src/repositories/user.repository";
import { registerSchema } from "@/src/validations/auth.validation";

export async function POST(request: Request) {
  try {
    assertAuthConfigured();
    const input = registerSchema.parse(await request.json());
    if (await findUserByEmail(input.email)) {
      return NextResponse.json(
        { success: false, message: "An account with this email already exists." },
        { status: 409 },
      );
    }
    const user = await createUser({
      ...input,
      password: await hash(input.password, 12),
      role: "customer",
    });
    const response = NextResponse.json(
      {
        success: true,
        user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
      },
      { status: 201 },
    );
    response.cookies.set(
      AUTH_COOKIE_NAME,
      createAuthToken({ userId: user._id.toString(), role: user.role }),
      authCookieOptions,
    );
    return response;
  } catch (error: unknown) {
    if (error instanceof ZodError) return validationError(error);
    return serverError("Registration failed:", error);
  }
}
