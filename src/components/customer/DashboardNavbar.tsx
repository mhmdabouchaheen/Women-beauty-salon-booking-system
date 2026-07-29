"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { CalendarPlus, LayoutGrid, CalendarDays, Scissors, Users, User, HelpCircle, LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import NotificationBell from "@/src/components/notifications/NotificationBell";
import NewAppointmentModal from "./NewAppointmentModal";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { name: "Appointments", href: "/dashboard/appointments", icon: CalendarDays },
  { name: "Services", href: "/dashboard/services", icon: Scissors },
  { name: "Experts", href: "/dashboard/experts", icon: Users },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Contact Us", href: "/dashboard/contact", icon: HelpCircle },
];

interface Props {
  userName: string;
  avatar?: string;
}

export default function DashboardNavbar({ userName, avatar }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  function isActive(href: string) {
    return href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname === href || pathname?.startsWith(`${href}/`);
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-30 transition-all duration-300 md:left-72 ${
          scrolled
            ? "border-b border-rose-100 bg-white/95 shadow-md backdrop-blur-xl"
            : "bg-white/60 backdrop-blur-md"
        }`}
      >
        <div className="flex h-20 w-full items-center justify-between px-6 md:px-8">
          <Link
            href="/dashboard"
            className="font-display text-4xl italic tracking-tight text-rose-700 md:hidden"
          >
            Glow
          </Link>
          <div className="hidden md:block" />

          <nav className="hidden items-center gap-10 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-[15px] font-medium transition-colors duration-300 after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:bg-rose-700 after:transition-all after:duration-300 ${
                  isActive(item.href)
                    ? "text-rose-700 after:w-full"
                    : "text-gray-700 after:w-0 hover:text-rose-700 hover:after:w-full"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <button
              onClick={() => setBookingOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-rose-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-rose-800"
            >
              <CalendarPlus size={18} />
              New Appointment
            </button>

            <NotificationBell href="/dashboard/notifications" className="text-gray-600" />

            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 rounded-full py-1 pl-1 pr-4 transition hover:bg-rose-50"
            >
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-rose-200 relative shrink-0 bg-rose-50">
                {avatar && (
                  <Image src={avatar} alt={`${userName}'s profile portrait`} fill className="object-cover" />
                )}
              </div>
              <span className="text-[15px] font-medium text-gray-700">{userName}</span>
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-full border border-rose-200 p-2.5 text-rose-700 transition hover:bg-rose-50"
              aria-label="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <NotificationBell href="/dashboard/notifications" className="text-rose-700" />
            <button
              onClick={() => setMenuOpen(true)}
              className="rounded-full p-2 text-rose-700 transition hover:bg-rose-50"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`absolute right-0 top-0 flex h-full w-72 flex-col bg-white shadow-2xl transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-200 relative shrink-0 bg-rose-50">
                {avatar && (
                  <Image src={avatar} alt={`${userName}'s profile portrait`} fill className="object-cover" />
                )}
              </div>
              <span className="font-medium text-gray-700">{userName}</span>
            </div>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X />
            </button>
          </div>

          <nav className="flex flex-col p-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-4 border-b py-4 text-lg transition ${
                    isActive(item.href) ? "text-rose-700" : "text-gray-700 hover:text-rose-700"
                  }`}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}

            <button
              onClick={() => {
                setMenuOpen(false);
                setBookingOpen(true);
              }}
              className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-rose-700 py-3 text-center font-medium text-white transition hover:bg-rose-800"
            >
              <CalendarPlus size={18} />
              New Appointment
            </button>

            <button
              onClick={() => {
                setMenuOpen(false);
                void handleLogout();
              }}
              className="mt-3 flex items-center justify-center gap-3 rounded-xl border border-rose-200 py-3 text-center font-medium text-rose-700 transition hover:bg-rose-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </nav>
        </div>
      </div>

      <NewAppointmentModal
        key={bookingOpen ? "open" : "closed"}
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </>
  );
}
