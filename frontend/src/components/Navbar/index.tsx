import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import ToggleLanguageButton from "../ToggleLanguageButton";
import { useTranslation } from "@/hooks";

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

interface NavbarProps {
  logo?: React.ReactNode;
  items?: NavItem[];
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  logo,
  items = [],
  className = "",
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Manejar el scroll para cambiar la opacidad
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { t } = useTranslation({
    ns: "navbar",
  });

  // Componente Dropdown para submenús
  const Dropdown: React.FC<{ item: NavItem }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative group">
        <button
          className="flex items-center gap-1 py-2 px-3 rounded-lg hover:bg-white/10 transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          {item.label}
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {item.children && (
          <div
            className={`
              absolute top-full right-0 mt-2
              min-w-[200px]
              bg-white/10 backdrop-blur-md
              border border-white/20
              rounded-lg shadow-lg
              transition-all origin-top-right
              ${
                isOpen
                  ? "scale-100 opacity-100"
                  : "scale-95 opacity-0 pointer-events-none"
              }
              dark:bg-black/10 dark:border-white/10
            `}
          >
            {item.children.map((child) => (
              <a
                key={child.href}
                href={child.href}
                className="block px-4 py-2 hover:bg-white/10 transition-all"
                onClick={() => setIsOpen(false)}
              >
                {child.label}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${scrolled ? "bg-primary/20" : "bg-primary/15"}
        backdrop-blur-md
        border-b border-white/10
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {logo || <span className="text-xl font-bold">Logo</span>}
          </div>

          {/* Navegación Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {items.map((item) =>
              item.children ? (
                <Dropdown key={item.label} item={item} />
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="py-2 px-3 rounded-lg hover:bg-white/10 transition-all hover:scale-105"
                >
                  {item.label}
                </a>
              )
            )}
          </div>

          {/* Controles derecha */}
          <div className="hidden md:flex items-center gap-4">
            {/* Toggle tema */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-white/10 transition-all"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <ToggleLanguageButton />
          </div>

          {/* Botón menú móvil */}
          <div className="md:hidden flex items-center gap-4">
            <ToggleLanguageButton />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition-all"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={`
          md:hidden
          transition-all duration-300 ease-in-out
          ${
            isMenuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }
          bg-white/5 backdrop-blur-md
        `}
      >
        <div className="px-4 py-3 space-y-1">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block py-2 px-3 rounded-lg hover:bg-white/10 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-white/10 transition-all"
          >
            {theme === "light"
              ? t("navbar:options.darkMode")
              : t("navbar:options.lightMode")}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
