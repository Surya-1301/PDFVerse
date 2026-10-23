require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const os = require("os");
const { execFile } = require("child_process");
const crypto = require("crypto");

const { indexDocument, answerFromDocument } = require("./rag");

const app = express();

const PORT = process.env.PORT || 4000;

function isAllowedOrigin(origin) {
  if (!origin) return true;

  // Capacitor Android app shell
  if (origin === "capacitor://localhost") {
    return true;
  }

  // Local development (allow any localhost or 127.0.0.1 port, such as 5173, 3000, etc.)
  if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
    return true;
  }

  // Cloudflare Pages production and all branch/preview deployments
  if (
    origin === "https://pdfverse.pages.dev" ||
    /^https:\/\/[a-zA-Z0-9_-]+\.pdfverse\.pages\.dev$/.test(origin) ||
    /^https:\/\/[a-zA-Z0-9_-]+\.pages\.dev$/.test(origin)
  ) {
    return true;
  }

  return false;
}

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
    exposedHeaders: [
      "Content-Disposition",
      "X-Original-Size",
      "X-Compressed-Size",
      "X-Compression-Used",
    ],
    credentials: true,
  }),
);

app.use(express.json({ limit: "120mb" }));
app.use(express.urlencoded({ extended: true, limit: "120mb" }));

const pdfStorage = multer.diskStorage({
  destination: async function (_req, _file, callback) {
    const uploadDir = path.join(os.tmpdir(), "PDFVerse-pdf-uploads");

    try {
      await fsp.mkdir(uploadDir, { recursive: true });
      callback(null, uploadDir);
    } catch (error) {
      callback(error);
    }
  },
  filename: function (_req, file, callback) {
    const id = crypto.randomBytes(16).toString("hex");
    const safeOriginalName =
      path
        .basename(file.originalname || "document")
        .replace(/[^a-zA-Z0-9._-]/g, "-")
        .slice(0, 80) || "document";

    callback(null, `${id}-${safeOriginalName}`);
  },
});

const upload = multer({
  storage: pdfStorage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
    files: 1,
  },
  fileFilter: function (_req, file, callback) {
    const name = file.originalname.toLowerCase();

    const isAllowed =
      file.mimetype === "application/pdf" ||
      name.endsWith(".pdf") ||
      name.endsWith(".doc") ||
      name.endsWith(".docx") ||
      name.endsWith(".ppt") ||
      name.endsWith(".pptx") ||
      name.endsWith(".xls") ||
      name.endsWith(".xlsx");

    if (!isAllowed) {
      callback(new Error("Only PDF or Office files are allowed."));
      return;
    }

    callback(null, true);
  },
});

const batchUpload = multer({
  storage: pdfStorage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB per file
    files: 20,
  },
  fileFilter: function (_req, file, callback) {
    const isPdf =
      file.mimetype === "application/pdf" ||
      file.originalname.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      callback(new Error("Only PDF files are allowed."));
      return;
    }

    callback(null, true);
  },
});

const compareUpload = multer({
  storage: pdfStorage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB per file
    files: 2,
  },
  fileFilter: function (_req, file, callback) {
    const isPdf =
      file.mimetype === "application/pdf" ||
      file.originalname.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      callback(new Error("Only PDF files are allowed."));
      return;
    }

    callback(null, true);
  },
});

function runPythonScript(
  script,
  args,
  fallbackMessage,
  timeout = 240000,
) {
  return new Promise((resolve, reject) => {
    const pythonCommand =
      process.env.PYTHON_BIN ||
      "python3";

    execFile(
      pythonCommand,
      ["-c", script, ...args],
      {
        timeout,

        maxBuffer:
          100 * 1024 * 1024,

        encoding: "utf8",
      },
      (
        error,
        stdout,
        stderr,
      ) => {
        if (error) {
          reject(
            new Error(
              stderr?.trim() ||
                stdout?.trim() ||
                error.message ||
                fallbackMessage,
            ),
          );

          return;
        }

        resolve(
          String(stdout || ""),
        );
      },
    );
  });
}

async function extractPdfPages(
  inputPath,
) {
  const pyScript = `
import base64
import fitz
import json
import sys

input_path = sys.argv[1]

doc = fitz.open(input_path)

pages = []

for page in doc:
    text = page.get_text("text") or ""
    pages.append(text)

doc.close()

payload = json.dumps(
    pages,
    ensure_ascii=False,
)

encoded = base64.b64encode(
    payload.encode("utf-8")
).decode("ascii")

print("PDFVERSE_RESULT_START")
print(encoded)
print("PDFVERSE_RESULT_END")
`.trim();

  const stdout =
    await runPythonScript(
      pyScript,
      [inputPath],
      "Could not extract text from the PDF.",
    );

  const startMarker =
    "PDFVERSE_RESULT_START";

  const endMarker =
    "PDFVERSE_RESULT_END";

  const start =
    stdout.indexOf(
      startMarker,
    );

  const end =
    stdout.indexOf(
      endMarker,
      start +
        startMarker.length,
    );

  if (
    start === -1 ||
    end === -1
  ) {
    console.error(
      "[Chat PDF] Unexpected Python output:",
      stdout,
    );

    throw new Error(
      "PDF text extraction did not return the expected result.",
    );
  }

  const encoded =
    stdout
      .slice(
        start +
          startMarker.length,
        end,
      )
      .trim();

  if (!encoded) {
    throw new Error(
      "PDF text extraction returned empty data.",
    );
  }

  let jsonText;

  try {
    jsonText =
      Buffer.from(
        encoded,
        "base64",
      ).toString("utf8");
  } catch (error) {
    throw new Error(
      "Could not decode PDF text extraction result.",
    );
  }

  let pages;

  try {
    pages =
      JSON.parse(
        jsonText,
      );
  } catch (error) {
    console.error(
      "[Chat PDF] Invalid decoded JSON:",
      jsonText.slice(
        0,
        2000,
      ),
    );

    throw new Error(
      "PDF text extraction returned invalid JSON.",
    );
  }

  if (
    !Array.isArray(
      pages,
    )
  ) {
    throw new Error(
      "PDF text extraction returned an invalid page list.",
    );
  }

  return pages.map(
    (page) =>
      String(
        page || "",
      ),
  );
}

function getPdfSettings(quality) {
  const value = Number(quality);

  if (Number.isNaN(value)) return "/ebook";
  if (value >= 0.85) return "/printer";
  if (value >= 0.6) return "/ebook";

  return "/screen";
}

function getImageResolution(quality) {
  const value = Number(quality);

  if (Number.isNaN(value)) {
    return { color: "120", gray: "120", mono: "150" };
  }

  if (value >= 0.85) {
    return { color: "220", gray: "220", mono: "300" };
  }

  if (value >= 0.6) {
    return { color: "150", gray: "150", mono: "200" };
  }

  if (value >= 0.35) {
    return { color: "100", gray: "100", mono: "150" };
  }

  return { color: "72", gray: "72", mono: "100" };
}

function findGhostscript() {
  if (process.env.GS_BIN && fs.existsSync(process.env.GS_BIN)) {
    return process.env.GS_BIN;
  }
  const candidates = [
    "/opt/homebrew/bin/gs",
    "/usr/local/bin/gs",
    "/usr/bin/gs",
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      return c;
    }
  }
  return "gs";
}

async function compressWithGhostscript(inputPath, outputPath, quality) {
  const pdfSettings = getPdfSettings(quality);
  const resolution = getImageResolution(quality);

  const args = [
    "-sDEVICE=pdfwrite",
    "-dCompatibilityLevel=1.4",
    `-dPDFSETTINGS=${pdfSettings}`,
    "-dNOPAUSE",
    "-dQUIET",
    "-dBATCH",
    "-dDetectDuplicateImages=true",
    "-dCompressFonts=true",
    "-dSubsetFonts=true",
    "-dEmbedAllFonts=true",
    "-dAutoRotatePages=/None",
    "-dColorImageDownsampleType=/Bicubic",
    `-dColorImageResolution=${resolution.color}`,
    "-dGrayImageDownsampleType=/Bicubic",
    `-dGrayImageResolution=${resolution.gray}`,
    "-dMonoImageDownsampleType=/Subsample",
    `-dMonoImageResolution=${resolution.mono}`,
    "-dColorImageDownsampleThreshold=1.0",
    "-dGrayImageDownsampleThreshold=1.0",
    "-dMonoImageDownsampleThreshold=1.0",
    `-sOutputFile=${outputPath}`,
    inputPath,
  ];

  const gsBin = findGhostscript();

  try {
    await new Promise((resolve, reject) => {
      execFile(gsBin, args, { timeout: 120000 }, (error, stdout, stderr) => {
        if (error) {
          reject(
            new Error(
              stderr ||
                stdout ||
                error.message ||
                "Ghostscript PDF compression failed.",
            ),
          );
          return;
        }

        resolve();
      });
    });
  } catch (gsError) {
    console.warn(
      `[Compress] Ghostscript (${gsBin}) failed or not installed (${gsError.message}). Falling back to PyMuPDF compression.`,
    );

    const pyScript = `
import sys
import fitz

input_pdf = sys.argv[1]
output_pdf = sys.argv[2]
quality = float(sys.argv[3]) if len(sys.argv) > 3 else 0.6

doc = fitz.open(input_pdf)

# Downscale / recompress images if lower quality requested
if quality < 0.8:
    for page in doc:
        for img in page.get_images():
            xref = img[0]
            try:
                pix = fitz.Pixmap(doc, xref)
                if pix.n > 4:
                    pix = fitz.Pixmap(fitz.csRGB, pix)
                jpg_bytes = pix.tobytes("jpeg", jpg_quality=int(max(30, min(95, quality * 100))))
                page.clean_contents()
            except Exception:
                pass

doc.save(
    output_pdf,
    garbage=4,
    deflate=True,
    deflate_images=True,
    deflate_fonts=True,
    clean=True,
)
doc.close()
`.trim();

    await runPythonScript(
      pyScript,
      [inputPath, outputPath, String(quality)],
      "PyMuPDF PDF compression fallback failed.",
      120000,
    );
  }
}

