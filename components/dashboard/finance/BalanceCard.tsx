"use client";

import { cn } from "@/lib/utils";

interface BalanceCardProps {
  title: string;
  amount: number;
  buttonLabel: string;
  onButtonClick?: () => void;
}

function formatCurrency(amount: number): string {
  return `${amount.toLocaleString("fa-IR")} تومان`;
}

export function BalanceCard({
  title,
  amount,
  buttonLabel,
  onButtonClick,
}: BalanceCardProps) {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-6 shadow-sm">
      <span className="text-sm font-medium text-muted">{title}</span>
      <span className="my-3 text-2xl font-bold text-text">
        {formatCurrency(amount)}
      </span>
      <button
        type="button"
        onClick={onButtonClick}
        className={cn(
          "mt-auto w-full rounded-xl bg-primary py-2 text-sm font-medium text-white",
          "transition-colors hover:bg-[#1352e0]"
        )}
      >
        {buttonLabel}
      </button>
    </div>
  );
}
