import { a as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Upload, w as FilePlusCorner } from "../_libs/lucide-react.mjs";
import { r as pdfTools, t as categoryTabs } from "./pdfTools-BytLHzMV.mjs";
import { n as createBlankPdfFile, r as storePdfForEditor, t as Container } from "./pdfEditorLaunch-CCTLJgAt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DqNG7zlp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("all");
	const inputRef = (0, import_react.useRef)(null);
	const navigate = useNavigate();
	const visibleTools = (0, import_react.useMemo)(() => {
		if (activeCategory === "all") return pdfTools;
		return pdfTools.filter((tool) => tool.category === activeCategory);
	}, [activeCategory]);
	function onPick(file) {
		if (!file) return;
		storePdfForEditor(file);
		navigate({ to: "/pdf-editor" });
	}
	async function onBlank() {
		storePdfForEditor(await createBlankPdfFile());
		navigate({ to: "/pdf-editor" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative min-h-screen overflow-hidden bg-slate-950",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute left-1/2 top-0 -z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/25 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute right-0 top-24 -z-0 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
				className: "relative py-12 sm:py-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-5xl text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mb-6 inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-5 py-2 text-base text-violet-100 shadow-lg shadow-violet-600/10",
								children: "Fast, free PDF tools"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-5xl font-black tracking-tight text-white sm:text-7xl",
								children: "PDF Editor tools"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-8 max-w-5xl text-xl leading-9 text-slate-300 sm:text-2xl sm:leading-10",
								children: "Merge, split, compress, sign, protect, convert, organize, and repair PDF files in one clean workspace."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto mt-10 max-w-5xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-violet-950/20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "px-5 pt-8 text-center sm:px-8 sm:pt-10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-3xl font-black tracking-tight text-white sm:text-4xl",
											children: "Online PDF editor"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full border border-violet-400/30 bg-violet-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-violet-300",
											children: "BETA"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg",
										children: "Edit PDF files for free. Add text, images, shapes, signatures, highlights, and more."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center px-5 py-8 sm:px-8 sm:py-10",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											ref: inputRef,
											type: "file",
											accept: "application/pdf",
											className: "hidden",
											onChange: (event) => onPick(event.target.files?.[0])
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => inputRef.current?.click(),
											className: "inline-flex min-w-[280px] items-center justify-center gap-4 rounded-2xl bg-violet-600 px-7 py-4 text-lg font-bold text-white shadow-xl shadow-violet-950/30 transition hover:-translate-y-0.5 hover:bg-violet-500 sm:min-w-[360px] sm:px-9 sm:py-5 sm:text-xl",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-6 w-6" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Upload PDF file" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: onBlank,
											className: "mt-5 inline-flex items-center gap-2 text-base font-medium text-slate-400 transition hover:text-white",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlusCorner, { className: "h-5 w-5" }), "or start with a blank document"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/5 bg-black/10 px-5 py-5 text-xs text-slate-500 sm:text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓ Edit existing text" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓ Add text & images" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓ Sign & annotate" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓ Download edited PDF" })
									]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						id: "pdf-tools",
						className: "mx-auto mt-10 max-w-6xl scroll-mt-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-nowrap gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
								children: categoryTabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setActiveCategory(tab.id),
									className: `shrink-0 rounded-full border px-5 py-3 text-sm font-semibold tracking-[0.14em] transition ${activeCategory === tab.id ? "border-white bg-white text-slate-950" : "border-white/10 bg-white/[0.05] text-slate-400 hover:bg-white/[0.08] hover:text-white"}`,
									children: tab.label
								}, tab.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-5 text-sm text-slate-500",
								children: [visibleTools.length, " PDF tools shown"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
								children: visibleTools.map((tool) => {
									const Icon = tool.icon;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: tool.slug === "pdf-editor" ? "/pdf-editor" : "/pdf/$slug",
										params: { slug: tool.slug },
										className: "group flex min-h-[170px] flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:-translate-y-0.5 hover:border-violet-500/50 hover:bg-white/[0.05]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 text-white transition group-hover:bg-violet-500",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "text-base font-semibold text-white",
												children: tool.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 line-clamp-3 text-sm leading-6 text-slate-400",
												children: tool.description
											})
										]
									}, tool.slug);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 grid gap-3 sm:hidden",
								children: visibleTools.map((tool) => {
									const Icon = tool.icon;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: tool.slug === "pdf-editor" ? "/pdf-editor" : "/pdf/$slug",
										params: { slug: tool.slug },
										className: "group flex w-full items-center gap-4 rounded-2xl border border-violet-400/20 bg-gradient-to-r from-violet-950/80 via-violet-900/50 to-[#0b1020] p-4 text-left shadow-[0_8px_24px_rgba(0,0,0,0.22)] transition hover:border-violet-400/40 active:scale-[0.99]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.22)] transition group-hover:bg-violet-500",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1 pr-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "text-[15px] font-semibold leading-5 text-white",
												children: tool.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 line-clamp-2 text-[12px] leading-5 text-slate-300/80",
												children: tool.description
											})]
										})]
									}, `${tool.slug}-mobile`);
								})
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
export { Home as component };
