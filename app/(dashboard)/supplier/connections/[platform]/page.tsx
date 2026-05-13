"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, notFound, useRouter, useSearchParams } from "next/navigation";
import {
  connectPlatform,
  getStoredConnectionForm,
  getSupplierPlatformName,
  isValidSupplierPlatform,
  setStoredConnectionForm,
  setStoredConnectionStatus,
} from "@/lib/services/connections";
import { ConnectionForm } from "@/components/dashboard/connections/ConnectionForm";
import type { ConnectionFormData } from "@/lib/services/connections";

export default function SupplierConnectionFormPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const platform = params.platform as string;

  if (!isValidSupplierPlatform(platform)) {
    notFound();
  }

  const platformName = getSupplierPlatformName(platform);
  const isEditMode = searchParams.get("mode") === "edit";
  const [initialData, setInitialData] = useState<ConnectionFormData | null>(null);
  const [isReady, setIsReady] = useState(!isEditMode);

  useEffect(() => {
    if (!isEditMode) {
      setInitialData(null);
      setIsReady(true);
      return;
    }

    setInitialData(getStoredConnectionForm("supplier", platform));
    setIsReady(true);
  }, [isEditMode, platform]);

  const handleSubmit = async (data: ConnectionFormData) => {
    await connectPlatform(platform, data);
    setStoredConnectionForm("supplier", platform, data);

    if (platform === "basalam") {
      setStoredConnectionStatus(platform, "connected");
    }

    router.push("/supplier/connections");
  };

  return (
    <div className="mx-auto w-full max-w-[860px] px-4 py-6 md:px-6 md:py-8">
      <div className="mb-6">
        <Link
          href="/supplier/connections"
          className="text-sm font-medium text-muted transition-colors hover:text-primary"
        >
          بازگشت به انتخاب پلتفرم ←
        </Link>
      </div>

      {isEditMode && !isReady ? (
        <div className="h-64 animate-pulse rounded-[28px] bg-gray-100" />
      ) : (
        <ConnectionForm
          platformName={platformName}
          type="decrease"
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/supplier/connections")}
        />
      )}
    </div>
  );
}
