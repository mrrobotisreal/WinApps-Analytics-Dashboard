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
          <h1 className="win-section-title text-primary">Documentation</h1>
          <Card>
            <CardContent className="p-6 space-y-12">
              <section className="space-y-2">
                <CardHeader className="p-0">
                  <CardTitle>Basic Analytics</CardTitle>
                  <CardDescription>
                    {`This essentially just means adding the WinApps Analytics script to your site. You can do this by adding the following script tag to your HTML:`}
                  </CardDescription>
                </CardHeader>
              </section>

              <section className="space-y-2">
                <CardHeader className="p-0">
                  <CardTitle>Custom Analytics</CardTitle>
                  <CardDescription>
                    {`This is where you can get more advanced with your analytics tracking. You can use the @winapps/analytics npm package to create custom events, track user interactions, and more. Here's a basic example of how to use it:`}
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
