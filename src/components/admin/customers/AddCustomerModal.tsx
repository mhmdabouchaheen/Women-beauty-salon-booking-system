"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UserCheck, X } from "lucide-react";

import { Customer } from "@/src/data/customersAdmin";

interface Props {
  open: boolean;
  editing?: boolean;
  customer: Customer | null;
  onClose: () => void;
}

export default function AddCustomerModal({
  open,
  customer,
  onClose,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!open) return;

    if (customer) {
      setName(customer.name);
      setEmail(customer.email);
      setImage(customer.image);
    }
  }, [open, customer]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await Swal.fire({
      icon: "success",
      title: "Customer Updated",
      text: "Customer updated successfully.",
      confirmButtonColor: "#be185d",
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-rose-100 p-7">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-rose-100 p-3">
              <UserCheck size={28} className="text-rose-700" />
            </div>

            <div>
              <h2 className="text-3xl font-bold">Edit Customer</h2>
              <p className="text-gray-500">Update customer information.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          <div>
            <label className="mb-2 block font-medium">Profile Image</label>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="/customers/customer1.jpg"
              className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-400"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Sarah Johnson"
              className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-400"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="customer@email.com"
              className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-400"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-rose-100 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-6 py-3 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-rose-700 px-6 py-3 font-medium text-white hover:bg-rose-800"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}