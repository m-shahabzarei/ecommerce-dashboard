"use client";

import { cn } from "@/lib/utils";

interface DetailsCardProps {
  title: string;
  description: string;
  category: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export function DetailsCard({
  title,
  description,
  category,
  onTitleChange,
  onDescriptionChange,
  onCategoryChange,
}: DetailsCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-bold text-text">جزئیات</h2>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">
            عنوان
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="عنوان محصول"
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
            توضیحات
          </label>
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="توضیحات محصول"
            rows={4}
            className={cn(
              "w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-text",
              "min-h-[100px] resize-y",
              "placeholder:text-gray-400",
              "focus:border-primary focus:outline-none focus:ring-0",
              "transition-colors"
            )}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">
            دسته‌بندی (اختیاری)
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            placeholder="دسته‌بندی"
            className={cn(
              "w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-text",
              "placeholder:text-gray-400",
              "focus:border-primary focus:outline-none focus:ring-0",
              "transition-colors"
            )}
          />
        </div>
      </div>
    </div>
  );
}
