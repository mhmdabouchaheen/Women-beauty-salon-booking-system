"use client";

import { StaffMember } from "@/src/data/staffMembers";
import StaffCard from "./StaffCard";

interface Props {
  staff: StaffMember[];
  onEdit: (staff: StaffMember) => void;
}

export default function StaffGrid({
  staff,
  onEdit,
}: Props) {
  if (staff.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-rose-200 bg-white py-24 text-center">

        <h2 className="text-3xl font-semibold">
          No staff found
        </h2>

        <p className="mt-4 text-gray-500">
          Try another search or add a new staff member.
        </p>

      </div>
    );
  }

  return (
    <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">

      {staff.map((member) => (
        <StaffCard
          key={member.id}
          staff={member}
          onEdit={onEdit}
        />
      ))}

    </div>
  );
}