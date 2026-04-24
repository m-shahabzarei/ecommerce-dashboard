"use client";

import { useState, useMemo, useCallback } from "react";
import { MarketTabs } from "@/components/dashboard/market/MarketTabs";
import type { MarketTab } from "@/components/dashboard/market/MarketTabs";
import { MarketSearch } from "@/components/dashboard/market/MarketSearch";
import { ProductsGrid } from "@/components/dashboard/market/ProductsGrid";
import { SuppliersGrid } from "@/components/dashboard/market/SuppliersGrid";
import {
  getMarketProducts,
  getMarketSuppliers,
} from "@/lib/services/market";

const allProducts = getMarketProducts();
const allSuppliers = getMarketSuppliers();

export default function MarketPage() {
  const [activeTab, setActiveTab] = useState<MarketTab>("products");
  const [productQuery, setProductQuery] = useState("");
  const [supplierQuery, setSupplierQuery] = useState("");

  const filteredProducts = useMemo(() => {
    if (!productQuery) return allProducts;
    const q = productQuery.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.storeName.toLowerCase().includes(q)
    );
  }, [productQuery]);

  const filteredSuppliers = useMemo(() => {
    if (!supplierQuery) return allSuppliers;
    const q = supplierQuery.toLowerCase();
    return allSuppliers.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q)
    );
  }, [supplierQuery]);

  const handleProductSearch = useCallback((query: string) => {
    setProductQuery(query);
  }, []);

  const handleSupplierSearch = useCallback((query: string) => {
    setSupplierQuery(query);
  }, []);

  return (
    <div className="space-y-6">
      

      <MarketTabs activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-4">
        {activeTab === "products" ? (
          <MarketSearch
            onSearch={handleProductSearch}
            placeholder="جستجوی محصول..."
          />
        ) : (
          <MarketSearch
            onSearch={handleSupplierSearch}
            placeholder="جستجوی تامین‌کننده..."
          />
        )}
      </div>

      <div className="mt-4">
        {activeTab === "products" ? (
          <ProductsGrid products={filteredProducts} />
        ) : (
          <SuppliersGrid suppliers={filteredSuppliers} />
        )}
      </div>
    </div>
  );
}
