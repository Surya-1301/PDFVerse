import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-slate-950/80">
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group inline-flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          aria-label="PDFVerse Home"
        >
          <img
            src="/logo.png"
            alt="PDFVerse"
            className="h-16 w-16 rounded-lg object-contain"
          />
        </Link>

        <a
          href="https://toolversee.pages.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto shrink-0 rounded-lg px-2 py-2 text-sm font-medium text-violet-200 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:px-3"
        >
          Try Toolverse
          <span
            className="ml-1.5"
            aria-hidden="true"
          >
            ↗
          </span>
        </a>
      </div>
    </header>
  );
}
