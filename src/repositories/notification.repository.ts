import { connectDB } from "../lib/db/mongoose";
import Notification from "../models/Notification";
import User from "../models/User";
import type { NotificationView } from "../types/notification";

type PopulatedUser = {
  _id: { toString(): string };
  name: string;
  role: "customer" | "admin";
};

function toView(notification: {
  _id: { toString(): string };
  title: string;
  message: string;
  readAt?: Date | null;
  createdAt: Date;
  senderId: PopulatedUser;
  recipientId: PopulatedUser;
}): NotificationView {
  return {
    id: notification._id.toString(),
    title: notification.title,
    message: notification.message,
    readAt: notification.readAt?.toISOString() ?? null,
    createdAt: notification.createdAt.toISOString(),
    sender: {
      id: notification.senderId._id.toString(),
      name: notification.senderId.name,
      role: notification.senderId.role,
    },
    recipient: {
      id: notification.recipientId._id.toString(),
      name: notification.recipientId.name,
      role: notification.recipientId.role,
    },
  };
}

export async function getNotifications(userId: string, box: "inbox" | "sent") {
  await connectDB();
  const query = box === "sent" ? { senderId: userId } : { recipientId: userId };
  const records = await Notification.find(query)
    .populate<{ senderId: PopulatedUser }>("senderId", "name role")
    .populate<{ recipientId: PopulatedUser }>("recipientId", "name role")
    .sort({ createdAt: -1 })
    .lean();
  return records.map((record) => toView(record));
}

export async function countUnreadNotifications(userId: string) {
  await connectDB();
  return Notification.countDocuments({ recipientId: userId, readAt: { $exists: false } });
}

export async function sendToRecipient(
  senderId: string,
  recipientId: string,
  content: { title: string; message: string },
) {
  await connectDB();
  return Notification.create({ senderId, recipientId, ...content });
}

export async function sendToAllAdmins(
  senderId: string,
  content: { title: string; message: string },
) {
  await connectDB();
  const admins = await User.find({ role: "admin" }).select("_id").lean();
  if (admins.length === 0) return [];
  return Notification.insertMany(
    admins.map((admin) => ({ senderId, recipientId: admin._id, ...content })),
  );
}

export async function markNotificationRead(id: string, recipientId: string) {
  await connectDB();
  return Notification.findOneAndUpdate(
    { _id: id, recipientId },
    { $set: { readAt: new Date() } },
    { new: true },
  );
}
