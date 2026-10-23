import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  Download,
  Eraser,
  Eye,
  FileText,
  Loader2,
  RotateCcw,
  RotateCw,
  Upload,
  X,
} from "lucide-react";

import { getToolImpl, type Field, type ToolValues } from "@/lib/pdf/tools";
import type { ToolFile } from "@/lib/pdf/toolkit";
import { formatFileSize } from "@/lib/formatFileSize";
import { assetUrl, downloadBlob, isNative } from "@/lib/native";
import * as pdfjs from "pdfjs-dist";


function defaultValues(fields: Field[]): ToolValues {
  const values: ToolValues = {};
  for (const field of fields) {
    if (field.type === "file") continue;
    values[field.name] = field.default ?? (field.type === "checkbox" ? false : "");
  }
  return values;
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500";

const PDF_API_BASE_URL =
  import.meta.env.VITE_PDF_API_BASE_URL ||
  (isNative()
    ? "https://pdf-verse-api-uu40.onrender.com"
    : "http://localhost:4000");

type PreviewDescriptor = {
  url: string;
  type: string;
  kind:
    | "pdf"
    | "image"
    | "text"
    | "html"
    | "video"
    | "audio"
    | "generic";
};

const OFFICE_EXTENSIONS = /\.(doc|docx|xls|xlsx|ppt|pptx)$/i;
const TEXT_EXTENSIONS = /\.(txt|csv|json|xml|md|css|js|ts|jsx|tsx|yaml|yml|log|svg)$/i;
const HTML_EXTENSIONS = /\.(html?|xhtml)$/i;

function getPreviewKind(
  name: string,
  type: string,
): PreviewDescriptor["kind"] {
  const lowerName = name.toLowerCase();
  const lowerType = type.toLowerCase();

  if (
    lowerType.includes("pdf") ||
    lowerName.endsWith(".pdf")
  ) {
    return "pdf";
  }

  if (lowerType.startsWith("image/")) {
    return "image";
  }

  if (lowerType.startsWith("video/")) {
    return "video";
  }

  if (lowerType.startsWith("audio/")) {
    return "audio";
  }

  if (
    lowerType.includes("html") ||
    HTML_EXTENSIONS.test(lowerName)
  ) {
    return "html";
  }

  if (
    lowerType.startsWith("text/") ||
    TEXT_EXTENSIONS.test(lowerName)
  ) {
    return "text";
  }

  return "generic";
}

async function convertOfficeToPdfPreview(
  file: File | Blob,
  fileName: string,
): Promise<PreviewDescriptor> {
  const formData = new FormData();
  formData.append("file", file, fileName);

  const response = await fetch(
    `${PDF_API_BASE_URL}/api/pdf/office-to-pdf`,
    {
      method: "POST",
      body: formData,
    },
  ).catch((err: unknown) => {
    if (isNative()) {
      throw new Error(
        `No connection — connect to the internet to preview ${fileName}.`,
      );
    }
    throw err;
  });

  if (!response.ok) {
    let message = `Could not create a preview for ${fileName}.`;

    try {
      const payload =
        (await response.json()) as {
          error?: string;
        };

      if (payload?.error) {
        message = payload.error;
      }
    } catch {
    }

    throw new Error(message);
  }

  const blob =
    await response.blob();

  if (!blob.size) {
    throw new Error(
      `Preview conversion returned an empty file for ${fileName}.`,
    );
  }

  return {
    url: URL.createObjectURL(blob),
    type: "application/pdf",
    kind: "pdf",
  };
}

async function buildPreview(
  file: File,
): Promise<PreviewDescriptor> {
  const kind = getPreviewKind(
    file.name,
    file.type,
  );

  if (
    kind === "pdf" ||
    kind === "image" ||
    kind === "video" ||
    kind === "audio" ||
    kind === "text" ||
    kind === "html"
  ) {
    return {
      url: URL.createObjectURL(file),
      type: file.type || "application/octet-stream",
      kind,
    };
  }

  if (
    OFFICE_EXTENSIONS.test(file.name)
  ) {
    return convertOfficeToPdfPreview(
      file,
      file.name,
    );
  }

  return {
    url: "",
    type: file.type || "application/octet-stream",
    kind: "generic",
  };
}

function PdfPageItem({
  doc,
  pageNumber,
  scale,
  containerWidth,
}: {
  doc: pdfjs.PDFDocumentProxy;
  pageNumber: number;
  scale: number;
  containerWidth: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [inView, setInView] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [pageSize, setPageSize] = useState<{ width: number; height: number }>({
    width: 280,
    height: 380,
  });
  const renderTaskRef = useRef<pdfjs.RenderTask | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
        }
      },
      { rootMargin: "450px" }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || !doc) return;
    let cancelled = false;

    if (renderTaskRef.current) {
      renderTaskRef.current.cancel();
      renderTaskRef.current = null;
    }

    doc
      .getPage(pageNumber)
      .then((pdfPage) => {
        if (cancelled) return;
        const unscaled = pdfPage.getViewport({ scale: 1 });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const availableWidth = containerWidth > 64 ? containerWidth - 48 : 360;
        const baseScale = availableWidth > 0 ? availableWidth / unscaled.width : 1;
        const finalScale = Math.max(0.2, baseScale * scale);
        const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
        const viewport = pdfPage.getViewport({ scale: finalScale * dpr });

        const displayWidth = Math.round(viewport.width / dpr);
        const displayHeight = Math.round(viewport.height / dpr);
        setPageSize({ width: displayWidth, height: displayHeight });

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = `${displayWidth}px`;
        canvas.style.height = `${displayHeight}px`;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const renderTask = pdfPage.render({ canvasContext: ctx, viewport } as never);
        renderTaskRef.current = renderTask;

        renderTask.promise
          .then(() => {
            if (!cancelled) setRendered(true);
          })
          .catch(() => {});
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [doc, pageNumber, scale, containerWidth, inView]);

  return (
    <div
      ref={containerRef}
      id={`pdf-page-${pageNumber}`}
      data-page-number={pageNumber}
      className="pdf-page-item relative my-3 flex flex-col items-center shrink-0"
    >
      <div
        className="relative overflow-hidden rounded-lg bg-white shadow-2xl transition-all"
        style={{
          width: pageSize.width,
          minHeight: pageSize.height,
        }}
      >
        <canvas ref={canvasRef} className="block" />
        {!rendered && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/60 p-4 text-center"
            style={{ minHeight: pageSize.height }}
          >
            <Loader2 className="h-6 w-6 animate-spin text-violet-400" />
            <span className="mt-2 text-[11px] font-medium text-slate-300">
              Page {pageNumber}
            </span>
          </div>
        )}
      </div>
      <span className="mt-2 rounded-full border border-white/10 bg-slate-900/90 px-2.5 py-0.5 text-[11px] font-semibold text-slate-300 shadow">
        Page {pageNumber}
      </span>
    </div>
  );
}

