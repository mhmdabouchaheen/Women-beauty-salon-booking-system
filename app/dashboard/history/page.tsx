import { Bell, Search } from "lucide-react";
import HistoryList from "@/src/components/customer/HistoryList";
import { getAuthUser } from "@/src/lib/auth";
import { getCustomerDashboardAppointments } from "@/src/lib/customer-dashboard";

export default async function HistoryPage() {
  const auth = await getAuthUser();
  if (!auth) return null;
  const appointments = await getCustomerDashboardAppointments(auth.userId);
  const bookings = appointments.map((item) => ({
    id: item.id,
    service: item.service,
    specialist: item.specialist,
    date: item.date,
    time: item.time,
    price: item.price,
    status: item.status === "booked" ? "confirmed" as const : item.status,
    image: item.image,
  }));
  return (
    <>
      <header className="flex justify-between items-end mb-10">
        <div className="space-y-1">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
            My Booking History
          </h1>
          <p className="text-on-surface-variant font-body-lg text-body-lg">
            View and manage your past and upcoming appointments.
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

      <HistoryList bookings={bookings} />
    </>
  );
}
