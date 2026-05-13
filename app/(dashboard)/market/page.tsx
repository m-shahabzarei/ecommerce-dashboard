"use client";

import { useState, useMemo, useCallback } from "react";
import { CheckIcon } from "@/components/ui/Icons";
import { MarketTabs } from "@/components/dashboard/market/MarketTabs";
import type { MarketTab } from "@/components/dashboard/market/MarketTabs";
import { MarketSearch } from "@/components/dashboard/market/MarketSearch";
import { ProductFilters } from "@/components/dashboard/market/ProductFilters";
import { ProductsGrid } from "@/components/dashboard/market/ProductsGrid";
import { SuppliersGrid } from "@/components/dashboard/market/SuppliersGrid";
import { SalesChannelSelectButton } from "@/components/dashboard/market/SalesChannelSelectButton";
import { cn } from "@/lib/utils";
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
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

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

  const handleToggleProduct = useCallback((productId: number) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const filteredProductIds = useMemo(
    () => filteredProducts.map((product) => product.id),
    [filteredProducts]
  );

  const allFilteredSelected = useMemo(
    () =>
      filteredProductIds.length > 0 &&
      filteredProductIds.every((id) => selectedProductIds.includes(id)),
    [filteredProductIds, selectedProductIds]
  );

  const handleSelectAllProducts = useCallback(() => {
    setSelectedProductIds((prev) => {
      const visibleIds = new Set(filteredProductIds);

      if (
        filteredProductIds.length > 0 &&
        filteredProductIds.every((id) => prev.includes(id))
      ) {
        return prev.filter((id) => !visibleIds.has(id));
      }

      const next = new Set(prev);
      filteredProductIds.forEach((id) => next.add(id));
      return Array.from(next);
    });
  }, [filteredProductIds]);

  const selectedCount = selectedProductIds.length;
  const shouldShowSelectionBar =
    activeTab === "products" && selectedCount > 0;

  return (
    <div className={cn("space-y-6", shouldShowSelectionBar && "pb-28")}>
      <MarketTabs activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-4">
        {activeTab === "products" ? (
          <>
            <MarketSearch
              onSearch={handleProductSearch}
              placeholder="جستجوی محصول..."
            />
            <div className="mt-4">
              <ProductFilters />
            </div>
          </>
        ) : (
          <MarketSearch
            onSearch={handleSupplierSearch}
            placeholder="جستجوی تامین‌کننده..."
          />
        )}
      </div>

      <div className="mt-4">
        {activeTab === "products" ? (
          <ProductsGrid
            products={filteredProducts}
            selectedProductIds={selectedProductIds}
            onToggleProduct={handleToggleProduct}
          />
        ) : (
          <SuppliersGrid suppliers={filteredSuppliers} />
        )}
      </div>

      {shouldShowSelectionBar && (
        <div className="fixed bottom-4 left-8 right-[292px] z-40">
          <div className="flex w-full flex-col gap-3 rounded-2xl border border-border bg-white px-4 py-3 shadow-lg sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {selectedCount.toLocaleString("fa-IR")}
              </span>
              <span className="text-sm font-medium text-text">
                محصول انتخاب شده
              </span>
              <button
                type="button"
                onClick={handleSelectAllProducts}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-text"
              >
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded border transition-colors",
                    allFilteredSelected
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-white text-transparent"
                  )}
                >
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                {allFilteredSelected ? "لغو انتخاب همه" : "انتخاب همه"}
              </button>
            </div>

            <SalesChannelSelectButton
              buttonText="افزودن به کانال فروش"
              buttonSize="md"
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}
