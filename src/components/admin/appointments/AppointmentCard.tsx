"use client";

import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

import { Appointment } from "@/src/types/admin-ui";

interface Props {
  appointment: Appointment;
  onEdit: (appointment: Appointment) => void;
}

export default function AppointmentCard({ appointment, onEdit }: Props) {
  async function handleDelete() {
    const result = await Swal.fire({
      title: "Delete Appointment?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#be185d",
      cancelButtonColor: "#6b7280",
    });

    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Deleted",
        confirmButtonColor: "#be185d",
      });
    }
  }

  return (
    <tr className="border-b border-rose-100 hover:bg-rose-50/40">
      <td className="px-8 py-6 font-medium">{appointment.customer}</td>

      <td className="px-6">
        <div className="flex flex-wrap gap-2">
          {appointment.services.map((service) => (
            <span
              key={service.id}
              className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700"
            >
              {service.service}
            </span>
          ))}
        </div>
      </td>

      <td className="px-6">
        <div className="flex flex-wrap gap-2">
          {appointment.services.map((service) => (
            <span
              key={service.id}
              className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-700"
            >
              {service.staff}
            </span>
          ))}
        </div>
      </td>

      <td className="px-6">{appointment.services[0]?.date}</td>

      <td className="px-6">{appointment.services[0]?.time}</td>

      <td className="px-6">
        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            appointment.status === "Scheduled"
              ? "bg-yellow-100 text-yellow-700"
              : appointment.status === "Completed"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {appointment.status}
        </span>
      </td>

      <td className="px-6">
        <div className="flex justify-center gap-3">
          <button
            onClick={() => onEdit(appointment)}
            className="rounded-xl bg-rose-100 p-2.5 text-rose-700 transition hover:bg-rose-700 hover:text-white"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={handleDelete}
            className="rounded-xl bg-red-100 p-2.5 text-red-600 transition hover:bg-red-600 hover:text-white"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}
