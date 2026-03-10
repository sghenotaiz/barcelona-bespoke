import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Wine, Clock, CalendarDays, Waves, UtensilsCrossed, Building2, Car, Ship, PartyPopper, Sparkles, Star, Users, Percent, BedDouble, Plane, Zap, Sun, Eye } from "lucide-react";
import vipTablesImg from "@/assets/services/vip-tables.jpg";
import poolPartyImg from "@/assets/services/pool-party.jpg";
import restaurantImg from "@/assets/services/restaurant.jpg";
import apartmentsImg from "@/assets/services/apartments.jpg";
import limousineImg from "@/assets/services/limousine.jpg";
import jetSkiImg from "@/assets/services/jet-ski.jpg";
import bachelorPartyImg from "@/assets/services/bachelor-party.jpg";

type ServiceBlock = {
  id: string;
  image: string;
  titleKey: string;
  descKey: string;
  bullets: {icon: React.ElementType;key: string;}[];
  badge?: string;
};

const serviceBlocks: ServiceBlock[] = [
{
  id: "nightlife",
  image: vipTablesImg,
  titleKey: "expNightlifeTitle",
  descKey: "expNightlifeDesc",
  badge: "badgeVip",
  bullets: [
  { icon: Wine, key: "expNightlifeBullet1" },
  { icon: Clock, key: "expNightlifeBullet2" },
  { icon: CalendarDays, key: "expNightlifeBullet3" }]

},
{
  id: "pool",
  image: poolPartyImg,
  titleKey: "expPoolTitle",
  descKey: "expPoolDesc",
  badge: "badgeSummer",
  bullets: [
  { icon: Sun, key: "expPoolBullet1" },
  { icon: Waves, key: "expPoolBullet2" }]

},
{
  id: "restaurant",
  image: restaurantImg,
  titleKey: "expRestaurantTitle",
  descKey: "expRestaurantDesc",
  badge: "badgeDiscount",
  bullets: [
  { icon: Percent, key: "expRestaurantBullet1" },
  { icon: UtensilsCrossed, key: "expRestaurantBullet2" }]

},
{
  id: "apartments",
  image: apartmentsImg,
  titleKey: "expApartmentsTitle",
  descKey: "expApartmentsDesc",
  badge: "badgeTopPick",
  bullets: [
  { icon: BedDouble, key: "expApartmentsBullet1" },
  { icon: Building2, key: "expApartmentsBullet2" }]

},
{
  id: "limo",
  image: limousineImg,
  titleKey: "expLimoTitle",
  descKey: "expLimoDesc",
  badge: "badgeVip",
  bullets: [
  { icon: Car, key: "expLimoBullet1" },
  { icon: Plane, key: "expLimoBullet2" }]

},
{
  id: "jetski",
  image: jetSkiImg,
  titleKey: "expJetskiTitle",
  descKey: "expJetskiDesc",
  badge: "badgeSummer",
  bullets: [
  { icon: Zap, key: "expJetskiBullet1" },
  { icon: Eye, key: "expJetskiBullet2" }]

},
{
  id: "events",
  image: bachelorPartyImg,
  titleKey: "expEventsTitle",
  descKey: "expEventsDesc",
  badge: "badgeGroups",
  bullets: [
  { icon: PartyPopper, key: "expEventsBullet1" },
  { icon: Users, key: "expEventsBullet2" },
  { icon: Sparkles, key: "expEventsBullet3" }]

}];


const ServiceBlockItem = ({
  block,
  index,
  getText,
  bookNow





}: {block: ServiceBlock;index: number;getText: (key: string) => string;bookNow: string;}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-0 min-h-[420px] md:min-h-[500px]`}>
        
        {/* Image */}
        <div className="relative w-full md:w-1/2 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-transparent to-background/30 z-10 pointer-events-none" />
          <img
            src={block.image}
            alt={getText(block.titleKey)}
            className="w-full h-[300px] md:h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
          
          {/* Subtle light reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none z-10" />
        </div>

        {/* Text */}
        <div className={`w-full md:w-1/2 flex flex-col justify-center px-8 py-10 md:px-14 md:py-16 relative`}>
          {/* Subtle background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-card/80 via-background to-card/60 pointer-events-none" />
          
          <div className="relative z-10">
            {/* Badge */}
            {block.badge &&
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block font-body text-[10px] tracking-[0.2em] uppercase border border-silver/30 px-4 py-1.5 text-silver bg-silver/5 mb-6">
              
                {getText(block.badge)}
              </motion.span>
            }

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-4 leading-tight">
              
              {getText(block.titleKey)}
            </motion.h3>

            {/* Silver line */}
            <div className="silver-line mb-6" />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="font-body text-sm text-muted-foreground leading-relaxed mb-8 max-w-lg">
              
              {getText(block.descKey)}
            </motion.p>

            {/* Bullet points */}
            <div className="space-y-3 mb-8">
              {block.bullets.map((bullet, bi) => {
                const Icon = bullet.icon;
                return (
                  <motion.div
                    key={bullet.key}
                    initial={{ opacity: 0, x: -15 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + bi * 0.08 }}
                    className="flex items-center gap-3">
                    
                    <div className="flex-shrink-0 w-8 h-8 border border-silver/20 flex items-center justify-center bg-silver/5">
                      <Icon className="w-4 h-4 text-silver" />
                    </div>
                    <span className="font-body text-xs text-silver tracking-wide">
                      {getText(bullet.key)}
                    </span>
                  </motion.div>);

              })}
            </div>

            {/* CTA */}
            <motion.a
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 }}
              href="/plan"
              className="inline-block font-body text-xs tracking-[0.2em] uppercase text-center border border-silver/40 text-silver hover:bg-silver hover:text-background transition-all duration-300 px-8 py-3 w-fit">
              
              {bookNow}
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>);

};

const ServicesSection = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const svc = t.services as Record<string, unknown>;
  const getText = (key: string): string => svc[key] as string || key;

  return (
    <section id="services" className="bg-background">
      {/* Section Header */}
      <div className="py-20 md:py-[50px]" ref={headerRef}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center">
            
            <span className="font-body text-xs tracking-[0.3em] uppercase text-silver mb-4 block">
              {t.services.label}
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-light text-foreground">
              {t.services.titleLine1}{" "}
              <span className="italic text-silver-gradient">{t.services.titleLine2}</span>
            </h2>
            <div className="mx-auto silver-line mt-8" />
          </motion.div>

          {/* VIP Banner */}
          











          
        </div>
      </div>

      {/* Service Blocks — alternating layout */}
      <div className="flex flex-col">
        {serviceBlocks.map((block, i) =>
        <ServiceBlockItem
          key={block.id}
          block={block}
          index={i}
          getText={getText}
          bookNow={t.services.bookNow} />

        )}
      </div>

      {/* "And more" */}
      <div className="py-16">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-body text-sm italic text-silver text-center">
          
          {getText("andMore")}
        </motion.p>
      </div>
    </section>);

};

export default ServicesSection;