"use client";

import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

export default function CartSidebar() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();

  const total = getTotalPrice();
  const totalItems = getTotalItems();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          style={{ backgroundColor: "rgba(15, 23, 42, 0.3)" }}
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
  className="fixed top-0 right-0 h-full z-50 flex flex-col transition-transform duration-300 cart-sidebar-mobile"
        style={{
          width: "var(--spacing-sidebar-width)",
          backgroundColor: "var(--color-surface-container-low)",
          borderLeft: "1px solid var(--color-surface-variant)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          boxShadow: isOpen ? "var(--shadow-overlay)" : "none",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between shrink-0"
          style={{
            padding: "var(--spacing-md) var(--spacing-lg)",
            borderBottom: "1px solid var(--color-surface-variant)",
            backgroundColor: "var(--color-surface-container-lowest)",
          }}
        >
          <div className="flex items-center gap-2">
            <ShoppingBag
              size={18}
              style={{ color: "var(--color-on-surface-variant)" }}
            />
            <span
              style={{
                fontSize: "var(--text-headline-sm)",
                fontWeight: 600,
                color: "var(--color-on-surface)",
              }}
            >
              Cart
            </span>
            {totalItems > 0 && (
              <span
                className="flex items-center justify-center"
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "var(--color-primary-container)",
                  color: "var(--color-on-primary)",
                  fontSize: "11px",
                  fontWeight: 600,
                }}
              >
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-full transition-colors duration-200"
            style={{ color: "var(--color-on-surface-variant)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--color-surface-container)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {items.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center h-full gap-3"
              style={{ padding: "var(--spacing-xl)" }}
            >
              <ShoppingBag
                size={40}
                style={{ color: "var(--color-outline-variant)" }}
              />
              <p
                style={{
                  fontSize: "var(--text-body-sm)",
                  color: "var(--color-on-surface-variant)",
                  textAlign: "center",
                }}
              >
                Your cart is empty.
                <br />
                Add products from the catalog.
              </p>
            </div>
          ) : (
            <ul
              className="flex flex-col"
              style={{ padding: "var(--spacing-sm) 0" }}
            >
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 transition-colors duration-200"
                  style={{
                    padding: "var(--spacing-sm) var(--spacing-md)",
                    borderBottom: "1px solid var(--color-surface-variant)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "var(--color-surface-container)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  {/* Thumbnail */}
                  <div
                    className="relative shrink-0 overflow-hidden"
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--color-surface-variant)",
                      backgroundColor: "var(--color-surface-container)",
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="52px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="truncate"
                      style={{
                        fontSize: "var(--text-body-sm)",
                        fontWeight: 500,
                        color: "var(--color-on-surface)",
                      }}
                    >
                      {item.name}
                    </p>
                    {item.variant && (
                      <p
                        style={{
                          fontSize: "var(--text-label-md)",
                          color: "var(--color-on-surface-variant)",
                          marginTop: "2px",
                        }}
                      >
                        {item.variant}
                      </p>
                    )}
                    <p
                      style={{
                        fontSize: "var(--text-body-sm)",
                        fontWeight: 600,
                        color: "var(--color-primary)",
                        marginTop: "2px",
                      }}
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity + Remove */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 rounded transition-colors duration-200"
                      style={{ color: "var(--color-outline)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--color-error)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--color-outline)")
                      }
                      aria-label="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div
                      className="flex items-center gap-1"
                      style={{
                        border: "1px solid var(--color-outline-variant)",
                        borderRadius: "var(--radius-md)",
                        overflow: "hidden",
                      }}
                    >
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="flex items-center justify-center transition-colors duration-200"
                        style={{
                          width: "24px",
                          height: "24px",
                          color: "var(--color-on-surface-variant)",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "var(--color-surface-container)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span
                        className="flex items-center justify-center"
                        style={{
                          width: "28px",
                          fontSize: "var(--text-body-sm)",
                          fontWeight: 500,
                          color: "var(--color-on-surface)",
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="flex items-center justify-center transition-colors duration-200"
                        style={{
                          width: "24px",
                          height: "24px",
                          color: "var(--color-on-surface-variant)",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "var(--color-surface-container)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="shrink-0 flex flex-col gap-3"
            style={{
              padding: "var(--spacing-md) var(--spacing-lg)",
              borderTop: "1px solid var(--color-surface-variant)",
              backgroundColor: "var(--color-surface-container-lowest)",
            }}
          >
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span
                style={{
                  fontSize: "var(--text-body-sm)",
                  color: "var(--color-on-surface-variant)",
                }}
              >
                Subtotal
              </span>
              <span
                style={{
                  fontSize: "var(--text-headline-sm)",
                  fontWeight: 700,
                  color: "var(--color-on-surface)",
                }}
              >
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Checkout CTA */}
            <Link href="/checkout" onClick={closeCart}>
              <Button variant="primary" fullWidth size="lg">
                Checkout — ${total.toFixed(2)}
              </Button>
            </Link>

            {/* Continue shopping */}
            <button
              onClick={closeCart}
              style={{
                fontSize: "var(--text-body-sm)",
                color: "var(--color-on-surface-variant)",
                textAlign: "center",
                textDecoration: "underline",
              }}
            >
              Continue shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}