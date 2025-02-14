import { cn } from "@/lib/utils";

interface AlertProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "error";
  className?: string;
}

export function Alert({ children, variant = "default", className }: AlertProps) {
  const variantClasses = {
    default: "bg-gray-100 border-gray-300 text-gray-900",
    success: "bg-green-100 border-green-300 text-green-900",
    error: "bg-red-100 border-red-300 text-red-900",
  };

  return (
    <div
      className={cn(
        "border p-4 rounded-lg shadow-md",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
}

export function AlertTitle({ children }: { children: React.ReactNode }) {
  return <h4 className="font-semibold text-lg">{children}</h4>;
}

export function AlertDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-sm mt-1">{children}</p>;
}
