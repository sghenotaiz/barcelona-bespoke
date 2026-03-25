import { useState, useCallback } from "react";
import Header from "@/components/Header";
import CinematicIntro from "@/components/CinematicIntro";
import CircularGallery from "@/components/CircularGallery";
import LanguageSelector from "@/components/LanguageSelector";
import HeroSection from "@/components/HeroSection";
import SocialFeedSection from "@/components/SocialFeedSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import FloatingSocials from "@/components/FloatingSocials";

const Index = () => {
  const hasLanguage = !!localStorage.getItem("userLanguage");
  const [showIntro, setShowIntro] = useState(true);
  const [showLangSelector, setShowLangSelector] = useState(!hasLanguage);

  const dismissIntro = useCallback(() => {
    setShowIntro(false);
  }, []);

  const handleLangComplete = useCallback(() => {
    setShowLangSelector(false);
  }, []);

  return (
    <main className="overflow-x-hidden">
      <CinematicIntro visible={showIntro} onDismiss={dismissIntro} />
      {!showIntro && (
        <LanguageSelector visible={showLangSelector} onComplete={handleLangComplete} />
      )}
      <Header />
      <CircularGallery />
      <HeroSection />
      <SocialFeedSection />
      <Footer />
      {!showIntro && !showLangSelector && <FloatingCTA />}
      {!showIntro && !showLangSelector && <FloatingWhatsApp />}
      {!showIntro && !showLangSelector && <FloatingSocials />}
    </main>
  );
};

export default Index;
