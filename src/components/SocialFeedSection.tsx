import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Instagram, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type SocialCard = {
  id: number;
  type: "instagram" | "tiktok";
  embedUrl?: string;
  thumbnailUrl?: string;
  linkUrl?: string;
};

const TikTokIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.16z" />
  </svg>
);

const cards: SocialCard[] = [
  {
    id: 1,
    type: "instagram",
    embedUrl: "https://www.instagram.com/reel/CUdBDCwI8Cn/embed",
  },
  {
    id: 2,
    type: "tiktok",
    // No link provided — placeholder
  },
  {
    id: 3,
    type: "instagram",
    embedUrl: "https://www.instagram.com/p/DMSgCwjozdz/embed",
  },
  {
    id: 4,
    type: "tiktok",
  },
  {
    id: 5,
    type: "tiktok",
  },
  {
    id: 6,
    type: "tiktok",
  },
];

const PlaceholderCard = () => (
  <div className="w-full h-full flex items-center justify-center bg-black/60">
    <X className="w-16 h-16 text-white/20" strokeWidth={1} />
  </div>
);

const SocialCard = ({ card }: { card: SocialCard }) => {
  const hasContent = !!card.embedUrl || !!card.thumbnailUrl;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="relative w-[300px] h-[400px] flex-shrink-0 rounded-sm overflow-hidden border border-white/10 bg-black/20 backdrop-blur-sm group hover:border-silver/40 hover:shadow-[0_0_25px_rgba(192,192,192,0.15)] transition-all duration-500"
    >
      {/* Badge */}
      <div className="absolute top-3 left-3 z-20">
        <span className="inline-flex items-center gap-1 px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-body bg-black/60 backdrop-blur-md border border-white/15 text-white/80 rounded-full">
          {card.type === "instagram" ? (
            <>
              <Instagram size={12} /> IG
            </>
          ) : (
            <>
              <TikTokIcon size={12} /> TT
            </>
          )}
        </span>
      </div>

      {/* Content */}
      {card.type === "instagram" && card.embedUrl ? (
        <iframe
          src={card.embedUrl}
          width="300"
          height="400"
          frameBorder="0"
          scrolling="no"
          allowTransparency
          className="w-full h-full"
          loading="lazy"
        />
      ) : card.type === "tiktok" && card.linkUrl && card.thumbnailUrl ? (
        <a
          href={card.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full relative"
        >
          <img
            src={card.thumbnailUrl}
            alt="TikTok video"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-lg">▶️ Guarda Reel</span>
          </div>
        </a>
      ) : (
        <PlaceholderCard />
      )}

      {/* Bottom link button */}
      {hasContent && (
        <div className="absolute bottom-0 inset-x-0 z-20 p-3 bg-gradient-to-t from-black/80 to-transparent">
          <a
            href={card.embedUrl?.replace("/embed", "/") || card.linkUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center font-body text-[10px] tracking-[0.2em] uppercase text-silver border border-silver/30 py-2 px-4 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
          >
            Vedi Post Completo
          </a>
        </div>
      )}
    </motion.div>
  );
};

const SocialFeedSection = () => {
  const sectionRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);

  const totalCards = cards.length;
  const cardWidth = isMobile ? 280 : 300;
  const gap = 24;

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!scrollRef.current) return;
      const clamped = Math.max(0, Math.min(index, totalCards - 1));
      scrollRef.current.scrollTo({
        left: clamped * (cardWidth + gap),
        behavior: "smooth",
      });
      setActiveIndex(clamped);
    },
    [cardWidth, gap, totalCards]
  );

  // Auto-scroll
  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % totalCards;
        scrollToIndex(next);
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [inView, totalCards, scrollToIndex]);

  // Track scroll position for dots
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const idx = Math.round(el.scrollLeft / (cardWidth + gap));
      setActiveIndex(idx);
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [cardWidth, gap]);

  return (
    <section ref={sectionRef} className="bg-black py-20 lg:py-28 overflow-hidden">
      {/* Section Header — same style as TeamSection */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-14 px-6"
      >
        <span className="font-body text-xs tracking-[0.3em] uppercase text-silver mb-4 block">
          Social
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-light text-foreground animate-neon-pulse">
          Le Ultime dai Nostri{" "}
          <span className="italic text-silver-gradient">Social</span>
        </h2>
        <div className="mx-auto silver-line mt-8" />
      </motion.div>

      {/* Carousel */}
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Arrows (desktop) */}
        {!isMobile && (
          <>
            <button
              onClick={() => scrollToIndex(activeIndex - 1)}
              className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center border border-white/10 bg-black/60 backdrop-blur-sm text-silver hover:border-silver/40 hover:text-white transition-all duration-300"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollToIndex(activeIndex + 1)}
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center border border-white/10 bg-black/60 backdrop-blur-sm text-silver hover:border-silver/40 hover:text-white transition-all duration-300"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Scrollable track */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
        >
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {cards.map((card) => (
              <div key={card.id} className="snap-start">
                <SocialCard card={card} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "bg-silver w-6"
                  : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialFeedSection;
