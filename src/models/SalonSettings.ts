import mongoose, { Schema, type Model } from "mongoose";

import type { ISalonSettings } from "../types/settings";

const salonSettingsSchema = new Schema<ISalonSettings>(
  {
    key: { type: String, enum: ["salon"], default: "salon", unique: true },
    address: { type: String, trim: true, default: "Beirut, Lebanon" },
    phone: { type: String, trim: true, default: "" },
    email: { type: String, trim: true, lowercase: true, default: "" },
    weekdays: { type: String, trim: true, default: "9:00 AM - 8:00 PM" },
    saturday: { type: String, trim: true, default: "10:00 AM - 6:00 PM" },
    sunday: { type: String, trim: true, default: "Closed" },
  },
  { timestamps: true, collection: "settings" },
);

const SalonSettings =
  (mongoose.models.SalonSettings as Model<ISalonSettings> | undefined)
  ?? mongoose.model<ISalonSettings>("SalonSettings", salonSettingsSchema);

export default SalonSettings;
