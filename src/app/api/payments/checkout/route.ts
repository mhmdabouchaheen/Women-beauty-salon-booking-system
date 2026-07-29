import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { serverError, validationError } from "@/src/lib/api";
import { getAuthUser } from "@/src/lib/auth";
import { createSalonDateTime } from "@/src/lib/date-time";
import { getStripe } from "@/src/lib/stripe";
import BookingReservation from "@/src/models/BookingReservation";
import {
  findConflictingAppointment,
  findCustomerConflictingAppointment,
} from "@/src/repositories/appointment.repository";
import {
  attachStripeSession,
  createBookingReservation,
} from "@/src/repositories/booking-reservation.repository";
import { findServiceById } from "@/src/repositories/service.repository";
import {
  findStaffById,
  getStaffAvailability,
  staffProvidesService,
} from "@/src/repositories/staff.repository";
import { bookingAppointmentSchema } from "@/src/validations/appointment.validation";

function siteUrl(request: Request) {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return configured || new URL(request.url).origin;
}

export async function POST(request: Request) {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json(
        { success: false, message: "Authentication required." },
        { status: 401 },
      );
    }
    if (auth.role !== "customer") {
      return NextResponse.json(
        { success: false, message: "Customer account required." },
        { status: 403 },
      );
    }

    const input = bookingAppointmentSchema.parse(await request.json());
    const [service, staff] = await Promise.all([
      findServiceById(input.serviceId),
      findStaffById(input.staffId),
    ]);
    if (!service || !staff) {
      return NextResponse.json(
        { success: false, message: "Selected service or staff member was not found." },
        { status: 404 },
      );
    }
    if (!(await staffProvidesService(input.staffId, input.serviceId))) {
      return NextResponse.json(
        { success: false, message: "Selected staff member does not provide this service." },
        { status: 400 },
      );
    }

    const startDateTime = createSalonDateTime(
      input.appointmentDate,
      input.appointmentTime,
    );
    if (startDateTime <= new Date()) {
      return NextResponse.json(
        { success: false, message: "Appointment time must be in the future." },
        { status: 400 },
      );
    }
    const endDateTime = new Date(
      startDateTime.getTime() + service.duration * 60_000,
    );
    const availability = await getStaffAvailability(
      input.staffId,
      startDateTime,
      endDateTime,
    );
    if (!availability.available) {
      return NextResponse.json(
        {
          success: false,
          message:
            availability.reason === "holiday"
              ? "The selected staff member is on holiday on this date."
              : "The appointment is outside the selected staff member's working hours.",
        },
        { status: 409 },
      );
    }

    const [staffConflict, customerConflict, reservationConflict] =
      await Promise.all([
        findConflictingAppointment(
          input.staffId,
          startDateTime,
          endDateTime,
        ),
        findCustomerConflictingAppointment(
          auth.userId,
          startDateTime,
          endDateTime,
        ),
        BookingReservation.findOne({
          status: { $in: ["pending", "processing"] },
          expiresAt: { $gt: new Date() },
          startDateTime: { $lt: endDateTime },
          endDateTime: { $gt: startDateTime },
          $or: [{ staffId: input.staffId }, { userId: auth.userId }],
        }),
      ]);
    if (staffConflict || customerConflict || reservationConflict) {
      return NextResponse.json(
        { success: false, message: "This appointment time is no longer available." },
        { status: 409 },
      );
    }

    // Stripe requires Checkout expiration to be at least 30 minutes away.
    const expiresAt = new Date(Date.now() + 31 * 60_000);
    const reservation = await createBookingReservation({
      userId: auth.userId,
      serviceId: input.serviceId,
      staffId: input.staffId,
      appointmentDate: input.appointmentDate,
      appointmentTime: input.appointmentTime,
      startDateTime,
      endDateTime,
      amount: service.price,
      expiresAt,
    });

    try {
      const baseUrl = siteUrl(request);
      const session = await getStripe().checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "usd",
              unit_amount: Math.round(service.price * 100),
              product_data: {
                name: service.name,
                description: `${service.duration}-minute appointment with ${staff.name}`,
              },
            },
          },
        ],
        metadata: {
          reservationId: reservation._id.toString(),
          userId: auth.userId,
        },
        success_url: `${baseUrl}/dashboard/book/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/dashboard/book/cancel?reservation_id=${reservation._id.toString()}`,
        expires_at: Math.floor(expiresAt.getTime() / 1000),
      });
      await attachStripeSession(reservation._id.toString(), session.id);
      if (!session.url) throw new Error("Stripe did not return a checkout URL.");
      return NextResponse.json({ success: true, url: session.url });
    } catch (error) {
      reservation.status = "cancelled";
      await reservation.save();
      throw error;
    }
  } catch (error: unknown) {
    if (error instanceof ZodError) return validationError(error);
    return serverError("Creating Stripe Checkout session failed:", error);
  }
}
