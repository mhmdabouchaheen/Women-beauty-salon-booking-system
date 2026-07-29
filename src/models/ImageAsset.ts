import mongoose, { Schema, type Model } from "mongoose";

import type { IImageAsset } from "../types/image-asset";

const imageAssetSchema = new Schema<IImageAsset>(
  {
    data: { type: Buffer, required: true, select: false },
    contentType: {
      type: String,
      required: true,
      enum: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    },
    originalName: { type: String, required: true, trim: true, maxlength: 255 },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  },
  { timestamps: true, collection: "image_assets" },
);

const ImageAsset =
  (mongoose.models.ImageAsset as Model<IImageAsset> | undefined) ??
  mongoose.model<IImageAsset>("ImageAsset", imageAssetSchema);

export default ImageAsset;
