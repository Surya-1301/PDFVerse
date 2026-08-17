"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { ArrowLeft, Crop, Download, FilePlus2, FileText, Upload } from "lucide-react";

import { HowToUse } from "@/components/HowToUse";
import { Container } from "@/components/Container";
import { findTool, slugAliases } from "@/lib/pdfTools";
import { createBlankPdfFile, storePdfForEditor } from "@/lib/pdfEditorLaunch";

const ToolRunner = dynamic(
  () => import("@/components/tools/ToolRunner").then((module) => module.ToolRunner),
  { ssr: false },
);

export function PdfToolClient() {
  const params = useParams<{ slug: string }>();
  const slugParam = String(params.slug);
  const canonical = slugAliases[slugParam] ?? slugParam;
  const tool = findTool(canonical);
  const router = useRouter();

  useEffect(() => {
    if (!tool) router.replace("/");
  }, [tool, router]);

  if (!tool) return null;

  const { title, description, slug } = tool;
  const inputRef = useRef<HTMLInputElement>(null);

  const isEditor = slug === "pdf-editor";

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/25 blur-3xl" />

      <Container className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg">
            {description}
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-6xl">
          <Link
            href="/"
            className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-slate-200 shadow-sm transition-all duration-200 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to tools
          </Link>

          {isEditor ? (
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-violet-950/20">
              <div className="flex flex-col items-center px-5 py-10 sm:px-8">
                <input
                  ref={inputRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    storePdfForEditor(file);
                    router.push("/pdf-editor");
                  }}
                />

                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="inline-flex min-w-[280px] items-center justify-center gap-4 rounded-2xl bg-violet-600 px-7 py-4 text-lg font-bold text-white shadow-xl shadow-violet-950/30 transition hover:-translate-y-0.5 hover:bg-violet-500"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <Upload className="h-6 w-6" />
                  </span>
                  <span>Upload PDF file</span>
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    storePdfForEditor(await createBlankPdfFile());
                    router.push("/pdf-editor");
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
                <span>✓ Edit existing text</span>
                <span>✓ Organize pages</span>
                <span>✓ Sign & annotate</span>
                <span>✓ Download edited PDF</span>
              </div>
            </div>
          ) : (
            <ToolRunner slug={slug} title={title} description={description} />
          )}
        </div>

        <HowToUse
          title={`How to use ${title}`}
          subtitle=""
          steps={[
            {
              title: "Upload file",
              description: `Select or drop your file into the ${title} panel. Files never leave your browser.`,
              icon: <Upload className="h-5 w-5" />,
            },
            {
              title: "Choose settings",
              description:
                "Adjust the available options such as page ranges, text, quality, or passwords.",
              icon: <Crop className="h-5 w-5" />,
            },
            {
              title: "Process",
              description:
                "Run the tool and wait a moment while everything is processed on your device.",
              icon: <FileText className="h-5 w-5" />,
            },
            {
              title: "Download",
              description: "Rename the output if you like, then download your finished file.",
              icon: <Download className="h-5 w-5" />,
            },
          ]}
        />
      </Container>
    </section>
  );
}
