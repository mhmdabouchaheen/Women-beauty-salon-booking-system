import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";

interface Props {
  children: React.ReactNode;
  userName: string;
  avatar?: string;
}

export default function DashboardShell({ children, userName, avatar }: Props) {
  return (
    <div className="min-h-screen bg-[#FFF9FB]">
      <DashboardSidebar userName={userName} avatar={avatar} />
      <DashboardNavbar userName={userName} avatar={avatar} />

      <main className="min-h-screen px-4 pb-24 pt-28 lg:ml-72 lg:pb-8 md:px-8">
        {children}
      </main>
    </div>
  );
}
