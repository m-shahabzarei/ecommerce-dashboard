import { ReactNode } from "react";

interface SidebarSectionProps {
  title?: string;
  children: ReactNode;
}

export function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div className="flex flex-col gap-1">
      {title && (
        <span className="px-4 text-xs font-semibold text-muted uppercase tracking-wider mb-2">
          {title}
        </span>
      )}
      {children}
    </div>
  );
}
