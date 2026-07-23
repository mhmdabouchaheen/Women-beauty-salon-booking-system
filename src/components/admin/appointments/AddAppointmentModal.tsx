"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CalendarPlus, Plus, Trash2, X } from "lucide-react";

import { customers } from "@/src/data/customers";
import { services } from "@/src/data/services";
import { staff } from "@/src/data/staff";
import { Appointment } from "@/src/data/appointments";

interface ServiceForm {
  id: string;
  service: string;
  staff: string;
  date: string;
  time: string;
}

interface Props {
  open: boolean;
  appointment: Appointment | null;
  editing: boolean;
  title: string;
  onClose: () => void;
}

export default function AddAppointmentModal({
  open,
  appointment,
  editing,
  title,
  onClose,
}: Props) {
  const [customer, setCustomer] = useState("");

  const [status, setStatus] = useState<
    "Scheduled" | "Completed" | "Cancelled"
  >("Scheduled");

  const [appointmentServices, setAppointmentServices] = useState<
    ServiceForm[]
  >([
    {
      id: crypto.randomUUID(),
      service: "",
      staff: "",
      date: "",
      time: "",
    },
  ]);

  useEffect(() => {
  if (!open) return;

  if (editing && appointment) {
    setCustomer(appointment.customer);

    setStatus(appointment.status);

    setAppointmentServices(
      appointment.services.map((service) => ({
        id: crypto.randomUUID(),
        service: service.service,
        staff: service.staff,
        date: service.date,
        time: service.time,
      }))
    );
  } else {
    setCustomer("");

    setStatus("Scheduled");

    setAppointmentServices([
      {
        id: crypto.randomUUID(),
        service: "",
        staff: "",
        date: "",
        time: "",
      },
    ]);
  }
}, [open, editing, appointment]);

  if (!open) return null;

  function addService() {
    setAppointmentServices((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        service: "",
        staff: "",
        date: "",
        time: "",
      },
    ]);
  }

  function removeService(id: string) {
    if (appointmentServices.length === 1) return;

    setAppointmentServices((prev) =>
      prev.filter((service) => service.id !== id)
    );
  }

  function updateService(
    id: string,
    field: keyof ServiceForm,
    value: string
  ) {
    setAppointmentServices((prev) =>
      prev.map((service) =>
        service.id === id
          ? {
              ...service,
              [field]: value,
            }
          : service
      )
    );
  }

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();

    await Swal.fire({
      icon: "success",
      title: editing
        ? "Appointment Updated"
        : "Appointment Created",
      text: editing
        ? "Appointment updated successfully."
        : "Appointment added successfully.",
      confirmButtonColor: "#be185d",
    });

    onClose();
  }
  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5 backdrop-blur-sm">

    <div className="max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-rose-100 p-7">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-rose-100 p-3">

            <CalendarPlus
              className="text-rose-700"
              size={28}
            />

          </div>

          <div>

            <h2 className="text-3xl font-bold">
              {title}
            </h2>

            <p className="text-gray-500">
              Manage appointment details.
            </p>

          </div>

        </div>

        <button
          onClick={onClose}
          className="rounded-full p-2 transition hover:bg-gray-100"
        >
          <X />
        </button>

      </div>

      <form
        onSubmit={submitForm}
        className="space-y-8 p-8"
      >

        {/* Customer */}

        <div>

          <label className="mb-2 block font-medium">
            Customer
          </label>

          <select
            value={customer}
            onChange={(e) =>
              setCustomer(e.target.value)
            }
            className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-300"
          >

            <option value="">
              Select customer
            </option>

            {customers.map((customer) => (

              <option
                key={customer.id}
                value={customer.name}
              >
                {customer.name}
              </option>

            ))}

          </select>

        </div>

        {/* Services */}

        <div className="space-y-6">

          <div className="flex items-center justify-between">

            <h3 className="text-xl font-semibold">
              Services
            </h3>

            <button
              type="button"
              onClick={addService}
              className="flex items-center gap-2 rounded-xl bg-rose-700 px-4 py-2 text-white transition hover:bg-rose-800"
            >

              <Plus size={18} />

              Add Service

            </button>

          </div>
                  {appointmentServices.map((service) => {
          const availableStaff = staff.filter((member) =>
            member.services.includes(service.service)
          );

          return (
            <div
              key={service.id}
              className="rounded-3xl border border-rose-100 p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <h4 className="text-lg font-semibold text-rose-700">
                  Service
                </h4>

                {appointmentServices.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeService(service.id)}
                    className="rounded-xl bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                {/* Service */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Service
                  </label>

                  <select
                    value={service.service}
                    onChange={(e) => {
                      updateService(
                        service.id,
                        "service",
                        e.target.value
                      );

                      updateService(
                        service.id,
                        "staff",
                        ""
                      );

                      updateService(
                        service.id,
                        "time",
                        ""
                      );
                    }}
                    className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-300"
                  >
                    <option value="">
                      Select service
                    </option>

                    {services.map((item) => (
                      <option
                        key={item.id}
                        value={item.title}
                      >
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Staff */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Staff
                  </label>

                  <select
                    value={service.staff}
                    disabled={!service.service}
                    onChange={(e) =>
                      updateService(
                        service.id,
                        "staff",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-300 disabled:bg-gray-100"
                  >
                    <option value="">
                      Select staff
                    </option>

                    {availableStaff.map((member) => (
                      <option
                        key={member.id}
                        value={member.name}
                      >
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Date
                  </label>

                  <input
                    type="date"
                    value={service.date}
                    onChange={(e) =>
                      updateService(
                        service.id,
                        "date",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-300"
                  />
                </div>

                {/* Available Time */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Available Time
                  </label>

                  <select
                    value={service.time}
                    disabled={!service.staff}
                    onChange={(e) =>
                      updateService(
                        service.id,
                        "time",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-300 disabled:bg-gray-100"
                  >
                    <option value="">
                      Select time
                    </option>

                    <option>09:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>01:00 PM</option>
                    <option>02:00 PM</option>
                    <option>03:00 PM</option>
                    <option>04:00 PM</option>
                  </select>
                </div>
              </div>
            </div>
          );
        })}
        </div>
                {/* Status (Edit only) */}

        {editing && (
          <div>
            <label className="mb-2 block font-medium">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as
                    | "Scheduled"
                    | "Completed"
                    | "Cancelled"
                )
              }
              className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-300"
            >
              <option>Scheduled</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
        )}

        {/* Footer */}

        <div className="flex flex-col-reverse gap-3 border-t border-rose-100 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-6 py-3 font-medium transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-xl bg-rose-700 px-6 py-3 font-medium text-white transition hover:bg-rose-800"
          >
            {editing
              ? "Save Changes"
              : "Create Appointment"}
          </button>
        </div>
      </form>
    </div>
  </div>
);
}