function pdfToWord(inputPath, outputPath, mode = "layout") {
  // Both modes use smart PyMuPDF-based extraction for clean, editable Word output.
  // "layout" tries to preserve visual structure (headings, bullets, bold, columns).
  // "text"   does a clean linear text extraction with heading/bullet detection.

  const pyScript = `
import sys, re
import fitz
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

input_path = sys.argv[1]
output_path = sys.argv[2]
mode = sys.argv[3] if len(sys.argv) > 3 else "layout"

BULLET_CHARS = set("•▸▪◦‣○●►")

def is_all_caps_heading(text):
    clean = re.sub(r"[^a-zA-Z]", "", text)
    return len(clean) >= 2 and clean == clean.upper()

def strip_bullet(text):
    s = text.strip()
    if s and s[0] in BULLET_CHARS:
        return s[1:].strip()
    if re.match(r"^[-–—*]\\s", s):
        return s[2:].strip()
    return None

def set_para_border_bottom(para, color="999999", sz="4"):
    pPr = para._p.get_or_add_pPr()
    pBdr = OxmlElement("w:pBdr")
    bot  = OxmlElement("w:bottom")
    bot.set(qn("w:val"), "single")
    bot.set(qn("w:sz"), sz)
    bot.set(qn("w:space"), "1")
    bot.set(qn("w:color"), color)
    pBdr.append(bot)
    pPr.append(pBdr)

def add_page_break(doc):
    p   = doc.add_paragraph()
    run = p.add_run()
    br  = OxmlElement("w:br")
    br.set(qn("w:type"), "page")
    run._r.append(br)

def span_is_bold(span):
    flags = span.get("flags", 0)
    font  = span.get("font", "")
    return bool(flags & 16) or "bold" in font.lower()

def line_dominant_size(spans):
    sizes = [s.get("size", 11) for s in spans if s.get("text", "").strip()]
    return max(sizes) if sizes else 11

def build_runs(doc, para, spans):
    "Add mixed bold/normal runs from a line's spans into para."
    for span in spans:
        text = span.get("text", "")
        if not text:
            continue
        run = para.add_run(text)
        run.font.size = Pt(round(span.get("size", 11)))
        if span_is_bold(span):
            run.font.bold = True

doc_pdf  = fitz.open(input_path)
doc_word = Document()

# ── Page margins ──────────────────────────────────────────────────────────────
sec = doc_word.sections[0]
sec.page_width     = int(8.5 * 914400)
sec.page_height    = int(11  * 914400)
sec.top_margin     = int(0.75 * 914400)
sec.bottom_margin  = int(0.75 * 914400)
sec.left_margin    = int(1.0  * 914400)
sec.right_margin   = int(1.0  * 914400)

# ── Default Normal style ───────────────────────────────────────────────────────
normal = doc_word.styles["Normal"]
normal.font.name = "Calibri"
normal.font.size = Pt(11)

for page_num in range(len(doc_pdf)):
    page = doc_pdf[page_num]

    if page_num > 0:
        add_page_break(doc_word)

    # Collect all lines across blocks, sorted top-to-bottom
    lines_data = []
    blocks = page.get_text(
        "dict",
        flags=fitz.TEXT_PRESERVE_WHITESPACE | fitz.TEXT_PRESERVE_LIGATURES,
    )["blocks"]

    for block in blocks:
        if block.get("type") != 0:
            continue
        for line in block.get("lines", []):
            spans = line.get("spans", [])
            raw   = "".join(s.get("text", "") for s in spans)
            if not raw.strip():
                continue
            y0    = line["bbox"][1]
            x0    = line["bbox"][0]
            lines_data.append((y0, x0, raw.strip(), spans))

    lines_data.sort(key=lambda t: (round(t[0] / 4), t[1]))

    page_w = page.rect.width
    left_margin_px = page_w * 0.12

    # ── Merge lone bullet chars with the text that follows them ───────────────
    # In many PDFs the bullet "•" is a separate glyph at the same y-level as
    # its text but in a different text block, causing two separate "lines":
    #   line A: "•"          x=40  y=100
    #   line B: "Some text"  x=55  y=100
    # We stitch them back together here before classification.
    merged = []
    i = 0
    while i < len(lines_data):
        y0, x0, raw, spans = lines_data[i]
        is_lone_bullet = raw.strip() in BULLET_CHARS or (
            len(raw.strip()) <= 2 and raw.strip() and raw.strip()[0] in BULLET_CHARS
        )
        if is_lone_bullet and i + 1 < len(lines_data):
            ny, nx, nraw, nspans = lines_data[i + 1]
            # Merge if the next line is on the same or very close y-level
            if abs(ny - y0) < 10:
                merged.append((y0, x0, raw.strip() + " " + nraw.strip(), spans + nspans))
                i += 2
                continue
        merged.append((y0, x0, raw, spans))
        i += 1
    lines_data = merged

    # ── Classify and emit each line ───────────────────────────────────────────
    # Track whether we're "inside" a bullet context so that un-prefixed lines
    # that immediately follow a bullet are treated as continuation bullets.
    last_was_bullet = False

    for (y0, x0, raw, spans) in lines_data:
        text = raw.strip()
        if not text:
            last_was_bullet = False
            continue

        dom_size    = line_dominant_size(spans)
        any_bold    = any(span_is_bold(s) for s in spans if s.get("text", "").strip())
        indented    = x0 > left_margin_px + 18
        bullet_text = strip_bullet(text)
        is_caps     = is_all_caps_heading(text)

        # ── 1. Large standalone heading (name / doc title) ────────────────────
        if dom_size >= 16 and not indented:
            last_was_bullet = False
            p = doc_word.add_paragraph()
            p.paragraph_format.space_before = Pt(6)
            p.paragraph_format.space_after  = Pt(2)
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER if page_num == 0 else WD_ALIGN_PARAGRAPH.LEFT
            build_runs(doc_word, p, spans)

        # ── 2. ALL-CAPS section heading ───────────────────────────────────────
        elif is_caps and not indented and len(text) < 60:
            last_was_bullet = False
            p = doc_word.add_paragraph()
            p.paragraph_format.space_before = Pt(10)
            p.paragraph_format.space_after  = Pt(3)
            run = p.add_run(text)
            run.font.bold = True
            run.font.size = Pt(max(11, round(dom_size)))
            set_para_border_bottom(p)

        # ── 3. Sub-heading / job title (bold, not indented) ───────────────────
        elif any_bold and not indented and dom_size >= 10:
            last_was_bullet = False
            p = doc_word.add_paragraph()
            p.paragraph_format.space_before = Pt(5)
            p.paragraph_format.space_after  = Pt(1)
            build_runs(doc_word, p, spans)

        # ── 4. Explicit bullet (has bullet prefix char / dash) ────────────────
        elif bullet_text is not None:
            last_was_bullet = True
            if bullet_text == "":
                # Lone bullet with no text — skip the empty marker
                continue
            p = doc_word.add_paragraph(style="List Bullet")
            p.paragraph_format.left_indent  = Inches(0.3)
            p.paragraph_format.space_before = Pt(1)
            p.paragraph_format.space_after  = Pt(1)
            run = p.add_run(bullet_text)
            run.font.size = Pt(round(dom_size))

        # ── 5. Indented line (likely a bullet body without explicit prefix) ───
        elif indented and dom_size <= 12:
            last_was_bullet = True
            p = doc_word.add_paragraph(style="List Bullet")
            p.paragraph_format.left_indent  = Inches(0.3)
            p.paragraph_format.space_before = Pt(1)
            p.paragraph_format.space_after  = Pt(1)
            run = p.add_run(text)
            run.font.size = Pt(round(dom_size))

        # ── 6. Normal paragraph ───────────────────────────────────────────────
        else:
            last_was_bullet = False
            p = doc_word.add_paragraph()
            p.paragraph_format.space_after = Pt(2)
            build_runs(doc_word, p, spans)

doc_pdf.close()
doc_word.save(output_path)
`.trim();

  return runPythonScript(
    pyScript,
    [inputPath, outputPath, mode],
    "PDF to Word conversion failed.",
    300000,
  );
}

