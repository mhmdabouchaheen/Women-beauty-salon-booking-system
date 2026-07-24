export interface Service {
  id: number;
  title: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  featured?: boolean;
}

export const services: Service[] = [
  {
    id: 1,
    title: "Hair Styling",
    description:
      "Expert cuts and styling tailored to your personality and lifestyle.",
    duration: "45 MIN",
    price: "$65",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 2,
    title: "Luxury Hair Coloring",
    description:
      "Premium balayage, highlights and complete color transformations.",
    duration: "120 MIN",
    price: "$120",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: 3,
    title: "Luxury Nails",
    description: "Premium manicure and pedicure using luxury products.",
    duration: "60 MIN",
    price: "$45",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 4,
    title: "Glow Facial",
    description: "Customized skincare treatments for radiant healthy skin.",
    duration: "75 MIN",
    price: "$95",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 5,
    title: "Therapeutic Massage",
    description: "Relaxing massage sessions designed to restore body and mind.",
    duration: "60 MIN",
    price: "$110",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1600&q=80",
  },
];
