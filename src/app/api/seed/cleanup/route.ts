import { NextResponse } from "next/server";

import { connectDB } from "@/src/lib/db/mongoose";
import Appointment from "@/src/models/Appointment";
import Service from "@/src/models/Service";
import Staff from "@/src/models/Staff";
import User from "@/src/models/User";

const SEED_EMAILS = [
  "seed-customer@beautysalon.test",
  "seed-admin@beautysalon.test",
];
const SEED_SERVICES = ["Hair Styling", "Manicure", "Facial Treatment"];
const SEED_STAFF = ["Sara Beauty", "Lina Nails"];

export async function DELETE() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { success: false, message: "The seed cleanup endpoint is disabled in production." },
      { status: 403 },
    );
  }

  try {
    await connectDB();
    const users = await User.find({ email: { $in: SEED_EMAILS } }).select("_id");
    const services = await Service.find({ name: { $in: SEED_SERVICES } }).select("_id");
    const staff = await Staff.find({ name: { $in: SEED_STAFF } }).select("_id");

    const appointments = await Appointment.deleteMany({
      userId: { $in: users.map((item) => item._id) },
      serviceId: { $in: services.map((item) => item._id) },
      staffId: { $in: staff.map((item) => item._id) },
    });
    const deletedUsers = await User.deleteMany({ email: { $in: SEED_EMAILS } });
    const deletedStaff = await Staff.deleteMany({ name: { $in: SEED_STAFF } });
    const deletedServices = await Service.deleteMany({ name: { $in: SEED_SERVICES } });

    return NextResponse.json({
      success: true,
      message: "Seed records cleaned up successfully",
      deleted: {
        appointments: appointments.deletedCount,
        users: deletedUsers.deletedCount,
        staff: deletedStaff.deletedCount,
        services: deletedServices.deletedCount,
      },
    });
  } catch (error: unknown) {
    console.error("Development seed cleanup failed:", error);
    return NextResponse.json(
      { success: false, message: "Seed cleanup failed. Check the server logs." },
      { status: 500 },
    );
  }
}
