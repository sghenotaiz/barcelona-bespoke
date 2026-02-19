import { motion } from "framer-motion";
import heroImage from "@/assets/hero-barcelona.jpg";
import { useLanguage } from "@/i18n/LanguageContext";
import NightDreamsLogo from "@/components/NightDreamsLogo";

const HeroSection = () => {
  const { t } = useLanguage();
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }} />

      <div className="absolute inset-0 bg-hero-overlay" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-4xl">

          <div className="mx-auto silver-line-wide mb-8" />
          
          <div className="flex justify-center mb-4">
            <NightDreamsLogo size="hero" showIcon={false} />
          </div>

          <p className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-silver-light mb-6">
            {t.hero.subtitle}
          </p>
          <p className="font-body text-sm md:text-base font-light text-primary-foreground/80 tracking-wide max-w-xl mx-auto mb-10 leading-relaxed">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo("services")}
              className="border border-primary-foreground/30 px-10 py-3.5 font-body text-xs tracking-[0.2em] uppercase text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300">
              {t.hero.exploreServices}
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="bg-silver px-10 py-3.5 font-body text-xs tracking-[0.2em] uppercase text-background hover:bg-silver-dark transition-all duration-300">
              {t.hero.requestVip}
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-12 bg-gradient-to-b from-silver to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
