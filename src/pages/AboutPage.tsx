import Header from "@/components/Header";
import AboutSection from "@/components/AboutSection";
import TeamSection from "@/components/TeamSection";
import WorkWithUsSection from "@/components/WorkWithUsSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const AboutPage = () => {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <div className="pt-20">
        <AboutSection />
        <TeamSection />
        <WorkWithUsSection />
      </div>
      <Footer />
      <FloatingCTA />
      <FloatingWhatsApp />
    </main>
  );
};

export default AboutPage;
