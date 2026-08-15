"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Combine,
  Crop,
  FileImage,
  FileSearch,
  FileText,
  Hash,
  ImageIcon,
  LockKeyhole,
  Plus,
  RotateCw,
  Scissors,
  ShieldCheck,
  Stamp,
  Trash2,
  Upload,
} from "lucide-react";

import { Container } from "@/components/Container";

type Category =
  | "all"
  | "edit"
  | "organize"
  | "convertToPdf"
  | "convertFromPdf"
  | "security";

const categoryTabs: Array<{
  id: Category;
  label: string;
}> = [
  {
    id: "all",
    label: "ALL",
  },
  {
    id: "edit",
    label: "EDIT PDF",
  },
  {
    id: "organize",
    label: "ORGANIZE PDF",
  },
  {
    id: "convertToPdf",
    label: "CONVERT TO PDF",
  },
  {
    id: "convertFromPdf",
    label: "CONVERT FROM PDF",
  },
  {
    id: "security",
    label: "PDF SECURITY",
  },
];

const pdfTools = [
  {
    title: "PDF Editor",
    description:
      "Edit existing PDF text, add text and images, annotate, sign, and download your edited PDF.",
    href: "/pdf-editor?tool=pdf-editor",
    category: "edit" as Category,
    icon: FileText,
  },
  {
    title: "Merge PDF",
    description: "Combine multiple PDFs into one file.",
    href: "/pdf/merge",
    category: "organize" as Category,
    icon: Combine,
  },
  {
    title: "Split PDF",
    description: "Split a PDF by selected pages.",
    href: "/pdf/split",
    category: "organize" as Category,
    icon: Scissors,
  },
  {
    title: "Remove pages",
    description: "Delete selected pages from a PDF.",
    href: "/pdf/remove-pages",
    category: "organize" as Category,
    icon: Trash2,
  },
  {
    title: "Extract pages",
    description: "Extract selected pages into a new PDF.",
    href: "/pdf/extract-pages",
    category: "organize" as Category,
    icon: Scissors,
  },
  {
    title: "Organize PDF",
    description: "Reorder PDF pages into a custom sequence.",
    href: "/pdf/organize",
    category: "organize" as Category,
    icon: FileText,
  },
  {
    title: "Add Pages to PDF",
    description: "Insert pages from another PDF into an existing PDF.",
    href: "/pdf/add-pages",
    category: "organize" as Category,
    icon: Plus,
  },
  {
    title: "Compare PDF",
    description: "Compare two PDFs and inspect differences.",
    href: "/pdf/compare",
    category: "organize" as Category,
    icon: FileSearch,
  },
  {
    title: "Rotate PDF",
    description: "Rotate all or selected pages.",
    href: "/pdf/rotate",
    category: "organize" as Category,
    icon: RotateCw,
  },
  {
    title: "Add page numbers",
    description: "Add page numbers to every page.",
    href: "/pdf/add-page-numbers",
    category: "organize" as Category,
    icon: Hash,
  },
  {
    title: "Add watermark",
    description: "Add a text watermark across PDF pages.",
    href: "/pdf/watermark",
    category: "edit" as Category,
    icon: Stamp,
  },
  {
    title: "Image watermark",
    description: "Add a logo or image watermark to PDF pages.",
    href: "/pdf/image-watermark",
    category: "edit" as Category,
    icon: ImageIcon,
  },
  {
    title: "Crop PDF",
    description: "Crop page edges using percentage margins.",
    href: "/pdf/crop",
    category: "edit" as Category,
    icon: Crop,
  },
  {
    title: "PDF Forms",
    description: "Fill PDF form fields and optionally flatten them.",
    href: "/pdf/forms",
    category: "edit" as Category,
    icon: FileText,
  },
  {
    title: "Header & Footer",
    description: "Add headers, footers, page numbers, dates, and filenames.",
    href: "/pdf/header-footer",
    category: "edit" as Category,
    icon: FileText,
  },
  {
    title: "Compress PDF",
    description: "Reduce PDF file size.",
    href: "/pdf/compress",
    category: "edit" as Category,
    icon: FileText,
  },
  {
    title: "Sign PDF",
    description: "Type, upload, or draw a signature on a PDF.",
    href: "/pdf/sign",
    category: "edit" as Category,
    icon: Stamp,
  },
  {
    title: "Repair PDF",
    description: "Try to rebuild damaged or corrupted PDF files.",
    href: "/pdf/repair",
    category: "edit" as Category,
    icon: FileSearch,
  },
  {
    title: "Metadata Editor",
    description: "Edit or remove PDF title, author, subject, and keywords.",
    href: "/pdf/metadata-editor",
    category: "edit" as Category,
    icon: FileSearch,
  },
  {
    title: "Protect PDF",
    description: "Add password protection to a PDF.",
    href: "/pdf/protect",
    category: "security" as Category,
    icon: ShieldCheck,
  },
  {
    title: "Unlock PDF",
    description: "Remove password protection from a PDF.",
    href: "/pdf/unlock",
    category: "security" as Category,
    icon: LockKeyhole,
  },
  {
    title: "Redact PDF",
    description: "Permanently hide text terms in a PDF.",
    href: "/pdf/redact",
    category: "security" as Category,
    icon: FileText,
  },
  {
    title: "JPG to PDF",
    description: "Convert JPG, PNG, or WebP images into a PDF.",
    href: "/pdf/jpg-to-pdf",
    category: "convertToPdf" as Category,
    icon: ImageIcon,
  },
  {
    title: "Scan to PDF",
    description: "Turn image scans into a PDF.",
    href: "/pdf/scan-to-pdf",
    category: "convertToPdf" as Category,
    icon: ImageIcon,
  },
  {
    title: "Word to PDF",
    description: "Convert DOC or DOCX files into a PDF.",
    href: "/pdf/word-to-pdf",
    category: "convertToPdf" as Category,
    icon: FileText,
  },
  {
    title: "PowerPoint to PDF",
    description: "Convert PPT or PPTX files into a PDF.",
    href: "/pdf/powerpoint-to-pdf",
    category: "convertToPdf" as Category,
    icon: FileText,
  },
  {
    title: "Excel to PDF",
    description: "Convert XLS or XLSX files into a PDF.",
    href: "/pdf/excel-to-pdf",
    category: "convertToPdf" as Category,
    icon: FileText,
  },
  {
    title: "HTML to PDF",
    description: "Convert HTML content into a PDF.",
    href: "/pdf/html-to-pdf",
    category: "convertToPdf" as Category,
    icon: FileText,
  },
  {
    title: "PDF to JPG",
    description: "Convert PDF pages into JPG images.",
    href: "/pdf/pdf-to-jpg",
    category: "convertFromPdf" as Category,
    icon: FileImage,
  },
  {
    title: "PDF to Word",
    description: "Convert a PDF into a DOCX file.",
    href: "/pdf/pdf-to-word",
    category: "convertFromPdf" as Category,
    icon: FileText,
  },
  {
    title: "PDF to Text",
    description: "Extract plain text from every PDF page.",
    href: "/pdf/pdf-to-text",
    category: "convertFromPdf" as Category,
    icon: FileText,
  },
  {
    title: "Extract Images",
    description: "Extract embedded images from a PDF as a ZIP file.",
    href: "/pdf/extract-images",
    category: "convertFromPdf" as Category,
    icon: FileImage,
  },
  {
    title: "PDF to PowerPoint",
    description: "Convert a PDF into a PowerPoint presentation.",
    href: "/pdf/pdf-to-powerpoint",
    category: "convertFromPdf" as Category,
    icon: FileText,
  },
  {
    title: "PDF to Excel",
    description: "Convert PDF tables into an Excel workbook.",
    href: "/pdf/pdf-to-excel",
    category: "convertFromPdf" as Category,
    icon: FileText,
  },
  {
    title: "Batch Compress",
    description: "Compress multiple PDFs and download one ZIP file.",
    href: "/pdf-editor?tool=batch-compress",
    category: "edit" as Category,
    icon: FileText,
  },
  {
    title: "Batch Protect",
    description:
      "Password-protect multiple PDFs and download one ZIP file.",
    href: "/pdf-editor?tool=batch-protect",
    category: "security" as Category,
    icon: LockKeyhole,
  },
  {
    title: "Batch Unlock",
    description:
      "Unlock multiple PDFs with one password and download a ZIP.",
    href: "/pdf-editor?tool=batch-unlock",
    category: "security" as Category,
    icon: LockKeyhole,
  },
  {
    title: "Batch Watermark",
    description:
      "Add the same watermark to multiple PDFs.",
    href: "/pdf-editor?tool=batch-watermark",
    category: "edit" as Category,
    icon: Stamp,
  },
  {
    title: "Batch Header & Footer",
    description:
      "Add the same header and footer to multiple PDFs.",
    href: "/pdf-editor?tool=batch-header-footer",
    category: "edit" as Category,
    icon: FileText,
  },
  {
    title: "Batch Repair",
    description:
      "Try to repair multiple PDFs and download one ZIP file.",
    href: "/pdf-editor?tool=batch-repair",
    category: "edit" as Category,
    icon: FileSearch,
  },
];

