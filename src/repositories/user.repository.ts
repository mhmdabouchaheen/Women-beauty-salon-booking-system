import { connectDB } from "../lib/db/mongoose";
import User from "../models/User";
import type { CreateUserInput } from "../types/user";

export async function createUser(data: CreateUserInput) {
  await connectDB();
  return User.create(data);
}

export async function findUserByEmail(email: string) {
  await connectDB();
  return User.findOne({ email: email.trim().toLowerCase() });
}

export async function findUserById(id: string) {
  await connectDB();
  return User.findById(id);
}

export async function getCustomers() {
  await connectDB();
  return User.aggregate([
    { $match: { role: "customer" } },
    { $lookup: { from: "appointments", localField: "_id", foreignField: "userId", as: "appointments" } },
    { $project: {
      name: 1,
      email: 1,
      image: 1,
      appointmentCount: { $size: "$appointments" },
      lastAppointment: { $max: "$appointments.startDateTime" },
      createdAt: 1,
    } },
    { $sort: { name: 1 } },
  ]);
}

export async function updateUser(
  id: string,
  data: { name?: string; email?: string; image?: string; password?: string },
) {
  await connectDB();
  return User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export async function deleteUser(id: string) {
  await connectDB();
  return User.findByIdAndDelete(id);
}

export async function redeemUserReward(id: string, cost: number) {
  await connectDB();
  return User.findOneAndUpdate(
    { _id: id, role: "customer", rewardPoints: { $gte: cost } },
    { $inc: { rewardPoints: -cost } },
    { new: true, runValidators: true },
  );
}
