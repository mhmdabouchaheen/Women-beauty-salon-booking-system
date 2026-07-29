import type { Types } from "mongoose";

export interface IImageAsset {
  _id: Types.ObjectId;
  data: Buffer;
  contentType: "image/jpeg" | "image/png" | "image/webp" | "image/gif";
  originalName: string;
  uploadedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
