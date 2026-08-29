
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {FilePlus2, MessageCircle, Upload,} from "lucide-react";
import { Container } from "@/components/site/Container";
import { categoryTabs, pdfTools, type Category } from "@/lib/pdfTools";
import {
  createBlankPdfFile,
  storePdfForEditor,
} from "@/lib/pdfEditorLaunch";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "PDFVerse — Free Online PDF Editor & PDF Tools",
      },
      {
        name: "description",
        content:
          "Merge, split, compress, sign, protect, convert, organize and repair PDF files in one clean workspace. Free, fast and browser based.",
      },
      {
        property: "og:title",
        content: "PDFVerse — Free Online PDF Editor & PDF Tools",
      },
      {
        property: "og:description",
        content:
          "All your PDF tools in one place: edit PDF text, merge, split, compress, convert, sign and protect PDFs online.",
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
  }),
  component: Home,
});

/**
 * Category-specific visual accents.
 *
 * The colors are intentionally subtle so the page does not become
 * visually noisy while still allowing users to recognize categories.
 */
const categoryStyles: Record<
  Exclude<Category, "all">,
  {
    icon: string;
    hoverBorder: string;
  }
> = {
  edit: {
    icon: "bg-blue-600 group-hover:bg-blue-500",
    hoverBorder: "hover:border-blue-500/50",
  },

  organize: {
    icon: "bg-cyan-600 group-hover:bg-cyan-500",
    hoverBorder: "hover:border-cyan-500/50",
  },

  convertToPdf: {
    icon: "bg-emerald-600 group-hover:bg-emerald-500",
    hoverBorder: "hover:border-emerald-500/50",
  },

  convertFromPdf: {
    icon: "bg-sky-600 group-hover:bg-sky-500",
    hoverBorder: "hover:border-sky-500/50",
  },

  security: {
    icon: "bg-amber-600 group-hover:bg-amber-500",
    hoverBorder: "hover:border-amber-500/50",
  },
};

