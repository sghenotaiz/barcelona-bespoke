import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import badge from "@/assets/nightdreams-badge.png";

const ExperiencesHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative w-full h-[70vh] overflow-hidden"
    >
      {/* Video with parallax */}
      <motion.div
        style={{ y: videoY }}
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="/videos/experiences-hero.mp4"
        />
      </motion.div>

      {/* Dark overlay 60% */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Centered text */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
        {/* Small badge */}
        <motion.img
          src={badge}
          alt="NightDreams"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute w-[200px] md:w-[280px] pointer-events-none"
        />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl tracking-wider uppercase mb-4 relative"
          style={{
            fontFamily: "'Aldo the Apache', sans-serif",
            textShadow:
              "0 0 20px hsla(0, 0%, 80%, 0.5), 0 0 60px hsla(0, 0%, 75%, 0.2)",
          }}
        >
          <span className="text-silver-gradient">{t.experiences.heroTitle || "ESPERIENZE VISSUTE"}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-body text-sm md:text-base tracking-[0.3em] uppercase text-white/60 mb-10 max-w-lg relative"
        >
          {t.experiences.heroSubtitle || "The best moments from our events"}
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8"
        >
          <div className="w-px h-12 bg-gradient-to-b from-silver/60 to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExperiencesHero;
