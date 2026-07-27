import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { serverError, validationError } from "@/src/lib/api";
import { AUTH_COOKIE_NAME, assertAuthConfigured, authCookieOptions, createAuthToken } from "@/src/lib/auth";
import { findUserByEmail, recordUserLogin } from "@/src/repositories/user.repository";
import { loginSchema } from "@/src/validations/auth.validation";

export async function POST(request: Request) {
  try {
    assertAuthConfigured();
    const input = loginSchema.parse(await request.json());
    const user = await findUserByEmail(input.email);
    if (!user || !(await compare(input.password, user.password))) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 },
      );
    }
    await recordUserLogin(user._id.toString());
    const response = NextResponse.json({
      success: true,
      user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
    });
    response.cookies.set(
      AUTH_COOKIE_NAME,
      createAuthToken({ userId: user._id.toString(), role: user.role }),
      authCookieOptions,
    );
    return response;
  } catch (error: unknown) {
    if (error instanceof ZodError) return validationError(error);
    return serverError("Login failed:", error);
  }
}
