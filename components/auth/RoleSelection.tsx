"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Role = "supplier" | "vendor";

const ROLES: { key: Role; label: string; description: string }[] = [
  {
    key: "supplier",
    label: "تامین‌کننده",
    description: "محصولات خود را در بازارچه عرضه کنید",
  },
  {
    key: "vendor",
    label: "فروشنده",
    description: "محصولات را بفروشید و سفارشات را مدیریت کنید",
  },
];

export function RoleSelection() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = useCallback(() => {
    if (!selectedRole) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 500);
  }, [selectedRole, router]);

  return (
    <div className="w-full max-w-[400px]">
      <h1 className="mb-6 text-center text-xl font-bold text-text">
        نقش خود را انتخاب کنید
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {ROLES.map((role) => (
          <button
            key={role.key}
            type="button"
            onClick={() => setSelectedRole(role.key)}
            className={cn(
              "flex flex-col items-center rounded-2xl border p-5 text-center transition-all",
              selectedRole === role.key
                ? "border-primary bg-primary/5"
                : "border-gray-200 bg-white hover:border-gray-300"
            )}
          >
            <span className="text-base font-bold text-text">{role.label}</span>
            <span className="mt-2 text-xs leading-relaxed text-muted">
              {role.description}
            </span>
          </button>
        ))}
      </div>

      {selectedRole && (
        <button
          type="button"
          onClick={handleConfirm}
          disabled={isLoading}
          className={cn(
            "mt-6 w-full rounded-xl bg-primary py-2 text-sm font-medium text-white",
            "transition-colors hover:bg-[#1352e0]",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        >
          {isLoading ? (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            "تایید"
          )}
        </button>
      )}
    </div>
  );
}
