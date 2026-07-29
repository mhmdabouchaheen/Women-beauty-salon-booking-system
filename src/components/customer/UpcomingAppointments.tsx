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
    <section className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(231,84,128,0.05)] border border-white/40">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-headline-sm text-headline-sm text-on-surface">
          Upcoming Appointments
        </h2>
        <a
          href="/dashboard/appointments"
          className="font-label-md text-label-md text-primary hover:underline underline-offset-4"
        >
          View All
        </a>
      </div>

      {appointments.length === 0 ? (
        <div className="p-8 text-center text-on-surface-variant bg-surface-container-low rounded-2xl border border-outline-variant/30">
          You have no upcoming appointments yet.
        </div>
      ) : (
        <div className="space-y-6">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className={`flex items-center p-5 bg-surface-container-low rounded-2xl border border-outline-variant/30 hover:border-primary/30 transition-colors ${
                appt.past ? "opacity-70" : ""
              }`}
            >
              <div
                className={`w-16 h-16 rounded-xl bg-white flex flex-col items-center justify-center border border-outline-variant/50 shrink-0 ${
                  appt.past ? "text-on-surface-variant" : "text-primary"
                }`}
              >
                <span className="text-[12px] font-bold uppercase">
                  {appt.month}
                </span>
                <span className="text-[24px] font-bold leading-none">
                  {appt.day}
                </span>
              </div>

              <div className="ml-6 flex-1 min-w-0">
                <h3 className="font-label-md text-on-surface truncate">
                  {appt.title}
                </h3>
                <p className="text-on-surface-variant text-[14px]">
                  with {appt.specialist} • {appt.time}
                </p>
              </div>

              {appt.action === "Reschedule" ? (
                <a
                  href="/dashboard/appointments"
                  className="hidden md:block px-6 py-2 border border-primary text-primary rounded-full font-label-md hover:bg-primary hover:text-white transition-all"
                >
                  Reschedule
                </a>
              ) : (
                <a
                  href="/dashboard/appointments"
                  className="hidden md:block px-6 py-2 border border-outline text-on-surface-variant rounded-full font-label-md hover:bg-on-surface-variant hover:text-white transition-all"
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
