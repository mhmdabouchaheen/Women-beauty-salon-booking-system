"use client";

import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function CustomerSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">

      <Search
        size={20}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-rose-400"
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search customer..."
        className="w-full rounded-2xl border border-rose-100 bg-white py-4 pl-14 pr-5 shadow-sm outline-none transition focus:border-rose-400"
      />

    </div>
  );
}