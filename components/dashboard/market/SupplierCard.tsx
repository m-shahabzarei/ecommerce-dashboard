import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { MarketSupplier } from "@/lib/services/market";

interface SupplierCardProps {
  supplier: MarketSupplier;
}

export function SupplierCard({ supplier }: SupplierCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className={cn(
        "flex h-32 w-full items-center justify-center bg-gray-100",
        "text-sm text-muted"
      )}>
        {supplier.image ? (
          <img
            src={supplier.image}
            alt={supplier.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200">
            <svg
              className="h-7 w-7 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-bold text-text">
          {supplier.name}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted">
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          <span>{supplier.city}</span>
        </div>

        <div className="mt-4">
          <Link href={`/market/supplier/${supplier.id}`}>
            <Button variant="primary" size="sm" className="w-full">
              محصولات
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
