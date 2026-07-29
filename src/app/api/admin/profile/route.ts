import { compare, hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { requireAdmin } from "@/src/lib/admin";
import { serverError, validationError } from "@/src/lib/api";
import { findUserById, updateUser } from "@/src/repositories/user.repository";
import { profileUpdateSchema } from "@/src/validations/admin.validation";

export async function GET() {
  try {
    const authorization = await requireAdmin();
    if (authorization.response || !authorization.auth) return authorization.response;
    const user = await findUserById(authorization.auth.userId);
    return user
      ? NextResponse.json({
          success: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
            lastLoginAt: user.lastLoginAt?.toISOString() ?? null,
          },
        })
      : NextResponse.json({ success: false, message: "Admin user not found." }, { status: 404 });
  } catch (error: unknown) {
    return serverError("Loading admin profile failed:", error);
  }
}

export async function PATCH(request: Request) {
  try {
    const authorization = await requireAdmin();
    if (authorization.response || !authorization.auth) return authorization.response;
    const input = profileUpdateSchema.parse(await request.json());
    const user = await findUserById(authorization.auth.userId);
    if (!user) return NextResponse.json({ success: false, message: "Admin user not found." }, { status: 404 });
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
    return NextResponse.json({ success: true, user: { id: updated?.id, name: updated?.name, email: updated?.email, image: updated?.image, role: updated?.role } });
  } catch (error: unknown) {
    if (error instanceof ZodError) return validationError(error);
    return serverError("Updating admin profile failed:", error);
  }
}
