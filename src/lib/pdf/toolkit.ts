import { PDFDocument, StandardFonts, rgb, degrees } from "@cantoo/pdf-lib";
import * as pdfjs from "pdfjs-dist";

import { assetUrl } from "../native";

pdfjs.GlobalWorkerOptions.workerSrc = assetUrl("/pdf.worker.min.mjs");

export type ToolFile = { name: string; blob: Blob };

/**
 * In Android WebView (Capacitor), <input type="file"> returns lazy File handles
 * backed by Android content:// URIs with temporary permissions.
 * If the file is not read immediately, or if the input value is cleared,
 * Android revokes the permission and subsequent reads fail with NotReadableError.
 *
 * safelyReadFile immediately captures the file's raw bytes into an in-memory File
 * while the native content:// permission grant is fresh and active.
 */
export async function safelyReadFile(file: File): Promise<File> {
  try {
    const buffer = await file.arrayBuffer();
    return new File([buffer], file.name, {
      type: file.type || "application/octet-stream",
      lastModified: file.lastModified,
    });
  } catch (err) {
    return new Promise<File>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          resolve(
            new File([reader.result], file.name, {
              type: file.type || "application/octet-stream",
              lastModified: file.lastModified,
            })
          );
        } else {
          reject(new Error(`Failed to read "${file.name}".`));
        }
      };
      reader.onerror = () => {
        reject(
          reader.error ||
            new Error(
              `The file "${file.name}" could not be read from device storage.`
            )
        );
      };
      reader.readAsArrayBuffer(file);
    });
  }
}

export async function bytesOf(file: File | Blob): Promise<Uint8Array> {
  try {
    return new Uint8Array(await file.arrayBuffer());
  } catch (err) {
    return new Promise<Uint8Array>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          resolve(new Uint8Array(reader.result));
        } else {
          reject(err || new Error("Failed to read file bytes."));
        }
      };
      reader.onerror = () => reject(reader.error || err);
      reader.readAsArrayBuffer(file);
    });
  }
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
  const addPage = (p: number) => {
    if (Number.isFinite(p) && p >= 1 && p <= total) out.add(p - 1);
  };
  const addChunk = (chunk: string) => {
    const m = chunk.match(/^(\d+)?-(\d+)?$/);
    if (m) {
      const from = m[1] ? Number(m[1]) : 1;
      const to = m[2] ? Number(m[2]) : total;
      for (let p = Math.min(from, to); p <= Math.max(from, to); p += 1) addPage(p);
    } else {
      addPage(Number(chunk));
    }
  };
  // Split on commas first: a chunk containing "-" is ONE range (spaces
  // around the dash included — "1 - 3" must not become pages 1, ALL, 3);
  // other chunks may hold several space-separated page numbers.
  for (const part of trimmed.split(",")) {
    const chunk = part.trim();
    if (!chunk) continue;
    if (chunk.includes("-")) addChunk(chunk.replace(/\s+/g, ""));
    else for (const token of chunk.split(/\s+/).filter(Boolean)) addChunk(token);
  }
  return [...out].sort((a, b) => a - b);
}

/**
 * pdf-lib's standard fonts only encode WinAnsi (cp1252). Drawing text with
 * anything outside it (₹, emoji, Devanagari, CJK…) throws and kills the
 * whole tool — replace unsupported characters with "?" instead.
 */
const WINANSI_EXTRA = new Set([
  0x20ac, 0x201a, 0x0192, 0x201e, 0x2026, 0x2020, 0x2021, 0x02c6, 0x2030,
  0x0160, 0x2039, 0x0152, 0x017d, 0x2018, 0x2019, 0x201c, 0x201d, 0x2022,
  0x2013, 0x2014, 0x02dc, 0x2122, 0x0161, 0x203a, 0x0153, 0x017e, 0x0178,
]);

export function winAnsiSafe(text: string): string {
  let out = "";
  for (const ch of text) {
    const cp = ch.codePointAt(0) ?? 0;
    if (
      (cp >= 0x20 && cp <= 0x7e) ||
      (cp >= 0xa0 && cp <= 0xff) ||
      WINANSI_EXTRA.has(cp) ||
      ch === "\n" ||
      ch === "\t"
    ) {
      out += ch;
    } else {
      out += "?";
    }
  }
  return out;
}

/** Real image format from the magic bytes — the name/MIME label can lie. */
export function sniffImageKind(bytes: Uint8Array): "jpeg" | "png" | "other" {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff)
    return "jpeg";
  if (
    bytes.length >= 4 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  )
    return "png";
  return "other";
}

