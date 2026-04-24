"use client";

import { cn } from "@/lib/utils";

export type MarketTab = "products" | "suppliers";

interface MarketTabsProps {
  activeTab: MarketTab;
  onChange: (tab: MarketTab) => void;
}

const tabs: { key: MarketTab; label: string }[] = [
  { key: "products", label: "محصولات" },
  { key: "suppliers", label: "تامین‌کنندگان" },
];

export function MarketTabs({ activeTab, onChange }: MarketTabsProps) {
  return (
    <div className="flex items-center gap-1 rounded-xl bg-gray-100 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={cn(
            "flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all",
            activeTab === tab.key
              ? "bg-white text-primary shadow-sm"
              : "text-muted hover:text-text"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
