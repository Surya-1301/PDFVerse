import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FileText, Flag, Mail, ShieldCheck } from "lucide-react";
import "./globals.css";

const siteUrl = "https://pdfverse.pages.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PDF Verse - Free Online PDF Editor Tools",
    template: "%s | PDF Verse",
  },
  description:
    "PDF Verse is a free online PDF editor toolkit for merging, splitting, compressing, converting, signing, protecting, unlocking, repairing, and organizing PDF files.",
  keywords: [
    "PDF Verse",
    "PDFVerse",
    "free PDF editor",
    "online PDF tools",
    "merge PDF",
    "split PDF",
    "compress PDF",
    "convert PDF",
    "PDF to Word",
    "PDF to JPG",
    "JPG to PDF",
    "protect PDF",
    "unlock PDF",
    "sign PDF",
    "repair PDF",
    "organize PDF",
    "watermark PDF",
    "redact PDF",
  ],
  authors: [{ name: "PDF Verse" }],
  creator: "PDF Verse",
  publisher: "PDF Verse",
  applicationName: "PDF Verse",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "PDF Verse",
    title: "PDF Verse - Free Online PDF Editor Tools",
    description:
      "Free online PDF tools to merge, split, compress, convert, sign, protect, unlock, repair, and organize PDF files.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "PDF Verse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF Verse - Free Online PDF Editor Tools",
    description:
      "Free online PDF tools to merge, split, compress, convert, sign, protect, unlock, repair, and organize PDF files.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
};

const footerLinks = [
  {
    label: "Privacy",
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
    label: "Abuse",
    href: "/report-abuse",
    icon: Flag,
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          strategy="afterInteractive"
          data-cf-beacon='{"token":"97fc7009e3de4aae813f9255c729838f"}'
        />

        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>

          <footer className="border-t border-white/10 bg-slate-950/80">
            <div className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Link
                    href="/"
                    className="inline-flex text-base font-semibold tracking-tight text-white transition hover:text-violet-200"
                  >
                    PDF Verse
                  </Link>

                  <p className="mt-2 text-sm text-slate-500">
                    © {new Date().getFullYear()} PDF Verse. All rights
                    reserved.
                  </p>
                </div>

                <nav
                  aria-label="Footer navigation"
                  className="flex flex-wrap items-center gap-x-6 gap-y-3"
                >
                  {footerLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
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
        </div>
      </body>
    </html>
  );
}