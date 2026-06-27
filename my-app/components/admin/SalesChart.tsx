"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { mockSalesData } from "@/lib/data/mockData";

export default function SalesChart() {
  return (
    <div
      style={{
        backgroundColor: "var(--color-surface-container-lowest)",
        border: "1px solid var(--color-surface-variant)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--spacing-lg)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: "var(--spacing-lg)" }}
      >
        <div>
          <h2
            style={{
              fontSize: "var(--text-headline-sm)",
              fontWeight: 600,
              color: "var(--color-on-surface)",
            }}
          >
            Sales overview
          </h2>
          <p
            style={{
              fontSize: "var(--text-body-sm)",
              color: "var(--color-on-surface-variant)",
              marginTop: "2px",
            }}
          >
            Current week vs previous week
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4">
          {[
            { label: "Current",  color: "#2563eb" },
            { label: "Previous", color: "#c3c6d7" },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: color,
                }}
              />
              <span
                style={{
                  fontSize: "var(--text-label-md)",
                  color: "var(--color-on-surface-variant)",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart
          data={mockSalesData}
          margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="currentGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#2563eb" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="previousGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#c3c6d7" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#c3c6d7" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--color-outline-variant)"
            vertical={false}
          />

          <XAxis
            dataKey="day"
            tick={{
              fontSize: 12,
              fill: "var(--color-on-surface-variant)",
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{
              fontSize: 12,
              fill: "var(--color-on-surface-variant)",
            }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-surface-container-lowest)",
              border: "1px solid var(--color-surface-variant)",
              borderRadius: "8px",
              fontSize: "13px",
              color: "var(--color-on-surface)",
              boxShadow: "var(--shadow-card)",
            }}
          />

          <Area
            type="monotone"
            dataKey="previous"
            name="Previous"
            stroke="#c3c6d7"
            strokeWidth={2}
            fill="url(#previousGrad)"
            dot={false}
          />

          <Area
            type="monotone"
            dataKey="current"
            name="Current"
            stroke="#2563eb"
            strokeWidth={2}
            fill="url(#currentGrad)"
            dot={false}
            activeDot={{ r: 4, fill: "#2563eb" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}