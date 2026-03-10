import Header from "@/components/Header";
import ExperiencesHero from "@/components/ExperiencesHero";
import ExperiencesContent from "@/components/ExperiencesContent";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import FloatingSocials from "@/components/FloatingSocials";

const MomentsPage = () => {
  return (
    <main className="overflow-x-hidden bg-black">
      <Header />
      <div className="pt-20">
        <ExperiencesHero />
        <ExperiencesContent />
      </div>
      <Footer />
      <FloatingCTA />
      <FloatingWhatsApp />
      <FloatingSocials />
    </main>
  );
};

export default MomentsPage;
