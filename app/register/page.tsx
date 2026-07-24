"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "@/src/components/auth/Icon";
import PasswordField from "@/src/components/auth/PasswordField";
import AuthSidePanel from "@/src/components/auth/AuthSidePanel";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [joinClub, setJoinClub] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      setError("You must accept the terms and privacy policy.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "Registration failed");
      router.replace("/dashboard");
      router.refresh();
    } catch (registrationError: unknown) {
      setError(registrationError instanceof Error ? registrationError.message : "Registration failed");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-stretch overflow-hidden">
      <AuthSidePanel
        imageSrc="/images/auth-bg.png"
        imageAlt="A woman relaxing on a daybed in a serene, sunlit luxury spa lounge"
        quote="Your journey to radiance begins here."
        footerNote="2,400+ members have joined the club this month"
      />

      {/* Right Side: Register Form */}
      <div className="w-full lg:w-1/2 animated-gradient-bg flex flex-col justify-center items-center px-6 py-12 md:px-margin-desktop relative">
        {/* Mobile Brand Logo */}
        <div className="lg:hidden mb-12 w-full text-center">
          <span className="text-primary italic font-headline-md tracking-tight">
            Glow Beauty Salon
          </span>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="font-headline-md text-headline-md text-on-surface mb-2">
              Create your account
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Step into the world of soft luxury and elite beauty services.
            </p>
          </div>

          {error && (
            <p className="mb-6 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="space-y-2">
              <label
                className="font-label-md text-label-md text-on-surface-variant ml-1"
                htmlFor="name"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Elena Rodriguez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="auth-input w-full h-14 px-5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface placeholder:text-outline focus:border-primary focus:ring-0 transition-all outline-none"
                />
                <Icon
                  name="person"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label
                className="font-label-md text-label-md text-on-surface-variant ml-1"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="elena@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input w-full h-14 px-5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface placeholder:text-outline focus:border-primary focus:ring-0 transition-all outline-none"
                />
                <Icon
                  name="mail"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label
                className="font-label-md text-label-md text-on-surface-variant ml-1"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <div className="relative">
                <input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="auth-input w-full h-14 px-5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface placeholder:text-outline focus:border-primary focus:ring-0 transition-all outline-none"
                />
                <Icon
                  name="call"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant"
                />
              </div>
            </div>

            {/* Password */}
            <PasswordField
              id="password"
              label="Password"
              value={password}
              onChange={setPassword}
              required
              inputClassName="auth-input w-full h-14 px-5 pr-12 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface placeholder:text-outline focus:border-primary focus:ring-0 transition-all outline-none"
            />

            {/* Checkboxes */}
            <div className="space-y-4 pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={joinClub}
                  onChange={(e) => setJoinClub(e.target.checked)}
                  className="peer h-5 w-5 mt-1 rounded border-outline-variant text-primary focus:ring-primary/20 cursor-pointer"
                />
                <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">
                  Join the{" "}
                  <span className="text-primary font-bold italic">
                    Glow Club
                  </span>{" "}
                  for exclusive rewards and early access to new services.
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="peer h-5 w-5 mt-1 rounded border-outline-variant text-primary focus:ring-primary/20 cursor-pointer"
                />
                <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">
                  I accept the{" "}
                  <a
                    href="#"
                    className="text-primary underline underline-offset-4 hover:text-primary-container transition-colors"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-primary underline underline-offset-4 hover:text-primary-container transition-colors"
                  >
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-primary text-white rounded-xl font-button-text text-button-text shadow-[0_10px_20px_rgba(171,37,84,0.15)] hover:shadow-[0_15px_30px_rgba(171,37,84,0.25)] hover:bg-primary-container active:scale-[0.98] transition-all duration-300 disabled:opacity-70"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </div>
          </form>

          {/* Social Proof / Alt Sign Up */}
          <div className="mt-10 flex flex-col items-center gap-6">
            <div className="flex items-center gap-4 w-full">
              <div className="h-[1px] bg-outline-variant/30 flex-1" />
              <span className="font-label-md text-label-md text-outline">
                OR SIGN UP WITH
              </span>
              <div className="h-[1px] bg-outline-variant/30 flex-1" />
            </div>
            <div className="flex w-full">
              <button
                type="button"
                className="w-full h-12 border border-outline-variant rounded-xl flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors duration-200"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="font-label-md text-label-md">Google</span>
              </button>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-4">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-bold hover:underline underline-offset-4 ml-1"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Small Print */}
        <footer className="mt-auto pt-12 text-center">
          <p className="font-label-md text-label-md text-outline-variant/60">
            © {new Date().getFullYear()} Glow Beauty Salon. All rights
            reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
