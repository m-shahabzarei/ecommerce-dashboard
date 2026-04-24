"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { MOCK_USER } from "@/lib/roles";
import { updateUserProfile, updateStoreProfile } from "@/lib/services/profile";
import { UserInfoCard } from "@/components/dashboard/profile/UserInfoCard";
import { StoreInfoCard } from "@/components/dashboard/profile/StoreInfoCard";

export default function ProfilePage() {
  const isSupplier = MOCK_USER.role === "supplier";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [iban, setIban] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");

  const [storeName, setStoreName] = useState("");
  const [storeUrl, setStoreUrl] = useState("");
  const [storeImage, setStoreImage] = useState<File | null>(null);
  const [returnPolicy, setReturnPolicy] = useState("");

  const [isLoading, setIsLoading] = useState(false);

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
      };

      const storeData = isSupplier
        ? {
            name: storeName,
            url: storeUrl,
            image: storeImage,
            returnPolicy,
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
      storeName,
      storeUrl,
      storeImage,
      returnPolicy,
      isSupplier,
    ]
  );

  return (
    <div className="mx-auto max-w-[800px] space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">پروفایل</h1>
        <p className="mt-1 text-sm text-muted">
          مدیریت اطلاعات کاربری
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <UserInfoCard
            firstName={firstName}
            lastName={lastName}
            nationalId={nationalId}
            iban={iban}
            city={city}
            county={county}
            onFirstNameChange={setFirstName}
            onLastNameChange={setLastName}
            onNationalIdChange={setNationalId}
            onIbanChange={setIban}
            onCityChange={setCity}
            onCountyChange={setCounty}
          />

          {isSupplier && (
            <StoreInfoCard
              name={storeName}
              url={storeUrl}
              image={storeImage}
              returnPolicy={returnPolicy}
              onNameChange={setStoreName}
              onUrlChange={setStoreUrl}
              onImageChange={setStoreImage}
              onReturnPolicyChange={setReturnPolicy}
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
