import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MapPin, Phone, Mail } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
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
    <section id="contact" className="py-24 md:py-32 bg-navy">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
            Get in Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-primary-foreground">
            Begin Your <span className="italic text-gold-gradient">Barcelona Story</span>
          </h2>
          <div className="mx-auto gold-line mt-8" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-body text-sm text-primary-foreground/70 leading-relaxed mb-10">
              Whether you're planning a weekend escape or an extended stay, our concierge team is ready to craft your perfect Barcelona experience. Share your vision and we'll handle every detail.
            </p>

            <div className="space-y-6">
              {[
                { icon: MapPin, text: "Passeig de Gràcia, Barcelona" },
                { icon: Phone, text: "+34 600 000 000" },
                { icon: Mail, text: "hello@conciergingbarcelona.com" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-4">
                  <Icon className="w-4 h-4 text-gold" strokeWidth={1.5} />
                  <span className="font-body text-sm text-primary-foreground/70">{text}</span>
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
              { name: "name" as const, placeholder: "Your Name", type: "text" },
              { name: "email" as const, placeholder: "Email Address", type: "email" },
              { name: "phone" as const, placeholder: "Phone Number", type: "tel" },
            ].map((field) => (
              <input
                key={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required
                value={formData[field.name]}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                className="w-full bg-transparent border-b border-primary-foreground/20 py-3 px-0 font-body text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-gold transition-colors"
              />
            ))}
            <textarea
              placeholder="Tell us about your ideal Barcelona experience..."
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-transparent border-b border-primary-foreground/20 py-3 px-0 font-body text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-gold transition-colors resize-none"
            />
            <button
              type="submit"
              className="mt-4 flex items-center gap-3 bg-gold px-10 py-3.5 font-body text-xs tracking-[0.2em] uppercase text-primary-foreground hover:bg-gold-dark transition-all duration-300"
            >
              <Send size={14} />
              Send via WhatsApp
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
