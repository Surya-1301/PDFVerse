import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Download,
  Eraser,
  FilePlus2,
  Highlighter,
  ImagePlus,
  MousePointer2,
  PenLine,
  Redo2,
  RotateCw,
  Signature,
  Square,
  TextCursorInput,
  Trash2,
  Type,
  Undo2,
  Upload,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { buildPdf } from "@/lib/pdf/export";
import {
  extractLines,
  isExistingTextEdited,
  linesToTextItems,
} from "@/lib/pdf/textlayer";

import {
  LINE_HEIGHT,
  uid,
  type DocState,
  type Item,
  type ShapeKind,
  type ToolId,
} from "@/lib/pdf/types";
import { SignaturePad } from "./SignaturePad";
import { takePdfForEditor } from "@/lib/pdfEditorLaunch";


pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

type PageMeta = { base: { w: number; h: number }; intrinsic: number };

const TOOLS: { id: ToolId; label: string; icon: typeof Type }[] = [
  { id: "select", label: "Select", icon: MousePointer2 },
  { id: "edittext", label: "Edit text", icon: TextCursorInput },
  { id: "text", label: "Text", icon: Type },
  { id: "image", label: "Image", icon: ImagePlus },
  { id: "sign", label: "Sign", icon: Signature },
  { id: "highlight", label: "Highlight", icon: Highlighter },
  { id: "whiteout", label: "Whiteout", icon: Eraser },
  { id: "eraser", label: "Erase", icon: Trash2 },

  { id: "draw", label: "Draw", icon: PenLine },
  { id: "shape", label: "Shapes", icon: Square },
  { id: "link", label: "Link", icon: ArrowUpRight },
];

const SWATCHES = ["#101828", "#dc2626", "#2563eb", "#16a34a", "#facc15", "#ffffff"];

const STORE_PREFIX = "pdfedit:";

/** Stable id for a document: name + size + SHA-256 of its bytes. */
async function docKeyFor(buf: ArrayBuffer, name: string) {
  let hash = "";
  try {
    const d = await crypto.subtle.digest("SHA-256", buf.slice(0));
    hash = Array.from(new Uint8Array(d).slice(0, 12))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    hash = String(buf.byteLength);
  }
  return `${name}:${buf.byteLength}:${hash}`;
}

