"use client";

import { Appointment } from "@/src/types/admin-ui";
import AppointmentCard from "./AppointmentCard";
import AppointmentMobileCard from "./AppointmentMobileCard";

interface Props {
  appointments: Appointment[];
  onEdit: (appointment: Appointment) => void;
}

export default function AppointmentList({
  appointments,
  onEdit,
}: Props) {
  if (appointments.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-rose-200 bg-white py-24 text-center">
        <h2 className="text-3xl font-semibold">
          No appointments found
        </h2>

        <p className="mt-4 text-gray-500">
          Try another search or create a new appointment.
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

            <thead className="bg-rose-50 text-gray-700">
              <tr>
                <th className="px-8 py-5 text-left">
                  Customer
                </th>

                <th className="px-6 py-5 text-left">
                  Services
                </th>

                <th className="px-6 py-5 text-left">
                  Assigned Staff
                </th>

                <th className="px-6 py-5 text-left">
                  Date
                </th>

                <th className="px-6 py-5 text-left">
                  Time
                </th>

                <th className="px-6 py-5 text-left">
                  Status
                </th>

                <th className="px-6 py-5 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onEdit={onEdit}
                />
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* Mobile */}

      <div className="space-y-5 lg:hidden">
        {appointments.map((appointment) => (
          <AppointmentMobileCard
            key={appointment.id}
            appointment={appointment}
            onEdit={onEdit}
          />
        ))}
      </div>
    </>
  );
}
