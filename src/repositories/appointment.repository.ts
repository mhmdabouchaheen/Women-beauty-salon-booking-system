import { connectDB } from "../lib/db/mongoose";
import Appointment from "../models/Appointment";
import Service from "../models/Service";
import User from "../models/User";
import { POINTS_PER_COMPLETED_APPOINTMENT } from "../config/rewards";
import type {
  AppointmentStatus,
  CreateAppointmentInput,
} from "../types/appointment";
import { createSalonDateTime } from "../lib/date-time";
import { getStaffAvailability } from "./staff.repository";

function populateAppointment<T extends { populate(path: string): T }>(query: T): T {
  return query.populate("userId").populate("serviceId").populate("staffId");
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

export async function findCustomerConflictingAppointment(
  userId: string,
  startDateTime: Date,
  endDateTime: Date,
) {
  await connectDB();
  return Appointment.findOne({
    userId,
    status: "booked",
    startDateTime: { $lt: endDateTime },
    endDateTime: { $gt: startDateTime },
  });
}

export async function createAppointment(data: CreateAppointmentInput) {
  await connectDB();

  const service = await Service.findById(data.serviceId).select("duration");
  if (!service) throw new Error("Selected service was not found");

  const startDateTime = createSalonDateTime(data.appointmentDate, data.appointmentTime);
  const endDateTime = new Date(startDateTime.getTime() + service.duration * 60_000);
  const availability = await getStaffAvailability(data.staffId, startDateTime, endDateTime);
  if (!availability.available) {
    throw new Error(
      availability.reason === "holiday"
        ? "The selected staff member is on holiday on this date"
        : "The appointment is outside the selected staff member's working hours",
    );
  }
  const conflict = await findConflictingAppointment(data.staffId, startDateTime, endDateTime);
  if (conflict) throw new Error("The selected staff member is unavailable during this time");
  const customerConflict = await findCustomerConflictingAppointment(
    data.userId,
    startDateTime,
    endDateTime,
  );
  if (customerConflict) {
    throw new Error("The selected customer already has an appointment during this time");
  }

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

export async function findAppointmentOwnerById(id: string) {
  await connectDB();
  return Appointment.findById(id).select("userId status");
}

export async function deleteAppointment(id: string) {
  await connectDB();
  return Appointment.findByIdAndDelete(id);
}

export async function deleteAppointmentsByUser(userId: string) {
  await connectDB();
  return Appointment.deleteMany({ userId });
}

export async function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  await connectDB();
  if (status === "completed") {
    const newlyRewarded = await Appointment.findOneAndUpdate(
      { _id: id, rewardsAwarded: { $ne: true } },
      { $set: { status, rewardsAwarded: true } },
      { new: true, runValidators: true },
    );
    if (newlyRewarded) {
      await User.findByIdAndUpdate(newlyRewarded.userId, {
        $inc: {
          rewardPoints: POINTS_PER_COMPLETED_APPOINTMENT,
          lifetimeRewardPoints: POINTS_PER_COMPLETED_APPOINTMENT,
        },
      });
    } else {
      await Appointment.findByIdAndUpdate(id, { status }, { runValidators: true });
    }
    return populateAppointment(Appointment.findById(id));
  }
  return populateAppointment(
    Appointment.findByIdAndUpdate(id, { status }, { new: true, runValidators: true }),
  );
}

export async function cancelAppointment(id: string) {
  await connectDB();
  return updateAppointmentStatus(id, "cancelled");
}
