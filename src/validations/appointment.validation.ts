import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Must be a valid MongoDB ObjectId");
const dateSchema = z.coerce.date();

export const appointmentValidationSchema = z
  .object({
    userId: objectIdSchema,
    serviceId: objectIdSchema,
    staffId: objectIdSchema,
    appointmentDate: dateSchema,
    appointmentTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Time must use HH:mm format"),
    startDateTime: dateSchema,
    endDateTime: dateSchema,
    status: z.enum(["booked", "cancelled"]).default("booked"),
  })
  .refine((value) => value.endDateTime > value.startDateTime, {
    message: "endDateTime must be later than startDateTime",
    path: ["endDateTime"],
  });

export const createAppointmentSchema = appointmentValidationSchema.omit({
  startDateTime: true,
  endDateTime: true,
});

export const appointmentStatusSchema = z.enum(["booked", "cancelled"]);
