"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const PRESET_AMOUNTS = [200_000,1_000_000, 500_000];

interface IncreaseCreditModalProps {
  isOpen: boolean;
  currentBalance: number;
  onClose: () => void;
  onConfirm: (amount: number) => void;
}

function formatAmount(amount: number): string {
  return amount.toLocaleString("fa-IR");
}

function normalizeDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(/,/g, "");
}

export function IncreaseCreditModal({
  isOpen,
  currentBalance,
  onClose,
  onConfirm,
}: IncreaseCreditModalProps) {
  const [amount, setAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState("");

  if (!isOpen) return null;

  const handlePresetClick = (nextAmount: number) => {
    setAmount(nextAmount);
    setCustomAmount(formatAmount(nextAmount));
  };

  const handleCustomChange = (value: string) => {
    const normalizedValue = normalizeDigits(value);
    const nextAmount = Number(normalizedValue);

    setCustomAmount(value);
    if (!Number.isNaN(nextAmount)) {
      setAmount(nextAmount);
    }
  };

  const handleConfirm = () => {
    if (amount > 0) {
      onConfirm(amount);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[440px] rounded-xl bg-white p-4 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 0 0 6h3.75A2.25 2.25 0 0 0 21 13.5V12Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h13.5A3.75 3.75 0 0 1 21 10.5v6.75A3.75 3.75 0 0 1 17.25 21H6.75A3.75 3.75 0 0 1 3 17.25V6.75a3 3 0 0 1 3-3h11.25" />
                </svg>
              </span>
              <h2 className="text-lg font-extrabold text-text">
                افزایش موجودی کیف پول
              </h2>
            </div>
            <p className="mt-2 text-xs font-medium text-muted">
              مبلغ مورد نظر خود را برای افزایش موجودی وارد کنید.
            </p>
          </div>
          <button
            type="button"
            aria-label="بستن"
            onClick={onClose}
            className="text-2xl leading-none text-muted transition-colors hover:text-text"
          >
            ×
          </button>
        </div>

        <div className="mb-4 flex items-center justify-between rounded-md bg-primary/10 px-3 py-2">
          <span className="text-xs font-bold text-text">موجودی فعلی:</span>
          <span className="text-lg font-extrabold text-primary">
            {formatAmount(currentBalance)} تومان
          </span>
        </div>

        <div>
          <h3 className="mb-3 text-right text-sm font-bold text-text">
            مبالغ پیشنهادی:
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {PRESET_AMOUNTS.map((preset) => {
              const isSelected = amount === preset;

              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handlePresetClick(preset)}
                  className={cn(
                    "h-9 rounded-md border px-2 text-xs font-extrabold transition-all",
                    isSelected
                      ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                      : "border-border bg-white text-text hover:border-primary/40 hover:text-primary"
                  )}
                >
                  {formatAmount(preset)} تومان
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5">
          <label
            htmlFor="credit-amount"
            className="mb-2 block text-right text-sm font-bold text-text"
          >
            مبلغ دلخواه:
          </label>
          <input
            id="credit-amount"
            type="text"
            inputMode="numeric"
            value={customAmount}
            onChange={(event) => handleCustomChange(event.target.value)}
            className="h-11 w-full rounded-none border border-border bg-white px-4 text-left text-sm font-medium text-text outline-none transition-colors placeholder:text-muted focus:border-primary"
            placeholder="مبلغ به تومان"
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={amount <= 0}
            className="h-10 rounded-md bg-primary text-sm font-extrabold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-primary/50"
          >
            پرداخت
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-md border border-border bg-white text-sm font-extrabold text-text transition-colors hover:bg-gray-50"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}
