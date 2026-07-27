import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import { ZodError } from "zod";

import { serverError, validationError } from "@/src/lib/api";
import { getAuthUser } from "@/src/lib/auth";
import {
  findAppointmentById,
  findAppointmentOwnerById,
  deleteAppointment,
  updateAppointmentStatus,
} from "@/src/repositories/appointment.repository";
import { appointmentStatusSchema } from "@/src/validations/appointment.validation";

type Context = { params: Promise<{ id: string }> };

async function authorizeAppointment(id: string) {
  const auth = await getAuthUser();
  if (!auth) return { error: NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 }) };
  const owner = await findAppointmentOwnerById(id);
  if (!owner) return { error: NextResponse.json({ success: false, message: "Appointment not found." }, { status: 404 }) };
  if (auth.role !== "admin" && owner.userId.toString() !== auth.userId) {
    return { error: NextResponse.json({ success: false, message: "Access denied." }, { status: 403 }) };
  }
  return { auth, owner };
}

export async function DELETE(_request: Request, context: Context) {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json(
        { success: false, message: "Authentication required." },
        { status: 401 },
      );
    }
    if (auth.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Admin access required." },
        { status: 403 },
      );
    }
    const { id } = await context.params;
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid appointment ID." },
        { status: 400 },
      );
    }
    const appointment = await deleteAppointment(id);
    return appointment
      ? NextResponse.json({ success: true, message: "Appointment deleted." })
      : NextResponse.json(
          { success: false, message: "Appointment not found." },
          { status: 404 },
        );
  } catch (error: unknown) {
    return serverError("Deleting appointment failed:", error);
  }
}

export async function GET(_request: Request, context: Context) {
  try {
    const { id } = await context.params;
    if (!isValidObjectId(id)) return NextResponse.json({ success: false, message: "Invalid appointment ID." }, { status: 400 });
    const authorization = await authorizeAppointment(id);
    if (authorization.error) return authorization.error;
    return NextResponse.json({ success: true, appointment: await findAppointmentById(id) });
  } catch (error: unknown) {
    return serverError("Loading appointment failed:", error);
  }
}

export async function PATCH(request: Request, context: Context) {
  try {
    const { id } = await context.params;
    if (!isValidObjectId(id)) return NextResponse.json({ success: false, message: "Invalid appointment ID." }, { status: 400 });
    const authorization = await authorizeAppointment(id);
    if (authorization.error) return authorization.error;
    const body: unknown = await request.json();
    const status = appointmentStatusSchema.parse(
      typeof body === "object" && body !== null && "status" in body ? body.status : undefined,
    );
    if (authorization.auth.role !== "admin" && status !== "cancelled") {
      return NextResponse.json({ success: false, message: "Customers may only cancel appointments." }, { status: 403 });
    }
    const appointment = await updateAppointmentStatus(id, status);
    return NextResponse.json({ success: true, appointment });
  } catch (error: unknown) {
    if (error instanceof ZodError) return validationError(error);
    return serverError("Updating appointment failed:", error);
  }
}
