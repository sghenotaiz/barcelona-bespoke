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

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const stats = [
  { num: t.about.stat1Num, label: t.about.stat1Label },
  { num: t.about.stat2Num, label: t.about.stat2Label },
  { num: t.about.stat3Num, label: t.about.stat3Label }];


  return (
    <section id="about" className="py-24 bg-[hsl(0,0%,10%)] border border-gold-dark md:py-[50px]">
      <div className="container mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}>

            <span className="font-body text-xs tracking-[0.3em] uppercase text-silver mb-4 block">
              {t.about.label}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-2 leading-tight">
              {t.about.titleLine1}
              <span className="block italic text-silver-gradient">{t.about.titleLine2}</span>
            </h2>
            <div className="silver-line my-8" />
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
              {t.about.paragraph1}
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
              {t.about.paragraph2}
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
              {t.about.paragraph3}
            </p>
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat) =>
              <div key={stat.label} className="text-center">
                  <span className="font-display text-3xl text-silver">{stat.num}</span>
                  <span className="block font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground mt-1">
                    {stat.label}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative">

            <div className="relative flex flex-col items-center justify-center h-[500px]">
              <img
                src={nightdreamsLogo}
                alt="NightDreams Barcelona Logo"
                className="max-w-[320px] w-full h-auto object-contain drop-shadow-2xl" />

              {/* Social Media Links */}
              <div className="mt-6 flex flex-col items-center gap-2.5">
                <span className="font-body text-sm text-silver tracking-wide">Follow Us on Social Media!</span>
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.instagram.com/nightdreamsbarcelona"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-silver hover:drop-shadow-[0_0_8px_hsl(0,0%,75%)] transition-all duration-300"
                  >
                    <Instagram size={24} />
                  </a>
                  <a
                    href="https://www.tiktok.com/@nightdreamsbarcelona"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-silver hover:drop-shadow-[0_0_8px_hsl(0,0%,75%)] transition-all duration-300"
                  >
                    <TikTokIcon size={24} />
                  </a>
                </div>
              </div>

              <div className="absolute inset-0 border border-silver/20 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

};

export default AboutSection;