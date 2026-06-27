"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import Chip from "@/components/ui/Chip";

const categories = [
  "All",
  "Peripherals",
  "Audio",
  "Displays",
  "Accessories",
  "Furniture",
];

const sortOptions = [
  { label: "Featured",   value: "featured" },
  { label: "Price: Low", value: "price-asc" },
  { label: "Price: High",value: "price-desc" },
  { label: "Top Rated",  value: "rating" },
];

type FilterBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  activeCategory: string;
  onCategoryChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  totalResults: number;
};

export default function FilterBar({
  search,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  totalResults,
}: FilterBarProps) {
  return (
    <div
      className="flex flex-col gap-4"
      style={{ marginBottom: "var(--spacing-lg)" }}
    >
      {/* Top row — search + sort */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--color-outline)" }}
          />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: "100%",
              height: "40px",
              paddingLeft: "36px",
              paddingRight: "var(--spacing-md)",
              backgroundColor: "var(--color-surface-container-lowest)",
              border: "1px solid var(--color-outline-variant)",
              borderRadius: "var(--radius-default)",
              fontSize: "var(--text-body-sm)",
              color: "var(--color-on-surface)",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) =>
              (e.target.style.borderColor = "var(--color-primary-container)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "var(--color-outline-variant)")
            }
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 shrink-0">
          <SlidersHorizontal
            size={16}
            style={{ color: "var(--color-on-surface-variant)" }}
          />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{
              height: "40px",
              paddingInline: "var(--spacing-sm)",
              backgroundColor: "var(--color-surface-container-lowest)",
              border: "1px solid var(--color-outline-variant)",
              borderRadius: "var(--radius-default)",
              fontSize: "var(--text-body-sm)",
              color: "var(--color-on-surface)",
              outline: "none",
              cursor: "pointer",
            }}
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bottom row — category chips + result count */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => onCategoryChange(cat)}
            />
          ))}
        </div>
        <span
          style={{
            fontSize: "var(--text-label-md)",
            color: "var(--color-on-surface-variant)",
            whiteSpace: "nowrap",
          }}
        >
          {totalResults} {totalResults === 1 ? "product" : "products"}
        </span>
      </div>
    </div>
  );
}