function pdfToExcel(inputPath, outputPath, mode = "auto") {
  const pyScript = `
import sys
import fitz
from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill, Border, Side
from openpyxl.utils import get_column_letter

input_path = sys.argv[1]
output_path = sys.argv[2]
mode = sys.argv[3] if len(sys.argv) > 3 else "auto"

doc = fitz.open(input_path)
wb = Workbook()
default_sheet = wb.active
wb.remove(default_sheet)

thin_border = Border(
    left=Side(style="thin", color="B7C7D9"),
    right=Side(style="thin", color="B7C7D9"),
    top=Side(style="thin", color="B7C7D9"),
    bottom=Side(style="thin", color="B7C7D9"),
)

header_fill = PatternFill("solid", fgColor="44566C")
header_font = Font(color="FFFFFF", bold=True)
bold_font = Font(bold=True)

def safe_sheet_name(name):
    cleaned = "".join("-" if char in "\\\\/*?:[]" else char for char in name).strip()
    return (cleaned or "Sheet")[:31]

def cluster_positions(values, tolerance):
    clusters = []

    for value in sorted(values):
        placed = False

        for cluster in clusters:
            if abs(cluster["center"] - value) <= tolerance:
                cluster["items"].append(value)
                cluster["center"] = sum(cluster["items"]) / len(cluster["items"])
                placed = True
                break

        if not placed:
            clusters.append({
                "center": value,
                "items": [value],
            })

    return [cluster["center"] for cluster in clusters]

def nearest_index(value, centers):
    if not centers:
        return 0

    best_index = 0
    best_distance = abs(value - centers[0])

    for index, center in enumerate(centers[1:], start=1):
        distance = abs(value - center)

        if distance < best_distance:
            best_index = index
            best_distance = distance

    return best_index

def write_words_layout(page, sheet):
    words = page.get_text("words")

    if not words:
        sheet["A1"] = "No extractable text found on this page."
        return

    x_values = []
    y_values = []

    for word in words:
        x0, y0, x1, y1, text = word[:5]

        if not str(text).strip():
            continue

        x_values.append(float(x0))
        y_values.append(float(y0))

    if not x_values or not y_values:
        sheet["A1"] = "No extractable text found on this page."
        return

    x_centers = cluster_positions(x_values, 18)
    y_centers = cluster_positions(y_values, 5)

    if len(x_centers) > 80:
        x_centers = cluster_positions(x_values, 28)

    if len(y_centers) > 300:
        y_centers = cluster_positions(y_values, 8)

    occupied = {}

    for word in words:
        x0, y0, x1, y1, text = word[:5]
        text = str(text).strip()

        if not text:
            continue

        row = nearest_index(float(y0), y_centers) + 1
        col = nearest_index(float(x0), x_centers) + 1

        key = (row, col)

        if key in occupied:
            occupied[key] = f"{occupied[key]} {text}"
        else:
            occupied[key] = text

    max_row = 1
    max_col = 1

    for (row, col), text in occupied.items():
        cell = sheet.cell(row=row, column=col, value=text)
        cell.alignment = Alignment(
            horizontal="center",
            vertical="center",
            wrap_text=True,
        )

        max_row = max(max_row, row)
        max_col = max(max_col, col)

        normalized = str(text).strip().lower()

        if (
            normalized in ["s no", "customer name", "shift"]
            or normalized.startswith("day ")
            or "customer" in normalized
        ):
            cell.fill = header_fill
            cell.font = header_font
            cell.border = thin_border
        elif normalized.isdigit() and col == 1:
            cell.font = bold_font

    for row in range(1, max_row + 1):
        for col in range(1, max_col + 1):
            sheet.cell(row=row, column=col).border = thin_border

    for col_index in range(1, max_col + 1):
        values = [
            str(sheet.cell(row=row, column=col_index).value or "")
            for row in range(1, max_row + 1)
        ]
        max_len = max([len(value) for value in values] or [8])

        if col_index == 1:
            width = 8
        elif max_len > 20:
            width = min(max_len + 2, 34)
        else:
            width = max(10, min(max_len + 2, 18))

        sheet.column_dimensions[get_column_letter(col_index)].width = width

    for row_index in range(1, max_row + 1):
        sheet.row_dimensions[row_index].height = 22

    sheet.freeze_panes = "A2"

    sheet.page_setup.orientation = "landscape"
    sheet.page_setup.fitToWidth = 1
    sheet.page_setup.fitToHeight = 0
    sheet.sheet_properties.pageSetUpPr.fitToPage = True
    sheet.page_margins.left = 0.25
    sheet.page_margins.right = 0.25
    sheet.page_margins.top = 0.4
    sheet.page_margins.bottom = 0.4

def write_detected_tables(page, sheet, tables):
    current_row = 1

    for table_index, table in enumerate(tables):
        extracted = table.extract() or []

        if not extracted:
            continue

        for row_offset, row_values in enumerate(extracted):
            for col_index, cell_value in enumerate(row_values, start=1):
                cell = sheet.cell(
                    current_row,
                    col_index,
                    "" if cell_value is None else str(cell_value),
                )
                cell.alignment = Alignment(
                    horizontal="center",
                    vertical="center",
                    wrap_text=True,
                )
                cell.border = thin_border

                if row_offset == 0:
                    cell.fill = header_fill
                    cell.font = header_font

            current_row += 1

        if table_index < len(tables) - 1:
            current_row += 2

    for col_index in range(1, sheet.max_column + 1):
        max_len = max(
            [
                len(str(sheet.cell(row=row, column=col_index).value or ""))
                for row in range(1, sheet.max_row + 1)
            ] or [8]
        )

        if col_index == 1:
            width = 8
        elif max_len > 20:
            width = min(max_len + 2, 34)
        else:
            width = max(10, min(max_len + 2, 18))

        sheet.column_dimensions[get_column_letter(col_index)].width = width

    for row_index in range(1, sheet.max_row + 1):
        sheet.row_dimensions[row_index].height = 22

    sheet.freeze_panes = "A2"

    sheet.page_setup.orientation = "landscape"
    sheet.page_setup.fitToWidth = 1
    sheet.page_setup.fitToHeight = 0
    sheet.sheet_properties.pageSetUpPr.fitToPage = True
    sheet.page_margins.left = 0.25
    sheet.page_margins.right = 0.25
    sheet.page_margins.top = 0.4
    sheet.page_margins.bottom = 0.4

for page_index, page in enumerate(doc):
    sheet = wb.create_sheet(safe_sheet_name(f"Page {page_index + 1}"))

    if mode == "text":
        # Text mode: skip table detection, use spatial word layout only
        write_words_layout(page, sheet)
    else:
        # Auto/tables mode: prefer detected tables, fall back to word layout
        try:
            tables_result = page.find_tables()
            tables = getattr(tables_result, "tables", []) if tables_result else []

            if tables:
                write_detected_tables(page, sheet, tables)
            else:
                write_words_layout(page, sheet)
        except Exception:
            write_words_layout(page, sheet)

doc.close()
wb.save(output_path)
`.trim();

  return runPythonScript(
    pyScript,
    [inputPath, outputPath, mode],
    "PDF to Excel conversion failed.",
    300000,
  );
}

function pdfToPowerPoint(inputPath, outputPath, mode = "layout") {
  const pyScript = `
import io
import os
import sys
import fitz
import tempfile
from PIL import Image
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor

input_path = sys.argv[1]
output_path = sys.argv[2]
mode = sys.argv[3] if len(sys.argv) > 3 else "layout"

prs = Presentation()
prs.slide_width = 12192000
prs.slide_height = 6858000
blank_layout = prs.slide_layouts[6]

doc = fitz.open(input_path)
temp_files = []

BULLET_CHARS = set("•▸▪◦‣○●►")

try:
    for page_index, page in enumerate(doc):
        slide = prs.slides.add_slide(blank_layout)

        if mode == "editable":
            # Extract text blocks
            blocks = page.get_text(
                "dict",
                flags=fitz.TEXT_PRESERVE_WHITESPACE | fitz.TEXT_PRESERVE_LIGATURES,
            )["blocks"]

            text_blocks = [b for b in blocks if b.get("type") == 0]

            if text_blocks:
                p_w = page.rect.width
                p_h = page.rect.height
                s_w = prs.slide_width
                s_h = prs.slide_height

                scale = min(s_w / p_w, s_h / p_h)
                offset_x = int((s_w - p_w * scale) / 2)
                offset_y = int((s_h - p_h * scale) / 2)

                for block in text_blocks:
                    bx0, by0, bx1, by1 = block["bbox"]
                    left = int(offset_x + bx0 * scale)
                    top = int(offset_y + by0 * scale)
                    width = max(int((bx1 - bx0) * scale), Inches(0.8))
                    height = max(int((by1 - by0) * scale), Inches(0.3))

                    txBox = slide.shapes.add_textbox(left, top, width, height)
                    tf = txBox.text_frame
                    tf.word_wrap = True

                    p_index = 0
                    for line in block.get("lines", []):
                        spans = line.get("spans", [])
                        raw = "".join(s.get("text", "") for s in spans).strip()
                        if not raw:
                            continue

                        p = tf.paragraphs[0] if p_index == 0 else tf.add_paragraph()
                        p_index += 1

                        # Clean leading bullet if present
                        bullet_found = False
                        if raw and raw[0] in BULLET_CHARS:
                            bullet_found = True
                            p.level = 1

                        for span in spans:
                            t = span.get("text", "")
                            if not t:
                                continue
                            if bullet_found and t.strip() in BULLET_CHARS:
                                continue
                            run = p.add_run()
                            run.text = t
                            run.font.size = Pt(max(9, min(48, round(span.get("size", 12) * scale * 0.9))))
                            if span.get("flags", 0) & 16 or "bold" in span.get("font", "").lower():
                                run.font.bold = True
                continue

        # Layout mode (or fallback if editable has no text): render crisp 2x pixmap
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
        png_bytes = pix.tobytes("png")

        image = Image.open(io.BytesIO(png_bytes))
        img_width, img_height = image.size

        max_width = prs.slide_width
        max_height = prs.slide_height
        scale = min(max_width / img_width, max_height / img_height)

        width = int(img_width * scale)
        height = int(img_height * scale)
        left = int((max_width - width) / 2)
        top = int((max_height - height) / 2)

        fd, temp_path = tempfile.mkstemp(suffix=f"-page-{page_index + 1}.png")
        os.close(fd)

        with open(temp_path, "wb") as file_obj:
            file_obj.write(png_bytes)

        temp_files.append(temp_path)
        slide.shapes.add_picture(temp_path, left, top, width=width, height=height)

    if len(prs.slides) == 0:
        prs.slides.add_slide(blank_layout)

    prs.save(output_path)
finally:
    doc.close()
    for temp_path in temp_files:
        try:
            os.remove(temp_path)
        except OSError:
            pass
`.trim();

  return runPythonScript(
    pyScript,
    [inputPath, outputPath, mode],
    "PDF to PowerPoint conversion failed.",
    300000,
  );
}

function pdfToJpg(inputPath, outputPath, dpi, pages) {
  const pyScript = `
import os
import sys
import zipfile

import fitz

input_path = sys.argv[1]
output_zip = sys.argv[2]
try:
    dpi = int(float(sys.argv[3])) if len(sys.argv) > 3 and sys.argv[3] else 150
except ValueError:
    dpi = 150
pages_arg = sys.argv[4] if len(sys.argv) > 4 else ""

def parse_pages(spec, total):
    if not spec or spec.strip() == "":
        return list(range(total))
    result = []
    for part in str(spec).split(","):
        part = part.strip()
        if not part:
            continue
        if "-" in part:
            start_s, _, end_s = part.partition("-")
            try:
                start = int(start_s) - 1
                end = int(end_s) - 1 if end_s else start
            except ValueError:
                continue
            for p in range(max(start, 0), min(end, total - 1) + 1):
                if p not in result:
                    result.append(p)
        else:
            try:
                p = int(part) - 1
            except ValueError:
                continue
            if 0 <= p < total and p not in result:
                result.append(p)
    return sorted(result)

doc = fitz.open(input_path)
total = doc.page_count
selected = parse_pages(pages_arg, total)

if not selected:
    print("No JPG images were generated.", file=sys.stderr)
    doc.close()
    sys.exit(1)

zoom = dpi / 72.0
mat = fitz.Matrix(zoom, zoom)

with zipfile.ZipFile(output_zip, "w", zipfile.ZIP_DEFLATED) as zf:
    for i, page_index in enumerate(selected):
        page = doc.load_page(page_index)
        pix = page.get_pixmap(matrix=mat, alpha=False)
        data = pix.tobytes("jpeg", jpg_quality=92)
        zf.writestr(f"page-{i + 1}.jpg", data)

doc.close()
print(f"Wrote {len(selected)} JPG image(s).")
`.trim();

  return runPythonScript(
    pyScript,
    [inputPath, outputPath, String(dpi || 150), String(pages || "")],
    "PDF to JPG conversion failed.",
    180000,
  );
}

