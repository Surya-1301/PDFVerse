"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import {
  ArrowLeft,
  Check,
  Download,
  Eraser,
  Highlighter,
  ImagePlus,
  MousePointer2,
  PenLine,
  Redo2,
  Square,
  Trash2,
  Type,
  Undo2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

type Tool = "select" | "text" | "image" | "whiteout" | "draw" | "highlight" | "rectangle";

type Point = { x: number; y: number };

type EditorItem = {
  id: string;
  page: number;
  type: Exclude<Tool, "select">;
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
  imageDataUrl?: string;
  points?: Point[];
};

const toolButtons: Array<{ id: Tool; label: string; icon: React.ReactNode }> = [
  { id: "select", label: "Select", icon: <MousePointer2 className="h-4 w-4" /> },
  { id: "text", label: "Text", icon: <Type className="h-4 w-4" /> },
  { id: "image", label: "Image", icon: <ImagePlus className="h-4 w-4" /> },
  { id: "draw", label: "Draw", icon: <PenLine className="h-4 w-4" /> },
  { id: "highlight", label: "Highlight", icon: <Highlighter className="h-4 w-4" /> },
  { id: "whiteout", label: "Whiteout", icon: <Eraser className="h-4 w-4" /> },
  { id: "rectangle", label: "Shape", icon: <Square className="h-4 w-4" /> },
];

