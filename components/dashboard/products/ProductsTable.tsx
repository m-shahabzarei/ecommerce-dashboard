import Link from "next/link";
import { cn } from "@/lib/utils";

export interface Product {
  id: number;
  name: string;
  inventory: number;
  price: number;
}

interface ProductsTableProps {
  products: Product[];
  isLoading?: boolean;
  error?: string | null;
}

function formatPrice(price: number): string {
  return price.toLocaleString("fa-IR") + " تومان";
}

function TableSkeleton() {
  return (
    <div className="animate-pulse divide-y divide-border">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-6 py-4">
          <div className="h-4 w-8 rounded bg-gray-200" />
          <div className="h-4 flex-1 rounded bg-gray-200" />
          <div className="h-4 w-16 rounded bg-gray-200" />
          <div className="h-4 w-24 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

export function ProductsTable({ products, isLoading, error }: ProductsTableProps) {
  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="hidden bg-gray-50 px-6 py-3 text-sm font-medium text-muted md:grid md:grid-cols-[60px_1fr_120px_140px] md:items-center md:gap-4">
          <span>ردیف</span>
          <span>محصول</span>
          <span className="text-center">موجودی</span>
          <span className="text-left">قیمت</span>
        </div>
        <TableSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-16 shadow-sm">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
          <svg
            className="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-text">خطا در بارگذاری</p>
        <p className="mt-1 text-sm text-muted">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-16 shadow-sm">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <svg
            className="h-6 w-6 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M9.75 7.5h4.5m-9 0h13.5"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-text">محصولی یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="hidden bg-gray-50 px-6 py-3 text-sm font-medium text-muted md:grid md:grid-cols-[60px_1fr_120px_140px] md:items-center md:gap-4">
        <span>ردیف</span>
        <span>محصول</span>
        <span className="text-center">موجودی</span>
        <span className="text-left">قیمت</span>
      </div>

      <div className="divide-y divide-border">
        {products.map((product, index) => (
          <Link
            key={product.id}
            href={`/market/product/${product.id}`}
            className="block px-6 py-4 transition-colors hover:bg-gray-50/50 md:grid md:grid-cols-[60px_1fr_120px_140px] md:items-center md:gap-4"
          >
            <span className="text-sm text-muted md:text-text">
              {(index + 1).toLocaleString("fa-IR")}
            </span>

            <div className="mt-1 md:mt-0">
              <span className="text-sm font-medium text-text md:text-base">
                {product.name}
              </span>
            </div>

            <div className="mt-1 flex items-center gap-2 md:mt-0 md:justify-center">
              <span className="text-xs text-muted md:hidden">موجودی:</span>
              <span
                className={cn(
                  "text-sm font-medium",
                  product.inventory === 0 ? "text-red-600" : "text-text"
                )}
              >
                {product.inventory.toLocaleString("fa-IR")}
              </span>
            </div>

            <div className="mt-1 flex items-center gap-2 md:mt-0 md:justify-end">
              <span className="text-xs text-muted md:hidden">قیمت:</span>
              <span className="text-sm font-semibold text-primary">
                {formatPrice(product.price)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
