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

interface Props {
  points: number;
  lifetimePoints: number;
}

export default function GoldStatusCard({ points, lifetimePoints }: Props) {
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
      const result = (await response.json()) as { message?: string };
      setMessage(result.message ?? (response.ok ? "Reward redeemed." : "Could not redeem reward."));
      if (response.ok) router.refresh();
    } finally {
      setRedeeming(false);
    }
  }

  return (
    <div className="relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-rose-700 to-pink-600 p-8 text-white shadow-lg">
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Award size={32} />
            <h2 className="text-xl font-semibold">{tier} Status</h2>
          </div>
          <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-bold">Level {level}</span>
        </div>

        <p className="mb-2 text-3xl font-bold">{points} available points</p>
        <p className="mb-8 text-rose-100">
          {pointsToNextLevel} lifetime points until Level {level + 1}.
        </p>

        <div className="mb-4">
          <div className="mb-2 flex justify-between text-sm font-medium">
            <span>{pointsInLevel} / {POINTS_PER_LEVEL} pts</span>
            <span>{lifetimePoints} lifetime pts</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-white/20">
            <div className="h-full rounded-full bg-white" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {message && <p className="mt-1 rounded-xl bg-white/15 p-3 text-sm">{message}</p>}

        <button
          type="button"
          disabled={!canRedeem || redeeming}
          onClick={() => void redeem()}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-4 font-semibold text-rose-700 shadow-md transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
        >
          {redeeming && <LoaderCircle size={18} className="animate-spin" />}
          {canRedeem ? `Redeem ${REWARD_REDEMPTION_COST} Points` : `${REWARD_REDEMPTION_COST - points} More Points to Redeem`}
        </button>
      </div>
    </div>
  );
}
