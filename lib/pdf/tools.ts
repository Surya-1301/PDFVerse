import {
  applyGrayscale,
  baseName,
  bytesOf,
  canvasToJpeg,
  canvasToPng,
  degrees,
  extractText,
  getPdfJsDoc,
  hexToRgb,
  loadPdf,
  parseRanges,
  PDFDocument,
  rasterizePdf,
  renderPageToCanvas,
  rgb,
  savePdf,
  StandardFonts,
  textToPdf,
  zipFiles,
  type ToolFile,
} from "./toolkit";

export type Field = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "checkbox" | "password" | "color" | "file";
  default?: string | number | boolean;
  placeholder?: string;
  help?: string;
  accept?: string;
  options?: Array<{ value: string; label: string }>;
};

export type ToolValues = Record<string, string | number | boolean>;

export type ToolContext = {
  files: File[];
  values: ToolValues;
  extraFiles: Record<string, File | null>;
  progress: (message: string) => void;
};

export type ToolImpl = {
  accept: string;
  multiple?: boolean;
  uploadLabel?: string;
  actionLabel?: string;
  fields?: Field[];
  run: (ctx: ToolContext) => Promise<ToolFile[]>;
};

const str = (ctx: ToolContext, name: string, fallback = "") => {
  const v = ctx.values[name];
  return v === undefined || v === null ? fallback : String(v);
};
const num = (ctx: ToolContext, name: string, fallback = 0) => {
  const v = Number(ctx.values[name]);
  return Number.isFinite(v) ? v : fallback;
};
const bool = (ctx: ToolContext, name: string) => Boolean(ctx.values[name]);

const first = (ctx: ToolContext) => {
  const file = ctx.files[0];
  if (!file) throw new Error("Please choose a file first.");
  return file;
};

const PDF = "application/pdf";
const IMAGES = "image/png,image/jpeg,image/webp";

const POSITIONS: Array<{ value: string; label: string }> = [
  { value: "bottom-center", label: "Bottom center" },
  { value: "bottom-right", label: "Bottom right" },
  { value: "bottom-left", label: "Bottom left" },
  { value: "top-center", label: "Top center" },
  { value: "top-right", label: "Top right" },
  { value: "top-left", label: "Top left" },
];

function placeXY(
  position: string,
  pageW: number,
  pageH: number,
  textW: number,
  size: number,
  margin = 36,
) {
  const [vertical, horizontal] = position.split("-");
  const y = vertical === "top" ? pageH - margin - size : margin;
  const x =
    horizontal === "left"
      ? margin
      : horizontal === "right"
        ? pageW - margin - textW
        : (pageW - textW) / 2;
  return { x, y };
}

async function embedImage(doc: PDFDocument, file: File | Blob) {
  const bytes = await bytesOf(file);
  const type = (file as File).type || "";
  if (type.includes("png")) return doc.embedPng(bytes);
  if (type.includes("jpeg") || type.includes("jpg")) return doc.embedJpg(bytes);
  // Convert anything else (webp, gif…) through a canvas.
  const bitmap = await createImageBitmap(file as Blob);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0);
  const png = await canvasToPng(canvas);
  return doc.embedPng(await bytesOf(png));
}

async function imagesToPdf(
  files: File[],
  opts: { pageSize: string; margin: number; grayscale?: boolean; progress: (m: string) => void },
): Promise<PDFDocument> {
  const doc = await PDFDocument.create();
  for (const [index, file] of files.entries()) {
    opts.progress(`Adding image ${index + 1} of ${files.length}…`);
    let source: File | Blob = file;
    if (opts.grayscale) {
      const bitmap = await createImageBitmap(file);
      const canvas = document.createElement("canvas");
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      canvas.getContext("2d")?.drawImage(bitmap, 0, 0);
      applyGrayscale(canvas, 1.35);
      source = await canvasToJpeg(canvas, 0.9);
      Object.defineProperty(source, "type", { value: "image/jpeg" });
    }
    const image = await embedImage(doc, source);
    const a4 = { w: 595.28, h: 841.89 };
    const size =
      opts.pageSize === "fit"
        ? { w: image.width, h: image.height }
        : image.width > image.height
          ? { w: a4.h, h: a4.w }
          : a4;
    const page = doc.addPage([size.w, size.h]);
    const maxW = size.w - opts.margin * 2;
    const maxH = size.h - opts.margin * 2;
    const scale = Math.min(maxW / image.width, maxH / image.height, 1);
    const w = image.width * scale;
    const h = image.height * scale;
    page.drawImage(image, { x: (size.w - w) / 2, y: (size.h - h) / 2, width: w, height: h });
  }
  return doc;
}

async function stampText(
  ctx: ToolContext,
  opts: {
    text: (page: number, total: number, name: string) => string;
    size: number;
    color: string;
    opacity: number;
    position: string;
    rotate?: number;
    pagesInput?: string;
    file?: File;
  },
) {
  const file = opts.file ?? first(ctx);
  const doc = await loadPdf(file);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const pages = doc.getPages();
  const targets = new Set(parseRanges(opts.pagesInput ?? "", pages.length));
  pages.forEach((page, index) => {
    if (!targets.has(index)) return;
    const text = opts.text(index + 1, pages.length, baseName(file.name));
    if (!text) return;
    const { width, height } = page.getSize();
    const textW = font.widthOfTextAtSize(text, opts.size);
    const { x, y } = placeXY(opts.position, width, height, textW, opts.size);
    page.drawText(text, {
      x: opts.rotate ? width / 2 - textW / 2 : x,
      y: opts.rotate ? height / 2 : y,
      size: opts.size,
      font,
      color: hexToRgb(opts.color),
      opacity: opts.opacity,
      ...(opts.rotate ? { rotate: degrees(opts.rotate) } : {}),
    });
  });
  return { doc, file };
}

const watermarkFields: Field[] = [
  { name: "text", label: "Watermark text", type: "text", default: "CONFIDENTIAL" },
  { name: "size", label: "Font size", type: "number", default: 60 },
  { name: "color", label: "Colour", type: "color", default: "#7c3aed" },
  { name: "opacity", label: "Opacity (0-1)", type: "number", default: 0.18 },
  { name: "angle", label: "Rotation (degrees)", type: "number", default: 45 },
  { name: "pages", label: "Pages", type: "text", placeholder: "all, or 1-3,7", default: "" },
];

