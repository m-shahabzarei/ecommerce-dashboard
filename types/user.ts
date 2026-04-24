import { Role } from "@/lib/roles";

export interface User {
  name: string;
  role: Role;
  avatar?: string;
}
