"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { MOCK_USER, ROLE_COOKIE_NAME, ROLE_LABELS, normalizeRole } from "@/lib/roles";
import type { Role } from "@/lib/roles";
import { updateUserProfile, updateStoreProfile } from "@/lib/services/profile";
import { UserInfoCard } from "@/components/dashboard/profile/UserInfoCard";
import { StoreInfoCard } from "@/components/dashboard/profile/StoreInfoCard";

function getInitialRole(): Role {
  if (typeof document === "undefined") return MOCK_USER.role;

  const roleCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${ROLE_COOKIE_NAME}=`));

  return normalizeRole(roleCookie?.split("=")[1]);
}

export default function ProfilePage() {
  const router = useRouter();
  const [currentRole, setCurrentRole] = useState<Role>(getInitialRole);
  const isSupplier = currentRole === "supplier";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [iban, setIban] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [userImage, setUserImage] = useState<File | null>(null);

  const [storeName, setStoreName] = useState("");
  const [storeUrl, setStoreUrl] = useState("");
  const [storeImage, setStoreImage] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSwitch = useCallback(() => {
    const nextRole = currentRole === "supplier" ? "seller" : "supplier";
    document.cookie = `${ROLE_COOKIE_NAME}=${nextRole}; path=/; max-age=31536000; samesite=lax`;
    setCurrentRole(nextRole);
    router.refresh();
  }, [currentRole, router]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const userData = {
        firstName,
        lastName,
        nationalId,
        iban,
        city,
        county,
        image: userImage,
      };

      const storeData = isSupplier
        ? {
            name: storeName,
            url: storeUrl,
            image: storeImage,
          }
        : undefined;

      setIsLoading(true);
      try {
        await updateUserProfile(userData);
        if (isSupplier && storeData) {
          await updateStoreProfile(storeData);
        }
        console.log({ userData, storeData });
      } finally {
        setIsLoading(false);
      }
    },
    [
      firstName,
      lastName,
      nationalId,
      iban,
      city,
      county,
      userImage,
      storeName,
      storeUrl,
      storeImage,
      isSupplier,
    ]
  );

  return (
    <div className="mx-auto max-w-[800px] space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">پروفایل</h1>
          <p className="mt-1 text-sm text-muted">
            مدیریت اطلاعات کاربری
          </p>
        </div>

        <button
          type="button"
          onClick={handleRoleSwitch}
          className={cn(
            "rounded-xl border border-primary px-4 py-2 text-sm font-medium text-primary",
            "transition-colors hover:bg-primary hover:text-white"
          )}
        >
          تغییر تستی نقش به {ROLE_LABELS[currentRole === "supplier" ? "seller" : "supplier"]}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <UserInfoCard
            firstName={firstName}
            lastName={lastName}
            phone={MOCK_USER.phone}
            nationalId={nationalId}
            iban={iban}
            city={city}
            county={county}
            image={userImage}
            onFirstNameChange={setFirstName}
            onLastNameChange={setLastName}
            onNationalIdChange={setNationalId}
            onIbanChange={setIban}
            onCityChange={setCity}
            onCountyChange={setCounty}
            onImageChange={setUserImage}
          />

          {isSupplier && (
            <StoreInfoCard
              name={storeName}
              url={storeUrl}
              image={storeImage}
              onNameChange={setStoreName}
              onUrlChange={setStoreUrl}
              onImageChange={setStoreImage}
            />
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            "mt-6 w-full rounded-xl bg-primary py-3 text-sm font-medium text-white",
            "transition-colors hover:bg-[#1352e0]",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        >
          {isLoading ? (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            "اعمال تغییرات"
          )}
        </button>
      </form>
    </div>
  );
}
