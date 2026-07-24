"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, History, PlusCircle, User } from "lucide-react";

const items = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "History", href: "/dashboard/history", icon: History },
  { name: "Services", href: "/#services", icon: PlusCircle },
  { name: "Profile", href: "/dashboard/profile", icon: User },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white/80 backdrop-blur-lg border-t border-white/40 shadow-[0_-4px_20px_rgba(231,84,128,0.1)] rounded-t-3xl">
      {items.map((item) => {
        const Icon = item.icon;
        const active =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname === item.href || pathname?.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1 px-6 py-2 rounded-2xl transition-transform ${
              active
                ? "text-primary bg-secondary-container scale-90"
                : "text-on-surface-variant hover:opacity-80"
            }`}
          >
            <Icon size={20} />
            <span className="font-label-md text-[11px]">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
