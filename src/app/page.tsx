"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import AppSidebar from "@/components/app-sidebar";
import SiteHeader from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (!user) router.push("/auth");
    });
    return () => unsub();
  }, []);

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <main className="win-section space-y-6 animate-fade-in zoom-95">
          <h1 className="win-section-title text-primary">Dashboard</h1>
          <section className="win-grid">
            <div className="win-card h-40 flex items-center justify-center">
              Coming soon!
            </div>
          </section>
          {/* charts & components will go here */}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
