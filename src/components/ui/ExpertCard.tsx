import Image from "next/image";
import Button from "./Button";
import { Star } from "lucide-react";
import { Expert } from "@/src/data/experts";

interface Props {
  expert: Expert;
}

export default function ExpertCard({ expert }: Props) {
  return (
    <div className="group text-center">
      <div className="relative mx-auto mb-6 h-56 w-56 overflow-hidden rounded-full shadow-xl transition duration-500 group-hover:scale-105">
        <Image
          src={expert.image}
          alt={expert.name}
          fill
          className="object-cover"
        />

        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white px-3 py-1 shadow">
          <Star
            size={14}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="text-sm font-semibold">
            {expert.rating}
          </span>
        </div>
      </div>

      <h3 className="text-2xl font-semibold">
        {expert.name}
      </h3>

      <p className="mb-5 uppercase tracking-widest text-rose-700">
        {expert.role}
      </p>
       <div className="mt-5 inline-flex items-center rounded-full bg-rose-100 px-5 py-2 text-sm font-semibold text-rose-700">
  ★ {expert.rating} Rating
</div>
    </div>
  );
}