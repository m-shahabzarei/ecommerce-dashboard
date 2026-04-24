"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type AuthStep = "phone" | "otp";

export function AuthForm() {
  const router = useRouter();
  const [step, setStep] = useState<AuthStep>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!phone.trim()) return;
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep("otp");
      }, 600);
    },
    [phone]
  );

  const handleOtpSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!otp.trim()) return;
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        router.push("/auth/role");
      }, 600);
    },
    [otp, router]
  );

  return (
    <div className="w-full max-w-[400px] rounded-2xl bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-center text-xl font-bold text-text">
        ورود / ثبت‌نام
      </h1>

      {step === "phone" ? (
        <form onSubmit={handlePhoneSubmit}>
          <label className="mb-1.5 block text-sm font-medium text-text">
            شماره موبایل
          </label>
          <input
            type="tel"
            dir="ltr"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="شماره موبایل خود را وارد کنید"
            className={cn(
              "w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-text",
              "placeholder:text-gray-400",
              "focus:border-primary focus:outline-none focus:ring-0",
              "transition-colors"
            )}
          />
          <button
            type="submit"
            disabled={!phone.trim() || isLoading}
            className={cn(
              "mt-4 w-full rounded-xl bg-primary py-2 text-sm font-medium text-white",
              "transition-colors hover:bg-[#1352e0]",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            {isLoading ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              "تایید"
            )}
          </button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit}>
          <label className="mb-1.5 block text-sm font-medium text-text">
            کد ورود
          </label>
          <input
            type="text"
            dir="ltr"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="کد ورود را وارد کنید"
            autoFocus
            className={cn(
              "w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-text",
              "placeholder:text-gray-400",
              "focus:border-primary focus:outline-none focus:ring-0",
              "transition-colors"
            )}
          />
          <button
            type="submit"
            disabled={!otp.trim() || isLoading}
            className={cn(
              "mt-4 w-full rounded-xl bg-primary py-2 text-sm font-medium text-white",
              "transition-colors hover:bg-[#1352e0]",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            {isLoading ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              "ورود"
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setStep("phone");
              setOtp("");
            }}
            className="mt-3 w-full text-center text-sm text-primary hover:underline"
          >
            ویرایش شماره موبایل
          </button>
        </form>
      )}
    </div>
  );
}
