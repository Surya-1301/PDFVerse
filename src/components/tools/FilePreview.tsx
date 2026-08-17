import { useEffect, useState } from "react";
import { Eye, X } from "lucide-react";

type PreviewTarget = { name: string; type: string; url: string };

/** Modal preview for PDFs, images and text-ish files. */
export function PreviewModal({
  target,
  onClose,
}: {
  target: PreviewTarget | null;
  onClose: () => void;
}) {
  const [text, setText] = useState<string | null>(null);

  const kind = !target
    ? "none"
    : target.type.includes("pdf") || target.name.toLowerCase().endsWith(".pdf")
      ? "pdf"
      : target.type.startsWith("image/")
        ? "image"
        : /\.(txt|csv|json|md|html?)$/i.test(target.name) ||
            target.type.startsWith("text/")
          ? "text"
          : "other";

  useEffect(() => {
    if (!target) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [target, onClose]);

  useEffect(() => {
    let alive = true;

    setText(null);

    if (target && kind === "text") {
      fetch(target.url)
        .then((r) => r.text())
        .then((t) => {
          if (alive) setText(t.slice(0, 200000));
        })
        .catch(() => {
          if (alive) setText("Unable to read this file.");
        });
    }

    return () => {
      alive = false;
    };
  }, [target, kind]);

  if (!target) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-center bg-black/80 p-0 sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="flex h-[100dvh] w-full max-w-full flex-col overflow-hidden bg-slate-950 sm:h-[90dvh] sm:max-w-5xl sm:rounded-2xl sm:border sm:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-3 py-3 sm:px-4">
          <p className="min-w-0 flex-1 truncate text-sm font-semibold text-white">
            {target.name}
          </p>

          <button
            type="button"
            aria-label="Close preview"
            onClick={onClose}
            className="shrink-0 rounded-lg p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5 sm:h-4 sm:w-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden bg-slate-900">
          {kind === "pdf" ? (
            <iframe
              title={target.name}
              src={target.url}
              className="block h-full w-full border-0"
            />
          ) : kind === "image" ? (
            <div className="flex h-full w-full items-center justify-center overflow-auto p-3 sm:p-4">
              <img
                src={target.url}
                alt={`Preview of ${target.name}`}
                className="h-auto max-h-full max-w-full object-contain"
              />
            </div>
          ) : kind === "text" ? (
            <pre className="h-full w-full overflow-auto whitespace-pre-wrap break-words p-3 font-mono text-xs text-slate-200 sm:p-4">
              {text ?? "Loading…"}
            </pre>
          ) : (
            <div className="flex h-full items-center justify-center p-6 text-center text-sm text-slate-400">
              Preview isn’t available for this file type — download it to open
              in its app.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function PreviewButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10 sm:min-h-0 sm:px-2.5 sm:py-1 sm:text-[11px]"
    >
      <Eye className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
      Preview
    </button>
  );
}

export type { PreviewTarget };