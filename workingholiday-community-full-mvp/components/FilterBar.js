import Link from "next/link";

const countries = ["Canada", "Australia", "New Zealand", "Japan", "Germany", "United Kingdom"];
const categories = ["Jobs", "Housing", "Travel Mate", "Q&A", "Used Market", "Local Tips"];

export default function FilterBar({ selectedCountry, selectedCategory }) {
  return (
    <section className="filterBox">
      <div>
        <h3>Countries</h3>
        <div className="filterLinks">
          <Link className={!selectedCountry ? "activeFilter" : ""} href="/posts">All</Link>
          {countries.map((country) => (
            <Link
              key={country}
              className={selectedCountry === country ? "activeFilter" : ""}
              href={`/posts?country=${encodeURIComponent(country)}${selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : ""}`}
            >
              {country}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3>Categories</h3>
        <div className="filterLinks">
          {categories.map((category) => (
            <Link
              key={category}
              className={selectedCategory === category ? "activeFilter" : ""}
              href={`/posts?category=${encodeURIComponent(category)}${selectedCountry ? `&country=${encodeURIComponent(selectedCountry)}` : ""}`}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
