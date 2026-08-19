import { createFileRoute } from "@tanstack/react-router";
import { Crop, Download, FileText, PenLine, Upload } from "lucide-react";

import PdfEditor from "@/components/editor/PdfEditor";
import { HowToUse } from "@/components/site/HowToUse";

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
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EditorPage,
});

function EditorPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <PdfEditor />

      <div className="relative z-10 border-t border-white/10 bg-slate-950 pb-20 pt-16 sm:pt-20 lg:pb-28 lg:pt-24">
        <HowToUse
          title="How to use PDF Editor"
          subtitle=""
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