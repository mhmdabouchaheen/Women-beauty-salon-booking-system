import { Quote, Star } from "lucide-react";
import { Testimonial } from "@/src/data/testimonials";

interface Props {
  testimonial: Testimonial;
}

export default function TestimonialCard({
  testimonial,
}: Props) {
  return (
    <div className="relative rounded-3xl bg-white p-10 shadow-lg transition duration-300 hover:-translate-y-2">
      <div className="absolute -top-6 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-rose-700 text-white">
        <Quote size={20} />
      </div>

      <div className="mt-4 mb-6 flex justify-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      <p className="mb-8 text-center italic leading-8 text-gray-600">
        "{testimonial.review}"
      </p>

      <div className="text-center">
        <h3 className="font-semibold">
          {testimonial.name}
        </h3>

        <p className="text-sm uppercase tracking-widest text-rose-700">
          {testimonial.title}
        </p>
      </div>
    </div>
  );
}