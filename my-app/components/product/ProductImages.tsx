"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/lib/types";

type ProductImagesProps = {
  images: ProductImage[];
  productName: string;
};

export default function ProductImages({
  images,
  productName,
}: ProductImagesProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: "1 / 1",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--color-surface-variant)",
          backgroundColor: "var(--color-surface-container)",
        }}
      >
        <Image
          src={images[active]?.url ?? ""}
          alt={images[active]?.alt ?? productName}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActive(i)}
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "var(--radius-md)",
                border:
                  i === active
                    ? "2px solid var(--color-primary-container)"
                    : "1px solid var(--color-surface-variant)",
                overflow: "hidden",
                position: "relative",
                flexShrink: 0,
                backgroundColor: "var(--color-surface-container)",
                transition: "border-color 0.2s",
                cursor: "pointer",
              }}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="72px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}