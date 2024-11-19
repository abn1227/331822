import React, { useState, useRef, useEffect } from "react";
import { Clock } from "lucide-react";
import { createPortal } from "react-dom";
import { Variant } from "../../types/themes";

interface TimePickerProps {
  value?: string;
  onChange: (time: string) => void;
  label?: string;
  error?: string;
  variant?: Variant;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  containerClassName?: string;
  format24h?: boolean;
  minuteStep?: number;
  minTime?: string;
  maxTime?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  label,
  error,
  variant = "primary",
  placeholder = "Seleccionar hora",
  disabled = false,
  required = false,
  className = "",
  containerClassName = "",
  format24h = true,
  minuteStep = 15,
  minTime,
  maxTime,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeListRef = useRef<HTMLDivElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState({
    top: 0,
    left: 0,
    width: 0,
    direction: "down" as "up" | "down",
  });

  const variants: Record<Variant, string> = {
    primary: `border-primary/20 focus:border-primary/50`,
    secondary: `border-secondary/20 focus:border-secondary/50`,
    accent: `border-accent/20 focus:border-accent/50`,
    success: `border-success/20 focus:border-success/50`,
    error: `border-error/20 focus:border-error/50`,
    warning: `border-warning/20 focus:border-warning/50`,
    transparent: `border-transparent focus:border-primary/50`,
    background: `border-background/20 focus:border-background/50`,
  };

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const direction =
        spaceBelow < 260 && spaceAbove > spaceBelow ? "up" : "down";

      setDropdownStyle({
        top:
          direction === "down"
            ? rect.bottom + window.scrollY
            : rect.top + window.scrollY - 260,
        left: rect.left + window.scrollX,
        width: rect.width,
        direction,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        timeListRef.current &&
        !timeListRef.current.contains(event.target as Node) &&
        !containerRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Manejar scroll de la página
  useEffect(() => {
    if (isOpen) {
      const handleScroll = () => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          setDropdownStyle((prev) => ({
            ...prev,
            top:
              prev.direction === "down"
                ? rect.bottom + window.scrollY
                : rect.top + window.scrollY - 260,
            left: rect.left + window.scrollX,
          }));
        }
      };

      window.addEventListener("scroll", handleScroll, true);
      return () => window.removeEventListener("scroll", handleScroll, true);
    }
  }, [isOpen]);

  const generateTimeSlots = () => {
    const slots = [];
    const totalMinutesInDay = 24 * 60;

    for (let minutes = 0; minutes < totalMinutesInDay; minutes += minuteStep) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;

      let timeString = "";
      if (format24h) {
        timeString = `${hours.toString().padStart(2, "0")}:${mins
          .toString()
          .padStart(2, "0")}`;
      } else {
        const period = hours < 12 ? "AM" : "PM";
        const displayHours = hours % 12 || 12;
        timeString = `${displayHours}:${mins
          .toString()
          .padStart(2, "0")} ${period}`;
      }

      if (isTimeWithinRange(timeString)) {
        slots.push(timeString);
      }
    }

    return slots;
  };

  const isTimeWithinRange = (timeString: string) => {
    if (!minTime && !maxTime) return true;

    const timeValue = format24h ? timeString : convertTo24Hour(timeString);
    if (minTime && timeValue < minTime) return false;
    if (maxTime && timeValue > maxTime) return false;

    return true;
  };

  const convertTo24Hour = (time12h: string) => {
    const [time, period] = time12h.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const handleTimeSelect = (time: string) => {
    onChange(time);
    setIsOpen(false);
  };

  const renderTimeList = () => {
    if (!isOpen) return null;

    const timeSlots = generateTimeSlots();

    return createPortal(
      <div
        ref={timeListRef}
        className={`
          fixed z-[9999]
          bg-background/50 backdrop-blur-md
          border border-white/20
          rounded-sm shadow-lg
          max-h-60 overflow-y-auto
          dark:bg-black/10 dark:border-white/10
          custom-scrollbar
          transition-opacity duration-200
          ${isOpen ? "opacity-100" : "opacity-0"}
        `}
        style={{
          top: `${dropdownStyle.top}px`,
          left: `${dropdownStyle.left}px`,
          width: `${dropdownStyle.width}px`,
        }}
      >
        <div className="py-1">
          {timeSlots.map((time) => (
            <div
              key={time}
              className={`
                px-4 py-2 cursor-pointer
                hover:bg-white/10
                transition-colors duration-150
                flex items-center gap-2
                ${value === time ? "bg-white/20" : ""}
              `}
              onClick={() => handleTimeSelect(time)}
            >
              <Clock size={16} className="text-foreground/50" />
              <span>{time}</span>
            </div>
          ))}
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div ref={containerRef} className={`relative ${containerClassName}`}>
      {label && (
        <label
          className={`
            block mb-1 text-sm font-medium
            ${error ? "text-error" : "text-foreground/80"}
            ${disabled ? "opacity-50" : ""}
          `}
        >
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}

      <div
        className={`
          relative
          bg-white/10
          backdrop-blur-md
          border
          rounded-sm
          ${error ? "border-error/50" : variants[variant]}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${className}
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="flex items-center min-h-[2.5rem] px-4 gap-2">
          <Clock size={20} className="text-foreground/50" />
          <span className="text-foreground/80">{value || placeholder}</span>
        </div>

        <div className="absolute inset-0 rounded-sm bg-white/5 opacity-0 transition-opacity duration-200 pointer-events-none peer-focus:opacity-100" />
      </div>

      {renderTimeList()}

      {error && <span className="mt-1 text-sm text-error block">{error}</span>}
    </div>
  );
};

export default TimePicker;
