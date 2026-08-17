// Server Component — required so `generateStaticParams` works with `output: 'export'`.
// "use client" is intentionally NOT present here.
import type { Metadata } from "next";

import { pdfTools, slugAliases, findTool } from "@/lib/pdfTools";
import { PdfToolClient } from "./PdfToolClient";

/**
 * Static export needs every slug pre-rendered. We include both the canonical
 * tool slugs and the legacy alias slugs so old URLs resolve to a real page
 * instead of a 404 during static generation.
 */
export function generateStaticParams() {
  const canonical = pdfTools.map((t) => ({ slug: t.slug }));
  const aliases = Object.keys(slugAliases).map((slug) => ({ slug }));
  // Deduplicate in case an alias collides with a canonical slug.
  const seen = new Set<string>();
  const all = [...canonical, ...aliases].filter(({ slug }) => {
    if (seen.has(slug)) return false;
    seen.add(slug);
    return true;
  });
  return all;
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return (async () => {
    const { slug } = await params;
    const canonical = slugAliases[slug] ?? slug;
    const tool = findTool(canonical);
    if (!tool) {
      return { title: "PDF tool not found" };
    }
    return {
      title: `${tool.title} — PDFVerse`,
      description: tool.description,
    };
  })();
}

export default function PdfToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // The slug is resolved on the client too (PdfToolClient), but we read it here
  // so the component can be treated as a plain server-rendered shell.
  return <PdfToolClient />;
}
