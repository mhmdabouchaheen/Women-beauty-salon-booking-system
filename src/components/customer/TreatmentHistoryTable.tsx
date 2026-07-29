export interface TreatmentHistoryRow {
  id: string;
  service: string;
  specialist: string;
  date: string;
  price: number;
}

interface Props {
  history: TreatmentHistoryRow[];
}

export default function TreatmentHistoryTable({ history }: Props) {
  return (
    <section className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(231,84,128,0.05)] border border-white/40 overflow-hidden">
      <div className="p-8 border-b border-surface-container">
        <h2 className="font-headline-sm text-headline-sm">
          Treatment History
        </h2>
      </div>

      {history.length === 0 ? (
        <div className="p-12 text-center text-on-surface-variant">
          Your completed treatments will show up here.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-label-md">
                <th className="px-8 py-4 font-semibold">Service</th>
                <th className="px-8 py-4 font-semibold">Specialist</th>
                <th className="px-8 py-4 font-semibold">Date</th>
                <th className="px-8 py-4 font-semibold">Price</th>
                <th className="px-8 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {history.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-surface-container-low/50 transition-colors"
                >
                  <td className="px-8 py-6 font-medium">{row.service}</td>
                  <td className="px-8 py-6 text-on-surface-variant">
                    {row.specialist}
                  </td>
                  <td className="px-8 py-6 text-on-surface-variant">
                    {row.date}
                  </td>
                  <td className="px-8 py-6 text-on-surface-variant font-bold">
                    ${row.price.toFixed(2)}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <a
                      href="/dashboard/appointments"
                      className="text-primary font-label-md hover:underline underline-offset-4"
                    >
                      Rebook
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
