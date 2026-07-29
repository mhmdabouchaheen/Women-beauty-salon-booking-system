"use client";

import Image from "next/image";
import { Clock } from "lucide-react";

export interface DashboardService {
  _id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  image: string;
}

interface Props {
  service: DashboardService;
  onBook: (service: DashboardService) => void;
}

export default function DashboardServiceCard({ service, onBook }: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Image src={service.image} alt={service.name} fill className="object-cover" />
      </div>

      <div className="p-6">
        <h3 className="mb-2 text-xl font-semibold text-gray-900">{service.name}</h3>
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">{service.description}</p>

        <div className="mb-5 flex items-center justify-between">
          <p className="font-bold text-rose-700">${service.price.toFixed(2)}</p>
          <span className="flex items-center gap-1 text-sm text-gray-500">
            <Clock size={14} />
            {service.duration} min
          </span>
        </div>

        <button
          onClick={() => onBook(service)}
          className="w-full rounded-xl border border-rose-700 py-2.5 font-medium text-rose-700 transition hover:bg-rose-700 hover:text-white"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
