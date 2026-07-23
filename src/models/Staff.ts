import mongoose, { Schema, type Model } from "mongoose";

import type { IStaff } from "../types/staff";

const staffSchema = new Schema<IStaff>(
  {
    name: { type: String, required: true, trim: true },
    specialty: { type: String, required: true, trim: true },
    serviceIds: {
      type: [{ type: Schema.Types.ObjectId, ref: "Service", required: true }],
      default: [],
    },
    weeklySchedule: {
      type: [{
        dayOfWeek: { type: Number, required: true, min: 0, max: 6 },
        startTime: { type: String, required: true, match: /^([01]\d|2[0-3]):[0-5]\d$/ },
        endTime: { type: String, required: true, match: /^([01]\d|2[0-3]):[0-5]\d$/ },
        _id: false,
      }],
      default: [],
      validate: {
        validator: (schedule: IStaff["weeklySchedule"]) =>
          schedule.every(({ startTime, endTime }) => endTime > startTime)
          && new Set(schedule.map(({ dayOfWeek }) => dayOfWeek)).size === schedule.length,
        message: "Working hours must be valid and weekdays must be unique",
      },
    },
    holidays: {
      type: [{
        date: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
        reason: { type: String, trim: true, maxlength: 200 },
        _id: false,
      }],
      default: [],
      validate: {
        validator: (holidays: IStaff["holidays"]) =>
          new Set(holidays.map(({ date }) => date)).size === holidays.length,
        message: "Holiday dates must be unique",
      },
    },
  },
  { timestamps: true, collection: "staff" },
);

staffSchema.index({ serviceIds: 1 });

const Staff =
  (mongoose.models.Staff as Model<IStaff> | undefined) ??
  mongoose.model<IStaff>("Staff", staffSchema);

export default Staff;
