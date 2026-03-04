import Header from "@/components/Header";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const ServicesPage = () => {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <div className="pt-20">
        <ServicesSection />
      </div>
      <Footer />
      <FloatingCTA />
      <FloatingWhatsApp />
    </main>
  );
};

export default ServicesPage;
