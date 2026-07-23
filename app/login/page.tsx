"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { apiRequest } from "@/src/types/admin-ui";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const result = await apiRequest<{ user: { role: "customer" | "admin" } }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const requested = new URLSearchParams(window.location.search).get("next");
      router.replace(requested?.startsWith("/") ? requested : result.user.role === "admin" ? "/admin" : "/");
      router.refresh();
    } catch (requestError: unknown) {
      setError(requestError instanceof Error ? requestError.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-rose-50 p-6">
      <form onSubmit={submit} className="w-full max-w-md space-y-5 rounded-3xl bg-white p-8 shadow-xl">
        <div>
          <h1 className="text-3xl font-bold text-rose-700">Glow Login</h1>
          <p className="mt-2 text-gray-500">Sign in to continue.</p>
        </div>
        {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <label className="block">
          <span className="mb-2 block font-medium">Email</span>
          <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-gray-200 p-3" />
        </label>
        <label className="block">
          <span className="mb-2 block font-medium">Password</span>
          <input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-gray-200 p-3" />
        </label>
        <button disabled={submitting} className="w-full rounded-xl bg-rose-700 px-5 py-3 font-semibold text-white disabled:opacity-60">
          {submitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </main>
  );
}
