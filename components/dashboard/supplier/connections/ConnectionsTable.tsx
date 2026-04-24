"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Connection, ConnectionStatus } from "@/lib/services/connections";

interface ConnectionsTableProps {
  connections: Connection[];
  onToggle?: (slug: string) => void;
}

const statusConfig: Record<
  ConnectionStatus,
  { label: string; className: string }
> = {
  connected: {
    label: "متصل",
    className: "text-emerald-600",
  },
  not_connected: {
    label: "متصل نیست",
    className: "text-red-600",
  },
};

export function ConnectionsTable({ connections, onToggle }: ConnectionsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="hidden bg-gray-100 px-6 py-3 text-sm font-bold text-text md:grid md:grid-cols-[1fr_120px_120px] md:items-center md:gap-4">
        <span>عنوان</span>
        <span className="text-center">وضعیت</span>
        <span className="text-left">عملیات</span>
      </div>

      <div className="divide-y divide-border">
        {connections.map((connection) => {
          const config = statusConfig[connection.status];
          const isConnected = connection.status === "connected";
          const isActive = connection.slug === "basalam";

          return (
            <div
              key={connection.slug}
              className="px-6 py-4 transition-colors hover:bg-gray-50/50 md:grid md:grid-cols-[1fr_120px_120px] md:items-center md:gap-4"
            >
              <div className="mt-0">
                <span className="text-sm font-medium text-text md:text-base">
                  {connection.title}
                </span>
              </div>

              <div className="mt-1 flex items-center gap-2 md:mt-0 md:justify-center">
                <span className="text-xs text-muted md:hidden">وضعیت:</span>
                <span
                  className={cn("text-sm font-medium", config.className)}
                >
                  {config.label}
                </span>
              </div>

              <div className="mt-1 flex md:mt-0 md:justify-end">
                {isActive ? (
                  isConnected ? (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        const confirmed = window.confirm("آیا مطمئن هستید؟");
                        if (confirmed) onToggle?.(connection.slug);
                      }}
                    >
                      قطع اتصال
                    </Button>
                  ) : (
                    <Link href={`/supplier/connections/${connection.slug}`}>
                      <Button variant="primary" size="sm">
                        اتصال
                      </Button>
                    </Link>
                  )
                ) : (
                  <Button variant="primary" size="sm" disabled>
                    غیرفعال
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
