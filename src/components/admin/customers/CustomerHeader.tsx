"use client";

import { UsersRound, UserPlus } from "lucide-react";

interface Props {
  total: number;
  onAdd: () => void;
}

export default function CustomerHeader({
  total,
  onAdd,
}: Props) {
  return (
    <div className="rounded-3xl border border-rose-100 bg-gradient-to-r from-rose-50 via-white to-rose-50 p-8 shadow-sm">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-5">

          <div className="rounded-2xl bg-rose-100 p-4">

            <UsersRound
              size={32}
              className="text-rose-700"
            />

          </div>

          <div>

            <h1 className="text-4xl font-bold">
              Customers
            </h1>

            <p className="mt-1 text-gray-500">
              Manage all salon customers.
            </p>

          </div>
          <button onClick={onAdd} className="flex items-center gap-2 rounded-xl bg-rose-700 px-5 py-3 font-semibold text-white hover:bg-rose-800">
            <UserPlus size={18} />
            Add Customer
          </button>

        </div>

        <div className="flex items-center gap-5">

          <div className="rounded-2xl border border-rose-100 bg-white px-6 py-4 shadow-sm">

            <p className="text-sm text-gray-500">
              Total Customers
            </p>

            <h2 className="text-3xl font-bold text-rose-700">
              {total}
            </h2>

          </div>

        </div>

      </div>

    </div>
  );
}
