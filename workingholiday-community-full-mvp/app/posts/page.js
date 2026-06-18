import PostCard from "@/components/PostCard";
import FilterBar from "@/components/FilterBar";
import { getPosts } from "@/lib/posts";

export default async function PostsPage({ searchParams }) {
  const country = searchParams?.country || "";
  const category = searchParams?.category || "";
  const posts = await getPosts({ country, category });

  return (
    <main className="container">
      <section className="pageTitle">
        <h1>Community Posts</h1>
        <p>Filter working holiday posts by country and category.</p>
      </section>

      <FilterBar selectedCountry={country} selectedCategory={category} />

      <section className="grid">
        {posts.length === 0 ? (
          <p className="empty">No posts found.</p>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </section>
    </main>
  );
}
