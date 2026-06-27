"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, Shield, Truck, RotateCcw } from "lucide-react";
import { mockProducts } from "@/lib/data/mockData";
import ProductImages from "@/components/product/ProductImages";
import VariantPicker from "@/components/product/VariantPicker";
import AddToCart from "@/components/product/AddToCart";
import Badge from "@/components/ui/Badge";
import ProductCard from "@/components/catalog/ProductCard";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = mockProducts.find((p) => p.id === params.id);
  if (!product) notFound();

  const [selectedColor, setSelectedColor] = useState(
    product.variants.colors?.[0]?.value ?? ""
  );
  const [selectedSize, setSelectedSize] = useState(
    product.variants.sizes?.[0]?.value ?? ""
  );

  const selectedVariant = selectedColor || selectedSize || undefined;

  const related = mockProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(
        ((product.compareAtPrice! - product.price) /
          product.compareAtPrice!) *
          100
      )
    : 0;

  return (
    <main
      style={{
        maxWidth: "var(--spacing-container-max)",
        margin: "0 auto",
        padding: "var(--spacing-lg)",
      }}
    >
      {/* Breadcrumb */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 transition-colors duration-200"
        style={{
          fontSize: "var(--text-body-sm)",
          color: "var(--color-on-surface-variant)",
          marginBottom: "var(--spacing-lg)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--color-primary)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--color-on-surface-variant)")
        }
      >
        <ArrowLeft size={16} />
        Back to catalog
      </Link>

      {/* Product layout */}
      <div
        className="grid gap-12"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          marginBottom: "var(--spacing-xl)",
        }}
      >
        {/* Left — Images */}
        <ProductImages images={product.images} productName={product.name} />

        {/* Right — Info */}
        <div className="flex flex-col gap-6">
          {/* Category + badges */}
          <div className="flex items-center gap-2 flex-wrap">
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
            {product.featured && (
              <Badge variant="primary">Featured</Badge>
            )}
            {hasDiscount && (
              <Badge variant="error">−{discountPct}% off</Badge>
            )}
          </div>

          {/* Name */}
          <div>
            <h1
              style={{
                fontSize: "var(--text-headline-lg)",
                fontWeight: 600,
                color: "var(--color-on-surface)",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              {product.name}
            </h1>
            <p
              style={{
                fontSize: "var(--text-label-md)",
                color: "var(--color-outline)",
                marginTop: "4px",
              }}
            >
              SKU: {product.sku}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={
                    i < Math.floor(product.rating)
                      ? "var(--color-warning)"
                      : "transparent"
                  }
                  style={{
                    color: "var(--color-warning)",
                  }}
                />
              ))}
            </div>
            <span
              style={{
                fontSize: "var(--text-body-sm)",
                fontWeight: 600,
                color: "var(--color-on-surface)",
              }}
            >
              {product.rating}
            </span>
            <span
              style={{
                fontSize: "var(--text-body-sm)",
                color: "var(--color-on-surface-variant)",
              }}
            >
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span
              style={{
                fontSize: "var(--text-display-lg)",
                fontWeight: 700,
                color: "var(--color-on-surface)",
                letterSpacing: "-0.02em",
              }}
            >
              ${product.price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span
                style={{
                  fontSize: "var(--text-headline-sm)",
                  color: "var(--color-outline)",
                  textDecoration: "line-through",
                }}
              >
                ${product.compareAtPrice!.toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: "var(--text-body-md)",
              color: "var(--color-on-surface-variant)",
              lineHeight: 1.6,
              paddingBottom: "var(--spacing-md)",
              borderBottom: "1px solid var(--color-surface-variant)",
            }}
          >
            {product.description}
          </p>

          {/* Variants */}
          {product.variants.colors && (
            <VariantPicker
              label="Color"
              variants={product.variants.colors}
              selected={selectedColor}
              onSelect={setSelectedColor}
              type="color"
            />
          )}
          {product.variants.sizes && (
            <VariantPicker
              label="Size"
              variants={product.variants.sizes}
              selected={selectedSize}
              onSelect={setSelectedSize}
              type="size"
            />
          )}

          {/* Add to cart */}
          <AddToCart
            product={product}
            selectedVariant={selectedVariant}
          />

          {/* Trust badges */}
          <div
            className="grid grid-cols-3 gap-3"
            style={{
              paddingTop: "var(--spacing-md)",
              borderTop: "1px solid var(--color-surface-variant)",
            }}
          >
            {[
              { icon: Truck,    label: "Free shipping", sub: "Orders over $50" },
              { icon: Shield,   label: "2-year warranty", sub: "Full coverage" },
              { icon: RotateCcw,label: "30-day returns", sub: "No questions" },
            ].map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center gap-1"
                style={{ padding: "var(--spacing-sm)" }}
              >
                <Icon
                  size={20}
                  style={{ color: "var(--color-primary)" }}
                />
                <span
                  style={{
                    fontSize: "var(--text-label-md)",
                    fontWeight: 600,
                    color: "var(--color-on-surface)",
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontSize: "var(--text-label-md)",
                    color: "var(--color-on-surface-variant)",
                  }}
                >
                  {sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section>
          <div
            style={{
              borderTop: "1px solid var(--color-surface-variant)",
              paddingTop: "var(--spacing-xl)",
              marginBottom: "var(--spacing-lg)",
            }}
          >
            <h2
              style={{
                fontSize: "var(--text-headline-md)",
                fontWeight: 600,
                color: "var(--color-on-surface)",
              }}
            >
              Related products
            </h2>
          </div>
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns:
                "repeat(auto-fill, minmax(260px, 1fr))",
            }}
          >
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}