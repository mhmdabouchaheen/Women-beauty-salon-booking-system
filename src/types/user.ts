import type { Types } from "mongoose";

export type UserRole = "customer" | "admin";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  image?: string;
  rewardPoints: number;
  lifetimeRewardPoints: number;
  passwordResetTokenHash?: string;
  passwordResetExpiresAt?: Date;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUserInput = Pick<IUser, "name" | "email" | "password"> &
  Partial<Pick<IUser, "role" | "image" | "rewardPoints" | "lifetimeRewardPoints">>;
