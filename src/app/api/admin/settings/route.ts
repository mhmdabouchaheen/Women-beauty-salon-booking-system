import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { requireAdmin } from "@/src/lib/admin";
import { serverError, validationError } from "@/src/lib/api";
import { getSalonSettings, updateSalonSettings } from "@/src/repositories/settings.repository";
import { salonSettingsSchema } from "@/src/validations/admin.validation";

export async function GET() {
  try {
    const authorization = await requireAdmin();
    if (authorization.response) return authorization.response;
    const settings = await getSalonSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error: unknown) {
    return serverError("Loading salon settings failed:", error);
  }
}

export async function PUT(request: Request) {
  try {
    const authorization = await requireAdmin();
    if (authorization.response) return authorization.response;
    const input = salonSettingsSchema.parse(await request.json());
    const settings = await updateSalonSettings(input);
    return NextResponse.json({ success: true, settings });
  } catch (error: unknown) {
    if (error instanceof ZodError) return validationError(error);
    return serverError("Updating salon settings failed:", error);
  }
}
