import { useState, useCallback } from "react";
import Header from "@/components/Header";
import CinematicIntro from "@/components/CinematicIntro";
import CircularGallery from "@/components/CircularGallery";
import LanguageFlags from "@/components/LanguageFlags";
import HeroSection from "@/components/HeroSection";
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
      <LanguageFlags />
      <HeroSection />
      <Footer />
      {!showIntro && <FloatingCTA />}
      {!showIntro && <FloatingWhatsApp />}
    </main>
  );
};

export default Index;
