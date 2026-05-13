"use client";

import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/lib/services/orders";

export const ORDER_TABS: { key: OrderStatus; label: string }[] = [
  { key: "pending", label: "ارسال نشده" },
  { key: "shipped", label: "ارسال شده" },
  { key: "action_required", label: "نیازمند اقدام" },
  { key: "closed", label: "بسته شده" },
];

interface OrdersTabsProps {
  activeTab: OrderStatus;
  onChange: (tab: OrderStatus) => void;
  counts?: Record<OrderStatus, number>;
}

export function OrdersTabs({ activeTab, onChange, counts }: OrdersTabsProps) {
  return (
    <div className="overflow-x-auto border-b border-slate-200/80 bg-[#F6F8FC]">
      <div className="grid min-w-180 grid-cols-4 bg-transparent px-2 pt-2">
        {ORDER_TABS.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChange(tab.key)}
              className={cn(
                "group relative flex h-18 items-center justify-center rounded-t-2xl px-4 text-sm font-semibold transition-all",
                isActive
                  ? "bg-white text-primary"
                  : "bg-transparent text-slate-500 hover:text-slate-800"
              )}
            >
              <span className="flex items-center gap-2">
                {counts && (
                  <span
                    className={cn(
                      "inline-flex min-w-7 items-center justify-center rounded-full px-2 py-1 text-xs font-bold transition-colors",
                      isActive
                        ? "bg-primary text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                    )}
                  >
                    {counts[tab.key].toLocaleString("fa-IR")}
                  </span>
                )}
                <span>{tab.label}</span>
              </span>

              <span
                className={cn(
                  "absolute inset-x-4 bottom-0 h-0.75 rounded-full transition-all",
                  isActive ? "bg-primary" : "bg-transparent"
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
