import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const TikTokIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.7a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.13z" />
  </svg>
);

const INSTAGRAM_URL = "https://www.instagram.com/nightdreamsofficial_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
const TIKTOK_URL = "https://www.tiktok.com/@nightdreams_bcn?_r=1&_t=ZN-94a07YEAkcQ";

const FloatingSocials = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.2, duration: 0.5 }}
      className="fixed bottom-24 right-6 z-40 flex sm:flex-row flex-col items-center gap-2 px-3 py-2.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 shadow-lg shadow-black/40"
    >
      <motion.a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        className="text-muted-foreground hover:text-silver hover:drop-shadow-[0_0_10px_hsl(0,0%,70%)] transition-all duration-300 p-1.5"
        title="Follow @nightdreamsofficial_"
      >
        <Instagram size={18} />
      </motion.a>
      <motion.a
        href={TIKTOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        className="text-muted-foreground hover:text-silver hover:drop-shadow-[0_0_10px_hsl(0,0%,70%)] transition-all duration-300 p-1.5"
        title="Follow @nightdreams_bcn"
      >
        <TikTokIcon size={18} />
      </motion.a>
    </motion.div>
  );
};

export default FloatingSocials;
