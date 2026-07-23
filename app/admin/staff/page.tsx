"use client";

import { useMemo, useState } from "react";

import StaffHeader from "@/src/components/admin/staff/StaffHeader";
import StaffSearch from "@/src/components/admin/staff/StaffSearch";
import StaffGrid from "@/src/components/admin/staff/StaffGrid";
import AddStaffModal from "@/src/components/admin/staff/AddStaffModal";

import {
  StaffMember,
  staffMembers,
} from "@/src/data/staffMembers";

export default function StaffPage() {
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "All" | "Available" | "Leave"
  >("All");

  const [open, setOpen] = useState(false);

  const [selectedStaff, setSelectedStaff] =
    useState<StaffMember | null>(null);

  const filteredStaff = useMemo(() => {
    return staffMembers.filter((member) => {
      const matchesSearch =
        member.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        member.services.some((service) =>
          service
            .toLowerCase()
            .includes(search.toLowerCase())
        );

      const matchesFilter =
        filter === "All"
          ? true
          : filter === "Available"
          ? member.active
          : !member.active;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <div className="space-y-8">

      <StaffHeader
        totalStaff={staffMembers.length}
        activeStaff={
          staffMembers.filter(
            (staff) => staff.active
          ).length
        }
        onAdd={() => {
          setSelectedStaff(null);
          setOpen(true);
        }}
      />

      <StaffSearch
        search={search}
        onSearch={setSearch}
        filter={filter}
        onFilter={setFilter}
      />

      <StaffGrid
        staff={filteredStaff}
        onEdit={(member) => {
          setSelectedStaff(member);
          setOpen(true);
        }}
      />

      <AddStaffModal
        open={open}
        editing={selectedStaff !== null}
        staff={selectedStaff}
        onClose={() => setOpen(false)}
      />

    </div>
  );
}