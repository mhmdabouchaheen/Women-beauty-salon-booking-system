import { Users } from "lucide-react";
import ExpertCard from "@/src/components/ui/ExpertCard";
import { experts } from "@/src/data/experts";

// TODO(backend): swap the mock `experts` import above for a real fetch once
// a backend exists again.
export default function DashboardExpertsPage() {
  return (
    <>
      <div className="mb-10 flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-rose-700 to-pink-600 p-8 text-white lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
            <Users size={30} />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Meet the Experts</h1>
            <p className="mt-2 text-rose-100">
              Browse our stylists and specialists, and find your favorite.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {experts.map((expert) => (
          <ExpertCard key={expert.id} expert={expert} />
        ))}
      </div>
    </>
  );
}
