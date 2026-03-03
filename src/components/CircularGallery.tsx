import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import vipTablesImg from "@/assets/services/vip-tables.jpg";
import barcelonaSkylineImg from "@/assets/barcelona-skyline.jpg";
import restaurantImg from "@/assets/restaurant.jpg";
import nightlifeImg from "@/assets/nightlife.jpg";
import diningImg from "@/assets/dining.jpg";

interface GalleryItem {
  id: string;
  titleKey: string;
  subtitleKey: string;
  image: string;
  scrollTarget: string;
}

const galleryItems: GalleryItem[] = [
  { id: "services", titleKey: "ourServices", subtitleKey: "ourServicesDesc", image: vipTablesImg, scrollTarget: "services" },
  { id: "about", titleKey: "aboutUs", subtitleKey: "aboutUsDesc", image: barcelonaSkylineImg, scrollTarget: "about" },
  { id: "booking", titleKey: "planExperience", subtitleKey: "planExperienceDesc", image: restaurantImg, scrollTarget: "booking" },
  { id: "team", titleKey: "ourTeam", subtitleKey: "ourTeamDesc", image: nightlifeImg, scrollTarget: "team" },
  { id: "moments", titleKey: "momentsCrafted", subtitleKey: "momentsCraftedDesc", image: diningImg, scrollTarget: "experiences" },
];

const galleryTexts: Record<string, Record<string, string>> = {
  en: {
    ourServices: "Our Services", ourServicesDesc: "VIP Experiences Barcelona",
    aboutUs: "About Us", aboutUsDesc: "The NightDreams Story",
    planExperience: "Plan Your Experience", planExperienceDesc: "Book VIP Services",
    ourTeam: "Our Team", ourTeamDesc: "Meet Our Promoters",
    momentsCrafted: "Moments Crafted", momentsCraftedDesc: "Real Client Memories",
    explore: "Explore", scrollHint: "Scroll to explore",
  },
  it: {
    ourServices: "I Nostri Servizi", ourServicesDesc: "Esperienze VIP Barcellona",
    aboutUs: "Chi Siamo", aboutUsDesc: "La Storia di NightDreams",
    planExperience: "Pianifica la Tua Esperienza", planExperienceDesc: "Prenota Servizi VIP",
    ourTeam: "Il Nostro Team", ourTeamDesc: "Incontra i Nostri Promoter",
    momentsCrafted: "Momenti Creati", momentsCraftedDesc: "Ricordi dei Clienti",
    explore: "Esplora", scrollHint: "Scorri per esplorare",
  },
  es: {
    ourServices: "Nuestros Servicios", ourServicesDesc: "Experiencias VIP Barcelona",
    aboutUs: "Sobre Nosotros", aboutUsDesc: "La Historia de NightDreams",
    planExperience: "Planifica Tu Experiencia", planExperienceDesc: "Reserva Servicios VIP",
    ourTeam: "Nuestro Equipo", ourTeamDesc: "Conoce a Nuestros Promotores",
    momentsCrafted: "Momentos Creados", momentsCraftedDesc: "Recuerdos de Clientes",
    explore: "Explorar", scrollHint: "Desplázate para explorar",
  },
  fr: {
    ourServices: "Nos Services", ourServicesDesc: "Expériences VIP Barcelone",
    aboutUs: "À Propos", aboutUsDesc: "L'Histoire de NightDreams",
    planExperience: "Planifiez Votre Expérience", planExperienceDesc: "Réservez des Services VIP",
    ourTeam: "Notre Équipe", ourTeamDesc: "Rencontrez Nos Promoteurs",
    momentsCrafted: "Moments Créés", momentsCraftedDesc: "Souvenirs de Clients",
    explore: "Explorer", scrollHint: "Faites défiler pour explorer",
  },
};

const ITEM_COUNT = galleryItems.length;
const ROTATION_PER_ITEM = 360 / ITEM_COUNT;
const SCROLL_HEIGHT_VH = 500;

