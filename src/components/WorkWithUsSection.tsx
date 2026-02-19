// WorkWithUsSection - careers and partnerships
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Handshake, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const WorkWithUsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const careers = [
  { title: t.workWithUs.role1Title, desc: t.workWithUs.role1Desc },
  { title: t.workWithUs.role2Title, desc: t.workWithUs.role2Desc },
  { title: t.workWithUs.role3Title, desc: t.workWithUs.role3Desc }];


  return (
    <section id="work-with-us" className="py-24 bg-[hsl(220,40%,8%)] border border-gold-dark md:py-[50px]">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20">

          <span className="font-body text-xs tracking-[0.3em] uppercase text-silver mb-4 block">
            {t.workWithUs.label}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
            {t.workWithUs.titleLine1}{" "}
            <span className="italic text-silver-gradient">{t.workWithUs.titleLine2}</span>
          </h2>
          <div className="mx-auto silver-line mt-8" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Careers Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}>

            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="w-6 h-6 text-silver" strokeWidth={1.2} />
              <h3 className="font-display text-2xl text-foreground">{t.workWithUs.careersTitle}</h3>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
              {t.workWithUs.careersDesc}
            </p>
            <div className="space-y-4">
              {careers.map((role, i) =>
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="border border-border p-5 hover:border-silver/40 transition-colors duration-300 group">

                  <h4 className="font-display text-lg text-foreground mb-1 group-hover:text-silver transition-colors">
                    {role.title}
                  </h4>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    {role.desc}
                  </p>
                </motion.div>
              )}
            </div>
            <a
              href="mailto:careers@nightdreamsbarcelona.com?subject=Career%20Application"
              className="inline-flex items-center gap-2 mt-8 border border-silver/60 px-8 py-3 font-body text-xs tracking-[0.15em] uppercase text-silver hover:bg-silver hover:text-background transition-all duration-300">

              {t.workWithUs.applyCta}
              <ArrowRight size={14} />
            </a>
          </motion.div>

          {/* Partnerships Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}>

            <div className="flex items-center gap-3 mb-8">
              <Handshake className="w-6 h-6 text-silver" strokeWidth={1.2} />
              <h3 className="font-display text-2xl text-foreground">{t.workWithUs.partnersTitle}</h3>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
              {t.workWithUs.partnersDesc}
            </p>
            <ul className="space-y-3 mb-8">
              {[t.workWithUs.partner1, t.workWithUs.partner2, t.workWithUs.partner3, t.workWithUs.partner4].map((item) =>
              <li key={item} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-silver mt-1.5 flex-shrink-0" />
                  <span className="font-body text-sm text-muted-foreground">{item}</span>
                </li>
              )}
            </ul>
            <a
              href="mailto:partners@nightdreamsbarcelona.com?subject=Partnership%20Inquiry"
              className="inline-flex items-center gap-2 bg-silver px-8 py-3 font-body text-xs tracking-[0.15em] uppercase text-background hover:bg-silver-dark transition-all duration-300">

              {t.workWithUs.partnerCta}
              <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>);

};

export default WorkWithUsSection;