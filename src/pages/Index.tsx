import Header from "@/components/Header";
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

const Index = () => {
  return (
    <main className="overflow-x-hidden">
      <Header />
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
    </main>
  );
};

export default Index;
