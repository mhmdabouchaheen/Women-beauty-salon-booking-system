import { Award } from "lucide-react";

export default function GoldStatusCard() {
  const points = 750;
  const target = 1000;
  const progress = (points / target) * 100;

  return (
    <div className="relative bg-primary-container text-on-primary-container rounded-[24px] p-8 shadow-xl overflow-hidden flex flex-col">
      {/* Decorative blurred glows, matching the reference design */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-tertiary-fixed-dim/20 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-6">
          <Award size={32} />
          <h2 className="font-headline-sm text-headline-sm">Gold Status</h2>
        </div>

        <p className="font-body-md text-body-md opacity-90 mb-8">
          You&apos;re 250 points away from your next complimentary treatment!
        </p>

        <div className="mb-4">
          <div className="flex justify-between font-label-md text-label-md mb-2">
            <span>
              {points} / {target} pts
            </span>
            <span>Level 3</span>
          </div>
          <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-secondary-fixed to-white"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <button className="w-full mt-6 py-4 bg-white text-primary font-button-text text-button-text rounded-xl shadow-md hover:shadow-xl transition-all">
          Redeem Rewards
        </button>
      </div>
    </div>
  );
}
