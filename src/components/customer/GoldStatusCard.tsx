import { Award } from "lucide-react";

export default function GoldStatusCard() {
  const points = 750;
  const target = 1000;
  const progress = (points / target) * 100;

  return (
    <div className="relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-rose-700 to-pink-600 p-8 text-white shadow-lg">
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="mb-6 flex items-center gap-3">
          <Award size={32} />
          <h2 className="text-xl font-semibold">Gold Status</h2>
        </div>

        <p className="mb-8 text-rose-100">
          You&apos;re 250 points away from your next complimentary treatment!
        </p>

        <div className="mb-4">
          <div className="mb-2 flex justify-between text-sm font-medium">
            <span>{points} / {target} pts</span>
            <span>Level 3</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <button className="mt-6 w-full rounded-xl bg-white py-4 font-semibold text-rose-700 shadow-md transition hover:scale-[1.02]">
          Redeem Rewards
        </button>
      </div>
    </div>
  );
}