function UniversalPdfPreview({ url, name }: { url: string; name: string }) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [doc, setDoc] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState(1.0);
  const [containerWidth, setContainerWidth] = useState(500);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    try {
      pdfjs.GlobalWorkerOptions.workerSrc = assetUrl("/pdf.worker.min.mjs");
    } catch {}

    const loadTask = pdfjs.getDocument({ url });
    loadTask.promise
      .then((loadedDoc) => {
        if (cancelled) {
          loadedDoc.destroy();
          return;
        }
        setDoc(loadedDoc);
        setNumPages(loadedDoc.numPages);
        setCurrentPage(1);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Could not load PDF preview.");
        setLoading(false);
      });

    return () => {
      cancelled = true;
      loadTask.destroy().catch(() => {});
    };
  }, [url]);

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const updateWidth = () => {
      if (scrollContainerRef.current) {
        setContainerWidth(scrollContainerRef.current.clientWidth);
      }
    };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(scrollContainerRef.current);
    return () => ro.disconnect();
  }, [loading]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const pageElements = container.querySelectorAll<HTMLElement>(".pdf-page-item");
    const containerTop = container.scrollTop;
    const containerCenter = containerTop + container.clientHeight / 3;

    for (const el of pageElements) {
      const top = el.offsetTop;
      const height = el.clientHeight;
      if (top <= containerCenter && top + height >= containerCenter) {
        const pageNum = Number(el.dataset.pageNumber);
        if (pageNum && pageNum !== currentPage) {
          setCurrentPage(pageNum);
        }
        break;
      }
    }
  };

  const scrollToPage = (targetPage: number) => {
    const pageClamped = Math.max(1, Math.min(numPages, targetPage));
    const targetEl = scrollContainerRef.current?.querySelector<HTMLElement>(
      `#pdf-page-${pageClamped}`
    );
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      setCurrentPage(pageClamped);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2.5 p-6 text-center">
        <Loader2 className="h-7 w-7 animate-spin" style={{ color: "var(--accent)" }} />
        <p className="text-xs font-medium text-slate-300">Loading {name}…</p>
      </div>
    );
  }

  if (error || !doc) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2.5 p-6 text-center" style={{ background: "var(--surface)" }}>
        <FileText className="h-10 w-10 text-slate-500" />
        <p className="text-xs font-medium text-slate-300">{name}</p>
        <p className="max-w-[280px] text-[11px] text-slate-500">{error ?? "Preview unavailable"}</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-slate-950">
      {/* Sticky Page Navigation & Zoom Controls */}
      <div className="flex w-full shrink-0 items-center justify-between border-b border-white/10 bg-slate-900/95 px-3 py-2 text-xs text-slate-200 backdrop-blur z-20">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => scrollToPage(currentPage - 1)}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-slate-800 font-bold transition hover:bg-slate-700 disabled:opacity-30"
            aria-label="Previous page"
          >
            ‹
          </button>
          <span className="min-w-16 text-center text-[11px] font-semibold text-slate-200">
            {currentPage} / {numPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= numPages}
            onClick={() => scrollToPage(currentPage + 1)}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-slate-800 font-bold transition hover:bg-slate-700 disabled:opacity-30"
            aria-label="Next page"
          >
            ›
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setScale((s) => Math.max(0.5, Math.round((s - 0.2) * 10) / 10))}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-slate-800 font-bold transition hover:bg-slate-700 text-xs"
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            type="button"
            onClick={() => setScale(1.0)}
            title="Reset zoom to 100%"
            className="min-w-11 text-center text-[11px] font-medium text-slate-400 hover:text-white"
          >
            {Math.round(scale * 100)}%
          </button>
          <button
            type="button"
            onClick={() => setScale((s) => Math.min(2.5, Math.round((s + 0.2) * 10) / 10))}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-slate-800 font-bold transition hover:bg-slate-700 text-xs"
            aria-label="Zoom in"
          >
            +
          </button>
        </div>
      </div>

      {/* Fully Scrollable Pages Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 w-full overflow-y-auto overflow-x-auto p-3 sm:p-5 scroll-smooth overscroll-contain"
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="flex flex-col items-center min-w-full pb-8">
          {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum) => (
            <PdfPageItem
              key={`page-${pageNum}`}
              doc={doc}
              pageNumber={pageNum}
              scale={scale}
              containerWidth={containerWidth}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TextPreview({ url }: { url: string }) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(url)
      .then((res) => res.text())
      .then((text) => {
        if (!cancelled) {
          setContent(text);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-6 text-slate-400">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-auto bg-slate-950 p-4 text-left font-mono text-xs leading-relaxed text-slate-200">
      <pre className="whitespace-pre-wrap break-words">{content || "(Empty text file)"}</pre>
    </div>
  );
}

function PreviewContent({
  name,
  type,
  url,
  kind,
}: {
  name: string;
  type: string;
  url: string;
  kind: PreviewDescriptor["kind"];
}) {
  if (kind === "pdf") {
    return <UniversalPdfPreview url={url} name={name} />;
  }

  if (kind === "image") {
    return (
      <div
        className="flex h-full w-full items-center justify-center overflow-auto bg-slate-950 p-4"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <img
          src={url}
          alt={`Preview of ${name}`}
          className="max-h-full max-w-full object-contain rounded shadow-lg"
        />
      </div>
    );
  }

  if (kind === "video") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-black p-2">
        <video
          src={url}
          controls
          playsInline
          className="max-h-full max-w-full"
        />
      </div>
    );
  }

  if (kind === "audio") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-slate-950 p-6">
        <audio
          src={url}
          controls
          className="w-full"
        />
      </div>
    );
  }

  if (kind === "text") {
    return <TextPreview url={url} />;
  }

  if (kind === "html") {
    return (
      <div
        className="h-full w-full overflow-auto bg-white"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <iframe
          title={`HTML preview of ${name}`}
          src={url}
          className="h-full w-full min-h-[500px] border-0 bg-white"
          sandbox="allow-same-origin"
        />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center" style={{ background: 'var(--surface)' }}>
      <FileText className="h-12 w-12" style={{ color: 'var(--accent)' }} />
      <div>
        <p className="font-semibold text-slate-100">
          {name}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          File is ready to process.
        </p>
      </div>
    </div>
  );
}

function InlineFilePreview({
  name,
  type,
  url,
  kind,
}: {
  name: string;
  type: string;
  url: string;
  kind?: PreviewDescriptor["kind"];
}) {
  const previewKind =
    kind ?? getPreviewKind(name, type);

  return (
    <div className="mx-auto w-full max-w-[680px] overflow-hidden rounded-2xl border shadow-[0_18px_45px_rgba(0,0,0,0.28)]" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
      <div className="flex h-[340px] sm:h-[420px] lg:h-[480px] w-full overflow-hidden" style={{ background: 'var(--surface-hover)' }}>
        <PreviewContent
          name={name}
          type={type}
          url={url}
          kind={previewKind}
        />
      </div>
    </div>
  );
}

const officePreviewInFlight = new Map<
  Blob,
  Promise<PreviewDescriptor>
>();  

function convertOfficeToPdfDeduped(
  blob: Blob,
  name: string,
): Promise<PreviewDescriptor> {
  const existing =
    officePreviewInFlight.get(blob);

  if (existing) {
    return existing;
  }

  const promise = convertOfficeToPdfPreview(
    blob,
    name,
  ).finally(() => {
    officePreviewInFlight.delete(
      blob,
    );
  });

  officePreviewInFlight.set(
    blob,
    promise,
  );

  return promise;
}

function ResultFilePreview({
  blob,
  name,
  url,
}: {
  blob: Blob;
  name: string;
  url: string;
}) {
  const kind = getPreviewKind(name, blob.type);
  const office = kind === "generic" && OFFICE_EXTENSIONS.test(name);

  const [converted, setConverted] = useState<
    { url: string; error?: string } | null
  >(null);
  const convertedUrlRef = useRef("");

  useEffect(() => {
    return () => {
      if (convertedUrlRef.current) {
        URL.revokeObjectURL(convertedUrlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    if (!office) {
      setConverted(null);
      return;
    }

    setConverted(null);
    convertOfficeToPdfDeduped(blob, name)
      .then((preview) => {
        if (cancelled) return;

        if (convertedUrlRef.current) {
          URL.revokeObjectURL(convertedUrlRef.current);
        }
        convertedUrlRef.current = preview.url;
        setConverted({ url: preview.url });
      })
      .catch((err: unknown) => {
        if (cancelled) return;

        setConverted({
          url: "",
          error:
            err instanceof Error
              ? err.message
              : `Could not create a preview for ${name}.`,
        });
      });

    return () => {
      cancelled = true;
    };
  }, [blob, name, office]);

  if (office) {
    if (!converted) {
      return (
        <div className="mx-auto w-full max-w-[680px] overflow-hidden rounded-2xl border shadow-[0_18px_45px_rgba(0,0,0,0.28)]" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <div className="flex h-[220px] w-full items-center justify-center gap-3 sm:h-[280px] lg:h-[320px]" style={{ background: 'var(--surface-hover)' }}>
            <Loader2 className="h-6 w-6 animate-spin" style={{ color: 'var(--accent)' }} />
            <p className="text-sm font-medium" style={{ color: 'var(--text-2)' }}>
              Generating preview…
            </p>
          </div>
        </div>
      );
    }

    if (converted.error) {
      return (
        <div className="mx-auto w-full max-w-[680px] overflow-hidden rounded-2xl border shadow-[0_18px_45px_rgba(0,0,0,0.28)]" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <div className="flex h-[220px] w-full flex-col items-center justify-center gap-2 px-6 text-center sm:h-[280px] lg:h-[320px]" style={{ background: 'var(--surface-hover)' }}>
            <FileText className="h-9 w-9" style={{ color: 'var(--accent)' }} />
            <p className="text-xs font-semibold" style={{ color: 'var(--text-2)' }}>
              Preview unavailable
            </p>
            <p className="max-w-[300px] text-[11px] leading-4" style={{ color: 'var(--text-3)' }}>
              {converted.error}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="mx-auto w-full max-w-[680px] overflow-hidden rounded-2xl border shadow-[0_18px_45px_rgba(0,0,0,0.28)]" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <div className="flex h-[340px] sm:h-[420px] lg:h-[480px] w-full overflow-hidden" style={{ background: 'var(--surface-hover)' }}>
          <PreviewContent
            name={name}
            type="application/pdf"
            url={converted.url}
            kind="pdf"
          />
        </div>
      </div>
    );
  }

  return (
    <InlineFilePreview
      name={name}
      type={blob.type}
      url={url}
    />
  );
}

type ToolRunnerProps = {
  slug: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
};

export function ToolRunner({ slug, title, description, icon }: ToolRunnerProps) {
  const impl = getToolImpl(slug);
  const fields = useMemo(() => impl?.fields ?? [], [impl]);
  const [files, setFiles] = useState<File[]>([]);
  const [extraFiles, setExtraFiles] = useState<Record<string, File | null>>({});
  const [values, setValues] = useState<ToolValues>(() => defaultValues(fields));
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [results, setResults] = useState<Array<ToolFile & { url: string }>>([]);
  const [names, setNames] = useState<Record<string, string>>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedPreviewUrls, setSelectedPreviewUrls] = useState<string[]>([]);
  const [selectedPreviewKinds, setSelectedPreviewKinds] = useState<
    PreviewDescriptor["kind"][]
  >([]);
  const [previewLoading, setPreviewLoading] = useState<boolean[]>([]);
  const [mobilePreview, setMobilePreview] = useState<{
    name: string;
    url: string;
    type: string;
    kind: PreviewDescriptor["kind"];
  } | null>(null);
  const selectedPreviewUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    return () => {
      selectedPreviewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const setSelectedUrls = (
    urls: string[],
    kinds: PreviewDescriptor["kind"][] = [],
    loading: boolean[] = [],
  ) => {
    selectedPreviewUrlsRef.current = urls;
    setSelectedPreviewUrls(urls);
    setSelectedPreviewKinds(kinds);
    setPreviewLoading(loading);
  };

  const openResultPreview = async (
    blob: Blob,
    url: string,
    name: string,
  ) => {
    const kind = getPreviewKind(
      name,
      blob.type,
    );

    // Office files can't be previewed directly — convert to PDF first.
    if (
      kind === "generic" &&
      OFFICE_EXTENSIONS.test(name)
    ) {
      setBusy(true);
      setMobilePreview({
        name: `${name} (converting…)`,
        url: "",
        type: "application/pdf",
        kind: "pdf",
      });

      try {
        const preview = await convertOfficeToPdfPreview(
          blob,
          name,
        );

        setMobilePreview({
          name,
          url: preview.url,
          type: preview.type,
          kind: preview.kind,
        });
      } catch (err) {
        setMobilePreview(null);
        setError(
          err instanceof Error
            ? err.message
            : `Could not create a preview for ${name}.`,
        );
      } finally {
        setBusy(false);
      }
      return;
    }

    setMobilePreview({
      name,
      url,
      type: blob.type,
      kind,
    });
  };

  if (!impl) {
    return (
      <p className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center text-xs text-slate-400">
        This tool is not available yet.
      </p>
    );
  }

  const setValue = (name: string, value: string | number | boolean) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  const clearResults = () => {
    results.forEach((r) => URL.revokeObjectURL(r.url));
    setResults([]);
    setNames({});
    setError("");
    setStatus("");
  };

  const clearSelectedPreviews = () => {
    selectedPreviewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    selectedPreviewUrlsRef.current = [];
    setSelectedPreviewUrls([]);
    setSelectedPreviewKinds([]);
    setPreviewLoading([]);
  };

  const onPick = async (
    list: FileList | null,
  ) => {
    if (!list || list.length === 0) return;

    const picked = Array.from(list);

    const MAX_TOOL_FILE_SIZE = 100 * 1024 * 1024;
    const oversized = picked.find((f) => f.size > MAX_TOOL_FILE_SIZE);
    if (oversized) {
      setError(
        `File too large: "${oversized.name}" (${formatFileSize(oversized.size)}). Maximum supported file size is 100MB per file.`
      );
      return;
    }

    const nextFiles = impl.multiple
      ? [...files, ...picked]
      : picked.slice(0, 1);

    clearResults();

    if (!impl.multiple) {
      selectedPreviewUrlsRef.current.forEach((url) =>
        URL.revokeObjectURL(url),
      );
    }

    const nextCount = nextFiles.length;

    setFiles(nextFiles);

    const baseUrls = Array.from({
      length: nextCount,
    }).map(() => "");

    const baseKinds: PreviewDescriptor["kind"][] =
      Array.from({
        length: nextCount,
      }).map(() => "generic");

    const baseLoading = Array.from({
      length: nextCount,
    }).map(() => true);

    if (impl.multiple) {
      const existingUrls =
        selectedPreviewUrlsRef.current;

      const existingKinds =
        selectedPreviewKinds;

      const existingLoading =
        previewLoading;

      setSelectedUrls(
        [
          ...existingUrls,
          ...picked.map(() => ""),
        ],
        [
          ...existingKinds,
          ...picked.map(() => "generic" as const),
        ],
        [
          ...existingLoading,
          ...picked.map(() => true),
        ],
      );
    } else {
      setSelectedUrls(
        baseUrls,
        baseKinds,
        baseLoading,
      );
    }

    const startIndex = impl.multiple
      ? nextCount - picked.length
      : 0;

    for (
      let offset = 0;
      offset < picked.length;
      offset += 1
    ) {
      const file = picked[offset];

      try {
        const preview =
          await buildPreview(file);

        const targetIndex =
          startIndex + offset;

        setSelectedPreviewUrls((prev) => {
          const next = [...prev];
          next[targetIndex] =
            preview.url;
          return next;
        });

        setSelectedPreviewKinds((prev) => {
          const next = [...prev];
          next[targetIndex] =
            preview.kind;
          return next;
        });
      } catch (previewError) {
        console.warn(
          `Preview unavailable for ${file.name}:`,
          previewError,
        );
      } finally {
        const targetIndex =
          startIndex + offset;

        setPreviewLoading((prev) => {
          const next = [...prev];
          next[targetIndex] =
            false;
          return next;
        });
      }
    }
  };

  const run = async () => {
    clearResults();
    setBusy(true);
    try {
      const out = await impl.run({
        files,
        values,
        extraFiles,
        progress: (message) => setStatus(message),
      });

      const processed = out.map((file) => ({
        ...file,
        url: URL.createObjectURL(file.blob),
      }));

      setResults(processed);
      setStatus("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong processing that file.",
      );
      setStatus("");
    } finally {
      setBusy(false);
    }
  };

  const pastedHtml =
    slug === "html-to-pdf"
      ? String(values.html ?? "").trim()
      : "";

  const [downloading, setDownloading] = useState<string | null>(null);

  async function handleDownload(blob: Blob, outputName: string) {
    if (downloading) return;
    setDownloading(outputName);
    try {
      const mode = await downloadBlob(blob, outputName);
      if (mode === "saved" && isNative()) {
        setStatus(`Downloaded ${outputName} to your device's Downloads folder.`);
      } else if (mode === "shared" && isNative()) {
        setStatus(`Saved — pick a location in the share sheet to keep ${outputName}.`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save that file.");
    } finally {
      setDownloading(null);
    }
  }

  const canProcess =
    !busy &&
    (files.length > 0 ||
      pastedHtml.length > 0);

  const disabledReason =
    files.length === 0 &&
    pastedHtml.length === 0
      ? ""
      : "";

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      {/* ============ TOOL PANEL ============ */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-primary-foreground">
            {icon ?? <FileText className="h-4 w-4" />}
          </div>
          <div>
            <h2 className="font-semibold text-white">{title}</h2>
            <p className="text-xs text-slate-400">{description}</p>
          </div>
        </div>

        <label className="mb-2 block text-sm font-medium text-slate-300">
          {impl.uploadLabel ?? "Upload file"}
        </label>

        <input
          ref={inputRef}
          type="file"
          accept={impl.accept}
          multiple={impl.multiple}
          className="hidden"
          onChange={(event) => {
            void onPick(event.target.files);
            event.target.value = "";
          }}
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            void onPick(event.dataTransfer.files);
          }}
          className="flex w-full flex-col items-center gap-3 rounded-2xl border border-dashed border-white/15 bg-slate-950 px-6 py-10 text-center transition hover:border-violet-500/50 hover:bg-violet-500/[0.06]"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            color: 'var(--text-1)',
          } as React.CSSProperties}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-300" style={{
            backgroundColor: 'var(--accent-light)',
            color: 'var(--accent)',
          }}>
            <Upload className="h-4 w-4" />
          </span>
          <span className="text-base font-semibold text-white">
            Click to browse or drop {impl.multiple ? "files" : "a file"} here
          </span>
          <span className="text-xs leading-5 text-slate-500">
            {impl.processing === "server"
              ? ""
              : ""}
          </span>
        </button>

        {files.length > 0 ? (
          <div className="mt-4 sm:mt-5">
            {/* Mobile: compact file rows like the requested design. */}
            <div className="space-y-3 md:hidden">
              {files.map((file, index) => {
                const previewUrl = selectedPreviewUrls[index];
                const previewKind =
                  selectedPreviewKinds[index] ??
                  getPreviewKind(file.name, file.type);
                const isLoadingPreview =
                  previewLoading[index] ?? false;

                return (
                  <div
                    key={`mobile-${file.name}-${index}`}
                    className="flex min-h-[68px] items-center gap-2 rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 shadow-[0_6px_18px_rgba(0,0,0,0.12)]"
                  >
                    <div className="min-w-0 flex-1">
                      <p
                        className="truncate text-[13px] font-semibold text-slate-100"
                        title={file.name}
                      >
                        {file.name}
                      </p>
                      <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 -translate-y-1">
                      {isLoadingPreview ? (
                        <span className="inline-flex h-9 items-center rounded-lg border border-violet-500/20 bg-violet-500/10 px-2.5 text-[11px] font-medium text-violet-200" style={{
                          backgroundColor: 'var(--accent-light)',
                          color: 'var(--accent)',
                        }}>
                          Preparing…
                        </span>
                      ) : previewUrl ? (
                        <button
                          type="button"
                          onClick={() => {
                            setMobilePreview({
                              name: file.name,
                              url: previewUrl,
                              type: file.type,
                              kind: previewKind,
                            });
                          }}
                          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-slate-900/80 px-2.5 text-xs font-semibold text-slate-200 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white"
                        >
                          <Eye className="h-4 w-4" />
                          Preview
                        </button>
                      ) : (
                        <span className="inline-flex h-9 items-center rounded-lg border border-white/5 bg-slate-900/60 px-2.5 text-[11px] font-medium text-slate-500">
                          No preview
                        </span>
                      )}

                      <button
                        type="button"
                        aria-label={`Remove ${file.name}`}
                        title={`Remove ${file.name}`}
                        onClick={() => {
                          const url = selectedPreviewUrls[index];
                          if (url) URL.revokeObjectURL(url);

                          const nextUrls = selectedPreviewUrls.filter(
                            (_, i) => i !== index,
                          );
                          const nextKinds =
                            selectedPreviewKinds.filter(
                              (_, i) => i !== index,
                            );
                          const nextLoading =
                            previewLoading.filter(
                              (_, i) => i !== index,
                            );
                          selectedPreviewUrlsRef.current = nextUrls;
                          setSelectedPreviewUrls(nextUrls);
                          setSelectedPreviewKinds(nextKinds);
                          setPreviewLoading(nextLoading);

                          setFiles((prev) => prev.filter((_, i) => i !== index));
                          clearResults();
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-slate-300 transition hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tablet/Desktop: keep the existing preview cards. */}
            <div className="hidden grid-cols-1 gap-3 md:grid md:grid-cols-2 lg:grid-cols-3">
              {files.map((file, index) => {
                const previewUrl = selectedPreviewUrls[index];
                const previewKind =
                  selectedPreviewKinds[index] ??
                  getPreviewKind(file.name, file.type);
                const isLoadingPreview =
                  previewLoading[index] ?? false;

                return (
                  <div
                    key={`${file.name}-${index}`}
                    className="group min-w-0 overflow-hidden rounded-xl border border-white/10 bg-slate-950/80 shadow-[0_8px_20px_rgba(0,0,0,0.16)] transition duration-200 hover:border-violet-500/30"
                  >
                    {/* Only filename + remove button */}
                    <div className="flex min-h-14 items-center gap-3 px-4 py-3 md:min-h-12 md:gap-2 md:px-3 md:py-2.5">
                      <p
                        className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-100 md:text-sm"
                        title={file.name}
                      >
                        {file.name}
                      </p>

                      <button
                        type="button"
                        aria-label={`Remove ${file.name}`}
                        title={`Remove ${file.name}`}
                        onClick={() => {
                          const url = selectedPreviewUrls[index];
                          if (url) URL.revokeObjectURL(url);

                          const nextUrls = selectedPreviewUrls.filter(
                            (_, i) => i !== index,
                          );
                          const nextKinds =
                            selectedPreviewKinds.filter(
                              (_, i) => i !== index,
                            );
                          const nextLoading =
                            previewLoading.filter(
                              (_, i) => i !== index,
                            );

                          selectedPreviewUrlsRef.current = nextUrls;
                          setSelectedPreviewUrls(nextUrls);
                          setSelectedPreviewKinds(nextKinds);
                          setPreviewLoading(nextLoading);

                          setFiles((prev) => prev.filter((_, i) => i !== index));
                          clearResults();
                        }}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-slate-900 text-slate-300 transition hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Preview thumbnail — clicking opens full scrollable preview viewer */}
                    <button
                      type="button"
                      onClick={() => {
                        if (!previewUrl) return;
                        setMobilePreview({
                          name: file.name,
                          url: previewUrl,
                          type: file.type,
                          kind: previewKind,
                        });
                      }}
                      className="group/preview block w-full text-left relative cursor-pointer"
                      title="Click to open full scrollable preview"
                    >
                      <div
                        className="h-[180px] w-full overflow-hidden bg-[#171a22] md:h-[200px] lg:h-[220px]"
                      >
                        {isLoadingPreview ? (
                          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-950 px-5 text-center">
                            <Loader2 className="h-7 w-7 animate-spin text-violet-300" />
                            <p className="text-xs font-semibold text-slate-200">
                              Preparing preview…
                            </p>
                            <p className="max-w-[220px] text-[11px] leading-4 text-slate-500">
                              {file.name}
                            </p>
                          </div>
                        ) : previewUrl ? (
                          <PreviewContent
                            name={file.name}
                            type={file.type}
                            url={previewUrl}
                            kind={previewKind}
                          />
                        ) : (
                          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-950 px-5 text-center">
                            <FileText className="h-9 w-9 text-violet-300" />
                            <p className="text-xs font-semibold text-slate-200">
                              Preview unavailable
                            </p>
                            <p className="max-w-[220px] text-[11px] leading-4 text-slate-500">
                              {file.name} is ready to process.
                            </p>
                          </div>
                        )}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {fields.length > 0 ? (
          <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.name}
                className={field.type === "textarea" ? "sm:col-span-2" : undefined}
              >
                <label
                  htmlFor={`field-${field.name}`}
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  {field.label}
                </label>

                {field.type === "select" ? (
                  <select
                    id={`field-${field.name}`}
                    className={inputClass}
                    value={String(values[field.name] ?? "")}
                    onChange={(e) => setValue(field.name, e.target.value)}
                  >
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value} className="bg-slate-900">
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "checkbox" ? (
                  <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-200 transition hover:border-white/20">
                    <input
                      id={`field-${field.name}`}
                      type="checkbox"
                      className="h-4 w-4 rounded accent-violet-500"
                      checked={Boolean(values[field.name])}
                      onChange={(e) => setValue(field.name, e.target.checked)}
                    />
                    <span>{field.placeholder || (values[field.name] ? "Enabled" : "Disabled")}</span>
                  </label>
                ) : field.type === "textarea" ? (
                  <textarea
                    id={`field-${field.name}`}
                    rows={10}
                    className={`${inputClass} resize-y font-mono text-xs`}
                    placeholder={field.placeholder}
                    value={String(values[field.name] ?? "")}
                    onChange={(e) => setValue(field.name, e.target.value)}
                  />
                ) : field.type === "rotate" ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Rotate all left"
                      title="Rotate left"
                      onClick={() =>
                        setValue(field.name, (Number(values[field.name]) || 0) - 1)
                      }
                      className="flex h-12 flex-1 items-center justify-center rounded-xl border border-white/10 bg-slate-950 text-slate-200 transition hover:border-violet-400/40 hover:text-white"
                    >
                      <RotateCcw className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Rotate all right"
                      title="Rotate right"
                      onClick={() =>
                        setValue(field.name, (Number(values[field.name]) || 0) + 1)
                      }
                      className="flex h-12 flex-1 items-center justify-center rounded-xl border border-white/10 bg-slate-950 text-slate-200 transition hover:border-violet-400/40 hover:text-white"
                    >
                      <RotateCw className="h-5 w-5" />
                    </button>
                    <span className="min-w-14 text-center text-sm font-semibold text-slate-300">
                      {((((Number(values[field.name]) || 0) % 4) + 4) % 4) * 90}°
                    </span>
                  </div>
                ) : field.type === "file" ? (
                  <input
                    id={`field-${field.name}`}
                    type="file"
                    accept={field.accept}
                    className={`${inputClass} file:mr-3 file:rounded-lg file:border-0 file:bg-violet-600 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-white`}
                    onChange={(e) =>
                      setExtraFiles((prev) => ({
                        ...prev,
                        [field.name]: e.target.files?.[0] ?? null,
                      }))
                    }
                  />
                ) : (
                  <input
                    id={`field-${field.name}`}
                    type={
                      field.type === "number"
                        ? "number"
                        : field.type === "password"
                          ? "password"
                          : field.type === "color"
                            ? "color"
                            : "text"
                    }
                    step="any"
                    className={`${inputClass} ${field.type === "color" ? "h-12 p-1" : ""}`}
                    placeholder={field.placeholder}
                    value={String(values[field.name] ?? "")}
                    onChange={(e) =>
                      setValue(
                        field.name,
                        field.type === "number" ? Number(e.target.value) : e.target.value,
                      )
                    }
                  />
                )}

                {field.help ? (
                  <p className="mt-1.5 text-xs text-slate-500">{field.help}</p>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={run}
            disabled={!canProcess}
            className="inline-flex min-h-11 flex-[1.6] items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:text-slate-400 sm:w-48 sm:flex-none"
            style={{
              backgroundColor: 'var(--accent)',
            }}
          >
            {busy ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
            ) : (
              <FileText className="h-4 w-4 shrink-0" />
            )}
            {busy ? "Processing..." : impl.actionLabel ?? `Run ${title}`}
          </button>

          <button
            type="button"
            onClick={() => {
              setFiles([]);
              setExtraFiles({});
              setValues(defaultValues(fields));
              clearSelectedPreviews();
              clearResults();
            }}
            className="inline-flex min-h-11 flex-1 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-red-500/30 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/10 sm:w-48 sm:flex-none"
          >
            <Eraser className="h-4 w-4 shrink-0" />
            Clear
          </button>
        </div>

        {!canProcess && disabledReason ? (
          <p className="mt-2 text-xs text-amber-300">{disabledReason}</p>
        ) : null}

        {status ? <p className="mt-2 text-xs text-slate-400">{status}</p> : null}

        {error ? (
          <p className="mt-3 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            {error}
          </p>
        ) : null}
      </div>

      {/* ============ OUTPUT PANEL ============ */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-3 sm:p-5 lg:p-6">
        <div className="flex items-start justify-between gap-3 sm:items-center">
          <div>
            <h2 className="text-base font-semibold text-white sm:text-lg">Result</h2>
            <p className="mt-1 text-xs leading-4 text-slate-500">
              Your processed file appears here, ready to download.
            </p>
          </div>

          {results.length > 0 ? (
            <span className="shrink-0 rounded-full border px-2.5 py-1.5 text-[11px] font-semibold sm:px-3 sm:text-xs" style={{ borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)', background: 'var(--accent-light)', color: 'var(--accent)' }}>
              Output ready
            </span>
          ) : null}
        </div>

        <div className="mt-5">
          {results.length > 0 ? (
            <>
              <div className="rounded-xl border border-dashed bg-slate-950 p-2.5 sm:min-h-[420px] sm:p-5" style={{ borderColor: 'var(--border)' }}>
                {/* Mobile result: same compact file row style as the upload list. */}
                <div className="space-y-2 md:hidden">
                  {results.map((file) => {
                    const dot = file.name.lastIndexOf(".");
                    const base = dot > 0 ? file.name.slice(0, dot) : file.name;
                    const ext = dot > 0 ? file.name.slice(dot) : "";
                    const current = names[file.name] ?? base;
                    const outputName = `${current || base}${ext}`;

                    return (
                      <div
                        key={`mobile-result-${file.name}`}
                        className="rounded-xl border border-white/10 p-3 shadow-[0_6px_18px_rgba(0,0,0,0.12)]"
                        style={{ backgroundColor: 'var(--surface-hover)', borderColor: 'var(--border)' }}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={current}
                            spellCheck={false}
                            aria-label={`File name for ${file.name}`}
                            onChange={(event) =>
                              setNames((prev) => ({
                                ...prev,
                                [file.name]: event.target.value,
                              }))
                            }
                            className="min-h-10 w-full min-w-0 flex-1 rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm font-semibold text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-violet-500/60 focus:bg-slate-900"
                          />

                          {file.blob.type.includes("pdf") ||
                          file.blob.type.startsWith("image/") ||
                          file.blob.type.startsWith("text/") ||
                          file.blob.type.includes("html") ||
                          OFFICE_EXTENSIONS.test(outputName) ||
                          /\.(pdf|png|jpe?g|webp|txt|csv|json|xml|html?|md|docx?|xlsx?|pptx?|zip)$/i.test(outputName) ? (
                            <button
                              type="button"
                              onClick={() =>
                                openResultPreview(
                                  file.blob,
                                  file.url,
                                  outputName,
                                )
                              }
                              className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-slate-900/80 px-3.5 text-sm font-semibold text-slate-200 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white"
                            >
                              <Eye className="h-4 w-4" />
                              Preview
                            </button>
                          ) : (
                            <span className="inline-flex h-10 shrink-0 items-center rounded-lg border border-white/5 bg-slate-900/60 px-3 text-xs font-medium text-slate-500">
                              Preview unavailable
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-[11px] font-medium text-slate-500">
                          {formatFileSize(file.blob.size)}{ext}
                        </p>
                        <button
                          type="button"
                          disabled={downloading === outputName}
                          onClick={() => void handleDownload(file.blob, outputName)}
                          className="mt-2 flex min-h-10 w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 disabled:opacity-60"
                          style={{ background: '#16a34a', boxShadow: '0 4px 14px 0 rgba(22,163,74,0.4)' }}
                        >
                          <Download className="h-4 w-4" />
                          {downloading === outputName ? "Saving…" : "Download"}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Tablet/Desktop result: only render full desktop preview on web */}
                {!isNative() ? (
                  <ul className="hidden w-full grid-cols-1 gap-5 md:grid">
                    {results.map((file) => {
                      const dot = file.name.lastIndexOf(".");
                      const base = dot > 0 ? file.name.slice(0, dot) : file.name;
                      const ext = dot > 0 ? file.name.slice(dot) : "";
                      const current = names[file.name] ?? base;
                      const outputName = `${current || base}${ext}`;

                      return (
                        <li key={file.name} className="w-full">
                          <div className="mx-auto w-full max-w-[680px]">
                            <ResultFilePreview
                              blob={file.blob}
                              name={outputName}
                              url={file.url}
                            />

                            <div className="mt-3">
    <label className="mb-2 block text-xs font-medium text-slate-400">
      File name
    </label>

    <div className="flex items-center gap-2">
      <input
        type="text"
        value={current}
        spellCheck={false}
        aria-label={`File name for ${file.name}`}
        onChange={(event) =>
          setNames((prev) => ({
            ...prev,
            [file.name]: event.target.value,
          }))
        }
        className="min-h-11 w-full min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950 px-3.5 py-2.5 text-sm font-medium text-white outline-none transition focus:border-violet-500"
      />

      {file.blob.type.includes("pdf") ||
      file.blob.type.startsWith("image/") ||
      file.blob.type.startsWith("text/") ||
      file.blob.type.includes("html") ||
      OFFICE_EXTENSIONS.test(outputName) ||
      /\.(pdf|png|jpe?g|webp|txt|csv|json|xml|html?|md|docx?|xlsx?|pptx?|zip)$/i.test(outputName) ? (
        <button
          type="button"
          onClick={() => openResultPreview(file.blob, file.url, outputName)}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-slate-900/80 px-4 text-sm font-semibold text-slate-200 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white"
        >
          <Eye className="h-4 w-4" />
          Preview
        </button>
      ) : null}
    </div>

    <p className="mt-1.5 text-xs font-medium text-slate-500">
      {formatFileSize(file.blob.size)}{ext}
    </p>

    <button
      type="button"
      disabled={downloading === outputName}
      onClick={() => void handleDownload(file.blob, outputName)}
      className="mt-2 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 disabled:opacity-60" style={{ background: '#16a34a', boxShadow: '0 4px 14px 0 rgba(22,163,74,0.4)' }}
    >
      <Download className="h-4 w-4" />
      {downloading === outputName ? "Saving…" : "Download"}
    </button>
  </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            </>
          ) : (
            <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed bg-slate-950 px-5 py-10 text-center text-sm sm:min-h-[420px]" style={{ borderColor: 'var(--border)', color: 'var(--text-3)' }}>
              <div className="max-w-xs">
                <FileText className="mx-auto mb-3 h-10 w-10" style={{ color: 'var(--accent)' }} />
                <p className="font-medium" style={{ color: 'var(--text-2)' }}>No output yet</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {mobilePreview ? (
        <div
          className="fixed inset-0 z-[100] h-[100dvh] p-0 md:p-6 md:pt-16"
          style={{
            backgroundColor: 'var(--bg)',
          }}
        >
          <div
            className="flex h-full flex-col md:mx-auto md:h-[calc(100dvh-5rem)] md:w-full md:max-w-5xl overflow-hidden rounded-none md:rounded-2xl md:shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              borderWidth: '1px',
            }}
          >
            <div
              className="flex min-h-14 shrink-0 items-center justify-between border-b px-4"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
              }}
            >
              <div className="min-w-0 flex-1 pr-4">
                <p
                  className="truncate text-sm font-semibold"
                  style={{ color: 'var(--text-1)' }}
                >
                  {mobilePreview.name}
                </p>
                <p
                  className="text-xs"
                  style={{ color: 'var(--text-3)' }}
                >
                  Scrollable preview
                </p>
              </div>

              <button
                type="button"
                onClick={() => setMobilePreview(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition hover:opacity-80"
                aria-label="Close preview"
                style={{
                  borderColor: 'var(--border)',
                  backgroundColor: 'var(--surface-hover)',
                  color: 'var(--text-1)',
                }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              className="min-h-0 flex-1 overflow-hidden"
              style={{
                backgroundColor: 'var(--surface)',
              }}
            >
              <PreviewContent
                name={mobilePreview.name}
                type={mobilePreview.type}
                url={mobilePreview.url}
                kind={mobilePreview.kind}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
