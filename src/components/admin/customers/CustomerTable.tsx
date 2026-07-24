"use client";

import { Customer } from "@/src/types/admin-ui";
import CustomerRow from "./CustomerRow";

interface Props {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDeleted: () => void;
}

export default function CustomerTable({
  customers,
  onEdit,
  onDeleted,
}: Props) {
  if (customers.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-rose-200 bg-white py-24 text-center">

        <h2 className="text-3xl font-semibold">
          No customers found
        </h2>

        <p className="mt-3 text-gray-500">
          Try another search.
        </p>

      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-rose-50">

            <tr className="text-gray-700">

              <th className="px-8 py-5 text-left">
                Customer
              </th>

              <th className="px-6 py-5 text-left">
                Appointments
              </th>

              <th className="px-6 py-5 text-left">
                Last Visit
              </th>

              <th className="px-6 py-5 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {customers.map((customer) => (

              <CustomerRow
                key={customer.id}
                customer={customer}
                onEdit={onEdit}
                onDeleted={onDeleted}
              />

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
