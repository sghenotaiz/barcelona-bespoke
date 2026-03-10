import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

// Event highlight cards data
const eventHighlights = [
  {
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=800&fit=crop",
    titleKey: "event1Title" as const,
    dateKey: "event1Date" as const,
    statsKey: "event1Stats" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=600&h=800&fit=crop",
    titleKey: "event2Title" as const,
    dateKey: "event2Date" as const,
    statsKey: "event2Stats" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&h=800&fit=crop",
    titleKey: "event3Title" as const,
    dateKey: "event3Date" as const,
    statsKey: "event3Stats" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=800&fit=crop",
    titleKey: "event4Title" as const,
    dateKey: "event4Date" as const,
    statsKey: "event4Stats" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=800&fit=crop",
    titleKey: "event5Title" as const,
    dateKey: "event5Date" as const,
    statsKey: "event5Stats" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=800&fit=crop",
    titleKey: "event6Title" as const,
    dateKey: "event6Date" as const,
    statsKey: "event6Stats" as const,
  },
];

// Client review cards data
const clientReviews = [
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    nameKey: "review1Name" as const,
    cityKey: "review1City" as const,
    quoteKey: "review1Quote" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    nameKey: "review2Name" as const,
    cityKey: "review2City" as const,
    quoteKey: "review2Quote" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    nameKey: "review3Name" as const,
    cityKey: "review3City" as const,
    quoteKey: "review3Quote" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    nameKey: "review4Name" as const,
    cityKey: "review4City" as const,
    quoteKey: "review4Quote" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    nameKey: "review5Name" as const,
    cityKey: "review5City" as const,
    quoteKey: "review5Quote" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    nameKey: "review6Name" as const,
    cityKey: "review6City" as const,
    quoteKey: "review6Quote" as const,
  },
];

