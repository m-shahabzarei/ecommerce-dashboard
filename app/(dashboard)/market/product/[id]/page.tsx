import { notFound } from "next/navigation";
import { getMarketProductById } from "@/lib/services/market";
import { MOCK_USER } from "@/lib/roles";
import { Button } from "@/components/ui/Button";
import { ProductGallery } from "@/components/dashboard/market/product/ProductGallery";
import { ProductInfoCards } from "@/components/dashboard/market/product/ProductInfoCards";
import { ProductDescription } from "@/components/dashboard/market/product/ProductDescription";

export default async function MarketProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);

  const product = await getMarketProductById(productId);

  if (!product) {
    notFound();
  }

  const isVendor = MOCK_USER.role === "seller";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">{product.name}</h1>
          <div className="mt-2 flex items-center gap-4 text-sm text-muted">
            <span>تامین‌کننده: {product.storeName}</span>
            <span>تاریخ انتشار: {product.publishDate}</span>
          </div>
        </div>

        {isVendor && (
          <Button variant="primary" size="md">
            افزودن به محصولات من
          </Button>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Right: Gallery */}
        <ProductGallery images={product.images} name={product.name} />

        {/* Left: Info Panel */}
        <div className="space-y-4">
          <ProductInfoCards
            price={product.price}
            inventory={product.inventory}
            shippingCost={product.shippingCost}
          />

          <ProductDescription description={product.description} />
        </div>
      </div>
    </div>
  );
}
