"use client";

import { useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-rose-50">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex min-h-screen flex-1 flex-col md:ml-72">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 pt-28 md:p-8 md:pt-28">{children}</main>
      </div>
    </div>
  );
}
