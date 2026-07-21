import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import { ZodError } from "zod";

import { serverError, validationError } from "@/src/lib/api";
import { getAuthUser } from "@/src/lib/auth";
import { deleteService, findServiceById, updateService } from "@/src/repositories/service.repository";
import { updateServiceSchema } from "@/src/validations/service.validation";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Context) {
  try {
    const { id } = await params;
    if (!isValidObjectId(id)) return NextResponse.json({ success: false, message: "Invalid service ID." }, { status: 400 });
    const service = await findServiceById(id);
    return service
      ? NextResponse.json({ success: true, service })
      : NextResponse.json({ success: false, message: "Service not found." }, { status: 404 });
  } catch (error: unknown) {
    return serverError("Loading service failed:", error);
  }
}

export async function PATCH(request: Request, context: Context) {
  try {
    const auth = await getAuthUser();
    if (auth?.role !== "admin") return NextResponse.json({ success: false, message: "Admin access required." }, { status: 403 });
    const { id } = await context.params;
    if (!isValidObjectId(id)) return NextResponse.json({ success: false, message: "Invalid service ID." }, { status: 400 });
    const service = await updateService(id, updateServiceSchema.parse(await request.json()));
    return service
      ? NextResponse.json({ success: true, service })
      : NextResponse.json({ success: false, message: "Service not found." }, { status: 404 });
  } catch (error: unknown) {
    if (error instanceof ZodError) return validationError(error);
    return serverError("Updating service failed:", error);
  }
}

export async function DELETE(_request: Request, context: Context) {
  try {
    const auth = await getAuthUser();
    if (auth?.role !== "admin") return NextResponse.json({ success: false, message: "Admin access required." }, { status: 403 });
    const { id } = await context.params;
    if (!isValidObjectId(id)) return NextResponse.json({ success: false, message: "Invalid service ID." }, { status: 400 });
    const service = await deleteService(id);
    return service
      ? NextResponse.json({ success: true, message: "Service deleted." })
      : NextResponse.json({ success: false, message: "Service not found." }, { status: 404 });
  } catch (error: unknown) {
    return serverError("Deleting service failed:", error);
  }
}
