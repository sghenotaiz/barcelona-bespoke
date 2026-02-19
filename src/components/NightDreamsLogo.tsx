import nightdreamsLogo from "@/assets/nightdreams-logo.jpeg";

interface NightDreamsLogoProps {
  size?: "sm" | "md" | "lg" | "hero";
  showIcon?: boolean;
}

const sizeClasses = {
  sm: "text-2xl",
  md: "text-3xl",
  lg: "text-5xl",
  hero: "text-7xl md:text-9xl lg:text-[10rem]",
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
        className={`font-logo ${sizeClasses[size]} italic tracking-wider`}
        style={{
          WebkitTextStroke: "1px hsla(0, 0%, 0%, 0.8)",
          paintOrder: "stroke fill",
        }}
      >
        <span className="text-black" style={{ WebkitTextFillColor: "#000000", WebkitTextStroke: "1px hsla(0, 0%, 0%, 0.9)" }}>N</span>
        <span className="text-primary-foreground" style={{ WebkitTextFillColor: "#FFFFFF" }}>ight</span>
        <span className="text-black" style={{ WebkitTextFillColor: "#000000", WebkitTextStroke: "1px hsla(0, 0%, 0%, 0.9)" }}>D</span>
        <span className="text-primary-foreground" style={{ WebkitTextFillColor: "#FFFFFF" }}>reams</span>
      </span>
    </div>
  );
};

export default NightDreamsLogo;
