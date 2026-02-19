import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello, I'm ${formData.name}. ${formData.message} (Email: ${formData.email}, Phone: ${formData.phone})`
    );
    window.open(`https://wa.me/34600000000?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-section-gradient">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-silver mb-4 block">
            {t.contact.label}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
            {t.contact.titleLine1} <span className="italic text-silver-gradient">{t.contact.titleLine2}</span>
          </h2>
          <div className="mx-auto silver-line mt-8" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-10">
              {t.contact.description}
            </p>

            <div className="space-y-6">
              {[
                { icon: MapPin, text: t.contact.address },
                { icon: Phone, text: t.contact.phone },
                { icon: Mail, text: t.contact.email },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-4">
                  <Icon className="w-4 h-4 text-silver" strokeWidth={1.5} />
                  <span className="font-body text-sm text-muted-foreground">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-5"
          >
            {[
              { name: "name" as const, placeholder: t.contact.namePlaceholder, type: "text" },
              { name: "email" as const, placeholder: t.contact.emailPlaceholder, type: "email" },
              { name: "phone" as const, placeholder: t.contact.phonePlaceholder, type: "tel" },
            ].map((field) => (
              <input
                key={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required
                value={formData[field.name]}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                className="w-full bg-transparent border-b border-border py-3 px-0 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-silver transition-colors"
              />
            ))}
            <textarea
              placeholder={t.contact.messagePlaceholder}
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-transparent border-b border-border py-3 px-0 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-silver transition-colors resize-none"
            />
            <button
              type="submit"
              className="mt-4 flex items-center gap-3 bg-silver px-10 py-3.5 font-body text-xs tracking-[0.2em] uppercase text-background hover:bg-silver-dark transition-all duration-300"
            >
              <Send size={14} />
              {t.contact.sendWhatsapp}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
