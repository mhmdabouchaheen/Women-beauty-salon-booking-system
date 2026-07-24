"use client";

import { useState } from "react";
import Image from "next/image";
import { ShieldCheck, Pencil, Lock, Smartphone, Award } from "lucide-react";

export interface ProfileViewProps {
  name: string;
  email: string;
  avatar: string;
  memberSince: string;
  points?: number;
  pointsTarget?: number;
}

export default function ProfileView({
  name: initialName,
  email: initialEmail,
  avatar,
  memberSince,
  points = 0,
  pointsTarget = 1000,
}: ProfileViewProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState("");

  const progress = Math.min(100, (points / pointsTarget) * 100);
  const pointsToNextTier = Math.max(0, pointsTarget - points);

  // TODO(backend): wire this up to a real "update profile" endpoint
  // (e.g. PATCH /api/auth/me) once a backend exists again.
  const handleSave = () => {
    setEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Identity card */}
      <section className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(231,84,128,0.05)] border border-white/40 flex flex-wrap items-center gap-6 justify-between">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full overflow-hidden relative shrink-0 border-2 border-primary-fixed">
            <Image
              src={avatar}
              alt={`${name}'s profile portrait`}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              {name}
            </h2>
            <p className="text-on-surface-variant">{email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-md text-[13px]">
            <ShieldCheck size={16} />
            Member since: {memberSince}
          </span>
          <button
            onClick={() => setEditing((v) => !v)}
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-primary text-primary font-label-md text-[13px] hover:bg-primary hover:text-white transition-colors"
          >
            <Pencil size={16} />
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal information */}
        <section className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(231,84,128,0.05)] border border-white/40">
          <h3 className="font-headline-sm text-[20px] font-semibold text-on-surface mb-6">
            Personal Information
          </h3>

          <div className="space-y-5">
            <div>
              <label className="block text-[13px] font-semibold text-on-surface-variant mb-2">
                Full Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!editing}
                className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface disabled:opacity-70 focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-on-surface-variant mb-2">
                Email Address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!editing}
                className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface disabled:opacity-70 focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-on-surface-variant mb-2">
                Phone Number
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!editing}
                placeholder="Not on file"
                className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface disabled:opacity-70 focus:outline-none focus:border-primary"
              />
            </div>

            {editing && (
              <button
                onClick={handleSave}
                className="w-full mt-2 py-3 rounded-xl bg-primary text-on-primary font-button-text text-button-text hover:-translate-y-0.5 transition-transform"
              >
                Save Changes
              </button>
            )}
          </div>
        </section>

        {/* Security */}
        <section className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(231,84,128,0.05)] border border-white/40">
          <h3 className="font-headline-sm text-[20px] font-semibold text-on-surface mb-6">
            Security
          </h3>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low">
              <div className="w-12 h-12 rounded-full bg-secondary-container/50 flex items-center justify-center text-primary shrink-0">
                <Lock size={20} />
              </div>
              <div className="flex-1">
                <p className="font-label-md text-on-surface">Password</p>
                <p className="text-[13px] text-on-surface-variant">
                  Managed via your account credentials
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low">
              <div className="w-12 h-12 rounded-full bg-secondary-container/50 flex items-center justify-center text-primary shrink-0">
                <Smartphone size={20} />
              </div>
              <div className="flex-1">
                <p className="font-label-md text-on-surface">
                  Active Session
                </p>
                <p className="text-[13px] text-on-surface-variant">
                  You&apos;re currently signed in on this device
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Rewards */}
      <section className="relative bg-primary-container text-on-primary-container rounded-[24px] p-8 shadow-xl overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Award size={28} />
              <h3 className="font-headline-sm text-headline-sm">
                Glow Rewards
              </h3>
            </div>
            <span className="px-4 py-2 rounded-full bg-white text-primary font-bold">
              {points} Points
            </span>
          </div>

          <p className="font-body-md text-body-md opacity-90 mb-6">
            You&apos;re {pointsToNextTier} points away from your next
            complimentary treatment.
          </p>

          <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-secondary-fixed to-white"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-[12px] font-semibold uppercase tracking-wide opacity-90">
            <span>Silver Tier</span>
            <span>Gold Tier</span>
          </div>
        </div>
      </section>
    </div>
  );
}
