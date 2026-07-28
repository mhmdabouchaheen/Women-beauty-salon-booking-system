export interface UpcomingAppointmentItem {
  id: string;
  month: string;
  day: string;
  title: string;
  specialist: string;
  time: string;
  action: "Reschedule" | "Details";
  past?: boolean;
}

interface Props {
  appointments: UpcomingAppointmentItem[];
}

export default function UpcomingAppointments({ appointments }: Props) {
  return (
    <section className="rounded-3xl border border-rose-100 bg-white p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Schedule</h2>
        <a
          href="/dashboard/appointments"
          className="text-sm font-medium text-rose-700 hover:underline underline-offset-4"
        >
          View All
        </a>
      </div>

      {appointments.length === 0 ? (
        <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-8 text-center text-gray-500">
          You have no upcoming appointments yet.
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className={`flex items-center rounded-2xl border border-rose-100 bg-rose-50/40 p-5 transition-colors hover:border-rose-300 ${
                appt.past ? "opacity-70" : ""
              }`}
            >
              <div
                className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl border border-rose-100 bg-white ${
                  appt.past ? "text-gray-500" : "text-rose-700"
                }`}
              >
                <span className="text-xs font-bold uppercase">{appt.month}</span>
                <span className="text-2xl font-bold leading-none">{appt.day}</span>
              </div>

              <div className="ml-6 min-w-0 flex-1">
                <h3 className="truncate font-medium text-gray-900">{appt.title}</h3>
                <p className="text-sm text-gray-500">
                  with {appt.specialist} &middot; {appt.time}
                </p>
              </div>

              {appt.action === "Reschedule" ? (
                <a
                  href="/dashboard/appointments"
                  className="hidden rounded-full border border-rose-700 px-6 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-700 hover:text-white md:block"
                >
                  Reschedule
                </a>
              ) : (
                <a
                  href="/dashboard/appointments"
                  className="hidden rounded-full border border-gray-300 px-6 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-600 hover:text-white md:block"
                >
                  Details
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
