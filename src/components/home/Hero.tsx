import Image from "next/image";
import { Sparkles, Star } from "lucide-react";

import Button from "../ui/Button";
import FadeUp from "../ui/FadeUp";

export default function Hero() {
  return (
    <FadeUp>
      <section className="relative overflow-hidden bg-gradient-to-b from-rose-50 via-white to-white pt-36 pb-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
          {/* LEFT */}

          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-100/70 px-4 py-2 text-sm font-medium text-rose-700">
              <Sparkles size={18} />

              VOTED #1 LUXURY SALON
            </div>

            <h1 className="font-display mb-8 text-5xl leading-tight text-gray-900 lg:text-7xl">
              Experience
              <br />
              Beauty,
              <span className="italic text-rose-700">
                {" "}
                Confidence
              </span>
              <br />
              & Relaxation
            </h1>

            <p className="mb-10 max-w-lg text-lg leading-8 text-gray-600">
              Discover a sanctuary of sophistication where our expert stylists
              create unforgettable beauty experiences tailored just for you.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button>
                Book Appointment
              </Button>

              <Button variant="outline">
                Explore Services
              </Button>
            </div>
          </div>

          {/* RIGHT */}

          <div className="relative">
            <div className="absolute inset-0 rotate-3 rounded-[42px] bg-rose-200/60"></div>

            <div className="absolute inset-0 -rotate-3 rounded-[42px] bg-pink-100"></div>

            <div className="relative overflow-hidden rounded-[38px] border border-white/60 shadow-[0_30px_80px_rgba(0,0,0,.18)]">
              <Image
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1400&q=80"
                alt="Luxury salon"
                width={700}
                height={850}
                priority
                className="h-[650px] w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>

            {/* REVIEW */}

            <div className="absolute bottom-6 left-6 max-w-xs rounded-3xl border border-white/70 bg-white/70 p-6 shadow-xl backdrop-blur-xl">
              <div className="mb-3 flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill="currentColor"
                  />
                ))}
              </div>

              <p className="italic text-gray-700">
                "The best facial I've ever had. Truly a relaxing experience."
              </p>

              <p className="mt-4 font-semibold text-gray-900">
                — Sarah J.
              </p>
            </div>
          </div>
        </div>
      </section>
    </FadeUp>
  );
}