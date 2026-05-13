"use client";

import type { OrderStatus } from "@/lib/services/orders";
import { OrdersTabs } from "@/components/dashboard/orders/OrdersTabs";

interface SellerOrdersTabsProps {
  activeTab: OrderStatus;
  onChange: (tab: OrderStatus) => void;
  counts: Record<OrderStatus, number>;
}

export function SellerOrdersTabs({
  activeTab,
  onChange,
  counts,
}: SellerOrdersTabsProps) {
  return <OrdersTabs activeTab={activeTab} onChange={onChange} counts={counts} />;
}
