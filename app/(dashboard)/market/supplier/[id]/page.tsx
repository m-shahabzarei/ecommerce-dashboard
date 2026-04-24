import { notFound } from "next/navigation";
import {
  getMarketSupplierById,
  getProductsBySupplierId,
} from "@/lib/services/market";
import { SupplierInfo } from "@/components/dashboard/market/SupplierInfo";
import { ProductsGrid } from "@/components/dashboard/market/ProductsGrid";

export default async function MarketSupplierDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supplierId = Number(id);

  const supplier = await getMarketSupplierById(supplierId);
  const products = await getProductsBySupplierId(supplierId);

  if (!supplier) {
    notFound();
  }

  return (
    <div className="space-y-6">

      <SupplierInfo supplier={supplier} />

      <div className="space-y-3">
        <h3 className="text-lg font-bold text-text">محصولات</h3>
        <ProductsGrid products={products} />
      </div>
    </div>
  );
}
