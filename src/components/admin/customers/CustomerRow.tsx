"use client";

import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";

import { Customer, apiRequest } from "@/src/types/admin-ui";

interface Props {
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDeleted: () => void;
}

export default function CustomerRow({
  customer,
  onEdit,
  onDeleted,
}: Props) {
  async function handleDelete() {
    const result = await Swal.fire({
      title: "Delete Customer?",
      text: "This customer will be removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#be185d",
      cancelButtonColor: "#6b7280",
    });

    if (result.isConfirmed) {
      try {
        await apiRequest(`/api/admin/customers/${customer.id}`, { method: "DELETE" });
        await Swal.fire({ icon: "success", title: "Customer Deleted", confirmButtonColor: "#be185d" });
        onDeleted();
      } catch (error: unknown) {
        await Swal.fire({ icon: "error", title: "Could not delete customer", text: error instanceof Error ? error.message : "Request failed" });
      }
    }
  }

  return (
    <tr className="border-b border-rose-100 transition hover:bg-rose-50/40">

      <td className="px-8 py-5">

        <div className="flex items-center gap-4">

          <Image
            src={customer.image}
            alt={customer.name}
            width={56}
            height={56}
            unoptimized
            className="h-14 w-14 rounded-2xl border border-rose-100 object-cover"
          />

          <div>

            <h3 className="font-semibold">
              {customer.name}
            </h3>

            <p className="text-sm text-gray-500">
              {customer.email}
            </p>

          </div>

        </div>

      </td>

      <td className="px-6">

        <span className="rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700">

          {customer.appointments} Visits

        </span>

      </td>

      <td className="px-6">

        <span className="rounded-full bg-pink-50 px-4 py-2 text-sm font-medium text-pink-700">

          {customer.lastAppointment}

        </span>

      </td>

      <td className="px-6">

        <div className="flex justify-center gap-3">

          <button
            onClick={() => onEdit(customer)}
            className="rounded-xl bg-amber-50 p-2 text-amber-600 transition hover:bg-amber-100"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={handleDelete}
            className="rounded-xl bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </td>

    </tr>
  );
}
