"use client";

import { useDroppable } from "@dnd-kit/core";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";

export default function DragTarget() {
  const { setNodeRef, isOver } = useDroppable({ id: "cart-drop-zone" });
  const { getTotalItems }      = useCartStore();
  const totalItems             = getTotalItems();

  return (
    <div
      ref={setNodeRef}
      className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-30 flex-col items-center justify-center gap-2 transition-all duration-200"
      style={{
        width:           isOver ? "80px" : "48px",
        height:          isOver ? "160px" : "96px",
        backgroundColor: isOver
          ? "var(--color-primary-container)"
          : "var(--color-surface-container-lowest)",
        borderRadius:    "var(--radius-lg) 0 0 var(--radius-lg)",
        border:          isOver
          ? "2px dashed white"
          : "1px solid var(--color-surface-variant)",
        borderRight:     "none",
        boxShadow:       "var(--shadow-card)",
        cursor:          "copy",
      }}
    >
      <ShoppingBag
        size={isOver ? 28 : 20}
        style={{
          color:      isOver ? "white" : "var(--color-on-surface-variant)",
          transition: "all 0.2s",
        }}
      />
      {totalItems > 0 && !isOver && (
        <span
          style={{
            fontSize:   "10px",
            fontWeight: 700,
            color:      "var(--color-primary)",
            lineHeight: 1,
          }}
        >
          {totalItems}
        </span>
      )}
      {isOver && (
        <span
          style={{
            fontSize:   "10px",
            fontWeight: 600,
            color:      "white",
            textAlign:  "center",
            lineHeight: 1.3,
            padding:    "0 6px",
          }}
        >
          Drop to add
        </span>
      )}
    </div>
  );
}