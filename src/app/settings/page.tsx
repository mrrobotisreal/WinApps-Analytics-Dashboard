"use client";
import AppSidebar from "@/components/app-sidebar";
import SiteHeader from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function About() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <main className="win-section space-y-6 animate-fade-in zoom-95">
          <h1 className="win-section-title text-primary">Settings</h1>
          <Card>
            <CardContent className="p-6 space-y-12">
              <section className="space-y-2">
                <CardHeader className="p-0">
                  <CardTitle>Analytics Settings</CardTitle>
                  <CardDescription>
                    {`This is where the analytics settings will go...`}
                  </CardDescription>
                </CardHeader>
              </section>

              <section className="space-y-2">
                <CardHeader className="p-0">
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    {`This is where the account settings will go...`}
                  </CardDescription>
                </CardHeader>
              </section>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
