import { z } from "zod";

export const serviceValidationSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim().min(1, "Description is required"),
  category: z.string().trim().min(1, "Category is required").default("Other"),
  duration: z.number().int().positive(),
  price: z.number().min(0),
  image: z.string().trim().default("/window.svg"),
  featured: z.boolean().default(true),
});

export const createServiceSchema = serviceValidationSchema;
export const updateServiceSchema = serviceValidationSchema.partial();
