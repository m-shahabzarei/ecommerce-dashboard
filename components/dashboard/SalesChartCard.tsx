"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

interface ChartDataPoint {
  name: string;
  sales: number;
  profit: number;
}

const data: ChartDataPoint[] = [
  { name: "شنبه", sales: 4200000, profit: 1200000 },
  { name: "یکشنبه", sales: 5100000, profit: 1800000 },
  { name: "دوشنبه", sales: 3800000, profit: 900000 },
  { name: "سه‌شنبه", sales: 6200000, profit: 2400000 },
  { name: "چهارشنبه", sales: 5500000, profit: 1900000 },
  { name: "پنجشنبه", sales: 7100000, profit: 3100000 },
  { name: "جمعه", sales: 4800000, profit: 1400000 },
];

function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return `${value}`;
}

interface TooltipPayloadItem {
  color: string;
  name: string;
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-lg border border-border bg-white p-3 shadow-lg">
      <p className="mb-1 text-sm font-semibold text-text">{label}</p>
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted">{entry.name}:</span>
            <span className="font-medium text-text">
              {entry.value.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface SalesChartCardProps {
  className?: string;
}

export function SalesChartCard({ className }: SalesChartCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white p-5 shadow-sm md:p-6",
        className
      )}
    >
      <h3 className="text-lg font-bold text-text">نمودار فروش و سود</h3>
      <p className="mt-1 text-sm text-muted">هفتگی</p>

      <div className="mt-5 h-[260px] w-full" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatCurrency}
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value: string) => (
                <span className="text-sm text-muted">{value}</span>
              )}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingTop: 8 }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              name="فروش"
              stroke="#155dfc"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#155dfc", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#155dfc", stroke: "#fff", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="profit"
              name="سود"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#10b981", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#10b981", stroke: "#fff", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
