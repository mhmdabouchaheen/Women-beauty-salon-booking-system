import "server-only";

import { SALON_TIME_ZONE } from "@/src/config/salon";
import { getAppointmentsByUser } from "@/src/repositories/appointment.repository";

type PopulatedAppointment = {
  _id: { toString(): string };
  serviceId: { name: string; price: number; image?: string };
  staffId: { name: string };
  startDateTime: Date;
  appointmentTime: string;
  status: "booked" | "completed" | "cancelled";
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: SALON_TIME_ZONE,
  dateStyle: "medium",
});
const timeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: SALON_TIME_ZONE,
  hour: "numeric",
  minute: "2-digit",
});
const monthFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: SALON_TIME_ZONE,
  month: "short",
});
const dayFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: SALON_TIME_ZONE,
  day: "2-digit",
});

export async function getCustomerDashboardAppointments(userId: string) {
  const appointments = await getAppointmentsByUser(userId) as unknown as PopulatedAppointment[];
  return appointments.map((appointment) => ({
    id: appointment._id.toString(),
    service: appointment.serviceId.name,
    specialist: appointment.staffId.name,
    startDateTime: appointment.startDateTime,
    date: dateFormatter.format(appointment.startDateTime),
    time: timeFormatter.format(appointment.startDateTime),
    month: monthFormatter.format(appointment.startDateTime).toUpperCase(),
    day: dayFormatter.format(appointment.startDateTime),
    price: appointment.serviceId.price,
    image: appointment.serviceId.image || "/window.svg",
    status: appointment.status,
  }));
}
