import "server-only";

import { SALON_NAME, SALON_TIME_ZONE } from "@/src/config/salon";
import { getEmailFrom, getGmailTransporter } from "@/src/lib/email/gmail";
import type { AppointmentStatus } from "@/src/types/appointment";

export interface AppointmentConfirmationDetails {
  customerName: string;
  customerEmail: string;
  serviceName: string;
  staffName: string;
  startDateTime: Date;
  endDateTime: Date;
  status: AppointmentStatus;
}

export interface EmailDeliveryResult {
  success: boolean;
  emailId?: string;
  error?: string;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: SALON_TIME_ZONE,
  dateStyle: "full",
});
const timeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: SALON_TIME_ZONE,
  hour: "numeric",
  minute: "2-digit",
});

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[
        character
      ]!,
  );
}

function appointmentConfirmationHtml(details: AppointmentConfirmationDetails): string {
  const rows = [
    ["Service", details.serviceName],
    ["Staff member", details.staffName],
    ["Date", dateFormatter.format(details.startDateTime)],
    [
      "Time",
      `${timeFormatter.format(details.startDateTime)}–${timeFormatter.format(details.endDateTime)}`,
    ],
    ["Status", details.status.charAt(0).toUpperCase() + details.status.slice(1)],
    ["Confirmation sent to", details.customerEmail],
  ];
  return `<!doctype html>
<html lang="en">
  <body style="background:#f7f2f5;color:#292329;font-family:Arial,sans-serif;margin:0;padding:32px 16px">
    <main style="background:#fff;border-radius:12px;margin:0 auto;max-width:560px;padding:32px">
      <h1 style="color:#8f3f68;font-size:26px;margin:0 0 16px">Appointment confirmed</h1>
      <p>Hello ${escapeHtml(details.customerName)},</p>
      <p>Your appointment at ${escapeHtml(SALON_NAME)} is confirmed. We look forward to seeing you.</p>
      <section style="border-top:1px solid #eadde4;margin-top:24px;padding-top:24px">
        ${rows
          .map(
            ([label, value]) =>
              `<p style="color:#6d5d68;font-size:13px;margin:0 0 4px">${escapeHtml(label)}</p>` +
              `<p style="font-size:16px;margin:0 0 18px">${escapeHtml(value)}</p>`,
          )
          .join("")}
      </section>
    </main>
  </body>
</html>`;
}

export async function sendAppointmentConfirmationEmail(
  details: AppointmentConfirmationDetails,
): Promise<EmailDeliveryResult> {
  try {
    const info = await getGmailTransporter().sendMail({
      from: getEmailFrom(),
      to: details.customerEmail,
      subject: `Appointment confirmed – ${details.serviceName.replace(/[\r\n]+/g, " ")}`,
      html: appointmentConfirmationHtml(details),
    });
    return { success: true, emailId: info.messageId };
  } catch (error: unknown) {
    console.error("Appointment confirmation email delivery failed", {
      provider: "gmail",
      errorType: error instanceof Error ? error.name : "UnknownError",
    });
    return { success: false, error: "Email delivery failed" };
  }
}

export async function sendPasswordResetEmail(
  recipient: string,
  customerName: string,
  resetUrl: string,
): Promise<EmailDeliveryResult> {
  try {
    const info = await getGmailTransporter().sendMail({
      from: getEmailFrom(),
      to: recipient,
      subject: `Reset your ${SALON_NAME} password`,
      text: [
        `Hello ${customerName},`,
        "",
        "We received a request to reset your password.",
        `Open this secure link within one hour: ${resetUrl}`,
        "",
        "If you did not request this, you can ignore this email.",
      ].join("\n"),
    });
    return { success: true, emailId: info.messageId };
  } catch (error: unknown) {
    console.error("Password reset email delivery failed", {
      provider: "gmail",
      errorType: error instanceof Error ? error.name : "UnknownError",
    });
    return { success: false, error: "Email delivery failed" };
  }
}
