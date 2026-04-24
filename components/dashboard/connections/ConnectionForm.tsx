"use client";

import { useState, FormEvent, useCallback } from "react";
import { CheckIcon } from "@/components/ui/Icons";
import type { ConnectionFormData } from "@/lib/services/connections";

interface ConnectionFormProps {
  platformName: string;
  type: "increase" | "decrease";
  onSubmit: (data: ConnectionFormData) => void;
}

export function ConnectionForm({
  platformName,
  type,
  onSubmit,
}: ConnectionFormProps) {
  const [formData, setFormData] = useState<ConnectionFormData>({
    name: "",
    address: "",
    discount: "",
    apiKey: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ConnectionFormData, string>>
  >({});

  const percentLabel =
    type === "increase" ? "درصد افزایش قیمت" : "درصد کاهش قیمت";

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
    if (!formData.apiKey.trim()) nextErrors.apiKey = "API KEY الزامی است";
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
    <div className="relative mx-auto w-full max-w-[500px] rounded-2xl bg-white p-6 shadow-sm md:p-8">
      <button
        type="submit"
        form="connection-form"
        className="absolute top-4 left-4 flex h-11 w-11 items-center justify-center rounded-full text-primary border-2 border-primary border transition-transform hover:scale-105 active:scale-95"
        aria-label="تایید و ارسال"
      >
        <CheckIcon className="h-5 w-5" />
      </button>

 
      <form
        id="connection-form"
        onSubmit={handleSubmit}
        className="mt-6 space-y-5"
      >
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-text"
          >
            نام فروشگاه
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary/20"
            placeholder="مثلا: فروشگاه کالاباما"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="address"
            className="mb-1.5 block text-sm font-medium text-text"
          >
            آدرس فروشگاه
          </label>
          <input
            id="address"
            type="text"
            value={formData.address}
            onChange={(e) => updateField("address", e.target.value)}
            className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary/20"
            placeholder="مثلا: https://basalam.com/kalabama"
          />
          {errors.address && (
            <p className="mt-1 text-xs text-red-600">{errors.address}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="discount"
            className="mb-1.5 block text-sm font-medium text-text"
          >
            {percentLabel}
          </label>
          <div className="relative">
            <input
              id="discount"
              type="number"
              min={0}
              max={100}
              value={formData.discount}
              onChange={(e) => updateField("discount", e.target.value)}
              className="w-full rounded-xl border border-border bg-white py-2.5 pr-4 pl-10 text-sm text-text outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary/20"
              placeholder="۰"
            />
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-sm text-muted">
              %
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="apiKey"
            className="mb-1.5 block text-sm font-medium text-text"
          >
            API KEY
          </label>
          <input
            id="apiKey"
            type="text"
            value={formData.apiKey}
            onChange={(e) => updateField("apiKey", e.target.value)}
            className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-mono text-text outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary/20"
            placeholder="sk_live_..."
          />
          {errors.apiKey && (
            <p className="mt-1 text-xs text-red-600">{errors.apiKey}</p>
          )}
        </div>
      </form>
    </div>
  );
}
