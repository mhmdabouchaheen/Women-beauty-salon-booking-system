"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/src/components/auth/Icon";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "Could not request reset link");
      setStep(2);
    } catch (requestError: unknown) {
      setError(requestError instanceof Error ? requestError.message : "Could not request reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-secondary-container/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[300px] h-[300px] bg-primary-fixed/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full max-w-[480px] relative z-10">
        {/* Logo Area */}
        <div className="text-center mb-12">
          <h1 className="font-headline-md text-headline-md text-primary italic tracking-tight mb-2">
            Glow Beauty Salon
          </h1>
          <p className="font-body-md text-on-surface-variant opacity-70">
            Elevating your natural radiance
          </p>
        </div>

        <div className="bg-surface-container-lowest rounded-[32px] p-8 sm:p-12 soft-shadow border border-white/60 relative overflow-hidden min-h-[420px]">
          {step === 1 ? (
            <div className="transition-all duration-500">
              <header className="mb-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-secondary-container rounded-2xl flex items-center justify-center mb-6">
                  <Icon name="lock_reset" className="text-primary text-3xl" />
                </div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface mb-3">
                  Forgot password?
                </h2>
                <p className="font-body-md text-on-surface-variant">
                  No worries, we&apos;ll send you reset instructions. Please
                  enter the email associated with your account.
                </p>
              </header>
              <form className="space-y-6 flex flex-col items-center" onSubmit={handleSubmit}>
                {error && <p className="w-full rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                <div className="w-full space-y-2 text-center">
                  <label
                    className="block font-label-md text-label-md text-on-surface-variant"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="e.g. elena@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 px-5 bg-surface-container-low border border-outline-variant rounded-2xl font-body-md text-on-surface text-center focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-on-surface-variant/40"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-primary text-white font-button-text text-button-text rounded-2xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98]"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
              <footer className="mt-8 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 font-label-md text-label-md text-primary hover:text-primary-container transition-colors group"
                >
                  <Icon
                    name="arrow_back"
                    className="text-sm group-hover:-translate-x-1 transition-transform"
                  />
                  Back to Sign In
                </Link>
              </footer>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-center text-center">
              <div className="w-20 h-20 bg-tertiary-container/20 rounded-full flex items-center justify-center mb-8 mx-auto relative">
                <div className="absolute inset-0 bg-tertiary-container/10 rounded-full animate-ping" />
                <Icon
                  name="mark_email_read"
                  className="text-tertiary text-4xl relative z-10"
                />
              </div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface mb-4">
                Check your email
              </h2>
              <p className="font-body-md text-on-surface-variant mb-10">
                We have sent a password recover link to <br />
                <span className="font-semibold text-on-surface">{email}</span>
              </p>
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full h-14 bg-secondary-container text-primary font-button-text text-button-text rounded-2xl hover:bg-secondary-fixed transition-all active:scale-[0.98]"
                >
                  Open Email App
                </button>
                <p className="font-body-md text-on-surface-variant text-sm">
                  Didn&apos;t receive the email?{" "}
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-primary font-semibold hover:underline"
                  >
                    Click to resend
                  </button>
                </p>
              </div>
              <footer className="mt-12">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                >
                  <Icon name="arrow_back" className="text-sm" />
                  Back to Sign In
                </Link>
              </footer>
            </div>
          )}
        </div>

        {/* Support Info */}
        <p className="mt-8 text-center font-label-md text-label-md text-on-surface-variant/60">
          Need help? Contact our{" "}
          <a
            href="#"
            className="text-primary underline underline-offset-4 decoration-primary/30"
          >
            Concierge Team
          </a>
        </p>
      </div>
    </main>
  );
}
