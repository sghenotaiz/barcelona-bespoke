import { motion } from "framer-motion";
import nightdreamsBadge from "@/assets/nightdreams-badge.png";
import { useLanguage } from "@/i18n/LanguageContext";
import NightDreamsLogo from "@/components/NightDreamsLogo";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-[70vh] md:min-h-[85vh] w-full overflow-hidden -mb-16 md:-mb-24" style={{ backgroundColor: "hsl(0, 0%, 0%)" }}>
      <div className="relative z-10 flex h-full min-h-[70vh] md:min-h-[85vh] flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-4xl">

          <div className="mx-auto silver-line-wide mb-8" />
          
          <motion.img
            src={nightdreamsBadge}
            alt="NightDreams Logo"
            initial={{ opacity: 0, scale: 0.85, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            whileInView={{ rotateY: [0, 360] }}
            viewport={{ once: true }}
            style={{ perspective: "800px" }}
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

      {/* Gradient fade into carousel */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, hsl(0,0%,0%) 0%, hsl(0,0%,3%) 100%)" }} />

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20">
        <div className="w-px h-12 bg-gradient-to-b from-silver to-transparent" />
      </motion.div>
    </section>);

};

export default HeroSection;