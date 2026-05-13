"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

interface StoreInfoCardProps {
  name: string;
  url: string;
  image: File | null;
  onNameChange: (value: string) => void;
  onUrlChange: (value: string) => void;
  onImageChange: (image: File | null) => void;
}

export function StoreInfoCard({
  name,
  url,
  image,
  onNameChange,
  onUrlChange,
  onImageChange,
}: StoreInfoCardProps) {
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
      <h2 className="mb-4 text-base font-bold text-text">اطلاعات غرفه</h2>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">
            نام غرفه
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="نام غرفه"
            className={cn(
              "w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-text",
              "placeholder:text-gray-400",
              "focus:border-primary focus:outline-none focus:ring-0",
              "transition-colors"
            )}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">
            url غرفه
          </label>
          <input
            type="text"
            dir="ltr"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="example-store"
            className={cn(
              "w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-text",
              "placeholder:text-gray-400",
              "focus:border-primary focus:outline-none focus:ring-0",
              "transition-colors"
            )}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">
            تصویر غرفه
          </label>
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
              "w-full rounded-xl border-2 border-dashed border-gray-300 py-3 text-sm font-medium text-muted",
              "transition-colors hover:border-primary hover:text-primary"
            )}
          >
            بارگذاری تصویر
          </button>
          {image && (
            <div className="mt-3">
              <img
                src={URL.createObjectURL(image)}
                alt="Store preview"
                className="h-32 w-full rounded-lg object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
