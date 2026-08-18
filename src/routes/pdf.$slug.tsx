import {
  createFileRoute,
  Link,
  notFound,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { useRef } from "react";

import {
  ArrowLeft,
  Crop,
  Download,
  FilePlus2,
  FileText,
  Upload,
} from "lucide-react";

import { ToolRunner } from "@/components/tools/ToolRunner";
import { ChatWithPdf } from "@/components/tools/ChatWithPdf";
import { ComparePdf } from "@/components/tools/ComparePdf";
import { HowToUse } from "@/components/site/HowToUse";
import { Container } from "@/components/site/Container";

import {
  findTool,
  slugAliases,
} from "@/lib/pdfTools";

import {
  createBlankPdfFile,
  storePdfForEditor,
} from "@/lib/pdfEditorLaunch";

export const Route = createFileRoute("/pdf/$slug")({
  loader: ({ params }) => {
    const alias = slugAliases[params.slug];

    if (alias) {
      throw redirect({
        to: "/pdf/$slug",
        params: {
          slug: alias,
        },
      });
    }

    const tool = findTool(params.slug);

    if (!tool) {
      throw notFound();
    }

    return {
      title: tool.title,
      description: tool.description,
      slug: tool.slug,
    };
  },

  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          {
            title: "PDF tool unavailable — PDFVerse",
          },
          {
            name: "robots",
            content: "noindex",
          },
        ],
      };
    }

    const title =
      `${loaderData.title} Online — Free PDF Tool | PDFVerse`;

    return {
      meta: [
        {
          title,
        },
        {
          name: "description",
          content: loaderData.description,
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: loaderData.description,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
      ],
    };
  },

  component: PdfToolPage,
});

