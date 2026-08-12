import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PdfEditorPageContent, type Mode } from "../../pdf-editor/page";

const TOOLS: Record<string, {
  mode: Mode;
  title: string;
  description: string;
  category: string;
}> = {
  "merge": { mode: "merge", title: "Merge PDF | PDFVerse", description: "Combine multiple PDFs into one file.", category: "organize" },
  "split": { mode: "split", title: "Split PDF | PDFVerse", description: "Split a PDF by selected pages.", category: "organize" },
  "remove-pages": { mode: "remove", title: "Remove pages | PDFVerse", description: "Delete selected pages from a PDF.", category: "organize" },
  "extract-pages": { mode: "extract-pages", title: "Extract pages | PDFVerse", description: "Extract selected pages into a new PDF.", category: "organize" },
  "organize": { mode: "reorder", title: "Organize PDF | PDFVerse", description: "Reorder PDF pages into a custom sequence.", category: "organize" },
  "add-pages": { mode: "add-pages", title: "Add Pages to PDF | PDFVerse", description: "Insert pages from another PDF into an existing PDF.", category: "organize" },
  "compare": { mode: "compare-pdf", title: "Compare PDF | PDFVerse", description: "Compare two PDFs and inspect differences.", category: "organize" },
  "rotate": { mode: "rotate", title: "Rotate PDF | PDFVerse", description: "Rotate all or selected pages.", category: "edit" },
  "page-numbers": { mode: "page-numbers", title: "Add page numbers | PDFVerse", description: "Add page numbers to every page.", category: "edit" },
  "watermark": { mode: "watermark", title: "Add watermark | PDFVerse", description: "Add a text watermark across PDF pages.", category: "edit" },
  "image-watermark": { mode: "image-watermark", title: "Image watermark | PDFVerse", description: "Add a logo/image watermark to PDF pages.", category: "edit" },
  "crop": { mode: "crop-pdf", title: "Crop PDF | PDFVerse", description: "Crop page edges using percentage margins.", category: "edit" },
  "forms": { mode: "pdf-forms", title: "PDF Forms | PDFVerse", description: "Fill PDF form fields and optionally flatten them.", category: "edit" },
  "jpg-to-pdf": { mode: "images-to-pdf", title: "JPG to PDF | PDFVerse", description: "Convert JPG, PNG, or WebP images into a PDF.", category: "convertToPdf" },
  "scan-to-pdf": { mode: "scan-to-pdf", title: "Scan to PDF | PDFVerse", description: "Turn image scans into a PDF.", category: "organize" },
  "word-to-pdf": { mode: "word-to-pdf", title: "WORD to PDF | PDFVerse", description: "Convert DOC or DOCX files into a PDF.", category: "convertToPdf" },
  "powerpoint-to-pdf": { mode: "powerpoint-to-pdf", title: "POWERPOINT to PDF | PDFVerse", description: "Convert PPT or PPTX files into a PDF.", category: "convertToPdf" },
  "excel-to-pdf": { mode: "excel-to-pdf", title: "EXCEL to PDF | PDFVerse", description: "Convert XLS or XLSX files into a PDF.", category: "convertToPdf" },
  "html-to-pdf": { mode: "html-to-pdf", title: "HTML to PDF | PDFVerse", description: "Convert HTML content into a PDF.", category: "convertToPdf" },
  "pdf-to-jpg": { mode: "pdf-to-jpg", title: "PDF to JPG | PDFVerse", description: "Convert PDF pages into JPG images.", category: "convertFromPdf" },
  "pdf-to-word": { mode: "pdf-to-word", title: "PDF to WORD | PDFVerse", description: "Convert a PDF into a DOCX file.", category: "convertFromPdf" },
  "pdf-to-text": { mode: "pdf-to-text", title: "PDF to Text | PDFVerse", description: "Extract plain text from every PDF page.", category: "convertFromPdf" },
  "extract-images": { mode: "extract-images", title: "Extract Images | PDFVerse", description: "Extract embedded images from a PDF as a ZIP file.", category: "convertFromPdf" },
  "pdf-to-powerpoint": { mode: "pdf-to-powerpoint", title: "PDF to POWERPOINT | PDFVerse", description: "Convert a PDF into a PowerPoint presentation.", category: "convertFromPdf" },
  "pdf-to-excel": { mode: "pdf-to-excel", title: "PDF to EXCEL | PDFVerse", description: "Convert PDF tables into an Excel workbook.", category: "convertFromPdf" },
  "compress": { mode: "compress-pdf", title: "Compress PDF | PDFVerse", description: "Reduce PDF file size.", category: "edit" },
  "repair-pdf": { mode: "repair-pdf", title: "Repair PDF | PDFVerse", description: "Try to rebuild damaged or corrupted PDF files.", category: "edit" },
  "header-footer": { mode: "header-footer", title: "Header & Footer | PDFVerse", description: "Add custom headers, footers, page numbers, dates, and filenames.", category: "edit" },
  "sign": { mode: "sign-pdf", title: "Sign PDF | PDFVerse", description: "Type, upload, or draw a signature on a PDF page.", category: "edit" },
  "metadata-editor": { mode: "metadata-editor", title: "Metadata Editor | PDFVerse", description: "Edit or remove PDF title, author, subject, and keywords.", category: "edit" },
  "unlock": { mode: "unlock-pdf", title: "Unlock PDF | PDFVerse", description: "Remove password protection from a PDF.", category: "security" },
  "protect": { mode: "protect-pdf", title: "Protect PDF | PDFVerse", description: "Add password protection to a PDF.", category: "security" },
  "redact": { mode: "redact-pdf", title: "Redact PDF | PDFVerse", description: "Permanently hide text terms in a PDF.", category: "security" },
  "batch-compress": { mode: "batch-compress", title: "Batch Compress | PDFVerse", description: "Compress multiple PDFs and download one ZIP file.", category: "edit" },
  "batch-protect": { mode: "batch-protect", title: "Batch Protect | PDFVerse", description: "Password-protect multiple PDFs and download one ZIP file.", category: "security" },
  "batch-unlock": { mode: "batch-unlock", title: "Batch Unlock | PDFVerse", description: "Unlock multiple PDFs with one password and download a ZIP.", category: "security" },
  "batch-watermark": { mode: "batch-watermark", title: "Batch Watermark | PDFVerse", description: "Add the same watermark to multiple PDFs.", category: "edit" },
  "batch-header-footer": { mode: "batch-header-footer", title: "Batch Header & Footer | PDFVerse", description: "Add the same header and footer to multiple PDFs.", category: "edit" },
  "batch-repair": { mode: "batch-repair", title: "Batch Repair | PDFVerse", description: "Try to repair multiple PDFs and download one ZIP file.", category: "edit" },
};

export function generateStaticParams() {
  return Object.keys(TOOLS).map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS[slug];
  if (!tool) return {};

  const url = `https://pdfverse.pages.dev/pdf/${slug}`;

  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: url },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url,
      type: "website",
    },
  };
}

export default async function PdfToolPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const tool = TOOLS[slug];
  if (!tool) notFound();

  const url = `https://pdfverse.pages.dev/pdf/${slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title.replace(" | PDFVerse", ""),
    description: tool.description,
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Suspense
        fallback={
          <div className="min-h-screen bg-slate-950 px-6 py-16 text-center text-sm text-slate-400">
            Loading PDF tool...
          </div>
        }
      >
        <PdfEditorPageContent initialMode={tool.mode} />
      </Suspense>
    </>
  );
}
