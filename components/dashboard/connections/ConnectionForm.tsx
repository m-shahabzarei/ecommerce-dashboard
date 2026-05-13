"use client";

import { useState, FormEvent, useCallback, useMemo, useEffect } from "react";
import { CheckIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import type { ConnectionFormData } from "@/lib/services/connections";

interface ConnectionFormProps {
  platformName: string;
  type: "increase" | "decrease";
  initialData?: ConnectionFormData | null;
  onSubmit: (data: ConnectionFormData) => void;
  onCancel: () => void;
}

const emptyFormData: ConnectionFormData = {
  name: "",
  address: "",
  discount: "",
  apiKey: "oauth",
};

export function ConnectionForm({
  platformName,
  type,
  initialData,
  onSubmit,
  onCancel,
}: ConnectionFormProps) {
  const [formData, setFormData] = useState<ConnectionFormData>(
    initialData ?? emptyFormData
  );

  const [errors, setErrors] = useState<
    Partial<Record<keyof ConnectionFormData, string>>
  >({});

  useEffect(() => {
    setFormData(initialData ?? emptyFormData);
    setErrors({});
  }, [initialData]);

  const percentLabel =
    type === "increase" ? "درصد افزایش قیمت" : "درصد تخفیف";

  const percentHint =
    type === "increase"
      ? "درصد افزایش مورد نظر برای هماهنگی قیمت‌ها را مشخص کنید."
      : "درصد تخفیف مورد نظر برای هماهنگی قیمت‌ها را مشخص کنید.";

  const todayLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("fa-IR", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }).format(new Date()),
    []
  );

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
    <div className="mx-auto w-full max-w-[720px] rounded-[28px] bg-white p-6 shadow-sm md:p-8">
      <div className="border-b border-border pb-6 text-right">
        <p className="text-sm font-medium text-muted">{todayLabel}</p>
        <h2 className="mt-2 text-2xl font-bold text-text">
          فرم اتصال {platformName}
        </h2>
        <p className="mt-2 text-sm text-muted">
          اطلاعات فروشگاه و دسترسی اتصال را وارد کنید.
        </p>
      </div>

      <form id="connection-form" onSubmit={handleSubmit} className="pt-6">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-bold text-text"
            >
              نام فروشگاه <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              className={cn(
                "h-12 w-full rounded-xl border border-border bg-white px-4 text-sm text-text outline-none transition-colors",
                "placeholder:text-gray-400 focus:border-primary"
              )}
              placeholder="مثال: فروشگاه باسلام من"
            />
            {errors.name ? (
              <p className="mt-2 text-xs text-red-600">{errors.name}</p>
            ) : (
              <p className="mt-2 text-xs text-muted">
                این نام در لیست اتصال‌های شما نمایش داده می‌شود.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="mb-2 block text-sm font-bold text-text"
            >
              آدرس فروشگاه <span className="text-red-500">*</span>
            </label>
            <input
              id="address"
              type="text"
              value={formData.address}
              onChange={(e) => updateField("address", e.target.value)}
              className={cn(
                "h-12 w-full rounded-xl border border-border bg-white px-4 text-sm text-text outline-none transition-colors",
                "placeholder:text-gray-400 focus:border-primary"
              )}
              placeholder="https://example.com"
              dir="ltr"
            />
            {errors.address ? (
              <p className="mt-2 text-xs text-red-600">{errors.address}</p>
            ) : (
              <p className="mt-2 text-xs text-muted">
                آدرس کامل فروشگاه خود در {platformName} را وارد کنید.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="discount"
              className="mb-2 block text-sm font-bold text-text"
            >
              {percentLabel} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="discount"
                type="number"
                min={0}
                max={100}
                value={formData.discount}
                onChange={(e) => updateField("discount", e.target.value)}
                className={cn(
                  "h-12 w-full rounded-xl border border-border bg-white py-2 pr-4 pl-16 text-sm text-text outline-none transition-colors",
                  "placeholder:text-gray-400 focus:border-primary"
                )}
                placeholder="مثلاً 10"
              />
              <span className="pointer-events-none absolute inset-y-0 left-0 flex w-12 items-center justify-center rounded-l-xl border-r border-border bg-gray-50 text-sm font-medium text-muted">
                %
              </span>
            </div>
            <p className="mt-2 text-xs text-muted">{percentHint}</p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[#f2d9a8] bg-[#fff6e8] p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4b74a] text-sm font-bold text-white">
              !
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#a86400]">احراز هویت OAuth</h3>
              <p className="mt-1 text-xs leading-6 text-[#b07a1d]">
                پس از کلیک روی دکمه اتصال، به فروشگاه باسلام هدایت می‌شوید. پس از تایید دسترسی، به صورت خودکار به پنل بازمی‌گردید.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="h-11 rounded-xl border border-border bg-white px-5 text-sm font-bold text-text transition-colors hover:bg-gray-50"
          >
            انصراف
          </button>
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-white transition-colors hover:bg-primary/90"
          >
            اتصال فروشگاه
            <CheckIcon className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
