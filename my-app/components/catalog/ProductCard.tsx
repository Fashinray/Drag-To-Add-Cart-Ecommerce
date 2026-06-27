"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Star } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { useCartStore } from "@/lib/store/cartStore";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: `${product.id}-default`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0]?.url ?? "",
      sku: product.sku,
    });
    openCart();
  };

  const isLowStock = product.stock > 0 && product.stock <= 10;
  const isOutOfStock = product.stock === 0;
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative flex flex-col card card-hover"
      style={{ overflow: "hidden" }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: "1 / 1",
          backgroundColor: "var(--color-surface-container)",
        }}
      >
        <Image
          src={product.images[0]?.url ?? ""}
          alt={product.images[0]?.alt ?? product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badges */}
        <div
          className="absolute top-2 left-2 flex flex-col gap-1"
        >
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

        {/* Quick add button — reveals on hover */}
        {!isOutOfStock && (
          <button
            onClick={handleQuickAdd}
            className="card-reveal-action absolute top-2 right-2 flex items-center justify-center rounded-full transition-all duration-200"
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "var(--color-surface-container-lowest)",
              border: "1px solid var(--color-surface-variant)",
              color: "var(--color-primary)",
              boxShadow: "var(--shadow-sm)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--color-primary-container)";
              e.currentTarget.style.color = "var(--color-on-primary)";
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
            <Plus size={16} />
          </button>
        )}
      </div>

      {/* Info */}
      <div
        className="flex flex-col gap-1"
        style={{ padding: "var(--spacing-md)" }}
      >
        {/* Category */}
        <span
          style={{
            fontSize: "var(--text-label-md)",
            color: "var(--color-on-surface-variant)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {product.category}
        </span>

        {/* Name */}
        <h3
          className="line-clamp-2"
          style={{
            fontSize: "var(--text-body-md)",
            fontWeight: 600,
            color: "var(--color-on-surface)",
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </h3>

        {/* SKU */}
        <span
          style={{
            fontSize: "var(--text-label-md)",
            color: "var(--color-outline)",
          }}
        >
          {product.sku}
        </span>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          <Star
            size={12}
            fill="var(--color-warning)"
            style={{ color: "var(--color-warning)" }}
          />
          <span
            style={{
              fontSize: "var(--text-label-md)",
              color: "var(--color-on-surface-variant)",
              fontWeight: 500,
            }}
          >
            {product.rating}
          </span>
          <span
            style={{
              fontSize: "var(--text-label-md)",
              color: "var(--color-outline)",
            }}
          >
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div
          className="flex items-baseline gap-2 mt-1"
        >
          <span
            style={{
              fontSize: "var(--text-headline-sm)",
              fontWeight: 700,
              color: "var(--color-on-surface)",
            }}
          >
            ${product.price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span
              style={{
                fontSize: "var(--text-body-sm)",
                color: "var(--color-outline)",
                textDecoration: "line-through",
              }}
            >
              ${product.compareAtPrice!.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}