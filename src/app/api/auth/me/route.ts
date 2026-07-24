import { compare, hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { serverError, validationError } from "@/src/lib/api";
import { getAuthUser } from "@/src/lib/auth";
import { findUserById, updateUser } from "@/src/repositories/user.repository";
import { profileUpdateSchema } from "@/src/validations/admin.validation";

export async function GET() {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    }
    const user = await findUserById(auth.userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
    });
  } catch (error: unknown) {
    return serverError("Loading current user failed:", error);
  }
}

export async function PATCH(request: Request) {
  try {
    const auth = await getAuthUser();
    if (!auth) return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    const input = profileUpdateSchema.parse(await request.json());
    const user = await findUserById(auth.userId);
    if (!user) return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
    if (input.newPassword) {
      if (!input.currentPassword || !(await compare(input.currentPassword, user.password))) {
        return NextResponse.json({ success: false, message: "Current password is incorrect." }, { status: 400 });
      }
    }
    const updated = await updateUser(user.id, {
      name: input.name,
      email: input.email,
      image: input.image,
      ...(input.newPassword ? { password: await hash(input.newPassword, 12) } : {}),
    });
    return NextResponse.json({
      success: true,
      user: { id: updated?.id, name: updated?.name, email: updated?.email, image: updated?.image, role: updated?.role },
    });
  } catch (error: unknown) {
    if (error instanceof ZodError) return validationError(error);
    return serverError("Updating current user failed:", error);
  }
}
