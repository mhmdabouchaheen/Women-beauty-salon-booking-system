"use client";

import { CalendarPlus, CreditCard, LoaderCircle, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

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

export default function CustomerBookingForm() {
  const router = useRouter();
  const [services, setServices] = useState<ServiceOption[]>([]);
  const [staff, setStaff] = useState<StaffOption[]>([]);
  const [serviceId, setServiceId] = useState("");
  const [staffId, setStaffId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availability, setAvailability] = useState<Availability>({
    workingDates: [],
    timeSlots: [],
  });
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"salon" | "stripe">("salon");

  useEffect(() => {
    async function loadOptions() {
      try {
        const [serviceResponse, staffResponse] = await Promise.all([
          fetch("/api/services", { cache: "no-store" }),
          fetch("/api/staff", { cache: "no-store" }),
        ]);
        const serviceData = await serviceResponse.json() as { services?: ServiceOption[]; message?: string };
        const staffData = await staffResponse.json() as { staff?: StaffOption[]; message?: string };
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
  }, []);

  const selectedService = services.find((service) => service._id === serviceId);
  const availableStaff = useMemo(
    () =>
      staff.filter((member) =>
        member.serviceIds.some((service) => service._id === serviceId),
      ),
    [serviceId, staff],
  );

  async function loadAvailability(selectedStaffId: string, selectedDate = "") {
    if (!serviceId || !selectedStaffId) return;
    setLoadingAvailability(true);
    try {
      const params = new URLSearchParams({ serviceId, staffId: selectedStaffId });
      if (selectedDate) params.set("date", selectedDate);
      const response = await fetch(`/api/appointments/availability?${params.toString()}`, {
        cache: "no-store",
      });
      const result = await response.json() as Availability & { message?: string };
      if (!response.ok) throw new Error(result.message ?? "Could not load availability.");
      setAvailability({
        workingDates: result.workingDates ?? [],
        timeSlots: result.timeSlots ?? [],
      });
    } catch (error: unknown) {
      setAvailability({ workingDates: [], timeSlots: [] });
      await Swal.fire({
        icon: "error",
        title: "Could not load availability",
        text: error instanceof Error ? error.message : "Request failed",
        confirmButtonColor: "#be185d",
      });
    } finally {
      setLoadingAvailability(false);
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(
        paymentMethod === "stripe" ? "/api/payments/checkout" : "/api/appointments",
        {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          staffId,
          appointmentDate: date,
          appointmentTime: time,
        }),
      });
      const result = await response.json() as { message?: string; url?: string };
      if (!response.ok) throw new Error(result.message ?? "Appointment could not be created.");
      if (paymentMethod === "stripe") {
        if (!result.url) throw new Error("Stripe Checkout URL was not returned.");
        window.location.assign(result.url);
        return;
      }
      await Swal.fire({
        icon: "success",
        title: "Appointment Booked",
        text: result.message ?? "Your appointment is confirmed.",
        confirmButtonColor: "#be185d",
      });
      router.push("/dashboard/history");
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

  if (loadingOptions) {
    return (
      <div className="flex min-h-80 items-center justify-center text-primary">
        <LoaderCircle size={30} className="animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      <section className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-7 flex items-center gap-4">
          <div className="rounded-2xl bg-rose-100 p-3 text-rose-700">
            <CalendarPlus size={26} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Appointment details</h2>
            <p className="text-gray-500">Choose a service, expert, working day, and mutually free time.</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="text-sm font-semibold text-gray-700">
            Service
            <select
              required
              value={serviceId}
              onChange={(event) => {
                setServiceId(event.target.value);
                setStaffId("");
                setDate("");
                setTime("");
                setAvailability({ workingDates: [], timeSlots: [] });
              }}
              className="mt-2 w-full rounded-xl border border-rose-100 bg-white p-3 font-normal outline-none focus:border-rose-500"
            >
              <option value="">Select service</option>
              {services.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.name} · ${service.price.toFixed(2)} · {service.duration} min
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-semibold text-gray-700">
            Expert
            <select
              required
              disabled={!serviceId}
              value={staffId}
              onChange={(event) => {
                const value = event.target.value;
                setStaffId(value);
                setDate("");
                setTime("");
                setAvailability({ workingDates: [], timeSlots: [] });
                if (value) void loadAvailability(value);
              }}
              className="mt-2 w-full rounded-xl border border-rose-100 bg-white p-3 font-normal outline-none focus:border-rose-500 disabled:bg-gray-100"
            >
              <option value="">Select expert</option>
              {availableStaff.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.name} · {member.specialty}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-semibold text-gray-700">
            Working day
            <select
              required
              disabled={!staffId || loadingAvailability}
              value={date}
              onChange={(event) => {
                const value = event.target.value;
                setDate(value);
                setTime("");
                if (value) void loadAvailability(staffId, value);
              }}
              className="mt-2 w-full rounded-xl border border-rose-100 bg-white p-3 font-normal outline-none focus:border-rose-500 disabled:bg-gray-100"
            >
              <option value="">{loadingAvailability ? "Loading working days…" : "Select working day"}</option>
              {availability.workingDates.map((item) => (
                <option key={item.date} value={item.date}>{item.label}</option>
              ))}
            </select>
          </label>

          <label className="text-sm font-semibold text-gray-700">
            Mutually free time
            <select
              required
              disabled={!date || loadingAvailability}
              value={time}
              onChange={(event) => setTime(event.target.value)}
              className="mt-2 w-full rounded-xl border border-rose-100 bg-white p-3 font-normal outline-none focus:border-rose-500 disabled:bg-gray-100"
            >
              <option value="">{loadingAvailability ? "Checking free times…" : "Select free time"}</option>
              {availability.timeSlots.map((slot) => (
                <option key={slot.time} value={slot.time}>{slot.label}</option>
              ))}
            </select>
            {date && !loadingAvailability && availability.timeSlots.length === 0 && (
              <span className="mt-2 block font-normal text-amber-700">No free times on this date.</span>
            )}
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-6 flex items-center gap-4">
          <div className="rounded-2xl bg-rose-100 p-3 text-rose-700"><CreditCard size={26} /></div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Payment method</h2>
            <p className="text-gray-500">Choose how you want to handle payment.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setPaymentMethod("salon")}
            className={`rounded-2xl border p-5 text-left ${paymentMethod === "salon" ? "border-rose-700 bg-rose-50" : "border-gray-200"}`}
          >
            <p className="font-bold text-gray-900">Pay at the salon</p>
            <p className="mt-1 text-sm text-gray-500">No online charge is made.</p>
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod("stripe")}
            className={`rounded-2xl border p-5 text-left ${paymentMethod === "stripe" ? "border-rose-700 bg-rose-50" : "border-gray-200"}`}
          >
            <p className="font-bold text-gray-900">Pay securely with Stripe</p>
            <p className="mt-1 text-sm text-gray-500">Continue to Stripe&apos;s secure test checkout.</p>
          </button>
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
          <ShieldCheck size={19} className="mt-0.5 shrink-0" />
          Stripe Checkout securely collects card details. Glow never receives or stores the card number.
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-5 shadow-sm">
        <div>
          <p className="text-sm text-gray-500">Appointment total</p>
          <p className="text-2xl font-bold text-rose-700">
            {selectedService ? `$${selectedService.price.toFixed(2)}` : "$0.00"}
          </p>
        </div>
        <button
          disabled={submitting}
          className="inline-flex min-w-52 items-center justify-center gap-2 rounded-xl bg-rose-700 px-7 py-3 font-semibold text-white transition hover:bg-rose-800 disabled:opacity-60"
        >
          {submitting && <LoaderCircle size={18} className="animate-spin" />}
          {paymentMethod === "stripe" ? "Continue to Stripe" : "Book Appointment"}
        </button>
      </div>
    </form>
  );
}
