import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import vipTablesImg from "@/assets/services/vip-tables.jpg";
import vipEntryImg from "@/assets/services/vip-entry.jpg";
import multiEntryImg from "@/assets/services/multi-entry.jpg";
import poolPartyImg from "@/assets/services/pool-party.jpg";
import restaurantImg from "@/assets/services/restaurant.jpg";
import apartmentsImg from "@/assets/services/apartments.jpg";
import limousineImg from "@/assets/services/limousine.jpg";
import bachelorPartyImg from "@/assets/services/bachelor-party.jpg";
import corporatePartyImg from "@/assets/services/corporate-party.jpg";

const services = [
  {
    image: vipTablesImg,
    title: "VIP Tables",
    description: "Magnum bottles, sparklers & exclusive VIP booths in Barcelona's top clubs. The real experience starts here.",
  },
  {
    image: vipEntryImg,
    title: "VIP Entries + Skip-the-Line",
    description: "Walk straight past the queue into the city's most exclusive venues. No waiting. Pure VIP.",
  },
  {
    image: multiEntryImg,
    title: "Multi-Entry Packs",
    description: "Access multiple clubs in one night — dance floors, DJ sets & full freedom to move between the best spots.",
  },
  {
    image: poolPartyImg,
    title: "Pool Parties",
    description: "Luxury Barcelona beach club parties, poolside vibes under the Mediterranean sun. Daytime magic.",
  },
  {
    image: restaurantImg,
    title: "Restaurant Discounts",
    description: "Exclusive deals at Barcelona's finest restaurants — gourmet paella, premium steak, and Michelin-level cuisine.",
  },
  {
    image: apartmentsImg,
    title: "Apartments & Hotels",
    description: "Hand-picked luxury apartments and 5-star hotel suites with stunning Barcelona skyline views.",
  },
  {
    image: limousineImg,
    title: "Limousine & Chauffeur",
    description: "Arrive in style. Black luxury limousines with professional chauffeurs — from hotel to club door.",
  },
  {
    image: bachelorPartyImg,
    title: "Bachelor Parties",
    description: "Unforgettable stag celebrations — VIP tables, premium drinks, sparklers & experiences they'll never forget.",
  },
  {
    image: corporatePartyImg,
    title: "Corporate Themed Parties",
    description: "Bespoke company events with custom themed decorations, premium venues and full event management.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="services" className="py-24 md:py-20 bg-[#0c121d]">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-silver mb-4 block">
            {t.services.label}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
            {t.services.titleLine1}{" "}
            <span className="italic text-silver-gradient">{t.services.titleLine2}</span>
          </h2>
          <div className="mx-auto silver-line mt-8" />
        </motion.div>

        {/* About Us Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto text-center mb-16 border border-silver/20 bg-card/40 px-8 py-6"
        >
          <p className="font-body text-sm text-silver leading-relaxed">
            <span className="font-semibold text-foreground">Since 2020:</span> Inside/outside Barcelona's best clubs.
            Our strength:{" "}
            <span className="font-semibold text-foreground uppercase tracking-wide">
              CONSTANT PRESENCE
            </span>{" "}
            all year round. Always available online + physically.{" "}
            <span className="italic text-silver-gradient">Not seasonal.</span>
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group flex flex-col bg-card border border-border overflow-hidden hover:border-silver/40 transition-colors duration-500"
            >
              {/* Image — 60% of card height */}
              <div className="relative overflow-hidden" style={{ height: "260px" }}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  style={{ transform: "scale(1)", transition: "transform 0.7s ease" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 gap-3">
                <h3 className="font-display text-xl text-foreground leading-snug">
                  {service.title}
                </h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed flex-1">
                  {service.description}
                </p>
                <div className="silver-line mb-1" />
                <a
                  href="#booking"
                  className="inline-block mt-1 font-body text-xs tracking-[0.2em] uppercase text-center border border-silver/40 text-silver hover:bg-silver hover:text-background transition-all duration-300 px-5 py-3"
                >
                  Prenota Ora
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
