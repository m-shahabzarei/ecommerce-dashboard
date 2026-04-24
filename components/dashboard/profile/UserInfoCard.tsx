"use client";

import { cn } from "@/lib/utils";

interface UserInfoCardProps {
  firstName: string;
  lastName: string;
  nationalId: string;
  iban: string;
  city: string;
  county: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onNationalIdChange: (value: string) => void;
  onIbanChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onCountyChange: (value: string) => void;
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
  onFirstNameChange,
  onLastNameChange,
  onNationalIdChange,
  onIbanChange,
  onCityChange,
  onCountyChange,
}: UserInfoCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-bold text-text">اطلاعات کاربر</h2>

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
