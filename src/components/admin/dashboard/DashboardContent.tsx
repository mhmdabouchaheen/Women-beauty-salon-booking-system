"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Scissors, UserRound, Users } from "lucide-react";

import StatsCard from "./StatsCard";
import QuickActions from "./QuickActions";
import RecentAppointments from "./RecentAppointments";

import { apiRequest } from "@/src/types/admin-ui";

export default function DashboardContent() {
  const [data, setData] = useState<{
    stats: { appointments: number; customers: number; services: number; staff: number };
    recentAppointments: Array<{ id: string; customer: string; service: string; staff: string; status: string; date: string }>;
  } | null>(null);
  useEffect(() => {
    void apiRequest<NonNullable<typeof data>>("/api/admin/dashboard").then(setData);
  }, []);
  const stats = [
    { title: "Appointments", value: data?.stats.appointments ?? 0, subtitle: "This month", icon: CalendarDays },
    { title: "Customers", value: data?.stats.customers ?? 0, subtitle: "Registered users", icon: UserRound },
    { title: "Services", value: data?.stats.services ?? 0, subtitle: "Available services", icon: Scissors },
    { title: "Staff", value: data?.stats.staff ?? 0, subtitle: "Active specialists", icon: Users },
  ];
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>

        <p className="mt-2 text-gray-500">
          Welcome back! Here&apos;s what&apos;s happening today.
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
      <RecentAppointments appointments={data?.recentAppointments ?? []} />
    </div>
  );
}
