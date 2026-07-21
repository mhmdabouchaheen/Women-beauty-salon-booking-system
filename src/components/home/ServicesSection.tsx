import ServiceCard from "../ui/ServiceCard";
import { services } from "@/src/data/services";
import FadeUp from "../ui/FadeUp";

export default function ServicesSection() {
  return (
     <FadeUp>
    <section
      id="services"
      className="bg-rose-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[6px] text-rose-700">
            Luxury Treatments
          </p>

          <h2 className="text-5xl font-bold">
            Our Signature Services
          </h2>

          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-rose-700" />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}
        </div>
      </div>
    </section>
     </FadeUp>
  );
}