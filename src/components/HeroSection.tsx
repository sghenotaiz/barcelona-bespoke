import { motion } from "framer-motion";
import heroImage from "@/assets/hero-barcelona.jpg";
import nightdreamsLogo from "@/assets/nightdreams-logo.jpeg";
import { useLanguage } from "@/i18n/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }} />

      <div className="absolute inset-0 bg-hero-overlay" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-3xl">

          




          <div className="mx-auto gold-line-wide mb-8" />
          <h1 className="font-logo text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-tight mb-2"
          style={{ WebkitTextStroke: "1px hsla(0, 0%, 0%, 0.5)", paintOrder: "stroke fill" }}>

            <span className="text-gold-gradient" style={{ WebkitTextStroke: "1px hsla(0, 0%, 0%, 0.3)" }}>N</span>ight
            <span className="text-gold-gradient" style={{ WebkitTextStroke: "1px hsla(0, 0%, 0%, 0.3)" }}>D</span>reams
          </h1>
          <p className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-gold-light mb-6">
            {t.hero.subtitle}
          </p>
          <p className="font-body text-sm md:text-base font-light text-primary-foreground/80 tracking-wide max-w-xl mx-auto mb-10 leading-relaxed">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo("services")}
              className="border border-primary-foreground/30 px-10 py-3.5 font-body text-xs tracking-[0.2em] uppercase text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300">

              {t.hero.exploreServices}
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="bg-gold px-10 py-3.5 font-body text-xs tracking-[0.2em] uppercase text-primary-foreground hover:bg-gold-dark transition-all duration-300">

              {t.hero.requestVip}
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">

        <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>);

};

export default HeroSection;