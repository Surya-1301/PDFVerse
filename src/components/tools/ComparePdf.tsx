import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Check,
  Download,
  FileSearch,
  FileText,
  Upload,
} from "lucide-react";
import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "@cantoo/pdf-lib";

import {
  extractText,
  getPdfJsDoc,
  renderPageToCanvas,
} from "@/lib/pdf/toolkit";

/* ==========================================================================
   TYPES
   ========================================================================== */

type PageComparison = {
  page: number;
  identical: boolean;
  similarity: number;
  firstLength: number;
  secondLength: number;
  added: string[];
  removed: string[];
  changed: string[];
  firstPreviewUrl?: string;
  secondPreviewUrl?: string;
};

const MAX_FILE_SIZE = 50 * 1024 * 1024;

/* ==========================================================================
   TEXT DIFF
   ========================================================================== */

function getDiffLines(first: string[], second: string[]) {
  const matrix = Array.from(
    { length: first.length + 1 },
    () => Array<number>(second.length + 1).fill(0),
  );

  for (let i = first.length - 1; i >= 0; i -= 1) {
    for (let j = second.length - 1; j >= 0; j -= 1) {
      matrix[i][j] =
        first[i] === second[j]
          ? (matrix[i + 1]?.[j + 1] ?? 0) + 1
          : Math.max(
              matrix[i + 1]?.[j] ?? 0,
              matrix[i]?.[j + 1] ?? 0,
            );
    }
  }

  const removed: string[] = [];
  const added: string[] = [];

  let i = 0;
  let j = 0;

  while (i < first.length && j < second.length) {
    if (first[i] === second[j]) {
      i += 1;
      j += 1;
      continue;
    }

    if (
      (matrix[i + 1]?.[j] ?? 0) >=
      (matrix[i]?.[j + 1] ?? 0)
    ) {
      removed.push(first[i] ?? "");
      i += 1;
    } else {
      added.push(second[j] ?? "");
      j += 1;
    }
  }

  while (i < first.length) {
    removed.push(first[i] ?? "");
    i += 1;
  }

  while (j < second.length) {
    added.push(second[j] ?? "");
    j += 1;
  }

  return {
    added: added.slice(0, 20),
    removed: removed.slice(0, 20),
    changed: [
      ...removed.slice(0, 10),
      ...added.slice(0, 10),
    ].slice(0, 20),
  };
}

/* ==========================================================================
   DATA URL
   ========================================================================== */

function canvasToDataUrl(
  canvas: HTMLCanvasElement,
  type: string = "image/jpeg",
) {
  return canvas.toDataURL(type, 0.88);
}

/* ==========================================================================
   CREATE ALIGNED PREVIEWS
   ========================================================================== */

function createAlignedCanvas(
  source: HTMLCanvasElement,
  width: number,
  height: number,
) {
  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas is not available in this browser.");
  }

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);

  const scale = Math.min(
    width / source.width,
    height / source.height,
  );

  const drawWidth = source.width * scale;
  const drawHeight = source.height * scale;

  const x = (width - drawWidth) / 2;
  const y = (height - drawHeight) / 2;

  context.drawImage(
    source,
    x,
    y,
    drawWidth,
    drawHeight,
  );

  return canvas;
}

async function createPagePreviews(
  firstFile: File,
  secondFile: File,
  pageNumber: number,
) {
  const firstDoc = await getPdfJsDoc(firstFile);
  const secondDoc = await getPdfJsDoc(secondFile);

  if (
    pageNumber > firstDoc.numPages ||
    pageNumber > secondDoc.numPages
  ) {
    return {
      firstPreviewUrl: undefined,
      secondPreviewUrl: undefined,
    };
  }

  const firstPage = await firstDoc.getPage(pageNumber);
  const secondPage = await secondDoc.getPage(pageNumber);

  const [firstCanvas, secondCanvas] = await Promise.all([
    renderPageToCanvas(firstPage, 0.85),
    renderPageToCanvas(secondPage, 0.85),
  ]);

  /*
   * Put both pages into identical canvas dimensions.
   * This keeps the interactive overlay perfectly aligned.
   */

  const commonWidth = Math.max(
    firstCanvas.width,
    secondCanvas.width,
  );

  const commonHeight = Math.max(
    firstCanvas.height,
    secondCanvas.height,
  );

  const alignedFirst = createAlignedCanvas(
    firstCanvas,
    commonWidth,
    commonHeight,
  );

  const alignedSecond = createAlignedCanvas(
    secondCanvas,
    commonWidth,
    commonHeight,
  );

  return {
    firstPreviewUrl: canvasToDataUrl(alignedFirst),
    secondPreviewUrl: canvasToDataUrl(alignedSecond),
  };
}

