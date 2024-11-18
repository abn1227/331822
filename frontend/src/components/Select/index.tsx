import {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import { createPortal } from "react-dom";
import { Variant } from "../../types/themes";
import { Check, X, ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  label?: string;
  error?: string;
  variant?: Variant;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  className?: string;
  containerClassName?: string;
  leftIcon?: React.ReactNode;
}

const Select = forwardRef<HTMLInputElement, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      label,
      error,
      variant = "primary",
      placeholder = "",
      disabled = false,
      required = false,
      multiple = false,
      searchable = false,
      className = "",
      containerClassName = "",
      leftIcon,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(
      ref,
      () => searchInputRef.current || document.createElement("input")
    );
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

    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase())
    );

    const selectedValues = multiple
      ? (value as string[]) || []
      : [value as string];

    // Calcular la posición del dropdown
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
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setSearch("");
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, searchable]);

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

    const handleOptionClick = (optionValue: string) => {
      if (multiple) {
        const newValue = selectedValues.includes(optionValue)
          ? selectedValues.filter((v) => v !== optionValue)
          : [...selectedValues, optionValue];
        onChange(newValue);
      } else {
        onChange(optionValue);
        setIsOpen(false);
      }
      if (searchable) setSearch("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setSearch("");
      }
    };

    const renderDropdown = () => {
      if (!isOpen) return null;

      return createPortal(
        <div
          className={`
            fixed z-[9999] 
            bg-background/50 backdrop-blur-md
            border border-white/20 
            rounded-sm shadow-lg 
            max-h-60 overflow-y-auto 
            overflow-x-hidden 
            dark:bg-black/10 
            dark:border-white/10
            transition-opacity duration-200 ease-in-out
            ${isOpen ? "opacity-100" : "opacity-0"}
          `}
          style={{
            top: `${dropdownStyle.top}px`,
            left: `${dropdownStyle.left}px`,
            width: `${dropdownStyle.width}px`,
          }}
          ref={dropdownRef}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`
                  flex items-center gap-2 px-4 py-2 cursor-pointer
                  hover:bg-white/10
                  transition-colors duration-150
                  text-ellipsis
                  overflow-hidden
                  ${selectedValues.includes(option.value) ? "bg-white/20" : ""}
                `}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOptionClick(option.value);
                }}
              >
                {multiple && (
                  <div
                    className={`
                      w-4 h-4 border rounded
                      flex items-center justify-center
                      transition-colors duration-150
                      ${
                        selectedValues.includes(option.value)
                          ? "bg-primary border-primary"
                          : "border-primary"
                      }
                    `}
                  >
                    {selectedValues.includes(option.value) && (
                      <Check size={16} className="text-white" />
                    )}
                  </div>
                )}
                <span className="text-ellipsis overflow-hidden text-nowrap">
                  {option.label}
                </span>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-foreground/50">
              No se encontraron opciones
            </div>
          )}
        </div>,
        document.body
      );
    };

    return (
      <div
        ref={containerRef}
        className={`relative ${containerClassName}`}
        onKeyDown={handleKeyDown}
      >
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
            {leftIcon && <span className="text-foreground/50">{leftIcon}</span>}

            {searchable && isOpen ? (
              <input
                ref={searchInputRef}
                type="text"
                className="w-full bg-transparent outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                placeholder="Buscar..."
              />
            ) : multiple ? (
              <div className="flex gap-1 py-1 overflow-hidden">
                {selectedValues.length > 0 ? (
                  selectedValues.map((val) => (
                    <span
                      key={val}
                      className="flex items-center gap-1 px-2 py-1 text-sm bg-accent/20 rounded text-ellipsis text-nowrap"
                    >
                      {options.find((opt) => opt.value === val)?.label}
                      <X
                        size={14}
                        className="cursor-pointer hover:text-error transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOptionClick(val);
                        }}
                      />
                    </span>
                  ))
                ) : (
                  <span className="text-foreground/50">{placeholder}</span>
                )}
              </div>
            ) : (
              <span className="text-foreground/80 text-ellipsis text-nowrap">
                {options.find((opt) => opt.value === value)?.label ||
                  placeholder}
              </span>
            )}

            <ChevronDown
              size={20}
              className={`
                ml-auto text-foreground/50
                transition-transform duration-200
                ${isOpen ? "transform rotate-180" : ""}
              `}
            />
          </div>
        </div>

        {renderDropdown()}

        {error && (
          <span className="mt-1 text-sm text-error block">{error}</span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
