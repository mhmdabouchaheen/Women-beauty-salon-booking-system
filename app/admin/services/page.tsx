"use client";

import { useMemo, useState } from "react";

import ServiceHeader from "@/src/components/admin/services/ServiceHeader";
import ServiceSearch from "@/src/components/admin/services/ServiceSearch";
import ServiceTable from "@/src/components/admin/services/ServiceTable";
import AddServiceModal from "@/src/components/admin/services/AddServiceModal";

import {
  AdminService,
  adminServices,
} from "@/src/data/adminServices";

export default function ServicesPage() {
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [editing, setEditing] = useState(false);

  const [selectedService, setSelectedService] =
    useState<AdminService | null>(null);

  const filteredServices = useMemo(() => {
    return adminServices.filter((service) => {
      return (
        service.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        service.category
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [search]);

  return (
    <div className="space-y-6">

      <ServiceHeader
        onAdd={() => {
          setEditing(false);
          setSelectedService(null);
          setOpen(true);
        }}
      />

      <ServiceSearch
        value={search}
        onChange={setSearch}
      />

      <ServiceTable
        services={filteredServices}
        onEdit={(service) => {
          setSelectedService(service);
          setEditing(true);
          setOpen(true);
        }}
      />

      <AddServiceModal
        open={open}
        editing={editing}
        service={selectedService}
        onClose={() => setOpen(false)}
      />

    </div>
  );
}