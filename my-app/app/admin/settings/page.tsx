"use client";

import { useState } from "react";
import { Save, Store, Bell, Shield, User } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

type Section = "store" | "notifications" | "account" | "security";

const sections: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: "store",         label: "Store",         icon: Store  },
  { id: "notifications", label: "Notifications",  icon: Bell   },
  { id: "account",       label: "Account",        icon: User   },
  { id: "security",      label: "Security",       icon: Shield },
];

export default function SettingsPage() {
  const [active, setActive]       = useState<Section>("store");
  const [saved, setSaved]         = useState(false);

  // Store fields
  const [storeName, setStoreName]       = useState("WORKSPACE");
  const [storeEmail, setStoreEmail]     = useState("admin@workspace.com");
  const [storeUrl, setStoreUrl]         = useState("workspace.store");
  const [storeCurrency, setStoreCurrency] = useState("USD");
  const [storeTagline, setStoreTagline] = useState(
    "Curated tools for the modern workspace."
  );

  // Notification toggles
  const [notifNewOrder, setNotifNewOrder]       = useState(true);
  const [notifLowStock, setNotifLowStock]       = useState(true);
  const [notifNewReview, setNotifNewReview]     = useState(false);
  const [notifPromoEmails, setNotifPromoEmails] = useState(false);

  // Account fields
  const [adminName, setAdminName]   = useState("Workspace Admin");
  const [adminEmail, setAdminEmail] = useState("admin@workspace.com");

  // Security fields
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw]         = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Toggle = ({
    checked,
    onChange,
    label,
    description,
  }: {
    checked: boolean;
    onChange: () => void;
    label: string;
    description: string;
  }) => (
    <div className="flex items-center justify-between">
      <div>
        <p
          style={{
            fontSize: "var(--text-body-sm)",
            fontWeight: 500,
            color: "var(--color-on-surface)",
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontSize: "var(--text-label-md)",
            color: "var(--color-on-surface-variant)",
            marginTop: "2px",
          }}
        >
          {description}
        </p>
      </div>
      <button
        onClick={onChange}
        role="switch"
        aria-checked={checked}
        style={{
          width: "44px",
          height: "24px",
          borderRadius: "var(--radius-full)",
          backgroundColor: checked
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
            left: checked ? "23px" : "3px",
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
  );

  const SectionCard = ({ children }: { children: React.ReactNode }) => (
    <div
      style={{
        backgroundColor: "var(--color-surface-container-lowest)",
        border: "1px solid var(--color-surface-variant)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--spacing-lg)",
      }}
    >
      {children}
    </div>
  );

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2
      style={{
        fontSize: "var(--text-body-md)",
        fontWeight: 600,
        color: "var(--color-on-surface)",
        marginBottom: "var(--spacing-lg)",
        paddingBottom: "var(--spacing-md)",
        borderBottom: "1px solid var(--color-surface-variant)",
      }}
    >
      {children}
    </h2>
  );

  const Divider = () => (
    <div
      style={{
        height: "1px",
        backgroundColor: "var(--color-surface-variant)",
        margin: "var(--spacing-md) 0",
      }}
    />
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            style={{
              fontSize: "var(--text-headline-lg)",
              fontWeight: 600,
              color: "var(--color-on-surface)",
              letterSpacing: "-0.01em",
            }}
          >
            Settings
          </h1>
          <p
            style={{
              fontSize: "var(--text-body-md)",
              color: "var(--color-on-surface-variant)",
              marginTop: "4px",
            }}
          >
            Manage your store preferences and account details.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleSave}
          loading={saved}
        >
          <Save size={16} />
          {saved ? "Saved!" : "Save changes"}
        </Button>
      </div>

      {/* Two-column layout */}
      <div
        className="grid gap-6 settings-grid"
        style={{
          gridTemplateColumns: "200px minmax(0, 1fr)",
          alignItems: "start",
        }}
      >
        {/* Left — section nav */}
        <nav
          className="flex flex-col gap-1"
          style={{
            backgroundColor: "var(--color-surface-container-lowest)",
            border: "1px solid var(--color-surface-variant)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--spacing-sm)",
            position: "sticky",
            top: "88px",
          }}
        >
          {sections.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => setActive(id)}
                className="flex items-center gap-3 w-full transition-all duration-200"
                style={{
                  padding: "10px var(--spacing-md)",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: isActive
                    ? "var(--color-primary-fixed)"
                    : "transparent",
                  color: isActive
                    ? "var(--color-primary)"
                    : "var(--color-on-surface-variant)",
                  fontSize: "var(--text-body-sm)",
                  fontWeight: isActive ? 600 : 400,
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-surface-container)";
                    e.currentTarget.style.color =
                      "var(--color-on-surface)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color =
                      "var(--color-on-surface-variant)";
                  }
                }}
              >
                <Icon size={16} />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Right — section content */}
        <div className="flex flex-col gap-4">
          {/* Store settings */}
          {active === "store" && (
            <SectionCard>
              <SectionTitle>Store information</SectionTitle>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Store name"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                  />
                  <Input
                    label="Store email"
                    type="email"
                    value={storeEmail}
                    onChange={(e) => setStoreEmail(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Store URL"
                    value={storeUrl}
                    onChange={(e) => setStoreUrl(e.target.value)}
                    hint="Your public storefront URL"
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
                      Currency
                    </label>
                    <select
                      value={storeCurrency}
                      onChange={(e) => setStoreCurrency(e.target.value)}
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
                      <option value="USD">USD — US Dollar</option>
                      <option value="EUR">EUR — Euro</option>
                      <option value="GBP">GBP — British Pound</option>
                      <option value="NGN">NGN — Nigerian Naira</option>
                      <option value="CAD">CAD — Canadian Dollar</option>
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
                    Store tagline
                  </label>
                  <textarea
                    value={storeTagline}
                    onChange={(e) => setStoreTagline(e.target.value)}
                    rows={2}
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
            </SectionCard>
          )}

          {/* Notifications */}
          {active === "notifications" && (
            <SectionCard>
              <SectionTitle>Notification preferences</SectionTitle>
              <div className="flex flex-col gap-4">
                <Toggle
                  checked={notifNewOrder}
                  onChange={() => setNotifNewOrder((v) => !v)}
                  label="New orders"
                  description="Get notified when a customer places an order"
                />
                <Divider />
                <Toggle
                  checked={notifLowStock}
                  onChange={() => setNotifLowStock((v) => !v)}
                  label="Low stock alerts"
                  description="Alert when a product drops below 10 units"
                />
                <Divider />
                <Toggle
                  checked={notifNewReview}
                  onChange={() => setNotifNewReview((v) => !v)}
                  label="New reviews"
                  description="Notify when a customer leaves a product review"
                />
                <Divider />
                <Toggle
                  checked={notifPromoEmails}
                  onChange={() => setNotifPromoEmails((v) => !v)}
                  label="Promotional emails"
                  description="Receive Workspace product updates and tips"
                />
              </div>
            </SectionCard>
          )}

          {/* Account */}
          {active === "account" && (
            <SectionCard>
              <SectionTitle>Account details</SectionTitle>
              <div className="flex flex-col gap-4">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div
                    className="flex items-center justify-center shrink-0"
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "var(--radius-full)",
                      backgroundColor: "var(--color-primary-fixed)",
                      border: "2px solid var(--color-outline-variant)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "var(--text-headline-sm)",
                        fontWeight: 700,
                        color: "var(--color-primary)",
                      }}
                    >
                      {adminName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "var(--text-body-sm)",
                        fontWeight: 600,
                        color: "var(--color-on-surface)",
                      }}
                    >
                      {adminName}
                    </p>
                    <p
                      style={{
                        fontSize: "var(--text-label-md)",
                        color: "var(--color-on-surface-variant)",
                        marginTop: "2px",
                      }}
                    >
                      {adminEmail}
                    </p>
                    <div style={{ marginTop: "6px" }}>
                      <Badge variant="primary">Administrator</Badge>
                    </div>
                  </div>
                </div>

                <Divider />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Full name"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                  />
                  <Input
                    label="Email address"
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                  />
                </div>
              </div>
            </SectionCard>
          )}

          {/* Security */}
          {active === "security" && (
            <div className="flex flex-col gap-4">
              <SectionCard>
                <SectionTitle>Change password</SectionTitle>
                <div className="flex flex-col gap-4">
                  <Input
                    label="Current password"
                    type="password"
                    placeholder="••••••••"
                    value={currentPw}
                    onChange={(e) => setCurrentPw(e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="New password"
                      type="password"
                      placeholder="••••••••"
                      value={newPw}
                      onChange={(e) => setNewPw(e.target.value)}
                      hint="Minimum 8 characters"
                    />
                    <Input
                      label="Confirm new password"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPw}
                      onChange={(e) => setConfirmPw(e.target.value)}
                      error={
                        confirmPw && newPw !== confirmPw
                          ? "Passwords do not match"
                          : undefined
                      }
                    />
                  </div>
                  <div>
                    <Button
                      variant="primary"
                      size="md"
                      disabled={
                        !currentPw ||
                        !newPw ||
                        newPw !== confirmPw ||
                        newPw.length < 8
                      }
                    >
                      Update password
                    </Button>
                  </div>
                </div>
              </SectionCard>

              {/* Two-factor */}
              <SectionCard>
                <SectionTitle>Two-factor authentication</SectionTitle>
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      style={{
                        fontSize: "var(--text-body-sm)",
                        fontWeight: 500,
                        color: "var(--color-on-surface)",
                      }}
                    >
                      Authenticator app
                    </p>
                    <p
                      style={{
                        fontSize: "var(--text-label-md)",
                        color: "var(--color-on-surface-variant)",
                        marginTop: "2px",
                      }}
                    >
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Badge variant="default">Not enabled</Badge>
                </div>
                <div style={{ marginTop: "var(--spacing-md)" }}>
                  <Button variant="secondary" size="sm">
                    <Shield size={14} />
                    Enable 2FA
                  </Button>
                </div>
              </SectionCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}