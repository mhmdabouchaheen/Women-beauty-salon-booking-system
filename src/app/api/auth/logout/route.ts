import { NextResponse } from "next/server";

import { AUTH_COOKIE_NAME, authCookieOptions } from "@/src/lib/auth";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully." });
  response.cookies.set(AUTH_COOKIE_NAME, "", { ...authCookieOptions, maxAge: 0 });
  return response;
}
