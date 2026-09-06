import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type AccentName =
  | "violet"
  | "sky"
  | "emerald"
  | "amber"
  | "rose";

export type ThemeMode = "dark" | "light";

interface ThemeContextValue {
  accent: AccentName;
  mode: ThemeMode;
  setAccent: (a: AccentName) => void;
  toggleMode: () => void;
}

const ACCENTS: AccentName[] = [
  "violet",
  "sky",
  "emerald",
  "amber",
  "rose",
];

const ACCENT_LABELS: Record<AccentName, string> = {
  violet: "Violet",
  sky: "Sky Blue",
  emerald: "Emerald",
  amber: "Amber",
  rose: "Rose",
};

const STORAGE_KEY_ACCENT = "pv-accent";
const STORAGE_KEY_MODE = "pv-mode";

const ThemeContext = createContext<ThemeContextValue>({
  accent: "violet",
  mode: "dark",
  setAccent: () => {},
  toggleMode: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function useAccentColor(): string {
  const { accent } = useTheme();
  const colors: Record<AccentName, string> = {
   violet: "#8b5cf6",
    sky: "#0ea5e9",
    emerald: "#10b981",
    amber: "#f59e0b",
    rose: "#f43f5e",
  };
  return colors[accent];
}

export function getAccentHex(a: AccentName): string {
  const map: Record<AccentName, string> = {
   violet: "#8b5cf6",
    sky: "#0ea5e9",
    emerald: "#10b981",
    amber: "#f59e0b",
    rose: "#f43f5e",
  };
  return map[a];
}

export default function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  // Read localStorage synchronously on first render so the correct theme
  // is in state BEFORE the first paint — no dark→light flash.
  function getInitialMode(): ThemeMode {
    if (typeof localStorage === "undefined") return "dark";
    try {
      const v = localStorage.getItem(STORAGE_KEY_MODE);
      if (v === "light" || v === "dark") return v as ThemeMode;
    } catch {}
    return "dark";
  }
  function getInitialAccent(): AccentName {
    if (typeof localStorage === "undefined") return "violet";
    try {
      const v = localStorage.getItem(STORAGE_KEY_ACCENT);
      if (v && ACCENTS.includes(v as AccentName)) return v as AccentName;
    } catch {}
    return "violet";
  }

  const [accent, setAccentState] =
    useState<AccentName>(getInitialAccent);
  const [mode, setMode] =
    useState<ThemeMode>(getInitialMode);

  // Apply initial theme to <html> on mount (state is already correct)
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-accent", accent);
    root.setAttribute("data-theme", mode);

    // Update <meta theme-color> for mobile browsers
    const meta = document.querySelector(
      'meta[name="theme-color"]',
    );
    if (meta) {
      meta.setAttribute(
        "content",
        mode === "dark" ? "#020617" : "#f8fafc",
      );
    }

    // Persist so other tabs stay in sync
    try {
      localStorage.setItem(STORAGE_KEY_ACCENT, accent);
      localStorage.setItem(STORAGE_KEY_MODE, mode);
    } catch {}
  }, []);

  // Handle user-triggered theme changes (theme switcher clicks)
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-accent", accent);
    root.setAttribute("data-theme", mode);

    const meta = document.querySelector(
      'meta[name="theme-color"]',
    );
    if (meta) {
      meta.setAttribute(
        "content",
        mode === "dark" ? "#020617" : "#f8fafc",
      );
    }

    try {
      localStorage.setItem(STORAGE_KEY_ACCENT, accent);
      localStorage.setItem(STORAGE_KEY_MODE, mode);
    } catch {}
  }, [accent, mode]);

  const setAccent = (a: AccentName) =>
    setAccentState(a);
  const toggleMode = () =>
    setMode((m) =>
      m === "dark" ? "light" : "dark",
    );

  return (
    <ThemeContext.Provider
      value={{ accent, mode, setAccent, toggleMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
