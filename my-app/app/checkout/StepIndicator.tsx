import { Check } from "lucide-react";
import type { CheckoutStep } from "@/lib/types";

type Step = {
  id: CheckoutStep;
  label: string;
  number: number;
};

const steps: Step[] = [
  { id: "shipping", label: "Shipping", number: 1 },
  { id: "payment",  label: "Payment",  number: 2 },
  { id: "review",   label: "Review",   number: 3 },
];

type StepIndicatorProps = {
  current: CheckoutStep;
};

export default function StepIndicator({ current }: StepIndicatorProps) {
  const currentIndex = steps.findIndex((s) => s.id === current);

  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => {
        const isCompleted = i < currentIndex;
        const isActive    = i === currentIndex;
        const isUpcoming  = i > currentIndex;

        return (
          <div key={step.id} className="flex items-center">
            {/* Step node */}
            <div className="flex items-center gap-2">
              <div
                className="flex items-center justify-center transition-all duration-300"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: isCompleted
                    ? "var(--color-success)"
                    : isActive
                    ? "var(--color-primary-container)"
                    : "transparent",
                  border: isUpcoming
                    ? "1px solid var(--color-outline-variant)"
                    : "none",
                  color: isCompleted || isActive
                    ? "var(--color-on-primary)"
                    : "var(--color-outline)",
                  fontSize: "var(--text-label-md)",
                  fontWeight: 600,
                }}
              >
                {isCompleted ? (
                  <Check size={14} />
                ) : (
                  <span>{step.number}</span>
                )}
              </div>
              <span
                style={{
                  fontSize: "var(--text-body-sm)",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive
                    ? "var(--color-primary)"
                    : isCompleted
                    ? "var(--color-success)"
                    : "var(--color-outline)",
                  transition: "color 0.2s",
                }}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div
                style={{
                  width: "48px",
                  height: "1px",
                  margin: "0 8px",
                  backgroundColor: isCompleted
                    ? "var(--color-success)"
                    : "var(--color-outline-variant)",
                  transition: "background-color 0.3s",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}