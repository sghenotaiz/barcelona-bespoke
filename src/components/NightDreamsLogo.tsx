import nightdreamsLogo from "@/assets/nightdreams-logo.jpeg";

interface NightDreamsLogoProps {
  size?: "sm" | "md" | "lg" | "hero";
  showIcon?: boolean;
}

const sizeClasses = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-4xl",
  hero: "text-6xl md:text-8xl lg:text-[8rem]"
};

const iconSizes = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-16 h-16",
  hero: "w-24 h-24 md:w-32 md:h-32"
};

const NightDreamsLogo = ({ size = "md", showIcon = true }: NightDreamsLogoProps) => {
  return (
    <div className="flex items-center gap-3">
      {showIcon &&
      <img
        src={nightdreamsLogo}
        alt="NightDreams Logo"
        className={`${iconSizes[size]} object-contain`} />

      }
      <span
        className={`${sizeClasses[size]} tracking-wider uppercase`}
        style={{
          fontFamily: "'Aldo the Apache', sans-serif",
          color: "hsl(0, 0%, 100%)",
        }}>
        NightDreams
      </span>
    </div>);

};

export default NightDreamsLogo;