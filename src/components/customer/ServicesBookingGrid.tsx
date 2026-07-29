"use client";

import { useState } from "react";
import DashboardServiceCard, { type DashboardService } from "./DashboardServiceCard";
import NewAppointmentModal from "./NewAppointmentModal";

interface Props {
  services: DashboardService[];
}

export default function ServicesBookingGrid({ services }: Props) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);

  function handleBook(service: DashboardService) {
    setSelectedServiceId(service._id);
    setBookingOpen(true);
  }

  return (
    <>
      {services.length === 0 ? (
        <div className="rounded-3xl border border-rose-100 bg-white p-12 text-center text-gray-600">
          No services are available right now.
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <DashboardServiceCard key={service._id} service={service} onBook={handleBook} />
          ))}
        </div>
      )}

      <NewAppointmentModal
        key={bookingOpen ? selectedServiceId : "closed"}
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialServiceId={selectedServiceId}
      />
    </>
  );
}
