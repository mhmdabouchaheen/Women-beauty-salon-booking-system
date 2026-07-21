import Image from "next/image";
import Button from "./Button";
import { Service } from "@/src/data/services";

interface Props {
  service: Service;
}

export default function ServiceCard({ service }: Props) {
  if (service.featured) {
    return (
      <div className="relative overflow-hidden rounded-3xl lg:col-span-2">
        <Image
          src={service.image}
          alt={service.title}
          width={1200}
          height={700}
          loading="eager"
          className="h-[520px] w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-0 p-10 text-white">
          <span className="rounded-full bg-rose-700 px-4 py-2 text-sm">
            Trending
          </span>

          <h3 className="mt-5 text-4xl font-bold">
            {service.title}
          </h3>

          <p className="mt-4 max-w-xl text-gray-200">
            {service.description}
          </p>

          <div className="mt-8 flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">
                From {service.price}
              </p>

              <span className="text-sm uppercase tracking-widest">
                {service.duration}
              </span>
            </div>

            <Button>
              Book Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-2 hover:shadow-xl">
      <Image
        src={service.image}
        alt={service.title}
        width={600}
        height={400}
        className="h-56 w-full object-cover"
      />

      <div className="p-7">
        <h3 className="mb-3 text-2xl font-semibold">
          {service.title}
        </h3>

        <p className="mb-6 text-gray-600">
          {service.description}
        </p>

        <div className="flex items-center justify-between border-t pt-5">
          <div>
            <p className="font-bold text-rose-700">
              From {service.price}
            </p>

            <span className="text-sm text-gray-500">
              {service.duration}
            </span>
          </div>

          <Button variant="outline">
            Book
          </Button>
        </div>
      </div>
    </div>
  );
}
