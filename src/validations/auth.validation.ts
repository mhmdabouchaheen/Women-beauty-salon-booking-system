import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email("A valid email is required").trim().toLowerCase(),
  password: z.string().min(8, "Password must contain at least 8 characters").max(128),
});

export const loginSchema = z.object({
  email: z.email("A valid email is required").trim().toLowerCase(),
  password: z.string().min(1, "Password is required").max(128),
});
