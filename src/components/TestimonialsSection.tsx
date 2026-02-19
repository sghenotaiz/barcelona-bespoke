import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const testimonials = [
{
  name: "Marco B.",
  location: "Milano",
  rating: 5,
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
},
{
  name: "Sophie L.",
  location: "Paris",
  rating: 5,
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face"
},
{
  name: "James W.",
  location: "London",
  rating: 5,
  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
},
{
  name: "Elena R.",
  location: "Roma",
  rating: 5,
  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
},
{
  name: "Alexander K.",
  location: "Berlin",
  rating: 5,
  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face"
},
{
  name: "Isabella M.",
  location: "Barcelona",
  rating: 5,
  image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face"
}];


const TestimonialsSection = () => {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  // Get translated testimonial quotes
  const getQuote = (index: number) => {
    const quotes = [
    t.testimonials.quote1,
    t.testimonials.quote2,
    t.testimonials.quote3,
    t.testimonials.quote4,
    t.testimonials.quote5,
    t.testimonials.quote6];

    return quotes[index] || quotes[0];
  };

  return (
    <section id="testimonials" className="py-[50px] border border-gold-dark bg-[#061808]">
      <div className="container mx-auto px-[24px]" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16">

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
          {/* Nav buttons */}
          {canScrollLeft &&
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-background/80 backdrop-blur-sm border border-border text-foreground hover:text-silver transition-colors">

              <ChevronLeft size={20} />
            </button>
          }
          {canScrollRight &&
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-background/80 backdrop-blur-sm border border-border text-foreground hover:text-silver transition-colors">

              <ChevronRight size={20} />
            </button>
          }

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>

            {testimonials.map((item, i) =>
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="flex-shrink-0 w-[300px] md:w-[360px] snap-start group">

                <div className="relative h-[420px] overflow-hidden border border-border hover:border-silver/40 transition-all duration-500">
                  {/* Image */}
                  <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy" />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent rounded-none my-0 border border-black" />
                  {/* Text content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: item.rating }).map((_, si) =>
                    <Star key={si} size={14} className="fill-silver text-silver" />
                    )}
                    </div>
                    <p className="font-body text-sm text-foreground/90 leading-relaxed mb-4 italic">
                      "{getQuote(i)}"
                    </p>
                    <div>
                      <span className="font-display text-lg text-foreground">{item.name}</span>
                      <span className="font-body text-xs text-muted-foreground ml-2">{item.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;