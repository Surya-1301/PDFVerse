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

app.use(express.json({ limit: "5mb" }));

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
    fileSize: 50 * 1024 * 1024,
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
    fileSize: 50 * 1024 * 1024,
    files: 10,
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
    fileSize: 50 * 1024 * 1024,
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
          20 * 1024 * 1024,

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

function compressWithGhostscript(inputPath, outputPath, quality) {
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

  return new Promise((resolve, reject) => {
    execFile("gs", args, { timeout: 120000 }, (error, stdout, stderr) => {
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
}

function pdfToWord(inputPath, outputPath) {
  const pyScript = `
import sys
from pdf2docx import Converter

input_path = sys.argv[1]
output_path = sys.argv[2]

converter = Converter(input_path)

try:
    converter.convert(output_path, start=0, end=None)
finally:
    converter.close()
`.trim();

  return runPythonScript(
    pyScript,
    [inputPath, outputPath],
    "PDF to Word conversion failed.",
  );
}

function pdfToExcel(inputPath, outputPath) {
  const pyScript = `
import sys
import fitz
from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill, Border, Side
from openpyxl.utils import get_column_letter

input_path = sys.argv[1]
output_path = sys.argv[2]

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
    [inputPath, outputPath],
    "PDF to Excel conversion failed.",
    300000,
  );
}

function pdfToPowerPoint(inputPath, outputPath) {
  const pyScript = `
import io
import os
import sys
import fitz
import tempfile
from PIL import Image
from pptx import Presentation

input_path = sys.argv[1]
output_path = sys.argv[2]

prs = Presentation()
prs.slide_width = 12192000
prs.slide_height = 6858000
blank_layout = prs.slide_layouts[6]

doc = fitz.open(input_path)
temp_files = []

try:
    for page_index, page in enumerate(doc):
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
        png_bytes = pix.tobytes("png")

        image = Image.open(io.BytesIO(png_bytes))
        img_width, img_height = image.size

        slide = prs.slides.add_slide(blank_layout)

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
    [inputPath, outputPath],
    "PDF to PowerPoint conversion failed.",
  );
}

function pdfToJpg(inputPath, outputDir) {
  const outputPrefix = path.join(outputDir, "page");
  const args = ["-jpeg", "-r", "180", inputPath, outputPrefix];

  return new Promise((resolve, reject) => {
    execFile("pdftoppm", args, { timeout: 240000 }, (error, stdout, stderr) => {
      if (error) {
        reject(
          new Error(
            stderr ||
              stdout ||
              error.message ||
              "PDF to JPG conversion failed.",
          ),
        );
        return;
      }

      resolve();
    });
  });
}

function zipFiles(files, outputPath, cwd) {
  return new Promise((resolve, reject) => {
    execFile(
      "zip",
      ["-j", outputPath, ...files],
      { timeout: 120000, cwd },
      (error, stdout, stderr) => {
        if (error) {
          reject(
            new Error(
              stderr || stdout || error.message || "Could not create ZIP file.",
            ),
          );
          return;
        }

        resolve();
      },
    );
  });
}

function pdfToPdfa(inputPath, outputPath) {
  const args = [
    "-dPDFA=2",
    "-dBATCH",
    "-dNOPAUSE",
    "-dNOOUTERSAVE",
    "-sColorConversionStrategy=RGB",
    "-sDEVICE=pdfwrite",
    "-dPDFACompatibilityPolicy=1",
    `-sOutputFile=${outputPath}`,
    inputPath,
  ];

  return new Promise((resolve, reject) => {
    execFile("gs", args, { timeout: 240000 }, (error, stdout, stderr) => {
      if (error) {
        reject(
          new Error(
            stderr || stdout || error.message || "PDF/A conversion failed.",
          ),
        );
        return;
      }

      resolve();
    });
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

      await pdfToJpg(
        inputPath,
        outputDir,
      );

      const files =
        (
          await fsp.readdir(
            outputDir,
          )
        )
          .filter(
            (name) =>
              /\.(jpg|jpeg)$/i.test(
                name,
              ),
          )
          .map(
            (name) =>
              path.join(
                outputDir,
                name,
              ),
          );

      if (files.length === 0) {
        throw new Error(
          "No JPG images were generated.",
        );
      }

      outputZip =
        path.join(
          outputDir,
          "pdf-pages.zip",
        );

      await zipFiles(
        files,
        outputZip,
        outputDir,
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

function zipDirectoryFiles(
  outputZip,
  outputDir,
) {
  return new Promise(
    (resolve, reject) => {
      execFile(
        "zip",
        [
          "-j",
          outputZip,
          path.join(
            outputDir,
            "*",
          ),
        ],
        {
          timeout: 120000,
          shell: true,
        },
        (
          error,
          stdout,
          stderr,
        ) => {
          if (error) {
            reject(
              new Error(
                stderr ||
                  stdout ||
                  error.message ||
                  "Could not create ZIP file.",
              ),
            );
            return;
          }

          resolve();
        },
      );
    },
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

      await safeRemoveDir(
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

    await safeRemoveDir(
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

input_pdf = sys.argv[1]
output_pdf = sys.argv[2]
text = sys.argv[3]
opacity = float(sys.argv[4])

doc = fitz.open(input_pdf)

for page in doc:
    rect = page.rect

    page.insert_text(
        (
            rect.width * 0.18,
            rect.height * 0.5,
        ),
        text,
        fontsize=42,
        rotate=35,
        color=(
            0.45,
            0.45,
            0.45,
        ),
        fill_opacity=opacity,
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

/**
 * GET /api/chat-pdf/status
 *
 * Lets the frontend determine whether the backend
 * has Gemini configured and whether RAG is enabled.
 */
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


/**
 * POST /api/chat-pdf/upload
 *
 * RAG indexing flow:
 *
 * PDF
 *  ↓
 * Extract text page-by-page
 *  ↓
 * Split into chunks
 *  ↓
 * Gemini embeddings
 *  ↓
 * Store vectors in RAG session
 *  ↓
 * Return fileId + fileToken
 */
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