import { useState, useCallback } from "react";
import Header from "@/components/Header";
import CinematicIntro from "@/components/CinematicIntro";
import CircularGallery from "@/components/CircularGallery";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WorkWithUsSection from "@/components/WorkWithUsSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import TeamSection from "@/components/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  const dismissIntro = useCallback(() => {
    setShowIntro(false);
  }, []);

  return (
    <main className="overflow-x-hidden">
      <CinematicIntro visible={showIntro} onDismiss={dismissIntro} />
      <Header />
      <CircularGallery />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ExperiencesSection />
      <BookingSection />
      <WorkWithUsSection />
      <TeamSection />
      <TestimonialsSection />
      <Footer />
      <FloatingCTA />
      <FloatingWhatsApp />
    </main>
  );
};

export default Index;
