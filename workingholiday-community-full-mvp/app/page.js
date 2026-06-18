import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getPosts } from "@/lib/posts";

export default async function HomePage() {
  const posts = await getPosts({ limit: 6 });

  return (
    <main className="container">
      <section className="hero">
        <div>
          <p className="eyebrow">Global Working Holiday Community</p>
          <h1>Jobs, housing, friends, and local tips abroad.</h1>
          <p className="heroText">
            A responsive community for working holiday makers in Canada, Australia,
            New Zealand, Japan, Germany, and more.
          </p>
          <div className="heroActions">
            <Link href="/create" className="btn primary">Write a post</Link>
            <Link href="/posts" className="btn secondary">Browse posts</Link>
          </div>
        </div>

        <div className="heroCard">
          <h3>Minimum MVP included</h3>
          <div className="tags">
            <span>Auth</span>
            <span>Profiles</span>
            <span>Posts</span>
            <span>Images</span>
            <span>Comments</span>
            <span>Reports</span>
          </div>
        </div>
      </section>

      <section className="sectionHeader">
        <h2>Latest posts</h2>
        <Link href="/posts">View all</Link>
      </section>

      <section className="grid">
        {posts.length === 0 ? (
          <p className="empty">No posts yet. Create the first post.</p>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </section>
    </main>
  );
}
