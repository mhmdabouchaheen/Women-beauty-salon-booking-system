import { connectDB } from "@/src/lib/db/mongoose";
import BookingReservation from "@/src/models/BookingReservation";

export async function createBookingReservation(input: {
  userId: string;
  serviceId: string;
  staffId: string;
  appointmentDate: Date | string;
  appointmentTime: string;
  startDateTime: Date;
  endDateTime: Date;
  amount: number;
  expiresAt: Date;
}) {
  await connectDB();
  return BookingReservation.create({ ...input, currency: "usd", status: "pending" });
}

export async function attachStripeSession(reservationId: string, stripeSessionId: string) {
  await connectDB();
  return BookingReservation.findByIdAndUpdate(
    reservationId,
    { stripeSessionId },
    { new: true, runValidators: true },
  );
}

export async function findBookingReservationById(reservationId: string) {
  await connectDB();
  return BookingReservation.findById(reservationId);
}

export async function cancelBookingReservation(reservationId: string, userId?: string) {
  await connectDB();
  return BookingReservation.findOneAndUpdate(
    {
      _id: reservationId,
      status: "pending",
      ...(userId ? { userId } : {}),
    },
    { status: "cancelled" },
    { new: true },
  );
}

export async function expireBookingReservationBySession(stripeSessionId: string) {
  await connectDB();
  return BookingReservation.findOneAndUpdate(
    { stripeSessionId, status: "pending" },
    { status: "expired" },
    { new: true },
  );
}
