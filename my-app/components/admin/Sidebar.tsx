"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  PackageSearch,
  Settings,
  ChevronRight,
  Store,
} from "lucide-react";

const navItems = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Inventory",
    href: "/admin/inventory",
    icon: Package,
  },
  {
    label: "Product Editor",
    href: "/admin/products/new",
    icon: PackageSearch,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="flex flex-col h-screen sticky top-0 shrink-0"
      style={{
        width: "var(--spacing-sidebar-width)",
        backgroundColor: "var(--color-surface-container-lowest)",
        borderRight: "1px solid var(--color-surface-variant)",
      }}
    >
      {/* Brand */}
      <div
        className="flex items-center gap-3"
        style={{
          padding: "var(--spacing-lg) var(--spacing-md)",
          borderBottom: "1px solid var(--color-surface-variant)",
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--color-primary-container)",
          }}
        >
          <Store size={16} style={{ color: "var(--color-on-primary)" }} />
        </div>
        <div>
          <p
            style={{
              fontSize: "var(--text-body-sm)",
              fontWeight: 700,
              color: "var(--color-on-surface)",
              letterSpacing: "-0.01em",
            }}
          >
            WORKSPACE
          </p>
          <p
            style={{
              fontSize: "var(--text-label-md)",
              color: "var(--color-on-surface-variant)",
            }}
          >
            Admin Dashboard
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav
        className="flex-1 flex flex-col gap-1 overflow-y-auto custom-scrollbar"
        style={{ padding: "var(--spacing-sm)" }}
      >
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between group transition-all duration-200"
              style={{
                padding: "10px var(--spacing-md)",
                borderRadius: "var(--radius-lg)",
                backgroundColor: isActive
                  ? "var(--color-primary-fixed)"
                  : "transparent",
                color: isActive
                  ? "var(--color-primary)"
                  : "var(--color-on-surface-variant)",
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
              <div className="flex items-center gap-3">
                <Icon
                  size={18}
                  style={{
                    color: isActive
                      ? "var(--color-primary)"
                      : "inherit",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "var(--text-body-sm)",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {item.label}
                </span>
              </div>
              {isActive && (
                <ChevronRight
                  size={14}
                  style={{ color: "var(--color-primary)" }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer — back to store */}
      <div
        style={{
          padding: "var(--spacing-md)",
          borderTop: "1px solid var(--color-surface-variant)",
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 transition-colors duration-200"
          style={{
            fontSize: "var(--text-body-sm)",
            color: "var(--color-on-surface-variant)",
            padding: "8px var(--spacing-md)",
            borderRadius: "var(--radius-lg)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              "var(--color-surface-container)";
            e.currentTarget.style.color = "var(--color-on-surface)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color =
              "var(--color-on-surface-variant)";
          }}
        >
          <Store size={16} />
          Back to store
        </Link>
      </div>
    </aside>
  );
}