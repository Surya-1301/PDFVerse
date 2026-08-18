import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-slate-950/80">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center px-0 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group inline-flex items-center gap-"
          aria-label="PDFVerse Home"
        >
          <img
            src="/logo.png"
            alt="PDFVerse"
            className="h-20 w-20 rounded-lg object-contain"
          />
        </Link>


        
        {/* Try Toolverse */}
        <a
          href="https://toolversee.pages.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto shrink-0 px-2 py-2 text-l font-medium text-violet-200 transition-colors hover:text-white sm:px-3"
        >
          Try Toolverse
          <span className="ml-1.5">↗</span>
        </a>
      </div>
    </header>
  );
}