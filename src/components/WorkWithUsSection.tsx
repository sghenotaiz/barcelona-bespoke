// WorkWithUsSection - careers and partnerships
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Handshake, ArrowRight } from "lucide-react";
import DualCTA from "@/components/DualCTA";
import { useLanguage } from "@/i18n/LanguageContext";

const WorkWithUsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const careers = [
    { title: t.workWithUs.role1Title, desc: t.workWithUs.role1Desc },
    { title: t.workWithUs.role2Title, desc: t.workWithUs.role2Desc },
    { title: t.workWithUs.role3Title, desc: t.workWithUs.role3Desc },
  ];

  const partnerPerks = [
    t.workWithUs.partner1,
    t.workWithUs.partner2,
    t.workWithUs.partner3,
    t.workWithUs.partner4,
  ];

  return (
    <section id="work-with-us" className="pb-24 md:pb-[50px] bg-background">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-silver mb-4 block">
            {t.workWithUs.label}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
            {t.workWithUs.titleLine1}{" "}
            <span className="italic text-silver-gradient">{t.workWithUs.titleLine2}</span>
          </h2>
          <div className="mx-auto silver-line mt-8" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Careers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="w-6 h-6 text-silver" strokeWidth={1.2} />
              <h3 className="font-display text-2xl text-foreground">{t.workWithUs.careersTitle}</h3>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
              {t.workWithUs.careersDesc}
            </p>
            <div className="space-y-4">
              {careers.map((role, i) => (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="border border-border p-5 hover:border-silver/40 transition-colors duration-300 group"
                >
                  <h4 className="font-display text-lg text-foreground mb-1 group-hover:text-silver transition-colors">
                    {role.title}
                  </h4>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    {role.desc}
                  </p>
                </motion.div>
              ))}
            </div>
            <a
              href="mailto:nightdreamsbarcelona@gmail.com?subject=Richiesta%20Lavoro%20-%20NightDreams"
              className="inline-flex items-center justify-center gap-2 font-body text-[11px] tracking-[0.2em] uppercase min-h-[44px] px-8 py-3.5 border border-silver/40 text-silver transition-all duration-500 hover:bg-white/10 hover:border-white/60 hover:text-white hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              {t.workWithUs.applyCta}
              <ArrowRight size={13} />
            </a>
          </motion.div>

          {/* Partnerships */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Handshake className="w-6 h-6 text-silver" strokeWidth={1.2} />
              <h3 className="font-display text-2xl text-foreground">{t.workWithUs.partnersTitle}</h3>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
              {t.workWithUs.partnersDesc}
            </p>
            <div className="space-y-4">
              {partnerPerks.map((perk, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="border border-border p-5 hover:border-silver/40 transition-colors duration-300 group"
                >
                  <p className="font-body text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                    {perk}
                  </p>
                </motion.div>
              ))}
            </div>
            <DualCTA
              waLabel="WhatsApp"
              bookLabel={t.workWithUs.partnerCta}
              bookHref="mailto:nightdreamsbarcelona@gmail.com?subject=Richiesta%20Partnership%20-%20NightDreams"
              variant="default"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorkWithUsSection;
