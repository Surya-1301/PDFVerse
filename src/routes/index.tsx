import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { FilePlus2, Upload } from "lucide-react";

import { Container } from "@/components/site/Container";
import { FloatingChat } from "@/components/site/FloatingChat";
import { categoryTabs, pdfTools, type Category } from "@/lib/pdfTools";
import { createBlankPdfFile, storePdfForEditor } from "@/lib/pdfEditorLaunch";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PDFVerse — Free Online PDF Editor & PDF Tools" },
      {
        name: "description",
        content:
          "Merge, split, compress, sign, protect, convert, organize and repair PDF files in one clean workspace. Free, fast and browser based.",
      },
      { property: "og:title", content: "PDFVerse — Free Online PDF Editor & PDF Tools" },
      {
        property: "og:description",
        content:
          "All your PDF tools in one place: edit PDF text, merge, split, compress, convert, sign and protect PDFs online.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const getCategoryFromUrl = (): Category => {
    const value = new URLSearchParams(
      window.location.search,
    ).get("category");

    if (
      value === "edit" ||
      value === "organize" ||
      value === "convertToPdf" ||
      value === "convertFromPdf" ||
      value === "security"
    ) {
      return value;
    }

    return "all";
  };

  const [activeCategory, setActiveCategory] =
    useState<Category>(() => getCategoryFromUrl());

  const inputRef = useRef<HTMLInputElement>(null);
  const toolsSectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const syncFromUrl = () => {
      setActiveCategory(getCategoryFromUrl());
    };

    window.addEventListener("popstate", syncFromUrl);

    return () => {
      window.removeEventListener("popstate", syncFromUrl);
    };
  }, []);

  const scrollToTools = () => {
    const element = toolsSectionRef.current;
    if (!element) return;

    const top =
      element.getBoundingClientRect().top +
      window.scrollY -
      110;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: "smooth",
    });
  };

  function changeCategory(category: Category) {
    setActiveCategory(category);

    const url = new URL(window.location.href);

    if (category === "all") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", category);
    }

    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );

    // Let the filtered cards render first, then slide the page
    // to the tools area with the category bar in view.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        scrollToTools();
      });
    });
  }

  useEffect(() => {
    // When landing on /?category=..., restore the selected tab
    // and place the tools area in view after the page has rendered.
    const category = getCategoryFromUrl();

    if (category === "all") return;

    const timer = window.setTimeout(() => {
      scrollToTools();
    }, 60);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const visibleTools = useMemo(() => {
    if (activeCategory === "all") return pdfTools;
    return pdfTools.filter((tool) => tool.category === activeCategory);
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
      <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-24 -z-0 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-3xl" />

      <Container className="relative py-12 sm:py-16">
        {/* MAIN PAGE HEADER */}
        <div className="mx-auto max-w-5xl text-center">
          <p className="mx-auto mb-6 inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-5 py-2 text-base text-violet-100 shadow-lg shadow-violet-600/10">
            Fast, free PDF tools
          </p>

          <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl">
            PDF Editor tools
          </h1>

          <p className="mx-auto mt-8 max-w-5xl text-xl leading-9 text-slate-300 sm:text-2xl sm:leading-10">
            Merge, split, compress, sign, protect, convert, organize, and repair
            PDF files in one clean workspace.
          </p>
        </div>

        {/* ONLINE PDF EDITOR */}
        <div className="mx-auto mt-10 max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-violet-950/20">
            <div className="px-5 pt-8 text-center sm:px-8 sm:pt-10">
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Online PDF editor
                </h2>

                <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-violet-300">
                  BETA
                </span>
              </div>

              <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                Edit PDF files for free. Add text, images, shapes, signatures,
                highlights.
              </p>
            </div>

            <div className="flex flex-col items-center px-5 py-8 sm:px-8 sm:py-10">
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(event) => onPick(event.target.files?.[0])}
              />

              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="inline-flex min-w-[280px] items-center justify-center gap-4 rounded-2xl bg-violet-600 px-7 py-4 text-lg font-bold text-white shadow-xl shadow-violet-950/30 transition hover:-translate-y-0.5 hover:bg-violet-500 sm:min-w-[360px] sm:px-9 sm:py-5 sm:text-xl"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <Upload className="h-6 w-6" />
                </span>
                <span>Upload PDF file</span>
              </button>

              <button
                type="button"
                onClick={onBlank}
                className="mt-5 inline-flex items-center gap-2 text-base font-medium text-slate-400 transition hover:text-white"
              >
                <FilePlus2 className="h-5 w-5" />
                or start with a blank document
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

        {/* PDF TOOL CATEGORIES */}
        <div
          id="pdf-tools"
          ref={toolsSectionRef}
          className="mx-auto mt-10 max-w-6xl scroll-mt-8"
        >
          <div className="flex flex-nowrap gap-2.5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => changeCategory(tab.id)}
                className={`shrink-0 rounded-full border px-5 py-3 text-sm font-semibold tracking-[0.14em] transition ${
                  activeCategory === tab.id
                    ? "border-white bg-white text-slate-950"
                    : "border-white/10 bg-white/[0.05] text-slate-400 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <p className="mt-5 text-sm text-slate-500">
            {visibleTools.length} PDF tools shown
          </p>

          {/* DESKTOP / TABLET TOOL GRID */}
          <div className="mt-6 hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {visibleTools.map((tool) => {
              const Icon = tool.icon;

              return (
                <Link
                  key={tool.slug}
                  to={tool.slug === "pdf-editor" ? "/pdf-editor" : "/pdf/$slug"}
                  params={{ slug: tool.slug }}
                  className="group flex min-h-[170px] flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:-translate-y-0.5 hover:border-violet-500/50 hover:bg-white/[0.05]"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 text-white transition group-hover:bg-violet-500">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h2 className="text-base font-semibold text-white">
                    {tool.title}
                  </h2>

                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">
                    {tool.description}
                  </p>
                </Link>
              );
            })}
          </div>

          {/* MOBILE TOOL LIST */}
          <div className="mt-6 grid gap-3 sm:hidden">
            {visibleTools.map((tool) => {
              const Icon = tool.icon;

              return (
                <Link
                  key={`${tool.slug}-mobile`}
                  to={tool.slug === "pdf-editor" ? "/pdf-editor" : "/pdf/$slug"}
                  params={{ slug: tool.slug }}
                  className="group flex w-full items-center gap-4 rounded-2xl border border-violet-400/20 bg-gradient-to-r from-violet-950/80 via-violet-900/50 to-[#0b1020] p-4 text-left shadow-[0_8px_24px_rgba(0,0,0,0.22)] transition hover:border-violet-400/40 active:scale-[0.99]"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.22)] transition group-hover:bg-violet-500">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="min-w-0 flex-1 pr-1">
                    <h2 className="text-[15px] font-semibold leading-5 text-white">
                      {tool.title}
                    </h2>

                    <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-slate-300/80">
                      {tool.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>

      <FloatingChat />
    </section>
  );
}
