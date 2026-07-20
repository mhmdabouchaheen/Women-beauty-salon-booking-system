import { NextResponse } from "next/server";

import { connectDB } from "../../../src/lib/db/mongoose";

export async function GET() {
  try {
    await connectDB();

    return NextResponse.json(
      {
        success: true,
        message: "Database connected successfully",
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to connect to the database",
      },
      { status: 500 },
    );
  }
}
