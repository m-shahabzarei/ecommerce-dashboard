"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const SALES_CHANNELS = ["بازرگانی برزیار"];

interface SalesChannelSelectButtonProps {
  buttonText: string;
  buttonSize?: "sm" | "md" | "lg";
  className?: string;
}

export function SalesChannelSelectButton({
  buttonText,
  buttonSize = "md",
  className,
}: SalesChannelSelectButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  const openModal = () => {
    setSelectedChannel(null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        type="button"
        variant="primary"
        size={buttonSize}
        className={className}
        onClick={openModal}
      >
        {buttonText}
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="بستن"
              className="absolute right-5 top-4 text-2xl leading-none text-muted transition-colors hover:text-text"
              onClick={closeModal}
            >
              ×
            </button>

            <div className="text-center">
              <h3 className="text-lg font-bold text-text">انتخاب کانال فروش</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-muted/50">
                محصولات انتخابی، به کانال فروش موردنظرتان اضافه خواهد شد.
              </p>
            </div>

            <div className="mt-5 space-y-3">
              {SALES_CHANNELS.map((channel) => {
                const isSelected = selectedChannel === channel;

                return (
                  <label
                    key={channel}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-xl border bg-white px-4 py-3 text-sm font-semibold text-muted shadow-sm transition-colors",
                      isSelected ? "border-primary text-text" : "border-border hover:border-primary/40"
                    )}
                  >
                    <input
                      type="radio"
                      name="sales-channel"
                      value={channel}
                      checked={isSelected}
                      onChange={() => setSelectedChannel(channel)}
                      className="h-4 w-4 accent-primary"
                    />
                    <span>{channel}</span>
                  </label>
                );
              })}
            </div>

            {selectedChannel && (
              <Button
                type="button"
                variant="primary"
                size="md"
                className="mt-5 w-full"
                onClick={closeModal}
              >
                تایید
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
