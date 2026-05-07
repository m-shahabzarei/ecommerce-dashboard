"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const PRESET_AMOUNTS = [50_000, 10_000 , 150_000];

interface WithdrawRequestModalProps {
  isOpen: boolean;
  withdrawableBalance: number;
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

export function WithdrawRequestModal({
  isOpen,
  withdrawableBalance,
  onClose,
  onConfirm,
}: WithdrawRequestModalProps) {
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

  const handleUseAllBalance = () => {
    setAmount(withdrawableBalance);
    setCustomAmount(formatAmount(withdrawableBalance));
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                </svg>
              </span>
              <h2 className="text-lg font-extrabold text-text">
                درخواست برداشت از کیف پول
              </h2>
            </div>
            <p className="mt-2 text-xs font-medium leading-5 text-muted">
              مبلغ مورد نظر خود را برای برداشت وارد کنید. این درخواست پس از تایید مدیر به حساب شما واریز خواهد شد.
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
          <span className="text-xs font-bold text-text">موجودی قابل برداشت:</span>
          <span className="text-lg font-extrabold text-primary">
            {formatAmount(withdrawableBalance)} تومان
          </span>
        </div>

        <div>
          <h3 className="mb-3 text-right text-sm font-bold text-text">
            مبالغ پیشنهادی:
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {PRESET_AMOUNTS.map((preset, index) => {
              const isSelected = amount === preset;

              return (
                <button
                  key={`${preset}-${index}`}
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

        <button
          type="button"
          onClick={handleUseAllBalance}
          className="mt-3 h-9 w-full rounded-md border border-primary/20 bg-primary/5 text-xs font-extrabold text-text transition-colors hover:border-primary/40 hover:text-primary"
        >
          تمام موجودی ({formatAmount(withdrawableBalance)} تومان)
        </button>

        <div className="mt-5">
          <label
            htmlFor="withdraw-amount"
            className="mb-2 block text-right text-sm font-bold text-text"
          >
            مبلغ دلخواه:
          </label>
          <input
            id="withdraw-amount"
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
            ثبت درخواست
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
