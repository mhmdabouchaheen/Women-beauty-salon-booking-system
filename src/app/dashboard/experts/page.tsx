import { Bell, Search } from "lucide-react";
import ExpertCard from "@/src/components/ui/ExpertCard";
import { experts } from "@/src/data/experts";

// TODO(backend): swap the mock `experts` import above for a real fetch once
// a backend exists again.
export default function DashboardExpertsPage() {
  return (
    <>
      <header className="flex justify-between items-end mb-10">
        <div className="space-y-1">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
            Meet the Experts
          </h1>
          <p className="text-on-surface-variant font-body-lg text-body-lg">
            Browse our stylists and specialists, and find your favorite.
          </p>
        </div>

        <div className="hidden md:flex gap-4">
          <button
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-xl border border-white/40 text-on-surface-variant hover:text-primary transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>
          <button
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-xl border border-white/40 text-on-surface-variant hover:text-primary transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </div>
      </header>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {experts.map((expert) => (
          <ExpertCard key={expert.id} expert={expert} />
        ))}
      </div>
    </>
  );
}
