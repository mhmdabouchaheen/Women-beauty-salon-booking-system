import { Scissors } from "lucide-react";
import ServicesBookingGrid from "@/src/components/customer/ServicesBookingGrid";
import { getAllServices } from "@/src/repositories/service.repository";

export default async function DashboardServicesPage() {
  const records = await getAllServices();
  const services = records.map((service) => ({
    _id: service._id.toString(),
    name: service.name,
    description: service.description,
    duration: service.duration,
    price: service.price,
    image: service.image || "/window.svg",
  }));

  return (
    <>
      <div className="mb-10 flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-rose-700 to-pink-600 p-8 text-white lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
            <Scissors size={30} />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Our Services</h1>
            <p className="mt-2 text-rose-100">
              Browse everything we offer and book straight from here.
            </p>
          </div>
        </div>
      </div>

      <ServicesBookingGrid services={services} />
    </>
  );
}
