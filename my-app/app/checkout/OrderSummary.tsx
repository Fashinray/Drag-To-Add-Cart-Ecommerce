import Image from "next/image";
import { useCartStore } from "@/lib/store/cartStore";

export default function OrderSummary() {
  const { items, getTotalPrice } = useCartStore();
  const subtotal  = getTotalPrice();
  const shipping  = subtotal >= 50 ? 0 : 9.99;
  const tax       = subtotal * 0.08;
  const total     = subtotal + shipping + tax;

  return (
    <div
      className="flex flex-col gap-4"
      style={{
        backgroundColor: "var(--color-surface-container-lowest)",
        border: "1px solid var(--color-surface-variant)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--spacing-lg)",
        position: "sticky",
        top: "88px",
      }}
    >
      <h2
        style={{
          fontSize: "var(--text-headline-sm)",
          fontWeight: 600,
          color: "var(--color-on-surface)",
        }}
      >
        Order summary
      </h2>

      {/* Items */}
      <ul
        className="flex flex-col gap-3"
        style={{
          borderBottom: "1px solid var(--color-surface-variant)",
          paddingBottom: "var(--spacing-md)",
        }}
      >
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            {/* Thumbnail */}
            <div
              className="relative shrink-0 overflow-hidden"
              style={{
                width: "48px",
                height: "48px",
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
                sizes="48px"
              />
              {/* Quantity badge */}
              <span
                className="absolute -top-1.5 -right-1.5 flex items-center justify-center"
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "var(--color-on-surface)",
                  color: "var(--color-surface-container-lowest)",
                  fontSize: "10px",
                  fontWeight: 600,
                }}
              >
                {item.quantity}
              </span>
            </div>

            {/* Name + variant */}
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
                  }}
                >
                  {item.variant}
                </p>
              )}
            </div>

            {/* Price */}
            <span
              style={{
                fontSize: "var(--text-body-sm)",
                fontWeight: 600,
                color: "var(--color-on-surface)",
                whiteSpace: "nowrap",
              }}
            >
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      {/* Totals */}
      <div className="flex flex-col gap-2">
        {[
          { label: "Subtotal", value: `$${subtotal.toFixed(2)}` },
          {
            label: "Shipping",
            value: shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`,
          },
          { label: "Tax (8%)", value: `$${tax.toFixed(2)}` },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between">
            <span
              style={{
                fontSize: "var(--text-body-sm)",
                color: "var(--color-on-surface-variant)",
              }}
            >
              {label}
            </span>
            <span
              style={{
                fontSize: "var(--text-body-sm)",
                color:
                  value === "Free"
                    ? "var(--color-success)"
                    : "var(--color-on-surface)",
                fontWeight: value === "Free" ? 600 : 400,
              }}
            >
              {value}
            </span>
          </div>
        ))}

        {/* Total */}
        <div
          className="flex items-center justify-between"
          style={{
            paddingTop: "var(--spacing-sm)",
            borderTop: "1px solid var(--color-surface-variant)",
            marginTop: "4px",
          }}
        >
          <span
            style={{
              fontSize: "var(--text-body-md)",
              fontWeight: 600,
              color: "var(--color-on-surface)",
            }}
          >
            Total
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
      </div>

      {/* Free shipping nudge */}
      {subtotal < 50 && (
        <p
          style={{
            fontSize: "var(--text-label-md)",
            color: "var(--color-on-surface-variant)",
            backgroundColor: "var(--color-surface-container)",
            borderRadius: "var(--radius-md)",
            padding: "var(--spacing-sm) var(--spacing-md)",
          }}
        >
          Add{" "}
          <strong style={{ color: "var(--color-on-surface)" }}>
            ${(50 - subtotal).toFixed(2)}
          </strong>{" "}
          more for free shipping.
        </p>
      )}
    </div>
  );
}