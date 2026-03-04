import Header from "@/components/Header";
import ExperiencesSection from "@/components/ExperiencesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const MomentsPage = () => {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <div className="pt-20">
        <ExperiencesSection />
        <TestimonialsSection />
      </div>
      <Footer />
      <FloatingCTA />
      <FloatingWhatsApp />
    </main>
  );
};

export default MomentsPage;
