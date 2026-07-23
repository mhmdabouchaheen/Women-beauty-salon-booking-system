"use client";

import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

import { Appointment } from "@/src/data/appointments";

interface Props {
  appointment: Appointment;
  onEdit: (appointment: Appointment) => void;
}

export default function AppointmentMobileCard({
  appointment,
  onEdit,
}: Props) {
  async function handleDelete() {
    const result = await Swal.fire({
      title: "Delete Appointment?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#be185d",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      await Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Appointment deleted successfully.",
        confirmButtonColor: "#be185d",
      });
    }
  }

  return (
    <div className="rounded-3xl border border-rose-100 bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <h3 className="text-lg font-semibold">
          {appointment.customer}
        </h3>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            appointment.status === "Scheduled"
              ? "bg-yellow-100 text-yellow-700"
              : appointment.status === "Completed"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {appointment.status}
        </span>

      </div>

      <div className="mt-5 space-y-2 text-sm text-gray-600">

        <p>

          <span className="font-semibold">
            Services:
          </span>{" "}

          {appointment.services
            .map((service) => service.service)
            .join(", ")}

        </p>

        <p>

          <span className="font-semibold">
            Staff:
          </span>{" "}

          {appointment.services
            .map((service) => service.staff)
            .join(", ")}

        </p>

        <p>

          <span className="font-semibold">
            Date:
          </span>{" "}

          {appointment.services[0]?.date}

        </p>

      </div>

      <div className="mt-6 flex justify-end gap-2">

        <button
          onClick={() => onEdit(appointment)}
          className="rounded-xl bg-amber-50 p-3 text-amber-600 transition hover:bg-amber-100"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={handleDelete}
          className="rounded-xl bg-red-50 p-3 text-red-600 transition hover:bg-red-100"
        >
          <Trash2 size={18} />
        </button>

      </div>

    </div>
  );
}