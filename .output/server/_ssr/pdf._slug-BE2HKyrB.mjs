import { a as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as degrees, n as StandardFonts, r as rgb, t as PDFDocument } from "../_libs/@cantoo/pdf-lib+[...].mjs";
import { D as Eye, F as ArrowLeft, O as Eraser, S as FileText, _ as LoaderCircle, i as TriangleAlert, j as Crop, k as Download, r as Upload, t as X, w as FilePlusCorner } from "../_libs/lucide-react.mjs";
import { n as Route } from "./router-BQ4NqDy1.mjs";
import { n as createBlankPdfFile, r as storePdfForEditor, t as Container } from "./pdfEditorLaunch-CCTLJgAt.mjs";
import { n as __webpack_exports__getDocument, t as __webpack_exports__GlobalWorkerOptions } from "../_libs/pdfjs-dist.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pdf._slug-BE2HKyrB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
__webpack_exports__GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
async function bytesOf(file) {
	return new Uint8Array(await file.arrayBuffer());
}
async function loadPdf(file, password) {
	const bytes = await bytesOf(file);
	return PDFDocument.load(bytes, {
		ignoreEncryption: true,
		throwOnInvalidObject: false,
		...password ? { password } : {}
	});
}
async function savePdf(doc, name) {
	const bytes = await doc.save({ useObjectStreams: true });
	return {
		name,
		blob: new Blob([bytes], { type: "application/pdf" })
	};
}
function baseName(name) {
	return name.replace(/\.[^.]+$/, "");
}
/** "1-3,7, 9-" -> zero-based page indexes, clamped to `total`. */
function parseRanges(input, total) {
	const trimmed = (input || "").trim();
	if (!trimmed) return Array.from({ length: total }, (_, i) => i);
	const out = /* @__PURE__ */ new Set();
	for (const chunk of trimmed.split(/[,\s]+/).filter(Boolean)) {
		const m = chunk.match(/^(\d+)?\s*-\s*(\d+)?$/);
		if (m) {
			const from = m[1] ? Number(m[1]) : 1;
			const to = m[2] ? Number(m[2]) : total;
			for (let p = Math.min(from, to); p <= Math.max(from, to); p += 1) if (p >= 1 && p <= total) out.add(p - 1);
		} else {
			const p = Number(chunk);
			if (Number.isFinite(p) && p >= 1 && p <= total) out.add(p - 1);
		}
	}
	return [...out].sort((a, b) => a - b);
}
function hexToRgb(hex) {
	const clean = (hex || "#000000").replace("#", "");
	const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean.padEnd(6, "0");
	const n = parseInt(full.slice(0, 6), 16);
	return rgb((n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255);
}
async function getPdfJsDoc(file, password) {
	const data = await bytesOf(file);
	return __webpack_exports__getDocument({
		data,
		password
	}).promise;
}
async function renderPageToCanvas(page, scale) {
	const viewport = page.getViewport({ scale });
	const canvas = document.createElement("canvas");
	canvas.width = Math.max(1, Math.floor(viewport.width));
	canvas.height = Math.max(1, Math.floor(viewport.height));
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas is not available in this browser.");
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	const params = {
		canvas,
		canvasContext: ctx,
		viewport
	};
	await page.render(params).promise;
	return canvas;
}
function canvasToJpeg(canvas, quality) {
	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => blob ? resolve(blob) : reject(/* @__PURE__ */ new Error("Could not encode image.")), "image/jpeg", quality);
	});
}
function canvasToPng(canvas) {
	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => blob ? resolve(blob) : reject(/* @__PURE__ */ new Error("Could not encode image.")), "image/png");
	});
}
/** Rasterises every page of a PDF and rebuilds it from images. */
async function rasterizePdf(file, opts) {
	const src = await getPdfJsDoc(file, opts.password);
	const out = await PDFDocument.create();
	for (let i = 1; i <= src.numPages; i += 1) {
		const page = await src.getPage(i);
		const canvas = await renderPageToCanvas(page, opts.scale);
		if (opts.grayscale) applyGrayscale(canvas);
		const jpeg = await canvasToJpeg(canvas, opts.quality);
		const image = await out.embedJpg(await bytesOf(jpeg));
		const viewport = page.getViewport({ scale: 1 });
		out.addPage([viewport.width, viewport.height]).drawImage(image, {
			x: 0,
			y: 0,
			width: viewport.width,
			height: viewport.height
		});
	}
	return out;
}
function applyGrayscale(canvas, contrast = 1) {
	const ctx = canvas.getContext("2d");
	if (!ctx) return;
	const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const d = img.data;
	for (let i = 0; i < d.length; i += 4) {
		const g = .299 * (d[i] ?? 0) + .587 * (d[i + 1] ?? 0) + .114 * (d[i + 2] ?? 0);
		const v = Math.max(0, Math.min(255, (g - 128) * contrast + 128));
		d[i] = v;
		d[i + 1] = v;
		d[i + 2] = v;
	}
	ctx.putImageData(img, 0, 0);
}
async function extractText(file, password) {
	const doc = await getPdfJsDoc(file, password);
	const pages = [];
	for (let i = 1; i <= doc.numPages; i += 1) {
		const content = await (await doc.getPage(i)).getTextContent();
		const rows = /* @__PURE__ */ new Map();
		for (const raw of content.items) {
			const item = raw;
			if (!item.str) continue;
			const y = Math.round((item.transform[5] ?? 0) / 3) * 3;
			const list = rows.get(y) ?? [];
			list.push({
				x: item.transform[4] ?? 0,
				str: item.str
			});
			rows.set(y, list);
		}
		const lines = [...rows.entries()].sort((a, b) => b[0] - a[0]).map(([, list]) => list.sort((a, b) => a.x - b.x).map((p) => p.str).join("").replace(/\s+/g, " ").trim()).filter((line) => line.length > 0);
		pages.push({
			page: i,
			lines
		});
	}
	return pages;
}
/** Lays out plain text into a fresh PDF with wrapping and pagination. */
async function textToPdf(blocks, opts = {}) {
	const doc = await PDFDocument.create();
	const font = await doc.embedFont(StandardFonts.Helvetica);
	const bold = await doc.embedFont(StandardFonts.HelveticaBold);
	const width = 595.28;
	const height = 841.89;
	const margin = 56;
	let page = doc.addPage([width, height]);
	let y = 785.89;
	const write = (text, size, isBold) => {
		const f = isBold ? bold : font;
		const maxWidth = 483.28;
		const words = text.split(/\s+/).filter(Boolean);
		const lines = [];
		let current = "";
		for (const word of words) {
			const candidate = current ? `${current} ${word}` : word;
			if (f.widthOfTextAtSize(candidate, size) > maxWidth && current) {
				lines.push(current);
				current = word;
			} else current = candidate;
		}
		if (current) lines.push(current);
		if (lines.length === 0) lines.push("");
		for (const line of lines) {
			if (y < margin) {
				page = doc.addPage([width, height]);
				y = 785.89;
			}
			page.drawText(line, {
				x: margin,
				y,
				size,
				font: f,
				color: rgb(.1, .1, .12)
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
async function zipFiles(files, name) {
	const JSZip = (await import("../_libs/jszip+[...].mjs").then((n) => /* @__PURE__ */ __toESM(n.t()))).default;
	const zip = new JSZip();
	for (const file of files) zip.file(file.name, file.blob);
	return {
		name,
		blob: await zip.generateAsync({ type: "blob" })
	};
}
var str = (ctx, name, fallback = "") => {
	const v = ctx.values[name];
	return v === void 0 || v === null ? fallback : String(v);
};
var num = (ctx, name, fallback = 0) => {
	const v = Number(ctx.values[name]);
	return Number.isFinite(v) ? v : fallback;
};
var bool = (ctx, name) => Boolean(ctx.values[name]);
var first = (ctx) => {
	const file = ctx.files[0];
	if (!file) throw new Error("Please choose a file first.");
	return file;
};
var PDF = "application/pdf";
var IMAGES = "image/png,image/jpeg,image/webp";
var POSITIONS = [
	{
		value: "bottom-center",
		label: "Bottom center"
	},
	{
		value: "bottom-right",
		label: "Bottom right"
	},
	{
		value: "bottom-left",
		label: "Bottom left"
	},
	{
		value: "top-center",
		label: "Top center"
	},
	{
		value: "top-right",
		label: "Top right"
	},
	{
		value: "top-left",
		label: "Top left"
	}
];
function placeXY(position, pageW, pageH, textW, size, margin = 36) {
	const [vertical, horizontal] = position.split("-");
	const y = vertical === "top" ? pageH - margin - size : margin;
	return {
		x: horizontal === "left" ? margin : horizontal === "right" ? pageW - margin - textW : (pageW - textW) / 2,
		y
	};
}
async function embedImage(doc, file) {
	const bytes = await bytesOf(file);
	const type = file.type || "";
	if (type.includes("png")) return doc.embedPng(bytes);
	if (type.includes("jpeg") || type.includes("jpg")) return doc.embedJpg(bytes);
	const bitmap = await createImageBitmap(file);
	const canvas = document.createElement("canvas");
	canvas.width = bitmap.width;
	canvas.height = bitmap.height;
	canvas.getContext("2d")?.drawImage(bitmap, 0, 0);
	const png = await canvasToPng(canvas);
	return doc.embedPng(await bytesOf(png));
}
async function imagesToPdf(files, opts) {
	const doc = await PDFDocument.create();
	for (const [index, file] of files.entries()) {
		opts.progress(`Adding image ${index + 1} of ${files.length}…`);
		let source = file;
		if (opts.grayscale) {
			const bitmap = await createImageBitmap(file);
			const canvas = document.createElement("canvas");
			canvas.width = bitmap.width;
			canvas.height = bitmap.height;
			canvas.getContext("2d")?.drawImage(bitmap, 0, 0);
			applyGrayscale(canvas, 1.35);
			source = await canvasToJpeg(canvas, .9);
			Object.defineProperty(source, "type", { value: "image/jpeg" });
		}
		const image = await embedImage(doc, source);
		const a4 = {
			w: 595.28,
			h: 841.89
		};
		const size = opts.pageSize === "fit" ? {
			w: image.width,
			h: image.height
		} : image.width > image.height ? {
			w: a4.h,
			h: a4.w
		} : a4;
		const page = doc.addPage([size.w, size.h]);
		const maxW = size.w - opts.margin * 2;
		const maxH = size.h - opts.margin * 2;
		const scale = Math.min(maxW / image.width, maxH / image.height, 1);
		const w = image.width * scale;
		const h = image.height * scale;
		page.drawImage(image, {
			x: (size.w - w) / 2,
			y: (size.h - h) / 2,
			width: w,
			height: h
		});
	}
	return doc;
}
async function stampText(ctx, opts) {
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
			...opts.rotate ? { rotate: degrees(opts.rotate) } : {}
		});
	});
	return {
		doc,
		file
	};
}
var watermarkFields = [
	{
		name: "text",
		label: "Watermark text",
		type: "text",
		default: "CONFIDENTIAL"
	},
	{
		name: "size",
		label: "Font size",
		type: "number",
		default: 60
	},
	{
		name: "color",
		label: "Colour",
		type: "color",
		default: "#7c3aed"
	},
	{
		name: "opacity",
		label: "Opacity (0-1)",
		type: "number",
		default: .18
	},
	{
		name: "angle",
		label: "Rotation (degrees)",
		type: "number",
		default: 45
	},
	{
		name: "pages",
		label: "Pages",
		type: "text",
		placeholder: "all, or 1-3,7",
		default: ""
	}
];
var headerFooterFields = [
	{
		name: "header",
		label: "Header text",
		type: "text",
		default: ""
	},
	{
		name: "footer",
		label: "Footer text",
		type: "text",
		default: ""
	},
	{
		name: "size",
		label: "Font size",
		type: "number",
		default: 10
	},
	{
		name: "color",
		label: "Colour",
		type: "color",
		default: "#475569"
	},
	{
		name: "numbers",
		label: "Append page numbers to footer",
		type: "checkbox",
		default: true
	},
	{
		name: "date",
		label: "Append today's date to header",
		type: "checkbox",
		default: false
	},
	{
		name: "filename",
		label: "Append file name to header",
		type: "checkbox",
		default: false
	}
];
async function applyHeaderFooter(ctx, file) {
	const doc = await loadPdf(file);
	const font = await doc.embedFont(StandardFonts.Helvetica);
	const size = num(ctx, "size", 10);
	const color = hexToRgb(str(ctx, "color", "#475569"));
	const pages = doc.getPages();
	pages.forEach((page, index) => {
		const { width, height } = page.getSize();
		const headerParts = [str(ctx, "header")];
		if (bool(ctx, "date")) headerParts.push((/* @__PURE__ */ new Date()).toLocaleDateString());
		if (bool(ctx, "filename")) headerParts.push(baseName(file.name));
		const header = headerParts.filter(Boolean).join("  •  ");
		const footerParts = [str(ctx, "footer")];
		if (bool(ctx, "numbers")) footerParts.push(`Page ${index + 1} of ${pages.length}`);
		const footer = footerParts.filter(Boolean).join("  •  ");
		if (header) {
			const w = font.widthOfTextAtSize(header, size);
			page.drawText(header, {
				x: (width - w) / 2,
				y: height - 28,
				size,
				font,
				color
			});
		}
		if (footer) {
			const w = font.widthOfTextAtSize(footer, size);
			page.drawText(footer, {
				x: (width - w) / 2,
				y: 20,
				size,
				font,
				color
			});
		}
	});
	return savePdf(doc, `${baseName(file.name)}-header-footer.pdf`);
}
async function compressOne(ctx, file) {
	const level = str(ctx, "level", "medium");
	const presets = {
		low: {
			scale: 1.6,
			quality: .86
		},
		medium: {
			scale: 1.2,
			quality: .7
		},
		high: {
			scale: .9,
			quality: .5
		}
	};
	const preset = presets[level] ?? presets["medium"];
	const grayscale = bool(ctx, "grayscale");
	const out = await savePdf(await rasterizePdf(file, {
		...preset,
		grayscale
	}), `${baseName(file.name)}-compressed.pdf`);
	if (out.blob.size >= file.size && !grayscale) return savePdf(await loadPdf(file), `${baseName(file.name)}-compressed.pdf`);
	return out;
}
async function repairOne(file) {
	try {
		const doc = await loadPdf(file);
		const out = await PDFDocument.create();
		(await out.copyPages(doc, doc.getPageIndices())).forEach((page) => out.addPage(page));
		if (out.getPageCount() > 0) return savePdf(out, `${baseName(file.name)}-repaired.pdf`);
	} catch {}
	return savePdf(await rasterizePdf(file, {
		scale: 1.5,
		quality: .85
	}), `${baseName(file.name)}-repaired.pdf`);
}
async function protectOne(file, userPassword, ownerPassword) {
	const doc = await loadPdf(file);
	doc.encrypt({
		userPassword,
		ownerPassword: ownerPassword || userPassword
	});
	return savePdf(doc, `${baseName(file.name)}-protected.pdf`);
}
async function unlockOne(file, password) {
	const doc = await loadPdf(file, password);
	const out = await PDFDocument.create();
	(await out.copyPages(doc, doc.getPageIndices())).forEach((page) => out.addPage(page));
	return savePdf(out, `${baseName(file.name)}-unlocked.pdf`);
}
async function batch(ctx, worker, zipName) {
	if (ctx.files.length === 0) throw new Error("Please choose at least one file.");
	const out = [];
	for (const [index, file] of ctx.files.entries()) {
		ctx.progress(`Processing ${index + 1} of ${ctx.files.length}: ${file.name}`);
		out.push(await worker(file));
	}
	if (out.length === 1) return out;
	return [await zipFiles(out, zipName)];
}
var toolImpls = {
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
				(await out.copyPages(doc, doc.getPageIndices())).forEach((page) => out.addPage(page));
			}
			return [await savePdf(out, "merged.pdf")];
		}
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
					{
						value: "each",
						label: "One file per page"
					},
					{
						value: "ranges",
						label: "Custom ranges"
					},
					{
						value: "every",
						label: "Every N pages"
					}
				]
			},
			{
				name: "ranges",
				label: "Ranges (for custom mode)",
				type: "text",
				placeholder: "1-3, 4-6, 7-",
				default: ""
			},
			{
				name: "every",
				label: "Pages per file (for every-N)",
				type: "number",
				default: 2
			}
		],
		run: async (ctx) => {
			const file = first(ctx);
			const src = await loadPdf(file);
			const total = src.getPageCount();
			const mode = str(ctx, "mode", "each");
			const groups = [];
			if (mode === "each") for (let i = 0; i < total; i += 1) groups.push([i]);
			else if (mode === "every") {
				const n = Math.max(1, num(ctx, "every", 2));
				for (let i = 0; i < total; i += n) groups.push(Array.from({ length: Math.min(n, total - i) }, (_, k) => i + k));
			} else {
				const chunks = str(ctx, "ranges").split(",").map((c) => c.trim()).filter(Boolean);
				if (chunks.length === 0) throw new Error("Enter at least one range, e.g. 1-3, 4-6.");
				for (const chunk of chunks) groups.push(parseRanges(chunk, total));
			}
			const parts = [];
			for (const [index, group] of groups.entries()) {
				if (group.length === 0) continue;
				ctx.progress(`Writing part ${index + 1} of ${groups.length}…`);
				const out = await PDFDocument.create();
				(await out.copyPages(src, group)).forEach((page) => out.addPage(page));
				parts.push(await savePdf(out, `${baseName(file.name)}-part-${index + 1}.pdf`));
			}
			if (parts.length === 1) return parts;
			return [await zipFiles(parts, `${baseName(file.name)}-split.zip`)];
		}
	},
	"remove-pages": {
		accept: PDF,
		fields: [{
			name: "pages",
			label: "Pages to remove",
			type: "text",
			placeholder: "2,5-7",
			default: ""
		}],
		run: async (ctx) => {
			const file = first(ctx);
			const src = await loadPdf(file);
			const total = src.getPageCount();
			const remove = new Set(parseRanges(str(ctx, "pages"), total));
			if (remove.size === 0) throw new Error("Enter which pages to remove, e.g. 2,5-7.");
			const keep = Array.from({ length: total }, (_, i) => i).filter((i) => !remove.has(i));
			if (keep.length === 0) throw new Error("You cannot remove every page.");
			const out = await PDFDocument.create();
			(await out.copyPages(src, keep)).forEach((page) => out.addPage(page));
			return [await savePdf(out, `${baseName(file.name)}-pages-removed.pdf`)];
		}
	},
	"extract-pages": {
		accept: PDF,
		fields: [{
			name: "pages",
			label: "Pages to extract",
			type: "text",
			placeholder: "1-3,8",
			default: ""
		}, {
			name: "separate",
			label: "Save each page as its own PDF",
			type: "checkbox",
			default: false
		}],
		run: async (ctx) => {
			const file = first(ctx);
			const src = await loadPdf(file);
			const indexes = parseRanges(str(ctx, "pages"), src.getPageCount());
			if (indexes.length === 0) throw new Error("Enter which pages to extract, e.g. 1-3,8.");
			if (bool(ctx, "separate")) {
				const parts = [];
				for (const index of indexes) {
					const out = await PDFDocument.create();
					const [page] = await out.copyPages(src, [index]);
					if (page) out.addPage(page);
					parts.push(await savePdf(out, `${baseName(file.name)}-page-${index + 1}.pdf`));
				}
				return parts.length === 1 ? parts : [await zipFiles(parts, `${baseName(file.name)}-pages.zip`)];
			}
			const out = await PDFDocument.create();
			(await out.copyPages(src, indexes)).forEach((page) => out.addPage(page));
			return [await savePdf(out, `${baseName(file.name)}-extracted.pdf`)];
		}
	},
	organize: {
		accept: PDF,
		fields: [{
			name: "order",
			label: "New page order",
			type: "text",
			placeholder: "3,1,2,4-",
			default: "",
			help: "List pages in the order you want them. Ranges are allowed."
		}, {
			name: "reverse",
			label: "Reverse the whole document instead",
			type: "checkbox",
			default: false
		}],
		run: async (ctx) => {
			const file = first(ctx);
			const src = await loadPdf(file);
			const total = src.getPageCount();
			let order;
			if (bool(ctx, "reverse")) order = Array.from({ length: total }, (_, i) => total - 1 - i);
			else {
				const raw = str(ctx, "order").trim();
				if (!raw) throw new Error("Enter the new page order, e.g. 3,1,2.");
				order = [];
				for (const chunk of raw.split(/[,\s]+/).filter(Boolean)) for (const index of parseRanges(chunk, total)) order.push(index);
			}
			if (order.length === 0) throw new Error("That order did not match any pages.");
			const out = await PDFDocument.create();
			(await out.copyPages(src, order)).forEach((page) => out.addPage(page));
			return [await savePdf(out, `${baseName(file.name)}-organized.pdf`)];
		}
	},
	"add-pages": {
		accept: PDF,
		fields: [
			{
				name: "source",
				label: "PDF to insert",
				type: "file",
				accept: PDF
			},
			{
				name: "at",
				label: "Insert after page (0 = beginning)",
				type: "number",
				default: 0
			},
			{
				name: "which",
				label: "Pages from that PDF",
				type: "text",
				placeholder: "all",
				default: ""
			}
		],
		run: async (ctx) => {
			const file = first(ctx);
			const donorFile = ctx.extraFiles["source"];
			if (!donorFile) throw new Error("Choose the PDF whose pages you want to insert.");
			const base = await loadPdf(file);
			const donor = await loadPdf(donorFile);
			const indexes = parseRanges(str(ctx, "which"), donor.getPageCount());
			const at = Math.max(0, Math.min(num(ctx, "at", 0), base.getPageCount()));
			(await base.copyPages(donor, indexes)).forEach((page, offset) => base.insertPage(at + offset, page));
			return [await savePdf(base, `${baseName(file.name)}-with-added-pages.pdf`)];
		}
	},
	rotate: {
		accept: PDF,
		fields: [{
			name: "angle",
			label: "Rotation",
			type: "select",
			default: "90",
			options: [
				{
					value: "90",
					label: "90° clockwise"
				},
				{
					value: "180",
					label: "180°"
				},
				{
					value: "270",
					label: "90° counter-clockwise"
				}
			]
		}, {
			name: "pages",
			label: "Pages",
			type: "text",
			placeholder: "all, or 1-3",
			default: ""
		}],
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
		}
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
					{
						value: "n",
						label: "1"
					},
					{
						value: "n-of-total",
						label: "1 of 10"
					},
					{
						value: "page-n",
						label: "Page 1"
					}
				]
			},
			{
				name: "position",
				label: "Position",
				type: "select",
				default: "bottom-center",
				options: POSITIONS
			},
			{
				name: "size",
				label: "Font size",
				type: "number",
				default: 11
			},
			{
				name: "color",
				label: "Colour",
				type: "color",
				default: "#334155"
			},
			{
				name: "start",
				label: "Start numbering at",
				type: "number",
				default: 1
			},
			{
				name: "pages",
				label: "Pages",
				type: "text",
				placeholder: "all",
				default: ""
			}
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
				pagesInput: str(ctx, "pages")
			});
			return [await savePdf(doc, `${baseName(file.name)}-numbered.pdf`)];
		}
	},
	compare: {
		accept: PDF,
		fields: [{
			name: "other",
			label: "Second PDF",
			type: "file",
			accept: PDF
		}],
		run: async (ctx) => {
			const left = first(ctx);
			const right = ctx.extraFiles["other"];
			if (!right) throw new Error("Choose a second PDF to compare against.");
			ctx.progress("Reading both documents…");
			const a = await extractText(left);
			const b = await extractText(right);
			const blocks = [
				{
					text: `A: ${left.name} (${a.length} pages)`,
					size: 11
				},
				{
					text: `B: ${right.name} (${b.length} pages)`,
					size: 11
				},
				{ text: "" }
			];
			const pages = Math.max(a.length, b.length);
			let differences = 0;
			for (let i = 0; i < pages; i += 1) {
				const la = a[i]?.lines ?? [];
				const lb = b[i]?.lines ?? [];
				const rows = Math.max(la.length, lb.length);
				const pageDiffs = [];
				for (let r = 0; r < rows; r += 1) {
					const x = la[r] ?? "";
					const y = lb[r] ?? "";
					if (x !== y) {
						pageDiffs.push(`- A: ${x || "(missing)"}`);
						pageDiffs.push(`+ B: ${y || "(missing)"}`);
					}
				}
				differences += pageDiffs.length / 2;
				blocks.push({
					text: `Page ${i + 1} — ${pageDiffs.length ? `${pageDiffs.length / 2} changed lines` : "identical"}`,
					bold: true,
					size: 13
				});
				for (const line of pageDiffs.slice(0, 60)) blocks.push({
					text: line,
					size: 10
				});
				blocks.push({ text: "" });
			}
			blocks.splice(2, 0, {
				text: `Total changed lines: ${differences}`,
				bold: true
			});
			return [await savePdf(await textToPdf(blocks, { title: "PDF comparison report" }), "comparison-report.pdf")];
		}
	},
	watermark: {
		accept: PDF,
		fields: watermarkFields,
		run: async (ctx) => {
			const text = str(ctx, "text", "CONFIDENTIAL");
			const { doc, file } = await stampText(ctx, {
				text: () => text,
				size: num(ctx, "size", 60),
				color: str(ctx, "color", "#7c3aed"),
				opacity: num(ctx, "opacity", .18),
				position: "center",
				rotate: num(ctx, "angle", 45),
				pagesInput: str(ctx, "pages")
			});
			return [await savePdf(doc, `${baseName(file.name)}-watermarked.pdf`)];
		}
	},
	"image-watermark": {
		accept: PDF,
		fields: [
			{
				name: "image",
				label: "Watermark image",
				type: "file",
				accept: IMAGES
			},
			{
				name: "scale",
				label: "Width (% of page)",
				type: "number",
				default: 40
			},
			{
				name: "opacity",
				label: "Opacity (0-1)",
				type: "number",
				default: .25
			},
			{
				name: "position",
				label: "Position",
				type: "select",
				default: "center",
				options: [{
					value: "center",
					label: "Center"
				}, ...POSITIONS]
			},
			{
				name: "pages",
				label: "Pages",
				type: "text",
				placeholder: "all",
				default: ""
			}
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
				const w = width * Math.max(5, num(ctx, "scale", 40)) / 100;
				const h = image.height / image.width * w;
				const spot = position === "center" ? {
					x: (width - w) / 2,
					y: (height - h) / 2
				} : placeXY(position, width, height, w, h);
				page.drawImage(image, {
					x: spot.x,
					y: spot.y,
					width: w,
					height: h,
					opacity: num(ctx, "opacity", .25)
				});
			});
			return [await savePdf(doc, `${baseName(file.name)}-watermarked.pdf`)];
		}
	},
	crop: {
		accept: PDF,
		fields: [
			{
				name: "top",
				label: "Top margin (%)",
				type: "number",
				default: 5
			},
			{
				name: "bottom",
				label: "Bottom margin (%)",
				type: "number",
				default: 5
			},
			{
				name: "left",
				label: "Left margin (%)",
				type: "number",
				default: 5
			},
			{
				name: "right",
				label: "Right margin (%)",
				type: "number",
				default: 5
			},
			{
				name: "pages",
				label: "Pages",
				type: "text",
				placeholder: "all",
				default: ""
			}
		],
		run: async (ctx) => {
			const file = first(ctx);
			const doc = await loadPdf(file);
			const pages = doc.getPages();
			const targets = new Set(parseRanges(str(ctx, "pages"), pages.length));
			pages.forEach((page, index) => {
				if (!targets.has(index)) return;
				const { width, height } = page.getSize();
				const left = width * num(ctx, "left", 0) / 100;
				const right = width * num(ctx, "right", 0) / 100;
				const top = height * num(ctx, "top", 0) / 100;
				const bottom = height * num(ctx, "bottom", 0) / 100;
				const w = Math.max(20, width - left - right);
				const h = Math.max(20, height - top - bottom);
				page.setCropBox(left, bottom, w, h);
				page.setMediaBox(left, bottom, w, h);
			});
			return [await savePdf(doc, `${baseName(file.name)}-cropped.pdf`)];
		}
	},
	forms: {
		accept: PDF,
		fields: [{
			name: "values",
			label: "Field values",
			type: "textarea",
			placeholder: "FieldName = value\nAnotherField = value",
			default: "",
			help: "Leave empty to only inspect the form. One field per line."
		}, {
			name: "flatten",
			label: "Flatten the form (make values permanent)",
			type: "checkbox",
			default: false
		}],
		run: async (ctx) => {
			const file = first(ctx);
			const doc = await loadPdf(file);
			const form = doc.getForm();
			const fields = form.getFields();
			const raw = str(ctx, "values").trim();
			if (!raw) {
				const names = fields.map((f) => `${f.getName()}  (${f.constructor.name.replace("PDF", "")})`);
				return [await savePdf(await textToPdf(names.length ? names.map((n) => ({
					text: n,
					size: 11
				})) : [{
					text: "This PDF has no interactive form fields.",
					size: 12
				}], { title: `Form fields in ${file.name}` }), `${baseName(file.name)}-form-fields.pdf`)];
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
				} catch {}
			}
			if (bool(ctx, "flatten")) form.flatten();
			return [await savePdf(doc, `${baseName(file.name)}-filled.pdf`)];
		}
	},
	"header-footer": {
		accept: PDF,
		fields: headerFooterFields,
		run: async (ctx) => [await applyHeaderFooter(ctx, first(ctx))]
	},
	compress: {
		accept: PDF,
		fields: [{
			name: "level",
			label: "Compression level",
			type: "select",
			default: "medium",
			options: [
				{
					value: "low",
					label: "Light — best quality"
				},
				{
					value: "medium",
					label: "Recommended"
				},
				{
					value: "high",
					label: "Strong — smallest file"
				}
			]
		}, {
			name: "grayscale",
			label: "Convert to grayscale",
			type: "checkbox",
			default: false
		}],
		run: async (ctx) => {
			const file = first(ctx);
			ctx.progress("Compressing…");
			return [await compressOne(ctx, file)];
		}
	},
	sign: {
		accept: PDF,
		fields: [
			{
				name: "image",
				label: "Signature image (optional)",
				type: "file",
				accept: IMAGES
			},
			{
				name: "text",
				label: "Or type your signature",
				type: "text",
				default: ""
			},
			{
				name: "page",
				label: "Page (0 = last page)",
				type: "number",
				default: 0
			},
			{
				name: "position",
				label: "Position",
				type: "select",
				default: "bottom-right",
				options: POSITIONS
			},
			{
				name: "size",
				label: "Signature size",
				type: "number",
				default: 28
			}
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
				const h = image.height / image.width * w;
				const spot = placeXY(str(ctx, "position", "bottom-right"), width, height, w, h);
				page.drawImage(image, {
					x: spot.x,
					y: spot.y,
					width: w,
					height: h
				});
			} else {
				const text = str(ctx, "text").trim();
				if (!text) throw new Error("Upload a signature image or type your name.");
				const font = await doc.embedFont(StandardFonts.HelveticaOblique);
				const w = font.widthOfTextAtSize(text, size);
				const spot = placeXY(str(ctx, "position", "bottom-right"), width, height, w, size);
				page.drawText(text, {
					x: spot.x,
					y: spot.y,
					size,
					font,
					color: rgb(.05, .05, .35)
				});
			}
			return [await savePdf(doc, `${baseName(file.name)}-signed.pdf`)];
		}
	},
	repair: {
		accept: PDF,
		run: async (ctx) => {
			ctx.progress("Rebuilding the document…");
			return [await repairOne(first(ctx))];
		}
	},
	"metadata-editor": {
		accept: PDF,
		fields: [
			{
				name: "title",
				label: "Title",
				type: "text",
				default: ""
			},
			{
				name: "author",
				label: "Author",
				type: "text",
				default: ""
			},
			{
				name: "subject",
				label: "Subject",
				type: "text",
				default: ""
			},
			{
				name: "keywords",
				label: "Keywords (comma separated)",
				type: "text",
				default: ""
			},
			{
				name: "creator",
				label: "Creator",
				type: "text",
				default: ""
			},
			{
				name: "clear",
				label: "Clear all metadata instead",
				type: "checkbox",
				default: false
			}
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
				if (str(ctx, "keywords")) doc.setKeywords(str(ctx, "keywords").split(",").map((k) => k.trim()).filter(Boolean));
				if (str(ctx, "creator")) doc.setCreator(str(ctx, "creator"));
			}
			doc.setModificationDate(/* @__PURE__ */ new Date());
			return [await savePdf(doc, `${baseName(file.name)}-metadata.pdf`)];
		}
	},
	protect: {
		accept: PDF,
		fields: [{
			name: "password",
			label: "Password",
			type: "password",
			default: ""
		}, {
			name: "owner",
			label: "Owner password (optional)",
			type: "password",
			default: ""
		}],
		run: async (ctx) => {
			const password = str(ctx, "password");
			if (!password) throw new Error("Enter a password.");
			return [await protectOne(first(ctx), password, str(ctx, "owner"))];
		}
	},
	unlock: {
		accept: PDF,
		fields: [{
			name: "password",
			label: "Current password",
			type: "password",
			default: ""
		}],
		run: async (ctx) => [await unlockOne(first(ctx), str(ctx, "password"))]
	},
	redact: {
		accept: PDF,
		fields: [{
			name: "terms",
			label: "Words or phrases to redact",
			type: "textarea",
			placeholder: "john@example.com\nAccount 1234",
			default: ""
		}, {
			name: "caseSensitive",
			label: "Match case",
			type: "checkbox",
			default: false
		}],
		run: async (ctx) => {
			const file = first(ctx);
			const terms = str(ctx, "terms").split("\n").map((t) => t.trim()).filter(Boolean);
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
						const item = raw;
						if (!item.str) continue;
						const haystack = caseSensitive ? item.str : item.str.toLowerCase();
						if (!terms.some((term) => haystack.includes(caseSensitive ? term : term.toLowerCase()))) continue;
						const x = (item.transform[4] ?? 0) * scale;
						const y = viewport.height - (item.transform[5] ?? 0) * scale;
						const w = (item.width || 10) * scale;
						const h = Math.max((item.height || 10) * scale, 8);
						ctx2d.fillRect(x - 1, y - h, w + 2, h + 3);
					}
				}
				const jpeg = await canvasToJpeg(canvas, .92);
				const image = await out.embedJpg(await bytesOf(jpeg));
				const base = page.getViewport({ scale: 1 });
				out.addPage([base.width, base.height]).drawImage(image, {
					x: 0,
					y: 0,
					width: base.width,
					height: base.height
				});
			}
			return [await savePdf(out, `${baseName(file.name)}-redacted.pdf`)];
		}
	},
	"jpg-to-pdf": {
		accept: IMAGES,
		multiple: true,
		uploadLabel: "Select images",
		fields: [{
			name: "pageSize",
			label: "Page size",
			type: "select",
			default: "a4",
			options: [{
				value: "a4",
				label: "A4"
			}, {
				value: "fit",
				label: "Fit to image"
			}]
		}, {
			name: "margin",
			label: "Margin (pt)",
			type: "number",
			default: 24
		}],
		run: async (ctx) => {
			if (ctx.files.length === 0) throw new Error("Choose at least one image.");
			return [await savePdf(await imagesToPdf(ctx.files, {
				pageSize: str(ctx, "pageSize", "a4"),
				margin: num(ctx, "margin", 24),
				progress: ctx.progress
			}), "images.pdf")];
		}
	},
	"scan-to-pdf": {
		accept: IMAGES,
		multiple: true,
		uploadLabel: "Select scanned images",
		fields: [{
			name: "grayscale",
			label: "Clean up as a grayscale scan",
			type: "checkbox",
			default: true
		}, {
			name: "margin",
			label: "Margin (pt)",
			type: "number",
			default: 0
		}],
		run: async (ctx) => {
			if (ctx.files.length === 0) throw new Error("Choose at least one scan.");
			return [await savePdf(await imagesToPdf(ctx.files, {
				pageSize: "a4",
				margin: num(ctx, "margin", 0),
				grayscale: bool(ctx, "grayscale"),
				progress: ctx.progress
			}), "scan.pdf")];
		}
	},
	"word-to-pdf": {
		accept: ".doc,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		run: async (ctx) => {
			const file = first(ctx);
			ctx.progress("Reading the document…");
			const result = await (await import("../_libs/mammoth.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()))).convertToHtml({ arrayBuffer: await file.arrayBuffer() });
			const dom = new DOMParser().parseFromString(result.value, "text/html");
			const blocks = [];
			dom.body.querySelectorAll("h1,h2,h3,h4,p,li,tr").forEach((node) => {
				const text = (node.textContent ?? "").trim();
				const tag = node.tagName.toLowerCase();
				const size = tag === "h1" ? 20 : tag === "h2" ? 16 : tag === "h3" ? 14 : 11;
				blocks.push({
					text: tag === "li" ? `•  ${text}` : text,
					bold: tag.startsWith("h"),
					size
				});
			});
			if (blocks.length === 0) throw new Error("No readable text was found in that document.");
			return [await savePdf(await textToPdf(blocks), `${baseName(file.name)}.pdf`)];
		}
	},
	"excel-to-pdf": {
		accept: ".xls,.xlsx,.csv",
		run: async (ctx) => {
			const file = first(ctx);
			const XLSX = await import("../_libs/xlsx.mjs").then((n) => n.t);
			const wb = XLSX.read(await file.arrayBuffer(), { type: "array" });
			const blocks = [];
			for (const sheetName of wb.SheetNames) {
				const sheet = wb.Sheets[sheetName];
				if (!sheet) continue;
				blocks.push({
					text: sheetName,
					bold: true,
					size: 15
				});
				const rows = XLSX.utils.sheet_to_json(sheet, {
					header: 1,
					raw: false
				});
				for (const row of rows) blocks.push({
					text: (row ?? []).map((c) => String(c ?? "")).join("   |   "),
					size: 9
				});
				blocks.push({ text: "" });
			}
			return [await savePdf(await textToPdf(blocks, { title: baseName(file.name) }), `${baseName(file.name)}.pdf`)];
		}
	},
	"powerpoint-to-pdf": {
		accept: ".ppt,.pptx",
		run: async (ctx) => {
			const file = first(ctx);
			const zip = await (await import("../_libs/jszip+[...].mjs").then((n) => /* @__PURE__ */ __toESM(n.t()))).default.loadAsync(await file.arrayBuffer());
			const slideNames = Object.keys(zip.files).filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n)).sort((a, b) => Number(a.match(/\d+/)?.[0] ?? 0) - Number(b.match(/\d+/)?.[0] ?? 0));
			if (slideNames.length === 0) throw new Error("No slides were found in that file.");
			const doc = await PDFDocument.create();
			const font = await doc.embedFont(StandardFonts.Helvetica);
			const bold = await doc.embedFont(StandardFonts.HelveticaBold);
			for (const [index, name] of slideNames.entries()) {
				ctx.progress(`Converting slide ${index + 1} of ${slideNames.length}…`);
				const texts = [...(await zip.files[name].async("string")).matchAll(/<a:t>([^<]*)<\/a:t>/g)].map((m) => m[1] ?? "");
				const page = doc.addPage([720, 540]);
				page.drawRectangle({
					x: 0,
					y: 0,
					width: 720,
					height: 540,
					color: rgb(1, 1, 1)
				});
				let y = 470;
				texts.forEach((text, i) => {
					if (!text.trim() || y < 40) return;
					const size = i === 0 ? 26 : 14;
					page.drawText(text.slice(0, 90), {
						x: 48,
						y,
						size,
						font: i === 0 ? bold : font,
						color: rgb(.09, .09, .12)
					});
					y -= size * 1.7;
				});
			}
			return [await savePdf(doc, `${baseName(file.name)}.pdf`)];
		}
	},
	"html-to-pdf": {
		accept: ".html,.htm,text/html",
		fields: [{
			name: "html",
			label: "Or paste HTML",
			type: "textarea",
			default: "",
			placeholder: "<h1>Title</h1><p>Body…</p>"
		}],
		run: async (ctx) => {
			const pasted = str(ctx, "html").trim();
			const file = ctx.files[0];
			const source = pasted || (file ? await file.text() : "");
			if (!source) throw new Error("Upload an HTML file or paste some HTML.");
			const dom = new DOMParser().parseFromString(source, "text/html");
			dom.querySelectorAll("script,style").forEach((n) => n.remove());
			const blocks = [];
			dom.body.querySelectorAll("h1,h2,h3,h4,p,li,td,pre").forEach((node) => {
				const text = (node.textContent ?? "").trim();
				if (!text) return;
				const tag = node.tagName.toLowerCase();
				blocks.push({
					text: tag === "li" ? `•  ${text}` : text,
					bold: tag.startsWith("h"),
					size: tag === "h1" ? 20 : tag === "h2" ? 16 : tag === "h3" ? 14 : 11
				});
			});
			if (blocks.length === 0) blocks.push({ text: dom.body.textContent?.trim() || "Empty document" });
			return [await savePdf(await textToPdf(blocks, dom.title ? { title: dom.title } : {}), `${file ? baseName(file.name) : "page"}.pdf`)];
		}
	},
	"pdf-to-jpg": {
		accept: PDF,
		fields: [{
			name: "dpi",
			label: "Quality",
			type: "select",
			default: "2",
			options: [
				{
					value: "1",
					label: "Screen (72 dpi)"
				},
				{
					value: "2",
					label: "High (150 dpi)"
				},
				{
					value: "3",
					label: "Print (216 dpi)"
				}
			]
		}, {
			name: "pages",
			label: "Pages",
			type: "text",
			placeholder: "all",
			default: ""
		}],
		run: async (ctx) => {
			const file = first(ctx);
			const doc = await getPdfJsDoc(file);
			const wanted = parseRanges(str(ctx, "pages"), doc.numPages);
			const scale = num(ctx, "dpi", 2);
			const images = [];
			for (const index of wanted) {
				ctx.progress(`Rendering page ${index + 1}…`);
				const canvas = await renderPageToCanvas(await doc.getPage(index + 1), scale);
				images.push({
					name: `${baseName(file.name)}-page-${index + 1}.jpg`,
					blob: await canvasToJpeg(canvas, .92)
				});
			}
			if (images.length === 0) throw new Error("No pages matched.");
			if (images.length === 1) return images;
			return [await zipFiles(images, `${baseName(file.name)}-images.zip`)];
		}
	},
	"pdf-to-text": {
		accept: PDF,
		fields: [{
			name: "breaks",
			label: "Add page separators",
			type: "checkbox",
			default: true
		}],
		run: async (ctx) => {
			const file = first(ctx);
			const text = (await extractText(file)).map((page) => `${bool(ctx, "breaks") ? `--- Page ${page.page} ---\n` : ""}${page.lines.join("\n")}`).join("\n\n");
			return [{
				name: `${baseName(file.name)}.txt`,
				blob: new Blob([text], { type: "text/plain;charset=utf-8" })
			}];
		}
	},
	"pdf-to-word": {
		accept: PDF,
		run: async (ctx) => {
			const file = first(ctx);
			ctx.progress("Extracting text…");
			const pages = await extractText(file);
			const { Document, Packer, Paragraph, TextRun } = await import("../_libs/docx.mjs").then((n) => n.t);
			const doc = new Document({ sections: [{ children: pages.flatMap((page) => [
				new Paragraph({ children: [new TextRun({
					text: `Page ${page.page}`,
					bold: true,
					size: 26
				})] }),
				...page.lines.map((line) => new Paragraph({ children: [new TextRun({ text: line })] })),
				new Paragraph({ children: [] })
			]) }] });
			const blob = await Packer.toBlob(doc);
			return [{
				name: `${baseName(file.name)}.docx`,
				blob
			}];
		}
	},
	"pdf-to-excel": {
		accept: PDF,
		run: async (ctx) => {
			const file = first(ctx);
			const pages = await extractText(file);
			const XLSX = await import("../_libs/xlsx.mjs").then((n) => n.t);
			const wb = XLSX.utils.book_new();
			for (const page of pages) {
				const rows = page.lines.map((line) => line.split(/\s{2,}|\t|\s\|\s/));
				const sheet = XLSX.utils.aoa_to_sheet(rows.length ? rows : [[""]]);
				XLSX.utils.book_append_sheet(wb, sheet, `Page ${page.page}`.slice(0, 31));
			}
			const out = XLSX.write(wb, {
				bookType: "xlsx",
				type: "array"
			});
			return [{
				name: `${baseName(file.name)}.xlsx`,
				blob: new Blob([out], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
			}];
		}
	},
	"pdf-to-powerpoint": {
		accept: PDF,
		fields: [{
			name: "asImages",
			label: "Use page images (keeps the layout)",
			type: "checkbox",
			default: true
		}],
		run: async (ctx) => {
			const file = first(ctx);
			const PptxGenJS = (await import("../_libs/pptxgenjs.mjs").then((n) => n.t)).default;
			const pptx = new PptxGenJS();
			pptx.defineLayout({
				name: "PDF",
				width: 10,
				height: 7.5
			});
			pptx.layout = "PDF";
			if (bool(ctx, "asImages")) {
				const doc = await getPdfJsDoc(file);
				for (let i = 1; i <= doc.numPages; i += 1) {
					ctx.progress(`Rendering page ${i} of ${doc.numPages}…`);
					const canvas = await renderPageToCanvas(await doc.getPage(i), 2);
					pptx.addSlide().addImage({
						data: canvas.toDataURL("image/jpeg", .9),
						x: 0,
						y: 0,
						w: 10,
						h: 7.5
					});
				}
			} else {
				const pages = await extractText(file);
				for (const page of pages) pptx.addSlide().addText(page.lines.join("\n") || `Page ${page.page}`, {
					x: .5,
					y: .5,
					w: 9,
					h: 6.5,
					fontSize: 12
				});
			}
			const blob = await pptx.write({ outputType: "blob" });
			return [{
				name: `${baseName(file.name)}.pptx`,
				blob
			}];
		}
	},
	"extract-images": {
		accept: PDF,
		run: async (ctx) => {
			const file = first(ctx);
			const doc = await getPdfJsDoc(file);
			const images = [];
			for (let i = 1; i <= doc.numPages; i += 1) {
				ctx.progress(`Scanning page ${i} of ${doc.numPages}…`);
				const page = await doc.getPage(i);
				const ops = await page.getOperatorList();
				const names = /* @__PURE__ */ new Set();
				ops.fnArray.forEach((fn, index) => {
					if (fn === pdfjsOps.paintImageXObject || fn === pdfjsOps.paintJpegXObject) {
						const arg = ops.argsArray[index]?.[0];
						if (typeof arg === "string") names.add(arg);
					}
				});
				for (const name of names) {
					const img = await new Promise((resolve) => {
						try {
							page.objs.get(name, resolve);
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
					if (img.bitmap) c2d.drawImage(img.bitmap, 0, 0);
					else if (img.data) {
						const out = c2d.createImageData(img.width, img.height);
						const src = img.data;
						const channels = src.length / (img.width * img.height);
						for (let p = 0, q = 0; p < out.data.length; p += 4, q += channels) if (channels >= 3) {
							out.data[p] = src[q] ?? 0;
							out.data[p + 1] = src[q + 1] ?? 0;
							out.data[p + 2] = src[q + 2] ?? 0;
							out.data[p + 3] = channels === 4 ? src[q + 3] ?? 255 : 255;
						} else {
							const v = src[q] ?? 0;
							out.data[p] = v;
							out.data[p + 1] = v;
							out.data[p + 2] = v;
							out.data[p + 3] = 255;
						}
						c2d.putImageData(out, 0, 0);
					} else continue;
					images.push({
						name: `page-${i}-${images.length + 1}.png`,
						blob: await canvasToPng(canvas)
					});
				}
			}
			if (images.length === 0) throw new Error("No embedded images were found in this PDF.");
			if (images.length === 1) return images;
			return [await zipFiles(images, `${baseName(file.name)}-images.zip`)];
		}
	},
	"batch-compress": {
		accept: PDF,
		multiple: true,
		uploadLabel: "Select PDFs",
		fields: [{
			name: "level",
			label: "Compression level",
			type: "select",
			default: "medium",
			options: [
				{
					value: "low",
					label: "Light — best quality"
				},
				{
					value: "medium",
					label: "Recommended"
				},
				{
					value: "high",
					label: "Strong — smallest file"
				}
			]
		}, {
			name: "grayscale",
			label: "Convert to grayscale",
			type: "checkbox",
			default: false
		}],
		run: (ctx) => batch(ctx, (file) => compressOne(ctx, file), "compressed-pdfs.zip")
	},
	"batch-protect": {
		accept: PDF,
		multiple: true,
		uploadLabel: "Select PDFs",
		fields: [{
			name: "password",
			label: "Password",
			type: "password",
			default: ""
		}],
		run: (ctx) => {
			const password = str(ctx, "password");
			if (!password) throw new Error("Enter a password.");
			return batch(ctx, (file) => protectOne(file, password, password), "protected-pdfs.zip");
		}
	},
	"batch-unlock": {
		accept: PDF,
		multiple: true,
		uploadLabel: "Select PDFs",
		fields: [{
			name: "password",
			label: "Password",
			type: "password",
			default: ""
		}],
		run: (ctx) => batch(ctx, (file) => unlockOne(file, str(ctx, "password")), "unlocked-pdfs.zip")
	},
	"batch-watermark": {
		accept: PDF,
		multiple: true,
		uploadLabel: "Select PDFs",
		fields: watermarkFields,
		run: (ctx) => batch(ctx, async (file) => {
			const text = str(ctx, "text", "CONFIDENTIAL");
			const { doc } = await stampText(ctx, {
				file,
				text: () => text,
				size: num(ctx, "size", 60),
				color: str(ctx, "color", "#7c3aed"),
				opacity: num(ctx, "opacity", .18),
				position: "center",
				rotate: num(ctx, "angle", 45),
				pagesInput: str(ctx, "pages")
			});
			return savePdf(doc, `${baseName(file.name)}-watermarked.pdf`);
		}, "watermarked-pdfs.zip")
	},
	"batch-header-footer": {
		accept: PDF,
		multiple: true,
		uploadLabel: "Select PDFs",
		fields: headerFooterFields,
		run: (ctx) => batch(ctx, (file) => applyHeaderFooter(ctx, file), "header-footer-pdfs.zip")
	},
	"batch-repair": {
		accept: PDF,
		multiple: true,
		uploadLabel: "Select PDFs",
		run: (ctx) => batch(ctx, (file) => repairOne(file), "repaired-pdfs.zip")
	}
};
var pdfjsOps = {
	paintImageXObject: 85,
	paintJpegXObject: 82
};
function getToolImpl(slug) {
	return toolImpls[slug];
}
function formatFileSize(bytes) {
	if (bytes === 0) return "0 Bytes";
	const sizes = [
		"Bytes",
		"KB",
		"MB",
		"GB"
	];
	const index = Math.floor(Math.log(bytes) / Math.log(1024));
	const size = bytes / Math.pow(1024, index);
	return `${size.toFixed(size >= 10 ? 0 : 1)} ${sizes[index]}`;
}
/** Modal preview for PDFs, images and text-ish files. */
function PreviewModal({ target, onClose }) {
	const [text, setText] = (0, import_react.useState)(null);
	const kind = !target ? "none" : target.type.includes("pdf") || target.name.toLowerCase().endsWith(".pdf") ? "pdf" : target.type.startsWith("image/") ? "image" : /\.(txt|csv|json|md|html?)$/i.test(target.name) || target.type.startsWith("text/") ? "text" : "other";
	(0, import_react.useEffect)(() => {
		if (!target) return;
		const onKey = (e) => e.key === "Escape" && onClose();
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [target, onClose]);
	(0, import_react.useEffect)(() => {
		let alive = true;
		setText(null);
		if (target && kind === "text") fetch(target.url).then((r) => r.text()).then((t) => alive && setText(t.slice(0, 2e5))).catch(() => alive && setText("Unable to read this file."));
		return () => {
			alive = false;
		};
	}, [target, kind]);
	if (!target) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-sm font-semibold text-white",
					children: target.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Close preview",
					onClick: onClose,
					className: "rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 bg-slate-900",
				children: kind === "pdf" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					title: target.name,
					src: target.url,
					className: "h-full w-full"
				}) : kind === "image" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full w-full items-center justify-center overflow-auto p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: target.url,
						alt: `Preview of ${target.name}`,
						className: "max-h-full max-w-full object-contain"
					})
				}) : kind === "text" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "h-full w-full overflow-auto whitespace-pre-wrap p-4 font-mono text-xs text-slate-200",
					children: text ?? "Loading…"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full items-center justify-center p-6 text-center text-sm text-slate-400",
					children: "Preview isn’t available for this file type — download it to open in its app."
				})
			})]
		})
	});
}
function PreviewButton({ onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1 text-[11px] font-semibold text-slate-200 transition hover:bg-white/10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" }), "Preview"]
	});
}
function defaultValues(fields) {
	const values = {};
	for (const field of fields) {
		if (field.type === "file") continue;
		values[field.name] = field.default ?? (field.type === "checkbox" ? false : "");
	}
	return values;
}
var inputClass = "w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500";
function ToolRunner({ slug, title, description, icon }) {
	const impl = getToolImpl(slug);
	const fields = (0, import_react.useMemo)(() => impl?.fields ?? [], [impl]);
	const [files, setFiles] = (0, import_react.useState)([]);
	const [extraFiles, setExtraFiles] = (0, import_react.useState)({});
	const [values, setValues] = (0, import_react.useState)(() => defaultValues(fields));
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [status, setStatus] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [results, setResults] = (0, import_react.useState)([]);
	const [names, setNames] = (0, import_react.useState)({});
	const inputRef = (0, import_react.useRef)(null);
	const [preview, setPreview] = (0, import_react.useState)(null);
	const tempUrl = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => () => {
		if (tempUrl.current) URL.revokeObjectURL(tempUrl.current);
	}, []);
	const closePreview = () => {
		setPreview(null);
		if (tempUrl.current) {
			URL.revokeObjectURL(tempUrl.current);
			tempUrl.current = null;
		}
	};
	const previewFile = (file) => {
		if (tempUrl.current) URL.revokeObjectURL(tempUrl.current);
		tempUrl.current = URL.createObjectURL(file);
		setPreview({
			name: file.name,
			type: file.type,
			url: tempUrl.current
		});
	};
	if (!impl) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center text-sm text-slate-400",
		children: "This tool is not available yet."
	});
	const setValue = (name, value) => setValues((prev) => ({
		...prev,
		[name]: value
	}));
	const clearResults = () => {
		setPreview(null);
		results.forEach((r) => URL.revokeObjectURL(r.url));
		setResults([]);
		setNames({});
		setError("");
		setStatus("");
	};
	const onPick = (list) => {
		if (!list || list.length === 0) return;
		const picked = Array.from(list);
		setFiles((prev) => impl.multiple ? [...prev, ...picked] : picked.slice(0, 1));
		clearResults();
	};
	const run = async () => {
		clearResults();
		setBusy(true);
		try {
			const out = await impl.run({
				files,
				values,
				extraFiles,
				progress: (message) => setStatus(message)
			});
			setResults(out.map((file) => ({
				...file,
				url: URL.createObjectURL(file.blob)
			})));
			setStatus("");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong processing that file.");
			setStatus("");
		} finally {
			setBusy(false);
		}
	};
	const canProcess = !busy && files.length > 0;
	const disabledReason = files.length === 0 ? "Upload a file first." : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[0.95fr_1.05fr]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white",
							children: icon ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold text-white",
							children: title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-slate-400",
							children: description
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-2 block text-sm font-medium text-slate-300",
						children: impl.uploadLabel ?? "Upload file"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						type: "file",
						accept: impl.accept,
						multiple: impl.multiple,
						className: "hidden",
						onChange: (event) => {
							onPick(event.target.files);
							event.target.value = "";
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => inputRef.current?.click(),
						onDragOver: (event) => event.preventDefault(),
						onDrop: (event) => {
							event.preventDefault();
							onPick(event.dataTransfer.files);
						},
						className: "flex w-full flex-col items-center gap-3 rounded-2xl border border-dashed border-white/15 bg-slate-950 px-6 py-10 text-center transition hover:border-violet-500/50 hover:bg-violet-500/[0.06]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-300",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-base font-semibold text-white",
								children: [
									"Click to browse or drop ",
									impl.multiple ? "files" : "a file",
									" here"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-slate-500",
								children: "Everything runs in your browser — nothing is uploaded to a server."
							})
						]
					}),
					files.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2",
						children: files.map((file, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-slate-200",
								children: file.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex shrink-0 items-center gap-3 text-xs text-slate-500",
								children: [
									formatFileSize(file.size),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewButton, { onClick: () => previewFile(file) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": `Remove ${file.name}`,
										onClick: () => {
											setFiles((prev) => prev.filter((_, i) => i !== index));
											clearResults();
										},
										className: "text-slate-400 transition hover:text-white",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
									})
								]
							})]
						}, `${file.name}-${index}`))
					}) : null,
					fields.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid gap-4 sm:grid-cols-2",
						children: fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: field.type === "textarea" ? "sm:col-span-2" : void 0,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: `field-${field.name}`,
									className: "mb-2 block text-sm font-medium text-slate-300",
									children: field.label
								}),
								field.type === "select" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									id: `field-${field.name}`,
									className: inputClass,
									value: String(values[field.name] ?? ""),
									onChange: (e) => setValue(field.name, e.target.value),
									children: field.options?.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: option.value,
										className: "bg-slate-900",
										children: option.label
									}, option.value))
								}) : field.type === "checkbox" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-200",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: `field-${field.name}`,
										type: "checkbox",
										className: "h-4 w-4 accent-violet-500",
										checked: Boolean(values[field.name]),
										onChange: (e) => setValue(field.name, e.target.checked)
									}), "Enabled"]
								}) : field.type === "textarea" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									id: `field-${field.name}`,
									rows: 10,
									className: `${inputClass} resize-y font-mono text-xs`,
									placeholder: field.placeholder,
									value: String(values[field.name] ?? ""),
									onChange: (e) => setValue(field.name, e.target.value)
								}) : field.type === "file" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: `field-${field.name}`,
									type: "file",
									accept: field.accept,
									className: `${inputClass} file:mr-3 file:rounded-lg file:border-0 file:bg-violet-600 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-white`,
									onChange: (e) => setExtraFiles((prev) => ({
										...prev,
										[field.name]: e.target.files?.[0] ?? null
									}))
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: `field-${field.name}`,
									type: field.type === "number" ? "number" : field.type === "password" ? "password" : field.type === "color" ? "color" : "text",
									step: "any",
									className: `${inputClass} ${field.type === "color" ? "h-12 p-1" : ""}`,
									placeholder: field.placeholder,
									value: String(values[field.name] ?? ""),
									onChange: (e) => setValue(field.name, field.type === "number" ? Number(e.target.value) : e.target.value)
								}),
								field.help ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-xs text-slate-500",
									children: field.help
								}) : null
							]
						}, field.name))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: run,
							disabled: !canProcess,
							className: "inline-flex min-h-11 items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:hover:bg-slate-700",
							children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" }), busy ? "Processing..." : impl.actionLabel ?? `Run ${title}`]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setFiles([]);
								setExtraFiles({});
								setValues(defaultValues(fields));
								clearResults();
							},
							className: "inline-flex min-h-11 items-center gap-2 rounded-xl border border-red-500/30 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eraser, { className: "h-4 w-4" }), "Clear"]
						})]
					}),
					!canProcess && disabledReason ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-amber-300",
						children: disabledReason
					}) : null,
					status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-slate-400",
						children: status
					}) : null,
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 shrink-0" }), error]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold text-white",
						children: "Result"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-slate-500",
						children: "Your processed file appears here, ready to download."
					})] }), results.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-200",
						children: "Output ready"
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 rounded-2xl border border-white/10 bg-slate-950 p-4",
					children: results.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: results.map((file) => {
							const dot = file.name.lastIndexOf(".");
							const base = dot > 0 ? file.name.slice(0, dot) : file.name;
							const ext = dot > 0 ? file.name.slice(dot) : "";
							const current = names[file.name] ?? base;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-2xl border border-white/10 bg-slate-900/70 p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-2 flex flex-wrap items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-[11px] font-semibold text-violet-200",
											children: (ext || ".file").replace(".", "").toUpperCase()
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-300",
											children: formatFileSize(file.blob.size)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "mb-1.5 block text-xs font-medium text-slate-400",
										children: "File name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex w-full flex-col gap-2 sm:flex-row sm:items-center",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: current,
												spellCheck: false,
												onChange: (event) => setNames((prev) => ({
													...prev,
													[file.name]: event.target.value
												})),
												className: "min-h-11 w-full min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950 px-3.5 py-2.5 text-sm font-medium text-white outline-none transition focus:border-violet-500"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => {
													closePreview();
													setPreview({
														name: `${current || base}${ext}`,
														type: file.blob.type,
														url: file.url
													});
												},
												className: "inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 sm:w-auto",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" }), "Preview"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: file.url,
												download: `${current || base}${ext}`,
												className: "inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500 sm:w-auto",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), "Download"]
											})
										]
									})
								]
							}, file.name);
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setFiles([]);
							clearResults();
						},
						className: "mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10",
						children: "Process another file"
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex min-h-[360px] items-center justify-center rounded-xl border border-dashed border-white/10 bg-slate-900/40 text-center text-sm text-slate-500",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mx-auto mb-3 h-10 w-10" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-slate-300",
									children: "No output yet"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 leading-6",
									children: "Upload a file, choose your settings, and process it. Your result will appear here."
								})
							]
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewModal, {
				target: preview,
				onClose: closePreview
			})
		]
	});
}
function StepCard({ step, index }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-violet-950/20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute right-4 top-4 text-xs font-bold text-slate-600",
				children: String(index + 1).padStart(2, "0")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/15 to-violet-500/15 text-cyan-300 shadow-lg shadow-cyan-950/20 transition duration-300 group-hover:scale-105 group-hover:border-violet-400/30 group-hover:text-violet-300",
				children: step.icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-base font-semibold text-white",
				children: step.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-6 text-slate-400",
				children: step.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 h-1 w-10 overflow-hidden rounded-full bg-slate-800",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-transform duration-300 group-hover:scale-x-100" })
			})
		]
	});
}
function HowToUse({ title = "How to use", subtitle = "Follow these simple steps to use this tool.", steps, desktopSteps }) {
	const lgSteps = desktopSteps ?? steps;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto mt-16 w-full max-w-6xl px-4 sm:px-6 lg:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-2xl text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl font-bold tracking-tight text-white sm:text-4xl",
				children: title
			}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-3 text-sm leading-6 text-slate-400 sm:text-base",
				children: subtitle
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mt-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": "true",
					className: "absolute left-[16.66%] right-[16.66%] top-7 hidden h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent lg:block"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden gap-5 sm:grid sm:grid-cols-2 lg:hidden",
					children: steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCard, {
						step,
						index
					}, `${step.title}-tablet-${index}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden gap-5 lg:grid lg:grid-cols-3",
					children: lgSteps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCard, {
						step,
						index
					}, `${step.title}-desktop-${index}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:hidden",
					children: steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex w-full items-center gap-4 rounded-2xl border border-cyan-400/10 bg-[#071522] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.18)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/10 bg-[#092B40] text-[#63E5F7] shadow-[0_0_18px_rgba(34,211,238,0.08)]",
							children: step.icon
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1 pr-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-[14px] font-semibold leading-5 text-white",
									children: step.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 text-[11px] font-bold text-slate-600",
									children: String(index + 1).padStart(2, "0")
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[12px] leading-5 text-slate-400",
								children: step.description
							})]
						})]
					}, `${step.title}-mobile-${index}`))
				})
			]
		})]
	});
}
function PdfToolPage() {
	const { title, description, slug } = Route.useLoaderData();
	const inputRef = (0, import_react.useRef)(null);
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative min-h-screen overflow-hidden bg-slate-950",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute left-1/2 top-0 -z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/25 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "relative py-12 sm:py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-bold tracking-tight text-white sm:text-5xl",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg",
						children: description
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto mt-8 max-w-6xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "mb-6 inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-slate-200 shadow-sm transition-all duration-200 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white active:scale-[0.98]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), "Back to tools"]
					}), slug === "pdf-editor" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-violet-950/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center px-5 py-10 sm:px-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: inputRef,
									type: "file",
									accept: "application/pdf",
									className: "hidden",
									onChange: (event) => {
										const file = event.target.files?.[0];
										if (!file) return;
										storePdfForEditor(file);
										navigate({ to: "/pdf-editor" });
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => inputRef.current?.click(),
									className: "inline-flex min-w-[280px] items-center justify-center gap-4 rounded-2xl bg-violet-600 px-7 py-4 text-lg font-bold text-white shadow-xl shadow-violet-950/30 transition hover:-translate-y-0.5 hover:bg-violet-500",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-6 w-6" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Upload PDF file" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: async () => {
										storePdfForEditor(await createBlankPdfFile());
										navigate({ to: "/pdf-editor" });
									},
									className: "mt-5 inline-flex items-center gap-2 text-base font-medium text-slate-400 transition hover:text-white",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlusCorner, { className: "h-5 w-5" }), "or start with a blank document"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-sm text-slate-500",
									children: "Files stay in your browser — nothing is uploaded to a server."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/5 bg-black/10 px-5 py-5 text-xs text-slate-500 sm:text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓ Edit existing text" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓ Organize pages" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓ Sign & annotate" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓ Download edited PDF" })
							]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolRunner, {
						slug,
						title,
						description
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowToUse, {
					title: `How to use ${title}`,
					subtitle: "",
					steps: [
						{
							title: "Upload file",
							description: `Select or drop your file into the ${title} panel. Files never leave your browser.`,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-5 w-5" })
						},
						{
							title: "Choose settings",
							description: "Adjust the available options such as page ranges, text, quality, or passwords.",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crop, { className: "h-5 w-5" })
						},
						{
							title: "Process",
							description: "Run the tool and wait a moment while everything is processed on your device.",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5" })
						},
						{
							title: "Download",
							description: "Rename the output if you like, then download your finished file.",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-5 w-5" })
						}
					],
					desktopSteps: [
						{
							title: "Browse tools",
							description: "All PDF tools stay visible under the ALL view by default.",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5" })
						},
						{
							title: "Choose a tool",
							description: "Click Merge PDF, Rotate PDF, Compress PDF, PDF to Excel, or any other tool card.",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crop, { className: "h-5 w-5" })
						},
						{
							title: "Upload file",
							description: "Upload a PDF, image set, Office file, or use HTML content depending on the selected tool.",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-5 w-5" })
						},
						{
							title: "Set options",
							description: "Adjust page ranges, crop margins, passwords, form values, watermark settings, or conversion options.",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crop, { className: "h-5 w-5" })
						},
						{
							title: "Process",
							description: "Run the action using browser tools or the PDF backend, depending on the tool.",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5" })
						},
						{
							title: "Download",
							description: "Download the finished PDF, DOCX, JPG, ZIP, PPTX, XLSX, or compare report.",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-5 w-5" })
						}
					]
				})
			]
		})]
	});
}
//#endregion
export { PdfToolPage as component };
