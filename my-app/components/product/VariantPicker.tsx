"use client";

import { cn } from "@/lib/utils";
import type { ProductVariant } from "@/lib/types";

type VariantPickerProps = {
  label: string;
  variants: ProductVariant[];
  selected: string;
  onSelect: (value: string) => void;
  type?: "color" | "size";
};

export default function VariantPicker({
  label,
  variants,
  selected,
  onSelect,
  type = "size",
}: VariantPickerProps) {
  return (
    <div className="flex flex-col gap-2">
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
        {selected && (
          <span
            style={{
              color: "var(--color-on-surface)",
              textTransform: "none",
              letterSpacing: "normal",
              marginLeft: "8px",
            }}
          >
            {variants.find((v) => v.value === selected)?.label}
          </span>
        )}
      </span>

      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isSelected = selected === variant.value;
          const isDisabled = !variant.inStock;

          if (type === "color") {
            return (
              <button
                key={variant.id}
                onClick={() => !isDisabled && onSelect(variant.value)}
                disabled={isDisabled}
                title={variant.label}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: variant.value,
                  border: isSelected
                    ? "2px solid var(--color-primary-container)"
                    : "2px solid var(--color-surface-variant)",
                  outline: isSelected
                    ? "2px solid var(--color-primary-container)"
                    : "none",
                  outlineOffset: "2px",
                  cursor: isDisabled ? "not-allowed" : "pointer",
                  opacity: isDisabled ? 0.4 : 1,
                  transition: "all 0.15s",
                  position: "relative",
                  flexShrink: 0,
                }}
                aria-label={`${variant.label}${isDisabled ? " (out of stock)" : ""}`}
              />
            );
          }

          return (
            <button
              key={variant.id}
              onClick={() => !isDisabled && onSelect(variant.value)}
              disabled={isDisabled}
              style={{
                height: "36px",
                paddingInline: "var(--spacing-md)",
                borderRadius: "var(--radius-default)",
                border: isSelected
                  ? "2px solid var(--color-primary-container)"
                  : "1px solid var(--color-outline-variant)",
                backgroundColor: isSelected
                  ? "var(--color-primary-fixed)"
                  : "var(--color-surface-container-lowest)",
                color: isSelected
                  ? "var(--color-primary)"
                  : isDisabled
                  ? "var(--color-outline)"
                  : "var(--color-on-surface)",
                fontSize: "var(--text-body-sm)",
                fontWeight: isSelected ? 600 : 400,
                cursor: isDisabled ? "not-allowed" : "pointer",
                opacity: isDisabled ? 0.5 : 1,
                transition: "all 0.15s",
                textDecoration: isDisabled ? "line-through" : "none",
              }}
              aria-label={`${variant.label}${isDisabled ? " (out of stock)" : ""}`}
            >
              {variant.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}