"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import Navbar from "@/components/layout/Navbar";
import CartSidebar from "@/components/layout/CartSidebar";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <>
      <Navbar />
      <CartSidebar />
      {children}
    </>
  );
}