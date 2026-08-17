import { t as __commonJSMin } from "../_runtime.mjs";
import { d as init_globalthis, u as globalthis_default } from "./@cantoo/pdf-lib+[...].mjs";
import processModule from "node:process";
//#region node_modules/immediate/lib/index.js
var require_lib = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	init_globalthis();
	var Mutation = globalthis_default.MutationObserver || globalthis_default.WebKitMutationObserver;
	var scheduleDrain;
	if (processModule.browser) {
		if (Mutation) {
			var called = 0;
			var observer = new Mutation(nextTick);
			var element = globalthis_default.document.createTextNode("");
			observer.observe(element, { characterData: true });
			scheduleDrain = function() {
				element.data = called = ++called % 2;
			};
		} else if (!globalthis_default.setImmediate && typeof globalthis_default.MessageChannel !== "undefined") {
			var channel = new globalthis_default.MessageChannel();
			channel.port1.onmessage = nextTick;
			scheduleDrain = function() {
				channel.port2.postMessage(0);
			};
		} else if ("document" in globalthis_default && "onreadystatechange" in globalthis_default.document.createElement("script")) scheduleDrain = function() {
			var scriptEl = globalthis_default.document.createElement("script");
			scriptEl.onreadystatechange = function() {
				nextTick();
				scriptEl.onreadystatechange = null;
				scriptEl.parentNode.removeChild(scriptEl);
				scriptEl = null;
			};
			globalthis_default.document.documentElement.appendChild(scriptEl);
		};
		else scheduleDrain = function() {
			setTimeout(nextTick, 0);
		};
	} else scheduleDrain = function() {
		processModule.nextTick(nextTick);
	};
	var draining;
	var queue = [];
	function nextTick() {
		draining = true;
		var i, oldQueue;
		var len = queue.length;
		while (len) {
			oldQueue = queue;
			queue = [];
			i = -1;
			while (++i < len) oldQueue[i]();
			len = queue.length;
		}
		draining = false;
	}
	module.exports = immediate;
	function immediate(task) {
		if (queue.push(task) === 1 && !draining) scheduleDrain();
	}
}));
//#endregion
export { require_lib as t };
