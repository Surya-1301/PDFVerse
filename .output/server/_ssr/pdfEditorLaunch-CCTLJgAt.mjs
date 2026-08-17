import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pdfEditorLaunch-CCTLJgAt.js
var import_jsx_runtime = require_jsx_runtime();
function Container({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`,
		children
	});
}
function storePdfForEditor(file) {}
async function createBlankPdfFile(name = "blank-document.pdf") {
	const { PDFDocument } = await import("../_libs/pdf-lib+tslib.mjs").then((n) => n.t);
	const doc = await PDFDocument.create();
	doc.addPage([595.28, 841.89]);
	const bytes = await doc.save();
	return new File([bytes], name, { type: "application/pdf" });
}
//#endregion
export { createBlankPdfFile as n, storePdfForEditor as r, Container as t };
