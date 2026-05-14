"use client";

import { useState } from "react";

interface EditRecipientInfoModalTriggerProps {
  initialName: string;
  initialPhone: string;
  initialAddress: string;
  initialPostalCode: string;
  initialEmail?: string;
  buttonText?: string;
  buttonClassName?: string;
}

export function EditRecipientInfoModalTrigger({
  initialName,
  initialPhone,
  initialAddress,
  initialPostalCode,
  initialEmail = "",
  buttonText = "ویرایش",
  buttonClassName = "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 shadow-sm transition-colors hover:bg-slate-50",
}: EditRecipientInfoModalTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [email, setEmail] = useState(initialEmail);
  const [address, setAddress] = useState(initialAddress);
  const [postalCode, setPostalCode] = useState(initialPostalCode);

  const openModal = () => {
    setName(initialName);
    setPhone(initialPhone);
    setEmail(initialEmail);
    setAddress(initialAddress);
    setPostalCode(initialPostalCode);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSave = () => {
    if (!name.trim() || !phone.trim() || !address.trim() || !postalCode.trim()) {
      return;
    }

    closeModal();
  };

  const isSaveDisabled = !name.trim() || !phone.trim() || !address.trim() || !postalCode.trim();

  return (
    <>
      <button type="button" onClick={openModal} className={buttonClassName}>
        <EditIcon className="h-4 w-4" />
        {buttonText}
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 py-6"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-[560px] rounded-[26px] bg-white p-6 shadow-[0_30px_80px_-35px_rgba(15,23,42,0.45)]"
            onClick={(event) => event.stopPropagation()}
            dir="rtl"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-slate-800">
                <EditIcon className="h-5 w-5" />
                <h2 className="text-3xl font-black text-text">ویرایش اطلاعات گیرنده</h2>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                اطلاعات گیرنده سفارش را ویرایش کنید.
              </p>
            </div>

            <div className="mt-8 space-y-5">
              <div className="space-y-2 text-right">
                <label htmlFor="recipient-name" className="block text-base font-bold text-text">
                  نام گیرنده
                </label>
                <input
                  id="recipient-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-medium text-slate-700 outline-none transition-colors focus:border-primary"
                />
              </div>

              <div className="space-y-2 text-right">
                <label htmlFor="recipient-phone" className="block text-base font-bold text-text">
                  شماره تماس
                </label>
                <input
                  id="recipient-phone"
                  type="text"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-medium text-slate-700 outline-none transition-colors focus:border-primary"
                  dir="ltr"
                />
              </div>

              <div className="space-y-2 text-right">
                <label htmlFor="recipient-email" className="block text-base font-bold text-text">
                  ایمیل (اختیاری)
                </label>
                <input
                  id="recipient-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-medium text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-primary"
                  placeholder="example@email.com"
                  dir="ltr"
                />
              </div>

              <div className="space-y-2 text-right">
                <label htmlFor="recipient-address" className="block text-base font-bold text-text">
                  آدرس کامل
                </label>
                <textarea
                  id="recipient-address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-medium leading-7 text-slate-700 outline-none transition-colors focus:border-primary"
                />
              </div>

              <div className="space-y-2 text-right">
                <label htmlFor="recipient-postal-code" className="block text-base font-bold text-text">
                  کد پستی
                </label>
                <input
                  id="recipient-postal-code"
                  type="text"
                  value={postalCode}
                  onChange={(event) => setPostalCode(event.target.value)}
                  className="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-medium text-slate-700 outline-none transition-colors focus:border-primary"
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
                ذخیره تغییرات
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

function EditIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}
