import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { z } from "zod";
import DualCTA from "@/components/DualCTA";

// Event highlight cards data
const eventHighlights = [
  {
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=800&fit=crop",
    titleKey: "event1Title" as const,
    dateKey: "event1Date" as const,
    statsKey: "event1Stats" as const,
    videoUrl: "",
  },
  {
    image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=600&h=800&fit=crop",
    titleKey: "event2Title" as const,
    dateKey: "event2Date" as const,
    statsKey: "event2Stats" as const,
    videoUrl: "",
  },
  {
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&h=800&fit=crop",
    titleKey: "event3Title" as const,
    dateKey: "event3Date" as const,
    statsKey: "event3Stats" as const,
    videoUrl: "",
  },
  {
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=800&fit=crop",
    titleKey: "event4Title" as const,
    dateKey: "event4Date" as const,
    statsKey: "event4Stats" as const,
    videoUrl: "",
  },
  {
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=800&fit=crop",
    titleKey: "event5Title" as const,
    dateKey: "event5Date" as const,
    statsKey: "event5Stats" as const,
    videoUrl: "",
  },
  {
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=800&fit=crop",
    titleKey: "event6Title" as const,
    dateKey: "event6Date" as const,
    statsKey: "event6Stats" as const,
    videoUrl: "",
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

// --- Zod schema for review form ---
const reviewSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  email: z.string().trim().email("Invalid email").max(255),
  rating: z.number().min(1, "Rating is required").max(5),
  comment: z.string().trim().min(1, "Comment is required").max(1000),
});

// --- Star rating input ---
const StarRatingInput = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110"
          aria-label={`${s} star`}
        >
          <Star
            size={22}
            className={
              s <= (hovered || value)
                ? "fill-silver text-silver"
                : "fill-transparent text-muted-foreground"
            }
          />
        </button>
      ))}
    </div>
  );
};

