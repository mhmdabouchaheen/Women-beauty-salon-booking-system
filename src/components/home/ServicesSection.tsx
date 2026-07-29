import { getAllServices } from "@/src/repositories/service.repository";

import ServiceCard from "../ui/ServiceCard";
import FadeUp from "../ui/FadeUp";

export default async function ServicesSection() {
  const records = await getAllServices();
  const services = records
    .filter((service) => service.featured)
    .map((service, index) => ({
      id: service._id.toString(),
      title: service.name,
      description: service.description,
      duration: `${service.duration} MIN`,
      price: `$${service.price.toFixed(2)}`,
      image: service.image || "/services/hair.jpg",
      featured: index === 0,
    }));

  return (
    <FadeUp>
      <section id="services" className="bg-rose-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[6px] text-rose-700">
              Luxury Treatments
            </p>
            <h2 className="text-5xl font-bold">Our Signature Services</h2>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-rose-700" />
          </div>

          {services.length === 0 ? (
            <div className="rounded-3xl border border-rose-200 bg-white p-10 text-center text-gray-600">
              Our service menu is being updated. Please check back soon.
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>
    </FadeUp>
  );
}
