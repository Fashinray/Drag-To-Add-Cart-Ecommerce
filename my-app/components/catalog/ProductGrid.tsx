import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";
import { PackageSearch } from "lucide-react";

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-4"
        style={{
          minHeight: "400px",
          color: "var(--color-on-surface-variant)",
        }}
      >
        <PackageSearch
          size={48}
          style={{ color: "var(--color-outline-variant)" }}
        />
        <div className="text-center">
          <p
            style={{
              fontSize: "var(--text-headline-sm)",
              fontWeight: 600,
              color: "var(--color-on-surface)",
            }}
          >
            No products found
          </p>
          <p
            style={{
              fontSize: "var(--text-body-sm)",
              color: "var(--color-on-surface-variant)",
              marginTop: "4px",
            }}
          >
            Try adjusting your filters or search term.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns:
          "repeat(auto-fill, minmax(260px, 1fr))",
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}