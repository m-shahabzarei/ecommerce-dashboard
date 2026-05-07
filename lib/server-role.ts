import { cookies } from "next/headers";
import { normalizeRole, ROLE_COOKIE_NAME } from "@/lib/roles";

export async function getCurrentRole() {
  const cookieStore = await cookies();
  return normalizeRole(cookieStore.get(ROLE_COOKIE_NAME)?.value);
}
