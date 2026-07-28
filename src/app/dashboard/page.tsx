import { LayoutGrid } from "lucide-react";
import UpcomingAppointments from "@/src/components/customer/UpcomingAppointments";
import GoldStatusCard from "@/src/components/customer/GoldStatusCard";
import { mockUser, mockUpcomingAppointments } from "@/src/data/customer-mock";

// TODO(backend): swap the mock imports above for a real fetch (auth user +
// appointments) once the backend exists again.
export default function DashboardPage() {
  return (
    <>
      <div className="mb-10 flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-rose-700 to-pink-600 p-8 text-white lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
            <LayoutGrid size={30} />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Welcome back, {mockUser.firstName}</h1>
            <p className="mt-2 text-rose-100">
              Your next moment of zen is just around the corner.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="col-span-1 md:col-span-7">
          <UpcomingAppointments appointments={mockUpcomingAppointments} />
        </div>
        <div className="col-span-1 md:col-span-5">
          <GoldStatusCard />
        </div>
      </div>
    </>
  );
}
