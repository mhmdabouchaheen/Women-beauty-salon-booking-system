import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import { ZodError } from "zod";

import { serverError, validationError } from "@/src/lib/api";
import { getAuthUser } from "@/src/lib/auth";
import { deleteStaff, findStaffById, updateStaff } from "@/src/repositories/staff.repository";
import { updateStaffSchema } from "@/src/validations/staff.validation";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Context) {
  try {
    const { id } = await params;
    if (!isValidObjectId(id)) return NextResponse.json({ success: false, message: "Invalid staff ID." }, { status: 400 });
    const staff = await findStaffById(id);
    return staff
      ? NextResponse.json({ success: true, staff })
      : NextResponse.json({ success: false, message: "Staff member not found." }, { status: 404 });
  } catch (error: unknown) {
    return serverError("Loading staff member failed:", error);
  }
}

export async function PATCH(request: Request, context: Context) {
  try {
    const auth = await getAuthUser();
    if (auth?.role !== "admin") return NextResponse.json({ success: false, message: "Admin access required." }, { status: 403 });
    const { id } = await context.params;
    if (!isValidObjectId(id)) return NextResponse.json({ success: false, message: "Invalid staff ID." }, { status: 400 });
    const staff = await updateStaff(id, updateStaffSchema.parse(await request.json()));
    return staff
      ? NextResponse.json({ success: true, staff })
      : NextResponse.json({ success: false, message: "Staff member not found." }, { status: 404 });
  } catch (error: unknown) {
    if (error instanceof ZodError) return validationError(error);
    if (error instanceof Error && error.message.includes("selected services")) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
    return serverError("Updating staff member failed:", error);
  }
}

export async function DELETE(_request: Request, context: Context) {
  try {
    const auth = await getAuthUser();
    if (auth?.role !== "admin") return NextResponse.json({ success: false, message: "Admin access required." }, { status: 403 });
    const { id } = await context.params;
    if (!isValidObjectId(id)) return NextResponse.json({ success: false, message: "Invalid staff ID." }, { status: 400 });
    const staff = await deleteStaff(id);
    return staff
      ? NextResponse.json({ success: true, message: "Staff member deleted." })
      : NextResponse.json({ success: false, message: "Staff member not found." }, { status: 404 });
  } catch (error: unknown) {
    return serverError("Deleting staff member failed:", error);
  }
}
