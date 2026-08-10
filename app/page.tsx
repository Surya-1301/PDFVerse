"use client";

import { useEffect, useMemo, useState } from "react";
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
} from "lucide-react";
import { Container } from "@/components/Container";

type Category =
  | "all"
  | "edit"
  | "organize"
  | "convertToPdf"
  | "convertFromPdf"
  | "security";

const categoryTabs: Array<{ id: Category; label: string }> = [
  { id: "all", label: "ALL" },
  { id: "edit", label: "EDIT PDF" },
  { id: "organize", label: "ORGANIZE PDF" },
  { id: "convertToPdf", label: "CONVERT TO PDF" },
  { id: "convertFromPdf", label: "CONVERT FROM PDF" },
  { id: "security", label: "PDF SECURITY" },
];

const pdfTools = [
  {
    title: "Merge PDF",
    description: "Combine multiple PDFs into one file.",
    href: "/pdf-editor?tool=merge",
    category: "organize" as Category,
    icon: Combine,
  },
  {
    title: "Split PDF",
    description: "Split a PDF by selected pages.",
    href: "/pdf-editor?tool=split",
    category: "organize" as Category,
    icon: Scissors,
  },
  {
    title: "Remove pages",
    description: "Delete selected pages from a PDF.",
    href: "/pdf-editor?tool=remove",
    category: "organize" as Category,
    icon: Trash2,
  },
  {
    title: "Extract pages",
    description: "Extract selected pages into a new PDF.",
    href: "/pdf-editor?tool=extract-pages",
    category: "organize" as Category,
    icon: Scissors,
  },
  {
    title: "Organize PDF",
    description: "Reorder PDF pages into a custom sequence.",
    href: "/pdf-editor?tool=reorder",
    category: "organize" as Category,
    icon: FileText,
  },
  {
    title: "Add Pages to PDF",
    description: "Insert pages from another PDF into an existing PDF.",
    href: "/pdf-editor?tool=add-pages",
    category: "organize" as Category,
    icon: Plus,
  },
  {
    title: "Compare PDF",
    description: "Compare two PDFs and inspect differences.",
    href: "/pdf-editor?tool=compare-pdf",
    category: "organize" as Category,
    icon: FileSearch,
  },
  {
    title: "Rotate PDF",
    description: "Rotate all or selected pages.",
    href: "/pdf-editor?tool=rotate",
    category: "organize" as Category,
    icon: RotateCw,
  },
  {
    title: "Add page numbers",
    description: "Add page numbers to every page.",
    href: "/pdf-editor?tool=page-numbers",
    category: "organize" as Category,
    icon: Hash,
  },
  {
    title: "Add watermark",
    description: "Add a text watermark across PDF pages.",
    href: "/pdf-editor?tool=watermark",
    category: "edit" as Category,
    icon: Stamp,
  },
  {
    title: "Image watermark",
    description: "Add a logo or image watermark to PDF pages.",
    href: "/pdf-editor?tool=image-watermark",
    category: "edit" as Category,
    icon: ImageIcon,
  },
  {
    title: "Crop PDF",
    description: "Crop page edges using percentage margins.",
    href: "/pdf-editor?tool=crop-pdf",
    category: "edit" as Category,
    icon: Crop,
  },
  {
    title: "PDF Forms",
    description: "Fill PDF form fields and optionally flatten them.",
    href: "/pdf-editor?tool=pdf-forms",
    category: "edit" as Category,
    icon: FileText,
  },
  {
    title: "Flatten PDF",
    description: "Flatten form fields and make PDF content non-editable.",
    href: "/pdf-editor?tool=flatten-pdf",
    category: "edit" as Category,
    icon: FileText,
  },
  {
    title: "Header & Footer",
    description: "Add headers, footers, page numbers, dates, and filenames.",
    href: "/pdf-editor?tool=header-footer",
    category: "edit" as Category,
    icon: FileText,
  },
  {
    title: "Compress PDF",
    description: "Reduce PDF file size.",
    href: "/pdf-editor?tool=compress-pdf",
    category: "edit" as Category,
    icon: FileText,
  },
  {
    title: "Sign PDF",
    description: "Type, upload, or draw a signature on a PDF page.",
    href: "/pdf-editor?tool=sign-pdf",
    category: "edit" as Category,
    icon: Stamp,
  },
  {
    title: "Repair PDF",
    description: "Try to rebuild damaged or corrupted PDF files.",
    href: "/pdf-editor?tool=repair-pdf",
    category: "edit" as Category,
    icon: FileSearch,
  },
  {
    title: "Metadata Editor",
    description: "Edit or remove PDF title, author, subject, and keywords.",
    href: "/pdf-editor?tool=metadata-editor",
    category: "edit" as Category,
    icon: FileSearch,
  },
  {
    title: "Protect PDF",
    description: "Add password protection to a PDF.",
    href: "/pdf-editor?tool=protect-pdf",
    category: "security" as Category,
    icon: ShieldCheck,
  },
  {
    title: "Unlock PDF",
    description: "Remove password protection from a PDF.",
    href: "/pdf-editor?tool=unlock-pdf",
    category: "security" as Category,
    icon: LockKeyhole,
  },
  {
    title: "Redact PDF",
    description: "Permanently hide text terms in a PDF.",
    href: "/pdf-editor?tool=redact-pdf",
    category: "security" as Category,
    icon: FileText,
  },
  {
    title: "JPG to PDF",
    description: "Convert JPG, PNG, or WebP images into a PDF.",
    href: "/pdf-editor?tool=images-to-pdf",
    category: "convertToPdf" as Category,
    icon: ImageIcon,
  },
  {
    title: "Scan to PDF",
    description: "Turn image scans into a PDF.",
    href: "/pdf-editor?tool=scan-to-pdf",
    category: "convertToPdf" as Category,
    icon: ImageIcon,
  },
  {
    title: "Word to PDF",
    description: "Convert DOC or DOCX files into a PDF.",
    href: "/pdf-editor?tool=word-to-pdf",
    category: "convertToPdf" as Category,
    icon: FileText,
  },
  {
    title: "PowerPoint to PDF",
    description: "Convert PPT or PPTX files into a PDF.",
    href: "/pdf-editor?tool=powerpoint-to-pdf",
    category: "convertToPdf" as Category,
    icon: FileText,
  },
  {
    title: "Excel to PDF",
    description: "Convert XLS or XLSX files into a PDF.",
    href: "/pdf-editor?tool=excel-to-pdf",
    category: "convertToPdf" as Category,
    icon: FileText,
  },
  {
    title: "HTML to PDF",
    description: "Convert HTML content into a PDF.",
    href: "/pdf-editor?tool=html-to-pdf",
    category: "convertToPdf" as Category,
    icon: FileText,
  },
  {
    title: "PDF to JPG",
    description: "Convert PDF pages into JPG images.",
    href: "/pdf-editor?tool=pdf-to-jpg",
    category: "convertFromPdf" as Category,
    icon: FileImage,
  },
  {
    title: "PDF to Word",
    description: "Convert a PDF into a DOCX file.",
    href: "/pdf-editor?tool=pdf-to-word",
    category: "convertFromPdf" as Category,
    icon: FileText,
  },
  {
    title: "PDF to Text",
    description: "Extract plain text from every PDF page.",
    href: "/pdf-editor?tool=pdf-to-text",
    category: "convertFromPdf" as Category,
    icon: FileText,
  },
  {
    title: "Extract Images",
    description: "Extract embedded images from a PDF as a ZIP file.",
    href: "/pdf-editor?tool=extract-images",
    category: "convertFromPdf" as Category,
    icon: FileImage,
  },
  {
    title: "PDF to PowerPoint",
    description: "Convert a PDF into a PowerPoint presentation.",
    href: "/pdf-editor?tool=pdf-to-powerpoint",
    category: "convertFromPdf" as Category,
    icon: FileText,
  },
  {
    title: "PDF to Excel",
    description: "Convert PDF tables into an Excel workbook.",
    href: "/pdf-editor?tool=pdf-to-excel",
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
    description: "Password-protect multiple PDFs and download one ZIP file.",
    href: "/pdf-editor?tool=batch-protect",
    category: "security" as Category,
    icon: LockKeyhole,
  },
  {
    title: "Batch Unlock",
    description: "Unlock multiple PDFs with one password and download a ZIP.",
    href: "/pdf-editor?tool=batch-unlock",
    category: "security" as Category,
    icon: LockKeyhole,
  },
  {
    title: "Batch Watermark",
    description: "Add the same watermark to multiple PDFs.",
    href: "/pdf-editor?tool=batch-watermark",
    category: "edit" as Category,
    icon: Stamp,
  },
  {
    title: "Batch Header & Footer",
    description: "Add the same header and footer to multiple PDFs.",
    href: "/pdf-editor?tool=batch-header-footer",
    category: "edit" as Category,
    icon: FileText,
  },
  {
    title: "Batch Repair",
    description: "Try to repair multiple PDFs and download one ZIP file.",
    href: "/pdf-editor?tool=batch-repair",
    category: "edit" as Category,
    icon: FileSearch,
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  useEffect(() => {
    setActiveCategory("all");

    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);

    if (url.searchParams.has("category") || url.hash) {
      url.searchParams.delete("category");
      window.history.replaceState(null, "", url.pathname || "/");
    }
  }, []);

  const visibleTools = useMemo(() => {
    if (activeCategory === "all") return pdfTools;
    return pdfTools.filter((tool) => tool.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="absolute left-1/2 top-0 -z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/25 blur-3xl" />
      <div className="absolute right-0 top-24 -z-0 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-3xl" />

      <Container className="relative py-12 sm:py-16">
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

        <div id="pdf-tools" className="mx-auto mt-8 max-w-6xl scroll-mt-8">
          <div className="flex flex-nowrap gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`shrink-0 rounded-full border px-6 py-3 text-sm font-semibold tracking-[0.14em] transition ${
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

          {/* Desktop / tablet: original card layout remains unchanged */}
          <div className="mt-6 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {visibleTools.map((tool) => {
              const Icon = tool.icon;

              return (
                <Link
                  key={tool.href}
                  href={tool.href}
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

          {/* Mobile only: purple icon on the left, title + description on the right */}
          <div className="mt-6 grid gap-3 sm:hidden">
            {visibleTools.map((tool) => {
              const Icon = tool.icon;

              return (
                <Link
                  key={`${tool.href}-mobile`}
                  href={tool.href}
                  className="group flex w-full items-center gap-4 rounded-2xl border border-violet-400/20 bg-gradient-to-r from-violet-950/80 via-violet-900/50 to-[#0b1020] p-4 text-left shadow-[0_8px_24px_rgba(0,0,0,0.22)] transition active:scale-[0.99] hover:border-violet-400/40"
                >
                  {/* Purple icon on the left */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.22)] transition group-hover:bg-violet-500">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Right-side title and description */}
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