/* ==========================================================================
   COMPARISON REPORT
   ========================================================================== */

async function downloadComparisonReport(
  firstFile: File,
  secondFile: File,
  pages: PageComparison[],
) {
  const doc = await PDFDocument.create();

  const font = await doc.embedFont(
    StandardFonts.Helvetica,
  );

  const bold = await doc.embedFont(
    StandardFonts.HelveticaBold,
  );

  const width = 595;
  const height = 842;
  const margin = 44;

  let page = doc.addPage([width, height]);
  let y = height - margin;

  const ensureSpace = (needed: number) => {
    if (y - needed < margin) {
      page = doc.addPage([width, height]);
      y = height - margin;
    }
  };

  const drawText = (
    value: string,
    size = 10,
    isBold = false,
    color = rgb(0.15, 0.15, 0.18),
  ) => {
    ensureSpace(size * 1.8);

    page.drawText(value.slice(0, 110), {
      x: margin,
      y,
      size,
      font: isBold ? bold : font,
      color,
    });

    y -= size * 1.55;
  };

  drawText(
    "PDFVerse — PDF Comparison Report",
    18,
    true,
  );

  drawText(`Version 1: ${firstFile.name}`, 10);
  drawText(`Version 2: ${secondFile.name}`, 10);

  const changed = pages.filter(
    (item) => !item.identical,
  ).length;

  drawText(
    `Pages compared: ${pages.length} • Changed pages: ${changed}`,
    10,
    true,
  );

  y -= 8;

  for (const item of pages) {
    drawText(
      `Page ${item.page} — ${
        item.identical ? "Identical" : "Changed"
      } — ${Math.round(item.similarity * 100)}% similarity`,
      12,
      true,
      item.identical
        ? rgb(0.05, 0.45, 0.25)
        : rgb(0.7, 0.15, 0.15),
    );

    if (item.added.length) {
      drawText(
        "Added text",
        10,
        true,
        rgb(0.05, 0.45, 0.25),
      );

      for (const line of item.added.slice(0, 12)) {
        drawText(`+ ${line}`, 9);
      }
    }

    if (item.removed.length) {
      drawText(
        "Removed text",
        10,
        true,
        rgb(0.7, 0.15, 0.15),
      );

      for (const line of item.removed.slice(0, 12)) {
        drawText(`- ${line}`, 9);
      }
    }

    if (
      !item.identical &&
      !item.added.length &&
      !item.removed.length
    ) {
      drawText(
        "Visual/layout difference detected.",
        9,
      );
    }

    y -= 8;
  }

  const bytes = await doc.save({
    useObjectStreams: true,
  });

  const blob = new Blob(
    [bytes as unknown as BlobPart],
    {
      type: "application/pdf",
    },
  );

  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "pdfverse-comparison-report.pdf";

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(url);
}

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */

