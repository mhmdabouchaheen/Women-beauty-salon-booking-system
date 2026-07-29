"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Banknote, CalendarPlus, CreditCard, LoaderCircle, Plus, Trash2, X } from "lucide-react";

type ServiceOption = {
  _id: string;
  name: string;
  duration: number;
  price: number;
};

type StaffOption = {
  _id: string;
  name: string;
  specialty: string;
  serviceIds: Array<{ _id: string; name: string }>;
};

type Availability = {
  workingDates: Array<{ date: string; label: string }>;
  timeSlots: Array<{ time: string; label: string }>;
};

interface ServiceForm {
  rowId: string;
  serviceId: string;
  staffId: string;
  date: string;
  time: string;
  availability: Availability;
  loadingAvailability: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

function emptyRow(serviceId = ""): ServiceForm {
  return {
    rowId: Math.random().toString(36).slice(2),
    serviceId,
    staffId: "",
    date: "",
    time: "",
    availability: { workingDates: [], timeSlots: [] },
    loadingAvailability: false,
  };
}

export default function NewAppointmentModal({ open, onClose, initialServiceId }: Props) {
  const router = useRouter();
  const [services, setServices] = useState<ServiceOption[]>([]);
  const [staff, setStaff] = useState<StaffOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [rows, setRows] = useState<ServiceForm[]>(() => [emptyRow(initialServiceId)]);
  const [paymentMethod, setPaymentMethod] = useState<"salon" | "stripe">("salon");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    async function loadOptions() {
      setLoadingOptions(true);
      try {
        const [serviceResponse, staffResponse] = await Promise.all([
          fetch("/api/services", { cache: "no-store" }),
          fetch("/api/staff", { cache: "no-store" }),
        ]);
        const serviceData = (await serviceResponse.json()) as { services?: ServiceOption[]; message?: string };
        const staffData = (await staffResponse.json()) as { staff?: StaffOption[]; message?: string };
        if (!serviceResponse.ok) throw new Error(serviceData.message ?? "Could not load services.");
        if (!staffResponse.ok) throw new Error(staffData.message ?? "Could not load staff.");
        setServices(serviceData.services ?? []);
        setStaff(staffData.staff ?? []);
      } catch (error: unknown) {
        await Swal.fire({
          icon: "error",
          title: "Could not load booking options",
          text: error instanceof Error ? error.message : "Request failed",
          confirmButtonColor: "#be185d",
        });
      } finally {
        setLoadingOptions(false);
      }
    }
    void loadOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  function resetAndClose() {
    setRows([emptyRow()]);
    setPaymentMethod("salon");
    onClose();
  }

  function addService() {
    setRows((prev) => [...prev, emptyRow()]);
  }

  function removeService(rowId: string) {
    if (rows.length === 1) return;
    setRows((prev) => prev.filter((row) => row.rowId !== rowId));
  }

  function patchRow(rowId: string, patch: Partial<ServiceForm>) {
    setRows((prev) => prev.map((row) => (row.rowId === rowId ? { ...row, ...patch } : row)));
  }

  async function loadAvailability(rowId: string, serviceId: string, staffId: string, date = "") {
    if (!serviceId || !staffId) return;
    patchRow(rowId, { loadingAvailability: true });
    try {
      const params = new URLSearchParams({ serviceId, staffId });
      if (date) params.set("date", date);
      const response = await fetch(`/api/appointments/availability?${params.toString()}`, { cache: "no-store" });
      const result = (await response.json()) as Availability & { message?: string };
      if (!response.ok) throw new Error(result.message ?? "Could not load availability.");
      patchRow(rowId, {
        availability: { workingDates: result.workingDates ?? [], timeSlots: result.timeSlots ?? [] },
      });
    } catch {
      patchRow(rowId, { availability: { workingDates: [], timeSlots: [] } });
    } finally {
      patchRow(rowId, { loadingAvailability: false });
    }
  }

  function staffFor(serviceId: string) {
    return staff.filter((member) => member.serviceIds.some((service) => service._id === serviceId));
  }

  async function submitForm(event: React.FormEvent) {
    event.preventDefault();
    for (const row of rows) {
      if (!row.serviceId || !row.staffId || !row.date || !row.time) {
        await Swal.fire({
          icon: "error",
          title: "Missing details",
          text: "Fill in every service, expert, date, and time.",
          confirmButtonColor: "#be185d",
        });
        return;
      }
    }

    setSubmitting(true);
    try {
      if (paymentMethod === "stripe") {
        const row = rows[0];
        const response = await fetch("/api/payments/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            serviceId: row.serviceId,
            staffId: row.staffId,
            appointmentDate: row.date,
            appointmentTime: row.time,
          }),
        });
        const result = (await response.json()) as { message?: string; url?: string };
        if (!response.ok) throw new Error(result.message ?? "Appointment could not be created.");
        if (!result.url) throw new Error("Stripe Checkout URL was not returned.");
        window.location.assign(result.url);
        return;
      }

