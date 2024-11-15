import React, { ReactNode } from "react";
import { BlurLevel, Variant } from "../../types/themes";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  childrenClassName?: string;
  variant?: Variant;
  blur?: BlurLevel;
  opacity?: string;
  title?: string;
}

const Card: React.FC<GlassCardProps> = ({
  children,
  className = "",
  variant = "primary",
  blur = "md",
  childrenClassName = "",
  title,
}) => {
  // Configuración de variantes de color
  const variants: Record<Variant, string> = {
    primary: `bg-primary/20`,
    secondary: `bg-secondary/20`,
    accent: `bg-accent/20`,
    error: `bg-error/20`,
    success: `bg-success/20`,
    warning: `bg-warning/20`,
    transparent: "bg-transparent",
  };

  const titleBackgrounds: Record<Variant, string> = {
    primary: "bg-primary/60",
    secondary: "bg-secondary/60",
    accent: "bg-accent/60",
    error: "bg-error/60",
    success: "bg-success/60",
    warning: "bg-warning/60",
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
      {title && (
        <div
          className={`absolute inset-0 ${titleBackgrounds[variant]} rounded-t-2xl text-center h-10 p-2`}
        >
          {title}
        </div>
      )}
      <div
        className={`relative z-10 ${childrenClassName} ${title ? "pt-6" : ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
