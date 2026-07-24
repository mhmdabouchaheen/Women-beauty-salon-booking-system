"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Scissors,
  Users,
  UserRound,
  Settings,
  X,
  LogOut,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Appointments",
    href: "/admin/appointments",
    icon: CalendarDays,
  },
  {
    name: "Services",
    href: "/admin/services",
    icon: Scissors,
  },
  {
    name: "Staff",
    href: "/admin/staff",
    icon: Users,
  },
  {
    name: "Customers",
    href: "/admin/customers",
    icon: UserRound,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
  {
    name: "Profile",
    href: "/admin/profile",
    icon: UserRound,
  },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <>
      {/* Overlay */}
      {mobileOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      <aside
        className={`
    fixed left-0 top-0 z-50 h-screen w-72
    border-r border-rose-100 bg-white
    transition-transform duration-300

    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}

    md:translate-x-0
    flex flex-col
  `}
      >
        {/* Mobile Close */}
        <div className="flex justify-end p-4 md:hidden">
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-rose-50">
            <X size={22} />
          </button>
        </div>

        {/* Logo */}
        <div className="border-b border-rose-100 px-8 pb-6">
          <h1 className="text-3xl font-bold italic text-rose-700">Glow</h1>

          <p className="mt-2 text-sm text-gray-500">Beauty Salon Admin</p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-2 p-5">
          {links.map((link) => {
            const Icon = link.icon;

            const active = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-all ${
                  active
                    ? "bg-rose-700 text-white shadow-lg"
                    : "text-gray-600 hover:bg-rose-50 hover:text-rose-700"
                }`}
              >
                <Icon size={20} />

                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>
        <button onClick={logout} className="m-5 flex items-center gap-4 rounded-xl px-4 py-3 text-red-600 hover:bg-red-50">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </aside>
    </>
  );
}
