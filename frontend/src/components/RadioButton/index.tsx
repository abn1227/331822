import { forwardRef } from "react";
import { Variant } from "../../types/themes";

interface Option {
  value: string;
  label: string;
}

interface GlassRadioProps {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  name: string;
  label?: string;
  error?: string;
  variant?: Variant;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  containerClassName?: string;
}

const RadioButtons = forwardRef<HTMLInputElement, GlassRadioProps>(
  (
    {
      options,
      value,
      onChange,
      name,
      label,
      error,
      variant = "primary",
      disabled = false,
      required = false,
      className = "",
      containerClassName = "",
    },
    ref
  ) => {
    const variants: Record<Variant, string> = {
      primary: `border-primary/20 peer-checked:border-primary peer-checked:bg-primary/20`,
      secondary: `border-secondary/20 peer-checked:border-secondary peer-checked:bg-secondary/20`,
      accent: `border-accent/20 peer-checked:border-accent peer-checked:bg-accent/20`,
      success: `border-success/20 peer-checked:border-success peer-checked:bg-success/20`,
      error: `border-error/20 peer-checked:border-error peer-checked:bg-error/20`,
      warning: `border-warning/20 peer-checked:border-warning peer-checked:bg-warning/20`,
      transparent: `border-transparent peer-checked:border-primary peer-checked:bg-primary/20`,
      background: `border-background/20 peer-checked:border-background peer-checked:bg-background/20`,
    };

    return (
      <div className={`flex flex-col gap-2 ${containerClassName}`}>
        {label && (
          <label
            className={`
              text-sm font-medium
              ${error ? "text-error" : "text-foreground/80"}
              ${disabled ? "opacity-50" : ""}
            `}
          >
            {label} {required && <span className="text-error">*</span>}
          </label>
        )}

        <div className={`flex flex-col gap-3 ${className}`}>
          {options.map((option) => (
            <label
              key={option.value}
              className={`
                relative flex items-center gap-3 p-3
                bg-white/10 backdrop-blur-md
                border rounded-sm cursor-pointer
                ${error ? "border-error/50" : variants[variant]}
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                hover:bg-white/20
                transition-colors
              `}
            >
              <input
                ref={ref}
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                className="peer hidden"
              />
              <div
                className={`
                  w-4 h-4 rounded-full border-2
                  flex items-center justify-center
                  ${error ? "border-error" : `border-${variant}`}
                  peer-checked:bg-secondary/80
                `}
              >
                <div
                  className={`
                    w-2 h-2 rounded-full
                    peer-checked:bg-current
                    transform scale-0 peer-checked:scale-100
                    transition-transform
                  `}
                />
              </div>
              <span className="flex-1">{option.label}</span>
            </label>
          ))}
        </div>

        {error && <span className="mt-1 text-sm text-error">{error}</span>}
      </div>
    );
  }
);

export default RadioButtons;
