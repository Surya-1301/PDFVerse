import { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { pdfTools } from "@/lib/pdfTools";

const categoryLabels: Record<string, string> = {
  edit: "EDIT PDF",
  organize: "ORGANIZE PDF",
  convertToPdf: "CONVERT TO PDF",
  convertFromPdf: "CONVERT FROM PDF",
  security: "PDF SECURITY",
};

interface ToolSearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ToolSearchModal({ open, onClose }: ToolSearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      // slight delay so the input is in the DOM
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // close on backdrop click
  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) onClose();
  };

  const results = useMemo(() => {
    if (!query.trim()) return pdfTools;
    const q = query.toLowerCase();

    // Score matches by relevance so typed letters surface the
    // most appropriate tools first:
    //   0 → title starts with the query
    //   1 → title contains the query
    //   2 → description / category contains the query
    const scored = pdfTools
      .map((t) => {
        const title = t.title.toLowerCase();
        const description = t.description.toLowerCase();
        const category = t.category.toLowerCase();

        let score = -1;
        if (title.startsWith(q)) score = 0;
        else if (title.includes(q)) score = 1;
        else if (description.includes(q) || category.includes(q)) score = 2;

        return { tool: t, score };
      })
      .filter((entry) => entry.score !== -1)
      .sort((a, b) => a.score - b.score || a.tool.title.localeCompare(b.tool.title));

    return scored.map((entry) => entry.tool);
  }, [query]);

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      onClick={handleBackdrop}
      className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/50 backdrop-blur-sm pt-[12vh] sm:pt-[16vh]"
    >
      <div
        className="relative w-full max-w-lg mx-4 overflow-hidden rounded-2xl shadow-2xl border"
        style={{
          background: "var(--bg)",
          borderColor: "var(--border)",
        }}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 border-b px-4 py-3"
          style={{ borderColor: "var(--border)" }}
        >
          <Search size={18} className="shrink-0 opacity-50" style={{ color: "var(--text-2)" }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-50"
            style={{ color: "var(--text-1)" }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="search-clear-btn rounded-md p-1 transition-colors"
              aria-label="Clear search"
            >
              <X size={14} className="opacity-60" style={{ color: "var(--text-2)" }} />
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-md p-1 text-xs font-medium opacity-50"
            style={{ color: "var(--text-3)" }}
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto overscroll-contain p-2">
          {results.length === 0 && (
            <p className="py-8 text-center text-sm opacity-50" style={{ color: "var(--text-2)" }}>
              No tools match "<span className="font-medium">{query}</span>"
            </p>
          )}

          {results.map((tool) => {
            const Icon = tool.icon;
            const dest =
              tool.slug === "pdf-editor" ? "/pdf-editor" : `/pdf/${tool.slug}`;
            return (
              <Link
                key={tool.slug}
                to={dest}
                onClick={onClose}
                className="search-result-item flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors"
                style={{ color: "var(--text-1)" }}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    background:
                      "color-mix(in srgb, var(--accent) 12%, transparent)",
                  }}
                >
                  <Icon size={16} style={{ color: "var(--accent)" }} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block truncate font-medium">{tool.title}</span>
                  <span
                    className="block truncate text-xs opacity-60"
                    style={{ color: "var(--text-2)" }}
                  >
                    {tool.description}
                  </span>
                </span>
                <span
                  className="hidden sm:inline-block shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide opacity-60"
                  style={{
                    background:
                      "color-mix(in srgb, var(--accent) 8%, transparent)",
                    color: "var(--accent)",
                  }}
                >
                  {categoryLabels[tool.category]}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
