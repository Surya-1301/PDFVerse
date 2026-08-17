import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const PdfEditor = lazy(() => import("@/components/editor/PdfEditor"));

export const Route = createFileRoute("/pdf-editor")({
  head: () => ({
    meta: [
      { title: "Online PDF Editor — Edit PDF Text, Sign & Annotate | PDFVerse" },
      {
        name: "description",
        content:
          "Edit existing PDF text inline, add text, images, signatures, highlights and shapes, organize pages and download — free in your browser.",
      },
      { property: "og:title", content: "Online PDF Editor — PDFVerse" },
      {
        property: "og:description",
        content: "Edit PDF text inline, sign, annotate and download. Free and private, right in your browser.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EditorPage,
});

function Loading() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-workspace text-sm text-muted-foreground">
      Loading editor…
    </div>
  );
}

function EditorPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <ClientOnly fallback={<Loading />}>
        <Suspense fallback={<Loading />}>
          <PdfEditor />
        </Suspense>
      </ClientOnly>
    </div>
  );
}

