"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "@/src/components/auth/Icon";
import PasswordField from "@/src/components/auth/PasswordField";
import SocialButtons from "@/src/components/auth/SocialButtons";
import AuthSidePanel from "@/src/components/auth/AuthSidePanel";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // TODO(backend): wire this up to a real login endpoint (e.g. POST
  // /api/auth/login) once a backend exists again. For now this just
  // simulates a successful login and goes straight to the dashboard.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen flex items-stretch overflow-hidden">
      <AuthSidePanel
        imageSrc="/images/auth-bg.png"
        imageAlt="A woman relaxing on a daybed in a serene, sunlit luxury spa lounge"
        quote="A ritual of self-care and luminous transformation."
      />

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 animated-gradient-bg flex items-center justify-center px-margin-mobile md:px-24 relative">
        <div className="w-full max-w-md space-y-8">
          {/* Form Header */}
          <div className="text-center lg:text-left space-y-2">
            <h2 className="font-headline-md text-headline-md text-primary lg:hidden italic mb-6">
              Glow Beauty Salon
            </h2>
            <h3 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
              Welcome Back
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Access your personalized beauty journey and bookings.
            </p>
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="space-y-2">
              <label
                className="font-label-md text-label-md text-on-surface-variant block uppercase tracking-wider ml-1"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative group">
                <Icon
                  name="mail"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="elena@luxury.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 bg-white/60 border border-outline-variant rounded-xl focus:border-primary transition-all duration-300 font-body-md text-body-md"
                />
              </div>
            </div>

            {/* Password Field */}
            <PasswordField
              id="password"
              label="Password"
              value={password}
              onChange={setPassword}
              leftIcon="lock"
              required
              labelExtra={
                <Link
                  href="/forgot-password"
                  className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors"
                >
                  Forgot Password?
                </Link>
              }
            />

            {/* Remember Me */}
            <div className="flex items-center gap-3 px-1">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 transition-all cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="font-body-md text-body-md text-on-surface-variant cursor-pointer select-none"
              >
                Remember my preferences
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-primary text-on-primary font-button-text text-button-text rounded-xl shadow-lg hover:bg-primary-container hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Icon name="progress_activity" className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In
                  <Icon name="arrow_forward" className="text-[20px]" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative py-4">
            <div aria-hidden="true" className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/50" />
            </div>
            <div className="relative flex justify-center text-label-md uppercase tracking-widest">
              <span className="px-4 bg-background text-outline">
                or continue with
              </span>
            </div>
          </div>

          {/* Social Logins */}
          <SocialButtons />

          {/* Footer Link */}
          <div className="pt-6 text-center">
            <p className="font-body-md text-body-md text-on-surface-variant">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-primary ml-1 hover:underline underline-offset-4 decoration-tertiary transition-all"
              >
                Sign Up
              </Link>
            </p>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl -z-10 floating-accent" />
          <div
            className="absolute -bottom-20 -left-10 w-80 h-80 bg-primary-fixed/20 rounded-full blur-3xl -z-10 floating-accent"
            style={{ animationDelay: "-2s" }}
          />
        </div>
      </div>
    </main>
  );
}
