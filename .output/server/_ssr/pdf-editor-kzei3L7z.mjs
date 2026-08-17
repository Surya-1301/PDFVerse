import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { v as ClientOnly } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pdf-editor-kzei3L7z.js
var import_jsx_runtime = require_jsx_runtime();
function Loading() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-[70vh] place-items-center bg-workspace text-sm text-muted-foreground",
		children: "Loading editor…"
	});
}
function EditorPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-slate-950",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, { fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, {}) })
	});
}
//#endregion
export { EditorPage as component };
