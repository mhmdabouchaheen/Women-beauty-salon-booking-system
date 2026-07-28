"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CalendarPlus, LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import NotificationBell from "@/src/components/notifications/NotificationBell";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Appointments", href: "/dashboard/history" },
  { name: "Experts", href: "/dashboard/experts" },
  { name: "Profile", href: "/dashboard/profile" },
  { name: "Contact Us", href: "/dashboard/contact" },
];

interface Props {
  userName: string;
  avatar?: string;
}

export default function DashboardNavbar({ userName, avatar }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function isActive(href: string) {
    if (href.includes("#")) return false;
    return href === "/dashboard"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-30 border-b border-rose-100 bg-white/95 shadow-sm backdrop-blur-xl lg:left-72">
        <div className="flex h-20 items-center justify-between gap-6 px-5 md:px-8">
          <Link href="/dashboard" className="text-3xl font-bold italic text-rose-700 lg:hidden">
            Glow
          </Link>

          <nav className="hidden items-center gap-8 xl:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative py-2 text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-rose-700 after:transition-all ${
                  isActive(item.href)
                    ? "text-rose-700 after:w-full"
                    : "text-gray-700 after:w-0 hover:text-rose-700 hover:after:w-full"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-3 md:flex">
            <Link
              href="/dashboard/book"
              className="flex items-center gap-2 rounded-xl bg-rose-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-800"
            >
              <CalendarPlus size={18} />
              New Appointment
            </Link>

            <NotificationBell href="/dashboard/notifications" className="text-gray-600" />

            <Link
              href="/dashboard/profile"
              className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 transition hover:bg-rose-50"
            >
              <span className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-rose-200 bg-rose-50">
                {avatar && <Image src={avatar} alt="" fill className="object-cover" />}
              </span>
              <span className="max-w-24 truncate text-sm font-medium text-gray-700">{userName}</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-rose-200 p-2.5 text-rose-700 transition hover:bg-rose-50"
              aria-label="Logout"
            >
              <LogOut size={19} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="rounded-full p-2 text-rose-700 md:hidden"
            aria-label="Open dashboard menu"
          >
            <Menu size={27} />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`absolute right-0 top-0 flex h-full w-72 flex-col bg-white shadow-2xl transition-transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-rose-100 p-5">
            <span className="font-semibold text-gray-800">{userName}</span>
            <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col p-5">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-rose-50 py-4 font-medium ${
                  isActive(item.href) ? "text-rose-700" : "text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/dashboard/notifications"
              onClick={() => setMenuOpen(false)}
              className="border-b border-rose-50 py-4 font-medium text-gray-700"
            >
              Notifications
            </Link>
            <Link
              href="/dashboard/book"
              onClick={() => setMenuOpen(false)}
              className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-rose-700 py-3 font-semibold text-white"
            >
              <CalendarPlus size={18} />
              New Appointment
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-rose-200 py-3 font-semibold text-rose-700"
            >
              <LogOut size={18} />
              Logout
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}
