"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ContactSection } from "@/components/landing/ContactSection";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Goftino widget — loads safely after hydration
    const existing = document.getElementById("goftino-script");
    if (existing) return;

    const script = document.createElement("script");
    script.id = "goftino-script";
    script.src = "https://www.goftino.com/widget/abcdefghijklmnopqrstuvwxyz";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-white" dir="rtl">
      {/* Minimal Header */}
      <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center px-6">
          <Image
            src="/logo.svg"
            alt="کالاباما"
            width={120}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center px-6 pb-24 pt-12 md:min-h-[calc(100vh-64px)] md:pb-16 md:pt-0">
        <div className="flex max-w-xl flex-col items-center text-center">
          {/* Hero Image */}
          <div className="mb-8 w-full max-w-sm">
            <Image
              src="/logo.svg"
              alt="کالاباما"
              width={400}
              height={164}
              className="mx-auto h-auto w-full max-w-[280px]"
              priority
            />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold leading-tight text-text md:text-4xl">
            کالاباما، فروش با شما
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            پلتفرم هوشمند دراپشیپینگ با قابلیت اتصال به باسلام، شاپفا و وردپرس
          </p>

          {/* CTA */}
          <button
            type="button"
            onClick={() => router.push("/auth")}
            className={cn(
              "mt-8 rounded-xl bg-primary px-8 py-2.5 text-base font-medium text-white",
              "transition-colors hover:bg-[#1352e0]"
            )}
          >
            شروع کنید
          </button>
        </div>
      </main>

      {/* Contact */}
      <ContactSection />
    </div>
  );
}
