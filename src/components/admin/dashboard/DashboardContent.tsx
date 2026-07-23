import StatsCard from "./StatsCard";
import QuickActions from "./QuickActions";
import RecentAppointments from "./RecentAppointments";

import { stats } from "@/src/data/dashboard";

export default function DashboardContent() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>

        <p className="mt-2 text-gray-500">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats */}
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            icon={stat.icon}
          />
        ))}
      </section>

      {/* Quick Actions */}
      <QuickActions />

      {/* Table */}
      <RecentAppointments />
    </div>
  );
}
