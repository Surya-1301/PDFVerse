// Hands a picked PDF from the landing page to the editor route without a reload.
let pending: File | null = null;

export function storePdfForEditor(file: File) {
  pending = file;
}

/** Peek at the pending file without clearing it. */
export function getPdfForEditor(): File | null {
  return pending;
}

/** Consume the pending file (returns it and clears the slot). */
export function takePdfForEditor(): File | null {
  const f = pending;
  pending = null;
  return f;
}

/** Drop any pending file. */
export function clearPdfForEditor() {
  pending = null;
}

/** Empty single-page A4 PDF so users can start from a blank document. */
export async function createBlankPdfFile(name = "blank-document.pdf") {
  const { PDFDocument } = await import("pdf-lib");
  const doc = await PDFDocument.create();
  doc.addPage([595.28, 841.89]);
  const bytes = await doc.save();
  return new File([bytes as unknown as BlobPart], name, { type: "application/pdf" });
}
