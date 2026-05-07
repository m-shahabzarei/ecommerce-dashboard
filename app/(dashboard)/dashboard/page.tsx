import { DashboardHome } from "@/components/dashboard/DashboardHome";
import { getCurrentRole } from "@/lib/server-role";

export default async function DashboardPage() {
  const role = await getCurrentRole();

  return <DashboardHome role={role} />;
}
