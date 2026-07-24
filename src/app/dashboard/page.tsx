import { Bell, Search } from "lucide-react";
import UpcomingAppointments from "@/src/components/custumer/UpcomingAppointments";
import GoldStatusCard from "@/src/components/custumer/GoldStatusCard";
import FavoritesGrid from "@/src/components/custumer/FavoritesGrid";
import TreatmentHistoryTable from "@/src/components/custumer/TreatmentHistoryTable";
import { mockUser, mockUpcomingAppointments, mockTreatmentHistory } from "@/src/data/customer-mock";

// TODO(backend): swap the mock imports above for a real fetch (auth user +
// appointments) once the backend exists again.
export default function DashboardPage() {
  return (
    <>
      <header className="flex justify-between items-end mb-10">
        <div className="space-y-1">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
            Welcome back, {mockUser.firstName}
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
          <UpcomingAppointments appointments={mockUpcomingAppointments} />
        </div>
        <div className="col-span-1 md:col-span-5">
          <GoldStatusCard />
        </div>
      </div>

      <TreatmentHistoryTable history={mockTreatmentHistory} />
    </>
  );
}
