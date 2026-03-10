import Header from "@/components/Header";
import ServicesHero from "@/components/ServicesHero";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import FloatingSocials from "@/components/FloatingSocials";

const ServicesPage = () => {
  return (
    <main className="overflow-x-hidden bg-black">
      <Header />
      <div className="pt-20">
        <ServicesHero />
        <ServicesSection />
      </div>
      <Footer />
      <FloatingCTA />
      <FloatingWhatsApp />
      <FloatingSocials />
    </main>
  );
};

export default ServicesPage;