import { ShippingCostCard } from "@/components/dashboard/inventory/ShippingCostCard";
import { WarehouseCard } from "@/components/dashboard/inventory/WarehouseCard";

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <WarehouseCard />
      <ShippingCostCard />
    </div>
  );
}
