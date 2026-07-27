"use client";

import { Bell } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotificationBell({
  href,
  className = "",
}: {
  href: string;
  className?: string;
}) {
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    let active = true;
    async function loadCount() {
      const response = await fetch("/api/notifications", { cache: "no-store" });
      if (!response.ok || !active) return;
      const data = await response.json() as { unreadCount?: number };
      setUnread(data.unreadCount ?? 0);
    }
    void loadCount();
    const interval = window.setInterval(loadCount, 30000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <Link
      href={href}
      aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
      className={`relative inline-flex rounded-full p-2 transition-colors hover:bg-rose-50 ${className}`}
    >
      <Bell size={22} />
      {unread > 0 && (
        <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-rose-700 px-1 text-[11px] font-bold text-white">
          {unread > 99 ? "99+" : unread}
        </span>
      )}
    </Link>
  );
}
