import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { requireAdmin } from "@/src/lib/admin";
import { serverError, validationError } from "@/src/lib/api";
import { connectDB } from "@/src/lib/db/mongoose";
import SalonSettings from "@/src/models/SalonSettings";
import { salonSettingsSchema } from "@/src/validations/admin.validation";

export async function GET() {
  try {
    const authorization = await requireAdmin();
    if (authorization.response) return authorization.response;
    await connectDB();
    const settings = await SalonSettings.findOneAndUpdate(
      { key: "salon" },
      { $setOnInsert: { key: "salon" } },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
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
    await connectDB();
    const settings = await SalonSettings.findOneAndUpdate({ key: "salon" }, input, { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true });
    return NextResponse.json({ success: true, settings });
  } catch (error: unknown) {
    if (error instanceof ZodError) return validationError(error);
    return serverError("Updating salon settings failed:", error);
  }
}
