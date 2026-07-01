import DataTable from "@/components/admin/DataTable";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function InventoryPage() {
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
            Inventory
          </h1>
          <p
            style={{
              fontSize: "var(--text-body-md)",
              color: "var(--color-on-surface-variant)",
              marginTop: "4px",
            }}
          >
            Manage your products, stock levels, and listings.
          </p>
        </div>

        <Link href="/admin/products/new">
          <Button variant="primary" size="md">
            <Plus size={16} />
            Add product
          </Button>
        </Link>
      </div>

      {/* Table */}
      <DataTable />
    </div>
  );
}