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
          <h1 className="win-section-title text-primary">
            About WinApps Analytics
          </h1>
          <Card>
            <CardContent className="p-6 space-y-12">
              <section className="space-y-2">
                <CardHeader className="p-0">
                  <CardTitle>Who we are</CardTitle>
                  <CardDescription>
                    {`"We" is technically just "me", Mitchell Wintrow, at the moment, but soon I hope to expand this into a team of like-minded individuals who value privacy and simplicity in web analytics. I myself am a software engineer with a passion for building tools that respect user privacy and provide meaningful insights without compromising on security or usability.`}
                  </CardDescription>
                </CardHeader>
              </section>

              <section className="space-y-2">
                <CardHeader className="p-0">
                  <CardTitle>What we do</CardTitle>
                  <CardDescription>
                    WinApps Analytics provides privacy‑first insights into your
                    Websites and applications. It is designed to be simple,
                    secure, and efficient, ensuring that your data remains
                    private and under your control. Simply add a small script to
                    your site, and you can start tracking user interactions
                    without any invasive data collection practices. If you are a
                    more technical user, you can also install the
                    @winapps/analytics npm package and follow the documentation
                    to create more advanced analytics tracking.
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
