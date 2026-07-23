import type { Types } from "mongoose";

export interface ISalonSettings {
  _id: Types.ObjectId;
  key: "salon";
  address: string;
  phone: string;
  email: string;
  weekdays: string;
  saturday: string;
  sunday: string;
  createdAt: Date;
  updatedAt: Date;
}