const headerFooterFields: Field[] = [
  { name: "header", label: "Header text", type: "text", default: "" },
  { name: "footer", label: "Footer text", type: "text", default: "" },
  { name: "size", label: "Font size", type: "number", default: 10 },
  { name: "color", label: "Colour", type: "color", default: "#475569" },
  { name: "numbers", label: "Append page numbers to footer", type: "checkbox", default: true },
  { name: "date", label: "Append today's date to header", type: "checkbox", default: false },
  { name: "filename", label: "Append file name to header", type: "checkbox", default: false },
];

async function applyHeaderFooter(ctx: ToolContext, file: File): Promise<ToolFile> {
  const doc = await loadPdf(file);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const size = num(ctx, "size", 10);
  const color = hexToRgb(str(ctx, "color", "#475569"));
  const pages = doc.getPages();
  pages.forEach((page, index) => {
    const { width, height } = page.getSize();
    const headerParts = [str(ctx, "header")];
    if (bool(ctx, "date")) headerParts.push(new Date().toLocaleDateString());
    if (bool(ctx, "filename")) headerParts.push(baseName(file.name));
    const header = headerParts.filter(Boolean).join("  •  ");
    const footerParts = [str(ctx, "footer")];
    if (bool(ctx, "numbers")) footerParts.push(`Page ${index + 1} of ${pages.length}`);
    const footer = footerParts.filter(Boolean).join("  •  ");
    if (header) {
      const w = font.widthOfTextAtSize(header, size);
      page.drawText(header, { x: (width - w) / 2, y: height - 28, size, font, color });
    }
    if (footer) {
      const w = font.widthOfTextAtSize(footer, size);
      page.drawText(footer, { x: (width - w) / 2, y: 20, size, font, color });
    }
  });
  return savePdf(doc, `${baseName(file.name)}-header-footer.pdf`);
}

async function compressOne(ctx: ToolContext, file: File): Promise<ToolFile> {
  const level = str(ctx, "level", "medium");
  const presets: Record<string, { scale: number; quality: number }> = {
    low: { scale: 1.6, quality: 0.86 },
    medium: { scale: 1.2, quality: 0.7 },
    high: { scale: 0.9, quality: 0.5 },
  };
  const preset = presets[level] ?? presets["medium"]!;
  const grayscale = bool(ctx, "grayscale");
  const doc = await rasterizePdf(file, { ...preset, grayscale });
  const out = await savePdf(doc, `${baseName(file.name)}-compressed.pdf`);
  if (out.blob.size >= file.size && !grayscale) {
    // Rasterising made it bigger: fall back to a clean structural re-save.
    const clean = await loadPdf(file);
    return savePdf(clean, `${baseName(file.name)}-compressed.pdf`);
  }
  return out;
}

async function repairOne(file: File): Promise<ToolFile> {
  try {
    const doc = await loadPdf(file);
    const out = await PDFDocument.create();
    const copied = await out.copyPages(doc, doc.getPageIndices());
    copied.forEach((page) => out.addPage(page));
    if (out.getPageCount() > 0) return savePdf(out, `${baseName(file.name)}-repaired.pdf`);
  } catch {
    /* fall through to rasterised rebuild */
  }
  const doc = await rasterizePdf(file, { scale: 1.5, quality: 0.85 });
  return savePdf(doc, `${baseName(file.name)}-repaired.pdf`);
}

async function protectOne(
  file: File,
  userPassword: string,
  ownerPassword: string,
): Promise<ToolFile> {
  if (!userPassword) {
    throw new Error("A user password is required.");
  }
  throw new Error(
    "PDF password protection is not supported by the current PDF library configuration.",
  );
}

async function unlockOne(file: File, password: string) {
  const doc = await loadPdf(file, password);
  const out = await PDFDocument.create();
  const copied = await out.copyPages(doc, doc.getPageIndices());
  copied.forEach((page) => out.addPage(page));
  return savePdf(out, `${baseName(file.name)}-unlocked.pdf`);
}

async function batch(
  ctx: ToolContext,
  worker: (file: File) => Promise<ToolFile>,
  zipName: string,
): Promise<ToolFile[]> {
  if (ctx.files.length === 0) throw new Error("Please choose at least one file.");
  const out: ToolFile[] = [];
  for (const [index, file] of ctx.files.entries()) {
    ctx.progress(`Processing ${index + 1} of ${ctx.files.length}: ${file.name}`);
    out.push(await worker(file));
  }
  if (out.length === 1) return out;
  return [await zipFiles(out, zipName)];
}

