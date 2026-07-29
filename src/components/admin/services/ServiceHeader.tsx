"use client";

import { Plus, Scissors } from "lucide-react";

interface Props {
  onAdd: () => void;
}

export default function ServiceHeader({ onAdd }: Props) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-4">
        <div className="rounded-2xl bg-rose-100 p-4">
          <Scissors className="text-rose-700" size={30} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Services
          </h1>

          <p className="text-gray-500">
            Manage the services displayed on your salon website.
          </p>
        </div>
      </div>

      <button
        onClick={onAdd}
        className="flex items-center justify-center gap-2 rounded-2xl bg-rose-700 px-6 py-3 font-medium text-white transition hover:bg-rose-800"
      >
        <Plus size={20} />
        Add Service
      </button>
    </div>
  );
}