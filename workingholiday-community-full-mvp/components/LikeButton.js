"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LikeButton({ postId }) {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      const { count } = await supabase
        .from("likes")
        .select("*", { count: "exact", head: true })
        .eq("post_id", postId);

      setCount(count || 0);
    }

    load();
  }, [postId]);

  async function like() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      setMessage("Please login first.");
      return;
    }

    const { error } = await supabase.from("likes").insert([
      {
        post_id: postId,
        user_id: user.id,
      },
    ]);

    if (error) {
      setMessage("Already liked or error occurred.");
      return;
    }

    setCount(count + 1);
  }

  return (
    <div className="likeBox">
      <button className="btn secondary" onClick={like}>Like · {count}</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
