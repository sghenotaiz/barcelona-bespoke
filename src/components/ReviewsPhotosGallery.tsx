import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

// ── Placeholder images — replace these paths with real screenshots/photos ──
const whatsappScreenshots = [
  "/images/whatsapp-review-1.jpg",
  "/images/whatsapp-review-2.jpg",
  "/images/whatsapp-review-3.jpg",
  "/images/whatsapp-review-4.jpg",
];

const clientPhotos = [
  "/images/client-photo-1.jpg",
  "/images/client-photo-2.jpg",
  "/images/client-photo-3.jpg",
  "/images/client-photo-4.jpg",
];

// ── Translations ──
const galleryTexts: Record<string, Record<string, string>> = {
  it: {
    sectionTitle: "RECENSIONI CLIENTI E FOTO",
    whatsappTitle: "Recensioni Clienti",
    whatsappSub: "Screenshot reali",
    photosTitle: "Le Nostre Foto",
    photosSub: "Momenti VIP",
    close: "Chiudi",
  },
  en: {
    sectionTitle: "CLIENT REVIEWS & PHOTOS",
    whatsappTitle: "Client Reviews",
    whatsappSub: "Real screenshots",
    photosTitle: "Our Photos",
    photosSub: "VIP Moments",
    close: "Close",
  },
  es: {
    sectionTitle: "RESEÑAS Y FOTOS",
    whatsappTitle: "Reseñas de Clientes",
    whatsappSub: "Capturas reales",
    photosTitle: "Nuestras Fotos",
    photosSub: "Momentos VIP",
    close: "Cerrar",
  },
  fr: {
    sectionTitle: "AVIS CLIENTS ET PHOTOS",
    whatsappTitle: "Avis Clients",
    whatsappSub: "Captures réelles",
    photosTitle: "Nos Photos",
    photosSub: "Moments VIP",
    close: "Fermer",
  },
};

// ── Fullscreen Image Modal with prev/next navigation ──
const ImageModal = ({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full max-w-3xl max-h-[90vh] mx-4"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute -top-12 right-0 z-10 w-10 h-10 flex items-center justify-center text-foreground hover:text-silver transition-colors"
      >
        <X size={24} />
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={onPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/60 border border-border/40 text-foreground hover:text-silver transition-colors"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/60 border border-border/40 text-foreground hover:text-silver transition-colors"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt={`Image ${index + 1}`}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="w-full max-h-[85vh] object-contain"
        />
      </AnimatePresence>

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-body text-xs text-silver tracking-widest">
        {index + 1} / {images.length}
      </div>
    </motion.div>
  </motion.div>
);

// ── Thumbnail Grid ──
const ThumbGrid = ({
  images,
  onOpen,
}: {
  images: string[];
  onOpen: (index: number) => void;
}) => (
  <div className="grid grid-cols-2 gap-3">
    {images.map((src, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="relative aspect-[3/4] overflow-hidden border border-border cursor-pointer group"
        onClick={() => onOpen(i)}
      >
        <img
          src={src}
          alt={`Gallery ${i + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
          <ZoomIn
            size={28}
            className="text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </motion.div>
    ))}
  </div>
);

// ── Main Component ──
const ReviewsPhotosGallery = () => {
  const { language } = useLanguage();
  const texts = galleryTexts[language] || galleryTexts.it;

  const [modal, setModal] = useState<{ images: string[]; index: number } | null>(null);

  const openModal = (images: string[], index: number) => setModal({ images, index });
  const closeModal = () => setModal(null);
  const prevImage = () =>
    setModal((m) => m ? { ...m, index: (m.index - 1 + m.images.length) % m.images.length } : null);
  const nextImage = () =>
    setModal((m) => m ? { ...m, index: (m.index + 1) % m.images.length } : null);

  // Swipe support for modal
  const handleTouchStart = (e: React.TouchEvent) => {
    const startX = e.touches[0].clientX;
    const el = e.currentTarget;
    const handleTouchEnd = (ev: TouchEvent) => {
      const diff = startX - ev.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? nextImage() : prevImage();
      }
      el.removeEventListener("touchend", handleTouchEnd);
    };
    el.addEventListener("touchend", handleTouchEnd);
  };

  return (
    <>
      {/* Section Title */}
      <div className="text-center mt-16 md:mt-24 mb-8 md:mb-12">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-silver-gradient tracking-wider uppercase"
          style={{
            fontFamily: "'Aldo the Apache', sans-serif",
            textShadow: "0 0 20px hsla(0,0%,80%,0.3)",
          }}
        >
          {texts.sectionTitle}
        </h2>
        {/* Gold gradient divider */}
        <div className="mx-auto mt-4 md:mt-6 h-px w-48 md:w-64" style={{
          background: "linear-gradient(90deg, transparent, hsl(40,60%,50%), hsl(45,70%,55%), hsl(40,60%,50%), transparent)"
        }} />
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Column 1: WhatsApp Screenshots */}
        <div>
          <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
            <span className="text-xl">💬</span>
            <h3
              className="text-lg md:text-xl tracking-wider uppercase text-center"
              style={{ fontFamily: "'Aldo the Apache', sans-serif", textShadow: "0 0 15px hsla(0,0%,80%,0.3)" }}
            >
              <span className="text-silver-gradient">{texts.whatsappTitle}</span>
            </h3>
          </div>
          <p className="text-center font-body text-[10px] md:text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 md:mb-6">
            {texts.whatsappSub}
          </p>
          <ThumbGrid images={whatsappScreenshots} onOpen={(i) => openModal(whatsappScreenshots, i)} />
        </div>

        {/* Column 2: Client Photos */}
        <div>
          <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
            <span className="text-xl">📸</span>
            <h3
              className="text-lg md:text-xl tracking-wider uppercase text-center"
              style={{ fontFamily: "'Aldo the Apache', sans-serif", textShadow: "0 0 15px hsla(0,0%,80%,0.3)" }}
            >
              <span className="text-silver-gradient">{texts.photosTitle}</span>
            </h3>
          </div>
          <p className="text-center font-body text-[10px] md:text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 md:mb-6">
            {texts.photosSub}
          </p>
          <ThumbGrid images={clientPhotos} onOpen={(i) => openModal(clientPhotos, i)} />
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <div onTouchStart={handleTouchStart}>
            <ImageModal
              images={modal.images}
              index={modal.index}
              onClose={closeModal}
              onPrev={prevImage}
              onNext={nextImage}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReviewsPhotosGallery;
