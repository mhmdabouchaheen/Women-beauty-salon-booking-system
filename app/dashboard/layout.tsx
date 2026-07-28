import { redirect } from "next/navigation";
import DashboardSidebar from "@/src/components/customer/DashboardSidebar";
import DashboardNavbar from "@/src/components/customer/DashboardNavbar";
import MobileBottomNav from "@/src/components/customer/MobileBottomNav";
import { getAuthUser } from "@/src/lib/auth";
import { findUserById } from "@/src/repositories/user.repository";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const auth = await getAuthUser();
  if (!auth) redirect("/login?next=/dashboard");
  if (auth.role === "admin") redirect("/admin");
  const user = await findUserById(auth.userId);
  if (!user) redirect("/login");
  return (
    <div className="flex min-h-screen bg-[#FFF9FB]">
      <DashboardSidebar userName={user.name.split(" ")[0]} avatar={user.image} />
      <DashboardNavbar userName={user.name.split(" ")[0]} avatar={user.image} />

      <main className="min-h-screen flex-1 px-margin-mobile pb-24 pt-28 md:px-margin-desktop lg:ml-72 lg:pb-8">
        {children}
      </main>

      <MobileBottomNav />
    </div>
  );
}
