import {
  ShoppingCart,
  Package,
  CreditCard,
  Star,
} from "lucide-react";
import { mockActivityItems } from "@/lib/data/mockData";
import type { ActivityItem } from "@/lib/types";

const iconMap: Record<ActivityItem["type"], React.ElementType> = {
  order:     ShoppingCart,
  inventory: Package,
  payment:   CreditCard,
  review:    Star,
};

const colorMap: Record<ActivityItem["type"], string> = {
  order:     "var(--color-primary-fixed)",
  inventory: "var(--color-warning-container)",
  payment:   "var(--color-success-container)",
  review:    "var(--color-secondary-container)",
};

const iconColorMap: Record<ActivityItem["type"], string> = {
  order:     "var(--color-primary)",
  inventory: "var(--color-warning)",
  payment:   "var(--color-success)",
  review:    "var(--color-secondary)",
};

export default function ActivityFeed() {
  return (
    <div
      style={{
        backgroundColor: "var(--color-surface-container-lowest)",
        border: "1px solid var(--color-surface-variant)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--spacing-lg)",
      }}
    >
      {/* Header */}
      <h2
        style={{
          fontSize: "var(--text-headline-sm)",
          fontWeight: 600,
          color: "var(--color-on-surface)",
          marginBottom: "var(--spacing-lg)",
        }}
      >
        Recent activity
      </h2>

      {/* Items */}
      <ul className="flex flex-col">
        {mockActivityItems.map((item, i) => {
          const Icon = iconMap[item.type];
          const isLast = i === mockActivityItems.length - 1;

          return (
            <li
              key={item.id}
              className="flex items-start gap-3"
              style={{
                paddingBottom: isLast ? 0 : "var(--spacing-md)",
                marginBottom: isLast ? 0 : "var(--spacing-md)",
                borderBottom: isLast
                  ? "none"
                  : "1px solid var(--color-surface-variant)",
              }}
            >
              {/* Icon */}
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: colorMap[item.type],
                  marginTop: "2px",
                }}
              >
                <Icon
                  size={16}
                  style={{ color: iconColorMap[item.type] }}
                />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p
                  style={{
                    fontSize: "var(--text-body-sm)",
                    color: "var(--color-on-surface)",
                    lineHeight: 1.4,
                  }}
                >
                  {item.message}
                </p>
                <p
                  style={{
                    fontSize: "var(--text-label-md)",
                    color: "var(--color-on-surface-variant)",
                    marginTop: "3px",
                  }}
                >
                  {item.time}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}