/** EXIF orientation (1–8) stored in a JPEG, or 1 when absent/unreadable. */
export function jpegOrientation(bytes: Uint8Array): number {
  try {
    if (bytes[0] !== 0xff || bytes[1] !== 0xd8) return 1;
    let offset = 2;
    while (offset + 4 <= bytes.length) {
      if (bytes[offset] !== 0xff) return 1;
      const marker = bytes[offset + 1];
      const length = (bytes[offset + 2] << 8) + bytes[offset + 3];
      if (length < 2) return 1;
      if (marker === 0xe1) {
        const seg = bytes.subarray(offset + 4, offset + 2 + length);
        // "Exif\0\0" header? A JPEG can carry several APP1 segments — XMP
        // often comes FIRST — so a non-EXIF APP1 must not end the search.
        if (
          seg.length >= 14 &&
          seg[0] === 0x45 &&
          seg[1] === 0x78 &&
          seg[2] === 0x69 &&
          seg[3] === 0x66
        ) {
          const tiff = seg.subarray(6);
          const little = tiff[0] === 0x49 && tiff[1] === 0x49;
          const u16 = (o: number) =>
            little ? tiff[o] + (tiff[o + 1] << 8) : (tiff[o] << 8) + tiff[o + 1];
          const u32 = (o: number) =>
            little
              ? tiff[o] + (tiff[o + 1] << 8) + (tiff[o + 2] << 16) + (tiff[o + 3] << 24)
              : (tiff[o] << 24) + (tiff[o + 1] << 16) + (tiff[o + 2] << 8) + tiff[o + 3];
          const ifd = u32(4);
          const entries = u16(ifd);
          for (let i = 0; i < entries; i += 1) {
            const entry = ifd + 2 + i * 12;
            if (u16(entry) === 0x0112) return u16(entry + 8) || 1;
          }
          return 1;
        }
      }
      if (marker === 0xda || marker === 0xd9) break;
      offset += 2 + length;
    }
  } catch {
    /* fall through — treat as unrotated */
  }
  return 1;
}

/** Stored pixel size from the JPEG frame header (before any rotation). */
export function jpegPixelSize(bytes: Uint8Array): { width: number; height: number } | null {
  try {
    if (bytes[0] !== 0xff || bytes[1] !== 0xd8) return null;
    let offset = 2;
    while (offset + 9 <= bytes.length) {
      if (bytes[offset] !== 0xff) return null;
      const marker = bytes[offset + 1];
      const length = (bytes[offset + 2] << 8) + bytes[offset + 3];
      if (length < 2) return null;
      // SOF0–SOF15, excluding DHT (c4), JPG (c8) and DAC (cc).
      if (
        marker >= 0xc0 &&
        marker <= 0xcf &&
        marker !== 0xc4 &&
        marker !== 0xc8 &&
        marker !== 0xcc
      ) {
        return {
          height: (bytes[offset + 5] << 8) + bytes[offset + 6],
          width: (bytes[offset + 7] << 8) + bytes[offset + 8],
        };
      }
      if (marker === 0xda || marker === 0xd9) break;
      offset += 2 + length;
    }
  } catch {
    /* fall through */
  }
  return null;
}

/**
 * Decode an image and re-encode it with its EXIF orientation applied, so
 * the output pixels are already upright. The decode goes through an <img>
 * element: browsers apply the camera rotation (all 8 EXIF orientations,
 * including upside-down and mirrored) when loading an <img> — the same
 * behaviour that shows the photo upright in a gallery. Applying the
 * rotation manually from createImageBitmap hints proved unreliable for
 * the orientations that don't swap width/height (notably upside-down
 * photos, which came out rotated twice). PNG keeps its alpha channel;
 * everything else becomes a JPEG flattened onto white.
 */
export async function decodeImageUpright(
  blob: Blob,
  kind: "jpeg" | "png" | "other",
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  const ctx2d = canvas.getContext("2d");
  if (!ctx2d) throw new Error("Canvas is not available in this browser.");
  const flatten = () => {
    if (kind !== "png") {
      ctx2d.fillStyle = "#ffffff";
      ctx2d.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  let drawn = false;
  const url = URL.createObjectURL(blob);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Could not decode the image."));
      el.src = url;
    });
    if (img.naturalWidth > 0 && img.naturalHeight > 0) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      flatten();
      ctx2d.drawImage(img, 0, 0);
      drawn = true;
    }
  } catch {
    drawn = false;
  } finally {
    URL.revokeObjectURL(url);
  }

  if (!drawn) {
    // Fallback for formats the <img> loader rejects.
    const bitmap = await createImageBitmap(blob);
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    flatten();
    ctx2d.drawImage(bitmap, 0, 0);
    bitmap.close?.();
  }
  return kind === "png" ? canvasToPng(canvas) : canvasToJpeg(canvas, 0.92);
}

