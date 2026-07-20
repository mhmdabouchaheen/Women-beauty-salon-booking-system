import mongoose, { Schema, type Model } from "mongoose";

import type { IStaff } from "../types/staff";

const staffSchema = new Schema<IStaff>(
  {
    name: { type: String, required: true, trim: true },
    specialty: { type: String, required: true, trim: true },
  },
  { timestamps: true, collection: "staff" },
);

const Staff =
  (mongoose.models.Staff as Model<IStaff> | undefined) ??
  mongoose.model<IStaff>("Staff", staffSchema);

export default Staff;
