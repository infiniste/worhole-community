"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <header className="navbar">
      <Link href="/" className="logo">WorkAway Global</Link>

      <nav>
        <Link href="/posts">Posts</Link>
        <Link href="/create">Write</Link>
        {user ? (
          <>
            <Link href="/profile">Profile</Link>
            <button onClick={logout} className="navButton">Logout</button>
          </>
        ) : (
          <Link href="/login" className="loginLink">Login</Link>
        )}
      </nav>
    </header>
  );
}
