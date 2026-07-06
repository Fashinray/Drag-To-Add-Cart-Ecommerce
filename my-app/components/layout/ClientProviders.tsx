"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import Navbar from "@/components/layout/Navbar";
import CartSidebar from "@/components/layout/CartSidebar";
import DragTarget from "@/components/layout/DragTarget";
import DndProvider from "@/components/layout/DndProvider";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <DndProvider>
      <Navbar />
      <div className="flex relative">
        <main className="flex-1 min-w-0">{children}</main>
        <DragTarget />
      </div>
      <CartSidebar />
    </DndProvider>
  );
}