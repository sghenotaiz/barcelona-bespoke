import { motion } from "framer-motion";
import nightdreamsBadge from "@/assets/nightdreams-badge.png";
import { useLanguage } from "@/i18n/LanguageContext";
import NightDreamsLogo from "@/components/NightDreamsLogo";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-[80vh] md:min-h-screen w-full overflow-hidden" style={{ backgroundColor: "hsl(0, 0%, 0%)" }}>
      <div className="relative z-10 flex h-full min-h-[80vh] md:min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-4xl">

          <div className="mx-auto silver-line-wide mb-8" />
          
          <motion.img
            src={nightdreamsBadge}
            alt="NightDreams Logo"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto w-28 h-28 md:w-36 md:h-36 object-contain mb-6"
          />

          <div className="flex justify-center mb-4">
            <NightDreamsLogo size="hero" showIcon={false} />
          </div>

          <p className="text-xs tracking-[0.3em] uppercase text-silver-light mb-6 font-mono text-center md:text-2xl">
            {t.hero.subtitle}
          </p>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-12 bg-gradient-to-b from-silver to-transparent" />
      </motion.div>
    </section>);

};

export default HeroSection;