import { motion, AnimatePresence } from "framer-motion";
import nightdreamsLogo from "@/assets/nightdreams-logo.jpeg";

interface CinematicIntroProps {
  visible: boolean;
  onDismiss: () => void;
}

const CinematicIntro = ({ visible, onDismiss }: CinematicIntroProps) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cinematic-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center cursor-pointer"
          style={{ backgroundColor: "hsl(0, 0%, 0%)" }}
          onClick={onDismiss}
          onWheel={onDismiss}
          onTouchMove={onDismiss}
        >
          {/* Subtle radial glow behind logo */}
          <div
            className="absolute w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, hsl(40, 50%, 50%) 0%, transparent 70%)",
            }}
          />

          {/* Logo */}
          <motion.img
            src={nightdreamsLogo}
            alt="NightDreams Logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="w-32 h-32 md:w-44 md:h-44 object-contain mb-8 relative z-10"
          />

          {/* Title in Aldo the Apache */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative z-10 text-5xl md:text-7xl lg:text-8xl tracking-wider uppercase text-center"
            style={{
              fontFamily: "'Aldo the Apache', sans-serif",
              color: "hsl(0, 0%, 100%)",
              textShadow:
                "0 0 20px hsla(40, 60%, 60%, 0.6), 0 0 60px hsla(40, 60%, 50%, 0.3), 0 0 120px hsla(40, 60%, 50%, 0.15)",
            }}
          >
            NightDreams
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="relative z-10 mt-4 font-body text-xs tracking-[0.4em] uppercase"
            style={{ color: "hsl(0, 0%, 60%)" }}
          >
            Barcelona VIP Concierge
          </motion.p>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ duration: 2.5, delay: 2, repeat: Infinity }}
            className="absolute bottom-12 flex flex-col items-center gap-2 z-10"
          >
            <span
              className="font-body text-[10px] tracking-[0.3em] uppercase"
              style={{ color: "hsl(0, 0%, 45%)" }}
            >
              Click or scroll to enter
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-8"
              style={{
                background:
                  "linear-gradient(to bottom, hsl(0, 0%, 45%), transparent)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicIntro;
