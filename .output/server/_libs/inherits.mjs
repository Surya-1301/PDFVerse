import { i as __require, t as __commonJSMin } from "../_runtime.mjs";
//#region node_modules/inherits/inherits_browser.js
var require_inherits_browser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	if (typeof Object.create === "function") module.exports = function inherits(ctor, superCtor) {
		if (superCtor) {
			ctor.super_ = superCtor;
			ctor.prototype = Object.create(superCtor.prototype, { constructor: {
				value: ctor,
				enumerable: false,
				writable: true,
				configurable: true
			} });
		}
	};
	else module.exports = function inherits(ctor, superCtor) {
		if (superCtor) {
			ctor.super_ = superCtor;
			var TempCtor = function() {};
			TempCtor.prototype = superCtor.prototype;
			ctor.prototype = new TempCtor();
			ctor.prototype.constructor = ctor;
		}
	};
}));
//#endregion
//#region node_modules/inherits/inherits.js
var require_inherits = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	try {
		var util = __require("node:util");
		/* istanbul ignore next */
		if (typeof util.inherits !== "function") throw "";
		module.exports = util.inherits;
	} catch (e) {
		/* istanbul ignore next */
		module.exports = require_inherits_browser();
	}
}));
//#endregion
export { require_inherits as t };
