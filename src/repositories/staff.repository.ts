import { connectDB } from "../lib/db/mongoose";
import Staff from "../models/Staff";
import type { CreateStaffInput, UpdateStaffInput } from "../types/staff";

export async function createStaff(data: CreateStaffInput) {
  await connectDB();
  return Staff.create(data);
}

export async function getAllStaff() {
  await connectDB();
  return Staff.find().sort({ name: 1 });
}

export async function findStaffById(id: string) {
  await connectDB();
  return Staff.findById(id);
}

export async function updateStaff(id: string, data: UpdateStaffInput) {
  await connectDB();
  return Staff.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export async function deleteStaff(id: string) {
  await connectDB();
  return Staff.findByIdAndDelete(id);
}
