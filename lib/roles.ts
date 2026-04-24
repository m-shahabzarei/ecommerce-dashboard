export type Role = "supplier" | "seller";

export const ROLE_LABELS: Record<Role, string> = {
  supplier: "تامین‌کننده",
  seller: "فروشنده",
};

export const MOCK_USER = {
  name: "علی رضایی",
  role: "supplier" as Role,
};
