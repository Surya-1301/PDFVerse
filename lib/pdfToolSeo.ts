export type PdfToolSeo = {
  mode: string;
  title: string;
  description: string;
  category: string;
  toolName: string;
};

export const PDF_TOOL_SEO: Record<string, PdfToolSeo> = {
  "merge": {
    "mode": "merge",
    "title": "Merge PDF Online — Free PDF Tool",
    "description": "Combine multiple PDFs into one file. Use PDFVerse online for free with no unnecessary signup.",
    "category": "organize",
    "toolName": "Merge PDF"
  },
  "split": {
    "mode": "split",
    "title": "Split PDF Online — Free PDF Tool",
    "description": "Split a PDF by selected pages. Use PDFVerse online for free with no unnecessary signup.",
    "category": "organize",
    "toolName": "Split PDF"
  },
  "remove-pages": {
    "mode": "remove",
    "title": "Remove pages Online — Free PDF Tool",
    "description": "Delete selected pages from a PDF. Use PDFVerse online for free with no unnecessary signup.",
    "category": "organize",
    "toolName": "Remove pages"
  },
  "extract-pages": {
    "mode": "extract-pages",
    "title": "Extract pages Online — Free PDF Tool",
    "description": "Extract selected pages into a new PDF. Use PDFVerse online for free with no unnecessary signup.",
    "category": "organize",
    "toolName": "Extract pages"
  },
  "organize": {
    "mode": "reorder",
    "title": "Organize PDF Online — Free PDF Tool",
    "description": "Reorder PDF pages into a custom sequence. Use PDFVerse online for free with no unnecessary signup.",
    "category": "organize",
    "toolName": "Organize PDF"
  },
  "add-pages": {
    "mode": "add-pages",
    "title": "Add Pages to PDF Online — Free PDF Tool",
    "description": "Insert pages from another PDF into an existing PDF. Use PDFVerse online for free with no unnecessary signup.",
    "category": "organize",
    "toolName": "Add Pages to PDF"
  },
  "compare": {
    "mode": "compare-pdf",
    "title": "Compare PDF Online — Free PDF Tool",
    "description": "Compare two PDFs and inspect differences. Use PDFVerse online for free with no unnecessary signup.",
    "category": "organize",
    "toolName": "Compare PDF"
  },
  "rotate": {
    "mode": "rotate",
    "title": "Rotate PDF Online — Free PDF Tool",
    "description": "Rotate all or selected pages. Use PDFVerse online for free with no unnecessary signup.",
    "category": "edit",
    "toolName": "Rotate PDF"
  },
  "add-page-numbers": {
    "mode": "page-numbers",
    "title": "Add page numbers Online — Free PDF Tool",
    "description": "Add page numbers to every page. Use PDFVerse online for free with no unnecessary signup.",
    "category": "edit",
    "toolName": "Add page numbers"
  },
  "watermark": {
    "mode": "watermark",
    "title": "Add watermark Online — Free PDF Tool",
    "description": "Add a text watermark across PDF pages. Use PDFVerse online for free with no unnecessary signup.",
    "category": "edit",
    "toolName": "Add watermark"
  },
  "image-watermark": {
    "mode": "image-watermark",
    "title": "Image watermark Online — Free PDF Tool",
    "description": "Add a logo/image watermark to PDF pages. Use PDFVerse online for free with no unnecessary signup.",
    "category": "edit",
    "toolName": "Image watermark"
  },
  "crop": {
    "mode": "crop-pdf",
    "title": "Crop PDF Online — Free PDF Tool",
    "description": "Crop page edges using percentage margins. Use PDFVerse online for free with no unnecessary signup.",
    "category": "edit",
    "toolName": "Crop PDF"
  },
  "forms": {
    "mode": "pdf-forms",
    "title": "PDF Forms Online — Free PDF Tool",
    "description": "Fill PDF form fields and optionally flatten them. Use PDFVerse online for free with no unnecessary signup.",
    "category": "edit",
    "toolName": "PDF Forms"
  },
  "jpg-to-pdf": {
    "mode": "images-to-pdf",
    "title": "JPG to PDF Online — Free PDF Tool",
    "description": "Convert JPG, PNG, or WebP images into a PDF. Use PDFVerse online for free with no unnecessary signup.",
    "category": "convertToPdf",
    "toolName": "JPG to PDF"
  },
  "scan-to-pdf": {
    "mode": "scan-to-pdf",
    "title": "Scan to PDF Online — Free PDF Tool",
    "description": "Turn image scans into a PDF. Use PDFVerse online for free with no unnecessary signup.",
    "category": "organize",
    "toolName": "Scan to PDF"
  },
  "word-to-pdf": {
    "mode": "word-to-pdf",
    "title": "WORD to PDF Online — Free PDF Tool",
    "description": "Convert DOC or DOCX files into a PDF. Use PDFVerse online for free with no unnecessary signup.",
    "category": "convertToPdf",
    "toolName": "WORD to PDF"
  },
  "powerpoint-to-pdf": {
    "mode": "powerpoint-to-pdf",
    "title": "POWERPOINT to PDF Online — Free PDF Tool",
    "description": "Convert PPT or PPTX files into a PDF. Use PDFVerse online for free with no unnecessary signup.",
    "category": "convertToPdf",
    "toolName": "POWERPOINT to PDF"
  },
  "excel-to-pdf": {
    "mode": "excel-to-pdf",
    "title": "EXCEL to PDF Online — Free PDF Tool",
    "description": "Convert XLS or XLSX files into a PDF. Use PDFVerse online for free with no unnecessary signup.",
    "category": "convertToPdf",
    "toolName": "EXCEL to PDF"
  },
  "html-to-pdf": {
    "mode": "html-to-pdf",
    "title": "HTML to PDF Online — Free PDF Tool",
    "description": "Convert HTML content into a PDF. Use PDFVerse online for free with no unnecessary signup.",
    "category": "convertToPdf",
    "toolName": "HTML to PDF"
  },
  "pdf-to-jpg": {
    "mode": "pdf-to-jpg",
    "title": "PDF to JPG Online — Free PDF Tool",
    "description": "Convert PDF pages into JPG images. Use PDFVerse online for free with no unnecessary signup.",
    "category": "convertFromPdf",
    "toolName": "PDF to JPG"
  },
  "pdf-to-word": {
    "mode": "pdf-to-word",
    "title": "PDF to WORD Online — Free PDF Tool",
    "description": "Convert a PDF into a DOCX file. Use PDFVerse online for free with no unnecessary signup.",
    "category": "convertFromPdf",
    "toolName": "PDF to WORD"
  },
  "pdf-to-text": {
    "mode": "pdf-to-text",
    "title": "PDF to Text Online — Free PDF Tool",
    "description": "Extract plain text from every PDF page. Use PDFVerse online for free with no unnecessary signup.",
    "category": "convertFromPdf",
    "toolName": "PDF to Text"
  },
  "extract-images": {
    "mode": "extract-images",
    "title": "Extract Images Online — Free PDF Tool",
    "description": "Extract embedded images from a PDF as a ZIP file. Use PDFVerse online for free with no unnecessary signup.",
    "category": "convertFromPdf",
    "toolName": "Extract Images"
  },
  "pdf-to-powerpoint": {
    "mode": "pdf-to-powerpoint",
    "title": "PDF to POWERPOINT Online — Free PDF Tool",
    "description": "Convert a PDF into a PowerPoint presentation. Use PDFVerse online for free with no unnecessary signup.",
    "category": "convertFromPdf",
    "toolName": "PDF to POWERPOINT"
  },
  "pdf-to-excel": {
    "mode": "pdf-to-excel",
    "title": "PDF to EXCEL Online — Free PDF Tool",
    "description": "Convert PDF tables into an Excel workbook. Use PDFVerse online for free with no unnecessary signup.",
    "category": "convertFromPdf",
    "toolName": "PDF to EXCEL"
  },
  "compress": {
    "mode": "compress-pdf",
    "title": "Compress PDF Online — Free PDF Tool",
    "description": "Reduce PDF file size. Use PDFVerse online for free with no unnecessary signup.",
    "category": "edit",
    "toolName": "Compress PDF"
  },
  "header-footer": {
    "mode": "header-footer",
    "title": "Header & Footer PDF Online — Free PDF Tool",
    "description": "Add custom headers, footers, page numbers, dates, and filenames to PDF files. Use PDFVerse online for free with no unnecessary signup.",
    "category": "edit",
    "toolName": "Header & Footer"
  },
  "repair": {
    "mode": "repair-pdf",
    "title": "Repair PDF Online — Free PDF Tool",
    "description": "Try to rebuild damaged or corrupted PDF files. Use PDFVerse online for free with no unnecessary signup.",
    "category": "edit",
    "toolName": "Repair PDF"
  },
  "sign": {
    "mode": "sign-pdf",
    "title": "Sign PDF Online — Free PDF Tool",
    "description": "Type, upload, or draw a signature on a PDF page. Use PDFVerse online for free with no unnecessary signup.",
    "category": "edit",
    "toolName": "Sign PDF"
  },
  "metadata-editor": {
    "mode": "metadata-editor",
    "title": "Metadata Editor Online — Free PDF Tool",
    "description": "Edit or remove PDF title, author, subject, and keywords. Use PDFVerse online for free with no unnecessary signup.",
    "category": "edit",
    "toolName": "Metadata Editor"
  },
  "unlock": {
    "mode": "unlock-pdf",
    "title": "Unlock PDF Online — Free PDF Tool",
    "description": "Remove password protection from a PDF. Use PDFVerse online for free with no unnecessary signup.",
    "category": "security",
    "toolName": "Unlock PDF"
  },
  "protect": {
    "mode": "protect-pdf",
    "title": "Protect PDF Online — Free PDF Tool",
    "description": "Add password protection to a PDF. Use PDFVerse online for free with no unnecessary signup.",
    "category": "security",
    "toolName": "Protect PDF"
  },
  "redact": {
    "mode": "redact-pdf",
    "title": "Redact PDF Online — Free PDF Tool",
    "description": "Permanently hide text terms in a PDF. Use PDFVerse online for free with no unnecessary signup.",
    "category": "security",
    "toolName": "Redact PDF"
  },
  "batch-compress": {
    "mode": "batch-compress",
    "title": "Batch Compress Online — Free PDF Tool",
    "description": "Compress multiple PDFs and download one ZIP file. Use PDFVerse online for free with no unnecessary signup.",
    "category": "edit",
    "toolName": "Batch Compress"
  },
  "batch-protect": {
    "mode": "batch-protect",
    "title": "Batch Protect Online — Free PDF Tool",
    "description": "Password-protect multiple PDFs and download one ZIP file. Use PDFVerse online for free with no unnecessary signup.",
    "category": "security",
    "toolName": "Batch Protect"
  },
  "batch-unlock": {
    "mode": "batch-unlock",
    "title": "Batch Unlock Online — Free PDF Tool",
    "description": "Unlock multiple PDFs with one password and download a ZIP. Use PDFVerse online for free with no unnecessary signup.",
    "category": "security",
    "toolName": "Batch Unlock"
  },
  "batch-watermark": {
    "mode": "batch-watermark",
    "title": "Batch Watermark Online — Free PDF Tool",
    "description": "Add the same watermark to multiple PDFs. Use PDFVerse online for free with no unnecessary signup.",
    "category": "edit",
    "toolName": "Batch Watermark"
  },
  "batch-header-footer": {
    "mode": "batch-header-footer",
    "title": "Batch Header & Footer Online — Free PDF Tool",
    "description": "Add the same header and footer to multiple PDFs. Use PDFVerse online for free with no unnecessary signup.",
    "category": "edit",
    "toolName": "Batch Header & Footer"
  },
  "batch-repair": {
    "mode": "batch-repair",
    "title": "Batch Repair Online — Free PDF Tool",
    "description": "Try to repair multiple PDFs and download one ZIP file. Use PDFVerse online for free with no unnecessary signup.",
    "category": "edit",
    "toolName": "Batch Repair"
  }
} as const;

