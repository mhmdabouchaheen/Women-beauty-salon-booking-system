"use client";

import { CalendarRange, Plus } from "lucide-react";

interface Props {
  onAdd: () => void;
}

export default function AppointmentHeader({
  onAdd,
}: Props) {
  return (
    <div className="flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-rose-700 to-pink-600 p-8 text-white lg:flex-row lg:items-center lg:justify-between">

      <div className="flex items-center gap-5">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">

          <CalendarRange size={30} />

        </div>

        <div>

          <h1 className="text-4xl font-bold">
            Appointments
          </h1>

          <p className="mt-2 text-rose-100">
            Manage customer appointments and assign staff with ease.
          </p>

        </div>

      </div>

      <button
        onClick={onAdd}
        className="flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-rose-700 transition hover:scale-105"
      >
        <Plus size={20} />

        New Appointment

      </button>

    </div>
  );
}