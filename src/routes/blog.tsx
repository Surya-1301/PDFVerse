import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * Blog layout route.
 *
 * File-based routing treats `blog.tsx` as the parent of `blog.$postSlug.tsx`,
 * so this route MUST render <Outlet /> — otherwise post pages would render
 * nothing (only their <head> meta would appear).
 *
 * The actual list page lives at `blog/index.tsx` ("/blog"),
 * which uses the layout too.
 */
export const Route = createFileRoute("/blog")({
  component: BlogLayout,
});

function BlogLayout() {
  return <Outlet />;
}