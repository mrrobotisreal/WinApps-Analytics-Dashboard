import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ChartNoAxesCombined } from "lucide-react";
import Link from "next/link";

export default function AppSidebar() {
  return (
    <Sidebar className="win-sidebar">
      <SidebarHeader>
      <Link
          href="/"
          className="flex items-center gap-2 px-4 py-3 group"
        >
          <ChartNoAxesCombined
            className="h-5 w-5 text-sidebar-accent group-hover:text-sidebar-primary transition-colors"
            strokeWidth={3}
          />
          <span className="font-semibold text-sm tracking-tight text-sidebar-foreground group-hover:text-sidebar-primary">
            WinApps Analytics
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup></SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-xs text-muted-foreground text-center">
          © 2024 WinApps Analytics. All rights reserved.
        </p>
      </SidebarFooter>
    </Sidebar>
  )
}
