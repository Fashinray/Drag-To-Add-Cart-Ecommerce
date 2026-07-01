"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Save,
  Eye,
  Trash2,
  Plus,
  X,
  ImagePlus,
} from "lucide-react";
import Link from "next/link";
import { mockProducts } from "@/lib/data/mockData";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";

export default function ProductEditorPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const isNew  = params.id === "new";

  const existing = !isNew
    ? mockProducts.find((p) => p.id === params.id)
    : null;

  // Form state
  const [name, setName]           = useState(existing?.name ?? "");
  const [sku, setSku]             = useState(existing?.sku ?? "");
  const [price, setPrice]         = useState(existing?.price?.toString() ?? "");
  const [compareAt, setCompareAt] = useState(existing?.compareAtPrice?.toString() ?? "");
  const [stock, setStock]         = useState(existing?.stock?.toString() ?? "");
  const [category, setCategory]   = useState(existing?.category ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [featured, setFeatured]   = useState(existing?.featured ?? false);
  const [tagInput, setTagInput]   = useState("");
  const [tags, setTags]           = useState<string[]>(existing?.tags ?? []);
  const [saved, setSaved]         = useState(false);

  const handleAddTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t)) {
      setTags((prev) => [...prev, t]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      router.push("/admin/inventory");
    }, 1500);
  };

  const categories = [
    "Peripherals",
    "Audio",
    "Displays",
    "Accessories",
    "Furniture",
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/inventory"
            className="flex items-center gap-2 transition-colors duration-200"
            style={{
              fontSize: "var(--text-body-sm)",
              color: "var(--color-on-surface-variant)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color =
                "var(--color-on-surface-variant)")
            }
          >
            <ArrowLeft size={16} />
            Inventory
          </Link>
          <span style={{ color: "var(--color-outline-variant)" }}>/</span>
          <h1
            style={{
              fontSize: "var(--text-headline-sm)",
              fontWeight: 600,
              color: "var(--color-on-surface)",
            }}
          >
            {isNew ? "New product" : existing?.name ?? "Edit product"}
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {!isNew && existing && (
            <Link href={`/products/${existing.id}`} target="_blank">
              <Button variant="secondary" size="sm">
                <Eye size={14} />
                Preview
              </Button>
            </Link>
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            loading={saved}
          >
            <Save size={14} />
            {saved ? "Saved!" : "Save product"}
          </Button>
        </div>
      </div>

      {/* Two-column layout */}
      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns: "minmax(0, 1fr) 320px",
          alignItems: "start",
        }}
      >
        {/* Left column — main fields */}
        <div className="flex flex-col gap-4">
          {/* Basic info */}
          <section
            style={{
              backgroundColor: "var(--color-surface-container-lowest)",
              border: "1px solid var(--color-surface-variant)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--spacing-lg)",
            }}
          >
            <h2
              style={{
                fontSize: "var(--text-body-md)",
                fontWeight: 600,
                color: "var(--color-on-surface)",
                marginBottom: "var(--spacing-md)",
              }}
            >
              Basic information
            </h2>

            <div className="flex flex-col gap-4">
              <Input
                label="Product name"
                placeholder="e.g. Pro Mechanical Keyboard"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="SKU"
                  placeholder="e.g. KB-MX-001"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                />
                <div className="flex flex-col gap-1">
                  <label
                    style={{
                      fontSize: "var(--text-label-md)",
                      fontWeight: 500,
                      color: "var(--color-on-surface-variant)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      height: "44px",
                      paddingInline: "var(--spacing-md)",
                      backgroundColor:
                        "var(--color-surface-container-lowest)",
                      border: "1px solid var(--color-outline-variant)",
                      borderRadius: "var(--radius-default)",
                      fontSize: "var(--text-body-sm)",
                      color: "var(--color-on-surface)",
                      outline: "none",
                      width: "100%",
                    }}
                  >
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  style={{
                    fontSize: "var(--text-label-md)",
                    fontWeight: 500,
                    color: "var(--color-on-surface-variant)",
                    letterSpacing: "0.02em",
                  }}
                >
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Describe the product in detail..."
                  style={{
                    padding: "var(--spacing-md)",
                    backgroundColor:
                      "var(--color-surface-container-lowest)",
                    border: "1px solid var(--color-outline-variant)",
                    borderRadius: "var(--radius-default)",
                    fontSize: "var(--text-body-sm)",
                    color: "var(--color-on-surface)",
                    outline: "none",
                    resize: "vertical",
                    lineHeight: 1.6,
                    width: "100%",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor =
                      "var(--color-primary-container)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor =
                      "var(--color-outline-variant)")
                  }
                />
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section
            style={{
              backgroundColor: "var(--color-surface-container-lowest)",
              border: "1px solid var(--color-surface-variant)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--spacing-lg)",
            }}
          >
            <h2
              style={{
                fontSize: "var(--text-body-md)",
                fontWeight: 600,
                color: "var(--color-on-surface)",
                marginBottom: "var(--spacing-md)",
              }}
            >
              Pricing & stock
            </h2>

            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Price ($)"
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Input
                label="Compare-at price ($)"
                type="number"
                placeholder="0.00"
                value={compareAt}
                onChange={(e) => setCompareAt(e.target.value)}
                hint="Original price before discount"
              />
              <Input
                label="Stock quantity"
                type="number"
                placeholder="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
          </section>

          {/* Tags */}
          <section
            style={{
              backgroundColor: "var(--color-surface-container-lowest)",
              border: "1px solid var(--color-surface-variant)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--spacing-lg)",
            }}
          >
            <h2
              style={{
                fontSize: "var(--text-body-md)",
                fontWeight: 600,
                color: "var(--color-on-surface)",
                marginBottom: "var(--spacing-md)",
              }}
            >
              Tags
            </h2>

            {/* Tag input */}
            <div className="flex gap-2" style={{ marginBottom: "var(--spacing-sm)" }}>
              <input
                type="text"
                placeholder="Add a tag and press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                style={{
                  flex: 1,
                  height: "40px",
                  paddingInline: "var(--spacing-md)",
                  backgroundColor: "var(--color-surface-container-lowest)",
                  border: "1px solid var(--color-outline-variant)",
                  borderRadius: "var(--radius-default)",
                  fontSize: "var(--text-body-sm)",
                  color: "var(--color-on-surface)",
                  outline: "none",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor =
                    "var(--color-primary-container)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor =
                    "var(--color-outline-variant)")
                }
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={handleAddTag}
              >
                <Plus size={14} />
                Add
              </Button>
            </div>

            {/* Tag chips */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1"
                    style={{
                      padding: "4px 10px",
                      backgroundColor:
                        "var(--color-surface-container-low)",
                      border: "1px solid var(--color-outline-variant)",
                      borderRadius: "var(--radius-full)",
                      fontSize: "var(--text-label-md)",
                      color: "var(--color-on-surface-variant)",
                    }}
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      style={{
                        color: "var(--color-outline)",
                        lineHeight: 1,
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color =
                          "var(--color-error)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color =
                          "var(--color-outline)")
                      }
                      aria-label={`Remove tag ${tag}`}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right column — image + publish */}
        <div className="flex flex-col gap-4">
          {/* Image */}
          <section
            style={{
              backgroundColor: "var(--color-surface-container-lowest)",
              border: "1px solid var(--color-surface-variant)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--spacing-lg)",
            }}
          >
            <h2
              style={{
                fontSize: "var(--text-body-md)",
                fontWeight: 600,
                color: "var(--color-on-surface)",
                marginBottom: "var(--spacing-md)",
              }}
            >
              Product image
            </h2>

            {existing?.images[0] ? (
              <div className="flex flex-col gap-3">
                <div
                  className="relative overflow-hidden"
                  style={{
                    aspectRatio: "1 / 1",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-surface-variant)",
                  }}
                >
                  <Image
                    src={existing.images[0].url}
                    alt={existing.images[0].alt}
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                </div>
                <Button variant="secondary" size="sm" fullWidth>
                  <ImagePlus size={14} />
                  Replace image
                </Button>
              </div>
            ) : (
              <div
                className="flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors duration-200"
                style={{
                  aspectRatio: "1 / 1",
                  border: "2px dashed var(--color-outline-variant)",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--color-surface-container)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor =
                    "var(--color-primary-container)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor =
                    "var(--color-outline-variant)")
                }
              >
                <ImagePlus
                  size={32}
                  style={{ color: "var(--color-outline-variant)" }}
                />
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontSize: "var(--text-body-sm)",
                      fontWeight: 500,
                      color: "var(--color-on-surface-variant)",
                    }}
                  >
                    Upload image
                  </p>
                  <p
                    style={{
                      fontSize: "var(--text-label-md)",
                      color: "var(--color-outline)",
                      marginTop: "2px",
                    }}
                  >
                    PNG, JPG up to 4MB
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Publish */}
          <section
            style={{
              backgroundColor: "var(--color-surface-container-lowest)",
              border: "1px solid var(--color-surface-variant)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--spacing-lg)",
            }}
          >
            <h2
              style={{
                fontSize: "var(--text-body-md)",
                fontWeight: 600,
                color: "var(--color-on-surface)",
                marginBottom: "var(--spacing-md)",
              }}
            >
              Visibility
            </h2>

            <div className="flex flex-col gap-3">
              {/* Featured toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <p
                    style={{
                      fontSize: "var(--text-body-sm)",
                      fontWeight: 500,
                      color: "var(--color-on-surface)",
                    }}
                  >
                    Featured product
                  </p>
                  <p
                    style={{
                      fontSize: "var(--text-label-md)",
                      color: "var(--color-on-surface-variant)",
                      marginTop: "2px",
                    }}
                  >
                    Show on the catalog homepage
                  </p>
                </div>
                <button
                  onClick={() => setFeatured((f) => !f)}
                  role="switch"
                  aria-checked={featured}
                  style={{
                    width: "44px",
                    height: "24px",
                    borderRadius: "var(--radius-full)",
                    backgroundColor: featured
                      ? "var(--color-primary-container)"
                      : "var(--color-surface-container-high)",
                    border: "none",
                    cursor: "pointer",
                    position: "relative",
                    transition: "background-color 0.2s",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "3px",
                      left: featured ? "23px" : "3px",
                      width: "18px",
                      height: "18px",
                      borderRadius: "var(--radius-full)",
                      backgroundColor: "white",
                      transition: "left 0.2s",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    }}
                  />
                </button>
              </div>

              <div
                style={{
                  height: "1px",
                  backgroundColor: "var(--color-surface-variant)",
                }}
              />

              {/* Status badge */}
              <div className="flex items-center justify-between">
                <span
                  style={{
                    fontSize: "var(--text-body-sm)",
                    color: "var(--color-on-surface-variant)",
                  }}
                >
                  Status
                </span>
                <Badge variant={isNew ? "default" : "success"}>
                  {isNew ? "Draft" : "Published"}
                </Badge>
              </div>
            </div>
          </section>

          {/* Danger zone */}
          {!isNew && (
            <section
              style={{
                border: "1px solid var(--color-error-container)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--spacing-lg)",
              }}
            >
              <h2
                style={{
                  fontSize: "var(--text-body-md)",
                  fontWeight: 600,
                  color: "var(--color-error)",
                  marginBottom: "var(--spacing-sm)",
                }}
              >
                Danger zone
              </h2>
              <p
                style={{
                  fontSize: "var(--text-body-sm)",
                  color: "var(--color-on-surface-variant)",
                  marginBottom: "var(--spacing-md)",
                }}
              >
                Permanently delete this product and all its data.
              </p>
              <Button
                variant="danger"
                size="sm"
                fullWidth
                onClick={() => router.push("/admin/inventory")}
              >
                <Trash2 size={14} />
                Delete product
              </Button>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}