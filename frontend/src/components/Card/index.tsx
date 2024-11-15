import React, { ReactNode } from "react";
import { BlurLevel, Variant } from "../../types/themes";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  childrenClassName?: string;
  variant?: Variant;
  blur?: BlurLevel;
  opacity?: string;
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
    primary: `bg-primary/30`,
    secondary: `bg-secondary/30`,
    accent: `bg-accent/30`,
    error: `bg-error/30`,
    success: `bg-success/30`,
    warning: `bg-warning/30`,
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
        relative rounded-2xl
        ${variants[variant]}
        ${blurLevels[blur]}
        border border-white/20 hover:border-white/30
        shadow-lg
        p-6
        dark:border-white/10
        dark:shadow-black/40
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl" />
      <div className={`relative z-10 ${childrenClassName}`}>{children}</div>
    </div>
  );
};

export default Card;
