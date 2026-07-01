import MetricCard from "@/components/admin/MetricCard";
import SalesChart from "@/components/admin/SalesChart";
import ActivityFeed from "@/components/admin/ActivityFeed";
import type { MetricCard as MetricCardType } from "@/lib/types";

const metrics: MetricCardType[] = [
  {
    label:       "Total revenue",
    value:       "$48,295",
    change:      12.4,
    changeLabel: "vs last week",
  },
  {
    label:       "Orders",
    value:       "324",
    change:      8.1,
    changeLabel: "vs last week",
  },
  {
    label:       "Avg. order value",
    value:       "$149",
    change:      -3.2,
    changeLabel: "vs last week",
  },
  {
    label:       "Inventory items",
    value:       "243",
    change:      2.7,
    changeLabel: "vs last week",
  },
];

export default function AdminOverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div>
        <h1
          style={{
            fontSize: "var(--text-headline-lg)",
            fontWeight: 600,
            color: "var(--color-on-surface)",
            letterSpacing: "-0.01em",
          }}
        >
          Overview
        </h1>
        <p
          style={{
            fontSize: "var(--text-body-md)",
            color: "var(--color-on-surface-variant)",
            marginTop: "4px",
          }}
        >
          Welcome back. Here's what's happening this week.
        </p>
      </div>

      {/* Metric cards */}
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        }}
      >
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      {/* Chart + Activity — two column */}
      <div
        className="grid gap-6 overflow-auto"
        style={{
          gridTemplateColumns: "minmax(0, 1fr) 340px",
          alignItems: "start",
        }}
      >
        <SalesChart />
        <ActivityFeed />
      </div>
    </div>
  );
}