function makeId() {
  return `edit-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function dataUrlToBytes(dataUrl: string) {
  const base64 = dataUrl.split(",")[1] || "";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function toSafeArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return buffer;
}

type PdfVisualEditorProps = {
  onBack: () => void;
  initialFile?: File | null;
  blank?: boolean;
};

export function PdfVisualEditor({
  onBack,
  initialFile = null,
  blank = false,
}: PdfVisualEditorProps) {
  const [file, setFile] = useState<File | null>(initialFile);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [tool, setTool] = useState<Tool>("select");
  const [items, setItems] = useState<EditorItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [textValue, setTextValue] = useState("Type here");
  const [isRendering, setIsRendering] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<EditorItem[][]>([]);
  const [future, setFuture] = useState<EditorItem[][]>([]);
  const [drawPoints, setDrawPoints] = useState<Point[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [pageSize, setPageSize] = useState({ width: 612, height: 792 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const pdfRef = useRef<any>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!initialFile) return;

    setFile(initialFile);
    setItems([]);
    setSelectedId(null);
    setHistory([]);
    setFuture([]);
    setPage(1);
  }, [initialFile]);

  useEffect(() => {
    if (!blank || initialFile) return;

    let cancelled = false;

    async function createBlankPdf() {
      try {
        setError("");
        setIsRendering(true);

        const pdf = await PDFDocument.create();
        pdf.addPage([595, 842]);

        const bytes = await pdf.save();

        if (cancelled) return;

        const safeBuffer = toSafeArrayBuffer(bytes);

        const blob = new Blob([safeBuffer], {
          type: "application/pdf",
        });

        const blankFile = new File(
          [blob],
          "blank-document.pdf",
          { type: "application/pdf" },
        );

        setFile(blankFile);
        setItems([]);
        setSelectedId(null);
        setHistory([]);
        setFuture([]);
        setPage(1);
      } catch (blankError) {
        console.error(blankError);
        if (!cancelled) {
          setError("Could not create a blank PDF document.");
        }
      } finally {
        if (!cancelled) setIsRendering(false);
      }
    }

    void createBlankPdf();

    return () => {
      cancelled = true;
    };
  }, [blank, initialFile]);

  const currentItems = useMemo(() => items.filter((item) => item.page === page), [items, page]);
  const selectedItem = items.find((item) => item.id === selectedId) || null;

  function commit(next: EditorItem[]) {
    setHistory((current) => [...current, items]);
    setFuture([]);
    setItems(next);
  }

  function undo() {
    const previous = history[history.length - 1];
    if (!previous) return;
    setFuture((current) => [items, ...current]);
    setItems(previous);
    setHistory((current) => current.slice(0, -1));
    setSelectedId(null);
  }

  function redo() {
    const next = future[0];
    if (!next) return;
    setHistory((current) => [...current, items]);
    setItems(next);
    setFuture((current) => current.slice(1));
    setSelectedId(null);
  }

useEffect(() => {
  const sourceFile: File | null = file;

  if (sourceFile === null) {
    return;
  }

  let cancelled = false;

  async function loadPdf(pdfFile: File) {
    try {
      setError("");
      setIsRendering(true);

      const pdfjs = await import("pdfjs-dist");

      pdfjs.GlobalWorkerOptions.workerSrc =
        "https://unpkg.com/pdfjs-dist@" +
        pdfjs.version +
        "/build/pdf.worker.min.mjs";

      const data =
        await pdfFile.arrayBuffer();

      const pdf =
        await pdfjs.getDocument({
          data,
        }).promise;

      if (cancelled) {
        return;
      }

      pdfRef.current = pdf;

      setPageCount(
        pdf.numPages,
      );

      setPage(1);
    } catch (loadError) {
      console.error(
        "PDF loading error:",
        loadError,
      );

      setError(
        "Could not open this PDF. Please choose a valid PDF file.",
      );
    } finally {
      if (!cancelled) {
        setIsRendering(false);
      }
    }
  }

  void loadPdf(sourceFile);

  return () => {
    cancelled = true;
  };
}, [file]);

  useEffect(() => {
    if (!pdfRef.current || !canvasRef.current || !stageRef.current || !pageCount) return;

    let cancelled = false;

    async function renderPage() {
      try {
        setIsRendering(true);
        const pdfPage = await pdfRef.current.getPage(page);
        const baseViewport = pdfPage.getViewport({ scale: 1 });
        const scale = zoom;
        const viewport = pdfPage.getViewport({ scale });
        const canvas = canvasRef.current!;
        const context = canvas.getContext("2d");
        if (!context) return;
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        setPageSize({ width: baseViewport.width, height: baseViewport.height });
        await pdfPage.render({ canvasContext: context, viewport }).promise;
      } catch (renderError) {
        console.error(renderError);
        if (!cancelled) setError("Could not render this PDF page.");
      } finally {
        if (!cancelled) setIsRendering(false);
      }
    }

    renderPage();
    return () => {
      cancelled = true;
    };
  }, [page, pageCount, zoom]);

  function getPoint(event: React.PointerEvent<HTMLDivElement>) {
    const stage = stageRef.current;
    if (!stage) return null;
    const rect = stage.getBoundingClientRect();
    return {
      x: Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)),
      y: Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height)),
    };
  }

  function handleStagePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    const point = getPoint(event);
    if (!point) return;

    if (tool === "select") {
      setSelectedId(null);
      return;
    }

    if (tool === "text") {
      const next: EditorItem = {
        id: makeId(),
        page,
        type: "text",
        x: point.x,
        y: point.y,
        width: 0.28,
        height: 0.055,
        text: "Type here",
      };
      commit([...items, next]);
      setSelectedId(next.id);
      setTextValue("Type here");
      setTool("select");
      return;
    }

    if (tool === "image") {
      imageInputRef.current?.click();
      return;
    }

    if (tool === "draw") {
      event.currentTarget.setPointerCapture(event.pointerId);
      setIsDrawing(true);
      setDrawPoints([point]);
      return;
    }

    const next: EditorItem = {
      id: makeId(),
      page,
      type: tool,
      x: point.x,
      y: point.y,
      width: 0.18,
      height: 0.08,
    };
    commit([...items, next]);
    setSelectedId(next.id);
    setTool("select");
  }

  function handleStagePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDrawing) return;
    const point = getPoint(event);
    if (point) setDrawPoints((current) => [...current, point]);
  }

  function handleStagePointerUp() {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (drawPoints.length < 2) {
      setDrawPoints([]);
      return;
    }
    const xs = drawPoints.map((p) => p.x);
    const ys = drawPoints.map((p) => p.y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);
    const width = Math.max(0.002, maxX - minX);
    const height = Math.max(0.002, maxY - minY);
    const normalizedPoints = drawPoints.map((p) => ({
      x: (p.x - minX) / width,
      y: (p.y - minY) / height,
    }));
    const next: EditorItem = {
      id: makeId(),
      page,
      type: "draw",
      x: minX,
      y: minY,
      width,
      height,
      points: normalizedPoints,
    };
    commit([...items, next]);
    setSelectedId(next.id);
    setDrawPoints([]);
    setTool("select");
  }

  function moveSelected(dx: number, dy: number) {
    if (!selectedId) return;
    commit(items.map((item) => item.id === selectedId ? { ...item, x: Math.min(1 - item.width, Math.max(0, item.x + dx)), y: Math.min(1 - item.height, Math.max(0, item.y + dy)) } : item));
  }

  function updateSelectedText(value: string) {
    setTextValue(value);
    setItems((current) => current.map((item) => item.id === selectedId ? { ...item, text: value } : item));
  }

  function deleteSelected() {
    if (!selectedId) return;
    commit(items.filter((item) => item.id !== selectedId));
    setSelectedId(null);
  }

  async function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    const image = event.target.files?.[0];
    event.target.value = "";
    if (!image) return;
    if (!image.type.startsWith("image/")) {
      setError("Please select a PNG, JPG, or WebP image.");
      return;
    }
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(image);
    });
    const next: EditorItem = {
      id: makeId(),
      page,
      type: "image",
      x: 0.1,
      y: 0.1,
      width: 0.28,
      height: 0.18,
      imageDataUrl: dataUrl,
    };
    commit([...items, next]);
    setSelectedId(next.id);
    setTool("select");
  }

  async function downloadEditedPdf() {
    const sourceFile = file;

    if (!sourceFile) {
      setError("Upload a PDF first.");
      return;
    }

    try {
      setError("");

      const pdf = await PDFDocument.load(
        await sourceFile.arrayBuffer(),
      );

      const font = await pdf.embedFont(
        StandardFonts.Helvetica,
      );

      for (const item of items) {
        const pdfPage = pdf.getPage(
          item.page - 1,
        );

        if (!pdfPage) {
          continue;
        }

        const { width, height } =
          pdfPage.getSize();

        const x = item.x * width;
        const y =
          height -
          item.y * height -
          item.height * height;
        const w = item.width * width;
        const h = item.height * height;

        if (item.type === "text") {
          pdfPage.drawText(
            item.text || "",
            {
              x,
              y: Math.max(0, y),
              size: Math.max(
                8,
                Math.min(
                  48,
                  18 * (width / 612),
                ),
              ),
              font,
              color: rgb(
                0.05,
                0.05,
                0.08,
              ),
            },
          );
        } else if (
          item.type === "whiteout"
        ) {
          pdfPage.drawRectangle({
            x,
            y: Math.max(0, y),
            width: w,
            height: h,
            color: rgb(1, 1, 1),
          });
        } else if (
          item.type === "highlight"
        ) {
          pdfPage.drawRectangle({
            x,
            y: Math.max(0, y),
            width: w,
            height: h,
            color: rgb(
              1,
              0.85,
              0.1,
            ),
            opacity: 0.35,
          });
        } else if (
          item.type === "rectangle"
        ) {
          pdfPage.drawRectangle({
            x,
            y: Math.max(0, y),
            width: w,
            height: h,
            borderColor: rgb(
              0.45,
              0.2,
              0.95,
            ),
            borderWidth: 2,
            opacity: 1,
          });
        } else if (
          item.type === "draw" &&
          item.points?.length
        ) {
          for (
            let index = 1;
            index < item.points.length;
            index += 1
          ) {
            const from =
              item.points[index - 1];
            const to =
              item.points[index];

            pdfPage.drawLine({
              start: {
                x:
                  item.x * width +
                  from.x * w,
                y:
                  height -
                  item.y * height -
                  from.y * h,
              },
              end: {
                x:
                  item.x * width +
                  to.x * w,
                y:
                  height -
                  item.y * height -
                  to.y * h,
              },
              thickness: Math.max(
                1.5,
                width / 400,
              ),
              color: rgb(
                0.2,
                0.1,
                0.7,
              ),
            });
          }
        } else if (
          item.type === "image" &&
          item.imageDataUrl
        ) {
          const imageBytes =
            dataUrlToBytes(
              item.imageDataUrl,
            );

          const embedded =
            item.imageDataUrl.startsWith(
              "data:image/png",
            )
              ? await pdf.embedPng(
                  imageBytes,
                )
              : await pdf.embedJpg(
                  imageBytes,
                );

          pdfPage.drawImage(
            embedded,
            {
              x,
              y: Math.max(0, y),
              width: w,
              height: h,
            },
          );
        }
      }

      const bytes = await pdf.save();
      const safeBuffer =
        toSafeArrayBuffer(bytes);

      const blob = new Blob(
        [safeBuffer],
        {
          type: "application/pdf",
        },
      );

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;
      link.download =
        `${sourceFile.name.replace(
          /\.pdf$/i,
          "",
        )}-edited.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch (downloadError) {
      console.error(
        "PDF download error:",
        downloadError,
      );

      setError(
        "Could not create the edited PDF. Please try again.",
      );
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl shadow-black/20">
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 p-3">
        <button type="button" onClick={onBack} className="mr-2 inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        {toolButtons.map((button) => (
          <button
            key={button.id}
            type="button"
            onClick={() => setTool(button.id)}
            className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${tool === button.id ? "bg-violet-600 text-white" : "border border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/10"}`}
          >
            {button.icon}
            <span className="hidden sm:inline">{button.label}</span>
          </button>
        ))}

        <div className="ml-auto flex items-center gap-2">
          <button type="button" onClick={undo} disabled={!history.length} className="rounded-xl border border-white/10 p-2 text-slate-300 disabled:opacity-30"><Undo2 className="h-4 w-4" /></button>
          <button type="button" onClick={redo} disabled={!future.length} className="rounded-xl border border-white/10 p-2 text-slate-300 disabled:opacity-30"><Redo2 className="h-4 w-4" /></button>
          <button type="button" onClick={() => setZoom((value) => Math.max(0.55, Number((value - 0.1).toFixed(2))))} className="rounded-xl border border-white/10 p-2 text-slate-300"><ZoomOut className="h-4 w-4" /></button>
          <span className="min-w-12 text-center text-xs text-slate-400">{Math.round(zoom * 100)}%</span>
          <button type="button" onClick={() => setZoom((value) => Math.min(2, Number((value + 0.1).toFixed(2))))} className="rounded-xl border border-white/10 p-2 text-slate-300"><ZoomIn className="h-4 w-4" /></button>
          <button type="button" onClick={downloadEditedPdf} disabled={!file} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-3 py-2 text-sm font-semibold text-white disabled:opacity-40"><Download className="h-4 w-4" /> <span className="hidden sm:inline">Download</span></button>
        </div>
      </div>

      {!file ? (
        <label className="m-6 flex min-h-[360px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center hover:border-violet-500/50">
          <UploadIcon />
          <span className="mt-4 text-lg font-semibold text-white">Upload PDF to start editing</span>
          <span className="mt-2 text-sm text-slate-500">Add text, images, drawing, highlights, shapes, and whiteout areas.</span>
          <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={(event) => setFile(event.target.files?.[0] || null)} />
        </label>
      ) : (
        <>
          <div className="grid min-h-[650px] lg:grid-cols-[110px_minmax(0,1fr)_230px]">
            <aside className="border-b border-white/10 p-3 lg:border-b-0 lg:border-r">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Pages</div>
              <div className="flex gap-2 overflow-x-auto lg:max-h-[650px] lg:flex-col lg:overflow-y-auto">
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                  <button key={pageNumber} type="button" onClick={() => setPage(pageNumber)} className={`min-w-16 rounded-xl border p-2 text-xs font-semibold ${page === pageNumber ? "border-violet-500 bg-violet-500/15 text-white" : "border-white/10 bg-white/[0.02] text-slate-400 hover:bg-white/10"}`}>
                    Page {pageNumber}
                  </button>
                ))}
              </div>
            </aside>

            <main className="overflow-auto bg-black/20 p-4 sm:p-6">
              <div className="flex min-h-[580px] min-w-max items-start justify-center">
                <div
                  ref={stageRef}
                  className="relative overflow-hidden bg-white shadow-2xl"
                  style={{ width: canvasRef.current?.style.width || `${pageSize.width * zoom}px`, height: canvasRef.current?.style.height || `${pageSize.height * zoom}px` }}
                  onPointerDown={handleStagePointerDown}
                  onPointerMove={handleStagePointerMove}
                  onPointerUp={handleStagePointerUp}
                  onPointerCancel={handleStagePointerUp}
                >
                  <canvas ref={canvasRef} className="absolute inset-0 block" />

                  {currentItems.map((item) => (
                    <EditorOverlay key={item.id} item={item} selected={item.id === selectedId} onSelect={() => { setSelectedId(item.id); if (item.type === "text") setTextValue(item.text || ""); }} onDelete={() => { commit(items.filter((current) => current.id !== item.id)); setSelectedId(null); }} />
                  ))}

                  {isDrawing && drawPoints.length > 1 ? (
                    <svg className="pointer-events-none absolute inset-0 h-full w-full">
                      <polyline points={drawPoints.map((p) => `${p.x * 100}%,${p.y * 100}%`).join(" ")} fill="none" stroke="#5b21b6" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                    </svg>
                  ) : null}
                </div>
              </div>
            </main>

            <aside className="border-t border-white/10 bg-white/[0.02] p-4 lg:border-l lg:border-t-0">
              <h3 className="font-semibold text-white">Editor</h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">Select an object to adjust it or use the toolbar to add something to the PDF.</p>

              {selectedItem?.type === "text" ? (
                <div className="mt-5">
                  <label className="mb-2 block text-xs font-semibold text-slate-400">Text</label>
                  <textarea value={textValue} onChange={(event) => updateSelectedText(event.target.value)} onBlur={() => setHistory((current) => current)} rows={4} className="w-full rounded-xl border border-white/10 bg-slate-950 p-3 text-sm text-white outline-none focus:border-violet-500" />
                </div>
              ) : null}

              {selectedItem ? (
                <div className="mt-5 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Position</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => moveSelected(-0.01, 0)} className="rounded-lg border border-white/10 px-2 py-2 text-xs text-slate-300">←</button>
                    <button type="button" onClick={() => moveSelected(0.01, 0)} className="rounded-lg border border-white/10 px-2 py-2 text-xs text-slate-300">→</button>
                    <button type="button" onClick={() => moveSelected(0, -0.01)} className="rounded-lg border border-white/10 px-2 py-2 text-xs text-slate-300">↑</button>
                    <button type="button" onClick={() => moveSelected(0, 0.01)} className="rounded-lg border border-white/10 px-2 py-2 text-xs text-slate-300">↓</button>
                  </div>
                  <button type="button" onClick={deleteSelected} className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 px-3 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /> Delete</button>
                </div>
              ) : null}

              <input ref={imageInputRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleImage} />               
            </aside>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-white/10 p-3">
            <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page <= 1} className="rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 disabled:opacity-30">Previous</button>
            <span className="text-sm text-slate-500">Page {page} of {pageCount}{isRendering ? " · Rendering…" : ""}</span>
            <button type="button" onClick={() => setPage((value) => Math.min(pageCount, value + 1))} disabled={page >= pageCount} className="rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 disabled:opacity-30">Next</button>
          </div>
        </>
      )}

      {error ? <div className="m-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div> : null}
    </div>
  );
}

function UploadIcon() {
  return <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-white"><ImagePlus className="h-7 w-7" /></div>;
}

function EditorOverlay({ item, selected, onSelect, onDelete }: { item: EditorItem; selected: boolean; onSelect: () => void; onDelete: () => void }) {
  const style = { left: `${item.x * 100}%`, top: `${item.y * 100}%`, width: `${item.width * 100}%`, height: `${item.height * 100}%` };
  const border = selected ? "2px solid #7c3aed" : "1px solid transparent";

  if (item.type === "draw") {
    return (
      <svg className="pointer-events-auto absolute inset-0 h-full w-full" style={{ overflow: "visible" }} onPointerDown={(event) => { event.stopPropagation(); onSelect(); }}>
        <g transform={`translate(${item.x * 100}%,${item.y * 100}%) scale(${item.width * 100}%,${item.height * 100}%)`}>
          <polyline points={(item.points || []).map((p) => `${p.x * 100},${p.y * 100}`).join(" ")} fill="none" stroke="#4c1d95" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </g>
        {selected ? <rect x={`${item.x * 100}%`} y={`${item.y * 100}%`} width={`${item.width * 100}%`} height={`${item.height * 100}%`} fill="none" stroke="#7c3aed" strokeDasharray="5 4" /> : null}
      </svg>
    );
  }

  return (
    <div className="absolute" style={{ ...style, border, background: item.type === "whiteout" ? "white" : item.type === "highlight" ? "rgba(250,204,21,.35)" : item.type === "rectangle" ? "transparent" : "transparent" }} onPointerDown={(event) => { event.stopPropagation(); onSelect(); }}>
      {item.type === "text" ? <div className="h-full w-full overflow-hidden whitespace-pre-wrap break-words px-1 text-[clamp(10px,1.4vw,18px)] font-medium leading-tight text-slate-900">{item.text}</div> : null}
      {item.type === "image" && item.imageDataUrl ? <img src={item.imageDataUrl} alt="PDF overlay" className="h-full w-full object-contain" draggable={false} /> : null}
      {item.type === "rectangle" ? <div className="h-full w-full border-2 border-violet-700" /> : null}
      {selected ? <button type="button" onPointerDown={(event) => { event.stopPropagation(); onDelete(); }} className="absolute -right-3 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white shadow-lg"><Trash2 className="h-3 w-3" /></button> : null}
    </div>
  );
}
