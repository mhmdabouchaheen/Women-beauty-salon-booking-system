import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { serverError, validationError } from "@/src/lib/api";
import { getAuthUser } from "@/src/lib/auth";
import {
  countUnreadNotifications,
  getNotifications,
  sendToAllAdmins,
  sendToRecipient,
} from "@/src/repositories/notification.repository";
import { findUserById } from "@/src/repositories/user.repository";
import { sendNotificationSchema } from "@/src/validations/notification.validation";

export async function GET(request: Request) {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    }
    const box = new URL(request.url).searchParams.get("box") === "sent" ? "sent" : "inbox";
    const [notifications, unreadCount] = await Promise.all([
      getNotifications(auth.userId, box),
      countUnreadNotifications(auth.userId),
    ]);
    return NextResponse.json({ success: true, notifications, unreadCount });
  } catch (error: unknown) {
    return serverError("Loading notifications failed:", error);
  }
}

export async function POST(request: Request) {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    }
    const input = sendNotificationSchema.parse(await request.json());
    const content = { title: input.title, message: input.message };
    if (auth.role === "customer") {
      const notifications = await sendToAllAdmins(auth.userId, content);
      if (notifications.length === 0) {
        return NextResponse.json({ success: false, message: "No admin account is available." }, { status: 409 });
      }
      return NextResponse.json({ success: true, message: "Message sent to the salon team." }, { status: 201 });
    }

    if (!input.recipientId || !isValidObjectId(input.recipientId)) {
      return NextResponse.json({ success: false, message: "Select a valid customer." }, { status: 400 });
    }
    const recipient = await findUserById(input.recipientId);
    if (!recipient || recipient.role !== "customer") {
      return NextResponse.json({ success: false, message: "Customer not found." }, { status: 404 });
    }
    await sendToRecipient(auth.userId, input.recipientId, content);
    return NextResponse.json({ success: true, message: "Notification sent." }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof ZodError) return validationError(error);
    return serverError("Sending notification failed:", error);
  }
}
