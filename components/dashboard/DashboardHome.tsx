import { Role } from "@/lib/roles";
import { DashboardSlider } from "./DashboardSlider";
import { SalesChartCard } from "./SalesChartCard";
import { OrdersStatusCard } from "./OrdersStatusCard";
import { NewProductsCard } from "./NewProductsCard";

interface DashboardHomeProps {
  role: Role;
}

export function DashboardHome({ role }: DashboardHomeProps) {
  const isSupplier = role === "supplier";

  return (
    <div className="space-y-6">
      <DashboardSlider />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SalesChartCard />
        <OrdersStatusCard />
      </div>

      {isSupplier && <NewProductsCard />}
    </div>
  );
}
