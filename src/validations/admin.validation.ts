import { z } from "zod";

export const customerCreateSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email("A valid email is required").trim().toLowerCase(),
  password: z.string().min(8).max(128),
  image: z.string().trim().optional(),
});

export const customerUpdateSchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  email: z.email().trim().toLowerCase().optional(),
  image: z.string().trim().optional(),
});

export const profileUpdateSchema = customerUpdateSchema.extend({
  currentPassword: z.string().min(1).optional(),
  newPassword: z.string().min(8).max(128).optional(),
});

export const salonSettingsSchema = z.object({
  address: z.string().trim().max(200),
  phone: z.string().trim().max(50),
  email: z.union([z.literal(""), z.email()]),
  weekdays: z.string().trim().max(100),
  saturday: z.string().trim().max(100),
  sunday: z.string().trim().max(100),
});
