"use client";

import Image from "next/image";
import { Pencil, Trash2, Star } from "lucide-react";
import Swal from "sweetalert2";

import { AdminService } from "@/src/data/adminServices";
import ServiceCard from "./ServiceCard";

interface Props {
  services: AdminService[];
  onEdit: (service: AdminService) => void;
}

export default function ServiceTable({
  services,
  onEdit,
}: Props) {
  async function handleDelete() {
    const result = await Swal.fire({
      title: "Delete Service?",
      text: "This service will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#be185d",
      cancelButtonColor: "#6b7280",
    });

    if (result.isConfirmed) {
      await Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Service deleted successfully.",
        confirmButtonColor: "#be185d",
      });
    }
  }

  function categoryColor(category: string) {
    switch (category) {
      case "Hair":
        return "bg-pink-100 text-pink-700";

      case "Facial":
        return "bg-purple-100 text-purple-700";

      case "Massage":
        return "bg-amber-100 text-amber-700";

      case "Nails":
        return "bg-rose-100 text-rose-700";

      case "Waxing":
        return "bg-orange-100 text-orange-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  if (services.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-rose-200 bg-white py-24 text-center">
        <h2 className="text-3xl font-semibold">
          No services found
        </h2>

        <p className="mt-4 text-gray-500">
          Try another search.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop */}

      <div className="hidden overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm lg:block">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-rose-50">

              <tr className="text-left text-gray-700">

                <th className="px-8 py-5">Image</th>

                <th className="px-6 py-5">Service</th>

                <th className="px-6 py-5">Category</th>

                <th className="px-6 py-5">Duration</th>

                <th className="px-6 py-5">Price</th>

                <th className="px-6 py-5">
                  Homepage
                </th>

                <th className="px-6 py-5 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {services.map((service) => (

                <tr
                  key={service.id}
                  className="border-b border-rose-100 transition hover:bg-rose-50/40"
                >
                  <td className="px-8 py-5">

                    <div className="relative h-16 w-16 overflow-hidden rounded-2xl">

                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover"
                      />

                    </div>

                  </td>

                  <td className="px-6">

                    <h3 className="font-semibold text-gray-800">
                      {service.name}
                    </h3>

                    <p className="mt-1 max-w-xs text-sm text-gray-500">
                      {service.description}
                    </p>

                  </td>

                  <td className="px-6">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${categoryColor(
                        service.category
                      )}`}
                    >
                      {service.category}
                    </span>

                  </td>

                  <td className="px-6 font-medium text-gray-700">
                    {service.duration}
                  </td>

                  <td className="px-6">

                    <span className="text-lg font-bold text-rose-700">
                      ${service.price}
                    </span>

                  </td>

                  <td className="px-6">

                    {service.featured ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-700">

                        <Star
                          size={14}
                          fill="currentColor"
                        />

                        Featured

                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
                        Hidden
                      </span>
                    )}

                  </td>

                  <td className="px-6">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() =>
                          onEdit(service)
                        }
                        className="rounded-xl bg-rose-100 p-2.5 text-rose-700 transition hover:bg-rose-200"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={handleDelete}
                        className="rounded-xl bg-red-100 p-2.5 text-red-600 transition hover:bg-red-200"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Mobile */}

      <div className="space-y-6 lg:hidden">

        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onEdit={onEdit}
          />
        ))}

      </div>
    </>
  );
}