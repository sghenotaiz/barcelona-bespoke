import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  path: string;
}

const galleryItems: GalleryItem[] = [
{ id: "services", titleKey: "ourServices", subtitleKey: "ourServicesDesc", image: vipTablesImg, path: "/services" },
{ id: "about", titleKey: "aboutUs", subtitleKey: "aboutUsDesc", image: barcelonaSkylineImg, path: "/about" },
{ id: "plan", titleKey: "planExperience", subtitleKey: "planExperienceDesc", image: restaurantImg, path: "/plan" },
{ id: "team", titleKey: "ourTeam", subtitleKey: "ourTeamDesc", image: nightlifeImg, path: "/about" },
{ id: "moments", titleKey: "momentsCrafted", subtitleKey: "momentsCraftedDesc", image: diningImg, path: "/moments" }];


const galleryTexts: Record<string, Record<string, string>> = {
  en: {
    ourServices: "Our Services", ourServicesDesc: "VIP Experiences Barcelona",
    aboutUs: "About Us", aboutUsDesc: "The NightDreams Story",
    planExperience: "Plan Your Experience", planExperienceDesc: "Book VIP Services",
    ourTeam: "Our Team", ourTeamDesc: "Meet Our Promoters",
    momentsCrafted: "Moments Crafted", momentsCraftedDesc: "Real Client Memories",
    explore: "Explore"
  },
  it: {
    ourServices: "I Nostri Servizi", ourServicesDesc: "Tutto ciò di cui hai bisogno per una vacanza indimenticabile",
    aboutUs: "Chi Siamo", aboutUsDesc: "La Storia di NightDreams",
    planExperience: "Pianifica la Tua Esperienza", planExperienceDesc: "Contattaci per un preventivo",
    ourTeam: "Il Nostro Team", ourTeamDesc: "I Nostri promoter e partner",
    momentsCrafted: "Highlights eventi", momentsCraftedDesc: "Ricordi dei Clienti",
    explore: "Esplora"
  },
  es: {
    ourServices: "Nuestros Servicios", ourServicesDesc: "Experiencias VIP Barcelona",
    aboutUs: "Sobre Nosotros", aboutUsDesc: "La Historia de NightDreams",
    planExperience: "Planifica Tu Experiencia", planExperienceDesc: "Reserva Servicios VIP",
    ourTeam: "Nuestro Equipo", ourTeamDesc: "Conoce a Nuestros Promotores",
    momentsCrafted: "Momentos Creados", momentsCraftedDesc: "Recuerdos de Clientes",
    explore: "Explorar"
  },
  fr: {
    ourServices: "Nos Services", ourServicesDesc: "Expériences VIP Barcelone",
    aboutUs: "À Propos", aboutUsDesc: "L'Histoire de NightDreams",
    planExperience: "Planifiez Votre Expérience", planExperienceDesc: "Réservez des Services VIP",
    ourTeam: "Notre Équipe", ourTeamDesc: "Rencontrez Nos Promoteurs",
    momentsCrafted: "Moments Créés", momentsCraftedDesc: "Souvenirs de Clients",
    explore: "Explorer"
  }
};

const ITEM_COUNT = galleryItems.length;
const ROTATION_PER_ITEM = 360 / ITEM_COUNT;

