//customer view in admin dashboar
export interface Customer {
  id: string;
  name: string;
  email: string;
  image: string;
  appointments: number;
  lastAppointment: string;
}

export const customersAdmin: Customer[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@email.com",
    image: "/customers/customer1.jpg",
    appointments: 12,
    lastAppointment: "Jul 20, 2026",
  },
  {
    id: "2",
    name: "Emily Smith",
    email: "emily@email.com",
    image: "/customers/customer2.jpg",
    appointments: 5,
    lastAppointment: "Jul 18, 2026",
  },
  {
    id: "3",
    name: "Jessica Brown",
    email: "jessica@email.com",
    image: "/customers/customer3.jpg",
    appointments: 8,
    lastAppointment: "Jul 15, 2026",
  },
  {
    id: "4",
    name: "Olivia Wilson",
    email: "olivia@email.com",
    image: "/customers/customer4.jpg",
    appointments: 3,
    lastAppointment: "Jul 10, 2026",
  },
  {
    id: "5",
    name: "Sophia Davis",
    email: "sophia@email.com",
    image: "/customers/customer5.jpg",
    appointments: 15,
    lastAppointment: "Jul 22, 2026",
  },
];