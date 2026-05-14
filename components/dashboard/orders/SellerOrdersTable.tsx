import Link from "next/link";
import { cn } from "@/lib/utils";
import type {
  Order,
  OrderPanelTone,
  OrderStatus,
  OrderTagTone,
} from "@/lib/services/orders";

interface SellerOrdersTableProps {
  orders: Order[];
  isLoading?: boolean;
  error?: string | null;
}

const tagToneClasses: Record<OrderTagTone, string> = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-600",
  info: "border-indigo-200 bg-indigo-50 text-indigo-600",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  danger: "border-rose-200 bg-rose-50 text-rose-600",
};

const statusIconClasses: Record<OrderStatus, string> = {
  pending: "border-amber-200 text-amber-500",
  shipped: "border-indigo-200 text-indigo-500",
  action_required: "border-amber-200 text-amber-500",
  closed: "border-rose-200 text-rose-500",
};

const statusPanelClasses: Record<
  OrderPanelTone,
  {
    wrapper: string;
    title: string;
    primaryButton: string;
    secondaryButton?: string;
  }
> = {
  info: {
    wrapper: "border-[#CDD6FF] bg-[#F5F7FF]",
    title: "text-[#4E5FE0]",
    primaryButton: "bg-[#6156F9] text-white hover:bg-[#554BE0]",
  },
  warning: {
    wrapper: "border-[#F6D675] bg-[#FFF8E7]",
    title: "text-[#D2841E]",
    primaryButton: "bg-[#06C46B] text-white hover:bg-[#05B060]",
    secondaryButton:
      "border border-rose-300 bg-white text-rose-600 hover:bg-rose-50",
  },
};

function formatCurrency(amount: number) {
  return `${amount.toLocaleString("fa-IR")} تومان`;
}

function getMoreItemsCount(order: Order) {
  return order.moreItemsCount ?? Math.max(order.itemCount - order.items.length, 0);
}

function SellerOrdersSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="rounded-[22px] border border-[#E7ECF4] bg-white p-4">
          <div className="flex items-center justify-between border-b border-[#EEF2F7] pb-4">
            <div className="flex gap-2">
              <div className="h-7 w-24 rounded-full bg-slate-100" />
              <div className="h-7 w-24 rounded-full bg-slate-100" />
            </div>
            <div className="flex items-center gap-3">
              <div className="space-y-2 text-right">
                <div className="h-4 w-28 rounded-full bg-slate-200" />
                <div className="h-3 w-20 rounded-full bg-slate-100" />
              </div>
              <div className="h-10 w-10 rounded-xl bg-slate-100" />
            </div>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-[290px_minmax(0,1fr)]">
            <div className="space-y-3">
              <div className="h-32 rounded-[16px] bg-emerald-50" />
              <div className="h-11 rounded-xl bg-slate-50" />
              <div className="h-11 rounded-xl bg-slate-50" />
            </div>
            <div className="space-y-3">
              <div className="h-28 rounded-[16px] bg-sky-50" />
              <div className="h-10 rounded-xl bg-slate-50" />
              <div className="h-10 rounded-xl bg-slate-50" />
              <div className="h-24 rounded-[16px] bg-amber-50" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SellerOrderCard({ order }: { order: Order }) {
  const moreItemsCount = getMoreItemsCount(order);
  const actions = getOrderActions(order.status);

  return (
    <article dir="ltr" className="overflow-hidden rounded-[22px] border border-[#E7ECF4] bg-white">
      <div className="border-b border-[#EEF2F7] px-4 py-4 sm:px-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {order.tags.map((tag) => (
              <span
                key={tag.id}
                className={cn(
                  "inline-flex items-center rounded-md border px-3 py-1 text-xs font-semibold",
                  tagToneClasses[tag.tone]
                )}
              >
                {tag.label}
              </span>
            ))}
          </div>

          <div className="flex items-start justify-end gap-3">
            <div className="text-right">
              <p className="text-lg font-bold text-slate-700">{order.code}</p>
              <p className="mt-1 text-xs text-slate-400">تاریخ تایید: {order.createdAt}</p>
            </div>
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl border bg-white",
                statusIconClasses[order.status]
              )}
            >
              <StatusIcon status={order.status} className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-[290px_minmax(0,1fr)] lg:gap-5 lg:p-5">
        <aside className="space-y-2.5 lg:order-1">
          <div className="rounded-[16px] border border-emerald-200 bg-emerald-50 px-4 py-5 text-center">
            <div className="flex items-center justify-center gap-2 text-sm font-semibold text-emerald-700">
              <WalletIcon className="h-4 w-4" />
              <span>مبلغ قابل پرداخت</span>
            </div>
            <p className="mt-3 text-[22px] font-black leading-none text-emerald-600">
              {formatCurrency(order.payableAmount)}
            </p>
            <p className="mt-2 text-xs text-emerald-700/80">{order.paymentDescription}</p>
          </div>

          <div className="space-y-2">
            {actions.map((action) => {
              const content = (
                <>
                  {action.icon === "payment" && <WalletIcon className="h-4 w-4" />}
                  {action.icon === "cancel" && <CloseIcon className="h-4 w-4" />}
                  {action.icon === "details" && <EyeIcon className="h-4 w-4" />}
                  <span>{action.label}</span>
                </>
              );

              if (action.icon === "details") {
                return (
                  <Link
                    key={action.label}
                    href={`/orders/${order.id}`}
                    className={cn(
                      "inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold transition-colors",
                      action.className
                    )}
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <button
                  key={action.label}
                  type="button"
                  className={cn(
                    "inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold transition-colors",
                    action.className
                  )}
                >
                  {content}
                </button>
              );
            })}
          </div>
        </aside>

        <div className="space-y-3 lg:order-2">
          <section className="rounded-[16px] border border-[#DCE7FF] bg-[#F6F9FF] px-4 py-4">
            <div className="text-right">
              <p className="text-sm font-bold text-[#3156C7]">گیرنده سفارش</p>
              <div className="mt-2 flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-xs text-slate-500 sm:text-sm">
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
                  {order.province}، {order.city}
                </span>
                <span className="inline-flex items-center gap-1">
                  <PostIcon className="h-4 w-4" />
                  کد پستی {order.postalCode}
                </span>
              </div>
              <p className="mt-2 text-xs leading-6 text-slate-500 sm:text-sm">{order.address}</p>
            </div>
          </section>

          <div className="flex flex-row items-center justify-between rounded-xl border border-[#E8ECF4] bg-white px-3 py-2.5 text-sm text-slate-600">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded border border-slate-200 text-[11px] text-slate-400">
              {order.itemCount.toLocaleString("fa-IR")}
            </span>
            <span className="font-medium" dir="rtl">
              {order.itemCount.toLocaleString("fa-IR")} قلم کالا
            </span>
          </div>

          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-row items-center justify-between rounded-xl border border-[#E8ECF4] bg-white px-3 py-2.5 text-sm text-slate-700"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded border border-slate-200 text-[11px] text-slate-400">
                  {(index + 1).toLocaleString("fa-IR")}
                </span>
                <p className="text-right leading-6">{item.title}</p>
              </div>
            ))}
          </div>

          {moreItemsCount > 0 && (
            <p className="py-1 text-center text-sm text-slate-400">
              {moreItemsCount.toLocaleString("fa-IR")} محصول دیگر
            </p>
          )}

          {order.statusPanel && <StatusPanel order={order} />}
        </div>
      </div>
    </article>
  );
}

