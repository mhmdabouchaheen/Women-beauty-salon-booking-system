import jwt, { type JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export const AUTH_COOKIE_NAME = "salon_session";

export type AuthUser = {
  userId: string;
  role: "customer" | "admin";
};

function jwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not configured");
  return secret;
}

export function assertAuthConfigured(): void {
  jwtSecret();
}

export function createAuthToken(user: AuthUser): string {
  return jwt.sign(user, jwtSecret(), { expiresIn: "7d" });
}

export function verifyAuthToken(token: string): AuthUser | null {
  try {
    const payload: string | JwtPayload = jwt.verify(token, jwtSecret());
    if (
      typeof payload === "string" ||
      typeof payload.userId !== "string" ||
      (payload.role !== "customer" && payload.role !== "admin")
    ) {
      return null;
    }
    return { userId: payload.userId, role: payload.role };
  } catch {
    return null;
  }
}

export async function getAuthUser(): Promise<AuthUser | null> {
  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
  return token ? verifyAuthToken(token) : null;
}

export const authCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};
