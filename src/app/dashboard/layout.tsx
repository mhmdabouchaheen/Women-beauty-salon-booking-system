import { redirect } from "next/navigation";
import type { Metadata } from "next";
import DashboardShell from "@/src/components/customer/DashboardShell";
import { getAuthUser } from "@/src/lib/auth";
import { findUserById } from "@/src/repositories/user.repository";

export const metadata: Metadata = {
  title: "Customer Dashboard",
  robots: { index: false, follow: false, nocache: true },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const auth = await getAuthUser();
  if (!auth) redirect("/login?next=/dashboard");
  if (auth.role === "admin") redirect("/admin");
  const user = await findUserById(auth.userId);
  if (!user) redirect("/login");

  return (
    <DashboardShell userName={user.name.split(" ")[0]} avatar={user.image}>
      {children}
    </DashboardShell>
  );
}
