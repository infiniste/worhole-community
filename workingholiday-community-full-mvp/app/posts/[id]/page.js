import Image from "next/image";
import Link from "next/link";
import CommentForm from "@/components/CommentForm";
import LikeButton from "@/components/LikeButton";
import ReportForm from "@/components/ReportForm";
import { getPostById, getComments } from "@/lib/posts";

export default async function PostDetailPage({ params }) {
  const post = await getPostById(params.id);
  const comments = await getComments(params.id);

  if (!post) {
    return (
      <main className="container narrow">
        <p className="empty">Post not found.</p>
      </main>
    );
  }

  return (
    <main className="container narrow">
      <Link href="/posts" className="backLink">← Back to posts</Link>

      <article className="detailCard">
        <div className="postTop">
          <span className="badge">{post.category}</span>
          <span className="country">{post.country} {post.city ? `· ${post.city}` : ""}</span>
        </div>

        <h1>{post.title}</h1>

        {post.image_url && (
          <img className="postImage" src={post.image_url} alt={post.title} />
        )}

        <p className="detailContent">{post.content}</p>

        <div className="authorBox">
          <strong>{post.profiles?.display_name || post.profiles?.username || "Anonymous"}</strong>
          <span>{new Date(post.created_at).toLocaleString()}</span>
        </div>

        <LikeButton postId={post.id} />
      </article>

      <section className="detailCard">
        <h2>Comments</h2>
        <CommentForm postId={post.id} />

        <div className="commentList">
          {comments.length === 0 ? (
            <p className="muted">No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <div className="comment" key={comment.id}>
                <strong>{comment.profiles?.display_name || comment.profiles?.username || "User"}</strong>
                <p>{comment.content}</p>
                <span>{new Date(comment.created_at).toLocaleString()}</span>
              </div>
            ))
          )}
        </div>
      </section>

      <ReportForm postId={post.id} />
    </main>
  );
}
