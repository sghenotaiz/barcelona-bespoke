import { useState, useEffect, useCallback, useRef } from "react";
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
  {
    id: "services",
    titleKey: "ourServices",
    subtitleKey: "ourServicesDesc",
    image: vipTablesImg,
    scrollTarget: "services",
  },
  {
    id: "about",
    titleKey: "aboutUs",
    subtitleKey: "aboutUsDesc",
    image: barcelonaSkylineImg,
    scrollTarget: "about",
  },
  {
    id: "booking",
    titleKey: "planExperience",
    subtitleKey: "planExperienceDesc",
    image: restaurantImg,
    scrollTarget: "booking",
  },
  {
    id: "team",
    titleKey: "ourTeam",
    subtitleKey: "ourTeamDesc",
    image: nightlifeImg,
    scrollTarget: "team",
  },
  {
    id: "moments",
    titleKey: "momentsCrafted",
    subtitleKey: "momentsCraftedDesc",
    image: diningImg,
    scrollTarget: "experiences",
  },
];

const galleryTexts: Record<string, Record<string, string>> = {
  en: {
    ourServices: "Our Services",
    ourServicesDesc: "VIP Experiences Barcelona",
    aboutUs: "About Us",
    aboutUsDesc: "The NightDreams Story",
    planExperience: "Plan Your Experience",
    planExperienceDesc: "Book VIP Services",
    ourTeam: "Our Team",
    ourTeamDesc: "Meet Our Promoters",
    momentsCrafted: "Moments Crafted",
    momentsCraftedDesc: "Real Client Memories",
    explore: "Explore",
  },
  it: {
    ourServices: "I Nostri Servizi",
    ourServicesDesc: "Esperienze VIP Barcellona",
    aboutUs: "Chi Siamo",
    aboutUsDesc: "La Storia di NightDreams",
    planExperience: "Pianifica la Tua Esperienza",
    planExperienceDesc: "Prenota Servizi VIP",
    ourTeam: "Il Nostro Team",
    ourTeamDesc: "Incontra i Nostri Promoter",
    momentsCrafted: "Momenti Creati",
    momentsCraftedDesc: "Ricordi dei Clienti",
    explore: "Esplora",
  },
  es: {
    ourServices: "Nuestros Servicios",
    ourServicesDesc: "Experiencias VIP Barcelona",
    aboutUs: "Sobre Nosotros",
    aboutUsDesc: "La Historia de NightDreams",
    planExperience: "Planifica Tu Experiencia",
    planExperienceDesc: "Reserva Servicios VIP",
    ourTeam: "Nuestro Equipo",
    ourTeamDesc: "Conoce a Nuestros Promotores",
    momentsCrafted: "Momentos Creados",
    momentsCraftedDesc: "Recuerdos de Clientes",
    explore: "Explorar",
  },
  fr: {
    ourServices: "Nos Services",
    ourServicesDesc: "Expériences VIP Barcelone",
    aboutUs: "À Propos",
    aboutUsDesc: "L'Histoire de NightDreams",
    planExperience: "Planifiez Votre Expérience",
    planExperienceDesc: "Réservez des Services VIP",
    ourTeam: "Notre Équipe",
    ourTeamDesc: "Rencontrez Nos Promoteurs",
    momentsCrafted: "Moments Créés",
    momentsCraftedDesc: "Souvenirs de Clients",
    explore: "Explorer",
  },
};

const ITEM_COUNT = galleryItems.length;
const ROTATION_PER_ITEM = 360 / ITEM_COUNT;

