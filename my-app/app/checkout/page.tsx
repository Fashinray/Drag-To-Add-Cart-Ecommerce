"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/lib/store/cartStore";
import type { CheckoutStep, ShippingInfo, PaymentInfo } from "@/lib/types";
import { CreditCard, Lock, CheckCircle } from "lucide-react";
import ShippingForm from "./ShippingForm";
import OrderSummary from "./OrderSummary";
import StepIndicator from "./StepIndicator";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [step, setStep]               = useState<CheckoutStep>("shipping");
  const [shippingData, setShippingData] = useState<ShippingInfo | null>(null);
  const [placed, setPlaced]           = useState(false);

  // Empty cart guard
  if (items.length === 0 && !placed) {
    return (
      <main
        className="flex flex-col items-center justify-center gap-6"
        style={{
          minHeight: "60vh",
          padding: "var(--spacing-xl)",
        }}
      >
        <p
          style={{
            fontSize: "var(--text-headline-sm)",
            color: "var(--color-on-surface-variant)",
          }}
        >
          Your cart is empty.
        </p>
        <Button variant="primary" onClick={() => router.push("/")}>
          Browse catalog
        </Button>
      </main>
    );
  }

  // Order placed confirmation
  if (placed) {
    return (
      <main
        className="flex flex-col items-center justify-center gap-6"
        style={{
          minHeight: "60vh",
          padding: "var(--spacing-xl)",
          textAlign: "center",
        }}
      >
        <CheckCircle
          size={64}
          style={{ color: "var(--color-success)" }}
        />
        <div>
          <h1
            style={{
              fontSize: "var(--text-headline-lg)",
              fontWeight: 600,
              color: "var(--color-on-surface)",
            }}
          >
            Order placed!
          </h1>
          <p
            style={{
              fontSize: "var(--text-body-md)",
              color: "var(--color-on-surface-variant)",
              marginTop: "8px",
            }}
          >
            Thanks{shippingData ? `, ${shippingData.firstName}` : ""}. Your
            order is confirmed and on its way.
          </p>
        </div>
        <Button variant="primary" onClick={() => router.push("/")}>
          Continue shopping
        </Button>
      </main>
    );
  }

  return (
    <main
      style={{
        maxWidth: "var(--spacing-container-max)",
        margin: "0 auto",
        padding: "var(--spacing-lg)",
      }}
    >
      {/* Page header */}
      <div
        className="flex flex-col gap-4"
        style={{ marginBottom: "var(--spacing-xl)" }}
      >
        <h1
          style={{
            fontSize: "var(--text-headline-lg)",
            fontWeight: 600,
            color: "var(--color-on-surface)",
          }}
        >
          Checkout
        </h1>
        <StepIndicator current={step} />
      </div>

      {/* Two-column layout */}
      <div
        className="grid gap-8"
        style={{
          gridTemplateColumns: "minmax(0, 1fr) 380px",
          alignItems: "start",
        }}
      >
        {/* Left — step content */}
        <div
          style={{
            backgroundColor: "var(--color-surface-container-lowest)",
            border: "1px solid var(--color-surface-variant)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--spacing-lg)",
          }}
        >
          {/* Step 1 — Shipping */}
          {step === "shipping" && (
            <>
              <h2
                style={{
                  fontSize: "var(--text-headline-sm)",
                  fontWeight: 600,
                  color: "var(--color-on-surface)",
                  marginBottom: "var(--spacing-lg)",
                }}
              >
                Shipping information
              </h2>
              <ShippingForm
                defaultValues={shippingData ?? undefined}
                onSubmit={(data) => {
                  setShippingData(data);
                  setStep("payment");
                }}
              />
            </>
          )}

          {/* Step 2 — Payment */}
          {step === "payment" && (
            <div className="flex flex-col gap-6">
              <h2
                style={{
                  fontSize: "var(--text-headline-sm)",
                  fontWeight: 600,
                  color: "var(--color-on-surface)",
                }}
              >
                Payment details
              </h2>

              {/* Secure badge */}
              <div
                className="flex items-center gap-2"
                style={{
                  padding: "var(--spacing-sm) var(--spacing-md)",
                  backgroundColor: "var(--color-surface-container)",
                  borderRadius: "var(--radius-md)",
                  width: "fit-content",
                }}
              >
                <Lock
                  size={14}
                  style={{ color: "var(--color-success)" }}
                />
                <span
                  style={{
                    fontSize: "var(--text-label-md)",
                    color: "var(--color-on-surface-variant)",
                  }}
                >
                  Secured with 256-bit SSL encryption
                </span>
              </div>

              {/* Card fields */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label
                    style={{
                      fontSize: "var(--text-label-md)",
                      fontWeight: 500,
                      color: "var(--color-on-surface-variant)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Card number
                  </label>
                  <div
                    className="flex items-center gap-3"
                    style={{
                      height: "44px",
                      paddingInline: "var(--spacing-md)",
                      backgroundColor:
                        "var(--color-surface-container-lowest)",
                      border: "1px solid var(--color-outline-variant)",
                      borderRadius: "var(--radius-default)",
                    }}
                  >
                    <CreditCard
                      size={16}
                      style={{ color: "var(--color-outline)" }}
                    />
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      style={{
                        flex: 1,
                        border: "none",
                        outline: "none",
                        backgroundColor: "transparent",
                        fontSize: "var(--text-body-sm)",
                        color: "var(--color-on-surface)",
                        letterSpacing: "0.05em",
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label
                      style={{
                        fontSize: "var(--text-label-md)",
                        fontWeight: 500,
                        color: "var(--color-on-surface-variant)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      Expiry date
                    </label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      maxLength={7}
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
                      }}
                    />
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
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="•••"
                      maxLength={4}
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
                      }}
                    />
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
                    Name on card
                  </label>
                  <input
                    type="text"
                    placeholder="Alex Morgan"
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
                    }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setStep("shipping")}
                  type="button"
                >
                  ← Back
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setStep("review")}
                >
                  Review order →
                </Button>
              </div>
            </div>
          )}

          {/* Step 3 — Review */}
          {step === "review" && shippingData && (
            <div className="flex flex-col gap-6">
              <h2
                style={{
                  fontSize: "var(--text-headline-sm)",
                  fontWeight: 600,
                  color: "var(--color-on-surface)",
                }}
              >
                Review your order
              </h2>

              {/* Shipping summary */}
              <div
                style={{
                  backgroundColor: "var(--color-surface-container)",
                  borderRadius: "var(--radius-md)",
                  padding: "var(--spacing-md)",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    style={{
                      fontSize: "var(--text-label-md)",
                      fontWeight: 600,
                      color: "var(--color-on-surface-variant)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Shipping to
                  </span>
                  <button
                    onClick={() => setStep("shipping")}
                    style={{
                      fontSize: "var(--text-label-md)",
                      color: "var(--color-primary)",
                      textDecoration: "underline",
                    }}
                  >
                    Edit
                  </button>
                </div>
                <p
                  style={{
                    fontSize: "var(--text-body-sm)",
                    color: "var(--color-on-surface)",
                  }}
                >
                  {shippingData.firstName} {shippingData.lastName}
                </p>
                <p
                  style={{
                    fontSize: "var(--text-body-sm)",
                    color: "var(--color-on-surface-variant)",
                  }}
                >
                  {shippingData.address}, {shippingData.city},{" "}
                  {shippingData.state} {shippingData.zip}
                </p>
                <p
                  style={{
                    fontSize: "var(--text-body-sm)",
                    color: "var(--color-on-surface-variant)",
                  }}
                >
                  {shippingData.email}
                </p>
              </div>

              {/* Place order */}
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setStep("payment")}
                  type="button"
                >
                  ← Back
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    clearCart();
                    setPlaced(true);
                  }}
                >
                  <Lock size={16} />
                  Place order
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right — Order summary */}
        <OrderSummary />
      </div>
    </main>
  );
}