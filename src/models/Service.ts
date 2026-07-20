import mongoose, { Schema, type Model } from "mongoose";

import type { IService } from "../types/service";

const serviceSchema = new Schema<IService>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, min: 1, validate: Number.isInteger },
    price: { type: Number, required: true, min: 0 },
  },
  { timestamps: true, collection: "services" },
);

const Service =
  (mongoose.models.Service as Model<IService> | undefined) ??
  mongoose.model<IService>("Service", serviceSchema);

export default Service;
