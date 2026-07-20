import type { Types } from "mongoose";

export interface IStaff {
  _id: Types.ObjectId;
  name: string;
  specialty: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateStaffInput = Pick<IStaff, "name" | "specialty">;
export type UpdateStaffInput = Partial<CreateStaffInput>;
