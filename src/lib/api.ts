import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function validationError(error: ZodError) {
  return NextResponse.json(
    {
      success: false,
      message: "Request validation failed",
      errors: error.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message })),
    },
    { status: 400 },
  );
}

export function serverError(context: string, error: unknown) {
  console.error(context, error);
  return NextResponse.json(
    { success: false, message: "An unexpected server error occurred." },
    { status: 500 },
  );
}
