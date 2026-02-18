import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const FloatingCTA = () => {
  const handleClick = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-gold px-6 py-3.5 shadow-lg font-body text-xs tracking-[0.15em] uppercase text-primary-foreground hover:bg-gold-dark transition-colors duration-300"
      aria-label="Request Concierge"
    >
      <MessageCircle size={16} />
      <span className="hidden sm:inline">Request Concierge</span>
    </motion.button>
  );
};

export default FloatingCTA;
