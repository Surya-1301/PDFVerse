
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

// Category icon styles use accent CSS variables so they adapt to the
// selected accent colour AND dark / light mode automatically.
const categoryStyles: Record<
  Exclude<Category, "all">,
  React.CSSProperties
> = {
  edit: {
    background: "var(--accent-light)",
    color: "var(--accent)",
  },

  organize: {
    background: "var(--accent-light)",
    color: "var(--accent)",
  },

  convertToPdf: {
    background: "var(--accent-light)",
    color: "var(--accent)",
  },

  convertFromPdf: {
    background: "var(--accent-light)",
    color: "var(--accent)",
  },

  security: {
    background: "var(--accent-light)",
    color: "var(--accent)",
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
    <section className="relative min-h-screen overflow-hidden bg-bg-base">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-0 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl" style={{ background: 'var(--accent-glow)' }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute right-0 top-24 -z-0 h-72 w-72 rounded-full blur-3xl" style={{ background: 'var(--accent-light)' }}
        aria-hidden="true"
      />

      <Container className="relative py-12 sm:py-16">
        {/* =====================================================
            MAIN PAGE HEADER
            ===================================================== */}
        <div className="mx-auto max-w-5xl text-center">
          <p className="mx-auto mb-6 inline-flex rounded-full border px-5 py-2 text-base shadow-lg" style={{ borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)', background: 'var(--accent-light)', color: 'var(--text-1)', boxShadow: '0 4px 6px -1px var(--accent-glow)' }}>
            Fast, free PDF tools
          </p>

          <h1 className="text-5xl font-black tracking-tight sm:text-7xl" style={{ color: 'var(--text-1)' }}>
            PDF Editor Tools
          </h1>

          <p className="mx-auto mt-8 max-w-5xl text-xl leading-9 sm:text-2xl sm:leading-10" style={{ color: 'var(--text-2)' }}>
            Merge, split, compress, sign, protect, convert,
            organize, and repair PDF files in one clean workspace.
          </p>
        </div>

        {/* =====================================================
            ONLINE PDF EDITOR
            ===================================================== */}
        <div className="mx-auto mt-10 max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border shadow-2xl" style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--surface) 60%, transparent)' }}>
            <div className="px-5 pt-8 text-center sm:px-8 sm:pt-10">

              <div className="flex flex-wrap items-center justify-center gap-3">
                <h2 className="text-3xl font-black tracking-tight sm:text-4xl" style={{ color: 'var(--text-1)' }}>
                  Online PDF Editor
                </h2>

                <span
                  aria-label="Beta version"
                  className="inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] shadow-md" style={{ borderColor: 'color-mix(in srgb, var(--accent) 60%, transparent)', background: 'var(--accent-light)', color: 'var(--text-1)' }}
                >
                  BETA
                </span>
              </div>

              {/* =================================================
                  Clarify that this CTA specifically opens the PDF editor.
                  ================================================= */}
              <p className="mx-auto mt-3 max-w-2xl text-base leading-7 sm:text-lg" style={{ color: 'var(--text-2)' }}>
                Edit PDF files for free. Add text, images,
                shapes, signatures, and highlights.
              </p>
            </div>

            <div className="flex flex-col items-center px-5 pb-8 pt-4 sm:px-8 sm:pb-10 sm:pt-5">
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
                  More explicit CTA label. Functionality remains exactly the same.
                  ================================================= */}
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                aria-label="Upload a PDF to edit it online"
                className="inline-flex min-w-[280px] items-center justify-center gap-4 rounded-2xl px-7 py-4 text-lg font-bold transition hover:-translate-y-0.5"
                style={{
                  background: 'var(--accent)',
                  color: 'var(--primary-foreground)',
                  boxShadow: '0 4px 14px 0 var(--accent-glow)',
                }}
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: 'color-mix(in srgb, var(--accent-foreground) 15%, transparent)' }}
                  aria-hidden="true"
                >
                  <Upload className="h-6 w-6" />
                </span>

                <span>Upload PDF to edit</span>
              </button>

              <button
                type="button"
                onClick={onBlank}
                className="mt-5 inline-flex items-center gap-2 text-base font-medium transition hover:text-white focus-visible:outline-none focus-visible:ring-2"
                style={{ color: 'var(--text-3)' }}
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

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t px-5 py-5 text-xs sm:text-sm" style={{ borderColor: 'color-mix(in srgb, var(--accent) 20%, transparent)', background: 'color-mix(in srgb, var(--surface) 10%, transparent)', color: 'var(--text-3)' }}>
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
            className="flex flex-nowrap justify-start gap-2.5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center"
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
                className="shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold tracking-[0.1em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:px-5 sm:py-3 sm:tracking-[0.14em]"
                style={
                  activeCategory === tab.id
                    ? { borderColor: 'var(--accent)', background: 'var(--accent)', color: '#ffffff' }
                    : { borderColor: 'var(--border)', background: 'transparent', color: 'var(--text-2)' }
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ===================================================
              Better visibility for tool count and filter status.
              =================================================== */}
          <p
            className="mt-5 text-left text-sm" style={{ color: 'var(--text-3)' }}
            aria-live="polite"
            aria-atomic="true"
          >
            {visibleTools.length}{" "}
            {visibleTools.length === 1
              ? "PDF tool shown"
              : "PDF tools shown"}
          </p>

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
                  className="group flex h-[210px] min-w-0 self-stretch flex-col rounded-2xl border p-5 text-left transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{
                    borderColor: 'var(--border)',
                    background: 'color-mix(in srgb, var(--surface) 55%, transparent)',
                    boxShadow: 'none',
                  }}
                >
                  {/* Accent-themed icon */}
                  <div
                    className="mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition"
                    style={style}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <h2
                    className="h-6 min-h-[24px] shrink-0 overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold leading-6"
                    style={{ color: 'var(--text-1)' }}
                    title={tool.title}
                  >
                    {tool.title}
                  </h2>

                  <p
                    className="mt-2 min-h-[72px] overflow-hidden text-sm leading-6 line-clamp-3"
                    style={{ color: 'var(--text-2)' }}
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
                  className="group flex w-full min-w-0 items-center gap-4 rounded-2xl border p-4 text-left transition active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--surface) 55%, transparent)' }}
                >
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-lg transition"
                    style={style}
                    aria-hidden="true"
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="min-w-0 flex-1 pr-1">
                    <h2 className="truncate text-[15px] font-semibold leading-5" style={{ color: 'var(--text-1)' }}>
                      {tool.title}
                    </h2>

                    <p
                      className="mt-1 min-h-[40px] line-clamp-2 text-[12px] leading-5"
                      style={{ color: 'var(--text-2)', opacity: 0.8 }}
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
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 sm:bottom-6 sm:right-6"
          style={{ background: 'var(--accent)', boxShadow: '0 4px 14px 0 var(--accent-glow)' }}
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
