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
    primary: `bg-primary/50`,
    secondary: `bg-secondary/50`,
    accent: `bg-accent/50`,
    error: `bg-error/50`,
    success: `bg-success/50`,
    warning: `bg-warning/50`,
    transparent: "bg-transparent",
    background: "bg-background/50",
  };

  const titleBackgrounds: Record<Variant, string> = {
    primary: "bg-primary/60 text-contrast-foreground",
    secondary: "bg-secondary/60 text-contrast-foreground",
    accent: "bg-accent/60 text-accent-foreground",
    error: "bg-error/60 text-error-foreground",
    success: "bg-success/60 text-success-foreground",
    warning: "bg-warning/60 text-warning-foreground",
    transparent: "bg-transparent",
    background: "bg-background/60 text-primary-foreground",
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
        rounded-sm
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
      <div className="relative inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-sm" />
      {title && (
        <div
          className={`relative inset-0 ${titleBackgrounds[variant]} rounded-t-sm text-center h-10 p-2`}
        >
          {title}
        </div>
      )}
      <div className={`${childrenClassName} ${title ? "pt-6" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;
