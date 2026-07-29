import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

import { getAppointmentAvailability } from "@/src/lib/appointment-availability";
import { serverError } from "@/src/lib/api";
import { getAuthUser } from "@/src/lib/auth";

export async function GET(request: Request) {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    }
    const params = new URL(request.url).searchParams;
    const staffId = params.get("staffId") ?? "";
    const serviceId = params.get("serviceId") ?? "";
    const requestedUserId = params.get("userId") ?? "";
    const userId = auth.role === "admin" ? requestedUserId : auth.userId;
    const date = params.get("date") || undefined;
    if (![staffId, serviceId, userId].every(isValidObjectId)) {
      return NextResponse.json(
        { success: false, message: "Valid staff, service, and customer IDs are required." },
        { status: 400 },
      );
    }
    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ success: false, message: "Date must use YYYY-MM-DD." }, { status: 400 });
    }
    return NextResponse.json({
      success: true,
      ...(await getAppointmentAvailability({ staffId, serviceId, userId, date })),
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message.startsWith("Selected")) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
    return serverError("Loading appointment availability failed:", error);
  }
}
