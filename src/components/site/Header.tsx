import { Link } from "@tanstack/react-router";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";

export default function Header() {
  return (
    <header
      className="relative z-50 border-b backdrop-blur-xl backdrop-saturate-150"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in srgb, var(--bg) 80%, transparent)",
      }}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
          aria-label="PDFVerse Home"
        >
          <img
            src="/logo.png"
            alt="PDFVerse"
            className="h-20 w-20 rounded-lg object-contain"
          />
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <ThemeSwitcher />
          <a
            href="https://toolversee.pages.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
            style={{
              background: "var(--accent-light)",
              color: "var(--accent)",
            }}
          >
            Try Toolverse
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
