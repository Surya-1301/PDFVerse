import { useEffect, useRef, useState } from "react";
import { Palette, Sun, Moon } from "lucide-react";
import { useTheme, type AccentName } from "./ThemeProvider";

const ACCENTS: {
  name: AccentName;
  label: string;
  color: string;
}[] = [
  { name: "violet", label: "Violet", color: "#8b5cf6" },
  { name: "sky", label: "Sky Blue", color: "#0ea5e9" },
  {
    name: "emerald",
    label: "Emerald",
    color: "#10b981",
  },
  { name: "amber", label: "Amber", color: "#f59e0b" },
  { name: "rose", label: "Rose", color: "#f43f5e" },
];

export default function ThemeSwitcher() {
  const { accent, mode, setAccent, toggleMode } =
    useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close the popover on click-outside or Escape.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="relative flex items-center" ref={ref}>
      {/* Palette trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Customize theme"
        aria-expanded={open}
        aria-haspopup="true"
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
        style={{
          borderColor: "var(--border)",
          background: "var(--accent-light)",
          color: "var(--accent)",
        }}
      >
        <Palette className="h-4.5 w-4.5" />
      </button>

      {/* Dropdown popover */}
      {open && (
        <div
          role="menu"
          aria-label="Theme options"
          className="absolute right-0 top-full z-50 mt-2 w-52 origin-top-right rounded-2xl border p-3 shadow-xl"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in srgb, var(--surface) 95%, transparent)",
            boxShadow:
              "0 18px 50px -12px color-mix(in srgb, var(--accent) 15%, transparent)",
          }}
        >
          {/* Accent colors */}
          <p
            className="px-1 pb-2 text-[10px] font-bold uppercase tracking-[0.12em]"
            style={{ color: "var(--text-3)" }}
          >
            Theme
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {ACCENTS.map((a) => (
              <button
                key={a.name}
                type="button"
                onClick={() => setAccent(a.name)}
                aria-label={`${a.label} theme`}
                aria-pressed={accent === a.name}
                className={`relative h-7 w-7 rounded-full transition-all duration-200 ${
                  accent === a.name
                    ? "scale-110 ring-2 ring-offset-2 ring-offset-slate-950"
                    : "hover:scale-105"
                }`}
                style={{
                  background: a.color,
                  ...(accent === a.name
                    ? {
                        ringColor: a.color,
                        boxShadow: `0 0 0 2px var(--tw-ring-offset-color), 0 0 0 4px ${a.color}`,
                      }
                    : {}),
                }}
              >
                {accent === a.name && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div
            className="my-3 h-px w-full"
            style={{ background: "var(--border)" }}
          />

          {/* Appearance */}
          <p
            className="px-1 pb-2 text-[10px] font-bold uppercase tracking-[0.12em]"
            style={{ color: "var(--text-3)" }}
          >
            Appearance
          </p>
          <button
            type="button"
            onClick={toggleMode}
            className="flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-1)",
            }}
          >
            {mode === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            {mode === "dark" ? "Light mode" : "Dark mode"}
          </button>
        </div>
      )}
    </div>
  );
}
