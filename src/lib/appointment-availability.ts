import "server-only";

import { SALON_TIME_ZONE } from "@/src/config/salon";
import { createSalonDateTime } from "@/src/lib/date-time";
import { connectDB } from "@/src/lib/db/mongoose";
import Appointment from "@/src/models/Appointment";
import Service from "@/src/models/Service";
import Staff from "@/src/models/Staff";
import User from "@/src/models/User";

const SLOT_INTERVAL_MINUTES = 30;
const DATE_RANGE_DAYS = 60;

function addCalendarDays(date: string, days: number): string {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day + days)).toISOString().slice(0, 10);
}

function salonToday(): string {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: SALON_TIME_ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date()).map(({ type, value }) => [type, value]),
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function weekdayForDate(date: string): number {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

function minutesFromTime(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function timeFromMinutes(total: number): string {
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

function dateLabel(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export async function getAppointmentAvailability(input: {
  staffId: string;
  serviceId: string;
  userId: string;
  date?: string;
}) {
  await connectDB();
  const [staff, service, customer] = await Promise.all([
    Staff.findById(input.staffId).lean(),
    Service.findById(input.serviceId).select("duration").lean(),
    User.findOne({ _id: input.userId, role: "customer" }).select("_id").lean(),
  ]);
  if (!staff || staff.active === false) throw new Error("Selected staff member is unavailable");
  if (!service) throw new Error("Selected service was not found");
  if (!customer) throw new Error("Selected customer was not found");
  if (!staff.serviceIds.some((id) => id.toString() === input.serviceId)) {
    throw new Error("Selected staff member does not provide this service");
  }

  const firstDate = salonToday();
  const now = new Date();
  const workingDates = Array.from(
    { length: DATE_RANGE_DAYS },
    (_, index) => addCalendarDays(firstDate, index),
  )
    .filter((date) => {
      const works = staff.weeklySchedule.some(
        ({ dayOfWeek }) => dayOfWeek === weekdayForDate(date),
      );
      return works && !staff.holidays.some((holiday) => holiday.date === date);
    })
    .map((date) => ({ date, label: dateLabel(date) }));

  if (!input.date) return { workingDates, timeSlots: [] };
  if (!workingDates.some(({ date }) => date === input.date)) {
    return { workingDates, timeSlots: [] };
  }
  const schedule = staff.weeklySchedule.find(
    ({ dayOfWeek }) => dayOfWeek === weekdayForDate(input.date!),
  );
  if (!schedule) return { workingDates, timeSlots: [] };

  const startOfDay = createSalonDateTime(input.date, "00:00");
  const endOfDay = createSalonDateTime(addCalendarDays(input.date, 1), "00:00");
  const conflicts = await Appointment.find({
    status: "booked",
    startDateTime: { $lt: endOfDay },
    endDateTime: { $gt: startOfDay },
    $or: [{ staffId: input.staffId }, { userId: input.userId }],
  }).select("startDateTime endDateTime").lean();

  const opening = minutesFromTime(schedule.startTime);
  const closing = minutesFromTime(schedule.endTime);
  const timeSlots: Array<{ time: string; label: string }> = [];
  for (
    let minutes = opening;
    minutes + service.duration <= closing;
    minutes += SLOT_INTERVAL_MINUTES
  ) {
    const time = timeFromMinutes(minutes);
    const slotStart = createSalonDateTime(input.date, time);
    const slotEnd = new Date(slotStart.getTime() + service.duration * 60_000);
    if (slotStart <= now) continue;
    if (conflicts.some((item) => item.startDateTime < slotEnd && item.endDateTime > slotStart)) {
      continue;
    }
    timeSlots.push({
      time,
      label: new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: SALON_TIME_ZONE,
      }).format(slotStart),
    });
  }
  return { workingDates, timeSlots };
}
