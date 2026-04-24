"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { updateShippingCost, type ShippingCostPayload } from "@/lib/services/shipping";

function NumberInput({
  label,
  value,
  onChange,
  placeholder,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  suffix?: string;
}) {
  return (
    <div className="flex-1">
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

export function ShippingCostCard() {
  const [baseCost, setBaseCost] = useState("");
  const [perKgCost, setPerKgCost] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValid =
    baseCost.trim() !== "" &&
    perKgCost.trim() !== "" &&
    Number(baseCost) >= 0 &&
    Number(perKgCost) >= 0;

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isValid) return;

      const payload: ShippingCostPayload = {
        baseCost: Number(baseCost),
        perKgCost: Number(perKgCost),
      };

      setIsLoading(true);
      try {
        await updateShippingCost(payload);
        console.log(payload);
      } finally {
        setIsLoading(false);
      }
    },
    [baseCost, perKgCost, isValid]
  );

  return (
    <div className="max-w-[600px] rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-bold text-text">هزینه ارسال</h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <NumberInput
            label="هزینه پایه"
            value={baseCost}
            onChange={setBaseCost}
            placeholder="مثلاً 20000"
            suffix="تومان"
          />
          <NumberInput
            label="هزینه هر کیلوگرم"
            value={perKgCost}
            onChange={setPerKgCost}
            placeholder="مثلاً 5000"
            suffix="تومان"
          />
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className={cn(
              "h-[42px] shrink-0 rounded-xl px-6 text-sm font-medium text-white transition-all",
              "bg-primary hover:bg-[#1352e0]",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            {isLoading ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              "اعمال"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
