import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { MOCK_USER, ROLE_LABELS } from "@/lib/roles";

export function UserProfileBox() {
  return (
    <Link
      href="/profile"
      className="flex items-center gap-3 rounded-xl border border-border bg-gray-50 px-4 py-3 transition-colors hover:bg-gray-100"
    >
      <Avatar alt={MOCK_USER.name} size="md" />
      <div className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-semibold text-text">
          {MOCK_USER.name}
        </span>
        <span className="text-xs text-muted">
          {ROLE_LABELS[MOCK_USER.role]}
        </span>
      </div>
    </Link>
  );
}
