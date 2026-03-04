import Header from "@/components/Header";
import BookingSection from "@/components/BookingSection";
import WorkWithUsSection from "@/components/WorkWithUsSection";

import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const PlanPage = () => {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <div className="pt-20">
        <BookingSection />
        <WorkWithUsSection />
      </div>
      <Footer />
      <FloatingCTA />
      <FloatingWhatsApp />
    </main>
  );
};

export default PlanPage;
