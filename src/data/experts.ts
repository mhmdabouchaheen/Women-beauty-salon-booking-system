//fake data for staff on homepage
export interface Expert {
  id: number;
  name: string;
  role: string;
  rating: number;
  image: string;
}

export const experts: Expert[] = [
  {
    id: 1,
    name: "Amelia Ross",
    role: "Master Stylist",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 2,
    name: "Julian Thorne",
    role: "Makeup Director",
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 3,
    name: "Elena Vance",
    role: "Skin Expert",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 4,
    name: "Sofia Chen",
    role: "Lead Nail Artist",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1400&q=80",
  },
];