import { connectDB } from "../lib/db/mongoose";
import Appointment from "../models/Appointment";
import Service from "../models/Service";
import type {
  AppointmentStatus,
  CreateAppointmentInput,
} from "../types/appointment";

function populateAppointment<T extends { populate(path: string): T }>(query: T): T {
  return query.populate("userId").populate("serviceId").populate("staffId");
}

function combineDateAndTime(dateValue: Date | string, time: string): Date {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) throw new Error("Invalid appointment date");

  const [hours, minutes] = time.split(":").map(Number);
  if (
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(time) ||
    hours === undefined ||
    minutes === undefined
  ) {
    throw new Error("Appointment time must use HH:mm format");
  }

  date.setHours(hours, minutes, 0, 0);
  return date;
}

export async function findConflictingAppointment(
  staffId: string,
  startDateTime: Date,
  endDateTime: Date,
  excludeAppointmentId?: string,
) {
  await connectDB();
  return Appointment.findOne({
    staffId,
    status: "booked",
    startDateTime: { $lt: endDateTime },
    endDateTime: { $gt: startDateTime },
    ...(excludeAppointmentId ? { _id: { $ne: excludeAppointmentId } } : {}),
  });
}

export async function createAppointment(data: CreateAppointmentInput) {
  await connectDB();

  const service = await Service.findById(data.serviceId).select("duration");
  if (!service) throw new Error("Selected service was not found");

  const startDateTime = combineDateAndTime(data.appointmentDate, data.appointmentTime);
  const endDateTime = new Date(startDateTime.getTime() + service.duration * 60_000);
  const conflict = await findConflictingAppointment(data.staffId, startDateTime, endDateTime);
  if (conflict) throw new Error("The selected staff member is unavailable during this time");

  const appointment = await Appointment.create({
    ...data,
    appointmentDate: new Date(data.appointmentDate),
    startDateTime,
    endDateTime,
  });
  return populateAppointment(Appointment.findById(appointment._id)).orFail();
}

export async function getAppointmentsByUser(userId: string) {
  await connectDB();
  return populateAppointment(Appointment.find({ userId }).sort({ startDateTime: 1 }));
}

export async function getAppointmentsByStaff(staffId: string) {
  await connectDB();
  return populateAppointment(Appointment.find({ staffId }).sort({ startDateTime: 1 }));
}

export async function getAllAppointments() {
  await connectDB();
  return populateAppointment(Appointment.find().sort({ startDateTime: 1 }));
}

export async function findAppointmentById(id: string) {
  await connectDB();
  return populateAppointment(Appointment.findById(id));
}

export async function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  await connectDB();
  return populateAppointment(
    Appointment.findByIdAndUpdate(id, { status }, { new: true, runValidators: true }),
  );
}

export async function cancelAppointment(id: string) {
  await connectDB();
  return updateAppointmentStatus(id, "cancelled");
}
