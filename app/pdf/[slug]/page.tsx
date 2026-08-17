
import type { Metadata } from "next";
import { pdfTools, slugAliases, findTool } from "@/lib/pdfTools";
import { PdfToolClient } from "./PdfToolClient";
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
  return <PdfToolClient />;
}
