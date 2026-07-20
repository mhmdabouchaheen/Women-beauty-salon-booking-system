import { z } from "zod";

export const serviceValidationSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim().min(1, "Description is required"),
  duration: z.number().int().positive(),
  price: z.number().min(0),
});

export const createServiceSchema = serviceValidationSchema;
export const updateServiceSchema = serviceValidationSchema.partial();
