import type { Types } from "mongoose";

export interface IService {
  _id: Types.ObjectId;
  name: string;
  description: string;
  duration: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateServiceInput = Pick<
  IService,
  "name" | "description" | "duration" | "price"
>;
export type UpdateServiceInput = Partial<CreateServiceInput>;
