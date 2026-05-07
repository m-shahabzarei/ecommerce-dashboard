"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@/components/ui/Icons";

interface ProductFiltersProps {
  onCategoryChange?: (category: string) => void;
  onStatusChange?: (status: string) => void;
  onSupplierChange?: (supplier: string) => void;
}

const categories = [
  { value: "all", label: "همه دسته بندی ها" },
  { value: "electronics", label: "الکترونیک" },
  { value: "clothing", label: "پوشاک" },
  { value: "home", label: "خانه و آشپزخانه" },
  { value: "books", label: "کتاب‌ها" },
  { value: "beauty", label: "زیبایی و سلامت" },
];

const statuses = [
  { value: "all", label: "همه وضعیت ها" },
  { value: "active", label: "فعال" },
  { value: "inactive", label: "غیرفعال" },
  { value: "pending", label: "در انتظار تایید" },
  { value: "discontinued", label: "متوقف شده" },
];

const suppliers = [
  { value: "all", label: "همه تامین کنندگان" },
  { value: "supplier1", label: "شرکت رویال" },
  { value: "supplier2", label: "تامین کنندگان جهانی" },
  { value: "supplier3", label: "مرکز فروش ملی" },
  { value: "supplier4", label: "توزیع پایتخت" },
  { value: "supplier5", label: "کمپانی تجارت" },
];

export function ProductFilters({
  onCategoryChange,
  onStatusChange,
  onSupplierChange,
}: ProductFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSupplier, setSelectedSupplier] = useState("all");

  const [openCategory, setOpenCategory] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openSupplier, setOpenSupplier] = useState(false);

  const handleCategorySelect = useCallback(
    (value: string) => {
      setSelectedCategory(value);
      setOpenCategory(false);
      onCategoryChange?.(value);
    },
    [onCategoryChange]
  );

  const handleStatusSelect = useCallback(
    (value: string) => {
      setSelectedStatus(value);
      setOpenStatus(false);
      onStatusChange?.(value);
    },
    [onStatusChange]
  );

  const handleSupplierSelect = useCallback(
    (value: string) => {
      setSelectedSupplier(value);
      setOpenSupplier(false);
      onSupplierChange?.(value);
    },
    [onSupplierChange]
  );

  const getCategoryLabel = (value: string) =>
    categories.find((c) => c.value === value)?.label || "همه دسته بندی ها";
  const getStatusLabel = (value: string) =>
    statuses.find((s) => s.value === value)?.label || "همه وضعیت ها";
  const getSupplierLabel = (value: string) =>
    suppliers.find((s) => s.value === value)?.label || "همه تامین کنندگان";

  return (
    <div className="flex flex-col gap-4 sm:flex-row w-150">
      {/* Category Filter */}
      <div className="relative flex-1">
        <button
          onClick={() => setOpenCategory(!openCategory)}
          className="w-full flex items-center justify-between rounded-xl border border-border bg-white px-4 py-2.5 text-right text-sm font-medium text-text shadow-sm transition-all hover:border-primary/30 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <ChevronDownIcon
            className={`h-5 w-5 text-muted transition-transform ${
              openCategory ? "rotate-180" : ""
            }`}
          />
          <span>{getCategoryLabel(selectedCategory)}</span>
        </button>

        {openCategory && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border border-border bg-white shadow-lg">
            <div className="max-h-64 overflow-y-auto">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => handleCategorySelect(category.value)}
                  className={`w-full px-4 py-2.5 text-right text-sm transition-colors ${
                    selectedCategory === category.value
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-text hover:bg-gray-50"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Status Filter */}
      <div className="relative flex-1">
        <button
          onClick={() => setOpenStatus(!openStatus)}
          className="w-full flex items-center justify-between rounded-xl border border-border bg-white px-4 py-2.5 text-right text-sm font-medium text-text shadow-sm transition-all hover:border-primary/30 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <ChevronDownIcon
            className={`h-5 w-5 text-muted transition-transform ${
              openStatus ? "rotate-180" : ""
            }`}
          />
          <span>{getStatusLabel(selectedStatus)}</span>
        </button>

        {openStatus && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border border-border bg-white shadow-lg">
            <div className="max-h-64 overflow-y-auto">
              {statuses.map((status) => (
                <button
                  key={status.value}
                  onClick={() => handleStatusSelect(status.value)}
                  className={`w-full px-4 py-2.5 text-right text-sm transition-colors ${
                    selectedStatus === status.value
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-text hover:bg-gray-50"
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Supplier Filter */}
      <div className="relative flex-1 w-">
        <button
          onClick={() => setOpenSupplier(!openSupplier)}
          className="w-full flex items-center justify-between rounded-xl border border-border bg-white px-4 py-2.5 text-right text-sm font-medium text-text shadow-sm transition-all hover:border-primary/30 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <ChevronDownIcon
            className={`h-5 w-5 text-muted transition-transform ${
              openSupplier ? "rotate-180" : ""
            }`}
          />
          <span>{getSupplierLabel(selectedSupplier)}</span>
        </button>

        {openSupplier && (
          <div className="absolute left-0 right-0 top-full  z-50 mt-2 rounded-xl border border-border bg-white  shadow-lg">
            <div className="max-h-64 overflow-y-auto">
              {suppliers.map((supplier) => (
                <button
                  key={supplier.value}
                  onClick={() => handleSupplierSelect(supplier.value)}
                  className={`w-full px-4 py-2.5 text-right text-sm transition-colors ${
                    selectedSupplier === supplier.value
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-text hover:bg-gray-50"
                  }`}
                >
                  {supplier.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
