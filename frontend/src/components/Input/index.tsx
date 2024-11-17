import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { Variant } from "../../types/themes";

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: Variant;
  fullWidth?: boolean;
  helperText?: string;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, GlassInputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      variant = "primary",
      fullWidth = false,
      helperText,
      className = "",
      containerClassName = "",
      disabled = false,
      required = false,
      ...props
    },
    ref
  ) => {
    const variants: Record<Variant, string> = {
      primary: `
      border-primary/20
      focus:border-primary/50
      placeholder:text-primary-foreground/50
      hover:border-primary/50
    `,
      secondary: `
      border-secondary/20
      focus:border-secondary/50
      placeholder:text-secondary-foreground/50
      hover:border-secondary/50
    `,
      accent: `
      border-accent/20
      focus:border-accent/50
      placeholder:text-accent-foreground/50
      hover:border-accent/50
    `,
      success: `
      border-success/20
      focus:border-success/50
      placeholder:text-success-foreground/50
      hover:border-success/50
    `,
      error: `
      border-error/20
      focus:border-error/50
      placeholder:text-error-foreground/50
      hover:border-error/50
    `,
      warning: `
      border-warning/20
      focus:border-warning/50
      placeholder:text-warning-foreground/50
      hover:border-warning/50
    `,
      transparent: `
        border-transparent
        focus:border-primary/50
        placeholder:text-foreground/50
        hover:border-primary/50
    `,
      background: `
        border-background/20
        focus:border-background/50
        placeholder:text-foreground/50
        hover:border-background/50
    `,
    };

    const baseInputClasses = `
    w-full
    bg-white/10
    backdrop-blur-md
    border
    rounded-sm
    py-2
    px-4
    outline-none
    transition-all
    duration-200
    disabled:opacity-50
    disabled:cursor-not-allowed
    placeholder:opacity-50
    ${error ? "border-error/50" : variants[variant]}
  `;

    const containerClasses = `
    flex
    flex-col
    gap-1
    ${fullWidth ? "w-full" : "w-auto"}
    ${containerClassName}
  `;

    return (
      <div className={containerClasses}>
        {/* Label */}
        {label && (
          <label
            className={`
            text-sm 
            font-medium 
            ${error ? "text-error" : "text-foreground/80"}
            ${disabled ? "opacity-50" : ""}
          `}
          >
            {label} {required && <span className="text-error">*</span>}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            disabled={disabled}
            className={`
            ${baseInputClasses}
            ${leftIcon ? "pl-10" : ""}
            ${rightIcon ? "pr-10" : ""}
            ${className}
          `}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50">
              {rightIcon}
            </div>
          )}

          {/* Focus Ring Effect */}
          <div className="absolute inset-0 rounded-sm bg-white/5 opacity-0 transition-opacity duration-200 pointer-events-none peer-focus:opacity-100" />
        </div>

        {/* Helper Text or Error Message */}
        {(helperText || error) && (
          <span
            className={`
            text-sm 
            ${error ? "text-error" : "text-foreground/60"}
          `}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

export default Input;
