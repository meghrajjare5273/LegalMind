"use client";

import { toast as sonnerToast } from "sonner";

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success" | "warning" | "info";
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function useToast() {
  const toast = ({
    title,
    description,
    variant = "default",
    duration,
    action,
  }: ToastOptions) => {
    const message = title || description || "";
    const desc = title && description ? description : undefined;

    const toastOptions = {
      description: desc,
      duration,
      action: action
        ? {
            label: action.label,
            onClick: action.onClick,
          }
        : undefined,
    };

    switch (variant) {
      case "destructive":
        return sonnerToast.error(message, toastOptions);
      case "success":
        return sonnerToast.success(message, toastOptions);
      case "warning":
        return sonnerToast.warning(message, toastOptions);
      case "info":
        return sonnerToast.info(message, toastOptions);
      default:
        return sonnerToast(message, toastOptions);
    }
  };

  return {
    toast,
    success: (message: string, options?: Omit<ToastOptions, "variant">) =>
      toast({ ...options, title: message, variant: "success" }),
    error: (message: string, options?: Omit<ToastOptions, "variant">) =>
      toast({ ...options, title: message, variant: "destructive" }),
    warning: (message: string, options?: Omit<ToastOptions, "variant">) =>
      toast({ ...options, title: message, variant: "warning" }),
    info: (message: string, options?: Omit<ToastOptions, "variant">) =>
      toast({ ...options, title: message, variant: "info" }),
    dismiss: (toastId?: string | number) => sonnerToast.dismiss(toastId),
  };
}
