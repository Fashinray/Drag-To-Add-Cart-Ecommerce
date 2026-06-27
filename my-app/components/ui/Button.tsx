import { cn } from "@/lib/utils";
import type { ButtonVariant, ButtonSize } from "@/lib/types";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "text-white font-semibold",
    "border border-transparent",
  ].join(" "),
  secondary: [
    "bg-transparent font-medium",
    "border",
  ].join(" "),
  ghost: [
    "bg-transparent border border-transparent font-medium",
  ].join(" "),
  danger: [
    "text-white font-semibold",
    "border border-transparent",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8  px-3 text-xs  gap-1.5",
  md: "h-10 px-4 text-sm  gap-2",
  lg: "h-12 px-6 text-base gap-2",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  type = "button",
  onClick,
  children,
  className,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      style={
        variant === "primary"
          ? { backgroundColor: "var(--color-primary-container)" }
          : variant === "secondary"
          ? {
              borderColor: "var(--color-outline-variant)",
              color: "var(--color-on-surface)",
            }
          : variant === "ghost"
          ? { color: "var(--color-primary)" }
          : variant === "danger"
          ? { backgroundColor: "var(--color-error)" }
          : {}
      }
      className={cn(
        "inline-flex items-center justify-center",
        "rounded transition-all duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "active:scale-95",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className
      )}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}