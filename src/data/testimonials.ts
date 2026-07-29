export interface Testimonial {
  id: number;
  name: string;
  title: string;
  review: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Claire Montgomery",
    title: "Loyal Customer",
    review:
      "Glow Beauty Salon has completely transformed my self-care routine. Every visit feels luxurious and relaxing.",
  },
  {
    id: 2,
    name: "Jessica Williams",
    title: "Bride",
    review:
      "The bridal package exceeded every expectation. My makeup and hairstyle stayed flawless throughout the entire day.",
  },
  {
    id: 3,
    name: "Rachel Thompson",
    title: "Fashion Editor",
    review:
      "I've trusted Glow for years. Their professionalism, creativity, and attention to detail are unmatched.",
  },
];