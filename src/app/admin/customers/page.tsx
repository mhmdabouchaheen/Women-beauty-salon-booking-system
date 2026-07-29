"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import CustomerHeader from "@/src/components/admin/customers/CustomerHeader";
import CustomerSearch from "@/src/components/admin/customers/CustomerSearch";
import CustomerTable from "@/src/components/admin/customers/CustomerTable";
import CustomerPagination from "@/src/components/admin/customers/CustomerPagination";
import AddCustomerModal from "@/src/components/admin/customers/AddCustomerModal";

import { Customer, apiRequest } from "@/src/types/admin-ui";

export default function CustomersPage() {
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);
  const [customersAdmin, setCustomersAdmin] = useState<Customer[]>([]);
  const loadCustomers = useCallback(async () => {
    const data = await apiRequest<{ customers: Array<{ _id: string; name: string; email: string; image?: string; appointmentCount: number; lastAppointment?: string }> }>("/api/admin/customers");
    setCustomersAdmin(data.customers.map((customer) => ({
      id: customer._id,
      name: customer.name,
      email: customer.email,
      image: customer.image || "/window.svg",
      appointments: customer.appointmentCount,
      lastAppointment: customer.lastAppointment ? new Date(customer.lastAppointment).toLocaleDateString() : "No visits",
    })));
  }, []);
  useEffect(() => {
    const timeout = window.setTimeout(() => void loadCustomers(), 0);
    return () => window.clearTimeout(timeout);
  }, [loadCustomers]);

  const filteredCustomers = useMemo(() => {
    return customersAdmin.filter((customer) => {
      return (
        customer.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        customer.email
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [customersAdmin, search]);

  return (
    <div className="space-y-6">

      <CustomerHeader
        total={customersAdmin.length}
        onAdd={() => {
          setSelectedCustomer(null);
          setOpen(true);
        }}
      />

      <CustomerSearch
        value={search}
        onChange={setSearch}
      />

      <CustomerTable
        customers={filteredCustomers}
        onEdit={(customer) => {
          setSelectedCustomer(customer);
          setOpen(true);
        }}
        onDeleted={loadCustomers}
      />

      <CustomerPagination />

      {open && <AddCustomerModal
        open={open}
        editing={selectedCustomer !== null}
        customer={selectedCustomer}
        onClose={() => setOpen(false)}
        onSaved={loadCustomers}
      />}

    </div>
  );
}
