import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import NightDreamsLogo from "@/components/NightDreamsLogo";

const Footer = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const navItems = [
    { label: t.nav.home, path: "/" },
    { label: t.nav.services, path: "/services" },
    { label: t.nav.about, path: "/about" },
    { label: t.nav.experiences, path: "/moments" },
    { label: t.nav.bookNow, path: "/plan" },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t py-12 text-primary bg-black border-gold">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <NightDreamsLogo size="sm" showIcon={false} />
          </div>
          <div className="flex gap-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className="font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-silver transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
          <span className="font-body text-[10px] text-muted-foreground/50">
            {t.footer.copyright}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
