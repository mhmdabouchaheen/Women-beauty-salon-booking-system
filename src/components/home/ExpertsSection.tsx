import ExpertCard from "../ui/ExpertCard";
import { experts } from "@/src/data/experts";
import { ArrowRight } from "lucide-react";
import FadeUp from "../ui/FadeUp";

export default function ExpertsSection() {
  return (
    <FadeUp>
    <section
      id="experts"
      className="py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-2 uppercase tracking-[6px] text-rose-700">
              Our Artists
            </p>

            <h2 className="text-5xl font-bold">
              Meet the Experts
            </h2>
          </div>

          <button className="flex items-center gap-2 font-medium text-gray-700 transition hover:text-rose-700">
            View Entire Team

            <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {experts.map((expert) => (
            <ExpertCard
              key={expert.id}
              expert={expert}
            />
          ))}
        </div>
      </div>
    </section>
    </FadeUp>
  );
}