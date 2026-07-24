import { createHash } from "crypto";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { z, ZodError } from "zod";

import { serverError, validationError } from "@/src/lib/api";
import { connectDB } from "@/src/lib/db/mongoose";
import User from "@/src/models/User";

const schema = z.object({
  token: z.string().min(32),
  password: z.string().min(8).max(128),
});

export async function POST(request: Request) {
  try {
    const input = schema.parse(await request.json());
    await connectDB();
    const tokenHash = createHash("sha256").update(input.token).digest("hex");
    const user = await User.findOne({
      passwordResetTokenHash: tokenHash,
      passwordResetExpiresAt: { $gt: new Date() },
    }).select("+passwordResetTokenHash +passwordResetExpiresAt");
    if (!user) {
      return NextResponse.json({ success: false, message: "This reset link is invalid or has expired." }, { status: 400 });
    }
    user.password = await hash(input.password, 12);
    user.passwordResetTokenHash = undefined;
    user.passwordResetExpiresAt = undefined;
    await user.save();
    return NextResponse.json({ success: true, message: "Password reset successfully." });
  } catch (error: unknown) {
    if (error instanceof ZodError) return validationError(error);
    return serverError("Resetting password failed:", error);
  }
}
