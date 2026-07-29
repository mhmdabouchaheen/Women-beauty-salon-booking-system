import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { requireAdmin } from "@/src/lib/admin";
import { serverError, validationError } from "@/src/lib/api";
import { deleteAppointmentsByUser } from "@/src/repositories/appointment.repository";
import { deleteUser, findUserById, updateUser } from "@/src/repositories/user.repository";
import { customerUpdateSchema } from "@/src/validations/admin.validation";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Context) {
  try {
    const authorization = await requireAdmin();
    if (authorization.response) return authorization.response;
    const { id } = await params;
    if (!isValidObjectId(id)) return NextResponse.json({ success: false, message: "Invalid customer ID." }, { status: 400 });
    const user = await updateUser(id, customerUpdateSchema.parse(await request.json()));
    return user
      ? NextResponse.json({ success: true, customer: { id: user.id, name: user.name, email: user.email, image: user.image } })
      : NextResponse.json({ success: false, message: "Customer not found." }, { status: 404 });
  } catch (error: unknown) {
    if (error instanceof ZodError) return validationError(error);
    return serverError("Updating customer failed:", error);
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  try {
    const authorization = await requireAdmin();
    if (authorization.response) return authorization.response;
    const { id } = await params;
    if (!isValidObjectId(id)) return NextResponse.json({ success: false, message: "Invalid customer ID." }, { status: 400 });
    const existing = await findUserById(id);
    if (!existing || existing.role !== "customer") {
      return NextResponse.json({ success: false, message: "Customer not found." }, { status: 404 });
    }
    await deleteUser(id);
    await deleteAppointmentsByUser(id);
    return NextResponse.json({ success: true, message: "Customer and their appointments were deleted." });
  } catch (error: unknown) {
    return serverError("Deleting customer failed:", error);
  }
}
