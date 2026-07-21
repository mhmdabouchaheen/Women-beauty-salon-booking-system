import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { serverError, validationError } from "@/src/lib/api";
import { getAuthUser } from "@/src/lib/auth";
import {
  createAppointment,
  getAllAppointments,
  getAppointmentsByUser,
} from "@/src/repositories/appointment.repository";
import { findServiceById } from "@/src/repositories/service.repository";
import { findStaffById } from "@/src/repositories/staff.repository";
import { bookingAppointmentSchema } from "@/src/validations/appointment.validation";

export async function GET() {
  try {
    const auth = await getAuthUser();
    if (!auth) return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    const appointments = auth.role === "admin"
      ? await getAllAppointments()
      : await getAppointmentsByUser(auth.userId);
    return NextResponse.json({ success: true, appointments });
  } catch (error: unknown) {
    return serverError("Loading appointments failed:", error);
  }
}

export async function POST(request: Request) {
  try {
    const auth = await getAuthUser();
    if (!auth) return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    const input = bookingAppointmentSchema.parse(await request.json());
    const requestedStart = new Date(input.appointmentDate);
    const [hours, minutes] = input.appointmentTime.split(":").map(Number);
    requestedStart.setHours(hours, minutes, 0, 0);
    if (requestedStart <= new Date()) {
      return NextResponse.json({ success: false, message: "Appointment time must be in the future." }, { status: 400 });
    }
    const [service, staff] = await Promise.all([
      findServiceById(input.serviceId),
      findStaffById(input.staffId),
    ]);
    if (!service || !staff) {
      return NextResponse.json({ success: false, message: "Selected service or staff member was not found." }, { status: 404 });
    }
    const appointment = await createAppointment({ ...input, userId: auth.userId, status: "booked" });
    return NextResponse.json({ success: true, appointment }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof ZodError) return validationError(error);
    if (error instanceof Error && error.message.includes("unavailable")) {
      return NextResponse.json({ success: false, message: error.message }, { status: 409 });
    }
    return serverError("Creating appointment failed:", error);
  }
}
