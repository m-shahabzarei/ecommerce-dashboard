import { OrdersPageClient } from "@/components/dashboard/orders/OrdersPageClient";
import { getCurrentRole } from "@/lib/server-role";

export default async function OrdersPage() {
  const role = await getCurrentRole();

  return <OrdersPageClient role={role} />;
}
