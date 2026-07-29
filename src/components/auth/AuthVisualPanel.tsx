import Image from "next/image";

type AuthVisualPanelProps = {
  imageSrc: string;
  imageAlt: string;
  heading: React.ReactNode;
  subtext?: string;
  footnote?: string;
};

/**
 * Shared left-side visual panel used across auth pages (login, register, etc).
 * Image, heading, subtext and footnote are supplied per-page so each screen
 * keeps its own identity while sharing one layout/markup.
 */
export default function AuthVisualPanel({
  imageSrc,
  imageAlt,
  heading,
  subtext,
  footnote,
}: AuthVisualPanelProps) {
  return (
    <section className="hidden md:flex relative md:w-1/2 h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-[10000ms] hover:scale-110"
          priority
        />
        <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />
      </div>
      <div className="relative z-10 flex flex-col justify-between p-margin-desktop w-full text-on-surface">
        <div className="flex items-center gap-2">
          <span className="text-primary italic font-headline-md tracking-tight">
            Glow Beauty Salon
          </span>
        </div>
        <div className="max-w-md">
          <h2 className="font-display-lg text-display-lg mb-6 leading-tight">
            {heading}
          </h2>
          {subtext && (
            <p className="font-body-lg text-body-lg text-on-surface-variant/80">
              {subtext}
            </p>
          )}
        </div>
        {footnote && (
          <div className="flex items-center gap-3">
            <span className="font-label-md text-label-md text-on-surface-variant">
              {footnote}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
