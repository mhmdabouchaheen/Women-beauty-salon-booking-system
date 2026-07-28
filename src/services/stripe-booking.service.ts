import type Stripe from "stripe";
import BookingReservation from "@/src/models/BookingReservation";
import { connectDB } from "@/src/lib/db/mongoose";
import { createAppointment } from "@/src/repositories/appointment.repository";
import { findServiceById } from "@/src/repositories/service.repository";
import { findStaffById } from "@/src/repositories/staff.repository";
import { findUserById } from "@/src/repositories/user.repository";
import { sendAppointmentConfirmationEmail } from "@/src/services/email.service";

export async function fulfillPaidCheckoutSession(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") throw new Error("Stripe Checkout session is not paid.");
  const reservationId = session.metadata?.reservationId;
  if (!reservationId) throw new Error("Stripe Checkout session has no booking reservation.");

  await connectDB();
  const existing = await BookingReservation.findById(reservationId);
  if (!existing || existing.stripeSessionId !== session.id) {
    throw new Error("Booking reservation was not found.");
  }
  if (existing.status === "completed") {
    return { appointmentId: existing.appointmentId?.toString(), alreadyProcessed: true };
  }

  const reservation = await BookingReservation.findOneAndUpdate(
    { _id: reservationId, status: "pending" },
    { status: "processing" },
    { new: true },
  );
  if (!reservation) throw new Error("Booking reservation is already being processed or is no longer active.");

  try {
    const appointment = await createAppointment({
      userId: reservation.userId.toString(),
      serviceId: reservation.serviceId.toString(),
      staffId: reservation.staffId.toString(),
      appointmentDate: reservation.appointmentDate,
      appointmentTime: reservation.appointmentTime,
      status: "booked",
      reservationIdToIgnore: reservation._id.toString(),
    });
    reservation.status = "completed";
    reservation.appointmentId = appointment._id;
    await reservation.save();

    const [user, service, staff] = await Promise.all([
      findUserById(reservation.userId.toString()),
      findServiceById(reservation.serviceId.toString()),
      findStaffById(reservation.staffId.toString()),
    ]);
    if (user && service && staff) {
      await sendAppointmentConfirmationEmail({
        customerName: user.name,
        customerEmail: user.email,
        serviceName: service.name,
        staffName: staff.name,
        startDateTime: appointment.startDateTime,
        endDateTime: appointment.endDateTime,
        status: appointment.status,
      });
    }
    return { appointmentId: appointment._id.toString(), alreadyProcessed: false };
  } catch (error) {
    await BookingReservation.findByIdAndUpdate(reservationId, { status: "pending" });
    throw error;
  }
}
