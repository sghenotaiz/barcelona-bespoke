import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const FloatingCTA = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/plan");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-silver px-6 py-3.5 shadow-lg font-body text-xs tracking-[0.15em] uppercase text-background hover:bg-silver-dark transition-colors duration-300"
      aria-label={t.floatingCta.label}
    >
      <MessageCircle size={16} />
      <span className="hidden sm:inline">{t.floatingCta.label}</span>
    </motion.button>
  );
};

export default FloatingCTA;
