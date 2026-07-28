import { CalendarDays } from "lucide-react";
import HistoryList from "@/src/components/customer/HistoryList";
import { mockBookingHistory } from "@/src/data/customer-mock";

// TODO(backend): swap the mock import above for a real fetch of the user's
// appointments once the backend exists again.
export default function AppointmentsPage() {
  return (
    <>
      <div className="mb-10 flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-rose-700 to-pink-600 p-8 text-white lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
            <CalendarDays size={30} />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Appointments</h1>
            <p className="mt-2 text-rose-100">
              View and manage your past and upcoming appointments.
            </p>
          </div>
        </div>
      </div>

      <HistoryList bookings={mockBookingHistory} />
    </>
  );
}
