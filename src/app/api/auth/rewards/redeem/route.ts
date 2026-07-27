import { NextResponse } from "next/server";

import { REWARD_REDEMPTION_COST } from "@/src/config/rewards";
import { serverError } from "@/src/lib/api";
import { getAuthUser } from "@/src/lib/auth";
import { redeemUserReward } from "@/src/repositories/user.repository";

export async function POST() {
  try {
    const auth = await getAuthUser();
    if (!auth || auth.role !== "customer") {
      return NextResponse.json(
        { success: false, message: "Customer authentication required." },
        { status: auth ? 403 : 401 },
      );
    }
    const user = await redeemUserReward(auth.userId, REWARD_REDEMPTION_COST);
    if (!user) {
      return NextResponse.json(
        { success: false, message: `${REWARD_REDEMPTION_COST} points are required to redeem a reward.` },
        { status: 409 },
      );
    }
    return NextResponse.json({
      success: true,
      message: "Reward redeemed. Contact the salon to select your complimentary treatment.",
      rewardPoints: user.rewardPoints,
    });
  } catch (error: unknown) {
    return serverError("Redeeming customer reward failed:", error);
  }
}
