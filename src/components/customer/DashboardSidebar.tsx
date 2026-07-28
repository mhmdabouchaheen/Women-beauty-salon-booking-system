"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutGrid, CalendarDays, Users, User, HelpCircle, LogOut } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { name: "Appointments", href: "/dashboard/appointments", icon: CalendarDays },
  { name: "Experts", href: "/dashboard/experts", icon: Users },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Contact Us", href: "/dashboard/contact", icon: HelpCircle },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // TODO(backend): wire this up to a real "logout" endpoint (e.g. POST
  // /api/auth/logout) once a backend exists again.
  function handleLogout() {
    router.replace("/login");
  }

  function isActive(href: string) {
    return href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname === href || pathname?.startsWith(`${href}/`);
  }

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 flex-col border-r border-rose-100 bg-white md:flex">
      <div className="flex h-20 shrink-0 flex-col justify-center border-b border-rose-100 px-8">
        <h1 className="text-3xl font-bold italic text-rose-700">Glow</h1>
        <p className="text-sm text-gray-500">Beauty Salon</p>
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-all ${
                active
                  ? "bg-rose-700 text-white shadow-lg"
                  : "text-gray-600 hover:bg-rose-50 hover:text-rose-700"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="m-5 flex items-center gap-4 rounded-xl px-4 py-3 text-red-600 hover:bg-red-50"
      >
        <LogOut size={20} />
        <span className="font-medium">Logout</span>
      </button>
    </aside>
  );
}
