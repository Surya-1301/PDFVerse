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
  type LucideIcon,
} from "lucide-react";

export type Category =
  | "all"
  | "edit"
  | "organize"
  | "convertToPdf"
  | "convertFromPdf"
  | "security";

export const categoryTabs: Array<{ id: Category; label: string }> = [
  { id: "all", label: "ALL" },
  { id: "edit", label: "EDIT PDF" },
  { id: "organize", label: "ORGANIZE PDF" },
  { id: "convertToPdf", label: "CONVERT TO PDF" },
  { id: "convertFromPdf", label: "CONVERT FROM PDF" },
  { id: "security", label: "PDF SECURITY" },
];

export type PdfTool = {
  title: string;
  description: string;
  slug: string;
  category: Exclude<Category, "all">;
  icon: LucideIcon;
};

export const pdfTools: PdfTool[] = [
  { title: "PDF Editor", description: "Edit existing PDF text, add text and images, annotate, sign, and download your edited PDF.", slug: "pdf-editor", category: "edit", icon: FileText },
  { title: "Merge PDF", description: "Combine multiple PDFs into one file.", slug: "merge", category: "organize", icon: Combine },
  { title: "Split PDF", description: "Split a PDF by selected pages.", slug: "split", category: "organize", icon: Scissors },
  { title: "Remove pages", description: "Delete selected pages from a PDF.", slug: "remove-pages", category: "organize", icon: Trash2 },
  { title: "Extract pages", description: "Extract selected pages into a new PDF.", slug: "extract-pages", category: "organize", icon: Scissors },
  { title: "Organize PDF", description: "Reorder PDF pages into a custom sequence.", slug: "organize", category: "organize", icon: FileText },
  { title: "Add Pages to PDF", description: "Insert pages from another PDF into an existing PDF.", slug: "add-pages", category: "organize", icon: Plus },
  { title: "Compare PDF", description: "Compare two PDFs and inspect differences.", slug: "compare", category: "organize", icon: FileSearch },
  { title: "Rotate PDF", description: "Rotate all or selected pages.", slug: "rotate", category: "organize", icon: RotateCw },
  { title: "Add page numbers", description: "Add page numbers to every page.", slug: "add-page-numbers", category: "organize", icon: Hash },
  { title: "Add watermark", description: "Add a text watermark across PDF pages.", slug: "watermark", category: "edit", icon: Stamp },
  { title: "Image watermark", description: "Add a logo or image watermark to PDF pages.", slug: "image-watermark", category: "edit", icon: ImageIcon },
  { title: "Crop PDF", description: "Crop page edges using percentage margins.", slug: "crop", category: "edit", icon: Crop },
  { title: "PDF Forms", description: "Fill PDF form fields and optionally flatten them.", slug: "forms", category: "edit", icon: FileText },
  { title: "Header & Footer", description: "Add headers, footers, page numbers, dates, and filenames.", slug: "header-footer", category: "edit", icon: FileText },
  { title: "Compress PDF", description: "Reduce PDF file size.", slug: "compress", category: "edit", icon: FileText },
  { title: "Sign PDF", description: "Type, upload, or draw a signature on a PDF.", slug: "sign", category: "edit", icon: Stamp },
  { title: "Repair PDF", description: "Try to rebuild damaged or corrupted PDF files.", slug: "repair", category: "edit", icon: FileSearch },
  { title: "Metadata Editor", description: "Edit or remove PDF title, author, subject, and keywords.", slug: "metadata-editor", category: "edit", icon: FileSearch },
  { title: "Protect PDF", description: "Add password protection to a PDF.", slug: "protect", category: "security", icon: ShieldCheck },
  { title: "Unlock PDF", description: "Remove password protection from a PDF.", slug: "unlock", category: "security", icon: LockKeyhole },
  { title: "Redact PDF", description: "Permanently hide text terms in a PDF.", slug: "redact", category: "security", icon: FileText },
  { title: "JPG to PDF", description: "Convert JPG, PNG, or WebP images into a PDF.", slug: "jpg-to-pdf", category: "convertToPdf", icon: ImageIcon },
  { title: "Scan to PDF", description: "Turn image scans into a PDF.", slug: "scan-to-pdf", category: "convertToPdf", icon: ImageIcon },
  { title: "Word to PDF", description: "Convert DOC or DOCX files into a PDF.", slug: "word-to-pdf", category: "convertToPdf", icon: FileText },
  { title: "PowerPoint to PDF", description: "Convert PPT or PPTX files into a PDF.", slug: "powerpoint-to-pdf", category: "convertToPdf", icon: FileText },
  { title: "Excel to PDF", description: "Convert XLS or XLSX files into a PDF.", slug: "excel-to-pdf", category: "convertToPdf", icon: FileText },
  { title: "HTML to PDF", description: "Convert HTML content into a PDF.", slug: "html-to-pdf", category: "convertToPdf", icon: FileText },
  { title: "PDF to JPG", description: "Convert PDF pages into JPG images.", slug: "pdf-to-jpg", category: "convertFromPdf", icon: FileImage },
  { title: "PDF to Word", description: "Convert a PDF into a DOCX file.", slug: "pdf-to-word", category: "convertFromPdf", icon: FileText },
  { title: "PDF to Text", description: "Extract plain text from every PDF page.", slug: "pdf-to-text", category: "convertFromPdf", icon: FileText },
  { title: "Extract Images", description: "Extract embedded images from a PDF as a ZIP file.", slug: "extract-images", category: "convertFromPdf", icon: FileImage },
  { title: "PDF to PowerPoint", description: "Convert a PDF into a PowerPoint presentation.", slug: "pdf-to-powerpoint", category: "convertFromPdf", icon: FileText },
  { title: "PDF to Excel", description: "Convert PDF tables into an Excel workbook.", slug: "pdf-to-excel", category: "convertFromPdf", icon: FileText },
  { title: "Batch Compress", description: "Compress multiple PDFs and download one ZIP file.", slug: "batch-compress", category: "edit", icon: FileText },
  { title: "Batch Protect", description: "Password-protect multiple PDFs and download one ZIP file.", slug: "batch-protect", category: "security", icon: LockKeyhole },
  { title: "Batch Unlock", description: "Unlock multiple PDFs with one password and download a ZIP.", slug: "batch-unlock", category: "security", icon: LockKeyhole },
  { title: "Batch Watermark", description: "Add the same watermark to multiple PDFs.", slug: "batch-watermark", category: "edit", icon: Stamp },
  { title: "Batch Header & Footer", description: "Add the same header and footer to multiple PDFs.", slug: "batch-header-footer", category: "edit", icon: FileText },
  { title: "Batch Repair", description: "Try to repair multiple PDFs and download one ZIP file.", slug: "batch-repair", category: "edit", icon: FileSearch },
];

/** Legacy/alternate URLs from the original site, mapped to canonical slugs. */
export const slugAliases: Record<string, string> = {
  "page-numbers": "add-page-numbers",
  "reorder": "organize",
  "remove": "remove-pages",
  "images-to-pdf": "jpg-to-pdf",
  "compress-pdf": "compress",
  "repair-pdf": "repair",
  "protect-pdf": "protect",
  "unlock-pdf": "unlock",
  "redact-pdf": "redact",
  "sign-pdf": "sign",
  "crop-pdf": "crop",
  "pdf-forms": "forms",
  "compare-pdf": "compare",
  "editor": "pdf-editor",
};

export function findTool(slug: string) {
  return pdfTools.find((tool) => tool.slug === slug);
}

