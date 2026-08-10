import Link from "next/link";
import {
  FileText,
  Mail,
  ShieldCheck,
  Flag,
  Heart,
} from "lucide-react";

const footerLinks = [
  {
    label: "Privacy Policy",
    href: "/privacy",
    icon: ShieldCheck,
  },
  {
    label: "Terms",
    href: "/terms",
    icon: FileText,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Mail,
  },
  {
    label: "Report Abuse",
    href: "/report-abuse",
    icon: Flag,
  },
];

const toolLinks = [
  {
    label: "PDF Editor",
    href: "/pdf-editor",
  },
  {
    label: "Merge PDF",
    href: "/pdf-editor?tool=merge",
  },
  {
    label: "Split PDF",
    href: "/pdf-editor?tool=split",
  },
  {
    label: "Compress PDF",
    href: "/pdf-editor?tool=compress",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Main Footer */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 via-red-600 to-orange-500 shadow-lg shadow-red-500/20">
                <FileText className="h-6 w-6 text-white" />
              </div>

              <div>
                <div className="text-2xl font-extrabold tracking-tight text-slate-900">
                  PDF<span className="text-red-600">Verse</span>
                </div>

                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  All-in-One PDF Editor
                </div>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-6 text-slate-500">
              Edit, convert, compress, merge, split, protect and manage
              your PDF files with powerful online tools—all in one place.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                Fast
              </span>

              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                Easy to Use
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                Browser Based
              </span>
            </div>
          </div>

          {/* PDF Tools */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              PDF Tools
            </h3>

            <ul className="mt-5 space-y-3">
              {toolLinks.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="text-sm text-slate-500 transition hover:text-red-600"
                  >
                    {tool.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company / Support */}
          <div className="min-w-0">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Support
            </h3>

            {/* Mobile: one horizontal non-wrapping row.
                Desktop/tablet: original vertical layout. */}
            <div className="mt-5 w-full overflow-x-auto md:overflow-visible">
              <ul className="flex w-max min-w-full flex-nowrap items-center gap-5 whitespace-nowrap md:w-auto md:min-w-0 md:flex-col md:items-start md:gap-3">
                {footerLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <li key={item.href} className="shrink-0">
                      <Link
                        href={item.href}
                        className="group inline-flex items-center gap-2 whitespace-nowrap text-sm text-slate-500 transition hover:text-red-600"
                      >
                        <Icon className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-red-500" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-slate-200" />

        {/* Bottom Footer */}
        <div className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">

          <p className="text-slate-500">
            © {new Date().getFullYear()} PDFVerse. All rights reserved.
          </p>

          <div className="flex items-center gap-1 text-slate-400">
            <span>Made with</span>

            <Heart
              className="h-4 w-4 fill-red-500 text-red-500"
              aria-hidden="true"
            />

            <span>for PDF users</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-slate-400 transition hover:text-red-600"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-slate-400 transition hover:text-red-600"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}