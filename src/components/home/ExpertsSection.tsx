import { getAllStaff } from "@/src/repositories/staff.repository";

import ExpertCard from "../ui/ExpertCard";
import FadeUp from "../ui/FadeUp";

export default async function ExpertsSection() {
  const records = await getAllStaff();
  const experts = records
    .filter((staff) => staff.active !== false)
    .map((staff) => ({
      id: staff._id.toString(),
      name: staff.name,
      role: staff.specialty,
      image: staff.image || "/staff/emma.jpg",
    }));

  return (
    <FadeUp>
      <section id="experts" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16">
            <p className="mb-2 uppercase tracking-[6px] text-rose-700">
              Our Artists
            </p>
            <h2 className="text-5xl font-bold">Meet the Experts</h2>
          </div>

          {experts.length === 0 ? (
            <div className="rounded-3xl border border-rose-100 bg-rose-50 p-10 text-center text-gray-600">
              Our team profiles are being updated. Please check back soon.
            </div>
          ) : (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {experts.map((expert) => (
                <ExpertCard key={expert.id} expert={expert} />
              ))}
            </div>
          )}
        </div>
      </section>
    </FadeUp>
  );
}
