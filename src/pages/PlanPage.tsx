import Header from "@/components/Header";
import PlanHero from "@/components/PlanHero";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import FloatingSocials from "@/components/FloatingSocials";

const PlanPage = () => {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <div className="pt-20">
        <PlanHero />
        <BookingSection />
      </div>
      <Footer />
      <FloatingCTA />
      <FloatingWhatsApp />
      <FloatingSocials />
    </main>
  );
};

export default PlanPage;
