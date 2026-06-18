import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <Link href={`/posts/${post.id}`} className="postCard">
      {post.image_url && <img className="cardImage" src={post.image_url} alt={post.title} />}

      <div className="postTop">
        <span className="badge">{post.category}</span>
        <span className="country">{post.country}</span>
      </div>

      <h3>{post.title}</h3>
      <p>{post.content}</p>

      <div className="postMeta">
        <span>{post.city || "Global"}</span>
        <span>{new Date(post.created_at).toLocaleDateString()}</span>
      </div>
    </Link>
  );
}
