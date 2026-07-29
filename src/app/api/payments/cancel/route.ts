import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

import { serverError } from "@/src/lib/api";
import { getAuthUser } from "@/src/lib/auth";
import { cancelBookingReservation } from "@/src/repositories/booking-reservation.repository";

export async function POST(request: Request) {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json(
        { success: false, message: "Authentication required." },
        { status: 401 },
      );
    }
    const body = (await request.json()) as { reservationId?: unknown };
    if (
      typeof body.reservationId !== "string" ||
      !isValidObjectId(body.reservationId)
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid booking reservation." },
        { status: 400 },
      );
    }
    const reservation = await cancelBookingReservation(
      body.reservationId,
      auth.userId,
    );
    return NextResponse.json({
      success: true,
      cancelled: Boolean(reservation),
    });
  } catch (error: unknown) {
    return serverError("Cancelling Stripe reservation failed:", error);
  }
}
