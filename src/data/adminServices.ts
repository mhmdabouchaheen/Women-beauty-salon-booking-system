export interface AdminService {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: string;
  price: number;
  featured: boolean;
  image: string;
}

export const adminServices: AdminService[] = [
  {
    id: "1",
    name: "Luxury Hair Styling",
    description: "Professional styling for any occasion.",
    category: "Hair",
    duration: "90 min",
    price: 80,
    featured: true,
    image: "/services/hair.jpg",
  },
  {
    id: "2",
    name: "Glow Facial",
    description: "Deep cleansing and hydration facial.",
    category: "Facial",
    duration: "60 min",
    price: 65,
    featured: true,
    image: "/services/facial.jpg",
  },
  {
    id: "3",
    name: "Classic Manicure",
    description: "Beautiful manicure with premium products.",
    category: "Nails",
    duration: "45 min",
    price: 35,
    featured: false,
    image: "/services/nails.jpg",
  },
  {
    id: "4",
    name: "Relaxing Massage",
    description: "Full body relaxing massage.",
    category: "Massage",
    duration: "60 min",
    price: 90,
    featured: true,
    image: "/services/massage.jpg",
  },
];