export interface StaffMember {
  id: string;

  name: string;

  image: string;

  services: string[];

  workingDays: string[];

  startHour: string;

  endHour: string;

  active: boolean;
}

export const staffMembers: StaffMember[] = [
  {
    id: "1",

    name: "Emma Wilson",

    image: "/staff/emma.jpg",

    services: [
      "Luxury Hair Styling",
      "Hair Coloring",
      "Hair Treatment",
    ],

    workingDays: [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
    ],

    startHour: "09:00",

    endHour: "17:00",

    active: true,
  },

  {
    id: "2",

    name: "Sophia Davis",

    image: "/staff/sophia.jpg",

    services: [
      "Glow Facial",
      "Relaxing Massage",
    ],

    workingDays: [
      "Tue",
      "Wed",
      "Thu",
      "Sat",
    ],

    startHour: "10:00",

    endHour: "18:00",

    active: true,
  },

  {
    id: "3",

    name: "Isabella Moore",

    image: "/staff/isabella.jpg",

    services: [
      "Classic Manicure",
      "Bridal Makeup",
    ],

    workingDays: [
      "Mon",
      "Wed",
      "Fri",
      "Sat",
    ],

    startHour: "09:30",

    endHour: "16:30",

    active: false,
  },
];