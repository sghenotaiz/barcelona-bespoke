import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import nightdreamsBadge from "@/assets/nightdreams-badge.png";

const aboutTitles: Record<string, string> = {
  it: "CHI SIAMO",
  en: "ABOUT US",
  es: "QUIÉNES SOMOS",
  fr: "QUI SOMMES-NOUS",
};

const AboutHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

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
          src="/videos/about-hero.mp4"
        />
      </motion.div>

      {/* Dark overlay 60% */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Centered content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
        {/* Logo badge */}
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          src={nightdreamsBadge}
          alt="NightDreams Badge"
          className="w-24 h-24 md:w-32 md:h-32 object-contain mb-6 opacity-80"
        />

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl tracking-wider uppercase"
          style={{
            fontFamily: "'Aldo the Apache', sans-serif",
            textShadow:
              "0 0 20px hsla(0, 0%, 80%, 0.5), 0 0 60px hsla(0, 0%, 75%, 0.2)",
          }}
        >
          <span className="text-silver-gradient">
            {aboutTitles[language] || aboutTitles.en}
          </span>
        </motion.h1>

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

export default AboutHero;
