import { redirect } from "next/navigation";

import AdminShell from "@/src/components/admin/layout/AdminShell";
import { getAuthUser } from "@/src/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const auth = await getAuthUser();
  if (!auth) redirect("/login?next=/admin");
  if (auth.role !== "admin") redirect("/");
  return <AdminShell>{children}</AdminShell>;
}
