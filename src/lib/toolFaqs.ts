export type FaqItem = {
  question: string;
  answer: string;
};

export const toolFaqs: Record<string, FaqItem[]> = {
  /* ================= ORGANIZE ================= */

  merge: [
    {
      question: "How do I merge PDF files into one?",
      answer:
        "Upload two or more PDF files, drag them into the order you want, then click Merge. PDFVerse combines them into a single PDF you can download instantly.",
    },
    {
      question: "Is there a limit to how many PDFs I can merge?",
      answer:
        "There is no fixed limit. Merging happens in your browser, so very large files or dozens of documents may take longer depending on your device.",
    },
    {
      question: "Will merging change the quality of my PDFs?",
      answer:
        "No. Pages are combined without re-rendering, so text, images, and formatting stay exactly as they were in the original files.",
    },
    {
      question: "Are my files uploaded when I merge PDFs?",
      answer:
        "No. Merging runs entirely in your browser — your documents never leave your device.",
    },
    {
      question: "Can I reorder the files before merging?",
      answer:
        "Yes. You can drag and drop the uploaded files into any order before merging, and remove any file you change your mind about.",
    },
  ],

  split: [
    {
      question: "How do I split a PDF into separate files?",
      answer:
        "Upload your PDF, choose the page ranges or split points you want, then run the tool. Each range is saved as its own PDF file.",
    },
    {
      question: "Can I split a PDF after every page?",
      answer:
        "Yes. You can split by custom page ranges or extract every page into individual single-page PDFs.",
    },
    {
      question: "Will splitting affect the original file?",
      answer:
        "No. Your original PDF is never modified — splitting creates new files from the pages you select.",
    },
    {
      question: "Is the Split PDF tool free?",
      answer:
        "Yes, splitting PDFs on PDFVerse is completely free with no sign-up required.",
    },
    {
      question: "Do my files get uploaded to a server?",
      answer:
        "No. Splitting is processed locally in your browser, so your documents stay private on your device.",
    },
  ],

  "remove-pages": [
    {
      question: "How do I delete pages from a PDF?",
      answer:
        "Upload your PDF, select the pages you want to remove, then apply. PDFVerse creates a new PDF without those pages for you to download.",
    },
    {
      question: "Can I remove multiple pages at once?",
      answer:
        "Yes. Select as many pages as you like in one go — non-consecutive pages included — and remove them all together.",
    },
    {
      question: "Does removing pages reduce the file size?",
      answer:
        "Usually yes, since the content of the deleted pages is gone. For a much smaller file, follow up with the Compress PDF tool.",
    },
    {
      question: "Is my original PDF changed?",
      answer:
        "No. The original stays untouched; you download a new copy with the selected pages removed.",
    },
    {
      question: "Is it safe to remove pages containing sensitive data?",
      answer:
        "Yes. Processing happens in your browser, so the document never leaves your device — and the removed pages are permanently gone from the new file.",
    },
  ],

  "extract-pages": [
    {
      question: "How do I extract pages from a PDF?",
      answer:
        "Upload your PDF, pick the pages you want to keep, and extract them into a brand-new PDF containing only those pages.",
    },
    {
      question: "What is the difference between extracting and splitting?",
      answer:
        "Extracting pulls selected pages into one new PDF, while splitting divides a document into several separate files. Use Extract pages when you only need a few pages from a large document.",
    },
    {
      question: "Can I extract non-consecutive pages?",
      answer:
        "Yes. Select any combination of pages — for example pages 2, 5, and 9 — and they will be combined into one PDF in the order you chose.",
    },
    {
      question: "Will the extracted pages keep their formatting?",
      answer:
        "Yes. Extracted pages are copied exactly as they appear in the original document.",
    },
    {
      question: "Are my documents uploaded anywhere?",
      answer:
        "No. Extraction runs fully in your browser, so your files never leave your computer or phone.",
    },
  ],

  organize: [
    {
      question: "How do I reorder pages in a PDF?",
      answer:
        "Upload your PDF and drag the page thumbnails into the order you want, then save. PDFVerse rebuilds the document in your new sequence.",
    },
    {
      question: "Can I also rotate or delete pages while organizing?",
      answer:
        "The Organize tool focuses on reordering. For rotation use Rotate PDF, and for deletion use Remove pages — all free on PDFVerse.",
    },
    {
      question: "Will reordering pages change their content?",
      answer:
        "No. Only the page order changes; the content of each page stays exactly the same.",
    },
    {
      question: "Does organizing work on scanned PDFs?",
      answer:
        "Yes. Reordering works on any PDF, including scanned image-based documents, because pages are moved as whole units.",
    },
    {
      question: "Is my file uploaded when I organize it?",
      answer:
        "No. Everything happens locally in your browser, so your document stays on your device.",
    },
  ],

  "add-pages": [
    {
      question: "How do I insert pages into an existing PDF?",
      answer:
        "Upload your main PDF and the PDF you want to take pages from, choose which pages to insert and where they should go, then download the combined file.",
    },
    {
      question: "Can I insert pages in the middle of a document?",
      answer:
        "Yes. You can insert pages at the beginning, at the end, or at any position between existing pages.",
    },
    {
      question: "Do the inserted pages keep their original formatting?",
      answer:
        "Yes. Inserted pages are copied as-is, preserving their text, images, and layout.",
    },
    {
      question: "Can I insert pages from multiple PDFs at once?",
      answer:
        "You can repeat the process for each source file, or merge everything first with Merge PDF and then organize the result.",
    },
    {
      question: "Are my files sent to a server?",
      answer:
        "No. Adding pages is done entirely in your browser — nothing is uploaded.",
    },
  ],

  compare: [
    {
      question: "How does the Compare PDF tool work?",
      answer:
        "Upload two versions of a document. PDFVerse compares them page by page and highlights text additions, deletions, and visual layout differences.",
    },
    {
      question: "What kinds of differences are detected?",
      answer:
        "The tool detects added and removed text, changed pages, and visual differences, and shows a similarity score for each page.",
    },
    {
      question: "Can I compare scanned PDFs?",
      answer:
        "Visual comparison works on scanned PDFs, but text-level differences require selectable text. Running OCR first gives the best text comparison results.",
    },
    {
      question: "Can I download a comparison report?",
      answer:
        "Yes. After comparing, you can download a PDF report summarizing the differences — useful for contracts and document reviews.",
    },
    {
      question: "Are my documents uploaded for comparison?",
      answer:
        "No. Comparison runs locally in your browser, so both document versions stay private on your device.",
    },
  ],

  ocr: [
    {
      question: "What does the OCR PDF tool do?",
      answer:
        "It turns scanned or image-only PDFs into searchable PDFs. Recognized text is placed invisibly over the original pages so you can search, select, and copy it.",
    },
    {
      question: "Which languages does OCR support?",
      answer:
        "You can choose the main language of your document before running OCR, which improves recognition accuracy for that language.",
    },
    {
      question: "What output formats do I get?",
      answer:
        "You get a searchable PDF plus TXT and DOCX versions of the extracted text, all generated in your browser.",
    },
    {
      question: "How accurate is the OCR?",
      answer:
        "Accuracy depends on scan quality — clean, high-resolution scans give the best results. You can choose a higher recognition quality setting for difficult documents.",
    },
    {
      question: "Are my scanned documents uploaded?",
      answer:
        "No. OCR runs entirely in your browser using on-device recognition, so your scans never leave your device.",
    },
  ],

  rotate: [
    {
      question: "How do I rotate PDF pages?",
      answer:
        "Upload your PDF, select the pages to rotate, choose 90°, 180°, or 270°, and download the corrected file.",
    },
    {
      question: "Can I rotate only some pages?",
      answer:
        "Yes. Rotate all pages at once or pick individual pages — handy when only a few scanned pages came out sideways.",
    },
    {
      question: "Is rotation permanent?",
      answer:
        "Yes. The downloaded PDF keeps the new orientation, so it displays correctly everywhere.",
    },
    {
      question: "Will rotating reduce quality?",
      answer:
        "No. Rotation changes page orientation metadata and geometry without re-rendering content, so quality is preserved.",
    },
    {
      question: "Do I need to upload my file?",
      answer:
        "No. Rotation is processed locally in your browser.",
    },
  ],

  "add-page-numbers": [
    {
      question: "How do I add page numbers to a PDF?",
      answer:
        "Upload your PDF, choose the position, style, and starting number, then apply. Page numbers are stamped onto every page.",
    },
    {
      question: "Can I choose where the numbers appear?",
      answer:
        "Yes. You can place page numbers at the top or bottom of the page, aligned left, center, or right.",
    },
    {
      question: "Can I start numbering from a number other than 1?",
      answer:
        "Yes. Set any starting number — useful when the PDF is part of a larger document.",
    },
    {
      question: "Will page numbers cover my content?",
      answer:
        "Numbers are placed in the page margins. If your pages have no margins, choose a corner position that overlaps the least important area.",
    },
    {
      question: "Are my files uploaded?",
      answer:
        "No. Page numbers are added locally in your browser.",
    },
  ],

  /* ================= EDIT ================= */

  "pdf-editor": [
    {
      question: "What can I do with the PDF Editor?",
      answer:
        "You can edit existing PDF text, add new text and images, annotate pages, add signatures, organize pages, and download the edited PDF.",
    },
    {
      question: "Can I edit the original text of a PDF?",
      answer:
        "Yes, for PDFs with real text. Click on a text block to modify it directly. Scanned PDFs need OCR first to make their text editable.",
    },
    {
      question: "Can I start from a blank document?",
      answer:
        "Yes. Choose “start with a blank document” to create a new PDF from scratch, then add text, images, and signatures before downloading.",
    },
    {
      question: "Are my files uploaded when I edit them?",
      answer:
        "No. The editor runs completely in your browser — files are never uploaded to a server.",
    },
    {
      question: "Is the PDF Editor free?",
      answer:
        "Yes, the full editor is free to use with no account or sign-up required.",
    },
  ],

  "chat-with-pdf": [
    {
      question: "What is Chat with PDF?",
      answer:
        "Upload a PDF and ask questions about its contents in plain language — get summaries, key findings, dates, amounts, and answers drawn from the document.",
    },
    {
      question: "What kinds of questions can I ask?",
      answer:
        "Ask for summaries, conclusions, specific names or figures, clause explanations in contracts, or findings in reports — then ask follow-up questions without re-uploading.",
    },
    {
      question: "Can I trust the answers for important documents?",
      answer:
        "AI answers are generated from your document's contents, but for contracts, legal, or financial material you should always verify critical details against the original PDF.",
    },
    {
      question: "What happens to the PDF I upload?",
      answer:
        "Your document is uploaded securely so the AI can analyze it, and is used only to answer your questions about that document.",
    },
    {
      question: "Can I chat with multiple PDFs?",
      answer:
        "Yes. Upload a different PDF at any time to start a new document conversation.",
    },
  ],

  watermark: [
    {
      question: "How do I add a watermark to a PDF?",
      answer:
        "Upload your PDF, type your watermark text, adjust the font size, opacity, rotation, and position, then apply it to all or selected pages.",
    },
    {
      question: "Can I make the watermark semi-transparent?",
      answer:
        "Yes. Lower the opacity so the watermark sits subtly behind your content — ideal for “DRAFT” or “CONFIDENTIAL” marks.",
    },
    {
      question: "Will a text watermark stop copying?",
      answer:
        "A watermark discourages misuse and marks ownership, but it doesn't technically prevent copying. For real protection, combine it with the Protect PDF tool.",
    },
    {
      question: "Can I watermark only certain pages?",
      answer:
        "Yes. Apply the watermark to every page or only the pages you select.",
    },
    {
      question: "Are my files uploaded?",
      answer:
        "No. Watermarks are applied locally in your browser.",
    },
  ],

  "image-watermark": [
    {
      question: "How do I add a logo watermark to a PDF?",
      answer:
        "Upload your PDF and your logo image (PNG with transparency works best), then set the size, opacity, position, and rotation before applying.",
    },
    {
      question: "Which image formats work as watermarks?",
      answer:
        "Common formats like PNG, JPG, and WebP are supported. PNG with a transparent background gives the cleanest logo watermark.",
    },
    {
      question: "Can I tile the logo across the whole page?",
      answer:
        "You can control size, position, and rotation to place the logo where you want it — centered, cornered, or repeated across pages.",
    },
    {
      question: "Will the logo watermark affect print quality?",
      answer:
        "Use a high-resolution logo image so the watermark looks sharp both on screen and in print.",
    },
    {
      question: "Is my document uploaded anywhere?",
      answer:
        "No. The image watermark is composited locally in your browser.",
    },
  ],

  crop: [
    {
      question: "How do I crop a PDF?",
      answer:
        "Upload your PDF and set percentage margins for the top, bottom, left, and right edges. PDFVerse trims every page (or selected pages) by those margins.",
    },
    {
      question: "Does cropping delete content permanently?",
      answer:
        "Cropping hides the outer areas of each page in the output file. For sensitive content near the edges, use Redact PDF instead to be certain it's gone.",
    },
    {
      question: "Can I crop all pages the same way?",
      answer:
        "Yes. One set of margins applies uniformly, which is perfect for removing scanner borders from a whole document at once.",
    },
    {
      question: "Will cropping change my page size?",
      answer:
        "The visible page area becomes smaller according to your margins. The file itself stays a valid PDF with the same page count.",
    },
    {
      question: "Are my files uploaded to crop them?",
      answer:
        "No. Cropping is processed entirely in your browser.",
    },
  ],

  forms: [
    {
      question: "How do I fill a PDF form?",
      answer:
        "Upload your form, click each field to enter text, check boxes, or pick options, then download the filled form.",
    },
    {
      question: "What does flattening a form do?",
      answer:
        "Flattening bakes your filled-in values permanently into the page so they can't be edited afterward — best for final submissions.",
    },
    {
      question: "Can I fill scanned forms without fields?",
      answer:
        "Scanned forms have no interactive fields. Use the PDF Editor to type text directly on top of the scanned page instead.",
    },
    {
      question: "Will the filled form keep its layout?",
      answer:
        "Yes. Your entries go into the existing fields without changing the form's design.",
    },
    {
      question: "Is my form data uploaded?",
      answer:
        "No. Form filling happens locally in your browser, so your entries stay on your device.",
    },
  ],

  "header-footer": [
    {
      question: "What can I add with Header & Footer?",
      answer:
        "Add headers, footers, page numbers, dates, and filenames to your PDF — great for branding documents or preparing print-ready files.",
    },
    {
      question: "Can I add different headers on each page?",
      answer:
        "The tool applies consistent headers and footers across pages, with dynamic values like page numbers, dates, and the file name.",
    },
    {
      question: "Can I include the date automatically?",
      answer:
        "Yes. Insert the current date into the header or footer so every copy shows when it was generated.",
    },
    {
      question: "Will headers overlap my content?",
      answer:
        "Headers and footers sit in the page margins. Choose the alignment and position that fits your document's layout.",
    },
    {
      question: "Are my files uploaded?",
      answer:
        "No. Headers and footers are added locally in your browser.",
    },
  ],

  compress: [
    {
      question: "How does PDF compression work?",
      answer:
        "Upload your PDF and choose a compression level. PDFVerse optimizes images and internal data to shrink the file while keeping it readable.",
    },
    {
      question: "How much smaller will my PDF get?",
      answer:
        "It depends on the content — image-heavy PDFs often shrink dramatically, while text-only PDFs are already small and compress less.",
    },
    {
      question: "Will compression reduce quality?",
      answer:
        "Higher compression gives smaller files with some quality trade-off. Choose a lighter setting when print quality matters.",
    },
    {
      question: "Why compress a PDF?",
      answer:
        "Smaller files are easier to email, upload to portals with size limits, and share on messaging apps.",
    },
    {
      question: "Is my file uploaded for compression?",
      answer:
        "No. Compression runs entirely in your browser, so your document never leaves your device.",
    },
  ],

  sign: [
    {
      question: "How do I sign a PDF online?",
      answer:
        "Upload your PDF, then type your name, draw your signature with a mouse or finger, or upload a signature image — and place it anywhere on the page.",
    },
    {
      question: "Is an electronic signature legally valid?",
      answer:
        "Electronic signatures are accepted for many everyday documents, but requirements vary by country and document type. Check what applies to your specific case.",
    },
    {
      question: "Can I add my signature to multiple pages?",
      answer:
        "Yes. Place your signature on as many pages as needed before downloading the signed PDF.",
    },
    {
      question: "Can I reuse a saved signature?",
      answer:
        "Your signature stays in your browser session so you can sign multiple documents quickly without redrawing it.",
    },
    {
      question: "Is my signed document uploaded?",
      answer:
        "No. Signing happens locally in your browser — the document stays on your device.",
    },
  ],

  repair: [
    {
      question: "What does the Repair PDF tool do?",
      answer:
        "It attempts to rebuild damaged or corrupted PDF files — fixing broken internal structures so the document opens again.",
    },
    {
      question: "Can it fix every corrupted PDF?",
      answer:
        "Not always. Files with minor structural damage are often recoverable, but severely truncated or overwritten files may be beyond repair.",
    },
    {
      question: "Will I lose content after repair?",
      answer:
        "Most content is usually preserved. In rare cases, the damaged sections themselves can't be recovered even when the file opens again.",
    },
    {
      question: "Why would a PDF become corrupted?",
      answer:
        "Common causes are interrupted downloads, failing storage drives, crashed apps during saving, or faulty email attachments.",
    },
    {
      question: "Is my damaged file uploaded?",
      answer:
        "No. Repair is attempted locally in your browser, so your file stays private.",
    },
  ],

  "metadata-editor": [
    {
      question: "What is PDF metadata?",
      answer:
        "Metadata is hidden document info like title, author, subject, keywords, and creation date — visible in PDF readers and sometimes in search results.",
    },
    {
      question: "Why would I edit or remove metadata?",
      answer:
        "To correct wrong titles or authors, or to remove personal information before sharing a file publicly.",
    },
    {
      question: "Does editing metadata change the document content?",
      answer:
        "No. Only the document properties change; pages, text, and images are untouched.",
    },
    {
      question: "Can metadata reveal sensitive information?",
      answer:
        "Yes — author names, software used, and editing history can leak through metadata, which is why removing it before publishing is good practice.",
    },
    {
      question: "Is my file uploaded?",
      answer:
        "No. Metadata editing is done locally in your browser.",
    },
  ],

  /* ================= SECURITY ================= */

  protect: [
    {
      question: "How do I password-protect a PDF?",
      answer:
        "Upload your PDF, set a strong password, and apply. Anyone opening the file will need the password to view it.",
    },
    {
      question: "What kind of password should I use?",
      answer:
        "Use a long password mixing letters, numbers, and symbols. Avoid birthdays or simple words — the protection is only as strong as the password.",
    },
    {
      question: "Can I remove the password later?",
      answer:
        "Yes. Use the Unlock PDF tool with the correct password to remove protection.",
    },
    {
      question: "Does protection work in every PDF reader?",
      answer:
        "Yes. Password protection uses standard PDF encryption, so Adobe Reader, browsers, and mobile apps will all ask for the password.",
    },
    {
      question: "Is my file uploaded when I protect it?",
      answer:
        "No. Encryption happens locally in your browser — your document and password never leave your device.",
    },
  ],

  unlock: [
    {
      question: "How do I remove a PDF password?",
      answer:
        "Upload the protected PDF, enter the correct password, and download the unlocked copy without protection.",
    },
    {
      question: "Can I unlock a PDF if I forgot the password?",
      answer:
        "No. You must know the correct password — PDFVerse cannot crack or bypass PDF encryption.",
    },
    {
      question: "Will unlocking change the document?",
      answer:
        "No. Only the password protection is removed; all pages and content stay exactly the same.",
    },
    {
      question: "Is it legal to unlock a PDF?",
      answer:
        "Unlocking a PDF you own or have rights to is fine. Don't use it to circumvent protections on documents you aren't authorized to access.",
    },
    {
      question: "Is my file uploaded?",
      answer:
        "No. Unlocking is processed locally in your browser, and your password never leaves your device.",
    },
  ],

  redact: [
    {
      question: "What does redacting a PDF mean?",
      answer:
        "Redaction permanently blacks out selected text — names, amounts, IDs — so it can't be recovered, unlike simply covering it with a black box.",
    },
    {
      question: "Is redaction really permanent?",
      answer:
        "Yes. The underlying text is removed from the file, not just hidden, so it can't be revealed by copying or editing the PDF.",
    },
    {
      question: "Can I redact multiple occurrences of a word?",
      answer:
        "Yes. Search for a term and redact every occurrence at once — ideal for removing a name throughout a long document.",
    },
    {
      question: "What's the difference between redaction and a black highlight?",
      answer:
        "A black rectangle drawn over text can often be removed to reveal what's underneath. True redaction deletes the text data itself.",
    },
    {
      question: "Are my files uploaded?",
      answer:
        "No. Redaction runs entirely in your browser, which is important when handling sensitive documents.",
    },
  ],

  /* ================= CONVERT TO PDF ================= */

  "jpg-to-pdf": [
    {
      question: "How do I convert JPG images to PDF?",
      answer:
        "Upload your JPG, PNG, or WebP images, arrange them in order, and convert. Each image becomes a page in the resulting PDF.",
    },
    {
      question: "Can I combine multiple images into one PDF?",
      answer:
        "Yes. Add as many images as you like — they'll appear as consecutive pages in the order you arrange them.",
    },
    {
      question: "What page size will the PDF use?",
      answer:
        "You can choose a standard page size or fit each page to its image, depending on how you want the PDF to look.",
    },
    {
      question: "Will image quality be reduced?",
      answer:
        "Images are embedded at high quality. For the smallest file size, run the result through Compress PDF afterward.",
    },
    {
      question: "Are my images uploaded?",
      answer:
        "No. Conversion happens locally in your browser — your photos never leave your device.",
    },
  ],

  "scan-to-pdf": [
    {
      question: "How do I turn scans into a PDF?",
      answer:
        "Upload photos or scans of your documents, order the pages, and convert them into a single PDF file.",
    },
    {
      question: "What's the difference between Scan to PDF and JPG to PDF?",
      answer:
        "Scan to PDF is optimized for document scans with A4 pages and cleanup options like grayscale, while JPG to PDF is a general image-to-PDF converter.",
    },
    {
      question: "Can I make the scanned text searchable?",
      answer:
        "Yes. After creating the PDF, run it through the OCR PDF tool to add a searchable text layer.",
    },
    {
      question: "How do I get the best scan quality?",
      answer:
        "Photograph pages straight-on in good light with the page filling the frame, then convert — cleaner input means a cleaner PDF.",
    },
    {
      question: "Are my scans uploaded?",
      answer:
        "No. Everything is processed locally in your browser.",
    },
  ],

  "word-to-pdf": [
    {
      question: "How do I convert Word to PDF?",
      answer:
        "Upload your DOC or DOCX file. It's converted on our server to preserve layout, tables, images, fonts, and page breaks, then you download the PDF.",
    },
    {
      question: "Will my formatting stay intact?",
      answer:
        "Yes. The conversion preserves document layout including tables, images, fonts, headers, footers, and page breaks.",
    },
    {
      question: "What happens to my uploaded file?",
      answer:
        "Your file is sent securely to our conversion server, processed, and temporary files are automatically deleted afterward. Files are never used for advertising or sold.",
    },
    {
      question: "Can I convert password-protected Word files?",
      answer:
        "Remove the password in Word first — protected files can't be converted.",
    },
    {
      question: "Is Word to PDF free?",
      answer:
        "Yes, conversion is free with no sign-up required.",
    },
  ],

  "powerpoint-to-pdf": [
    {
      question: "How do I convert PowerPoint to PDF?",
      answer:
        "Upload your PPT or PPTX file. Each slide is rendered to a PDF page on our conversion server, preserving themes, images, charts, and layouts.",
    },
    {
      question: "Will animations and transitions carry over?",
      answer:
        "No — PDFs are static, so each slide becomes one page showing its final state. Animations and slide transitions don't transfer.",
    },
    {
      question: "What happens to my uploaded file?",
      answer:
        "It's sent securely to our conversion server for rendering, and temporary files are automatically deleted afterward.",
    },
    {
      question: "Can I convert only selected slides?",
      answer:
        "Convert the full deck, then use Extract pages or Remove pages to keep just the slides you need.",
    },
    {
      question: "Is PowerPoint to PDF free?",
      answer:
        "Yes, it's free with no account needed.",
    },
  ],

  "excel-to-pdf": [
    {
      question: "How do I convert Excel to PDF?",
      answer:
        "Upload your XLS or XLSX file. Our server converts it into a print-ready PDF with sheet layout and page sizing optimized automatically.",
    },
    {
      question: "How are multiple sheets handled?",
      answer:
        "Sheets are converted in order with sensible page breaks so tables stay readable in the PDF.",
    },
    {
      question: "Will formulas show as values?",
      answer:
        "Yes. The PDF shows calculated values exactly as they appear in Excel, not the formulas behind them.",
    },
    {
      question: "What happens to my uploaded spreadsheet?",
      answer:
        "It's uploaded securely for conversion only, and temporary files are automatically deleted afterward.",
    },
    {
      question: "Is Excel to PDF free?",
      answer:
        "Yes, free with no sign-up required.",
    },
  ],

  "html-to-pdf": [
    {
      question: "How do I convert HTML to PDF?",
      answer:
        "Provide your HTML file or code. It's rendered with full CSS support on our server into a print-ready PDF with browser-style page layout.",
    },
    {
      question: "Is CSS supported in the conversion?",
      answer:
        "Yes. Styles, images, and tables render as a browser would, including print-style page breaks.",
    },
    {
      question: "Can I convert a live webpage URL?",
      answer:
        "Save the page as an HTML file first (or paste its source), then upload it for conversion.",
    },
    {
      question: "What happens to my uploaded file?",
      answer:
        "It's sent securely to our rendering server and temporary files are automatically deleted after processing.",
    },
    {
      question: "Is HTML to PDF free?",
      answer:
        "Yes, free with no account needed.",
    },
  ],

  /* ================= CONVERT FROM PDF ================= */

  "pdf-to-jpg": [
    {
      question: "How do I convert PDF pages to JPG?",
      answer:
        "Upload your PDF and convert. Each page becomes a high-quality JPG image — multi-page PDFs are bundled into one convenient ZIP download.",
    },
    {
      question: "What image quality will I get?",
      answer:
        "Pages are rendered at high resolution so text and graphics stay sharp, suitable for sharing or reusing in designs.",
    },
    {
      question: "Can I convert just one page?",
      answer:
        "Convert the whole file, then keep the images you need from the ZIP — or extract the page first with Extract pages.",
    },
    {
      question: "What happens to my uploaded PDF?",
      answer:
        "It's sent securely to our conversion server for rendering, and temporary files are automatically deleted afterward.",
    },
    {
      question: "Is PDF to JPG free?",
      answer:
        "Yes, free with no sign-up required.",
    },
  ],

  "pdf-to-word": [
    {
      question: "How do I convert PDF to Word?",
      answer:
        "Upload your PDF. Our server converts it into an editable DOCX file with improved layout preservation for structured documents.",
    },
    {
      question: "Will the layout match the original PDF?",
      answer:
        "Structured documents — reports, contracts, articles — convert with good layout fidelity. Complex designs with heavy graphics may need manual tidying in Word.",
    },
    {
      question: "What about scanned PDFs?",
      answer:
        "Scanned pages have no real text to convert. Run the PDF through OCR first to add a text layer, then convert to Word.",
    },
    {
      question: "What happens to my uploaded file?",
      answer:
        "It's uploaded securely for conversion only, and temporary files are automatically deleted afterward.",
    },
    {
      question: "Is PDF to Word free?",
      answer:
        "Yes, free with no account needed.",
    },
  ],

  "pdf-to-text": [
    {
      question: "How do I extract text from a PDF?",
      answer:
        "Upload your PDF and extract — you'll get plain text from every page, ready to copy or download.",
    },
    {
      question: "Does it work on scanned PDFs?",
      answer:
        "Only if the PDF has a text layer. For scanned documents, run OCR PDF first to recognize the text, then extract it.",
    },
    {
      question: "Will formatting be preserved?",
      answer:
        "You get plain text without fonts or layout — perfect for quoting, searching, or feeding into other tools.",
    },
    {
      question: "Can I extract text from specific pages?",
      answer:
        "Extract the pages you want first with Extract pages, then run text extraction on the smaller file.",
    },
    {
      question: "Is my document uploaded?",
      answer:
        "No. Text extraction runs locally in your browser.",
    },
  ],

  "extract-images": [
    {
      question: "How do I extract images from a PDF?",
      answer:
        "Upload your PDF and extract — all embedded images are pulled out and delivered as a single ZIP file.",
    },
    {
      question: "What image quality will I get?",
      answer:
        "Images are extracted at their original embedded resolution — no recompression or quality loss.",
    },
    {
      question: "Does it extract vector graphics too?",
      answer:
        "It extracts embedded raster images (photos, logos saved as images). Vector drawings that are part of the page design aren't extracted as separate files.",
    },
    {
      question: "Can I extract images from one page only?",
      answer:
        "Extract the page first with Extract pages, then run image extraction on that single-page PDF.",
    },
    {
      question: "Is my file uploaded?",
      answer:
        "No. Image extraction happens locally in your browser.",
    },
  ],

  "pdf-to-powerpoint": [
    {
      question: "How do I convert PDF to PowerPoint?",
      answer:
        "Upload your PDF. Each page is rendered on our server into slides of an editable PPTX presentation you can download.",
    },
    {
      question: "Will the slides be editable?",
      answer:
        "You get a real PPTX file you can open in PowerPoint or Google Slides. Page content becomes slide content you can rearrange and present.",
    },
    {
      question: "What happens to my uploaded PDF?",
      answer:
        "It's sent securely to our conversion server for rendering, and temporary files are automatically deleted afterward.",
    },
    {
      question: "Is PDF to PowerPoint free?",
      answer:
        "Yes, free with no sign-up required.",
    },
    {
      question: "Can I convert a PDF made from slides back accurately?",
      answer:
        "Yes — PDFs originally exported from PowerPoint convert back particularly cleanly, with one slide per page.",
    },
  ],

  "pdf-to-excel": [
    {
      question: "How do I convert PDF to Excel?",
      answer:
        "Upload your PDF. Our server extracts tables and content into an Excel workbook, using table detection for better structure.",
    },
    {
      question: "How good is table extraction?",
      answer:
        "Well-structured tables with clear rows and columns convert reliably. Complex or borderless layouts may need cleanup in Excel afterward.",
    },
    {
      question: "What about scanned PDFs?",
      answer:
        "Scanned pages contain no selectable data. Run OCR PDF first to add a text layer, then convert to Excel.",
    },
    {
      question: "What happens to my uploaded file?",
      answer:
        "It's uploaded securely for conversion only, and temporary files are automatically deleted afterward.",
    },
    {
      question: "Is PDF to Excel free?",
      answer:
        "Yes, free with no account needed.",
    },
  ],

  /* ================= BATCH ================= */

  "batch-compress": [
    {
      question: "How does Batch Compress work?",
      answer:
        "Upload multiple PDFs at once, choose a compression level, and download all the compressed files in a single ZIP.",
    },
    {
      question: "How many files can I compress at once?",
      answer:
        "There's no fixed limit, but very large batches take longer since everything is processed in your browser.",
    },
    {
      question: "Do all files get the same compression level?",
      answer:
        "Yes. One setting applies to the whole batch, keeping the workflow fast and consistent.",
    },
    {
      question: "Are my files uploaded?",
      answer:
        "No. Batch compression runs locally in your browser — nothing leaves your device.",
    },
    {
      question: "Is batch processing free?",
      answer:
        "Yes, all batch tools on PDFVerse are free.",
    },
  ],

  "batch-protect": [
    {
      question: "How do I password-protect multiple PDFs at once?",
      answer:
        "Upload all your PDFs, set one password, and download the protected files together in a ZIP.",
    },
    {
      question: "Do all files get the same password?",
      answer:
        "Yes. Batch Protect applies a single password to every file in the batch.",
    },
    {
      question: "Is batch protection secure?",
      answer:
        "Each file gets standard PDF encryption, processed locally in your browser — your files and password never leave your device.",
    },
    {
      question: "Can I mix already-protected files into the batch?",
      answer:
        "Unlock them first with Unlock PDF (or Batch Unlock), then protect the whole batch with your new password.",
    },
    {
      question: "Is it free?",
      answer:
        "Yes, Batch Protect is completely free.",
    },
  ],

  "batch-unlock": [
    {
      question: "How does Batch Unlock work?",
      answer:
        "Upload multiple password-protected PDFs, enter the shared password once, and download all the unlocked files in a ZIP.",
    },
    {
      question: "Do all files need the same password?",
      answer:
        "Yes. Batch Unlock uses one password for the entire batch — files with different passwords need separate runs.",
    },
    {
      question: "What if I forgot the password?",
      answer:
        "The correct password is required. PDFVerse cannot crack or bypass PDF encryption.",
    },
    {
      question: "Is my password kept safe?",
      answer:
        "Yes. Unlocking happens locally in your browser, so your password never leaves your device.",
    },
    {
      question: "Is it free?",
      answer:
        "Yes, Batch Unlock is free with no sign-up.",
    },
  ],

  "batch-watermark": [
    {
      question: "How do I watermark multiple PDFs at once?",
      answer:
        "Upload your PDFs, design the text watermark once — text, size, opacity, position — and apply it to the whole batch, downloading a ZIP of watermarked files.",
    },
    {
      question: "Can each file have a different watermark?",
      answer:
        "Batch Watermark applies the same watermark to all files. For different marks, run files through the single Watermark tool individually.",
    },
    {
      question: "Are my files uploaded?",
      answer:
        "No. Batch watermarking is processed locally in your browser.",
    },
    {
      question: "Is it free?",
      answer:
        "Yes, completely free.",
    },
    {
      question: "Can I watermark only specific pages in each file?",
      answer:
        "The batch tool applies to the page selection uniformly. For per-file page control, use the individual Watermark tool.",
    },
  ],

  "batch-header-footer": [
    {
      question: "How do I add headers to multiple PDFs at once?",
      answer:
        "Upload your PDFs, set up the header and footer once — including page numbers, dates, or filenames — and apply to all files, downloading a ZIP.",
    },
    {
      question: "Can I use different headers per file?",
      answer:
        "The batch tool applies one header/footer design to all files. Dynamic values like filename and page numbers still adapt per file automatically.",
    },
    {
      question: "Are my files uploaded?",
      answer:
        "No. Everything is processed locally in your browser.",
    },
    {
      question: "Is it free?",
      answer:
        "Yes, Batch Header & Footer is free.",
    },
    {
      question: "Will headers overlap content?",
      answer:
        "Headers and footers are placed in page margins, so choose documents with reasonable margins for the cleanest result.",
    },
  ],

  "batch-repair": [
    {
      question: "How does Batch Repair work?",
      answer:
        "Upload multiple damaged PDFs. PDFVerse attempts to rebuild each one and packages the recovered files into a single ZIP download.",
    },
    {
      question: "Will it tell me which files couldn't be fixed?",
      answer:
        "Files that can't be recovered are reported so you know exactly which ones need another approach.",
    },
    {
      question: "Can it fix every corrupted PDF?",
      answer:
        "Minor structural damage is often repairable, but severely truncated or overwritten files may be unrecoverable.",
    },
    {
      question: "Are my damaged files uploaded?",
      answer:
        "No. Repair attempts run locally in your browser, keeping your files private.",
    },
    {
      question: "Is it free?",
      answer:
        "Yes, Batch Repair is completely free.",
    },
  ],
};

export function getToolFaqs(slug: string): FaqItem[] {
  return toolFaqs[slug] ?? [];
}
