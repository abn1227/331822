import { createContext } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id?: string;
  type: ToastType;
  message: string;
  title?: string;
  duration?: number;
}

interface ToastContextProps {
  addToast: (toast: Toast) => void;
  removeToast: (id: string) => void;
  toasts: Toast[];
}

export const ToastContext = createContext<ToastContextProps | null>(null);
