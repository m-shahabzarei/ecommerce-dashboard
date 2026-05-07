"use client";

import Link from "next/link";
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
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-[760px] flex-col items-center py-4">
      <div className="mb-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-12 0v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21M3 7.5l1.5-4.5h15L21 7.5M3 7.5h18M3 7.5v1.125a2.625 2.625 0 1 0 5.25 0V7.5m0 1.125a2.625 2.625 0 1 0 5.25 0V7.5m0 1.125a2.625 2.625 0 1 0 5.25 0V7.5" />
          </svg>
        </div>
        <h1 className="mt-5 text-3xl font-extrabold text-text">
          اتصال فروشگاه جدید
        </h1>
        <p className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-muted">
          فروشگاه آنلاین خود را به پلتفرم
          <img src="/logo.svg" alt="کالاباما" className="h-7 w-auto" />
          متصل کنید
        </p>
      </div>

      <div className="mb-5 w-full max-w-[570px] text-left">
        <Link href="/vendor/connections" className="text-sm font-medium text-muted transition-colors hover:text-primary">
          بازگشت به انتخاب پلتفرم ←
        </Link>
      </div>

      <ConnectionForm
        platformName={platformName}
        type="increase"
        onSubmit={handleSubmit}
        onCancel={() => router.push("/vendor/connections")}
      />
    </div>
  );
}