const CircularGallery = () => {
  const { language } = useLanguage();
  const texts = galleryTexts[language] || galleryTexts.en;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll position within the tall container
  useEffect(() => {
    const onScroll = () => {
      const el = scrollContainerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollableHeight = el.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / scrollableHeight);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeIndex = useMemo(() => {
    const raw = scrollProgress * ITEM_COUNT;
    return Math.min(Math.floor(raw), ITEM_COUNT - 1);
  }, [scrollProgress]);

  // Only rotate through the items (0 to last item angle), not full 360
  const maxRotation = (ITEM_COUNT - 1) * ROTATION_PER_ITEM;
  const rotationAngle = scrollProgress * maxRotation;

  const handleItemClick = (scrollTarget: string) => {
    document.getElementById(scrollTarget)?.scrollIntoView({ behavior: "smooth" });
  };

  const currentItem = galleryItems[activeIndex];

  return (
    <div
      ref={scrollContainerRef}
      id="gallery"
      style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
      className="relative"
    >
      {/* Sticky viewport */}
      <div
        className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: "hsl(0, 0%, 3%)" }}
      >
        {/* Background image crossfade */}
        <AnimatePresence mode="sync">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center will-change-[opacity]"
            style={{
              backgroundImage: `url(${currentItem.image})`,
              filter: "blur(2px)",
            }}
          />
        </AnimatePresence>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, hsla(0,0%,0%,0.3) 0%, hsla(0,0%,0%,0.8) 60%, hsl(0,0%,0%) 100%)",
          }}
        />

        {/* 3D Carousel */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
          <div
            className="relative mx-auto"
            style={{ perspective: "1400px", height: "440px" }}
          >
            <div
              className="absolute inset-0 will-change-transform"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${-rotationAngle}deg)`,
                transition: "transform 0.1s linear",
              }}
            >
              {galleryItems.map((item, index) => {
                const angle = index * ROTATION_PER_ITEM;
                const radius = typeof window !== "undefined" && window.innerWidth < 768 ? 260 : 420;
                const cardW = typeof window !== "undefined" && window.innerWidth < 768 ? 200 : 300;
                const cardH = typeof window !== "undefined" && window.innerWidth < 768 ? 280 : 400;
                return (
                  <div
                    key={item.id}
                    className="absolute top-1/2 left-1/2 cursor-pointer group"
                    style={{
                      width: `${cardW}px`,
                      height: `${cardH}px`,
                      marginLeft: `${-cardW / 2}px`,
                      marginTop: `${-cardH / 2}px`,
                      transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                      transformStyle: "preserve-3d",
                    }}
                    onClick={() => handleItemClick(item.scrollTarget)}
                  >
                    <div
                      className="w-full h-full overflow-hidden border border-border/20 hover:border-silver/40 transition-all duration-500"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <img
                        src={item.image}
                        alt={texts[item.titleKey]}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: "linear-gradient(to top, hsl(0,0%,0%) 0%, hsla(0,0%,0%,0.5) 40%, transparent 100%)",
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                        <h3 className="font-display text-lg md:text-2xl text-foreground mb-1 leading-tight">
                          {texts[item.titleKey]}
                        </h3>
                        <p
                          className="font-body text-[9px] md:text-[11px] tracking-[0.2em] uppercase"
                          style={{ color: "hsl(0, 0%, 55%)" }}
                        >
                          {texts[item.subtitleKey]}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Center info panel */}
          <div className="text-center mt-6 md:mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="space-y-3"
              >
                <h2 className="font-display text-2xl md:text-4xl lg:text-5xl text-foreground">
                  {texts[currentItem.titleKey]}
                </h2>
                <p
                  className="font-body text-[10px] md:text-xs tracking-[0.25em] uppercase"
                  style={{ color: "hsl(0, 0%, 50%)" }}
                >
                  {texts[currentItem.subtitleKey]}
                </p>
                <button
                  onClick={() => handleItemClick(currentItem.scrollTarget)}
                  className="mt-2 border border-silver/40 px-8 py-3 font-body text-xs tracking-[0.2em] uppercase text-silver hover:bg-silver hover:text-background transition-all duration-300"
                >
                  {texts.explore} →
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2.5 mt-6 md:mt-8">
            {galleryItems.map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: i === activeIndex ? "24px" : "6px",
                  backgroundColor: i === activeIndex ? "hsl(0, 0%, 75%)" : "hsl(0, 0%, 22%)",
                }}
              />
            ))}
          </div>

          {/* Scroll hint at bottom */}
          <motion.div
            animate={{ opacity: scrollProgress < 0.05 ? 1 : 0 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="font-body text-[10px] tracking-[0.3em] uppercase" style={{ color: "hsl(0, 0%, 40%)" }}>
              {texts.scrollHint}
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-6"
              style={{ background: "linear-gradient(to bottom, hsl(0, 0%, 40%), transparent)" }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CircularGallery;
