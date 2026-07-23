import type { Types } from "mongoose";

export type AppointmentStatus = "booked" | "completed" | "cancelled";

export interface IAppointment {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  serviceId: Types.ObjectId;
  staffId: Types.ObjectId;
  appointmentDate: Date;
  appointmentTime: string;
  startDateTime: Date;
  endDateTime: Date;
  status: AppointmentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAppointmentInput {
  userId: string;
  serviceId: string;
  staffId: string;
  appointmentDate: Date | string;
  appointmentTime: string;
  status?: AppointmentStatus;
}
