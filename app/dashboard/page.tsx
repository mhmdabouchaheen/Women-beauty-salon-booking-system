import { LayoutGrid } from "lucide-react";
import UpcomingAppointments from "@/src/components/customer/UpcomingAppointments";
import GoldStatusCard from "@/src/components/customer/GoldStatusCard";
import TreatmentHistoryTable from "@/src/components/customer/TreatmentHistoryTable";
import { getAuthUser } from "@/src/lib/auth";
import { getCustomerDashboardAppointments } from "@/src/lib/customer-dashboard";
import { findUserById } from "@/src/repositories/user.repository";

export default async function DashboardPage() {
  const auth = await getAuthUser();
  if (!auth) return null;
  const [user, appointments] = await Promise.all([
    findUserById(auth.userId),
    getCustomerDashboardAppointments(auth.userId),
  ]);
  if (!user) return null;
  const upcoming = appointments
    .filter((item) => item.status === "booked" && item.startDateTime > new Date())
    .map((item) => ({
      id: item.id, month: item.month, day: item.day, title: item.service,
      specialist: item.specialist, time: item.time, action: "Details" as const,
    }));
  const completed = appointments
    .filter((item) => item.status === "completed")
    .map((item) => ({
      id: item.id, service: item.service, specialist: item.specialist,
      date: item.date, price: item.price,
    }));
  return (
    <>
      <header className="mb-8 flex items-center gap-5 rounded-3xl bg-gradient-to-r from-rose-700 to-pink-600 p-7 text-white md:p-8">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20">
          <LayoutGrid size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">
            Welcome back, {user.name.split(" ")[0]}
          </h1>
          <p className="mt-1 text-rose-100">Your next moment of zen is just around the corner.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        <div className="col-span-1 md:col-span-7">
          <UpcomingAppointments appointments={upcoming} />
        </div>
        <div className="col-span-1 md:col-span-5">
          <GoldStatusCard
            points={user.rewardPoints ?? 0}
            lifetimePoints={user.lifetimeRewardPoints ?? 0}
          />
        </div>
      </div>

      <TreatmentHistoryTable history={completed} />
    </>
  );
}
