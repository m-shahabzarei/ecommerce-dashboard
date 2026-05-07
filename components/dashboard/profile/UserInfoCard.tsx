"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

interface UserInfoCardProps {
  firstName: string;
  lastName: string;
  nationalId: string;
  iban: string;
  city: string;
  county: string;
  image: File | null;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onNationalIdChange: (value: string) => void;
  onIbanChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onCountyChange: (value: string) => void;
  onImageChange: (image: File | null) => void;
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-text">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-text",
          "placeholder:text-gray-400",
          "focus:border-primary focus:outline-none focus:ring-0",
          "transition-colors"
        )}
      />
    </div>
  );
}

export function UserInfoCard({
  firstName,
  lastName,
  nationalId,
  iban,
  city,
  county,
  image,
  onFirstNameChange,
  onLastNameChange,
  onNationalIdChange,
  onIbanChange,
  onCityChange,
  onCountyChange,
  onImageChange,
}: UserInfoCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onImageChange(file);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-bold text-text">اطلاعات کاربر</h2>

      <div className="mb-5 flex flex-col gap-4 rounded-xl border border-dashed border-gray-300 p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="تصویر کاربر"
                className="h-full w-full object-cover"
              />
            ) : (
              <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-text">تصویر کاربر</p>
            <p className="mt-1 text-xs text-muted">تصویر پروفایل خود را بارگذاری کنید</p>
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn(
            "rounded-xl border border-primary px-4 py-2 text-sm font-medium text-primary",
            "transition-colors hover:bg-primary hover:text-white"
          )}
        >
          بارگذاری تصویر
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextField
          label="نام"
          value={firstName}
          onChange={onFirstNameChange}
          placeholder="نام"
        />
        <TextField
          label="نام خانوادگی"
          value={lastName}
          onChange={onLastNameChange}
          placeholder="نام خانوادگی"
        />
        <TextField
          label="کد ملی"
          value={nationalId}
          onChange={onNationalIdChange}
          placeholder="کد ملی"
        />
        <TextField
          label="شماره شبا"
          value={iban}
          onChange={onIbanChange}
          placeholder="شماره شبا"
        />
        <TextField
          label="شهر"
          value={city}
          onChange={onCityChange}
          placeholder="شهر"
        />
        <TextField
          label="شهرستان"
          value={county}
          onChange={onCountyChange}
          placeholder="شهرستان"
        />
      </div>
    </div>
  );
}
