"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ImagesCardProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
}

export function ImagesCard({ images, onImagesChange }: ImagesCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length > 0) {
      onImagesChange([...images, ...files]);
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleRemove = (index: number) => {
    const next = images.filter((_, i) => i !== index);
    onImagesChange(next);
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-bold text-text">عکس</h2>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={cn(
          "w-full rounded-xl border-2 border-dashed border-gray-300 py-4 text-sm font-medium text-muted",
          "transition-colors hover:border-primary hover:text-primary"
        )}
      >
        بارگذاری عکس
      </button>

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          {images.map((file, index) => (
            <div key={`${file.name}-${index}`} className="relative group">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="aspect-square w-full rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className={cn(
                  "absolute -left-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full",
                  "bg-red-500 text-white text-xs opacity-0 transition-opacity group-hover:opacity-100"
                )}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
