"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "./ui/navigation-menu";
import { ChartNoAxesCombined } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/analytics", label: "Analytics" },
  { href: "/docs", label: "Docs" },
  { href: "/about", label: "About" },
  { href: "/settings", label: "Settings" },
] as const;

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    // <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 items-center border-b bg-background px-4 lg:px-6">
      {/* <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6"> */}
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {/* <h1 className="text-base font-medium">Dashboard</h1> */}
        <NavigationMenu>
          <NavigationMenuList className="gap-1">
          <NavigationMenuItem>
              <ChartNoAxesCombined
                className="h-5 w-5 text-sidebar-primary"
                strokeWidth={3}
              />
            </NavigationMenuItem>
            {navLinks.map(({ href, label }) => {
              const active = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <NavigationMenuItem key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "px-2 py-1.5 text-sm rounded-md transition-colors",
                      active
                        ? "font-semibold text-primary drop-shadow-[0_0_4px_var(--primary)]"
                        : "text-muted-foreground hover:text-primary hover:font-semibold hover:drop-shadow-[0_0_4px_var(--primary)]"
                    )}
                  >
                    {label}
                  </Link>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex-1" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src={user?.photoURL ?? undefined} alt={user?.email ?? "avatar"} />
              <AvatarFallback>{user?.email?.[0].toUpperCase() ?? "?"}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 win-card p-0 overflow-hidden animate-fade-in">
            <DropdownMenuLabel className="px-4 py-3 text-sm font-medium truncate">
              {user?.email ?? "anonymous"}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem onSelect={() => router.push("/profile")}>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => router.push("/settings")}>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-destructive data-[highlighted]:text-destructive-foreground"
              onSelect={logout}
            >
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      {/* </div> */}
    </header>
  )
}
