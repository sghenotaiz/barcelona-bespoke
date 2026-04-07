"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Instagram } from "lucide-react";

type SpokenLanguage = "italian" | "spanish" | "english" | "french" | "dutch" | "german" | "russian" | "catalan";

const flagMap: Record<SpokenLanguage, { emoji: string; label: string }> = {
  italian:  { emoji: "🇮🇹", label: "Italiano" },
  spanish:  { emoji: "🇪🇸", label: "Español" },
  english:  { emoji: "🇬🇧", label: "English" },
  french:   { emoji: "🇫🇷", label: "Français" },
  dutch:    { emoji: "🇳🇱", label: "Nederlands" },
  german:   { emoji: "🇩🇪", label: "Deutsch" },
  russian:  { emoji: "🇷🇺", label: "Русский" },
  catalan:  { emoji: "🏴", label: "Català" },
};

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  instagram?: string;
  languages?: SpokenLanguage[];
  imagePosition?: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 17000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  const current = testimonials[active];

  return (
    <div className={cn("max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20", className)}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  {testimonial.instagram ? (
                    <a
                      href={testimonial.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full w-full group relative"
                    >
                      <img
                        src={testimonial.src}
                        alt={testimonial.name}
                        draggable={false}
                        className="h-full w-full rounded-3xl object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        style={{ objectPosition: testimonial.imagePosition || "top" }}
                      />
                      <div className="absolute inset-0 rounded-3xl bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                        <Instagram
                          size={28}
                          className="text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                        />
                      </div>
                    </a>
                  ) : (
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      draggable={false}
                      className="h-full w-full rounded-3xl object-cover object-center"
                    />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3 className="font-display text-2xl font-bold text-foreground">
              {current.name}
            </h3>
            <p className="text-sm text-silver font-body tracking-[0.15em] uppercase mt-1">
              {current.designation}
            </p>

            {/* Language flags + Instagram — positioned after name for visibility */}
            <div className="flex flex-wrap items-center gap-4 mt-3">
              {current.languages && current.languages.length > 0 && (
                <div className="flex flex-wrap items-center gap-3">
                  {current.languages.map((lang) => {
                    const flag = flagMap[lang];
                    if (!flag) return null;
                    return (
                      <div
                        key={lang}
                        title={flag.label}
                        className="flex items-center gap-1.5 group/flag cursor-default"
                      >
                        <span className="text-lg transition-all duration-300 group-hover/flag:drop-shadow-[0_0_6px_hsla(0,0%,75%,0.5)]">
                          {flag.emoji}
                        </span>
                        <span className="font-body text-[9px] tracking-[0.15em] uppercase text-muted-foreground group-hover/flag:text-silver transition-colors duration-300">
                          {flag.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
              {current.instagram && (
                <a
                  href={current.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-silver hover:text-foreground transition-colors duration-300 w-fit group/ig"
                >
                  <Instagram size={16} className="group-hover/ig:drop-shadow-[0_0_6px_hsla(0,0%,75%,0.5)] transition-all duration-300" />
                  <span className="font-body text-xs tracking-wider">Instagram</span>
                </a>
              )}
            </div>

            <motion.p className="text-lg text-muted-foreground mt-5 font-body leading-relaxed">
              {current.quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-10 w-10 rounded-full bg-card/50 border border-border flex items-center justify-center group/button hover:border-silver/40 transition-colors active:scale-95"
            >
              <IconArrowLeft className="h-5 w-5 text-muted-foreground group-hover/button:text-silver transition-colors" />
            </button>
            <button
              onClick={handleNext}
              className="h-10 w-10 rounded-full bg-card/50 border border-border flex items-center justify-center group/button hover:border-silver/40 transition-colors active:scale-95"
            >
              <IconArrowRight className="h-5 w-5 text-muted-foreground group-hover/button:text-silver transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
