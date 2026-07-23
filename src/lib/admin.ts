import { NextResponse } from "next/server";

import { getAuthUser } from "./auth";

export async function requireAdmin() {
  const auth = await getAuthUser();
  if (auth?.role !== "admin") {
    return {
      auth: null,
      response: NextResponse.json(
        { success: false, message: "Admin access required." },
        { status: auth ? 403 : 401 },
      ),
    };
  }
  return { auth, response: null };
}
