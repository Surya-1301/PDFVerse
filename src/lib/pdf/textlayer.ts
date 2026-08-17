import type * as pdfjs from "pdfjs-dist";
import { LINE_HEIGHT, uid, type TextItem } from "./types";

/** Multiply two pdf.js six-value affine transforms without a runtime import. */
function affineTransform(m1: number[], m2: number[]): number[] {
  const [a = 0, b = 0, c = 0, d = 0, e = 0, f = 0] = m1;
  const [g = 0, h = 0, i = 0, j = 0, k = 0, l = 0] = m2;
  return [
    a * g + c * h,
    b * g + d * h,
    a * i + c * j,
    b * i + d * j,
    a * k + c * l + e,
    b * k + d * l + f,
  ];
}

/** True when an "existing" run has actually been changed by the user. */
export function isExistingTextEdited(item: TextItem) {
  if (item.source !== "existing") return true;
  return (item.text ?? "") !== (item.original ?? "");
}

/**
 * Turn every extracted line of a page into an editable text object,
 * mirroring the source run's position, size and style.
 */
export function linesToTextItems(lines: TextLine[], pageIndex: number): TextItem[] {
  return lines.map((l) => {
    const x = l.x;
    const y = l.baseline - l.size;
    const w = Math.max(l.w + 6, 24);
    const h = l.size * LINE_HEIGHT;
    return {
      id: uid(),
      type: "text" as const,
      page: pageIndex,
      x,
      y,
      w,
      h,
      ox: x,
      oy: y,
      ow: w,
      oh: h,
      baseline: l.baseline,
      text: l.text,
      original: l.text,
      source: "existing" as const,
      size: l.size,
      color: "#101828",
      font: l.font,
      bold: l.bold,
      italic: l.italic,
      underline: false,
      strike: false,
      align: "left" as const,
    };
  });
}



export interface TextLine {
  id: string;
  x: number; // display space, top-left origin, scale 1
  y: number; // top of the text box
  w: number;
  h: number;
  baseline: number; // display-space baseline y
  text: string;
  size: number;
  font: "Helvetica" | "Times" | "Courier";
  bold: boolean;
  italic: boolean;
}

function classify(fontName: string) {
  const n = (fontName || "").toLowerCase();
  const bold = /bold|black|heavy|semibold|-bd/.test(n);
  const italic = /italic|oblique|-it/.test(n);
  const font: TextLine["font"] = /courier|mono/.test(n)
    ? "Courier"
    : /times|georgia|garamond|roman|minion|cambria|palatino|baskerville/.test(n)
      ? "Times"
      : "Helvetica";

  return { bold, italic, font };
}

/** The PDF's own font name (e.g. "Helvetica-Bold"), when pdf.js has resolved it. */
function realFontName(page: pdfjs.PDFPageProxy, id: string) {
  try {
    const f = (page.commonObjs as any).get(id);
    return String(f?.name ?? id ?? "");
  } catch {
    return String(id ?? "");
  }
}

/** Extract editable text lines from a page, in display space (rotation applied). */
export async function extractLines(
  doc: pdfjs.PDFDocumentProxy,
  pageIndex: number,
  rotation: number,
): Promise<TextLine[]> {
  const page = await doc.getPage(pageIndex + 1);
  const viewport = page.getViewport({ scale: 1, rotation });
  const content = await page.getTextContent();
  const styles = content.styles as Record<string, { fontFamily?: string }>;

  type Raw = {
    x: number;
    baseline: number;
    w: number;
    size: number;
    text: string;
    fontName: string;
  };
  const raw: Raw[] = [];

  for (const it of content.items as any[]) {
    if (!("str" in it) || !it.str || !it.str.trim()) continue;
    const t = affineTransform(viewport.transform, it.transform);
    const size = Math.hypot(t[2] ?? 0, t[3] ?? 1);
    const skewed = Math.abs(t[1] ?? 0) > 0.01 || Math.abs(t[2] ?? 0) > 0.01;
    if (skewed) continue; // skip rotated / vertical text
    raw.push({
      x: t[4] ?? 0,
      baseline: t[5] ?? 0,
      w: it.width ?? 0,
      size,
      text: it.str,
      fontName: `${realFontName(page, it.fontName)} ${styles?.[it.fontName]?.fontFamily ?? ""}`,
    });
  }

  raw.sort((a, b) => a.baseline - b.baseline || a.x - b.x);

  const lines: TextLine[] = [];
  let group: Raw[] = [];

  const flush = () => {
    if (!group.length) return;
    const first = group[0]!;
    const size = Math.max(...group.map((g) => g.size));
    let text = "";
    let prev: Raw | null = null;
    for (const g of group) {
      if (prev) {
        const gap = g.x - (prev.x + prev.w);
        if (gap > size * 0.18 && !/\s$/.test(text) && !/^\s/.test(g.text))
          text += " ";
      }
      text += g.text;
      prev = g;
    }
    const last = group[group.length - 1]!;
    const w = Math.max(12, last.x + last.w - first.x);
    const meta = classify(first.fontName);
    if (text.trim())
      lines.push({
        id: `${first.x.toFixed(1)}-${first.baseline.toFixed(1)}`,
        x: first.x,
        y: first.baseline - size,
        w,
        h: size * 1.25,
        baseline: first.baseline,
        text,
        size: Math.round(size * 10) / 10,
        ...meta,
      });
    group = [];
  };

  for (const r of raw) {
    const last = group[group.length - 1];
    if (!last) {
      group.push(r);
      continue;
    }
    const sameLine = Math.abs(r.baseline - last.baseline) <= Math.max(1.5, last.size * 0.3);
    const gap = r.x - (last.x + last.w);
    if (sameLine && gap < last.size * 1.6 && gap > -last.size * 2) group.push(r);
    else {
      flush();
      group.push(r);
    }
  }
  flush();

  return lines;
}
