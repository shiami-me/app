import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X } from "lucide-react";

interface ToastProps {
  title: string;
  description?: string;
  variant?: "default" | "success" | "error";
  onClose?: () => void;
}

export function Toast({ title, description, variant = "default", onClose }: ToastProps) {
  return (
    <Alert
      variant={variant}
      className="fixed top-4 right-4 w-96 animate-in slide-in-from-right duration-300"
    >
      <AlertTitle className="flex items-center justify-between">
        {title}
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-background/80"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
}