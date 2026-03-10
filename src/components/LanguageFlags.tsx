import { useLanguage } from "@/i18n/LanguageContext";
import { type Language } from "@/i18n/translations";

const flags: {lang: Language;flag: string;label: string;}[] = [
{ lang: "it", flag: "🇮🇹", label: "Italiano" },
{ lang: "en", flag: "🇬🇧", label: "English" },
{ lang: "fr", flag: "🇫🇷", label: "Français" },
{ lang: "es", flag: "🇪🇸", label: "Español" }];


const LanguageFlags = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <section className="py-10 bg-background">
      <div className="flex items-center justify-center gap-6 md:gap-10 bg-black">
        {flags.map(({ lang, flag, label }) =>
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`flex flex-col items-center gap-2 transition-all duration-300 group ${
          language === lang ? "scale-110" : "opacity-60 hover:opacity-100"}`
          }>
          
            <span
            className={`text-4xl md:text-5xl transition-all duration-300 ${
            language === lang ?
            "drop-shadow-[0_0_12px_hsla(40,60%,60%,0.6)]" :
            "group-hover:drop-shadow-[0_0_8px_hsla(0,0%,75%,0.4)]"}`
            }>
            
              {flag}
            </span>
            <span
            className={`font-body text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${
            language === lang ?
            "text-silver" :
            "text-muted-foreground group-hover:text-silver"}`
            }>
            
              {label}
            </span>
            {language === lang &&
          <div className="w-6 h-0.5 bg-silver rounded-full" />
          }
          </button>
        )}
      </div>
    </section>);

};

export default LanguageFlags;