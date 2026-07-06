import { useState } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import type { Product } from "@/lib/types";

export function useDragToCart() {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [activeProduct, setActiveProduct]   = useState<Product | null>(null);
  const { addItem, openCart }               = useCartStore();

  const onDragStart = (product: Product) => {
    setActiveProduct(product);
  };

  const onDragEnd = () => {
    setActiveProduct(null);
    setIsDraggingOver(false);
  };

  const onDragOver = () => {
    setIsDraggingOver(true);
  };

  const onDragLeave = () => {
    setIsDraggingOver(false);
  };

  const onDrop = (product: Product) => {
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
    setIsDraggingOver(false);
    setActiveProduct(null);
  };

  return {
    isDraggingOver,
    activeProduct,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDragLeave,
    onDrop,
  };
}