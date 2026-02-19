import nightdreamsLogo from "@/assets/nightdreams-logo.jpeg";

interface NightDreamsLogoProps {
  size?: "sm" | "md" | "lg" | "hero";
  showIcon?: boolean;
}

const sizeClasses = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-4xl",
  hero: "text-6xl md:text-8xl lg:text-9xl",
};

const iconSizes = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-16 h-16",
  hero: "w-24 h-24 md:w-32 md:h-32",
};

const NightDreamsLogo = ({ size = "md", showIcon = true }: NightDreamsLogoProps) => {
  return (
    <div className="flex items-center gap-3">
      {showIcon && (
        <img
          src={nightdreamsLogo}
          alt="NightDreams Logo"
          className={`${iconSizes[size]} object-contain`}
        />
      )}
      <span
        className={`font-logo ${sizeClasses[size]} tracking-wider`}
        style={{
          WebkitTextStroke: "1px hsla(0, 0%, 0%, 0.6)",
          paintOrder: "stroke fill",
        }}
      >
        <span className="text-gold-gradient" style={{ WebkitTextStroke: "1px hsla(0, 0%, 0%, 0.4)" }}>N</span>
        <span className="text-primary-foreground">ight</span>
        <span className="text-gold-gradient" style={{ WebkitTextStroke: "1px hsla(0, 0%, 0%, 0.4)" }}>D</span>
        <span className="text-primary-foreground">reams</span>
      </span>
    </div>
  );
};

export default NightDreamsLogo;
