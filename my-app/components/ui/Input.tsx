import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type InputProps = {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, fullWidth = true, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div
        className={cn("flex flex-col gap-1", fullWidth ? "w-full" : "w-auto")}
      >
        {label && (
          <label
            htmlFor={inputId}
            style={{
              fontSize: "var(--text-label-md)",
              color: "var(--color-on-surface-variant)",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          style={
            {
              "--tw-ring-color": "var(--color-primary-container)",
              height: "44px",
              paddingInline: "var(--spacing-md)",
              backgroundColor: "var(--color-surface-container-lowest)",
              borderColor: error
                ? "var(--color-error)"
                : "var(--color-outline-variant)",
              borderRadius: "var(--radius-default)",
              fontSize: "var(--text-body-sm)",
              color: "var(--color-on-surface)",
            } as React.CSSProperties
          }
          className={cn(
            "w-full border outline-none transition-all duration-200",
            "focus:border-[var(--color-primary-container)]",
            "focus:ring-2 focus:ring-[var(--color-primary-container)]/20",
            "placeholder:text-[var(--color-outline)]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />

        {error && (
          <span
            style={{
              fontSize: "var(--text-label-md)",
              color: "var(--color-error)",
            }}
          >
            {error}
          </span>
        )}

        {hint && !error && (
          <span
            style={{
              fontSize: "var(--text-label-md)",
              color: "var(--color-on-surface-variant)",
            }}
          >
            {hint}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;