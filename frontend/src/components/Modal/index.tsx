import { ReactNode, useEffect } from "react";
import { Variant, BlurLevel } from "../../types/themes";
import { X } from "lucide-react";

interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  variant?: Variant;
  blur?: BlurLevel;
  className?: string;
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  variant = "primary",
  blur = "md",
  className = "",
  showCloseButton = true,
  closeOnOutsideClick = true,
}: GlassModalProps) => {
  // Prevenir scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const variants: Record<Variant, string> = {
    primary: `bg-primary/70 text-contrast-foreground`,
    secondary: `bg-secondary/70 text-contrast-foreground`,
    accent: `bg-accent/70 text-accent-foreground`,
    error: `bg-error/70 text-error-foreground`,
    success: `bg-success/70 text-success-foreground`,
    warning: `bg-warning/70 text-warning-foreground`,
    transparent: "bg-transparent text-foreground",
    background: "bg-background text-foreground",
  };

  const blurLevels: Record<BlurLevel, string> = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50"
      onClick={handleBackdropClick}
    >
      <div
        className={`
          relative
          w-11/12
          max-w-lg
          rounded-sm
          ${variants[variant]}
          ${blurLevels[blur]}
          border
          border-white/20
          shadow-lg
          p-6
          ${className}
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-lg" />

        {title && (
          <div className="relative mb-4 text-lg font-semibold">{title}</div>
        )}

        {showCloseButton && (
          <button onClick={onClose} className="absolute top-4 right-4">
            <X size={20} />
          </button>
        )}

        <div className="relative">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
