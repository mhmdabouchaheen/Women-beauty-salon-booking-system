"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CalendarPlus, Plus, Trash2, X } from "lucide-react";

import { Appointment, apiRequest } from "@/src/types/admin-ui";

interface ServiceForm {
  id: string;
  service: string;
  staff: string;
  date: string;
  time: string;
}

interface AvailabilityState {
  workingDates: Array<{ date: string; label: string }>;
  timeSlots: Array<{ time: string; label: string }>;
  loading: boolean;
  error?: string;
}

interface Props {
  open: boolean;
  appointment: Appointment | null;
  editing: boolean;
  title: string;
  onClose: () => void;
  onSaved: () => void;
}

export default function AddAppointmentModal({
  open,
  appointment,
  editing,
  title,
  onClose,
  onSaved,
}: Props) {
  const [customer, setCustomer] = useState("");

  const [status, setStatus] = useState<
    "Scheduled" | "Completed" | "Cancelled"
  >(appointment?.status ?? "Scheduled");
  const [customers, setCustomers] = useState<Array<{ id: string; name: string }>>([]);
  const [services, setServices] = useState<Array<{ id: string; title: string }>>([]);
  const [staff, setStaff] = useState<Array<{ id: string; name: string; services: string[] }>>([]);
  const [availability, setAvailability] = useState<Record<string, AvailabilityState>>({});

  useEffect(() => {
    if (!open) return;
    void Promise.all([
      apiRequest<{ customers: Array<{ _id: string; name: string }> }>("/api/admin/customers"),
      apiRequest<{ services: Array<{ _id: string; name: string }> }>("/api/services"),
      apiRequest<{ staff: Array<{ _id: string; name: string; serviceIds: Array<{ name: string }> }> }>("/api/staff"),
    ]).then(([customerData, serviceData, staffData]) => {
      setCustomers(customerData.customers.map((item) => ({ id: item._id, name: item.name })));
      setServices(serviceData.services.map((item) => ({ id: item._id, title: item.name })));
      setStaff(staffData.staff.map((item) => ({ id: item._id, name: item.name, services: item.serviceIds.map((service) => service.name) })));
    });
  }, [open]);

  const [appointmentServices, setAppointmentServices] = useState<
    ServiceForm[]
  >(appointment?.services.map((service) => ({ ...service, id: crypto.randomUUID() })) ?? [{
    id: crypto.randomUUID(), service: "", staff: "", date: "", time: "",
  }]);

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

  async function loadAvailability(
    rowId: string,
    serviceName: string,
    staffName: string,
    date: string,
    customerId = customer,
  ) {
    const serviceRecord = services.find((item) => item.title === serviceName);
    const staffRecord = staff.find((item) => item.name === staffName);
    if (!serviceRecord || !staffRecord || !customerId) {
      setAvailability((current) => ({
        ...current,
        [rowId]: { workingDates: [], timeSlots: [], loading: false },
      }));
      return;
    }
    setAvailability((current) => ({
      ...current,
      [rowId]: {
        workingDates: current[rowId]?.workingDates ?? [],
        timeSlots: [],
        loading: true,
      },
    }));
    try {
      const params = new URLSearchParams({
        staffId: staffRecord.id,
        serviceId: serviceRecord.id,
        userId: customerId,
      });
      if (date) params.set("date", date);
      const result = await apiRequest<{
        workingDates: Array<{ date: string; label: string }>;
        timeSlots: Array<{ time: string; label: string }>;
      }>(`/api/appointments/availability?${params.toString()}`);
      setAvailability((current) => ({
        ...current,
        [rowId]: { ...result, loading: false },
      }));
    } catch (error: unknown) {
      setAvailability((current) => ({
        ...current,
        [rowId]: {
          workingDates: [],
          timeSlots: [],
          loading: false,
          error: error instanceof Error ? error.message : "Availability could not be loaded.",
        },
      }));
    }
  }

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (editing && appointment) {
        const apiStatus = status === "Cancelled" ? "cancelled" : status === "Completed" ? "completed" : "booked";
        await apiRequest(`/api/appointments/${appointment.id}`, { method: "PATCH", body: JSON.stringify({ status: apiStatus }) });
      } else {
        const customerRecord = customers.find((item) => item.id === customer);
        if (!customerRecord) throw new Error("Select a customer");
        for (const item of appointmentServices) {
          const serviceRecord = services.find((service) => service.title === item.service);
          const staffRecord = staff.find((member) => member.name === item.staff);
          if (!serviceRecord || !staffRecord) throw new Error("Select a valid service and staff member");
          await apiRequest("/api/appointments", {
            method: "POST",
            body: JSON.stringify({
              userId: customerRecord.id,
              serviceId: serviceRecord.id,
              staffId: staffRecord.id,
              appointmentDate: item.date,
              appointmentTime: item.time,
            }),
          });
        }
      }
      await Swal.fire({ icon: "success", title: editing ? "Appointment Updated" : "Appointment Created", confirmButtonColor: "#be185d" });
      onSaved();
      onClose();
    } catch (error: unknown) {
      await Swal.fire({ icon: "error", title: "Could not save appointment", text: error instanceof Error ? error.message : "Request failed" });
    }
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

          {editing ? (
            <div className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3">
              {appointment?.customer}
            </div>
          ) : <select
            value={customer}
            required
            onChange={(e) => {
              const customerId = e.target.value;
              setCustomer(customerId);
              setAppointmentServices((current) =>
                current.map((item) => ({ ...item, time: "" })),
              );
              appointmentServices.forEach((item) => {
                if (item.service && item.staff) {
                  void loadAvailability(item.id, item.service, item.staff, item.date, customerId);
                }
              });
            }}
            className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-300"
          >

            <option value="">
              Select customer
            </option>

            {customers.map((customer) => (

              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.name}
              </option>

            ))}

          </select>}

        </div>

        {/* Services */}

        {!editing && <div className="space-y-6">

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
                        "date",
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
                    onChange={(e) => {
                      updateService(
                        service.id,
                        "staff",
                        e.target.value
                      );
                      updateService(service.id, "date", "");
                      updateService(service.id, "time", "");
                      void loadAvailability(
                        service.id,
                        service.service,
                        e.target.value,
                        "",
                      );
                    }}
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

                  <select
                    value={service.date}
                    required
                    disabled={!customer || !service.staff || availability[service.id]?.loading}
                    onChange={(e) => {
                      updateService(
                        service.id,
                        "date",
                        e.target.value
                      );
                      updateService(service.id, "time", "");
                      void loadAvailability(
                        service.id,
                        service.service,
                        service.staff,
                        e.target.value,
                      );
                    }}
                    className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-300 disabled:bg-gray-100"
                  >
                    <option value="">
                      {availability[service.id]?.loading ? "Loading working days…" : "Select working day"}
                    </option>
                    {(availability[service.id]?.workingDates ?? []).map((item) => (
                      <option key={item.date} value={item.date}>{item.label}</option>
                    ))}
                  </select>
                </div>

                {/* Available Time */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Available Time
                  </label>

                  <select
                    value={service.time}
                    required
                    disabled={!service.date || availability[service.id]?.loading}
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
                      {availability[service.id]?.loading ? "Checking availability…" : "Select free time"}
                    </option>
                    {(availability[service.id]?.timeSlots ?? []).map((slot) => (
                      <option key={slot.time} value={slot.time}>{slot.label}</option>
                    ))}
                  </select>
                  {service.date && !availability[service.id]?.loading && availability[service.id]?.timeSlots.length === 0 && (
                    <p className="mt-2 text-sm text-amber-700">No mutually free times are available on this date.</p>
                  )}
                  {availability[service.id]?.error && (
                    <p className="mt-2 text-sm text-red-600">{availability[service.id].error}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        </div>}
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
