export interface AppointmentService {
  id: string;
  service: string;
  staff: string;
  date: string;
  time: string;
}

export interface Appointment {
  id: string;
  customer: string;
  status: "Scheduled" | "Completed" | "Cancelled";
  services: AppointmentService[];
}

export const appointments: Appointment[] = [
  {
    id: "1",
    customer: "Sarah Johnson",
    status: "Scheduled",
    services: [
      {
        id: "1",
        service: "Luxury Hair Styling",
        staff: "Emma Wilson",
        date: "2026-07-25",
        time: "10:00",
      },
      {
        id: "2",
        service: "Glow Facial",
        staff: "Sophia Davis",
        date: "2026-07-25",
        time: "11:45",
      },
    ],
  },

  {
    id: "2",
    customer: "Emily Smith",
    status: "Completed",
    services: [
      {
        id: "3",
        service: "Classic Manicure",
        staff: "Isabella Moore",
        date: "2026-07-24",
        time: "13:00",
      },
    ],
  },

  {
    id: "3",
    customer: "Jessica Brown",
    status: "Cancelled",
    services: [
      {
        id: "4",
        service: "Relaxing Massage",
        staff: "Sophia Davis",
        date: "2026-07-27",
        time: "15:00",
      },
    ],
  },
];