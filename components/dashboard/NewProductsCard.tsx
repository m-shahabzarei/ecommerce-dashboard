import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: "گوشی موبایل سامسونگ گلکسی S24", price: 48500000 },
  { id: 2, name: "هدفون بی‌سیم اپل ایرپادز پرو ۲", price: 12800000 },
  { id: 3, name: "لپ‌تاپ ایسوس VivoBook ۱۴", price: 32400000 },
  { id: 4, name: "ساعت هوشمند شیائومی می بند ۹", price: 3200000 },
  { id: 5, name: "پاوربانک انکر ۲۰۰۰۰ میلی‌آمپر", price: 1800000 },
];

function formatPrice(price: number): string {
  return price.toLocaleString("fa-IR") + " تومان";
}

interface NewProductsCardProps {
  className?: string;
}

export function NewProductsCard({ className }: NewProductsCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white p-5 shadow-sm md:p-6",
        className
      )}
    >
      <h3 className="text-lg font-bold text-text">محصولات جدید بازار</h3>
      <p className="mt-1 text-sm text-muted">آخرین افزوده‌شده‌ها</p>

      <div className="mt-5 divide-y divide-border">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between py-3.5 transition-colors hover:bg-gray-50/50 first:pt-0 last:pb-0"
          >
            <span className="text-sm font-medium text-text">
              {product.name}
            </span>
            <span className="text-sm font-semibold text-primary">
              {formatPrice(product.price)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
