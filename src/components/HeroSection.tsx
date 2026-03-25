import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import nightdreamsBadge from "@/assets/nightdreams-badge.png";
import { useLanguage } from "@/i18n/LanguageContext";
import HeroParticles from "@/components/HeroParticles";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden"
      style={{
        height: "clamp(600px, 100vh, 800px)",
        background: "linear-gradient(180deg, hsl(220 15% 4%) 0%, hsl(0 0% 0%) 40%, hsl(220 20% 6%) 100%)",
      }}
    >
      {/* Subtle navy radial glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, hsl(220 20% 12% / 0.5), transparent)",
        }}
      />

      {/* Parallax gold accent light following mouse */}
      <motion.div
        className="absolute z-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(43 72% 52% / 0.04), transparent 70%)",
          left: "50%",
          top: "40%",
          transform: `translate(calc(-50% + ${mousePos.x * 30}px), calc(-50% + ${mousePos.y * 20}px))`,
          transition: "transform 0.3s ease-out",
        }}
      />

      {/* Star particles */}
      <HeroParticles />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        {/* Logo with gentle glow pulse */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative mb-8"
        >
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, hsl(43 72% 52% / 0.15), transparent 70%)",
              transform: "scale(2.5)",
            }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [2.2, 2.6, 2.2],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src={nightdreamsBadge}
            alt="Night Dreams BCN"
            className="w-20 h-20 md:w-28 md:h-28 object-contain relative z-10"
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
            style={{
              transformStyle: "preserve-3d",
              filter: "drop-shadow(0 0 20px hsl(43 72% 52% / 0.3))",
            }}
          />
        </motion.div>

        {/* Gold decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="w-24 h-px mb-8"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(43 72% 52%), transparent)",
          }}
        />

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-body font-bold tracking-[0.08em] uppercase mb-3"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          <span style={{ color: "hsl(0 0% 95%)" }}>Night </span>
          <span
            style={{
              background: "linear-gradient(135deg, hsl(43 80% 65%), hsl(43 72% 52%), hsl(43 65% 40%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Dreams
          </span>
          <span style={{ color: "hsl(0 0% 95%)" }}> BCN</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="font-body font-light text-sm md:text-lg tracking-[0.15em] uppercase mb-6 max-w-xl"
          style={{ color: "hsl(0 0% 70%)" }}
        >
          {t.hero.description}
        </motion.p>

        {/* Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mb-6"
        >
          <span
            className="text-3xl md:text-5xl font-body font-bold"
            style={{ color: "hsl(43 72% 52%)" }}
          >
            <AnimatedCounter target={10000} />
          </span>
          <p
            className="text-xs md:text-sm tracking-[0.2em] uppercase mt-1 font-body"
            style={{ color: "hsl(0 0% 55%)" }}
          >
            {t.hero.vipTrust}
          </p>
        </motion.div>

        {/* Year-round tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="font-body font-medium text-xs md:text-sm tracking-[0.25em] uppercase mb-8"
        >
          <motion.span
            style={{ color: "hsl(43 72% 52%)" }}
            animate={{
              textShadow: [
                "0 0 8px hsl(43 72% 52% / 0.3)",
                "0 0 20px hsl(43 72% 52% / 0.5)",
                "0 0 8px hsl(43 72% 52% / 0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {t.hero.yearRound}
          </motion.span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => {
              navigate("/plan");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-body text-xs tracking-[0.2em] uppercase px-10 py-4 border transition-all duration-500"
            style={{
              borderColor: "hsl(43 72% 52%)",
              color: "hsl(43 72% 52%)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "hsl(43 72% 52%)";
              e.currentTarget.style.color = "hsl(0 0% 0%)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "hsl(43 72% 52%)";
            }}
          >
            {t.hero.exploreServices}
          </button>

          <button
            onClick={() => navigate("/services#skip-line")}
            className="font-body text-xs tracking-[0.2em] uppercase px-10 py-4 border transition-all duration-500"
            style={{
              borderColor: "hsl(0 0% 30%)",
              color: "hsl(0 0% 75%)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "hsl(0 0% 60%)";
              e.currentTarget.style.color = "hsl(0 0% 95%)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "hsl(0 0% 30%)";
              e.currentTarget.style.color = "hsl(0 0% 75%)";
            }}
          >
            {t.hero.skipLine}
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8"
        >
          <div
            className="w-px h-12"
            style={{
              background: "linear-gradient(to bottom, hsl(43 72% 52% / 0.5), transparent)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
