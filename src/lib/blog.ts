export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  /** ISO date, e.g. "2026-09-13" */
  date: string;
  /** Read time estimate in minutes */
  readTime: number;
  /** Related PDFVerse tool slug (for internal cross-link) */
  toolSlug: string;
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-merge-pdfs-online",
    title: "How to Merge PDFs Online for Free",
    description:
      "Combine multiple PDF files into one document in seconds — no software install and no upload. A step-by-step guide to merging PDFs online for free.",
    category: "Organize",
    date: "2026-09-13",
    readTime: 4,
    toolSlug: "merge",
    body: [
      "Merging PDFs is one of the most common document tasks — combining invoices, contracts, scanned pages, or exam papers into a single file. Doing it right matters: a merged PDF should keep its original layout, page order, and quality intact.",
      "PDFVerse's free Merge PDF tool combines multiple PDFs into one file directly in your browser. Because everything runs locally, your documents never leave your device.",
      "To merge PDFs: open the Merge PDF page, drag and drop the files you want to combine (or click to browse), arrange them in the order you need, and click Merge. Seconds later you can download the combined file.",
      "You can merge two PDFs or dozens. There is no limit on file count and no watermark is added. The tool also works offline after the page loads, and works on Windows, macOS, Linux, iOS and Android browsers.",
      "For more control, pair it with related tools: use Split PDF to break a large file into chapters first, or Extract Pages to pull specific pages out of a document before merging.",
    ],
  },
  {
    slug: "how-to-remove-pages-from-a-pdf",
    title: "How to Remove Pages from a PDF (Free Online)",
    description:
      "Delete unwanted pages from any PDF — blank pages, cover pages, or mistakes — with a free online tool that never uploads your file.",
    category: "Organize",
    date: "2026-09-13",
    readTime: 4,
    toolSlug: "remove-pages",
    body: [
      "Almost every PDF ends up with a page you don't need: a blank scan, a duplicated page, a wrong cover, or an outdated appendix. Removing pages is simple when you use a browser-based tool.",
      "The Remove Pages tool lets you select exactly which pages to delete — by page thumbnail or by typing page ranges like 3-5 — and keeps the rest of the document untouched.",
      "Why do it in the browser? Your file is processed locally, so you can remove pages from confidential documents (contracts, medical records, tax files) without uploading them anywhere.",
      "The page order, formatting, and quality of the remaining pages are preserved exactly. There's a live preview so you can confirm what stays before you download.",
      "If you need the opposite operation, use Extract Pages to pull only the pages you want into a new PDF instead of deleting them from the original.",
    ],
  },
  {
    slug: "jpg-to-pdf-converter-guide",
    title: "JPG to PDF: How to Convert Images into a PDF",
    description:
      "Turn JPG, PNG and WebP photos or scans into a single PDF document online — free, with adjustable page size and orientation.",
    category: "Convert",
    date: "2026-09-13",
    readTime: 5,
    toolSlug: "jpg-to-pdf",
    body: [
      "Converting images to PDF is useful for sending photo sets, building a portfolio, archiving scans, or turning screenshots into a document. Most operating systems don't have a built-in multi-image to PDF converter — that's where a web tool helps.",
      "PDFVerse's JPG to PDF tool accepts JPG, PNG and WebP files. Drop in as many images as you like, and choose the page size (A4, Letter, or fit-to-image) and orientation.",
      "Each image becomes a full-size page in the PDF, in the order you arrange them. The conversion happens in the browser, so photos never leave your computer and nothing is uploaded.",
      "This is especially handy on mobile: snap photos of receipts or handwritten notes with your phone and convert them to a single PDF right in the browser.",
      "Related workflows: if your images are scans of a paper document, consider Scan to PDF, and once you have a PDF you can Compress it or protect it with a password.",
    ],
  },
  {
    slug: "how-to-password-protect-a-pdf",
    title: "How to Password Protect a PDF Online",
    description:
      "Add a password to any PDF to stop unauthorized viewing, copying and printing — free and entirely in your browser.",
    category: "Security",
    date: "2026-09-13",
    readTime: 4,
    toolSlug: "protect",
    body: [
      "Password protection is the simplest way to keep a PDF private — whether you're emailing a contract, sharing financial statements, or sending an invoice. A password stops anyone who receives the file from opening it without the key.",
      "The Protect PDF tool adds encryption straight to your PDF. You set a password and optionally restrict printing or copying. The file is encrypted locally in the browser — the password never touches a server.",
      "To protect a PDF: open Protect PDF, upload your file, enter a strong password, and download the encrypted result. It takes under a minute.",
      "Use a strong, unique password — a full passphrase is safer than a short one. Remember that password protection is only as strong as the password itself.",
      "If you later need to open a file someone protected, or you want to remove your own password, the Unlock PDF tool does the reverse — also locally and free.",
    ],
  },
];

export function findBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}