import { NextResponse } from "next/server";

import { serverError } from "@/src/lib/api";
import { getAuthUser } from "@/src/lib/auth";
import { connectDB } from "@/src/lib/db/mongoose";
import ImageAsset from "@/src/models/ImageAsset";

export const runtime = "nodejs";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
type AllowedImageType = "image/jpeg" | "image/png" | "image/webp" | "image/gif";
const allowedTypes = new Set<AllowedImageType>(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function hasValidSignature(bytes: Uint8Array, type: string): boolean {
  if (type === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (type === "image/png") {
    return bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  }
  if (type === "image/gif") {
    return bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38;
  }
  if (type === "image/webp") {
    return (
      bytes[0] === 0x52 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x46 &&
      bytes[8] === 0x57 &&
      bytes[9] === 0x45 &&
      bytes[10] === 0x42 &&
      bytes[11] === 0x50
    );
  }
  return false;
}

export async function POST(request: Request) {
  try {
    const auth = await getAuthUser();
    if (auth?.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Admin access required." },
        { status: auth ? 403 : 401 },
      );
    }
    const formData = await request.formData();
    const file = formData.get("image");
    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, message: "Select an image file." }, { status: 400 });
    }
    if (!allowedTypes.has(file.type as AllowedImageType)) {
      return NextResponse.json(
        { success: false, message: "Only JPEG, PNG, WebP, and GIF images are supported." },
        { status: 415 },
      );
    }
    const contentType = file.type as AllowedImageType;
    if (file.size === 0 || file.size > MAX_IMAGE_BYTES) {
      return NextResponse.json(
        { success: false, message: "The image must be smaller than 5 MB." },
        { status: 413 },
      );
    }
    const bytes = new Uint8Array(await file.arrayBuffer());
    if (!hasValidSignature(bytes, contentType)) {
      return NextResponse.json(
        { success: false, message: "The selected file is not a valid image." },
        { status: 415 },
      );
    }
    await connectDB();
    const asset = await ImageAsset.create({
      data: Buffer.from(bytes),
      contentType,
      originalName: file.name.slice(0, 255),
      uploadedBy: auth.userId,
    });
    return NextResponse.json(
      { success: true, imageUrl: `/api/images/${asset._id.toString()}` },
      { status: 201 },
    );
  } catch (error: unknown) {
    return serverError("Uploading image failed:", error);
  }
}
