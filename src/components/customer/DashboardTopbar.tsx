"use client";

import { useState } from "react";
import Image from "next/image";
import { Bell, CalendarPlus, Menu } from "lucide-react";

import NewAppointmentModal from "./NewAppointmentModal";

interface Props {
  onMenuClick: () => void;
  userName: string;
  avatar?: string;
}

export default function DashboardTopbar({ onMenuClick, userName, avatar }: Props) {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 right-0 z-30 flex h-20 w-full items-center justify-between border-b border-rose-100 bg-white px-4 shadow-sm md:w-[calc(100%-18rem)] md:px-8">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 hover:bg-rose-50 md:hidden"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        <div className="hidden md:block" />

        <div className="flex items-center gap-3 sm:gap-5">
          <button
            onClick={() => setBookingOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-rose-700 px-3 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-rose-800 sm:px-4"
          >
            <CalendarPlus size={18} />
            <span className="hidden sm:inline">New Appointment</span>
          </button>

          <button className="relative rounded-full p-2 hover:bg-rose-50" aria-label="Notifications">
            <Bell size={22} className="text-gray-600" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-600" />
          </button>

          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-rose-200 bg-rose-50">
              {avatar && (
                <Image src={avatar} alt={`${userName}'s profile portrait`} fill className="object-cover" />
              )}
            </div>
            <div className="hidden sm:block">
              <p className="font-semibold">{userName}</p>
              <p className="text-sm text-gray-500">customer</p>
            </div>
          </div>
        </div>
      </header>

      <NewAppointmentModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
