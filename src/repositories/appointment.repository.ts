import { connectDB } from "../lib/db/mongoose";
import Appointment from "../models/Appointment";
import BookingReservation from "../models/BookingReservation";
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

export async function createAppointment(
  data: CreateAppointmentInput & { reservationIdToIgnore?: string },
) {
  await connectDB();
  const { reservationIdToIgnore, ...appointmentData } = data;

  const service = await Service.findById(appointmentData.serviceId).select("duration");
  if (!service) throw new Error("Selected service was not found");

  const startDateTime = createSalonDateTime(
    appointmentData.appointmentDate,
    appointmentData.appointmentTime,
  );
  const endDateTime = new Date(startDateTime.getTime() + service.duration * 60_000);
  const availability = await getStaffAvailability(
    appointmentData.staffId,
    startDateTime,
    endDateTime,
  );
  if (!availability.available) {
    throw new Error(
      availability.reason === "holiday"
        ? "The selected staff member is on holiday on this date"
        : "The appointment is outside the selected staff member's working hours",
    );
  }
  const conflict = await findConflictingAppointment(
    appointmentData.staffId,
    startDateTime,
    endDateTime,
  );
  if (conflict) throw new Error("The selected staff member is unavailable during this time");
  const customerConflict = await findCustomerConflictingAppointment(
    appointmentData.userId,
    startDateTime,
    endDateTime,
  );
  if (customerConflict) {
    throw new Error("The selected customer already has an appointment during this time");
  }
  const reservationConflict = await BookingReservation.findOne({
    status: { $in: ["pending", "processing"] },
    expiresAt: { $gt: new Date() },
    startDateTime: { $lt: endDateTime },
    endDateTime: { $gt: startDateTime },
    $or: [{ staffId: appointmentData.staffId }, { userId: appointmentData.userId }],
    ...(reservationIdToIgnore ? { _id: { $ne: reservationIdToIgnore } } : {}),
  });
  if (reservationConflict) {
    throw new Error("This appointment time is temporarily reserved by another checkout");
  }

  const appointment = await Appointment.create({
    ...appointmentData,
    appointmentDate: new Date(appointmentData.appointmentDate),
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
