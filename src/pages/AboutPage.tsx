import Header from "@/components/Header";
import AboutHero from "@/components/AboutHero";
import AboutSection from "@/components/AboutSection";
import TeamSection from "@/components/TeamSection";
import WorkWithUsSection from "@/components/WorkWithUsSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const AboutPage = () => {
  return (
    <main className="overflow-x-hidden bg-black">
      <Header />
      <div className="pt-20">
        <AboutHero />
        <AboutSection />
        <TeamSection />
        <WorkWithUsSection />
        <BecomePartnerSection />
      </div>
      <Footer />
      <FloatingCTA />
      <FloatingWhatsApp />
    </main>
  );
};

export default AboutPage;
