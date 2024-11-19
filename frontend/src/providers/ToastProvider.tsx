import { Toast, ToastContext } from "@/contexts/ToastContext";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    ({ type, message, title, duration = 3000 }: Omit<Toast, "id">) => {
      const id = uuidv4();

      const toast = {
        id,
        type,
        message,
        title,
        duration,
      };

      setToasts((state) => [...state, toast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((state) => state.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
