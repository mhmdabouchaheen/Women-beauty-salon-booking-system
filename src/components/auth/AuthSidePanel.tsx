import Image from "next/image";

interface AuthSidePanelProps {
  /** Remote or local image URL for the background photo */
  imageSrc: string;
  /** Accessible description of the background photo */
  imageAlt: string;
  /** Short evocative headline shown near the bottom of the panel */
  quote: string;
  /** Optional small line shown under the quote (e.g. social proof) */
  footerNote?: string;
}

/**
 * Shared visual/branding panel used on the left half of auth pages
 * (login, register, etc.). Only the image and copy differ per page —
 * the layout, brand mark, and styling stay consistent.
 */
export default function AuthSidePanel({
  imageSrc,
  imageAlt,
  quote,
  footerNote,
}: AuthSidePanelProps) {
  return (
    <div className="hidden lg:block lg:w-1/2 relative bg-surface-container-highest overflow-hidden">
      <div className="absolute inset-0 z-0 scale-105 transition-transform duration-[10s] ease-linear hover:scale-100">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
      </div>

      {/* Brand Overlay */}
      <div className="absolute top-margin-desktop left-margin-desktop z-10">
        <h1 className="font-headline-md text-headline-md text-white italic tracking-tight drop-shadow-sm">
          Glow Beauty Salon
        </h1>
      </div>

      {/* Atmospheric Text */}
      <div className="absolute bottom-16 left-margin-desktop right-16 z-10">
        <div className="max-w-md">
          <p className="font-headline-sm text-headline-sm text-white leading-relaxed mb-4">
            {quote}
          </p>
          <div className="w-12 h-1 bg-tertiary-fixed rounded-full opacity-60" />
          {footerNote && (
            <p className="font-label-md text-label-md text-white/80 mt-4">
              {footerNote}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
