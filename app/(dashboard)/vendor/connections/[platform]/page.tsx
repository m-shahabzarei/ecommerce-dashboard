"use client";

import { useParams, notFound, useRouter } from "next/navigation";
import {
  getVendorPlatformName,
  isValidVendorPlatform,
  connectPlatform,
} from "@/lib/services/connections";
import { ConnectionForm } from "@/components/dashboard/connections/ConnectionForm";
import type { ConnectionFormData } from "@/lib/services/connections";

export default function VendorConnectionFormPage() {
  const router = useRouter();
  const params = useParams();
  const platform = params.platform as string;

  if (!isValidVendorPlatform(platform)) {
    notFound();
  }

  const platformName = getVendorPlatformName(platform);

  const handleSubmit = async (data: ConnectionFormData) => {
    await connectPlatform(platform, data);

    // Mark basalam as connected in shared localStorage
    if (platform === "basalam") {
      try {
        const raw = localStorage.getItem("connection-states");
        const states = raw ? JSON.parse(raw) : {};
        states.basalam = "connected";
        localStorage.setItem("connection-states", JSON.stringify(states));
      } catch {
        // ignore
      }
    }

    router.push("/vendor/connections");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">
          اتصال به {platformName}
        </h1>
        <p className="mt-1 text-sm text-muted">
          اطلاعات فروشگاه خود را وارد کنید
        </p>
      </div>

      <ConnectionForm
        platformName={platformName}
        type="increase"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
