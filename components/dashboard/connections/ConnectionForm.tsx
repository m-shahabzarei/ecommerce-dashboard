"use client";

import { useState, FormEvent, useCallback } from "react";
import { CheckIcon } from "@/components/ui/Icons";
import type { ConnectionFormData } from "@/lib/services/connections";

interface ConnectionFormProps {
  platformName: string;
  type: "increase" | "decrease";
  onSubmit: (data: ConnectionFormData) => void;
  onCancel: () => void;
}

export function ConnectionForm({
  platformName,
  type,
  onSubmit,
  onCancel,
}: ConnectionFormProps) {
  const [formData, setFormData] = useState<ConnectionFormData>({
    name: "",
    address: "",
    discount: "",
    apiKey: "oauth",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ConnectionFormData, string>>
  >({});

  const percentLabel =
    type === "increase" ? "درصد افزایش قیمت" : "درصد تخفیف";

  const updateField = useCallback(
    (field: keyof ConnectionFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    },
    [errors]
  );

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof ConnectionFormData, string>> = {};
    if (!formData.name.trim()) nextErrors.name = "نام فروشگاه الزامی است";
    if (!formData.address.trim()) nextErrors.address = "آدرس فروشگاه الزامی است";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[570px] overflow-hidden rounded-2xl bg-white shadow-[0_18px_45px_rgba(15,23,42,0.18)]">
      <div className="flex items-center justify-between bg-[#08c866] px-7 py-6 text-white">
        <div>
          <h2 className="text-xl font-extrabold">اتصال به {platformName}</h2>
          <p className="mt-1 text-sm font-medium text-white/90">
            بازارگاه آنلاین صنایع دستی
          </p>
        </div>
        <div className="flex h-[76px] w-[76px] items-center justify-center rounded-2xl bg-white shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff5c1f] text-2xl font-black text-white">
            :)
          </div>
        </div>
      </div>

      <form id="connection-form" onSubmit={handleSubmit} className="px-7 py-7">
        <div className="mb-6">
          <h3 className="text-lg font-extrabold text-text">اطلاعات پایه</h3>
          <p className="mt-1 text-sm font-medium text-muted">
            اطلاعات فروشگاه خود را وارد کنید
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 flex items-center gap-1.5 text-sm font-bold text-text"
            >
              <span className="text-muted">✿</span>
              نام فروشگاه
              <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="h-10 w-full border border-gray-300 bg-white px-3 text-sm text-text outline-none transition-colors placeholder:text-gray-400 focus:border-[#08c866]"
              placeholder="مثال: فروشگاه باسلام من"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="mb-2 flex items-center gap-1.5 text-sm font-bold text-text"
            >
              <span className="text-muted">☵</span>
              آدرس فروشگاه
              <span className="text-red-500">*</span>
            </label>
            <input
              id="address"
              type="text"
              value={formData.address}
              onChange={(e) => updateField("address", e.target.value)}
              className="h-10 w-full border border-gray-300 bg-white px-3 text-sm text-text outline-none transition-colors placeholder:text-gray-400 focus:border-[#08c866]"
              placeholder="https://example.com"
            />
            {errors.address && (
              <p className="mt-1 text-xs text-red-600">{errors.address}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="discount"
              className="mb-2 flex items-center gap-1.5 text-sm font-bold text-text"
            >
              <span className="text-muted">↔</span>
              {percentLabel}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="discount"
                type="number"
                min={0}
                max={100}
                value={formData.discount}
                onChange={(e) => updateField("discount", e.target.value)}
                className="h-10 w-full border border-gray-300 bg-white py-2 pr-3 pl-10 text-left text-sm text-text outline-none transition-colors placeholder:text-gray-400 focus:border-[#08c866]"
                placeholder="10-"
              />
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-sm text-muted">
                %
              </span>
            </div>
            <div className="mt-2 rounded-md border border-yellow-300 bg-yellow-50 px-3 py-2 text-center text-xs font-medium text-yellow-700">
              فروشگاه می‌تواند تا ۱۵٪ تخفیف اعمال کند
            </div>
          </div>
        </div>

        <div className="mt-7">
          <h3 className="text-lg font-extrabold text-text">احراز هویت</h3>
          <p className="mt-1 text-sm font-medium text-muted">
            اتصال امن به {platformName}
          </p>

          <div className="mt-4 flex items-center gap-4 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#08c866] text-white shadow-lg shadow-emerald-200">
              <CheckIcon className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-emerald-700">
                احراز هویت OAuth
              </h4>
              <p className="mt-1 text-xs font-medium leading-6 text-emerald-700">
                پس از کلیک روی دکمه اتصال، به فروشگاه باسلام هدایت می‌شوید. پس از تایید دسترسی، به صورت خودکار به پنل بازمی‌گردید.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-5">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="submit"
              className="flex h-10 items-center justify-center gap-2 rounded-md bg-[#08c866] text-sm font-extrabold text-white transition-colors hover:bg-[#07b85e]"
            >
              اتصال فروشگاه
              <CheckIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex h-10 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white text-sm font-extrabold text-text transition-colors hover:bg-gray-50"
            >
              انصراف
              <span>←</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
