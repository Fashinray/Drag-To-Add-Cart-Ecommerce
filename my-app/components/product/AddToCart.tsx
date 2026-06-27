"use client";

import { useState } from "react";
import { ShoppingBag, Minus, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/lib/store/cartStore";
import type { Product } from "@/lib/types";

type AddToCartProps = {
  product: Product;
  selectedVariant?: string;
};

export default function AddToCart({
  product,
  selectedVariant,
}: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCartStore();

  const handleAdd = () => {
    addItem({
      id: `${product.id}-${selectedVariant ?? "default"}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0]?.url ?? "",
      sku: product.sku,
      variant: selectedVariant,
    });
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  const isOutOfStock = product.stock === 0;

  return (
    <div className="flex flex-col gap-3">
      {/* Quantity selector */}
      <div className="flex items-center gap-3">
        <span
          style={{
            fontSize: "var(--text-label-md)",
            fontWeight: 500,
            color: "var(--color-on-surface-variant)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Quantity
        </span>
        <div
          className="flex items-center"
          style={{
            border: "1px solid var(--color-outline-variant)",
            borderRadius: "var(--radius-default)",
            overflow: "hidden",
          }}
        >
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="flex items-center justify-center transition-colors duration-200"
            style={{
              width: "36px",
              height: "36px",
              color: "var(--color-on-surface-variant)",
              backgroundColor: "transparent",
              borderRight: "1px solid var(--color-outline-variant)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--color-surface-container)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <span
            className="flex items-center justify-center"
            style={{
              width: "48px",
              height: "36px",
              fontSize: "var(--text-body-sm)",
              fontWeight: 600,
              color: "var(--color-on-surface)",
            }}
          >
            {quantity}
          </span>
          <button
            onClick={() =>
              setQuantity((q) => Math.min(product.stock, q + 1))
            }
            disabled={quantity >= product.stock}
            className="flex items-center justify-center transition-colors duration-200"
            style={{
              width: "36px",
              height: "36px",
              color: "var(--color-on-surface-variant)",
              backgroundColor: "transparent",
              borderLeft: "1px solid var(--color-outline-variant)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--color-surface-container)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Stock indicator */}
        <span
          style={{
            fontSize: "var(--text-label-md)",
            color:
              product.stock <= 10
                ? "var(--color-warning)"
                : "var(--color-on-surface-variant)",
          }}
        >
          {isOutOfStock
            ? "Out of stock"
            : product.stock <= 10
            ? `Only ${product.stock} left`
            : `${product.stock} in stock`}
        </span>
      </div>

      {/* Add to cart button */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        disabled={isOutOfStock}
        onClick={handleAdd}
      >
        <ShoppingBag size={18} />
        {added
          ? "Added to cart!"
          : isOutOfStock
          ? "Out of stock"
          : "Add to cart"}
      </Button>
    </div>
  );
}