const PDF_EDITOR_CATEGORY_STORAGE_KEY =
  "pdf-editor-active-category";

const PDF_EDITOR_RETURN_KEY =
  "pdf-editor-return-from-tool";

function isValidCategory(
  value: string | null,
): value is Exclude<Category, "all"> {
  return (
    value === "edit" ||
    value === "organize" ||
    value === "convertToPdf" ||
    value === "convertFromPdf" ||
    value === "security"
  );
}

export default function Home() {
 
  const [activeCategory, setActiveCategory] =
    useState<Category>("all");

  // The Online PDF Editor is temporarily unavailable.
  // Keep the UI visible, but prevent all interaction with the editor.
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const navigation = performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming | undefined;

      const navigationType = navigation?.type;

      const storedCategory =
        window.sessionStorage.getItem(
          PDF_EDITOR_CATEGORY_STORAGE_KEY,
        );

      const returningFromTool =
        window.sessionStorage.getItem(
          PDF_EDITOR_RETURN_KEY,
        ) === "1";

      /*
       * Consume the return flag immediately.
       */
      window.sessionStorage.removeItem(
        PDF_EDITOR_RETURN_KEY,
      );
      if (
        navigationType === "reload" ||
        navigationType === "back_forward" ||
        returningFromTool
      ) {
        setActiveCategory(
          isValidCategory(storedCategory)
            ? storedCategory
            : "all",
        );
      } else {
        /*
         * Fresh visit:
         * Always start from ALL.
         */
        window.sessionStorage.removeItem(
          PDF_EDITOR_CATEGORY_STORAGE_KEY,
        );

        setActiveCategory("all");
      }
    } catch {
      setActiveCategory("all");
    }

    /*
     * Remove old hash/category URL state.
     *
     * Example:
     * /pdf-editor#pdf-tools
     *
     * becomes:
     * /pdf-editor
     */
    try {
      const url = new URL(window.location.href);

      if (
        url.searchParams.has("category") ||
        url.hash
      ) {
        url.searchParams.delete("category");

        window.history.replaceState(
          null,
          "",
          url.pathname || "/pdf-editor",
        );
      }
    } catch {
      // Ignore malformed URL/storage errors.
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

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/25 blur-3xl" />

      <div className="pointer-events-none absolute right-0 top-24 -z-0 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-3xl" />

      <Container className="relative py-12 sm:py-16">
        {/* =====================================================
            MAIN PAGE HEADER
        ====================================================== */}
        <div className="mx-auto max-w-5xl text-center">
          <p className="mx-auto mb-6 inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-5 py-2 text-base text-violet-100 shadow-lg shadow-violet-600/10">
            Fast, free PDF tools
          </p>

          <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl">
            PDF Editor tools
          </h1>

          <p className="mx-auto mt-8 max-w-5xl text-xl leading-9 text-slate-300 sm:text-2xl sm:leading-10">
            Merge, split, compress, sign, protect, convert,
            organize, and repair PDF files in one clean
            workspace.
          </p>
        </div>

        {/* =====================================================
            ONLINE PDF EDITOR
            Temporarily disabled / Coming Soon
        ====================================================== */}
        <div className="mx-auto mt-10 max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-violet-950/20">
            {/* Original editor UI remains visible underneath the overlay */}
            <div aria-hidden="true">
              {/* Editor heading */}
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
                  highlights, and more.
                </p>
              </div>

              {/* Disabled editor button */}
              <div className="flex flex-col items-center px-5 py-8 sm:px-8 sm:py-10">
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    className="inline-flex min-w-[280px] cursor-not-allowed items-center justify-center gap-4 rounded-2xl bg-violet-600 px-7 py-4 text-lg font-bold text-white opacity-80 shadow-xl shadow-violet-950/30 sm:min-w-[360px] sm:px-9 sm:py-5 sm:text-xl"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                      <Upload className="h-6 w-6" />
                    </span>
                    <span>Upload PDF file</span>
                  </button>
                </div>
              </div>

              {/* Editor features */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/5 bg-black/10 px-5 py-5 text-xs text-slate-500 sm:text-sm">
                <span>✓ Edit existing text</span>
                <span>✓ Add text &amp; images</span>
                <span>✓ Sign &amp; annotate</span>
                <span>✓ Download edited PDF</span>
              </div>
            </div>

            {/* Full-area Coming Soon overlay */}
            <div
              className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-[1.5px]"
              role="dialog"
              aria-modal="true"
              aria-label="Online PDF Editor coming soon"
              onClick={(event) => event.stopPropagation()}
              onPointerDown={(event) => event.stopPropagation()}
            >
              <div className="w-full max-w-xl p-5 text-center sm:p-8">
                {/* Lock */}
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-950/85 text-violet-400 shadow-[0_0_45px_rgba(124,58,237,0.22)] ring-1 ring-white/10 sm:h-24 sm:w-24">
                  <LockKeyhole className="h-10 w-10 stroke-[1.8] sm:h-12 sm:w-12" />
                </div>

                {/* Heading */}
                <h3 className="mt-5 text-4xl font-black tracking-tight text-white drop-shadow-lg sm:text-5xl">
                  Coming Soon
                </h3>
                {/* Info card — translucent so the original background remains visible */}
                <div className="mx-auto mt-6 flex max-w-sm items-center gap-3 rounded-xl border border-white/10 bg-slate-950/45 p-4 text-left backdrop-blur-[2px]">
                  <span className="text-2xl text-violet-400" aria-hidden="true">
                    ◷
                  </span>
                  <p className="text-sm leading-5 text-slate-200">
                    Stay tuned! We&apos;re working on something amazing for you.
                  </p>
                </div>

               
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            PDF TOOL CATEGORIES
        ====================================================== */}
        <div
          id="pdf-tools"
          className="mx-auto mt-10 max-w-6xl scroll-mt-8"
        >
          {/* Category tabs */}
          <div
            className="
              flex
              flex-nowrap
              gap-3
              overflow-x-auto
              pb-2
              [-ms-overflow-style:none]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveCategory(tab.id);

                  try {
                    if (tab.id === "all") {
                      /*
                       * ALL means no category is stored.
                       */
                      window.sessionStorage.removeItem(
                        PDF_EDITOR_CATEGORY_STORAGE_KEY,
                      );
                    } else {
                      window.sessionStorage.setItem(
                        PDF_EDITOR_CATEGORY_STORAGE_KEY,
                        tab.id,
                      );
                    }
                  } catch {
                    // Ignore storage errors.
                  }
                }}
                className={`
                  shrink-0
                  rounded-full
                  border
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  tracking-[0.14em]
                  transition
                  ${
                    activeCategory === tab.id
                      ? "border-white bg-white text-slate-950"
                      : "border-white/10 bg-white/[0.05] text-slate-400 hover:bg-white/[0.08] hover:text-white"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Number of tools */}
          <p className="mt-5 text-sm text-slate-500">
            {visibleTools.length} PDF tools shown
          </p>

          {/* ===================================================
              DESKTOP / TABLET TOOL GRID
          ==================================================== */}
          <div className="mt-6 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {visibleTools.map((tool) => {
              const Icon = tool.icon;
              const isPdfEditor = tool.title === "PDF Editor";

              if (isPdfEditor) {
                return (
                  <div
                    key={tool.href}
                    className="relative min-h-[170px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
                    aria-disabled="true"
                  >
                    <div className="flex h-full min-h-[170px] flex-col p-5 text-left opacity-80" aria-hidden="true">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 text-white">
                        <Icon className="h-5 w-5" />
                      </div>

                      <h2 className="text-base font-semibold text-white">
                        {tool.title}
                      </h2>

                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">
                        {tool.description}
                      </p>
                    </div>

                    <div
                      className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-[1px]"
                      aria-label="PDF Editor coming soon"
                    >
                      <div className="w-full p-2 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-950/85 text-violet-400 shadow-[0_0_30px_rgba(124,58,237,0.2)] ring-1 ring-white/10">
                          <LockKeyhole className="h-7 w-7 stroke-[1.8]" />
                        </div>
                        <h3 className="mt-3 text-xl font-black text-white drop-shadow-lg">
                          Coming Soon
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-slate-200 drop-shadow-md">
                          PDF Editor is currently unavailable.
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="
                    group
                    flex
                    min-h-[170px]
                    flex-col
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-5
                    text-left
                    transition
                    hover:-translate-y-0.5
                    hover:border-violet-500/50
                    hover:bg-white/[0.05]
                  "
                >
                  <div
                    className="
                      mb-5
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-violet-600
                      text-white
                      transition
                      group-hover:bg-violet-500
                    "
                  >
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

          {/* ===================================================
              MOBILE TOOL LIST
          ==================================================== */}
          <div className="mt-6 grid gap-3 sm:hidden">
            {visibleTools.map((tool) => {
              const Icon = tool.icon;
              const isPdfEditor = tool.title === "PDF Editor";

              if (isPdfEditor) {
                return (
                  <div
                    key={`${tool.href}-mobile`}
                    className="relative w-full overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-r from-violet-950/80 via-violet-900/50 to-[#0b1020]"
                    aria-disabled="true"
                  >
                    <div className="flex w-full items-center gap-4 p-4 text-left opacity-80" aria-hidden="true">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.22)]">
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
                    </div>

                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-[1px]">
                      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/45 px-4 py-3 backdrop-blur-[2px]">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950/85 text-violet-400 ring-1 ring-white/10">
                          <LockKeyhole className="h-5 w-5 stroke-[1.8]" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-white drop-shadow-md">
                            Coming Soon
                          </p>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={`${tool.href}-mobile`}
                  href={tool.href}
                  className="
                    group
                    flex
                    w-full
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-violet-400/20
                    bg-gradient-to-r
                    from-violet-950/80
                    via-violet-900/50
                    to-[#0b1020]
                    p-4
                    text-left
                    shadow-[0_8px_24px_rgba(0,0,0,0.22)]
                    transition
                    active:scale-[0.99]
                    hover:border-violet-400/40
                  "
                >
                  {/* Icon */}
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-violet-300/20
                      bg-violet-600
                      text-white
                      shadow-[0_0_20px_rgba(124,58,237,0.22)]
                      transition
                      group-hover:bg-violet-500
                    "
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Content */}
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
    </section>
  );
}