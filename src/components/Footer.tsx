import { useLanguage } from "@/i18n/LanguageContext";
import NightDreamsLogo from "@/components/NightDreamsLogo";

const Footer = () => {
  const { t } = useLanguage();
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
  { key: "home", label: t.nav.home },
  { key: "about", label: t.nav.about },
  { key: "services", label: t.nav.services },
  { key: "experiences", label: t.nav.experiences },
  { key: "contact", label: t.nav.contact }];


  return (
    <footer className="border-t py-12 text-primary bg-black border-gold">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <NightDreamsLogo size="sm" showIcon={false} />
          </div>
          <div className="flex gap-8">
            {navItems.map((item) =>
            <button
              key={item.key}
              onClick={() => scrollTo(item.key)}
              className="font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-silver transition-colors">

                {item.label}
              </button>
            )}
          </div>
          <span className="font-body text-[10px] text-muted-foreground/50">
            {t.footer.copyright}
          </span>
        </div>
      </div>
    </footer>);

};

export default Footer;