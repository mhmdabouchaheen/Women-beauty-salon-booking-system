import { recentAppointments } from "@/src/data/dashboard";

export default function RecentAppointments() {
  return (
    <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Today's Appointments
        </h2>

        <button className="rounded-xl border border-rose-200 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-50">
          View All
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-rose-100 text-left text-gray-500">
              <th className="pb-4">Customer</th>
              <th className="pb-4">Service</th>
              <th className="pb-4">Staff</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Time</th>
            </tr>
          </thead>

          <tbody>
            {recentAppointments.map((appointment) => (
              <tr
                key={appointment.customer}
                className="border-b border-gray-100"
              >
                <td className="py-5 font-medium">{appointment.customer}</td>

                <td>{appointment.service}</td>

                <td>{appointment.staff}</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      appointment.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : appointment.status === "Completed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td>

                <td>{appointment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 lg:hidden">
        {recentAppointments.map((appointment) => (
          <div
            key={appointment.customer}
            className="rounded-2xl border border-rose-100 p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{appointment.customer}</h3>

              <span className="text-sm text-gray-500">{appointment.date}</span>
            </div>

            <p className="mt-2 text-gray-600">{appointment.service}</p>

            <p className="text-sm text-gray-500">{appointment.staff}</p>

            <span
              className={`mt-3 inline-block rounded-full px-3 py-1 text-sm ${
                appointment.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {appointment.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
