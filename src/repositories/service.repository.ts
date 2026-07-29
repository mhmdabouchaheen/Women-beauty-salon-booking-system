import { connectDB } from "../lib/db/mongoose";
import Service from "../models/Service";
import type { CreateServiceInput, UpdateServiceInput } from "../types/service";

export async function createService(data: CreateServiceInput) {
  await connectDB();
  return Service.create(data);
}

export async function getAllServices() {
  await connectDB();
  return Service.find().sort({ name: 1 });
}

export async function findServiceById(id: string) {
  await connectDB();
  return Service.findById(id);
}

export async function updateService(id: string, data: UpdateServiceInput) {
  await connectDB();
  return Service.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export async function deleteService(id: string) {
  await connectDB();
  return Service.findByIdAndDelete(id);
}
