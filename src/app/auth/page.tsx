"use client";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNew, setIsNew] = useState(false);

  const submit = async () => {
    try {
      console.log("Submitting auth form", { email, password, isNew });
      if (isNew) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        const res = await signInWithEmailAndPassword(auth, email, password);
        console.log("Signed in user:", res.user);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast("Auth error", { description: err.message });
    }
  };

  useEffect(() => {
      const unsub = onAuthStateChanged(auth, user => {
        if (user) router.push("/");
      });
      return () => unsub();
    }, []);

  return (
    <div className="win-card w-96 animate-fade-in-up">
      <h2 className="text-center mb-4 win-section-title">
        {isNew ? "Create account" : "Sign in"}
      </h2>
      <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="win-input mb-3" />
      <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="win-input mb-5" />
      <Button className="win-primary-button w-full mb-2" onClick={submit}>
        {isNew ? "Sign Up" : "Sign In"}
      </Button>
      <Button variant="ghost" className="w-full text-sm opacity-70 hover:opacity-100" onClick={() => setIsNew(!isNew)}>
        {isNew ? "Have an account? Sign in" : "No account? Sign up"}
      </Button>
    </div>
  );
}