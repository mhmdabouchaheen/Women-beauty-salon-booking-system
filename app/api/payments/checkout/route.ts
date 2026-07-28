import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getAuthUser } from "@/src/lib/auth";
import { serverError, validationError } from "@/src/lib/api";
import { createSalonDateTime } from "@/src/lib/date-time";
import { getAppointmentAvailability } from "@/src/lib/appointment-availability";
import { getStripe } from "@/src/lib/stripe";
import {
  attachStripeSession,
  cancelBookingReservation,
  createBookingReservation,
} from "@/src/repositories/booking-reservation.repository";
import { findServiceById } from "@/src/repositories/service.repository";
import { findUserById } from "@/src/repositories/user.repository";
import { bookingAppointmentSchema } from "@/src/validations/appointment.validation";

export async function POST(request: Request) {
  let reservationId = "";
  try {
    const auth = await getAuthUser();
    if (!auth || auth.role !== "customer") {
      return NextResponse.json({ success: false, message: "Customer authentication required." }, { status: 401 });
    }
    const input = bookingAppointmentSchema.parse(await request.json());
    const date = input.appointmentDate.toISOString().slice(0, 10);
    const [user, service, availability] = await Promise.all([
      findUserById(auth.userId),
      findServiceById(input.serviceId),
      getAppointmentAvailability({
        userId: auth.userId,
        serviceId: input.serviceId,
        staffId: input.staffId,
        date,
      }),
    ]);
    if (!user || !service) {
      return NextResponse.json({ success: false, message: "Customer or service was not found." }, { status: 404 });
    }
    if (!availability.timeSlots.some((slot) => slot.time === input.appointmentTime)) {
      return NextResponse.json(
        { success: false, message: "That appointment time is no longer available." },
        { status: 409 },
      );
    }

    const startDateTime = createSalonDateTime(date, input.appointmentTime);
    const endDateTime = new Date(startDateTime.getTime() + service.duration * 60_000);
    const expiresAt = new Date(Date.now() + 31 * 60_000);
    const reservation = await createBookingReservation({
      userId: auth.userId,
      serviceId: input.serviceId,
      staffId: input.staffId,
      appointmentDate: date,
      appointmentTime: input.appointmentTime,
      startDateTime,
      endDateTime,
      amount: service.price,
      expiresAt,
    });
    reservationId = reservation._id.toString();

    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      customer_email: user.email,
      line_items: [{
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(service.price * 100),
          product_data: {
            name: service.name,
            description: `${service.duration}-minute appointment`,
          },
        },
      }],
      metadata: { reservationId, userId: auth.userId },
      payment_intent_data: { metadata: { reservationId, userId: auth.userId } },
      success_url: `${origin}/dashboard/book/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/book/cancel?reservation_id=${reservationId}`,
      expires_at: Math.floor(expiresAt.getTime() / 1000),
    });
    if (!session.url) throw new Error("Stripe did not return a Checkout URL.");
    await attachStripeSession(reservationId, session.id);
    return NextResponse.json({ success: true, url: session.url });
  } catch (error: unknown) {
    if (reservationId) await cancelBookingReservation(reservationId);
    if (error instanceof ZodError) return validationError(error);
    if (error instanceof Error && error.message.includes("not configured")) {
      return NextResponse.json({ success: false, message: error.message }, { status: 503 });
    }
    return serverError("Starting Stripe Checkout failed:", error);
  }
}