const CircularGallery = () => {
  const { language } = useLanguage();
  const texts = galleryTexts[language] || galleryTexts.en;
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const rotationAngle = activeIndex * ROTATION_PER_ITEM;

  const goNext = () => setActiveIndex((i) => (i + 1) % ITEM_COUNT);
  const goPrev = () => setActiveIndex((i) => (i - 1 + ITEM_COUNT) % ITEM_COUNT);

  const handleItemClick = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentItem = galleryItems[activeIndex];

  // Swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    const startX = e.touches[0].clientX;
    const el = e.currentTarget;
    const handleTouchEnd = (ev: TouchEvent) => {
      const diff = startX - ev.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? goNext() : goPrev();
      }
      el.removeEventListener("touchend", handleTouchEnd);
    };
    el.addEventListener("touchend", handleTouchEnd);
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const radius = isMobile ? 220 : 360;
  const cardW = isMobile ? 160 : 240;
  const cardH = isMobile ? 220 : 310;

  return (
    <div id="gallery" className="relative" onTouchStart={handleTouchStart}>
      <div
        className="w-full min-h-screen overflow-hidden flex items-center justify-center relative pt-20"
        style={{ backgroundColor: "hsl(0, 0%, 3%)" }}>
        
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
              filter: "blur(2px)"
            }} />
          
        </AnimatePresence>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
            "radial-gradient(ellipse at center, hsla(0,0%,0%,0.3) 0%, hsla(0,0%,0%,0.8) 60%, hsl(0,0%,0%) 100%)"
          }} />
        

        {/* Left Arrow */}
        <button
          onClick={goPrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border border-border/40 text-foreground/70 hover:text-silver hover:border-silver/60 transition-all duration-300 bg-background/20 backdrop-blur-sm"
          aria-label="Previous">
          
          <ChevronLeft size={28} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={goNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border border-border/40 text-foreground/70 hover:text-silver hover:border-silver/60 transition-all duration-300 bg-background/20 backdrop-blur-sm"
          aria-label="Next">
          
          <ChevronRight size={28} />
        </button>

        {/* 3D Carousel */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-16 md:px-24">
        <div
            className="relative mx-auto"
            style={{ perspective: "1400px", height: isMobile ? "280px" : "360px" }}>
            
            <motion.div
              className="absolute inset-0 will-change-transform my-0 py-0"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: -rotationAngle }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}>
              
              {galleryItems.map((item, index) => {
                const angle = index * ROTATION_PER_ITEM;
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
                      transformStyle: "preserve-3d"
                    }}
                    onClick={() => handleItemClick(item.path)}>
                    
                    <div
                      className="w-full h-full overflow-hidden border border-border/20 hover:border-silver/40 transition-all duration-500"
                      style={{ backfaceVisibility: "hidden" }}>
                      
                      <img
                        src={item.image}
                        alt={texts[item.titleKey]}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy" />
                      
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                          "linear-gradient(to top, hsl(0,0%,0%) 0%, hsla(0,0%,0%,0.5) 40%, transparent 100%)"
                        }} />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                      <h3 className="font-display text-sm md:text-lg text-foreground mb-0.5 leading-snug">
                          {texts[item.titleKey]}
                        </h3>
                        <p
                          className="font-body text-[8px] md:text-[10px] tracking-[0.15em] uppercase"
                          style={{ color: "hsl(0, 0%, 55%)" }}>
                          
                          {texts[item.subtitleKey]}
                        </p>
                      </div>
                    </div>
                  </div>);

              })}
            </motion.div>
          </div>

          {/* Center info panel */}
          <div className="text-center mt-4 md:mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="space-y-3">
                
                <h2 className="font-display text-2xl md:text-4xl lg:text-5xl text-foreground">
                  {texts[currentItem.titleKey]}
                </h2>
                <p
                  className="font-body text-[10px] md:text-xs tracking-[0.25em] uppercase"
                  style={{ color: "hsl(0, 0%, 50%)" }}>
                  
                  {texts[currentItem.subtitleKey]}
                </p>
                <button
                  onClick={() => handleItemClick(currentItem.path)}
                  className="mt-2 border border-silver/40 px-8 py-3 font-body text-xs tracking-[0.2em] uppercase text-silver hover:bg-silver hover:text-background transition-all duration-300">
                  
                  {texts.explore} →
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2.5 mt-6 md:mt-8">
            {galleryItems.map((_, i) =>
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: i === activeIndex ? "24px" : "6px",
                backgroundColor:
                i === activeIndex ?
                "hsl(0, 0%, 75%)" :
                "hsl(0, 0%, 22%)"
              }} />

            )}
          </div>
        </div>
      </div>
    </div>);

};

export default CircularGallery;