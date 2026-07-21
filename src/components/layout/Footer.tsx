import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-[#1f1a1c] text-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="font-display mb-5 text-4xl italic text-rose-400">
              Glow
            </h2>

            <p className="leading-7 text-gray-300">
              Experience luxury beauty treatments in a relaxing and elegant
              environment designed to make you look and feel your best.
            </p>

            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="rounded-full bg-white/10 p-3 transition hover:bg-rose-600"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="rounded-full bg-white/10 p-3 transition hover:bg-rose-600"
              >
                <FaFacebookF size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-rose-300">
              Explore
            </h3>

            <ul className="space-y-3 text-gray-300">
              <li><Link href="#services">Services</Link></li>
              <li><Link href="#experts">Experts</Link></li>
              <li><Link href="#testimonials">Testimonials</Link></li>
              <li><Link href="/register">Book Appointment</Link></li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-rose-300">
              Opening Hours
            </h3>

            <div className="space-y-3 text-gray-300">
              <p>Mon - Fri: 9:00 AM - 8:00 PM</p>
              <p>Saturday: 10:00 AM - 6:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-rose-300">
              Contact
            </h3>

            <div className="space-y-4 text-gray-300">
              <p className="flex items-center gap-3">
                <MapPin size={18} />
                Beirut, Lebanon
              </p>

              <p className="flex items-center gap-3">
                <Phone size={18} />
                +961 XX XXX XXX
              </p>

              <p className="flex items-center gap-3">
                <Mail size={18} />
                info@glowbeauty.com
              </p>
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