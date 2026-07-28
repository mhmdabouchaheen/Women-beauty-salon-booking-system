import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

import { getSalonSettings } from "@/src/repositories/settings.repository";

export default async function Footer() {
  const settings = await getSalonSettings();
  const phoneHref = settings.phone ? `tel:${settings.phone.replace(/[^\d+]/g, "")}` : "";

  return (
    <footer id="footer" className="bg-[#1f1a1c] text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="font-display mb-5 text-4xl italic text-rose-400">Glow</h2>
            <p className="leading-7 text-gray-300">
              Experience luxury beauty treatments in a relaxing and elegant
              environment designed to make you look and feel your best.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" aria-label="Instagram" className="rounded-full bg-white/10 p-3 transition hover:bg-rose-600">
                <FaInstagram size={18} />
              </a>
              <a href="#" aria-label="Facebook" className="rounded-full bg-white/10 p-3 transition hover:bg-rose-600">
                <FaFacebookF size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold text-rose-300">Explore</h3>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="#services">Services</Link></li>
              <li><Link href="#experts">Experts</Link></li>
              <li><Link href="#testimonials">Testimonials</Link></li>
              <li><Link href="/dashboard/book">Book Appointment</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold text-rose-300">Opening Hours</h3>
            <div className="space-y-3 text-gray-300">
              <p>Mon - Fri: {settings.weekdays}</p>
              <p>Saturday: {settings.saturday}</p>
              <p>Sunday: {settings.sunday}</p>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold text-rose-300">Contact</h3>
            <div className="space-y-4 text-gray-300">
              <p className="flex items-center gap-3">
                <MapPin size={18} className="shrink-0" />
                {settings.address || "Address not provided"}
              </p>
              {settings.phone && (
                <a href={phoneHref} className="flex items-center gap-3 hover:text-rose-300">
                  <Phone size={18} className="shrink-0" />
                  {settings.phone}
                </a>
              )}
              {settings.email && (
                <a href={`mailto:${settings.email}`} className="flex items-center gap-3 hover:text-rose-300">
                  <Mail size={18} className="shrink-0" />
                  {settings.email}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Glow Beauty Salon. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
