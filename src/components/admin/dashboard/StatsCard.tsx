interface StatsCardProps {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ElementType;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {value}
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            {subtitle}
          </p>
        </div>

        <div className="rounded-xl bg-rose-100 p-3">
          <Icon
            size={24}
            className="text-rose-700"
          />
        </div>
      </div>
    </div>
  );
}