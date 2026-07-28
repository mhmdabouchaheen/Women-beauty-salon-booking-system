import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function ContactPage() {
  return (
    <>
      <div className="mb-10 flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-rose-700 to-pink-600 p-8 text-white lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
            <Mail size={30} />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="mt-2 text-rose-100">
              Reach out with any questions, or drop by during opening hours.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 rounded-3xl border border-rose-100 bg-white p-8 lg:col-span-1">
          <div>
            <h2 className="mb-5 text-lg font-semibold text-rose-700">Contact</h2>
            <div className="space-y-4 text-gray-600">
              <p className="flex items-center gap-3">
                <MapPin size={18} className="shrink-0 text-rose-700" />
                Beirut, Lebanon
              </p>
              <p className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-rose-700" />
                +961 XX XXX XXX
              </p>
              <p className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-rose-700" />
                info@glowbeauty.com
              </p>
            </div>
          </div>

          <div className="border-t border-rose-100 pt-6">
            <h2 className="mb-5 text-lg font-semibold text-rose-700">Opening Hours</h2>
            <div className="space-y-2 text-gray-600">
              <p>Mon - Fri: 9:00 AM - 8:00 PM</p>
              <p>Saturday: 10:00 AM - 6:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          <div className="border-t border-rose-100 pt-6">
            <h2 className="mb-5 text-lg font-semibold text-rose-700">Follow Us</h2>
            <div className="flex gap-3">
              <a
                href="#"
                className="rounded-full bg-rose-50 p-3 text-rose-700 transition hover:bg-rose-700 hover:text-white"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="#"
                className="rounded-full bg-rose-50 p-3 text-rose-700 transition hover:bg-rose-700 hover:text-white"
                aria-label="Facebook"
              >
                <FaFacebookF size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* TODO(backend): wire this up to a real "contact us" endpoint (e.g.
            POST /api/contact) once a backend exists again. */}
        <form className="space-y-5 rounded-3xl border border-rose-100 bg-white p-8 lg:col-span-2">
          <h2 className="text-lg font-semibold text-rose-700">Send a Message</h2>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-300"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-300"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Message</label>
            <textarea
              rows={5}
              placeholder="How can we help?"
              className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-300"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-rose-700 px-6 py-3 font-medium text-white transition hover:bg-rose-800"
          >
            Send Message
          </button>
        </form>
      </div>
    </>
  );
}
