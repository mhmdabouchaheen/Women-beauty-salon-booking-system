import { z } from "zod";

export const sendNotificationSchema = z.object({
  recipientId: z.string().trim().optional(),
  title: z.string().trim().min(1, "Subject is required.").max(100),
  message: z.string().trim().min(1, "Message is required.").max(1000),
});
