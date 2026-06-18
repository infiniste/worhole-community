"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CreatePostForm() {
  const [form, setForm] = useState({
    title: "",
    country: "Canada",
    city: "",
    category: "Jobs",
    content: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function uploadImage(userId) {
    if (!image) return null;

    const fileExt = image.name.split(".").pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `posts/${fileName}`;

    const { error } = await supabase.storage
      .from("post-images")
      .upload(filePath, image);

    if (error) throw error;

    const { data } = supabase.storage
      .from("post-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("Posting...");

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      setMessage("Please login first.");
      return;
    }

    try {
      const imageUrl = await uploadImage(user.id);

      const { error } = await supabase.from("posts").insert([
        {
          ...form,
          user_id: user.id,
          image_url: imageUrl,
        },
      ]);

      if (error) throw error;

      window.location.href = "/posts";
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <form className="form cardForm" onSubmit={handleSubmit}>
      <label>Title</label>
      <input name="title" value={form.title} onChange={handleChange} required />

      <label>Country</label>
      <select name="country" value={form.country} onChange={handleChange}>
        <option>Canada</option>
        <option>Australia</option>
        <option>New Zealand</option>
        <option>Japan</option>
        <option>Germany</option>
        <option>United Kingdom</option>
        <option>Other</option>
      </select>

      <label>City</label>
      <input name="city" value={form.city} onChange={handleChange} placeholder="Toronto, Sydney, Tokyo..." />

      <label>Category</label>
      <select name="category" value={form.category} onChange={handleChange}>
        <option>Jobs</option>
        <option>Housing</option>
        <option>Travel Mate</option>
        <option>Q&A</option>
        <option>Used Market</option>
        <option>Local Tips</option>
      </select>

      <label>Image</label>
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

      <label>Content</label>
      <textarea name="content" value={form.content} onChange={handleChange} rows="7" required />

      <button className="btn primary" type="submit">Submit</button>
      {message && <p className="message">{message}</p>}
    </form>
  );
}
