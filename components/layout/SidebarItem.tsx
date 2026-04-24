"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SidebarItemProps {
  label: string;
  href: string;
  icon: ReactNode;
}

export function SidebarItem({ label, href, icon }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted hover:text-text hover:bg-gray-50"
      )}
    >
      <span
        className={cn(
          "flex-shrink-0",
          isActive ? "text-primary" : "text-muted"
        )}
      >
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}
