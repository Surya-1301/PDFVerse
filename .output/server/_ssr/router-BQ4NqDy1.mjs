import { a as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { A as redirect, N as notFound, _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as FileText, m as Mail, s as ShieldCheck, x as Flag } from "../_libs/lucide-react.mjs";
import { i as slugAliases, n as findTool } from "./pdfTools-BytLHzMV.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BQ4NqDy1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var styles_default = "/assets/styles-BYay_5NF.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var footerLinks = [
	{
		label: "Privacy",
		href: "/privacy",
		icon: ShieldCheck
	},
	{
		label: "Terms",
		href: "/terms",
		icon: FileText
	},
	{
		label: "Contact",
		href: "/contact",
		icon: Mail
	},
	{
		label: "Abuse",
		href: "/report-abuse",
		icon: Flag
	}
];
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-white/10 bg-slate-950/80",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "inline-flex items-center gap-2 text-base font-semibold tracking-tight text-white transition hover:text-violet-200",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PDFVerse" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-slate-600",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" PDFVerse. All rights reserved."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Footer navigation",
					className: "flex flex-wrap items-center gap-x-6 gap-y-3",
					children: footerLinks.map((item) => {
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.href,
							className: "group inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-300",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-slate-600 transition group-hover:text-violet-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
						}, item.href);
					})
				})]
			})
		})
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "PDFVerse — All-in-One PDF Editor" },
			{
				name: "description",
				content: "PDFVerse is your all-in-one online PDF editor. Merge, split, compress, convert, protect, unlock, sign, rotate and organize PDF files."
			},
			{
				name: "author",
				content: "PDFVerse"
			},
			{
				property: "og:site_name",
				content: "PDFVerse"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		"data-scroll-behavior": "smooth",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "min-h-screen bg-slate-950 text-slate-100 antialiased",
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})]
		})]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})]
		})
	});
}
var $$splitComponentImporter$6 = () => import("./routes-DqNG7zlp.mjs");
var Route$6 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "PDFVerse — Free Online PDF Editor & PDF Tools" },
		{
			name: "description",
			content: "Merge, split, compress, sign, protect, convert, organize and repair PDF files in one clean workspace. Free, fast and browser based."
		},
		{
			property: "og:title",
			content: "PDFVerse — Free Online PDF Editor & PDF Tools"
		},
		{
			property: "og:description",
			content: "All your PDF tools in one place: edit PDF text, merge, split, compress, convert, sign and protect PDFs online."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./contact-BlBB7ETf.mjs");
var Route$5 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact PDFVerse — Support & Help" },
		{
			name: "description",
			content: "Contact the PDFVerse team for support, feedback, bug reports or privacy questions about our online PDF tools."
		},
		{
			property: "og:title",
			content: "Contact PDFVerse — Support & Help"
		},
		{
			property: "og:description",
			content: "Contact the PDFVerse team for support, feedback, bug reports or privacy questions about our online PDF tools."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./pdf-editor-kzei3L7z.mjs");
var Route$4 = createFileRoute("/pdf-editor")({
	head: () => ({ meta: [
		{ title: "Online PDF Editor — Edit PDF Text, Sign & Annotate | PDFVerse" },
		{
			name: "description",
			content: "Edit existing PDF text inline, add text, images, signatures, highlights and shapes, organize pages and download — free in your browser."
		},
		{
			property: "og:title",
			content: "Online PDF Editor — PDFVerse"
		},
		{
			property: "og:description",
			content: "Edit PDF text inline, sign, annotate and download. Free and private, right in your browser."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./privacy-Dh5h4QpL.mjs");
var Route$3 = createFileRoute("/privacy")({
	head: () => ({ meta: [
		{ title: "Privacy Policy — PDFVerse" },
		{
			name: "description",
			content: "How PDFVerse handles personal data, uploaded files, security and your rights under applicable data protection law."
		},
		{
			property: "og:title",
			content: "Privacy Policy — PDFVerse"
		},
		{
			property: "og:description",
			content: "How PDFVerse handles personal data, uploaded files, security and your rights under applicable data protection law."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./report-abuse-vXMlLyoc.mjs");
var Route$2 = createFileRoute("/report-abuse")({
	head: () => ({ meta: [
		{ title: "Report Abuse — PDFVerse" },
		{
			name: "description",
			content: "Report abusive, illegal or infringing use of PDFVerse tools. Our team reviews every report."
		},
		{
			property: "og:title",
			content: "Report Abuse — PDFVerse"
		},
		{
			property: "og:description",
			content: "Report abusive, illegal or infringing use of PDFVerse tools. Our team reviews every report."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./terms-CZUFMC3s.mjs");
var Route$1 = createFileRoute("/terms")({
	head: () => ({ meta: [
		{ title: "Terms of Use — PDFVerse" },
		{
			name: "description",
			content: "PDFVerse Terms of Use: acceptable use, PDF processing, uploaded files, intellectual property and limitations."
		},
		{
			property: "og:title",
			content: "Terms of Use — PDFVerse"
		},
		{
			property: "og:description",
			content: "PDFVerse Terms of Use: acceptable use, PDF processing, uploaded files, intellectual property and limitations."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./pdf._slug-BE2HKyrB.mjs");
var Route = createFileRoute("/pdf/$slug")({
	loader: ({ params }) => {
		const alias = slugAliases[params.slug];
		if (alias) throw redirect({
			to: "/pdf/$slug",
			params: { slug: alias }
		});
		const tool = findTool(params.slug);
		if (!tool) throw notFound();
		return {
			title: tool.title,
			description: tool.description,
			slug: tool.slug
		};
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "PDF tool unavailable — PDFVerse" }, {
			name: "robots",
			content: "noindex"
		}] };
		const title = `${loaderData.title} Online — Free PDF Tool | PDFVerse`;
		return { meta: [
			{ title },
			{
				name: "description",
				content: loaderData.description
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: loaderData.description
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$6.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	ContactRoute: Route$5.update({
		id: "/contact",
		path: "/contact",
		getParentRoute: () => Route$7
	}),
	PdfEditorRoute: Route$4.update({
		id: "/pdf-editor",
		path: "/pdf-editor",
		getParentRoute: () => Route$7
	}),
	PrivacyRoute: Route$3.update({
		id: "/privacy",
		path: "/privacy",
		getParentRoute: () => Route$7
	}),
	ReportAbuseRoute: Route$2.update({
		id: "/report-abuse",
		path: "/report-abuse",
		getParentRoute: () => Route$7
	}),
	TermsRoute: Route$1.update({
		id: "/terms",
		path: "/terms",
		getParentRoute: () => Route$7
	}),
	PdfSlugRoute: Route.update({
		id: "/pdf/$slug",
		path: "/pdf/$slug",
		getParentRoute: () => Route$7
	})
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { Route as n, router_exports as t };