async function pdfToPdfa(inputPath, outputPath) {
  const gsBin = findGhostscript();
  const args = [
    "-dPDFA=2",
    "-dBATCH",
    "-dNOPAUSE",
    "-dNOOUTERSAVE",
    "-dCompatibilityLevel=1.7",
    "-sColorConversionStrategy=UseDeviceIndependentColor",
    "-dConvertCMYKImagesToRGB=true",
    "-sDEVICE=pdfwrite",
    "-dPDFACompatibilityPolicy=1",
    `-sOutputFile=${outputPath}`,
    inputPath,
  ];

  try {
    await new Promise((resolve, reject) => {
      execFile(gsBin, args, { timeout: 240000 }, (error, stdout, stderr) => {
        if (error) {
          reject(
            new Error(
              stderr || stdout || error.message || "Ghostscript PDF/A conversion failed.",
            ),
          );
          return;
        }

        resolve();
      });
    });
  } catch (gsError) {
    console.warn(
      `[PDF/A] Ghostscript (${gsBin}) failed (${gsError.message}). Falling back to PyMuPDF compliant export.`,
    );

    const pyScript = `
import sys
import fitz

input_path = sys.argv[1]
output_path = sys.argv[2]

doc = fitz.open(input_path)
doc.save(
    output_path,
    garbage=4,
    deflate=True,
    clean=True,
)
doc.close()
`.trim();

    await runPythonScript(
      pyScript,
      [inputPath, outputPath],
      "PDF/A conversion failed.",
      120000,
    );
  }
}

function unlockPdf(inputPath, outputPath, password) {
  const pyScript = `
import pikepdf
import sys

input_pdf = sys.argv[1]
output_pdf = sys.argv[2]
password = sys.argv[3]

try:
    with pikepdf.open(
        input_pdf,
        password=password,
    ) as pdf:
        pdf.save(output_pdf)

except pikepdf.PasswordError:
    raise Exception(
        "The password is incorrect for this PDF."
    )
`.trim();

  return runPythonScript(
    pyScript,
    [inputPath, outputPath, password],
    "Could not unlock this PDF.",
  );
}

function protectPdf(inputPath, outputPath, userPassword, ownerPassword) {
  const pyScript = `
import pikepdf
import sys

input_pdf = sys.argv[1]
output_pdf = sys.argv[2]
user_password = sys.argv[3]
owner_password = sys.argv[4]

with pikepdf.open(input_pdf) as pdf:
    pdf.save(
        output_pdf,
        encryption=pikepdf.Encryption(
            owner=owner_password,
            user=user_password,
            R=6,
        ),
    )
`.trim();

  return runPythonScript(
    pyScript,
    [inputPath, outputPath, userPassword, ownerPassword || userPassword],
    "Could not protect this PDF.",
  );
}

function redactPdf(inputPath, outputPath, terms) {
  const pyScript = `
import sys
import re
import fitz

input_pdf = sys.argv[1]
output_pdf = sys.argv[2]
raw_terms = sys.argv[3] if len(sys.argv) > 3 else ""

# Split on pipes, newlines, or commas to support all input formats
terms = [t.strip() for t in re.split(r"[|\\r\\n,]+", raw_terms) if t.strip()]

doc = fitz.open(input_pdf)

for page in doc:
    for term in terms:
        rects = page.search_for(term)
        for rect in rects:
            page.add_redact_annot(
                rect,
                fill=(0, 0, 0),
            )
    # Apply all redactions for this page at once (after all terms are marked)
    page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_PIXELS)

doc.save(output_pdf, garbage=4, deflate=True)
doc.close()
print("Redacted PDF created.")
`.trim();

  return runPythonScript(
    pyScript,
    [inputPath, outputPath, terms],
    "Could not redact this PDF.",
  );
}

function comparePdfs(firstPath, secondPath) {
  const pyScript = `
import difflib
import json
import sys

import fitz

first_path = sys.argv[1]
second_path = sys.argv[2]

first_doc = fitz.open(first_path)
second_doc = fitz.open(second_path)

first_pages = [
    page.get_text("text") or ""
    for page in first_doc
]
second_pages = [
    page.get_text("text") or ""
    for page in second_doc
]

first_doc.close()
second_doc.close()

def diff_words(first, second):
    first_words = first.split()
    second_words = second.split()
    matcher = difflib.SequenceMatcher(
        None,
        first_words,
        second_words,
    )
    added = []
    removed = []
    for tag, i1, i2, j1, j2 in matcher.get_opcodes():
        if tag == "insert":
            added.extend(second_words[j1:j2])
        elif tag == "delete":
            removed.extend(first_words[i1:i2])
        elif tag == "replace":
            added.extend(second_words[j1:j2])
            removed.extend(first_words[i1:i2])
    return added, removed

total_pages = max(
    len(first_pages),
    len(second_pages),
)

pages = []

for index in range(total_pages):
    first_text = first_pages[index] if index < len(first_pages) else ""
    second_text = second_pages[index] if index < len(second_pages) else ""
    added, removed = diff_words(
        first_text,
        second_text,
    )
    identical = first_text == second_text
    # Compute similarity using SequenceMatcher ratio (0.0–1.0)
    if identical:
        similarity = 1.0
    else:
        first_words = first_text.split()
        second_words = second_text.split()
        if not first_words and not second_words:
            similarity = 1.0
        else:
            similarity = round(
                difflib.SequenceMatcher(None, first_words, second_words).ratio(),
                2,
            )
    # Words that appear in second but not in first (ordered, unique)
    first_word_set = set(first_text.split())
    changed = [
        word
        for word in second_text.split()
        if word not in first_word_set
    ]
    pages.append(
        {
            "page": index + 1,
            "identical": identical,
            "similarity": similarity,
            "firstLength": len(first_text),
            "secondLength": len(second_text),
            "added": added,
            "removed": removed,
            "changed": changed,
        }
    )

payload = json.dumps(
    {"pages": pages},
    ensure_ascii=False,
)
print(payload)
`.trim();

  return runPythonScript(
    pyScript,
    [firstPath, secondPath],
    "Could not compare these PDFs.",
  ).then((stdout) => {
    const trimmed = String(stdout || "").trim();
    try {
      return JSON.parse(trimmed);
    } catch {
      return {
        pages: [],
        error:
          "The comparison returned an unexpected result.",
      };
    }
  });
}

function createOutputDir(prefix) {
  return fsp.mkdtemp(
    path.join(
      os.tmpdir(),
      `${prefix}-`,
    ),
  );
}

function safeFileName(name, fallback = "output") {
  const cleaned = String(name || "")
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);

  return cleaned || fallback;
}

async function safeDelete(filePath) {
  if (!filePath) return;

  try {
    await fsp.unlink(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.warn(
        `[PDFVerse] Could not delete ${filePath}:`,
        error.message,
      );
    }
  }
}

async function safeRemoveDirectory(dirPath) {
  if (!dirPath) return;

  try {
    await fsp.rm(dirPath, {
      recursive: true,
      force: true,
    });
  } catch (error) {
    console.warn(
      `[PDFVerse] Could not remove directory ${dirPath}:`,
      error.message,
    );
  }
}

function getFileSize(filePath) {
  try {
    return fs.statSync(filePath).size;
  } catch {
    return 0;
  }
}

function sendFileAndCleanup(
  res,
  filePath,
  filename,
  contentType,
  cleanup = [],
) {
  res.setHeader(
    "Content-Type",
    contentType,
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${safeFileName(filename, "download")}"`,
  );

  res.setHeader(
    "Cache-Control",
    "no-store",
  );

  res.sendFile(
    filePath,
    {},
    async (error) => {
      await safeDelete(filePath);

      for (const item of cleanup) {
        await safeDelete(item);
      }

      if (error && !res.headersSent) {
        res.status(500).json({
          error:
            error.message ||
            "Could not send generated file.",
        });
      }
    },
  );
}

function streamFile(
  res,
  filePath,
  cleanup,
) {
  res.sendFile(
    filePath,
    {},
    async (error) => {
      if (typeof cleanup === "function") {
        await cleanup();
      } else {
        await safeDelete(filePath);
      }

      if (error && !res.headersSent) {
        res.status(500).json({
          error:
            error.message ||
            "Could not send generated file.",
        });
      }
    },
  );
}

