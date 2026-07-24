const tabs = [
  "All",
  "Scheduled",
  "Completed",
  "Cancelled",
];

interface Props {
  selected: string;
  onSelect: (tab: string) => void;
}

export default function AppointmentStatusTabs({
  selected,
  onSelect,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">

      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onSelect(tab)}
          className={`rounded-full px-5 py-2 transition ${
            selected === tab
              ? "bg-rose-700 text-white"
              : "bg-white text-gray-600 border border-gray-200 hover:border-rose-300"
          }`}
        >
          {tab}
        </button>
      ))}

    </div>
  );
}