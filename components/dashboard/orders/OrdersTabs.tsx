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
    <div className="mb-5 grid grid-cols-4">
      {ORDER_TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={cn(
            "flex h-20 items-center justify-center border text-sm font-medium transition-all",
            activeTab === tab.key
              ? "border-primary bg-primary text-white shadow-sm"
              : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
          )}
        >
          <span className="flex items-center gap-1.5"
          >
            {tab.label}
            {counts && (
              <span
                className={cn(
                  "flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-semibold",
                  activeTab === tab.key
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500"
                )}
              >
                {counts[tab.key]}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}
