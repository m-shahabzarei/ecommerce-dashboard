"use client";

import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/lib/services/orders";
import { ORDER_TABS } from "@/components/dashboard/orders/OrdersTabs";

interface SellerOrdersTabsProps {
  activeTab: OrderStatus;
  onChange: (tab: OrderStatus) => void;
  counts: Record<OrderStatus, number>;
}

export function SellerOrdersTabs({
  activeTab,
  onChange,
  counts,
}: SellerOrdersTabsProps) {
  return (
    <div className="overflow-x-auto bg-white">
      <div className="grid min-w-[760px] grid-cols-4 bg-white">
        {ORDER_TABS.map((tab, index) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChange(tab.key)}
              className={cn(
                "group relative flex h-24 items-center justify-center px-4 text-center transition-colors",
                index !== ORDER_TABS.length - 1 && "border-l border-[#EEF2F7]",
                isActive ? "text-[#233C92]" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <span className="flex items-center gap-2 text-base font-semibold">
                <span className="inline-flex min-w-9 items-center justify-center rounded-md bg-slate-600 px-2 py-0.5 text-xs font-bold text-white shadow-sm">
                  {counts[tab.key].toLocaleString("fa-IR")}
                </span>
                <span>{tab.label}</span>
              </span>

              <span
                className={cn(
                  "absolute inset-x-10 bottom-0 h-1 rounded-full transition-colors",
                  isActive ? "bg-[#243A8F]" : "bg-transparent"
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

