"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LayoutGrid, History, User, HelpCircle, LogOut, Bell, CalendarPlus, Users } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { name: "Book Appointment", href: "/dashboard/book", icon: CalendarPlus },
  { name: "History", href: "/dashboard/history", icon: History },
  { name: "Experts", href: "/dashboard/experts", icon: Users },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Profile", href: "/dashboard/profile", icon: User },
];

interface Props {
  userName: string;
  avatar?: string;
}

export default function DashboardSidebar({ userName, avatar }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <aside className="hidden lg:flex flex-col border-r border-outline-variant py-8 px-6 h-screen w-72 fixed left-0 bg-surface z-40">
      <Link
        href="/"
        className="mb-10 px-4 font-headline-sm text-headline-sm text-primary italic tracking-tight"
      >
        Glow Beauty Salon
      </Link>

      {/* Profile */}
      <div className="mb-10 px-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-fixed relative shrink-0 bg-secondary-container">
          {avatar && (
            <Image
              src={avatar}
              alt={`${userName}'s profile portrait`}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div>
          <p className="font-label-md text-label-md text-on-surface">
            Welcome, {userName}
          </p>
          <Link
            href="/dashboard/profile"
            className="text-[12px] text-primary font-bold uppercase tracking-widest hover:underline underline-offset-4"
          >
            View Profile
          </Link>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl group transition-colors ${
                active
                  ? "bg-secondary-container text-on-secondary-container shadow-[0_4px_12px_rgba(171,37,84,0.15)] translate-x-1"
                  : "text-on-surface-variant hover:bg-primary-container/20"
              }`}
            >
              <Icon
                size={20}
                className={active ? "" : "group-hover:text-primary"}
              />
              <span
                className={`font-label-md ${active ? "" : "group-hover:text-primary"}`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-4 mb-8">
        <Link
          href="/dashboard/book"
          className="block text-center w-full bg-primary text-on-primary py-4 rounded-xl font-button-text text-button-text shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all"
        >
          Book Appointment
        </Link>
      </div>

      <div className="space-y-1 px-4 border-t border-outline-variant pt-6">
        <Link
          href="/dashboard/contact"
          className="flex items-center gap-4 py-2 text-on-surface-variant hover:text-primary transition-colors"
        >
          <HelpCircle size={20} />
          <span className="text-[14px]">Contact Us</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 py-2 text-on-surface-variant hover:text-primary transition-colors w-full text-left"
        >
          <LogOut size={20} />
          <span className="text-[14px]">Logout</span>
        </button>
      </div>
    </aside>
  );
}
