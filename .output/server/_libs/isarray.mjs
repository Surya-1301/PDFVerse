import { t as __commonJSMin } from "../_runtime.mjs";
//#region node_modules/readable-stream/node_modules/isarray/index.js
var require_isarray = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toString = {}.toString;
	module.exports = Array.isArray || function(arr) {
		return toString.call(arr) == "[object Array]";
	};
}));
//#endregion
export { require_isarray as t };
