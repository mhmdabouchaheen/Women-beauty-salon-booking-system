"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  CalendarDays,
  Scissors,
  Users,
  Bell,
  User,
  HelpCircle,
  LogOut,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { name: "Appointments", href: "/dashboard/appointments", icon: CalendarDays },
  { name: "Services", href: "/dashboard/services", icon: Scissors },
  { name: "Experts", href: "/dashboard/experts", icon: Users },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Contact Us", href: "/dashboard/contact", icon: HelpCircle },
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

  function isActive(href: string) {
    return href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname === href || pathname?.startsWith(`${href}/`);
  }

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 flex-col border-r border-rose-100 bg-white md:flex">
      <Link
        href="/dashboard"
        className="flex h-20 shrink-0 flex-col justify-center border-b border-rose-100 px-8"
      >
        <h1 className="text-3xl font-bold italic text-rose-700">Glow</h1>
        <p className="text-sm text-gray-500">Beauty Salon</p>
      </Link>

      <div className="flex items-center gap-3 border-b border-rose-100 px-8 py-5">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-rose-200 bg-rose-50">
          {avatar && (
            <Image src={avatar} alt={`${userName}'s profile portrait`} fill className="object-cover" />
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold text-gray-800">{userName}</p>
          <Link href="/dashboard/profile" className="text-xs font-bold uppercase tracking-widest text-rose-700 hover:underline">
            View Profile
          </Link>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2 overflow-y-auto p-5">
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

      <div className="p-5">
  <button
    onClick={handleLogout}
    className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-red-600 hover:bg-red-50"
  >
    <LogOut size={20} />
    <span className="font-medium">Logout</span>
  </button>
</div>
    </aside>
  );
}
