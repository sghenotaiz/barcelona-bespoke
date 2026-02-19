import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Anchor, ChefHat, Music, UtensilsCrossed, Dumbbell } from "lucide-react";
import yachtImage from "@/assets/yacht.jpg";
import diningImage from "@/assets/dining.jpg";
import nightlifeImage from "@/assets/nightlife.jpg";
import restaurantImage from "@/assets/restaurant.jpg";
import sportsImage from "@/assets/sports.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const services = [
  { icon: Anchor, image: yachtImage, span: "md:col-span-2", ...t.services.yacht },
  { icon: ChefHat, image: diningImage, span: "", ...t.services.chef },
  { icon: Music, image: nightlifeImage, span: "", ...t.services.nightlife },
  { icon: UtensilsCrossed, image: restaurantImage, span: "", ...t.services.dining },
  { icon: Dumbbell, image: sportsImage, span: "", ...t.services.sports }];


  return (
    <section id="services" className="py-24 bg-[hsl(220,40%,8%)] border border-gold-dark md:py-[50px]">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20">

          <span className="font-body text-xs tracking-[0.3em] uppercase text-silver mb-4 block">
            {t.services.label}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
            {t.services.titleLine1} <span className="italic text-silver-gradient">{t.services.titleLine2}</span>
          </h2>
          <div className="mx-auto silver-line mt-8" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) =>
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`group relative overflow-hidden bg-card cursor-pointer ${service.span}`}>

              <div className="relative h-72 overflow-hidden">
                <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                <div className="absolute inset-0 bg-background/50 group-hover:bg-background/65 transition-colors duration-500" />
                <div className="absolute bottom-6 left-6 right-6">
                  <service.icon className="w-7 h-7 text-silver mb-3" strokeWidth={1} />
                  <h3 className="font-display text-2xl text-primary-foreground mb-2">{service.title}</h3>
                  <p className="font-body text-xs text-primary-foreground/70 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

};

export default ServicesSection;