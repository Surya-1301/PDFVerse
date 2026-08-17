"use client";

import { useMemo, useRef, useState } from "react";
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
  const [preview, setPreview] = useState<{
    name: string;
    url: string;
    mime: string;
    revokeOnClose: boolean;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);





  if (!impl) {
    return (
      <p className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center text-sm text-slate-400">
        This tool is not available yet.
      </p>
    );
  }

  const setValue = (name: string, value: string | number | boolean) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  const closePreview = () => {
    if (preview?.revokeOnClose) {
      URL.revokeObjectURL(preview.url);
    }
    setPreview(null);
  };

  const openFilePreview = (file: File) => {
    closePreview();
    const url = URL.createObjectURL(file);
    setPreview({
      name: file.name,
      url,
      mime: file.type || "",
      revokeOnClose: true,
    });
  };

  const openResultPreview = (file: ToolFile & { url: string }) => {
    closePreview();
    setPreview({
      name: file.name,
      url: file.url,
      mime: file.blob.type || "", revokeOnClose: false,
    });
  };

  const clearResults = () => {
    closePreview();
    results.forEach((r) => URL.revokeObjectURL(r.url));
    setResults([]);
    setNames({});
    setError("");
    setStatus("");
  };

  const onPick = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    const picked = Array.from(list);
    setFiles((prev) => (impl.multiple ? [...prev, ...picked] : picked.slice(0, 1)));
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
        progress: (message) => setStatus(message),
      });
      setResults(out.map((file) => ({ ...file, url: URL.createObjectURL(file.blob) })));
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

  const canProcess = !busy && files.length > 0;
  const disabledReason = files.length === 0 ? "Upload a file first." : "";

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      {/* ============ TOOL PANEL ============ */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white">
            {icon ?? <FileText className="h-5 w-5" />}
          </div>
          <div>
            <h2 className="font-semibold text-white">{title}</h2>
            <p className="text-sm text-slate-400">{description}</p>
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
            <Upload className="h-5 w-5" />
          </span>
          <span className="text-base font-semibold text-white">
            Click to browse or drop {impl.multiple ? "files" : "a file"} here
          </span>
          <span className="text-xs text-slate-500">
            Everything runs in your browser — nothing is uploaded to a server.
          </span>
        </button>

        {files.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm"
              >
                <span className="truncate text-slate-200">{file.name}</span>
                <span className="flex shrink-0 items-center gap-2 text-xs text-slate-500">
                  {formatFileSize(file.size)}
                  <button
                    type="button"
                    onClick={() => openFilePreview(file)}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-violet-500/20 bg-violet-500/10 px-2.5 text-violet-200 transition hover:bg-violet-500/20"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Preview
                  </button>
                  <button
                    type="button"
                    aria-label={`Remove ${file.name}`}
                    onClick={() => {
                      setFiles((prev) => prev.filter((_, i) => i !== index));
                      clearResults();
                    }}
                    className="text-slate-400 transition hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        {fields.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-white">Result</h2>
            <p className="mt-1 text-xs text-slate-500">
              Your processed file appears here, ready to download.
            </p>
          </div>

          {results.length > 0 ? (
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-200">
              Output ready
            </span>
          ) : null}
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950 p-4">
          {results.length > 0 ? (
            <>
              <ul className="space-y-3">
                {results.map((file) => {
                  const dot = file.name.lastIndexOf(".");
                  const base = dot > 0 ? file.name.slice(0, dot) : file.name;
                  const ext = dot > 0 ? file.name.slice(dot) : "";
                  const current = names[file.name] ?? base;

                  return (
                    <li
                      key={file.name}
                      className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"
                    >
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-[11px] font-semibold text-violet-200">
                          {(ext || ".file").replace(".", "").toUpperCase()}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
                          {formatFileSize(file.blob.size)}
                        </span>
                      </div>

                      <label className="mb-1.5 block text-xs font-medium text-slate-400">
                        File name
                      </label>

                      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
                        <input
                          type="text"
                          value={current}
                          spellCheck={false}
                          onChange={(event) =>
                            setNames((prev) => ({ ...prev, [file.name]: event.target.value }))
                          }
                          className="min-h-11 w-full min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950 px-3.5 py-2.5 text-sm font-medium text-white outline-none transition focus:border-violet-500"
                        />

                        <button
                          type="button"
                          onClick={() => openResultPreview(file)}
                          className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-2.5 text-sm font-semibold text-violet-100 transition hover:bg-violet-500/20 sm:w-auto"
                        >
                          <Eye className="h-4 w-4" />
                          Preview
                        </button>

                        <a
                          href={file.url}
                          download={`${current || base}${ext}`}
                          className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500 sm:w-auto"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <button
                type="button"
                onClick={() => {
                  setFiles([]);
                  clearResults();
                }}
                className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
              >
                Process another file
              </button>
            </>
          ) : (
            <div className="flex min-h-[360px] items-center justify-center rounded-xl border border-dashed border-white/10 bg-slate-900/40 text-center text-sm text-slate-500">
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

      {preview ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Preview ${preview.name}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePreview();
          }}
        >
          <div className="flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b10] shadow-2xl">
            <div className="flex min-h-14 items-center justify-between gap-3 border-b border-white/10 px-4 sm:px-5">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{preview.name}</p>
                <p className="text-[11px] text-slate-500">Preview</p>
              </div>
              <button
                type="button"
                onClick={closePreview}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition hover:bg-white/10 hover:text-white"
                aria-label="Close preview"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-auto bg-slate-950 p-2 sm:p-4">
              {preview.mime === "application/pdf" ||
              preview.name.toLowerCase().endsWith(".pdf") ? (
                <iframe
                  src={preview.url}
                  title={`Preview ${preview.name}`}
                  className="h-full min-h-[70vh] w-full rounded-xl border border-white/10 bg-white"
                />
              ) : preview.mime.startsWith("image/") ||
                /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(preview.name) ? (
                <div className="flex min-h-full items-center justify-center">
                  <img
                    src={preview.url}
                    alt={`Preview ${preview.name}`}
                    className="max-h-full max-w-full rounded-xl object-contain"
                  />
                </div>
              ) : preview.mime.startsWith("text/") ||
                /\.(txt|csv|json|html|xml)$/i.test(preview.name) ? (
                <iframe
                  src={preview.url}
                  title={`Preview ${preview.name}`}
                  className="h-full min-h-[70vh] w-full rounded-xl border border-white/10 bg-white"
                />
              ) : (
                <div className="flex min-h-full items-center justify-center p-6 text-center">
                  <div className="max-w-md">
                    <FileText className="mx-auto h-12 w-12 text-violet-300" />
                    <h3 className="mt-4 text-lg font-semibold text-white">
                      Preview unavailable for this file type
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      The file has been selected/processed successfully. Use Download to open it
                      in the appropriate application.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
