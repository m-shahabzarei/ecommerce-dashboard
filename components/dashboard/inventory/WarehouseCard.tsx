"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const warehouses = ["مبارک آباد قم", "انبار - تهران"];

export function WarehouseCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<string | null>(null);
  const [appliedWarehouse, setAppliedWarehouse] = useState<string | null>(null);

  const handleApply = () => {
    if (!selectedWarehouse) return;
    setAppliedWarehouse(selectedWarehouse);
    setIsOpen(false);
  };

  return (
    <div
      className={cn(
        "max-w-[600px] rounded-2xl bg-white shadow-sm transition-all duration-200",
        isOpen ? "p-6" : "px-4 py-3"
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 text-right"
        aria-expanded={isOpen}
      >
        <div>
          <h2 className="text-lg font-bold text-text">انبار</h2>
          <p className="mt-1 text-sm text-muted">
            {isOpen
              ? "لیست انبارهای فعال"
              : appliedWarehouse ?? "یک انبار را انتخاب کنید"}
          </p>
        </div>

        <span
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-text transition-transform",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>

      <div
        className={cn(
          "grid transition-all duration-200",
          isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-4 rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm text-text">
            <ul className="space-y-3">
              {warehouses.map((warehouse) => {
                const isSelected = selectedWarehouse === warehouse;

                return (
                  <li key={warehouse}>
                    <label
                      className={cn(
                        "flex cursor-pointer items-center justify-between rounded-lg border bg-white px-4 py-3 shadow-sm transition-colors",
                        isSelected ? "border-primary" : "border-transparent"
                      )}
                    >
                      <span>{warehouse}</span>
                      <input
                        type="radio"
                        name="warehouse"
                        checked={isSelected}
                        onChange={() => setSelectedWarehouse(warehouse)}
                        className="h-4 w-4 accent-primary"
                      />
                    </label>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={handleApply}
              disabled={!selectedWarehouse}
              className={cn(
                "h-[42px] rounded-xl px-6 text-sm font-medium text-white transition-all",
                "bg-primary hover:bg-[#1352e0]",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            >
              اعمال
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
