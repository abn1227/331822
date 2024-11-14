import React, { ReactNode } from "react";
import { BlurLevel, Variant } from "../../types/themes";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  childrenClassName?: string;
  variant?: Variant;
  blur?: BlurLevel;
  // opacity?: string;
}

const Card: React.FC<GlassCardProps> = ({
  children,
  className = "",
  variant = "primary",
  blur = "md",
  childrenClassName = "",
}) => {
  // Configuración de variantes de color
  const variants: Record<Variant, string> = {
    primary: "bg-primary bg-opacity-30",
    secondary: "bg-secondary bg-opacity-30",
    accent: "bg-accent bg-opacity-30",
    error: "bg-error bg-opacity-30",
    success: "bg-success bg-opacity-30",
    warning: "bg-warning bg-opacity-30",
    transparent: "bg-transparent",
  };

  // Configuración de niveles de blur
  const blurLevels: Record<BlurLevel, string> = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
  };

  return (
    <div
      className={`
        relative rounded-xl 
        ${variants[variant]}
        ${blurLevels[blur]}
        border border-white/20
        shadow-lg
        p-6
        dark:border-white/10
        dark:shadow-black/40
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-xl" />
      <div className={`relative z-10 ${childrenClassName}`}>{children}</div>
    </div>
  );
};

export default Card;
