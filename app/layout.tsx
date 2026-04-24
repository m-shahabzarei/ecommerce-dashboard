import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "کالاباما - داشبورد",
  description: "پنل مدیریت کالاباما",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
