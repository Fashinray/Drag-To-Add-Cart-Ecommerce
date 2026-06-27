"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Catalog",     href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "Orders",      href: "/orders" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { getTotalItems, toggleCart } = useCartStore();
  const totalItems = getTotalItems();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="w-full top-0 sticky z-50"
      style={{
        backgroundColor: "var(--color-surface-container-lowest)",
        borderBottom: "1px solid var(--color-surface-variant)",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{
          maxWidth: "var(--spacing-container-max)",
          margin: "0 auto",
          padding: "var(--spacing-md) var(--spacing-lg)",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontSize: "var(--text-headline-md)",
            fontWeight: 700,
            color: "var(--color-on-surface)",
            letterSpacing: "-0.01em",
          }}
        >
          WORKSPACE
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "var(--text-body-md)",
                  color: isActive
                    ? "var(--color-primary)"
                    : "var(--color-on-surface-variant)",
                  fontWeight: isActive ? 500 : 400,
                  borderBottom: isActive
                    ? "2px solid var(--color-primary)"
                    : "2px solid transparent",
                  paddingBottom: "4px",
                  transition: "all 0.2s",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Search */}
          <button
            className="p-2 rounded-full transition-colors duration-200"
            style={{ color: "var(--color-on-surface-variant)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--color-surface-container-low)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          {/* Account */}
          <button
            className="p-2 rounded-full transition-colors duration-200"
            style={{ color: "var(--color-on-surface-variant)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--color-surface-container-low)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
            aria-label="Account"
          >
            <User size={20} />
          </button>

          {/* Cart */}
          <button
            onClick={toggleCart}
            className="relative p-2 rounded-full transition-colors duration-200"
            style={{ color: "var(--color-on-surface-variant)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--color-surface-container-low)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
            aria-label="Cart"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 flex items-center justify-center"
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "var(--color-primary-container)",
                  color: "var(--color-on-primary)",
                  fontSize: "10px",
                  fontWeight: 600,
                }}
              >
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-full transition-colors duration-200"
            style={{ color: "var(--color-on-surface-variant)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav
          className="md:hidden flex flex-col"
          style={{
            borderTop: "1px solid var(--color-surface-variant)",
            backgroundColor: "var(--color-surface-container-lowest)",
          }}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  padding: "var(--spacing-md) var(--spacing-lg)",
                  fontSize: "var(--text-body-md)",
                  color: isActive
                    ? "var(--color-primary)"
                    : "var(--color-on-surface-variant)",
                  fontWeight: isActive ? 500 : 400,
                  borderLeft: isActive
                    ? "3px solid var(--color-primary)"
                    : "3px solid transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}