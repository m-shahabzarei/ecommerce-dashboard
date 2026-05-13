import { ShippingCostCard } from "@/components/dashboard/inventory/ShippingCostCard";
import { WarehouseCard } from "@/components/dashboard/inventory/WarehouseCard";

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">انبارداری و ارسال</h1>
        <p className="mt-1 text-sm text-muted">
          مدیریت هزینه‌ها و تنظیمات ارسال
        </p>
      </div>

      <WarehouseCard />
      <ShippingCostCard />
    </div>
  );
}
