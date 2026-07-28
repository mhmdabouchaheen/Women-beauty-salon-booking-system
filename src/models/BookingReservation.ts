import mongoose, { Schema, type Model, type Types } from "mongoose";

export type BookingReservationStatus =
  | "pending"
  | "processing"
  | "completed"
  | "cancelled"
  | "expired";

export interface IBookingReservation {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  serviceId: Types.ObjectId;
  staffId: Types.ObjectId;
  appointmentDate: Date;
  appointmentTime: string;
  startDateTime: Date;
  endDateTime: Date;
  amount: number;
  currency: string;
  status: BookingReservationStatus;
  expiresAt: Date;
  stripeSessionId?: string;
  appointmentId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const bookingReservationSchema = new Schema<IBookingReservation>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    staffId: { type: Schema.Types.ObjectId, ref: "Staff", required: true, index: true },
    appointmentDate: { type: Date, required: true },
    appointmentTime: { type: String, required: true },
    startDateTime: { type: Date, required: true, index: true },
    endDateTime: { type: Date, required: true, index: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, default: "usd" },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled", "expired"],
      default: "pending",
      index: true,
    },
    expiresAt: { type: Date, required: true, index: true },
    stripeSessionId: { type: String, unique: true, sparse: true },
    appointmentId: { type: Schema.Types.ObjectId, ref: "Appointment" },
  },
  { timestamps: true, collection: "booking_reservations" },
);

const BookingReservation =
  (mongoose.models.BookingReservation as Model<IBookingReservation> | undefined)
  ?? mongoose.model<IBookingReservation>("BookingReservation", bookingReservationSchema);

export default BookingReservation;
