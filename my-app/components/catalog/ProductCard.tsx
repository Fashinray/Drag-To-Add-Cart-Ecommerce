"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Star, GripVertical } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import Badge from "@/components/ui/Badge";
import { useCartStore } from "@/lib/store/cartStore";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();

  // @dnd-kit draggable
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id:   product.id,
      data: { product },
      disabled: product.stock === 0,
    });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    opacity:   isDragging ? 0.4 : 1,
    cursor:    product.stock === 0 ? "default" : "grab",
    touchAction: "none",
    transition: isDragging ? "none" : "opacity 0.2s",
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id:        `${product.id}-${Date.now()}`,
      productId: product.id,
      name:      product.name,
      price:     product.price,
      quantity:  1,
      image:     product.images[0]?.url ?? "",
      sku:       product.sku,
    });
    openCart();
  };

  const isLowStock   = product.stock > 0 && product.stock <= 10;
  const isOutOfStock = product.stock === 0;
  const hasDiscount  = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPct  = hasDiscount
    ? Math.round(
        ((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100
      )
    : 0;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Link
        href={`/products/${product.id}`}
        className="group relative flex flex-col card card-hover"
        style={{
          overflow: "hidden",
          display:  "flex",
          // prevent link navigation while dragging
          pointerEvents: isDragging ? "none" : "auto",
        }}
      >
        {/* Image */}
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio:     "1 / 1",
            backgroundColor: "var(--color-surface-container)",
          }}
        >
          <Image
            src={product.images[0]?.url ?? ""}
            alt={product.images[0]?.alt ?? product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            draggable={false}
          />

          {/* Drag hint pill */}
          {!isOutOfStock && (
            <div
              className="card-reveal-action absolute top-2 left-2 flex items-center gap-1"
              style={{
                padding:         "3px 7px",
                backgroundColor: "var(--color-surface-container-lowest)",
                borderRadius:    "var(--radius-full)",
                border:          "1px solid var(--color-surface-variant)",
                boxShadow:       "var(--shadow-sm)",
              }}
            >
              <GripVertical
                size={12}
                style={{ color: "var(--color-on-surface-variant)" }}
              />
              <span
                style={{
                  fontSize:   "10px",
                  fontWeight: 500,
                  color:      "var(--color-on-surface-variant)",
                  whiteSpace: "nowrap",
                }}
              >
                Drag to cart
              </span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {product.featured && (
              <Badge variant="primary">Featured</Badge>
            )}
            {hasDiscount && (
              <Badge variant="error">−{discountPct}%</Badge>
            )}
            {isLowStock && !isOutOfStock && (
              <Badge variant="warning">Low stock</Badge>
            )}
            {isOutOfStock && (
              <Badge variant="default">Out of stock</Badge>
            )}
          </div>

          {/* Quick add */}
          {!isOutOfStock && (
            <button
              onClick={handleQuickAdd}
              className="card-reveal-action absolute bottom-2 right-2 flex items-center gap-1 rounded-full transition-all duration-200"
              style={{
                padding:         "6px 10px",
                backgroundColor: "var(--color-surface-container-lowest)",
                border:          "1px solid var(--color-surface-variant)",
                color:           "var(--color-primary)",
                boxShadow:       "var(--shadow-sm)",
                fontSize:        "11px",
                fontWeight:      500,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--color-primary-container)";
                e.currentTarget.style.color =
                  "var(--color-on-primary)";
                e.currentTarget.style.borderColor =
                  "var(--color-primary-container)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--color-surface-container-lowest)";
                e.currentTarget.style.color = "var(--color-primary)";
                e.currentTarget.style.borderColor =
                  "var(--color-surface-variant)";
              }}
              aria-label={`Quick add ${product.name} to cart`}
            >
              <Plus size={12} />
              Add
            </button>
          )}
        </div>

        {/* Info */}
        <div
          className="flex flex-col gap-1"
          style={{ padding: "var(--spacing-md)" }}
        >
          <span
            style={{
              fontSize:      "var(--text-label-md)",
              color:         "var(--color-on-surface-variant)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {product.category}
          </span>

          <h3
            className="line-clamp-2"
            style={{
              fontSize:   "var(--text-body-md)",
              fontWeight: 600,
              color:      "var(--color-on-surface)",
              lineHeight: 1.3,
            }}
          >
            {product.name}
          </h3>

          <span
            style={{
              fontSize: "var(--text-label-md)",
              color:    "var(--color-outline)",
            }}
          >
            {product.sku}
          </span>

          <div className="flex items-center gap-1 mt-1">
            <Star
              size={12}
              fill="var(--color-warning)"
              style={{ color: "var(--color-warning)" }}
            />
            <span
              style={{
                fontSize:   "var(--text-label-md)",
                color:      "var(--color-on-surface-variant)",
                fontWeight: 500,
              }}
            >
              {product.rating}
            </span>
            <span
              style={{
                fontSize: "var(--text-label-md)",
                color:    "var(--color-outline)",
              }}
            >
              ({product.reviewCount})
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <span
              style={{
                fontSize:   "var(--text-headline-sm)",
                fontWeight: 700,
                color:      "var(--color-on-surface)",
              }}
            >
              ${product.price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span
                style={{
                  fontSize:       "var(--text-body-sm)",
                  color:          "var(--color-outline)",
                  textDecoration: "line-through",
                }}
              >
                ${product.compareAtPrice!.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}