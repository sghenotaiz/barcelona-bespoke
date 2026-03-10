import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Handshake, Users, Eye, BadgeDollarSign, CalendarDays, ArrowRight, CheckCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const BecomePartnerSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", business: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Richiesta Partnership — NightDreams");
    const body = encodeURIComponent(
      `Nome: ${formData.name}\nEmail: ${formData.email}\nAttività: ${formData.business}\n\n${formData.message}`
    );
    window.location.href = `mailto:nightdreamsbarcelona@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const highlights = [
    { icon: Users, text: t.becomePartner.highlight1 },
    { icon: Eye, text: t.becomePartner.highlight2 },
    { icon: BadgeDollarSign, text: t.becomePartner.highlight3 },
    { icon: CalendarDays, text: t.becomePartner.highlight4 },
  ];

  return (
    <section className="py-24 md:py-28 bg-background relative overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-silver/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-3xl mb-4 block">🤝</span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
            {t.becomePartner.title}{" "}
            <span className="italic text-silver-gradient">{t.becomePartner.titleAccent}</span>
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-4 max-w-lg mx-auto leading-relaxed">
            {t.becomePartner.subtitle}
          </p>
          <div className="mx-auto silver-line mt-8" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-4 border border-border p-5 hover:border-silver/40 transition-colors duration-300 group"
              >
                <item.icon className="w-6 h-6 text-silver flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" strokeWidth={1.2} />
                <p className="font-body text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-body text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                  {t.becomePartner.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-silver/60 focus:outline-none transition-colors"
                  placeholder={t.becomePartner.namePlaceholder}
                />
              </div>
              <div>
                <label className="font-body text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                  {t.becomePartner.emailLabel}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-silver/60 focus:outline-none transition-colors"
                  placeholder={t.becomePartner.emailPlaceholder}
                />
              </div>
              <div>
                <label className="font-body text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                  {t.becomePartner.businessLabel}
                </label>
                <input
                  type="text"
                  value={formData.business}
                  onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                  className="w-full bg-transparent border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-silver/60 focus:outline-none transition-colors"
                  placeholder={t.becomePartner.businessPlaceholder}
                />
              </div>
              <div>
                <label className="font-body text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                  {t.becomePartner.messageLabel}
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-silver/60 focus:outline-none transition-colors resize-none"
                  placeholder={t.becomePartner.messagePlaceholder}
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-silver px-8 py-3 font-body text-xs tracking-[0.15em] uppercase text-background hover:bg-silver-dark transition-all duration-300 w-full justify-center"
              >
                {sent ? (
                  <>
                    <CheckCircle size={14} />
                    {t.becomePartner.sent}
                  </>
                ) : (
                  <>
                    {t.becomePartner.cta}
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BecomePartnerSection;
