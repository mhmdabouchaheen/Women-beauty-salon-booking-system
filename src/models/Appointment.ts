import mongoose, { Schema, type Model } from "mongoose";

import type { IAppointment } from "../types/appointment";

const appointmentSchema = new Schema<IAppointment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true, index: true },
    staffId: { type: Schema.Types.ObjectId, ref: "Staff", required: true, index: true },
    appointmentDate: { type: Date, required: true, index: true },
    appointmentTime: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):[0-5]\d$/,
    },
    startDateTime: { type: Date, required: true, index: true },
    endDateTime: { type: Date, required: true, index: true },
    status: {
      type: String,
      enum: ["booked", "cancelled"],
      default: "booked",
      index: true,
    },
  },
  { timestamps: true, collection: "appointments" },
);

appointmentSchema.pre("validate", function validateRange() {
  if (this.endDateTime <= this.startDateTime) {
    this.invalidate("endDateTime", "endDateTime must be later than startDateTime");
  }
});

const Appointment =
  (mongoose.models.Appointment as Model<IAppointment> | undefined) ??
  mongoose.model<IAppointment>("Appointment", appointmentSchema);

export default Appointment;
