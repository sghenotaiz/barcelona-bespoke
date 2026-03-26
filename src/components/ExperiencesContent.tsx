import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Star, Play, X, Upload } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { z } from "zod";
import DualCTA from "@/components/DualCTA";
import ReviewsPhotosGallery from "@/components/ReviewsPhotosGallery";
import marcoCarolaCover from "@/assets/images/marco-carola-cover.jpg";
import marcoCarolaVideo from "@/assets/videos/marco-carola-ku-bcn.mp4";
import tygaOpiumCover from "@/assets/images/tyga-opium-cover.jpg";
import tygaOpiumVideo from "@/assets/videos/tyga-opium.mp4";
import sferaEbbastaCover from "@/assets/images/sfera-ebbasta-cover.jpg";
import sferaEbbastaVideo from "@/assets/videos/sfera-ebbasta-ku-bcn.mp4";
import erasmusBlingBlingCover from "@/assets/images/erasmus-bling-bling-cover.jpg";
import erasmusBlingBlingVideo from "@/assets/videos/erasmus-bling-bling.mp4";
import bobSinclairCover from "@/assets/images/bob-sinclair-cover.jpg";
import bobSinclairVideo from "@/assets/videos/bob-sinclair-opium.mp4";
import hugelCover from "@/assets/images/hugel-cover.jpg";
import hugelVideo from "@/assets/videos/hugel-ku-bcn.mp4";

// Event highlight cards data
const eventHighlights = [
  {
    image: marcoCarolaCover,
    titleKey: "event1Title" as const,
    dateKey: "event1Date" as const,
    statsKey: "event1Stats" as const,
    videoUrl: marcoCarolaVideo,
  },
  {
    image: tygaOpiumCover,
    titleKey: "event2Title" as const,
    dateKey: "event2Date" as const,
    statsKey: "event2Stats" as const,
    videoUrl: tygaOpiumVideo,
  },
  {
    image: sferaEbbastaCover,
    titleKey: "event3Title" as const,
    dateKey: "event3Date" as const,
    statsKey: "event3Stats" as const,
    videoUrl: sferaEbbastaVideo,
  },
  {
    image: erasmusBlingBlingCover,
    titleKey: "event4Title" as const,
    dateKey: "event4Date" as const,
    statsKey: "event4Stats" as const,
    videoUrl: erasmusBlingBlingVideo,
  },
  {
    image: bobSinclairCover,
    titleKey: "event5Title" as const,
    dateKey: "event5Date" as const,
    statsKey: "event5Stats" as const,
    videoUrl: bobSinclairVideo,
  },
  {
    image: hugelCover,
    titleKey: "event6Title" as const,
    dateKey: "event6Date" as const,
    statsKey: "event6Stats" as const,
    videoUrl: hugelVideo,
  },
];


// --- Zod schema for review form ---
const reviewSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  email: z.string().trim().email("Invalid email").max(255),
  comment: z.string().trim().min(1, "Comment is required").max(1000),
  type: z.enum(["review", "photo"]),
});

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
        <video src={item.videoUrl} controls autoPlay className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <img src={item.image} alt={getText(item.titleKey)} className="w-full h-full object-cover opacity-40" />
          <span className="absolute font-body text-sm text-muted-foreground tracking-widest uppercase">Video coming soon</span>
        </div>
      )}
    </motion.div>
  </motion.div>
);

