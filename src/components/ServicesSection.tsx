import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UtensilsCrossed, Music, Map, Anchor } from "lucide-react";
import diningImage from "@/assets/dining.jpg";
import nightlifeImage from "@/assets/nightlife.jpg";
import toursImage from "@/assets/tours.jpg";
import yachtImage from "@/assets/yacht.jpg";

const services = [
  {
    icon: UtensilsCrossed,
    title: "Fine Dining",
    description: "Access to Barcelona's most exclusive restaurants and Michelin-starred tables, with priority reservations arranged by our team.",
    image: diningImage,
  },
  {
    icon: Music,
    title: "Nightlife & Clubs",
    description: "VIP entry, bottle service, and reserved tables at the city's most sought-after venues and private events.",
    image: nightlifeImage,
  },
  {
    icon: Map,
    title: "Private Tours",
    description: "Bespoke guided experiences through Barcelona's architectural wonders, hidden neighborhoods, and cultural treasures.",
    image: toursImage,
  },
  {
    icon: Anchor,
    title: "Day Activities",
    description: "Yacht charters, wellness retreats, wine tours, and curated day experiences along the Mediterranean coast.",
    image: yachtImage,
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
            Our Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
            Curated for the <span className="italic text-gold-gradient">Extraordinary</span>
          </h2>
          <div className="mx-auto gold-line mt-8" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative overflow-hidden bg-card cursor-pointer"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/50 transition-colors duration-500" />
                <div className="absolute bottom-6 left-6 right-6">
                  <service.icon className="w-8 h-8 text-gold mb-3" strokeWidth={1} />
                  <h3 className="font-display text-2xl text-primary-foreground mb-2">{service.title}</h3>
                  <p className="font-body text-xs text-primary-foreground/70 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
