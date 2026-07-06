"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useCartStore } from "@/lib/store/cartStore";
import type { Product } from "@/lib/types";
import Image from "next/image";

export default function DndProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const { addItem, openCart }             = useCartStore();

  // PointerSensor — mouse + stylus
  // TouchSensor   — mobile touch with 8px tolerance and 100ms delay
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 8 },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const product = event.active.data.current?.product as Product;
    if (product) setActiveProduct(product);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    const product = active.data.current?.product as Product;

    if (over?.id === "cart-drop-zone" && product) {
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
    }

    setActiveProduct(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}

      {/* Drag overlay — floats under the cursor while dragging */}
      <DragOverlay dropAnimation={null}>
        {activeProduct && (
          <div
            style={{
              width: "160px",
              backgroundColor: "var(--color-surface-container-lowest)",
              border: "1px solid var(--color-primary-container)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-overlay)",
              overflow: "hidden",
              opacity: 0.95,
              transform: "rotate(2deg) scale(1.04)",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                aspectRatio: "1 / 1",
                position: "relative",
                backgroundColor: "var(--color-surface-container)",
              }}
            >
              <Image
                src={activeProduct.images[0]?.url ?? ""}
                alt={activeProduct.name}
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
            <div style={{ padding: "8px 10px" }}>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--color-on-surface)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {activeProduct.name}
              </p>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "var(--color-primary)",
                  marginTop: "2px",
                }}
              >
                ${activeProduct.price.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}