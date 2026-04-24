import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-content-bg">
      <Sidebar />
      <main className="mr-[260px] min-h-screen p-8">{children}</main>
    </div>
  );
}
