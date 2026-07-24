import Link from "next/link";
import { CalendarPlus, Scissors, UserPlus } from "lucide-react";

const actions = [
  {
    title: "Add Staff",
    href: "/admin/staff",
    icon: UserPlus,
  },
  {
    title: "Add Service",
    href: "/admin/services",
    icon: Scissors,
  },
  {
    title: "New Appointment",
    href: "/admin/appointments",
    icon: CalendarPlus,
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-gray-800">
        Quick Actions
      </h2>

      <div className="grid gap-4 sm:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="flex items-center gap-3 rounded-2xl border border-rose-100 p-4 transition hover:border-rose-300 hover:bg-rose-50"
            >
              <Icon
                className="text-rose-700"
                size={22}
              />

              <span className="font-medium">
                {action.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}