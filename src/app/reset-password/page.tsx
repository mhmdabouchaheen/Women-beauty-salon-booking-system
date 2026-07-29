"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Icon from "@/src/components/auth/Icon";

function ReqItem({ met, children }: { met: boolean; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3 text-[13px] text-on-surface-variant">
      <Icon
        name={met ? "check_circle" : "radio_button_unchecked"}
        filled={met}
        className={`text-lg ${met ? "text-tertiary" : "text-outline-variant"}`}
      />
      {children}
    </li>
  );
}

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState("");

  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumberOrSymbol = /[0-9\W]/.test(password);
  const passwordsMatch = password.length > 0 && password === confirm;

  const canSubmit = useMemo(
    () => hasLength && hasUpper && hasNumberOrSymbol && passwordsMatch,
    [hasLength, hasUpper, hasNumberOrSymbol, passwordsMatch]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("loading");
    setError("");
    try {
      const token = new URLSearchParams(window.location.search).get("token");
      if (!token) throw new Error("This reset link is missing its secure token.");
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "Password reset failed");
      setStatus("success");
    } catch (resetError: unknown) {
      setError(resetError instanceof Error ? resetError.message : "Password reset failed");
      setStatus("idle");
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-body-md text-on-surface">
      {/* Header / Brand Anchor */}
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-white/40 h-20 flex items-center px-margin-mobile md:px-margin-desktop justify-between">
        <div className="font-headline-md text-headline-md text-primary italic tracking-tight">
          Glow Beauty Salon
        </div>
        <div className="hidden md:flex items-center gap-8 font-label-md text-label-md text-on-surface-variant">
          <a className="hover:text-primary transition-colors" href="#">
            Services
          </a>
          <a className="hover:text-primary transition-colors" href="#">
            Experts
          </a>
          <a className="hover:text-primary transition-colors" href="#">
            About
          </a>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-margin-mobile">
        <div className="w-full max-w-lg">
          <div className="glass-panel rounded-[24px] p-8 md:p-12 soft-shadow border border-tertiary-fixed/30 relative overflow-hidden">
            {/* Subtle gold accent line at top */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-tertiary-container via-tertiary to-tertiary-container opacity-60" />

            <div className="text-center mb-10">
              <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-3">
                Reset Password
              </h1>
              <p className="font-body-md text-on-surface-variant max-w-xs mx-auto">
                Create a new, secure password to access your Glow Beauty
                account.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
              {/* New Password Input */}
              <div className="space-y-2">
                <label
                  className="block font-label-md text-label-md text-on-surface-variant ml-1"
                  htmlFor="new-password"
                >
                  New Password
                </label>
                <div className="relative">
                  <Icon
                    name="lock"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                  />
                  <input
                    id="new-password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-secondary-container/20 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-outline-variant/60"
                  />
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <label
                  className="block font-label-md text-label-md text-on-surface-variant ml-1"
                  htmlFor="confirm-password"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <Icon
                    name="verified_user"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                  />
                  <input
                    id="confirm-password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-secondary-container/20 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-outline-variant/60"
                  />
                </div>
              </div>

              {/* Password Hints Section */}
              <div className="bg-surface-container-lowest/50 rounded-2xl p-6 border border-outline-variant/30">
                <h3 className="font-label-md text-label-md text-on-surface mb-3 flex items-center gap-2">
                  <Icon name="info" filled className="text-sm" />
                  Password Requirements
                </h3>
                <ul className="space-y-2">
                  <ReqItem met={hasLength}>At least 8 characters long</ReqItem>
                  <ReqItem met={hasUpper}>Include one uppercase letter</ReqItem>
                  <ReqItem met={hasNumberOrSymbol}>
                    Include one number or symbol
                  </ReqItem>
                </ul>
              </div>

              {/* Primary Action */}
              <button
                type="submit"
                disabled={!canSubmit || status === "loading"}
                className="w-full h-14 bg-primary text-white font-button-text text-button-text rounded-full shadow-[0_8px_16px_rgba(171,37,84,0.25)] hover:shadow-[0_12px_24px_rgba(171,37,84,0.35)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
              >
                {status === "loading" && (
                  <Icon name="progress_activity" className="animate-spin" />
                )}
                {status === "success" ? (
                  <>
                    <Icon name="check" /> Success
                  </>
                ) : status === "loading" ? (
                  "Resetting..."
                ) : (
                  "Reset Password"
                )}
              </button>

              {/* Back Link */}
              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 font-label-md text-label-md text-tertiary hover:text-primary transition-colors"
                >
                  <Icon name="arrow_back" className="text-lg" />
                  Back to Sign In
                </Link>
              </div>
            </form>
          </div>

          {/* Branding/Footer Info */}
          <p className="text-center mt-8 font-label-md text-label-md text-outline-variant">
            © {new Date().getFullYear()} Glow Beauty Salon. All rights
            reserved.
          </p>
        </div>
      </main>
    </div>
  );
}
