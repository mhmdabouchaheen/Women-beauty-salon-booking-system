"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import StaffHeader from "@/src/components/admin/staff/StaffHeader";
import StaffSearch from "@/src/components/admin/staff/StaffSearch";
import StaffGrid from "@/src/components/admin/staff/StaffGrid";
import AddStaffModal from "@/src/components/admin/staff/AddStaffModal";

import { AdminService, StaffMember, apiRequest } from "@/src/types/admin-ui";

export default function StaffPage() {
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "All" | "Available" | "Leave"
  >("All");

  const [open, setOpen] = useState(false);

  const [selectedStaff, setSelectedStaff] =
    useState<StaffMember | null>(null);
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [services, setServices] = useState<AdminService[]>([]);

  const loadData = useCallback(async () => {
    const [staffData, serviceData] = await Promise.all([
      apiRequest<{ staff: Array<{
        _id: string; name: string; specialty: string; image?: string; active?: boolean;
        serviceIds: Array<{ _id: string; name: string }>;
        weeklySchedule: Array<{ dayOfWeek: number; startTime: string; endTime: string }>;
        holidays: Array<{ date: string; reason?: string }>;
      }> }>("/api/staff"),
      apiRequest<{ services: Array<{ _id: string; name: string; description: string; category?: string; duration: number; price: number; image?: string; featured?: boolean }> }>("/api/services"),
    ]);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    setStaffMembers(staffData.staff.map((member) => ({
      id: member._id,
      name: member.name,
      specialty: member.specialty,
      image: member.image || "/window.svg",
      active: member.active ?? true,
      services: member.serviceIds.map((service) => service.name),
      serviceIds: member.serviceIds.map((service) => service._id),
      workingDays: member.weeklySchedule.map((hours) => dayNames[hours.dayOfWeek]),
      startHour: member.weeklySchedule[0]?.startTime ?? "09:00",
      endHour: member.weeklySchedule[0]?.endTime ?? "17:00",
      holidays: member.holidays ?? [],
    })));
    setServices(serviceData.services.map((service) => ({
      id: service._id,
      name: service.name,
      description: service.description,
      category: service.category ?? "Other",
      duration: `${service.duration} min`,
      price: service.price,
      image: service.image || "/window.svg",
      featured: service.featured ?? true,
    })));
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => void loadData(), 0);
    return () => window.clearTimeout(timeout);
  }, [loadData]);

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
  }, [staffMembers, search, filter]);

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
        onDeleted={loadData}
      />

      {open && <AddStaffModal
        open={open}
        editing={selectedStaff !== null}
        staff={selectedStaff}
        onClose={() => setOpen(false)}
        onSaved={loadData}
        services={services}
      />}

    </div>
  );
}