function getBaseName(name, fallback = "document") {
  const safe = safeFileName(name, fallback || "document");
  return safe.replace(/\.[^.]+$/u, "");
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 B";
  }

  const units = [
    "B",
    "KB",
    "MB",
    "GB",
  ];

  const index = Math.min(
    Math.floor(
      Math.log(bytes) /
        Math.log(1024),
    ),
    units.length - 1,
  );

  return `${(
    bytes /
    Math.pow(1024, index)
  ).toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
}

function parseBoolean(value, fallback = false) {
  if (value === undefined || value === null) {
    return fallback;
  }

  if (typeof value === "boolean") {
    return value;
  }

  const normalized = String(value)
    .trim()
    .toLowerCase();

  if (
    ["true", "1", "yes", "on"].includes(
      normalized,
    )
  ) {
    return true;
  }

  if (
    ["false", "0", "no", "off"].includes(
      normalized,
    )
  ) {
    return false;
  }

  return fallback;
}

function parseNumber(
  value,
  fallback,
  minimum,
  maximum,
) {
  const parsed =
    Number(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(
    Math.max(
      parsed,
      minimum,
    ),
    maximum,
  );
}

function normalizePdfFilename(name) {
  const base =
    path.basename(
      String(name || "document.pdf"),
    );

  const cleaned =
    base.replace(
      /[^a-zA-Z0-9._-]/g,
      "-",
    );

  if (
    cleaned
      .toLowerCase()
      .endsWith(".pdf")
  ) {
    return cleaned;
  }

  return `${cleaned || "document"}.pdf`;
}


/* =========================================================
   HEALTH
========================================================= */

app.get(
  "/",
  (_req, res) => {
    res.json({
      ok: true,
      service: "PDFVerse PDF API",
      port: PORT,
      timestamp:
        new Date().toISOString(),
    });
  },
);

app.get(
  "/health",
  (_req, res) => {
    res.json({
      ok: true,
      service: "PDFVerse PDF API",
      timestamp:
        new Date().toISOString(),
    });
  },
);


/* =========================================================
   PDF COMPRESS
========================================================= */

app.post(
  "/api/compress",
  upload.single("file"),
  async (req, res) => {
    let inputPath = "";
    let outputPath = "";

    try {
      if (!req.file) {
        return res.status(400).json({
          error: "No file uploaded.",
        });
      }

      inputPath =
        req.file.path;

      const quality =
        parseNumber(
          req.body?.quality,
          0.6,
          0.1,
          1,
        );

      const originalName =
        normalizePdfFilename(
          req.file.originalname ||
            "compressed.pdf",
        );

      const baseName =
        path.basename(
          originalName,
          path.extname(
            originalName,
          ),
        );

      outputPath =
        path.join(
          path.dirname(inputPath),
          `${baseName}-compressed.pdf`,
        );

      await compressWithGhostscript(
        inputPath,
        outputPath,
        quality,
      );

      const originalSize =
        getFileSize(
          inputPath,
        );

      const compressedSize =
        getFileSize(
          outputPath,
        );

      res.setHeader(
        "X-Original-Size",
        String(originalSize),
      );

      res.setHeader(
        "X-Compressed-Size",
        String(compressedSize),
      );

      const compressionUsed =
        originalSize > 0
          ? Math.max(
              0,
              Math.round(
                (1 -
                  compressedSize /
                    originalSize) *
                  100,
              ),
            )
          : 0;

      res.setHeader(
        "X-Compression-Used",
        String(
          compressionUsed,
        ),
      );

      return sendFileAndCleanup(
        res,
        outputPath,
        `${baseName}-compressed.pdf`,
        "application/pdf",
        [inputPath],
      );
    } catch (error) {
      console.error(
        "[Compress]",
        error,
      );

      await safeDelete(
        inputPath,
      );
      await safeDelete(
        outputPath,
      );

      return res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "PDF compression failed.",
      });
    }
  },
);


/* =========================================================
   PDF TO WORD
========================================================= */

app.post(
  "/api/pdf-to-word",
  upload.single("file"),
  async (req, res) => {
    let inputPath = "";
    let outputPath = "";

    try {
      if (!req.file) {
        return res.status(400).json({
          error: "No PDF file uploaded.",
        });
      }

      inputPath =
        req.file.path;

      const originalName =
        path.basename(
          req.file.originalname ||
            "document.pdf",
        );

      const baseName =
        path.basename(
          originalName,
          path.extname(
            originalName,
          ),
        );

      outputPath =
        path.join(
          path.dirname(inputPath),
          `${safeFileName(
            baseName,
            "document",
          )}.docx`,
        );

      await pdfToWord(
        inputPath,
        outputPath,
        typeof req.body?.quality === "string" ? req.body.quality : "layout",
      );

      return sendFileAndCleanup(
        res,
        outputPath,
        `${safeFileName(
          baseName,
          "document",
        )}.docx`,
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        [inputPath],
      );
    } catch (error) {
      console.error(
        "[PDF to Word]",
        error,
      );

      await safeDelete(
        inputPath,
      );
      await safeDelete(
        outputPath,
      );

      return res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "PDF to Word conversion failed.",
      });
    }
  },
);


/* =========================================================
   PDF TO EXCEL
========================================================= */

app.post(
  "/api/pdf-to-excel",
  upload.single("file"),
  async (req, res) => {
    let inputPath = "";
    let outputPath = "";

    try {
      if (!req.file) {
        return res.status(400).json({
          error: "No PDF file uploaded.",
        });
      }

      inputPath =
        req.file.path;

      const originalName =
        path.basename(
          req.file.originalname ||
            "document.pdf",
        );

      const baseName =
        path.basename(
          originalName,
          path.extname(
            originalName,
          ),
        );

      outputPath =
        path.join(
          path.dirname(inputPath),
          `${safeFileName(
            baseName,
            "document",
          )}.xlsx`,
        );

      await pdfToExcel(
        inputPath,
        outputPath,
        req.body?.mode === "text" ? "text" : "auto",
      );

      return sendFileAndCleanup(
        res,
        outputPath,
        `${safeFileName(
          baseName,
          "document",
        )}.xlsx`,
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        [inputPath],
      );
    } catch (error) {
      console.error(
        "[PDF to Excel]",
        error,
      );

      await safeDelete(
        inputPath,
      );
      await safeDelete(
        outputPath,
      );

      return res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "PDF to Excel conversion failed.",
      });
    }
  },
);


/* =========================================================
   PDF TO POWERPOINT
========================================================= */

app.post(
  "/api/pdf-to-powerpoint",
  upload.single("file"),
  async (req, res) => {
    let inputPath = "";
    let outputPath = "";

    try {
      if (!req.file) {
        return res.status(400).json({
          error: "No PDF file uploaded.",
        });
      }

      inputPath =
        req.file.path;

      const originalName =
        path.basename(
          req.file.originalname ||
            "document.pdf",
        );

      const baseName =
        path.basename(
          originalName,
          path.extname(
            originalName,
          ),
        );

      outputPath =
        path.join(
          path.dirname(inputPath),
          `${safeFileName(
            baseName,
            "document",
          )}.pptx`,
        );

      await pdfToPowerPoint(
        inputPath,
        outputPath,
        typeof req.body?.mode === "string" ? req.body.mode : "layout",
      );

      return sendFileAndCleanup(
        res,
        outputPath,
        `${safeFileName(
          baseName,
          "document",
        )}.pptx`,
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        [inputPath],
      );
    } catch (error) {
      console.error(
        "[PDF to PowerPoint]",
        error,
      );

      await safeDelete(
        inputPath,
      );
      await safeDelete(
        outputPath,
      );

      return res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "PDF to PowerPoint conversion failed.",
      });
    }
  },
);


/* =========================================================
   PDF TO JPG
========================================================= */

app.post(
  "/api/pdf-to-jpg",
  upload.single("file"),
  async (req, res) => {
    let inputPath = "";
    let outputDir = "";
    let outputZip = "";

    try {
      if (!req.file) {
        return res.status(400).json({
          error: "No PDF file uploaded.",
        });
      }

      inputPath =
        req.file.path;

      outputDir =
        await createOutputDir(
          "pdf-to-jpg",
        );

      outputZip =
        path.join(
          outputDir,
          "pdf-pages.zip",
        );

      await pdfToJpg(
        inputPath,
        outputZip,
        req.body.dpi,
        req.body.pages,
      );

      res.setHeader(
        "Content-Type",
        "application/zip",
      );

      res.setHeader(
        "Content-Disposition",
        'attachment; filename="pdf-pages.zip"',
      );

      res.setHeader(
        "Cache-Control",
        "no-store",
      );

      return res.sendFile(
        outputZip,
        {},
        async (error) => {
          await safeRemoveDirectory(
            outputDir,
          );
          await safeDelete(
            inputPath,
          );

          if (
            error &&
            !res.headersSent
          ) {
            res.status(500).json({
              error:
                error.message ||
                "Could not send JPG ZIP.",
            });
          }
        },
      );
    } catch (error) {
      console.error(
        "[PDF to JPG]",
        error,
      );

      await safeDelete(
        inputPath,
      );
      await safeDelete(
        outputZip,
      );
      await safeRemoveDirectory(
        outputDir,
      );

      return res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "PDF to JPG conversion failed.",
      });
    }
  },
);


/* =========================================================
   PDF TO PDF/A
========================================================= */

app.post(
  "/api/pdf-to-pdfa",
  upload.single("file"),
  async (req, res) => {
    let inputPath = "";
    let outputPath = "";

    try {
      if (!req.file) {
        return res.status(400).json({
          error: "No PDF file uploaded.",
        });
      }

      inputPath =
        req.file.path;

      const originalName =
        path.basename(
          req.file.originalname ||
            "document.pdf",
        );

      const baseName =
        path.basename(
          originalName,
          path.extname(
            originalName,
          ),
        );

      outputPath =
        path.join(
          path.dirname(inputPath),
          `${safeFileName(
            baseName,
            "document",
          )}-pdfa.pdf`,
        );

      await pdfToPdfa(
        inputPath,
        outputPath,
      );

      return sendFileAndCleanup(
        res,
        outputPath,
        `${safeFileName(
          baseName,
          "document",
        )}-pdfa.pdf`,
        "application/pdf",
        [inputPath],
      );
    } catch (error) {
      console.error(
        "[PDF to PDF/A]",
        error,
      );

      await safeDelete(
        inputPath,
      );
      await safeDelete(
        outputPath,
      );

      return res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "PDF/A conversion failed.",
      });
    }
  },
);
app.post("/api/pdf/unlock", upload.single("file"), async (req, res) => {
  let inputPath = "";
  let outputPath = "";

  try {
    if (!req.file) {
      return res.status(400).json({
        error: "PDF file is required.",
      });
    }

    const password = String(
      req.body.password || "",
    ).trim();

    if (!password) {
      return res.status(400).json({
        error: "Current password is required.",
      });
    }

    inputPath = req.file.path;

    outputPath = path.join(
      path.dirname(inputPath),
      `${crypto.randomBytes(16).toString("hex")}-unlocked.pdf`,
    );

    await unlockPdf(
      inputPath,
      outputPath,
      password,
    );

    if (!fs.existsSync(outputPath)) {
      throw new Error(
        "Unlocked PDF file was not created.",
      );
    }

    const baseName =
      getBaseName(
        req.file.originalname,
        "document",
      );

    res.setHeader(
      "Content-Type",
      "application/pdf",
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${baseName}-unlocked.pdf"`,
    );

    res.setHeader(
      "Cache-Control",
      "no-store",
    );

    streamFile(
      res,
      outputPath,
      async () => {
        await safeDelete(inputPath);
        await safeDelete(outputPath);
      },
    );
  } catch (error) {
    await safeDelete(inputPath);
    await safeDelete(outputPath);

    res.status(400).json({
      error:
        error instanceof Error
          ? error.message
          : "We could not unlock this PDF. Please check the password and try again.",
    });
  }
});


