import type Stripe from "stripe";
import { NextResponse } from "next/server";

import { getStripe, getStripeWebhookSecret } from "@/src/lib/stripe";
import { expireBookingReservationBySession } from "@/src/repositories/booking-reservation.repository";
import { fulfillPaidCheckoutSession } from "@/src/services/stripe-booking.service";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { success: false, message: "Missing Stripe signature." },
      { status: 400 },
    );
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      await request.text(),
      signature,
      getStripeWebhookSecret(),
    );
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);
    return NextResponse.json(
      { success: false, message: "Invalid Stripe signature." },
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
  } catch (error) {
    console.error("Processing Stripe webhook failed:", error);
    return NextResponse.json(
      { success: false, message: "Webhook processing failed." },
      { status: 500 },
    );
  }
}