export function ComparePdf() {
  const [firstFile, setFirstFile] =
    useState<File | null>(null);

  const [secondFile, setSecondFile] =
    useState<File | null>(null);

  const [pages, setPages] =
    useState<PageComparison[]>([]);

  const [selectedPage, setSelectedPage] =
    useState(1);

  const [busy, setBusy] =
    useState(false);

  const [error, setError] =
    useState("");

  const changedPages = useMemo(
    () =>
      pages.filter(
        (page) => !page.identical,
      ).length,
    [pages],
  );

  const selected = pages.find(
    (page) => page.page === selectedPage,
  );

  /* ------------------------------------------------------------------------
     VALIDATION
  ------------------------------------------------------------------------ */

  function validateFile(file: File | null) {
    if (!file) {
      return "Choose a PDF file.";
    }

    if (file.size > MAX_FILE_SIZE) {
      return "PDF files must be 50 MB or smaller.";
    }

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      return "Only PDF files are supported.";
    }

    return "";
  }

  /* ------------------------------------------------------------------------
     COMPARE
  ------------------------------------------------------------------------ */

  async function compare() {
    setError("");
    setPages([]);

    const firstError = validateFile(firstFile);
    const secondError = validateFile(secondFile);

    if (firstError || secondError) {
      setError(firstError || secondError);
      return;
    }

    if (!firstFile || !secondFile) {
      return;
    }

    setBusy(true);

    try {
      const [
        firstText,
        secondText,
        firstDoc,
        secondDoc,
      ] = await Promise.all([
        extractText(firstFile),
        extractText(secondFile),
        getPdfJsDoc(firstFile),
        getPdfJsDoc(secondFile),
      ]);

      const totalPages = Math.max(
        firstDoc.numPages,
        secondDoc.numPages,
      );

      const nextPages: PageComparison[] = [];

      for (
        let pageNumber = 1;
        pageNumber <= totalPages;
        pageNumber += 1
      ) {
        const firstLines =
          firstText[pageNumber - 1]?.lines ?? [];

        const secondLines =
          secondText[pageNumber - 1]?.lines ?? [];

        const diff = getDiffLines(
          firstLines,
          secondLines,
        );

        const firstJoined = firstLines.join("\n");
        const secondJoined = secondLines.join("\n");

        let similarity = 1;

        if (firstJoined || secondJoined) {
          const maxLength = Math.max(
            firstJoined.length,
            secondJoined.length,
          );

          const minLength = Math.min(
            firstJoined.length,
            secondJoined.length,
          );

          let same = 0;

          for (
            let i = 0;
            i < minLength;
            i += 1
          ) {
            if (
              firstJoined[i] ===
              secondJoined[i]
            ) {
              same += 1;
            }
          }

          similarity =
            maxLength > 0
              ? same / maxLength
              : 1;
        }

        const bothExist =
          pageNumber <= firstDoc.numPages &&
          pageNumber <= secondDoc.numPages;

        const identical =
          firstJoined === secondJoined &&
          pageNumber <= firstDoc.numPages ===
            (pageNumber <= secondDoc.numPages);

        let visual = {
          firstPreviewUrl:
            undefined as string | undefined,
          secondPreviewUrl:
            undefined as string | undefined,
        };

        /*
         * Generate only the two aligned images required by
         * the interactive overlay. The separate visual-diff
         * image is intentionally removed.
         */

        if (bothExist) {
          visual = await createPagePreviews(
            firstFile,
            secondFile,
            pageNumber,
          );
        }

        nextPages.push({
          page: pageNumber,
          identical,
          similarity,
          firstLength: firstJoined.length,
          secondLength: secondJoined.length,
          added: diff.added,
          removed: diff.removed,
          changed: diff.changed,
          firstPreviewUrl:
            visual.firstPreviewUrl,
          secondPreviewUrl:
            visual.secondPreviewUrl,
        });
      }

      setPages(nextPages);
      setSelectedPage(1);
    } catch (compareError) {
      console.error(compareError);

      setError(
        compareError instanceof Error
          ? compareError.message
          : "Could not compare these PDFs.",
      );
    } finally {
      setBusy(false);
    }
  }

  /* ------------------------------------------------------------------------
     CLEAR
  ------------------------------------------------------------------------ */

  function clear() {
    setFirstFile(null);
    setSecondFile(null);
    setPages([]);
    setSelectedPage(1);
    setError("");
  }

  /* ------------------------------------------------------------------------
     UI
  ------------------------------------------------------------------------ */

  return (
    <div className="space-y-6">
      {/* ================================================================
          UPLOAD
      ================================================================ */}

      <div className="grid gap-6 lg:grid-cols-2">
        <UploadPanel
          title="Version 1"
          file={firstFile}
          onChange={setFirstFile}
        />

        <UploadPanel
          title="Version 2"
          file={secondFile}
          onChange={setSecondFile}
        />
      </div>

      {/* ================================================================
          ACTIONS
      ================================================================ */}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={compare}
          disabled={
            busy ||
            !firstFile ||
            !secondFile
          }
          className="
            inline-flex
            min-h-11
            items-center
            gap-2
            rounded-xl
            bg-violet-600
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-violet-500
            disabled:cursor-not-allowed
            disabled:bg-slate-700
            disabled:text-slate-400
          "
        >
          <FileSearch className="h-4 w-4" />

          {busy
            ? "Comparing..."
            : "Compare PDFs"}
        </button>

        <button
          type="button"
          onClick={clear}
          className="
            inline-flex
            min-h-11
            items-center
            gap-2
            rounded-xl
            border
            border-red-500/30
            px-5
            py-2.5
            text-sm
            font-semibold
            text-red-300
            transition
            hover:bg-red-500/10
          "
        >
          Clear
        </button>

        {pages.length > 0 &&
        firstFile &&
        secondFile ? (
          <button
            type="button"
            onClick={() =>
              downloadComparisonReport(
                firstFile,
                secondFile,
                pages,
              )
            }
            className="
              inline-flex
              min-h-11
              items-center
              gap-2
              rounded-xl
              border
              border-white/10
              px-5
              py-2.5
              text-sm
              font-semibold
              text-slate-200
              transition
              hover:bg-white/10
            "
          >
            <Download className="h-4 w-4" />
            Download comparison report
          </button>
        ) : null}
      </div>

      {/* ================================================================
          ERROR
      ================================================================ */}

      {error ? (
        <div
          className="
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-red-500/30
            bg-red-500/10
            p-4
            text-sm
            text-red-200
          "
        >
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />

          <span>{error}</span>
        </div>
      ) : null}

      {/* ================================================================
          RESULTS
      ================================================================ */}

      {pages.length > 0 ? (
        <div className="space-y-5">
          {/* Statistics */}

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat
              label="Pages compared"
              value={pages.length}
            />

            <Stat
              label="Changed pages"
              value={changedPages}
            />

            <Stat
              label="Identical pages"
              value={
                pages.length -
                changedPages
              }
            />

            <Stat
              label="Overall status"
              value={
                changedPages === 0
                  ? "Identical"
                  : "Changed"
              }
            />
          </div>

          {/* ============================================================
              PAGE COMPARISON
          ============================================================ */}

          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/[0.03]
              p-4
              sm:p-6
            "
          >
            <div
              className="
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Page-by-page comparison
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Compare text and visual changes
                  between both versions using the
                  interactive overlay.
                </p>
              </div>

              <select
                value={selectedPage}
                onChange={(event) =>
                  setSelectedPage(
                    Number(event.target.value),
                  )
                }
                aria-label="Select page"
                className="
                  rounded-xl
                  border
                  border-white/10
                  bg-slate-950
                  px-4
                  py-2.5
                  text-sm
                  text-white
                  outline-none
                  focus:border-violet-500
                "
              >
                {pages.map((page) => (
                  <option
                    key={page.page}
                    value={page.page}
                  >
                    Page {page.page} —{" "}
                    {page.identical
                      ? "Same"
                      : "Changed"}
                  </option>
                ))}
              </select>
            </div>

            {selected ? (
              <div className="mt-6 space-y-5">
                {/* Status */}

                <div className="flex flex-wrap gap-2">
                  <span
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      ${
                        selected.identical
                          ? "bg-emerald-500/10 text-emerald-200"
                          : "bg-red-500/10 text-red-200"
                      }
                    `}
                  >
                    {selected.identical
                      ? "No changes"
                      : "Changed"}
                  </span>

                  <span
                    className="
                      rounded-full
                      border
                      border-white/10
                      bg-white/5
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-slate-300
                    "
                  >
                    {Math.round(
                      selected.similarity * 100,
                    )}
                    % text similarity
                  </span>
                </div>

                {/* ========================================================
                    INTERACTIVE OVERLAY ONLY
                ======================================================== */}

                <OverlayComparison
                  firstImage={
                    selected.firstPreviewUrl
                  }
                  secondImage={
                    selected.secondPreviewUrl
                  }
                />

                {/* ========================================================
                    TEXT DIFFERENCES
                ======================================================== */}

                <div className="grid gap-4 lg:grid-cols-3">
                  <DiffList
                    title="Removed text"
                    lines={selected.removed}
                    tone="removed"
                  />

                  <DiffList
                    title="Added text"
                    lines={selected.added}
                    tone="added"
                  />

                  <DiffList
                    title="Changed text"
                    lines={selected.changed}
                    tone="changed"
                  />
                </div>

                {!selected.identical &&
                selected.removed.length === 0 &&
                selected.added.length === 0 ? (
                  <div
                    className="
                      rounded-2xl
                      border
                      border-amber-500/20
                      bg-amber-500/10
                      p-4
                      text-sm
                      text-amber-100
                    "
                  >
                    The page has a visual or
                    layout difference, but no
                    text-line change was extracted.
                    Use the interactive overlay
                    above to inspect the difference.
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        /* Empty state */

        <div
          className="
            flex
            min-h-[320px]
            items-center
            justify-center
            rounded-3xl
            border
            border-dashed
            border-white/10
            bg-white/[0.02]
            text-center
          "
        >
          <div className="max-w-md px-6">
            <FileSearch className="mx-auto h-10 w-10 text-slate-600" />

            <p className="mt-4 font-semibold text-slate-300">
              Compare two PDF versions
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Upload both versions to see added
              text, removed text, changed pages,
              and inspect visual changes with the
              interactive overlay.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   INTERACTIVE OVERLAY COMPARISON
   ========================================================================== */

function OverlayComparison({
  firstImage,
  secondImage,
}: {
  firstImage?: string;
  secondImage?: string;
}) {
  const [position, setPosition] =
    useState(50);

  const [dragging, setDragging] =
    useState(false);

  function updatePosition(
    clientX: number,
    element: HTMLDivElement,
  ) {
    const rect =
      element.getBoundingClientRect();

    if (rect.width <= 0) {
      return;
    }

    const next =
      ((clientX - rect.left) /
        rect.width) *
      100;

    setPosition(
      Math.min(
        100,
        Math.max(0, next),
      ),
    );
  }

  if (!firstImage || !secondImage) {
    return null;
  }

  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-slate-950
        p-4
        sm:p-5
      "
    >
      {/* Header */}

      <div
        className="
          mb-4
          flex
          flex-col
          gap-2
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <h3 className="text-sm font-semibold text-white">
            Interactive overlay
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Drag the divider left or right to
            compare both versions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-200">
            Version 2
          </span>

          <span className="text-xs text-slate-600">
            /
          </span>

          <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
            Version 1
          </span>
        </div>
      </div>

      {/* ================================================================
          SLIDER
      ================================================================ */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[560px]
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-slate-900
          touch-none
          select-none
        "
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(
            event.pointerId,
          );

          setDragging(true);

          updatePosition(
            event.clientX,
            event.currentTarget,
          );
        }}
        onPointerMove={(event) => {
          if (!dragging) {
            return;
          }

          updatePosition(
            event.clientX,
            event.currentTarget,
          );
        }}
        onPointerUp={(event) => {
          setDragging(false);

          if (
            event.currentTarget.hasPointerCapture(
              event.pointerId,
            )
          ) {
            event.currentTarget.releasePointerCapture(
              event.pointerId,
            );
          }
        }}
        onPointerCancel={(event) => {
          setDragging(false);

          if (
            event.currentTarget.hasPointerCapture(
              event.pointerId,
            )
          ) {
            event.currentTarget.releasePointerCapture(
              event.pointerId,
            );
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();

            setPosition((value) =>
              Math.max(0, value - 5),
            );
          }

          if (event.key === "ArrowRight") {
            event.preventDefault();

            setPosition((value) =>
              Math.min(100, value + 5),
            );
          }

          if (event.key === "Home") {
            event.preventDefault();
            setPosition(0);
          }

          if (event.key === "End") {
            event.preventDefault();
            setPosition(100);
          }
        }}
        role="slider"
        aria-label="PDF comparison overlay"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        tabIndex={0}
      >
        {/* Version 1 base */}

        <img
          src={firstImage}
          alt="Version 1 PDF page"
          className="block h-auto w-full"
          draggable={false}
        />

        {/* Version 2 clipped layer */}

        <div
          className="
            absolute
            inset-y-0
            left-0
            overflow-hidden
          "
          style={{
            width: `${position}%`,
          }}
        >
          <img
            src={secondImage}
            alt="Version 2 PDF page"
            className="
              absolute
              left-0
              top-0
              h-full
              w-full
              max-w-none
            "
            style={{
              width:
                position > 0
                  ? `${10000 / position}%`
                  : "100%",
            }}
            draggable={false}
          />
        </div>

        {/* Version 2 label */}

        <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg backdrop-blur">
          Version 2
        </div>

        {/* Version 1 label */}

        <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg backdrop-blur">
          Version 1
        </div>

        {/* Divider */}

        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            z-10
            w-0.5
            bg-white
            shadow-[0_0_14px_rgba(255,255,255,0.8)]
          "
          style={{
            left: `${position}%`,
          }}
        >
          {/* Handle */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              flex
              h-11
              w-11
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-white/30
              bg-violet-600
              text-white
              shadow-xl
              sm:h-12
              sm:w-12
            "
          >
            <span className="text-lg font-bold">
              ↔
            </span>
          </div>
        </div>
      </div>

      {/* Slider percentage */}

      <div className="mx-auto mt-4 flex max-w-[560px] items-center gap-3">
        <span className="text-[11px] font-medium text-slate-500">
          V2
        </span>

        <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-violet-500"
            style={{
              width: `${position}%`,
            }}
          />
        </div>

        <span className="text-[11px] font-medium text-slate-500">
          V1
        </span>
      </div>

      <p
        aria-live="polite"
        className="mt-3 text-center text-xs text-slate-600"
      >
        {Math.round(position)}% Version 2
        visible
      </p>
    </div>
  );
}

/* ==========================================================================
   UPLOAD PANEL
   ========================================================================== */

function UploadPanel({
  title,
  file,
  onChange,
}: {
  title: string;
  file: File | null;
  onChange: (file: File | null) => void;
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/[0.03]
        p-4
        sm:p-6
      "
    >
      <h2 className="mb-4 text-base font-semibold text-white">
        {title}
      </h2>

      <label
        className="
          flex
          min-h-[210px]
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-dashed
          border-white/15
          bg-slate-950
          p-6
          text-center
          transition
          hover:border-violet-500/50
          hover:bg-violet-500/[0.05]
        "
      >
        <span
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-violet-600/20
            text-violet-300
          "
        >
          <Upload className="h-5 w-5" />
        </span>

        <span className="mt-4 text-sm font-semibold text-white">
          {file
            ? "Choose another PDF"
            : "Upload PDF"}
        </span>

        <span className="mt-2 max-w-xs text-xs leading-5 text-slate-500">
          PDF only, up to 50 MB.
          <br />
          Files stay in your browser.
        </span>

        <input
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={(event) =>
            onChange(
              event.target.files?.[0] ?? null,
            )
          }
        />
      </label>

      {file ? (
        <div
          className="
            mt-4
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-white/10
            bg-slate-950
            p-3
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-violet-600/15
              text-violet-300
            "
          >
            <FileText className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {file.name}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {(
                file.size /
                1024 /
                1024
              ).toFixed(2)}{" "}
              MB
            </p>
          </div>

          <Check className="ml-auto h-5 w-5 shrink-0 text-emerald-400" />
        </div>
      ) : null}
    </div>
  );
}

/* ==========================================================================
   STAT
   ========================================================================== */

function Stat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div
      className="
        min-h-[105px]
        rounded-2xl
        border
        border-white/10
        bg-white/[0.03]
        p-4
      "
    >
      <p className="text-xs font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-4 text-2xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}

/* ==========================================================================
   DIFF LIST
   ========================================================================== */

function DiffList({
  title,
  lines,
  tone,
}: {
  title: string;
  lines: string[];
  tone: "added" | "removed" | "changed";
}) {
  const isAdded = tone === "added";
  const isChanged = tone === "changed";

  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-slate-950
        p-4
      "
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-white">
          {title}
        </h3>

        <span
          className={`
            rounded-full
            px-2.5
            py-1
            text-[11px]
            font-semibold
            ${
              isAdded
                ? "bg-emerald-500/10 text-emerald-200"
                : isChanged
                  ? "bg-amber-500/10 text-amber-200"
                  : "bg-red-500/10 text-red-200"
            }
          `}
        >
          {lines.length}
        </span>
      </div>

      {lines.length > 0 ? (
        <div
          className="
            mt-3
            max-h-[260px]
            space-y-2
            overflow-auto
          "
        >
          {lines.map((line, index) => (
            <div
              key={`${index}-${line}`}
              className={`
                rounded-lg
                border
                px-3
                py-2
                font-mono
                text-xs
                leading-5
                ${
                  isChanged
                    ? "border-amber-500/10 bg-amber-500/[0.06] text-amber-200"
                    : isAdded
                      ? "border-emerald-500/10 bg-emerald-500/[0.06] text-emerald-200"
                      : "border-red-500/10 bg-red-500/[0.06] text-red-200"
                }
              `}
            >
              {isChanged
                ? "~"
                : isAdded
                  ? "+"
                  : "−"}{" "}
              {line || "(empty line)"}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm text-slate-600">
          None detected.
        </p>
      )}
    </div>
  );
}
