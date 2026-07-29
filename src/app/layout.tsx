import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/src/config/site";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Beauty Appointments in Beirut`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "beauty salon Beirut",
    "hair salon Beirut",
    "nail salon Beirut",
    "facial treatment Beirut",
    "beauty appointments Lebanon",
    "Glow Beauty Salon",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_LB",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Beauty Appointments in Beirut`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Beauty Appointments in Beirut`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "beauty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html
    lang="en"
    className={`${geist.variable} ${playfair.variable} scroll-smooth`}
  >
    <head>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
    </head>
    <body>{children}</body>
  </html>
);
}
