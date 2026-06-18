import { supabase } from "./supabase";

export async function getPosts({ country = "", category = "", limit = 50 } = {}) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return [];
  }

  let query = supabase
    .from("posts")
    .select("*, profiles(username, display_name)")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (country) query = query.eq("country", country);
  if (category) query = query.eq("category", category);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}

export async function getPostById(id) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return null;
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(username, display_name)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function getComments(postId) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return [];
  }

  const { data, error } = await supabase
    .from("comments")
    .select("*, profiles(username, display_name)")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}
