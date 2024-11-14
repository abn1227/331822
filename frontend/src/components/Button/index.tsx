import React, { ReactNode, ButtonHTMLAttributes } from "react";
import { Variant, Size } from "../../types/themes";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
}

const Button: React.FC<GlassButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  type = "button",
  icon,
  loading = false,
  ...props
}) => {
  // Configuración de variantes de color
  const variants: Record<Variant, string> = {
    primary: `
      bg-primary/30 hover:bg-primary/40
      text-primary-foreground
      border-primary/20
      hover:border-primary/30
    `,
    secondary: `
      bg-secondary/30 hover:bg-secondary/40
      text-secondary-foreground
      border-secondary/20
      hover:border-secondary/30
    `,
    accent: `
      bg-accent/30 hover:bg-accent/40
      text-accent-foreground
      border-accent/20
      hover:border-accent/30
    `,
    success: `
      bg-success/30 hover:bg-success/40
      text-success-foreground
      border-success/20
      hover:border-success/30
    `,
    error: `
      bg-error/30 hover:bg-error/40
      text-error-foreground
      border-error/20
      hover:border-error/30
    `,
    warning: `
      bg-warning/30 hover:bg-warning/40
      text-warning-foreground
      border-warning/20
      hover:border-warning/30
    `,
    transparent: `
      bg-transparent
      text-primary-foreground
      border-primary/20
      hover:border-primary/30
    `,
  };

  // Configuración de tamaños
  const sizes: Record<Size, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed"
    : "active:scale-100";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative
        rounded-lg
        backdrop-blur-md
        border
        transition-all
        duration-200
        flex
        items-center
        justify-center
        gap-2
        font-medium
        shadow-lg
        hover:shadow-xl
        ${variants[variant]}
        ${sizes[size]}
        ${disabledStyles}
        dark:shadow-black/40
        ${className}
      `}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-lg pointer-events-none" />

      <div className="relative z-10 flex items-center gap-2">
        {loading ? (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : icon ? (
          <span className="w-5 h-5">{icon}</span>
        ) : null}
        {children}
      </div>

      <div className="absolute inset-0 rounded-lg bg-white/0 hover:bg-white/10 transition-colors duration-200 pointer-events-none" />
    </button>
  );
};

export default Button;
