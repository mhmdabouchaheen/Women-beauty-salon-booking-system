"use client";

import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ServiceSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="rounded-3xl border border-rose-100 bg-white p-5 shadow-sm">
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search services..."
          className="w-full rounded-2xl border border-gray-200 py-3 pl-12 pr-4 outline-none transition focus:border-rose-400"
        />
      </div>
    </div>
  );
}