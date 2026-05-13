"use client";

import { useState, useMemo, useCallback } from "react";
import { VendorProductsSearch } from "@/components/dashboard/vendor/products/VendorProductsSearch";
import { AddProductButton } from "@/components/dashboard/vendor/products/AddProductButton";
import { VendorProductsTable } from "@/components/dashboard/vendor/products/VendorProductsTable";
import type { VendorProduct } from "@/components/dashboard/vendor/products/VendorProductsTable";

const mockProducts: VendorProduct[] = [
  { id: 1, name: "گوشی موبایل سامسونگ گلکسی S24", supplier: "تکنو پارس", price: 48500000, inventory: 24, salesChannel: "دیجی‌کالا" },
  { id: 2, name: "هدفون بی‌سیم اپل ایرپادز پرو ۲", supplier: "دیجیتال سنتر", price: 12800000, inventory: 56, salesChannel: "باسلام" },
  { id: 3, name: "لپ‌تاپ ایسوس VivoBook ۱۴", supplier: "کامپیوتر ایران", price: 32400000, inventory: 12, salesChannel: "وبسایت" },
  { id: 4, name: "ساعت هوشمند شیائومی می بند ۹", supplier: "گجت‌لند", price: 3200000, inventory: 0, salesChannel: "دیجی‌کالا" },
  { id: 5, name: "پاوربانک انکر ۲۰۰۰۰ میلی‌آمپر", supplier: "انرژی مدرن", price: 1800000, inventory: 85, salesChannel: "باسلام" },
  { id: 6, name: "تبلت سامسونگ گلکسی تب S9", supplier: "تکنو پارس", price: 28900000, inventory: 8, salesChannel: "وبسایت" },
  { id: 7, name: "مانیتور ال جی ۲۷ اینچ UltraGear", supplier: "نمایشگر پلاس", price: 15600000, inventory: 15, salesChannel: "دیجی‌کالا" },
  { id: 8, name: "کیبورد مکانیکی ریزر Huntsman", supplier: "گیم‌لند", price: 9200000, inventory: 0, salesChannel: "باسلام" },
  { id: 9, name: "ماوس لاجیتک MX Master ۳S", supplier: "دیجیتال سنتر", price: 7800000, inventory: 42, salesChannel: "وبسایت" },
  { id: 10, name: "وب‌کم لاجیتک C920 HD Pro", supplier: "کامپیوتر ایران", price: 4500000, inventory: 30, salesChannel: "دیجی‌کالا" },
];

export default function VendorProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return mockProducts;
    const query = searchQuery.toLowerCase();
    return mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.supplier.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">محصولات من</h1>
      </div>

      <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-between">
        <VendorProductsSearch onSearch={handleSearch} />
        <AddProductButton />
      </div>

      <VendorProductsTable
        products={filteredProducts}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
