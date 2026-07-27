import type { Types } from "mongoose";

export interface INotification {
  _id: Types.ObjectId;
  senderId: Types.ObjectId;
  recipientId: Types.ObjectId;
  title: string;
  message: string;
  readAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationView {
  id: string;
  title: string;
  message: string;
  readAt: string | null;
  createdAt: string;
  sender: { id: string; name: string; role: "customer" | "admin" };
  recipient: { id: string; name: string; role: "customer" | "admin" };
}
