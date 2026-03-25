import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Language } from "@/i18n/translations";
import { useLanguage } from "@/i18n/LanguageContext";

interface LanguageSelectorProps {
  visible: boolean;
  onComplete: () => void;
}

const flags: { lang: Language; flag: string; label: string }[] = [
  { lang: "it", flag: "🇮🇹", label: "Italiano" },
  { lang: "en", flag: "🇬🇧", label: "English" },
  { lang: "es", flag: "🇪🇸", label: "Español" },
  { lang: "fr", flag: "🇫🇷", label: "Français" },
];

const LanguageSelector = ({ visible, onComplete }: LanguageSelectorProps) => {
  const { setLanguage } = useLanguage();
  const [selected, setSelected] = useState<Language | null>(null);

  const handleSelect = (lang: Language) => {
    setSelected(lang);
    setLanguage(lang);
    localStorage.setItem("userLanguage", lang);
    // Auto-confirm after selection
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="language-selector"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[99] flex flex-col items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, hsl(0,0%,2%) 0%, hsl(0,0%,6%) 40%, hsl(0,0%,10%) 70%, hsl(40,8%,14%) 100%)",
          }}
        >
          {/* Subtle silver radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, hsla(0,0%,75%,0.04) 0%, transparent 70%)",
            }}
          />

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative z-10 text-center mb-12 md:mb-16"
          >
            <h2
              className="text-xl md:text-2xl lg:text-3xl tracking-[0.15em] uppercase font-body"
              style={{ color: "hsl(0,0%,85%)" }}
            >
              Scegli la tua lingua / Choose your language
            </h2>
            <p
              className="mt-3 font-body text-xs md:text-sm tracking-[0.2em]"
              style={{ color: "hsl(0,0%,45%)" }}
            >
              Tornerà sempre in questa lingua
            </p>
          </motion.div>

          {/* Flags grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14"
          >
            {flags.map(({ lang, flag, label }) => (
              <motion.button
                key={lang}
                onClick={() => handleSelect(lang)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center gap-3 px-6 py-5 rounded-xl transition-all duration-300 ${
                  selected === lang
                    ? "bg-white/5 ring-1 ring-white/20"
                    : "hover:bg-white/[0.03]"
                }`}
              >
                <span
                  className={`text-6xl md:text-7xl transition-all duration-500 ${
                    selected === lang
                      ? "drop-shadow-[0_0_20px_hsla(40,60%,60%,0.5)]"
                      : ""
                  }`}
                >
                  {flag}
                </span>
                <span
                  className={`font-body text-xs tracking-[0.25em] uppercase transition-colors duration-300 ${
                    selected === lang
                      ? "text-[hsl(0,0%,85%)]"
                      : "text-[hsl(0,0%,50%)]"
                  }`}
                >
                  {label}
                </span>
                {selected === lang && (
                  <motion.div
                    layoutId="lang-indicator"
                    className="w-8 h-0.5 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, hsl(0,0%,60%), hsl(40,15%,65%))",
                    }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Conferma hint */}
          <AnimatePresence>
            {selected && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="relative z-10 mt-10 font-body text-[10px] tracking-[0.3em] uppercase"
                style={{ color: "hsl(0,0%,40%)" }}
              >
                Conferma...
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LanguageSelector;
