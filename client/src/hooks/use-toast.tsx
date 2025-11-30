import { toast as sonnerToast } from 'sonner';

export type ToastActionElement = React.ReactNode;

export interface ToastProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export type Toast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type ToastType = 'default' | 'destructive';

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastType;
}

/**
 * Updated useToast hook to use Sonner (modern toast library)
 * Maintained for backward compatibility with existing code
 */
export function useToast() {
  const toast = (options: ToastOptions & { title?: string; description?: string; variant?: ToastType }) => {
    const { title, description, variant } = options;

    if (variant === 'destructive') {
      sonnerToast.error(title || 'Error', {
        description,
      });
    } else {
      sonnerToast.success(title || 'Success', {
        description,
      });
    }
  };

  const dismiss = (toastId?: string) => {
    if (toastId) {
      sonnerToast.dismiss(toastId);
    } else {
      sonnerToast.dismiss();
    }
  };

  return {
    toast,
    dismiss,
    toasts: [], // Sonner manages toasts internally
  };
}

export { sonnerToast as toast };
