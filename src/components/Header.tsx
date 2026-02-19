import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { languageLabels, languageNames, type Language } from "@/i18n/translations";
import NightDreamsLogo from "@/components/NightDreamsLogo";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
  { key: "home", label: t.nav.home },
  { key: "about", label: t.nav.about },
  { key: "services", label: t.nav.services },
  { key: "experiences", label: t.nav.experiences },
  { key: "contact", label: t.nav.contact }];


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[hsl(0,0%,0%)] ${
      scrolled ?
      "py-3 shadow-lg shadow-black/50" :
      "py-5"}`
      }>

      <div className="container mx-auto px-6 flex-row flex items-center justify-between">
        <button onClick={() => scrollTo("home")} className="flex items-center">
          <NightDreamsLogo size="sm" showIcon={true} />
        </button>

        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) =>
          <button
            key={item.key}
            onClick={() => scrollTo(item.key)}
            className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/80 hover:text-silver transition-colors duration-300">

              {item.label}
            </button>
          )}
          <button
            onClick={() => scrollTo("booking")}
            className="ml-4 border border-silver/60 px-6 py-2.5 font-body text-xs tracking-[0.15em] uppercase text-silver hover:bg-silver hover:text-background transition-all duration-300">

            {t.nav.bookNow}
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 font-body text-xs tracking-[0.1em] uppercase text-primary-foreground/70 hover:text-silver transition-colors duration-300">

              <Globe size={14} strokeWidth={1.5} />
              {languageLabels[language]}
            </button>
            <AnimatePresence>
              {langOpen &&
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-3 bg-background/95 backdrop-blur-md border border-border min-w-[140px] overflow-hidden">

                  {(Object.keys(languageNames) as Language[]).map((lang) =>
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setLangOpen(false);
                  }}
                  className={`w-full text-left px-5 py-2.5 font-body text-xs tracking-wider transition-colors ${
                  language === lang ?
                  "text-silver bg-primary-foreground/5" :
                  "text-primary-foreground/70 hover:text-silver hover:bg-primary-foreground/5"}`
                  }>

                      {languageNames[lang]}
                    </button>
                )}
                </motion.div>
              }
            </AnimatePresence>
          </div>
        </nav>

        <button
          className="lg:hidden text-primary-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}>

          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen &&
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden bg-background/98 backdrop-blur-lg absolute top-full left-0 right-0">

            <div className="flex flex-col items-center gap-6 py-10">
              {navItems.map((item) =>
            <button
              key={item.key}
              onClick={() => scrollTo(item.key)}
              className="font-body text-sm tracking-[0.2em] uppercase text-primary-foreground/80 hover:text-silver transition-colors">

                  {item.label}
                </button>
            )}
              <button
              onClick={() => scrollTo("booking")}
              className="mt-2 border border-silver/60 px-8 py-3 font-body text-xs tracking-[0.15em] uppercase text-silver hover:bg-silver hover:text-background transition-all duration-300">

                {t.nav.bookNow}
              </button>

              <div className="flex gap-4 mt-2">
                {(Object.keys(languageLabels) as Language[]).map((lang) =>
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setMobileOpen(false);
                }}
                className={`font-body text-xs tracking-wider transition-colors ${
                language === lang ? "text-silver" : "text-primary-foreground/50 hover:text-silver"}`
                }>

                    {languageLabels[lang]}
                  </button>
              )}
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

};

export default Header;