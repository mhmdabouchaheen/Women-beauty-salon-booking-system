"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";

export type BookingStatus = "confirmed" | "completed";

export interface BookingHistoryItem {
  id: string;
  service: string;
  specialist: string;
  date: string;
  time: string;
  price: number;
  status: BookingStatus;
  image: string;
}

interface Props {
  bookings: BookingHistoryItem[];
}

const filters: { label: string; value: "all" | BookingStatus }[] = [
  { label: "All", value: "all" },
  { label: "Upcoming", value: "confirmed" },
  { label: "Completed", value: "completed" },
];

const statusStyles: Record<BookingStatus, string> = {
  confirmed: "bg-secondary-container text-on-secondary-container",
  completed: "bg-surface-container-high text-on-surface-variant",
};

const statusLabels: Record<BookingStatus, string> = {
  confirmed: "Confirmed",
  completed: "Completed",
};

export default function HistoryList({ bookings }: Props) {
  const [activeFilter, setActiveFilter] = useState<"all" | BookingStatus>(
    "all",
  );

  const visible =
    activeFilter === "all"
      ? bookings
      : bookings.filter((b) => b.status === activeFilter);

  // TODO(backend): wire this up to a real "cancel appointment" endpoint
  // (e.g. PATCH /api/appointments/:id) once a backend exists again.
  function handleCancel(id: string) {
    console.log("Cancel appointment", id);
  }

  return (
    <section>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`px-5 py-2 rounded-full font-label-md text-label-md transition-colors ${
              activeFilter === f.value
                ? "bg-primary text-on-primary"
                : "bg-secondary-container/40 text-on-surface-variant hover:bg-secondary-container/70"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="bg-white rounded-[24px] border border-white/40 shadow-[0_4px_20px_rgba(231,84,128,0.05)] p-12 text-center text-on-surface-variant">
          No bookings in this category yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visible.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-[24px] border border-white/40 shadow-[0_4px_20px_rgba(231,84,128,0.05)] overflow-hidden flex flex-col"
            >
              <div className="flex gap-4 p-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden relative shrink-0">
                  <Image
                    src={booking.image}
                    alt={booking.service}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-headline-sm text-[18px] font-semibold text-on-surface leading-tight">
                      {booking.service}
                    </h3>
                    <span
                      className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${statusStyles[booking.status]}`}
                    >
                      {statusLabels[booking.status]}
                    </span>
                  </div>
                  <p className="text-on-surface-variant text-[14px] mt-1">
                    with {booking.specialist}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-[13px] text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {booking.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {booking.time}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between px-6 py-4 border-t border-surface-container">
                <span className="font-bold text-on-surface">
                  ${booking.price.toFixed(2)}
                </span>
                {booking.status === "confirmed" && (
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="px-5 py-2 rounded-full bg-primary text-on-primary font-label-md text-[13px] hover:-translate-y-0.5 transition-transform"
                  >
                    Cancel Appointment
                  </button>
                )}
                {booking.status === "completed" && (
                  <button className="px-5 py-2 rounded-full border border-primary text-primary font-label-md text-[13px] hover:bg-primary hover:text-white transition-colors">
                    Leave a Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
