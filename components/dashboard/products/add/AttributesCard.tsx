"use client";

import { cn } from "@/lib/utils";
import type { ProductAttribute } from "@/lib/services/products";

export const REQUIRED_PRODUCT_ATTRIBUTES = ["وزن", "ابعاد"] as const;

interface AttributesCardProps {
  attributes: ProductAttribute[];
  onAttributesChange: (attributes: ProductAttribute[]) => void;
}

export function AttributesCard({
  attributes,
  onAttributesChange,
}: AttributesCardProps) {
  const handleAdd = () => {
    onAttributesChange([...attributes, { name: "", value: "" }]);
  };

  const handleRemove = (index: number) => {
    if (REQUIRED_PRODUCT_ATTRIBUTES.includes(attributes[index]?.name as (typeof REQUIRED_PRODUCT_ATTRIBUTES)[number])) {
      return;
    }

    const next = attributes.filter((_, i) => i !== index);
    onAttributesChange(next);
  };

  const handleChange = (
    index: number,
    field: keyof ProductAttribute,
    value: string
  ) => {
    const next = attributes.map((attr, i) =>
      i === index ? { ...attr, [field]: value } : attr
    );
    onAttributesChange(next);
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-bold text-text">ویژگی‌ها</h2>

      <div className="space-y-3">
        {attributes.map((attr, index) => {
          const isRequiredAttribute = REQUIRED_PRODUCT_ATTRIBUTES.includes(
            attr.name as (typeof REQUIRED_PRODUCT_ATTRIBUTES)[number]
          );

          return (
            <div
              key={index}
              className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3"
            >
              {isRequiredAttribute ? (
                <div
                  className={cn(
                    "w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-text",
                    "sm:flex-1"
                  )}
                >
                  {attr.name}
                </div>
              ) : (
                <input
                  type="text"
                  value={attr.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  placeholder="نام"
                  className={cn(
                    "w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-text",
                    "sm:flex-1",
                    "placeholder:text-gray-400",
                    "focus:border-primary focus:outline-none focus:ring-0",
                    "transition-colors"
                  )}
                />
              )}
              <span className="hidden text-sm text-gray-400 sm:block">:</span>
              <input
                type="text"
                value={attr.value}
                onChange={(e) => handleChange(index, "value", e.target.value)}
                placeholder={attr.name === "وزن" ? "مثلاً ۱.۵ کیلوگرم" : attr.name === "ابعاد" ? "مثلاً ۲۰ × ۳۰ × ۱۰ سانتی‌متر" : "مقدار"}
                className={cn(
                  "w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-text",
                  "sm:flex-1",
                  "placeholder:text-gray-400",
                  "focus:border-primary focus:outline-none focus:ring-0",
                  "transition-colors"
                )}
              />
              {isRequiredAttribute ? (
                <div className="hidden h-9 w-9 shrink-0 sm:block" aria-hidden />
              ) : (
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center self-end rounded-xl text-red-500 transition-colors hover:bg-red-50 sm:self-center"
                >
                  ×
                </button>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className={cn(
          "mt-3 w-full rounded-xl border border-gray-300 py-2 text-sm font-medium text-text",
          "transition-colors hover:border-primary hover:text-primary"
        )}
      >
        افزودن ویژگی
      </button>
    </div>
  );
}
