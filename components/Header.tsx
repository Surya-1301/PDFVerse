"use client";

import Link from "next/link";
import { Menu, X, FileText, Home, Wrench, Info } from "lucide-react";
import { useState } from "react";

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "PDF Tools",
    href: "/pdf-editor",
    icon: Wrench,
  },
  {
    name: "About",
    href: "/about",
    icon: Info,
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 via-red-600 to-orange-500 shadow-lg shadow-red-500/20 transition-transform duration-200 group-hover:scale-105">
            <FileText className="h-5 w-5 text-white" />
          </div>

          <div className="leading-none">
            <div className="text-xl font-extrabold tracking-tight text-slate-900">
              PDF<span className="text-red-600">Verse</span>
            </div>

            <div className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:block">
              All-in-One PDF Editor
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-600"
              >
                <Icon className="h-4 w-4 transition group-hover:scale-105" />

                <span>{item.name}</span>
              </Link>
            );
          })}

          <Link
            href="/pdf-editor"
            className="ml-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition hover:-translate-y-0.5 hover:shadow-red-500/30"
          >
            Start Editing
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 md:hidden"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-red-50 hover:text-red-600"
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}

            <Link
              href="/pdf-editor"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center rounded-xl bg-gradient-to-r from-red-600 to-orange-500 px-4 py-3 text-sm font-bold text-white"
            >
              Start Editing
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}