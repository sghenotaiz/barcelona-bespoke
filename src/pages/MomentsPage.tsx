import Header from "@/components/Header";
import ExperiencesHero from "@/components/ExperiencesHero";
import ExperiencesContent from "@/components/ExperiencesContent";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const MomentsPage = () => {
  return (
    <main className="overflow-x-hidden bg-black">
      <Header />
      <div className="pt-20">
        <ExperiencesHero />
        <ExperiencesContent />
        <TestimonialsSection />
      </div>
      <Footer />
      <FloatingCTA />
      <FloatingWhatsApp />
    </main>
  );
};

export default MomentsPage;
