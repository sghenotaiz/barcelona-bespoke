import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram } from "lucide-react";
import nightdreamsLogo from "@/assets/nightdreams-logo.jpeg";
import { useLanguage } from "@/i18n/LanguageContext";

const TikTokIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.7a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.13z" />
  </svg>
);

// Neon glow stat with pulse
const GlowStat = ({ children }: { children: React.ReactNode }) => (
  <span className="font-semibold relative inline-block animate-neon-pulse">
    <span className="bg-gradient-to-r from-silver via-foreground to-silver bg-clip-text text-transparent">
      {children}
    </span>
  </span>
);

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const stats = [
    { num: t.about.stat1Num, label: t.about.stat1Label },
    { num: t.about.stat2Num, label: t.about.stat2Label },
    { num: t.about.stat3Num, label: t.about.stat3Label },
  ];

  return (
    <section id="about" className="py-12 bg-background">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Title with neon pulse */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-light mb-2 leading-tight animate-neon-pulse">
            <span className="bg-gradient-to-r from-silver via-foreground to-silver bg-clip-text text-transparent">
              {t.about.titleLine1}
            </span>
            <span className="block italic text-silver-gradient drop-shadow-[0_0_20px_hsl(0,0%,70%)]">
              {t.about.titleLine2}
            </span>
          </h2>
          <div className="mx-auto silver-line my-8" />

          {/* Paragraphs with smooth fade-up, hover lift */}
          <motion.p
            {...fadeUp(0.2)}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            className="font-body text-sm text-muted-foreground leading-relaxed mb-4 hover:-translate-y-1 transition-transform duration-300"
          >
            {t.about.paragraph1}
          </motion.p>
          <motion.p
            {...fadeUp(0.35)}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            className="font-body text-sm text-muted-foreground leading-relaxed mb-4 hover:-translate-y-1 transition-transform duration-300"
          >
            {t.about.paragraph2}
          </motion.p>
          <motion.p
            {...fadeUp(0.5)}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            className="font-body text-sm text-muted-foreground leading-relaxed mb-8 hover:-translate-y-1 transition-transform duration-300"
          >
            {t.about.paragraph3}
          </motion.p>

          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
                className="text-center hover:-translate-y-1 transition-transform duration-300"
              >
                <span className="font-display text-3xl drop-shadow-[0_0_12px_hsl(0,0%,70%)]">
                  <GlowStat>{stat.num}</GlowStat>
                </span>
                <span className="block font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground mt-1">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Small logo + social */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center mb-10"
        >
          <img
            src={nightdreamsLogo}
            alt="NightDreams Barcelona Logo"
            className="w-28 h-auto object-contain drop-shadow-2xl rounded-lg mb-4"
          />
          <span className="font-body text-sm text-silver tracking-wide mb-2 drop-shadow-[0_0_8px_hsl(0,0%,60%)]">
            {t.about.followUs}
          </span>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/nightdreamsbarcelona"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-silver hover:drop-shadow-[0_0_12px_hsl(0,0%,75%)] transition-all duration-300"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://www.tiktok.com/@nightdreamsbarcelona"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-silver hover:drop-shadow-[0_0_12px_hsl(0,0%,75%)] transition-all duration-300"
            >
              <TikTokIcon size={24} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
