import type { Types } from "mongoose";

export interface StaffWorkingHours {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface StaffHoliday {
  date: string;
  reason?: string;
}

export interface IStaff {
  _id: Types.ObjectId;
  name: string;
  specialty: string;
  serviceIds: Types.ObjectId[];
  weeklySchedule: StaffWorkingHours[];
  holidays: StaffHoliday[];
  createdAt: Date;
  updatedAt: Date;
}

export type CreateStaffInput = Pick<IStaff, "name" | "specialty"> & {
  serviceIds?: string[];
  weeklySchedule?: StaffWorkingHours[];
  holidays?: StaffHoliday[];
};
export type UpdateStaffInput = Partial<CreateStaffInput>;