/**
 * Rotate an image by whole quarter-turns (positive = clockwise), e.g. a
 * manual correction the user picked in the UI. Applied on top of the EXIF
 * correction; the image is re-encoded so no EXIF rotation remains.
 */
export async function rotateImageTurns(
  blob: Blob,
  kind: "jpeg" | "png" | "other",
  turns: number,
): Promise<Blob> {
  const t = ((turns % 4) + 4) % 4;
  if (t === 0) return blob;
  const bitmap = await createImageBitmap(blob);
  const swap = t % 2 === 1;
  const canvas = document.createElement("canvas");
  canvas.width = swap ? bitmap.height : bitmap.width;
  canvas.height = swap ? bitmap.width : bitmap.height;
  const ctx2d = canvas.getContext("2d");
  if (!ctx2d) return blob;
  if (kind !== "png") {
    ctx2d.fillStyle = "#ffffff";
    ctx2d.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx2d.translate(canvas.width / 2, canvas.height / 2);
  ctx2d.rotate((t * Math.PI) / 2);
  ctx2d.drawImage(bitmap, -bitmap.width / 2, -bitmap.height / 2);
  bitmap.close?.();
  return kind === "png" ? canvasToPng(canvas) : canvasToJpeg(canvas, 0.92);
}

/**
 * Detects if a document/notebook photo is sideways (e.g. text lines running vertically)
 * using edge gradient analysis on downsampled image data.
 * When text is horizontal (upright), vertical gradient >> horizontal gradient (ratio > 1.0).
 * When text is sideways (rotated 90 deg), horizontal gradient >> vertical gradient (ratio < 0.75).
 */
export async function isImageSideways(blob: Blob): Promise<boolean> {
  try {
    const bitmap = await createImageBitmap(blob);
    if (bitmap.height >= bitmap.width) {
      bitmap.close?.();
      return false;
    }

    const canvas = document.createElement("canvas");
    canvas.width = 120;
    canvas.height = 120;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      bitmap.close?.();
      return false;
    }

    ctx.drawImage(bitmap, 0, 0, 120, 120);
    bitmap.close?.();

    const imgData = ctx.getImageData(0, 0, 120, 120).data;
    let sumDx = 0;
    let sumDy = 0;

    for (let y = 24; y < 96; y += 2) {
      for (let x = 24; x < 96; x += 2) {
        const idxR = (y * 120 + (x + 1)) * 4;
        const idxL = (y * 120 + (x - 1)) * 4;
        const idxD = ((y + 1) * 120 + x) * 4;
        const idxU = ((y - 1) * 120 + x) * 4;

        const lumR = 0.299 * imgData[idxR] + 0.587 * imgData[idxR + 1] + 0.114 * imgData[idxR + 2];
        const lumL = 0.299 * imgData[idxL] + 0.587 * imgData[idxL + 1] + 0.114 * imgData[idxL + 2];
        const lumD = 0.299 * imgData[idxD] + 0.587 * imgData[idxD + 1] + 0.114 * imgData[idxD + 2];
        const lumU = 0.299 * imgData[idxU] + 0.587 * imgData[idxU + 1] + 0.114 * imgData[idxU + 2];

        sumDx += Math.abs(lumR - lumL);
        sumDy += Math.abs(lumD - lumU);
      }
    }

    const ratio = sumDy / (sumDx + 1e-5);
    return ratio < 0.75;
  } catch {
    return false;
  }
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
  return pdfjs.getDocument({ data, password }).promise;
}

export async function renderPageToCanvas(
  page: pdfjs.PDFPageProxy,
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

  const write = (rawText: string, size: number, isBold: boolean) => {
    const text = winAnsiSafe(rawText);
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
  // JSZip silently overwrites duplicate names — keep every file by
  // suffixing repeats ("report.pdf" -> "report (2).pdf") instead of
  // losing all but the last one.
  const used = new Set<string>();
  for (const file of files) {
    let entryName = file.name;
    if (used.has(entryName)) {
      const dot = entryName.lastIndexOf(".");
      const stem = dot > 0 ? entryName.slice(0, dot) : entryName;
      const ext = dot > 0 ? entryName.slice(dot) : "";
      let n = 2;
      while (used.has(`${stem} (${n})${ext}`)) n += 1;
      entryName = `${stem} (${n})${ext}`;
    }
    used.add(entryName);
    zip.file(entryName, file.blob);
  }
  const blob = await zip.generateAsync({ type: "blob" });
  return { name, blob };
}

export { PDFDocument, StandardFonts, rgb, degrees, pdfjs };
