"use client";

import { useMemo, useState } from "react";

import CustomerHeader from "@/src/components/admin/customers/CustomerHeader";
import CustomerSearch from "@/src/components/admin/customers/CustomerSearch";
import CustomerTable from "@/src/components/admin/customers/CustomerTable";
import CustomerPagination from "@/src/components/admin/customers/CustomerPagination";
import AddCustomerModal from "@/src/components/admin/customers/AddCustomerModal";

import {
  Customer,
  customersAdmin,
} from "@/src/data/customersAdmin";

export default function CustomersPage() {
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

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
  }, [search]);

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
      />

      <CustomerPagination />

      <AddCustomerModal
        open={open}
        editing={selectedCustomer !== null}
        customer={selectedCustomer}
        onClose={() => setOpen(false)}
      />

    </div>
  );
}