import { redirect } from "next/navigation";
import DashboardSidebar from "@/src/components/customer/DashboardSidebar";
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

      <main className="flex-1 lg:ml-72 min-h-screen px-margin-mobile md:px-margin-desktop pt-8 pb-24 lg:pb-8">
        {children}
      </main>

      <MobileBottomNav />
    </div>
  );
}
