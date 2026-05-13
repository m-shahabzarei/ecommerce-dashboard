import Link from "next/link";
import { cn } from "@/lib/utils";
import type {
  Order,
  OrderPanelTone,
  OrderTagTone,
} from "@/lib/services/orders";

interface OrdersTableProps {
  orders: Order[];
  isLoading?: boolean;
  error?: string | null;
}

const tagToneClasses: Record<OrderTagTone, string> = {
  success: "text-emerald-600",
  info: "text-blue-600",
  warning: "text-amber-600",
  danger: "text-rose-600",
};

const tagToneDotClasses: Record<OrderTagTone, string> = {
  success: "bg-emerald-500",
  info: "bg-blue-500",
  warning: "bg-amber-500",
  danger: "bg-rose-500",
};

const panelToneClasses: Record<
  OrderPanelTone,
  {
    wrapper: string;
    title: string;
    primaryButton: string;
    secondaryButton?: string;
  }
> = {
  info: {
    wrapper: "border-blue-200 bg-blue-50/80",
    title: "text-blue-700",
    primaryButton: "bg-primary text-white hover:bg-primary/90",
  },
  warning: {
    wrapper: "border-amber-300 bg-amber-50/80",
    title: "text-amber-700",
    primaryButton: "bg-emerald-500 text-white hover:bg-emerald-600",
    secondaryButton:
      "border border-rose-200 bg-white text-rose-600 hover:bg-rose-50",
  },
};

const statusIndicatorClasses = {
  pending: "border-blue-200 text-blue-500",
  shipped: "border-indigo-200 text-indigo-500",
  action_required: "border-amber-200 text-amber-500",
  closed: "border-emerald-200 text-emerald-500",
};

function formatCurrency(amount: number) {
  return `${amount.toLocaleString("fa-IR")} تومان`;
}

function TableSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
            <div className="flex gap-3">
              <div className="h-3 w-16 rounded-full bg-slate-100" />
              <div className="h-3 w-16 rounded-full bg-slate-100" />
            </div>
            <div className="space-y-2">
              <div className="mr-auto h-4 w-28 rounded-full bg-slate-200" />
              <div className="mr-auto h-3 w-20 rounded-full bg-slate-100" />
            </div>
          </div>
          <div className="mt-4 grid gap-4 lg:[grid-template-columns:220px_minmax(0,1fr)]">
            <div className="space-y-3">
              <div className="h-28 rounded-lg bg-emerald-50" />
              <div className="h-10 rounded-lg bg-slate-50" />
              <div className="h-10 rounded-lg bg-slate-50" />
            </div>
            <div className="space-y-3">
              <div className="h-24 rounded-lg bg-sky-50" />
              <div className="h-10 rounded-lg bg-slate-50" />
              <div className="h-10 rounded-lg bg-slate-50" />
              <div className="h-10 rounded-lg bg-amber-50" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  return (
    <article dir="ltr" className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-3 py-2.5 sm:px-4">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold">
            {order.tags.map((tag) => (
              <span key={tag.id} className={cn("inline-flex items-center gap-1.5", tagToneClasses[tag.tone])}>
                <span className={cn("h-1.5 w-1.5 rounded-full", tagToneDotClasses[tag.tone])} />
                {tag.label}
              </span>
            ))}
          </div>

          <div className="flex items-start justify-between gap-3 lg:justify-end">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-700">{order.code}</p>
              <p className="mt-0.5 text-xs text-slate-400">تاریخ ثبت: {order.createdAt}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn("flex h-7 w-7 items-center justify-center rounded-md border bg-white", statusIndicatorClasses[order.status])}>
                <CheckBadgeIcon className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-3 lg:[grid-template-columns:220px_minmax(0,1fr)] sm:p-4">
        <aside className="space-y-2.5 lg:order-1">
          <div className="rounded-sm border border-emerald-200 bg-emerald-50 px-4 py-4 text-center">
            <p className="text-[11px] font-semibold text-emerald-700">مبلغ قابل پرداخت</p>
            <p className="mt-2 text-2xl font-black leading-none text-emerald-700">
              {formatCurrency(order.payableAmount)}
            </p>
            <p className="mt-2 text-[11px] text-emerald-700/80">{order.paymentDescription}</p>
          </div>

          <button
            type="button"
            className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-primary/35 bg-white px-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
          >
            <PrintIcon className="h-4 w-4" />
            <span>چاپ برچسب</span>
          </button>

          <Link
            href={`/orders/${order.id}`}
            className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <EyeIcon className="h-4 w-4" />
            <span>مشاهده جزئیات</span>
          </Link>
        </aside>

        <div className="space-y-2.5 md:order-2">
          <section className="rounded-md border border-sky-100 bg-sky-50 px-4 py-3">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="min-w-0 text-right w-full">
                <p className="text-sm font-bold text-primary">گیرنده سفارش</p>
                <div className="mt-1 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs text-slate-500 sm:text-sm">
                  <span className="inline-flex items-center gap-1">
                    <UserIcon className="h-4 w-4" />
                    {order.customerName}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <PhoneIcon className="h-4 w-4" />
                    {order.customerPhone}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <PinIcon className="h-4 w-4" />
                    {order.city}، {order.province}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <PostIcon className="h-4 w-4" />
                    {order.postalCode}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-6 text-slate-500 sm:text-sm">{order.address}</p>
              </div>
            </div>
          </section>

          <div className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-[3px] border border-slate-300 text-[10px] text-slate-400">
              {order.itemCount.toLocaleString("fa-IR")}
            </span>
            <span className="font-medium" dir="rtl">{order.itemCount.toLocaleString("fa-IR")} قلم کالا</span>
          </div>

          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
              >
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-[3px] border border-slate-300 text-[10px] text-slate-400">
                  {(index + 1).toLocaleString("fa-IR")}
                </span>
                <p className="text-right leading-6">{item.title}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
            <span className="inline-flex items-center gap-1 font-medium">
              <ShipmentIcon className="h-4 w-4" />
              {order.packageCount.toLocaleString("fa-IR")} محموله
            </span>
            <span className="text-xs">محموله</span>
          </div>

          {order.statusPanel && (
            <section
              className={cn(
                "rounded-md border px-4 py-3",
                panelToneClasses[order.statusPanel.tone].wrapper
              )}
            >
              <div className="flex flex-col gap-4 lg:items-end lg:justify-between">
                <div className="text-right">
                  <div
                    className={cn(
                      "flex items-center justify-end gap-2 text-sm font-bold",
                      panelToneClasses[order.statusPanel.tone].title
                    )}
                  >
                    <span>{order.statusPanel.title}</span>
                    <AlertIcon className="h-4 w-4" />
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {order.statusPanel.description}
                  </p>
                </div>

                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                  {order.statusPanel.secondaryActionLabel && (
                    <button
                      type="button"
                      className={cn(
                        "inline-flex h-10 items-center justify-center rounded-md px-5 text-sm font-semibold transition-colors",
                        panelToneClasses[order.statusPanel.tone].secondaryButton
                      )}
                    >
                      {order.statusPanel.secondaryActionLabel}
                    </button>
                  )}
                  <button
                    type="button"
                    className={cn(
                      "inline-flex h-10 items-center justify-center rounded-md px-5 text-sm font-semibold transition-colors",
                      panelToneClasses[order.statusPanel.tone].primaryButton
                    )}
                  >
                    {order.statusPanel.primaryActionLabel}
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}

export function OrdersTable({ orders, isLoading, error }: OrdersTableProps) {
  if (isLoading) {
    return <TableSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-rose-100 bg-white py-16 shadow-sm">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-50">
          <AlertIcon className="h-6 w-6 text-rose-500" />
        </div>
        <p className="text-sm font-medium text-text">خطا در بارگذاری</p>
        <p className="mt-1 text-sm text-muted">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white py-16 shadow-sm">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <BoxIcon className="h-6 w-6 text-slate-400" />
        </div>
        <p className="text-sm font-medium text-text">سفارشی برای این تب یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}

function CheckBadgeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="8" r="4" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.66 2.62a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.46-1.32a2 2 0 0 1 2.11-.45c.84.32 1.72.54 2.62.66A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s-6-5.33-6-11a6 6 0 1 1 12 0c0 5.67-6 11-6 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function PostIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h16v12H4z" />
      <path d="m22 8-10 6L2 8" />
    </svg>
  );
}

function BoxIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="M12 12 4 7.5" />
      <path d="M12 12l8-4.5" />
      <path d="M12 12v9" />
    </svg>
  );
}

function ShipmentIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7h11v10H3z" />
      <path d="M14 10h4l3 3v4h-7" />
      <circle cx="7.5" cy="18.5" r="1.5" />
      <circle cx="17.5" cy="18.5" r="1.5" />
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
      <path d="M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0Z" />
    </svg>
  );
}

function PrintIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9V4h12v5" />
      <rect x="6" y="14" width="12" height="6" rx="1" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <path d="M17 12h.01" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
