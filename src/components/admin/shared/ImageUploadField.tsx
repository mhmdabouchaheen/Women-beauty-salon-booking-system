"use client";

import { ImagePlus, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";

export default function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (imageUrl: string) => void;
}) {
  const inputId = useId();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const body = new FormData();
      body.append("image", file);
      const response = await fetch("/api/images", { method: "POST", body });
      const result = await response.json() as { imageUrl?: string; message?: string };
      if (!response.ok || !result.imageUrl) {
        throw new Error(result.message ?? "Image upload failed.");
      }
      onChange(result.imageUrl);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="mb-2 block font-medium" htmlFor={inputId}>{label}</label>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-rose-100 bg-rose-50">
          {value ? (
            <Image src={value} alt={`${label} preview`} fill sizes="112px" className="object-cover" />
          ) : (
            <ImagePlus className="text-rose-400" size={30} />
          )}
        </div>
        <div className="flex-1">
          <input
            id={inputId}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            disabled={uploading}
            onChange={(event) => void upload(event.target.files?.[0])}
            className="block w-full rounded-xl border border-gray-200 bg-white p-3 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-rose-100 file:px-4 file:py-2 file:font-semibold file:text-rose-700 hover:file:bg-rose-200 disabled:opacity-60"
          />
          <p className="mt-2 text-sm text-gray-500">JPEG, PNG, WebP, or GIF. Maximum 5 MB.</p>
          {uploading && (
            <p className="mt-2 flex items-center gap-2 text-sm text-rose-700">
              <LoaderCircle size={16} className="animate-spin" /> Uploading image…
            </p>
          )}
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
