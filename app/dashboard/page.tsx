import { Bell, Search } from "lucide-react";
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
      <header className="flex justify-between items-end mb-10">
        <div className="space-y-1">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
            Welcome back, {user.name.split(" ")[0]}
          </h1>
          <p className="text-on-surface-variant font-body-lg text-body-lg">
            Your next moment of zen is just around the corner.
          </p>
        </div>

        <div className="hidden md:flex gap-4">
          <button
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-xl border border-white/40 text-on-surface-variant hover:text-primary transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>
          <button
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-xl border border-white/40 text-on-surface-variant hover:text-primary transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        <div className="col-span-1 md:col-span-7">
          <UpcomingAppointments appointments={upcoming} />
        </div>
        <div className="col-span-1 md:col-span-5">
          <GoldStatusCard />
        </div>
      </div>

      <TreatmentHistoryTable history={completed} />
    </>
  );
}
