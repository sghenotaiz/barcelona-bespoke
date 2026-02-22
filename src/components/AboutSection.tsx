import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import sagradaFamiliaImage from "@/assets/sagrada-familia-night.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

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

            <div className="relative overflow-hidden">
              <img
                src={sagradaFamiliaImage}
                alt="Sagrada Família at night, Barcelona"
                className="w-full h-[500px] object-cover" />

              <div className="absolute inset-0 border border-silver/20" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-silver/30" />
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-silver/30" />
          </motion.div>
        </div>
      </div>
    </section>);

};

export default AboutSection;