function Home() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("all");

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const returnCategory = params.get("returnCategory");

    const validCategories: Category[] = [
      "all",
      "edit",
      "organize",
      "convertToPdf",
      "convertFromPdf",
      "security",
    ];

    const isValidCategory =
      returnCategory &&
      validCategories.includes(returnCategory as Category);

    if (isValidCategory) {
      setActiveCategory(returnCategory as Category);
    }

    // Keep the real homepage URL clean.
    // The hash/query are only temporary navigation state.
    if (window.location.hash === "#pdf-tools" || isValidCategory) {
      window.history.replaceState(null, "", "/");
    }

    if (isValidCategory) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.getElementById("pdf-tools")?.scrollIntoView({
            behavior: "auto",
            block: "start",
          });
        });
      });
    }
  }, []);

  const visibleTools = useMemo(() => {
    if (activeCategory === "all") {
      return pdfTools;
    }

    return pdfTools.filter(
      (tool) => tool.category === activeCategory,
    );
  }, [activeCategory]);

  function onPick(file: File | undefined) {
    if (!file) return;

    storePdfForEditor(file);
    navigate({ to: "/pdf-editor" });
  }

  async function onBlank() {
    storePdfForEditor(await createBlankPdfFile());
    navigate({ to: "/pdf-editor" });
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/25 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute right-0 top-24 -z-0 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative py-12 sm:py-16">
        {/* =====================================================
            MAIN PAGE HEADER
            ===================================================== */}
        <div className="mx-auto max-w-5xl text-center">
          <p className="mx-auto mb-6 inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-5 py-2 text-base text-violet-100 shadow-lg shadow-violet-600/10">
            Fast, free PDF tools
          </p>

          <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl">
            PDF Editor tools
          </h1>

          <p className="mx-auto mt-8 max-w-5xl text-xl leading-9 text-slate-300 sm:text-2xl sm:leading-10">
            Merge, split, compress, sign, protect, convert,
            organize, and repair PDF files in one clean workspace.
          </p>
        </div>

        {/* =====================================================
            ONLINE PDF EDITOR
            ===================================================== */}
        <div className="mx-auto mt-10 max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-violet-950/20">
            <div className="px-5 pt-8 text-center sm:px-8 sm:pt-10">

              {/* =================================================
                  ISSUE #4 FIX:
                  More visible BETA badge.
                  ================================================= */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Online PDF editor
                </h2>

                <span
                  aria-label="Beta version"
                  className="inline-flex items-center rounded-full border border-violet-300/60 bg-violet-500/25 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-violet-100 shadow-md shadow-violet-950/30"
                >
                  BETA
                </span>
              </div>

              {/* =================================================
                  ISSUE #1 FIX:
                  Clarify that this CTA specifically opens
                  the PDF editor.
                  ================================================= */}
              <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Edit PDF files for free. Add text, images,
                shapes, signatures, and highlights.
              </p>
            </div>

            <div className="flex flex-col items-center px-5 py-8 sm:px-8 sm:py-10">
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(event) =>
                  onPick(event.target.files?.[0])
                }
              />

              {/* =================================================
                  ISSUE #1 FIX:
                  More explicit CTA label.
                  Functionality remains exactly the same.
                  ================================================= */}
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                aria-label="Upload a PDF to edit it online"
                className="inline-flex min-w-[280px] items-center justify-center gap-4 rounded-2xl bg-violet-600 px-7 py-4 text-lg font-bold text-white shadow-xl shadow-violet-950/30 transition hover:-translate-y-0.5 hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:min-w-[360px] sm:px-9 sm:py-5 sm:text-xl"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15"
                  aria-hidden="true"
                >
                  <Upload className="h-6 w-6" />
                </span>

                <span>Upload PDF to edit</span>
              </button>

              <button
                type="button"
                onClick={onBlank}
                className="mt-5 inline-flex items-center gap-2 text-base font-medium text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <FilePlus2
                  className="h-5 w-5"
                  aria-hidden="true"
                />

                <span>
                  or start with a blank document
                </span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/5 bg-black/10 px-5 py-5 text-xs text-slate-500 sm:text-sm">
              <span>✓ Edit existing text</span>
              <span>✓ Add text &amp; images</span>
              <span>✓ Sign &amp; annotate</span>
              <span>✓ Download edited PDF</span>
            </div>
          </div>
        </div>

        {/* =====================================================
            PDF TOOLS
            ===================================================== */}
        <div
          id="pdf-tools"
          className="mx-auto mt-10 max-w-6xl scroll-mt-8"
        >
          {/* ===================================================
              CATEGORY FILTERS
              =================================================== */}
          <div
            className="flex flex-nowrap justify-center gap-2.5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label="Filter PDF tools by category"
          >
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() =>
                  setActiveCategory(tab.id)
                }
                aria-pressed={
                  activeCategory === tab.id
                }
                className={`shrink-0 rounded-full border px-5 py-3 text-sm font-semibold tracking-[0.14em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                  activeCategory === tab.id
                    ? "border-white bg-white text-slate-950"
                    : "border-white/10 bg-white/[0.05] text-slate-400 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ===================================================
              ISSUE #2 FIX:
              Better visibility for tool count and filter status.
              =================================================== */}
          <p
            className="mt-5 text-left text-sm text-slate-500"
            aria-live="polite"
            aria-atomic="true"
          >
            {visibleTools.length}{" "}
            {visibleTools.length === 1
              ? "PDF tool shown"
              : "PDF tools shown"}
          </p>

          {/* ===================================================
              DESKTOP / TABLET TOOL GRID

              ISSUE #3:
              Consistent title + description dimensions.

              ADDITIONAL DENSITY FIX:
              4 columns instead of 5 at XL screens.
              =================================================== */}
          <div className="mt-6 hidden grid-flow-row items-stretch gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {visibleTools.map((tool) => {
              const Icon = tool.icon;

              const style =
                categoryStyles[tool.category];

              return (
                <a
                  key={tool.slug}
                  href={
                    tool.slug === "pdf-editor"
                      ? `/pdf-editor?returnCategory=${encodeURIComponent(activeCategory)}`
                      : `/pdf/${tool.slug}?returnCategory=${encodeURIComponent(activeCategory)}`
                  }
                  aria-label={`${tool.title}: ${tool.description}`}
                  className={`group flex h-[210px] min-w-0 self-stretch flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:-translate-y-0.5 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${style.hoverBorder}`}
                >
                  {/* Category-colored icon */}
                  <div
                    className={`mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white transition ${style.icon}`}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* =================================================
                      ISSUE #3 FIX:
                      Fixed title height + one-line presentation.

                      This prevents:
                      "Batch Header & Footer"
                      from pushing its description down.
                      ================================================= */}
                  <h2
                    className="h-6 min-h-[24px] shrink-0 overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold leading-6 text-white"
                    title={tool.title}
                  >
                    {tool.title}
                  </h2>

                  {/* =================================================
                      ISSUE #3 FIX:
                      Fixed three-line description area.

                      Short descriptions still occupy the same
                      visual space as long descriptions.
                      ================================================= */}
                  <p
                    className="mt-2 min-h-[72px] overflow-hidden text-sm leading-6 text-slate-400 line-clamp-3"
                    title={tool.description}
                  >
                    {tool.description}
                  </p>
                </a>
              );
            })}
          </div>

          {/* =====================================================
              MOBILE TOOL LIST
              ===================================================== */}
          <div className="mt-6 grid gap-3 sm:hidden">
            {visibleTools.map((tool) => {
              const Icon = tool.icon;

              const style =
                categoryStyles[tool.category];

              return (
                <a
                  key={`${tool.slug}-mobile`}
                  href={
                    tool.slug === "pdf-editor"
                      ? `/pdf-editor?returnCategory=${encodeURIComponent(activeCategory)}`
                      : `/pdf/${tool.slug}?returnCategory=${encodeURIComponent(activeCategory)}`
                  }
                  aria-label={`${tool.title}: ${tool.description}`}
                  className="group flex w-full min-w-0 items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-white/20 hover:bg-white/[0.05] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg transition ${style.icon}`}
                    aria-hidden="true"
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="min-w-0 flex-1 pr-1">
                    <h2 className="truncate text-[15px] font-semibold leading-5 text-white">
                      {tool.title}
                    </h2>

                    <p
                      className="mt-1 line-clamp-2 text-[12px] leading-5 text-slate-300/80"
                      title={tool.description}
                    >
                      {tool.description}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
                </div>

        {/* Floating AI Chat */}
        <a
          href="/pdf/chat-with-pdf"
          aria-label="Open PDFVerse AI chat"
          title="Open PDFVerse AI chat"
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-xl shadow-violet-950/40 transition hover:-translate-y-0.5 hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:bottom-6 sm:right-6"
        >
          <MessageCircle
            className="h-6 w-6"
            aria-hidden="true"
          />
        </a>
      </Container>
    </section>
  );
}
