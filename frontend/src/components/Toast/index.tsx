import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AlertCircle, CheckCircle2, Info, XCircle, X } from "lucide-react";
import { Toast as ToastType } from "@/contexts/ToastContext";
import { useToast } from "@/hooks";

const variants = {
  success: {
    icon: CheckCircle2,
    class: "border-success/20 bg-success/10",
    iconClass: "text-success",
  },
  error: {
    icon: XCircle,
    class: "border-error/20 bg-error/10",
    iconClass: "text-error",
  },
  warning: {
    icon: AlertCircle,
    class: "border-warning/20 bg-warning/10",
    iconClass: "text-warning",
  },
  info: {
    icon: Info,
    class: "border-primary/20 bg-primary/10",
    iconClass: "text-primary",
  },
};

interface ToastProps {
  toast: ToastType;
  onRemove: () => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (isLeaving) {
      const timer = setTimeout(() => {
        onRemove();
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isLeaving, onRemove]);

  const handleRemove = () => {
    setIsLeaving(true);
  };

  const Icon = variants[toast.type].icon;

  return (
    <div
      className={`
        relative
        flex
        items-start
        gap-3
        p-4
        rounded-sm
        border
        backdrop-blur-md
        shadow-lg
        min-w-[320px]
        max-w-[420px]
        transition-all
        duration-200
        ${variants[toast.type].class}
        ${isLeaving ? "opacity-0 translate-x-full" : "opacity-100"}
      `}
      role="alert"
    >
      <Icon className={`w-5 h-5 mt-0.5 ${variants[toast.type].iconClass}`} />

      <div className="flex-1">
        {toast.title && <h6 className="font-medium mb-1">{toast.title}</h6>}
        <p className="text-sm text-foreground/80">{toast.message}</p>
      </div>

      <button
        onClick={handleRemove}
        className="p-1 rounded-sm hover:bg-white/10 transition-colors"
      >
        <X size={16} />
      </button>

      {/* Progress bar */}
      <div
        className={`
          absolute
          bottom-0
          left-0
          h-0.5
          bg-white/20
          transition-all
          duration-200
        `}
        style={{
          width: "100%",
          animation: `progress ${toast.duration}ms linear`,
        }}
      />
    </div>
  );
};

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return createPortal(
    <div
      className="
        fixed
        top-4
        right-4
        z-[9999]
        flex
        flex-col
        gap-2
      "
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onRemove={() => removeToast(toast.id || "")}
        />
      ))}
    </div>,
    document.body
  );
};

export default ToastContainer;

// Agregar esto a tu CSS global o en tu archivo de estilos
const style = `
@keyframes progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
`;

const styleElement = document.createElement("style");
styleElement.textContent = style;
document.head.appendChild(styleElement);
