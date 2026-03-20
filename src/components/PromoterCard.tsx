import { motion } from "framer-motion";
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

export interface PromoterData {
  name: string;
  role: string;
  bio: string;
  src: string;
  instagram: string;
  languages: SpokenLanguage[];
}

interface Props {
  promoter: PromoterData;
  index: number;
}

const PromoterCard = ({ promoter, index }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col md:flex-row gap-6 md:gap-8 border border-border bg-card/20 p-5 md:p-8"
    >
      {/* Photo — clickable to Instagram */}
      <a
        href={promoter.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex-shrink-0 w-full md:w-48 aspect-[4/5] md:aspect-[3/4] overflow-hidden self-center md:self-start"
      >
        <img
          src={promoter.src}
          alt={promoter.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Instagram overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
          <Instagram
            size={28}
            className="text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
          />
        </div>
      </a>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-center min-w-0">
        <h4 className="font-display text-2xl md:text-3xl font-light text-foreground tracking-wide">
          {promoter.name}
        </h4>
        <p className="font-body text-[10px] tracking-[0.25em] uppercase text-silver mt-1">
          {promoter.role}
        </p>

        <p className="font-body text-sm text-muted-foreground leading-relaxed mt-4">
          {promoter.bio}
        </p>

        {/* Language flags */}
        <div className="flex flex-wrap items-center gap-3 mt-4">
          {promoter.languages.map((lang) => {
            const flag = flagMap[lang];
            if (!flag) return null;
            return (
              <div
                key={lang}
                title={flag.label}
                className="flex items-center gap-1.5 group/flag cursor-default"
              >
                <span className="text-lg md:text-xl transition-all duration-300 group-hover/flag:drop-shadow-[0_0_6px_hsla(0,0%,75%,0.5)]">
                  {flag.emoji}
                </span>
                <span className="font-body text-[9px] tracking-[0.15em] uppercase text-muted-foreground group-hover/flag:text-silver transition-colors duration-300">
                  {flag.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Instagram link */}
        <a
          href={promoter.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-silver hover:text-foreground transition-colors duration-300 w-fit group/ig"
        >
          <Instagram size={16} className="group-hover/ig:drop-shadow-[0_0_6px_hsla(0,0%,75%,0.5)] transition-all duration-300" />
          <span className="font-body text-xs tracking-wider">Instagram</span>
        </a>
      </div>
    </motion.div>
  );
};

export default PromoterCard;
