import { Bell, Search } from "lucide-react";
import HistoryList from "@/src/components/customer/HistoryList";
import { mockBookingHistory } from "@/src/data/customer-mock";

// TODO(backend): swap the mock import above for a real fetch of the user's
// appointments once the backend exists again.
export default function HistoryPage() {
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

      <HistoryList bookings={mockBookingHistory} />
    </>
  );
}
