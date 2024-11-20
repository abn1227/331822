import { ToastContext } from "@/contexts/ToastContext";
import { useContext } from "react";

const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};

export default useToast;