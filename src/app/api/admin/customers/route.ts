import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { requireAdmin } from "@/src/lib/admin";
import { serverError, validationError } from "@/src/lib/api";
import { createUser, findUserByEmail, getCustomers } from "@/src/repositories/user.repository";
import { registerSchema } from "@/src/validations/auth.validation";

export async function GET() {
  try {
    const authorization = await requireAdmin();
    if (authorization.response) return authorization.response;
    return NextResponse.json({ success: true, customers: await getCustomers() });
  } catch (error: unknown) {
    return serverError("Loading customers failed:", error);
  }
}

export async function POST(request: Request) {
  try {
    const authorization = await requireAdmin();
    if (authorization.response) return authorization.response;
    const input = registerSchema.parse(await request.json());
    if (await findUserByEmail(input.email)) {
      return NextResponse.json({ success: false, message: "An account with this email already exists." }, { status: 409 });
    }
    const user = await createUser({ ...input, password: await hash(input.password, 12), role: "customer" });
    return NextResponse.json({ success: true, customer: { id: user.id, name: user.name, email: user.email, image: user.image } }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof ZodError) return validationError(error);
    return serverError("Creating customer failed:", error);
  }
}
