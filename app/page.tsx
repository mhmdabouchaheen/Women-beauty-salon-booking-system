import Navbar from "@/src/components/layout/Navbar";
import Hero from "@/src/components/home/Hero";
import ServicesSection from "@/src/components/home/ServicesSection";
import ExpertsSection from "@/src/components/home/ExpertsSection";
import TestimonialsSection from "@/src/components/home/TestimonialsSection";
import Footer from "@/src/components/layout/Footer";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
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
