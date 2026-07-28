"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { CalendarPlus, CreditCard, Plus, Trash2, X } from "lucide-react";

import { services as serviceOptions } from "@/src/data/services";
import { experts as expertOptions } from "@/src/data/experts";
import { mockPaymentMethods, type PaymentMethod } from "@/src/data/payment-methods";

interface ServiceForm {
  id: string;
  service: string;
  expert: string;
  date: string;
  time: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const TIME_SLOTS = [
  { value: "09:00", label: "09:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "13:00", label: "01:00 PM" },
  { value: "14:00", label: "02:00 PM" },
  { value: "15:00", label: "03:00 PM" },
  { value: "16:00", label: "04:00 PM" },
];

export default function NewAppointmentModal({ open, onClose }: Props) {
  const [appointmentServices, setAppointmentServices] = useState<ServiceForm[]>([
    { id: crypto.randomUUID(), service: "", expert: "", date: "", time: "" },
  ]);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [selectedPaymentId, setSelectedPaymentId] = useState(mockPaymentMethods[0]?.id ?? "");
  const [addingCard, setAddingCard] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  if (!open) return null;

  function resetAndClose() {
    setAppointmentServices([{ id: crypto.randomUUID(), service: "", expert: "", date: "", time: "" }]);
    setSelectedPaymentId(mockPaymentMethods[0]?.id ?? "");
    setAddingCard(false);
    setCardName("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvv("");
    onClose();
  }

  function addService() {
    setAppointmentServices((prev) => [
      ...prev,
      { id: crypto.randomUUID(), service: "", expert: "", date: "", time: "" },
    ]);
  }

  function removeService(id: string) {
    if (appointmentServices.length === 1) return;
    setAppointmentServices((prev) => prev.filter((service) => service.id !== id));
  }

  function updateService(id: string, field: keyof ServiceForm, value: string) {
    setAppointmentServices((prev) =>
      prev.map((service) => (service.id === id ? { ...service, [field]: value } : service))
    );
  }

  function handleAddCard() {
    const newCard: PaymentMethod = {
      id: `pm_${Date.now()}`,
      brand: "Visa",
      last4: cardNumber.slice(-4) || "0000",
      expiry: cardExpiry,
    };
    setPaymentMethods((prev) => [...prev, newCard]);
    setSelectedPaymentId(newCard.id);
    setAddingCard(false);
    setCardName("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvv("");
  }

  // TODO(backend): this used to POST to /api/appointments per service, like
  // the admin AddAppointmentModal does via apiRequest. There's no backend
  // right now, so this just confirms locally. When it's restored, also send
  // paymentMethodId (selectedPaymentId) alongside each appointment.
  async function submitForm(e: React.FormEvent) {
    e.preventDefault();
    try {
      for (const item of appointmentServices) {
        if (!item.service || !item.expert || !item.date || !item.time) {
          throw new Error("Fill in every service, expert, date, and time.");
        }
      }
      if (!selectedPaymentId) throw new Error("Select a payment method.");

      await Swal.fire({
        icon: "success",
        title: "Appointment Requested",
        confirmButtonColor: "#be185d",
      });
      resetAndClose();
    } catch (error: unknown) {
      await Swal.fire({
        icon: "error",
        title: "Could not book appointment",
        text: error instanceof Error ? error.message : "Request failed",
      });
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5 backdrop-blur-sm">
      <div className="max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* Header */}
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

        <form onSubmit={submitForm} className="space-y-8 p-8">
          {/* Services */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Services</h3>
              <button
                type="button"
                onClick={addService}
                className="flex items-center gap-2 rounded-xl bg-rose-700 px-4 py-2 text-white transition hover:bg-rose-800"
              >
                <Plus size={18} />
                Add Service
              </button>
            </div>

            {appointmentServices.map((service) => (
              <div key={service.id} className="rounded-3xl border border-rose-100 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-rose-700">Service</h4>
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
                  <div>
                    <label className="mb-2 block text-sm font-medium">Service</label>
                    <select
                      value={service.service}
                      onChange={(e) => updateService(service.id, "service", e.target.value)}
                      className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-300"
                    >
                      <option value="">Select service</option>
                      {serviceOptions.map((item) => (
                        <option key={item.id} value={item.title}>
                          {item.title} &middot; {item.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">Expert</label>
                    <select
                      value={service.expert}
                      onChange={(e) => updateService(service.id, "expert", e.target.value)}
                      className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-300"
                    >
                      <option value="">Select expert</option>
                      {expertOptions.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name} &middot; {item.role}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">Date</label>
                    <input
                      type="date"
                      value={service.date}
                      onChange={(e) => updateService(service.id, "date", e.target.value)}
                      className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-300"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">Available Time</label>
                    <select
                      value={service.time}
                      disabled={!service.date}
                      onChange={(e) => updateService(service.id, "time", e.target.value)}
                      className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-300 disabled:bg-gray-100"
                    >
                      <option value="">Select time</option>
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot.value} value={slot.value}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Payment method */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Payment Method</h3>

            <div className="space-y-3">
              {paymentMethods.map((pm) => (
                <button
                  key={pm.id}
                  type="button"
                  onClick={() => {
                    setSelectedPaymentId(pm.id);
                    setAddingCard(false);
                  }}
                  className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                    selectedPaymentId === pm.id && !addingCard
                      ? "border-rose-700 bg-rose-50"
                      : "border-gray-200 hover:border-rose-300"
                  }`}
                >
                  <CreditCard size={22} className="text-rose-700" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {pm.brand} &middot;&middot;&middot;&middot; {pm.last4}
                    </p>
                    <p className="text-sm text-gray-500">Expires {pm.expiry}</p>
                  </div>
                  <span
                    className={`h-4 w-4 rounded-full border-2 ${
                      selectedPaymentId === pm.id && !addingCard
                        ? "border-rose-700 bg-rose-700"
                        : "border-gray-300"
                    }`}
                  />
                </button>
              ))}

              {!addingCard ? (
                <button
                  type="button"
                  onClick={() => setAddingCard(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-rose-300 p-4 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
                >
                  <Plus size={18} />
                  Add a new payment method
                </button>
              ) : (
                <div className="space-y-3 rounded-xl border border-rose-700 bg-rose-50 p-4">
                  <input
                    type="text"
                    placeholder="Cardholder name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full rounded-lg border border-rose-200 px-4 py-2.5 outline-none focus:border-rose-700"
                  />
                  <input
                    type="text"
                    placeholder="Card number"
                    inputMode="numeric"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full rounded-lg border border-rose-200 px-4 py-2.5 outline-none focus:border-rose-700"
                  />
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-1/2 rounded-lg border border-rose-200 px-4 py-2.5 outline-none focus:border-rose-700"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      inputMode="numeric"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-1/2 rounded-lg border border-rose-200 px-4 py-2.5 outline-none focus:border-rose-700"
                    />
                  </div>
                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setAddingCard(false)}
                      className="flex-1 rounded-lg border border-rose-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddCard}
                      disabled={!cardName || !cardNumber || !cardExpiry || !cardCvv}
                      className="flex-1 rounded-lg bg-rose-700 py-2.5 text-sm font-medium text-white transition hover:bg-rose-800 disabled:opacity-40"
                    >
                      Save card
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
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
              className="rounded-xl bg-rose-700 px-6 py-3 font-medium text-white transition hover:bg-rose-800"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
