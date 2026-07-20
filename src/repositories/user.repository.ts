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
