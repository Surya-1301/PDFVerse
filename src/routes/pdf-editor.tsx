import { createFileRoute } from "@tanstack/react-router";
import { Crop, Download, FileText, PenLine, Upload } from "lucide-react";

import PdfEditor from "@/components/editor/PdfEditor";
import { HowToUse } from "@/components/site/HowToUse";

const EDITOR_URL = "https://pdfverse.pages.dev/pdf-editor";
const EDITOR_IMAGE = "https://pdfverse.pages.dev/og-image.png";

const editorJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "PDFVerse — Online PDF Editor",
  url: EDITOR_URL,
  description:
    "Edit existing PDF text inline, add text, images, signatures, highlights and shapes, organize pages and download — free in your browser.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  browserRequirements: "Requires JavaScript",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  publisher: {
    "@type": "Organization",
    name: "PDFVerse",
    url: "https://pdfverse.pages.dev",
    logo: {
      "@type": "ImageObject",
      url: EDITOR_IMAGE,
    },
  },
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
      name: "PDF Editor",
      item: EDITOR_URL,
    },
  ],
};

export const Route = createFileRoute("/pdf-editor")({
  head: () => ({
    meta: [
      { title: "PDF Editor — Edit PDF Text, Sign & Annotate | PDFVerse" },
      {
        name: "description",
        content:
          "Edit existing PDF text inline, add text, images, signatures, highlights and shapes, organize pages and download — free in your browser.",
      },
      { property: "og:title", content: "Online PDF Editor — PDFVerse" },
      {
        property: "og:description",
        content:
          "Edit PDF text inline, sign, annotate and download. Free and private, right in your browser.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: EDITOR_URL },
      { property: "og:image", content: EDITOR_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "PDF Editor — Edit PDF Text, Sign & Annotate | PDFVerse",
      },
      {
        name: "twitter:description",
        content:
          "Edit PDF text inline, sign, annotate and download. Free and private, right in your browser.",
      },
      { name: "twitter:image", content: EDITOR_IMAGE },
    ],
    links: [{ rel: "alternate", hrefLang: "en", href: EDITOR_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(editorJsonLd),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbJsonLd),
      },
    ],
  }),
  component: EditorPage,
});

function EditorPage() {
  return (
    <div className="pdfverse-exact-reference min-h-screen bg-bg-base">
      <PdfEditor />

<div className="relative z-10 bg-transparent pb-20 lg:pb-28">
        <HowToUse
          title="How to use PDF Editor"
          subtitle=""
          className="mt-6 sm:-mt-4 lg:mt-0"
          steps={[
            {
              title: "Upload PDF",
              description:
                "Select or drop your PDF into the PDF Editor. Files never leave your browser.",
              icon: <Upload className="h-5 w-5" />,
            },
            {
              title: "Edit your PDF",
              description:
                "Add text, signatures, highlights, drawings, images, shapes, or annotations.",
              icon: <PenLine className="h-5 w-5" />,
            },
            {
              title: "Preview changes",
              description:
                "Review each page and make sure your edits are placed correctly before exporting.",
              icon: <FileText className="h-5 w-5" />,
            },
            {
              title: "Download",
              description:
                "Export your edited PDF instantly and save the finished file to your device.",
              icon: <Download className="h-5 w-5" />,
            },
          ]}
          desktopSteps={[
            {
              title: "Browse tools",
              description:
                "Open PDF Editor from the PDFVerse tools list or directly from the editor page.",
              icon: <FileText className="h-5 w-5" />,
            },
            {
              title: "Choose PDF Editor",
              description:
                "Select the PDF Editor tool to edit text, sign, draw, annotate, and organize pages.",
              icon: <PenLine className="h-5 w-5" />,
            },
            {
              title: "Upload file",
              description:
                "Upload your PDF or start with a blank document. Files never leave your browser.",
              icon: <Upload className="h-5 w-5" />,
            },
            {
              title: "Set options",
              description:
                "Add text, signatures, highlights, drawings, images, shapes, or annotations.",
              icon: <Crop className="h-5 w-5" />,
            },
            {
              title: "Process",
              description:
                "Preview your edits and review each page before exporting the final PDF.",
              icon: <FileText className="h-5 w-5" />,
            },
            {
              title: "Download",
              description:
                "Export your edited PDF instantly and save the finished file to your device.",
              icon: <Download className="h-5 w-5" />,
            },
          ]}
        />
      </div>
    </div>
  );
}