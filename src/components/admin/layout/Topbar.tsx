"use client";

import {
  Bell,
  Menu,
  UserCircle2,
} from "lucide-react";

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({
  onMenuClick,
}: TopbarProps) {
  return (
    <header className="fixed top-0 right-0 z-30 flex h-20 w-full items-center justify-between border-b border-rose-100 bg-white px-4 shadow-sm md:w-[calc(100%-18rem)] md:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 hover:bg-rose-50 md:hidden"
        >
          <Menu size={24} />
        </button>

      </div>

      <div className="hidden md:block relative w-full max-w-md">

      </div>

      <div className="flex items-center gap-5">
        <button className="relative rounded-full p-2 hover:bg-rose-50">
          <Bell
            size={22}
            className="text-gray-600"
          />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-600"></span>
        </button>

        <div className="flex items-center gap-3">
          <UserCircle2
            size={40}
            className="text-rose-700"
          />

          <div className="hidden sm:block">
            <p className="font-semibold">
              Admin
            </p>

            <p className="text-sm text-gray-500">
              administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}