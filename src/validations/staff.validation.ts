import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Must be a valid MongoDB ObjectId");
const timeSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Time must use HH:mm format");
const workingHoursSchema = z.object({
  dayOfWeek: z.number().int().min(0).max(6),
  startTime: timeSchema,
  endTime: timeSchema,
}).refine((hours) => hours.endTime > hours.startTime, {
  message: "End time must be later than start time",
  path: ["endTime"],
});
const weeklyScheduleSchema = z.array(workingHoursSchema).max(7).refine(
  (schedule) => new Set(schedule.map(({ dayOfWeek }) => dayOfWeek)).size === schedule.length,
  "Only one working period is allowed per weekday",
);
const holidaySchema = z.object({
  date: z.string().date("Holiday date must use YYYY-MM-DD format"),
  reason: z.string().trim().min(1).max(200).optional(),
});
const holidaysSchema = z.array(holidaySchema).refine(
  (holidays) => new Set(holidays.map(({ date }) => date)).size === holidays.length,
  "Holiday dates must be unique",
);

export const staffValidationSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  specialty: z.string().trim().min(1, "Specialty is required"),
  serviceIds: z.array(objectIdSchema).refine(
    (ids) => new Set(ids).size === ids.length,
    "Service IDs must be unique",
  ),
  weeklySchedule: weeklyScheduleSchema,
  holidays: holidaysSchema,
});

export const createStaffSchema = staffValidationSchema.extend({
  serviceIds: staffValidationSchema.shape.serviceIds.default([]),
  weeklySchedule: weeklyScheduleSchema.default([]),
  holidays: holidaysSchema.default([]),
});
export const updateStaffSchema = staffValidationSchema.partial();
