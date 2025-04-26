import "../styles/globals.css";
import type { Metadata } from "next";
import { JetBrains_Mono, Geist } from "next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { Toaster } from "@/components/ui/sonner"

const font = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });
const sansFont = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = { title: "WinApps Analytics", description: "Realtime site analytics" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${font.variable} ${sansFont.variable}`}>
      <body className="bg-background text-foreground font-sans">
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster richColors />
        </QueryClientProvider>
      </body>
    </html>
  );
}