// --- Desktop Event Card (keeps hover effects) ---
const DesktopEventCard = ({ item, getText, onOpen }: { item: typeof eventHighlights[0]; getText: (key: string) => string; onOpen: () => void }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative group border border-border cursor-pointer"
      style={{ aspectRatio: "3/4" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
    >
      <img
        src={item.image}
        alt={getText(item.titleKey)}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
        style={{ transform: hovered ? "scale(1.1)" : "scale(1)" }}
        loading="lazy"
      />
      <div
        className="absolute inset-0 transition-all duration-500 z-[1]"
        style={{
          background: hovered
            ? "rgba(0,0,0,0.7)"
            : "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 flex items-center justify-center z-[2] transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <div className="w-14 h-14 rounded-full border-2 border-silver/60 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <Play size={24} className="text-silver ml-1" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 z-[3]">
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
    </div>
  );
};


// === MAIN COMPONENT (Reviews & Photos Gallery) ===
const ExperiencesContent = () => {
  const { t } = useLanguage();

  // Review form state (shared between mobile and desktop)
  const [userReviews, setUserReviews] = useState<{ name: string; rating: number; quote: string; image: string }[]>([]);
  const [form, setForm] = useState({ name: "", email: "", comment: "", type: "review" as "review" | "photo" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [activeVideo, setActiveVideo] = useState<typeof eventHighlights[0] | null>(null);
  const [activeSaltafila, setActiveSaltafila] = useState<{ src: string; label: string } | null>(null);

  const exp = t.experiences as Record<string, unknown>;
  const getText = (key: string): string => (exp[key] as string) || key;

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

    const typeLabel = form.type === "review" ? "Recensione" : "Le nostre foto";
    const body = [
      `Nome: ${result.data.name}`,
      `Email: ${result.data.email}`,
      `Tipologia: ${typeLabel}`,
      `Commento: ${result.data.comment}`,
      selectedFile ? `Foto: ${selectedFile.name} (richiedila via email di risposta)` : "Nessuna foto allegata",
    ].join("\n");

    const subject = encodeURIComponent(`NightDreams - ${typeLabel} da ${result.data.name}`);
    const encodedBody = encodeURIComponent(body);
    window.location.href = `mailto:nightdreamsbarcelona@gmail.com?subject=${subject}&body=${encodedBody}`;

    setForm({ name: "", email: "", comment: "", type: "review" });
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setErrors({});
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputClass =
    "w-full bg-background border border-border text-foreground font-body text-sm px-3 sm:px-4 py-3 placeholder:text-muted-foreground focus:outline-none focus:border-silver transition-colors duration-200";

  // ========================
  // REVIEW FORM (shared)
  // ========================
  const ReviewForm = () => (
    <div className="border border-border p-4 md:p-8 bg-white/[0.02]">
      <div className="text-center mb-6">
        <span className="font-body text-xs tracking-[0.3em] uppercase text-silver mb-3 block">
          {t.testimonials.formLabel}
        </span>
        <h3
          className="text-xl md:text-3xl font-light text-foreground"
          style={{ fontFamily: "'Aldo the Apache', sans-serif" }}
        >
          {t.testimonials.formTitle}{" "}
          <span className="italic text-silver-gradient">{t.testimonials.formTitleAccent}</span>
        </h3>
        <div className="mx-auto silver-line mt-4" />
      </div>

      {submitted && (
        <div className="mb-6 border border-silver/30 bg-silver/5 px-4 py-3 text-center font-body text-sm text-silver tracking-widest uppercase">
          {t.testimonials.formSuccess}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>

        {/* File upload */}
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">
            {t.testimonials.formFile}
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`${inputClass} cursor-pointer flex items-center gap-2`}>
            <Upload size={16} className="text-muted-foreground flex-shrink-0" />
            <span className={selectedFile ? "text-foreground" : "text-muted-foreground"}>
              {selectedFile ? selectedFile.name : t.testimonials.formFilePlaceholder}
            </span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="hidden" />
        </div>

        {/* Type selector */}
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">
            {t.testimonials.formType}
          </label>
          <select
            value={form.type}
            onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as "review" | "photo" }))}
            className={inputClass}>
            <option value="review">{t.testimonials.formTypeReview}</option>
            <option value="photo">{t.testimonials.formTypePhoto}</option>
          </select>
          {errors.type && <span className="font-body text-xs text-destructive">{errors.type}</span>}
        </div>

        {/* Comment */}
        <div className="flex flex-col gap-1.5">
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
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            className="font-body text-xs tracking-[0.2em] uppercase bg-silver text-background px-8 py-3.5 hover:bg-silver-dark transition-colors duration-300 min-h-[48px] w-full md:w-auto"
          >
            {t.testimonials.formSubmit}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <section id="testimonials" className="bg-background py-10 md:py-12" style={{ maxWidth: "100vw", overflowX: "hidden" }}>
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

        {/* ============================================================ */}
        {/* MOBILE LAYOUT - Simple vertical stack, NO animations/carousel */}
        {/* ============================================================ */}
        <div className="md:hidden" style={{ maxWidth: "100%", overflowX: "hidden" }}>

          {/* MOBILE: Event Highlights - stacked vertically */}
          <h3
            className="text-lg tracking-wider uppercase text-center mb-4"
            style={{ fontFamily: "'Aldo the Apache', sans-serif" }}
          >
            <span className="text-silver-gradient">{getText("eventsColumnTitle")}</span>
          </h3>

          <div className="space-y-4">
            {eventHighlights.map((item, i) => (
              <div
                key={i}
                className="relative w-full overflow-hidden border border-border cursor-pointer"
                style={{ height: "180px" }}
                onClick={() => setActiveVideo(item)}
              >
                <img
                  src={item.image}
                  alt={getText(item.titleKey)}
                  className="block w-full h-full object-cover"
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full border border-silver/50 flex items-center justify-center bg-black/40">
                    <Play size={18} className="text-silver ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 z-[2]">
                  <h4
                    className="font-display text-sm text-foreground tracking-wide"
                    style={{ fontFamily: "'Aldo the Apache', sans-serif" }}
                  >
                    {getText(item.titleKey)}
                  </h4>
                  <p className="font-body text-[10px] text-silver tracking-widest uppercase mt-0.5">
                    {getText(item.dateKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE: Esempi Saltafila */}
          <h3
            className="text-lg tracking-wider uppercase text-center mt-8 mb-4"
            style={{ fontFamily: "'Aldo the Apache', sans-serif" }}
          >
            <span className="text-silver-gradient">{getText("skipLineExamplesTitle")}</span>
          </h3>
          <div className="space-y-4">
            {[
              { src: "/videos/saltafila-ku.mp4", label: "Ku BCN" },
              { src: "/videos/saltafila-opium.mp4", label: "Opium" },
              { src: "/videos/saltafila-bling-bling.mp4", label: "Bling Bling" },
            ].map((v, i) => (
              <div
                key={i}
                className="relative w-full overflow-hidden border border-border cursor-pointer"
                style={{ height: "180px" }}
                onClick={() => setActiveSaltafila(v)}
              >
                <video
                  src={`${v.src}#t=0.5`}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                  style={{ backgroundColor: "#111" }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-11 h-11 rounded-full border border-silver/50 flex items-center justify-center bg-black/40">
                    <Play size={18} className="text-silver ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 z-[2]">
                  <h4
                    className="font-display text-sm text-foreground tracking-wide"
                    style={{ fontFamily: "'Aldo the Apache', sans-serif" }}
                  >
                    Saltafila {v.label}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE: Reviews & Photos Gallery */}
          <ReviewsPhotosGallery />

          {/* Link to Google Drive */}
          <div className="text-center mt-8 mb-2">
            <a
              href="https://drive.google.com/drive/folders/1-OuAO7Uj81nUI98GZaqss-b72gAHKWQD?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-silver hover:text-foreground transition-colors duration-300"
            >
              Per altre recensioni e foto clicca{" "}
              <span className="underline font-bold text-foreground">QUI</span>!
            </a>
          </div>

          {/* MOBILE: Review Form */}
          <div className="mt-8">
            <ReviewForm />
          </div>

          {/* MOBILE: Final CTA */}
          <div className="mt-10 text-center">
            <h3
              className="text-2xl tracking-wider uppercase mb-6"
              style={{
                fontFamily: "'Aldo the Apache', sans-serif",
                textShadow: "0 0 30px hsla(0,0%,80%,0.4)",
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

        {/* ============================================================ */}
        {/* DESKTOP LAYOUT - Original two-column grid, UNTOUCHED         */}
        {/* ============================================================ */}
        <div className="hidden md:block">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Column 1: Event Highlights */}
            <div>
              <h3
                className="text-xl tracking-wider uppercase text-center mb-8"
                style={{ fontFamily: "'Aldo the Apache', sans-serif", textShadow: "0 0 15px hsla(0,0%,80%,0.3)" }}
              >
                <span className="text-silver-gradient">{getText("eventsColumnTitle")}</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {eventHighlights.map((item, i) => (
                  <DesktopEventCard key={i} item={item} getText={getText} onOpen={() => setActiveVideo(item)} />
                ))}
              </div>

              {/* Esempi Saltafila */}
              <h3
                className="text-lg tracking-wider uppercase text-center mt-10 mb-6"
                style={{ fontFamily: "'Aldo the Apache', sans-serif", textShadow: "0 0 15px hsla(0,0%,80%,0.3)" }}
              >
                <span className="text-silver-gradient">{getText("skipLineExamplesTitle")}</span>
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { src: "/videos/saltafila-ku.mp4", label: "Ku BCN" },
                  { src: "/videos/saltafila-opium.mp4", label: "Opium" },
                  { src: "/videos/saltafila-bling-bling.mp4", label: "Bling Bling" },
                ].map((v, i) => (
                  <div
                    key={i}
                    className="relative group border border-border cursor-pointer overflow-hidden"
                    style={{ aspectRatio: "9/16" }}
                    onClick={() => setActiveSaltafila(v)}
                  >
                    <video
                      src={`${v.src}#t=0.5`}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                      style={{ backgroundColor: "#111" }}
                    />
                    <div
                      className="absolute inset-0 pointer-events-none transition-all duration-500"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full border-2 border-silver/60 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <Play size={24} className="text-silver ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-[2]">
                      <h4
                        className="font-display text-sm text-foreground tracking-wide"
                        style={{ fontFamily: "'Aldo the Apache', sans-serif", textShadow: "0 0 15px hsla(0,0%,80%,0.3)" }}
                      >
                        Saltafila {v.label}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Reviews & Photos Gallery */}
            <div>
              <ReviewsPhotosGallery compact />

              {/* Link to Google Drive */}
              <div className="text-center mt-8 mb-2">
                <a
                  href="https://drive.google.com/drive/folders/1-OuAO7Uj81nUI98GZaqss-b72gAHKWQD?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-silver hover:text-foreground transition-colors duration-300"
                >
                  Per altre recensioni e foto clicca{" "}
                  <span className="underline font-bold text-foreground">QUI</span>!
                </a>
              </div>

              {/* Review Form */}
              <div className="mt-10">
                <ReviewForm />
              </div>
            </div>
          </div>

          {/* Desktop: Final CTA */}
          <div className="mt-24 text-center">
            <h3
              className="text-3xl md:text-4xl lg:text-5xl tracking-wider uppercase mb-8 animate-neon-pulse"
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
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <VideoModal item={activeVideo} getText={getText} onClose={() => setActiveVideo(null)} />
        )}
        {activeSaltafila && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setActiveSaltafila(null)}
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
                onClick={() => setActiveSaltafila(null)}
                className="absolute -top-12 right-0 z-10 w-10 h-10 flex items-center justify-center text-foreground hover:text-silver transition-colors"
              >
                <X size={24} />
              </button>
              <div className="absolute top-0 left-0 right-0 p-4 z-10 bg-gradient-to-b from-black/80 to-transparent">
                <h4
                  className="font-display text-xl md:text-2xl text-foreground tracking-wide"
                  style={{ fontFamily: "'Aldo the Apache', sans-serif", textShadow: "0 0 15px hsla(0,0%,80%,0.3)" }}
                >
                  Saltafila {activeSaltafila.label}
                </h4>
              </div>
              <video src={activeSaltafila.src} controls autoPlay className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExperiencesContent;
