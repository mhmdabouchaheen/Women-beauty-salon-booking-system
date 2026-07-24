"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function CustomerPagination() {
  return (
    <div className="flex flex-col items-center justify-between gap-5 rounded-3xl border border-rose-100 bg-white px-7 py-5 shadow-sm md:flex-row">

      <p className="text-sm text-gray-500">
        Showing
        <span className="mx-1 font-semibold text-rose-700">
          1-5
        </span>
        of
        <span className="mx-1 font-semibold text-rose-700">
          5
        </span>
        customers
      </p>

      <div className="flex items-center gap-2">

        <button className="rounded-xl border border-gray-200 p-2 hover:bg-gray-100">

          <ChevronLeft size={18} />

        </button>

        <button className="rounded-xl bg-rose-700 px-4 py-2 text-white">
          1
        </button>

        <button className="rounded-xl border border-gray-200 px-4 py-2 hover:bg-gray-100">
          2
        </button>

        <button className="rounded-xl border border-gray-200 p-2 hover:bg-gray-100">

          <ChevronRight size={18} />

        </button>

      </div>

    </div>
  );
}