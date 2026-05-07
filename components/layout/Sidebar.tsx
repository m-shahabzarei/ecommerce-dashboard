import { SidebarSection } from "./SidebarSection";
import { SidebarItem } from "./SidebarItem";
import { UserProfileBox } from "./UserProfileBox";
import { getNavigation } from "@/lib/navigation";
import { getCurrentRole } from "@/lib/server-role";

export async function Sidebar() {
  const role = await getCurrentRole();
  const nav = getNavigation(role);

  return (
    <aside className="fixed right-0 top-0 h-full w-[260px] bg-white border-l border-border flex flex-col z-50">
      <div className=" flex items-center justify-start px-4">
        <img src="/logo.svg" alt="Logo" className="h-25 w-25" />
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-3 2xl:space-y-6">
        <SidebarSection>
          {nav.top.map((item) => (
            <SidebarItem key={item.href} {...item} />
          ))}
        </SidebarSection>

        <div className="border-t border-border my-2" />

        <SidebarSection>
          {nav.bottom.map((item) => (
            <SidebarItem key={item.href} {...item} />
          ))}
        </SidebarSection>
      </nav>

      <div className="p-4 mt-auto">
        <UserProfileBox role={role} />
      </div>
    </aside>
  );
}
