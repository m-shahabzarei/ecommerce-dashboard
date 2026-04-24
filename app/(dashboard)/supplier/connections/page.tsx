"use client";

import { useState, useEffect } from "react";
import { ConnectionsTable } from "@/components/dashboard/supplier/connections/ConnectionsTable";
import { getSupplierConnections } from "@/lib/services/connections";
import { useConnections } from "@/lib/hooks/useConnections";
import type { Connection } from "@/lib/services/connections";

export default function SupplierConnectionsPage() {
  const [initialConnections, setInitialConnections] = useState<Connection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSupplierConnections().then((data) => {
      setInitialConnections(data);
      setIsLoading(false);
    });
  }, []);

  const { connections, toggleConnection } = useConnections(initialConnections);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">اتصال فروشگاه</h1>
        <p className="mt-1 text-sm text-muted">
          مدیریت اتصال فروشگاه‌ها به پلتفرم‌های مختلف
        </p>
      </div>

      {isLoading ? (
        <div className="h-32 animate-pulse rounded-2xl bg-gray-100" />
      ) : (
        <ConnectionsTable connections={connections} onToggle={toggleConnection} />
      )}
    </div>
  );
}
