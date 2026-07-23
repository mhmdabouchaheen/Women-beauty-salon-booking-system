"use client";

import { useState } from "react";
import { X, Scissors } from "lucide-react";
import Swal from "sweetalert2";

import { AdminService, apiRequest } from "@/src/types/admin-ui";

interface Props {
  open: boolean;
  editing: boolean;
  service: AdminService | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function AddServiceModal({
  open,
  editing,
  service,
  onClose,
  onSaved,
}: Props) {
  const [name, setName] = useState(service?.name ?? "");
  const [description, setDescription] = useState(service?.description ?? "");
  const [category, setCategory] = useState(service?.category ?? "");
  const [duration, setDuration] = useState(service?.duration ?? "");
  const [price, setPrice] = useState(service?.price.toString() ?? "");
  const [image, setImage] = useState(service?.image ?? "");
  const [featured, setFeatured] = useState(service?.featured ?? true);

  if (!open) return null;

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();
    try {
      const minutes = Number.parseInt(duration, 10);
      await apiRequest(editing && service ? `/api/services/${service.id}` : "/api/services", {
        method: editing ? "PATCH" : "POST",
        body: JSON.stringify({ name, description, category, duration: minutes, price: Number(price), image, featured }),
      });
      await Swal.fire({ icon: "success", title: editing ? "Service Updated" : "Service Added", confirmButtonColor: "#be185d" });
      onSaved();
      onClose();
    } catch (error: unknown) {
      await Swal.fire({ icon: "error", title: "Could not save service", text: error instanceof Error ? error.message : "Request failed", confirmButtonColor: "#be185d" });
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5 backdrop-blur-sm">

      <div className="max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-rose-100 p-7">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-rose-100 p-3">

              <Scissors
                size={28}
                className="text-rose-700"
              />

            </div>

            <div>

              <h2 className="text-3xl font-bold">

                {editing
                  ? "Edit Service"
                  : "Add Service"}

              </h2>

              <p className="text-gray-500">
                Manage your salon services.
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-gray-100"
          >
            <X />
          </button>

        </div>

        <form
          onSubmit={submitForm}
          className="space-y-7 p-8"
        >
        {/* Image */}

<div>

  <label className="mb-2 block font-medium">
    Service Image
  </label>

  <input
    type="text"
    value={image}
    onChange={(e) => setImage(e.target.value)}
    placeholder="/services/hair.jpg"
    className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-rose-400"
  />

  <p className="mt-2 text-sm text-gray-500">
    For now we&apos;ll use an image path. Later this will become an upload.
  </p>

</div>

{/* Name */}

<div>

  <label className="mb-2 block font-medium">
    Service Name
  </label>

  <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Luxury Hair Styling"
    className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-rose-400"
  />

</div>

{/* Description */}

<div>

  <label className="mb-2 block font-medium">
    Description
  </label>

  <textarea
    rows={4}
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    placeholder="Describe the service..."
    className="w-full resize-none rounded-xl border border-gray-200 p-3 outline-none transition focus:border-rose-400"
  />

</div>

{/* Category + Duration */}

<div className="grid gap-6 md:grid-cols-2">

  <div>

    <label className="mb-2 block font-medium">
      Category
    </label>

    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-rose-400"
    >

      <option value="">
        Select category
      </option>

      <option>Hair</option>

      <option>Nails</option>

      <option>Facial</option>

      <option>Massage</option>

      <option>Makeup</option>

      <option>Waxing</option>

    </select>

  </div>

  <div>

    <label className="mb-2 block font-medium">
      Duration
    </label>

    <select
      value={duration}
      onChange={(e) => setDuration(e.target.value)}
      className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-rose-400"
    >

      <option value="">
        Select duration
      </option>

      <option>30 min</option>

      <option>45 min</option>

      <option>60 min</option>

      <option>90 min</option>

      <option>120 min</option>

    </select>

  </div>

</div>

{/* Price */}

<div>

  <label className="mb-2 block font-medium">
    Price ($)
  </label>

  <input
    type="number"
    min={0}
    value={price}
    onChange={(e) => setPrice(e.target.value)}
    placeholder="50"
    className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-rose-400"
  />

</div>

{/* Homepage */}

<div className="rounded-2xl border border-rose-100 bg-rose-50 p-5">

  <div className="flex items-center justify-between">

    <div>

      <h3 className="font-semibold text-gray-800">
        Show on Homepage
      </h3>

      <p className="text-sm text-gray-500">
        Display this service in the customer website.
      </p>

    </div>

    <button
      type="button"
      onClick={() => setFeatured(!featured)}
      className={`relative h-7 w-14 rounded-full transition ${
        featured
          ? "bg-rose-700"
          : "bg-gray-300"
      }`}
    >

      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
          featured
            ? "left-8"
            : "left-1"
        }`}
      />

    </button>

  </div>

</div>
        {/* Footer */}

        <div className="flex flex-col-reverse gap-3 border-t border-rose-100 pt-6 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-6 py-3 font-medium transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-xl bg-rose-700 px-6 py-3 font-medium text-white transition hover:bg-rose-800"
          >
            {editing
              ? "Save Changes"
              : "Create Service"}
          </button>

        </div>

      </form>

    </div>

  </div>

);
}
