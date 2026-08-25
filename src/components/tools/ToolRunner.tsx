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

function InlineFilePreview({
  name,
  type,
  url,
}: {
  name: string;
  type: string;
  url: string;
}) {
  const isPdf = type.includes("pdf") || name.toLowerCase().endsWith(".pdf");
  const isImage = type.startsWith("image/");

  const pdfUrl = isPdf
    ? `${url}${url.includes("#") ? "&" : "#"}toolbar=0&navpanes=0&scrollbar=0&view=FitH`
    : url;

  return (
    <div className="mx-auto w-full max-w-[680px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
      <div className="flex h-[220px] w-full items-center justify-center overflow-hidden bg-[#171a22] sm:h-[280px] lg:h-[320px]">
        {isPdf ? (
          <iframe
            title={`Preview of ${name}`}
            src={pdfUrl}
            loading="lazy"
            className="h-full w-full border-0 bg-white"
          />
        ) : isImage ? (
          <div className="flex h-full w-full items-center justify-center bg-white p-3">
            <img
              src={url}
              alt={`Preview of ${name}`}
              className="h-full w-full object-contain"
            />
          </div>
        ) : (
          <iframe
            title={`Preview of ${name}`}
            src={url}
            loading="lazy"
            className="h-full w-full border-0 bg-white"
          />
        )}
      </div>
    </div>

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
  const [mobilePreview, setMobilePreview] = useState<{
    name: string;
    url: string;
  } | null>(null);
  const selectedPreviewUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    return () => {
      selectedPreviewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const setSelectedUrls = (urls: string[]) => {
    selectedPreviewUrlsRef.current = urls;
    setSelectedPreviewUrls(urls);
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
  };

  const onPick = (list: FileList | null) => {
    if (!list || list.length === 0) return;

    const picked = Array.from(list);
    const nextFiles = impl.multiple
      ? [...files, ...picked]
      : picked.slice(0, 1);

    clearResults();

    if (impl.multiple) {
      const urls = picked.map((file) => URL.createObjectURL(file));
      setFiles(nextFiles);
      setSelectedUrls([...selectedPreviewUrlsRef.current, ...urls]);
    } else {
      selectedPreviewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      const url = URL.createObjectURL(picked[0]);
      setFiles(nextFiles);
      setSelectedUrls([url]);
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
    (files.length > 0 || pastedHtml.length > 0);

  const disabledReason =
    files.length === 0 && !pastedHtml
      ? slug === "html-to-pdf"
        ? "Upload an HTML file or paste HTML first."
        : "Upload a file first."
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
            onPick(event.target.files);
            event.target.value = "";
          }}
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            onPick(event.dataTransfer.files);
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
              ? "Processed securely on the PDFVerse conversion server."
              : "Processed locally in your browser."}
          </span>
        </button>

        {files.length > 0 ? (
          <div className="mt-4 sm:mt-5">
            {/* Mobile: compact file rows like the requested design. */}
            <div className="space-y-3 md:hidden">
              {files.map((file, index) => {
                const previewUrl = selectedPreviewUrls[index];

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

                    <button
                      type="button"
                      disabled={!previewUrl}
                      onClick={() => {
                        if (!previewUrl) return;
                        setMobilePreview({
                          name: file.name,
                          url: previewUrl,
                        });
                      }}
                      className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-white/10 bg-slate-900/80 px-2.5 text-xs font-semibold text-slate-200 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Eye className="h-4 w-4" />
                      Preview
                    </button>

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
                        selectedPreviewUrlsRef.current = nextUrls;
                        setSelectedPreviewUrls(nextUrls);

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
                          selectedPreviewUrlsRef.current = nextUrls;
                          setSelectedPreviewUrls(nextUrls);

                          setFiles((prev) => prev.filter((_, i) => i !== index));
                          clearResults();
                        }}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-slate-900 text-slate-300 transition hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Preview — on mobile, tapping it opens a full-screen PDF viewer. */}
                    <button
                      type="button"
                      className="block w-full cursor-default text-left md:cursor-default"
                      onClick={() => {
                        if (window.innerWidth < 768 && previewUrl) {
                          setMobilePreview({
                            name: file.name,
                            url: previewUrl,
                          });
                        }
                      }}
                      aria-label={`Open preview of ${file.name}`}
                    >
                      <div className="h-[145px] w-full overflow-hidden bg-[#171a22] md:h-[155px] lg:h-[165px]">
                        {previewUrl ? (
                          file.type.includes("pdf") ||
                          file.name.toLowerCase().endsWith(".pdf") ? (
                            <iframe
                              title={`Preview of ${file.name}`}
                              src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                              className="pointer-events-none block h-full w-full border-0 bg-white"
                            />
                          ) : file.type.startsWith("image/") ? (
                            <div className="flex h-full w-full items-center justify-center bg-white">
                              <img
                                src={previewUrl}
                                alt={`Preview of ${file.name}`}
                                className="pointer-events-none h-full w-full object-contain"
                              />
                            </div>
                          ) : (
                            <iframe
                              title={`Preview of ${file.name}`}
                              src={previewUrl}
                              className="pointer-events-none block h-full w-full border-0 bg-white"
                            />
                          )
                        ) : null}
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

                          <button
                            type="button"
                            onClick={() =>
                              setMobilePreview({
                                name: outputName,
                                url: file.url,
                              })
                            }
                            className="inline-flex h-10 shrink-0 -translate-y-2.5 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-slate-900/80 px-3.5 text-sm font-semibold text-slate-200 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white"
                          >
                            <Eye className="h-4 w-4" />
                            Preview
                          </button>
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
                          <InlineFilePreview
                            name={outputName}
                            type={file.blob.type}
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
    Download PDF
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
            Download PDF
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
                <p className="mt-1 leading-6">
                  Upload a file, choose your settings, and process it. Your result will appear
                  here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {mobilePreview ? (
        <div className="fixed inset-0 z-[100] h-[100dvh] bg-[#202124] md:hidden">
          <div className="flex h-full flex-col">
            <div className="flex min-h-16 shrink-0 items-center gap-3 border-b border-white/10 bg-[#0b0d18] px-3">
              <button
                type="button"
                onClick={() => setMobilePreview(null)}
                className="absolute right-5 top-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition hover:bg-white/10"
                aria-label="Close PDF preview"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {mobilePreview.name}
                </p>
                <p className="text-xs text-slate-500">PDF preview</p>
              </div>
            </div>

            <div className="min-h-0 flex-1 bg-[#202124] p-1">
              <iframe
                title={`Full preview of ${mobilePreview.name}`}
                src={`${mobilePreview.url}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
                className="h-full w-full border-0 bg-white"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
