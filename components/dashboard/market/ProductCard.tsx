import Link from "next/link";
import { cn } from "@/lib/utils";
import type { MarketProduct } from "@/lib/services/market";

interface ProductCardProps {
  product: MarketProduct;
}

function formatPrice(price: number): string {
  return price.toLocaleString("fa-IR") + " تومان";
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/market/product/${product.id}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-transform hover:scale-[1.02]"
    >
      <div className={cn(
        "flex h-40 w-full items-center justify-center bg-gray-100",
        "text-sm text-muted"
      )}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <svg
            className="h-10 w-10 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5M6.75 10.5l2.25-2.25"
            />
          </svg>
        )}
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 text-sm font-bold text-text">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center justify-between text-xs text-muted">
          <span>{product.storeName}</span>
          <span>
            موجودی: {product.inventory.toLocaleString("fa-IR")}
          </span>
        </div>

        <p className="mt-3 text-base font-bold text-primary">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