function loadSaved(key: string, pageCount: number): DocState | null {
  try {
    const raw = localStorage.getItem(STORE_PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DocState;
    if (!parsed?.pages?.length || !Array.isArray(parsed.items)) return null;
    // guard against a stale entry that no longer matches the file
    if (parsed.pages.some((p) => p.index >= pageCount)) return null;
    return parsed;
  } catch {
    return null;
  }
}


export default function PdfEditor() {
  const [fileName, setFileName] = useState("");
  const [docKey, setDocKey] = useState<string | null>(null);
  const [buffer, setBuffer] = useState<ArrayBuffer | null>(null);

  const [doc, setDoc] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [meta, setMeta] = useState<PageMeta[]>([]);
  const [state, setState] = useState<DocState>({ pages: [], items: [] });
  const [tool, setTool] = useState<ToolId>("edittext");
  const [shapeKind, setShapeKind] = useState<ShapeKind>("rect");
  const [color, setColor] = useState("#101828");
  const [fontSize, setFontSize] = useState(14);
  const [scale, setScale] = useState(1.2);
  const [selected, setSelected] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string | null>(null);
  const [signOpen, setSignOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useRef<{ past: DocState[]; future: DocState[] }>({
    past: [],
    future: [],
  });
  const imageInput = useRef<HTMLInputElement | null>(null);
  const pendingImagePage = useRef<number | null>(null);
  const scrollRef = useRef<HTMLElement | null>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [curPage, setCurPage] = useState(1);
  const [mobilePagesOpen, setMobilePagesOpen] = useState(false);
  /** pages already scanned for original text (including pages with none) */
  const [seedDone, setSeedDone] = useState<number[]>([]);


  const goToPage = useCallback((n: number) => {
    const el = pageRefs.current[n - 1];
    if (!el) return;
    setCurPage(n);
    setSelected(null);
    setEditingText(null);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const top = el.getBoundingClientRect().top;
      let idx = 0;
      pageRefs.current.forEach((p, i) => {
        if (p && p.getBoundingClientRect().top - top <= 80) idx = i;
      });
      setCurPage(idx + 1);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [doc]);



  const commit = useCallback((next: DocState | ((p: DocState) => DocState)) => {
    setState((prev) => {
      history.current.past.push(prev);
      if (history.current.past.length > 60) history.current.past.shift();
      history.current.future = [];
      return typeof next === "function" ? next(prev) : next;
    });
  }, []);

  const undo = () => {
    const prev = history.current.past.pop();
    if (!prev) return;
    setState((cur) => {
      history.current.future.push(cur);
      return prev;
    });
    setSelected(null);
  };
  const redo = () => {
    const next = history.current.future.pop();
    if (!next) return;
    setState((cur) => {
      history.current.past.push(cur);
      return next;
    });
  };

  const loadFile = async (file: File) => {
    setLoading(true);
    try {
      const buf = await file.arrayBuffer();
      const task = pdfjs.getDocument({ data: new Uint8Array(buf.slice(0)) });
      const pdf = await task.promise;
      const metas: PageMeta[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const p = await pdf.getPage(i);
        const v = p.getViewport({ scale: 1, rotation: 0 });
        metas.push({ base: { w: v.width, h: v.height }, intrinsic: p.rotate });
      }
      history.current = { past: [], future: [] };
      const key = await docKeyFor(buf, file.name);
      const saved = loadSaved(key, metas.length);
      setDocKey(key);
      setFileName(file.name);
      setBuffer(buf);
      setDoc(pdf);
      setMeta(metas);
      setState(
        saved ?? {
          pages: metas.map((_, i) => ({ index: i, rotation: 0 })),
          items: [],
        },
      );
      setSelected(null);
      setSeedDone([]);
      setTool("edittext");

    } finally {
      setLoading(false);
    }
  };

  // pick up a PDF chosen on the landing page
  useEffect(() => {
    const handed = takePdfForEditor();
    if (handed) void loadFile(handed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  // persist edits per document so they survive reopening the same PDF
  useEffect(() => {
    if (!docKey || !state.pages.length) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(STORE_PREFIX + docKey, JSON.stringify(state));
      } catch {
        /* quota or private mode */
      }
    }, 300);
    return () => clearTimeout(t);
  }, [docKey, state]);


  const pageDisplay = useCallback(
    (pageIndex: number, extra: number) => {
      const m = meta[pageIndex];
      if (!m) return { w: 595, h: 842, rot: 0 };
      const rot = (((m.intrinsic + extra) % 360) + 360) % 360;
      const swap = rot === 90 || rot === 270;
      return {
        w: swap ? m.base.h : m.base.w,
        h: swap ? m.base.w : m.base.h,
        rot,
      };
    },
    [meta],
  );

  const addItem = (item: Item) => {
    commit((p) => ({ ...p, items: [...p.items, item] }));
    setSelected(item.id);
  };
  const addItems = (items: Item[], selectId?: string) => {
    commit((p) => ({ ...p, items: [...p.items, ...items] }));
    if (selectId) setSelected(selectId);
  };

  /** pages whose original text has already been imported as editable objects */
  const seededPages = useMemo(
    () =>
      Array.from(
        new Set(
          state.items
            .filter((i) => i.type === "text" && i.source === "existing")
            .map((i) => i.page),
        ),
      ),
    [state.items],
  );

  /** import a page's original text runs (not undoable, it is not a user edit) */
  const seedPage = useCallback((pageIndex: number, imported: Item[]) => {
    setState((p) => {
      if (
        p.items.some((i) => i.type === "text" && i.source === "existing" && i.page === pageIndex)
      )
        return p;
      if (!imported.length) return { ...p, items: [...p.items] };
      return { ...p, items: [...imported, ...p.items] };
    });
    setSeedDone((s) => (s.includes(pageIndex) ? s : [...s, pageIndex]));
  }, []);


  const updateItem = (id: string, patch: Partial<Item>, record = true) => {
    const apply = (p: DocState) => ({
      ...p,
      items: p.items.map((i) => (i.id === id ? ({ ...i, ...patch } as Item) : i)),
    });
    record ? commit(apply) : setState(apply);
  };
  const removeItem = (id: string) => {
    commit((p) => ({ ...p, items: p.items.filter((i) => i.id !== id) }));
    setSelected(null);
  };

  const selectedItem = state.items.find((i) => i.id === selected) ?? null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "TEXTAREA" || t.tagName === "INPUT") return;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        e.shiftKey ? redo() : undo();
      }
      if ((e.key === "Delete" || e.key === "Backspace") && selected) {
        e.preventDefault();
        removeItem(selected);
      }
      if (e.key === "Escape") {
        setSelected(null);
        setEditingText(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const download = async () => {
    if (!buffer) return;
    setBusy(true);
    try {
      const bytes = await buildPdf(buffer.slice(0), state);
      const blob = new Blob([bytes as unknown as BlobPart], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName.replace(/\.pdf$/i, "") + "-edited.pdf";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    } finally {
      setBusy(false);
    }
  };

  const onPickImage = (file: File) => {
    const page = pendingImagePage.current ?? state.pages[0]?.index ?? 0;
    const reader = new FileReader();
    reader.onload = () => {
      const src = String(reader.result);
      const img = new Image();
      img.onload = () => {
        const maxW = 240;
        const w = Math.min(maxW, img.width);
        const h = (img.height / img.width) * w;
        addItem({
          id: uid(),
          type: "image",
          page,
          x: 60,
          y: 60,
          w,
          h,
          src,
        });
        setTool("select");
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  if (!doc) {
    return (
      <Dropzone
        loading={loading}
        onFile={loadFile}
        onBlank={async () => {
          const { createBlankPdfFile } = await import("@/lib/pdfEditorLaunch");
          await loadFile(await createBlankPdfFile());
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex h-[100dvh] w-screen flex-col overflow-hidden bg-[#09090b] text-white">
      {/* HEADER */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-[#111113] px-3">
        <div className="flex min-w-0 items-center gap-2">
          <Link
            to="/"
            title="Back to tools"
            aria-label="Back to tools"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="h-7 w-px bg-white/10" />
          <div className="min-w-0">
            <input
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="max-w-[230px] truncate bg-transparent text-sm font-semibold outline-none"
            />
            <div className="text-[10px] text-slate-500">
              {state.items.length} element{state.items.length === 1 ? "" : "s"} ·
              autosaved
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={undo}
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-slate-300 hover:bg-white/10 sm:flex"
            aria-label="Undo"
          >
            <Undo2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={redo}
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-slate-300 hover:bg-white/10 sm:flex"
            aria-label="Redo"
          >
            <Redo2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={download}
            disabled={busy}
            aria-label={busy ? "Exporting PDF" : "Download PDF"}
            title={busy ? "Exporting PDF" : "Download PDF"}
            className="
              flex h-9 shrink-0 items-center justify-center gap-2
              rounded-lg bg-violet-600 px-3
              text-xs font-semibold whitespace-nowrap
              transition hover:bg-violet-500
              disabled:cursor-not-allowed disabled:opacity-50
              sm:min-w-[132px]
            "
          >
            <Download className="h-4 w-4 shrink-0" />
            <span className="whitespace-nowrap">
              <span className="sm:hidden">
                {busy ? "Exporting" : "Download"}
              </span>
              <span className="hidden sm:inline">
                {busy ? "Exporting..." : "Download PDF"}
              </span>
            </span>
          </button>
        </div>
      </header>

      {/* TOOLBAR */}
      <div className="flex min-h-12 shrink-0 items-center justify-start gap-0.5 overflow-x-auto border-b border-white/10 bg-[#151517] px-1 sm:justify-center sm:gap-1 sm:px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TOOLS.map((t) => (

          <button
            key={t.id}
            title={t.label}
            onClick={() => {
              if (t.id === "sign") setSignOpen(true);
              if (t.id === "image") {
                pendingImagePage.current = state.pages[0]?.index ?? 0;
                imageInput.current?.click();
              }
              if (t.id === "highlight") setColor("#facc15");
              else if (t.id !== "select") setColor((c) => (c === "#facc15" ? "#101828" : c));
              setTool(t.id === "image" ? "select" : t.id);
              setSelected(null);
            }}
            className={`flex h-9 shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium transition sm:h-auto sm:gap-1.5 sm:px-2.5 ${
              tool === t.id
                ? "bg-violet-600 text-white"
                : "text-slate-300 hover:bg-white/10"
            }`}
          >
            <t.icon className="h-4 w-4" />
            <span className="hidden md:inline">{t.label}</span>
          </button>
        ))}

        <span className="mx-1 h-7 w-px shrink-0 bg-white/10 sm:mx-2" />

        <button
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-300 hover:bg-white/10"
          onClick={() => setScale((s) => Math.max(0.4, +(s - 0.1).toFixed(2)))}
          aria-label="Zoom out"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setScale(1)}
          className="min-w-12 shrink-0 rounded-lg px-2 py-1.5 text-xs text-slate-300 hover:bg-white/10"
        >
          {Math.round(scale * 100)}%
        </button>
        <button
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-300 hover:bg-white/10"
          onClick={() => setScale((s) => Math.min(3, +(s + 0.1).toFixed(2)))}
          aria-label="Zoom in"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
      </div>


      {/* context bar */}
      <div className="z-20 flex min-h-11 shrink-0 items-center gap-2 overflow-x-auto border-b border-white/10 bg-[#111113] px-2 py-1.5 text-xs text-slate-300 sm:px-4 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

        {selectedItem ? (
          <ItemProps
            item={selectedItem}
            onChange={(patch) => updateItem(selectedItem.id, patch)}
            onDelete={() => removeItem(selectedItem.id)}
          />
        ) : tool === "select" ? (
          <span className="text-slate-400">
            Pick a tool, then click or drag on the page. Click an element to edit it.
          </span>
        ) : tool === "edittext" ? (
          <span className="text-slate-400">
            <span className="font-medium text-white">Edit text</span> — hover a
            line of the original PDF text and click it to edit it in place.
          </span>
        ) : (
          <>
            <span className="shrink-0 font-medium capitalize">{tool} tool</span>
            {tool === "shape" && (

              <select
                value={shapeKind}
                onChange={(e) => setShapeKind(e.target.value as ShapeKind)}
                className="h-9 shrink-0 rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-white outline-none"
              >
                <option value="rect">Rectangle</option>
                <option value="ellipse">Ellipse</option>
                <option value="line">Line</option>
              </select>
            )}
            {tool === "text" && (
              <label className="flex items-center gap-1">
                Size
                <input
                  type="number"
                  min={6}
                  max={96}
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="h-9 w-16 shrink-0 rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-white outline-none"
                />
              </label>
            )}
            {tool !== "whiteout" && (
              <div className="flex items-center gap-1">
                {SWATCHES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    style={{ background: c }}
                    className={`h-5 w-5 rounded-full border ${color === c ? "ring-2 ring-violet-400 ring-offset-2 ring-offset-[#111113]" : ""}`}
                    aria-label={`Color ${c}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Mobile pages launcher */}
      <button
        type="button"
        onClick={() => setMobilePagesOpen(true)}
        className="
          fixed bottom-4 left-4 z-[90]
          flex h-11 items-center gap-2 rounded-full
          border border-white/15 bg-[#111113]/95 px-4
          text-sm font-semibold text-slate-200 shadow-xl
          backdrop-blur-md transition hover:bg-white/10
          lg:hidden
        "
        aria-label="Open pages"
      >
        <FilePlus2 size={17} />
        Pages
      </button>

      {/* Mobile pages drawer */}
      {mobilePagesOpen && (
        <div className="fixed inset-0 z-[120] lg:hidden">
          <button
            type="button"
            aria-label="Close pages"
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobilePagesOpen(false)}
          />

          <aside
            className="
              absolute left-0 top-0 flex h-full w-[min(86vw,320px)]
              flex-col border-r border-white/10 bg-[#111113]
              shadow-2xl
            "
          >
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-4">
              <div>
                <p className="text-sm font-semibold text-white">Pages</p>
                <p className="text-[11px] text-slate-500">
                  {state.pages.length} {state.pages.length === 1 ? "page" : "pages"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setMobilePagesOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-400 hover:bg-white/10 hover:text-white"
                aria-label="Close pages"
              >
                ×
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {state.pages.map((p, i) => {
                  const d = pageDisplay(p.index, p.rotation);
                  return (
                    <div key={`mobile-${p.index}-${i}`} className="group relative">
                      <button
                        type="button"
                        onClick={() => {
                          goToPage(i + 1);
                          setMobilePagesOpen(false);
                        }}
                        className={`relative mx-auto block overflow-hidden rounded border bg-white shadow-sm ${
                          curPage === i + 1
                            ? "border-violet-400 ring-2 ring-violet-400"
                            : "border-white/10"
                        }`}
                        style={{ width: 150, height: (150 * d.h) / d.w }}
                        aria-label={`Go to page ${i + 1}`}
                      >
                        {!p.blank && (
                          <Thumb doc={doc} index={p.index} rot={d.rot} width={150} />
                        )}
                        <span className="absolute bottom-1 right-1 rounded bg-black/65 px-1.5 py-0.5 text-[11px] text-slate-200">
                          {i + 1}
                        </span>
                      </button>

                      <div className="mt-2 flex justify-center gap-2">
                        <button
                          type="button"
                          className="rounded-lg border border-white/10 p-2 text-slate-300 hover:bg-white/10"
                          aria-label="Rotate page"
                          onClick={() =>
                            commit((s) => ({
                              ...s,
                              pages: s.pages.map((q, j) =>
                                j === i ? { ...q, rotation: q.rotation + 90 } : q,
                              ),
                            }))
                          }
                        >
                          <RotateCw size={15} />
                        </button>

                        <button
                          type="button"
                          className="rounded-lg border border-white/10 p-2 text-slate-300 hover:bg-white/10"
                          aria-label="Delete page"
                          onClick={() =>
                            commit((s) => ({
                              ...s,
                              pages: s.pages.filter((_, j) => j !== i),
                            }))
                          }
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                className="
                  mt-5 flex w-full items-center justify-center gap-2
                  rounded-xl border border-dashed border-violet-400/40
                  bg-violet-500/5 py-3 text-sm font-medium text-violet-300
                  transition hover:bg-violet-500/10
                "
                onClick={() => {
                  commit((s) => ({
                    ...s,
                    pages: [
                      ...s.pages,
                      {
                        index: -1 - s.pages.length,
                        rotation: 0,
                        blank: { width: 595, height: 842 },
                      },
                    ],
                  }));
                  setMobilePagesOpen(false);
                }}
              >
                <FilePlus2 size={16} />
                Add blank page
              </button>
            </div>
          </aside>
        </div>
      )}

      <div className="flex min-h-0 flex-1">
        {/* pages sidebar */}
        <aside className="hidden w-28 shrink-0 overflow-y-auto border-r border-white/10 bg-[#111113] p-2 lg:block">
          <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Pages
          </p>
          <div className="space-y-3">
            {state.pages.map((p, i) => {
              const d = pageDisplay(p.index, p.rotation);
              return (
                <div key={`${p.index}-${i}`} className="group relative">
                  <div
                    onClick={() => goToPage(i + 1)}
                    className={`relative mx-auto cursor-pointer overflow-hidden rounded border bg-white shadow-sm ${
                      curPage === i + 1
                        ? "border-violet-400 ring-2 ring-violet-400"
                        : "border-white/10"
                    }`}
                    style={{ width: 84, height: (84 * d.h) / d.w }}
                  >
                    {!p.blank && (
                      <Thumb doc={doc} index={p.index} rot={d.rot} width={84} />
                    )}
                    <span className="absolute bottom-0.5 right-1 rounded bg-black/60 px-1 text-[10px] text-slate-200">
                      {i + 1}
                    </span>
                  </div>

                  <div className="mt-1 flex justify-center gap-1 opacity-0 transition group-hover:opacity-100">
                    <button
                      className="rounded p-1 text-slate-300 hover:bg-white/10"
                      aria-label="Rotate page"
                      onClick={() =>
                        commit((s) => ({
                          ...s,
                          pages: s.pages.map((q, j) =>
                            j === i ? { ...q, rotation: q.rotation + 90 } : q,
                          ),
                        }))
                      }
                    >
                      <RotateCw size={13} />
                    </button>
                    <button
                      className="rounded p-1 text-slate-300 hover:bg-white/10"
                      aria-label="Delete page"
                      onClick={() =>
                        commit((s) => ({
                          ...s,
                          pages: s.pages.filter((_, j) => j !== i),
                        }))
                      }
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="mt-4 flex w-full items-center justify-center gap-1 rounded border border-dashed border-white/15 py-2 text-[11px] text-slate-400 hover:bg-white/10"
            onClick={() =>
              commit((s) => ({
                ...s,
                pages: [
                  ...s.pages,
                  {
                    index: -1 - s.pages.length,
                    rotation: 0,
                    blank: { width: 595, height: 842 },
                  },
                ],
              }))
            }
          >
            <FilePlus2 size={13} /> Blank page
          </button>
        </aside>

        {/* canvas */}
        <main
          ref={scrollRef}
          className="relative min-h-0 flex-1 overflow-auto bg-[#1c1c1f] p-6 sm:p-10"
        >
          <div className="mx-auto flex w-fit flex-col items-center gap-6">
            {state.pages.map((p, i) => (
              <div
                key={`${p.index}-${i}`}
                ref={(el) => {
                  pageRefs.current[i] = el;
                }}
              >
                <PageView
                  doc={doc}
                  pageState={p}
                  display={pageDisplay(p.index, p.rotation)}
                  blank={p.blank}
                  scale={scale}
                  number={i + 1}
                  total={state.pages.length}
                  tool={tool}
                  shapeKind={shapeKind}
                  color={color}
                  fontSize={fontSize}
                  items={state.items.filter((it) => it.page === p.index)}
                  selected={selected}
                  editingText={editingText}
                  setSelected={setSelected}
                  setEditingText={setEditingText}
                  addItem={addItem}
                  addItems={addItems}
                  hasSeed={
                    seededPages.includes(p.index) || seedDone.includes(p.index)
                  }

                  seedPage={seedPage}
                  updateItem={updateItem}
                  removeItem={removeItem}
                  requestImage={() => {
                    pendingImagePage.current = p.index;
                    imageInput.current?.click();
                  }}
                  setTool={setTool}
                />

              </div>
            ))}
          </div>

        </main>

        {/* PROPERTIES */}
        <aside className="hidden w-72 shrink-0 overflow-y-auto border-l border-white/10 bg-[#111113] md:block">
          <div className="border-b border-white/10 p-4">
            <h2 className="text-sm font-semibold">Properties</h2>
          </div>

          {selectedItem ? (
            <div className="flex flex-col gap-3 p-4 text-xs text-slate-300 [&_select]:w-full [&_input[type=number]]:w-full">
              <ItemProps
                item={selectedItem}
                vertical
                onChange={(patch) => updateItem(selectedItem.id, patch)}
                onDelete={() => removeItem(selectedItem.id)}
              />
            </div>
          ) : null}
        </aside>
      </div>

      <input
        ref={imageInput}
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onPickImage(f);
          e.target.value = "";
        }}
      />

      {signOpen && (
        <SignaturePad
          onClose={() => {
            setSignOpen(false);
            setTool("select");
          }}
          onDone={(src, ratio) => {
            const page = state.pages[0]?.index ?? 0;
            addItem({
              id: uid(),
              type: "image",
              page,
              x: 70,
              y: 90,
              w: 200,
              h: 200 * ratio,
              src,
              signature: true,
            });
            setSignOpen(false);
            setTool("select");
          }}
        />
      )}
    </div>
  );
}

/* ---------------- dropzone ---------------- */

function Dropzone({
  onFile,
  onBlank,
  loading,
}: {
  onFile: (f: File) => void;
  onBlank: () => void;
  loading: boolean;
}) {
  const input = useRef<HTMLInputElement | null>(null);
  const [over, setOver] = useState(false);
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-950 px-4 pb-16 pt-6 text-white sm:px-6 sm:pt-8">
      {/* Background glow — matches the other PDFVerse tools */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-72 w-72 rounded-full bg-violet-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-fuchsia-600/10 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <Link
          to="/"
          className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to tools
        </Link>
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] shadow-2xl shadow-violet-950/20">

          {/* Editor header */}
          <div className="relative flex items-center justify-between border-b border-white/[0.07] px-7 py-5 sm:px-10">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
                <ImagePlus className="h-6 w-6 text-violet-300" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">PDF Editor</h2>
                <p className="mt-0.5 text-sm text-slate-500">
                  Professional PDF editing workspace
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2 text-xs font-medium text-slate-400 sm:flex">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Ready
              </div>
            </div>

          </div>

          {/* Main landing area */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setOver(true);
            }}
            onDragLeave={() => setOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setOver(false);
              const f = e.dataTransfer.files?.[0];
              if (f) onFile(f);
            }}
            className={`relative px-6 py-14 transition sm:px-12 sm:py-16 lg:px-16 lg:py-20 ${
              over ? "bg-violet-500/[0.06]" : ""
            }`}
          >
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mt-7 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Live PDF Editor
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                Edit PDF text, scanned documents, images, highlights and
                signatures directly in your browser.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-slate-500">
                {[
                  "Edit existing text",
                  "OCR scanned PDFs",
                  "Add images",
                  "Sign documents",
                ].map((c) => (
                  <span key={c} className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-violet-400" />
                    {c}
                  </span>
                ))}
              </div>

              <div className="mt-10">
                <button
                  type="button"
                  onClick={() => input.current?.click()}
                  disabled={loading}
                  className="inline-flex h-14 min-w-[220px] items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 text-base font-semibold text-white shadow-[0_15px_40px_rgba(124,58,237,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(124,58,237,0.38)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Upload className="h-5 w-5" />
                  {loading ? "Opening PDF..." : "Upload PDF File"}
                </button>
                <button
                  type="button"
                  onClick={onBlank}
                  disabled={loading}
                  className="mx-auto mt-4 flex items-center justify-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white disabled:opacity-50"
                >
                  <FilePlus2 className="h-4 w-4" />
                  or start with a blank document
                </button>
              </div>

              {loading && (
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
                  Opening PDF...
                </div>
              )}
            </div>
          </div>

          {/* Capabilities footer */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/5 bg-black/10 px-5 py-5 text-xs text-slate-500 sm:text-sm">
            <span className="transition hover:text-slate-300">✓ Edit existing text</span>
            <span className="transition hover:text-slate-300">✓ Add text &amp; images</span>
            <span className="transition hover:text-slate-300">✓ Sign &amp; annotate</span>
            <span className="transition hover:text-slate-300">✓ Download edited PDF</span>
          </div>
        </div>
      </div>

      <input
        ref={input}
        type="file"
        accept="application/pdf,.pdf"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          e.currentTarget.value = "";
          if (f) onFile(f);
        }}
      />
    </section>
  );
}


/* ---------------- properties bar ---------------- */

function ItemProps({
  item,
  vertical = false,
  onChange,
  onDelete,
}: {
  item: Item;
  vertical?: boolean;
  onChange: (p: Partial<Item>) => void;
  onDelete: () => void;
}) {
  if (vertical) {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            Type
          </span>
          <div className="flex h-10 items-center rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm font-medium capitalize text-slate-200">
            {item.type}
          </div>
        </div>

        {item.type === "text" && (
          <>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                Font
              </label>
              <select
                value={item.font}
                onChange={(e) => onChange({ font: e.target.value } as Partial<Item>)}
                className="h-10 w-full rounded-lg border border-white/15 bg-white/5 px-3 text-sm text-white outline-none transition focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30"
              >
                <option>Helvetica</option>
                <option>Times</option>
                <option>Courier</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                Font Size
              </label>
              <input
                type="number"
                min={6}
                max={96}
                value={item.size}
                onChange={(e) => onChange({ size: Number(e.target.value) } as Partial<Item>)}
                className="h-10 w-full rounded-lg border border-white/15 bg-white/5 px-3 text-sm text-white outline-none transition focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                Style
              </span>
              <div className="grid grid-cols-4 gap-2">
                <button
                  type="button"
                  aria-label="Bold"
                  title="Bold"
                  className={`flex h-10 items-center justify-center rounded-lg border border-white/15 text-sm font-bold transition ${
                    item.bold
                      ? "bg-violet-600 text-white"
                      : "bg-white/[0.03] text-slate-300 hover:bg-white/10"
                  }`}
                  onClick={() => onChange({ bold: !item.bold } as Partial<Item>)}
                >
                  B
                </button>
                <button
                  type="button"
                  aria-label="Italic"
                  title="Italic"
                  className={`flex h-10 items-center justify-center rounded-lg border border-white/15 text-sm italic transition ${
                    item.italic
                      ? "bg-violet-600 text-white"
                      : "bg-white/[0.03] text-slate-300 hover:bg-white/10"
                  }`}
                  onClick={() => onChange({ italic: !item.italic } as Partial<Item>)}
                >
                  I
                </button>
                <button
                  type="button"
                  aria-label="Underline"
                  title="Underline"
                  className={`flex h-10 items-center justify-center rounded-lg border border-white/15 text-sm underline transition ${
                    item.underline
                      ? "bg-violet-600 text-white"
                      : "bg-white/[0.03] text-slate-300 hover:bg-white/10"
                  }`}
                  onClick={() => onChange({ underline: !item.underline } as Partial<Item>)}
                >
                  U
                </button>
                <button
                  type="button"
                  aria-label="Strikethrough"
                  title="Strikethrough"
                  className={`flex h-10 items-center justify-center rounded-lg border border-white/15 text-sm line-through transition ${
                    item.strike
                      ? "bg-violet-600 text-white"
                      : "bg-white/[0.03] text-slate-300 hover:bg-white/10"
                  }`}
                  onClick={() => onChange({ strike: !item.strike } as Partial<Item>)}
                >
                  S
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                Alignment
              </label>
              <select
                value={item.align}
                onChange={(e) => onChange({ align: e.target.value } as Partial<Item>)}
                className="h-10 w-full rounded-lg border border-white/15 bg-white/5 px-3 text-sm text-white outline-none transition focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </>
        )}

        {item.type === "link" && (
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
              URL
            </label>
            <input
              value={item.url}
              placeholder="https://example.com"
              onChange={(e) => onChange({ url: e.target.value } as Partial<Item>)}
              className="h-10 w-full rounded-lg border border-white/15 bg-white/5 px-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30"
            />
          </div>
        )}

        {"color" in item && (
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
              Color
            </span>
            <div className="grid grid-cols-6 gap-2">
              {SWATCHES.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => onChange({ color: c } as Partial<Item>)}
                  style={{ background: c }}
                  className={`h-8 w-8 rounded-full border border-white/20 transition ${
                    item.color === c
                      ? "ring-2 ring-violet-400 ring-offset-2 ring-offset-[#111113]"
                      : "hover:scale-105"
                  }`}
                  aria-label={`Color ${c}`}
                />
              ))}
            </div>
          </div>
        )}

        {item.type === "shape" && (
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
              Stroke
            </span>
            <div className="grid grid-cols-6 gap-2">
              {SWATCHES.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => onChange({ stroke: c } as Partial<Item>)}
                  style={{ background: c }}
                  className={`h-8 w-8 rounded-full border border-white/20 transition ${
                    item.stroke === c
                      ? "ring-2 ring-violet-400 ring-offset-2 ring-offset-[#111113]"
                      : "hover:scale-105"
                  }`}
                  aria-label={`Stroke ${c}`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="my-1 border-t border-white/10" />

        <button
          type="button"
          onClick={onDelete}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-red-500/40 px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
        >
          <Trash2 size={14} /> Delete {item.type}
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-w-max shrink-0 items-center gap-2">
      <span className="shrink-0 font-medium capitalize">{item.type}</span>
      {item.type === "text" && (
        <>
          <select
            value={item.font}
            onChange={(e) => onChange({ font: e.target.value } as Partial<Item>)}
            className="h-9 shrink-0 rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-white outline-none"
          >
            <option>Helvetica</option>
            <option>Times</option>
            <option>Courier</option>
          </select>
          <input
            type="number"
            min={6}
            max={96}
            value={item.size}
            onChange={(e) => onChange({ size: Number(e.target.value) } as Partial<Item>)}
            className="h-9 w-16 shrink-0 rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-white outline-none"
          />
          <button
            type="button"
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 px-2 py-1 font-bold ${
              item.bold ? "bg-violet-600 text-white" : "text-slate-300"
            }`}
            onClick={() => onChange({ bold: !item.bold } as Partial<Item>)}
          >
            B
          </button>
          <button
            type="button"
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 px-2 py-1 italic ${
              item.italic ? "bg-violet-600 text-white" : "text-slate-300"
            }`}
            onClick={() => onChange({ italic: !item.italic } as Partial<Item>)}
          >
            I
          </button>
          <button
            type="button"
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 px-2 py-1 underline ${
              item.underline ? "bg-violet-600 text-white" : "text-slate-300"
            }`}
            onClick={() => onChange({ underline: !item.underline } as Partial<Item>)}
            title="Underline"
          >
            U
          </button>
          <button
            type="button"
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 px-2 py-1 line-through ${
              item.strike ? "bg-violet-600 text-white" : "text-slate-300"
            }`}
            onClick={() => onChange({ strike: !item.strike } as Partial<Item>)}
            title="Strikethrough"
          >
            S
          </button>
          <select
            value={item.align}
            onChange={(e) => onChange({ align: e.target.value } as Partial<Item>)}
            className="h-9 shrink-0 rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-white outline-none"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </>
      )}
      {item.type === "link" && (
        <input
          value={item.url}
          placeholder="https://example.com"
          onChange={(e) => onChange({ url: e.target.value } as Partial<Item>)}
          className="w-64 rounded border border-white/15 bg-white/5 px-2 py-1 text-white outline-none"
        />
      )}
      {"color" in item && (
        <div className="flex shrink-0 items-center gap-2">
          {SWATCHES.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => onChange({ color: c } as Partial<Item>)}
              style={{ background: c }}
              className="h-7 w-7 shrink-0 rounded-full border border-white/20"
              aria-label={`Color ${c}`}
            />
          ))}
        </div>
      )}
      {item.type === "shape" && (
        <div className="flex shrink-0 items-center gap-2">
          {SWATCHES.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => onChange({ stroke: c } as Partial<Item>)}
              style={{ background: c }}
              className="h-7 w-7 shrink-0 rounded-full border border-white/20"
              aria-label={`Stroke ${c}`}
            />
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={onDelete}
        className="ml-1 inline-flex h-9 shrink-0 items-center gap-1 rounded-lg border border-red-500/40 px-3 py-1 text-red-400 hover:bg-red-500/10"
      >
        <Trash2 size={13} /> Delete
      </button>
    </div>
  );
}

/* ---------------- page ---------------- */

interface PageViewProps {
  doc: pdfjs.PDFDocumentProxy;
  pageState: { index: number; rotation: number };
  display: { w: number; h: number; rot: number };
  blank?: { width: number; height: number } | undefined;
  scale: number;
  number: number;
  total: number;
  tool: ToolId;
  shapeKind: ShapeKind;
  color: string;
  fontSize: number;
  items: Item[];
  selected: string | null;
  editingText: string | null;
  setSelected: (id: string | null) => void;
  setEditingText: (id: string | null) => void;
  addItem: (i: Item) => void;
  addItems: (items: Item[], selectId?: string) => void;
  /** true when this page's original text has already been imported */
  hasSeed: boolean;
  seedPage: (pageIndex: number, items: Item[]) => void;
  updateItem: (id: string, patch: Partial<Item>, record?: boolean) => void;
  removeItem: (id: string) => void;
  requestImage: () => void;
  setTool: (t: ToolId) => void;
}

function PageView(props: PageViewProps) {
  const {
    doc,
    pageState,
    display,
    blank,
    scale,
    number,
    total,
    tool,
    shapeKind,
    color,
    fontSize,
    items,
    selected,
    editingText,
    setSelected,
    setEditingText,
    addItem,
    hasSeed,
    seedPage,
    updateItem,
    removeItem,
  } = props;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [hoverActive, setHoverActive] = useState(true);
  const [hoveredTextId, setHoveredTextId] = useState<string | null>(null);

  // switching tools re-enables the hover outlines
  useEffect(() => {
    setHoverActive(true);
  }, [tool]);

  // Turn every run of original PDF text on this page into an editable object.
  useEffect(() => {
    if (blank || hasSeed) return;
    let cancelled = false;
    extractLines(doc, pageState.index, display.rot)
      .then((l) => {
        if (!cancelled) seedPage(pageState.index, linesToTextItems(l, pageState.index));
      })
      .catch(() => {
        if (!cancelled) seedPage(pageState.index, []);
      });
    return () => {
      cancelled = true;
    };
  }, [blank, hasSeed, doc, pageState.index, display.rot, seedPage]);

  /** Eraser: original text is emptied (so export whites it out), extras are removed. */
  const eraseItem = (item: Item) => {
    if (item.type === "text" && item.source === "existing") {
      if (!item.text) return;
      updateItem(item.id, { text: "" } as Partial<Item>);
      return;
    }
    removeItem(item.id);
  };




  type Draft = {
    x: number;
    y: number;
    w: number;
    h: number;
    pts?: { x: number; y: number }[];
  };
  const [draft, setDraft] = useState<Draft | null>(null);
  const draftRef = useRef<Draft | null>(null);
  const setDraftBoth = (d: Draft | null) => {
    draftRef.current = d;
    setDraft(d);
  };

  const width = display.w * scale;
  const height = display.h * scale;

  useEffect(() => {
    if (blank) return;
    let cancelled = false;
    let task: pdfjs.RenderTask | null = null;
    (async () => {
      const page = await doc.getPage(pageState.index + 1);
      if (cancelled) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const viewport = page.getViewport({
        scale: scale * dpr,
        rotation: display.rot,
      });
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      task = page.render({ canvasContext: ctx, viewport, canvas } as never);
      try {
        await task.promise;
      } catch {
        /* cancelled */
      }
    })();
    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [doc, pageState.index, scale, display.rot, blank]);

  const toPoint = (e: React.PointerEvent | React.MouseEvent) => {
    const r = overlayRef.current!.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) / scale,
      y: (e.clientY - r.top) / scale,
    };
  };

  const startCreate = (e: React.PointerEvent) => {
    if (tool === "select" || tool === "sign" || tool === "image" || tool === "eraser")
      return;

    // edittext: clicking an empty area hides the hover outlines; they return on cursor move
    if (tool === "edittext") {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-pdf-text-item]")) {
        setSelected(null);
        setEditingText(null);
      }
      setHoverActive(true);
      return;
    }

    if ((e.target as HTMLElement).dataset["item"]) return;

    e.preventDefault();
    const start = toPoint(e);
    const overlay = overlayRef.current!;
    overlay.setPointerCapture(e.pointerId);

    if (tool === "text") {
      const item: Item = {
        id: uid(),
        type: "text",
        page: pageState.index,
        x: start.x,
        y: start.y,
        w: 220,
        h: fontSize * LINE_HEIGHT,
        text: "",
        size: fontSize,
        color,
        font: "Helvetica",
        bold: false,
        italic: false,
        align: "left",
      };
      addItem(item);
      setEditingText(item.id);
      return;
    }

    const pts: { x: number; y: number }[] = [{ x: 0, y: 0 }];
    setDraftBoth({ x: start.x, y: start.y, w: 0, h: 0, pts });

    const move = (ev: PointerEvent) => {
      const r = overlay.getBoundingClientRect();
      const cx = (ev.clientX - r.left) / scale;
      const cy = (ev.clientY - r.top) / scale;
      if (tool === "draw") {
        pts.push({ x: cx - start.x, y: cy - start.y });
        setDraftBoth({ x: start.x, y: start.y, w: 0, h: 0, pts: [...pts] });
      } else {
        setDraftBoth({
          x: Math.min(start.x, cx),
          y: Math.min(start.y, cy),
          w: Math.abs(cx - start.x),
          h: Math.abs(cy - start.y),
          pts: [
            { x: 0, y: 0 },
            { x: cx - start.x, y: cy - start.y },
          ],
        });
      }
    };
    const up = () => {
      overlay.removeEventListener("pointermove", move);
      overlay.removeEventListener("pointerup", up);
      const d = draftRef.current;
      setDraftBoth(null);
      if (!d) return;
      const base = { id: uid(), page: pageState.index };
      if (tool === "draw") {
        if (pts.length > 2) {
          const xs = pts.map((q) => q.x);
          const ys = pts.map((q) => q.y);
          addItem({
            ...base,
            type: "draw",
            x: d.x,
            y: d.y,
            w: Math.max(...xs) - Math.min(...xs),
            h: Math.max(...ys) - Math.min(...ys),
            points: pts,
            color,
            strokeWidth: 2,
          });
        }
        return;
      }
      if (tool === "shape" && shapeKind === "line") {
        addItem({
          ...base,
          type: "shape",
          x: d.x,
          y: d.y,
          w: d.w,
          h: d.h,
          kind: "line",
          stroke: color,
          fill: null,
          strokeWidth: 2,
        });
        return;
      }
      if (d.w < 5 || d.h < 5) return;
      if (tool === "highlight" || tool === "whiteout") {
        addItem({
          ...base,
          type: tool,
          x: d.x,
          y: d.y,
          w: d.w,
          h: d.h,
          color: tool === "whiteout" ? "#ffffff" : color,
        });
      } else if (tool === "shape") {
        addItem({
          ...base,
          type: "shape",
          x: d.x,
          y: d.y,
          w: d.w,
          h: d.h,
          kind: shapeKind,
          stroke: color,
          fill: null,
          strokeWidth: 2,
        });
      } else if (tool === "link") {
        addItem({
          ...base,
          type: "link",
          x: d.x,
          y: d.y,
          w: d.w,
          h: d.h,
          url: "https://",
        });
      }
    };
    overlay.addEventListener("pointermove", move);
    overlay.addEventListener("pointerup", up);
  };

  const startDrag = (e: React.PointerEvent, item: Item, mode: "move" | "resize") => {
    e.stopPropagation();
    e.preventDefault();
    setSelected(item.id);
    const startPt = toPoint(e);
    const orig = { x: item.x, y: item.y, w: item.w, h: item.h };
    const overlay = overlayRef.current!;
    overlay.setPointerCapture(e.pointerId);
    let last: Partial<Item> | null = null;
    const move = (ev: PointerEvent) => {
      const r = overlay.getBoundingClientRect();
      const dx = (ev.clientX - r.left) / scale - startPt.x;
      const dy = (ev.clientY - r.top) / scale - startPt.y;
      last =
        mode === "move"
          ? { x: orig.x + dx, y: orig.y + dy }
          : {
              w: Math.max(16, orig.w + dx),
              h: Math.max(item.type === "text" ? orig.h : 12, orig.h + dy),
            };
      updateItem(item.id, last, false);
    };
    const up = () => {
      overlay.removeEventListener("pointermove", move);
      overlay.removeEventListener("pointerup", up);
      if (last) updateItem(item.id, last);
    };
    overlay.addEventListener("pointermove", move);
    overlay.addEventListener("pointerup", up);
  };

  const cursor =
    tool === "select"
      ? "default"
      : tool === "eraser"
        ? "pointer"
        : tool === "text" || tool === "edittext"
          ? "text"
          : "crosshair";



  return (
    <div>
      <div
        className="relative bg-white shadow-page"
        style={{ width, height }}
        onPointerDown={(e) => {
          if (tool === "select" && !(e.target as HTMLElement).dataset["item"]) {
            setSelected(null);
            setEditingText(null);
          }
        }}
      >
        {blank ? (
          <div className="absolute inset-0 bg-white" />
        ) : (
          <canvas
            ref={canvasRef}
            style={{ width, height }}
            className="absolute inset-0"
          />
        )}
        <div
          ref={overlayRef}
          className="absolute inset-0 touch-none"
          style={{ cursor }}
          onPointerDown={startCreate}
          onPointerMove={(e) => {
            if (tool !== "edittext") return;

            setHoverActive(true);

            const target = e.target as HTMLElement;
            const textItem = target.closest("[data-pdf-text-item]") as HTMLElement | null;

            // Empty PDF area = no hovered text.
            setHoveredTextId(textItem?.dataset.pdfTextItem ?? null);
          }}
          onPointerLeave={() => {
            if (tool === "edittext") setHoveredTextId(null);
          }}
        >
          {/* Cover source glyphs as soon as editing starts, not only after the
              value changes. Otherwise the textarea and canvas text overlap. */}
          {items.map((item) =>
            item.type === "text" &&
            item.source === "existing" &&
            (editingText === item.id || isExistingTextEdited(item)) ? (
              <div
                key={`cover-${item.id}`}
                data-pdf-text-cover="true"
                className="pointer-events-none absolute bg-white"
                style={{
                  left: ((item.ox ?? item.x) - Math.max(2, item.size * 0.18)) * scale,
                  top: ((item.oy ?? item.y) - item.size * 0.3) * scale,
                  width:
                    ((item.ow ?? item.w) + Math.max(4, item.size * 0.36)) * scale,
                  height:
                    (Math.max(item.oh ?? item.h, item.size * 1.55) + 4) * scale,
                }}
              />
            ) : null,
          )}

          {items.map((item) => (

            <ItemView
              key={item.id}
              item={item}
              scale={scale}
              selected={selected === item.id}
              editing={editingText === item.id}
              quickEdit={tool === "edittext" && hoverActive}
              hovered={hoveredTextId === item.id}
              eraseMode={tool === "eraser"}
              onSelect={() => setSelected(item.id)}
              onEdit={() => setEditingText(item.id)}
              onErase={() => eraseItem(item)}
              onChange={(p, rec) => updateItem(item.id, p, rec)}
              onDragStart={startDrag}
            />
          ))}

          {tool === "edittext" && !hasSeed && !blank && (
            <div className="absolute left-1/2 top-2 -translate-x-1/2 rounded bg-toolbar px-2 py-1 text-[11px] text-toolbar-foreground">
              Scanning text…
            </div>
          )}

          {draft && (
            <DraftView draft={draft} tool={tool} shapeKind={shapeKind} color={color} scale={scale} />
          )}

        </div>
      </div>
      <p className="mt-2 text-center text-[11px] text-slate-500">
        Page {number} of {total}
      </p>
    </div>
  );
}

function DraftView({
  draft,
  tool,
  shapeKind,
  color,
  scale,
}: {
  draft: { x: number; y: number; w: number; h: number; pts?: { x: number; y: number }[] };
  tool: ToolId;
  shapeKind: ShapeKind;
  color: string;
  scale: number;
}) {
  if (tool === "draw" && draft.pts) {
    return (
      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        <polyline
          points={draft.pts
            .map((p) => `${(draft.x + p.x) * scale},${(draft.y + p.y) * scale}`)
            .join(" ")}
          fill="none"
          stroke={color}
          strokeWidth={2 * scale}
          strokeLinecap="round"
        />
      </svg>
    );
  }
  const style: React.CSSProperties = {
    left: draft.x * scale,
    top: draft.y * scale,
    width: draft.w * scale,
    height: draft.h * scale,
  };
  if (tool === "highlight")
    return <div className="pointer-events-none absolute" style={{ ...style, background: color, opacity: 0.38 }} />;
  if (tool === "whiteout")
    return <div className="pointer-events-none absolute bg-white" style={style} />;
  if (tool === "link")
    return <div className="pointer-events-none absolute border-2 border-dashed" style={{ ...style, borderColor: color }} />;
  return (
    <div
      className="pointer-events-none absolute border-2"
      style={{
        ...style,
        borderColor: color,
        borderRadius: shapeKind === "ellipse" ? "50%" : 2,
      }}
    />
  );
}

function ItemView({
  item,
  scale,
  selected,
  editing,
  quickEdit = false,
  hovered,
  eraseMode = false,
  onSelect,
  onEdit,
  onErase,
  onChange,
  onDragStart,
}: {
  item: Item;
  scale: number;
  selected: boolean;
  editing: boolean;
  quickEdit?: boolean;
  hovered?: boolean;
  eraseMode?: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onErase: () => void;
  onChange: (p: Partial<Item>, record?: boolean) => void;
  onDragStart: (e: React.PointerEvent, item: Item, mode: "move" | "resize") => void;
}) {
  const [localHovered, setLocalHovered] = useState(false);
  const isHovered = hovered ?? localHovered;

  const hoverText =
    quickEdit && item.type === "text" && !editing && isHovered;

  const box: React.CSSProperties = {
    position: "absolute",
    left: item.x * scale,
    top: item.y * scale,
    width: item.w * scale,
    height: item.h * scale,

    // Edit-text hover: use a clean border + soft violet glow.
    // No dedicated underline/hover line is rendered.
    outline: hoverText ? "2px solid rgb(139 92 246 / 0.95)" : undefined,
    outlineOffset: hoverText ? "1px" : undefined,
    background: hoverText ? "rgb(139 92 246 / 0.07)" : undefined,
    boxShadow: hoverText
      ? "0 0 0 1px rgb(139 92 246 / 0.18), 0 0 10px rgb(139 92 246 / 0.28)"
      : undefined,
  };

  // an original PDF run that has not been touched: the page canvas already
  // shows it, so keep the object invisible but clickable
  const untouched =
    item.type === "text" && item.source === "existing" && !isExistingTextEdited(item);

  let inner: React.ReactNode = null;
  if (item.type === "text") {
    const decoration = [
      item.underline ? "underline" : "",
      item.strike ? "line-through" : "",
    ]
      .filter(Boolean)
      .join(" ");
    const style: React.CSSProperties = {
      fontFamily:
        item.font === "Times"
          ? "Times New Roman, serif"
          : item.font === "Courier"
            ? "Courier New, monospace"
            : "Helvetica, Arial, sans-serif",
      fontSize: item.size * scale,
      lineHeight: `${item.size * LINE_HEIGHT * scale}px`,
      color: untouched && !editing ? "transparent" : item.color,
      fontWeight: item.bold ? 700 : 400,
      fontStyle: item.italic ? "italic" : "normal",
      textDecoration: decoration || "none",
      textAlign: item.align,
    };
    inner = editing ? (
      <textarea
        autoFocus
        value={item.text}
        onChange={(e) => {
          const lines = e.target.value.split("\n").length;
          onChange(
            {
              text: e.target.value,
              h: lines * item.size * LINE_HEIGHT,
            } as Partial<Item>,
            false,
          );
        }}
        onBlur={(e) => onChange({ text: e.target.value } as Partial<Item>)}
        className={`h-full w-full resize-none overflow-hidden border-0 p-0 outline-none ${
          item.source === "existing" ? "bg-white" : "bg-transparent"
        }`}
        style={style}
      />
    ) : (
      <div
        className={`h-full w-full whitespace-pre-wrap ${
          item.source === "existing" && !untouched ? "bg-white" : ""
        }`}
        style={style}
      >
        {item.text || (untouched ? "" : <span className="opacity-40">Type text…</span>)}
      </div>
    );
  } else if (item.type === "image") {
    inner = (
      <img
        src={item.src}
        alt={item.signature ? "Signature" : "Added image"}
        className="pointer-events-none h-full w-full object-fill"
        draggable={false}
      />
    );
  } else if (item.type === "highlight") {
    inner = <div className="h-full w-full" style={{ background: item.color, opacity: 0.38 }} />;
  } else if (item.type === "whiteout") {
    inner = <div className="h-full w-full bg-white" />;
  } else if (item.type === "shape") {
    if (item.kind === "line") {
      inner = (
        <svg className="h-full w-full overflow-visible">
          <line
            x1={0}
            y1={0}
            x2={item.w * scale}
            y2={item.h * scale}
            stroke={item.stroke}
            strokeWidth={item.strokeWidth * scale}
          />
        </svg>
      );
    } else {
      inner = (
        <div
          className="h-full w-full"
          style={{
            border: `${item.strokeWidth * scale}px solid ${item.stroke}`,
            borderRadius: item.kind === "ellipse" ? "50%" : 2,
            background: item.fill ?? "transparent",
          }}
        />
      );
    }
  } else if (item.type === "draw") {
    inner = (
      <svg className="h-full w-full overflow-visible">
        <polyline
          points={item.points.map((p) => `${p.x * scale},${p.y * scale}`).join(" ")}
          fill="none"
          stroke={item.color}
          strokeWidth={item.strokeWidth * scale}
          strokeLinecap="round"
        />
      </svg>
    );
  } else if (item.type === "link") {
    inner = (
      <div className="h-full w-full border-2 border-dashed border-primary bg-primary/5" />
    );
  }

  const textQuick = quickEdit && item.type === "text";


  return (
    <div
      data-item="1"
      data-pdf-text-item={item.type === "text" ? item.id : undefined}
      style={box}
      className={[
        selected ? "outline outline-2 outline-ring" : "",
        eraseMode ? "cursor-pointer hover:outline hover:outline-2 hover:outline-red-500" : "",
        !eraseMode && textQuick && !editing
          ? "cursor-text rounded-[2px]"
          : "",
      ].join(" ")}
      onPointerEnter={() => textQuick && setLocalHovered(true)}
      onPointerLeave={() => textQuick && setLocalHovered(false)}
      onPointerDown={(e) => {
        if (editing) return;
        if (eraseMode) {
          e.stopPropagation();
          e.preventDefault();
          onErase();
          return;
        }
        onSelect();
        if (textQuick) {
          e.stopPropagation();
          e.preventDefault();
          onEdit();
          return;
        }
        onDragStart(e, item, "move");
      }}
      onDoubleClick={() => item.type === "text" && onEdit()}
    >



      <div data-item="1" className="pointer-events-none relative h-full w-full">
        {item.type === "text" ? (
          <div className="pointer-events-auto h-full w-full">{inner}</div>
        ) : (
          inner
        )}
      </div>
      {selected && !eraseMode && (
        <span
          data-item="1"
          onPointerDown={(e) => onDragStart(e, item, "resize")}
          className="absolute -bottom-1.5 -right-1.5 h-3 w-3 cursor-nwse-resize rounded-sm border border-background bg-primary"
        />
      )}
    </div>
  );
}


function Thumb({
  doc,
  index,
  rot,
  width,
}: {
  doc: pdfjs.PDFDocumentProxy;
  index: number;
  rot: number;
  width: number;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    let cancelled = false;
    let task: pdfjs.RenderTask | null = null;
    (async () => {
      const page = await doc.getPage(index + 1);
      if (cancelled) return;
      const base = page.getViewport({ scale: 1, rotation: rot });
      const viewport = page.getViewport({
        scale: (width * 2) / base.width,
        rotation: rot,
      });
      const canvas = ref.current;
      if (!canvas) return;
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      task = page.render({ canvasContext: ctx, viewport, canvas } as never);
      try {
        await task.promise;
      } catch {
        /* cancelled */
      }
    })();
    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [doc, index, rot, width]);
  return <canvas ref={ref} className="h-full w-full" />;
}
