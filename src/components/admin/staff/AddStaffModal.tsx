"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { UserPlus, X } from "lucide-react";

import { AdminService, StaffMember, apiRequest } from "@/src/types/admin-ui";
import ImageUploadField from "@/src/components/admin/shared/ImageUploadField";

interface Props {
  open: boolean;
  editing: boolean;
  staff: StaffMember | null;
  onClose: () => void;
  onSaved: () => void;
  services: AdminService[];
}

export default function AddStaffModal({
  open,
  editing,
  staff,
  onClose,
  onSaved,
  services,
}: Props) {
  const [name, setName] = useState(staff?.name ?? "");
  const [image, setImage] = useState(staff?.image ?? "");
  const [selectedServices, setSelectedServices] = useState<string[]>(staff?.services ?? []);
  const [workingDays, setWorkingDays] = useState<string[]>(staff?.workingDays ?? []);
  const [startHour, setStartHour] = useState(staff?.startHour ?? "09:00");
  const [endHour, setEndHour] = useState(staff?.endHour ?? "17:00");
  const [active, setActive] = useState(staff?.active ?? true);
  const [holidayDates, setHolidayDates] = useState(
    staff?.holidays.map(({ date }) => date).join(", ") ?? "",
  );

  if (!open) return null;

  const days = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];

  function toggleService(service: string) {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((item) => item !== service)
        : [...prev, service]
    );
  }

  function toggleDay(day: string) {
    setWorkingDays((prev) =>
      prev.includes(day)
        ? prev.filter((item) => item !== day)
        : [...prev, day]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const dayNumbers: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      await apiRequest(editing && staff ? `/api/staff/${staff.id}` : "/api/staff", {
        method: editing ? "PATCH" : "POST",
        body: JSON.stringify({
          name,
          specialty: selectedServices.join(", ") || "General",
          image,
          active,
          serviceIds: services.filter((item) => selectedServices.includes(item.name)).map((item) => item.id),
          weeklySchedule: workingDays.map((day) => ({ dayOfWeek: dayNumbers[day], startTime: startHour, endTime: endHour })),
          holidays: holidayDates
            .split(",")
            .map((date) => date.trim())
            .filter(Boolean)
            .map((date) => ({ date })),
        }),
      });
      await Swal.fire({ icon: "success", title: editing ? "Staff Updated" : "Staff Added", confirmButtonColor: "#be185d" });
      onSaved();
      onClose();
    } catch (error: unknown) {
      await Swal.fire({ icon: "error", title: "Could not save staff", text: error instanceof Error ? error.message : "Request failed" });
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5 backdrop-blur-sm">

      <div className="max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-rose-100 p-7">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-rose-100 p-3">

              <UserPlus
                size={28}
                className="text-rose-700"
              />

            </div>

            <div>

              <h2 className="text-3xl font-bold">

                {editing ? "Edit Staff" : "Add Staff"}

              </h2>

              <p className="text-gray-500">
                Manage your salon experts.
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 p-8"
        >

          {/* Basic */}

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block font-medium">
                Full Name
              </label>

              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full rounded-xl border border-gray-200 p-3 focus:border-rose-400 outline-none"
              />

            </div>

            <ImageUploadField label="Staff Image" value={image} onChange={setImage} />

          </div>

          {/* Services */}

          <div>

            <h3 className="mb-4 text-lg font-semibold">
              Assigned Services
            </h3>

            <div className="grid gap-3 md:grid-cols-2">

              {services.map((service) => (

                <button
                  key={service.id}
                  type="button"
                  onClick={() =>
                    toggleService(service.name)
                  }
                  className={`rounded-xl border p-3 transition ${
                    selectedServices.includes(service.name)
                      ? "border-rose-700 bg-rose-100 text-rose-700"
                      : "border-gray-200"
                  }`}
                >
                  {service.name}
                </button>

              ))}

            </div>

          </div>

          {/* Days */}

          <div>

            <h3 className="mb-4 text-lg font-semibold">
              Working Days
            </h3>

            <div className="flex flex-wrap gap-3">

              {days.map((day) => (

                <button
                  key={day}
                  type="button"
                  onClick={() =>
                    toggleDay(day)
                  }
                  className={`rounded-full px-5 py-2 transition ${
                    workingDays.includes(day)
                      ? "bg-rose-700 text-white"
                      : "border border-gray-200"
                  }`}
                >
                  {day}
                </button>

              ))}

            </div>

          </div>

          {/* Hours */}

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block font-medium">
                Start Hour
              </label>

              <input
                type="time"
                value={startHour}
                onChange={(e) =>
                  setStartHour(e.target.value)
                }
                className="w-full rounded-xl border border-gray-200 p-3"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                End Hour
              </label>

              <input
                type="time"
                value={endHour}
                onChange={(e) =>
                  setEndHour(e.target.value)
                }
                className="w-full rounded-xl border border-gray-200 p-3"
              />

            </div>

          </div>

          {/* Status */}

          <div>
            <label className="mb-2 block font-medium">Holiday Dates</label>
            <input
              value={holidayDates}
              onChange={(event) => setHolidayDates(event.target.value)}
              placeholder="2026-08-15, 2026-12-25"
              className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-400"
            />
            <p className="mt-2 text-sm text-gray-500">Enter salon-local dates in YYYY-MM-DD format, separated by commas.</p>
          </div>

          <div className="rounded-2xl border border-rose-100 bg-rose-50 p-5">

            <div className="flex items-center justify-between">

              <div>

                <h3 className="font-semibold">
                  Available for Booking
                </h3>

                <p className="text-sm text-gray-500">
                  Customers can book this staff member.
                </p>

              </div>

              <button
                type="button"
                onClick={() => setActive(!active)}
                className={`relative h-7 w-14 rounded-full transition ${
                  active
                    ? "bg-rose-700"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                    active
                      ? "left-8"
                      : "left-1"
                  }`}
                />
              </button>

            </div>

          </div>

          {/* Footer */}

          <div className="flex justify-end gap-4 border-t border-rose-100 pt-6">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-6 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-rose-700 px-7 py-3 font-medium text-white hover:bg-rose-800"
            >
              {editing ? "Save Changes" : "Add Staff"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
