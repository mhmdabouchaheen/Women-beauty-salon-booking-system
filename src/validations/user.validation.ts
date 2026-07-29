import { z } from "zod";

export const userValidationSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.email("A valid email is required").trim().toLowerCase(),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["customer", "admin"]).default("customer"),
});

export const createUserSchema = userValidationSchema;
