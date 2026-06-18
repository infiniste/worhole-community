"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthForm() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("Loading...");

    const result =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    if (mode === "signup") {
      setMessage("Account created. Check email if confirmation is enabled.");
    } else {
      window.location.href = "/profile";
    }
  }

  return (
    <section className="authBox">
      <div className="tabButtons">
        <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")} type="button">Login</button>
        <button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")} type="button">Sign up</button>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" />

        <button className="btn primary" type="submit">
          {mode === "login" ? "Login" : "Create account"}
        </button>

        {message && <p className="message">{message}</p>}
      </form>
    </section>
  );
}
