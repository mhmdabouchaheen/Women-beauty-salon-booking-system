import { NextResponse } from "next/server";
import { getAuthUser } from "@/src/lib/auth";
import { serverError } from "@/src/lib/api";
import { getStripe } from "@/src/lib/stripe";
import { fulfillPaidCheckoutSession } from "@/src/services/stripe-booking.service";

export async function POST(request: Request) {
  try {
    const auth = await getAuthUser();
    if (!auth || auth.role !== "customer") {
      return NextResponse.json({ success: false, message: "Customer authentication required." }, { status: 401 });
    }
    const body = await request.json() as { sessionId?: string };
    if (!body.sessionId?.startsWith("cs_")) {
      return NextResponse.json({ success: false, message: "A valid Checkout session is required." }, { status: 400 });
    }
    const session = await getStripe().checkout.sessions.retrieve(body.sessionId);
    if (session.metadata?.userId !== auth.userId) {
      return NextResponse.json({ success: false, message: "This payment does not belong to you." }, { status: 403 });
    }
    const result = await fulfillPaidCheckoutSession(session);
    return NextResponse.json({ success: true, ...result });
  } catch (error: unknown) {
    return serverError("Confirming Stripe payment failed:", error);
  }
}
