/// <reference types="vite/client" />

import appCss from "../styles.css?url";

import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { useEffect, useRef } from "react";

import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import ThemeProvider from "@/components/theme/ThemeProvider";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">
          404
        </h1>

        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error(error);

  const router = useRouter();

  useEffect(() => {
    // Error is already logged above.
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back
          home.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>

          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const TOOL_CATEGORY_BY_SLUG: Record<string, string> = {
  // Convert to PDF
  "jpg-to-pdf": "convertToPdf",
  "scan-to-pdf": "convertToPdf",
  "word-to-pdf": "convertToPdf",
  "powerpoint-to-pdf": "convertToPdf",
  "excel-to-pdf": "convertToPdf",
  "html-to-pdf": "convertToPdf",

  // Convert from PDF
  "pdf-to-jpg": "convertFromPdf",
  "pdf-to-word": "convertFromPdf",
  "pdf-to-text": "convertFromPdf",
  "extract-images": "convertFromPdf",
  "pdf-to-powerpoint": "convertFromPdf",
  "pdf-to-excel": "convertFromPdf",
};

const TOOLS_CATEGORY_STORAGE_KEY =
  "pdfverse-tools-category";

const VALID_TOOL_CATEGORIES = new Set([
  "all",
  "edit",
  "organize",
  "convertToPdf",
  "convertFromPdf",
  "security",
]);

function getToolSlugFromPath(pathname: string): string | null {
  const match =
    pathname.match(/^\/pdf\/([^/]+)\/?$/);

  return match?.[1] ?? null;
}

function getToolsCategoryFromPath(
  pathname: string,
): string | null {
  const slug =
    getToolSlugFromPath(pathname);

  if (!slug) return null;

  return (
    TOOL_CATEGORY_BY_SLUG[slug] ??
    null
  );
}

function persistToolsCategory(
  category: string,
) {
  if (
    !VALID_TOOL_CATEGORIES.has(
      category,
    )
  ) {
    return;
  }

  try {
    window.localStorage.setItem(
      TOOLS_CATEGORY_STORAGE_KEY,
      category,
    );
  } catch {
    // Storage can be unavailable in private/restricted contexts.
  }
}

function readStoredToolsCategory(): string {
  try {
    const stored =
      window.localStorage.getItem(
        TOOLS_CATEGORY_STORAGE_KEY,
      );

    if (
      stored &&
      VALID_TOOL_CATEGORIES.has(stored)
    ) {
      return stored;
    }
  } catch {
    // Ignore storage failures.
  }

  return "all";
}

function ensureToolsCategoryInUrl(
  category: string,
) {
  if (
    !VALID_TOOL_CATEGORIES.has(
      category,
    )
  ) {
    return;
  }

  const url =
    new URL(window.location.href);

  const current =
    url.searchParams.get(
      "category",
    );

  if (current === category) {
    return;
  }

  if (category === "all") {
    url.searchParams.delete(
      "category",
    );
  } else {
    url.searchParams.set(
      "category",
      category,
    );
  }

  window.history.replaceState(
    window.history.state,
    "",
    `${url.pathname}${
      url.searchParams.toString()
        ? `?${url.searchParams.toString()}`
        : ""
    }${url.hash}`,
  );

  window.dispatchEvent(
    new PopStateEvent("popstate"),
  );
}

const siteUrl = "https://pdfverse.pages.dev";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PDFVerse",
  url: siteUrl,
  description:
    "Free online PDF tools to merge, split, compress, convert, edit, compare and manage PDF files.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/pdf/{search_term_string}`,
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@type": "Organization",
    name: "PDFVerse",
    url: siteUrl,
  },
};

