import "server-only";

import { Resend } from "resend";

let resendClient: Resend | undefined;

function requiredServerEnvironmentVariable(name: "RESEND_API_KEY" | "EMAIL_FROM"): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required server environment variable: ${name}`);
  return value;
}

export function getResendClient(): Resend {
  resendClient ??= new Resend(requiredServerEnvironmentVariable("RESEND_API_KEY"));
  return resendClient;
}

export function getEmailFrom(): string {
  return requiredServerEnvironmentVariable("EMAIL_FROM");
}