app.post("/api/pdf/protect", upload.single("file"), async (req, res) => {
  let inputPath = "";
  let outputPath = "";

  try {
    if (!req.file) {
      return res.status(400).json({
        error: "PDF file is required.",
      });
    }

    const password =
      String(
        req.body.password || "",
      ).trim();

    const ownerPassword =
      String(
        req.body.ownerPassword || "",
      ).trim();

    if (!password) {
      return res.status(400).json({
        error: "Password is required.",
      });
    }

    if (password.length < 4) {
      return res.status(400).json({
        error:
          "Password must be at least 4 characters long.",
      });
    }

    inputPath =
      req.file.path;

    outputPath =
      path.join(
        path.dirname(inputPath),
        `${crypto.randomBytes(16).toString("hex")}-protected.pdf`,
      );

    await protectPdf(
      inputPath,
      outputPath,
      password,
      ownerPassword ||
        password,
    );

    if (!fs.existsSync(outputPath)) {
      throw new Error(
        "Protected PDF file was not created.",
      );
    }

    const baseName =
      getBaseName(
        req.file.originalname,
        "document",
      );

    res.setHeader(
      "Content-Type",
      "application/pdf",
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${baseName}-protected.pdf"`,
    );

    res.setHeader(
      "Cache-Control",
      "no-store",
    );

    streamFile(
      res,
      outputPath,
      async () => {
        await safeDelete(inputPath);
        await safeDelete(outputPath);
      },
    );
  } catch (error) {
    await safeDelete(inputPath);
    await safeDelete(outputPath);

    res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "Could not protect this PDF.",
    });
  }
});


app.post("/api/pdf/redact", upload.single("file"), async (req, res) => {
  let inputPath = "";
  let outputPath = "";

  try {
    if (!req.file) {
      return res.status(400).json({
        error: "PDF file is required.",
      });
    }

    const terms =
      String(
        req.body.terms || "",
      ).trim();

    if (!terms) {
      return res.status(400).json({
        error:
          "Enter at least one redaction term.",
      });
    }

    inputPath =
      req.file.path;

    outputPath =
      path.join(
        path.dirname(inputPath),
        `${crypto.randomBytes(16).toString("hex")}-redacted.pdf`,
      );

    await redactPdf(
      inputPath,
      outputPath,
      terms,
    );

    if (!fs.existsSync(outputPath)) {
      throw new Error(
        "Redacted PDF file was not created.",
      );
    }

    const baseName =
      getBaseName(
        req.file.originalname,
        "document",
      );

    res.setHeader(
      "Content-Type",
      "application/pdf",
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${baseName}-redacted.pdf"`,
    );

    res.setHeader(
      "Cache-Control",
      "no-store",
    );

    streamFile(
      res,
      outputPath,
      async () => {
        await safeDelete(inputPath);
        await safeDelete(outputPath);
      },
    );
  } catch (error) {
    await safeDelete(inputPath);
    await safeDelete(outputPath);

    res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "Could not redact this PDF.",
    });
  }
});


app.post(
  "/api/pdf/compare",
  compareUpload.fields([
    {
      name: "firstFile",
      maxCount: 1,
    },
    {
      name: "secondFile",
      maxCount: 1,
    },
  ]),
  async (req, res) => {
    let firstPath = "";
    let secondPath = "";

    try {
      const files =
        req.files || {};

      const firstFile =
        Array.isArray(
          files.firstFile,
        )
          ? files.firstFile[0]
          : null;

      const secondFile =
        Array.isArray(
          files.secondFile,
        )
          ? files.secondFile[0]
          : null;

      if (
        !firstFile ||
        !secondFile
      ) {
        return res.status(400).json({
          error:
            "Both PDF files are required.",
        });
      }

      firstPath =
        firstFile.path;

      secondPath =
        secondFile.path;

      const result =
        await comparePdfs(
          firstPath,
          secondPath,
        );

      return res.json(
        result,
      );
    } catch (error) {
      return res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "Could not compare these PDFs.",
      });
    } finally {
      await safeDelete(
        firstPath,
      );

      await safeDelete(
        secondPath,
      );
    }
  },
);


/* =========================================================
   BATCH PDF HELPERS
========================================================= */

async function zipDirectoryFiles(
  outputZip,
  outputDir,
) {
  const pyScript = `
import os
import sys
import zipfile

output_zip = sys.argv[1]
output_dir = sys.argv[2]

with zipfile.ZipFile(output_zip, "w", zipfile.ZIP_DEFLATED) as zf:
    for entry in os.scandir(output_dir):
        if entry.is_file() and not entry.name.startswith("."):
            zf.write(entry.path, arcname=entry.name)
`.trim();

  await runPythonScript(
    pyScript,
    [outputZip, outputDir],
    "Could not create ZIP file.",
    120000,
  );
}


function sendBatchZip(
  res,
  outputZip,
  uploadedFiles,
  outputDir,
  fileName,
) {
  res.setHeader(
    "Content-Type",
    "application/zip",
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${fileName}"`,
  );

  res.setHeader(
    "Cache-Control",
    "no-store",
  );

  streamFile(
    res,
    outputZip,
    async () => {
      await Promise.all(
        uploadedFiles.map(
          (file) =>
            safeDelete(
              file.path,
            ),
        ),
      );

      await safeDelete(
        outputZip,
      );

      await safeRemoveDirectory(
        outputDir,
      );
    },
  );
}


async function batchRoute(
  req,
  res,
  options,
) {
  const uploadedFiles =
    Array.isArray(
      req.files,
    )
      ? req.files
      : [];

  const outputDir =
    path.join(
      os.tmpdir(),
      `PDFVerse-${options.slug}-${crypto.randomBytes(8).toString("hex")}`,
    );

  const outputZip =
    path.join(
      os.tmpdir(),
      `PDFVerse-${options.slug}-${crypto.randomBytes(8).toString("hex")}.zip`,
    );

  try {
    if (
      !uploadedFiles.length
    ) {
      return res.status(400).json({
        error:
          "Upload one or more PDF files first.",
      });
    }

    await fsp.mkdir(
      outputDir,
      {
        recursive: true,
      },
    );

    await options.processFiles({
      uploadedFiles,
      outputDir,
      req,
    });

    await zipDirectoryFiles(
      outputZip,
      outputDir,
    );

    sendBatchZip(
      res,
      outputZip,
      uploadedFiles,
      outputDir,
      options.fileName,
    );
  } catch (error) {
    await Promise.all(
      uploadedFiles.map(
        (file) =>
          safeDelete(
            file.path,
          ),
      ),
    );

    await safeDelete(
      outputZip,
    );

    await safeRemoveDirectory(
      outputDir,
    );

    res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : options.fallbackError,
    });
  }
}


/* =========================================================
   BATCH PROTECT
========================================================= */

app.post(
  "/api/pdf/batch/protect",
  batchUpload.array(
    "files",
    10,
  ),
  async (req, res) => {
    const password =
      String(
        req.body?.password ||
          "",
      ).trim();

    if (!password) {
      return res
        .status(400)
        .json({
          error:
            "Enter a password to protect the PDFs.",
        });
    }

    return batchRoute(
      req,
      res,
      {
        slug:
          "batch-protect",

        fileName:
          "protected-pdfs.zip",

        fallbackError:
          "Could not protect these PDFs.",

        async processFiles({
          uploadedFiles,
          outputDir,
        }) {
          for (
            const file of uploadedFiles
          ) {
            const baseName =
              getBaseName(
                file.originalname,
                "document",
              );

            const outputPath =
              path.join(
                outputDir,
                `${baseName}-protected.pdf`,
              );

            const script = `
import pikepdf
import sys

input_pdf = sys.argv[1]
output_pdf = sys.argv[2]
password = sys.argv[3]

with pikepdf.open(input_pdf) as pdf:
    pdf.save(
        output_pdf,
        encryption=pikepdf.Encryption(
            owner=password,
            user=password,
            R=6,
        ),
    )
`;

            await runPythonScript(
              script,
              [
                file.path,
                outputPath,
                password,
              ],
              `Could not protect ${file.originalname}.`,
            );
          }
        },
      },
    );
  },
);


/* =========================================================
   BATCH UNLOCK
========================================================= */

app.post(
  "/api/pdf/batch/unlock",
  batchUpload.array(
    "files",
    10,
  ),
  async (req, res) => {
    const password =
      String(
        req.body?.password ||
          "",
      ).trim();

    if (!password) {
      return res
        .status(400)
        .json({
          error:
            "Enter the current password for the PDFs.",
        });
    }

    return batchRoute(
      req,
      res,
      {
        slug:
          "batch-unlock",

        fileName:
          "unlocked-pdfs.zip",

        fallbackError:
          "Could not unlock these PDFs.",

        async processFiles({
          uploadedFiles,
          outputDir,
        }) {
          for (
            const file of uploadedFiles
          ) {
            const baseName =
              getBaseName(
                file.originalname,
                "document",
              );

            const outputPath =
              path.join(
                outputDir,
                `${baseName}-unlocked.pdf`,
              );

            const script = `
import pikepdf
import sys

input_pdf = sys.argv[1]
output_pdf = sys.argv[2]
password = sys.argv[3]

try:
    with pikepdf.open(
        input_pdf,
        password=password,
    ) as pdf:
        pdf.save(output_pdf)

except pikepdf.PasswordError:
    raise Exception(
        "The password is incorrect for one or more PDFs."
    )
`;

            await runPythonScript(
              script,
              [
                file.path,
                outputPath,
                password,
              ],
              `Could not unlock ${file.originalname}.`,
            );
          }
        },
      },
    );
  },
);


/* =========================================================
   BATCH REPAIR
========================================================= */

app.post(
  "/api/pdf/batch/repair",
  batchUpload.array(
    "files",
    10,
  ),
  async (req, res) => {
    return batchRoute(
      req,
      res,
      {
        slug:
          "batch-repair",

        fileName:
          "repaired-pdfs.zip",

        fallbackError:
          "Could not repair these PDFs.",

        async processFiles({
          uploadedFiles,
          outputDir,
        }) {
          for (
            const file of uploadedFiles
          ) {
            const baseName =
              getBaseName(
                file.originalname,
                "document",
              );

            const outputPath =
              path.join(
                outputDir,
                `${baseName}-repaired.pdf`,
              );

            const script = `
import fitz
import sys

input_pdf = sys.argv[1]
output_pdf = sys.argv[2]

doc = fitz.open(input_pdf)

doc.save(
    output_pdf,
    garbage=4,
    deflate=True,
    clean=True,
)

doc.close()
`;

            await runPythonScript(
              script,
              [
                file.path,
                outputPath,
              ],
              `Could not repair ${file.originalname}.`,
            );
          }
        },
      },
    );
  },
);


