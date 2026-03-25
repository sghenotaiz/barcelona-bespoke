import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import nightdreamsBadge from "@/assets/nightdreams-badge.png";
import { useLanguage } from "@/i18n/LanguageContext";

const AnimatedCounter = ({ target }: { target: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.floor(v).toLocaleString("it-IT")}+`);

  useEffect(() => {
    const controls = animate(count, target, { duration: 2.5, ease: "easeOut" });
    return controls.stop;
  }, [count, target]);

  return <motion.span>{rounded}</motion.span>;
};

const HeroSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ height: "clamp(600px, 100vh, 800px)", backgroundColor: "hsl(0 0% 0%)" }}
    >
      <div className="flex flex-col items-center justify-center px-6 text-center">
        {/* Logo — slow rotation, no glow/particles */}
        <motion.img
          src={nightdreamsBadge}
          alt="Night Dreams BCN"
          className="w-20 h-20 md:w-28 md:h-28 object-contain mb-10 cursor-pointer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, rotateY: [0, 360] }}
          transition={{
            opacity: { duration: 1 },
            scale: { duration: 1 },
            rotateY: { duration: 24, repeat: Infinity, ease: "linear" },
          }}
          whileHover={{ scale: 1.12 }}
          style={{ transformStyle: "preserve-3d" }}
        />

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-body font-bold tracking-[0.06em] uppercase mb-4 text-foreground cursor-default"
          style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)" }}
          whileHover={{ scale: 1.03 }}
        >
          Night Dreams BCN
        </motion.h1>

        {/* Thin separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-16 h-px bg-foreground/20 mb-6"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="font-body font-light text-sm md:text-base tracking-wide max-w-lg mb-3 text-foreground/70 cursor-default"
          whileHover={{ scale: 1.02 }}
        >
          Scopri le migliori esperienze notturne di Barcellona senza stress e sorprese
        </motion.p>

        {/* Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mb-4"
        >
          <span className="text-2xl md:text-4xl font-body font-bold text-foreground">
            <AnimatedCounter target={10000} />
          </span>
          <p className="text-[11px] md:text-xs tracking-[0.2em] uppercase mt-1 font-body text-foreground/40">
            {t.hero.vipTrust}
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="font-body font-medium text-xs tracking-[0.25em] uppercase text-foreground/50 mb-10 cursor-default"
          whileHover={{ scale: 1.03 }}
        >
          {t.hero.yearRound}
        </motion.p>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.5 }}
          whileHover={{ scale: 1.04 }}
          onClick={() => { navigate("/plan"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="font-body text-[11px] tracking-[0.2em] uppercase px-10 py-4 border border-foreground/20 text-foreground/70 bg-transparent transition-colors duration-300 hover:border-foreground/50 hover:text-foreground"
        >
          {t.hero.exploreServices}
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8"
      >
        <div className="w-px h-10 bg-gradient-to-b from-foreground/30 to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
