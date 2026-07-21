import { NextResponse } from "next/server";

import { serverError } from "@/src/lib/api";
import { getAuthUser } from "@/src/lib/auth";
import { findUserById } from "@/src/repositories/user.repository";

export async function GET() {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    }
    const user = await findUserById(auth.userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
    });
  } catch (error: unknown) {
    return serverError("Loading current user failed:", error);
  }
}
