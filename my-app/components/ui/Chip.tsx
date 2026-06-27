import { cn } from "@/lib/utils";

type ChipProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function Chip({
  label,
  active = false,
  onClick,
  className,
}: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={
        active
          ? {
              backgroundColor: "var(--color-primary-fixed)",
              color: "var(--color-primary)",
              borderColor: "var(--color-primary)",
            }
          : {
              backgroundColor: "var(--color-surface-container-low)",
              color: "var(--color-on-surface-variant)",
              borderColor: "var(--color-outline-variant)",
            }
      }
      className={cn(
        "inline-flex items-center px-3 py-1",
        "text-xs font-medium",
        "border rounded-full",
        "transition-all duration-200",
        "hover:opacity-80 active:scale-95",
        "cursor-pointer whitespace-nowrap",
        className
      )}
    >
      {label}
    </button>
  );
}