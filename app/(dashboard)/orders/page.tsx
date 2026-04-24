"use client";

import { useState, useMemo, useEffect } from "react";
import { OrdersTabs, ORDER_TABS } from "@/components/dashboard/orders/OrdersTabs";
import { OrdersTable } from "@/components/dashboard/orders/OrdersTable";
import { getOrders } from "@/lib/services/orders";
import type { OrderStatus } from "@/lib/services/orders";

const allOrders = getOrders();

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus>("pending");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const filteredOrders = useMemo(() => {
    return allOrders.filter((order) => order.status === activeTab);
  }, [activeTab]);

  const counts = useMemo(() => {
    const result: Record<OrderStatus, number> = {
      pending: 0,
      shipped: 0,
      action_required: 0,
      closed: 0,
    };
    for (const order of allOrders) {
      result[order.status]++;
    }
    return result;
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">سفارشات</h1>
        <p className="mt-1 text-sm text-muted">
          مدیریت و پیگیری سفارشات
        </p>
      </div>

      <div className="rounded-2xl bg-white shadow-sm">
        <OrdersTabs
          activeTab={activeTab}
          onChange={setActiveTab}
          counts={counts}
        />
        <div className="p-6">
          <OrdersTable
            orders={filteredOrders}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
