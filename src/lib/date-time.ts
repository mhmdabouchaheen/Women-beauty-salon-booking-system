import { SALON_TIME_ZONE } from "@/src/config/salon";

function timeZoneOffset(date: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SALON_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  const zonedAsUtc = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour),
    Number(values.minute),
    Number(values.second),
  );
  return zonedAsUtc - date.getTime();
}

export function createSalonDateTime(dateValue: Date | string, time: string): Date {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) throw new Error("Invalid appointment date");
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
    throw new Error("Appointment time must use HH:mm format");
  }

  const datePart = typeof dateValue === "string"
    ? dateValue.match(/^\d{4}-\d{2}-\d{2}/)?.[0]
    : undefined;
  const [year, month, day] = (datePart ?? date.toISOString().slice(0, 10)).split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  const wallTime = Date.UTC(year, month - 1, day, hours, minutes);
  let result = new Date(wallTime - timeZoneOffset(new Date(wallTime)));
  result = new Date(wallTime - timeZoneOffset(result));
  return result;
}
