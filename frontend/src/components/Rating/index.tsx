import React, { useState, useCallback } from "react";
import { Star } from "lucide-react";
import { Variant } from "../../types/themes";

interface RatingProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  allowHalf?: boolean;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: Variant;
  label?: string;
  showValue?: boolean;
  required?: boolean;
  error?: string;
  className?: string;
  containerClassName?: string;
  valueClassName?: string;
}

const Rating: React.FC<RatingProps> = ({
  value = 0,
  onChange,
  max = 5,
  allowHalf = false,
  readOnly = false,
  size = "md",
  variant = "primary",
  label,
  showValue = false,
  required = false,
  error,
  className = "",
  containerClassName = "",
  valueClassName = "",
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const variants: Record<Variant, string> = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    success: "text-success",
    error: "text-error",
    warning: "text-warning",
    transparent: "text-primary",
    background: "text-primary",
  };

  const sizes = {
    sm: {
      star: 16,
      container: "text-sm gap-1",
    },
    md: {
      star: 20,
      container: "text-base gap-1.5",
    },
    lg: {
      star: 24,
      container: "text-lg gap-2",
    },
    xl: {
      star: 32,
      container: "text-xl gap-2.5",
    },
  };

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>, index: number) => {
      if (readOnly) return;

      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const percent = x / rect.width;

      let newValue = index + 1;

      if (allowHalf) {
        newValue = percent <= 0.5 ? index + 0.5 : index + 1;
      }

      setHoverValue(Math.min(newValue, max));
    },
    [allowHalf, max, readOnly]
  );

  const handleMouseLeave = () => {
    setHoverValue(null);
    setIsHovering(false);
  };

  const handleClick = (value: number) => {
    if (!readOnly && onChange) {
      onChange(value);
    }
  };

  const renderStar = (index: number) => {
    const displayValue = hoverValue !== null ? hoverValue : value;
    const filled = index + 1 <= displayValue;
    const half = allowHalf && index + 0.5 === displayValue;

    return (
      <div
        key={index}
        className={`
          relative
          cursor-${readOnly ? "default" : "pointer"}
          transition-transform
          duration-200
          ${!readOnly && "hover:scale-110"}
        `}
        onMouseMove={(e) => handleMouseMove(e, index)}
        onClick={() => handleClick(index + 1)}
      >
        <Star
          size={sizes[size].star}
          className={`
            transition-colors
            duration-200
            ${filled || half ? "text-white/20" : `${variants[variant]}/20`}
          `}
          strokeWidth={1.5}
        />
        <div
          className={`
            absolute
            inset-0
            overflow-hidden
            transition-all
            duration-200
          `}
          style={{
            width: half ? "50%" : filled ? "100%" : "0%",
          }}
        >
          <Star
            size={sizes[size].star}
            className={`
              ${variants[variant]}
              transition-colors
              duration-200
            `}
            fill="currentColor"
            strokeWidth={1.5}
          />
        </div>
      </div>
    );
  };

  const displayValue = hoverValue !== null ? hoverValue : value;

  return (
    <div className={`flex flex-col gap-1 ${containerClassName}`}>
      {label && (
        <label
          className={`
            text-sm font-medium
            ${error ? "text-error" : "text-foreground/80"}
          `}
        >
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}

      <div
        className={`
          inline-flex items-center
          ${sizes[size].container}
          ${className}
        `}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex gap-1">
          {Array.from({ length: max }).map((_, index) => renderStar(index))}
        </div>

        {showValue && (
          <span
            className={`
              ml-2
              transition-opacity
              duration-200
              text-foreground/80
              ${valueClassName}
              ${isHovering ? "opacity-100" : "opacity-70"}
            `}
          >
            {displayValue.toFixed(allowHalf ? 1 : 0)}
          </span>
        )}
      </div>

      {error && <span className="text-sm text-error">{error}</span>}
    </div>
  );
};

export default Rating;
