import { connectDB } from "../lib/db/mongoose";
import SalonSettings from "../models/SalonSettings";
import type { ISalonSettings } from "../types/settings";

export type SalonSettingsInput = Pick<
  ISalonSettings,
  "address" | "phone" | "email" | "weekdays" | "saturday" | "sunday"
>;

export async function getSalonSettings() {
  await connectDB();
  return SalonSettings.findOneAndUpdate(
    { key: "salon" },
    { $setOnInsert: { key: "salon" } },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
}

export async function updateSalonSettings(input: SalonSettingsInput) {
  await connectDB();
  return SalonSettings.findOneAndUpdate(
    { key: "salon" },
    input,
    { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
  );
}