      for (const row of rows) {
        const response = await fetch("/api/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            serviceId: row.serviceId,
            staffId: row.staffId,
            appointmentDate: row.date,
            appointmentTime: row.time,
          }),
        });
        const result = (await response.json()) as { message?: string };
        if (!response.ok) throw new Error(result.message ?? "Appointment could not be created.");
      }

      await Swal.fire({
        icon: "success",
        title: "Appointment Booked",
        text: "You'll pay in cash at the salon.",
        confirmButtonColor: "#be185d",
      });
      resetAndClose();
      router.push("/dashboard/appointments");
      router.refresh();
    } catch (error: unknown) {
      await Swal.fire({
        icon: "error",
        title: "Could not book appointment",
        text: error instanceof Error ? error.message : "Request failed",
        confirmButtonColor: "#be185d",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5 backdrop-blur-sm">
      <div className="max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-rose-100 p-7">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-rose-100 p-3">
              <CalendarPlus className="text-rose-700" size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold">New Appointment</h2>
              <p className="text-gray-500">Book a service with your favorite expert.</p>
            </div>
          </div>
          <button onClick={resetAndClose} className="rounded-full p-2 transition hover:bg-gray-100">
            <X />
          </button>
        </div>

        {loadingOptions ? (
          <div className="flex min-h-64 items-center justify-center text-rose-700">
            <LoaderCircle size={30} className="animate-spin" />
          </div>
        ) : (
          <form onSubmit={submitForm} className="space-y-8 p-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Services</h3>
                <button
                  type="button"
                  onClick={addService}
                  disabled={paymentMethod === "stripe"}
                  className="flex items-center gap-2 rounded-xl bg-rose-700 px-4 py-2 text-white transition hover:bg-rose-800 disabled:opacity-40"
                >
                  <Plus size={18} />
                  Add Service
                </button>
              </div>

              {rows.map((row) => {
                const availableStaff = staffFor(row.serviceId);
                return (
                  <div key={row.rowId} className="rounded-3xl border border-rose-100 p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-rose-700">Service</h4>
                      {rows.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeService(row.rowId)}
                          className="rounded-xl bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>

                    <div className="grid gap-5 lg:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium">Service</label>
                        <select
                          value={row.serviceId}
                          onChange={(e) =>
                            patchRow(row.rowId, {
                              serviceId: e.target.value,
                              staffId: "",
                              date: "",
                              time: "",
                              availability: { workingDates: [], timeSlots: [] },
                            })
                          }
                          className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-300"
                        >
                          <option value="">Select service</option>
                          {services.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item.name} &middot; ${item.price.toFixed(2)} &middot; {item.duration} min
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium">Expert</label>
                        <select
                          disabled={!row.serviceId}
                          value={row.staffId}
                          onChange={(e) => {
                            const staffId = e.target.value;
                            patchRow(row.rowId, { staffId, date: "", time: "", availability: { workingDates: [], timeSlots: [] } });
                            if (staffId) void loadAvailability(row.rowId, row.serviceId, staffId);
                          }}
                          className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-300 disabled:bg-gray-100"
                        >
                          <option value="">Select expert</option>
                          {availableStaff.map((member) => (
                            <option key={member._id} value={member._id}>
                              {member.name} &middot; {member.specialty}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium">Date</label>
                        <select
                          disabled={!row.staffId || row.loadingAvailability}
                          value={row.date}
                          onChange={(e) => {
                            const date = e.target.value;
                            patchRow(row.rowId, { date, time: "" });
                            if (date) void loadAvailability(row.rowId, row.serviceId, row.staffId, date);
                          }}
                          className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-300 disabled:bg-gray-100"
                        >
                          <option value="">
                            {row.loadingAvailability ? "Loading working days…" : "Select working day"}
                          </option>
                          {row.availability.workingDates.map((item) => (
                            <option key={item.date} value={item.date}>{item.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium">Available Time</label>
                        <select
                          disabled={!row.date || row.loadingAvailability}
                          value={row.time}
                          onChange={(e) => patchRow(row.rowId, { time: e.target.value })}
                          className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-300 disabled:bg-gray-100"
                        >
                          <option value="">{row.loadingAvailability ? "Checking free times…" : "Select time"}</option>
                          {row.availability.timeSlots.map((slot) => (
                            <option key={slot.time} value={slot.time}>{slot.label}</option>
                          ))}
                        </select>
                        {row.date && !row.loadingAvailability && row.availability.timeSlots.length === 0 && (
                          <span className="mt-2 block text-sm text-amber-700">No free times on this date.</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Payment Method</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("salon")}
                  className={`flex items-center gap-4 rounded-xl border p-4 text-left transition ${
                    paymentMethod === "salon" ? "border-rose-700 bg-rose-50" : "border-gray-200 hover:border-rose-300"
                  }`}
                >
                  <Banknote size={22} className="text-rose-700" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Pay at the Salon</p>
                    <p className="text-sm text-gray-500">No online charge is made.</p>
                  </div>
                  <span className={`h-4 w-4 rounded-full border-2 ${paymentMethod === "salon" ? "border-rose-700 bg-rose-700" : "border-gray-300"}`} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod("stripe");
                    setRows((prev) => [prev[0]]);
                  }}
                  className={`flex items-center gap-4 rounded-xl border p-4 text-left transition ${
                    paymentMethod === "stripe" ? "border-rose-700 bg-rose-50" : "border-gray-200 hover:border-rose-300"
                  }`}
                >
                  <CreditCard size={22} className="text-rose-700" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Pay with Stripe</p>
                    <p className="text-sm text-gray-500">Secure checkout, one service per session.</p>
                  </div>
                  <span className={`h-4 w-4 rounded-full border-2 ${paymentMethod === "stripe" ? "border-rose-700 bg-rose-700" : "border-gray-300"}`} />
                </button>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-rose-100 pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={resetAndClose}
                className="rounded-xl border border-gray-200 px-6 py-3 font-medium transition hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-700 px-6 py-3 font-medium text-white transition hover:bg-rose-800 disabled:opacity-60"
              >
                {submitting && <LoaderCircle size={18} className="animate-spin" />}
                {paymentMethod === "stripe" ? "Continue to Stripe" : "Book Appointment"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
