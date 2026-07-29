"use client";

import Image from "next/image";
import Icon from "@/src/components/auth/Icon";
import Link from "next/link";

export default function ServerErrorView({
  onRetry,
}: {
  onRetry?: () => void;
}) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-body-md text-body-md">
      {/* TopNavBar (Simplified for Error State) */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-white/40 flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop shadow-[0_4px_20px_rgba(231,84,128,0.05)]">
        <div className="font-headline-md text-headline-md text-primary italic tracking-tight">
          Glow Beauty Salon
        </div>
        <div className="hidden md:flex gap-8">
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md"
            href="#"
          >
            Support
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md"
            href="#"
          >
            Status Page
          </a>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center px-margin-mobile md:px-margin-desktop py-32 relative overflow-hidden">
        {/* Atmospheric Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-fixed opacity-20 blur-[120px] rounded-full -z-10" />

        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
          {/* Visual Side (Editorial Style) */}
          <div className="relative group order-2 md:order-1">
            <div className="aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(231,84,128,0.1)] relative">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent z-10" />
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN1Un8sw9AfhAmHfnCKuD_ihvoxZDhNUzSvgOJUpv8lTeW2x4M8_Tfn1tnNJe271V5cLJe7AZdFyx47Kmt2Vfyu37xapEyPLjU6FjF1UY5dahdJvT7Nf7dfCuew5s1FutZVE93gEvisFFagD-EcK7W0bO7VBT3ntM3kHKQDIySIc3rwHKgKsEJQkNaXWASECmGd5p223SVbfc6fUy6qhX8ZHhnJ6fBoHUZQb1SacUtVBaGK9DVW3ZKmA"
                alt="Sophisticated, serene high-end beauty salon interior"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            {/* Decorative Badge */}
            <div className="absolute -bottom-6 -right-6 glass-panel p-6 rounded-2xl shadow-xl floating-accent hidden md:block">
              <Icon
                name="auto_awesome"
                className="text-primary text-4xl mb-2"
              />
              <p className="font-headline-sm text-headline-sm text-primary">
                Restoring...
              </p>
            </div>
          </div>

          {/* Content Side (Messaging) */}
          <div className="flex flex-col gap-8 order-1 md:order-2">
            <div className="flex flex-col gap-4">
              <span className="text-primary font-label-md text-label-md tracking-widest uppercase">
                Error 500
              </span>
              <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-tight">
                A momentary <br />
                <span className="italic text-primary">interruption.</span>
              </h1>
              <p className="text-on-surface-variant text-body-lg leading-relaxed max-w-md">
                We apologize, but something went wrong on our end. Even in a
                sanctuary of beauty, small imperfections sometimes occur. We
                are currently polishing things up behind the scenes.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleRetry}
                className="h-12 px-8 bg-primary text-on-primary font-button-text text-button-text rounded-full shadow-[0_10px_20px_rgba(171,37,84,0.3)] hover:shadow-[0_15px_30px_rgba(171,37,84,0.4)] hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Icon name="refresh" className="text-xl" />
                Try Refreshing
              </button>
              <Link
                href="/"
                className="h-12 px-8 bg-secondary-container text-primary font-button-text text-button-text rounded-full flex items-center justify-center hover:bg-primary-fixed transition-colors active:scale-95 duration-200"
              >
                Back to Services
              </Link>
            </div>
            <div className="pt-8 border-t border-outline-variant/30 flex flex-col gap-4">
              <p className="text-label-md font-label-md text-on-surface-variant italic">
                Need immediate assistance?
              </p>
              <div className="flex gap-6">
                <a href="#" className="flex items-center gap-2 group">
                  <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                    <Icon name="mail" className="text-xl" />
                  </div>
                  <span className="text-body-md font-medium text-on-surface group-hover:text-primary transition-colors">
                    Contact Support
                  </span>
                </a>
                <a href="#" className="flex items-center gap-2 group">
                  <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                    <Icon name="call" className="text-xl" />
                  </div>
                  <span className="text-body-md font-medium text-on-surface group-hover:text-primary transition-colors">
                    Call Concierge
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 px-margin-mobile md:px-margin-desktop text-center">
        <p className="text-label-md text-on-surface-variant/60 font-label-md uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} Glow Beauty Salon • Excellence in Every
          Detail
        </p>
      </footer>
    </div>
  );
}
