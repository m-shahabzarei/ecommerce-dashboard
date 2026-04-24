"use client";

import { useState, useEffect, useCallback } from "react";
import { SearchIcon } from "@/components/ui/Icons";

interface VendorProductsSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function VendorProductsSearch({
  onSearch,
  placeholder = "جستجوی محصول...",
}: VendorProductsSearchProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [value, onSearch]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  );

  return (
    <div className="relative w-full max-w-md">
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
        <SearchIcon className="h-5 w-5 text-muted" />
      </div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-white py-2.5 pr-11 pl-4 text-sm text-text outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary/20"
      />
    </div>
  );
}
