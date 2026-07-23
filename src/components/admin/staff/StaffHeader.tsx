"use client";

import { Users, UserPlus } from "lucide-react";

interface Props {
  totalStaff: number;
  activeStaff: number;
  onAdd: () => void;
}

export default function StaffHeader({
  totalStaff,
  activeStaff,
  onAdd,
}: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-rose-100 bg-gradient-to-r from-rose-50 via-white to-rose-50 shadow-sm">

      <div className="flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div>

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-rose-100 p-4">

              <Users
                size={32}
                className="text-rose-700"
              />

            </div>

            <div>

              <h1 className="text-4xl font-bold text-gray-900">
                Staff Management
              </h1>

              <p className="mt-1 text-gray-500">
                Manage your salon experts and schedules.
              </p>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-col gap-4 sm:flex-row">

          <div className="rounded-2xl border border-rose-100 bg-white px-6 py-4 shadow-sm">

            <p className="text-sm text-gray-500">
              Total Staff
            </p>

            <h2 className="mt-1 text-3xl font-bold text-rose-700">
              {totalStaff}
            </h2>

          </div>

          <div className="rounded-2xl border border-rose-100 bg-white px-6 py-4 shadow-sm">

            <p className="text-sm text-gray-500">
              Active
            </p>

            <h2 className="mt-1 text-3xl font-bold text-green-600">
              {activeStaff}
            </h2>

          </div>

          <button
            onClick={onAdd}
            className="flex items-center justify-center gap-3 rounded-2xl bg-rose-700 px-8 py-4 font-semibold text-white transition hover:bg-rose-800"
          >

            <UserPlus size={22} />

            Add Staff

          </button>

        </div>

      </div>

    </div>
  );
}