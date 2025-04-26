import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(() => auth.currentUser);
  useEffect(() => auth.onAuthStateChanged(setUser), []);
  return {
    user,
    logout: () => signOut(auth),
  };
}
