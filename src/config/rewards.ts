export const POINTS_PER_COMPLETED_APPOINTMENT = 250;
export const POINTS_PER_LEVEL = 1000;
export const REWARD_REDEMPTION_COST = 1000;

export function getRewardLevel(lifetimePoints: number): number {
  return Math.floor(Math.max(0, lifetimePoints) / POINTS_PER_LEVEL) + 1;
}

export function getRewardTier(level: number): string {
  if (level >= 4) return "Platinum";
  if (level === 3) return "Gold";
  if (level === 2) return "Silver";
  return "Bronze";
}
