"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import ServiceHeader from "@/src/components/admin/services/ServiceHeader";
import ServiceSearch from "@/src/components/admin/services/ServiceSearch";
import ServiceTable from "@/src/components/admin/services/ServiceTable";
import AddServiceModal from "@/src/components/admin/services/AddServiceModal";

import { AdminService, apiRequest } from "@/src/types/admin-ui";

export default function ServicesPage() {
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [editing, setEditing] = useState(false);

  const [selectedService, setSelectedService] =
    useState<AdminService | null>(null);
  const [adminServices, setAdminServices] = useState<AdminService[]>([]);

  const loadServices = useCallback(async () => {
    const data = await apiRequest<{ services: Array<{
      _id: string; name: string; description: string; category?: string; duration: number;
      price: number; featured?: boolean; image?: string;
    }> }>("/api/services");
    setAdminServices(data.services.map((service) => ({
      id: service._id,
      name: service.name,
      description: service.description,
      category: service.category ?? "Other",
      duration: `${service.duration} min`,
      price: service.price,
      featured: service.featured ?? true,
      image: service.image || "/window.svg",
    })));
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => void loadServices(), 0);
    return () => window.clearTimeout(timeout);
  }, [loadServices]);

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
  }, [adminServices, search]);

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
        onDeleted={loadServices}
      />

      {open && <AddServiceModal
        open={open}
        editing={editing}
        service={selectedService}
        onClose={() => setOpen(false)}
        onSaved={loadServices}
      />}

    </div>
  );
}
