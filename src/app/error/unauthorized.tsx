import Link from "next/link";
import Image from "next/image";
import Icon from "@/src/components/auth/Icon";

export const metadata = {
  title: "Access Restricted | Glow Beauty Salon",
};

export default function UnauthorizedPage() {
  return (
    <div className="bg-background text-on-surface overflow-x-hidden">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop bg-white/70 backdrop-blur-md border-b border-white/40 shadow-[0_4px_20px_rgba(231,84,128,0.05)]">
        <div className="font-headline-md text-headline-md text-primary italic tracking-tight">
          Glow Beauty Salon
        </div>
        <nav className="hidden md:flex gap-8">
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
        </nav>
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant hover:text-primary transition-colors p-2">
            <Icon name="notifications" />
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors p-2">
            <Icon name="person" />
          </button>
          <button className="hidden md:block bg-primary text-on-primary px-6 py-2 rounded-full font-button-text text-button-text hover:shadow-lg transition-all active:scale-95">
            Book Now
          </button>
        </div>
      </header>

      <main className="min-h-screen flex items-center justify-center pt-20 px-margin-mobile md:px-margin-desktop relative">
        {/* Background Atmospheric Element */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-secondary-fixed/30 rounded-full blur-[120px]" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-primary-fixed/20 rounded-full blur-[120px]" />
        </div>

        {/* Content Canvas */}
        <div className="max-w-container-max w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* Imagery Side (Bento Style) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 h-[500px] md:h-[650px] order-2 lg:order-1">
            <div className="col-span-1 row-span-2 relative overflow-hidden rounded-[40px] shadow-sm">
              <Image
                src="/images/error.png"
                alt="High-end silk fabric in warm sunset light"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
            <div className="col-span-1 row-span-1 relative overflow-hidden rounded-[40px] shadow-sm">
              <Image
                src="/images/error.png"
                alt="A private, high-end beauty salon lounge"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
            <div className="col-span-1 row-span-1 overflow-hidden rounded-[40px] shadow-sm glass-panel flex items-center justify-center border-none">
              <div className="text-center p-8">
                <Icon
                  name="lock_open"
                  className="text-[64px] text-tertiary-container mb-4"
                />
                <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">
                  Error 403
                </p>
              </div>
            </div>
          </div>

          {/* Text Content Side */}
          <div className="lg:col-span-6 flex flex-col gap-8 order-1 lg:order-2 lg:pl-12">
            <div className="space-y-4">
              <span className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full font-label-md text-label-md tracking-wide">
                Privileged Access Required
              </span>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-tight">
                Access Restricted
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
                It appears you&apos;ve reached a specialized area reserved for
                our Gold Tier members and authorized staff. Your current
                profile does not have the permissions required to view this
                exclusive content.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="flex items-center justify-center bg-primary text-on-primary h-14 px-10 rounded-full font-button-text text-button-text shadow-[0_4px_20px_rgba(231,84,128,0.2)] hover:shadow-[0_8px_30px_rgba(231,84,128,0.3)] transition-all active:scale-95 group"
              >
                Return Home
                <Icon
                  name="east"
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <button className="flex items-center justify-center bg-surface border border-outline-variant text-on-surface h-14 px-10 rounded-full font-button-text text-button-text hover:bg-surface-container-low transition-all active:scale-95">
                Contact Management
              </button>
            </div>
            <div className="pt-8 border-t border-outline-variant/30 mt-4">
              <p className="font-label-md text-label-md text-on-surface-variant/60 flex items-center gap-2">
                <Icon name="info" className="text-[18px]" />
                If you believe this is an error, please reach out to our
                support team at support@glowbeauty.com
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
