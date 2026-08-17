import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { ToolRunner } from "@/components/tools/ToolRunner";
import { findTool, pdfTools, slugAliases } from "@/lib/pdfTools";

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  const slugs = new Set<string>([
    ...pdfTools.map((tool) => tool.slug),
    ...Object.keys(slugAliases),
  ]);

  return Array.from(slugs, (slug) => ({ slug }));
}

function getToolFromSlug(slug: string) {
  const canonicalSlug = slugAliases[slug] ?? slug;
  return findTool(canonicalSlug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolFromSlug(slug);

  if (!tool) {
    return {
      title: "PDF tool not found | PDFVerse",
      description: "The requested PDF tool could not be found.",
    };
  }

  const title = `${tool.title} | PDFVerse`;
  const url = `https://pdfverse.pages.dev/pdf/${slug}`;

  return {
    title,
    description: tool.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: tool.description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description: tool.description,
    },
  };
}

export default async function PdfToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const canonicalSlug = slugAliases[slug] ?? slug;
  const tool = findTool(canonicalSlug);

  if (!tool) notFound();

  const url = `https://pdfverse.pages.dev/pdf/${slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    description: tool.description,
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
  };

  return (
    <main className="min-h-screen bg-slate-950 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-black text-white sm:text-5xl">
            {tool.title}
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg">
            {tool.description}
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <ToolRunner
            slug={canonicalSlug}
            title={tool.title}
            description={tool.description}
          />
        </div>
      </Container>
    </main>
  );
}
