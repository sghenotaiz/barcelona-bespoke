import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import vipTablesImg from "@/assets/services/vip-tables.jpg";
import vipEntryImg from "@/assets/services/vip-entry.jpg";
import weeklyPackImg from "@/assets/services/multi-entry.jpg";
import poolPartyImg from "@/assets/services/pool-party.jpg";
import restaurantImg from "@/assets/services/restaurant.jpg";
import apartmentsImg from "@/assets/services/apartments.jpg";
import limousineImg from "@/assets/services/limousine.jpg";
import bachelorPartyImg from "@/assets/services/bachelor-party.jpg";

import jetSkiImg from "@/assets/services/jet-ski.jpg";
import altroImg from "@/assets/services/altro.jpg";

type ServiceDef = {
  image: string;
  title: string;
  description: string;
  badgeKey: string;
  highlight?: boolean;
};

const servicesDefs: ServiceDef[] = [
{
  image: vipTablesImg,
  title: "VIP Tables",
  description: "Magnum bottles, sparklers & exclusive VIP booths in Barcelona's top clubs. The real experience starts here.",
  badgeKey: "badgeUnbeatable"
},
{
  image: vipEntryImg,
  title: "VIP Entries + Skip-the-Line",
  description: "Walk straight past the queue into the city's most exclusive venues. No waiting. Pure VIP.",
  badgeKey: "badgeAffordable"
},
{
  image: weeklyPackImg,
  title: "More Days Packs / Weekly Pack",
  description: "Save more by booking events over several days instead of single nights. Our multi-day and weekly packs give you access to multiple parties at a much better price than booking each night separately.",
  badgeKey: "badgeWeekly"
},
{
  image: poolPartyImg,
  title: "Pool Parties",
  description: "Luxury Barcelona beach club parties, poolside vibes under the Mediterranean sun. Daytime magic.",
  badgeKey: "badgeAffordable"
},
{
  image: restaurantImg,
  title: "Restaurant Discounts",
  description: "Exclusive deals at Barcelona's finest restaurants — gourmet paella, premium steak, and Michelin-level cuisine.",
  badgeKey: "badgeDiscount"
},
{
  image: apartmentsImg,
  title: "Apartments & Hotels",
  description: "Hand-picked luxury apartments and 5-star hotel suites with stunning Barcelona skyline views.",
  badgeKey: "badgeUnbeatable"
},
{
  image: limousineImg,
  title: "Limousine & Chauffeur",
  description: "Arrive in style. Black luxury limousines with professional chauffeurs — from hotel to club door.",
  badgeKey: "badgeAffordable"
},
{
  image: jetSkiImg,
  title: "Jet Ski",
  description: "Ride the waves off Barcelona's coast on premium jet skis. Adrenaline, sun & Mediterranean views combined.",
  badgeKey: "badgeWeekly"
},
{
  image: bachelorPartyImg,
  title: "Private & Themed Events",
  description: "We organize tailor-made private events for bachelor groups and companies: themed parties, VIP areas, and custom experiences designed for your group.",
  badgeKey: "badgeExclusive"
},
{
  image: altroImg,
  title: "Altro — Qualsiasi Cosa",
  description: "Tickets, reservations, private transfers, shopping assistance, luxury bags, exclusive events... ANYTHING you need — just ask our team!",
  badgeKey: "badgeAnything",
  highlight: true
}];


const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const getBadge = (key: string): string => {
    return (t.services as Record<string, unknown>)[key] as string || key;
  };

  return (
    <section id="services" className="py-24 md:py-20 bg-[#0c121d] border border-gold-dark">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12">

          <span className="font-body text-xs tracking-[0.3em] uppercase text-silver mb-4 block">
            {t.services.label}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
            {t.services.titleLine1}{" "}
            <span className="italic text-silver-gradient">{t.services.titleLine2}</span>
          </h2>
          <div className="mx-auto silver-line mt-8" />
        </motion.div>

        {/* KEY MESSAGE BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-3xl mx-auto text-center mb-8 border border-silver/30 bg-gradient-to-r from-card/60 via-card/80 to-card/60 px-8 py-7 relative overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-silver/5 to-transparent pointer-events-none" />
          <p className="font-display text-lg md:text-2xl text-foreground leading-relaxed relative z-10">
            🏆{" "}
            <span className="font-semibold tracking-wide">{t.services.vipBannerTitle}</span>{" "}
            <span className="text-silver-gradient font-bold">{t.services.vipBannerSubtitle}</span>
          </p>
          <p className="font-body text-sm text-silver mt-3 leading-relaxed relative z-10">
            {t.services.vipBannerDesc}{" "}
            <span className="font-bold text-silver-gradient">{t.services.vipBannerDiscount}</span>{" "}
            {t.services.vipBannerDiscountLabel}{" "}
            <span className="italic text-silver-gradient">{t.services.vipBannerAnything}</span>{" "}
            {t.services.vipBannerAnythingLabel}
          </p>
        </motion.div>

        {/* About Us Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto text-center mb-16 border border-silver/20 bg-card/40 px-8 py-6">

          <p className="font-body text-sm text-silver leading-relaxed">
            <span className="font-semibold text-foreground">{t.services.aboutText}</span>{" "}
            <span className="font-semibold text-foreground uppercase tracking-wide">
              {t.services.aboutStrength}
            </span>{" "}
            {t.services.aboutYear}{" "}
            <span className="italic text-silver-gradient">{t.services.aboutSeasonal}</span>
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicesDefs.map((service, i) =>
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.07 }}
            className={`group flex flex-col bg-card border overflow-hidden hover:border-silver/40 transition-colors duration-500 ${
            service.highlight ? "border-silver/30" : "border-border"}`
            }>

              <div className="relative overflow-hidden" style={{ height: "260px" }}>
                <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700"
                style={{ transform: "scale(1)", transition: "transform 0.7s ease" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"} />

                <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="font-body text-[10px] tracking-[0.15em] uppercase border px-3 py-1 bg-silver/20 text-silver border-silver/40">
                    {getBadge(service.badgeKey)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-1 p-6 gap-3">
                <h3 className={`font-display text-xl leading-snug ${service.highlight ? "text-silver-gradient" : "text-foreground"}`}>
                  {service.title}
                </h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed flex-1">
                  {service.description}
                </p>
                <div className="silver-line mb-1" />
                <a
                href="#booking"
                className="inline-block mt-1 font-body text-xs tracking-[0.2em] uppercase text-center border border-silver/40 text-silver hover:bg-silver hover:text-background transition-all duration-300 px-5 py-3">

                  {t.services.bookNow}
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

};

export default ServicesSection;