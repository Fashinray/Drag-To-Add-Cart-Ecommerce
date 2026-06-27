"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import type { ShippingInfo } from "@/lib/types";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName:  z.string().min(1, "Last name is required"),
  email:     z.string().email("Enter a valid email address"),
  address:   z.string().min(5, "Enter a valid street address"),
  city:      z.string().min(1, "City is required"),
  state:     z.string().min(1, "State is required"),
  zip:       z.string().min(4, "Enter a valid ZIP code"),
  country:   z.string().min(1, "Country is required"),
});

type ShippingFormProps = {
  defaultValues?: Partial<ShippingInfo>;
  onSubmit: (data: ShippingInfo) => void;
  onBack?: () => void;
};

export default function ShippingForm({
  defaultValues,
  onSubmit,
  onBack,
}: ShippingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShippingInfo>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      {/* Name row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="First name"
          placeholder="Alex"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <Input
          label="Last name"
          placeholder="Morgan"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>

      {/* Email */}
      <Input
        label="Email address"
        type="email"
        placeholder="alex@workspace.com"
        error={errors.email?.message}
        {...register("email")}
      />

      {/* Address */}
      <Input
        label="Street address"
        placeholder="123 Productivity Way"
        error={errors.address?.message}
        {...register("address")}
      />

      {/* City / State / ZIP */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Input
          label="City"
          placeholder="San Francisco"
          error={errors.city?.message}
          {...register("city")}
        />
        <Input
          label="State"
          placeholder="CA"
          error={errors.state?.message}
          {...register("state")}
        />
        <Input
          label="ZIP code"
          placeholder="94103"
          error={errors.zip?.message}
          {...register("zip")}
        />
      </div>

      {/* Country */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="country"
          style={{
            fontSize: "var(--text-label-md)",
            fontWeight: 500,
            color: "var(--color-on-surface-variant)",
            letterSpacing: "0.02em",
          }}
        >
          Country
        </label>
        <select
          id="country"
          {...register("country")}
          style={{
            height: "44px",
            paddingInline: "var(--spacing-md)",
            backgroundColor: "var(--color-surface-container-lowest)",
            border: `1px solid ${
              errors.country
                ? "var(--color-error)"
                : "var(--color-outline-variant)"
            }`,
            borderRadius: "var(--radius-default)",
            fontSize: "var(--text-body-sm)",
            color: "var(--color-on-surface)",
            outline: "none",
            width: "100%",
          }}
        >
          <option value="">Select country</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="GB">United Kingdom</option>
          <option value="AU">Australia</option>
          <option value="NG">Nigeria</option>
          <option value="DE">Germany</option>
          <option value="FR">France</option>
        </select>
        {errors.country && (
          <span
            style={{
              fontSize: "var(--text-label-md)",
              color: "var(--color-error)",
            }}
          >
            {errors.country.message}
          </span>
        )}
      </div>

      {/* Actions */}
      <div
        className="flex items-center justify-between"
        style={{ paddingTop: "var(--spacing-md)" }}
      >
        {onBack ? (
          <Button variant="ghost" onClick={onBack} type="button">
            ← Back
          </Button>
        ) : (
          <div />
        )}
        <Button
          variant="primary"
          type="submit"
          size="lg"
          loading={isSubmitting}
        >
          Continue to payment →
        </Button>
      </div>
    </form>
  );
}