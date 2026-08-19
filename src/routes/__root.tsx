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

import { useEffect } from "react";

import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

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
          The page you're looking for doesn't exist or has
          been moved.
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
          Something went wrong on our end. You can try
          refreshing or head back home.
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
          content: "width=device-width, initial-scale=1",
        },
        {
          title: "PDFVerse — Free Online PDF Tools",
        },
        {
          name: "description",
          content:
            "Free online PDF tools to merge, split, compress, convert, edit, compare and manage PDF files.",
        },
      ],

      links: [
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
        {
          rel: "apple-touch-icon",
          href: "/apple-touch-icon.png?v=2",
          sizes: "180x180",
        },
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

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>

      <body>
        <QueryClientProvider client={queryClient}>
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