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
      id: item.id,
      month: item.month,
      day: item.day,
      title: item.service,
      specialist: item.specialist,
      time: item.time,
      action: "Details" as const,
    }));

  const completed = appointments
    .filter((item) => item.status === "completed")
    .map((item) => ({
      id: item.id,
      service: item.service,
      specialist: item.specialist,
      date: item.date,
      price: item.price,
    }));

  return (
    <>
      <div className="mb-10 flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-rose-700 to-pink-600 p-8 text-white lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
            <LayoutGrid size={30} />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Welcome back, {user.name.split(" ")[0]}</h1>
            <p className="mt-2 text-rose-100">
              Your next moment of zen is just around the corner.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="col-span-1 md:col-span-7">
          <UpcomingAppointments appointments={upcoming} />
        </div>
        <div className="col-span-1 md:col-span-5">
          <GoldStatusCard points={user.rewardPoints ?? 0} lifetimePoints={user.lifetimeRewardPoints ?? 0} />
        </div>
      </div>

    </>
  );
}
