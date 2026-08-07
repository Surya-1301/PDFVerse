import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group inline-flex items-center">
          <span className="text-2xl font-black tracking-tight sm:text-3xl">
            <span className="text-white drop-shadow-[0_0_16px_rgba(255,255,255,0.12)]">
              PDF
            </span>
            <span className="ml-1.5 bg-gradient-to-r from-red-500 via-red-600 to-rose-500 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(239,68,68,0.25)]">
              Verse
            </span>
          </span>
        </Link>
      </div>
    </header>
  );
}