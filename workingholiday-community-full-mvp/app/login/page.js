import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <main className="container narrow">
      <section className="pageTitle">
        <h1>Login / Sign up</h1>
        <p>Create an account to write posts, comment, like, and report.</p>
      </section>
      <AuthForm />
    </main>
  );
}
