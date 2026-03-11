import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PlanHero = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const scrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative w-full h-[80vh] md:h-[80vh] overflow-hidden"
    >
      {/* Video with parallax */}
      <motion.div
        style={{ y: videoY }}
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="https://videos.pexels.com/video-files/4065924/4065924-uhd_2560_1440_24fps.mp4"
        />
      </motion.div>

      {/* Dark overlay + bottom gradient */}
      <div className="absolute inset-0 bg-black/70 z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />

      {/* Centered hype copy */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl tracking-wider uppercase mb-6"
          style={{
            fontFamily: "'Aldo the Apache', sans-serif",
            textShadow:
              "0 0 20px hsla(0, 0%, 80%, 0.5), 0 0 60px hsla(0, 0%, 75%, 0.2)",
          }}
        >
          <span className="text-silver-gradient">Contattaci</span>{" "}
          <span className="text-2xl md:text-4xl">✨</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-body text-base md:text-lg text-white/80 max-w-2xl leading-relaxed mb-4"
        >
          Richiedi il tuo preventivo{" "}
          <span className="text-silver font-semibold uppercase tracking-wider">Gratis</span>
          <br />
          e goditi la tua vacanza senza preoccupazioni
          <br />
          in questa meravigliosa città!
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="font-body text-sm md:text-base tracking-[0.15em] uppercase text-silver mb-10"
        >
          ⏰ Prima lo richiedi, più conveniente sarà
          <br />
          <span className="text-white/50 text-xs normal-case tracking-normal">
            (Non ridurti all'ultimo! Ti aspettiamo ✨)
          </span>
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          onClick={scrollToBooking}
          className="font-body text-[11px] tracking-[0.25em] uppercase border border-silver/40 text-silver px-10 py-4 transition-all duration-500 hover:bg-white/10 hover:border-white/60 hover:text-white hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        >
          Compila il Form ↓
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8"
        >
          <div className="w-px h-12 bg-gradient-to-b from-silver/60 to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PlanHero;
