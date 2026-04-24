"use client";

import { cn } from "@/lib/utils";

interface PricingCardProps {
  price: string;
  inventory: string;
  discount: string;
  onPriceChange: (value: string) => void;
  onInventoryChange: (value: string) => void;
  onDiscountChange: (value: string) => void;
}

function NumberField({
  label,
  value,
  onChange,
  placeholder,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  suffix?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-text">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          min={0}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-text",
            "placeholder:text-gray-400",
            "focus:border-primary focus:outline-none focus:ring-0",
            "transition-colors"
          )}
        />
        {suffix && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

export function PricingCard({
  price,
  inventory,
  discount,
  onPriceChange,
  onInventoryChange,
  onDiscountChange,
}: PricingCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-bold text-text">قیمت‌گذاری</h2>

      <div className="space-y-4">
        <NumberField
          label="قیمت"
          value={price}
          onChange={onPriceChange}
          placeholder="مثلاً 200000"
          suffix="تومان"
        />
        <NumberField
          label="موجودی"
          value={inventory}
          onChange={onInventoryChange}
          placeholder="مثلاً 10"
        />
        <NumberField
          label="تخفیف (اختیاری)"
          value={discount}
          onChange={onDiscountChange}
          placeholder="مثلاً 10"
          suffix="%"
        />
      </div>
    </div>
  );
}
