"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import { Menu, X } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex" style={{ minHeight: "100vh" }}>

      {/* Sidebar — hidden on mobile unless open */}
      <div
        className={`admin-sidebar ${sidebarOpen ? "admin-sidebar-open" : ""}`}
        style={{ display: "flex" }}
      >
        <AdminSidebar />
      </div>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: "rgba(15, 23, 42, 0.4)" }}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed top-0 left-0 h-full z-50 md:hidden"
          style={{ display: "flex" }}
        >
          <AdminSidebar />
        </div>
      )}

      {/* Main content */}
      <div
        className="flex-1 flex flex-col min-w-0"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        {/* Top bar */}
        <header
          className="flex items-center justify-between shrink-0"
          style={{
            padding: "var(--spacing-md) var(--spacing-lg)",
            backgroundColor: "var(--color-surface-container-lowest)",
            borderBottom: "1px solid var(--color-surface-variant)",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded-lg transition-colors duration-200"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              color: "var(--color-on-surface-variant)",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--color-surface-container)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="hidden md:block" />

          {/* Admin badge */}
          <div
            className="flex items-center gap-2"
            style={{
              padding: "6px var(--spacing-md)",
              backgroundColor: "var(--color-surface-container)",
              borderRadius: "var(--radius-full)",
              border: "1px solid var(--color-surface-variant)",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--color-success)",
              }}
            />
            <span
              style={{
                fontSize: "var(--text-label-md)",
                color: "var(--color-on-surface-variant)",
                fontWeight: 500,
              }}
            >
              Admin
            </span>
          </div>
        </header>

        {/* Page content */}
        <div
          className="flex-1"
          style={{ padding: "var(--spacing-lg)" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}