"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";
import { useEffect } from "react";

export default function StripePaymentCancelled({ reservationId }: { reservationId: string }) {
  useEffect(() => {
    if (!reservationId) return;
    void fetch("/api/payments/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reservationId }),
    });
  }, [reservationId]);

  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-rose-100 bg-white p-9 text-center shadow-sm">
      <XCircle className="mx-auto text-amber-600" size={56} />
      <h1 className="mt-5 text-3xl font-bold text-gray-900">Payment cancelled</h1>
      <p className="mt-3 text-gray-600">
        You were not charged. The temporary appointment reservation has been released.
      </p>
      <Link
        href="/dashboard/book"
        className="mt-7 inline-flex rounded-xl bg-rose-700 px-6 py-3 font-semibold text-white"
      >
        Return to Booking
      </Link>
    </section>
  );
}
