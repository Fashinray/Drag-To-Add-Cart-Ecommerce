import { TrendingUp, TrendingDown } from "lucide-react";
import type { MetricCard } from "@/lib/types";

export default function MetricCard({
  label,
  value,
  change,
  changeLabel,
}: MetricCard) {
  const isPositive = change >= 0;

  return (
    <div
      className="flex flex-col gap-3"
      style={{
        backgroundColor: "var(--color-surface-container-lowest)",
        border: "1px solid var(--color-surface-variant)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--spacing-lg)",
      }}
    >
      {/* Label */}
      <span
        style={{
          fontSize: "var(--text-label-md)",
          fontWeight: 500,
          color: "var(--color-on-surface-variant)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </span>

      {/* Value */}
      <span
        style={{
          fontSize: "var(--text-display-lg)",
          fontWeight: 700,
          color: "var(--color-on-surface)",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        {value}
      </span>

      {/* Change */}
      <div className="flex items-center gap-1">
        <div
          className="flex items-center gap-1"
          style={{
            padding: "2px 8px",
            borderRadius: "var(--radius-full)",
            backgroundColor: isPositive
              ? "var(--color-success-container)"
              : "var(--color-error-container)",
          }}
        >
          {isPositive ? (
            <TrendingUp
              size={12}
              style={{ color: "var(--color-success)" }}
            />
          ) : (
            <TrendingDown
              size={12}
              style={{ color: "var(--color-error)" }}
            />
          )}
          <span
            style={{
              fontSize: "var(--text-label-md)",
              fontWeight: 600,
              color: isPositive
                ? "var(--color-success)"
                : "var(--color-error)",
            }}
          >
            {isPositive ? "+" : ""}
            {change}%
          </span>
        </div>
        <span
          style={{
            fontSize: "var(--text-label-md)",
            color: "var(--color-on-surface-variant)",
          }}
        >
          {changeLabel}
        </span>
      </div>
    </div>
  );
}