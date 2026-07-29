import { NextResponse } from "next/server";

import { serverError } from "@/src/lib/api";
import { getAuthUser } from "@/src/lib/auth";
import { getStripe } from "@/src/lib/stripe";
import { fulfillPaidCheckoutSession } from "@/src/services/stripe-booking.service";

export async function POST(request: Request) {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json(
        { success: false, message: "Authentication required." },
        { status: 401 },
      );
    }
    const body = (await request.json()) as { sessionId?: unknown };
    if (typeof body.sessionId !== "string" || !body.sessionId.startsWith("cs_")) {
      return NextResponse.json(
        { success: false, message: "Invalid Stripe Checkout session." },
        { status: 400 },
      );
    }

    const session = await getStripe().checkout.sessions.retrieve(body.sessionId);
    if (session.metadata?.userId !== auth.userId) {
      return NextResponse.json(
        { success: false, message: "Access denied." },
        { status: 403 },
      );
    }
    const result = await fulfillPaidCheckoutSession(session);
    return NextResponse.json({ success: true, ...result });
  } catch (error: unknown) {
    return serverError("Confirming Stripe payment failed:", error);
  }
}