function PdfToolPage() {
  const {
    title,
    description,
    slug,
  } = Route.useLoaderData();

  const inputRef =
    useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const isEditor =
    slug === "pdf-editor";

  const isChatWithPdf =
    slug === "chat-with-pdf";

  const isCompare =
    slug === "compare";

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/25 blur-3xl" />

      <Container className="relative py-12 sm:py-16">

        {/* =========================================================
            PAGE HEADER
        ========================================================== */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg">
            {description}
          </p>
        </div>

        {/* =========================================================
            TOOL AREA
        ========================================================== */}
        <div className="mx-auto mt-8 max-w-6xl">

          {/* Back button */}
          <Link
            to="/"
            className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-slate-200 shadow-sm transition-all duration-200 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to tools
          </Link>

          {/* =======================================================
              CHAT WITH PDF
          ======================================================== */}
          {isChatWithPdf ? (
            <ChatWithPdf />

          /* =======================================================
             COMPARE PDF
          ======================================================== */
          ) : isCompare ? (
            <ComparePdf />

          /* =======================================================
             PDF EDITOR
          ======================================================== */
          ) : isEditor ? (
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-violet-950/20">

              <div className="flex flex-col items-center px-5 py-10 sm:px-8">

                <input
                  ref={inputRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(event) => {
                    const file =
                      event.target.files?.[0];

                    if (!file) {
                      return;
                    }

                    storePdfForEditor(file);

                    navigate({
                      to: "/pdf-editor",
                    });
                  }}
                />

                <button
                  type="button"
                  onClick={() =>
                    inputRef.current?.click()
                  }
                  className="inline-flex min-w-[280px] items-center justify-center gap-4 rounded-2xl bg-violet-600 px-7 py-4 text-lg font-bold text-white shadow-xl shadow-violet-950/30 transition hover:-translate-y-0.5 hover:bg-violet-500"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <Upload className="h-6 w-6" />
                  </span>

                  <span>
                    Upload PDF file
                  </span>
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    const blankPdf =
                      await createBlankPdfFile();

                    storePdfForEditor(
                      blankPdf,
                    );

                    navigate({
                      to: "/pdf-editor",
                    });
                  }}
                  className="mt-5 inline-flex items-center gap-2 text-base font-medium text-slate-400 transition hover:text-white"
                >
                  <FilePlus2 className="h-5 w-5" />

                  or start with a blank document
                </button>

                <p className="mt-4 text-sm text-slate-500">
                  Files stay in your browser — nothing is uploaded to a server.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/5 bg-black/10 px-5 py-5 text-xs text-slate-500 sm:text-sm">
                <span>
                  ✓ Edit existing text
                </span>

                <span>
                  ✓ Organize pages
                </span>

                <span>
                  ✓ Sign &amp; annotate
                </span>

                <span>
                  ✓ Download edited PDF
                </span>
              </div>
            </div>

          /* =======================================================
             ALL OTHER PDF TOOLS
          ======================================================== */
          ) : (
            <ToolRunner
              slug={slug}
              title={title}
              description={description}
            />
          )}
        </div>

        {/* =========================================================
            HOW TO USE
        ========================================================== */}
        <HowToUse
          title={`How to use ${title}`}
          subtitle=""
          
          steps={
            isCompare
              ? [
                  {
                    title: "Upload Version 1",
                    description:
                      "Choose the first PDF you want to use as the original version.",
                    icon: (
                      <Upload className="h-5 w-5" />
                    ),
                  },
                  {
                    title: "Upload Version 2",
                    description:
                      "Choose the second PDF you want to compare against Version 1.",
                    icon: (
                      <Upload className="h-5 w-5" />
                    ),
                  },
                  {
                    title: "Compare PDFs",
                    description:
                      "PDFVerse compares the documents page by page and detects text and visual differences.",
                    icon: (
                      <FileText className="h-5 w-5" />
                    ),
                  },
                  {
                    title: "Inspect differences",
                    description:
                      "Review changed pages, added text, removed text, and visual differences.",
                    icon: (
                      <Crop className="h-5 w-5" />
                    ),
                  },
                ]

              : isChatWithPdf
                ? [
                    {
                      title: "Upload your PDF",
                      description:
                        "Choose the PDF you want to ask questions about.",
                      icon: (
                        <Upload className="h-5 w-5" />
                      ),
                    },
                    {
                      title: "Ask a question",
                      description:
                        "Ask about the document's contents, dates, amounts, findings, or conclusions.",
                      icon: (
                        <FileText className="h-5 w-5" />
                      ),
                    },
                    {
                      title: "Get an answer",
                      description:
                        "PDFVerse analyzes the uploaded document and returns an answer based on its contents.",
                      icon: (
                        <FileText className="h-5 w-5" />
                      ),
                    },
                    {
                      title: "Continue chatting",
                      description:
                        "Ask follow-up questions without uploading the same document again.",
                      icon: (
                        <Download className="h-5 w-5" />
                      ),
                    },
                  ]

                : slug === "ocr"
                  ? [
                      {
                        title: "Upload scanned PDF",
                        description:
                          "Choose a scanned or image-only PDF to begin OCR processing.",
                        icon: (
                          <Upload className="h-5 w-5" />
                        ),
                      },
                      {
                        title: "Choose language",
                        description:
                          "Select the main language used in your document and choose the recognition quality.",
                        icon: (
                          <Crop className="h-5 w-5" />
                        ),
                      },
                      {
                        title: "Run OCR",
                        description:
                          "PDFVerse renders each page and recognizes the text directly in your browser.",
                        icon: (
                          <FileText className="h-5 w-5" />
                        ),
                      },
                      {
                        title: "Download results",
                        description:
                          "Get a searchable PDF plus TXT and DOCX versions of the extracted text.",
                        icon: (
                          <Download className="h-5 w-5" />
                        ),
                      },
                    ]

                  : [
                      {
                        title: "Upload file",
                        description:
                          `Select or drop your file into the ${title} panel.`,
                        icon: (
                          <Upload className="h-5 w-5" />
                        ),
                      },
                      {
                        title: "Choose settings",
                        description:
                          "Adjust the available options such as page ranges, text, quality, or passwords.",
                        icon: (
                          <Crop className="h-5 w-5" />
                        ),
                      },
                      {
                        title: "Process",
                        description:
                          "Run the tool and wait a moment while everything is processed in your browser.",
                        icon: (
                          <FileText className="h-5 w-5" />
                        ),
                      },
                      {
                        title: "Download",
                        description:
                          "Rename the output if you like, then download your finished file.",
                        icon: (
                          <Download className="h-5 w-5" />
                        ),
                      },
                    ]
          }

          desktopSteps={
            isCompare
              ? [
                  {
                    title: "Choose Version 1",
                    description:
                      "Select the original PDF that you want to compare.",
                    icon: (
                      <Upload className="h-5 w-5" />
                    ),
                  },
                  {
                    title: "Choose Version 2",
                    description:
                      "Select the updated PDF you want to compare with the original.",
                    icon: (
                      <Upload className="h-5 w-5" />
                    ),
                  },
                  {
                    title: "Run comparison",
                    description:
                      "PDFVerse compares matching pages and identifies differences in text and layout.",
                    icon: (
                      <FileText className="h-5 w-5" />
                    ),
                  },
                  {
                    title: "Review changes",
                    description:
                      "Inspect changed pages, similarity, added text, removed text, and visual differences.",
                    icon: (
                      <Crop className="h-5 w-5" />
                    ),
                  },
                  {
                    title: "Use the page comparison",
                    description:
                      "Select individual pages to inspect the differences between the two document versions.",
                    icon: (
                      <FileText className="h-5 w-5" />
                    ),
                  },
                  {
                    title: "Download report",
                    description:
                      "Download the generated PDF comparison report when you need a shareable record of the changes.",
                    icon: (
                      <Download className="h-5 w-5" />
                    ),
                  },
                ]

              : isChatWithPdf
                ? [
                    {
                      title: "Upload your PDF",
                      description:
                        "Select the document you want PDFVerse to understand and chat about.",
                      icon: (
                        <Upload className="h-5 w-5" />
                      ),
                    },
                    {
                      title: "Start the document chat",
                      description:
                        "After the PDF is uploaded, PDFVerse prepares it for document-based questions.",
                      icon: (
                        <FileText className="h-5 w-5" />
                      ),
                    },
                    {
                      title: "Ask anything about it",
                      description:
                        "Ask for summaries, key findings, dates, names, amounts, conclusions, or specific details.",
                      icon: (
                        <FileText className="h-5 w-5" />
                      ),
                    },
                    {
                      title: "Ask follow-up questions",
                      description:
                        "Continue the conversation to explore the same document without re-uploading it.",
                      icon: (
                        <FileText className="h-5 w-5" />
                      ),
                    },
                    {
                      title: "Verify important information",
                      description:
                        "For contracts, invoices, legal documents, or other important material, verify answers against the original PDF.",
                      icon: (
                        <FileText className="h-5 w-5" />
                      ),
                    },
                    {
                      title: "Start another document",
                      description:
                        "Upload a different PDF when you want to begin a new document conversation.",
                      icon: (
                        <Download className="h-5 w-5" />
                      ),
                    },
                  ]

                : slug === "ocr"
                  ? [
                      {
                        title: "Upload scanned PDF",
                        description:
                          "Select the scanned PDF you want to make searchable. Your document is processed in the browser.",
                        icon: (
                          <Upload className="h-5 w-5" />
                        ),
                      },
                      {
                        title: "Select OCR language",
                        description:
                          "Choose the language used in your scanned document and the recognition quality.",
                        icon: (
                          <Crop className="h-5 w-5" />
                        ),
                      },
                      {
                        title: "Recognize pages",
                        description:
                          "PDFVerse renders each page and extracts text with OCR while reporting progress.",
                        icon: (
                          <FileText className="h-5 w-5" />
                        ),
                      },
                      {
                        title: "Create searchable PDF",
                        description:
                          "OCR text is placed invisibly over the original scanned pages so the document can be searched and copied.",
                        icon: (
                          <FileText className="h-5 w-5" />
                        ),
                      },
                      {
                        title: "Export extracted text",
                        description:
                          "TXT and DOCX files are generated alongside the searchable PDF for easier reuse.",
                        icon: (
                          <Download className="h-5 w-5" />
                        ),
                      },
                      {
                        title: "Download",
                        description:
                          "Download the searchable PDF, OCR TXT, or OCR DOCX output from the result panel.",
                        icon: (
                          <Download className="h-5 w-5" />
                        ),
                      },
                    ]

                  : [
                      {
                        title: "Browse tools",
                        description:
                          "All PDF tools stay visible under the ALL view by default.",
                        icon: (
                          <FileText className="h-5 w-5" />
                        ),
                      },
                      {
                        title: "Choose a tool",
                        description:
                          "Select the PDF operation you want to perform.",
                        icon: (
                          <Crop className="h-5 w-5" />
                        ),
                      },
                      {
                        title: "Upload file",
                        description:
                          "Upload a PDF, image set, Office file, or use the input supported by the selected tool.",
                        icon: (
                          <Upload className="h-5 w-5" />
                        ),
                      },
                      {
                        title: "Set options",
                        description:
                          "Adjust page ranges, crop margins, passwords, form values, watermark settings, or conversion options.",
                        icon: (
                          <Crop className="h-5 w-5" />
                        ),
                      },
                      {
                        title: "Process",
                        description:
                          "Run the selected PDF operation.",
                        icon: (
                          <FileText className="h-5 w-5" />
                        ),
                      },
                      {
                        title: "Download",
                        description:
                          "Download the finished file from the result panel.",
                        icon: (
                          <Download className="h-5 w-5" />
                        ),
                      },
                    ]
          }
        />

      </Container>
    </section>
  );
}