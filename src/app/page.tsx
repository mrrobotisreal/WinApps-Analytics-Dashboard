"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (!user) router.push("/auth");
    });
    return () => unsub();
  }, []);

  return (
    <main className="win-section space-y-6 animate-fade-in zoom-95">
      <h1 className="win-section-title text-primary">Dashboard</h1>
      <section className="win-grid">
        <div className="win-card h-40 flex items-center justify-center">
          Coming soon!
        </div>
      </section>
      {/* charts & components will go here */}
    </main>
  );
}
