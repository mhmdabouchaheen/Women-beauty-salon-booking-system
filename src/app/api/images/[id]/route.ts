import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

import { serverError } from "@/src/lib/api";
import { connectDB } from "@/src/lib/db/mongoose";
import ImageAsset from "@/src/models/ImageAsset";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ success: false, message: "Invalid image ID." }, { status: 400 });
    }
    await connectDB();
    const asset = await ImageAsset.findById(id).select("+data");
    if (!asset) {
      return NextResponse.json({ success: false, message: "Image not found." }, { status: 404 });
    }
    const bytes = Buffer.from(asset.data);
    return new NextResponse(new Uint8Array(bytes), {
      headers: {
        "Content-Type": asset.contentType,
        "Content-Length": String(bytes.length),
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error: unknown) {
    return serverError("Loading image failed:", error);
  }
}
