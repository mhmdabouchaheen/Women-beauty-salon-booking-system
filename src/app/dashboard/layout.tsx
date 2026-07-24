import DashboardSidebar from "@/src/components/customer/DashboardSidebar";
import MobileBottomNav from "@/src/components/customer/MobileBottomNav";
import { mockUser } from "@/src/data/customer-mock";

// TODO(backend): this used to redirect to /login unless a real session
// existed, and fetch the real user for the sidebar. Restored to a static
// placeholder user (see src/data/customer-mock.ts) since there's no backend
// to check a session or look up a user against.
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#FFF9FB]">
      <DashboardSidebar userName={mockUser.firstName} avatar={mockUser.avatar} />

      <main className="flex-1 lg:ml-72 min-h-screen px-margin-mobile md:px-margin-desktop pt-8 pb-24 lg:pb-8">
        {children}
      </main>

      <MobileBottomNav />
    </div>
  );
}
