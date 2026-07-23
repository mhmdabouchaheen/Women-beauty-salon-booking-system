"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Settings,
  MapPin,
  Phone,
  Mail,
  Clock3,
  Pencil,
  Save,
  X,
} from "lucide-react";
import { apiRequest } from "@/src/types/admin-ui";

export default function SettingsPage() {
  const [address, setAddress] = useState("Beirut, Lebanon");
  const [phone, setPhone] = useState("+961 XX XXX XXX");
  const [email, setEmail] = useState("info@glowbeauty.com");

  const [weekdays, setWeekdays] = useState("9:00 AM - 8:00 PM");
  const [saturday, setSaturday] = useState("10:00 AM - 6:00 PM");
  const [sunday, setSunday] = useState("Closed");

  const [editingContact, setEditingContact] = useState(false);
  const [editingHours, setEditingHours] = useState(false);

  useEffect(() => {
    void apiRequest<{ settings: { address: string; phone: string; email: string; weekdays: string; saturday: string; sunday: string } }>("/api/admin/settings")
      .then(({ settings }) => {
        setAddress(settings.address);
        setPhone(settings.phone);
        setEmail(settings.email);
        setWeekdays(settings.weekdays);
        setSaturday(settings.saturday);
        setSunday(settings.sunday);
      });
  }, []);

  async function persistSettings() {
    return apiRequest("/api/admin/settings", {
      method: "PUT",
      body: JSON.stringify({ address, phone, email, weekdays, saturday, sunday }),
    });
  }

  async function saveContact() {
    try {
      await persistSettings();
      setEditingContact(false);
      await Swal.fire({ icon: "success", title: "Contact Updated", confirmButtonColor: "#be185d" });
    } catch (error: unknown) {
      await Swal.fire({ icon: "error", title: "Could not save settings", text: error instanceof Error ? error.message : "Request failed" });
    }
  }

  async function saveHours() {
    try {
      await persistSettings();
      setEditingHours(false);
      await Swal.fire({ icon: "success", title: "Opening Hours Updated", confirmButtonColor: "#be185d" });
    } catch (error: unknown) {
      await Swal.fire({ icon: "error", title: "Could not save settings", text: error instanceof Error ? error.message : "Request failed" });
    }
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center gap-4">

        <div className="rounded-3xl bg-rose-100 p-4">

          <Settings
            size={34}
            className="text-rose-700"
          />

        </div>

        <div>

          <h1 className="text-4xl font-bold">
            Settings
          </h1>

          <p className="text-gray-500">
            Manage the information displayed in your website footer.
          </p>

        </div>

      </div>

      <div className="grid gap-8 xl:grid-cols-2">

        {/* Contact Card */}

        <div className="rounded-3xl border border-rose-100 bg-white shadow-sm overflow-hidden">

          <div className="flex items-center justify-between border-b border-rose-100 bg-rose-50 px-7 py-6">

            <div className="flex items-center gap-4">

              <div className="rounded-2xl bg-white p-3 shadow-sm">

                <MapPin
                  size={24}
                  className="text-rose-700"
                />

              </div>

              <div>

                <h2 className="text-xl font-bold">
                  Contact Information
                </h2>

                <p className="text-sm text-gray-500">
                  Footer contact details
                </p>

              </div>

            </div>

            {!editingContact ? (

              <button
                onClick={() => setEditingContact(true)}
                className="rounded-xl bg-rose-100 p-3 transition hover:bg-rose-200"
              >

                <Pencil
                  size={18}
                  className="text-rose-700"
                />

              </button>

            ) : (

              <div className="flex gap-2">

                <button
                  onClick={() => setEditingContact(false)}
                  className="rounded-xl border border-gray-200 px-4 py-2 hover:bg-gray-100"
                >
                  <X size={16} />
                </button>

                <button
                  onClick={saveContact}
                  className="flex items-center gap-2 rounded-xl bg-rose-700 px-4 py-2 text-white hover:bg-rose-800"
                >
                  <Save size={16} />
                  Save
                </button>

              </div>

            )}

          </div>

          <div className="space-y-6 p-7">

            <div>

              <label className="mb-2 flex items-center gap-2 font-medium">

                <MapPin size={18} />

                Address

              </label>

              <input
                disabled={!editingContact}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`w-full rounded-xl border p-3 outline-none transition ${
                  editingContact
                    ? "border-rose-300 bg-white"
                    : "border-gray-100 bg-gray-50"
                }`}
              />

            </div>

            <div>

              <label className="mb-2 flex items-center gap-2 font-medium">

                <Phone size={18} />

                Phone

              </label>

              <input
                disabled={!editingContact}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full rounded-xl border p-3 outline-none transition ${
                  editingContact
                    ? "border-rose-300 bg-white"
                    : "border-gray-100 bg-gray-50"
                }`}
              />

            </div>

            <div>

              <label className="mb-2 flex items-center gap-2 font-medium">

                <Mail size={18} />

                Email

              </label>

              <input
                disabled={!editingContact}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-xl border p-3 outline-none transition ${
                  editingContact
                    ? "border-rose-300 bg-white"
                    : "border-gray-100 bg-gray-50"
                }`}
              />

            </div>

          </div>

        </div>
                {/* Opening Hours Card */}

        <div className="rounded-3xl overflow-hidden border border-rose-100 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-rose-100 bg-rose-50 px-7 py-6">

            <div className="flex items-center gap-4">

              <div className="rounded-2xl bg-white p-3 shadow-sm">

                <Clock3
                  size={24}
                  className="text-rose-700"
                />

              </div>

              <div>

                <h2 className="text-xl font-bold">
                  Opening Hours
                </h2>

                <p className="text-sm text-gray-500">
                  Business schedule shown on the website
                </p>

              </div>

            </div>

            {!editingHours ? (

              <button
                onClick={() => setEditingHours(true)}
                className="rounded-xl bg-rose-100 p-3 transition hover:bg-rose-200"
              >

                <Pencil
                  size={18}
                  className="text-rose-700"
                />

              </button>

            ) : (

              <div className="flex gap-2">

                <button
                  onClick={() => setEditingHours(false)}
                  className="rounded-xl border border-gray-200 px-4 py-2 hover:bg-gray-100"
                >
                  <X size={16} />
                </button>

                <button
                  onClick={saveHours}
                  className="flex items-center gap-2 rounded-xl bg-rose-700 px-4 py-2 text-white hover:bg-rose-800"
                >
                  <Save size={16} />
                  Save
                </button>

              </div>

            )}

          </div>

          <div className="space-y-7 p-7">

            <div>

              <label className="mb-2 block font-medium">
                Monday - Friday
              </label>

              <input
                disabled={!editingHours}
                value={weekdays}
                onChange={(e) => setWeekdays(e.target.value)}
                className={`w-full rounded-xl border p-3 outline-none transition ${
                  editingHours
                    ? "border-rose-300 bg-white"
                    : "border-gray-100 bg-gray-50"
                }`}
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Saturday
              </label>

              <input
                disabled={!editingHours}
                value={saturday}
                onChange={(e) => setSaturday(e.target.value)}
                className={`w-full rounded-xl border p-3 outline-none transition ${
                  editingHours
                    ? "border-rose-300 bg-white"
                    : "border-gray-100 bg-gray-50"
                }`}
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Sunday
              </label>

              <input
                disabled={!editingHours}
                value={sunday}
                onChange={(e) => setSunday(e.target.value)}
                className={`w-full rounded-xl border p-3 outline-none transition ${
                  editingHours
                    ? "border-rose-300 bg-white"
                    : "border-gray-100 bg-gray-50"
                }`}
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
