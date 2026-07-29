import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

import { serverError } from "@/src/lib/api";
import { getAuthUser } from "@/src/lib/auth";
import { markNotificationRead } from "@/src/repositories/notification.repository";

export async function PATCH(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    }
    const { id } = await context.params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ success: false, message: "Invalid notification ID." }, { status: 400 });
    }
    const notification = await markNotificationRead(id, auth.userId);
    return notification
      ? NextResponse.json({ success: true })
      : NextResponse.json({ success: false, message: "Notification not found." }, { status: 404 });
  } catch (error: unknown) {
    return serverError("Updating notification failed:", error);
  }
}
