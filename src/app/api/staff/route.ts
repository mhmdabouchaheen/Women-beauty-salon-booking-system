import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { serverError, validationError } from "@/src/lib/api";
import { getAuthUser } from "@/src/lib/auth";
import { createStaff, getAllStaff } from "@/src/repositories/staff.repository";
import { createStaffSchema } from "@/src/validations/staff.validation";

export async function GET() {
  try {
    return NextResponse.json({ success: true, staff: await getAllStaff() });
  } catch (error: unknown) {
    return serverError("Loading staff failed:", error);
  }
}

export async function POST(request: Request) {
  try {
    const auth = await getAuthUser();
    if (auth?.role !== "admin") return NextResponse.json({ success: false, message: "Admin access required." }, { status: 403 });
    const staff = await createStaff(createStaffSchema.parse(await request.json()));
    return NextResponse.json({ success: true, staff }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof ZodError) return validationError(error);
    return serverError("Creating staff member failed:", error);
  }
}
