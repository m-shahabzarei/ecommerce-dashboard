import Link from "next/link";
import { CheckIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import type { MarketProduct } from "@/lib/services/market";

interface ProductCardProps {
  product: MarketProduct;
  isSelected?: boolean;
  onToggle?: (productId: number) => void;
}

function formatPrice(price: number): string {
  return price.toLocaleString("fa-IR") + " تومان";
}

export function ProductCard({
  product,
  isSelected = false,
  onToggle,
}: ProductCardProps) {
  const isSelectable = typeof onToggle === "function";

  return (
    <div
      role={isSelectable ? "button" : undefined}
      tabIndex={isSelectable ? 0 : undefined}
      aria-pressed={isSelectable ? isSelected : undefined}
      onClick={isSelectable ? () => onToggle?.(product.id) : undefined}
      onKeyDown={
        isSelectable
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onToggle?.(product.id);
              }
            }
          : undefined
      }
      className={cn(
        "group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all",
        isSelectable && "cursor-pointer",
        isSelected
          ? "border-primary ring-2 ring-primary/20"
          : "border-transparent hover:-translate-y-1 hover:shadow-md"
      )}
    >
      <div className="relative">
        <div className="flex h-40 w-full items-center justify-center bg-gray-100 text-sm text-muted">
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

        {isSelectable ? (
          <div
            className={cn(
              "absolute left-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border shadow-sm transition-colors",
              isSelected
                ? "border-blue-500 bg-blue-500 text-white"
                : "border-border text-transparent"
            )}
          >
            <CheckIcon className="h-3 w-3" />
          </div>
        ) : null}
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

        <Link
          href={`/market/product/${product.id}`}
          onClick={(event) => event.stopPropagation()}
          className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-xl border border-border bg-white px-4 text-sm font-bold text-text transition-colors hover:bg-gray-50"
        >
          مشاهده جزئیات
        </Link>
      </div>
    </div>
  );
}
