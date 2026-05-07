"use client";

import { cn } from "@/lib/utils";
import { getStatusLabel, type Transaction } from "@/lib/services/finance";

interface TransactionDetailsModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

interface TransactionDetailRow {
  id: string;
  description: string;
  type: string;
  status: string;
  amount: number;
  date: string;
}

function formatAmount(amount: number): string {
  return `${Math.abs(amount).toLocaleString("fa-IR")} تومان`;
}

function createTrackingCode(transaction: Transaction): string {
  return `BS-${String(66360950 + transaction.id).padStart(8, "0")}`;
}

function createTransactionDetails(transaction: Transaction): TransactionDetailRow[] {
  const baseId = `6f8ed577-7b03-42d5-8a98-abd557f3af24-${transaction.id}`;
  const amount = Math.abs(transaction.amount);

  if (transaction.amount < 0) {
    return [
      {
        id: `${baseId}-withdraw`,
        description: `ثبت درخواست برداشت از کیف پول ${createTrackingCode(transaction)}`,
        type: "برداشت",
        status: getStatusLabel(transaction.status),
        amount: transaction.amount,
        date: transaction.date,
      },
      {
        id: `${baseId}-fee`,
        description: `کارمزد پردازش درخواست برداشت ${createTrackingCode(transaction)}`,
        type: "کارمزد",
        status: getStatusLabel(transaction.status),
        amount: -Math.max(Math.round(amount * 0.02), 3_000),
        date: transaction.date,
      },
    ];
  }

  return [
    {
      id: `${baseId}-payment`,
      description: `دریافت بابت ${transaction.description}`,
      type: "پرداخت سفارش",
      status: getStatusLabel(transaction.status),
      amount,
      date: transaction.date,
    },
    {
      id: `${baseId}-processing`,
      description: `دریافت هزینه پردازش برای سفارش ${createTrackingCode(transaction)}`,
      type: "هزینه پردازش",
      status: getStatusLabel(transaction.status),
      amount: Math.max(Math.round(amount * 0.02), 5_000),
      date: transaction.date,
    },
    {
      id: `${baseId}-shipping`,
      description: `دریافت هزینه ارسال برای سفارش ${createTrackingCode(transaction)}`,
      type: "هزینه ارسال",
      status: getStatusLabel(transaction.status),
      amount: Math.max(Math.round(amount * 0.04), 25_000),
      date: transaction.date,
    },
    {
      id: `${baseId}-support`,
      description: `دریافت هزینه پشتیبانی برای سفارش ${createTrackingCode(transaction)}`,
      type: "هزینه پشتیبانی",
      status: getStatusLabel(transaction.status),
      amount: Math.max(Math.round(amount * 0.01), 3_000),
      date: transaction.date,
    },
    {
      id: `${baseId}-commission`,
      description: `کارمزد تامین کننده برای سفارش ${createTrackingCode(transaction)}`,
      type: "کمیسیون",
      status: getStatusLabel(transaction.status),
      amount: -Math.max(Math.round(amount * 0.08), 4_100),
      date: transaction.date,
    },
  ];
}

export function TransactionDetailsModal({
  transaction,
  onClose,
}: TransactionDetailsModalProps) {
  if (!transaction) return null;

  const trackingCode = createTrackingCode(transaction);
  const details = createTransactionDetails(transaction);
  const total = details.reduce((sum, row) => sum + row.amount, 0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-[920px] overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="overflow-y-auto p-6">
          <div className="mb-5">
            <h2 className="text-xl font-extrabold text-text">
              جزئیات تراکنش‌های سفارش
            </h2>
            <p className="mt-3 text-sm font-extrabold text-text">{trackingCode}</p>
            <p className="mt-2 text-xs font-medium text-muted">
              {details[0]?.id}
            </p>
            <p className="mt-4 text-sm font-medium text-text">
              مجموع تراکنش‌ها: {formatAmount(total)} - تعداد تراکنش‌ها: {details.length.toLocaleString("fa-IR")}
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[760px] overflow-hidden rounded-lg border border-border">
              <div className="grid grid-cols-[2.2fr_120px_110px_120px_110px] gap-4 bg-gray-50 px-4 py-3 text-sm font-bold text-muted">
                <span>شرح</span>
                <span className="text-center">نوع</span>
                <span className="text-center">وضعیت</span>
                <span className="text-center">مبلغ</span>
                <span className="text-left">تاریخ</span>
              </div>

              <div className="divide-y divide-border bg-white">
                {details.map((row) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-[2.2fr_120px_110px_120px_110px] gap-4 px-4 py-4 text-sm"
                  >
                    <span className="text-right leading-6 text-text">
                      {row.description}
                    </span>
                    <span className="text-center text-text">{row.type}</span>
                    <span className="text-center font-bold text-green-600">
                      {row.status}
                    </span>
                    <span
                      className={cn(
                        "text-center font-extrabold",
                        row.amount >= 0 ? "text-green-600" : "text-red-600"
                      )}
                    >
                      {row.amount < 0 ? "-" : ""}
                      {formatAmount(row.amount)}
                    </span>
                    <span className="text-left text-muted">{row.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-5 rounded-lg border border-border bg-white px-5 py-2 text-sm font-bold text-text transition-colors hover:bg-gray-50"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
}
