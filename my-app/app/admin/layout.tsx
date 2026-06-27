import AdminSidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex"
      style={{ minHeight: "100vh" }}
    >
      <AdminSidebar />

      <div
        className="flex-1 flex flex-col min-w-0"
        style={{
          backgroundColor: "var(--color-surface)",
        }}
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
          <div />
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