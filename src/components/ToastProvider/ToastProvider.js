import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import useEscapeKey from "../useEscapeKey";

const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const resetToasts = useCallback(() => {
    setToasts([]);
  }, []);
  useEscapeKey(resetToasts);

  const addToast = useCallback(({ variant, message }) => {
    setToasts((current) => [
      ...current,
      {
        variant,
        message,
        id: crypto.randomUUID(),
      },
    ]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      toasts,
      addToast,
      dismissToast,
    }),
    [toasts, addToast, dismissToast]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export default ToastProvider;
