import ProfileView from "@/src/components/customer/ProfileView";
import NotificationBell from "@/src/components/notifications/NotificationBell";
import { getAuthUser } from "@/src/lib/auth";
import { findUserById } from "@/src/repositories/user.repository";

export default async function ProfilePage() {
  const auth = await getAuthUser();
  if (!auth) return null;
  const user = await findUserById(auth.userId);
  if (!user) return null;
  return (
    <>
      <header className="flex justify-between items-end mb-10">
        <div className="space-y-1">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
            My Profile
          </h1>
          <p className="text-on-surface-variant font-body-lg text-body-lg">
            Manage your personal information and account security.
          </p>
        </div>

        <div className="hidden md:flex gap-4">
          <NotificationBell
            href="/dashboard/notifications"
            className="h-12 w-12 items-center justify-center border border-white/40 bg-white/70 text-on-surface-variant backdrop-blur-xl hover:text-primary"
          />
        </div>
      </header>

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
