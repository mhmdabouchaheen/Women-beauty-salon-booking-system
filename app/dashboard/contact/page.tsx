import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import DashboardContactForm from "@/src/components/customer/DashboardContactForm";
import { getSalonSettings } from "@/src/repositories/settings.repository";

export default async function CustomerContactPage() {
  const settings = await getSalonSettings();

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-9 flex items-center gap-5 rounded-3xl bg-gradient-to-r from-rose-700 to-pink-600 p-7 text-white md:p-8">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20">
          <MessageCircle size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">Contact Us</h1>
          <p className="mt-1 text-rose-100">We are here to help with your appointments and salon experience.</p>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="space-y-4 rounded-3xl border border-rose-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold text-gray-900">Salon information</h2>
          <ContactRow icon={<MapPin size={20} />} label="Address" value={settings.address} />
          <ContactRow icon={<Phone size={20} />} label="Phone" value={settings.phone || "Not provided"} />
          <ContactRow icon={<Mail size={20} />} label="Email" value={settings.email || "Not provided"} />
          <ContactRow icon={<Clock3 size={20} />} label="Monday - Friday" value={settings.weekdays} />
          <ContactRow icon={<Clock3 size={20} />} label="Saturday" value={settings.saturday} />
          <ContactRow icon={<Clock3 size={20} />} label="Sunday" value={settings.sunday} />
        </aside>

        <DashboardContactForm />
      </div>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-rose-50 p-4">
      <span className="mt-0.5 text-rose-700">{icon}</span>
      <div>
        <p className="text-sm font-semibold text-gray-500">{label}</p>
        <p className="mt-1 font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}
