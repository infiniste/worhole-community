import CreatePostForm from "@/components/CreatePostForm";

export default function CreatePage() {
  return (
    <main className="container narrow">
      <section className="pageTitle">
        <h1>Create Post</h1>
        <p>Share jobs, housing, travel plans, used items, or local questions.</p>
      </section>
      <CreatePostForm />
    </main>
  );
}
