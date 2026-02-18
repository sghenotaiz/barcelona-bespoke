import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = ["Home", "About", "Services", "Experiences", "Contact"];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id.toLowerCase());
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <button onClick={() => scrollTo("home")} className="flex flex-col items-start">
          <span className="font-display text-2xl font-semibold tracking-wider text-primary-foreground">
            CONCIERGING
          </span>
          <span className="text-[10px] font-body tracking-[0.4em] uppercase text-gold-light">
            Barcelona
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/80 hover:text-gold transition-colors duration-300"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="ml-4 border border-gold/60 px-6 py-2.5 font-body text-xs tracking-[0.15em] uppercase text-gold hover:bg-gold hover:text-primary-foreground transition-all duration-300"
          >
            Book Now
          </button>
        </nav>

        <button
          className="lg:hidden text-primary-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-navy/98 backdrop-blur-lg absolute top-full left-0 right-0"
          >
            <div className="flex flex-col items-center gap-6 py-10">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className="font-body text-sm tracking-[0.2em] uppercase text-primary-foreground/80 hover:text-gold transition-colors"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="mt-2 border border-gold/60 px-8 py-3 font-body text-xs tracking-[0.15em] uppercase text-gold hover:bg-gold hover:text-primary-foreground transition-all duration-300"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
