import {
  createFileRoute,
  Link,
  notFound,
} from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Tags,
  Wrench,
} from "lucide-react";
import { Container } from "@/components/site/Container";
import { blogPosts, findBlogPost } from "@/lib/blog";
import { findTool } from "@/lib/pdfTools";

export const Route = createFileRoute("/blog/$postSlug")({
  loader: ({ params }) => {
    const post = findBlogPost(params.postSlug);

    if (!post) {
      throw notFound();
    }

    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Blog post unavailable — PDFVerse" },
          { name: "robots", content: "noindex" },
        ],
      };
    }

    const { post } = loaderData;
    const url = `https://pdfverse.pages.dev/blog/${post.slug}`;
    const image = "https://pdfverse.pages.dev/og-image.png";

    // Format ISO date -> 2026-09-13 renders as September 13, 2026
    const publishDate = new Date(post.date).toISOString();

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: publishDate,
      dateModified: publishDate,
      url,
      image,
      author: {
        "@type": "Organization",
        name: "PDFVerse",
        url: "https://pdfverse.pages.dev",
      },
      publisher: {
        "@type": "Organization",
        name: "PDFVerse",
        url: "https://pdfverse.pages.dev",
        logo: {
          "@type": "ImageObject",
          url: image,
        },
      },
      mainEntityOfPage: url,
    };

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://pdfverse.pages.dev/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://pdfverse.pages.dev/blog",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: url,
        },
      ],
    };

    return {
      meta: [
        { title: `${post.title} | PDFVerse Blog` },
        { name: "description", content: post.description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.description },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "alternate", hrefLang: "en", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbJsonLd),
        },
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();

  const relatedTool = findTool(post.toolSlug);

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <section className="min-h-screen bg-bg-base pb-20 pt-8">
      <Container>
        <article className="mx-auto max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color: "var(--text-2)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            All guides
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-medium" style={{ color: 'var(--text-3)' }}>
            <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 font-semibold" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
              <Tags className="h-3 w-3" />
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime} min read
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl" style={{ color: 'var(--text-1)' }}>
            {post.title}
          </h1>

          <div className="mt-5 space-y-5">
            {post.body.map((para, index) => (
              <p key={index} className="text-base leading-7" style={{ color: 'var(--text-2)' }}>
                {para}
              </p>
            ))}
          </div>

          {/* Inline CTA linking to the tool (internal cross-link) */}
          {relatedTool && (
            <Link
              to="/pdf/$slug"
              params={{ slug: relatedTool.slug }}
              className="mt-8 flex items-center justify-between gap-3 rounded-2xl border p-5 transition duration-200 hover:shadow-lg"
              style={{
                borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)',
                background: 'var(--accent-light)',
              }}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                  Try it free
                </p>
                <p className="mt-1 font-semibold" style={{ color: 'var(--text-1)' }}>
                  {relatedTool.title}
                </p>
                <p className="mt-0.5 text-sm" style={{ color: 'var(--text-2)' }}>
                  {relatedTool.description}
                </p>
              </div>
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          )}
        </article>

        {/* Related posts */}
        <div className="mx-auto mt-14 max-w-3xl">
          <h2 className="text-lg font-semibold" style={{ color: 'var(--text-1)' }}>
            You might also like
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {relatedPosts.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$postSlug"
                params={{ postSlug: p.slug }}
                className="group rounded-xl border p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                style={{ borderColor: 'var(--border)' }}
              >
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold"
                  style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
                >
                  <Wrench className="h-3 w-3" />
                  {p.category}
                </span>
                <h3 className="mt-2 text-sm font-semibold leading-snug transition-colors group-hover:underline" style={{ color: 'var(--text-1)' }}>
                  {p.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  {p.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}