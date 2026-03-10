import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import DualCTA from "@/components/DualCTA";
import {
  Wine, Clock, CalendarDays, Waves, UtensilsCrossed,
  Building2, Car, Ship, PartyPopper, Sparkles, Star,
  Users, Percent, BedDouble, Plane, Zap, Sun, Eye,
  Crown, Music, Ticket, ShieldCheck, DollarSign } from
"lucide-react";
import vipTablesImg from "@/assets/services/vip-tables.jpg";
import skipLineImg from "@/assets/services/multi-entry.jpg";
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
  subtitleKey: string;
  descKey: string;
  bullets: {icon: React.ElementType;key: string;}[];
  badge?: string;
};

const serviceBlocks: ServiceBlock[] = [
{
  id: "vip-tables",
  image: vipTablesImg,
  titleKey: "expVipTablesTitle",
  subtitleKey: "expVipTablesSubtitle",
  descKey: "expVipTablesDesc",
  badge: "badgeVip",
  bullets: [
  { icon: Crown, key: "expVipTablesBullet1" },
  { icon: CalendarDays, key: "expVipTablesBullet2" },
  { icon: DollarSign, key: "expVipTablesBullet3" }]
},
{
  id: "skip-line",
  image: skipLineImg,
  titleKey: "expSkipLineTitle",
  subtitleKey: "expSkipLineSubtitle",
  descKey: "expSkipLineDesc",
  badge: "badgeVip",
  bullets: [
  { icon: Ticket, key: "expSkipLineBullet1" },
  { icon: Users, key: "expSkipLineBullet2" },
  { icon: ShieldCheck, key: "expSkipLineBullet3" },
  { icon: DollarSign, key: "expSkipLineBullet4" }]
},
{
  id: "pool",
  image: poolPartyImg,
  titleKey: "expPoolTitle",
  subtitleKey: "expPoolSubtitle",
  descKey: "expPoolDesc",
  badge: "badgeSummer",
  bullets: [
  { icon: Sun, key: "expPoolBullet1" },
  { icon: Music, key: "expPoolBullet2" },
  { icon: Waves, key: "expPoolBullet3" }]

},
{
  id: "restaurant",
  image: restaurantImg,
  titleKey: "expRestaurantTitle",
  subtitleKey: "expRestaurantSubtitle",
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
  subtitleKey: "expApartmentsSubtitle",
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
  subtitleKey: "expLimoSubtitle",
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
  subtitleKey: "expJetskiSubtitle",
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
  subtitleKey: "expEventsSubtitle",
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
  const isMobile = useIsMobile();
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const isEven = index % 2 === 0;

  // Parallax on the image
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  // Odd blocks: image LEFT, text RIGHT. Even blocks: image RIGHT, text LEFT.
  const imageSlideX = isEven ? -100 : 100;
  const textSlideX = isEven ? 100 : -100;
  const easeOutCubic = [0.33, 1, 0.68, 1] as const;

  return (
    <div ref={ref} className="w-full relative overflow-hidden">
      <div
        className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} min-h-[550px] lg:min-h-[650px]`}>
        
        {/* IMAGE — slides from one side */}
        <motion.div
          initial={isMobile ? { opacity: 0, y: 60 } : { opacity: 0, x: imageSlideX }}
          animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 1, ease: easeOutCubic }}
          style={{ willChange: "transform, opacity" }}
          className="relative w-full min-h-[300px] h-[60vh] lg:h-auto lg:min-h-0 lg:w-[55%] overflow-hidden">
          <motion.div style={{ y: imageY }} className="absolute inset-[-16%] w-[100%] h-[132%]">
            <img
              src={block.image}
              alt={getText(block.titleKey)}
              className="w-full h-full object-cover transition-transform duration-[2s] ease-out hover:scale-[1.03]" />
          </motion.div>
          {/* Gradient overlay toward text side (desktop) */}
          <div
            className={`absolute inset-0 z-10 pointer-events-none ${
            isEven ?
            "bg-gradient-to-r from-transparent via-transparent to-black/80" :
            "bg-gradient-to-l from-transparent via-transparent to-black/80"} hidden lg:block`
            } />
          
          {/* Mobile bottom gradient */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent via-black/20 to-black lg:hidden" />
          
          {/* Badge on image */}
          {block.badge &&
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute top-6 left-6 z-20">
              <span className="font-body text-[10px] tracking-[0.25em] uppercase px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white/90">
                {getText(block.badge)}
              </span>
            </motion.div>
          }
        </motion.div>

        {/* TEXT — slides from opposite side */}
        <motion.div
          initial={isMobile ? { opacity: 0, y: -40 } : { opacity: 0, x: textSlideX }}
          animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 1, ease: easeOutCubic, delay: 0.15 }}
          style={{ willChange: "transform, opacity" }}
          className="w-full lg:w-[45%] flex flex-col justify-center px-6 py-8 md:px-12 lg:px-16 lg:py-20 relative bg-black">
          {/* Glassmorphism subtle card overlay */}
          <div className="absolute inset-3 lg:inset-8 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-sm pointer-events-none" />

          <div className="relative z-10">
            {/* Subtitle line */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-body text-[11px] tracking-[0.3em] uppercase text-silver mb-4">
              
              {getText(block.subtitleKey)}
            </motion.p>

            {/* Title — Aldo the Apache style */}
            <motion.h3
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-2xl md:text-5xl lg:text-[3.5rem] font-bold lg:font-light text-foreground mb-4 lg:mb-6 leading-[1.1] tracking-wide"
              style={{ fontFamily: "'Aldo the Apache', sans-serif" }}>
              <span className="text-silver-gradient">{getText(block.titleKey)}</span>
            </motion.h3>

            {/* Glowing line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="origin-left w-20 h-px mb-8"
              style={{
                background: "linear-gradient(90deg, hsl(0 0% 75%), hsl(0 0% 45%), transparent)"
              }} />
            

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="font-body text-sm text-white/70 leading-[1.8] mb-10 max-w-md">
              
              {getText(block.descKey)}
            </motion.p>

            {/* Bullet points */}
            <div className="space-y-4 mb-10">
              {block.bullets.map((bullet, bi) => {
                const Icon = bullet.icon;
                return (
                  <motion.div
                    key={bullet.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + bi * 0.1 }}
                    className="flex items-center gap-4 group/bullet">
                    
                    <div className="flex-shrink-0 w-10 h-10 border border-white/10 flex items-center justify-center bg-white/[0.03] backdrop-blur-sm transition-all duration-300 group-hover/bullet:border-silver/40 group-hover/bullet:bg-white/[0.06]">
                      <Icon className="w-4 h-4 text-silver transition-colors duration-300 group-hover/bullet:text-white" />
                    </div>
                    <span className="font-body text-xs text-white/60 tracking-wide transition-colors duration-300 group-hover/bullet:text-white/80">
                      {getText(bullet.key)}
                    </span>
                  </motion.div>);

              })}
            </div>

            {/* CTA Button — silver border + neon hover, thumb-friendly */}
            <motion.a
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 }}
              href="/plan"
              className="inline-block font-body text-[11px] tracking-[0.25em] uppercase text-center border border-silver/40 text-silver px-10 py-4 min-h-[48px] flex items-center justify-center w-full lg:w-fit transition-all duration-500 hover:bg-white/10 hover:border-white/60 hover:text-white hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              {bookNow}
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Thin separator line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>);

};

const ServicesSection = () => {
  const { t } = useLanguage();

  const svc = t.services as Record<string, unknown>;
  const getText = (key: string): string => svc[key] as string || key;

  return (
    <section id="services" className="bg-black">
      {/* Spacing after video dissolve */}
      <div className="h-[120px]" />
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

      {/* "And more" footer */}
      <div className="py-20">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-body text-sm italic text-silver/50 text-center tracking-wider">
          
          {getText("andMore")}
        </motion.p>
      </div>
    </section>);

};

export default ServicesSection;