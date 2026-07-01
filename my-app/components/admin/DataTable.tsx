"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import { mockProducts } from "@/lib/data/mockData";
import type { Product, BadgeVariant } from "@/lib/types";

type SortKey = "name" | "price" | "stock" | "category";
type SortDir = "asc" | "desc";

function getStockBadge(stock: number): {
  label: string;
  variant: BadgeVariant;
} {
  if (stock === 0)  return { label: "Out of stock", variant: "error" };
  if (stock <= 10)  return { label: "Low stock",    variant: "warning" };
  return               { label: "In stock",       variant: "success" };
}

const PAGE_SIZE = 5;

export default function DataTable() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [sortKey, setSortKey]   = useState<SortKey>("name");
  const [sortDir, setSortDir]   = useState<SortDir>("asc");
  const [page, setPage]         = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Sort
  const sorted = [...products].sort((a, b) => {
    let comparison = 0;
    switch (sortKey) {
      case "name":     comparison = a.name.localeCompare(b.name);   break;
      case "price":    comparison = a.price - b.price;               break;
      case "stock":    comparison = a.stock - b.stock;               break;
      case "category": comparison = a.category.localeCompare(b.category); break;
    }
    return sortDir === "asc" ? comparison : -comparison;
  });

  // Paginate
  const totalPages  = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated   = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === paginated.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(paginated.map((p) => p.id)));
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col)
      return (
        <ArrowUpDown
          size={12}
          style={{ color: "var(--color-outline-variant)" }}
        />
      );
    return sortDir === "asc" ? (
      <ArrowUp size={12} style={{ color: "var(--color-primary)" }} />
    ) : (
      <ArrowDown size={12} style={{ color: "var(--color-primary)" }} />
    );
  };

  return (
    <div
      style={{
        backgroundColor: "var(--color-surface-container-lowest)",
        border: "1px solid var(--color-surface-variant)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
      }}
    >
      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div
          className="flex items-center justify-between"
          style={{
            padding: "var(--spacing-sm) var(--spacing-lg)",
            backgroundColor: "var(--color-primary-fixed)",
            borderBottom: "1px solid var(--color-outline-variant)",
          }}
        >
          <span
            style={{
              fontSize: "var(--text-body-sm)",
              fontWeight: 500,
              color: "var(--color-primary)",
            }}
          >
            {selected.size} item{selected.size > 1 ? "s" : ""} selected
          </span>
          <button
            onClick={() => {
              selected.forEach((id) => handleDelete(id));
              setSelected(new Set());
            }}
            className="flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-70"
            style={{
              fontSize: "var(--text-body-sm)",
              fontWeight: 500,
              color: "var(--color-error)",
            }}
          >
            <Trash2 size={14} />
            Delete selected
          </button>
        </div>
      )}

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          {/* Head */}
          <thead>
            <tr
              style={{
                backgroundColor: "var(--color-surface-container)",
                borderBottom: "1px solid var(--color-surface-variant)",
              }}
            >
              {/* Checkbox */}
              <th style={{ width: "48px", padding: "10px var(--spacing-md)" }}>
                <input
                  type="checkbox"
                  checked={
                    selected.size === paginated.length &&
                    paginated.length > 0
                  }
                  onChange={toggleAll}
                  style={{ cursor: "pointer", accentColor: "var(--color-primary-container)" }}
                />
              </th>

              {/* Product */}
              <th
                style={{
                  padding: "10px var(--spacing-md)",
                  textAlign: "left",
                }}
              >
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-70"
                  style={{
                    fontSize: "var(--text-label-md)",
                    fontWeight: 600,
                    color: "var(--color-on-surface-variant)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Product
                  <SortIcon col="name" />
                </button>
              </th>

              {/* Category */}
              <th
                style={{
                  padding: "10px var(--spacing-md)",
                  textAlign: "left",
                }}
              >
                <button
                  onClick={() => handleSort("category")}
                  className="flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-70"
                  style={{
                    fontSize: "var(--text-label-md)",
                    fontWeight: 600,
                    color: "var(--color-on-surface-variant)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Category
                  <SortIcon col="category" />
                </button>
              </th>

              {/* Price */}
              <th
                style={{
                  padding: "10px var(--spacing-md)",
                  textAlign: "left",
                }}
              >
                <button
                  onClick={() => handleSort("price")}
                  className="flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-70"
                  style={{
                    fontSize: "var(--text-label-md)",
                    fontWeight: 600,
                    color: "var(--color-on-surface-variant)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Price
                  <SortIcon col="price" />
                </button>
              </th>

              {/* Stock */}
              <th
                style={{
                  padding: "10px var(--spacing-md)",
                  textAlign: "left",
                }}
              >
                <button
                  onClick={() => handleSort("stock")}
                  className="flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-70"
                  style={{
                    fontSize: "var(--text-label-md)",
                    fontWeight: 600,
                    color: "var(--color-on-surface-variant)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Stock
                  <SortIcon col="stock" />
                </button>
              </th>

              {/* Status */}
              <th
                style={{
                  padding: "10px var(--spacing-md)",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontSize: "var(--text-label-md)",
                    fontWeight: 600,
                    color: "var(--color-on-surface-variant)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Status
                </span>
              </th>

              {/* Actions */}
              <th style={{ width: "80px" }} />
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {paginated.map((product, i) => {
              const { label, variant } = getStockBadge(product.stock);
              const isSelected = selected.has(product.id);
              const isLast = i === paginated.length - 1;

              return (
                <tr
                  key={product.id}
                  style={{
                    borderBottom: isLast
                      ? "none"
                      : "1px solid var(--color-surface-variant)",
                    backgroundColor: isSelected
                      ? "var(--color-primary-fixed)"
                      : "transparent",
                    transition: "background-color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected)
                      e.currentTarget.style.backgroundColor =
                        "var(--color-surface-container-low)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected)
                      e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {/* Checkbox */}
                  <td
                    style={{
                      padding: "var(--spacing-md)",
                      textAlign: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(product.id)}
                      style={{
                        cursor: "pointer",
                        accentColor: "var(--color-primary-container)",
                      }}
                    />
                  </td>

                  {/* Product */}
                  <td style={{ padding: "var(--spacing-md)" }}>
                    <div className="flex items-center gap-3">
                      <div
                        className="relative shrink-0 overflow-hidden"
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "var(--radius-md)",
                          border: "1px solid var(--color-surface-variant)",
                          backgroundColor: "var(--color-surface-container)",
                        }}
                      >
                        <Image
                          src={product.images[0]?.url ?? ""}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="44px"
                        />
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "var(--text-body-sm)",
                            fontWeight: 500,
                            color: "var(--color-on-surface)",
                          }}
                        >
                          {product.name}
                        </p>
                        <p
                          style={{
                            fontSize: "var(--text-label-md)",
                            color: "var(--color-outline)",
                          }}
                        >
                          {product.sku}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td style={{ padding: "var(--spacing-md)" }}>
                    <span
                      style={{
                        fontSize: "var(--text-body-sm)",
                        color: "var(--color-on-surface-variant)",
                      }}
                    >
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td style={{ padding: "var(--spacing-md)" }}>
                    <span
                      style={{
                        fontSize: "var(--text-body-sm)",
                        fontWeight: 600,
                        color: "var(--color-on-surface)",
                      }}
                    >
                      ${product.price.toFixed(2)}
                    </span>
                  </td>

                  {/* Stock */}
                  <td style={{ padding: "var(--spacing-md)" }}>
                    <span
                      style={{
                        fontSize: "var(--text-body-sm)",
                        color: "var(--color-on-surface)",
                        fontWeight: 500,
                      }}
                    >
                      {product.stock}
                    </span>
                  </td>

                  {/* Status badge */}
                  <td style={{ padding: "var(--spacing-md)" }}>
                    <Badge variant={variant}>{label}</Badge>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: "var(--spacing-md)" }}>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          router.push(`/admin/products/${product.id}`)
                        }
                        className="flex items-center justify-center p-1.5 rounded transition-colors duration-200"
                        style={{
                          color: "var(--color-on-surface-variant)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "var(--color-surface-container)";
                          e.currentTarget.style.color =
                            "var(--color-primary)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "transparent";
                          e.currentTarget.style.color =
                            "var(--color-on-surface-variant)";
                        }}
                        aria-label={`Edit ${product.name}`}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="flex items-center justify-center p-1.5 rounded transition-colors duration-200"
                        style={{
                          color: "var(--color-on-surface-variant)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "var(--color-error-container)";
                          e.currentTarget.style.color =
                            "var(--color-error)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "transparent";
                          e.currentTarget.style.color =
                            "var(--color-on-surface-variant)";
                        }}
                        aria-label={`Delete ${product.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        className="flex items-center justify-between"
        style={{
          padding: "var(--spacing-md) var(--spacing-lg)",
          borderTop: "1px solid var(--color-surface-variant)",
          backgroundColor: "var(--color-surface-container)",
        }}
      >
        <span
          style={{
            fontSize: "var(--text-label-md)",
            color: "var(--color-on-surface-variant)",
          }}
        >
          Showing {(page - 1) * PAGE_SIZE + 1}–
          {Math.min(page * PAGE_SIZE, sorted.length)} of {sorted.length}{" "}
          products
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center justify-center rounded transition-colors duration-200"
            style={{
              width: "32px",
              height: "32px",
              border: "1px solid var(--color-outline-variant)",
              backgroundColor: "var(--color-surface-container-lowest)",
              color:
                page === 1
                  ? "var(--color-outline-variant)"
                  : "var(--color-on-surface)",
              cursor: page === 1 ? "not-allowed" : "pointer",
            }}
            aria-label="Previous page"
          >
            <ChevronLeft size={14} />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "var(--radius-default)",
                border: "1px solid",
                borderColor:
                  page === i + 1
                    ? "var(--color-primary-container)"
                    : "var(--color-outline-variant)",
                backgroundColor:
                  page === i + 1
                    ? "var(--color-primary-container)"
                    : "var(--color-surface-container-lowest)",
                color:
                  page === i + 1
                    ? "var(--color-on-primary)"
                    : "var(--color-on-surface)",
                fontSize: "var(--text-body-sm)",
                fontWeight: page === i + 1 ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center justify-center rounded transition-colors duration-200"
            style={{
              width: "32px",
              height: "32px",
              border: "1px solid var(--color-outline-variant)",
              backgroundColor: "var(--color-surface-container-lowest)",
              color:
                page === totalPages
                  ? "var(--color-outline-variant)"
                  : "var(--color-on-surface)",
              cursor: page === totalPages ? "not-allowed" : "pointer",
            }}
            aria-label="Next page"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}