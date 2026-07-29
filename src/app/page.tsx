import Navbar from "@/src/components/layout/Navbar";
import Hero from "@/src/components/home/Hero";
import ServicesSection from "@/src/components/home/ServicesSection";
import ExpertsSection from "@/src/components/home/ExpertsSection";
import TestimonialsSection from "@/src/components/home/TestimonialsSection";
import Footer from "@/src/components/layout/Footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/src/config/site";
import { getSalonSettings } from "@/src/repositories/settings.repository";
import { getAllServices } from "@/src/repositories/service.repository";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [settings, services] = await Promise.all([
    getSalonSettings(),
    getAllServices(),
  ]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${SITE_URL}/#salon`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    priceRange: "$$",
    image: `${SITE_URL}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "Beirut",
      addressCountry: "LB",
    },
    ...(settings.phone ? { telephone: settings.phone } : {}),
    ...(settings.email ? { email: settings.email } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Beauty services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        priceCurrency: "USD",
        price: service.price.toFixed(2),
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />

      <main className="pb-20 lg:pb-0">
        <Hero />

        <ServicesSection />

        <ExpertsSection />

        <TestimonialsSection />
      </main>

      <Footer />
    </>
  );
}
