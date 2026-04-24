"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface Slide {
  id: number;
  title: string;
  description: string;
  cta?: string;
  gradient: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "مدیریت هوشمند موجودی",
    description: "با سیستم جدید انبارداری، موجودی محصولات خود را به صورت لحظه‌ای کنترل کنید.",
    cta: "مشاهده انبار",
    gradient: "from-primary to-blue-400",
  },
  {
    id: 2,
    title: "افزایش فروش با کالاباما",
    description: "دسترسی به شبکه گسترده فروشندگان و تسریع فرآیند توزیع محصولات.",
    cta: "شروع کنید",
    gradient: "from-slate-800 to-slate-600",
  },
  {
    id: 3,
    title: "پشتیبانی ۲۴ ساعته",
    description: "تیم پشتیبانی ما در هر ساعت شبانه‌روز آماده راهنمایی شماست.",
    gradient: "from-emerald-600 to-teal-400",
  },
];

export function DashboardSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(next, 4500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, next]);

  return (
    <div
      className="relative h-[240px] w-full overflow-hidden rounded-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 flex flex-col justify-center bg-gradient-to-br px-8 py-6 transition-opacity duration-700 ease-in-out",
            slide.gradient,
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            {slide.title}
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/90 md:text-base">
            {slide.description}
          </p>
          {slide.cta && (
            <div className="mt-4">
              <Button variant="secondary" size="sm">
                {slide.cta}
              </Button>
            </div>
          )}
        </div>
      ))}

      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/20 px-3 py-1.5 backdrop-blur-sm">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === current
                ? "w-6 bg-primary"
                : "w-2 bg-gray-300 hover:bg-gray-200"
            )}
            aria-label={`اسلاید ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