const CircularGallery = () => {
  const { language } = useLanguage();
  const texts = galleryTexts[language] || galleryTexts.en;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoRotateTimer = useRef<ReturnType<typeof setTimeout>>();

  const rotate = useCallback(
    (direction: number) => {
      setActiveIndex((prev) => (prev + direction + ITEM_COUNT) % ITEM_COUNT);
      setIsAutoRotating(false);
      clearTimeout(autoRotateTimer.current);
      autoRotateTimer.current = setTimeout(() => setIsAutoRotating(true), 5000);
    },
    []
  );

  // Auto-rotate
  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ITEM_COUNT);
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  // Mouse wheel
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let cooldown = false;
    const onWheel = (e: WheelEvent) => {
      if (cooldown) return;
      cooldown = true;
      setTimeout(() => (cooldown = false), 600);
      rotate(e.deltaY > 0 ? 1 : -1);
    };
    el.addEventListener("wheel", onWheel, { passive: true });
    return () => el.removeEventListener("wheel", onWheel);
  }, [rotate]);

  // Touch swipe
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = 0;
    const onStart = (e: TouchEvent) => (startX = e.touches[0].clientX);
    const onEnd = (e: TouchEvent) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 50) rotate(diff < 0 ? 1 : -1);
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
    };
  }, [rotate]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") rotate(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") rotate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [rotate]);

  const handleClick = (scrollTarget: string) => {
    document
      .getElementById(scrollTarget)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const currentItem = galleryItems[activeIndex];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "hsl(0, 0%, 4%)" }}
    >
      {/* Background image crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentItem.image})` }}
        />
      </AnimatePresence>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, hsla(0,0%,0%,0.4) 0%, hsla(0,0%,0%,0.85) 70%, hsl(0,0%,0%) 100%)",
        }}
      />

      {/* 3D Carousel */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <div
          className="relative mx-auto"
          style={{
            perspective: "1200px",
            height: "420px",
          }}
        >
          <motion.div
            animate={{ rotateY: -activeIndex * ROTATION_PER_ITEM }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {galleryItems.map((item, index) => {
              const angle = index * ROTATION_PER_ITEM;
              const radius = 380;
              return (
                <div
                  key={item.id}
                  className="absolute top-1/2 left-1/2 cursor-pointer group"
                  style={{
                    width: "280px",
                    height: "380px",
                    marginLeft: "-140px",
                    marginTop: "-190px",
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    transformStyle: "preserve-3d",
                  }}
                  onClick={() => {
                    if (index === activeIndex) {
                      handleClick(item.scrollTarget);
                    } else {
                      setActiveIndex(index);
                      setIsAutoRotating(false);
                      clearTimeout(autoRotateTimer.current);
                      autoRotateTimer.current = setTimeout(
                        () => setIsAutoRotating(true),
                        5000
                      );
                    }
                  }}
                >
                  <div
                    className="w-full h-full overflow-hidden border border-border/30 transition-all duration-500"
                    style={{
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={texts[item.titleKey]}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, hsl(0,0%,0%) 0%, hsla(0,0%,0%,0.4) 50%, transparent 100%)",
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3
                        className="font-display text-xl text-foreground mb-1"
                      >
                        {texts[item.titleKey]}
                      </h3>
                      <p
                        className="font-body text-[10px] tracking-[0.2em] uppercase"
                        style={{ color: "hsl(0, 0%, 60%)" }}
                      >
                        {texts[item.subtitleKey]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Center info panel */}
        <div className="text-center mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-2">
                {texts[currentItem.titleKey]}
              </h2>
              <p
                className="font-body text-xs tracking-[0.25em] uppercase mb-6"
                style={{ color: "hsl(0, 0%, 55%)" }}
              >
                {texts[currentItem.subtitleKey]}
              </p>
              <button
                onClick={() => handleClick(currentItem.scrollTarget)}
                className="border border-silver/40 px-8 py-3 font-body text-xs tracking-[0.2em] uppercase text-silver hover:bg-silver hover:text-background transition-all duration-300"
              >
                {texts.explore} →
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {galleryItems.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveIndex(i);
                setIsAutoRotating(false);
                clearTimeout(autoRotateTimer.current);
                autoRotateTimer.current = setTimeout(
                  () => setIsAutoRotating(true),
                  5000
                );
              }}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  i === activeIndex
                    ? "hsl(0, 0%, 75%)"
                    : "hsl(0, 0%, 25%)",
              }}
            />
          ))}
        </div>

        {/* Nav arrows */}
        <button
          onClick={() => rotate(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-border/30 text-muted-foreground hover:text-foreground hover:border-silver/40 transition-all duration-300"
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          onClick={() => rotate(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-border/30 text-muted-foreground hover:text-foreground hover:border-silver/40 transition-all duration-300"
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default CircularGallery;