/* =========================================================
   BATCH WATERMARK
========================================================= */

app.post(
  "/api/pdf/batch/watermark",
  batchUpload.array(
    "files",
    10,
  ),
  async (req, res) => {
    const watermarkText =
      String(
        req.body?.watermarkText ||
          "",
      ).trim();

    const opacity =
      String(
        req.body?.opacity ||
          "0.25",
      );

    if (!watermarkText) {
      return res.status(400).json({
        error:
          "Enter watermark text first.",
      });
    }

    return batchRoute(
      req,
      res,
      {
        slug:
          "batch-watermark",

        fileName:
          "watermarked-pdfs.zip",

        fallbackError:
          "Could not watermark these PDFs.",

        async processFiles({
          uploadedFiles,
          outputDir,
        }) {
          for (
            const file of uploadedFiles
          ) {
            const baseName =
              getBaseName(
                file.originalname,
                "document",
              );

            const outputPath =
              path.join(
                outputDir,
                `${baseName}-watermarked.pdf`,
              );

            const script = `
import fitz
import sys
import math

input_pdf = sys.argv[1]
output_pdf = sys.argv[2]
text = sys.argv[3]
opacity = float(sys.argv[4])

doc = fitz.open(input_pdf)

for page in doc:
    rect = page.rect
    # Use Shape for proper fill_opacity support across PyMuPDF versions
    shape = page.new_shape()
    angle_rad = math.radians(35)
    # Place text diagonally across the center of the page
    pivot_x = rect.width * 0.5
    pivot_y = rect.height * 0.5
    shape.insert_text(
        (pivot_x, pivot_y),
        text,
        fontsize=42,
        rotate=35,
        color=(0.45, 0.45, 0.45),
        fill_opacity=opacity,
    )
    shape.commit()

doc.save(
    output_pdf,
    garbage=4,
    deflate=True,
)

doc.close()
`;

            await runPythonScript(
              script,
              [
                file.path,
                outputPath,
                watermarkText,
                opacity,
              ],
              `Could not watermark ${file.originalname}.`,
            );
          }
        },
      },
    );
  },
);


/* =========================================================
   BATCH HEADER / FOOTER
========================================================= */

app.post(
  "/api/pdf/batch/header-footer",
  batchUpload.array(
    "files",
    10,
  ),
  async (req, res) => {
    const headerText =
      String(
        req.body?.headerText ||
          "",
      ).trim();

    const footerText =
      String(
        req.body?.footerText ||
          "",
      ).trim();

    const fontSize =
      String(
        req.body?.fontSize ||
          "10",
      );

    const margin =
      String(
        req.body?.margin ||
          "32",
      );

    if (
      !headerText &&
      !footerText
    ) {
      return res
        .status(400)
        .json({
          error:
            "Enter header or footer text first.",
        });
    }

    return batchRoute(
      req,
      res,
      {
        slug:
          "batch-header-footer",

        fileName:
          "header-footer-pdfs.zip",

        fallbackError:
          "Could not add header and footer to these PDFs.",

        async processFiles({
          uploadedFiles,
          outputDir,
        }) {
          for (
            const file of uploadedFiles
          ) {
            const baseName =
              getBaseName(
                file.originalname,
                "document",
              );

            const outputPath =
              path.join(
                outputDir,
                `${baseName}-header-footer.pdf`,
              );

            const script = `
import fitz
import sys
from datetime import date

input_pdf = sys.argv[1]
output_pdf = sys.argv[2]
header = sys.argv[3]
footer = sys.argv[4]
font_size = float(sys.argv[5])
margin = float(sys.argv[6])
filename = sys.argv[7]

doc = fitz.open(input_pdf)

total = len(doc)

def render(template, page_number):
    return (
        template
        .replace(
            "{page}",
            str(page_number),
        )
        .replace(
            "{total}",
            str(total),
        )
        .replace(
            "{date}",
            date.today().isoformat(),
        )
        .replace(
            "{filename}",
            filename,
        )
    )

for index, page in enumerate(
    doc,
    start=1,
):
    rect = page.rect

    if header:
        text = render(
            header,
            index,
        )

        tw = fitz.get_text_length(
            text,
            fontsize=font_size,
        )

        page.insert_text(
            (
                max(
                    (rect.width - tw) / 2,
                    margin,
                ),
                margin,
            ),
            text,
            fontsize=font_size,
            color=(
                0.25,
                0.25,
                0.25,
            ),
        )

    if footer:
        text = render(
            footer,
            index,
        )

        tw = fitz.get_text_length(
            text,
            fontsize=font_size,
        )

        page.insert_text(
            (
                max(
                    (rect.width - tw) / 2,
                    margin,
                ),
                rect.height - margin,
            ),
            text,
            fontsize=font_size,
            color=(
                0.25,
                0.25,
                0.25,
            ),
        )

doc.save(
    output_pdf,
    garbage=4,
    deflate=True,
)

doc.close()
`;

            await runPythonScript(
              script,
              [
                file.path,
                outputPath,
                headerText,
                footerText,
                fontSize,
                margin,
                baseName,
              ],
              `Could not add header/footer to ${file.originalname}.`,
            );
          }
        },
      },
    );
  },
);
/* =========================================================
   CHAT WITH PDF — GEMINI RAG
========================================================= */

app.get(
  "/api/chat-pdf/status",
  (_req, res) => {
    const geminiConfigured =
      Boolean(
        String(
          process.env.GEMINI_API_KEY ||
            "",
        ).trim(),
      );

    return res.json({
      success: true,

      rag: true,

      geminiConfigured,

      embeddingModel:
        process.env.GEMINI_EMBEDDING_MODEL ||
        "gemini-embedding-2",

      generationModel:
        process.env.GEMINI_RAG_MODEL ||
        "gemini-3.7-flash",
    });
  },
);

app.post(
  "/api/chat-pdf/upload",
  upload.single("file"),
  async (req, res) => {
    let filePath = "";

    try {
      const geminiKey =
        String(
          process.env.GEMINI_API_KEY ||
            "",
        ).trim();

      if (!geminiKey) {
        return res.status(500).json({
          success: false,

          error:
            "GEMINI_API_KEY is not configured on the server.",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,

          error:
            "No PDF file was uploaded.",
        });
      }

      const filename =
        req.file.originalname ||
        "document.pdf";

      const isPdf =
        req.file.mimetype ===
          "application/pdf" ||
        filename
          .toLowerCase()
          .endsWith(".pdf");

      if (!isPdf) {
        return res.status(400).json({
          success: false,

          error:
            "Chat with PDF accepts PDF files only.",
        });
      }

      filePath =
        req.file.path;

      console.log(
        `[Chat PDF] Extracting text from ${filename}`,
      );

      const pages =
        await extractPdfPages(
          filePath,
        );

      const nonEmptyPages =
        pages.filter(
          (page) =>
            String(
              page || "",
            ).trim().length > 0,
        );

      if (
        nonEmptyPages.length ===
        0
      ) {
        return res.status(422).json({
          success: false,

          error:
            "No extractable text was found in this PDF. This may be a scanned PDF and may require OCR.",
        });
      }

      const fileId =
        crypto
          .randomBytes(16)
          .toString("hex");

      console.log(
        `[Chat PDF RAG] Creating embeddings for ${filename}`,
      );

      const result =
        await indexDocument({
          fileId,

          filename,

          pages,
        });

      console.log(
        `[Chat PDF RAG] Indexing complete: ${filename}`,
      );

      return res.json({
        success: true,

        ...result,
      });
    } catch (error) {
      console.error(
        "[Chat PDF RAG] Upload/index error:",
        error,
      );

      const providerStatus =
        Number(
          error?.status,
        );

      const status =
        providerStatus >= 400 &&
        providerStatus < 600
          ? providerStatus
          : 500;

      return res.status(status).json({
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Failed to process and index the PDF.",
      });
    } finally {
      if (filePath) {
        await safeDelete(
          filePath,
        );
      }
    }
  },
);


/**
 * POST /api/chat-pdf/ask
 *
 * Query flow:
 *
 * User question
 *       ↓
 * Gemini query embedding
 *       ↓
 * Cosine similarity search
 *       ↓
 * Top relevant chunks
 *       ↓
 * Gemini generation
 *       ↓
 * Grounded answer + sources
 */
app.post(
  "/api/chat-pdf/ask",
  async (req, res) => {
    try {
      const geminiKey =
        String(
          process.env.GEMINI_API_KEY ||
            "",
        ).trim();

      if (!geminiKey) {
        return res.status(500).json({
          success: false,

          error:
            "GEMINI_API_KEY is not configured on the server.",
        });
      }

      const body =
        req.body || {};

      const fileId =
        String(
          body.fileId || "",
        ).trim();

      const fileToken =
        String(
          body.fileToken || "",
        ).trim();

      const question =
        String(
          body.question || "",
        ).trim();

      const history =
        Array.isArray(
          body.history,
        )
          ? body.history
          : [];

      if (!fileId) {
        return res.status(400).json({
          success: false,

          error:
            "fileId is required.",
        });
      }

      if (!fileToken) {
        return res.status(400).json({
          success: false,

          error:
            "fileToken is required.",
        });
      }

      if (!question) {
        return res.status(400).json({
          success: false,

          error:
            "Question cannot be empty.",
        });
      }

      if (
        question.length >
        10000
      ) {
        return res.status(400).json({
          success: false,

          error:
            "Question is too long.",
        });
      }

      console.log(
        `[Chat PDF RAG] Question: ${question}`,
      );

      const result =
        await answerFromDocument({
          fileId,

          fileToken,

          question,

          history,
        });

      return res.json({
        success: true,

        ...result,
      });
    } catch (error) {
      console.error(
        "[Chat PDF RAG] Ask error:",
        error,
      );

      const providerStatus =
        Number(
          error?.status,
        );

      const status =
        providerStatus >= 400 &&
        providerStatus < 600
          ? providerStatus
          : 500;

      return res.status(status).json({
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Failed to answer the PDF question.",
      });
    }
  },
);

/* =========================================================
   OFFICE → PDF
   DOC / DOCX / XLS / XLSX / PPT / PPTX
========================================================= */

