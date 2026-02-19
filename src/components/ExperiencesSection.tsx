import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import yachtImage from "@/assets/yacht.jpg";
import diningImage from "@/assets/dining.jpg";
import nightlifeImage from "@/assets/nightlife.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const ExperiencesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const experiences = [
    { image: yachtImage, ...t.experiences.yacht },
    { image: nightlifeImage, ...t.experiences.nightlife },
    { image: diningImage, ...t.experiences.dining },
  ];

  return (
    <section id="experiences" className="py-24 md:py-32 bg-section-gradient">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-silver mb-4 block">
            {t.experiences.label}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
            {t.experiences.titleLine1} <span className="italic text-silver-gradient">{t.experiences.titleLine2}</span>
          </h2>
          <div className="mx-auto silver-line mt-8" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative overflow-hidden aspect-[3/4] cursor-pointer"
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-silver block mb-2">
                  {exp.category}
                </span>
                <h3 className="font-display text-xl md:text-2xl text-primary-foreground leading-snug">
                  {exp.title}
                </h3>
                <div className="silver-line mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
