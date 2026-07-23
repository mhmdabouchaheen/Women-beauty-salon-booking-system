import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { serverError, validationError } from "@/src/lib/api";
import { getAuthUser } from "@/src/lib/auth";
import { createSalonDateTime } from "@/src/lib/date-time";
import {
  createAppointment,
  getAllAppointments,
  getAppointmentsByUser,
} from "@/src/repositories/appointment.repository";
import { findServiceById } from "@/src/repositories/service.repository";
import { findStaffById, staffProvidesService } from "@/src/repositories/staff.repository";
import { findUserById } from "@/src/repositories/user.repository";
import { sendAppointmentConfirmationEmail } from "@/src/services/email.service";
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
    const requestedStart = createSalonDateTime(input.appointmentDate, input.appointmentTime);
    if (requestedStart <= new Date()) {
      return NextResponse.json({ success: false, message: "Appointment time must be in the future." }, { status: 400 });
    }
    const [user, service, staff] = await Promise.all([
      findUserById(auth.userId),
      findServiceById(input.serviceId),
      findStaffById(input.staffId),
    ]);
    if (!user) {
      return NextResponse.json({ success: false, message: "Authenticated user was not found." }, { status: 404 });
    }
    if (!service || !staff) {
      return NextResponse.json({ success: false, message: "Selected service or staff member was not found." }, { status: 404 });
    }
    if (!(await staffProvidesService(input.staffId, input.serviceId))) {
      return NextResponse.json(
        { success: false, message: "Selected staff member does not provide this service." },
        { status: 400 },
      );
    }
    const appointment = await createAppointment({ ...input, userId: auth.userId, status: "booked" });
    const emailResult = await sendAppointmentConfirmationEmail({
      customerName: user.name,
      customerEmail: user.email,
      serviceName: service.name,
      staffName: staff.name,
      startDateTime: appointment.startDateTime,
      endDateTime: appointment.endDateTime,
      status: appointment.status,
    });
    return NextResponse.json({
      success: true,
      message: emailResult.success
        ? "Appointment created successfully"
        : "Appointment created successfully, but confirmation email could not be sent",
      appointment,
      notification: { emailSent: emailResult.success },
    }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof ZodError) return validationError(error);
    if (error instanceof Error && error.message.includes("unavailable")) {
      return NextResponse.json({ success: false, message: error.message }, { status: 409 });
    }
    if (error instanceof Error && (error.message.includes("on holiday") || error.message.includes("working hours"))) {
      return NextResponse.json({ success: false, message: error.message }, { status: 409 });
    }
    return serverError("Creating appointment failed:", error);
  }
}
