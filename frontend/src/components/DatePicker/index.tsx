import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { createPortal } from "react-dom";
import { Variant } from "../../types/themes";

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  label?: string;
  error?: string;
  variant?: Variant;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  containerClassName?: string;
  minDate?: Date;
  maxDate?: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  error,
  variant = "primary",
  placeholder = "Seleccionar fecha",
  disabled = false,
  required = false,
  className = "",
  containerClassName = "",
  minDate,
  maxDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(value || new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState({
    top: 0,
    left: 0,
    width: 0,
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
      setDropdownStyle({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        !containerRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    if (minDate && newDate < minDate) return;
    if (maxDate && newDate > maxDate) return;
    onChange(newDate);
    setIsOpen(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const renderCalendar = () => {
    if (!isOpen) return null;

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Días del mes anterior
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-center p-2" />);
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const isDisabled =
        (minDate && date < minDate) || (maxDate && date > maxDate);
      const isSelected =
        value &&
        date.getDate() === value.getDate() &&
        date.getMonth() === value.getMonth() &&
        date.getFullYear() === value.getFullYear();

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          disabled={isDisabled}
          className={`
            text-center p-2 rounded-sm
            hover:bg-white/10
            transition-colors duration-150
            ${isSelected ? "bg-accent/20" : ""}
            ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          {day}
        </button>
      );
    }

    return createPortal(
      <div
        ref={calendarRef}
        className="fixed z-[9999] bg-background/50 backdrop-blur-md border border-white/20 rounded-sm shadow-lg dark:bg-black/10 dark:border-white/10"
        style={{
          top: `${dropdownStyle.top}px`,
          left: `${dropdownStyle.left}px`,
          width: `${dropdownStyle.width}px`,
        }}
      >
        <div className="p-4">
          {/* Header del calendario */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevMonth}
              className="p-1 hover:bg-white/10 rounded-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="font-medium">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1 hover:bg-white/10 rounded-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Días de la semana */}
          <div className="grid grid-cols-7 mb-2">
            {["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"].map((day) => (
              <div
                key={day}
                className="text-center text-sm text-foreground/50 p-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Días del mes */}
          <div className="grid grid-cols-7">{days}</div>
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
          <Calendar size={20} className="text-foreground/50" />
          <span className="text-foreground/80">
            {value ? formatDate(value) : placeholder}
          </span>
        </div>
      </div>

      {renderCalendar()}

      {error && <span className="mt-1 text-sm text-error block">{error}</span>}
    </div>
  );
};

export default DatePicker;
