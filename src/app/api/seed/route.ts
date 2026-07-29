import { hash } from "bcryptjs";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { connectDB } from "@/src/lib/db/mongoose";
import Appointment from "@/src/models/Appointment";
import Service from "@/src/models/Service";
import Staff from "@/src/models/Staff";
import {
  createAppointment,
  findAppointmentById,
} from "@/src/repositories/appointment.repository";
import { createService } from "@/src/repositories/service.repository";
import { createStaff } from "@/src/repositories/staff.repository";
import { createUser, findUserByEmail } from "@/src/repositories/user.repository";
import { createAppointmentSchema } from "@/src/validations/appointment.validation";
import { createServiceSchema } from "@/src/validations/service.validation";
import { createStaffSchema } from "@/src/validations/staff.validation";
import { createUserSchema } from "@/src/validations/user.validation";

const CUSTOMER_EMAIL = "seed-customer@beautysalon.test";
const ADMIN_EMAIL = "seed-admin@beautysalon.test";

class SeedConflictError extends Error {}

type PopulatedAppointment = {
  _id: { toString(): string };
  userId: { name: string; email: string };
  serviceId: { name: string; duration: number; price: number };
  staffId: { name: string };
  startDateTime: Date;
  endDateTime: Date;
  status: string;
};

function nextSeedDate(): Date {
  const date = new Date();
  date.setDate(date.getDate() + 2);
  if (date.getDay() === 0) date.setDate(date.getDate() + 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { success: false, message: "The seed endpoint is disabled in production." },
      { status: 403 },
    );
  }

  try {
    await connectDB();
    const created = { users: 0, services: 0, staff: 0, appointments: 0 };
    const reused = { users: 0, services: 0, staff: 0, appointments: 0 };

    async function ensureUser(input: {
      name: string;
      email: string;
      password: string;
      role: "customer" | "admin";
    }) {
      const existing = await findUserByEmail(input.email);
      if (existing) {
        reused.users += 1;
        return existing;
      }
      const validated = createUserSchema.parse(input);
      const user = await createUser({
        ...validated,
        password: await hash(validated.password, 12),
      });
      created.users += 1;
      return user;
    }

    async function ensureService(input: {
      name: string;
      description: string;
      duration: number;
      price: number;
    }) {
      const existing = await Service.findOne({ name: input.name });
      if (existing) {
        reused.services += 1;
        return existing;
      }
      const service = await createService(createServiceSchema.parse(input));
      created.services += 1;
      return service;
    }

    async function ensureStaff(input: {
      name: string;
      specialty: string;
      serviceIds: string[];
      weeklySchedule: Array<{ dayOfWeek: number; startTime: string; endTime: string }>;
    }) {
      const existing = await Staff.findOne({ name: input.name });
      if (existing) {
        existing.specialty = input.specialty;
        existing.serviceIds = input.serviceIds.map((id) => new Types.ObjectId(id));
        existing.weeklySchedule = input.weeklySchedule;
        await existing.save();
        reused.staff += 1;
        return existing;
      }
      const member = await createStaff(createStaffSchema.parse(input));
      created.staff += 1;
      return member;
    }

    const customer = await ensureUser({
      name: "Seed Customer",
      email: CUSTOMER_EMAIL,
      password: "SeedPassword123!",
      role: "customer",
    });
    await ensureUser({
      name: "Seed Admin",
      email: ADMIN_EMAIL,
      password: "SeedAdmin123!",
      role: "admin",
    });

    const hairStyling = await ensureService({
      name: "Hair Styling",
      description: "Professional hair styling service",
      duration: 60,
      price: 45,
    });
    const manicure = await ensureService({
      name: "Manicure",
      description: "Classic manicure and nail care",
      duration: 30,
      price: 25,
    });
    const facialTreatment = await ensureService({
      name: "Facial Treatment",
      description: "Refreshing facial skincare treatment",
      duration: 45,
      price: 40,
    });

    const sara = await ensureStaff({
      name: "Sara Beauty",
      specialty: "Hair Styling and Facial Treatment",
      serviceIds: [hairStyling._id.toString(), facialTreatment._id.toString()],
      weeklySchedule: [1, 2, 3, 4, 5, 6].map((dayOfWeek) => ({ dayOfWeek, startTime: "09:00", endTime: "18:00" })),
    });
    await ensureStaff({
      name: "Lina Nails",
      specialty: "Manicure and Hair Styling",
      serviceIds: [manicure._id.toString(), hairStyling._id.toString()],
      weeklySchedule: [1, 2, 3, 4, 5, 6].map((dayOfWeek) => ({ dayOfWeek, startTime: "09:00", endTime: "18:00" })),
    });

    const appointmentDate = nextSeedDate();
    const baseLookup = {
      userId: customer._id,
      staffId: sara._id,
      appointmentDate,
      status: "booked" as const,
    };
    let mainAppointment = await Appointment.findOne({
      ...baseLookup,
      serviceId: hairStyling._id,
      appointmentTime: "10:00",
    });
    if (mainAppointment) {
      reused.appointments += 1;
    } else {
      const input = createAppointmentSchema.parse({
        userId: customer._id.toString(),
        serviceId: hairStyling._id.toString(),
        staffId: sara._id.toString(),
        appointmentDate,
        appointmentTime: "10:00",
        status: "booked",
      });
      try {
        const populated = await createAppointment(input);
        mainAppointment = await Appointment.findById(populated._id).orFail();
        created.appointments += 1;
      } catch (error: unknown) {
        if (error instanceof Error && error.message.includes("unavailable")) {
          throw new SeedConflictError("The main seed appointment conflicts with existing data.");
        }
        throw error;
      }
    }

    let overlappingAppointmentRejected = false;
    try {
      await createAppointment(
        createAppointmentSchema.parse({
          userId: customer._id.toString(),
          serviceId: hairStyling._id.toString(),
          staffId: sara._id.toString(),
          appointmentDate,
          appointmentTime: "10:30",
          status: "booked",
        }),
      );
    } catch (error: unknown) {
      overlappingAppointmentRejected =
        error instanceof Error && error.message.includes("unavailable");
    }
    if (!overlappingAppointmentRejected) {
      await Appointment.deleteOne({
        ...baseLookup,
        serviceId: hairStyling._id,
        appointmentTime: "10:30",
      });
      throw new SeedConflictError("Overlap verification failed.");
    }

    let backToBack = await Appointment.findOne({
      ...baseLookup,
      serviceId: manicure._id,
      appointmentTime: "11:00",
    });
    if (backToBack) {
      reused.appointments += 1;
    } else {
      try {
        const populated = await createAppointment(
          createAppointmentSchema.parse({
            userId: customer._id.toString(),
            serviceId: manicure._id.toString(),
            staffId: sara._id.toString(),
            appointmentDate,
            appointmentTime: "11:00",
            status: "booked",
          }),
        );
        backToBack = await Appointment.findById(populated._id).orFail();
        created.appointments += 1;
      } catch (error: unknown) {
        if (error instanceof Error && error.message.includes("unavailable")) {
          throw new SeedConflictError("Back-to-back appointment verification failed.");
        }
        throw error;
      }
    }

    const populated = (await findAppointmentById(
      mainAppointment._id.toString(),
    )) as unknown as PopulatedAppointment | null;
    if (!populated) throw new Error("Seed appointment could not be read back");

    const referencesPopulated = Boolean(
      populated.userId?.email && populated.serviceId?.name && populated.staffId?.name,
    );
    const durationCalculationCorrect =
      populated.endDateTime.getTime() - populated.startDateTime.getTime() ===
      populated.serviceId.duration * 60_000;

    return NextResponse.json(
      {
        success: true,
        message: "Database seeded and verified successfully",
        database: "woman-beauty-salon-db",
        created,
        reused,
        verification: {
          databaseConnected: true,
          referencesPopulated,
          durationCalculationCorrect,
          overlappingAppointmentRejected,
          backToBackAppointmentAccepted: Boolean(backToBack),
        },
        sampleAppointment: {
          id: populated._id.toString(),
          customer: { name: populated.userId.name, email: populated.userId.email },
          service: {
            name: populated.serviceId.name,
            duration: populated.serviceId.duration,
            price: populated.serviceId.price,
          },
          staff: { name: populated.staffId.name },
          startDateTime: populated.startDateTime.toISOString(),
          endDateTime: populated.endDateTime.toISOString(),
          status: populated.status,
        },
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Development database seed failed:", error);
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, message: "Seed data did not pass validation." },
        { status: 400 },
      );
    }
    if (error instanceof SeedConflictError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { success: false, message: "Database seeding failed. Check the server logs." },
      { status: 500 },
    );
  }
}
