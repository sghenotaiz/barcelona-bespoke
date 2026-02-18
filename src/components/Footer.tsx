const Footer = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-navy border-t border-primary-foreground/10 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-display text-lg tracking-wider text-primary-foreground">CONCIERGING</span>
            <span className="text-[9px] font-body tracking-[0.4em] uppercase text-gold-light ml-2">Barcelona</span>
          </div>

          <div className="flex gap-8">
            {["Home", "About", "Services", "Experiences", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="font-body text-[10px] tracking-[0.15em] uppercase text-primary-foreground/50 hover:text-gold transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          <span className="font-body text-[10px] text-primary-foreground/30">
            © 2025 Concierging Barcelona
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
