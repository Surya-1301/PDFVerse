// Hands a picked PDF from the landing page to the editor route without a reload.
let pending: File | null = null;

export function storePdfForEditor(file: File) {
  pending = file;
}

export function takePdfForEditor(): File | null {
  const f = pending;
  pending = null;
  return f;
}

// Creates an empty single-page A4 PDF so users can start from a blank document.
export async function createBlankPdfFile(name = "blank-document.pdf") {
  const { PDFDocument } = await import("pdf-lib");
  const doc = await PDFDocument.create();
  doc.addPage([595.28, 841.89]);
  const bytes = await doc.save();
  return new File([bytes as unknown as BlobPart], name, {
    type: "application/pdf",
  });
}
