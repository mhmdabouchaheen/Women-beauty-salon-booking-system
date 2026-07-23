"use client";

import { Search } from "lucide-react";

interface Props {
  search: string;
  onSearch: (value: string) => void;

  filter: "All" | "Available" | "Leave";
  onFilter: (value: "All" | "Available" | "Leave") => void;
}

export default function StaffSearch({
  search,
  onSearch,
  filter,
  onFilter,
}: Props) {
  const filters = [
    "All",
    "Available",
    "Leave",
  ] as const;

  return (
    <div className="space-y-5">

      {/* Search */}

      <div className="relative">

        <Search
          size={20}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-rose-400"
        />

        <input
          value={search}
          onChange={(e) =>
            onSearch(e.target.value)
          }
          placeholder="Search by name or service..."
          className="w-full rounded-2xl border border-rose-100 bg-white py-4 pl-14 pr-5 shadow-sm outline-none transition focus:border-rose-400"
        />

      </div>

      {/* Filters */}

      <div className="flex flex-wrap gap-3">

        {filters.map((item) => (

          <button
            key={item}
            onClick={() => onFilter(item)}
            className={`rounded-full px-5 py-2 font-medium transition ${
              filter === item
                ? "bg-rose-700 text-white"
                : "bg-white border border-rose-100 text-gray-600 hover:border-rose-300"
            }`}
          >
            {item}
          </button>

        ))}

      </div>

    </div>
  );
}