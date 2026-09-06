import { Link } from "@tanstack/react-router";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";

export default function Header() {
  return (
    <header
      className="relative z-50 border-b"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in srgb, var(--bg) 80%, transparent)",
      }}
    >
      <div className="mx-auto flex h-15 w-full max-w-7xl items-center justify-between gap-3 py-0 pl-0 pr-0 lg:px-8">
        <Link
          to="/"
          className="group inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
          aria-label="PDFVerse Home"
        >
          <img
            src="/logo.png"
            alt="PDFVerse"
            className="h-20 w-20 rounded-lg object-contain logo-dark"
          />
          <img
            src="/logo-light.png"
            alt="PDFVerse"
            className="h-20 w-20 rounded-lg object-contain logo-light"
          />
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <ThemeSwitcher />
          <a
            href="https://toolversee.pages.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-lg px-2 py-2 text-sm font-medium transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:px-3"
            style={{ color: 'var(--header-accent-link)' }}
          >
            Try Toolverse
            <span className="ml-1.5" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
