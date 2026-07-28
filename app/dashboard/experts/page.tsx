import Link from "next/link";
import { Users } from "lucide-react";
import ExpertCard from "@/src/components/ui/ExpertCard";
import { getAllStaff } from "@/src/repositories/staff.repository";

export default async function CustomerExpertsPage() {
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
    <div className="mx-auto max-w-6xl">
      <header className="mb-9 flex items-center gap-5 rounded-3xl bg-gradient-to-r from-rose-700 to-pink-600 p-7 text-white md:p-8">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20">
          <Users size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">Our Experts</h1>
          <p className="mt-1 text-rose-100">
            Meet the specialists available for your next appointment.
          </p>
        </div>
      </header>

      {experts.length === 0 ? (
        <div className="rounded-3xl border border-rose-100 bg-white p-12 text-center text-gray-600">
          No active experts are available right now.
        </div>
      ) : (
        <>
          <div className="grid gap-8 rounded-3xl border border-rose-100 bg-white p-7 shadow-sm sm:grid-cols-2 xl:grid-cols-3">
            {experts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/dashboard/book"
              className="inline-flex rounded-xl bg-rose-700 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-rose-800"
            >
              Book with an Expert
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
