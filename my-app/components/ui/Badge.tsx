import { cn } from "@/lib/utils";
import type { BadgeVariant } from "@/lib/types";

type BadgeProps = {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
};

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  default: {
    backgroundColor: "var(--color-surface-container)",
    color: "var(--color-on-surface-variant)",
  },
  primary: {
    backgroundColor: "var(--color-primary-fixed)",
    color: "var(--color-on-primary-fixed)",
  },
  success: {
    backgroundColor: "var(--color-success-container)",
    color: "var(--color-success)",
  },
  warning: {
    backgroundColor: "var(--color-warning-container)",
    color: "var(--color-warning)",
  },
  error: {
    backgroundColor: "var(--color-error-container)",
    color: "var(--color-on-error-container)",
  },
};

export default function Badge({
  variant = "default",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      style={variantStyles[variant]}
      className={cn(
        "inline-flex items-center px-2 py-0.5",
        "text-xs font-medium tracking-wide",
        "rounded-full whitespace-nowrap",
        className
      )}
    >
      {children}
    </span>
  );
}