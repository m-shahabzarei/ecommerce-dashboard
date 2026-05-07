"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [current, setCurrent] = useState(0);

  const allImages =
    images.length > 0 ? images : Array.from({ length: 5 }, () => "/place.png");

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-xl bg-gray-100">
        <div className="flex aspect-[4/3] items-center justify-center">
          {allImages[current] ? (
            <img
              src={allImages[current]}
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : (
            <svg
              className="h-16 w-16 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5M6.75 10.5l2.25-2.25"
              />
            </svg>
          )}
        </div>

        <button
          onClick={handlePrev}
          className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
          aria-label="تصویر قبلی"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
          aria-label="تصویر بعدی"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />

          </svg>
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {allImages.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              "h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100 transition-all",
              index === current
                ? "ring-2 ring-primary ring-offset-2"
                : "opacity-60 hover:opacity-100"
            )}
          >
            {img ? (
              <img src={img} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <svg className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5M6.75 10.5l2.25-2.25" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
