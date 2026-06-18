import ProfileForm from "@/components/ProfileForm";

export default function ProfilePage() {
  return (
    <main className="container narrow">
      <section className="pageTitle">
        <h1>Profile</h1>
        <p>Add your working holiday country, city, and short bio.</p>
      </section>
      <ProfileForm />
    </main>
  );
}
