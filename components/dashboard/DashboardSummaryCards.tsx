import type { JSX } from "react";
import { Role } from "@/lib/roles";
import { getOrders } from "@/lib/services/orders";
import {
  CheckIcon,
  InventoryIcon,
  OrdersIcon,
  ProductsIcon,
} from "@/components/ui/Icons";

type IconComponent = ({ className }: { className?: string }) => JSX.Element;

interface SummaryCardItem {
  label: string;
  value: number;
  icon: IconComponent;
}

const supplierInventories = [24, 56, 12, 0, 85, 8, 15, 0, 42, 30];
const orders = getOrders();

const sellerSummaryCards: SummaryCardItem[] = [
  {
    label: "سفارش نیازمند اقدام",
    value: orders.filter((order) => order.status === "action_required").length,
    icon: OrdersIcon,
  },
  {
    label: "سفارش بسته شده",
    value: orders.filter((order) => order.status === "closed").length,
    icon: CheckIcon,
  },
  {
    label: "سفارش ارسال شده",
    value: orders.filter((order) => order.status === "shipped").length,
    icon: InventoryIcon,
  },
  {
    label: "سفارش ارسال نشده",
    value: orders.filter((order) => order.status === "pending").length,
    icon: OrdersIcon,
  },
];

const supplierSummaryCards: SummaryCardItem[] = [
  {
    label: "محصولات فعال",
    value: supplierInventories.filter((inventory) => inventory > 0).length,
    icon: ProductsIcon,
  },
  {
    label: "موجودی رو به اتمام",
    value: supplierInventories.filter(
      (inventory) => inventory > 0 && inventory <= 15
    ).length,
    icon: InventoryIcon,
  },
  {
    label: "محصولات ناموجود",
    value: supplierInventories.filter((inventory) => inventory === 0).length,
    icon: CheckIcon,
  },
  {
    label: "سفارش نیازمند اقدام",
    value: orders.filter((order) => order.status === "action_required").length,
    icon: OrdersIcon,
  },
];

interface DashboardSummaryCardsProps {
  role: Role;
}

export function DashboardSummaryCards({ role }: DashboardSummaryCardsProps) {
  const cards = role === "supplier" ? supplierSummaryCards : sellerSummaryCards;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="rounded-xl border border-border bg-white px-5 py-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-3xl font-bold text-text">
                  {card.value.toLocaleString("fa-IR")}
                </p>
                <p className="text-sm font-medium text-muted">{card.label}</p>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