function isOfficeFile(file) {
  const name = String(
    file?.originalname || "",
  ).toLowerCase();

  return (
    name.endsWith(".doc") ||
    name.endsWith(".docx") ||
    name.endsWith(".xls") ||
    name.endsWith(".xlsx") ||
    name.endsWith(".ppt") ||
    name.endsWith(".pptx")
  );
}

/*
 * LibreOffice conversion runner.
 *
 * Every conversion gets its OWN LibreOffice user profile. Sharing the
 * default profile makes soffice fail silently (exit code with no output)
 * whenever a previous process is still alive or two conversions overlap,
 * because LibreOffice allows only one process per profile — one stuck
 * conversion used to poison every later one until the server restarted.
 * Conversions are also serialized: LibreOffice is heavy, and parallel
 * instances exhaust memory on small instances.
 */
let officeQueue = Promise.resolve();

function runSofficeOnce(libreOffice, inputPath, outputDir, profileDir) {
  return new Promise((resolve, reject) => {
    execFile(
      libreOffice,
      [
        `-env:UserInstallation=file://${profileDir}`,
        "--headless",
        "--nologo",
        "--nofirststartwizard",
        "--convert-to",
        "pdf",
        "--outdir",
        outputDir,
        inputPath,
      ],
      {
        timeout: 300000,
        maxBuffer: 100 * 1024 * 1024,
        // A hung soffice must not survive to block the next conversion.
        killSignal: "SIGKILL",
      },
      (error, stdout, stderr) => {
        if (error) {
          const detail = (stderr || "").trim() || (stdout || "").trim();
          console.error(
            `[Office → PDF] soffice failed: ${detail || error.message}`,
          );
          reject(new Error("LibreOffice conversion failed."));
          return;
        }
        resolve();
      },
    );
  });
}

async function convertOfficeToPdf(libreOffice, inputPath, outputDir) {
  const run = async () => {
    let lastError = null;
    // One retry with a fresh profile covers transient profile corruption.
    for (let attempt = 1; attempt <= 2; attempt += 1) {
      const profileDir = await fsp.mkdtemp(
        path.join(os.tmpdir(), "lo-profile-"),
      );
      try {
        await runSofficeOnce(libreOffice, inputPath, outputDir, profileDir);
        return;
      } catch (err) {
        lastError = err;
        console.error(
          `[Office → PDF] attempt ${attempt} failed${
            attempt < 2 ? " — retrying with a fresh profile" : ""
          }`,
        );
      } finally {
        await fsp
          .rm(profileDir, { recursive: true, force: true })
          .catch(() => {});
      }
    }
    throw lastError || new Error("LibreOffice conversion failed.");
  };

  const result = officeQueue.then(run, run);
  officeQueue = result.catch(() => {});
  return result;
}

app.post(
  ["/api/pdf/office-to-pdf", "/api/word-to-pdf", "/api/powerpoint-to-pdf", "/api/excel-to-pdf"],
  upload.single("file"),
  async (req, res) => {
    let inputPath = "";
    let outputPath = "";

    try {
      if (!req.file) {
        return res.status(400).json({
          error: "Office file is required.",
        });
      }

      if (!isOfficeFile(req.file)) {
        return res.status(400).json({
          error:
            "Please upload a DOC, DOCX, XLS, XLSX, PPT, or PPTX file.",
        });
      }

      inputPath = req.file.path;

      const outputDir =
        path.dirname(inputPath);

      const libreOffice =
        process.env.LIBREOFFICE_BIN ||
        (
          process.platform === "darwin"
            ? "/Applications/LibreOffice.app/Contents/MacOS/soffice"
            : "libreoffice"
        );

      console.log(
        `[Office → PDF] Converting ${req.file.originalname}`,
      );

      console.log(
        `[Office → PDF] LibreOffice: ${libreOffice}`,
      );

      await convertOfficeToPdf(libreOffice, inputPath, outputDir);

      const generatedBase =
        path.basename(
          inputPath,
          path.extname(
            inputPath,
          ),
        );

      outputPath =
        path.join(
          outputDir,
          `${generatedBase}.pdf`,
        );

      if (
        !fs.existsSync(
          outputPath,
        )
      ) {
        const files =
          await fsp.readdir(
            outputDir,
          );

        const pdfFiles =
          files.filter(
            (name) =>
              name
                .toLowerCase()
                .endsWith(".pdf"),
          );

        if (
          pdfFiles.length === 0
        ) {
          throw new Error(
            "LibreOffice completed without creating a PDF.",
          );
        }

        outputPath =
          path.join(
            outputDir,
            pdfFiles[0],
          );
      }

      if (
        !fs.existsSync(
          outputPath,
        )
      ) {
        throw new Error(
          "Converted PDF file does not exist.",
        );
      }

      const originalBase =
        path.basename(
          req.file.originalname ||
            "document",
          path.extname(
            req.file.originalname ||
              "document",
          ),
        );

      const downloadName =
        `${safeFileName(
          originalBase,
          "document",
        )}.pdf`;

      console.log(
        `[Office → PDF] Created ${downloadName}`,
      );

      res.setHeader(
        "Content-Type",
        "application/pdf",
      );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${downloadName}"`,
      );

      res.setHeader(
        "Cache-Control",
        "no-store",
      );

      return sendFileAndCleanup(
        res,
        outputPath,
        downloadName,
        "application/pdf",
        [inputPath],
      );
    } catch (error) {
      console.error(
        "[Office → PDF]",
        error,
      );

      await safeDelete(
        inputPath,
      );

      await safeDelete(
        outputPath,
      );

      return res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "Office to PDF conversion failed.",
      });
    }
  },
);

/* =========================================================
   HTML → PDF
========================================================= */

app.post(
  ["/api/pdf/html-to-pdf", "/api/html-to-pdf"],
  async (req, res) => {
    let outputPath = "";

    try {
      const html =
        String(
          req.body?.html || "",
        ).trim();

      const fileName =
        String(
          req.body?.fileName ||
            "html-document",
        )
          .replace(
            /[^a-zA-Z0-9._-]/g,
            "-",
          )
          .slice(0, 100) ||
        "html-document";

      if (!html) {
        return res.status(400).json({
          error:
            "HTML content is required.",
        });
      }

      const outputDir =
        await createOutputDir(
          "html-to-pdf",
        );

      outputPath =
        path.join(
          outputDir,
          `${fileName}.pdf`,
        );

      const pyScript = `
import asyncio
import sys
from pathlib import Path

from playwright.async_api import async_playwright

html_path = sys.argv[1]
output_path = sys.argv[2]

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True,
            args=["--no-sandbox", "--disable-setuid-sandbox"],
        )

        page = await browser.new_page(
            viewport={
                "width": 1280,
                "height": 720,
            }
        )

        html = Path(
            html_path
        ).read_text(
            encoding="utf-8"
        )

        await page.set_content(
            html,
            wait_until="networkidle",
        )

        await page.emulate_media(
            media="print"
        )

        await page.pdf(
            path=output_path,
            format="A4",
            print_background=True,
            margin={
                "top": "20mm",
                "right": "15mm",
                "bottom": "20mm",
                "left": "15mm",
            },
            prefer_css_page_size=True,
        )

        await browser.close()

asyncio.run(main())
`.trim();

      const htmlInputPath =
        path.join(
          outputDir,
          `${crypto.randomBytes(
            8,
          ).toString("hex")}.html`,
        );

      await fsp.writeFile(
        htmlInputPath,
        html,
        "utf8",
      );

      await runPythonScript(
        pyScript,
        [
          htmlInputPath,
          outputPath,
        ],
        "HTML to PDF conversion failed.",
        300000,
      );

      await safeDelete(
        htmlInputPath,
      );

      if (
        !fs.existsSync(
          outputPath,
        )
      ) {
        await safeRemoveDirectory(
          outputDir,
        );

        throw new Error(
          "HTML to PDF conversion did not create a PDF.",
        );
      }

      res.setHeader(
        "Content-Type",
        "application/pdf",
      );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${fileName}.pdf"`,
      );

      res.setHeader(
        "Cache-Control",
        "no-store",
      );

      return res.sendFile(
        outputPath,
        {},
        async (error) => {
          await safeRemoveDirectory(
            outputDir,
          );

          if (
            error &&
            !res.headersSent
          ) {
            res.status(500).json({
              error:
                error.message ||
                "Could not send generated PDF.",
            });
          }
        },
      );
    } catch (error) {
      console.error(
        "[HTML → PDF]",
        error,
      );

      if (outputPath) {
        await safeDelete(
          outputPath,
        );
      }

      return res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "HTML to PDF conversion failed.",
      });
    }
  },
);

/* =========================================================
   404 HANDLER
========================================================= */

app.use(
  (req, res) => {
    res.status(404).json({
      success: false,

      error:
        `Route not found: ${req.method} ${req.originalUrl}`,
    });
  },
);


/* =========================================================
   GLOBAL ERROR HANDLER
========================================================= */

app.use(
  (error, _req, res, _next) => {
    console.error(
      "[PDFVerse API] Unhandled error:",
      error,
    );

    if (res.headersSent) {
      return;
    }

    if (error?.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        success: false,
        error: "File too large. Maximum supported file size is 100MB per file.",
      });
    }

    const status =
      Number(error?.statusCode) >= 400 &&
      Number(error?.statusCode) < 600
        ? Number(error.statusCode)
        : 500;

    res.status(status).json({
      success: false,

      error:
        error?.message ||
        "Internal server error.",
    });
  },
);


/* =========================================================
   SERVER START
========================================================= */
console.log(
  "[PDFVerse] Registered POST routes:",
);

console.log(
  app._router?.stack
    ?.filter(
      (layer) =>
        layer.route &&
        layer.route.path,
    )
    .map((layer) => ({
      path:
        layer.route.path,
      methods:
        Object.keys(
          layer.route.methods,
        ),
    })),
);


app.listen(
  PORT,
  "0.0.0.0",
  () => {
    console.log(
      `PDFVerse PDF API running on port ${PORT}`,
    );

    console.log(
      `Chat PDF RAG: ${
        process.env.GEMINI_API_KEY
          ? "Gemini configured"
          : "GEMINI_API_KEY missing"
      }`,
    );

    console.log(
      `RAG embedding model: ${
        process.env.GEMINI_EMBEDDING_MODEL ||
        "gemini-embedding-2"
      }`,
    );

    console.log(
      `RAG generation model: ${
        process.env.GEMINI_RAG_MODEL ||
        "gemini-3.7-flash"
      }`,
    );
  },
);