"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  UserCircle2,
  User,
  Mail,
  Pencil,
  Save,
  X,
  ShieldCheck,
} from "lucide-react";
import { apiRequest } from "@/src/types/admin-ui";

export default function ProfilePage() {
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@glowbeauty.com");
  const [lastLoginAt, setLastLoginAt] = useState<string | null>(null);

  const [editingInfo, setEditingInfo] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    void apiRequest<{ user: { name: string; email: string; lastLoginAt: string | null } }>("/api/admin/profile")
      .then(({ user }) => {
        setName(user.name);
        setEmail(user.email);
        setLastLoginAt(user.lastLoginAt);
      });
  }, []);

  async function saveProfile() {
    try {
      await apiRequest("/api/admin/profile", { method: "PATCH", body: JSON.stringify({ name, email }) });
      setEditingInfo(false);
      await Swal.fire({ icon: "success", title: "Profile Updated", confirmButtonColor: "#be185d" });
    } catch (error: unknown) {
      await Swal.fire({ icon: "error", title: "Could not update profile", text: error instanceof Error ? error.message : "Request failed" });
    }
  }

  async function savePassword() {
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        confirmButtonColor: "#be185d",
      });

      return;
    }

    try {
      await apiRequest("/api/admin/profile", { method: "PATCH", body: JSON.stringify({ currentPassword, newPassword }) });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      await Swal.fire({ icon: "success", title: "Password Updated", confirmButtonColor: "#be185d" });
    } catch (error: unknown) {
      await Swal.fire({ icon: "error", title: "Could not update password", text: error instanceof Error ? error.message : "Request failed" });
    }
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center gap-4">

        <div className="rounded-3xl bg-rose-100 p-4">

          <UserCircle2
            size={34}
            className="text-rose-700"
          />

        </div>

        <div>

          <h1 className="text-4xl font-bold">
            My Profile
          </h1>

          <p className="text-gray-500">
            Manage your administrator account.
          </p>

        </div>

      </div>

      <div className="grid gap-8 xl:grid-cols-[340px_1fr]">

        {/* LEFT CARD */}

        <div className="rounded-3xl border border-rose-100 bg-white p-8 shadow-sm">

          <div className="flex flex-col items-center">

            <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-rose-600 to-pink-500 shadow-xl">

              <span className="text-5xl font-bold text-white">
                {name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </span>

            </div>

            <h2 className="mt-6 text-2xl font-bold">
              {name}
            </h2>

            <p className="mt-2 text-gray-500">
              {email}
            </p>

            <span className="mt-5 rounded-full bg-rose-100 px-5 py-2 text-sm font-semibold text-rose-700">
              Administrator
            </span>

          </div>

          <div className="mt-10 space-y-5">

            <div className="rounded-2xl bg-rose-50 p-5">

              <div className="flex items-center gap-3">

                <ShieldCheck
                  className="text-rose-700"
                  size={22}
                />

                <div>

                  <h3 className="font-semibold">
                    Account Status
                  </h3>

                  <p className="text-sm text-gray-500">
                    Active
                  </p>

                </div>

              </div>

            </div>

            <div className="rounded-2xl bg-gray-50 p-5">

              <p className="text-sm text-gray-500">
                Last Login
              </p>

              <p className="mt-2 font-semibold">
                {lastLoginAt
                  ? new Intl.DateTimeFormat("en-LB", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(lastLoginAt))
                  : "Not available yet"}
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="space-y-7">

          {/* Personal Information */}

          <div className="overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-rose-100 bg-rose-50 px-7 py-6">

              <div>

                <h2 className="text-xl font-bold">
                  Personal Information
                </h2>

                <p className="text-sm text-gray-500">
                  Update your basic account information.
                </p>

              </div>

              {!editingInfo ? (

                <button
                  onClick={() =>
                    setEditingInfo(true)
                  }
                  className="rounded-xl bg-rose-100 p-3 hover:bg-rose-200"
                >

                  <Pencil
                    size={18}
                    className="text-rose-700"
                  />

                </button>

              ) : (

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      setEditingInfo(false)
                    }
                    className="rounded-xl border border-gray-200 px-4 py-2 hover:bg-gray-100"
                  >
                    <X size={16} />
                  </button>

                  <button
                    onClick={saveProfile}
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

                  <User size={18} />

                  Full Name

                </label>

                <input
                  disabled={!editingInfo}
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className={`w-full rounded-xl border p-3 outline-none transition ${
                    editingInfo
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
                  disabled={!editingInfo}
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className={`w-full rounded-xl border p-3 outline-none transition ${
                    editingInfo
                      ? "border-rose-300 bg-white"
                      : "border-gray-100 bg-gray-50"
                  }`}
                />

              </div>

            </div>

          </div>
                    {/* Security */}

          <div className="overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm">

            <div className="border-b border-rose-100 bg-rose-50 px-7 py-6">

              <h2 className="text-xl font-bold">
                Security
              </h2>

              <p className="text-sm text-gray-500">
                Change your administrator password.
              </p>

            </div>

            <div className="space-y-6 p-7">

              <div>

                <label className="mb-2 block font-medium">
                  Current Password
                </label>

                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(e.target.value)
                  }
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-rose-400"
                />

              </div>

              <div className="grid gap-6 md:grid-cols-2">

                <div>

                  <label className="mb-2 block font-medium">
                    New Password
                  </label>

                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(e.target.value)
                    }
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-rose-400"
                  />

                </div>

                <div>

                  <label className="mb-2 block font-medium">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-rose-400"
                  />

                </div>

              </div>


              <div className="flex justify-end">

                <button
                  onClick={savePassword}
                  className="flex items-center gap-2 rounded-xl bg-rose-700 px-6 py-3 font-medium text-white transition hover:bg-rose-800"
                >

                  <Save size={18} />

                  Update Password

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
