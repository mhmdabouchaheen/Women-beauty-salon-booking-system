import TestimonialCard from "../ui/TestimonialCard";
import { testimonials } from "@/src/data/testimonials";
import FadeUp from "../ui/FadeUp";

export default function TestimonialsSection() {
  return (
    <FadeUp> 
    <section
      id="testimonials"
      className="bg-rose-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-2 uppercase tracking-[6px] text-rose-700">
            Testimonials
          </p>

          <h2 className="text-5xl font-bold">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
    </FadeUp>
  );
}