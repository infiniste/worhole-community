"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfileForm() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    username: "",
    display_name: "",
    country: "",
    city: "",
    bio: "",
  });

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      const currentUser = userData.user;
      setUser(currentUser);

      if (!currentUser) {
        setMessage("Please login first.");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .single();

      if (data) {
        setForm({
          username: data.username || "",
          display_name: data.display_name || "",
          country: data.country || "",
          city: data.city || "",
          bio: data.bio || "",
        });
      }
    }

    load();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      setMessage("Please login first.");
      return;
    }

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      ...form,
    });

    setMessage(error ? error.message : "Profile saved.");
  }

  return (
    <form className="form cardForm" onSubmit={handleSubmit}>
      <label>Username</label>
      <input name="username" value={form.username} onChange={handleChange} required />

      <label>Display name</label>
      <input name="display_name" value={form.display_name} onChange={handleChange} />

      <label>Country</label>
      <input name="country" value={form.country} onChange={handleChange} placeholder="Canada" />

      <label>City</label>
      <input name="city" value={form.city} onChange={handleChange} placeholder="Toronto" />

      <label>Bio</label>
      <textarea name="bio" value={form.bio} onChange={handleChange} rows="5" />

      <button className="btn primary" type="submit">Save profile</button>
      {message && <p className="message">{message}</p>}
    </form>
  );
}