export const PDF_TOOL_SLUGS = Object.keys(PDF_TOOL_SEO);

export const PDF_TOOL_SLUG_BY_MODE: Record<string, string> = {
  "merge": "merge",
  "split": "split",
  "remove": "remove-pages",
  "extract-pages": "extract-pages",
  "reorder": "organize",
  "add-pages": "add-pages",
  "compare-pdf": "compare",
  "rotate": "rotate",
  "page-numbers": "add-page-numbers",
  "watermark": "watermark",
  "image-watermark": "image-watermark",
  "crop-pdf": "crop",
  "pdf-forms": "forms",
  "images-to-pdf": "jpg-to-pdf",
  "scan-to-pdf": "scan-to-pdf",
  "word-to-pdf": "word-to-pdf",
  "powerpoint-to-pdf": "powerpoint-to-pdf",
  "excel-to-pdf": "excel-to-pdf",
  "html-to-pdf": "html-to-pdf",
  "pdf-to-jpg": "pdf-to-jpg",
  "pdf-to-word": "pdf-to-word",
  "pdf-to-text": "pdf-to-text",
  "extract-images": "extract-images",
  "pdf-to-powerpoint": "pdf-to-powerpoint",
  "pdf-to-excel": "pdf-to-excel",
  "compress-pdf": "compress",
  "header-footer": "header-footer",
  "repair-pdf": "repair",
  "sign-pdf": "sign",
  "metadata-editor": "metadata-editor",
  "unlock-pdf": "unlock",
  "protect-pdf": "protect",
  "redact-pdf": "redact",
  "batch-compress": "batch-compress",
  "batch-protect": "batch-protect",
  "batch-unlock": "batch-unlock",
  "batch-watermark": "batch-watermark",
  "batch-header-footer": "batch-header-footer",
  "batch-repair": "batch-repair"
};
