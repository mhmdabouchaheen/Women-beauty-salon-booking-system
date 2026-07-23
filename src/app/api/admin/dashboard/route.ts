import { NextResponse } from "next/server";

import { SALON_TIME_ZONE } from "@/src/config/salon";
import { requireAdmin } from "@/src/lib/admin";
import { serverError } from "@/src/lib/api";
import { connectDB } from "@/src/lib/db/mongoose";
import Appointment from "@/src/models/Appointment";
import Service from "@/src/models/Service";
import Staff from "@/src/models/Staff";
import User from "@/src/models/User";

export async function GET() {
  try {
    const authorization = await requireAdmin();
    if (authorization.response) return authorization.response;
    await connectDB();
    const now = new Date();
    const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
    const [appointments, customers, services, staff, recentAppointments] = await Promise.all([
      Appointment.countDocuments({ startDateTime: { $gte: monthStart } }),
      User.countDocuments({ role: "customer" }),
      Service.countDocuments(),
      Staff.countDocuments({ active: { $ne: false } }),
      Appointment.find().populate("userId", "name").populate("serviceId", "name").populate("staffId", "name").sort({ startDateTime: -1 }).limit(8).lean(),
    ]);
    const dateFormatter = new Intl.DateTimeFormat("en-US", { timeZone: SALON_TIME_ZONE, dateStyle: "medium", timeStyle: "short" });
    return NextResponse.json({
      success: true,
      stats: { appointments, customers, services, staff },
      recentAppointments: recentAppointments.map((item) => ({
        id: item._id.toString(),
        customer: typeof item.userId === "object" && "name" in item.userId ? String(item.userId.name) : "Unknown",
        service: typeof item.serviceId === "object" && "name" in item.serviceId ? String(item.serviceId.name) : "Unknown",
        staff: typeof item.staffId === "object" && "name" in item.staffId ? String(item.staffId.name) : "Unknown",
        status: item.status,
        date: dateFormatter.format(item.startDateTime),
      })),
    });
  } catch (error: unknown) {
    return serverError("Loading dashboard failed:", error);
  }
}
