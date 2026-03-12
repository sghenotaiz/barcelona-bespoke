import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const WHATSAPP_URL = "https://wa.me/393494104470";

const FloatingWhatsApp = () => {
  const { t } = useLanguage();

  const handleClick = () => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "whatsapp_click", { source: "floating_button" });
    }
  };

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.8, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 left-8 z-50 flex items-center gap-3 px-6 py-3.5 shadow-lg font-body text-xs tracking-[0.15em] uppercase text-background transition-colors duration-300 bg-green-400"
      aria-label="WhatsApp">
      
      <svg viewBox="0 0 32 32" className="w-4 h-4 fill-current">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.744 3.054 9.378L1.056 31.2l6.06-1.94A15.924 15.924 0 0016.004 32C24.826 32 32 24.824 32 16.004 32 7.176 24.826 0 16.004 0zm9.31 22.616c-.39 1.1-1.932 2.012-3.172 2.278-.848.18-1.956.324-5.684-1.222-4.772-1.976-7.838-6.82-8.074-7.138-.228-.318-1.906-2.54-1.906-4.844s1.208-3.436 1.636-3.906c.39-.428.914-.608 1.216-.608.15 0 .284.008.406.014.428.018.642.044.924.716.354.842 1.216 2.96 1.32 3.178.106.218.21.512.064.822-.138.318-.258.458-.476.708-.218.25-.424.442-.642.71-.2.236-.422.488-.178.916.244.428 1.082 1.786 2.324 2.894 1.596 1.424 2.942 1.866 3.36 2.072.42.206.664.178.908-.106.252-.292 1.076-1.252 1.362-1.682.28-.428.566-.358.952-.214.39.138 2.468 1.164 2.89 1.376.42.214.702.318.806.5.1.178.1 1.044-.29 2.144z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
    </motion.a>);

};

export default FloatingWhatsApp;