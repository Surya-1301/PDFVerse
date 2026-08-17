import { Link } from "@tanstack/react-router";
import { FileText, Flag, Mail, ShieldCheck } from "lucide-react";

const footerLinks = [
  { label: "Privacy", href: "/privacy" as const, icon: ShieldCheck },
  { label: "Terms", href: "/terms" as const, icon: FileText },
  { label: "Contact", href: "/contact" as const, icon: Mail },
  { label: "Abuse", href: "/report-abuse" as const, icon: Flag },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-base font-semibold tracking-tight text-white transition hover:text-violet-200"
            >
              <span>PDFVerse</span>
            </Link>
            <p className="mt-1 text-xs text-slate-600">
              © {new Date().getFullYear()} PDFVerse. All rights reserved.
            </p>
          </div>

          {/* Footer Navigation */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {footerLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-300"
                >
                  <Icon className="h-4 w-4 text-slate-600 transition group-hover:text-violet-300" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </footer>
  );
}
