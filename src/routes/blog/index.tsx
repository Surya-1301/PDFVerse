import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { Container } from "@/components/site/Container";
import { blogPosts } from "@/lib/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — PDF Guides, Tips & How-Tos | PDFVerse" },
      {
        name: "description",
        content:
          "Free guides and how-tos for PDF tasks: merge, split, compress, protect, convert and organize PDF files.",
      },
      {
        property: "og:title",
        content: "Blog — PDF Guides, Tips & How-Tos | PDFVerse",
      },
      {
        property: "og:description",
        content:
          "Free guides and how-tos for PDF tasks: merge, split, compress, protect, convert and organize PDF files.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://pdfverse.pages.dev/blog",
      },
      {
        property: "og:image",
        content: "https://pdfverse.pages.dev/og-image.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Blog — PDF Guides, Tips & How-Tos | PDFVerse",
      },
      {
        name: "twitter:description",
        content:
          "Free guides and how-tos for PDF tasks: merge, split, compress, protect, convert and organize PDF files.",
      },
      {
        name: "twitter:image",
        content: "https://pdfverse.pages.dev/og-image.png",
      },
    ],
    links: [
      { rel: "alternate", hrefLang: "en", href: "https://pdfverse.pages.dev/blog" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "PDFVerse Blog",
          url: "https://pdfverse.pages.dev/blog",
          description:
            "Free guides and how-tos for PDF tasks: merge, split, compress, protect, convert and organize PDF files.",
        }),
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <section className="min-h-screen bg-bg-base pb-20 pt-12">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium" style={{ borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)', background: 'var(--accent-light)', color: 'var(--text-1)' }}>
            <BookOpen className="h-4 w-4" />
            PDFVerse Blog
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: 'var(--text-1)' }}>
            PDF Guides, Tips & How-Tos
          </h1>
          <p className="mt-3 text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Step-by-step guides to the most common PDF tasks — all
            powered by browser-based tools that never upload your
            files.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$postSlug"
              params={{ postSlug: post.slug }}
              className="group block rounded-2xl border p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl"
              style={{
                borderColor: 'var(--border)',
                background: 'color-mix(in srgb, var(--bg) 60%, var(--bg-base))',
              }}
            >
              <div className="flex items-center gap-3 text-xs font-medium" style={{ color: 'var(--text-3)' }}>
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  style={{
                    background: 'var(--accent-light)',
                    color: 'var(--accent)',
                  }}
                >
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime} min read
                </span>
              </div>

              <h2 className="mt-3 text-lg font-semibold leading-snug transition-colors group-hover:underline" style={{ color: 'var(--text-1)' }}>
                {post.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                {post.description}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium transition-colors" style={{ color: 'var(--accent)' }}>
                Read guide
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}