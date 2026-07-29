"use client";

import Image from "next/image";
import { Pencil, Trash2, CalendarDays, Clock3 } from "lucide-react";
import Swal from "sweetalert2";

import { StaffMember, apiRequest } from "@/src/types/admin-ui";

interface Props {
  staff: StaffMember;
  onEdit: (staff: StaffMember) => void;
  onDeleted: () => void;
}

export default function StaffCard({
  staff,
  onEdit,
  onDeleted,
}: Props) {
  async function handleDelete() {
    const result = await Swal.fire({
      title: "Delete Staff Member?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#be185d",
    });

    if (result.isConfirmed) {
      try {
        await apiRequest(`/api/staff/${staff.id}`, { method: "DELETE" });
        await Swal.fire({ icon: "success", title: "Deleted", confirmButtonColor: "#be185d" });
        onDeleted();
      } catch (error: unknown) {
        await Swal.fire({ icon: "error", title: "Could not delete staff", text: error instanceof Error ? error.message : "Request failed" });
      }
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

      {/* Image */}

      <div className="relative h-72 w-full">

        <Image
          src={staff.image}
          alt={staff.name}
          fill
          className="object-cover"
        />

      </div>

      <div className="space-y-5 p-6">

        <div>

          <h2 className="text-2xl font-bold">
            {staff.name}
          </h2>

          <span
            className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${
              staff.active
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {staff.active
              ? "Available"
              : "On Leave"}
          </span>

        </div>

        {/* Services */}

        <div>

          <h3 className="mb-3 font-semibold text-gray-700">
            Services
          </h3>

          <div className="flex flex-wrap gap-2">

            {staff.services.map((service) => (

              <span
                key={service}
                className="rounded-full bg-rose-100 px-3 py-1 text-sm text-rose-700"
              >
                {service}
              </span>

            ))}

          </div>

        </div>

        {/* Schedule */}

        <div className="space-y-3">

          <div className="flex items-center gap-2">

            <CalendarDays
              size={18}
              className="text-rose-600"
            />

            <span className="text-sm text-gray-600">
              {staff.workingDays.join(" • ")}
            </span>

          </div>

          <div className="flex items-center gap-2">

            <Clock3
              size={18}
              className="text-rose-600"
            />

            <span className="text-sm text-gray-600">
              {staff.startHour} - {staff.endHour}
            </span>

          </div>

        </div>

        {/* Actions */}

        <div className="flex gap-3 pt-2">

          <button
            onClick={() => onEdit(staff)}
            className="flex-1 rounded-xl bg-rose-100 py-3 font-medium text-rose-700 transition hover:bg-rose-200"
          >
            <div className="flex items-center justify-center gap-2">
              <Pencil size={18} />
              Edit
            </div>
          </button>

          <button
            onClick={handleDelete}
            className="rounded-xl bg-red-100 px-5 text-red-600 transition hover:bg-red-200"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}
