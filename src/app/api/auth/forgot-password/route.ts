import { createHash, randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { z, ZodError } from "zod";

import { serverError, validationError } from "@/src/lib/api";
import { connectDB } from "@/src/lib/db/mongoose";
import User from "@/src/models/User";
import { sendPasswordResetEmail } from "@/src/services/email.service";

const schema = z.object({ email: z.email().trim().toLowerCase() });
const genericMessage = "If an account exists for that email, a reset link has been sent.";

export async function POST(request: Request) {
  try {
    const { email } = schema.parse(await request.json());
    await connectDB();
    const user = await User.findOne({ email });
    if (user) {
      const token = randomBytes(32).toString("hex");
      user.passwordResetTokenHash = createHash("sha256").update(token).digest("hex");
      user.passwordResetExpiresAt = new Date(Date.now() + 60 * 60 * 1000);
      await user.save();
      const resetUrl = new URL(`/reset-password?token=${encodeURIComponent(token)}`, request.url).toString();
      await sendPasswordResetEmail(user.email, user.name, resetUrl);
    }
    return NextResponse.json({ success: true, message: genericMessage });
  } catch (error: unknown) {
    if (error instanceof ZodError) return validationError(error);
    return serverError("Requesting a password reset failed:", error);
  }
}
