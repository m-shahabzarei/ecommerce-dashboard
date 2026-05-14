"use client";

import { useState } from "react";

interface EditOrderItemQuantityModalTriggerProps {
  itemTitle: string;
  initialQuantity: number;
  buttonText?: string;
  buttonClassName?: string;
}

export function EditOrderItemQuantityModalTrigger({
  itemTitle,
  initialQuantity,
  buttonText = "ویرایش",
  buttonClassName = "inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50",
}: EditOrderItemQuantityModalTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(String(initialQuantity));

  const openModal = () => {
    setQuantity(String(initialQuantity));
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSave = () => {
    if (!quantity.trim()) {
      return;
    }

    closeModal();
  };

  const isSaveDisabled = !quantity.trim();

  return (
    <>
      <button type="button" onClick={openModal} className={buttonClassName}>
        <EditIcon className="h-3.5 w-3.5" />
        {buttonText}
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 py-6"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-[520px] rounded-[26px] bg-white p-6 shadow-[0_30px_80px_-35px_rgba(15,23,42,0.45)]"
            onClick={(event) => event.stopPropagation()}
            dir="rtl"
          >
            <div className="text-center">
              <h2 className="text-3xl font-black text-text">ویرایش تعداد آیتم</h2>
              <p className="mt-3 text-sm leading-7 text-slate-500">{itemTitle}</p>
              <p className="mt-1 text-sm leading-7 text-slate-500">
                تعداد فعلی {initialQuantity.toLocaleString("fa-IR")} عدد
              </p>
            </div>

            <div className="mt-8 space-y-2 text-right">
              <label htmlFor="edited-quantity" className="block text-base font-bold text-text">
                تعداد جدید
              </label>
              <input
                id="edited-quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                className="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 text-lg font-medium text-slate-700 outline-none transition-colors focus:border-primary"
                dir="ltr"
              />
            </div>

            <div className="mt-8 flex items-center justify-start gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                انصراف
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaveDisabled}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-primary/50"
              >
                ذخیره تغییرات
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function EditIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}
