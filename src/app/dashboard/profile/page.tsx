import { Bell } from "lucide-react";
import ProfileView from "@/src/components/customer/ProfileView";
import { mockUser } from "@/src/data/customer-mock";

// TODO(backend): swap the mock import above for a real fetch of the
// authenticated user once the backend exists again.
export default function ProfilePage() {
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
          <button
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-xl border border-white/40 text-on-surface-variant hover:text-primary transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>
        </div>
      </header>

      <ProfileView
        name={mockUser.name}
        email={mockUser.email}
        avatar={mockUser.avatar}
        memberSince={mockUser.memberSince}
      />
    </>
  );
}
