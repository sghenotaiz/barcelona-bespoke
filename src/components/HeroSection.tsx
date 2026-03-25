import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { PartyPopper } from "lucide-react";
import { useNavigate } from "react-router-dom";
import nightdreamsBadge from "@/assets/nightdreams-badge.png";
import { useLanguage } from "@/i18n/LanguageContext";
import NightDreamsLogo from "@/components/NightDreamsLogo";

const CLUBS = ["Ku BCN", "Opium", "Bling Bling", "& Much More..."];

const AnimatedCounter = ({ target }: { target: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.floor(v).toLocaleString("it-IT")}+`);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(count, target, { duration: 2.5, ease: "easeOut" });
    return controls.stop;
  }, [count, target]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const ClubMarquee = () => {
  const doubled = [...CLUBS, ...CLUBS];
  return (
    <div className="overflow-hidden w-full max-w-lg mx-auto mt-2">
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((club, i) => (
          <span
            key={i}
            className="text-sm md:text-base font-body tracking-widest uppercase"
            style={{
              color: "hsl(0, 0%, 85%)",
              textShadow: "0 0 8px hsl(0 0% 75% / 0.6), 0 0 20px hsl(0 0% 80% / 0.3)",
            }}
          >
            {club}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const HeroSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleCta = () => {
    navigate("/plan");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-fit md:min-h-screen w-full overflow-hidden pb-4 md:pb-0" style={{ backgroundColor: "hsl(0, 0%, 0%)" }}>
      {/* Party lights background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, hsl(280, 70%, 50%), transparent 70%)", top: "-10%", left: "-10%" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, hsl(330, 70%, 50%), transparent 70%)", bottom: "-5%", right: "-5%" }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.03, 0.07, 0.03] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="relative z-10 flex h-full min-h-[85vh] md:min-h-screen flex-col items-center justify-center px-4 pt-16 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-3xl w-full"
        >
          <div className="mx-auto silver-line-wide mb-6" />

          {/* Rotating logo with glow pulse */}
          <motion.img
            src={nightdreamsBadge}
            alt="NightDreams Logo"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1, rotateY: 360 }}
            transition={{
              opacity: { duration: 0.8, delay: 0.5 },
              scale: { duration: 0.8, delay: 0.5 },
              rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
            }}
            style={{
              transformStyle: "preserve-3d",
              filter: "drop-shadow(0 0 16px hsl(45, 80%, 55%)) drop-shadow(0 0 40px hsl(45, 70%, 45% / 0.4))",
            }}
            className="mx-auto w-24 h-24 md:w-32 md:h-32 object-contain mb-4 animate-neon-pulse"
          />

          {/* NIGHTDREAMS BARCELLONA */}
          <div className="flex justify-center mb-1">
            <NightDreamsLogo size="hero" showIcon={false} />
          </div>
          <p className="text-xs tracking-[0.3em] uppercase text-silver-light mb-6 font-mono md:text-lg">
            {t.hero.subtitle}
          </p>

          {/* Animated counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mb-6"
          >
            <span className="text-3xl md:text-5xl font-display font-bold" style={{ color: "hsl(45, 80%, 55%)" }}>
              <AnimatedCounter target={10000} />
            </span>
            <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-silver-light/80 mt-1 font-body">
              {t.hero.vipTrust}
            </p>
          </motion.div>

          {/* Skip-the-line badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="mb-5"
          >
            <motion.div
              animate={{ boxShadow: ["0 0 8px hsl(0, 75%, 50%)", "0 0 24px hsl(0, 75%, 55%)", "0 0 8px hsl(0, 75%, 50%)"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm cursor-pointer"
              style={{ backgroundColor: "hsl(0, 75%, 50%)" }}
              onClick={() => navigate("/services#skip-line")}
            >
              <Zap size={18} className="text-foreground" style={{ color: "hsl(0, 0%, 100%)" }} />
              <span className="text-sm md:text-base font-bold tracking-wider uppercase font-body" style={{ color: "hsl(0, 0%, 100%)" }}>
                {t.hero.skipLine}
              </span>
              <Zap size={18} className="text-foreground" style={{ color: "hsl(0, 0%, 100%)" }} />
            </motion.div>
            <div className="mt-3 space-y-1">
              <p className="text-xs md:text-sm text-silver-light/90 font-body">{t.hero.skipLineDesc1}</p>
              <p className="text-xs md:text-sm text-silver-light/90 font-body">{t.hero.skipLineDesc2}</p>
            </div>
          </motion.div>

          {/* VIP Tables + Club marquee */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 mb-1">
              <PartyPopper size={18} style={{ color: "hsl(45, 80%, 55%)" }} />
              <span className="text-sm md:text-base font-bold tracking-wider uppercase font-body text-silver-light">
                {t.hero.vipTables}
              </span>
            </div>
            <ClubMarquee />
          </motion.div>

          {/* Enter the world */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-silver-dark font-mono mb-4"
          >
            {t.hero.enterWorld}
          </motion.p>

          {/* 365 days animated text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.5 }}
            className="relative"
          >
            <motion.p
              className="text-lg md:text-2xl font-display font-bold tracking-[0.15em] uppercase"
              style={{ color: "hsl(45, 80%, 55%)" }}
              animate={{
                textShadow: [
                  "0 0 10px hsl(45, 80%, 55% / 0.4), 0 0 20px hsl(45, 80%, 55% / 0.2)",
                  "0 0 20px hsl(45, 80%, 55% / 0.6), 0 0 40px hsl(45, 80%, 55% / 0.3)",
                  "0 0 10px hsl(45, 80%, 55% / 0.4), 0 0 20px hsl(45, 80%, 55% / 0.2)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {t.hero.yearRound}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
};

export default HeroSection;
