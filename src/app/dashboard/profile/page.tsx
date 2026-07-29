import { User } from "lucide-react";
import ProfileView from "@/src/components/customer/ProfileView";
import { getAuthUser } from "@/src/lib/auth";
import { findUserById } from "@/src/repositories/user.repository";

export default async function ProfilePage() {
  const auth = await getAuthUser();
  if (!auth) return null;
  const user = await findUserById(auth.userId);
  if (!user) return null;

  return (
    <>
      <div className="mb-10 flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-rose-700 to-pink-600 p-8 text-white lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
            <User size={30} />
          </div>
          <div>
            <h1 className="text-4xl font-bold">My Profile</h1>
            <p className="mt-2 text-rose-100">
              Manage your personal information and account security.
            </p>
          </div>
        </div>
      </div>

      <ProfileView
        name={user.name}
        email={user.email}
        avatar={user.image || "/window.svg"}
        memberSince={new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(user.createdAt)}
        points={user.rewardPoints ?? 0}
        lifetimePoints={user.lifetimeRewardPoints ?? 0}
      />
    </>
  );
}