// --- Video Modal ---
const VideoModal = ({ item, getText, onClose }: { item: typeof eventHighlights[0]; getText: (key: string) => string; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full max-w-4xl aspect-video bg-black border border-border"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute -top-12 right-0 z-10 w-10 h-10 flex items-center justify-center text-foreground hover:text-silver transition-colors"
      >
        <X size={24} />
      </button>
      <div className="absolute top-0 left-0 right-0 p-4 z-10 bg-gradient-to-b from-black/80 to-transparent">
        <h4
          className="font-display text-xl md:text-2xl text-foreground tracking-wide"
          style={{ fontFamily: "'Aldo the Apache', sans-serif", textShadow: "0 0 15px hsla(0,0%,80%,0.3)" }}
        >
          {getText(item.titleKey)}
        </h4>
        <p className="font-body text-xs text-silver tracking-widest uppercase mt-1">{getText(item.dateKey)}</p>
      </div>
      {item.videoUrl ? (
        <video
          src={item.videoUrl}
          controls
          autoPlay
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <img src={item.image} alt={getText(item.titleKey)} className="w-full h-full object-cover opacity-40" />
          <span className="absolute font-body text-sm text-muted-foreground tracking-widest uppercase">Video coming soon</span>
        </div>
      )}
    </motion.div>
  </motion.div>
);

// --- Event Card ---
const EventCard = ({ item, getText, onOpen }: { item: typeof eventHighlights[0]; getText: (key: string) => string; onOpen: () => void }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative group border border-border cursor-pointer"
      style={{ aspectRatio: "3/4" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
    >
      {/* Image - positioned absolutely to fill the card */}
      <img
        src={item.image}
        alt={getText(item.titleKey)}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
        style={{ transform: hovered ? "scale(1.1)" : "scale(1)" }}
        loading="lazy"
      />

      {/* Gradient overlay - lighter so image shows through */}
      <div
        className="absolute inset-0 transition-all duration-500 z-[1]"
        style={{
          background: hovered
            ? "rgba(0,0,0,0.7)"
            : "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
        }}
      />

      {/* Play icon on hover - desktop only */}
      <div
        className="absolute inset-0 hidden md:flex items-center justify-center z-[2] transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <div className="w-14 h-14 rounded-full border-2 border-silver/60 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <Play size={24} className="text-silver ml-1" />
        </div>
      </div>

      {/* Play icon always visible on mobile */}
      <div className="absolute inset-0 flex md:hidden items-center justify-center z-[2]">
        <div className="w-10 h-10 rounded-full border border-silver/40 flex items-center justify-center bg-black/30">
          <Play size={16} className="text-silver ml-0.5" />
        </div>
      </div>

      {/* Title and info */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 z-[3]">
        <h4
          className="font-display text-sm sm:text-lg md:text-xl text-foreground mb-1 tracking-wide"
          style={{ fontFamily: "'Aldo the Apache', sans-serif", textShadow: "0 0 15px hsla(0,0%,80%,0.3)" }}
        >
          {getText(item.titleKey)}
        </h4>
        {/* Date/stats visible on hover (desktop) or always on mobile */}
        <div className="block md:hidden">
          <p className="font-body text-[10px] text-silver tracking-widest uppercase">{getText(item.dateKey)}</p>
        </div>
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          className="hidden md:block"
        >
          <p className="font-body text-xs text-silver tracking-widest uppercase mb-1">{getText(item.dateKey)}</p>
          <p className="font-body text-xs text-muted-foreground">{getText(item.statsKey)}</p>
        </motion.div>
      </div>
    </div>
  );
};

// --- Review Card ---
const ReviewCard = ({ item, getText }: { item: typeof clientReviews[0]; getText: (key: string) => string }) => (
  <div className="relative border border-border bg-white/[0.03] backdrop-blur-sm group hover:border-silver/40 transition-all duration-500">
    <div className="flex items-start gap-4 p-4 sm:p-5">
      <img
        src={item.image}
        alt={getText(item.nameKey)}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border border-silver/20 flex-shrink-0 group-hover:border-silver/50 transition-colors"
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
  </div>
);

// --- User-submitted review card ---
const UserReviewCard = ({ item }: { item: { name: string; rating: number; quote: string; image: string } }) => (
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="relative border border-silver/30 bg-white/[0.03] backdrop-blur-sm group hover:border-silver/40 transition-all duration-500"
  >
    <div className="flex items-start gap-4 p-4 sm:p-5">
      <img
        src={item.image}
        alt={item.name}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border border-silver/20 flex-shrink-0"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <div className="flex gap-0.5 mb-1.5">
          {Array.from({ length: item.rating }).map((_, i) => (
            <Star key={i} size={12} className="fill-silver text-silver" />
          ))}
          {Array.from({ length: 5 - item.rating }).map((_, i) => (
            <Star key={`e-${i}`} size={12} className="fill-transparent text-muted-foreground" />
          ))}
        </div>
        <p className="font-body text-sm text-foreground/90 italic leading-relaxed mb-2">
          "{item.quote}"
        </p>
        <span className="font-display text-sm text-foreground">{item.name}</span>
      </div>
    </div>
  </motion.div>
);

// === MAIN COMPONENT ===
const ExperiencesContent = () => {
  const { t } = useLanguage();

  // Mobile carousel state
  const reviewScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  // Review form state
  const [userReviews, setUserReviews] = useState<{ name: string; rating: number; quote: string; image: string }[]>([]);
  const [form, setForm] = useState({ name: "", email: "", rating: 0, comment: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [activeVideo, setActiveVideo] = useState<typeof eventHighlights[0] | null>(null);

  const exp = t.experiences as Record<string, unknown>;
  const getText = (key: string): string => (exp[key] as string) || key;

  const checkScroll = useCallback(() => {
    if (!reviewScrollRef.current) return;
    const el = reviewScrollRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate active slide
    const cardWidth = clientWidth * 0.82;
    const newSlide = Math.round(scrollLeft / cardWidth);
    setActiveSlide(Math.min(newSlide, clientReviews.length + userReviews.length - 1));
  }, [userReviews.length]);

  useEffect(() => {
    const el = reviewScrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    if (!reviewScrollRef.current) return;
    const amount = reviewScrollRef.current.clientWidth * 0.82;
    reviewScrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = reviewSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const body = [
      `Name: ${result.data.name}`,
      `Email: ${result.data.email}`,
      `Rating: ${"★".repeat(result.data.rating)}${"☆".repeat(5 - result.data.rating)}`,
      `Review: ${result.data.comment}`,
    ].join("\n");

    const subject = encodeURIComponent("Nuova Recensione - NightDreams Esperienze");
    const encodedBody = encodeURIComponent(body);
    window.location.href = `mailto:nightdreamsbarcelona@gmail.com?subject=${subject}&body=${encodedBody}`;

    const avatarSeed = encodeURIComponent(result.data.name.trim());
    setUserReviews((prev) => [
      ...prev,
      {
        name: result.data.name,
        rating: result.data.rating,
        quote: result.data.comment,
        image: `https://api.dicebear.com/7.x/initials/svg?seed=${avatarSeed}&backgroundColor=1a1a1a&textColor=c0c0c0`,
      },
    ]);
    setForm({ name: "", email: "", rating: 0, comment: "" });
    setErrors({});
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputClass =
    "w-full bg-background border border-border text-foreground font-body text-sm px-3 sm:px-4 py-3 placeholder:text-muted-foreground focus:outline-none focus:border-silver transition-colors duration-200";

  const totalReviews = clientReviews.length + userReviews.length;

  return (
    <section className="bg-background py-10 md:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-20">
          <span className="font-body text-xs tracking-[0.3em] uppercase text-silver mb-4 block">
            {getText("label")}
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground animate-neon-pulse"
            style={{ fontFamily: "'Aldo the Apache', sans-serif", textShadow: "0 0 20px hsla(0,0%,80%,0.3)" }}
          >
            {getText("titleLine1")}{" "}
            <span className="italic text-silver-gradient">{getText("titleLine2")}</span>
          </h2>
          <div className="mx-auto silver-line mt-6 sm:mt-8" />
          <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-3xl mx-auto mt-4 sm:mt-6">
            {getText("description")}
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Column 1: Event Highlights */}
          <div>
            <h3
              className="text-xl tracking-wider uppercase text-center mb-6 sm:mb-8"
              style={{ fontFamily: "'Aldo the Apache', sans-serif", textShadow: "0 0 15px hsla(0,0%,80%,0.3)" }}
            >
              <span className="text-silver-gradient">{getText("eventsColumnTitle")}</span>
            </h3>

            {/* Grid: 2 columns on all sizes */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 max-w-2xl mx-auto lg:max-w-none">
              {eventHighlights.map((item, i) => (
                <EventCard key={i} item={item} getText={getText} onOpen={() => setActiveVideo(item)} />
              ))}
            </div>
          </div>

          {/* Column 2: Client Reviews */}
          <div>
            <h3
              className="text-xl tracking-wider uppercase text-center mb-6 sm:mb-8"
              style={{ fontFamily: "'Aldo the Apache', sans-serif", textShadow: "0 0 15px hsla(0,0%,80%,0.3)" }}
            >
              <span className="text-silver-gradient">{getText("reviewsColumnTitle")}</span>
            </h3>

            {/* Desktop: vertical scrollable container */}
            <div className="hidden md:block max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-silver/20 scrollbar-track-transparent" style={{ scrollbarWidth: "thin" }}>
              <div className="flex flex-col gap-4">
                {clientReviews.map((item, i) => (
                  <ReviewCard key={i} item={item} getText={getText} />
                ))}
                {userReviews.map((item, i) => (
                  <UserReviewCard key={`user-${i}`} item={item} />
                ))}
              </div>
            </div>

            {/* ====== MOBILE: Horizontal swipe carousel ====== */}
            <div className="md:hidden relative">
              {/* Navigation arrows */}
              {canScrollLeft && (
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-background/90 border border-border rounded-full text-foreground"
                >
                  <ChevronLeft size={18} />
                </button>
              )}
              {canScrollRight && (
                <button
                  onClick={() => scroll("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-background/90 border border-border rounded-full text-foreground"
                >
                  <ChevronRight size={18} />
                </button>
              )}

              {/* Scrollable container - NO overflow-hidden on parent */}
              <div
                ref={reviewScrollRef}
                className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 px-1"
                style={{
                  scrollbarWidth: "none",
                  WebkitOverflowScrolling: "touch",
                  overscrollBehaviorX: "contain",
                }}
              >
                <style>{`
                  .mobile-review-scroll::-webkit-scrollbar { display: none; }
                `}</style>
                {clientReviews.map((item, i) => (
                  <div key={i} className="flex-none w-[80vw] max-w-[320px] snap-start">
                    <ReviewCard item={item} getText={getText} />
                  </div>
                ))}
                {userReviews.map((item, i) => (
                  <div key={`user-${i}`} className="flex-none w-[80vw] max-w-[320px] snap-start">
                    <UserReviewCard item={item} />
                  </div>
                ))}
                {/* End spacer for last card to snap properly */}
                <div className="flex-none w-1" />
              </div>

              {/* Active dot indicator */}
              <div className="flex justify-center gap-2 mt-3">
                {Array.from({ length: totalReviews }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeSlide ? "w-4 bg-silver" : "w-1.5 bg-silver/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* ===== REVIEW FORM ===== */}
            <div className="mt-8 sm:mt-10 border border-border p-3 sm:p-6 md:p-8 bg-white/[0.02] backdrop-blur-sm">
              <div className="text-center mb-6 sm:mb-8">
                <span className="font-body text-xs tracking-[0.3em] uppercase text-silver mb-3 block">
                  {t.testimonials.formLabel}
                </span>
                <h3
                  className="text-xl sm:text-2xl md:text-3xl font-light text-foreground"
                  style={{ fontFamily: "'Aldo the Apache', sans-serif" }}
                >
                  {t.testimonials.formTitle}{" "}
                  <span className="italic text-silver-gradient">{t.testimonials.formTitleAccent}</span>
                </h3>
                <div className="mx-auto silver-line mt-4 sm:mt-5" />
              </div>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 border border-silver/30 bg-silver/5 px-4 py-3 text-center font-body text-sm text-silver tracking-widest uppercase"
                >
                  {t.testimonials.formSuccess}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">
                    {t.testimonials.formName}
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder={t.testimonials.formNamePlaceholder}
                    maxLength={80}
                    className={inputClass}
                  />
                  {errors.name && <span className="font-body text-xs text-destructive">{errors.name}</span>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">
                    {t.testimonials.formEmail}
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder={t.testimonials.formEmailPlaceholder}
                    maxLength={255}
                    className={inputClass}
                  />
                  {errors.email && <span className="font-body text-xs text-destructive">{errors.email}</span>}
                </div>

                {/* Rating */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">
                    {t.testimonials.formRating}
                  </label>
                  <StarRatingInput value={form.rating} onChange={(v) => setForm((p) => ({ ...p, rating: v }))} />
                  {errors.rating && <span className="font-body text-xs text-destructive">{errors.rating}</span>}
                </div>

                {/* Comment */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">
                    {t.testimonials.formComment}
                  </label>
                  <textarea
                    value={form.comment}
                    onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))}
                    placeholder={t.testimonials.formCommentPlaceholder}
                    rows={3}
                    maxLength={1000}
                    className={`${inputClass} resize-none`}
                  />
                  {errors.comment && <span className="font-body text-xs text-destructive">{errors.comment}</span>}
                </div>

                {/* Submit */}
                <div className="md:col-span-2 flex justify-center pt-2">
                  <button
                    type="submit"
                    className="font-body text-xs tracking-[0.2em] uppercase bg-silver text-background px-8 sm:px-10 py-3.5 hover:bg-silver-dark transition-colors duration-300 min-h-[44px] w-full sm:w-auto"
                  >
                    {t.testimonials.formSubmit}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 sm:mt-24 text-center">
          <h3
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wider uppercase mb-8 animate-neon-pulse"
            style={{
              fontFamily: "'Aldo the Apache', sans-serif",
              textShadow: "0 0 30px hsla(0,0%,80%,0.4), 0 0 80px hsla(0,0%,75%,0.15)",
            }}
          >
            <span className="text-silver-gradient">{getText("finalCtaTitle")}</span>
          </h3>
          <DualCTA
            waLabel={getText("finalCtaButton")}
            bookLabel={getText("cardCta")}
            variant="large"
            className="justify-center"
          />
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <VideoModal item={activeVideo} getText={getText} onClose={() => setActiveVideo(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExperiencesContent;
