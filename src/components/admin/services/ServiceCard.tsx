"use client";

import Image from "next/image";
import { Pencil, Trash2, Star, Clock3, DollarSign } from "lucide-react";
import Swal from "sweetalert2";

import { AdminService } from "@/src/data/adminServices";

interface Props {
  service: AdminService;
  onEdit: (service: AdminService) => void;
}

export default function ServiceCard({
  service,
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
      confirmButtonText: "Delete",
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

  function categoryClasses(category: string) {
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

  return (
    <div className="overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm transition hover:shadow-md">

      <div className="relative h-52 w-full">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover"
        />

        {service.featured && (
          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-rose-700 backdrop-blur">
            <Star size={14} fill="currentColor" />
            Featured
          </div>
        )}
      </div>

      <div className="space-y-5 p-6">

        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {service.name}
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              {service.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">

          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${categoryClasses(
              service.category
            )}`}
          >
            {service.category}
          </span>

          {!service.featured && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
              Hidden
            </span>
          )}

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-2xl bg-rose-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-rose-700">
              <Clock3 size={18} />
              <span className="text-sm font-medium">
                Duration
              </span>
            </div>

            <p className="font-semibold text-gray-800">
              {service.duration}
            </p>
          </div>

          <div className="rounded-2xl bg-rose-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-rose-700">
              <DollarSign size={18} />
              <span className="text-sm font-medium">
                Price
              </span>
            </div>

            <p className="text-xl font-bold text-rose-700">
              ${service.price}
            </p>
          </div>

        </div>

        <div className="flex justify-end gap-3 border-t border-rose-100 pt-5">

          <button
            onClick={() => onEdit(service)}
            className="rounded-xl bg-rose-100 p-3 text-rose-700 transition hover:bg-rose-200"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={handleDelete}
            className="rounded-xl bg-red-100 p-3 text-red-600 transition hover:bg-red-200"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}