import "server-only";

import nodemailer, { type Transporter } from "nodemailer";

let gmailTransporter: Transporter | undefined;

function requiredServerEnvironmentVariable(
  name: "GMAIL_USER" | "GMAIL_APP_PASSWORD",
): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required server environment variable: ${name}`);
  return value;
}

export function getGmailTransporter(): Transporter {
  gmailTransporter ??= nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: requiredServerEnvironmentVariable("GMAIL_USER"),
      pass: requiredServerEnvironmentVariable("GMAIL_APP_PASSWORD").replace(/\s+/g, ""),
    },
  });
  return gmailTransporter;
}

export function getEmailFrom(): string {
  const address = requiredServerEnvironmentVariable("GMAIL_USER");
  const name = process.env.EMAIL_FROM_NAME?.trim() || "Women Beauty Salon";
  return `"${name.replace(/["\r\n]/g, "")}" <${address}>`;
}
