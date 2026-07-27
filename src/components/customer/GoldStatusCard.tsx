"use client";

import { Award, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  getRewardLevel,
  getRewardTier,
  POINTS_PER_LEVEL,
  REWARD_REDEMPTION_COST,
} from "@/src/config/rewards";

export default function GoldStatusCard({
  points,
  lifetimePoints,
}: {
  points: number;
  lifetimePoints: number;
}) {
  const router = useRouter();
  const [redeeming, setRedeeming] = useState(false);
  const [message, setMessage] = useState("");
  const level = getRewardLevel(lifetimePoints);
  const tier = getRewardTier(level);
  const pointsInLevel = lifetimePoints % POINTS_PER_LEVEL;
  const pointsToNextLevel = POINTS_PER_LEVEL - pointsInLevel;
  const progress = (pointsInLevel / POINTS_PER_LEVEL) * 100;
  const canRedeem = points >= REWARD_REDEMPTION_COST;

  async function redeem() {
    setRedeeming(true);
    setMessage("");
    try {
      const response = await fetch("/api/auth/rewards/redeem", { method: "POST" });
      const result = await response.json() as { message?: string };
      setMessage(result.message ?? (response.ok ? "Reward redeemed." : "Could not redeem reward."));
      if (response.ok) router.refresh();
    } finally {
      setRedeeming(false);
    }
  }

  return (
    <div className="relative flex flex-col overflow-hidden rounded-[24px] bg-primary-container p-8 text-on-primary-container shadow-xl">
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-tertiary-fixed-dim/20 blur-3xl" />

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Award size={32} />
            <h2 className="font-headline-sm text-headline-sm">{tier} Status</h2>
          </div>
          <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-bold">
            Level {level}
          </span>
        </div>

        <p className="mb-2 text-3xl font-bold">{points} available points</p>
        <p className="mb-7 font-body-md text-body-md opacity-90">
          {pointsToNextLevel} lifetime points until Level {level + 1}.
        </p>

        <div className="mb-4">
          <div className="mb-2 flex justify-between font-label-md text-label-md">
            <span>{pointsInLevel} / {POINTS_PER_LEVEL}</span>
            <span>{lifetimePoints} lifetime pts</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-gradient-to-r from-secondary-fixed to-white"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {message && <p className="mt-3 rounded-xl bg-white/15 p-3 text-sm">{message}</p>}

        <button
          type="button"
          disabled={!canRedeem || redeeming}
          onClick={() => void redeem()}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-4 font-button-text text-button-text text-primary shadow-md transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
        >
          {redeeming && <LoaderCircle size={18} className="animate-spin" />}
          {canRedeem ? `Redeem ${REWARD_REDEMPTION_COST} Points` : `${REWARD_REDEMPTION_COST - points} More Points to Redeem`}
        </button>
      </div>
    </div>
  );
}
