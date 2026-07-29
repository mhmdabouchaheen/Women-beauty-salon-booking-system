import { redirect } from "next/navigation";
import type { Metadata } from "next";

import AdminShell from "@/src/components/admin/layout/AdminShell";
import { getAuthUser } from "@/src/lib/auth";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const auth = await getAuthUser();
  if (!auth) redirect("/login?next=/admin");
  if (auth.role !== "admin") redirect("/");
  return <AdminShell>{children}</AdminShell>;
}
