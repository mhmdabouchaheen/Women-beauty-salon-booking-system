import { z } from "zod";

export const staffValidationSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  specialty: z.string().trim().min(1, "Specialty is required"),
});

export const createStaffSchema = staffValidationSchema;
export const updateStaffSchema = staffValidationSchema.partial();
