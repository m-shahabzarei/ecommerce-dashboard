"use client";

import { useState, useMemo, useCallback } from "react";
import { ProductsActions } from "@/components/dashboard/products/ProductsActions";
import { ProductsSearch } from "@/components/dashboard/products/ProductsSearch";
import { ProductsTable } from "@/components/dashboard/products/ProductsTable";
import type { Product } from "@/components/dashboard/products/ProductsTable";

const mockProducts: Product[] = [
  { id: 1, name: "گوشی موبایل سامسونگ گلکسی S24", inventory: 24, price: 48500000 },
  { id: 2, name: "هدفون بی‌سیم اپل ایرپادز پرو ۲", inventory: 56, price: 12800000 },
  { id: 3, name: "لپ‌تاپ ایسوس VivoBook ۱۴", inventory: 12, price: 32400000 },
  { id: 4, name: "ساعت هوشمند شیائومی می بند ۹", inventory: 0, price: 3200000 },
  { id: 5, name: "پاوربانک انکر ۲۰۰۰۰ میلی‌آمپر", inventory: 85, price: 1800000 },
  { id: 6, name: "تبلت سامسونگ گلکسی تب S9", inventory: 8, price: 28900000 },
  { id: 7, name: "مانیتور ال جی ۲۷ اینچ UltraGear", inventory: 15, price: 15600000 },
  { id: 8, name: "کیبورد مکانیکی ریزر Huntsman", inventory: 0, price: 9200000 },
  { id: 9, name: "ماوس لاجیتک MX Master ۳S", inventory: 42, price: 7800000 },
  { id: 10, name: "وب‌کم لاجیتک C920 HD Pro", inventory: 30, price: 4500000 },
];

export default function SupplierProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return mockProducts;
    const query = searchQuery.toLowerCase();
    return mockProducts.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <div className="space-y-6">
      <ProductsActions />

      <div className="mt-4">
        <ProductsSearch onSearch={handleSearch} />
      </div>

      <div className="mt-5">
        <ProductsTable
          products={filteredProducts}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}
