import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  Download,
  Eraser,
  Eye,
  FileText,
  Loader2,
  Upload,
  X,
} from "lucide-react";

import { getToolImpl, type Field, type ToolValues } from "@/lib/pdf/tools";
import type { ToolFile } from "@/lib/pdf/toolkit";
import { formatFileSize } from "@/lib/formatFileSize";


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
  "http://localhost:4000";

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

export async function convertOfficeToPdfPreview(
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
  );

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
      // Keep fallback message.
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
  const pdfUrl =
    kind === "pdf"
      ? `${url}${url.includes("#") ? "&" : "#"}toolbar=0&navpanes=0&scrollbar=0&view=FitH`
      : url;

  if (kind === "pdf") {
    return (
      <iframe
        title={`Preview of ${name}`}
        src={pdfUrl}
        loading="lazy"
        className="h-full w-full border-0 bg-white"
      />
    );
  }

  if (kind === "image") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white p-3">
        <img
          src={url}
          alt={`Preview of ${name}`}
          className="h-full w-full object-contain"
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
    return (
      <iframe
        title={`Text preview of ${name}`}
        src={url}
        className="h-full w-full border-0 bg-white p-2"
        sandbox=""
      />
    );
  }

  if (kind === "html") {
    return (
      <iframe
        title={`HTML preview of ${name}`}
        src={url}
        className="h-full w-full border-0 bg-white"
        sandbox="allow-same-origin"
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-slate-950 px-6 text-center">
      <FileText className="h-12 w-12 text-violet-300" />
      <div>
        <p className="font-semibold text-slate-100">
          Preview unavailable
        </p>
        <p className="mt-1 text-xs text-slate-500">
          {name} is ready to process.
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
    <div className="mx-auto w-full max-w-[680px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
      <div className="flex h-[220px] w-full items-center justify-center overflow-hidden bg-[#171a22] sm:h-[280px] lg:h-[320px]">
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

/** Desktop/tablet result preview. Office files are converted to PDF so the
 *  preview renders directly in the box (no separate Preview button needed). */

// Dedupe concurrent office→PDF conversions for the same result blob.
// React StrictMode double-invokes effects in dev, which would otherwise
// spawn two LibreOffice processes at once (profile lock → "Command failed").
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
        <div className="mx-auto w-full max-w-[680px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
          <div className="flex h-[220px] w-full items-center justify-center gap-3 bg-[#171a22] sm:h-[280px] lg:h-[320px]">
            <Loader2 className="h-6 w-6 animate-spin text-violet-300" />
            <p className="text-sm font-medium text-slate-300">
              Generating preview…
            </p>
          </div>
        </div>
      );
    }

    if (converted.error) {
      return (
        <div className="mx-auto w-full max-w-[680px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
          <div className="flex h-[220px] w-full flex-col items-center justify-center gap-2 bg-[#171a22] px-6 text-center sm:h-[280px] lg:h-[320px]">
            <FileText className="h-9 w-9 text-violet-300" />
            <p className="text-xs font-semibold text-slate-200">
              Preview unavailable
            </p>
            <p className="max-w-[300px] text-[11px] leading-4 text-slate-500">
              {converted.error}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="mx-auto w-full max-w-[680px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
        <div className="flex h-[220px] w-full items-center justify-center overflow-hidden bg-[#171a22] sm:h-[280px] lg:h-[320px]">
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
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white">
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
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-300">
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

                    {isLoadingPreview ? (
                      <span className="inline-flex h-9 shrink-0 items-center rounded-lg border border-violet-500/20 bg-violet-500/10 px-2.5 text-[11px] font-medium text-violet-200">
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
                        className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-white/10 bg-slate-900/80 px-2.5 text-xs font-semibold text-slate-200 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white"
                      >
                        <Eye className="h-4 w-4" />
                        Preview
                      </button>
                    ) : (
                      <span className="inline-flex h-9 shrink-0 items-center rounded-lg border border-white/5 bg-slate-900/60 px-2.5 text-[11px] font-medium text-slate-500">
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
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-slate-300 transition hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
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

                    {/* Preview — on mobile, tapping it opens a full-screen PDF viewer. */}
                    <div
                      className="block w-full text-left"
                    >
                      <div
                        className="h-[145px] w-full overflow-hidden bg-[#171a22] md:h-[155px] lg:h-[165px]"
                        onDoubleClick={() => {
                          if (!previewUrl) return;
                          setMobilePreview({
                            name: file.name,
                            url: previewUrl,
                            type: file.type,
                            kind: previewKind,
                          });
                        }}
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
                    </div>
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
                  <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-200">
                    <input
                      id={`field-${field.name}`}
                      type="checkbox"
                      className="h-4 w-4 accent-violet-500"
                      checked={Boolean(values[field.name])}
                      onChange={(e) => setValue(field.name, e.target.checked)}
                    />
                    Enabled
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
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:hover:bg-slate-700"
          >
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FileText className="h-4 w-4" />
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
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-red-500/30 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
          >
            <Eraser className="h-4 w-4" />
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
            <p className="mt-1 max-w-[240px] text-xs leading-4 text-slate-500 sm:max-w-none">
              Your processed file appears here, ready to download.
            </p>
          </div>

          {results.length > 0 ? (
            <span className="shrink-0 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-300 sm:px-3 sm:text-xs">
              Output ready
            </span>
          ) : null}
        </div>

        <div className="mt-5">
          {results.length > 0 ? (
            <>
              <div className="rounded-xl border border-dashed border-white/10 bg-slate-900/40 p-2.5 sm:min-h-[420px] sm:p-5">
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
                        className="rounded-xl border border-white/10 bg-slate-950/80 p-3 shadow-[0_6px_18px_rgba(0,0,0,0.12)]"
                      >
                        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                          <div className="min-w-0">
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
                              className="min-h-10 w-full min-w-0 rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm font-semibold text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-violet-500/60 focus:bg-slate-900"
                            />
                            <p className="mt-1 text-[11px] font-medium text-slate-500">
                              {formatFileSize(file.blob.size)}{ext}
                            </p>
                          </div>

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
                              className="inline-flex h-10 shrink-0 -translate-y-2.5 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-slate-900/80 px-3.5 text-sm font-semibold text-slate-200 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white"
                            >
                              <Eye className="h-4 w-4" />
                              Preview
                            </button>
                          ) : (
                            <span className="inline-flex h-10 shrink-0 -translate-y-2.5 items-center rounded-lg border border-white/5 bg-slate-900/60 px-3 text-xs font-medium text-slate-500">
                              Preview unavailable
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Tablet/Desktop result: keep the existing full preview and controls. */}
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

                          <div className="mt-3 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
  <div className="min-w-0">
    <label className="mb-2 block text-xs font-medium text-slate-400">
      File name
    </label>

    <input
      type="text"
      value={current}
      spellCheck={false}
      onChange={(event) =>
        setNames((prev) => ({
          ...prev,
          [file.name]: event.target.value,
        }))
      }
      className="min-h-11 w-full rounded-xl border border-white/10 bg-slate-950 px-3.5 py-2.5 text-sm font-medium text-white outline-none transition focus:border-violet-500"
    />

    <p className="mt-1.5 text-xs font-medium text-slate-500">
      {formatFileSize(file.blob.size)}{ext}
    </p>
  </div>

  <a
    href={file.url}
    download={outputName}
    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-950/20 transition hover:bg-emerald-500 sm:mt-6 sm:w-auto sm:min-w-[170px]"
  >
    <Download className="h-4 w-4" />
    Download
  </a>
</div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

                      {results.length > 0 && (
          <a
            href={results[0].url}
            download={(() => {
              const file = results[0];
              const dot = file.name.lastIndexOf(".");
              const base = dot > 0 ? file.name.slice(0, dot) : file.name;
              const ext = dot > 0 ? file.name.slice(dot) : ".pdf";
              const current = names[file.name] ?? base;
              return `${current || base}${ext}`;
            })()}
            className="mb-3 mt-4 flex min-h-11 w-full max-w-[340px] items-center justify-center gap-2 self-start rounded-xl bg-emerald-600 px-5 py-2.5 text-base font-semibold text-white shadow-lg shadow-emerald-950/20 transition hover:bg-emerald-500 md:hidden"
          >
            <Download className="h-5 w-5" />
            Download
          </a>
        )}

<button
                type="button"
                onClick={() => {
                  results.forEach((r) => URL.revokeObjectURL(r.url));
                  setFiles([]);
                  setResults([]);
                  setNames({});
                  clearSelectedPreviews();
                  setStatus("");
                  setError("");
                }}
                className="mt-1 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-violet-500/30 hover:bg-white/10 sm:mt-5 sm:min-h-12"
              >
                Process another file
              </button>
            </>
          ) : (
            <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed border-white/10 bg-slate-900/40 px-5 py-10 text-center text-sm text-slate-500 sm:min-h-[420px]">
              <div className="max-w-xs">
                <FileText className="mx-auto mb-3 h-10 w-10" />
                <p className="font-medium text-slate-300">No output yet</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {mobilePreview ? (
        <div className="fixed inset-0 z-[100] h-[100dvh] bg-[#202124] md:bg-[#05070fCC] md:p-6 md:pt-20">
          <div className="flex h-full flex-col md:mx-auto md:h-[calc(100dvh-6rem)] md:w-full md:max-w-5xl md:overflow-hidden md:rounded-2xl md:border md:border-white/10 md:bg-[#0b0d18] md:shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            <div className="flex min-h-16 shrink-0 items-center gap-3 border-b border-white/10 bg-[#0b0d18] px-3">
              <button
                type="button"
                onClick={() => setMobilePreview(null)}
                className="absolute right-5 top-3 z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition hover:bg-white/10"
                aria-label="Close PDF preview"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {mobilePreview.name}
                </p>
                <p className="text-xs text-slate-500">
                  File preview
                </p>
              </div>
            </div>

            <div className="min-h-0 flex-1 bg-[#202124] p-1 md:bg-[#171a22] md:p-4">
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
