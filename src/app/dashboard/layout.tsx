import DashboardShell from "@/src/components/customer/DashboardShell";
import { mockUser } from "@/src/data/customer-mock";

// TODO(backend): this used to redirect to /login unless a real session
// existed, and fetch the real user for the shell. Restored to a static
// placeholder user (see src/data/customer-mock.ts) since there's no backend
// to check a session or look up a user against.
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell userName={mockUser.firstName} avatar={mockUser.avatar}>
      {children}
    </DashboardShell>
  );
}
