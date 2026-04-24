import { DashboardHome } from "@/components/dashboard/DashboardHome";
import { MOCK_USER } from "@/lib/roles";

export default function DashboardPage() {
  return <DashboardHome role={MOCK_USER.role} />;
}
