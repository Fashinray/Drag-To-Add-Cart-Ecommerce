"use client";

import { useState, useMemo } from "react";
import FilterBar from "@/components/catalog/FilterBar";
import ProductGrid from "@/components/catalog/ProductGrid";
import { mockProducts } from "@/lib/data/mockData";

export default function CatalogPage() {
  const [search, setSearch]           = useState("");
  const [activeCategory, setCategory] = useState("All");
  const [sortBy, setSortBy]           = useState("featured");

  const filtered = useMemo(() => {
    let result = [...mockProducts];

    // Filter by category
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [search, activeCategory, sortBy]);

  return (
    <main
      style={{
        maxWidth: "var(--spacing-container-max)",
        margin: "0 auto",
        padding: "var(--spacing-lg)",
      }}
    >
      {/* Page header */}
      <div style={{ marginBottom: "var(--spacing-lg)" }}>
        <h1
          style={{
            fontSize: "var(--text-headline-lg)",
            fontWeight: 600,
            color: "var(--color-on-surface)",
            letterSpacing: "-0.01em",
          }}
        >
          Product Catalog
        </h1>
        <p
          style={{
            fontSize: "var(--text-body-md)",
            color: "var(--color-on-surface-variant)",
            marginTop: "4px",
          }}
        >
          Curated tools and accessories for the modern workspace.
        </p>
      </div>

      {/* Filters */}
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        activeCategory={activeCategory}
        onCategoryChange={setCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalResults={filtered.length}
      />

      {/* Grid */}
      <ProductGrid products={filtered} />
    </main>
  );
}