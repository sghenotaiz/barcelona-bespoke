import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { z } from "zod";

// keep existing code (initialTestimonials array)
const initialTestimonials = [
  {
    name: "Marco B.",
    location: "Milano",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    quoteKey: "quote1" as const,
  },
  {
    name: "Sophie L.",
    location: "Paris",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    quoteKey: "quote2" as const,
  },
  {
    name: "James W.",
    location: "London",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    quoteKey: "quote3" as const,
  },
  {
    name: "Elena R.",
    location: "Roma",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    quoteKey: "quote4" as const,
  },
  {
    name: "Alexander K.",
    location: "Berlin",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    quoteKey: "quote5" as const,
  },
  {
    name: "Isabella M.",
    location: "Barcelona",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    quoteKey: "quote6" as const,
  },
];

type UserReview = {
  name: string;
  location: string;
  rating: number;
  image: string;
  quote: string;
};

const reviewSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  email: z.string().trim().email("Invalid email").max(255),
  rating: z.number().min(1).max(5),
  comment: z.string().trim().min(1, "Comment is required").max(1000),
});

const StarRatingInput = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) => {
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

const TestimonialsSection = () => {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);

  // Form state
  const [form, setForm] = useState({ name: "", email: "", rating: 0, comment: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

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
  }, [userReviews]);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const getQuote = (index: number) => {
    const quotes = [
      t.testimonials.quote1,
      t.testimonials.quote2,
      t.testimonials.quote3,
      t.testimonials.quote4,
      t.testimonials.quote5,
      t.testimonials.quote6,
    ];
    return quotes[index] || quotes[0];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = reviewSchema.safeParse({ name: form.name, email: form.email, rating: form.rating, comment: form.comment });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const avatarSeed = encodeURIComponent(form.name.trim());
    const newReview: UserReview = {
      name: result.data.name,
      location: "Guest",
      rating: result.data.rating,
      image: `https://api.dicebear.com/7.x/initials/svg?seed=${avatarSeed}&backgroundColor=1a1a1a&textColor=c0c0c0`,
      quote: result.data.comment,
    };

    setUserReviews((prev) => [...prev, newReview]);
    setForm({ name: "", email: "", rating: 0, comment: "" });
    setErrors({});
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ left: scrollRef.current.scrollWidth, behavior: "smooth" });
      }
    }, 100);
  };

  const inputClass =
    "w-full bg-background border border-border text-foreground font-body text-sm px-4 py-3 placeholder:text-muted-foreground focus:outline-none focus:border-silver transition-colors duration-200";

  return (
    <section id="testimonials" className="py-[50px] border-b border-border bg-[#061808]">
      <div className="container mx-auto px-[24px]" ref={ref}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-silver mb-4 block">
            {t.testimonials.label}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
            {t.testimonials.titleLine1}{" "}
            <span className="italic text-silver-gradient">{t.testimonials.titleLine2}</span>
          </h2>
          <div className="mx-auto silver-line mt-8" />
        </motion.div>

        {/* Carousel */}
        <div className="relative">
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
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Static testimonials */}
            {initialTestimonials.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className="flex-shrink-0 w-[300px] md:w-[360px] snap-start group"
              >
                {/* Reduced height: was h-[420px], now h-[280px] */}
                <div className="relative h-[280px] overflow-hidden border border-border hover:border-silver/40 transition-all duration-500">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: item.rating }).map((_, si) => (
                        <Star key={si} size={12} className="fill-silver text-silver" />
                      ))}
                    </div>
                    <p className="font-body text-xs text-foreground/90 leading-relaxed mb-3 italic">
                      "{getQuote(i)}"
                    </p>
                    <div>
                      <span className="font-display text-base text-foreground">{item.name}</span>
                      <span className="font-body text-xs text-muted-foreground ml-2">{item.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* User-submitted reviews */}
            {userReviews.map((item, i) => (
              <motion.div
                key={`user-${i}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0 w-[300px] md:w-[360px] snap-start group"
              >
                <div className="relative h-[280px] overflow-hidden border border-border hover:border-silver/40 transition-all duration-500">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: item.rating }).map((_, si) => (
                        <Star key={si} size={12} className="fill-silver text-silver" />
                      ))}
                    </div>
                    <p className="font-body text-xs text-foreground/90 leading-relaxed mb-3 italic">"{item.quote}"</p>
                    <div>
                      <span className="font-display text-base text-foreground">{item.name}</span>
                      <span className="font-body text-xs text-muted-foreground ml-2">{item.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Review submission form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 border border-border p-8 md:p-12 bg-background/40"
        >
          <div className="text-center mb-10">
            <span className="font-body text-xs tracking-[0.3em] uppercase text-silver mb-4 block">
              {t.testimonials.formLabel}
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-light text-foreground">
              {t.testimonials.formTitle} <span className="italic text-silver-gradient">{t.testimonials.formTitleAccent}</span>
            </h3>
            <div className="mx-auto silver-line mt-6" />
          </div>

          {submitted && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 border border-silver/30 bg-silver/5 px-6 py-4 text-center font-body text-sm text-silver tracking-widest uppercase">
              {t.testimonials.formSuccess}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">{t.testimonials.formName}</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder={t.testimonials.formNamePlaceholder}
                maxLength={80}
                className={inputClass}
              />
              {errors.name && (
                <span className="font-body text-xs text-destructive">{errors.name}</span>
              )}
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
              {errors.email && (
                <span className="font-body text-xs text-destructive">{errors.email}</span>
              )}
            </div>

            {/* Rating */}
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">
                {t.testimonials.formRating}
              </label>
              <StarRatingInput
                value={form.rating}
                onChange={(v) => setForm((p) => ({ ...p, rating: v }))}
              />
              {errors.rating && (
                <span className="font-body text-xs text-destructive">{errors.rating}</span>
              )}
            </div>

            {/* Comment – spans full width */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">
                {t.testimonials.formComment}
              </label>
              <textarea
                value={form.comment}
                onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))}
                placeholder={t.testimonials.formCommentPlaceholder}
                rows={4}
                maxLength={1000}
                className={`${inputClass} resize-none`}
              />
              {errors.comment && (
                <span className="font-body text-xs text-destructive">{errors.comment}</span>
              )}
            </div>

            {/* Submit */}
            <div className="md:col-span-2 flex justify-center pt-2">
              <button
                type="submit"
                className="font-body text-xs tracking-[0.2em] uppercase bg-silver text-background px-10 py-3.5 hover:bg-silver-dark transition-colors duration-300"
              >
                {t.testimonials.formSubmit}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