const EventCard = ({ item, index, inView, getText }: { item: typeof eventHighlights[0]; index: number; inView: boolean; getText: (key: string) => string }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.15 * index, ease: [0.16, 1, 0.3, 1] }}
      className="relative group overflow-hidden border border-border aspect-[3/4] cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={item.image}
        alt={getText(item.titleKey)}
        className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? "scale-110" : "scale-100"}`}
        loading="lazy"
      />
      {/* Glassmorphism overlay */}
      <div className={`absolute inset-0 transition-all duration-500 ${hovered ? "bg-black/70 backdrop-blur-[2px]" : "bg-gradient-to-t from-black/80 via-black/20 to-transparent"}`} />
      
      {/* Always visible title */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <h4
          className="font-display text-lg md:text-xl text-foreground mb-1 tracking-wide"
          style={{ fontFamily: "'Aldo the Apache', sans-serif", textShadow: "0 0 15px hsla(0,0%,80%,0.3)" }}
        >
          {getText(item.titleKey)}
        </h4>
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-body text-xs text-silver tracking-widest uppercase mb-1">{getText(item.dateKey)}</p>
          <p className="font-body text-xs text-muted-foreground">{getText(item.statsKey)}</p>
        </motion.div>
      </div>

      {/* CTA on hover */}
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 15 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="absolute top-4 right-4 z-10"
      >
        <a
          href="https://wa.me/34684483977"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-silver/90 text-background px-4 py-2 font-body text-[10px] tracking-[0.15em] uppercase hover:bg-silver transition-colors"
        >
          {getText("cardCta")}
          <ArrowRight size={12} />
        </a>
      </motion.div>
    </motion.div>
  );
};

const ReviewCard = ({ item, index, inView, getText }: { item: typeof clientReviews[0]; index: number; inView: boolean; getText: (key: string) => string }) => (
  <motion.div
    initial={{ opacity: 0, x: 60 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.8, delay: 0.15 * index, ease: [0.16, 1, 0.3, 1] }}
    className="relative overflow-hidden border border-border bg-white/[0.03] backdrop-blur-sm group hover:border-silver/40 transition-all duration-500"
  >
    <div className="flex items-start gap-4 p-5">
      <img
        src={item.image}
        alt={getText(item.nameKey)}
        className="w-14 h-14 rounded-full object-cover border border-silver/20 flex-shrink-0 group-hover:border-silver/50 transition-colors"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <div className="flex gap-0.5 mb-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12} className="fill-silver text-silver" />
          ))}
        </div>
        <p className="font-body text-sm text-foreground/90 italic leading-relaxed mb-2">
          "{getText(item.quoteKey)}"
        </p>
        <div className="flex items-center gap-2">
          <span className="font-display text-sm text-foreground">{getText(item.nameKey)}</span>
          <span className="font-body text-[10px] text-muted-foreground tracking-widest uppercase">{getText(item.cityKey)}</span>
        </div>
      </div>
    </div>
    {/* Subtle CTA */}
    <a
      href="https://wa.me/34684483977"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 border-t border-border py-3 font-body text-[10px] tracking-[0.15em] uppercase text-silver hover:bg-silver/5 transition-colors"
    >
      {getText("cardCta")}
      <ArrowRight size={11} />
    </a>
  </motion.div>
);

const ExperiencesContent = () => {
  const ref = useRef(null);
  const ctaRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-50px" });
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const exp = t.experiences as Record<string, unknown>;
  const getText = (key: string): string => (exp[key] as string) || key;

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="bg-background py-24 md:py-28">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-silver mb-4 block">
            {getText("label")}
          </span>
          <h2
            className="text-4xl md:text-5xl font-light text-foreground animate-neon-pulse"
            style={{ fontFamily: "'Aldo the Apache', sans-serif", textShadow: "0 0 20px hsla(0,0%,80%,0.3)" }}
          >
            {getText("titleLine1")}{" "}
            <span className="italic text-silver-gradient">{getText("titleLine2")}</span>
          </h2>
          <div className="mx-auto silver-line mt-8" />
          <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-3xl mx-auto mt-6">
            {getText("description")}
          </p>
        </motion.div>

        {/* Two-column layout: desktop side by side, mobile stacked */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Column 1: Event Highlights */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl tracking-wider uppercase text-center mb-8"
              style={{ fontFamily: "'Aldo the Apache', sans-serif", textShadow: "0 0 15px hsla(0,0%,80%,0.3)" }}
            >
              <span className="text-silver-gradient">{getText("eventsColumnTitle")}</span>
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              {eventHighlights.map((item, i) => (
                <EventCard key={i} item={item} index={i} inView={inView} getText={getText} />
              ))}
            </div>
          </div>

          {/* Column 2: Client Reviews */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-xl tracking-wider uppercase text-center mb-8"
              style={{ fontFamily: "'Aldo the Apache', sans-serif", textShadow: "0 0 15px hsla(0,0%,80%,0.3)" }}
            >
              <span className="text-silver-gradient">{getText("reviewsColumnTitle")}</span>
            </motion.h3>

            {/* Desktop: vertical stack */}
            <div className="hidden md:flex flex-col gap-4">
              {clientReviews.map((item, i) => (
                <ReviewCard key={i} item={item} index={i} inView={inView} getText={getText} />
              ))}
            </div>

            {/* Mobile: horizontal swipe carousel */}
            <div className="md:hidden relative">
              {canScrollLeft && (
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-background/80 backdrop-blur-sm border border-border text-foreground hover:text-silver transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              {canScrollRight && (
                <button
                  onClick={() => scroll("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-background/80 backdrop-blur-sm border border-border text-foreground hover:text-silver transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              )}
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 px-1"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {clientReviews.map((item, i) => (
                  <div key={i} className="flex-shrink-0 w-[85vw] max-w-[340px] snap-center">
                    <ReviewCard item={item} index={i} inView={inView} getText={getText} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 40 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 text-center"
        >
          <h3
            className="text-3xl md:text-4xl lg:text-5xl tracking-wider uppercase mb-8 animate-neon-pulse"
            style={{
              fontFamily: "'Aldo the Apache', sans-serif",
              textShadow: "0 0 30px hsla(0,0%,80%,0.4), 0 0 80px hsla(0,0%,75%,0.15)",
            }}
          >
            <span className="text-silver-gradient">{getText("finalCtaTitle")}</span>
          </h3>
          <a
            href="https://wa.me/34684483977"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-silver px-12 py-5 font-body text-sm tracking-[0.2em] uppercase text-background hover:bg-silver-dark transition-all duration-300 hover:shadow-[0_0_40px_hsla(0,0%,75%,0.3)]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {getText("finalCtaButton")}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperiencesContent;
