import { connectDB } from "../lib/db/mongoose";
import Service from "../models/Service";
import Staff from "../models/Staff";
import type { CreateStaffInput, UpdateStaffInput } from "../types/staff";
import { SALON_TIME_ZONE } from "../config/salon";

export async function createStaff(data: CreateStaffInput) {
  await connectDB();
  if (data.serviceIds?.length) await validateServiceIds(data.serviceIds);
  const staff = await Staff.create(data);
  return Staff.findById(staff._id).populate("serviceIds").orFail();
}

export async function getAllStaff() {
  await connectDB();
  return Staff.find().populate("serviceIds").sort({ name: 1 });
}

export async function findStaffById(id: string) {
  await connectDB();
  return Staff.findById(id).populate("serviceIds");
}

export async function updateStaff(id: string, data: UpdateStaffInput) {
  await connectDB();
  if (data.serviceIds) await validateServiceIds(data.serviceIds);
  return Staff.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate("serviceIds");
}

export async function deleteStaff(id: string) {
  await connectDB();
  return Staff.findByIdAndDelete(id);
}

async function validateServiceIds(serviceIds: string[]) {
  const matchingServices = await Service.countDocuments({ _id: { $in: serviceIds } });
  if (matchingServices !== serviceIds.length) {
    throw new Error("One or more selected services were not found");
  }
}

export async function staffProvidesService(staffId: string, serviceId: string) {
  await connectDB();
  return Boolean(await Staff.exists({ _id: staffId, active: { $ne: false }, serviceIds: serviceId }));
}

export type StaffAvailabilityReason = "holiday" | "outside_working_hours";

export async function getStaffAvailability(
  staffId: string,
  startDateTime: Date,
  endDateTime: Date,
): Promise<{ available: true } | { available: false; reason: StaffAvailabilityReason }> {
  await connectDB();
  const staff = await Staff.findById(staffId).select("active weeklySchedule holidays").lean();
  if (!staff || staff.active === false) return { available: false, reason: "outside_working_hours" };

  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: SALON_TIME_ZONE,
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const startParts = Object.fromEntries(
    formatter.formatToParts(startDateTime).map(({ type, value }) => [type, value]),
  );
  const endParts = Object.fromEntries(
    formatter.formatToParts(endDateTime).map(({ type, value }) => [type, value]),
  );
  const date = `${startParts.year}-${startParts.month}-${startParts.day}`;
  if (staff.holidays.some((holiday) => holiday.date === date)) {
    return { available: false, reason: "holiday" };
  }
  const weekdays: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const workingHours = staff.weeklySchedule.find(
    ({ dayOfWeek }) => dayOfWeek === weekdays[startParts.weekday],
  );
  const endsOnSameDay = startParts.year === endParts.year
    && startParts.month === endParts.month
    && startParts.day === endParts.day;
  const startTime = `${startParts.hour}:${startParts.minute}`;
  const endTime = `${endParts.hour}:${endParts.minute}`;
  if (!workingHours || !endsOnSameDay || startTime < workingHours.startTime || endTime > workingHours.endTime) {
    return { available: false, reason: "outside_working_hours" };
  }
  return { available: true };
}
