"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { OrdersTabs } from "@/components/dashboard/orders/OrdersTabs";
import { OrdersTable } from "@/components/dashboard/orders/OrdersTable";
import { SellerOrdersTabs } from "@/components/dashboard/orders/SellerOrdersTabs";
import { SellerOrdersTable } from "@/components/dashboard/orders/SellerOrdersTable";
import { getOrders, getSellerOrders, SELLER_ORDER_COUNTS } from "@/lib/services/orders";
import type { OrderStatus } from "@/lib/services/orders";
import type { Role } from "@/lib/roles";

const supplierOrders = getOrders();
const sellerOrders = getSellerOrders();

export function OrdersPageClient({ role }: { role: Role }) {
  const [activeTab, setActiveTab] = useState<OrderStatus>("pending");
  const [isLoading, setIsLoading] = useState(false);
  const hasMountedRef = useRef(false);

  const isSeller = role === "seller";
  const allOrders = isSeller ? sellerOrders : supplierOrders;

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 250);

    return () => clearTimeout(timer);
  }, [activeTab, isSeller]);

  const filteredOrders = useMemo(
    () => allOrders.filter((order) => order.status === activeTab),
    [activeTab, allOrders]
  );

  const supplierCounts = useMemo(() => {
    const result: Record<OrderStatus, number> = {
      pending: 0,
      shipped: 0,
      action_required: 0,
      closed: 0,
    };

    for (const order of supplierOrders) {
      result[order.status] += 1;
    }

    return result;
  }, []);

  if (isSeller) {
    return (
      <section className="overflow-hidden rounded-[28px] border-b border-[#E7ECF4] bg-white">
        <SellerOrdersTabs
          activeTab={activeTab}
          onChange={setActiveTab}
          counts={SELLER_ORDER_COUNTS}
        />
        <div className="bg-[#FBFCFF] p-3 sm:p-4 lg:p-5">
          <SellerOrdersTable orders={filteredOrders} isLoading={isLoading} />
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[28px] border-b border-[#E7ECF4] bg-white ">
        <OrdersTabs
          activeTab={activeTab}
          onChange={setActiveTab}
          counts={supplierCounts}
        />
        <div className="bg-slate-50/50 py-4 ">
          <OrdersTable orders={filteredOrders} isLoading={isLoading} />
        </div>
      </section>
    </div>
  );
}
