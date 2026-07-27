import mongoose, { Schema, type Model } from "mongoose";

import type { INotification } from "../types/notification";

const notificationSchema = new Schema<INotification>(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    recipientId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 100 },
    message: { type: String, required: true, trim: true, maxlength: 1000 },
    readAt: { type: Date },
  },
  { timestamps: true, collection: "notifications" },
);

notificationSchema.index({ recipientId: 1, createdAt: -1 });
notificationSchema.index({ senderId: 1, createdAt: -1 });

const Notification =
  (mongoose.models.Notification as Model<INotification> | undefined) ??
  mongoose.model<INotification>("Notification", notificationSchema);

export default Notification;
