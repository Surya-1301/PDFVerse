import { Link } from "@tanstack/react-router";
import { BookOpen, Download, FileText, Flag, Mail, ShieldCheck } from "lucide-react";
import { isNative, openExternal } from "@/lib/native";

const DOWNLOAD_URL = "https://downloadpdfverse.dpdns.org/";

const footerLinks = [
  { label: "Blog", href: "/blog" as const, icon: BookOpen },
  { label: "Privacy", href: "/privacy" as const, icon: ShieldCheck },
  { label: "Terms", href: "/terms" as const, icon: FileText },
  { label: "Contact", href: "/contact" as const, icon: Mail },
  { label: "Abuse", href: "/report-abuse" as const, icon: Flag },
  { label: "Download app", href: DOWNLOAD_URL, icon: Download, external: true as const },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "color-mix(in srgb, var(--accent) 4%, var(--bg))",
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3 text-base font-semibold tracking-tight"
              style={{ color: "var(--text-1)" }}
            >
              <span>PDFVerse</span>
            </Link>

            <p className="mt-1 text-xs" style={{ color: "var(--text-2)" }}>
              © {new Date().getFullYear()} PDFVerse. All rights reserved.
            </p>
          </div>

          {/* Footer Navigation */}
          <nav
              aria-label="Footer navigation"
             className="grid w-full grid-cols-3 justify-items-center gap-x-2 gap-y-4 sm:flex sm:w-auto sm:items-center sm:justify-between sm:gap-x-6 sm:gap-y-0"
>

            {footerLinks.map((item) => {
              const Icon = item.icon;
              const className =
                "group inline-flex shrink-0 items-center gap-1 text-xs font-medium transition-colors sm:gap-2 sm:text-sm";
              const style = { color: "var(--text-2)" };
              const content = (
                <>
                  <Icon className="h-4 w-4 shrink-0 transition-opacity group-hover:opacity-100 sm:h-4 sm:w-4" />
                  <span>{item.label}</span>
                </>
              );

              return "external" in item && item.external ? (
                // In the APK, "Download app" pointing at itself is useless —
                // hide it; everywhere else open it in the system browser.
                isNative() ? null : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    void openExternal(item.href);
                  }}
                  rel="noopener noreferrer"
                  className={className}
                  style={style}
                >
                  {content}
                </a>
                )
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className={className}
                  style={style}
                >
                  {content}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </footer>
  );
}
