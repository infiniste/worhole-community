"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CommentForm({ postId }) {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      setMessage("Please login first.");
      return;
    }

    const { error } = await supabase.from("comments").insert([
      {
        post_id: postId,
        user_id: user.id,
        content,
      },
    ]);

    if (error) {
      setMessage(error.message);
      return;
    }

    window.location.reload();
  }

  return (
    <form className="form commentForm" onSubmit={handleSubmit}>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write a comment..." required />
      <button className="btn primary" type="submit">Comment</button>
      {message && <p className="message">{message}</p>}
    </form>
  );
}
