import Link from "next/link";
import Image from "next/image";
import Icon from "@/src/components/auth/Icon";

export default function NotFound() {
  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden selection:bg-primary-fixed-dim selection:text-on-primary-fixed">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-white/40 shadow-[0_4px_20px_rgba(231,84,128,0.05)]">
        <nav className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop w-full">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="font-headline-md text-headline-md text-primary italic tracking-tight"
            >
              Glow Beauty Salon
            </Link>
            <div className="hidden md:flex gap-6">
              <a
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                href="#"
              >
                Services
              </a>
              <a
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                href="#"
              >
                Experts
              </a>
              <a
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                href="#"
              >
                About
              </a>
              <a
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                href="#"
              >
                Contact
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main className="min-h-screen flex items-center pt-20 px-margin-mobile md:px-margin-desktop">
        <section className="max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center py-16">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full font-label-md text-label-md mb-6">
              <Icon name="error" className="text-[18px]" />
              404: ERROR
            </div>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-6 leading-tight">
              Lost your <span className="text-primary italic">Glow?</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-lg mx-auto lg:mx-0">
              It seems you&apos;ve wandered off the path to radiance. The
              page you are looking for might have been moved, removed, or
              never existed. Let&apos;s get you back to your beauty journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/"
                className="bg-primary text-on-primary h-14 flex items-center justify-center px-8 rounded-full font-button-text text-button-text shadow-xl hover:translate-y-[-2px] transition-all group"
              >
                Return Home
                <Icon
                  name="home"
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <a
                href="#"
                className="bg-surface-container-lowest border border-outline-variant h-14 flex items-center justify-center px-8 rounded-full font-button-text text-button-text text-primary hover:bg-secondary-container/20 transition-all"
              >
                Book an Appointment
                <Icon name="calendar_month" className="ml-2" />
              </a>
            </div>
            <div className="mt-16 flex items-center justify-center lg:justify-start gap-8 opacity-60">
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface">
                  5k+
                </span>
                <span className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">
                  Happy Clients
                </span>
              </div>
              <div className="h-10 w-[1px] bg-outline-variant" />
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface">
                  15+
                </span>
                <span className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">
                  Beauty Experts
                </span>
              </div>
            </div>
          </div>

          {/* Visual Content Section */}
          <div className="order-1 lg:order-2 flex justify-center relative">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-tertiary-container/30 backdrop-blur-md rounded-2xl z-20 hidden md:block floating-accent" />
            <div
              className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary-container/10 backdrop-blur-xl rounded-full z-20 hidden md:block floating-accent"
              style={{ animationDelay: "1s" }}
            />
            <div className="relative w-full aspect-[4/5] max-w-[500px] overflow-hidden rounded-[40px] shadow-[0_20px_50px_rgba(231,84,128,0.1)] border border-white/40">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
              <Image
                src="/images/error.png"
                alt="Serene ultra-luxurious beauty salon reception"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating Info Badge */}
            <div className="absolute bottom-10 right-0 md:-right-10 bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-xl z-30 max-w-[200px] border border-white/60">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Icon name="spa" filled className="text-white text-sm" />
                </div>
                <span className="font-label-md text-label-md text-on-surface">
                  Serenity Found
                </span>
              </div>
              <p className="text-[12px] leading-relaxed text-on-surface-variant">
                Our doors are always open for your next transformation.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
