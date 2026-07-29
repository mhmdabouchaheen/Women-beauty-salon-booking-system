import Image from "next/image";

interface ExpertCardProps {
  expert: {
    id: string;
    name: string;
    role: string;
    image: string;
  };
}

export default function ExpertCard({ expert }: ExpertCardProps) {
  return (
    <article className="group text-center">
      <div className="relative mx-auto mb-6 h-56 w-56 overflow-hidden rounded-full shadow-xl transition duration-500 group-hover:scale-105">
        <Image
          src={expert.image}
          alt={expert.name}
          fill
          sizes="224px"
          className="object-cover"
        />
      </div>
      <h3 className="text-2xl font-semibold">{expert.name}</h3>
      <p className="mt-2 uppercase tracking-widest text-rose-700">{expert.role}</p>
    </article>
  );
}
