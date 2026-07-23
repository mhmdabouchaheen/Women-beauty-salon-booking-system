import "server-only";

import { SALON_NAME, SALON_TIME_ZONE } from "@/src/config/salon";
import { AppointmentConfirmationEmail } from "@/src/emails/AppointmentConfirmationEmail";
import { getEmailFrom, getResendClient } from "@/src/lib/email/resend";
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

const dateFormatter = new Intl.DateTimeFormat("en-US", { timeZone: SALON_TIME_ZONE, dateStyle: "full" });
const timeFormatter = new Intl.DateTimeFormat("en-US", { timeZone: SALON_TIME_ZONE, hour: "numeric", minute: "2-digit" });

export async function sendAppointmentConfirmationEmail(details: AppointmentConfirmationDetails): Promise<EmailDeliveryResult> {
  try {
    const { data, error } = await getResendClient().emails.send({
      from: getEmailFrom(),
      to: details.customerEmail,
      subject: `Appointment confirmed – ${details.serviceName.replace(/[\r\n]+/g, " ")}`,
      react: AppointmentConfirmationEmail({
        ...details,
        appointmentDate: dateFormatter.format(details.startDateTime),
        startTime: timeFormatter.format(details.startDateTime),
        endTime: timeFormatter.format(details.endDateTime),
        status: details.status.charAt(0).toUpperCase() + details.status.slice(1),
        salonName: SALON_NAME,
      }),
    });
    if (error || !data?.id) {
      console.error("Appointment confirmation email delivery failed", { provider: "resend", errorType: error?.name ?? "UnknownProviderError" });
      return { success: false, error: "Email delivery failed" };
    }
    return { success: true, emailId: data.id };
  } catch (error: unknown) {
    console.error("Appointment confirmation email delivery failed", { provider: "resend", errorType: error instanceof Error ? error.name : "UnknownError" });
    return { success: false, error: "Email delivery failed" };
  }
}
