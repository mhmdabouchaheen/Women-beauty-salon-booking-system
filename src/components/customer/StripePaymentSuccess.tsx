"use client";

import Link from "next/link";
import { CheckCircle2, LoaderCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function StripePaymentSuccess({ sessionId }: { sessionId: string }) {
  const [state, setState] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your payment with Stripe...");

  useEffect(() => {
    let active = true;
    async function confirm() {
      try {
        const response = await fetch("/api/payments/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const result = await response.json() as { message?: string };
        if (!response.ok) throw new Error(result.message ?? "Payment verification failed.");
        if (active) {
          setState("success");
          setMessage("Payment confirmed and your appointment has been booked.");
        }
      } catch (error: unknown) {
        if (active) {
          setState("error");
          setMessage(error instanceof Error ? error.message : "Payment verification failed.");
        }
      }
    }
    void confirm();
    return () => {
      active = false;
    };
  }, [sessionId]);

  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-rose-100 bg-white p-9 text-center shadow-sm">
      {state === "loading" && <LoaderCircle className="mx-auto animate-spin text-rose-700" size={52} />}
      {state === "success" && <CheckCircle2 className="mx-auto text-emerald-600" size={56} />}
      {state === "error" && <XCircle className="mx-auto text-red-600" size={56} />}
      <h1 className="mt-5 text-3xl font-bold text-gray-900">
        {state === "loading" ? "Confirming payment" : state === "success" ? "Appointment confirmed" : "Verification issue"}
      </h1>
      <p className="mt-3 text-gray-600">{message}</p>
      {state !== "loading" && (
        <Link
          href={state === "success" ? "/dashboard/history" : "/dashboard/book"}
          className="mt-7 inline-flex rounded-xl bg-rose-700 px-6 py-3 font-semibold text-white"
        >
          {state === "success" ? "View Appointments" : "Return to Booking"}
        </Link>
      )}
    </section>
  );
}
