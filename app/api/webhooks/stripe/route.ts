import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, getStripeWebhookSecret } from "@/src/lib/stripe";
import { expireBookingReservationBySession } from "@/src/repositories/booking-reservation.repository";
import { fulfillPaidCheckoutSession } from "@/src/services/stripe-booking.service";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ message: "Missing Stripe signature." }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      await request.text(),
      signature,
      getStripeWebhookSecret(),
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Invalid Stripe webhook." },
      { status: 400 },
    );
  }

  try {
    if (event.type === "checkout.session.completed") {
      await fulfillPaidCheckoutSession(event.data.object);
    } else if (event.type === "checkout.session.expired") {
      await expireBookingReservationBySession(event.data.object.id);
    }
    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    console.error("Stripe webhook processing failed:", error);
    return NextResponse.json({ message: "Webhook processing failed." }, { status: 500 });
  }
}
