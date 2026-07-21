import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { serverError, validationError } from "@/src/lib/api";
import { getAuthUser } from "@/src/lib/auth";
import { createService, getAllServices } from "@/src/repositories/service.repository";
import { createServiceSchema } from "@/src/validations/service.validation";

export async function GET() {
  try {
    return NextResponse.json({ success: true, services: await getAllServices() });
  } catch (error: unknown) {
    return serverError("Loading services failed:", error);
  }
}

export async function POST(request: Request) {
  try {
    const auth = await getAuthUser();
    if (auth?.role !== "admin") {
      return NextResponse.json({ success: false, message: "Admin access required." }, { status: 403 });
    }
    const service = await createService(createServiceSchema.parse(await request.json()));
    return NextResponse.json({ success: true, service }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof ZodError) return validationError(error);
    return serverError("Creating service failed:", error);
  }
}
