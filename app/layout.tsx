import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FileText, Flag, Mail, ShieldCheck } from "lucide-react";
import "./globals.css";

const siteUrl = "https://pdfverse.pages.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "PDFVerse — All-in-One PDF Editor",
    template: "%s | PDFVerse",
  },

  description:
    "PDFVerse is your all-in-one online PDF editor. Merge, split, compress, convert, protect, unlock, sign, rotate, organize and manage PDF files easily.",

  keywords: [
    "PDFVerse",
    "PDF Verse",
    "PDF editor",
    "online PDF editor",
    "free PDF editor",
    "PDF tools",
    "merge PDF",
    "split PDF",
    "compress PDF",
    "PDF converter",
    "PDF to Word",
    "PDF to JPG",
    "JPG to PDF",
    "protect PDF",
    "unlock PDF",
    "sign PDF",
    "rotate PDF",
    "organize PDF",
    "watermark PDF",
    "repair PDF",
  ],

  authors: [
    {
      name: "PDFVerse",
      url: siteUrl,
    },
  ],

  creator: "PDFVerse",
  publisher: "PDFVerse",
  applicationName: "PDFVerse",
  generator: "Next.js",

  referrer: "origin-when-cross-origin",

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "PDFVerse",

    title: "PDFVerse — All-in-One PDF Editor",

    description:
      "Merge, split, compress, convert, protect, sign and manage your PDF files with PDFVerse.",

    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "PDFVerse — All-in-One PDF Editor",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "PDFVerse — All-in-One PDF Editor",

    description:
      "All your PDF tools in one place. Merge, split, compress, convert, protect and manage PDFs online.",

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
     <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
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
                
                {/* Brand */}
                <div>
                  <Link
                    href="/"
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