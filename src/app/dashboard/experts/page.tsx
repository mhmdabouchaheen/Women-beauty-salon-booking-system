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

      {experts.length === 0 ? (
        <div className="rounded-3xl border border-rose-100 bg-white p-12 text-center text-gray-600">
          No active experts are available right now.
        </div>
      ) : (
        <>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {experts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/dashboard/book"
              className="inline-flex rounded-xl bg-rose-700 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-rose-800"
            >
              Book with an Expert
            </Link>
          </div>
        </>
      )}
    </>
  );
}
