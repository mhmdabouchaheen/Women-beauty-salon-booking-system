// TODO(backend): this file is a stand-in for real data. Once a backend
// exists again, replace these exports with real fetches (e.g. a server
// component calling `getAuthUser()` + a repository, like the previous
// version of this app did) and delete this file.

import type { UpcomingAppointmentItem } from "@/src/components/custumer/UpcomingAppointments";
import type { TreatmentHistoryRow } from "@/src/components/custumer/TreatmentHistoryTable";
import type { BookingHistoryItem } from "@/src/components/custumer/HistoryList";

export const mockUser = {
  name: "Elena Vance",
  firstName: "Elena",
  email: "elena@luxury.com",
  avatar:
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  memberSince: "March 2023",
};

export const mockUpcomingAppointments: UpcomingAppointmentItem[] = [
  {
    id: "1",
    month: "OCT",
    day: "24",
    title: "Signature Facial",
    specialist: "Sara Beauty",
    time: "10:00 AM",
    action: "Reschedule",
  },
  {
    id: "2",
    month: "NOV",
    day: "02",
    title: "Classic Manicure",
    specialist: "Lina Nails",
    time: "2:30 PM",
    action: "Reschedule",
  },
];

export const mockTreatmentHistory: TreatmentHistoryRow[] = [
  {
    id: "3",
    service: "Hair Styling",
    specialist: "Sara Beauty",
    date: "Sep 12, 2026",
    price: 45,
  },
  {
    id: "4",
    service: "Facial Treatment",
    specialist: "Sara Beauty",
    date: "Aug 03, 2026",
    price: 40,
  },
];

export const mockBookingHistory: BookingHistoryItem[] = [
  {
    id: "1",
    service: "Signature Facial",
    specialist: "Sara Beauty",
    date: "Oct 24, 2026",
    time: "10:00 AM",
    price: 65,
    status: "confirmed",
    image:
      "https://images.unsplash.com/photo-1616394158624-9b53b0b48d6d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    service: "Hair Styling",
    specialist: "Sara Beauty",
    date: "Sep 12, 2026",
    time: "1:00 PM",
    price: 45,
    status: "completed",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    service: "Facial Treatment",
    specialist: "Sara Beauty",
    date: "Aug 03, 2026",
    time: "11:30 AM",
    price: 40,
    status: "cancelled",
    image:
      "https://images.unsplash.com/photo-1519415510236-718bdfcd89c1?auto=format&fit=crop&w=800&q=80",
  },
];
