import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const ServicesHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const svc = t.services as Record<string, unknown>;
  const getText = (key: string): string => (svc[key] as string) || key;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Dissolve: opacity goes 1 → 0 as user scrolls
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  // Parallax: video moves slower
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const scrollToServices = () => {
    const el = document.getElementById("services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

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
          src="/videos/services-hero.mp4"
        />
      </motion.div>

      {/* Dark overlay 60% */}
      <div className="absolute inset-0 bg-black/60 z-10" />


      {/* Centered text */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl tracking-wider uppercase mb-4"
          style={{
            fontFamily: "'Aldo the Apache', sans-serif",
            textShadow:
              "0 0 20px hsla(0, 0%, 80%, 0.5), 0 0 60px hsla(0, 0%, 75%, 0.2)",
          }}
        >
          <span className="text-silver-gradient">{getText("heroTitle")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-body text-sm md:text-base tracking-[0.3em] uppercase text-white/60 mb-10 max-w-lg"
        >
          {getText("heroSubtitle")}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          onClick={scrollToServices}
          className="font-body text-[11px] tracking-[0.25em] uppercase border border-silver/40 text-silver px-10 py-4 transition-all duration-500 hover:bg-white/10 hover:border-white/60 hover:text-white hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        >
          {getText("heroButton")}
        </motion.button>

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

export default ServicesHero;
