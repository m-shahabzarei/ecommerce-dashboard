"use client";

import { useState } from "react";

const SHIPPING_SERVICES = [
  "آمادت",
  "پاکست",
  "تیپاکس",
  "ترابرنت",
  "دکا",
  "سپاسران",
  "ماکسیم",
  "پست سفارشی",
  "پست پیشتاز",
  "پیک موتوری",
  "چاپار",
  "جینبا",
] as const;

interface TrackingCodeModalTriggerProps {
  buttonText: string;
  initialShippingService?: string;
  initialTrackingCode?: string;
  initialTrackingLink?: string;
}

export function TrackingCodeModalTrigger({
  buttonText,
  initialShippingService = "",
  initialTrackingCode = "",
  initialTrackingLink = "",
}: TrackingCodeModalTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [savedShippingService, setSavedShippingService] = useState(initialShippingService);
  const [savedTrackingCode, setSavedTrackingCode] = useState(initialTrackingCode);
  const [savedTrackingLink, setSavedTrackingLink] = useState(initialTrackingLink);
  const [shippingService, setShippingService] = useState(initialShippingService);
  const [trackingCode, setTrackingCode] = useState(initialTrackingCode);
  const [trackingLink, setTrackingLink] = useState(initialTrackingLink);

  const openModal = () => {
    setShippingService(savedShippingService);
    setTrackingCode(savedTrackingCode);
    setTrackingLink(savedTrackingLink);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSave = () => {
    if (!shippingService || !trackingCode.trim()) {
      return;
    }

    setSavedShippingService(shippingService);
    setSavedTrackingCode(trackingCode.trim());
    setSavedTrackingLink(trackingLink.trim());
    closeModal();
  };

  const isSaveDisabled = !shippingService || !trackingCode.trim();

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-amber-200 bg-white text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-50"
      >
        {buttonText}
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 py-6"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-[440px] rounded-[26px] bg-white p-6 shadow-[0_30px_80px_-35px_rgba(15,23,42,0.45)]"
            onClick={(event) => event.stopPropagation()}
            dir="rtl"
          >
            <div className="text-center">
              <h2 className="text-2xl font-black text-text">ثبت کد رهگیری مرسوله</h2>
              <p className="mx-auto mt-3 max-w-[320px] text-sm leading-7 text-slate-500">
                با وارد کردن کد رهگیری و سرویس پستی، مرسوله به صورت خودکار به عنوان «ارسال شده» ثبت می‌گردد.
              </p>
            </div>

            <div className="mt-8 space-y-5">
              <div className="space-y-2 text-right">
                <label htmlFor="shipping-service" className="block text-sm font-bold text-text">
                  سرویس پستی <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="shipping-service"
                    value={shippingService}
                    onChange={(event) => setShippingService(event.target.value)}
                    className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition-colors focus:border-primary"
                  >
                    <option value="">انتخاب سرویس پستی</option>
                    {SHIPPING_SERVICES.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div className="space-y-2 text-right">
                <label htmlFor="tracking-code" className="block text-sm font-bold text-text">
                  کد رهگیری <span className="text-rose-500">*</span>
                </label>
                <input
                  id="tracking-code"
                  type="text"
                  value={trackingCode}
                  onChange={(event) => setTrackingCode(event.target.value)}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-primary"
                  placeholder="کد رهگیری مرسوله را وارد کنید"
                  dir="ltr"
                />
              </div>

              <div className="space-y-2 text-right">
                <label htmlFor="tracking-link" className="block text-sm font-bold text-text">
                  لینک رهگیری (اختیاری)
                </label>
                <input
                  id="tracking-link"
                  type="url"
                  value={trackingLink}
                  onChange={(event) => setTrackingLink(event.target.value)}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-primary"
                  placeholder="https://tracking.example.com/..."
                  dir="ltr"
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-start gap-3">
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaveDisabled}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-primary/50"
              >
                ذخیره
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