function StatusPanel({ order }: { order: Order }) {
  if (!order.statusPanel) {
    return null;
  }

  const panelClasses = statusPanelClasses[order.statusPanel.tone];

  return (
    <section className={cn("rounded-[16px] border px-4 py-4", panelClasses.wrapper)}>
      <div className="flex flex-col gap-4">
        <div className="text-right">
          <div
            className={cn(
              "flex items-center justify-end gap-2 text-base font-bold",
              panelClasses.title
            )}
          >
            <span>{order.statusPanel.title}</span>
            <AlertCircleIcon className="h-4 w-4" />
          </div>
          <p className="mt-2 text-sm leading-7 text-slate-600">{order.statusPanel.description}</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          {order.statusPanel.secondaryActionLabel && (
            <button
              type="button"
              className={cn(
                "inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold transition-colors",
                panelClasses.secondaryButton
              )}
            >
              {order.statusPanel.secondaryActionLabel}
            </button>
          )}
          <button
            type="button"
            className={cn(
              "inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold transition-colors",
              panelClasses.primaryButton
            )}
          >
            {order.statusPanel.primaryActionLabel}
          </button>
        </div>
      </div>
    </section>
  );
}

function getOrderActions(status: OrderStatus) {
  if (status === "pending") {
    return [
      {
        label: "پرداخت",
        icon: "payment" as const,
        className: "bg-[#06C46B] text-white hover:bg-[#05B060]",
      },
      {
        label: "لغو سفارش",
        icon: "cancel" as const,
        className: "border border-rose-300 bg-white text-rose-600 hover:bg-rose-50",
      },
      {
        label: "مشاهده جزئیات",
        icon: "details" as const,
        className: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
      },
    ];
  }

  if (status === "action_required") {
    return [
      {
        label: "لغو سفارش",
        icon: "cancel" as const,
        className: "border border-rose-300 bg-white text-rose-600 hover:bg-rose-50",
      },
      {
        label: "مشاهده جزئیات",
        icon: "details" as const,
        className: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
      },
    ];
  }

  return [
    {
      label: "مشاهده جزئیات",
      icon: "details" as const,
      className: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    },
  ];
}

export function 
SellerOrdersTable({
  orders,
  isLoading,
  error,
}: SellerOrdersTableProps) {
  if (isLoading) {
    return <SellerOrdersSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[22px] border border-rose-100 bg-white py-16">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-50">
          <AlertCircleIcon className="h-6 w-6 text-rose-500" />
        </div>
        <p className="text-sm font-medium text-text">خطا در بارگذاری</p>
        <p className="mt-1 text-sm text-muted">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[22px] border border-dashed border-slate-200 bg-white py-16">
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
        <SellerOrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}

function StatusIcon({ status, className }: { status: OrderStatus; className?: string }) {
  switch (status) {
    case "pending":
      return <ClockIcon className={className} />;
    case "shipped":
      return <TruckIcon className={className} />;
    case "action_required":
      return <AlertCircleIcon className={className} />;
    case "closed":
      return <CloseIcon className={className} />;
    default:
      return null;
  }
}

function WalletIcon({ className }: { className?: string }) {
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
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18a2 2 0 0 1 2 2v2H6.5A2.5 2.5 0 0 0 4 11.5v5A2.5 2.5 0 0 0 6.5 19H18a2 2 0 0 0 2-2v-2" />
      <path d="M4 11.5A2.5 2.5 0 0 1 6.5 9H20v6H6.5A2.5 2.5 0 0 1 4 12.5v-1Z" />
      <circle cx="16.5" cy="12" r="1" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function TruckIcon({ className }: { className?: string }) {
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
      <path d="M3 6h11v8H3z" />
      <path d="M14 9h4l3 3v2h-7" />
      <circle cx="7.5" cy="17.5" r="1.5" />
      <circle cx="17.5" cy="17.5" r="1.5" />
    </svg>
  );
}

function AlertCircleIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5" />
      <path d="M12 16h.01" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
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
      <path d="M15 9 9 15" />
      <path d="m9 9 6 6" />
      <circle cx="12" cy="12" r="9" />
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
