"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ReportForm({ postId }) {
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  async function handleReport(e) {
    e.preventDefault();

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      setMessage("Please login first.");
      return;
    }

    const { error } = await supabase.from("reports").insert([
      {
        post_id: postId,
        user_id: user.id,
        reason,
      },
    ]);

    setMessage(error ? error.message : "Report submitted.");
    setReason("");
  }

  return (
    <section className="detailCard">
      <h2>Report this post</h2>
      <form className="form" onSubmit={handleReport}>
        <select value={reason} onChange={(e) => setReason(e.target.value)} required>
          <option value="">Select reason</option>
          <option>Spam</option>
          <option>Scam or suspicious job</option>
          <option>Harassment</option>
          <option>Wrong category</option>
          <option>Other</option>
        </select>
        <button className="btn danger" type="submit">Report</button>
        {message && <p className="message">{message}</p>}
      </form>
    </section>
  );
}
