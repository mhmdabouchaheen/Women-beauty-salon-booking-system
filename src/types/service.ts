import type { Types } from "mongoose";

export interface IService {
  _id: Types.ObjectId;
  name: string;
  description: string;
  category: string;
  duration: number;
  price: number;
  image: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateServiceInput = Pick<
  IService,
  "name" | "description" | "category" | "duration" | "price" | "image" | "featured"
>;
export type UpdateServiceInput = Partial<CreateServiceInput>;
