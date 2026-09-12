import { Link } from "@tanstack/react-router";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { pdfTools } from "@/lib/pdfTools";

/** Returns the correct app route for a given tool slug.
 *  The editor lives at its own static route, all others at /pdf/<slug>. */
export function toolHref(slug: string): "/pdf-editor" | `/pdf/${string}` {
  return slug === "pdf-editor"
    ? "/pdf-editor"
    : (`/pdf/${slug}` as const);
}

type RelatedToolsProps = {
  currentSlug: string;
  /** Max number of related tools to show. Defaults to 4. */
  limit?: number;
};

/** Cross-links to other tools in the same category.
 *  Improves internal linking (SEO) and helps users discover adjacent tools. */
export function RelatedTools({
  currentSlug,
  limit = 4,
}: RelatedToolsProps) {
  const tool = pdfTools.find((t) => t.slug === currentSlug);

  if (!tool) {
    return null;
  }

  const related = pdfTools
    .filter(
      (t) =>
        t.slug !== currentSlug &&
        t.category === tool.category,
    )
    .slice(0, limit);

  if (related.length === 0) {
    return null;
  }

  return (
    <section
      className="mx-auto mt-16 w-full max-w-4xl px-4 sm:px-6 lg:px-8"
      aria-label={`Related PDF tools`}
    >
      <div
        className="flex items-center justify-between"
      >
        <h2
          className="text-lg font-semibold flex items-center gap-2"
          style={{ color: "var(--text-1)" }}
        >
          <LayoutGrid className="h-4 w-4" style={{ color: "var(--accent)" }} />
          Related PDF tools
        </h2>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {related.map((item) => (
          <Link
            key={item.slug}
            to={toolHref(item.slug)}
            className="group flex items-center justify-between gap-3 rounded-xl border px-4 py-3 transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in srgb, var(--bg) 60%, var(--bg-base))",
            }}
          >
            <div className="flex min-w-0 items-center gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{
                  background: "var(--accent-light)",
                  color: "var(--accent)",
                }}
              >
                <item.icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p
                  className="truncate text-sm font-semibold transition-colors group-hover:underline"
                  style={{ color: "var(--text-1)" }}
                >
                  {item.title}
                </p>
                <p
                  className="truncate text-xs"
                  style={{ color: "var(--text-2)" }}
                >
                  {item.description}
                </p>
              </div>
            </div>
            <ArrowRight
              className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
              style={{ color: "var(--text-3)" }}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RelatedTools;