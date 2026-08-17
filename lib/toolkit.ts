import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";
import * as pdfjs from "pdfjs-dist";
import type { PDFPageProxy } from "pdfjs-dist";

let pdfJsPromise: Promise<typeof import("pdfjs-dist")> | null = null;

async function getPdfJs() {
  if (typeof window === "undefined") {
    throw new Error("PDF processing is only available in the browser.");
  }

  pdfJsPromise ??= import("pdfjs-dist").then((pdfjs) => {
    pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
    return pdfjs;
  });

  return pdfJsPromise;
}

export type ToolFile = { name: string; blob: Blob };

export async function bytesOf(file: File | Blob): Promise<Uint8Array> {
  return new Uint8Array(await file.arrayBuffer());
}

export async function loadPdf(file: File | Blob, password?: string) {
  const bytes = await bytesOf(file);
  return PDFDocument.load(bytes, {
    ignoreEncryption: true,
    throwOnInvalidObject: false,
    ...(password ? { password } : {}),
  } as never);
}

export async function savePdf(doc: PDFDocument, name: string): Promise<ToolFile> {
  const bytes = await doc.save({ useObjectStreams: true });
  return {
    name,
    blob: new Blob([bytes as unknown as BlobPart], { type: "application/pdf" }),
  };
}

export function baseName(name: string) {
  return name.replace(/\.[^.]+$/, "");
}

/** "1-3,7, 9-" -> zero-based page indexes, clamped to `total`. */
export function parseRanges(input: string, total: number): number[] {
  const trimmed = (input || "").trim();
  if (!trimmed) return Array.from({ length: total }, (_, i) => i);
  const out = new Set<number>();
  for (const chunk of trimmed.split(/[,\s]+/).filter(Boolean)) {
    const m = chunk.match(/^(\d+)?\s*-\s*(\d+)?$/);
    if (m) {
      const from = m[1] ? Number(m[1]) : 1;
      const to = m[2] ? Number(m[2]) : total;
      for (let p = Math.min(from, to); p <= Math.max(from, to); p += 1) {
        if (p >= 1 && p <= total) out.add(p - 1);
      }
    } else {
      const p = Number(chunk);
      if (Number.isFinite(p) && p >= 1 && p <= total) out.add(p - 1);
    }
  }
  return [...out].sort((a, b) => a - b);
}

export function hexToRgb(hex: string) {
  const clean = (hex || "#000000").replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean.padEnd(6, "0");
  const n = parseInt(full.slice(0, 6), 16);
  return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

export async function getPdfJsDoc(file: File | Blob, password?: string) {
  const data = await bytesOf(file);
  const pdfjs = await getPdfJs();
  return pdfjs.getDocument({ data, password }).promise;
}

export async function renderPageToCanvas(
  page: PDFPageProxy,
  scale: number,
): Promise<HTMLCanvasElement> {
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(viewport.width));
  canvas.height = Math.max(1, Math.floor(viewport.height));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available in this browser.");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const params = { canvas, canvasContext: ctx, viewport } as unknown as Parameters<
    typeof page.render
  >[0];
  await page.render(params).promise;
  return canvas;
}

export function canvasToJpeg(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Could not encode image."))),
      "image/jpeg",
      quality,
    );
  });
}

export function canvasToPng(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Could not encode image."))),
      "image/png",
    );
  });
}

/** Rasterises every page of a PDF and rebuilds it from images. */
export async function rasterizePdf(
  file: File | Blob,
  opts: { scale: number; quality: number; grayscale?: boolean; password?: string },
): Promise<PDFDocument> {
  const src = await getPdfJsDoc(file, opts.password);
  const out = await PDFDocument.create();
  for (let i = 1; i <= src.numPages; i += 1) {
    const page = await src.getPage(i);
    const canvas = await renderPageToCanvas(page, opts.scale);
    if (opts.grayscale) applyGrayscale(canvas);
    const jpeg = await canvasToJpeg(canvas, opts.quality);
    const image = await out.embedJpg(await bytesOf(jpeg));
    const viewport = page.getViewport({ scale: 1 });
    const newPage = out.addPage([viewport.width, viewport.height]);
    newPage.drawImage(image, { x: 0, y: 0, width: viewport.width, height: viewport.height });
  }
  return out;
}

export function applyGrayscale(canvas: HTMLCanvasElement, contrast = 1) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const g = 0.299 * (d[i] ?? 0) + 0.587 * (d[i + 1] ?? 0) + 0.114 * (d[i + 2] ?? 0);
    const v = Math.max(0, Math.min(255, (g - 128) * contrast + 128));
    d[i] = v;
    d[i + 1] = v;
    d[i + 2] = v;
  }
  ctx.putImageData(img, 0, 0);
}

export type PageText = { page: number; lines: string[] };

export async function extractText(file: File | Blob, password?: string): Promise<PageText[]> {
  const doc = await getPdfJsDoc(file, password);
  const pages: PageText[] = [];
  for (let i = 1; i <= doc.numPages; i += 1) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const rows = new Map<number, Array<{ x: number; str: string }>>();
    for (const raw of content.items) {
      const item = raw as { str: string; transform: number[] };
      if (!item.str) continue;
      const y = Math.round((item.transform[5] ?? 0) / 3) * 3;
      const list = rows.get(y) ?? [];
      list.push({ x: item.transform[4] ?? 0, str: item.str });
      rows.set(y, list);
    }
    const lines = [...rows.entries()]
      .sort((a, b) => b[0] - a[0])
      .map(([, list]) =>
        list
          .sort((a, b) => a.x - b.x)
          .map((p) => p.str)
          .join("")
          .replace(/\s+/g, " ")
          .trim(),
      )
      .filter((line) => line.length > 0);
    pages.push({ page: i, lines });
  }
  return pages;
}

/** Lays out plain text into a fresh PDF with wrapping and pagination. */
export async function textToPdf(
  blocks: Array<{ text: string; bold?: boolean; size?: number }>,
  opts: { title?: string } = {},
): Promise<PDFDocument> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const width = 595.28;
  const height = 841.89;
  const margin = 56;
  let page = doc.addPage([width, height]);
  let y = height - margin;

  const write = (text: string, size: number, isBold: boolean) => {
    const f = isBold ? bold : font;
    const maxWidth = width - margin * 2;
    const words = text.split(/\s+/).filter(Boolean);
    const lines: string[] = [];
    let current = "";
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (f.widthOfTextAtSize(candidate, size) > maxWidth && current) {
        lines.push(current);
        current = word;
      } else {
        current = candidate;
      }
    }
    if (current) lines.push(current);
    if (lines.length === 0) lines.push("");
    for (const line of lines) {
      if (y < margin) {
        page = doc.addPage([width, height]);
        y = height - margin;
      }
      page.drawText(line, {
        x: margin,
        y,
        size,
        font: f,
        color: rgb(0.1, 0.1, 0.12),
      });
      y -= size * 1.45;
    }
  };

  if (opts.title) {
    write(opts.title, 20, true);
    y -= 8;
  }
  for (const block of blocks) {
    if (!block.text.trim()) {
      y -= 8;
      continue;
    }
    write(block.text, block.size ?? 11, Boolean(block.bold));
  }
  return doc;
}

export async function zipFiles(files: ToolFile[], name: string): Promise<ToolFile> {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  for (const file of files) zip.file(file.name, file.blob);
  const blob = await zip.generateAsync({ type: "blob" });
  return { name, blob };
}

export { PDFDocument, StandardFonts, rgb, degrees, pdfjs };