export const Route =
  createRootRouteWithContext<{
    queryClient: QueryClient;
  }>()({
    head: () => ({
      meta: [
        {
          charSet: "utf-8",
        },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, viewport-fit=cover",
        },
        {
          title: "PDFVerse — Free Online PDF Tools",
        },
        {
          name: "description",
          content:
            "Free online PDF tools to merge, split, compress, convert, edit, compare and manage PDF files.",
        },

        // PWA / mobile browser settings
        {
          name: "theme-color",
          content: "#7c3aed",
        },
        {
          name: "mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "apple-mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
        {
          name: "apple-mobile-web-app-title",
          content: "PDFVerse",
        },

        // Open Graph
        {
          property: "og:title",
          content: "PDFVerse — Free Online PDF Tools",
        },
        {
          property: "og:description",
          content:
            "Free online PDF tools to merge, split, compress, convert, edit, compare and manage PDF files.",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:url",
          content: siteUrl,
        },

        // Twitter
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:title",
          content: "PDFVerse — Free Online PDF Tools",
        },
        {
          name: "twitter:description",
          content:
            "Free online PDF tools to merge, split, compress, convert, edit, compare and manage PDF files.",
        },
      ],

      links: [
        // PWA manifest
        {
          rel: "manifest",
          href: "/manifest.webmanifest",
        },

        // Standard favicon
        {
          rel: "icon",
          href: "/favicon-32x32.png?v=2",
          type: "image/png",
          sizes: "32x32",
        },
        {
          rel: "icon",
          href: "/favicon-16x16.png?v=2",
          type: "image/png",
          sizes: "16x16",
        },
        {
          rel: "shortcut icon",
          href: "/favicon.ico?v=2",
          type: "image/x-icon",
        },

        // iOS home screen icon
        {
          rel: "apple-touch-icon",
          href: "/apple-touch-icon.png?v=2",
          sizes: "180x180",
        },

        // Global stylesheet
        {
          rel: "stylesheet",
          href: appCss,
        },
      ],
    }),

    component: RootComponent,

    notFoundComponent: NotFoundComponent,

    errorComponent: ErrorComponent,
  });

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const previousPathRef =
    useRef<string | null>(null);

  return (
    <ThemeProvider>
      <RootComponentInner
        queryClient={queryClient}
        router={router}
        previousPathRef={previousPathRef}
      />
    </ThemeProvider>
  );
}

function RootComponentInner({
  queryClient,
  router,
  previousPathRef,
}: {
  queryClient: QueryClient;
  router: ReturnType<typeof useRouter>;
  previousPathRef: React.MutableRefObject<string | null>;
}) {

  useEffect(() => {
    const syncToolCategory = () => {
      const pathname =
        window.location.pathname;

      const categoryFromTool =
        getToolsCategoryFromPath(
          pathname,
        );

      if (categoryFromTool) {
        persistToolsCategory(
          categoryFromTool,
        );
      }

      if (pathname === "/tools") {
        const category =
          new URL(
            window.location.href,
          ).searchParams.get(
            "category",
          );

        if (
          category &&
          VALID_TOOL_CATEGORIES.has(
            category,
          )
        ) {
          persistToolsCategory(
            category,
          );
        } else {
          const previousPath =
            previousPathRef.current;

          const previousCategory =
            previousPath
              ? getToolsCategoryFromPath(
                  previousPath,
                )
              : null;

          if (previousCategory) {
            ensureToolsCategoryInUrl(
              previousCategory,
            );
          } else {
            ensureToolsCategoryInUrl(
              readStoredToolsCategory(),
            );
          }
        }
      }

      previousPathRef.current =
        pathname;
    };

    syncToolCategory();

    const unsubscribe =
      router.subscribe(
        "onResolved",
        syncToolCategory,
      );

    return unsubscribe;
  }, [router]);

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <HeadContent />
      </head>

      <body>
        <QueryClientProvider
          client={queryClient}
        >
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Header />

            <main className="flex-1">
              <Outlet />
            </main>

            <Footer />
          </div>
        </QueryClientProvider>

        <Scripts />
      </body>
    </html>
  );
}
