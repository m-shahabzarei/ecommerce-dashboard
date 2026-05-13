export type Role = "supplier" | "seller";

export const ROLE_COOKIE_NAME = "kalabama-role";

export const ROLE_LABELS: Record<Role, string> = {
  supplier: "تامین‌کننده",
  seller: "فروشنده",
};

export const MOCK_USER = {
  name: "علی رضایی",
  phone: "۰۹۱۲۳۴۵۶۷۸۹",
  role: "supplier" as Role,
};

export function normalizeRole(value: string | null | undefined): Role {
  return value === "seller" || value === "supplier" ? value : MOCK_USER.role;
}
