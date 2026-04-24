import { cn } from "@/lib/utils";
import {
  getStatusLabel,
  type Transaction,
  type TransactionStatus,
} from "@/lib/services/finance";

interface TransactionsTableProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

const STATUS_STYLES: Record<TransactionStatus, string> = {
  success: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  failed: "bg-red-100 text-red-700",
};

function TableSkeleton() {
  return (
    <div className="animate-pulse divide-y divide-border">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 px-6 py-4"
        >
          <div className="h-4 flex-[2] rounded bg-gray-200" />
          <div className="h-4 w-20 rounded bg-gray-200" />
          <div className="h-4 w-28 rounded bg-gray-200" />
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-4 w-16 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <svg
          className="h-6 w-6 text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <p className="text-sm font-medium text-text">تراکنشی یافت نشد</p>
    </div>
  );
}

export function TransactionsTable({
  transactions,
  isLoading,
}: TransactionsTableProps) {
  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="hidden bg-gray-100 px-6 py-3 text-sm font-bold text-text md:grid md:grid-cols-[2fr_100px_140px_100px_80px] md:items-center md:gap-4">
          <span>شرح</span>
          <span className="text-center">وضعیت</span>
          <span className="text-center">مبلغ</span>
          <span className="text-center">تاریخ</span>
          <span className="text-left">زمان</span>
        </div>
        <TableSkeleton />
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="hidden bg-gray-100 px-6 py-3 text-sm font-bold text-text md:grid md:grid-cols-[2fr_100px_140px_100px_80px] md:items-center md:gap-4">
          <span>شرح</span>
          <span className="text-center">وضعیت</span>
          <span className="text-center">مبلغ</span>
          <span className="text-center">تاریخ</span>
          <span className="text-left">زمان</span>
        </div>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="hidden bg-gray-100 px-6 py-3 text-sm font-bold text-text md:grid md:grid-cols-[2fr_100px_140px_100px_80px] md:items-center md:gap-4">
        <span>شرح</span>
        <span className="text-center">وضعیت</span>
        <span className="text-center">مبلغ</span>
        <span className="text-center">تاریخ</span>
        <span className="text-left">زمان</span>
      </div>

      <div className="divide-y divide-border">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="px-6 py-4 transition-colors hover:bg-gray-50/50 md:grid md:grid-cols-[2fr_100px_140px_100px_80px] md:items-center md:gap-4"
          >
            <div className="mt-1 md:mt-0">
              <span className="text-sm text-text">{tx.description}</span>
            </div>

            <div className="mt-1 flex items-center gap-2 md:mt-0 md:justify-center">
              <span className="text-xs text-muted md:hidden">وضعیت:</span>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-medium",
                  STATUS_STYLES[tx.status]
                )}
              >
                {getStatusLabel(tx.status)}
              </span>
            </div>

            <div className="mt-1 text-right md:mt-0 md:text-center">
              <span
                className={cn(
                  "text-sm font-medium",
                  tx.amount > 0 ? "text-green-600" : "text-red-600"
                )}
              >
                {tx.amount > 0 ? "+" : ""}
                {tx.amount.toLocaleString("fa-IR")} تومان
              </span>
            </div>

            <div className="mt-1 text-right md:mt-0 md:text-center">
              <span className="text-sm text-muted">{tx.date}</span>
            </div>

            <div className="mt-1 flex items-center gap-2 md:mt-0 md:justify-end">
              <span className="text-xs text-muted md:hidden">زمان:</span>
              <span className="text-sm text-muted">{tx.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
