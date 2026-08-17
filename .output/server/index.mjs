globalThis.__nitro_main__ = import.meta.url;
import { n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-08-17T13:49:02.601Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-17T13:49:02.601Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/ClientOnly-Bw4vJmQD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fd1-PI2Os2E+vlwE+GQWysUdZ9QN1MA\"",
		"mtime": "2026-08-17T13:49:02.265Z",
		"size": 8145,
		"path": "../public/assets/ClientOnly-Bw4vJmQD.js"
	},
	"/assets/Container-Bck8ObH8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d1-+clchBkk/MJowo882hnDD/5r6Tc\"",
		"mtime": "2026-08-17T13:49:02.265Z",
		"size": 209,
		"path": "../public/assets/Container-Bck8ObH8.js"
	},
	"/assets/__vite-browser-external-ZWreGvkw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f-uLCuzgaw2bcloFntxX05yQcxOFU\"",
		"mtime": "2026-08-17T13:49:02.265Z",
		"size": 63,
		"path": "../public/assets/__vite-browser-external-ZWreGvkw.js"
	},
	"/assets/arrow-left-CRKPqn1H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-1vUDY3Vxi3td/M+Pz9unVyZRges\"",
		"mtime": "2026-08-17T13:49:02.265Z",
		"size": 154,
		"path": "../public/assets/arrow-left-CRKPqn1H.js"
	},
	"/assets/PdfEditor-DnMDqpRk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a955-Jskgwvv5SvtxvUPy0x1CeYVrbIk\"",
		"mtime": "2026-08-17T13:49:02.265Z",
		"size": 43349,
		"path": "../public/assets/PdfEditor-DnMDqpRk.js"
	},
	"/assets/ban-BV33EE5Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa-J09vX3j6+NRc1zH95cJVwU9cbtw\"",
		"mtime": "2026-08-17T13:49:02.265Z",
		"size": 170,
		"path": "../public/assets/ban-BV33EE5Q.js"
	},
	"/assets/UPNG-CrJWnK0X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30c7e-LH7g/TCqDIqUn9zxUTgif7aAzjU\"",
		"mtime": "2026-08-17T13:49:02.265Z",
		"size": 199806,
		"path": "../public/assets/UPNG-CrJWnK0X.js"
	},
	"/assets/download-CmWCfol6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dd-LS90jtjWt5XaAm7MIT7VSCpIJns\"",
		"mtime": "2026-08-17T13:49:02.265Z",
		"size": 221,
		"path": "../public/assets/download-CmWCfol6.js"
	},
	"/assets/contact-41L6gLQV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ede-NEM/3FwFKROqEtKOQPB+b6we6xE\"",
		"mtime": "2026-08-17T13:49:02.265Z",
		"size": 16094,
		"path": "../public/assets/contact-41L6gLQV.js"
	},
	"/assets/jszip.min-DK8K8hzW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17666-jPkP2DPw0gmfbssiavs0g1o4lRc\"",
		"mtime": "2026-08-17T13:49:02.266Z",
		"size": 95846,
		"path": "../public/assets/jszip.min-DK8K8hzW.js"
	},
	"/assets/es-DdZowmZL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"36c83-pp1K3WNIntU/fppTu14CyrNkFg0\"",
		"mtime": "2026-08-17T13:49:02.265Z",
		"size": 224387,
		"path": "../public/assets/es-DdZowmZL.js"
	},
	"/assets/dist-DvH3WwDb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5560d-aXs+EpQiCM1naHFpQ6MQTfRbmvw\"",
		"mtime": "2026-08-17T13:49:02.265Z",
		"size": 349709,
		"path": "../public/assets/dist-DvH3WwDb.js"
	},
	"/assets/pdf-editor-CvkEKspf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"408-ZevYttdQvxH4fuDDdZ957kM1BpE\"",
		"mtime": "2026-08-17T13:49:02.266Z",
		"size": 1032,
		"path": "../public/assets/pdf-editor-CvkEKspf.js"
	},
	"/assets/index-CSqER-q4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"56cf2-YIrMGsg69Wc0qJxQhw7RtYY51Qw\"",
		"mtime": "2026-08-17T13:49:02.264Z",
		"size": 355570,
		"path": "../public/assets/index-CSqER-q4.js"
	},
	"/assets/pdfEditorLaunch-DDwl93-n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4bf-y1tzEvIirjMX8gTHUdkk80D2x64\"",
		"mtime": "2026-08-17T13:49:02.266Z",
		"size": 1215,
		"path": "../public/assets/pdfEditorLaunch-DDwl93-n.js"
	},
	"/assets/pdf-Deai4xS9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"50543-bIJtrW88Ky1O3t5CzoZXl9ppcEs\"",
		"mtime": "2026-08-17T13:49:02.266Z",
		"size": 329027,
		"path": "../public/assets/pdf-Deai4xS9.js"
	},
	"/assets/privacy-Kodyn-HL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4478-BtNG609fzQaJguD8Gxhi/rrY/qo\"",
		"mtime": "2026-08-17T13:49:02.266Z",
		"size": 17528,
		"path": "../public/assets/privacy-Kodyn-HL.js"
	},
	"/assets/report-abuse-CJCXjVlG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5aa8-mTzPYbz1wTgHCQGiFQ9Mabf3z/A\"",
		"mtime": "2026-08-17T13:49:02.266Z",
		"size": 23208,
		"path": "../public/assets/report-abuse-CJCXjVlG.js"
	},
	"/assets/rolldown-runtime-Dd_uD5pT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"452-sZl5y+VnYZJIxKNwHO0DTqczPH0\"",
		"mtime": "2026-08-17T13:49:02.266Z",
		"size": 1106,
		"path": "../public/assets/rolldown-runtime-Dd_uD5pT.js"
	},
	"/assets/pptxgen.es-Kd4jYqK6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"42a23-QHyJ6d6ZhB1275T4FXEuJZnN3mY\"",
		"mtime": "2026-08-17T13:49:02.266Z",
		"size": 272931,
		"path": "../public/assets/pptxgen.es-Kd4jYqK6.js"
	},
	"/assets/mammoth.browser-Bi0WPuQg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"78045-CidDQP6ls3wX4rKswCOwhBP4O+A\"",
		"mtime": "2026-08-17T13:49:02.266Z",
		"size": 491589,
		"path": "../public/assets/mammoth.browser-Bi0WPuQg.js"
	},
	"/assets/pdf._slug-NB8vxs6G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"86b28-LIu2Ra83RKngAIim/asJXCcpazE\"",
		"mtime": "2026-08-17T13:49:02.266Z",
		"size": 551720,
		"path": "../public/assets/pdf._slug-NB8vxs6G.js"
	},
	"/pdf.worker.min.mjs": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14fe5e-iGC1A5RKrS0JublO5W5Pq4QUymk\"",
		"mtime": "2026-08-17T13:49:02.603Z",
		"size": 1375838,
		"path": "../public/pdf.worker.min.mjs"
	},
	"/assets/routes-CVsEVTRo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1913-vrKCFiBWt4IsbZmawE9JtcXkfoU\"",
		"mtime": "2026-08-17T13:49:02.266Z",
		"size": 6419,
		"path": "../public/assets/routes-CVsEVTRo.js"
	},
	"/assets/shield-alert-Ckib9shh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20a-UDABZPqe/j/7wfL+o1B6W3Dhc5o\"",
		"mtime": "2026-08-17T13:49:02.267Z",
		"size": 522,
		"path": "../public/assets/shield-alert-Ckib9shh.js"
	},
	"/assets/styles-BYay_5NF.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1c4e2-AfJ83NTluHMJmQqGzTi4ERabxsc\"",
		"mtime": "2026-08-17T13:49:02.269Z",
		"size": 115938,
		"path": "../public/assets/styles-BYay_5NF.css"
	},
	"/assets/terms-Dad_20Zd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5783-xHXcTF92jGGFDadkvQEdKJGb27E\"",
		"mtime": "2026-08-17T13:49:02.267Z",
		"size": 22403,
		"path": "../public/assets/terms-Dad_20Zd.js"
	},
	"/assets/triangle-alert-lVZSNc9C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe-SYV2fVIl1qsXsyedv+TA6YU+iLU\"",
		"mtime": "2026-08-17T13:49:02.267Z",
		"size": 254,
		"path": "../public/assets/triangle-alert-lVZSNc9C.js"
	},
	"/assets/user-check-DnkBH7FH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f4-qSaCirXa+lH7euYS3OCp3rJSAoQ\"",
		"mtime": "2026-08-17T13:49:02.267Z",
		"size": 500,
		"path": "../public/assets/user-check-DnkBH7FH.js"
	},
	"/assets/xlsx-BHKh7vjA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"678b2-0SGPF3UMRz2PsXNfWL2yQHrEfEI\"",
		"mtime": "2026-08-17T13:49:02.267Z",
		"size": 424114,
		"path": "../public/assets/xlsx-BHKh7vjA.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_vB4dhi = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_vB4dhi
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
