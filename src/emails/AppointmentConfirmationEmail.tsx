import type { CSSProperties } from "react";

export interface AppointmentConfirmationEmailProps {
  customerName: string;
  customerEmail: string;
  serviceName: string;
  staffName: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: string;
  salonName: string;
}

const bodyStyle: CSSProperties = { backgroundColor: "#f7f2f5", color: "#292329", fontFamily: "Arial, sans-serif", margin: 0, padding: "32px 16px" };
const cardStyle: CSSProperties = { backgroundColor: "#ffffff", borderRadius: "12px", margin: "0 auto", maxWidth: "560px", padding: "32px" };
const labelStyle: CSSProperties = { color: "#6d5d68", fontSize: "13px", margin: "0 0 4px" };
const valueStyle: CSSProperties = { fontSize: "16px", margin: "0 0 18px" };

export function AppointmentConfirmationEmail(props: AppointmentConfirmationEmailProps) {
  return (
    <html lang="en">
      <body style={bodyStyle}>
        <main style={cardStyle}>
          <h1 style={{ color: "#8f3f68", fontSize: "26px", margin: "0 0 16px" }}>Appointment confirmed</h1>
          <p>Hello {props.customerName},</p>
          <p>Your appointment at {props.salonName} is confirmed. We look forward to seeing you.</p>
          <section aria-label="Appointment details" style={{ borderTop: "1px solid #eadde4", marginTop: "24px", paddingTop: "24px" }}>
            <p style={labelStyle}>Service</p><p style={valueStyle}>{props.serviceName}</p>
            <p style={labelStyle}>Staff member</p><p style={valueStyle}>{props.staffName}</p>
            <p style={labelStyle}>Date</p><p style={valueStyle}>{props.appointmentDate}</p>
            <p style={labelStyle}>Time</p><p style={valueStyle}>{props.startTime}–{props.endTime}</p>
            <p style={labelStyle}>Status</p><p style={valueStyle}>{props.status}</p>
            <p style={labelStyle}>Confirmation sent to</p><p style={valueStyle}>{props.customerEmail}</p>
          </section>
        </main>
      </body>
    </html>
  );
}
