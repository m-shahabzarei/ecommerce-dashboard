import { cn } from "@/lib/utils";
import type { MarketSupplier } from "@/lib/services/market";
import { SalesChannelSelectButton } from "@/components/dashboard/market/SalesChannelSelectButton";

interface SupplierInfoProps {
  supplier: MarketSupplier;
}

export function SupplierInfo({ supplier }: SupplierInfoProps) {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm md:gap-6">
      <div className={cn(
        "flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gray-100 md:h-24 md:w-24"
      )}>
        {supplier.image ? (
          <img
            src={supplier.image}
            alt={supplier.name}
            className="h-full w-full rounded-xl object-cover"
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

      <div className="flex-1 space-y-2">
        <h2 className="text-lg font-bold text-text md:text-xl">
          {supplier.name}
        </h2>

        <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
          <div className="flex items-center gap-2 text-muted">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span>{supplier.city}</span>
          </div>

          <div className="flex items-center gap-2 text-muted">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span>{supplier.warehouse}</span>
          </div>

          <div className="flex items-center gap-2 text-muted">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
            <span>{supplier.returnPolicy}</span>
          </div>

          <div className="flex items-center gap-2 text-muted">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
            <span>هزینه ارسال: {supplier.shippingCost}</span>
          </div>
        </div>

        <SalesChannelSelectButton
          buttonText="افزودن همه محصولات به کانال فروش"
          className="mt-2"
        />
      </div>
    </div>
  );
}