export const toolImpls: Record<string, ToolImpl> = {
  /* ------------------------------------------------------------------ organize */
  merge: {
    accept: PDF,
    multiple: true,
    uploadLabel: "Select two or more PDFs",
    run: async (ctx) => {
      if (ctx.files.length < 2) throw new Error("Choose at least two PDFs to merge.");
      const out = await PDFDocument.create();
      for (const [index, file] of ctx.files.entries()) {
        ctx.progress(`Merging ${index + 1} of ${ctx.files.length}…`);
        const doc = await loadPdf(file);
        const pages = await out.copyPages(doc, doc.getPageIndices());
        pages.forEach((page) => out.addPage(page));
      }
      return [await savePdf(out, "merged.pdf")];
    },
  },

  split: {
    accept: PDF,
    fields: [
      {
        name: "mode",
        label: "Split mode",
        type: "select",
        default: "each",
        options: [
          { value: "each", label: "One file per page" },
          { value: "ranges", label: "Custom ranges" },
          { value: "every", label: "Every N pages" },
        ],
      },
      {
        name: "ranges",
        label: "Ranges (for custom mode)",
        type: "text",
        placeholder: "1-3, 4-6, 7-",
        default: "",
      },
      { name: "every", label: "Pages per file (for every-N)", type: "number", default: 2 },
    ],
    run: async (ctx) => {
      const file = first(ctx);
      const src = await loadPdf(file);
      const total = src.getPageCount();
      const mode = str(ctx, "mode", "each");
      const groups: number[][] = [];
      if (mode === "each") {
        for (let i = 0; i < total; i += 1) groups.push([i]);
      } else if (mode === "every") {
        const n = Math.max(1, num(ctx, "every", 2));
        for (let i = 0; i < total; i += n) {
          groups.push(Array.from({ length: Math.min(n, total - i) }, (_, k) => i + k));
        }
      } else {
        const chunks = str(ctx, "ranges").split(",").map((c) => c.trim()).filter(Boolean);
        if (chunks.length === 0) throw new Error("Enter at least one range, e.g. 1-3, 4-6.");
        for (const chunk of chunks) groups.push(parseRanges(chunk, total));
      }
      const parts: ToolFile[] = [];
      for (const [index, group] of groups.entries()) {
        if (group.length === 0) continue;
        ctx.progress(`Writing part ${index + 1} of ${groups.length}…`);
        const out = await PDFDocument.create();
        const pages = await out.copyPages(src, group);
        pages.forEach((page) => out.addPage(page));
        parts.push(await savePdf(out, `${baseName(file.name)}-part-${index + 1}.pdf`));
      }
      if (parts.length === 1) return parts;
      return [await zipFiles(parts, `${baseName(file.name)}-split.zip`)];
    },
  },

  "remove-pages": {
    accept: PDF,
    fields: [
      { name: "pages", label: "Pages to remove", type: "text", placeholder: "2,5-7", default: "" },
    ],
    run: async (ctx) => {
      const file = first(ctx);
      const src = await loadPdf(file);
      const total = src.getPageCount();
      const remove = new Set(parseRanges(str(ctx, "pages"), total));
      if (remove.size === 0) throw new Error("Enter which pages to remove, e.g. 2,5-7.");
      const keep = Array.from({ length: total }, (_, i) => i).filter((i) => !remove.has(i));
      if (keep.length === 0) throw new Error("You cannot remove every page.");
      const out = await PDFDocument.create();
      const pages = await out.copyPages(src, keep);
      pages.forEach((page) => out.addPage(page));
      return [await savePdf(out, `${baseName(file.name)}-pages-removed.pdf`)];
    },
  },

  "extract-pages": {
    accept: PDF,
    fields: [
      { name: "pages", label: "Pages to extract", type: "text", placeholder: "1-3,8", default: "" },
      { name: "separate", label: "Save each page as its own PDF", type: "checkbox", default: false },
    ],
    run: async (ctx) => {
      const file = first(ctx);
      const src = await loadPdf(file);
      const indexes = parseRanges(str(ctx, "pages"), src.getPageCount());
      if (indexes.length === 0) throw new Error("Enter which pages to extract, e.g. 1-3,8.");
      if (bool(ctx, "separate")) {
        const parts: ToolFile[] = [];
        for (const index of indexes) {
          const out = await PDFDocument.create();
          const [page] = await out.copyPages(src, [index]);
          if (page) out.addPage(page);
          parts.push(await savePdf(out, `${baseName(file.name)}-page-${index + 1}.pdf`));
        }
        return parts.length === 1
          ? parts
          : [await zipFiles(parts, `${baseName(file.name)}-pages.zip`)];
      }
      const out = await PDFDocument.create();
      const pages = await out.copyPages(src, indexes);
      pages.forEach((page) => out.addPage(page));
      return [await savePdf(out, `${baseName(file.name)}-extracted.pdf`)];
    },
  },

  organize: {
    accept: PDF,
    fields: [
      {
        name: "order",
        label: "New page order",
        type: "text",
        placeholder: "3,1,2,4-",
        default: "",
        help: "List pages in the order you want them. Ranges are allowed.",
      },
      { name: "reverse", label: "Reverse the whole document instead", type: "checkbox", default: false },
    ],
    run: async (ctx) => {
      const file = first(ctx);
      const src = await loadPdf(file);
      const total = src.getPageCount();
      let order: number[];
      if (bool(ctx, "reverse")) {
        order = Array.from({ length: total }, (_, i) => total - 1 - i);
      } else {
        const raw = str(ctx, "order").trim();
        if (!raw) throw new Error("Enter the new page order, e.g. 3,1,2.");
        order = [];
        for (const chunk of raw.split(/[,\s]+/).filter(Boolean)) {
          for (const index of parseRanges(chunk, total)) order.push(index);
        }
      }
      if (order.length === 0) throw new Error("That order did not match any pages.");
      const out = await PDFDocument.create();
      const pages = await out.copyPages(src, order);
      pages.forEach((page) => out.addPage(page));
      return [await savePdf(out, `${baseName(file.name)}-organized.pdf`)];
    },
  },

  "add-pages": {
    accept: PDF,
    fields: [
      { name: "source", label: "PDF to insert", type: "file", accept: PDF },
      {
        name: "at",
        label: "Insert after page (0 = beginning)",
        type: "number",
        default: 0,
      },
      { name: "which", label: "Pages from that PDF", type: "text", placeholder: "all", default: "" },
    ],
    run: async (ctx) => {
      const file = first(ctx);
      const donorFile = ctx.extraFiles["source"];
      if (!donorFile) throw new Error("Choose the PDF whose pages you want to insert.");
      const base = await loadPdf(file);
      const donor = await loadPdf(donorFile);
      const indexes = parseRanges(str(ctx, "which"), donor.getPageCount());
      const at = Math.max(0, Math.min(num(ctx, "at", 0), base.getPageCount()));
      const copied = await base.copyPages(donor, indexes);
      copied.forEach((page, offset) => base.insertPage(at + offset, page));
      return [await savePdf(base, `${baseName(file.name)}-with-added-pages.pdf`)];
    },
  },

  rotate: {
    accept: PDF,
    fields: [
      {
        name: "angle",
        label: "Rotation",
        type: "select",
        default: "90",
        options: [
          { value: "90", label: "90° clockwise" },
          { value: "180", label: "180°" },
          { value: "270", label: "90° counter-clockwise" },
        ],
      },
      { name: "pages", label: "Pages", type: "text", placeholder: "all, or 1-3", default: "" },
    ],
    run: async (ctx) => {
      const file = first(ctx);
      const doc = await loadPdf(file);
      const pages = doc.getPages();
      const targets = new Set(parseRanges(str(ctx, "pages"), pages.length));
      const angle = num(ctx, "angle", 90);
      pages.forEach((page, index) => {
        if (!targets.has(index)) return;
        page.setRotation(degrees((page.getRotation().angle + angle) % 360));
      });
      return [await savePdf(doc, `${baseName(file.name)}-rotated.pdf`)];
    },
  },

  "add-page-numbers": {
    accept: PDF,
    fields: [
      {
        name: "format",
        label: "Format",
        type: "select",
        default: "n-of-total",
        options: [
          { value: "n", label: "1" },
          { value: "n-of-total", label: "1 of 10" },
          { value: "page-n", label: "Page 1" },
        ],
      },
      { name: "position", label: "Position", type: "select", default: "bottom-center", options: POSITIONS },
      { name: "size", label: "Font size", type: "number", default: 11 },
      { name: "color", label: "Colour", type: "color", default: "#334155" },
      { name: "start", label: "Start numbering at", type: "number", default: 1 },
      { name: "pages", label: "Pages", type: "text", placeholder: "all", default: "" },
    ],
    run: async (ctx) => {
      const format = str(ctx, "format", "n-of-total");
      const start = num(ctx, "start", 1);
      const { doc, file } = await stampText(ctx, {
        text: (page, total) => {
          const n = page + start - 1;
          if (format === "n") return String(n);
          if (format === "page-n") return `Page ${n}`;
          return `${n} of ${total}`;
        },
        size: num(ctx, "size", 11),
        color: str(ctx, "color", "#334155"),
        opacity: 1,
        position: str(ctx, "position", "bottom-center"),
        pagesInput: str(ctx, "pages"),
      });
      return [await savePdf(doc, `${baseName(file.name)}-numbered.pdf`)];
    },
  },

  compare: {
    accept: PDF,
    fields: [{ name: "other", label: "Second PDF", type: "file", accept: PDF }],
    run: async (ctx) => {
      const left = first(ctx);
      const right = ctx.extraFiles["other"];
      if (!right) throw new Error("Choose a second PDF to compare against.");
      ctx.progress("Reading both documents…");
      const a = await extractText(left);
      const b = await extractText(right);
      const blocks: Array<{ text: string; bold?: boolean; size?: number }> = [
        { text: `A: ${left.name} (${a.length} pages)`, size: 11 },
        { text: `B: ${right.name} (${b.length} pages)`, size: 11 },
        { text: "" },
      ];
      const pages = Math.max(a.length, b.length);
      let differences = 0;
      for (let i = 0; i < pages; i += 1) {
        const la = a[i]?.lines ?? [];
        const lb = b[i]?.lines ?? [];
        const rows = Math.max(la.length, lb.length);
        const pageDiffs: string[] = [];
        for (let r = 0; r < rows; r += 1) {
          const x = la[r] ?? "";
          const y = lb[r] ?? "";
          if (x !== y) {
            pageDiffs.push(`- A: ${x || "(missing)"}`);
            pageDiffs.push(`+ B: ${y || "(missing)"}`);
          }
        }
        differences += pageDiffs.length / 2;
        blocks.push({ text: `Page ${i + 1} — ${pageDiffs.length ? `${pageDiffs.length / 2} changed lines` : "identical"}`, bold: true, size: 13 });
        for (const line of pageDiffs.slice(0, 60)) blocks.push({ text: line, size: 10 });
        blocks.push({ text: "" });
      }
      blocks.splice(2, 0, { text: `Total changed lines: ${differences}`, bold: true });
      const doc = await textToPdf(blocks, { title: "PDF comparison report" });
      return [await savePdf(doc, "comparison-report.pdf")];
    },
  },

  /* ---------------------------------------------------------------------- edit */
  watermark: {
    accept: PDF,
    fields: watermarkFields,
    run: async (ctx) => {
      const text = str(ctx, "text", "CONFIDENTIAL");
      const { doc, file } = await stampText(ctx, {
        text: () => text,
        size: num(ctx, "size", 60),
        color: str(ctx, "color", "#7c3aed"),
        opacity: num(ctx, "opacity", 0.18),
        position: "center",
        rotate: num(ctx, "angle", 45),
        pagesInput: str(ctx, "pages"),
      });
      return [await savePdf(doc, `${baseName(file.name)}-watermarked.pdf`)];
    },
  },

  "image-watermark": {
    accept: PDF,
    fields: [
      { name: "image", label: "Watermark image", type: "file", accept: IMAGES },
      { name: "scale", label: "Width (% of page)", type: "number", default: 40 },
      { name: "opacity", label: "Opacity (0-1)", type: "number", default: 0.25 },
      { name: "position", label: "Position", type: "select", default: "center", options: [{ value: "center", label: "Center" }, ...POSITIONS] },
      { name: "pages", label: "Pages", type: "text", placeholder: "all", default: "" },
    ],
    run: async (ctx) => {
      const file = first(ctx);
      const imageFile = ctx.extraFiles["image"];
      if (!imageFile) throw new Error("Choose the image to stamp onto the PDF.");
      const doc = await loadPdf(file);
      const image = await embedImage(doc, imageFile);
      const pages = doc.getPages();
      const targets = new Set(parseRanges(str(ctx, "pages"), pages.length));
      const position = str(ctx, "position", "center");
      pages.forEach((page, index) => {
        if (!targets.has(index)) return;
        const { width, height } = page.getSize();
        const w = (width * Math.max(5, num(ctx, "scale", 40))) / 100;
        const h = (image.height / image.width) * w;
        const spot =
          position === "center"
            ? { x: (width - w) / 2, y: (height - h) / 2 }
            : placeXY(position, width, height, w, h);
        page.drawImage(image, {
          x: spot.x,
          y: spot.y,
          width: w,
          height: h,
          opacity: num(ctx, "opacity", 0.25),
        });
      });
      return [await savePdf(doc, `${baseName(file.name)}-watermarked.pdf`)];
    },
  },

  crop: {
    accept: PDF,
    fields: [
      { name: "top", label: "Top margin (%)", type: "number", default: 5 },
      { name: "bottom", label: "Bottom margin (%)", type: "number", default: 5 },
      { name: "left", label: "Left margin (%)", type: "number", default: 5 },
      { name: "right", label: "Right margin (%)", type: "number", default: 5 },
      { name: "pages", label: "Pages", type: "text", placeholder: "all", default: "" },
    ],
    run: async (ctx) => {
      const file = first(ctx);
      const doc = await loadPdf(file);
      const pages = doc.getPages();
      const targets = new Set(parseRanges(str(ctx, "pages"), pages.length));
      pages.forEach((page, index) => {
        if (!targets.has(index)) return;
        const { width, height } = page.getSize();
        const left = (width * num(ctx, "left", 0)) / 100;
        const right = (width * num(ctx, "right", 0)) / 100;
        const top = (height * num(ctx, "top", 0)) / 100;
        const bottom = (height * num(ctx, "bottom", 0)) / 100;
        const w = Math.max(20, width - left - right);
        const h = Math.max(20, height - top - bottom);
        page.setCropBox(left, bottom, w, h);
        page.setMediaBox(left, bottom, w, h);
      });
      return [await savePdf(doc, `${baseName(file.name)}-cropped.pdf`)];
    },
  },

  forms: {
    accept: PDF,
    fields: [
      {
        name: "values",
        label: "Field values",
        type: "textarea",
        placeholder: "FieldName = value\nAnotherField = value",
        default: "",
        help: "Leave empty to only inspect the form. One field per line.",
      },
      { name: "flatten", label: "Flatten the form (make values permanent)", type: "checkbox", default: false },
    ],
    run: async (ctx) => {
      const file = first(ctx);
      const doc = await loadPdf(file);
      const form = doc.getForm();
      const fields = form.getFields();
      const raw = str(ctx, "values").trim();
      if (!raw) {
        const names = fields.map((f) => `${f.getName()}  (${f.constructor.name.replace("PDF", "")})`);
        const report = await textToPdf(
          names.length
            ? names.map((n) => ({ text: n, size: 11 }))
            : [{ text: "This PDF has no interactive form fields.", size: 12 }],
          { title: `Form fields in ${file.name}` },
        );
        return [await savePdf(report, `${baseName(file.name)}-form-fields.pdf`)];
      }
      for (const line of raw.split("\n")) {
        const [name, ...rest] = line.split("=");
        if (!name || rest.length === 0) continue;
        const value = rest.join("=").trim();
        const key = name.trim();
        try {
          const field = form.getFieldMaybe(key);
          if (!field) continue;
          const kind = field.constructor.name;
          if (kind.includes("TextField")) form.getTextField(key).setText(value);
          else if (kind.includes("CheckBox")) {
            const cb = form.getCheckBox(key);
            if (/^(1|true|yes|on|x)$/i.test(value)) cb.check();
            else cb.uncheck();
          } else if (kind.includes("Dropdown")) form.getDropdown(key).select(value);
          else if (kind.includes("OptionList")) form.getOptionList(key).select(value);
          else if (kind.includes("RadioGroup")) form.getRadioGroup(key).select(value);
        } catch {
          /* skip fields that reject the value */
        }
      }
      if (bool(ctx, "flatten")) form.flatten();
      return [await savePdf(doc, `${baseName(file.name)}-filled.pdf`)];
    },
  },

  "header-footer": {
    accept: PDF,
    fields: headerFooterFields,
    run: async (ctx) => [await applyHeaderFooter(ctx, first(ctx))],
  },

  compress: {
    accept: PDF,
    fields: [
      {
        name: "level",
        label: "Compression level",
        type: "select",
        default: "medium",
        options: [
          { value: "low", label: "Light — best quality" },
          { value: "medium", label: "Recommended" },
          { value: "high", label: "Strong — smallest file" },
        ],
      },
      { name: "grayscale", label: "Convert to grayscale", type: "checkbox", default: false },
    ],
    run: async (ctx) => {
      const file = first(ctx);
      ctx.progress("Compressing…");
      return [await compressOne(ctx, file)];
    },
  },

  sign: {
    accept: PDF,
    fields: [
      { name: "image", label: "Signature image (optional)", type: "file", accept: IMAGES },
      { name: "text", label: "Or type your signature", type: "text", default: "" },
      { name: "page", label: "Page (0 = last page)", type: "number", default: 0 },
      { name: "position", label: "Position", type: "select", default: "bottom-right", options: POSITIONS },
      { name: "size", label: "Signature size", type: "number", default: 28 },
    ],
    run: async (ctx) => {
      const file = first(ctx);
      const doc = await loadPdf(file);
      const pages = doc.getPages();
      const wanted = num(ctx, "page", 0);
      const page = pages[wanted > 0 ? Math.min(wanted, pages.length) - 1 : pages.length - 1];
      if (!page) throw new Error("This PDF has no pages.");
      const { width, height } = page.getSize();
      const size = num(ctx, "size", 28);
      const imageFile = ctx.extraFiles["image"];
      if (imageFile) {
        const image = await embedImage(doc, imageFile);
        const w = size * 6;
        const h = (image.height / image.width) * w;
        const spot = placeXY(str(ctx, "position", "bottom-right"), width, height, w, h);
        page.drawImage(image, { x: spot.x, y: spot.y, width: w, height: h });
      } else {
        const text = str(ctx, "text").trim();
        if (!text) throw new Error("Upload a signature image or type your name.");
        const font = await doc.embedFont(StandardFonts.HelveticaOblique);
        const w = font.widthOfTextAtSize(text, size);
        const spot = placeXY(str(ctx, "position", "bottom-right"), width, height, w, size);
        page.drawText(text, { x: spot.x, y: spot.y, size, font, color: rgb(0.05, 0.05, 0.35) });
      }
      return [await savePdf(doc, `${baseName(file.name)}-signed.pdf`)];
    },
  },

  repair: {
    accept: PDF,
    run: async (ctx) => {
      ctx.progress("Rebuilding the document…");
      return [await repairOne(first(ctx))];
    },
  },

  "metadata-editor": {
    accept: PDF,
    fields: [
      { name: "title", label: "Title", type: "text", default: "" },
      { name: "author", label: "Author", type: "text", default: "" },
      { name: "subject", label: "Subject", type: "text", default: "" },
      { name: "keywords", label: "Keywords (comma separated)", type: "text", default: "" },
      { name: "creator", label: "Creator", type: "text", default: "" },
      { name: "clear", label: "Clear all metadata instead", type: "checkbox", default: false },
    ],
    run: async (ctx) => {
      const file = first(ctx);
      const doc = await loadPdf(file);
      if (bool(ctx, "clear")) {
        doc.setTitle("");
        doc.setAuthor("");
        doc.setSubject("");
        doc.setKeywords([]);
        doc.setCreator("");
        doc.setProducer("");
      } else {
        if (str(ctx, "title")) doc.setTitle(str(ctx, "title"));
        if (str(ctx, "author")) doc.setAuthor(str(ctx, "author"));
        if (str(ctx, "subject")) doc.setSubject(str(ctx, "subject"));
        if (str(ctx, "keywords"))
          doc.setKeywords(str(ctx, "keywords").split(",").map((k) => k.trim()).filter(Boolean));
        if (str(ctx, "creator")) doc.setCreator(str(ctx, "creator"));
      }
      doc.setModificationDate(new Date());
      return [await savePdf(doc, `${baseName(file.name)}-metadata.pdf`)];
    },
  },

  /* ------------------------------------------------------------------ security */
  protect: {
    accept: PDF,
    fields: [
      { name: "password", label: "Password", type: "password", default: "" },
      { name: "owner", label: "Owner password (optional)", type: "password", default: "" },
    ],
    run: async (ctx) => {
      const password = str(ctx, "password");
      if (!password) throw new Error("Enter a password.");
      return [await protectOne(first(ctx), password, str(ctx, "owner"))];
    },
  },

  unlock: {
    accept: PDF,
    fields: [{ name: "password", label: "Current password", type: "password", default: "" }],
    run: async (ctx) => [await unlockOne(first(ctx), str(ctx, "password"))],
  },

  redact: {
    accept: PDF,
    fields: [
      {
        name: "terms",
        label: "Words or phrases to redact",
        type: "textarea",
        placeholder: "john@example.com\nAccount 1234",
        default: "",
      },
      { name: "caseSensitive", label: "Match case", type: "checkbox", default: false },
    ],
    run: async (ctx) => {
      const file = first(ctx);
      const terms = str(ctx, "terms")
        .split("\n")
        .map((t) => t.trim())
        .filter(Boolean);
      if (terms.length === 0) throw new Error("Enter at least one word or phrase to redact.");
      const caseSensitive = bool(ctx, "caseSensitive");
      const src = await getPdfJsDoc(file);
      const out = await PDFDocument.create();
      for (let i = 1; i <= src.numPages; i += 1) {
        ctx.progress(`Redacting page ${i} of ${src.numPages}…`);
        const page = await src.getPage(i);
        const scale = 2;
        const canvas = await renderPageToCanvas(page, scale);
        const ctx2d = canvas.getContext("2d");
        const content = await page.getTextContent();
        const viewport = page.getViewport({ scale });
        if (ctx2d) {
          ctx2d.fillStyle = "#000000";
          for (const raw of content.items) {
            const item = raw as { str: string; width: number; height: number; transform: number[] };
            if (!item.str) continue;
            const haystack = caseSensitive ? item.str : item.str.toLowerCase();
            const hit = terms.some((term) =>
              haystack.includes(caseSensitive ? term : term.toLowerCase()),
            );
            if (!hit) continue;
            const x = (item.transform[4] ?? 0) * scale;
            const y = viewport.height - (item.transform[5] ?? 0) * scale;
            const w = (item.width || 10) * scale;
            const h = Math.max((item.height || 10) * scale, 8);
            ctx2d.fillRect(x - 1, y - h, w + 2, h + 3);
          }
        }
        const jpeg = await canvasToJpeg(canvas, 0.92);
        const image = await out.embedJpg(await bytesOf(jpeg));
        const base = page.getViewport({ scale: 1 });
        const newPage = out.addPage([base.width, base.height]);
        newPage.drawImage(image, { x: 0, y: 0, width: base.width, height: base.height });
      }
      return [await savePdf(out, `${baseName(file.name)}-redacted.pdf`)];
    },
  },

  /* -------------------------------------------------------------- convert → PDF */
  "jpg-to-pdf": {
    accept: IMAGES,
    multiple: true,
    uploadLabel: "Select images",
    fields: [
      {
        name: "pageSize",
        label: "Page size",
        type: "select",
        default: "a4",
        options: [
          { value: "a4", label: "A4" },
          { value: "fit", label: "Fit to image" },
        ],
      },
      { name: "margin", label: "Margin (pt)", type: "number", default: 24 },
    ],
    run: async (ctx) => {
      if (ctx.files.length === 0) throw new Error("Choose at least one image.");
      const doc = await imagesToPdf(ctx.files, {
        pageSize: str(ctx, "pageSize", "a4"),
        margin: num(ctx, "margin", 24),
        progress: ctx.progress,
      });
      return [await savePdf(doc, "images.pdf")];
    },
  },

  "scan-to-pdf": {
    accept: IMAGES,
    multiple: true,
    uploadLabel: "Select scanned images",
    fields: [
      { name: "grayscale", label: "Clean up as a grayscale scan", type: "checkbox", default: true },
      { name: "margin", label: "Margin (pt)", type: "number", default: 0 },
    ],
    run: async (ctx) => {
      if (ctx.files.length === 0) throw new Error("Choose at least one scan.");
      const doc = await imagesToPdf(ctx.files, {
        pageSize: "a4",
        margin: num(ctx, "margin", 0),
        grayscale: bool(ctx, "grayscale"),
        progress: ctx.progress,
      });
      return [await savePdf(doc, "scan.pdf")];
    },
  },

  "word-to-pdf": {
    accept: ".doc,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    run: async (ctx) => {
      const file = first(ctx);
      ctx.progress("Reading the document…");
      const mammoth = await import("mammoth/mammoth.browser.js");
      const result = await mammoth.convertToHtml({ arrayBuffer: await file.arrayBuffer() });
      const dom = new DOMParser().parseFromString(result.value, "text/html");
      const blocks: Array<{ text: string; bold?: boolean; size?: number }> = [];
      dom.body.querySelectorAll("h1,h2,h3,h4,p,li,tr").forEach((node) => {
        const text = (node.textContent ?? "").trim();
        const tag = node.tagName.toLowerCase();
        const size = tag === "h1" ? 20 : tag === "h2" ? 16 : tag === "h3" ? 14 : 11;
        blocks.push({
          text: tag === "li" ? `•  ${text}` : text,
          bold: tag.startsWith("h"),
          size,
        });
      });
      if (blocks.length === 0) throw new Error("No readable text was found in that document.");
      const doc = await textToPdf(blocks);
      return [await savePdf(doc, `${baseName(file.name)}.pdf`)];
    },
  },

  "excel-to-pdf": {
    accept: ".xls,.xlsx,.csv",
    run: async (ctx) => {
      const file = first(ctx);
      const XLSX = await import("xlsx");
      const wb = XLSX.read(await file.arrayBuffer(), { type: "array" });
      const blocks: Array<{ text: string; bold?: boolean; size?: number }> = [];
      for (const sheetName of wb.SheetNames) {
        const sheet = wb.Sheets[sheetName];
        if (!sheet) continue;
        blocks.push({ text: sheetName, bold: true, size: 15 });
        const rows = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1, raw: false });
        for (const row of rows) {
          blocks.push({ text: (row ?? []).map((c) => String(c ?? "")).join("   |   "), size: 9 });
        }
        blocks.push({ text: "" });
      }
      const doc = await textToPdf(blocks, { title: baseName(file.name) });
      return [await savePdf(doc, `${baseName(file.name)}.pdf`)];
    },
  },

  "powerpoint-to-pdf": {
    accept: ".ppt,.pptx",
    run: async (ctx) => {
      const file = first(ctx);
      const JSZip = (await import("jszip")).default;
      const zip = await JSZip.loadAsync(await file.arrayBuffer());
      const slideNames = Object.keys(zip.files)
        .filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n))
        .sort((a, b) => Number(a.match(/\d+/)?.[0] ?? 0) - Number(b.match(/\d+/)?.[0] ?? 0));
      if (slideNames.length === 0) throw new Error("No slides were found in that file.");
      const doc = await PDFDocument.create();
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const bold = await doc.embedFont(StandardFonts.HelveticaBold);
      for (const [index, name] of slideNames.entries()) {
        ctx.progress(`Converting slide ${index + 1} of ${slideNames.length}…`);
        const xml = await zip.files[name]!.async("string");
        const texts = [...xml.matchAll(/<a:t>([^<]*)<\/a:t>/g)].map((m) => m[1] ?? "");
        const page = doc.addPage([720, 540]);
        page.drawRectangle({ x: 0, y: 0, width: 720, height: 540, color: rgb(1, 1, 1) });
        let y = 470;
        texts.forEach((text, i) => {
          if (!text.trim() || y < 40) return;
          const size = i === 0 ? 26 : 14;
          page.drawText(text.slice(0, 90), {
            x: 48,
            y,
            size,
            font: i === 0 ? bold : font,
            color: rgb(0.09, 0.09, 0.12),
          });
          y -= size * 1.7;
        });
      }
      return [await savePdf(doc, `${baseName(file.name)}.pdf`)];
    },
  },

  "html-to-pdf": {
    accept: ".html,.htm,text/html",
    fields: [
      {
        name: "html",
        label: "Or paste HTML",
        type: "textarea",
        default: "",
        placeholder: "<h1>Title</h1><p>Body…</p>",
      },
    ],
    run: async (ctx) => {
      const pasted = str(ctx, "html").trim();
      const file = ctx.files[0];
      const source = pasted || (file ? await file.text() : "");
      if (!source) throw new Error("Upload an HTML file or paste some HTML.");
      const dom = new DOMParser().parseFromString(source, "text/html");
      dom.querySelectorAll("script,style").forEach((n) => n.remove());
      const blocks: Array<{ text: string; bold?: boolean; size?: number }> = [];
      dom.body.querySelectorAll("h1,h2,h3,h4,p,li,td,pre").forEach((node) => {
        const text = (node.textContent ?? "").trim();
        if (!text) return;
        const tag = node.tagName.toLowerCase();
        blocks.push({
          text: tag === "li" ? `•  ${text}` : text,
          bold: tag.startsWith("h"),
          size: tag === "h1" ? 20 : tag === "h2" ? 16 : tag === "h3" ? 14 : 11,
        });
      });
      if (blocks.length === 0) blocks.push({ text: dom.body.textContent?.trim() || "Empty document" });
      const doc = await textToPdf(blocks, dom.title ? { title: dom.title } : {});
      return [await savePdf(doc, `${file ? baseName(file.name) : "page"}.pdf`)];
    },
  },

  /* ------------------------------------------------------------ convert ← PDF */
  "pdf-to-jpg": {
    accept: PDF,
    fields: [
      {
        name: "dpi",
        label: "Quality",
        type: "select",
        default: "2",
        options: [
          { value: "1", label: "Screen (72 dpi)" },
          { value: "2", label: "High (150 dpi)" },
          { value: "3", label: "Print (216 dpi)" },
        ],
      },
      { name: "pages", label: "Pages", type: "text", placeholder: "all", default: "" },
    ],
    run: async (ctx) => {
      const file = first(ctx);
      const doc = await getPdfJsDoc(file);
      const wanted = parseRanges(str(ctx, "pages"), doc.numPages);
      const scale = num(ctx, "dpi", 2);
      const images: ToolFile[] = [];
      for (const index of wanted) {
        ctx.progress(`Rendering page ${index + 1}…`);
        const page = await doc.getPage(index + 1);
        const canvas = await renderPageToCanvas(page, scale);
        images.push({
          name: `${baseName(file.name)}-page-${index + 1}.jpg`,
          blob: await canvasToJpeg(canvas, 0.92),
        });
      }
      if (images.length === 0) throw new Error("No pages matched.");
      if (images.length === 1) return images;
      return [await zipFiles(images, `${baseName(file.name)}-images.zip`)];
    },
  },

  "pdf-to-text": {
    accept: PDF,
    fields: [
      { name: "breaks", label: "Add page separators", type: "checkbox", default: true },
    ],
    run: async (ctx) => {
      const file = first(ctx);
      const pages = await extractText(file);
      const parts = pages.map((page) =>
        `${bool(ctx, "breaks") ? `--- Page ${page.page} ---\n` : ""}${page.lines.join("\n")}`,
      );
      const text = parts.join("\n\n");
      return [
        {
          name: `${baseName(file.name)}.txt`,
          blob: new Blob([text], { type: "text/plain;charset=utf-8" }),
        },
      ];
    },
  },

  "pdf-to-word": {
    accept: PDF,
    run: async (ctx) => {
      const file = first(ctx);
      ctx.progress("Extracting text…");
      const pages = await extractText(file);
      const { Document, Packer, Paragraph, TextRun } = await import("docx");
      const children = pages.flatMap((page) => [
        new Paragraph({
          children: [new TextRun({ text: `Page ${page.page}`, bold: true, size: 26 })],
        }),
        ...page.lines.map((line) => new Paragraph({ children: [new TextRun({ text: line })] })),
        new Paragraph({ children: [] }),
      ]);
      const doc = new Document({ sections: [{ children }] });
      const blob = await Packer.toBlob(doc);
      return [{ name: `${baseName(file.name)}.docx`, blob }];
    },
  },

  "pdf-to-excel": {
    accept: PDF,
    run: async (ctx) => {
      const file = first(ctx);
      const pages = await extractText(file);
      const XLSX = await import("xlsx");
      const wb = XLSX.utils.book_new();
      for (const page of pages) {
        const rows = page.lines.map((line) => line.split(/\s{2,}|\t|\s\|\s/));
        const sheet = XLSX.utils.aoa_to_sheet(rows.length ? rows : [[""]]);
        XLSX.utils.book_append_sheet(wb, sheet, `Page ${page.page}`.slice(0, 31));
      }
      const out = XLSX.write(wb, { bookType: "xlsx", type: "array" }) as ArrayBuffer;
      return [
        {
          name: `${baseName(file.name)}.xlsx`,
          blob: new Blob([out], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          }),
        },
      ];
    },
  },

  "pdf-to-powerpoint": {
    accept: PDF,
    fields: [
      { name: "asImages", label: "Use page images (keeps the layout)", type: "checkbox", default: true },
    ],
    run: async (ctx) => {
      const file = first(ctx);
      const PptxGenJS = (await import("pptxgenjs")).default;
      const pptx = new PptxGenJS();
      pptx.defineLayout({ name: "PDF", width: 10, height: 7.5 });
      pptx.layout = "PDF";
      if (bool(ctx, "asImages")) {
        const doc = await getPdfJsDoc(file);
        for (let i = 1; i <= doc.numPages; i += 1) {
          ctx.progress(`Rendering page ${i} of ${doc.numPages}…`);
          const page = await doc.getPage(i);
          const canvas = await renderPageToCanvas(page, 2);
          const slide = pptx.addSlide();
          slide.addImage({ data: canvas.toDataURL("image/jpeg", 0.9), x: 0, y: 0, w: 10, h: 7.5 });
        }
      } else {
        const pages = await extractText(file);
        for (const page of pages) {
          const slide = pptx.addSlide();
          slide.addText(page.lines.join("\n") || `Page ${page.page}`, {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 6.5,
            fontSize: 12,
          });
        }
      }
      const blob = (await pptx.write({ outputType: "blob" })) as Blob;
      return [{ name: `${baseName(file.name)}.pptx`, blob }];
    },
  },

  "extract-images": {
    accept: PDF,
    run: async (ctx) => {
      const file = first(ctx);
      const doc = await getPdfJsDoc(file);
      const images: ToolFile[] = [];
      for (let i = 1; i <= doc.numPages; i += 1) {
        ctx.progress(`Scanning page ${i} of ${doc.numPages}…`);
        const page = await doc.getPage(i);
        const ops = await page.getOperatorList();
        const names = new Set<string>();
        ops.fnArray.forEach((fn, index) => {
          if (fn === pdfjsOps.paintImageXObject || fn === pdfjsOps.paintJpegXObject) {
            const arg = ops.argsArray[index]?.[0];
            if (typeof arg === "string") names.add(arg);
          }
        });
        for (const name of names) {
          const img = await new Promise<{
            width: number;
            height: number;
            data?: Uint8ClampedArray;
            kind?: number;
            bitmap?: ImageBitmap;
          } | null>((resolve) => {
            try {
              page.objs.get(name, resolve as never);
            } catch {
              resolve(null);
            }
          });
          if (!img) continue;
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const c2d = canvas.getContext("2d");
          if (!c2d) continue;
          if (img.bitmap) {
            c2d.drawImage(img.bitmap, 0, 0);
          } else if (img.data) {
            const out = c2d.createImageData(img.width, img.height);
            const src = img.data;
            const channels = src.length / (img.width * img.height);
            for (let p = 0, q = 0; p < out.data.length; p += 4, q += channels) {
              if (channels >= 3) {
                out.data[p] = src[q] ?? 0;
                out.data[p + 1] = src[q + 1] ?? 0;
                out.data[p + 2] = src[q + 2] ?? 0;
                out.data[p + 3] = channels === 4 ? (src[q + 3] ?? 255) : 255;
              } else {
                const v = src[q] ?? 0;
                out.data[p] = v;
                out.data[p + 1] = v;
                out.data[p + 2] = v;
                out.data[p + 3] = 255;
              }
            }
            c2d.putImageData(out, 0, 0);
          } else {
            continue;
          }
          images.push({
            name: `page-${i}-${images.length + 1}.png`,
            blob: await canvasToPng(canvas),
          });
        }
      }
      if (images.length === 0) throw new Error("No embedded images were found in this PDF.");
      if (images.length === 1) return images;
      return [await zipFiles(images, `${baseName(file.name)}-images.zip`)];
    },
  },

  /* --------------------------------------------------------------------- batch */
  "batch-compress": {
    accept: PDF,
    multiple: true,
    uploadLabel: "Select PDFs",
    fields: [
      {
        name: "level",
        label: "Compression level",
        type: "select",
        default: "medium",
        options: [
          { value: "low", label: "Light — best quality" },
          { value: "medium", label: "Recommended" },
          { value: "high", label: "Strong — smallest file" },
        ],
      },
      { name: "grayscale", label: "Convert to grayscale", type: "checkbox", default: false },
    ],
    run: (ctx) => batch(ctx, (file) => compressOne(ctx, file), "compressed-pdfs.zip"),
  },

  "batch-protect": {
    accept: PDF,
    multiple: true,
    uploadLabel: "Select PDFs",
    fields: [{ name: "password", label: "Password", type: "password", default: "" }],
    run: (ctx) => {
      const password = str(ctx, "password");
      if (!password) throw new Error("Enter a password.");
      return batch(ctx, (file) => protectOne(file, password, password), "protected-pdfs.zip");
    },
  },

  "batch-unlock": {
    accept: PDF,
    multiple: true,
    uploadLabel: "Select PDFs",
    fields: [{ name: "password", label: "Password", type: "password", default: "" }],
    run: (ctx) => batch(ctx, (file) => unlockOne(file, str(ctx, "password")), "unlocked-pdfs.zip"),
  },

  "batch-watermark": {
    accept: PDF,
    multiple: true,
    uploadLabel: "Select PDFs",
    fields: watermarkFields,
    run: (ctx) =>
      batch(
        ctx,
        async (file) => {
          const text = str(ctx, "text", "CONFIDENTIAL");
          const { doc } = await stampText(ctx, {
            file,
            text: () => text,
            size: num(ctx, "size", 60),
            color: str(ctx, "color", "#7c3aed"),
            opacity: num(ctx, "opacity", 0.18),
            position: "center",
            rotate: num(ctx, "angle", 45),
            pagesInput: str(ctx, "pages"),
          });
          return savePdf(doc, `${baseName(file.name)}-watermarked.pdf`);
        },
        "watermarked-pdfs.zip",
      ),
  },

  "batch-header-footer": {
    accept: PDF,
    multiple: true,
    uploadLabel: "Select PDFs",
    fields: headerFooterFields,
    run: (ctx) => batch(ctx, (file) => applyHeaderFooter(ctx, file), "header-footer-pdfs.zip"),
  },

  "batch-repair": {
    accept: PDF,
    multiple: true,
    uploadLabel: "Select PDFs",
    run: (ctx) => batch(ctx, (file) => repairOne(file), "repaired-pdfs.zip"),
  },
};

// pdf.js op codes used by extract-images (imported lazily to keep the bundle lean).
const pdfjsOps = { paintImageXObject: 85, paintJpegXObject: 82 };

export function getToolImpl(slug: string): ToolImpl | undefined {
  return toolImpls[slug];
}
