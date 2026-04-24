import { cn } from "@/lib/utils";

type OrderStatus = "delivered" | "pending" | "cancelled";

interface Order {
  id: number;
  name: string;
  status: OrderStatus;
}

const orders: Order[] = [
  { id: 1, name: "سفارش شماره ۲۴۰۸۹", status: "delivered" },
  { id: 2, name: "سفارش شماره ۲۴۱۰۲", status: "pending" },
  { id: 3, name: "سفارش شماره ۲۴۱۱۵", status: "delivered" },
  { id: 4, name: "سفارش شماره ۲۴۱۲۳", status: "cancelled" },
  { id: 5, name: "سفارش شماره ۲۴۱۳۰", status: "pending" },
  { id: 6, name: "سفارش شماره ۲۴۱۳۸", status: "delivered" },
];

const statusConfig: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  delivered: {
    label: "تحویل داده شده",
    className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20",
  },
  pending: {
    label: "در انتظار",
    className: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20",
  },
  cancelled: {
    label: "لغو شده",
    className: "bg-red-50 text-red-700 ring-1 ring-red-600/20",
  },
};

interface OrdersStatusCardProps {
  className?: string;
}

export function OrdersStatusCard({ className }: OrdersStatusCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white p-5 shadow-sm md:p-6",
        className
      )}
    >
      <h3 className="text-lg font-bold text-text">وضعیت سفارش‌ها</h3>
      <p className="mt-1 text-sm text-muted">آخرین به‌روزرسانی: امروز</p>

      <div className="mt-5 divide-y divide-border">
        {orders.map((order) => {
          const config = statusConfig[order.status];
          return (
            <div
              key={order.id}
              className="flex items-center justify-between py-3.5 transition-colors hover:bg-gray-50/50 first:pt-0 last:pb-0"
            >
              <span className="text-sm font-medium text-text">
                {order.name}
              </span>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-semibold",
                  config.className
                )}
              >
                {config.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
