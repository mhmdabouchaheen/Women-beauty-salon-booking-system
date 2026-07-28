import { NextResponse } from "next/server";
import { getAuthUser } from "@/src/lib/auth";
import { serverError } from "@/src/lib/api";
import { getStripe } from "@/src/lib/stripe";
import {
  cancelBookingReservation,
  findBookingReservationById,
} from "@/src/repositories/booking-reservation.repository";

export async function POST(request: Request) {
  try {
    const auth = await getAuthUser();
    if (!auth || auth.role !== "customer") {
      return NextResponse.json({ success: false, message: "Customer authentication required." }, { status: 401 });
    }
    const body = await request.json() as { reservationId?: string };
    if (!body.reservationId) {
      return NextResponse.json({ success: false, message: "Reservation is required." }, { status: 400 });
    }
    const reservation = await findBookingReservationById(body.reservationId);
    if (!reservation || reservation.userId.toString() !== auth.userId) {
      return NextResponse.json({ success: false, message: "Reservation was not found." }, { status: 404 });
    }
    if (reservation.status === "pending" && reservation.stripeSessionId) {
      try {
        await getStripe().checkout.sessions.expire(reservation.stripeSessionId);
      } catch {
        // A Checkout session that is already completed or expired cannot be expired again.
      }
    }
    await cancelBookingReservation(body.reservationId, auth.userId);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return serverError("Cancelling Stripe Checkout failed:", error);
  }
}
