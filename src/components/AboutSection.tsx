import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import skylineImage from "@/assets/barcelona-skyline.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 bg-section-gradient">
      <div className="container mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
              About Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-2 leading-tight">
              Your Gateway to
              <span className="block italic text-gold-gradient">Barcelona's Finest</span>
            </h2>
            <div className="gold-line my-8" />
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
              Concierging Barcelona is a premier VIP lifestyle service for elite travelers and high-profile guests. From luxury yacht charters and private chefs to VIP nightlife access and Michelin-starred dining — we curate every detail of your Barcelona experience.
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
              Our network of exclusive partners and local insiders ensures discretion, personalized attention, and access to experiences unavailable to the public. Your stay, elevated.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[
                { num: "500+", label: "Exclusive Partners" },
                { num: "12+", label: "Years of Excellence" },
                { num: "24/7", label: "Personal Support" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <span className="font-display text-3xl text-gold">{stat.num}</span>
                  <span className="block font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden">
              <img
                src={skylineImage}
                alt="Barcelona skyline at golden hour from Park Güell"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 border border-gold/20" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-gold/30" />
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-gold/30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
