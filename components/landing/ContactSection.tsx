"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const contactItems = [
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
      label: "تلفن",
      value: "۰۲۱-۹۱۰۰۵۴۵۴",
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      label: "ایمیل",
      value: "support@kalabama.ir",
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
      label: "آدرس",
      value: "تهران، خیابان ولیعصر، برج میلاد",
    },
  ];

  return (
    <>
      {/* Desktop Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 hidden bg-slate-900 px-6 py-3 md:block"
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between"
        >
          <span className="text-sm font-semibold text-white"
          >راه‌های ارتباطی</span>
          <div className="flex items-center gap-8"
          >
            {contactItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm text-slate-300"
              >
                {item.icon}
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile FAB */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg md:hidden",
          "bg-slate-900 text-white transition-transform hover:scale-105"
        )}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
      </button>

      {/* Mobile Panel Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Slide-up Panel */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl bg-white p-6 shadow-xl transition-transform duration-300 md:hidden",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="mb-4 flex items-center justify-between"
        >
          <span className="text-base font-bold text-text"
          >راه‌های ارتباطی</span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3"
        >
          {contactItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
              >
                {item.icon}
              </div>
              <div className="flex flex-col"
              >
                <span className="text-xs text-muted"
                >{item.label}</span>
                <span className="text-sm font-medium text-text"
                >{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
