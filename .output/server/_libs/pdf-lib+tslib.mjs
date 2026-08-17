import { a as __toESM, r as __exportAll, t as __commonJSMin } from "../_runtime.mjs";
import { a as UPNG, c as FontNames, d as init_globalthis, l as require_pako, o as Encodings, s as Font, u as globalthis_default } from "./@cantoo/pdf-lib+[...].mjs";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var { __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __createBinding, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet } = (/* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	init_globalthis();
	var __extends;
	var __assign;
	var __rest;
	var __decorate;
	var __param;
	var __metadata;
	var __awaiter;
	var __generator;
	var __exportStar;
	var __values;
	var __read;
	var __spread;
	var __spreadArrays;
	var __await;
	var __asyncGenerator;
	var __asyncDelegator;
	var __asyncValues;
	var __makeTemplateObject;
	var __importStar;
	var __importDefault;
	var __classPrivateFieldGet;
	var __classPrivateFieldSet;
	var __createBinding;
	(function(factory) {
		var root = typeof globalthis_default === "object" ? globalthis_default : typeof self === "object" ? self : typeof this === "object" ? this : {};
		if (typeof define === "function" && define.amd) define("tslib", ["exports"], function(exports$1) {
			factory(createExporter(root, createExporter(exports$1)));
		});
		else if (typeof module === "object" && typeof module.exports === "object") factory(createExporter(root, createExporter(module.exports)));
		else factory(createExporter(root));
		function createExporter(exports$2, previous) {
			if (exports$2 !== root) {
				if (typeof Object.create === "function") Object.defineProperty(exports$2, "__esModule", { value: true });
				else exports$2.__esModule = true;
			}
			return function(id, v) {
				return exports$2[id] = previous ? previous(id, v) : v;
			};
		}
	})(function(exporter) {
		var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
			d.__proto__ = b;
		} || function(d, b) {
			for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		};
		__extends = function(d, b) {
			extendStatics(d, b);
			function __() {
				this.constructor = d;
			}
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
		__assign = Object.assign || function(t) {
			for (var s, i = 1, n = arguments.length; i < n; i++) {
				s = arguments[i];
				for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
			}
			return t;
		};
		__rest = function(s, e) {
			var t = {};
			for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
			if (s != null && typeof Object.getOwnPropertySymbols === "function") {
				for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
			}
			return t;
		};
		__decorate = function(decorators, target, key, desc) {
			var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
			if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
			else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
			return c > 3 && r && Object.defineProperty(target, key, r), r;
		};
		__param = function(paramIndex, decorator) {
			return function(target, key) {
				decorator(target, key, paramIndex);
			};
		};
		__metadata = function(metadataKey, metadataValue) {
			if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
		};
		__awaiter = function(thisArg, _arguments, P, generator) {
			function adopt(value) {
				return value instanceof P ? value : new P(function(resolve) {
					resolve(value);
				});
			}
			return new (P || (P = Promise))(function(resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch (e) {
						reject(e);
					}
				}
				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch (e) {
						reject(e);
					}
				}
				function step(result) {
					result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
				}
				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
		};
		__generator = function(thisArg, body) {
			var _ = {
				label: 0,
				sent: function() {
					if (t[0] & 1) throw t[1];
					return t[1];
				},
				trys: [],
				ops: []
			}, f, y, t, g;
			return g = {
				next: verb(0),
				"throw": verb(1),
				"return": verb(2)
			}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
				return this;
			}), g;
			function verb(n) {
				return function(v) {
					return step([n, v]);
				};
			}
			function step(op) {
				if (f) throw new TypeError("Generator is already executing.");
				while (_) try {
					if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
					if (y = 0, t) op = [op[0] & 2, t.value];
					switch (op[0]) {
						case 0:
						case 1:
							t = op;
							break;
						case 4:
							_.label++;
							return {
								value: op[1],
								done: false
							};
						case 5:
							_.label++;
							y = op[1];
							op = [0];
							continue;
						case 7:
							op = _.ops.pop();
							_.trys.pop();
							continue;
						default:
							if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
								_ = 0;
								continue;
							}
							if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
								_.label = op[1];
								break;
							}
							if (op[0] === 6 && _.label < t[1]) {
								_.label = t[1];
								t = op;
								break;
							}
							if (t && _.label < t[2]) {
								_.label = t[2];
								_.ops.push(op);
								break;
							}
							if (t[2]) _.ops.pop();
							_.trys.pop();
							continue;
					}
					op = body.call(thisArg, _);
				} catch (e) {
					op = [6, e];
					y = 0;
				} finally {
					f = t = 0;
				}
				if (op[0] & 5) throw op[1];
				return {
					value: op[0] ? op[1] : void 0,
					done: true
				};
			}
		};
		__createBinding = function(o, m, k, k2) {
			if (k2 === void 0) k2 = k;
			o[k2] = m[k];
		};
		__exportStar = function(m, exports$3) {
			for (var p in m) if (p !== "default" && !exports$3.hasOwnProperty(p)) exports$3[p] = m[p];
		};
		__values = function(o) {
			var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
			if (m) return m.call(o);
			if (o && typeof o.length === "number") return { next: function() {
				if (o && i >= o.length) o = void 0;
				return {
					value: o && o[i++],
					done: !o
				};
			} };
			throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
		};
		__read = function(o, n) {
			var m = typeof Symbol === "function" && o[Symbol.iterator];
			if (!m) return o;
			var i = m.call(o), r, ar = [], e;
			try {
				while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
			} catch (error) {
				e = { error };
			} finally {
				try {
					if (r && !r.done && (m = i["return"])) m.call(i);
				} finally {
					if (e) throw e.error;
				}
			}
			return ar;
		};
		__spread = function() {
			for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
			return ar;
		};
		__spreadArrays = function() {
			for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
			for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
			return r;
		};
		__await = function(v) {
			return this instanceof __await ? (this.v = v, this) : new __await(v);
		};
		__asyncGenerator = function(thisArg, _arguments, generator) {
			if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
			var g = generator.apply(thisArg, _arguments || []), i, q = [];
			return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
				return this;
			}, i;
			function verb(n) {
				if (g[n]) i[n] = function(v) {
					return new Promise(function(a, b) {
						q.push([
							n,
							v,
							a,
							b
						]) > 1 || resume(n, v);
					});
				};
			}
			function resume(n, v) {
				try {
					step(g[n](v));
				} catch (e) {
					settle(q[0][3], e);
				}
			}
			function step(r) {
				r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
			}
			function fulfill(value) {
				resume("next", value);
			}
			function reject(value) {
				resume("throw", value);
			}
			function settle(f, v) {
				if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
			}
		};
		__asyncDelegator = function(o) {
			var i, p;
			return i = {}, verb("next"), verb("throw", function(e) {
				throw e;
			}), verb("return"), i[Symbol.iterator] = function() {
				return this;
			}, i;
			function verb(n, f) {
				i[n] = o[n] ? function(v) {
					return (p = !p) ? {
						value: __await(o[n](v)),
						done: n === "return"
					} : f ? f(v) : v;
				} : f;
			}
		};
		__asyncValues = function(o) {
			if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
			var m = o[Symbol.asyncIterator], i;
			return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
				return this;
			}, i);
			function verb(n) {
				i[n] = o[n] && function(v) {
					return new Promise(function(resolve, reject) {
						v = o[n](v), settle(resolve, reject, v.done, v.value);
					});
				};
			}
			function settle(resolve, reject, d, v) {
				Promise.resolve(v).then(function(v) {
					resolve({
						value: v,
						done: d
					});
				}, reject);
			}
		};
		__makeTemplateObject = function(cooked, raw) {
			if (Object.defineProperty) Object.defineProperty(cooked, "raw", { value: raw });
			else cooked.raw = raw;
			return cooked;
		};
		__importStar = function(mod) {
			if (mod && mod.__esModule) return mod;
			var result = {};
			if (mod != null) {
				for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
			}
			result["default"] = mod;
			return result;
		};
		__importDefault = function(mod) {
			return mod && mod.__esModule ? mod : { "default": mod };
		};
		__classPrivateFieldGet = function(receiver, privateMap) {
			if (!privateMap.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
			return privateMap.get(receiver);
		};
		__classPrivateFieldSet = function(receiver, privateMap, value) {
			if (!privateMap.has(receiver)) throw new TypeError("attempted to set private field on non-instance");
			privateMap.set(receiver, value);
			return value;
		};
		exporter("__extends", __extends);
		exporter("__assign", __assign);
		exporter("__rest", __rest);
		exporter("__decorate", __decorate);
		exporter("__param", __param);
		exporter("__metadata", __metadata);
		exporter("__awaiter", __awaiter);
		exporter("__generator", __generator);
		exporter("__exportStar", __exportStar);
		exporter("__createBinding", __createBinding);
		exporter("__values", __values);
		exporter("__read", __read);
		exporter("__spread", __spread);
		exporter("__spreadArrays", __spreadArrays);
		exporter("__await", __await);
		exporter("__asyncGenerator", __asyncGenerator);
		exporter("__asyncDelegator", __asyncDelegator);
		exporter("__asyncValues", __asyncValues);
		exporter("__makeTemplateObject", __makeTemplateObject);
		exporter("__importStar", __importStar);
		exporter("__importDefault", __importDefault);
		exporter("__classPrivateFieldGet", __classPrivateFieldGet);
		exporter("__classPrivateFieldSet", __classPrivateFieldSet);
	});
})))())).default;
//#endregion
//#region node_modules/pdf-lib/es/utils/base64.js
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup = /* @__PURE__ */ new Uint8Array(256);
for (var i = 0; i < chars.length; i++) lookup[chars.charCodeAt(i)] = i;
var encodeToBase64 = function(bytes) {
	var base64 = "";
	var len = bytes.length;
	for (var i = 0; i < len; i += 3) {
		base64 += chars[bytes[i] >> 2];
		base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
		base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
		base64 += chars[bytes[i + 2] & 63];
	}
	if (len % 3 === 2) base64 = base64.substring(0, base64.length - 1) + "=";
	else if (len % 3 === 1) base64 = base64.substring(0, base64.length - 2) + "==";
	return base64;
};
var decodeFromBase64 = function(base64) {
	var bufferLength = base64.length * .75;
	var len = base64.length;
	var i;
	var p = 0;
	var encoded1;
	var encoded2;
	var encoded3;
	var encoded4;
	if (base64[base64.length - 1] === "=") {
		bufferLength--;
		if (base64[base64.length - 2] === "=") bufferLength--;
	}
	var bytes = new Uint8Array(bufferLength);
	for (i = 0; i < len; i += 4) {
		encoded1 = lookup[base64.charCodeAt(i)];
		encoded2 = lookup[base64.charCodeAt(i + 1)];
		encoded3 = lookup[base64.charCodeAt(i + 2)];
		encoded4 = lookup[base64.charCodeAt(i + 3)];
		bytes[p++] = encoded1 << 2 | encoded2 >> 4;
		bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
		bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
	}
	return bytes;
};
var DATA_URI_PREFIX_REGEX = /^(data)?:?([\w\/\+]+)?;?(charset=[\w-]+|base64)?.*,/i;
/**
* If the `dataUri` input is a data URI, then the data URI prefix must not be
* longer than 100 characters, or this function will fail to decode it.
*
* @param dataUri a base64 data URI or plain base64 string
* @returns a Uint8Array containing the decoded input
*/
var decodeFromBase64DataUri = function(dataUri) {
	var trimmedUri = dataUri.trim();
	var res = trimmedUri.substring(0, 100).match(DATA_URI_PREFIX_REGEX);
	if (!res) return decodeFromBase64(trimmedUri);
	var fullMatch = res[0];
	return decodeFromBase64(trimmedUri.substring(fullMatch.length));
};
//#endregion
//#region node_modules/pdf-lib/es/utils/strings.js
var toCharCode = function(character) {
	return character.charCodeAt(0);
};
var toCodePoint = function(character) {
	return character.codePointAt(0);
};
var toHexStringOfMinLength = function(num, minLength) {
	return padStart(num.toString(16), minLength, "0").toUpperCase();
};
var toHexString = function(num) {
	return toHexStringOfMinLength(num, 2);
};
var charFromCode = function(code) {
	return String.fromCharCode(code);
};
var charFromHexCode = function(hex) {
	return charFromCode(parseInt(hex, 16));
};
var padStart = function(value, length, padChar) {
	var padding = "";
	for (var idx = 0, len = length - value.length; idx < len; idx++) padding += padChar;
	return padding + value;
};
var copyStringIntoBuffer = function(str, buffer, offset) {
	var length = str.length;
	for (var idx = 0; idx < length; idx++) buffer[offset++] = str.charCodeAt(idx);
	return length;
};
var escapeRegExp = function(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
var cleanText = function(text) {
	return text.replace(/\t|\u0085|\u2028|\u2029/g, "    ").replace(/[\b\v]/g, "");
};
var escapedNewlineChars = [
	"\\n",
	"\\f",
	"\\r",
	"\\u000B"
];
var isNewlineChar = function(text) {
	return /^[\n\f\r\u000B]$/.test(text);
};
var lineSplit = function(text) {
	return text.split(/[\n\f\r\u000B]/);
};
var mergeLines = function(text) {
	return text.replace(/[\n\f\r\u000B]/g, " ");
};
var charAtIndex = function(text, index) {
	var cuFirst = text.charCodeAt(index);
	var cuSecond;
	var nextIndex = index + 1;
	var length = 1;
	if (cuFirst >= 55296 && cuFirst <= 56319 && text.length > nextIndex) {
		cuSecond = text.charCodeAt(nextIndex);
		if (cuSecond >= 56320 && cuSecond <= 57343) length = 2;
	}
	return [text.slice(index, index + length), length];
};
var charSplit = function(text) {
	var chars = [];
	for (var idx = 0, len = text.length; idx < len;) {
		var _a = charAtIndex(text, idx), c = _a[0], cLen = _a[1];
		chars.push(c);
		idx += cLen;
	}
	return chars;
};
var buildWordBreakRegex = function(wordBreaks) {
	var newlineCharUnion = escapedNewlineChars.join("|");
	var escapedRules = ["$"];
	for (var idx = 0, len = wordBreaks.length; idx < len; idx++) {
		var wordBreak = wordBreaks[idx];
		if (isNewlineChar(wordBreak)) throw new TypeError("`wordBreak` must not include " + newlineCharUnion);
		escapedRules.push(wordBreak === "" ? "." : escapeRegExp(wordBreak));
	}
	var breakRules = escapedRules.join("|");
	return new RegExp("(" + newlineCharUnion + ")|((.*?)(" + breakRules + "))", "gm");
};
var breakTextIntoLines = function(text, wordBreaks, maxWidth, computeWidthOfText) {
	var regex = buildWordBreakRegex(wordBreaks);
	var words = cleanText(text).match(regex);
	var currLine = "";
	var currWidth = 0;
	var lines = [];
	var pushCurrLine = function() {
		if (currLine !== "") lines.push(currLine);
		currLine = "";
		currWidth = 0;
	};
	for (var idx = 0, len = words.length; idx < len; idx++) {
		var word = words[idx];
		if (isNewlineChar(word)) pushCurrLine();
		else {
			var width = computeWidthOfText(word);
			if (currWidth + width > maxWidth) pushCurrLine();
			currLine += word;
			currWidth += width;
		}
	}
	pushCurrLine();
	return lines;
};
var dateRegex = /^D:(\d\d\d\d)(\d\d)?(\d\d)?(\d\d)?(\d\d)?(\d\d)?([+\-Z])?(\d\d)?'?(\d\d)?'?$/;
var parseDate = function(dateStr) {
	var match = dateStr.match(dateRegex);
	if (!match) return void 0;
	var year = match[1], _a = match[2], month = _a === void 0 ? "01" : _a, _b = match[3], day = _b === void 0 ? "01" : _b, _c = match[4], hours = _c === void 0 ? "00" : _c, _d = match[5], mins = _d === void 0 ? "00" : _d, _e = match[6], secs = _e === void 0 ? "00" : _e, _f = match[7], offsetSign = _f === void 0 ? "Z" : _f, _g = match[8], offsetHours = _g === void 0 ? "00" : _g, _h = match[9], offsetMins = _h === void 0 ? "00" : _h;
	var tzOffset = offsetSign === "Z" ? "Z" : "" + offsetSign + offsetHours + ":" + offsetMins;
	return /* @__PURE__ */ new Date(year + "-" + month + "-" + day + "T" + hours + ":" + mins + ":" + secs + tzOffset);
};
var findLastMatch = function(value, regex) {
	var _a;
	var position = 0;
	var lastMatch;
	while (position < value.length) {
		var match = value.substring(position).match(regex);
		if (!match) return {
			match: lastMatch,
			pos: position
		};
		lastMatch = match;
		position += ((_a = match.index) !== null && _a !== void 0 ? _a : 0) + match[0].length;
	}
	return {
		match: lastMatch,
		pos: position
	};
};
//#endregion
//#region node_modules/pdf-lib/es/utils/arrays.js
var last = function(array) {
	return array[array.length - 1];
};
var typedArrayFor = function(value) {
	if (value instanceof Uint8Array) return value;
	var length = value.length;
	var typedArray = new Uint8Array(length);
	for (var idx = 0; idx < length; idx++) typedArray[idx] = value.charCodeAt(idx);
	return typedArray;
};
var mergeIntoTypedArray = function() {
	var arrays = [];
	for (var _i = 0; _i < arguments.length; _i++) arrays[_i] = arguments[_i];
	var arrayCount = arrays.length;
	var typedArrays = [];
	for (var idx = 0; idx < arrayCount; idx++) {
		var element = arrays[idx];
		typedArrays[idx] = element instanceof Uint8Array ? element : typedArrayFor(element);
	}
	var totalSize = 0;
	for (var idx = 0; idx < arrayCount; idx++) totalSize += arrays[idx].length;
	var merged = new Uint8Array(totalSize);
	var offset = 0;
	for (var arrIdx = 0; arrIdx < arrayCount; arrIdx++) {
		var arr = typedArrays[arrIdx];
		for (var byteIdx = 0, arrLen = arr.length; byteIdx < arrLen; byteIdx++) merged[offset++] = arr[byteIdx];
	}
	return merged;
};
var mergeUint8Arrays = function(arrays) {
	var totalSize = 0;
	for (var idx = 0, len = arrays.length; idx < len; idx++) totalSize += arrays[idx].length;
	var mergedBuffer = new Uint8Array(totalSize);
	var offset = 0;
	for (var idx = 0, len = arrays.length; idx < len; idx++) {
		var array = arrays[idx];
		mergedBuffer.set(array, offset);
		offset += array.length;
	}
	return mergedBuffer;
};
var arrayAsString = function(array) {
	var str = "";
	for (var idx = 0, len = array.length; idx < len; idx++) str += charFromCode(array[idx]);
	return str;
};
var byAscendingId = function(a, b) {
	return a.id - b.id;
};
var sortedUniq = function(array, indexer) {
	var uniq = [];
	for (var idx = 0, len = array.length; idx < len; idx++) {
		var curr = array[idx];
		var prev = array[idx - 1];
		if (idx === 0 || indexer(curr) !== indexer(prev)) uniq.push(curr);
	}
	return uniq;
};
var reverseArray = function(array) {
	var arrayLen = array.length;
	for (var idx = 0, len = Math.floor(arrayLen / 2); idx < len; idx++) {
		var leftIdx = idx;
		var rightIdx = arrayLen - idx - 1;
		var temp = array[idx];
		array[leftIdx] = array[rightIdx];
		array[rightIdx] = temp;
	}
	return array;
};
var sum = function(array) {
	var total = 0;
	for (var idx = 0, len = array.length; idx < len; idx++) total += array[idx];
	return total;
};
var range = function(start, end) {
	var arr = new Array(end - start);
	for (var idx = 0, len = arr.length; idx < len; idx++) arr[idx] = start + idx;
	return arr;
};
var pluckIndices = function(arr, indices) {
	var plucked = new Array(indices.length);
	for (var idx = 0, len = indices.length; idx < len; idx++) plucked[idx] = arr[indices[idx]];
	return plucked;
};
var canBeConvertedToUint8Array = function(input) {
	return input instanceof Uint8Array || input instanceof ArrayBuffer || typeof input === "string";
};
var toUint8Array = function(input) {
	if (typeof input === "string") return decodeFromBase64DataUri(input);
	else if (input instanceof ArrayBuffer) return new Uint8Array(input);
	else if (input instanceof Uint8Array) return input;
	else throw new TypeError("`input` must be one of `string | ArrayBuffer | Uint8Array`");
};
//#endregion
//#region node_modules/pdf-lib/es/utils/async.js
/**
* Returns a Promise that resolves after at least one tick of the
* Macro Task Queue occurs.
*/
var waitForTick = function() {
	return new Promise(function(resolve) {
		setTimeout(function() {
			return resolve();
		}, 0);
	});
};
//#endregion
//#region node_modules/pdf-lib/es/utils/unicode.js
/**
* Encodes a string to UTF-16.
*
* @param input The string to be encoded.
* @param byteOrderMark Whether or not a byte order marker (BOM) should be added
*                      to the start of the encoding. (default `true`)
* @returns A Uint16Array containing the UTF-16 encoding of the input string.
*
* -----------------------------------------------------------------------------
*
* JavaScript strings are composed of Unicode code points. Code points are
* integers in the range 0 to 1,114,111 (0x10FFFF). When serializing a string,
* it must be encoded as a sequence of words. A word is typically 8, 16, or 32
* bytes in size. As such, Unicode defines three encoding forms: UTF-8, UTF-16,
* and UTF-32. These encoding forms are described in the Unicode standard [1].
* This function implements the UTF-16 encoding form.
*
* -----------------------------------------------------------------------------
*
* In UTF-16, each code point is mapped to one or two 16-bit integers. The
* UTF-16 mapping logic is as follows [2]:
*
* • If a code point is in the range U+0000..U+FFFF, then map the code point to
*   a 16-bit integer with the most significant byte first.
*
* • If a code point is in the range U+10000..U+10000, then map the code point
*   to two 16-bit integers. The first integer should contain the high surrogate
*   and the second integer should contain the low surrogate. Both surrogates
*   should be written with the most significant byte first.
*
* -----------------------------------------------------------------------------
*
* It is important to note, when iterating through the code points of a string
* in JavaScript, that if a character is encoded as a surrogate pair it will
* increase the string's length by 2 instead of 1 [4]. For example:
*
* ```
* > 'a'.length
* 1
* > '💩'.length
* 2
* > '語'.length
* 1
* > 'a💩語'.length
* 4
* ```
*
* The results of the above example are explained by the fact that the
* characters 'a' and '語' are not represented by surrogate pairs, but '💩' is.
*
* Because of this idiosyncrasy in JavaScript's string implementation and APIs,
* we must "jump" an extra index after encoding a character as a surrogate
* pair. In practice, this means we must increment the index of our for loop by
* 2 if we encode a surrogate pair, and 1 in all other cases.
*
* -----------------------------------------------------------------------------
*
* References:
*   - [1] https://www.unicode.org/versions/Unicode12.0.0/UnicodeStandard-12.0.pdf
*         3.9  Unicode Encoding Forms - UTF-8
*   - [2] http://www.herongyang.com/Unicode/UTF-16-UTF-16-Encoding.html
*   - [3] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length#Description
*
*/
var utf16Encode = function(input, byteOrderMark) {
	if (byteOrderMark === void 0) byteOrderMark = true;
	var encoded = [];
	if (byteOrderMark) encoded.push(65279);
	for (var idx = 0, len = input.length; idx < len;) {
		var codePoint = input.codePointAt(idx);
		if (codePoint < 65536) {
			encoded.push(codePoint);
			idx += 1;
		} else if (codePoint < 1114112) {
			encoded.push(highSurrogate(codePoint), lowSurrogate(codePoint));
			idx += 2;
		} else throw new Error("Invalid code point: 0x" + toHexString(codePoint));
	}
	return new Uint16Array(encoded);
};
/**
* Returns `true` if the `codePoint` is within the
* Basic Multilingual Plane (BMP). Code points inside the BMP are not encoded
* with surrogate pairs.
* @param codePoint The code point to be evaluated.
*
* Reference: https://en.wikipedia.org/wiki/UTF-16#Description
*/
var isWithinBMP = function(codePoint) {
	return codePoint >= 0 && codePoint <= 65535;
};
/**
* Returns `true` if the given `codePoint` is valid and must be represented
* with a surrogate pair when encoded.
* @param codePoint The code point to be evaluated.
*
* Reference: https://en.wikipedia.org/wiki/UTF-16#Description
*/
var hasSurrogates = function(codePoint) {
	return codePoint >= 65536 && codePoint <= 1114111;
};
var highSurrogate = function(codePoint) {
	return Math.floor((codePoint - 65536) / 1024) + 55296;
};
var lowSurrogate = function(codePoint) {
	return (codePoint - 65536) % 1024 + 56320;
};
var ByteOrder;
(function(ByteOrder) {
	ByteOrder["BigEndian"] = "BigEndian";
	ByteOrder["LittleEndian"] = "LittleEndian";
})(ByteOrder || (ByteOrder = {}));
var REPLACEMENT = "�".codePointAt(0);
/**
* Decodes a Uint8Array of data to a string using UTF-16.
*
* Note that this function attempts to recover from erronous input by
* inserting the replacement character (�) to mark invalid code points
* and surrogate pairs.
*
* @param input A Uint8Array containing UTF-16 encoded data
* @param byteOrderMark Whether or not a byte order marker (BOM) should be read
*                      at the start of the encoding. (default `true`)
* @returns The decoded string.
*/
var utf16Decode = function(input, byteOrderMark) {
	if (byteOrderMark === void 0) byteOrderMark = true;
	if (input.length <= 1) return String.fromCodePoint(REPLACEMENT);
	var byteOrder = byteOrderMark ? readBOM(input) : ByteOrder.BigEndian;
	var idx = byteOrderMark ? 2 : 0;
	var codePoints = [];
	while (input.length - idx >= 2) {
		var first = decodeValues(input[idx++], input[idx++], byteOrder);
		if (isHighSurrogate(first)) {
			if (input.length - idx < 2) codePoints.push(REPLACEMENT);
			else {
				var second = decodeValues(input[idx++], input[idx++], byteOrder);
				if (isLowSurrogate(second)) codePoints.push(first, second);
				else codePoints.push(REPLACEMENT);
			}
		} else if (isLowSurrogate(first)) {
			idx += 2;
			codePoints.push(REPLACEMENT);
		} else codePoints.push(first);
	}
	if (idx < input.length) codePoints.push(REPLACEMENT);
	return String.fromCodePoint.apply(String, codePoints);
};
/**
* Returns `true` if the given `codePoint` is a high surrogate.
* @param codePoint The code point to be evaluated.
*
* Reference: https://en.wikipedia.org/wiki/UTF-16#Description
*/
var isHighSurrogate = function(codePoint) {
	return codePoint >= 55296 && codePoint <= 56319;
};
/**
* Returns `true` if the given `codePoint` is a low surrogate.
* @param codePoint The code point to be evaluated.
*
* Reference: https://en.wikipedia.org/wiki/UTF-16#Description
*/
var isLowSurrogate = function(codePoint) {
	return codePoint >= 56320 && codePoint <= 57343;
};
/**
* Decodes the given utf-16 values first and second using the specified
* byte order.
* @param first The first byte of the encoding.
* @param second The second byte of the encoding.
* @param byteOrder The byte order of the encoding.
* Reference: https://en.wikipedia.org/wiki/UTF-16#Examples
*/
var decodeValues = function(first, second, byteOrder) {
	if (byteOrder === ByteOrder.LittleEndian) return second << 8 | first;
	if (byteOrder === ByteOrder.BigEndian) return first << 8 | second;
	throw new Error("Invalid byteOrder: " + byteOrder);
};
/**
* Returns whether the given array contains a byte order mark for the
* UTF-16BE or UTF-16LE encoding. If it has neither, BigEndian is assumed.
*
* Reference: https://en.wikipedia.org/wiki/Byte_order_mark#UTF-16
*
* @param bytes The byte array to be evaluated.
*/
var readBOM = function(bytes) {
	return hasUtf16BigEndianBOM(bytes) ? ByteOrder.BigEndian : hasUtf16LittleEndianBOM(bytes) ? ByteOrder.LittleEndian : ByteOrder.BigEndian;
};
var hasUtf16BigEndianBOM = function(bytes) {
	return bytes[0] === 254 && bytes[1] === 255;
};
var hasUtf16LittleEndianBOM = function(bytes) {
	return bytes[0] === 255 && bytes[1] === 254;
};
var hasUtf16BOM = function(bytes) {
	return hasUtf16BigEndianBOM(bytes) || hasUtf16LittleEndianBOM(bytes);
};
//#endregion
//#region node_modules/pdf-lib/es/utils/numbers.js
/**
* Converts a number to its string representation in decimal. This function
* differs from simply converting a number to a string with `.toString()`
* because this function's output string will **not** contain exponential
* notation.
*
* Credit: https://stackoverflow.com/a/46545519
*/
var numberToString = function(num) {
	var numStr = String(num);
	if (Math.abs(num) < 1) {
		var e = parseInt(num.toString().split("e-")[1]);
		if (e) {
			var negative = num < 0;
			if (negative) num *= -1;
			num *= Math.pow(10, e - 1);
			numStr = "0." + new Array(e).join("0") + num.toString().substring(2);
			if (negative) numStr = "-" + numStr;
		}
	} else {
		var e = parseInt(num.toString().split("+")[1]);
		if (e > 20) {
			e -= 20;
			num /= Math.pow(10, e);
			numStr = num.toString() + new Array(e + 1).join("0");
		}
	}
	return numStr;
};
var sizeInBytes = function(n) {
	return Math.ceil(n.toString(2).length / 8);
};
/**
* Converts a number into its constituent bytes and returns them as
* a number[].
*
* Returns most significant byte as first element in array. It may be necessary
* to call .reverse() to get the bits in the desired order.
*
* Example:
*   bytesFor(0x02A41E) => [ 0b10, 0b10100100, 0b11110 ]
*
* Credit for algorithm: https://stackoverflow.com/a/1936865
*/
var bytesFor = function(n) {
	var bytes = new Uint8Array(sizeInBytes(n));
	for (var i = 1; i <= bytes.length; i++) bytes[i - 1] = n >> (bytes.length - i) * 8;
	return bytes;
};
//#endregion
//#region node_modules/pdf-lib/es/utils/errors.js
var error = function(msg) {
	throw new Error(msg);
};
//#endregion
//#region node_modules/pdf-lib/es/utils/objects.js
var values = function(obj) {
	return Object.keys(obj).map(function(k) {
		return obj[k];
	});
};
var StandardFontValues = values(FontNames);
var isStandardFont = function(input) {
	return StandardFontValues.includes(input);
};
var rectanglesAreEqual = function(a, b) {
	return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
};
//#endregion
//#region node_modules/pdf-lib/es/utils/validators.js
var backtick = function(val) {
	return "`" + val + "`";
};
var singleQuote = function(val) {
	return "'" + val + "'";
};
var formatValue = function(value) {
	var type = typeof value;
	if (type === "string") return singleQuote(value);
	else if (type === "undefined") return backtick(value);
	else return value;
};
var createValueErrorMsg = function(value, valueName, values) {
	var allowedValues = new Array(values.length);
	for (var idx = 0, len = values.length; idx < len; idx++) {
		var v = values[idx];
		allowedValues[idx] = formatValue(v);
	}
	var joinedValues = allowedValues.join(" or ");
	return backtick(valueName) + " must be one of " + joinedValues + ", but was actually " + formatValue(value);
};
var assertIsOneOf = function(value, valueName, allowedValues) {
	if (!Array.isArray(allowedValues)) allowedValues = values(allowedValues);
	for (var idx = 0, len = allowedValues.length; idx < len; idx++) if (value === allowedValues[idx]) return;
	throw new TypeError(createValueErrorMsg(value, valueName, allowedValues));
};
var assertIsOneOfOrUndefined = function(value, valueName, allowedValues) {
	if (!Array.isArray(allowedValues)) allowedValues = values(allowedValues);
	assertIsOneOf(value, valueName, allowedValues.concat(void 0));
};
var assertIsSubset = function(values$1, valueName, allowedValues) {
	if (!Array.isArray(allowedValues)) allowedValues = values(allowedValues);
	for (var idx = 0, len = values$1.length; idx < len; idx++) assertIsOneOf(values$1[idx], valueName, allowedValues);
};
var getType = function(val) {
	if (val === null) return "null";
	if (val === void 0) return "undefined";
	if (typeof val === "string") return "string";
	if (isNaN(val)) return "NaN";
	if (typeof val === "number") return "number";
	if (typeof val === "boolean") return "boolean";
	if (typeof val === "symbol") return "symbol";
	if (typeof val === "bigint") return "bigint";
	if (val.constructor && val.constructor.name) return val.constructor.name;
	if (val.name) return val.name;
	if (val.constructor) return String(val.constructor);
	return String(val);
};
var isType = function(value, type) {
	if (type === "null") return value === null;
	if (type === "undefined") return value === void 0;
	if (type === "string") return typeof value === "string";
	if (type === "number") return typeof value === "number" && !isNaN(value);
	if (type === "boolean") return typeof value === "boolean";
	if (type === "symbol") return typeof value === "symbol";
	if (type === "bigint") return typeof value === "bigint";
	if (type === Date) return value instanceof Date;
	if (type === Array) return value instanceof Array;
	if (type === Uint8Array) return value instanceof Uint8Array;
	if (type === ArrayBuffer) return value instanceof ArrayBuffer;
	if (type === Function) return value instanceof Function;
	return value instanceof type[0];
};
var createTypeErrorMsg = function(value, valueName, types) {
	var allowedTypes = new Array(types.length);
	for (var idx = 0, len = types.length; idx < len; idx++) {
		var type = types[idx];
		if (type === "null") allowedTypes[idx] = backtick("null");
		if (type === "undefined") allowedTypes[idx] = backtick("undefined");
		if (type === "string") allowedTypes[idx] = backtick("string");
		else if (type === "number") allowedTypes[idx] = backtick("number");
		else if (type === "boolean") allowedTypes[idx] = backtick("boolean");
		else if (type === "symbol") allowedTypes[idx] = backtick("symbol");
		else if (type === "bigint") allowedTypes[idx] = backtick("bigint");
		else if (type === Array) allowedTypes[idx] = backtick("Array");
		else if (type === Uint8Array) allowedTypes[idx] = backtick("Uint8Array");
		else if (type === ArrayBuffer) allowedTypes[idx] = backtick("ArrayBuffer");
		else allowedTypes[idx] = backtick(type[1]);
	}
	var joinedTypes = allowedTypes.join(" or ");
	return backtick(valueName) + " must be of type " + joinedTypes + ", but was actually of type " + backtick(getType(value));
};
var assertIs = function(value, valueName, types) {
	for (var idx = 0, len = types.length; idx < len; idx++) if (isType(value, types[idx])) return;
	throw new TypeError(createTypeErrorMsg(value, valueName, types));
};
var assertOrUndefined = function(value, valueName, types) {
	assertIs(value, valueName, types.concat("undefined"));
};
var assertEachIs = function(values, valueName, types) {
	for (var idx = 0, len = values.length; idx < len; idx++) assertIs(values[idx], valueName, types);
};
var assertRange = function(value, valueName, min, max) {
	assertIs(value, valueName, ["number"]);
	assertIs(min, "min", ["number"]);
	assertIs(max, "max", ["number"]);
	max = Math.max(min, max);
	if (value < min || value > max) throw new Error(backtick(valueName) + " must be at least " + min + " and at most " + max + ", but was actually " + value);
};
var assertRangeOrUndefined = function(value, valueName, min, max) {
	assertIs(value, valueName, ["number", "undefined"]);
	if (typeof value === "number") assertRange(value, valueName, min, max);
};
var assertMultiple = function(value, valueName, multiplier) {
	assertIs(value, valueName, ["number"]);
	if (value % multiplier !== 0) throw new Error(backtick(valueName) + " must be a multiple of " + multiplier + ", but was actually " + value);
};
var assertInteger = function(value, valueName) {
	if (!Number.isInteger(value)) throw new Error(backtick(valueName) + " must be an integer, but was actually " + value);
};
var assertPositive = function(value, valueName) {
	if (![1, 0].includes(Math.sign(value))) throw new Error(backtick(valueName) + " must be a positive number or 0, but was actually " + value);
};
//#endregion
//#region node_modules/pdf-lib/es/utils/pdfDocEncoding.js
var pdfDocEncodingToUnicode = /* @__PURE__ */ new Uint16Array(256);
for (var idx$2 = 0; idx$2 < 256; idx$2++) pdfDocEncodingToUnicode[idx$2] = idx$2;
pdfDocEncodingToUnicode[22] = toCharCode("");
pdfDocEncodingToUnicode[24] = toCharCode("˘");
pdfDocEncodingToUnicode[25] = toCharCode("ˇ");
pdfDocEncodingToUnicode[26] = toCharCode("ˆ");
pdfDocEncodingToUnicode[27] = toCharCode("˙");
pdfDocEncodingToUnicode[28] = toCharCode("˝");
pdfDocEncodingToUnicode[29] = toCharCode("˛");
pdfDocEncodingToUnicode[30] = toCharCode("˚");
pdfDocEncodingToUnicode[31] = toCharCode("˜");
pdfDocEncodingToUnicode[127] = toCharCode("�");
pdfDocEncodingToUnicode[128] = toCharCode("•");
pdfDocEncodingToUnicode[129] = toCharCode("†");
pdfDocEncodingToUnicode[130] = toCharCode("‡");
pdfDocEncodingToUnicode[131] = toCharCode("…");
pdfDocEncodingToUnicode[132] = toCharCode("—");
pdfDocEncodingToUnicode[133] = toCharCode("–");
pdfDocEncodingToUnicode[134] = toCharCode("ƒ");
pdfDocEncodingToUnicode[135] = toCharCode("⁄");
pdfDocEncodingToUnicode[136] = toCharCode("‹");
pdfDocEncodingToUnicode[137] = toCharCode("›");
pdfDocEncodingToUnicode[138] = toCharCode("−");
pdfDocEncodingToUnicode[139] = toCharCode("‰");
pdfDocEncodingToUnicode[140] = toCharCode("„");
pdfDocEncodingToUnicode[141] = toCharCode("“");
pdfDocEncodingToUnicode[142] = toCharCode("”");
pdfDocEncodingToUnicode[143] = toCharCode("‘");
pdfDocEncodingToUnicode[144] = toCharCode("’");
pdfDocEncodingToUnicode[145] = toCharCode("‚");
pdfDocEncodingToUnicode[146] = toCharCode("™");
pdfDocEncodingToUnicode[147] = toCharCode("ﬁ");
pdfDocEncodingToUnicode[148] = toCharCode("ﬂ");
pdfDocEncodingToUnicode[149] = toCharCode("Ł");
pdfDocEncodingToUnicode[150] = toCharCode("Œ");
pdfDocEncodingToUnicode[151] = toCharCode("Š");
pdfDocEncodingToUnicode[152] = toCharCode("Ÿ");
pdfDocEncodingToUnicode[153] = toCharCode("Ž");
pdfDocEncodingToUnicode[154] = toCharCode("ı");
pdfDocEncodingToUnicode[155] = toCharCode("ł");
pdfDocEncodingToUnicode[156] = toCharCode("œ");
pdfDocEncodingToUnicode[157] = toCharCode("š");
pdfDocEncodingToUnicode[158] = toCharCode("ž");
pdfDocEncodingToUnicode[159] = toCharCode("�");
pdfDocEncodingToUnicode[160] = toCharCode("€");
pdfDocEncodingToUnicode[173] = toCharCode("�");
/**
* Decode a byte array into a string using PDFDocEncoding.
*
* @param bytes a byte array (decimal representation) containing a string
*              encoded with PDFDocEncoding.
*/
var pdfDocEncodingDecode = function(bytes) {
	var codePoints = new Array(bytes.length);
	for (var idx = 0, len = bytes.length; idx < len; idx++) codePoints[idx] = pdfDocEncodingToUnicode[bytes[idx]];
	return String.fromCodePoint.apply(String, codePoints);
};
//#endregion
//#region node_modules/pdf-lib/es/utils/Cache.js
var Cache = function() {
	function Cache(populate) {
		this.populate = populate;
		this.value = void 0;
	}
	Cache.prototype.getValue = function() {
		return this.value;
	};
	Cache.prototype.access = function() {
		if (!this.value) this.value = this.populate();
		return this.value;
	};
	Cache.prototype.invalidate = function() {
		this.value = void 0;
	};
	Cache.populatedBy = function(populate) {
		return new Cache(populate);
	};
	return Cache;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/errors.js
var MethodNotImplementedError = function(_super) {
	__extends(MethodNotImplementedError, _super);
	function MethodNotImplementedError(className, methodName) {
		var _this = this;
		var msg = "Method " + className + "." + methodName + "() not implemented";
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return MethodNotImplementedError;
}(Error);
var PrivateConstructorError = function(_super) {
	__extends(PrivateConstructorError, _super);
	function PrivateConstructorError(className) {
		var _this = this;
		var msg = "Cannot construct " + className + " - it has a private constructor";
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return PrivateConstructorError;
}(Error);
var UnexpectedObjectTypeError = function(_super) {
	__extends(UnexpectedObjectTypeError, _super);
	function UnexpectedObjectTypeError(expected, actual) {
		var _this = this;
		var name = function(t) {
			var _a, _b;
			return (_a = t === null || t === void 0 ? void 0 : t.name) !== null && _a !== void 0 ? _a : (_b = t === null || t === void 0 ? void 0 : t.constructor) === null || _b === void 0 ? void 0 : _b.name;
		};
		var msg = "Expected instance of " + (Array.isArray(expected) ? expected.map(name) : [name(expected)]).join(" or ") + ", " + ("but got instance of " + (actual ? name(actual) : actual));
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return UnexpectedObjectTypeError;
}(Error);
var UnsupportedEncodingError = function(_super) {
	__extends(UnsupportedEncodingError, _super);
	function UnsupportedEncodingError(encoding) {
		var _this = this;
		var msg = encoding + " stream encoding not supported";
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return UnsupportedEncodingError;
}(Error);
var ReparseError = function(_super) {
	__extends(ReparseError, _super);
	function ReparseError(className, methodName) {
		var _this = this;
		var msg = "Cannot call " + className + "." + methodName + "() more than once";
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return ReparseError;
}(Error);
(function(_super) {
	__extends(MissingCatalogError, _super);
	function MissingCatalogError(ref) {
		var _this = this;
		var msg = "Missing catalog (ref=" + ref + ")";
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return MissingCatalogError;
})(Error);
var MissingPageContentsEmbeddingError = function(_super) {
	__extends(MissingPageContentsEmbeddingError, _super);
	function MissingPageContentsEmbeddingError() {
		var _this = this;
		_this = _super.call(this, "Can't embed page with missing Contents") || this;
		return _this;
	}
	return MissingPageContentsEmbeddingError;
}(Error);
var UnrecognizedStreamTypeError = function(_super) {
	__extends(UnrecognizedStreamTypeError, _super);
	function UnrecognizedStreamTypeError(stream) {
		var _a, _b, _c;
		var _this = this;
		var msg = "Unrecognized stream type: " + ((_c = (_b = (_a = stream === null || stream === void 0 ? void 0 : stream.contructor) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : stream === null || stream === void 0 ? void 0 : stream.name) !== null && _c !== void 0 ? _c : stream);
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return UnrecognizedStreamTypeError;
}(Error);
var PageEmbeddingMismatchedContextError = function(_super) {
	__extends(PageEmbeddingMismatchedContextError, _super);
	function PageEmbeddingMismatchedContextError() {
		var _this = this;
		_this = _super.call(this, "Found mismatched contexts while embedding pages. All pages in the array passed to `PDFDocument.embedPages()` must be from the same document.") || this;
		return _this;
	}
	return PageEmbeddingMismatchedContextError;
}(Error);
var PDFArrayIsNotRectangleError = function(_super) {
	__extends(PDFArrayIsNotRectangleError, _super);
	function PDFArrayIsNotRectangleError(size) {
		var _this = this;
		var msg = "Attempted to convert PDFArray with " + size + " elements to rectangle, but must have exactly 4 elements.";
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return PDFArrayIsNotRectangleError;
}(Error);
var InvalidPDFDateStringError = function(_super) {
	__extends(InvalidPDFDateStringError, _super);
	function InvalidPDFDateStringError(value) {
		var _this = this;
		var msg = "Attempted to convert \"" + value + "\" to a date, but it does not match the PDF date string format.";
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return InvalidPDFDateStringError;
}(Error);
var InvalidTargetIndexError = function(_super) {
	__extends(InvalidTargetIndexError, _super);
	function InvalidTargetIndexError(targetIndex, Count) {
		var _this = this;
		var msg = "Invalid targetIndex specified: targetIndex=" + targetIndex + " must be less than Count=" + Count;
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return InvalidTargetIndexError;
}(Error);
var CorruptPageTreeError = function(_super) {
	__extends(CorruptPageTreeError, _super);
	function CorruptPageTreeError(targetIndex, operation) {
		var _this = this;
		var msg = "Failed to " + operation + " at targetIndex=" + targetIndex + " due to corrupt page tree: It is likely that one or more 'Count' entries are invalid";
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return CorruptPageTreeError;
}(Error);
var IndexOutOfBoundsError = function(_super) {
	__extends(IndexOutOfBoundsError, _super);
	function IndexOutOfBoundsError(index, min, max) {
		var _this = this;
		var msg = "index should be at least " + min + " and at most " + max + ", but was actually " + index;
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return IndexOutOfBoundsError;
}(Error);
var InvalidAcroFieldValueError = function(_super) {
	__extends(InvalidAcroFieldValueError, _super);
	function InvalidAcroFieldValueError() {
		var _this = this;
		_this = _super.call(this, "Attempted to set invalid field value") || this;
		return _this;
	}
	return InvalidAcroFieldValueError;
}(Error);
var MultiSelectValueError = function(_super) {
	__extends(MultiSelectValueError, _super);
	function MultiSelectValueError() {
		var _this = this;
		_this = _super.call(this, "Attempted to select multiple values for single-select field") || this;
		return _this;
	}
	return MultiSelectValueError;
}(Error);
var MissingDAEntryError = function(_super) {
	__extends(MissingDAEntryError, _super);
	function MissingDAEntryError(fieldName) {
		var _this = this;
		var msg = "No /DA (default appearance) entry found for field: " + fieldName;
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return MissingDAEntryError;
}(Error);
var MissingTfOperatorError = function(_super) {
	__extends(MissingTfOperatorError, _super);
	function MissingTfOperatorError(fieldName) {
		var _this = this;
		var msg = "No Tf operator found for DA of field: " + fieldName;
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return MissingTfOperatorError;
}(Error);
var NumberParsingError = function(_super) {
	__extends(NumberParsingError, _super);
	function NumberParsingError(pos, value) {
		var _this = this;
		var msg = "Failed to parse number " + ("(line:" + pos.line + " col:" + pos.column + " offset=" + pos.offset + "): \"" + value + "\"");
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return NumberParsingError;
}(Error);
var PDFParsingError = function(_super) {
	__extends(PDFParsingError, _super);
	function PDFParsingError(pos, details) {
		var _this = this;
		var msg = "Failed to parse PDF document " + ("(line:" + pos.line + " col:" + pos.column + " offset=" + pos.offset + "): " + details);
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return PDFParsingError;
}(Error);
var NextByteAssertionError = function(_super) {
	__extends(NextByteAssertionError, _super);
	function NextByteAssertionError(pos, expectedByte, actualByte) {
		var _this = this;
		var msg = "Expected next byte to be " + expectedByte + " but it was actually " + actualByte;
		_this = _super.call(this, pos, msg) || this;
		return _this;
	}
	return NextByteAssertionError;
}(PDFParsingError);
var PDFObjectParsingError = function(_super) {
	__extends(PDFObjectParsingError, _super);
	function PDFObjectParsingError(pos, byte) {
		var _this = this;
		var msg = "Failed to parse PDF object starting with the following byte: " + byte;
		_this = _super.call(this, pos, msg) || this;
		return _this;
	}
	return PDFObjectParsingError;
}(PDFParsingError);
var PDFInvalidObjectParsingError = function(_super) {
	__extends(PDFInvalidObjectParsingError, _super);
	function PDFInvalidObjectParsingError(pos) {
		var _this = this;
		_this = _super.call(this, pos, "Failed to parse invalid PDF object") || this;
		return _this;
	}
	return PDFInvalidObjectParsingError;
}(PDFParsingError);
var PDFStreamParsingError = function(_super) {
	__extends(PDFStreamParsingError, _super);
	function PDFStreamParsingError(pos) {
		var _this = this;
		_this = _super.call(this, pos, "Failed to parse PDF stream") || this;
		return _this;
	}
	return PDFStreamParsingError;
}(PDFParsingError);
var UnbalancedParenthesisError = function(_super) {
	__extends(UnbalancedParenthesisError, _super);
	function UnbalancedParenthesisError(pos) {
		var _this = this;
		_this = _super.call(this, pos, "Failed to parse PDF literal string due to unbalanced parenthesis") || this;
		return _this;
	}
	return UnbalancedParenthesisError;
}(PDFParsingError);
var StalledParserError = function(_super) {
	__extends(StalledParserError, _super);
	function StalledParserError(pos) {
		var _this = this;
		_this = _super.call(this, pos, "Parser stalled") || this;
		return _this;
	}
	return StalledParserError;
}(PDFParsingError);
var MissingPDFHeaderError = function(_super) {
	__extends(MissingPDFHeaderError, _super);
	function MissingPDFHeaderError(pos) {
		var _this = this;
		_this = _super.call(this, pos, "No PDF header found") || this;
		return _this;
	}
	return MissingPDFHeaderError;
}(PDFParsingError);
var MissingKeywordError = function(_super) {
	__extends(MissingKeywordError, _super);
	function MissingKeywordError(pos, keyword) {
		var _this = this;
		var msg = "Did not find expected keyword '" + arrayAsString(keyword) + "'";
		_this = _super.call(this, pos, msg) || this;
		return _this;
	}
	return MissingKeywordError;
}(PDFParsingError);
//#endregion
//#region node_modules/pdf-lib/es/core/syntax/CharCodes.js
var CharCodes;
(function(CharCodes) {
	CharCodes[CharCodes["Null"] = 0] = "Null";
	CharCodes[CharCodes["Backspace"] = 8] = "Backspace";
	CharCodes[CharCodes["Tab"] = 9] = "Tab";
	CharCodes[CharCodes["Newline"] = 10] = "Newline";
	CharCodes[CharCodes["FormFeed"] = 12] = "FormFeed";
	CharCodes[CharCodes["CarriageReturn"] = 13] = "CarriageReturn";
	CharCodes[CharCodes["Space"] = 32] = "Space";
	CharCodes[CharCodes["ExclamationPoint"] = 33] = "ExclamationPoint";
	CharCodes[CharCodes["Hash"] = 35] = "Hash";
	CharCodes[CharCodes["Percent"] = 37] = "Percent";
	CharCodes[CharCodes["LeftParen"] = 40] = "LeftParen";
	CharCodes[CharCodes["RightParen"] = 41] = "RightParen";
	CharCodes[CharCodes["Plus"] = 43] = "Plus";
	CharCodes[CharCodes["Minus"] = 45] = "Minus";
	CharCodes[CharCodes["Dash"] = 45] = "Dash";
	CharCodes[CharCodes["Period"] = 46] = "Period";
	CharCodes[CharCodes["ForwardSlash"] = 47] = "ForwardSlash";
	CharCodes[CharCodes["Zero"] = 48] = "Zero";
	CharCodes[CharCodes["One"] = 49] = "One";
	CharCodes[CharCodes["Two"] = 50] = "Two";
	CharCodes[CharCodes["Three"] = 51] = "Three";
	CharCodes[CharCodes["Four"] = 52] = "Four";
	CharCodes[CharCodes["Five"] = 53] = "Five";
	CharCodes[CharCodes["Six"] = 54] = "Six";
	CharCodes[CharCodes["Seven"] = 55] = "Seven";
	CharCodes[CharCodes["Eight"] = 56] = "Eight";
	CharCodes[CharCodes["Nine"] = 57] = "Nine";
	CharCodes[CharCodes["LessThan"] = 60] = "LessThan";
	CharCodes[CharCodes["GreaterThan"] = 62] = "GreaterThan";
	CharCodes[CharCodes["A"] = 65] = "A";
	CharCodes[CharCodes["D"] = 68] = "D";
	CharCodes[CharCodes["E"] = 69] = "E";
	CharCodes[CharCodes["F"] = 70] = "F";
	CharCodes[CharCodes["O"] = 79] = "O";
	CharCodes[CharCodes["P"] = 80] = "P";
	CharCodes[CharCodes["R"] = 82] = "R";
	CharCodes[CharCodes["LeftSquareBracket"] = 91] = "LeftSquareBracket";
	CharCodes[CharCodes["BackSlash"] = 92] = "BackSlash";
	CharCodes[CharCodes["RightSquareBracket"] = 93] = "RightSquareBracket";
	CharCodes[CharCodes["a"] = 97] = "a";
	CharCodes[CharCodes["b"] = 98] = "b";
	CharCodes[CharCodes["d"] = 100] = "d";
	CharCodes[CharCodes["e"] = 101] = "e";
	CharCodes[CharCodes["f"] = 102] = "f";
	CharCodes[CharCodes["i"] = 105] = "i";
	CharCodes[CharCodes["j"] = 106] = "j";
	CharCodes[CharCodes["l"] = 108] = "l";
	CharCodes[CharCodes["m"] = 109] = "m";
	CharCodes[CharCodes["n"] = 110] = "n";
	CharCodes[CharCodes["o"] = 111] = "o";
	CharCodes[CharCodes["r"] = 114] = "r";
	CharCodes[CharCodes["s"] = 115] = "s";
	CharCodes[CharCodes["t"] = 116] = "t";
	CharCodes[CharCodes["u"] = 117] = "u";
	CharCodes[CharCodes["x"] = 120] = "x";
	CharCodes[CharCodes["LeftCurly"] = 123] = "LeftCurly";
	CharCodes[CharCodes["RightCurly"] = 125] = "RightCurly";
	CharCodes[CharCodes["Tilde"] = 126] = "Tilde";
})(CharCodes || (CharCodes = {}));
var CharCodes_default = CharCodes;
//#endregion
//#region node_modules/pdf-lib/es/core/document/PDFHeader.js
var import_pako = /* @__PURE__ */ __toESM(require_pako());
var PDFHeader = function() {
	function PDFHeader(major, minor) {
		this.major = String(major);
		this.minor = String(minor);
	}
	PDFHeader.prototype.toString = function() {
		var bc = charFromCode(129);
		return "%PDF-" + this.major + "." + this.minor + "\n%" + bc + bc + bc + bc;
	};
	PDFHeader.prototype.sizeInBytes = function() {
		return 12 + this.major.length + this.minor.length;
	};
	PDFHeader.prototype.copyBytesInto = function(buffer, offset) {
		var initialOffset = offset;
		buffer[offset++] = CharCodes_default.Percent;
		buffer[offset++] = CharCodes_default.P;
		buffer[offset++] = CharCodes_default.D;
		buffer[offset++] = CharCodes_default.F;
		buffer[offset++] = CharCodes_default.Dash;
		offset += copyStringIntoBuffer(this.major, buffer, offset);
		buffer[offset++] = CharCodes_default.Period;
		offset += copyStringIntoBuffer(this.minor, buffer, offset);
		buffer[offset++] = CharCodes_default.Newline;
		buffer[offset++] = CharCodes_default.Percent;
		buffer[offset++] = 129;
		buffer[offset++] = 129;
		buffer[offset++] = 129;
		buffer[offset++] = 129;
		return offset - initialOffset;
	};
	PDFHeader.forVersion = function(major, minor) {
		return new PDFHeader(major, minor);
	};
	return PDFHeader;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/objects/PDFObject.js
var PDFObject = function() {
	function PDFObject() {}
	PDFObject.prototype.clone = function(_context) {
		throw new MethodNotImplementedError(this.constructor.name, "clone");
	};
	PDFObject.prototype.toString = function() {
		throw new MethodNotImplementedError(this.constructor.name, "toString");
	};
	PDFObject.prototype.sizeInBytes = function() {
		throw new MethodNotImplementedError(this.constructor.name, "sizeInBytes");
	};
	PDFObject.prototype.copyBytesInto = function(_buffer, _offset) {
		throw new MethodNotImplementedError(this.constructor.name, "copyBytesInto");
	};
	return PDFObject;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/objects/PDFNumber.js
var PDFNumber = function(_super) {
	__extends(PDFNumber, _super);
	function PDFNumber(value) {
		var _this = _super.call(this) || this;
		_this.numberValue = value;
		_this.stringValue = numberToString(value);
		return _this;
	}
	PDFNumber.prototype.asNumber = function() {
		return this.numberValue;
	};
	/** @deprecated in favor of [[PDFNumber.asNumber]] */
	PDFNumber.prototype.value = function() {
		return this.numberValue;
	};
	PDFNumber.prototype.clone = function() {
		return PDFNumber.of(this.numberValue);
	};
	PDFNumber.prototype.toString = function() {
		return this.stringValue;
	};
	PDFNumber.prototype.sizeInBytes = function() {
		return this.stringValue.length;
	};
	PDFNumber.prototype.copyBytesInto = function(buffer, offset) {
		offset += copyStringIntoBuffer(this.stringValue, buffer, offset);
		return this.stringValue.length;
	};
	PDFNumber.of = function(value) {
		return new PDFNumber(value);
	};
	return PDFNumber;
}(PDFObject);
//#endregion
//#region node_modules/pdf-lib/es/core/objects/PDFArray.js
var PDFArray = function(_super) {
	__extends(PDFArray, _super);
	function PDFArray(context) {
		var _this = _super.call(this) || this;
		_this.array = [];
		_this.context = context;
		return _this;
	}
	PDFArray.prototype.size = function() {
		return this.array.length;
	};
	PDFArray.prototype.push = function(object) {
		this.array.push(object);
	};
	PDFArray.prototype.insert = function(index, object) {
		this.array.splice(index, 0, object);
	};
	PDFArray.prototype.indexOf = function(object) {
		var index = this.array.indexOf(object);
		return index === -1 ? void 0 : index;
	};
	PDFArray.prototype.remove = function(index) {
		this.array.splice(index, 1);
	};
	PDFArray.prototype.set = function(idx, object) {
		this.array[idx] = object;
	};
	PDFArray.prototype.get = function(index) {
		return this.array[index];
	};
	PDFArray.prototype.lookupMaybe = function(index) {
		var _a;
		var types = [];
		for (var _i = 1; _i < arguments.length; _i++) types[_i - 1] = arguments[_i];
		return (_a = this.context).lookupMaybe.apply(_a, __spreadArrays([this.get(index)], types));
	};
	PDFArray.prototype.lookup = function(index) {
		var _a;
		var types = [];
		for (var _i = 1; _i < arguments.length; _i++) types[_i - 1] = arguments[_i];
		return (_a = this.context).lookup.apply(_a, __spreadArrays([this.get(index)], types));
	};
	PDFArray.prototype.asRectangle = function() {
		if (this.size() !== 4) throw new PDFArrayIsNotRectangleError(this.size());
		var lowerLeftX = this.lookup(0, PDFNumber).asNumber();
		var lowerLeftY = this.lookup(1, PDFNumber).asNumber();
		var upperRightX = this.lookup(2, PDFNumber).asNumber();
		var upperRightY = this.lookup(3, PDFNumber).asNumber();
		return {
			x: lowerLeftX,
			y: lowerLeftY,
			width: upperRightX - lowerLeftX,
			height: upperRightY - lowerLeftY
		};
	};
	PDFArray.prototype.asArray = function() {
		return this.array.slice();
	};
	PDFArray.prototype.clone = function(context) {
		var clone = PDFArray.withContext(context || this.context);
		for (var idx = 0, len = this.size(); idx < len; idx++) clone.push(this.array[idx]);
		return clone;
	};
	PDFArray.prototype.toString = function() {
		var arrayString = "[ ";
		for (var idx = 0, len = this.size(); idx < len; idx++) {
			arrayString += this.get(idx).toString();
			arrayString += " ";
		}
		arrayString += "]";
		return arrayString;
	};
	PDFArray.prototype.sizeInBytes = function() {
		var size = 3;
		for (var idx = 0, len = this.size(); idx < len; idx++) size += this.get(idx).sizeInBytes() + 1;
		return size;
	};
	PDFArray.prototype.copyBytesInto = function(buffer, offset) {
		var initialOffset = offset;
		buffer[offset++] = CharCodes_default.LeftSquareBracket;
		buffer[offset++] = CharCodes_default.Space;
		for (var idx = 0, len = this.size(); idx < len; idx++) {
			offset += this.get(idx).copyBytesInto(buffer, offset);
			buffer[offset++] = CharCodes_default.Space;
		}
		buffer[offset++] = CharCodes_default.RightSquareBracket;
		return offset - initialOffset;
	};
	PDFArray.prototype.scalePDFNumbers = function(x, y) {
		for (var idx = 0, len = this.size(); idx < len; idx++) {
			var el = this.lookup(idx);
			if (el instanceof PDFNumber) {
				var factor = idx % 2 === 0 ? x : y;
				this.set(idx, PDFNumber.of(el.asNumber() * factor));
			}
		}
	};
	PDFArray.withContext = function(context) {
		return new PDFArray(context);
	};
	return PDFArray;
}(PDFObject);
//#endregion
//#region node_modules/pdf-lib/es/core/objects/PDFBool.js
var ENFORCER$2 = {};
var PDFBool = function(_super) {
	__extends(PDFBool, _super);
	function PDFBool(enforcer, value) {
		var _this = this;
		if (enforcer !== ENFORCER$2) throw new PrivateConstructorError("PDFBool");
		_this = _super.call(this) || this;
		_this.value = value;
		return _this;
	}
	PDFBool.prototype.asBoolean = function() {
		return this.value;
	};
	PDFBool.prototype.clone = function() {
		return this;
	};
	PDFBool.prototype.toString = function() {
		return String(this.value);
	};
	PDFBool.prototype.sizeInBytes = function() {
		return this.value ? 4 : 5;
	};
	PDFBool.prototype.copyBytesInto = function(buffer, offset) {
		if (this.value) {
			buffer[offset++] = CharCodes_default.t;
			buffer[offset++] = CharCodes_default.r;
			buffer[offset++] = CharCodes_default.u;
			buffer[offset++] = CharCodes_default.e;
			return 4;
		} else {
			buffer[offset++] = CharCodes_default.f;
			buffer[offset++] = CharCodes_default.a;
			buffer[offset++] = CharCodes_default.l;
			buffer[offset++] = CharCodes_default.s;
			buffer[offset++] = CharCodes_default.e;
			return 5;
		}
	};
	PDFBool.True = new PDFBool(ENFORCER$2, true);
	PDFBool.False = new PDFBool(ENFORCER$2, false);
	return PDFBool;
}(PDFObject);
//#endregion
//#region node_modules/pdf-lib/es/core/syntax/Delimiters.js
var IsDelimiter = /* @__PURE__ */ new Uint8Array(256);
IsDelimiter[CharCodes_default.LeftParen] = 1;
IsDelimiter[CharCodes_default.RightParen] = 1;
IsDelimiter[CharCodes_default.LessThan] = 1;
IsDelimiter[CharCodes_default.GreaterThan] = 1;
IsDelimiter[CharCodes_default.LeftSquareBracket] = 1;
IsDelimiter[CharCodes_default.RightSquareBracket] = 1;
IsDelimiter[CharCodes_default.LeftCurly] = 1;
IsDelimiter[CharCodes_default.RightCurly] = 1;
IsDelimiter[CharCodes_default.ForwardSlash] = 1;
IsDelimiter[CharCodes_default.Percent] = 1;
//#endregion
//#region node_modules/pdf-lib/es/core/syntax/Whitespace.js
var IsWhitespace = /* @__PURE__ */ new Uint8Array(256);
IsWhitespace[CharCodes_default.Null] = 1;
IsWhitespace[CharCodes_default.Tab] = 1;
IsWhitespace[CharCodes_default.Newline] = 1;
IsWhitespace[CharCodes_default.FormFeed] = 1;
IsWhitespace[CharCodes_default.CarriageReturn] = 1;
IsWhitespace[CharCodes_default.Space] = 1;
//#endregion
//#region node_modules/pdf-lib/es/core/syntax/Irregular.js
var IsIrregular = /* @__PURE__ */ new Uint8Array(256);
for (var idx$1 = 0, len$1 = 256; idx$1 < len$1; idx$1++) IsIrregular[idx$1] = IsWhitespace[idx$1] || IsDelimiter[idx$1] ? 1 : 0;
IsIrregular[CharCodes_default.Hash] = 1;
//#endregion
//#region node_modules/pdf-lib/es/core/objects/PDFName.js
var decodeName = function(name) {
	return name.replace(/#([\dABCDEF]{2})/g, function(_, hex) {
		return charFromHexCode(hex);
	});
};
var isRegularChar = function(charCode) {
	return charCode >= CharCodes_default.ExclamationPoint && charCode <= CharCodes_default.Tilde && !IsIrregular[charCode];
};
var ENFORCER$1 = {};
var pool$1 = /* @__PURE__ */ new Map();
var PDFName = function(_super) {
	__extends(PDFName, _super);
	function PDFName(enforcer, name) {
		var _this = this;
		if (enforcer !== ENFORCER$1) throw new PrivateConstructorError("PDFName");
		_this = _super.call(this) || this;
		var encodedName = "/";
		for (var idx = 0, len = name.length; idx < len; idx++) {
			var character = name[idx];
			var code = toCharCode(character);
			encodedName += isRegularChar(code) ? character : "#" + toHexString(code);
		}
		_this.encodedName = encodedName;
		return _this;
	}
	PDFName.prototype.asBytes = function() {
		var bytes = [];
		var hex = "";
		var escaped = false;
		var pushByte = function(byte) {
			if (byte !== void 0) bytes.push(byte);
			escaped = false;
		};
		for (var idx = 1, len = this.encodedName.length; idx < len; idx++) {
			var char = this.encodedName[idx];
			var byte = toCharCode(char);
			var nextChar = this.encodedName[idx + 1];
			if (!escaped) {
				if (byte === CharCodes_default.Hash) escaped = true;
				else pushByte(byte);
			} else if (byte >= CharCodes_default.Zero && byte <= CharCodes_default.Nine || byte >= CharCodes_default.a && byte <= CharCodes_default.f || byte >= CharCodes_default.A && byte <= CharCodes_default.F) {
				hex += char;
				if (hex.length === 2 || !(nextChar >= "0" && nextChar <= "9" || nextChar >= "a" && nextChar <= "f" || nextChar >= "A" && nextChar <= "F")) {
					pushByte(parseInt(hex, 16));
					hex = "";
				}
			} else pushByte(byte);
		}
		return new Uint8Array(bytes);
	};
	PDFName.prototype.decodeText = function() {
		var bytes = this.asBytes();
		return String.fromCharCode.apply(String, Array.from(bytes));
	};
	PDFName.prototype.asString = function() {
		return this.encodedName;
	};
	/** @deprecated in favor of [[PDFName.asString]] */
	PDFName.prototype.value = function() {
		return this.encodedName;
	};
	PDFName.prototype.clone = function() {
		return this;
	};
	PDFName.prototype.toString = function() {
		return this.encodedName;
	};
	PDFName.prototype.sizeInBytes = function() {
		return this.encodedName.length;
	};
	PDFName.prototype.copyBytesInto = function(buffer, offset) {
		offset += copyStringIntoBuffer(this.encodedName, buffer, offset);
		return this.encodedName.length;
	};
	PDFName.of = function(name) {
		var decodedValue = decodeName(name);
		var instance = pool$1.get(decodedValue);
		if (!instance) {
			instance = new PDFName(ENFORCER$1, decodedValue);
			pool$1.set(decodedValue, instance);
		}
		return instance;
	};
	PDFName.Length = PDFName.of("Length");
	PDFName.FlateDecode = PDFName.of("FlateDecode");
	PDFName.Resources = PDFName.of("Resources");
	PDFName.Font = PDFName.of("Font");
	PDFName.XObject = PDFName.of("XObject");
	PDFName.ExtGState = PDFName.of("ExtGState");
	PDFName.Contents = PDFName.of("Contents");
	PDFName.Type = PDFName.of("Type");
	PDFName.Parent = PDFName.of("Parent");
	PDFName.MediaBox = PDFName.of("MediaBox");
	PDFName.Page = PDFName.of("Page");
	PDFName.Annots = PDFName.of("Annots");
	PDFName.TrimBox = PDFName.of("TrimBox");
	PDFName.ArtBox = PDFName.of("ArtBox");
	PDFName.BleedBox = PDFName.of("BleedBox");
	PDFName.CropBox = PDFName.of("CropBox");
	PDFName.Rotate = PDFName.of("Rotate");
	PDFName.Title = PDFName.of("Title");
	PDFName.Author = PDFName.of("Author");
	PDFName.Subject = PDFName.of("Subject");
	PDFName.Creator = PDFName.of("Creator");
	PDFName.Keywords = PDFName.of("Keywords");
	PDFName.Producer = PDFName.of("Producer");
	PDFName.CreationDate = PDFName.of("CreationDate");
	PDFName.ModDate = PDFName.of("ModDate");
	return PDFName;
}(PDFObject);
var PDFNull_default = new (function(_super) {
	__extends(PDFNull, _super);
	function PDFNull() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	PDFNull.prototype.asNull = function() {
		return null;
	};
	PDFNull.prototype.clone = function() {
		return this;
	};
	PDFNull.prototype.toString = function() {
		return "null";
	};
	PDFNull.prototype.sizeInBytes = function() {
		return 4;
	};
	PDFNull.prototype.copyBytesInto = function(buffer, offset) {
		buffer[offset++] = CharCodes_default.n;
		buffer[offset++] = CharCodes_default.u;
		buffer[offset++] = CharCodes_default.l;
		buffer[offset++] = CharCodes_default.l;
		return 4;
	};
	return PDFNull;
}(PDFObject))();
//#endregion
//#region node_modules/pdf-lib/es/core/objects/PDFDict.js
var PDFDict = function(_super) {
	__extends(PDFDict, _super);
	function PDFDict(map, context) {
		var _this = _super.call(this) || this;
		_this.dict = map;
		_this.context = context;
		return _this;
	}
	PDFDict.prototype.keys = function() {
		return Array.from(this.dict.keys());
	};
	PDFDict.prototype.values = function() {
		return Array.from(this.dict.values());
	};
	PDFDict.prototype.entries = function() {
		return Array.from(this.dict.entries());
	};
	PDFDict.prototype.set = function(key, value) {
		this.dict.set(key, value);
	};
	PDFDict.prototype.get = function(key, preservePDFNull) {
		if (preservePDFNull === void 0) preservePDFNull = false;
		var value = this.dict.get(key);
		if (value === PDFNull_default && !preservePDFNull) return void 0;
		return value;
	};
	PDFDict.prototype.has = function(key) {
		var value = this.dict.get(key);
		return value !== void 0 && value !== PDFNull_default;
	};
	PDFDict.prototype.lookupMaybe = function(key) {
		var _a;
		var types = [];
		for (var _i = 1; _i < arguments.length; _i++) types[_i - 1] = arguments[_i];
		var preservePDFNull = types.includes(PDFNull_default);
		var value = (_a = this.context).lookupMaybe.apply(_a, __spreadArrays([this.get(key, preservePDFNull)], types));
		if (value === PDFNull_default && !preservePDFNull) return void 0;
		return value;
	};
	PDFDict.prototype.lookup = function(key) {
		var _a;
		var types = [];
		for (var _i = 1; _i < arguments.length; _i++) types[_i - 1] = arguments[_i];
		var preservePDFNull = types.includes(PDFNull_default);
		var value = (_a = this.context).lookup.apply(_a, __spreadArrays([this.get(key, preservePDFNull)], types));
		if (value === PDFNull_default && !preservePDFNull) return void 0;
		return value;
	};
	PDFDict.prototype.delete = function(key) {
		return this.dict.delete(key);
	};
	PDFDict.prototype.asMap = function() {
		return new Map(this.dict);
	};
	/** Generate a random key that doesn't exist in current key set */
	PDFDict.prototype.uniqueKey = function(tag) {
		if (tag === void 0) tag = "";
		var existingKeys = this.keys();
		var key = PDFName.of(this.context.addRandomSuffix(tag, 10));
		while (existingKeys.includes(key)) key = PDFName.of(this.context.addRandomSuffix(tag, 10));
		return key;
	};
	PDFDict.prototype.clone = function(context) {
		var clone = PDFDict.withContext(context || this.context);
		var entries = this.entries();
		for (var idx = 0, len = entries.length; idx < len; idx++) {
			var _a = entries[idx], key = _a[0], value = _a[1];
			clone.set(key, value);
		}
		return clone;
	};
	PDFDict.prototype.toString = function() {
		var dictString = "<<\n";
		var entries = this.entries();
		for (var idx = 0, len = entries.length; idx < len; idx++) {
			var _a = entries[idx], key = _a[0], value = _a[1];
			dictString += key.toString() + " " + value.toString() + "\n";
		}
		dictString += ">>";
		return dictString;
	};
	PDFDict.prototype.sizeInBytes = function() {
		var size = 5;
		var entries = this.entries();
		for (var idx = 0, len = entries.length; idx < len; idx++) {
			var _a = entries[idx], key = _a[0], value = _a[1];
			size += key.sizeInBytes() + value.sizeInBytes() + 2;
		}
		return size;
	};
	PDFDict.prototype.copyBytesInto = function(buffer, offset) {
		var initialOffset = offset;
		buffer[offset++] = CharCodes_default.LessThan;
		buffer[offset++] = CharCodes_default.LessThan;
		buffer[offset++] = CharCodes_default.Newline;
		var entries = this.entries();
		for (var idx = 0, len = entries.length; idx < len; idx++) {
			var _a = entries[idx], key = _a[0], value = _a[1];
			offset += key.copyBytesInto(buffer, offset);
			buffer[offset++] = CharCodes_default.Space;
			offset += value.copyBytesInto(buffer, offset);
			buffer[offset++] = CharCodes_default.Newline;
		}
		buffer[offset++] = CharCodes_default.GreaterThan;
		buffer[offset++] = CharCodes_default.GreaterThan;
		return offset - initialOffset;
	};
	PDFDict.withContext = function(context) {
		return new PDFDict(/* @__PURE__ */ new Map(), context);
	};
	PDFDict.fromMapWithContext = function(map, context) {
		return new PDFDict(map, context);
	};
	return PDFDict;
}(PDFObject);
//#endregion
//#region node_modules/pdf-lib/es/core/objects/PDFStream.js
var PDFStream = function(_super) {
	__extends(PDFStream, _super);
	function PDFStream(dict) {
		var _this = _super.call(this) || this;
		_this.dict = dict;
		return _this;
	}
	PDFStream.prototype.clone = function(_context) {
		throw new MethodNotImplementedError(this.constructor.name, "clone");
	};
	PDFStream.prototype.getContentsString = function() {
		throw new MethodNotImplementedError(this.constructor.name, "getContentsString");
	};
	PDFStream.prototype.getContents = function() {
		throw new MethodNotImplementedError(this.constructor.name, "getContents");
	};
	PDFStream.prototype.getContentsSize = function() {
		throw new MethodNotImplementedError(this.constructor.name, "getContentsSize");
	};
	PDFStream.prototype.updateDict = function() {
		var contentsSize = this.getContentsSize();
		this.dict.set(PDFName.Length, PDFNumber.of(contentsSize));
	};
	PDFStream.prototype.sizeInBytes = function() {
		this.updateDict();
		return this.dict.sizeInBytes() + this.getContentsSize() + 18;
	};
	PDFStream.prototype.toString = function() {
		this.updateDict();
		var streamString = this.dict.toString();
		streamString += "\nstream\n";
		streamString += this.getContentsString();
		streamString += "\nendstream";
		return streamString;
	};
	PDFStream.prototype.copyBytesInto = function(buffer, offset) {
		this.updateDict();
		var initialOffset = offset;
		offset += this.dict.copyBytesInto(buffer, offset);
		buffer[offset++] = CharCodes_default.Newline;
		buffer[offset++] = CharCodes_default.s;
		buffer[offset++] = CharCodes_default.t;
		buffer[offset++] = CharCodes_default.r;
		buffer[offset++] = CharCodes_default.e;
		buffer[offset++] = CharCodes_default.a;
		buffer[offset++] = CharCodes_default.m;
		buffer[offset++] = CharCodes_default.Newline;
		var contents = this.getContents();
		for (var idx = 0, len = contents.length; idx < len; idx++) buffer[offset++] = contents[idx];
		buffer[offset++] = CharCodes_default.Newline;
		buffer[offset++] = CharCodes_default.e;
		buffer[offset++] = CharCodes_default.n;
		buffer[offset++] = CharCodes_default.d;
		buffer[offset++] = CharCodes_default.s;
		buffer[offset++] = CharCodes_default.t;
		buffer[offset++] = CharCodes_default.r;
		buffer[offset++] = CharCodes_default.e;
		buffer[offset++] = CharCodes_default.a;
		buffer[offset++] = CharCodes_default.m;
		return offset - initialOffset;
	};
	return PDFStream;
}(PDFObject);
//#endregion
//#region node_modules/pdf-lib/es/core/objects/PDFRawStream.js
var PDFRawStream = function(_super) {
	__extends(PDFRawStream, _super);
	function PDFRawStream(dict, contents) {
		var _this = _super.call(this, dict) || this;
		_this.contents = contents;
		return _this;
	}
	PDFRawStream.prototype.asUint8Array = function() {
		return this.contents.slice();
	};
	PDFRawStream.prototype.clone = function(context) {
		return PDFRawStream.of(this.dict.clone(context), this.contents.slice());
	};
	PDFRawStream.prototype.getContentsString = function() {
		return arrayAsString(this.contents);
	};
	PDFRawStream.prototype.getContents = function() {
		return this.contents;
	};
	PDFRawStream.prototype.getContentsSize = function() {
		return this.contents.length;
	};
	PDFRawStream.of = function(dict, contents) {
		return new PDFRawStream(dict, contents);
	};
	return PDFRawStream;
}(PDFStream);
//#endregion
//#region node_modules/pdf-lib/es/core/objects/PDFRef.js
var ENFORCER = {};
var pool = /* @__PURE__ */ new Map();
var PDFRef = function(_super) {
	__extends(PDFRef, _super);
	function PDFRef(enforcer, objectNumber, generationNumber) {
		var _this = this;
		if (enforcer !== ENFORCER) throw new PrivateConstructorError("PDFRef");
		_this = _super.call(this) || this;
		_this.objectNumber = objectNumber;
		_this.generationNumber = generationNumber;
		_this.tag = objectNumber + " " + generationNumber + " R";
		return _this;
	}
	PDFRef.prototype.clone = function() {
		return this;
	};
	PDFRef.prototype.toString = function() {
		return this.tag;
	};
	PDFRef.prototype.sizeInBytes = function() {
		return this.tag.length;
	};
	PDFRef.prototype.copyBytesInto = function(buffer, offset) {
		offset += copyStringIntoBuffer(this.tag, buffer, offset);
		return this.tag.length;
	};
	PDFRef.of = function(objectNumber, generationNumber) {
		if (generationNumber === void 0) generationNumber = 0;
		var tag = objectNumber + " " + generationNumber + " R";
		var instance = pool.get(tag);
		if (!instance) {
			instance = new PDFRef(ENFORCER, objectNumber, generationNumber);
			pool.set(tag, instance);
		}
		return instance;
	};
	return PDFRef;
}(PDFObject);
//#endregion
//#region node_modules/pdf-lib/es/core/operators/PDFOperator.js
var PDFOperator = function() {
	function PDFOperator(name, args) {
		this.name = name;
		this.args = args || [];
	}
	PDFOperator.prototype.clone = function(context) {
		var args = new Array(this.args.length);
		for (var idx = 0, len = args.length; idx < len; idx++) {
			var arg = this.args[idx];
			args[idx] = arg instanceof PDFObject ? arg.clone(context) : arg;
		}
		return PDFOperator.of(this.name, args);
	};
	PDFOperator.prototype.toString = function() {
		var value = "";
		for (var idx = 0, len = this.args.length; idx < len; idx++) value += String(this.args[idx]) + " ";
		value += this.name;
		return value;
	};
	PDFOperator.prototype.sizeInBytes = function() {
		var size = 0;
		for (var idx = 0, len = this.args.length; idx < len; idx++) {
			var arg = this.args[idx];
			size += (arg instanceof PDFObject ? arg.sizeInBytes() : arg.length) + 1;
		}
		size += this.name.length;
		return size;
	};
	PDFOperator.prototype.copyBytesInto = function(buffer, offset) {
		var initialOffset = offset;
		for (var idx = 0, len = this.args.length; idx < len; idx++) {
			var arg = this.args[idx];
			if (arg instanceof PDFObject) offset += arg.copyBytesInto(buffer, offset);
			else offset += copyStringIntoBuffer(arg, buffer, offset);
			buffer[offset++] = CharCodes_default.Space;
		}
		offset += copyStringIntoBuffer(this.name, buffer, offset);
		return offset - initialOffset;
	};
	PDFOperator.of = function(name, args) {
		return new PDFOperator(name, args);
	};
	return PDFOperator;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/operators/PDFOperatorNames.js
var PDFOperatorNames;
(function(PDFOperatorNames) {
	PDFOperatorNames["NonStrokingColor"] = "sc";
	PDFOperatorNames["NonStrokingColorN"] = "scn";
	PDFOperatorNames["NonStrokingColorRgb"] = "rg";
	PDFOperatorNames["NonStrokingColorGray"] = "g";
	PDFOperatorNames["NonStrokingColorCmyk"] = "k";
	PDFOperatorNames["NonStrokingColorspace"] = "cs";
	PDFOperatorNames["StrokingColor"] = "SC";
	PDFOperatorNames["StrokingColorN"] = "SCN";
	PDFOperatorNames["StrokingColorRgb"] = "RG";
	PDFOperatorNames["StrokingColorGray"] = "G";
	PDFOperatorNames["StrokingColorCmyk"] = "K";
	PDFOperatorNames["StrokingColorspace"] = "CS";
	PDFOperatorNames["BeginMarkedContentSequence"] = "BDC";
	PDFOperatorNames["BeginMarkedContent"] = "BMC";
	PDFOperatorNames["EndMarkedContent"] = "EMC";
	PDFOperatorNames["MarkedContentPointWithProps"] = "DP";
	PDFOperatorNames["MarkedContentPoint"] = "MP";
	PDFOperatorNames["DrawObject"] = "Do";
	PDFOperatorNames["ConcatTransformationMatrix"] = "cm";
	PDFOperatorNames["PopGraphicsState"] = "Q";
	PDFOperatorNames["PushGraphicsState"] = "q";
	PDFOperatorNames["SetFlatness"] = "i";
	PDFOperatorNames["SetGraphicsStateParams"] = "gs";
	PDFOperatorNames["SetLineCapStyle"] = "J";
	PDFOperatorNames["SetLineDashPattern"] = "d";
	PDFOperatorNames["SetLineJoinStyle"] = "j";
	PDFOperatorNames["SetLineMiterLimit"] = "M";
	PDFOperatorNames["SetLineWidth"] = "w";
	PDFOperatorNames["SetTextMatrix"] = "Tm";
	PDFOperatorNames["SetRenderingIntent"] = "ri";
	PDFOperatorNames["AppendRectangle"] = "re";
	PDFOperatorNames["BeginInlineImage"] = "BI";
	PDFOperatorNames["BeginInlineImageData"] = "ID";
	PDFOperatorNames["EndInlineImage"] = "EI";
	PDFOperatorNames["ClipEvenOdd"] = "W*";
	PDFOperatorNames["ClipNonZero"] = "W";
	PDFOperatorNames["CloseAndStroke"] = "s";
	PDFOperatorNames["CloseFillEvenOddAndStroke"] = "b*";
	PDFOperatorNames["CloseFillNonZeroAndStroke"] = "b";
	PDFOperatorNames["ClosePath"] = "h";
	PDFOperatorNames["AppendBezierCurve"] = "c";
	PDFOperatorNames["CurveToReplicateFinalPoint"] = "y";
	PDFOperatorNames["CurveToReplicateInitialPoint"] = "v";
	PDFOperatorNames["EndPath"] = "n";
	PDFOperatorNames["FillEvenOddAndStroke"] = "B*";
	PDFOperatorNames["FillEvenOdd"] = "f*";
	PDFOperatorNames["FillNonZeroAndStroke"] = "B";
	PDFOperatorNames["FillNonZero"] = "f";
	PDFOperatorNames["LegacyFillNonZero"] = "F";
	PDFOperatorNames["LineTo"] = "l";
	PDFOperatorNames["MoveTo"] = "m";
	PDFOperatorNames["ShadingFill"] = "sh";
	PDFOperatorNames["StrokePath"] = "S";
	PDFOperatorNames["BeginText"] = "BT";
	PDFOperatorNames["EndText"] = "ET";
	PDFOperatorNames["MoveText"] = "Td";
	PDFOperatorNames["MoveTextSetLeading"] = "TD";
	PDFOperatorNames["NextLine"] = "T*";
	PDFOperatorNames["SetCharacterSpacing"] = "Tc";
	PDFOperatorNames["SetFontAndSize"] = "Tf";
	PDFOperatorNames["SetTextHorizontalScaling"] = "Tz";
	PDFOperatorNames["SetTextLineHeight"] = "TL";
	PDFOperatorNames["SetTextRenderingMode"] = "Tr";
	PDFOperatorNames["SetTextRise"] = "Ts";
	PDFOperatorNames["SetWordSpacing"] = "Tw";
	PDFOperatorNames["ShowText"] = "Tj";
	PDFOperatorNames["ShowTextAdjusted"] = "TJ";
	PDFOperatorNames["ShowTextLine"] = "'";
	PDFOperatorNames["ShowTextLineAndSpace"] = "\"";
	PDFOperatorNames["Type3D0"] = "d0";
	PDFOperatorNames["Type3D1"] = "d1";
	PDFOperatorNames["BeginCompatibilitySection"] = "BX";
	PDFOperatorNames["EndCompatibilitySection"] = "EX";
})(PDFOperatorNames || (PDFOperatorNames = {}));
var PDFOperatorNames_default = PDFOperatorNames;
//#endregion
//#region node_modules/pdf-lib/es/core/structures/PDFFlateStream.js
var PDFFlateStream = function(_super) {
	__extends(PDFFlateStream, _super);
	function PDFFlateStream(dict, encode) {
		var _this = _super.call(this, dict) || this;
		_this.computeContents = function() {
			var unencodedContents = _this.getUnencodedContents();
			return _this.encode ? import_pako.default.deflate(unencodedContents) : unencodedContents;
		};
		_this.encode = encode;
		if (encode) dict.set(PDFName.of("Filter"), PDFName.of("FlateDecode"));
		_this.contentsCache = Cache.populatedBy(_this.computeContents);
		return _this;
	}
	PDFFlateStream.prototype.getContents = function() {
		return this.contentsCache.access();
	};
	PDFFlateStream.prototype.getContentsSize = function() {
		return this.contentsCache.access().length;
	};
	PDFFlateStream.prototype.getUnencodedContents = function() {
		throw new MethodNotImplementedError(this.constructor.name, "getUnencodedContents");
	};
	return PDFFlateStream;
}(PDFStream);
//#endregion
//#region node_modules/pdf-lib/es/core/structures/PDFContentStream.js
var PDFContentStream = function(_super) {
	__extends(PDFContentStream, _super);
	function PDFContentStream(dict, operators, encode) {
		if (encode === void 0) encode = true;
		var _this = _super.call(this, dict, encode) || this;
		_this.operators = operators;
		return _this;
	}
	PDFContentStream.prototype.push = function() {
		var _a;
		var operators = [];
		for (var _i = 0; _i < arguments.length; _i++) operators[_i] = arguments[_i];
		(_a = this.operators).push.apply(_a, operators);
	};
	PDFContentStream.prototype.clone = function(context) {
		var operators = new Array(this.operators.length);
		for (var idx = 0, len = this.operators.length; idx < len; idx++) operators[idx] = this.operators[idx].clone(context);
		var _a = this, dict = _a.dict, encode = _a.encode;
		return PDFContentStream.of(dict.clone(context), operators, encode);
	};
	PDFContentStream.prototype.getContentsString = function() {
		var value = "";
		for (var idx = 0, len = this.operators.length; idx < len; idx++) value += this.operators[idx] + "\n";
		return value;
	};
	PDFContentStream.prototype.getUnencodedContents = function() {
		var buffer = new Uint8Array(this.getUnencodedContentsSize());
		var offset = 0;
		for (var idx = 0, len = this.operators.length; idx < len; idx++) {
			offset += this.operators[idx].copyBytesInto(buffer, offset);
			buffer[offset++] = CharCodes_default.Newline;
		}
		return buffer;
	};
	PDFContentStream.prototype.getUnencodedContentsSize = function() {
		var size = 0;
		for (var idx = 0, len = this.operators.length; idx < len; idx++) size += this.operators[idx].sizeInBytes() + 1;
		return size;
	};
	PDFContentStream.of = function(dict, operators, encode) {
		if (encode === void 0) encode = true;
		return new PDFContentStream(dict, operators, encode);
	};
	return PDFContentStream;
}(PDFFlateStream);
//#endregion
//#region node_modules/pdf-lib/es/utils/rng.js
/**
* Generates a pseudo random number. Although it is not cryptographically secure
* and uniformly distributed, it is not a concern for the intended use-case,
* which is to generate distinct numbers.
*
* Credit: https://stackoverflow.com/a/19303725/10254049
*/
var SimpleRNG = function() {
	function SimpleRNG(seed) {
		this.seed = seed;
	}
	SimpleRNG.prototype.nextInt = function() {
		var x = Math.sin(this.seed++) * 1e4;
		return x - Math.floor(x);
	};
	SimpleRNG.withSeed = function(seed) {
		return new SimpleRNG(seed);
	};
	return SimpleRNG;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/PDFContext.js
var byAscendingObjectNumber = function(_a, _b) {
	var a = _a[0];
	var b = _b[0];
	return a.objectNumber - b.objectNumber;
};
var PDFContext = function() {
	function PDFContext() {
		this.largestObjectNumber = 0;
		this.header = PDFHeader.forVersion(1, 7);
		this.trailerInfo = {};
		this.indirectObjects = /* @__PURE__ */ new Map();
		this.rng = SimpleRNG.withSeed(1);
	}
	PDFContext.prototype.assign = function(ref, object) {
		this.indirectObjects.set(ref, object);
		if (ref.objectNumber > this.largestObjectNumber) this.largestObjectNumber = ref.objectNumber;
	};
	PDFContext.prototype.nextRef = function() {
		this.largestObjectNumber += 1;
		return PDFRef.of(this.largestObjectNumber);
	};
	PDFContext.prototype.register = function(object) {
		var ref = this.nextRef();
		this.assign(ref, object);
		return ref;
	};
	PDFContext.prototype.delete = function(ref) {
		return this.indirectObjects.delete(ref);
	};
	PDFContext.prototype.lookupMaybe = function(ref) {
		var types = [];
		for (var _i = 1; _i < arguments.length; _i++) types[_i - 1] = arguments[_i];
		var preservePDFNull = types.includes(PDFNull_default);
		var result = ref instanceof PDFRef ? this.indirectObjects.get(ref) : ref;
		if (!result || result === PDFNull_default && !preservePDFNull) return void 0;
		for (var idx = 0, len = types.length; idx < len; idx++) {
			var type = types[idx];
			if (type === PDFNull_default) {
				if (result === PDFNull_default) return result;
			} else if (result instanceof type) return result;
		}
		throw new UnexpectedObjectTypeError(types, result);
	};
	PDFContext.prototype.lookup = function(ref) {
		var types = [];
		for (var _i = 1; _i < arguments.length; _i++) types[_i - 1] = arguments[_i];
		var result = ref instanceof PDFRef ? this.indirectObjects.get(ref) : ref;
		if (types.length === 0) return result;
		for (var idx = 0, len = types.length; idx < len; idx++) {
			var type = types[idx];
			if (type === PDFNull_default) {
				if (result === PDFNull_default) return result;
			} else if (result instanceof type) return result;
		}
		throw new UnexpectedObjectTypeError(types, result);
	};
	PDFContext.prototype.getObjectRef = function(pdfObject) {
		var entries = Array.from(this.indirectObjects.entries());
		for (var idx = 0, len = entries.length; idx < len; idx++) {
			var _a = entries[idx], ref = _a[0];
			if (_a[1] === pdfObject) return ref;
		}
	};
	PDFContext.prototype.enumerateIndirectObjects = function() {
		return Array.from(this.indirectObjects.entries()).sort(byAscendingObjectNumber);
	};
	PDFContext.prototype.obj = function(literal) {
		if (literal instanceof PDFObject) return literal;
		else if (literal === null || literal === void 0) return PDFNull_default;
		else if (typeof literal === "string") return PDFName.of(literal);
		else if (typeof literal === "number") return PDFNumber.of(literal);
		else if (typeof literal === "boolean") return literal ? PDFBool.True : PDFBool.False;
		else if (Array.isArray(literal)) {
			var array = PDFArray.withContext(this);
			for (var idx = 0, len = literal.length; idx < len; idx++) array.push(this.obj(literal[idx]));
			return array;
		} else {
			var dict = PDFDict.withContext(this);
			var keys = Object.keys(literal);
			for (var idx = 0, len = keys.length; idx < len; idx++) {
				var key = keys[idx];
				var value = literal[key];
				if (value !== void 0) dict.set(PDFName.of(key), this.obj(value));
			}
			return dict;
		}
	};
	PDFContext.prototype.stream = function(contents, dict) {
		if (dict === void 0) dict = {};
		return PDFRawStream.of(this.obj(dict), typedArrayFor(contents));
	};
	PDFContext.prototype.flateStream = function(contents, dict) {
		if (dict === void 0) dict = {};
		return this.stream(import_pako.default.deflate(typedArrayFor(contents)), __assign(__assign({}, dict), { Filter: "FlateDecode" }));
	};
	PDFContext.prototype.contentStream = function(operators, dict) {
		if (dict === void 0) dict = {};
		return PDFContentStream.of(this.obj(dict), operators);
	};
	PDFContext.prototype.formXObject = function(operators, dict) {
		if (dict === void 0) dict = {};
		return this.contentStream(operators, __assign(__assign({
			BBox: this.obj([
				0,
				0,
				0,
				0
			]),
			Matrix: this.obj([
				1,
				0,
				0,
				1,
				0,
				0
			])
		}, dict), {
			Type: "XObject",
			Subtype: "Form"
		}));
	};
	PDFContext.prototype.getPushGraphicsStateContentStream = function() {
		if (this.pushGraphicsStateContentStreamRef) return this.pushGraphicsStateContentStreamRef;
		var dict = this.obj({});
		var op = PDFOperator.of(PDFOperatorNames_default.PushGraphicsState);
		var stream = PDFContentStream.of(dict, [op]);
		this.pushGraphicsStateContentStreamRef = this.register(stream);
		return this.pushGraphicsStateContentStreamRef;
	};
	PDFContext.prototype.getPopGraphicsStateContentStream = function() {
		if (this.popGraphicsStateContentStreamRef) return this.popGraphicsStateContentStreamRef;
		var dict = this.obj({});
		var op = PDFOperator.of(PDFOperatorNames_default.PopGraphicsState);
		var stream = PDFContentStream.of(dict, [op]);
		this.popGraphicsStateContentStreamRef = this.register(stream);
		return this.popGraphicsStateContentStreamRef;
	};
	PDFContext.prototype.addRandomSuffix = function(prefix, suffixLength) {
		if (suffixLength === void 0) suffixLength = 4;
		return prefix + "-" + Math.floor(this.rng.nextInt() * Math.pow(10, suffixLength));
	};
	PDFContext.create = function() {
		return new PDFContext();
	};
	return PDFContext;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/structures/PDFPageLeaf.js
var PDFPageLeaf = function(_super) {
	__extends(PDFPageLeaf, _super);
	function PDFPageLeaf(map, context, autoNormalizeCTM) {
		if (autoNormalizeCTM === void 0) autoNormalizeCTM = true;
		var _this = _super.call(this, map, context) || this;
		_this.normalized = false;
		_this.autoNormalizeCTM = autoNormalizeCTM;
		return _this;
	}
	PDFPageLeaf.prototype.clone = function(context) {
		var clone = PDFPageLeaf.fromMapWithContext(/* @__PURE__ */ new Map(), context || this.context, this.autoNormalizeCTM);
		var entries = this.entries();
		for (var idx = 0, len = entries.length; idx < len; idx++) {
			var _a = entries[idx], key = _a[0], value = _a[1];
			clone.set(key, value);
		}
		return clone;
	};
	PDFPageLeaf.prototype.Parent = function() {
		return this.lookupMaybe(PDFName.Parent, PDFDict);
	};
	PDFPageLeaf.prototype.Contents = function() {
		return this.lookup(PDFName.of("Contents"));
	};
	PDFPageLeaf.prototype.Annots = function() {
		return this.lookupMaybe(PDFName.Annots, PDFArray);
	};
	PDFPageLeaf.prototype.BleedBox = function() {
		return this.lookupMaybe(PDFName.BleedBox, PDFArray);
	};
	PDFPageLeaf.prototype.TrimBox = function() {
		return this.lookupMaybe(PDFName.TrimBox, PDFArray);
	};
	PDFPageLeaf.prototype.ArtBox = function() {
		return this.lookupMaybe(PDFName.ArtBox, PDFArray);
	};
	PDFPageLeaf.prototype.Resources = function() {
		var dictOrRef = this.getInheritableAttribute(PDFName.Resources);
		return this.context.lookupMaybe(dictOrRef, PDFDict);
	};
	PDFPageLeaf.prototype.MediaBox = function() {
		var arrayOrRef = this.getInheritableAttribute(PDFName.MediaBox);
		return this.context.lookup(arrayOrRef, PDFArray);
	};
	PDFPageLeaf.prototype.CropBox = function() {
		var arrayOrRef = this.getInheritableAttribute(PDFName.CropBox);
		return this.context.lookupMaybe(arrayOrRef, PDFArray);
	};
	PDFPageLeaf.prototype.Rotate = function() {
		var numberOrRef = this.getInheritableAttribute(PDFName.Rotate);
		return this.context.lookupMaybe(numberOrRef, PDFNumber);
	};
	PDFPageLeaf.prototype.getInheritableAttribute = function(name) {
		var attribute;
		this.ascend(function(node) {
			if (!attribute) attribute = node.get(name);
		});
		return attribute;
	};
	PDFPageLeaf.prototype.setParent = function(parentRef) {
		this.set(PDFName.Parent, parentRef);
	};
	PDFPageLeaf.prototype.addContentStream = function(contentStreamRef) {
		var Contents = this.normalizedEntries().Contents || this.context.obj([]);
		this.set(PDFName.Contents, Contents);
		Contents.push(contentStreamRef);
	};
	PDFPageLeaf.prototype.wrapContentStreams = function(startStream, endStream) {
		var Contents = this.Contents();
		if (Contents instanceof PDFArray) {
			Contents.insert(0, startStream);
			Contents.push(endStream);
			return true;
		}
		return false;
	};
	PDFPageLeaf.prototype.addAnnot = function(annotRef) {
		this.normalizedEntries().Annots.push(annotRef);
	};
	PDFPageLeaf.prototype.removeAnnot = function(annotRef) {
		var Annots = this.normalizedEntries().Annots;
		var index = Annots.indexOf(annotRef);
		if (index !== void 0) Annots.remove(index);
	};
	PDFPageLeaf.prototype.setFontDictionary = function(name, fontDictRef) {
		this.normalizedEntries().Font.set(name, fontDictRef);
	};
	PDFPageLeaf.prototype.newFontDictionaryKey = function(tag) {
		return this.normalizedEntries().Font.uniqueKey(tag);
	};
	PDFPageLeaf.prototype.newFontDictionary = function(tag, fontDictRef) {
		var key = this.newFontDictionaryKey(tag);
		this.setFontDictionary(key, fontDictRef);
		return key;
	};
	PDFPageLeaf.prototype.setXObject = function(name, xObjectRef) {
		this.normalizedEntries().XObject.set(name, xObjectRef);
	};
	PDFPageLeaf.prototype.newXObjectKey = function(tag) {
		return this.normalizedEntries().XObject.uniqueKey(tag);
	};
	PDFPageLeaf.prototype.newXObject = function(tag, xObjectRef) {
		var key = this.newXObjectKey(tag);
		this.setXObject(key, xObjectRef);
		return key;
	};
	PDFPageLeaf.prototype.setExtGState = function(name, extGStateRef) {
		this.normalizedEntries().ExtGState.set(name, extGStateRef);
	};
	PDFPageLeaf.prototype.newExtGStateKey = function(tag) {
		return this.normalizedEntries().ExtGState.uniqueKey(tag);
	};
	PDFPageLeaf.prototype.newExtGState = function(tag, extGStateRef) {
		var key = this.newExtGStateKey(tag);
		this.setExtGState(key, extGStateRef);
		return key;
	};
	PDFPageLeaf.prototype.ascend = function(visitor) {
		visitor(this);
		var Parent = this.Parent();
		if (Parent) Parent.ascend(visitor);
	};
	PDFPageLeaf.prototype.normalize = function() {
		if (this.normalized) return;
		var context = this.context;
		var contentsRef = this.get(PDFName.Contents);
		if (this.context.lookup(contentsRef) instanceof PDFStream) this.set(PDFName.Contents, context.obj([contentsRef]));
		if (this.autoNormalizeCTM) this.wrapContentStreams(this.context.getPushGraphicsStateContentStream(), this.context.getPopGraphicsStateContentStream());
		var dictOrRef = this.getInheritableAttribute(PDFName.Resources);
		var Resources = context.lookupMaybe(dictOrRef, PDFDict) || context.obj({});
		this.set(PDFName.Resources, Resources);
		var Font = Resources.lookupMaybe(PDFName.Font, PDFDict) || context.obj({});
		Resources.set(PDFName.Font, Font);
		var XObject = Resources.lookupMaybe(PDFName.XObject, PDFDict) || context.obj({});
		Resources.set(PDFName.XObject, XObject);
		var ExtGState = Resources.lookupMaybe(PDFName.ExtGState, PDFDict) || context.obj({});
		Resources.set(PDFName.ExtGState, ExtGState);
		var Annots = this.Annots() || context.obj([]);
		this.set(PDFName.Annots, Annots);
		this.normalized = true;
	};
	PDFPageLeaf.prototype.normalizedEntries = function() {
		this.normalize();
		var Annots = this.Annots();
		var Resources = this.Resources();
		return {
			Annots,
			Resources,
			Contents: this.Contents(),
			Font: Resources.lookup(PDFName.Font, PDFDict),
			XObject: Resources.lookup(PDFName.XObject, PDFDict),
			ExtGState: Resources.lookup(PDFName.ExtGState, PDFDict)
		};
	};
	PDFPageLeaf.InheritableEntries = [
		"Resources",
		"MediaBox",
		"CropBox",
		"Rotate"
	];
	PDFPageLeaf.withContextAndParent = function(context, parent) {
		var dict = /* @__PURE__ */ new Map();
		dict.set(PDFName.Type, PDFName.Page);
		dict.set(PDFName.Parent, parent);
		dict.set(PDFName.Resources, context.obj({}));
		dict.set(PDFName.MediaBox, context.obj([
			0,
			0,
			612,
			792
		]));
		return new PDFPageLeaf(dict, context, false);
	};
	PDFPageLeaf.fromMapWithContext = function(map, context, autoNormalizeCTM) {
		if (autoNormalizeCTM === void 0) autoNormalizeCTM = true;
		return new PDFPageLeaf(map, context, autoNormalizeCTM);
	};
	return PDFPageLeaf;
}(PDFDict);
//#endregion
//#region node_modules/pdf-lib/es/core/PDFObjectCopier.js
/**
* PDFObjectCopier copies PDFObjects from a src context to a dest context.
* The primary use case for this is to copy pages between PDFs.
*
* _Copying_ an object with a PDFObjectCopier is different from _cloning_ an
* object with its [[PDFObject.clone]] method:
*
* ```
*   const src: PDFContext = ...
*   const dest: PDFContext = ...
*   const originalObject: PDFObject = ...
*   const copiedObject = PDFObjectCopier.for(src, dest).copy(originalObject);
*   const clonedObject = originalObject.clone();
* ```
*
* Copying an object is equivalent to cloning it and then copying over any other
* objects that it references. Note that only dictionaries, arrays, and streams
* (or structures build from them) can contain indirect references to other
* objects. Copying a PDFObject that is not a dictionary, array, or stream is
* supported, but is equivalent to cloning it.
*/
var PDFObjectCopier = function() {
	function PDFObjectCopier(src, dest) {
		var _this = this;
		this.traversedObjects = /* @__PURE__ */ new Map();
		this.copy = function(object) {
			return object instanceof PDFPageLeaf ? _this.copyPDFPage(object) : object instanceof PDFDict ? _this.copyPDFDict(object) : object instanceof PDFArray ? _this.copyPDFArray(object) : object instanceof PDFStream ? _this.copyPDFStream(object) : object instanceof PDFRef ? _this.copyPDFIndirectObject(object) : object.clone();
		};
		this.copyPDFPage = function(originalPage) {
			var clonedPage = originalPage.clone();
			var InheritableEntries = PDFPageLeaf.InheritableEntries;
			for (var idx = 0, len = InheritableEntries.length; idx < len; idx++) {
				var key = PDFName.of(InheritableEntries[idx]);
				var value = clonedPage.getInheritableAttribute(key);
				if (!clonedPage.get(key) && value) clonedPage.set(key, value);
			}
			clonedPage.delete(PDFName.of("Parent"));
			return _this.copyPDFDict(clonedPage);
		};
		this.copyPDFDict = function(originalDict) {
			if (_this.traversedObjects.has(originalDict)) return _this.traversedObjects.get(originalDict);
			var clonedDict = originalDict.clone(_this.dest);
			_this.traversedObjects.set(originalDict, clonedDict);
			var entries = originalDict.entries();
			for (var idx = 0, len = entries.length; idx < len; idx++) {
				var _a = entries[idx], key = _a[0], value = _a[1];
				clonedDict.set(key, _this.copy(value));
			}
			return clonedDict;
		};
		this.copyPDFArray = function(originalArray) {
			if (_this.traversedObjects.has(originalArray)) return _this.traversedObjects.get(originalArray);
			var clonedArray = originalArray.clone(_this.dest);
			_this.traversedObjects.set(originalArray, clonedArray);
			for (var idx = 0, len = originalArray.size(); idx < len; idx++) {
				var value = originalArray.get(idx);
				clonedArray.set(idx, _this.copy(value));
			}
			return clonedArray;
		};
		this.copyPDFStream = function(originalStream) {
			if (_this.traversedObjects.has(originalStream)) return _this.traversedObjects.get(originalStream);
			var clonedStream = originalStream.clone(_this.dest);
			_this.traversedObjects.set(originalStream, clonedStream);
			var entries = originalStream.dict.entries();
			for (var idx = 0, len = entries.length; idx < len; idx++) {
				var _a = entries[idx], key = _a[0], value = _a[1];
				clonedStream.dict.set(key, _this.copy(value));
			}
			return clonedStream;
		};
		this.copyPDFIndirectObject = function(ref) {
			if (!_this.traversedObjects.has(ref)) {
				var newRef = _this.dest.nextRef();
				_this.traversedObjects.set(ref, newRef);
				var dereferencedValue = _this.src.lookup(ref);
				if (dereferencedValue) {
					var cloned = _this.copy(dereferencedValue);
					_this.dest.assign(newRef, cloned);
				}
			}
			return _this.traversedObjects.get(ref);
		};
		this.src = src;
		this.dest = dest;
	}
	PDFObjectCopier.for = function(src, dest) {
		return new PDFObjectCopier(src, dest);
	};
	return PDFObjectCopier;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/document/PDFCrossRefSection.js
/**
* Entries should be added using the [[addEntry]] and [[addDeletedEntry]]
* methods **in order of ascending object number**.
*/
var PDFCrossRefSection = function() {
	function PDFCrossRefSection(firstEntry) {
		this.subsections = firstEntry ? [[firstEntry]] : [];
		this.chunkIdx = 0;
		this.chunkLength = firstEntry ? 1 : 0;
	}
	PDFCrossRefSection.prototype.addEntry = function(ref, offset) {
		this.append({
			ref,
			offset,
			deleted: false
		});
	};
	PDFCrossRefSection.prototype.addDeletedEntry = function(ref, nextFreeObjectNumber) {
		this.append({
			ref,
			offset: nextFreeObjectNumber,
			deleted: true
		});
	};
	PDFCrossRefSection.prototype.toString = function() {
		var section = "xref\n";
		for (var rangeIdx = 0, rangeLen = this.subsections.length; rangeIdx < rangeLen; rangeIdx++) {
			var range = this.subsections[rangeIdx];
			section += range[0].ref.objectNumber + " " + range.length + "\n";
			for (var entryIdx = 0, entryLen = range.length; entryIdx < entryLen; entryIdx++) {
				var entry = range[entryIdx];
				section += padStart(String(entry.offset), 10, "0");
				section += " ";
				section += padStart(String(entry.ref.generationNumber), 5, "0");
				section += " ";
				section += entry.deleted ? "f" : "n";
				section += " \n";
			}
		}
		return section;
	};
	PDFCrossRefSection.prototype.sizeInBytes = function() {
		var size = 5;
		for (var idx = 0, len = this.subsections.length; idx < len; idx++) {
			var subsection = this.subsections[idx];
			var subsectionLength = subsection.length;
			var firstEntry = subsection[0];
			size += 2;
			size += String(firstEntry.ref.objectNumber).length;
			size += String(subsectionLength).length;
			size += 20 * subsectionLength;
		}
		return size;
	};
	PDFCrossRefSection.prototype.copyBytesInto = function(buffer, offset) {
		var initialOffset = offset;
		buffer[offset++] = CharCodes_default.x;
		buffer[offset++] = CharCodes_default.r;
		buffer[offset++] = CharCodes_default.e;
		buffer[offset++] = CharCodes_default.f;
		buffer[offset++] = CharCodes_default.Newline;
		offset += this.copySubsectionsIntoBuffer(this.subsections, buffer, offset);
		return offset - initialOffset;
	};
	PDFCrossRefSection.prototype.copySubsectionsIntoBuffer = function(subsections, buffer, offset) {
		var initialOffset = offset;
		var length = subsections.length;
		for (var idx = 0; idx < length; idx++) {
			var subsection = this.subsections[idx];
			var firstObjectNumber = String(subsection[0].ref.objectNumber);
			offset += copyStringIntoBuffer(firstObjectNumber, buffer, offset);
			buffer[offset++] = CharCodes_default.Space;
			var rangeLength = String(subsection.length);
			offset += copyStringIntoBuffer(rangeLength, buffer, offset);
			buffer[offset++] = CharCodes_default.Newline;
			offset += this.copyEntriesIntoBuffer(subsection, buffer, offset);
		}
		return offset - initialOffset;
	};
	PDFCrossRefSection.prototype.copyEntriesIntoBuffer = function(entries, buffer, offset) {
		var length = entries.length;
		for (var idx = 0; idx < length; idx++) {
			var entry = entries[idx];
			var entryOffset = padStart(String(entry.offset), 10, "0");
			offset += copyStringIntoBuffer(entryOffset, buffer, offset);
			buffer[offset++] = CharCodes_default.Space;
			var entryGen = padStart(String(entry.ref.generationNumber), 5, "0");
			offset += copyStringIntoBuffer(entryGen, buffer, offset);
			buffer[offset++] = CharCodes_default.Space;
			buffer[offset++] = entry.deleted ? CharCodes_default.f : CharCodes_default.n;
			buffer[offset++] = CharCodes_default.Space;
			buffer[offset++] = CharCodes_default.Newline;
		}
		return 20 * length;
	};
	PDFCrossRefSection.prototype.append = function(currEntry) {
		if (this.chunkLength === 0) {
			this.subsections.push([currEntry]);
			this.chunkIdx = 0;
			this.chunkLength = 1;
			return;
		}
		var chunk = this.subsections[this.chunkIdx];
		var prevEntry = chunk[this.chunkLength - 1];
		if (currEntry.ref.objectNumber - prevEntry.ref.objectNumber > 1) {
			this.subsections.push([currEntry]);
			this.chunkIdx += 1;
			this.chunkLength = 1;
		} else {
			chunk.push(currEntry);
			this.chunkLength += 1;
		}
	};
	PDFCrossRefSection.create = function() {
		return new PDFCrossRefSection({
			ref: PDFRef.of(0, 65535),
			offset: 0,
			deleted: true
		});
	};
	PDFCrossRefSection.createEmpty = function() {
		return new PDFCrossRefSection();
	};
	return PDFCrossRefSection;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/document/PDFTrailer.js
var PDFTrailer = function() {
	function PDFTrailer(lastXRefOffset) {
		this.lastXRefOffset = String(lastXRefOffset);
	}
	PDFTrailer.prototype.toString = function() {
		return "startxref\n" + this.lastXRefOffset + "\n%%EOF";
	};
	PDFTrailer.prototype.sizeInBytes = function() {
		return 16 + this.lastXRefOffset.length;
	};
	PDFTrailer.prototype.copyBytesInto = function(buffer, offset) {
		var initialOffset = offset;
		buffer[offset++] = CharCodes_default.s;
		buffer[offset++] = CharCodes_default.t;
		buffer[offset++] = CharCodes_default.a;
		buffer[offset++] = CharCodes_default.r;
		buffer[offset++] = CharCodes_default.t;
		buffer[offset++] = CharCodes_default.x;
		buffer[offset++] = CharCodes_default.r;
		buffer[offset++] = CharCodes_default.e;
		buffer[offset++] = CharCodes_default.f;
		buffer[offset++] = CharCodes_default.Newline;
		offset += copyStringIntoBuffer(this.lastXRefOffset, buffer, offset);
		buffer[offset++] = CharCodes_default.Newline;
		buffer[offset++] = CharCodes_default.Percent;
		buffer[offset++] = CharCodes_default.Percent;
		buffer[offset++] = CharCodes_default.E;
		buffer[offset++] = CharCodes_default.O;
		buffer[offset++] = CharCodes_default.F;
		return offset - initialOffset;
	};
	PDFTrailer.forLastCrossRefSectionOffset = function(offset) {
		return new PDFTrailer(offset);
	};
	return PDFTrailer;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/document/PDFTrailerDict.js
var PDFTrailerDict = function() {
	function PDFTrailerDict(dict) {
		this.dict = dict;
	}
	PDFTrailerDict.prototype.toString = function() {
		return "trailer\n" + this.dict.toString();
	};
	PDFTrailerDict.prototype.sizeInBytes = function() {
		return 8 + this.dict.sizeInBytes();
	};
	PDFTrailerDict.prototype.copyBytesInto = function(buffer, offset) {
		var initialOffset = offset;
		buffer[offset++] = CharCodes_default.t;
		buffer[offset++] = CharCodes_default.r;
		buffer[offset++] = CharCodes_default.a;
		buffer[offset++] = CharCodes_default.i;
		buffer[offset++] = CharCodes_default.l;
		buffer[offset++] = CharCodes_default.e;
		buffer[offset++] = CharCodes_default.r;
		buffer[offset++] = CharCodes_default.Newline;
		offset += this.dict.copyBytesInto(buffer, offset);
		return offset - initialOffset;
	};
	PDFTrailerDict.of = function(dict) {
		return new PDFTrailerDict(dict);
	};
	return PDFTrailerDict;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/structures/PDFObjectStream.js
var PDFObjectStream = function(_super) {
	__extends(PDFObjectStream, _super);
	function PDFObjectStream(context, objects, encode) {
		if (encode === void 0) encode = true;
		var _this = _super.call(this, context.obj({}), encode) || this;
		_this.objects = objects;
		_this.offsets = _this.computeObjectOffsets();
		_this.offsetsString = _this.computeOffsetsString();
		_this.dict.set(PDFName.of("Type"), PDFName.of("ObjStm"));
		_this.dict.set(PDFName.of("N"), PDFNumber.of(_this.objects.length));
		_this.dict.set(PDFName.of("First"), PDFNumber.of(_this.offsetsString.length));
		return _this;
	}
	PDFObjectStream.prototype.getObjectsCount = function() {
		return this.objects.length;
	};
	PDFObjectStream.prototype.clone = function(context) {
		return PDFObjectStream.withContextAndObjects(context || this.dict.context, this.objects.slice(), this.encode);
	};
	PDFObjectStream.prototype.getContentsString = function() {
		var value = this.offsetsString;
		for (var idx = 0, len = this.objects.length; idx < len; idx++) {
			var object = this.objects[idx][1];
			value += object + "\n";
		}
		return value;
	};
	PDFObjectStream.prototype.getUnencodedContents = function() {
		var buffer = new Uint8Array(this.getUnencodedContentsSize());
		var offset = copyStringIntoBuffer(this.offsetsString, buffer, 0);
		for (var idx = 0, len = this.objects.length; idx < len; idx++) {
			var object = this.objects[idx][1];
			offset += object.copyBytesInto(buffer, offset);
			buffer[offset++] = CharCodes_default.Newline;
		}
		return buffer;
	};
	PDFObjectStream.prototype.getUnencodedContentsSize = function() {
		return this.offsetsString.length + last(this.offsets)[1] + last(this.objects)[1].sizeInBytes() + 1;
	};
	PDFObjectStream.prototype.computeOffsetsString = function() {
		var offsetsString = "";
		for (var idx = 0, len = this.offsets.length; idx < len; idx++) {
			var _a = this.offsets[idx], objectNumber = _a[0], offset = _a[1];
			offsetsString += objectNumber + " " + offset + " ";
		}
		return offsetsString;
	};
	PDFObjectStream.prototype.computeObjectOffsets = function() {
		var offset = 0;
		var offsets = new Array(this.objects.length);
		for (var idx = 0, len = this.objects.length; idx < len; idx++) {
			var _a = this.objects[idx], ref = _a[0], object = _a[1];
			offsets[idx] = [ref.objectNumber, offset];
			offset += object.sizeInBytes() + 1;
		}
		return offsets;
	};
	PDFObjectStream.withContextAndObjects = function(context, objects, encode) {
		if (encode === void 0) encode = true;
		return new PDFObjectStream(context, objects, encode);
	};
	return PDFObjectStream;
}(PDFFlateStream);
//#endregion
//#region node_modules/pdf-lib/es/core/writers/PDFWriter.js
var PDFWriter = function() {
	function PDFWriter(context, objectsPerTick) {
		var _this = this;
		this.parsedObjects = 0;
		this.shouldWaitForTick = function(n) {
			_this.parsedObjects += n;
			return _this.parsedObjects % _this.objectsPerTick === 0;
		};
		this.context = context;
		this.objectsPerTick = objectsPerTick;
	}
	PDFWriter.prototype.serializeToBuffer = function() {
		return __awaiter(this, void 0, void 0, function() {
			var _a, size, header, indirectObjects, xref, trailerDict, trailer, offset, buffer, idx, len, _b, ref, object, objectNumber, generationNumber, n;
			return __generator(this, function(_c) {
				switch (_c.label) {
					case 0: return [4, this.computeBufferSize()];
					case 1:
						_a = _c.sent(), size = _a.size, header = _a.header, indirectObjects = _a.indirectObjects, xref = _a.xref, trailerDict = _a.trailerDict, trailer = _a.trailer;
						offset = 0;
						buffer = new Uint8Array(size);
						offset += header.copyBytesInto(buffer, offset);
						buffer[offset++] = CharCodes_default.Newline;
						buffer[offset++] = CharCodes_default.Newline;
						idx = 0, len = indirectObjects.length;
						_c.label = 2;
					case 2:
						if (!(idx < len)) return [3, 5];
						_b = indirectObjects[idx], ref = _b[0], object = _b[1];
						objectNumber = String(ref.objectNumber);
						offset += copyStringIntoBuffer(objectNumber, buffer, offset);
						buffer[offset++] = CharCodes_default.Space;
						generationNumber = String(ref.generationNumber);
						offset += copyStringIntoBuffer(generationNumber, buffer, offset);
						buffer[offset++] = CharCodes_default.Space;
						buffer[offset++] = CharCodes_default.o;
						buffer[offset++] = CharCodes_default.b;
						buffer[offset++] = CharCodes_default.j;
						buffer[offset++] = CharCodes_default.Newline;
						offset += object.copyBytesInto(buffer, offset);
						buffer[offset++] = CharCodes_default.Newline;
						buffer[offset++] = CharCodes_default.e;
						buffer[offset++] = CharCodes_default.n;
						buffer[offset++] = CharCodes_default.d;
						buffer[offset++] = CharCodes_default.o;
						buffer[offset++] = CharCodes_default.b;
						buffer[offset++] = CharCodes_default.j;
						buffer[offset++] = CharCodes_default.Newline;
						buffer[offset++] = CharCodes_default.Newline;
						n = object instanceof PDFObjectStream ? object.getObjectsCount() : 1;
						if (!this.shouldWaitForTick(n)) return [3, 4];
						return [4, waitForTick()];
					case 3:
						_c.sent();
						_c.label = 4;
					case 4:
						idx++;
						return [3, 2];
					case 5:
						if (xref) {
							offset += xref.copyBytesInto(buffer, offset);
							buffer[offset++] = CharCodes_default.Newline;
						}
						if (trailerDict) {
							offset += trailerDict.copyBytesInto(buffer, offset);
							buffer[offset++] = CharCodes_default.Newline;
							buffer[offset++] = CharCodes_default.Newline;
						}
						offset += trailer.copyBytesInto(buffer, offset);
						return [2, buffer];
				}
			});
		});
	};
	PDFWriter.prototype.computeIndirectObjectSize = function(_a) {
		var ref = _a[0], object = _a[1];
		return ref.sizeInBytes() + 3 + (object.sizeInBytes() + 9);
	};
	PDFWriter.prototype.createTrailerDict = function() {
		return this.context.obj({
			Size: this.context.largestObjectNumber + 1,
			Root: this.context.trailerInfo.Root,
			Encrypt: this.context.trailerInfo.Encrypt,
			Info: this.context.trailerInfo.Info,
			ID: this.context.trailerInfo.ID
		});
	};
	PDFWriter.prototype.computeBufferSize = function() {
		return __awaiter(this, void 0, void 0, function() {
			var header, size, xref, indirectObjects, idx, len, indirectObject, ref, xrefOffset, trailerDict, trailer;
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						header = PDFHeader.forVersion(1, 7);
						size = header.sizeInBytes() + 2;
						xref = PDFCrossRefSection.create();
						indirectObjects = this.context.enumerateIndirectObjects();
						idx = 0, len = indirectObjects.length;
						_a.label = 1;
					case 1:
						if (!(idx < len)) return [3, 4];
						indirectObject = indirectObjects[idx];
						ref = indirectObject[0];
						xref.addEntry(ref, size);
						size += this.computeIndirectObjectSize(indirectObject);
						if (!this.shouldWaitForTick(1)) return [3, 3];
						return [4, waitForTick()];
					case 2:
						_a.sent();
						_a.label = 3;
					case 3:
						idx++;
						return [3, 1];
					case 4:
						xrefOffset = size;
						size += xref.sizeInBytes() + 1;
						trailerDict = PDFTrailerDict.of(this.createTrailerDict());
						size += trailerDict.sizeInBytes() + 2;
						trailer = PDFTrailer.forLastCrossRefSectionOffset(xrefOffset);
						size += trailer.sizeInBytes();
						return [2, {
							size,
							header,
							indirectObjects,
							xref,
							trailerDict,
							trailer
						}];
				}
			});
		});
	};
	PDFWriter.forContext = function(context, objectsPerTick) {
		return new PDFWriter(context, objectsPerTick);
	};
	return PDFWriter;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/objects/PDFInvalidObject.js
var PDFInvalidObject = function(_super) {
	__extends(PDFInvalidObject, _super);
	function PDFInvalidObject(data) {
		var _this = _super.call(this) || this;
		_this.data = data;
		return _this;
	}
	PDFInvalidObject.prototype.clone = function() {
		return PDFInvalidObject.of(this.data.slice());
	};
	PDFInvalidObject.prototype.toString = function() {
		return "PDFInvalidObject(" + this.data.length + " bytes)";
	};
	PDFInvalidObject.prototype.sizeInBytes = function() {
		return this.data.length;
	};
	PDFInvalidObject.prototype.copyBytesInto = function(buffer, offset) {
		var length = this.data.length;
		for (var idx = 0; idx < length; idx++) buffer[offset++] = this.data[idx];
		return length;
	};
	PDFInvalidObject.of = function(data) {
		return new PDFInvalidObject(data);
	};
	return PDFInvalidObject;
}(PDFObject);
//#endregion
//#region node_modules/pdf-lib/es/core/structures/PDFCrossRefStream.js
var EntryType;
(function(EntryType) {
	EntryType[EntryType["Deleted"] = 0] = "Deleted";
	EntryType[EntryType["Uncompressed"] = 1] = "Uncompressed";
	EntryType[EntryType["Compressed"] = 2] = "Compressed";
})(EntryType || (EntryType = {}));
/**
* Entries should be added using the [[addDeletedEntry]],
* [[addUncompressedEntry]], and [[addCompressedEntry]] methods
* **in order of ascending object number**.
*/
var PDFCrossRefStream = function(_super) {
	__extends(PDFCrossRefStream, _super);
	function PDFCrossRefStream(dict, entries, encode) {
		if (encode === void 0) encode = true;
		var _this = _super.call(this, dict, encode) || this;
		_this.computeIndex = function() {
			var subsections = [];
			var subsectionLength = 0;
			for (var idx = 0, len = _this.entries.length; idx < len; idx++) {
				var currEntry = _this.entries[idx];
				var prevEntry = _this.entries[idx - 1];
				if (idx === 0) subsections.push(currEntry.ref.objectNumber);
				else if (currEntry.ref.objectNumber - prevEntry.ref.objectNumber > 1) {
					subsections.push(subsectionLength);
					subsections.push(currEntry.ref.objectNumber);
					subsectionLength = 0;
				}
				subsectionLength += 1;
			}
			subsections.push(subsectionLength);
			return subsections;
		};
		_this.computeEntryTuples = function() {
			var entryTuples = new Array(_this.entries.length);
			for (var idx = 0, len = _this.entries.length; idx < len; idx++) {
				var entry = _this.entries[idx];
				if (entry.type === EntryType.Deleted) {
					var type = entry.type, nextFreeObjectNumber = entry.nextFreeObjectNumber, ref = entry.ref;
					entryTuples[idx] = [
						type,
						nextFreeObjectNumber,
						ref.generationNumber
					];
				}
				if (entry.type === EntryType.Uncompressed) {
					var type = entry.type, offset = entry.offset, ref = entry.ref;
					entryTuples[idx] = [
						type,
						offset,
						ref.generationNumber
					];
				}
				if (entry.type === EntryType.Compressed) {
					var type = entry.type, objectStreamRef = entry.objectStreamRef, index = entry.index;
					entryTuples[idx] = [
						type,
						objectStreamRef.objectNumber,
						index
					];
				}
			}
			return entryTuples;
		};
		_this.computeMaxEntryByteWidths = function() {
			var entryTuples = _this.entryTuplesCache.access();
			var widths = [
				0,
				0,
				0
			];
			for (var idx = 0, len = entryTuples.length; idx < len; idx++) {
				var _a = entryTuples[idx], first = _a[0], second = _a[1], third = _a[2];
				var firstSize = sizeInBytes(first);
				var secondSize = sizeInBytes(second);
				var thirdSize = sizeInBytes(third);
				if (firstSize > widths[0]) widths[0] = firstSize;
				if (secondSize > widths[1]) widths[1] = secondSize;
				if (thirdSize > widths[2]) widths[2] = thirdSize;
			}
			return widths;
		};
		_this.entries = entries || [];
		_this.entryTuplesCache = Cache.populatedBy(_this.computeEntryTuples);
		_this.maxByteWidthsCache = Cache.populatedBy(_this.computeMaxEntryByteWidths);
		_this.indexCache = Cache.populatedBy(_this.computeIndex);
		dict.set(PDFName.of("Type"), PDFName.of("XRef"));
		return _this;
	}
	PDFCrossRefStream.prototype.addDeletedEntry = function(ref, nextFreeObjectNumber) {
		var type = EntryType.Deleted;
		this.entries.push({
			type,
			ref,
			nextFreeObjectNumber
		});
		this.entryTuplesCache.invalidate();
		this.maxByteWidthsCache.invalidate();
		this.indexCache.invalidate();
		this.contentsCache.invalidate();
	};
	PDFCrossRefStream.prototype.addUncompressedEntry = function(ref, offset) {
		var type = EntryType.Uncompressed;
		this.entries.push({
			type,
			ref,
			offset
		});
		this.entryTuplesCache.invalidate();
		this.maxByteWidthsCache.invalidate();
		this.indexCache.invalidate();
		this.contentsCache.invalidate();
	};
	PDFCrossRefStream.prototype.addCompressedEntry = function(ref, objectStreamRef, index) {
		var type = EntryType.Compressed;
		this.entries.push({
			type,
			ref,
			objectStreamRef,
			index
		});
		this.entryTuplesCache.invalidate();
		this.maxByteWidthsCache.invalidate();
		this.indexCache.invalidate();
		this.contentsCache.invalidate();
	};
	PDFCrossRefStream.prototype.clone = function(context) {
		var _a = this, dict = _a.dict, entries = _a.entries, encode = _a.encode;
		return PDFCrossRefStream.of(dict.clone(context), entries.slice(), encode);
	};
	PDFCrossRefStream.prototype.getContentsString = function() {
		var entryTuples = this.entryTuplesCache.access();
		var byteWidths = this.maxByteWidthsCache.access();
		var value = "";
		for (var entryIdx = 0, entriesLen = entryTuples.length; entryIdx < entriesLen; entryIdx++) {
			var _a = entryTuples[entryIdx], first = _a[0], second = _a[1], third = _a[2];
			var firstBytes = reverseArray(bytesFor(first));
			var secondBytes = reverseArray(bytesFor(second));
			var thirdBytes = reverseArray(bytesFor(third));
			for (var idx = byteWidths[0] - 1; idx >= 0; idx--) value += (firstBytes[idx] || 0).toString(2);
			for (var idx = byteWidths[1] - 1; idx >= 0; idx--) value += (secondBytes[idx] || 0).toString(2);
			for (var idx = byteWidths[2] - 1; idx >= 0; idx--) value += (thirdBytes[idx] || 0).toString(2);
		}
		return value;
	};
	PDFCrossRefStream.prototype.getUnencodedContents = function() {
		var entryTuples = this.entryTuplesCache.access();
		var byteWidths = this.maxByteWidthsCache.access();
		var buffer = new Uint8Array(this.getUnencodedContentsSize());
		var offset = 0;
		for (var entryIdx = 0, entriesLen = entryTuples.length; entryIdx < entriesLen; entryIdx++) {
			var _a = entryTuples[entryIdx], first = _a[0], second = _a[1], third = _a[2];
			var firstBytes = reverseArray(bytesFor(first));
			var secondBytes = reverseArray(bytesFor(second));
			var thirdBytes = reverseArray(bytesFor(third));
			for (var idx = byteWidths[0] - 1; idx >= 0; idx--) buffer[offset++] = firstBytes[idx] || 0;
			for (var idx = byteWidths[1] - 1; idx >= 0; idx--) buffer[offset++] = secondBytes[idx] || 0;
			for (var idx = byteWidths[2] - 1; idx >= 0; idx--) buffer[offset++] = thirdBytes[idx] || 0;
		}
		return buffer;
	};
	PDFCrossRefStream.prototype.getUnencodedContentsSize = function() {
		return sum(this.maxByteWidthsCache.access()) * this.entries.length;
	};
	PDFCrossRefStream.prototype.updateDict = function() {
		_super.prototype.updateDict.call(this);
		var byteWidths = this.maxByteWidthsCache.access();
		var index = this.indexCache.access();
		var context = this.dict.context;
		this.dict.set(PDFName.of("W"), context.obj(byteWidths));
		this.dict.set(PDFName.of("Index"), context.obj(index));
	};
	PDFCrossRefStream.create = function(dict, encode) {
		if (encode === void 0) encode = true;
		var stream = new PDFCrossRefStream(dict, [], encode);
		stream.addDeletedEntry(PDFRef.of(0, 65535), 0);
		return stream;
	};
	PDFCrossRefStream.of = function(dict, entries, encode) {
		if (encode === void 0) encode = true;
		return new PDFCrossRefStream(dict, entries, encode);
	};
	return PDFCrossRefStream;
}(PDFFlateStream);
//#endregion
//#region node_modules/pdf-lib/es/core/writers/PDFStreamWriter.js
var PDFStreamWriter = function(_super) {
	__extends(PDFStreamWriter, _super);
	function PDFStreamWriter(context, objectsPerTick, encodeStreams, objectsPerStream) {
		var _this = _super.call(this, context, objectsPerTick) || this;
		_this.encodeStreams = encodeStreams;
		_this.objectsPerStream = objectsPerStream;
		return _this;
	}
	PDFStreamWriter.prototype.computeBufferSize = function() {
		return __awaiter(this, void 0, void 0, function() {
			var objectNumber, header, size, xrefStream, uncompressedObjects, compressedObjects, objectStreamRefs, indirectObjects, idx, len, indirectObject, ref, object, shouldNotCompress, chunk, objectStreamRef, idx, len, chunk, ref, objectStream, xrefStreamRef, xrefOffset, trailer;
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						objectNumber = this.context.largestObjectNumber + 1;
						header = PDFHeader.forVersion(1, 7);
						size = header.sizeInBytes() + 2;
						xrefStream = PDFCrossRefStream.create(this.createTrailerDict(), this.encodeStreams);
						uncompressedObjects = [];
						compressedObjects = [];
						objectStreamRefs = [];
						indirectObjects = this.context.enumerateIndirectObjects();
						idx = 0, len = indirectObjects.length;
						_a.label = 1;
					case 1:
						if (!(idx < len)) return [3, 6];
						indirectObject = indirectObjects[idx];
						ref = indirectObject[0], object = indirectObject[1];
						shouldNotCompress = ref === this.context.trailerInfo.Encrypt || object instanceof PDFStream || object instanceof PDFInvalidObject || ref.generationNumber !== 0;
						if (!shouldNotCompress) return [3, 4];
						uncompressedObjects.push(indirectObject);
						xrefStream.addUncompressedEntry(ref, size);
						size += this.computeIndirectObjectSize(indirectObject);
						if (!this.shouldWaitForTick(1)) return [3, 3];
						return [4, waitForTick()];
					case 2:
						_a.sent();
						_a.label = 3;
					case 3: return [3, 5];
					case 4:
						chunk = last(compressedObjects);
						objectStreamRef = last(objectStreamRefs);
						if (!chunk || chunk.length % this.objectsPerStream === 0) {
							chunk = [];
							compressedObjects.push(chunk);
							objectStreamRef = PDFRef.of(objectNumber++);
							objectStreamRefs.push(objectStreamRef);
						}
						xrefStream.addCompressedEntry(ref, objectStreamRef, chunk.length);
						chunk.push(indirectObject);
						_a.label = 5;
					case 5:
						idx++;
						return [3, 1];
					case 6:
						idx = 0, len = compressedObjects.length;
						_a.label = 7;
					case 7:
						if (!(idx < len)) return [3, 10];
						chunk = compressedObjects[idx];
						ref = objectStreamRefs[idx];
						objectStream = PDFObjectStream.withContextAndObjects(this.context, chunk, this.encodeStreams);
						xrefStream.addUncompressedEntry(ref, size);
						size += this.computeIndirectObjectSize([ref, objectStream]);
						uncompressedObjects.push([ref, objectStream]);
						if (!this.shouldWaitForTick(chunk.length)) return [3, 9];
						return [4, waitForTick()];
					case 8:
						_a.sent();
						_a.label = 9;
					case 9:
						idx++;
						return [3, 7];
					case 10:
						xrefStreamRef = PDFRef.of(objectNumber++);
						xrefStream.dict.set(PDFName.of("Size"), PDFNumber.of(objectNumber));
						xrefStream.addUncompressedEntry(xrefStreamRef, size);
						xrefOffset = size;
						size += this.computeIndirectObjectSize([xrefStreamRef, xrefStream]);
						uncompressedObjects.push([xrefStreamRef, xrefStream]);
						trailer = PDFTrailer.forLastCrossRefSectionOffset(xrefOffset);
						size += trailer.sizeInBytes();
						return [2, {
							size,
							header,
							indirectObjects: uncompressedObjects,
							trailer
						}];
				}
			});
		});
	};
	PDFStreamWriter.forContext = function(context, objectsPerTick, encodeStreams, objectsPerStream) {
		if (encodeStreams === void 0) encodeStreams = true;
		if (objectsPerStream === void 0) objectsPerStream = 50;
		return new PDFStreamWriter(context, objectsPerTick, encodeStreams, objectsPerStream);
	};
	return PDFStreamWriter;
}(PDFWriter);
//#endregion
//#region node_modules/pdf-lib/es/core/objects/PDFHexString.js
var PDFHexString = function(_super) {
	__extends(PDFHexString, _super);
	function PDFHexString(value) {
		var _this = _super.call(this) || this;
		_this.value = value;
		return _this;
	}
	PDFHexString.prototype.asBytes = function() {
		var hex = this.value + (this.value.length % 2 === 1 ? "0" : "");
		var hexLength = hex.length;
		var bytes = new Uint8Array(hex.length / 2);
		var hexOffset = 0;
		var bytesOffset = 0;
		while (hexOffset < hexLength) {
			var byte = parseInt(hex.substring(hexOffset, hexOffset + 2), 16);
			bytes[bytesOffset] = byte;
			hexOffset += 2;
			bytesOffset += 1;
		}
		return bytes;
	};
	PDFHexString.prototype.decodeText = function() {
		var bytes = this.asBytes();
		if (hasUtf16BOM(bytes)) return utf16Decode(bytes);
		return pdfDocEncodingDecode(bytes);
	};
	PDFHexString.prototype.decodeDate = function() {
		var text = this.decodeText();
		var date = parseDate(text);
		if (!date) throw new InvalidPDFDateStringError(text);
		return date;
	};
	PDFHexString.prototype.asString = function() {
		return this.value;
	};
	PDFHexString.prototype.clone = function() {
		return PDFHexString.of(this.value);
	};
	PDFHexString.prototype.toString = function() {
		return "<" + this.value + ">";
	};
	PDFHexString.prototype.sizeInBytes = function() {
		return this.value.length + 2;
	};
	PDFHexString.prototype.copyBytesInto = function(buffer, offset) {
		buffer[offset++] = CharCodes_default.LessThan;
		offset += copyStringIntoBuffer(this.value, buffer, offset);
		buffer[offset++] = CharCodes_default.GreaterThan;
		return this.value.length + 2;
	};
	PDFHexString.of = function(value) {
		return new PDFHexString(value);
	};
	PDFHexString.fromText = function(value) {
		var encoded = utf16Encode(value);
		var hex = "";
		for (var idx = 0, len = encoded.length; idx < len; idx++) hex += toHexStringOfMinLength(encoded[idx], 4);
		return new PDFHexString(hex);
	};
	return PDFHexString;
}(PDFObject);
//#endregion
//#region node_modules/pdf-lib/es/core/embedders/StandardFontEmbedder.js
/**
* A note of thanks to the developers of https://github.com/foliojs/pdfkit, as
* this class borrows from:
*   https://github.com/foliojs/pdfkit/blob/f91bdd61c164a72ea06be1a43dc0a412afc3925f/lib/font/afm.coffee
*/
var StandardFontEmbedder = function() {
	function StandardFontEmbedder(fontName, customName) {
		this.encoding = fontName === FontNames.ZapfDingbats ? Encodings.ZapfDingbats : fontName === FontNames.Symbol ? Encodings.Symbol : Encodings.WinAnsi;
		this.font = Font.load(fontName);
		this.fontName = this.font.FontName;
		this.customName = customName;
	}
	/**
	* Encode the JavaScript string into this font. (JavaScript encodes strings in
	* Unicode, but standard fonts use either WinAnsi, ZapfDingbats, or Symbol
	* encodings)
	*/
	StandardFontEmbedder.prototype.encodeText = function(text) {
		var glyphs = this.encodeTextAsGlyphs(text);
		var hexCodes = new Array(glyphs.length);
		for (var idx = 0, len = glyphs.length; idx < len; idx++) hexCodes[idx] = toHexString(glyphs[idx].code);
		return PDFHexString.of(hexCodes.join(""));
	};
	StandardFontEmbedder.prototype.widthOfTextAtSize = function(text, size) {
		var glyphs = this.encodeTextAsGlyphs(text);
		var totalWidth = 0;
		for (var idx = 0, len = glyphs.length; idx < len; idx++) {
			var left = glyphs[idx].name;
			var right = (glyphs[idx + 1] || {}).name;
			var kernAmount = this.font.getXAxisKerningForPair(left, right) || 0;
			totalWidth += this.widthOfGlyph(left) + kernAmount;
		}
		var scale = size / 1e3;
		return totalWidth * scale;
	};
	StandardFontEmbedder.prototype.heightOfFontAtSize = function(size, options) {
		if (options === void 0) options = {};
		var _a = options.descender, descender = _a === void 0 ? true : _a;
		var _b = this.font, Ascender = _b.Ascender, Descender = _b.Descender, FontBBox = _b.FontBBox;
		var height = (Ascender || FontBBox[3]) - (Descender || FontBBox[1]);
		if (!descender) height += Descender || 0;
		return height / 1e3 * size;
	};
	StandardFontEmbedder.prototype.sizeOfFontAtHeight = function(height) {
		var _a = this.font, Ascender = _a.Ascender, Descender = _a.Descender, FontBBox = _a.FontBBox;
		var yTop = Ascender || FontBBox[3];
		var yBottom = Descender || FontBBox[1];
		return 1e3 * height / (yTop - yBottom);
	};
	StandardFontEmbedder.prototype.embedIntoContext = function(context, ref) {
		var fontDict = context.obj({
			Type: "Font",
			Subtype: "Type1",
			BaseFont: this.customName || this.fontName,
			Encoding: this.encoding === Encodings.WinAnsi ? "WinAnsiEncoding" : void 0
		});
		if (ref) {
			context.assign(ref, fontDict);
			return ref;
		} else return context.register(fontDict);
	};
	StandardFontEmbedder.prototype.widthOfGlyph = function(glyphName) {
		return this.font.getWidthOfGlyph(glyphName) || 250;
	};
	StandardFontEmbedder.prototype.encodeTextAsGlyphs = function(text) {
		var codePoints = Array.from(text);
		var glyphs = new Array(codePoints.length);
		for (var idx = 0, len = codePoints.length; idx < len; idx++) {
			var codePoint = toCodePoint(codePoints[idx]);
			glyphs[idx] = this.encoding.encodeUnicodeCodePoint(codePoint);
		}
		return glyphs;
	};
	StandardFontEmbedder.for = function(fontName, customName) {
		return new StandardFontEmbedder(fontName, customName);
	};
	return StandardFontEmbedder;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/embedders/CMap.js
/** `glyphs` should be an array of unique glyphs */
var createCmap = function(glyphs, glyphId) {
	var bfChars = new Array(glyphs.length);
	for (var idx = 0, len = glyphs.length; idx < len; idx++) {
		var glyph = glyphs[idx];
		var id = cmapHexFormat(cmapHexString(glyphId(glyph)));
		var unicode = cmapHexFormat.apply(void 0, glyph.codePoints.map(cmapCodePointFormat));
		bfChars[idx] = [id, unicode];
	}
	return fillCmapTemplate(bfChars);
};
var fillCmapTemplate = function(bfChars) {
	return "/CIDInit /ProcSet findresource begin\n12 dict begin\nbegincmap\n/CIDSystemInfo <<\n  /Registry (Adobe)\n  /Ordering (UCS)\n  /Supplement 0\n>> def\n/CMapName /Adobe-Identity-UCS def\n/CMapType 2 def\n1 begincodespacerange\n<0000><ffff>\nendcodespacerange\n" + bfChars.length + " beginbfchar\n" + bfChars.map(function(_a) {
		var glyphId = _a[0], codePoint = _a[1];
		return glyphId + " " + codePoint;
	}).join("\n") + "\nendbfchar\nendcmap\nCMapName currentdict /CMap defineresource pop\nend\nend";
};
var cmapHexFormat = function() {
	var values = [];
	for (var _i = 0; _i < arguments.length; _i++) values[_i] = arguments[_i];
	return "<" + values.join("") + ">";
};
var cmapHexString = function(value) {
	return toHexStringOfMinLength(value, 4);
};
var cmapCodePointFormat = function(codePoint) {
	if (isWithinBMP(codePoint)) return cmapHexString(codePoint);
	if (hasSurrogates(codePoint)) {
		var hs = highSurrogate(codePoint);
		var ls = lowSurrogate(codePoint);
		return "" + cmapHexString(hs) + cmapHexString(ls);
	}
	var msg = "0x" + toHexString(codePoint) + " is not a valid UTF-8 or UTF-16 codepoint.";
	throw new Error(msg);
};
//#endregion
//#region node_modules/pdf-lib/es/core/embedders/FontFlags.js
var makeFontFlags = function(options) {
	var flags = 0;
	var flipBit = function(bit) {
		flags |= 1 << bit - 1;
	};
	if (options.fixedPitch) flipBit(1);
	if (options.serif) flipBit(2);
	if (options.symbolic) flipBit(3);
	if (options.script) flipBit(4);
	if (options.nonsymbolic) flipBit(6);
	if (options.italic) flipBit(7);
	if (options.allCap) flipBit(17);
	if (options.smallCap) flipBit(18);
	if (options.forceBold) flipBit(19);
	return flags;
};
var deriveFontFlags = function(font) {
	var familyClass = font["OS/2"] ? font["OS/2"].sFamilyClass : 0;
	return makeFontFlags({
		fixedPitch: font.post.isFixedPitch,
		serif: 1 <= familyClass && familyClass <= 7,
		symbolic: true,
		script: familyClass === 10,
		italic: font.head.macStyle.italic
	});
};
//#endregion
//#region node_modules/pdf-lib/es/core/objects/PDFString.js
var PDFString = function(_super) {
	__extends(PDFString, _super);
	function PDFString(value) {
		var _this = _super.call(this) || this;
		_this.value = value;
		return _this;
	}
	PDFString.prototype.asBytes = function() {
		var bytes = [];
		var octal = "";
		var escaped = false;
		var pushByte = function(byte) {
			if (byte !== void 0) bytes.push(byte);
			escaped = false;
		};
		for (var idx = 0, len = this.value.length; idx < len; idx++) {
			var char = this.value[idx];
			var byte = toCharCode(char);
			var nextChar = this.value[idx + 1];
			if (!escaped) {
				if (byte === CharCodes_default.BackSlash) escaped = true;
				else pushByte(byte);
			} else if (byte === CharCodes_default.Newline) pushByte();
			else if (byte === CharCodes_default.CarriageReturn) pushByte();
			else if (byte === CharCodes_default.n) pushByte(CharCodes_default.Newline);
			else if (byte === CharCodes_default.r) pushByte(CharCodes_default.CarriageReturn);
			else if (byte === CharCodes_default.t) pushByte(CharCodes_default.Tab);
			else if (byte === CharCodes_default.b) pushByte(CharCodes_default.Backspace);
			else if (byte === CharCodes_default.f) pushByte(CharCodes_default.FormFeed);
			else if (byte === CharCodes_default.LeftParen) pushByte(CharCodes_default.LeftParen);
			else if (byte === CharCodes_default.RightParen) pushByte(CharCodes_default.RightParen);
			else if (byte === CharCodes_default.Backspace) pushByte(CharCodes_default.BackSlash);
			else if (byte >= CharCodes_default.Zero && byte <= CharCodes_default.Seven) {
				octal += char;
				if (octal.length === 3 || !(nextChar >= "0" && nextChar <= "7")) {
					pushByte(parseInt(octal, 8));
					octal = "";
				}
			} else pushByte(byte);
		}
		return new Uint8Array(bytes);
	};
	PDFString.prototype.decodeText = function() {
		var bytes = this.asBytes();
		if (hasUtf16BOM(bytes)) return utf16Decode(bytes);
		return pdfDocEncodingDecode(bytes);
	};
	PDFString.prototype.decodeDate = function() {
		var text = this.decodeText();
		var date = parseDate(text);
		if (!date) throw new InvalidPDFDateStringError(text);
		return date;
	};
	PDFString.prototype.asString = function() {
		return this.value;
	};
	PDFString.prototype.clone = function() {
		return PDFString.of(this.value);
	};
	PDFString.prototype.toString = function() {
		return "(" + this.value + ")";
	};
	PDFString.prototype.sizeInBytes = function() {
		return this.value.length + 2;
	};
	PDFString.prototype.copyBytesInto = function(buffer, offset) {
		buffer[offset++] = CharCodes_default.LeftParen;
		offset += copyStringIntoBuffer(this.value, buffer, offset);
		buffer[offset++] = CharCodes_default.RightParen;
		return this.value.length + 2;
	};
	PDFString.of = function(value) {
		return new PDFString(value);
	};
	PDFString.fromDate = function(date) {
		var year = padStart(String(date.getUTCFullYear()), 4, "0");
		var month = padStart(String(date.getUTCMonth() + 1), 2, "0");
		var day = padStart(String(date.getUTCDate()), 2, "0");
		var hours = padStart(String(date.getUTCHours()), 2, "0");
		var mins = padStart(String(date.getUTCMinutes()), 2, "0");
		var secs = padStart(String(date.getUTCSeconds()), 2, "0");
		return new PDFString("D:" + year + month + day + hours + mins + secs + "Z");
	};
	return PDFString;
}(PDFObject);
//#endregion
//#region node_modules/pdf-lib/es/core/embedders/CustomFontEmbedder.js
/**
* A note of thanks to the developers of https://github.com/foliojs/pdfkit, as
* this class borrows from:
*   https://github.com/devongovett/pdfkit/blob/e71edab0dd4657b5a767804ba86c94c58d01fbca/lib/image/jpeg.coffee
*/
var CustomFontEmbedder = function() {
	function CustomFontEmbedder(font, fontData, customName, fontFeatures) {
		var _this = this;
		this.allGlyphsInFontSortedById = function() {
			var glyphs = new Array(_this.font.characterSet.length);
			for (var idx = 0, len = glyphs.length; idx < len; idx++) {
				var codePoint = _this.font.characterSet[idx];
				glyphs[idx] = _this.font.glyphForCodePoint(codePoint);
			}
			return sortedUniq(glyphs.sort(byAscendingId), function(g) {
				return g.id;
			});
		};
		this.font = font;
		this.scale = 1e3 / this.font.unitsPerEm;
		this.fontData = fontData;
		this.fontName = this.font.postscriptName || "Font";
		this.customName = customName;
		this.fontFeatures = fontFeatures;
		this.baseFontName = "";
		this.glyphCache = Cache.populatedBy(this.allGlyphsInFontSortedById);
	}
	CustomFontEmbedder.for = function(fontkit, fontData, customName, fontFeatures) {
		return __awaiter(this, void 0, void 0, function() {
			var font;
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0: return [4, fontkit.create(fontData)];
					case 1:
						font = _a.sent();
						return [2, new CustomFontEmbedder(font, fontData, customName, fontFeatures)];
				}
			});
		});
	};
	/**
	* Encode the JavaScript string into this font. (JavaScript encodes strings in
	* Unicode, but embedded fonts use their own custom encodings)
	*/
	CustomFontEmbedder.prototype.encodeText = function(text) {
		var glyphs = this.font.layout(text, this.fontFeatures).glyphs;
		var hexCodes = new Array(glyphs.length);
		for (var idx = 0, len = glyphs.length; idx < len; idx++) hexCodes[idx] = toHexStringOfMinLength(glyphs[idx].id, 4);
		return PDFHexString.of(hexCodes.join(""));
	};
	CustomFontEmbedder.prototype.widthOfTextAtSize = function(text, size) {
		var glyphs = this.font.layout(text, this.fontFeatures).glyphs;
		var totalWidth = 0;
		for (var idx = 0, len = glyphs.length; idx < len; idx++) totalWidth += glyphs[idx].advanceWidth * this.scale;
		var scale = size / 1e3;
		return totalWidth * scale;
	};
	CustomFontEmbedder.prototype.heightOfFontAtSize = function(size, options) {
		if (options === void 0) options = {};
		var _a = options.descender, descender = _a === void 0 ? true : _a;
		var _b = this.font, ascent = _b.ascent, descent = _b.descent, bbox = _b.bbox;
		var height = (ascent || bbox.maxY) * this.scale - (descent || bbox.minY) * this.scale;
		if (!descender) height -= Math.abs(descent) || 0;
		return height / 1e3 * size;
	};
	CustomFontEmbedder.prototype.sizeOfFontAtHeight = function(height) {
		var _a = this.font, ascent = _a.ascent, descent = _a.descent, bbox = _a.bbox;
		var yTop = (ascent || bbox.maxY) * this.scale;
		var yBottom = (descent || bbox.minY) * this.scale;
		return 1e3 * height / (yTop - yBottom);
	};
	CustomFontEmbedder.prototype.embedIntoContext = function(context, ref) {
		this.baseFontName = this.customName || context.addRandomSuffix(this.fontName);
		return this.embedFontDict(context, ref);
	};
	CustomFontEmbedder.prototype.embedFontDict = function(context, ref) {
		return __awaiter(this, void 0, void 0, function() {
			var cidFontDictRef, unicodeCMapRef, fontDict;
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0: return [4, this.embedCIDFontDict(context)];
					case 1:
						cidFontDictRef = _a.sent();
						unicodeCMapRef = this.embedUnicodeCmap(context);
						fontDict = context.obj({
							Type: "Font",
							Subtype: "Type0",
							BaseFont: this.baseFontName,
							Encoding: "Identity-H",
							DescendantFonts: [cidFontDictRef],
							ToUnicode: unicodeCMapRef
						});
						if (ref) {
							context.assign(ref, fontDict);
							return [2, ref];
						} else return [2, context.register(fontDict)];
				}
			});
		});
	};
	CustomFontEmbedder.prototype.isCFF = function() {
		return this.font.cff;
	};
	CustomFontEmbedder.prototype.embedCIDFontDict = function(context) {
		return __awaiter(this, void 0, void 0, function() {
			var fontDescriptorRef, cidFontDict;
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0: return [4, this.embedFontDescriptor(context)];
					case 1:
						fontDescriptorRef = _a.sent();
						cidFontDict = context.obj({
							Type: "Font",
							Subtype: this.isCFF() ? "CIDFontType0" : "CIDFontType2",
							CIDToGIDMap: "Identity",
							BaseFont: this.baseFontName,
							CIDSystemInfo: {
								Registry: PDFString.of("Adobe"),
								Ordering: PDFString.of("Identity"),
								Supplement: 0
							},
							FontDescriptor: fontDescriptorRef,
							W: this.computeWidths()
						});
						return [2, context.register(cidFontDict)];
				}
			});
		});
	};
	CustomFontEmbedder.prototype.embedFontDescriptor = function(context) {
		return __awaiter(this, void 0, void 0, function() {
			var fontStreamRef, scale, _a, italicAngle, ascent, descent, capHeight, xHeight, _b, minX, minY, maxX, maxY, fontDescriptor;
			var _c;
			return __generator(this, function(_d) {
				switch (_d.label) {
					case 0: return [4, this.embedFontStream(context)];
					case 1:
						fontStreamRef = _d.sent();
						scale = this.scale;
						_a = this.font, italicAngle = _a.italicAngle, ascent = _a.ascent, descent = _a.descent, capHeight = _a.capHeight, xHeight = _a.xHeight;
						_b = this.font.bbox, minX = _b.minX, minY = _b.minY, maxX = _b.maxX, maxY = _b.maxY;
						fontDescriptor = context.obj((_c = {
							Type: "FontDescriptor",
							FontName: this.baseFontName,
							Flags: deriveFontFlags(this.font),
							FontBBox: [
								minX * scale,
								minY * scale,
								maxX * scale,
								maxY * scale
							],
							ItalicAngle: italicAngle,
							Ascent: ascent * scale,
							Descent: descent * scale,
							CapHeight: (capHeight || ascent) * scale,
							XHeight: (xHeight || 0) * scale,
							StemV: 0
						}, _c[this.isCFF() ? "FontFile3" : "FontFile2"] = fontStreamRef, _c));
						return [2, context.register(fontDescriptor)];
				}
			});
		});
	};
	CustomFontEmbedder.prototype.serializeFont = function() {
		return __awaiter(this, void 0, void 0, function() {
			return __generator(this, function(_a) {
				return [2, this.fontData];
			});
		});
	};
	CustomFontEmbedder.prototype.embedFontStream = function(context) {
		return __awaiter(this, void 0, void 0, function() {
			var fontStream, _a, _b;
			return __generator(this, function(_c) {
				switch (_c.label) {
					case 0:
						_b = (_a = context).flateStream;
						return [4, this.serializeFont()];
					case 1:
						fontStream = _b.apply(_a, [_c.sent(), { Subtype: this.isCFF() ? "CIDFontType0C" : void 0 }]);
						return [2, context.register(fontStream)];
				}
			});
		});
	};
	CustomFontEmbedder.prototype.embedUnicodeCmap = function(context) {
		var cmap = createCmap(this.glyphCache.access(), this.glyphId.bind(this));
		var cmapStream = context.flateStream(cmap);
		return context.register(cmapStream);
	};
	CustomFontEmbedder.prototype.glyphId = function(glyph) {
		return glyph ? glyph.id : -1;
	};
	CustomFontEmbedder.prototype.computeWidths = function() {
		var glyphs = this.glyphCache.access();
		var widths = [];
		var currSection = [];
		for (var idx = 0, len = glyphs.length; idx < len; idx++) {
			var currGlyph = glyphs[idx];
			var prevGlyph = glyphs[idx - 1];
			var currGlyphId = this.glyphId(currGlyph);
			var prevGlyphId = this.glyphId(prevGlyph);
			if (idx === 0) widths.push(currGlyphId);
			else if (currGlyphId - prevGlyphId !== 1) {
				widths.push(currSection);
				widths.push(currGlyphId);
				currSection = [];
			}
			currSection.push(currGlyph.advanceWidth * this.scale);
		}
		widths.push(currSection);
		return widths;
	};
	return CustomFontEmbedder;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/embedders/CustomFontSubsetEmbedder.js
/**
* A note of thanks to the developers of https://github.com/foliojs/pdfkit, as
* this class borrows from:
*   https://github.com/devongovett/pdfkit/blob/e71edab0dd4657b5a767804ba86c94c58d01fbca/lib/image/jpeg.coffee
*/
var CustomFontSubsetEmbedder = function(_super) {
	__extends(CustomFontSubsetEmbedder, _super);
	function CustomFontSubsetEmbedder(font, fontData, customFontName, fontFeatures) {
		var _this = _super.call(this, font, fontData, customFontName, fontFeatures) || this;
		_this.subset = _this.font.createSubset();
		_this.glyphs = [];
		_this.glyphCache = Cache.populatedBy(function() {
			return _this.glyphs;
		});
		_this.glyphIdMap = /* @__PURE__ */ new Map();
		return _this;
	}
	CustomFontSubsetEmbedder.for = function(fontkit, fontData, customFontName, fontFeatures) {
		return __awaiter(this, void 0, void 0, function() {
			var font;
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0: return [4, fontkit.create(fontData)];
					case 1:
						font = _a.sent();
						return [2, new CustomFontSubsetEmbedder(font, fontData, customFontName, fontFeatures)];
				}
			});
		});
	};
	CustomFontSubsetEmbedder.prototype.encodeText = function(text) {
		var glyphs = this.font.layout(text, this.fontFeatures).glyphs;
		var hexCodes = new Array(glyphs.length);
		for (var idx = 0, len = glyphs.length; idx < len; idx++) {
			var glyph = glyphs[idx];
			var subsetGlyphId = this.subset.includeGlyph(glyph);
			this.glyphs[subsetGlyphId - 1] = glyph;
			this.glyphIdMap.set(glyph.id, subsetGlyphId);
			hexCodes[idx] = toHexStringOfMinLength(subsetGlyphId, 4);
		}
		this.glyphCache.invalidate();
		return PDFHexString.of(hexCodes.join(""));
	};
	CustomFontSubsetEmbedder.prototype.isCFF = function() {
		return this.subset.cff;
	};
	CustomFontSubsetEmbedder.prototype.glyphId = function(glyph) {
		return glyph ? this.glyphIdMap.get(glyph.id) : -1;
	};
	CustomFontSubsetEmbedder.prototype.serializeFont = function() {
		var _this = this;
		return new Promise(function(resolve, reject) {
			var parts = [];
			_this.subset.encodeStream().on("data", function(bytes) {
				return parts.push(bytes);
			}).on("end", function() {
				return resolve(mergeUint8Arrays(parts));
			}).on("error", function(err) {
				return reject(err);
			});
		});
	};
	return CustomFontSubsetEmbedder;
}(CustomFontEmbedder);
//#endregion
//#region node_modules/pdf-lib/es/core/embedders/FileEmbedder.js
/**
* From the PDF-A3 specification, section **3.1. Requirements - General**.
* See:
* * https://www.pdfa.org/wp-content/uploads/2018/10/PDF20_AN002-AF.pdf
*/
var AFRelationship;
(function(AFRelationship) {
	AFRelationship["Source"] = "Source";
	AFRelationship["Data"] = "Data";
	AFRelationship["Alternative"] = "Alternative";
	AFRelationship["Supplement"] = "Supplement";
	AFRelationship["EncryptedPayload"] = "EncryptedPayload";
	AFRelationship["FormData"] = "EncryptedPayload";
	AFRelationship["Schema"] = "Schema";
	AFRelationship["Unspecified"] = "Unspecified";
})(AFRelationship || (AFRelationship = {}));
var FileEmbedder = function() {
	function FileEmbedder(fileData, fileName, options) {
		if (options === void 0) options = {};
		this.fileData = fileData;
		this.fileName = fileName;
		this.options = options;
	}
	FileEmbedder.for = function(bytes, fileName, options) {
		if (options === void 0) options = {};
		return new FileEmbedder(bytes, fileName, options);
	};
	FileEmbedder.prototype.embedIntoContext = function(context, ref) {
		return __awaiter(this, void 0, void 0, function() {
			var _a, mimeType, description, creationDate, modificationDate, afRelationship, embeddedFileStream, embeddedFileStreamRef, fileSpecDict;
			return __generator(this, function(_b) {
				_a = this.options, mimeType = _a.mimeType, description = _a.description, creationDate = _a.creationDate, modificationDate = _a.modificationDate, afRelationship = _a.afRelationship;
				embeddedFileStream = context.flateStream(this.fileData, {
					Type: "EmbeddedFile",
					Subtype: mimeType !== null && mimeType !== void 0 ? mimeType : void 0,
					Params: {
						Size: this.fileData.length,
						CreationDate: creationDate ? PDFString.fromDate(creationDate) : void 0,
						ModDate: modificationDate ? PDFString.fromDate(modificationDate) : void 0
					}
				});
				embeddedFileStreamRef = context.register(embeddedFileStream);
				fileSpecDict = context.obj({
					Type: "Filespec",
					F: PDFString.of(this.fileName),
					UF: PDFHexString.fromText(this.fileName),
					EF: { F: embeddedFileStreamRef },
					Desc: description ? PDFHexString.fromText(description) : void 0,
					AFRelationship: afRelationship !== null && afRelationship !== void 0 ? afRelationship : void 0
				});
				if (ref) {
					context.assign(ref, fileSpecDict);
					return [2, ref];
				} else return [2, context.register(fileSpecDict)];
			});
		});
	};
	return FileEmbedder;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/embedders/JpegEmbedder.js
var MARKERS = [
	65472,
	65473,
	65474,
	65475,
	65477,
	65478,
	65479,
	65480,
	65481,
	65482,
	65483,
	65484,
	65485,
	65486,
	65487
];
var ColorSpace;
(function(ColorSpace) {
	ColorSpace["DeviceGray"] = "DeviceGray";
	ColorSpace["DeviceRGB"] = "DeviceRGB";
	ColorSpace["DeviceCMYK"] = "DeviceCMYK";
})(ColorSpace || (ColorSpace = {}));
var ChannelToColorSpace = {
	1: ColorSpace.DeviceGray,
	3: ColorSpace.DeviceRGB,
	4: ColorSpace.DeviceCMYK
};
/**
* A note of thanks to the developers of https://github.com/foliojs/pdfkit, as
* this class borrows from:
*   https://github.com/foliojs/pdfkit/blob/a6af76467ce06bd6a2af4aa7271ccac9ff152a7d/lib/image/jpeg.js
*/
var JpegEmbedder = function() {
	function JpegEmbedder(imageData, bitsPerComponent, width, height, colorSpace) {
		this.imageData = imageData;
		this.bitsPerComponent = bitsPerComponent;
		this.width = width;
		this.height = height;
		this.colorSpace = colorSpace;
	}
	JpegEmbedder.for = function(imageData) {
		return __awaiter(this, void 0, void 0, function() {
			var dataView, soi, pos, marker, bitsPerComponent, height, width, channelByte, channelName, colorSpace;
			return __generator(this, function(_a) {
				dataView = new DataView(imageData.buffer);
				soi = dataView.getUint16(0);
				if (soi !== 65496) throw new Error("SOI not found in JPEG");
				pos = 2;
				while (pos < dataView.byteLength) {
					marker = dataView.getUint16(pos);
					pos += 2;
					if (MARKERS.includes(marker)) break;
					pos += dataView.getUint16(pos);
				}
				if (!MARKERS.includes(marker)) throw new Error("Invalid JPEG");
				pos += 2;
				bitsPerComponent = dataView.getUint8(pos++);
				height = dataView.getUint16(pos);
				pos += 2;
				width = dataView.getUint16(pos);
				pos += 2;
				channelByte = dataView.getUint8(pos++);
				channelName = ChannelToColorSpace[channelByte];
				if (!channelName) throw new Error("Unknown JPEG channel.");
				colorSpace = channelName;
				return [2, new JpegEmbedder(imageData, bitsPerComponent, width, height, colorSpace)];
			});
		});
	};
	JpegEmbedder.prototype.embedIntoContext = function(context, ref) {
		return __awaiter(this, void 0, void 0, function() {
			var xObject;
			return __generator(this, function(_a) {
				xObject = context.stream(this.imageData, {
					Type: "XObject",
					Subtype: "Image",
					BitsPerComponent: this.bitsPerComponent,
					Width: this.width,
					Height: this.height,
					ColorSpace: this.colorSpace,
					Filter: "DCTDecode",
					Decode: this.colorSpace === ColorSpace.DeviceCMYK ? [
						1,
						0,
						1,
						0,
						1,
						0,
						1,
						0
					] : void 0
				});
				if (ref) {
					context.assign(ref, xObject);
					return [2, ref];
				} else return [2, context.register(xObject)];
			});
		});
	};
	return JpegEmbedder;
}();
//#endregion
//#region node_modules/pdf-lib/es/utils/png.js
var getImageType = function(ctype) {
	if (ctype === 0) return PngType.Greyscale;
	if (ctype === 2) return PngType.Truecolour;
	if (ctype === 3) return PngType.IndexedColour;
	if (ctype === 4) return PngType.GreyscaleWithAlpha;
	if (ctype === 6) return PngType.TruecolourWithAlpha;
	throw new Error("Unknown color type: " + ctype);
};
var splitAlphaChannel = function(rgbaChannel) {
	var pixelCount = Math.floor(rgbaChannel.length / 4);
	var rgbChannel = new Uint8Array(pixelCount * 3);
	var alphaChannel = new Uint8Array(pixelCount * 1);
	var rgbaOffset = 0;
	var rgbOffset = 0;
	var alphaOffset = 0;
	while (rgbaOffset < rgbaChannel.length) {
		rgbChannel[rgbOffset++] = rgbaChannel[rgbaOffset++];
		rgbChannel[rgbOffset++] = rgbaChannel[rgbaOffset++];
		rgbChannel[rgbOffset++] = rgbaChannel[rgbaOffset++];
		alphaChannel[alphaOffset++] = rgbaChannel[rgbaOffset++];
	}
	return {
		rgbChannel,
		alphaChannel
	};
};
var PngType;
(function(PngType) {
	PngType["Greyscale"] = "Greyscale";
	PngType["Truecolour"] = "Truecolour";
	PngType["IndexedColour"] = "IndexedColour";
	PngType["GreyscaleWithAlpha"] = "GreyscaleWithAlpha";
	PngType["TruecolourWithAlpha"] = "TruecolourWithAlpha";
})(PngType || (PngType = {}));
var PNG = function() {
	function PNG(pngData) {
		var upng = UPNG.decode(pngData);
		var frames = UPNG.toRGBA8(upng);
		if (frames.length > 1) throw new Error("Animated PNGs are not supported");
		var _a = splitAlphaChannel(new Uint8Array(frames[0])), rgbChannel = _a.rgbChannel, alphaChannel = _a.alphaChannel;
		this.rgbChannel = rgbChannel;
		if (alphaChannel.some(function(a) {
			return a < 255;
		})) this.alphaChannel = alphaChannel;
		this.type = getImageType(upng.ctype);
		this.width = upng.width;
		this.height = upng.height;
		this.bitsPerComponent = 8;
	}
	PNG.load = function(pngData) {
		return new PNG(pngData);
	};
	return PNG;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/embedders/PngEmbedder.js
/**
* A note of thanks to the developers of https://github.com/foliojs/pdfkit, as
* this class borrows from:
*   https://github.com/devongovett/pdfkit/blob/e71edab0dd4657b5a767804ba86c94c58d01fbca/lib/image/png.coffee
*/
var PngEmbedder = function() {
	function PngEmbedder(png) {
		this.image = png;
		this.bitsPerComponent = png.bitsPerComponent;
		this.width = png.width;
		this.height = png.height;
		this.colorSpace = "DeviceRGB";
	}
	PngEmbedder.for = function(imageData) {
		return __awaiter(this, void 0, void 0, function() {
			var png;
			return __generator(this, function(_a) {
				png = PNG.load(imageData);
				return [2, new PngEmbedder(png)];
			});
		});
	};
	PngEmbedder.prototype.embedIntoContext = function(context, ref) {
		return __awaiter(this, void 0, void 0, function() {
			var SMask, xObject;
			return __generator(this, function(_a) {
				SMask = this.embedAlphaChannel(context);
				xObject = context.flateStream(this.image.rgbChannel, {
					Type: "XObject",
					Subtype: "Image",
					BitsPerComponent: this.image.bitsPerComponent,
					Width: this.image.width,
					Height: this.image.height,
					ColorSpace: this.colorSpace,
					SMask
				});
				if (ref) {
					context.assign(ref, xObject);
					return [2, ref];
				} else return [2, context.register(xObject)];
			});
		});
	};
	PngEmbedder.prototype.embedAlphaChannel = function(context) {
		if (!this.image.alphaChannel) return void 0;
		var xObject = context.flateStream(this.image.alphaChannel, {
			Type: "XObject",
			Subtype: "Image",
			Height: this.image.height,
			Width: this.image.width,
			BitsPerComponent: this.image.bitsPerComponent,
			ColorSpace: "DeviceGray",
			Decode: [0, 1]
		});
		return context.register(xObject);
	};
	return PngEmbedder;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/streams/Stream.js
var Stream = function() {
	function Stream(buffer, start, length) {
		this.bytes = buffer;
		this.start = start || 0;
		this.pos = this.start;
		this.end = !!start && !!length ? start + length : this.bytes.length;
	}
	Object.defineProperty(Stream.prototype, "length", {
		get: function() {
			return this.end - this.start;
		},
		enumerable: false,
		configurable: true
	});
	Object.defineProperty(Stream.prototype, "isEmpty", {
		get: function() {
			return this.length === 0;
		},
		enumerable: false,
		configurable: true
	});
	Stream.prototype.getByte = function() {
		if (this.pos >= this.end) return -1;
		return this.bytes[this.pos++];
	};
	Stream.prototype.getUint16 = function() {
		var b0 = this.getByte();
		var b1 = this.getByte();
		if (b0 === -1 || b1 === -1) return -1;
		return (b0 << 8) + b1;
	};
	Stream.prototype.getInt32 = function() {
		var b0 = this.getByte();
		var b1 = this.getByte();
		var b2 = this.getByte();
		var b3 = this.getByte();
		return (b0 << 24) + (b1 << 16) + (b2 << 8) + b3;
	};
	Stream.prototype.getBytes = function(length, forceClamped) {
		if (forceClamped === void 0) forceClamped = false;
		var bytes = this.bytes;
		var pos = this.pos;
		var strEnd = this.end;
		if (!length) {
			var subarray = bytes.subarray(pos, strEnd);
			return forceClamped ? new Uint8ClampedArray(subarray) : subarray;
		} else {
			var end = pos + length;
			if (end > strEnd) end = strEnd;
			this.pos = end;
			var subarray = bytes.subarray(pos, end);
			return forceClamped ? new Uint8ClampedArray(subarray) : subarray;
		}
	};
	Stream.prototype.peekByte = function() {
		var peekedByte = this.getByte();
		this.pos--;
		return peekedByte;
	};
	Stream.prototype.peekBytes = function(length, forceClamped) {
		if (forceClamped === void 0) forceClamped = false;
		var bytes = this.getBytes(length, forceClamped);
		this.pos -= bytes.length;
		return bytes;
	};
	Stream.prototype.skip = function(n) {
		if (!n) n = 1;
		this.pos += n;
	};
	Stream.prototype.reset = function() {
		this.pos = this.start;
	};
	Stream.prototype.moveStart = function() {
		this.start = this.pos;
	};
	Stream.prototype.makeSubStream = function(start, length) {
		return new Stream(this.bytes, start, length);
	};
	Stream.prototype.decode = function() {
		return this.bytes;
	};
	return Stream;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/streams/DecodeStream.js
var emptyBuffer = /* @__PURE__ */ new Uint8Array(0);
/**
* Super class for the decoding streams
*/
var DecodeStream = function() {
	function DecodeStream(maybeMinBufferLength) {
		this.pos = 0;
		this.bufferLength = 0;
		this.eof = false;
		this.buffer = emptyBuffer;
		this.minBufferLength = 512;
		if (maybeMinBufferLength) while (this.minBufferLength < maybeMinBufferLength) this.minBufferLength *= 2;
	}
	Object.defineProperty(DecodeStream.prototype, "isEmpty", {
		get: function() {
			while (!this.eof && this.bufferLength === 0) this.readBlock();
			return this.bufferLength === 0;
		},
		enumerable: false,
		configurable: true
	});
	DecodeStream.prototype.getByte = function() {
		var pos = this.pos;
		while (this.bufferLength <= pos) {
			if (this.eof) return -1;
			this.readBlock();
		}
		return this.buffer[this.pos++];
	};
	DecodeStream.prototype.getUint16 = function() {
		var b0 = this.getByte();
		var b1 = this.getByte();
		if (b0 === -1 || b1 === -1) return -1;
		return (b0 << 8) + b1;
	};
	DecodeStream.prototype.getInt32 = function() {
		var b0 = this.getByte();
		var b1 = this.getByte();
		var b2 = this.getByte();
		var b3 = this.getByte();
		return (b0 << 24) + (b1 << 16) + (b2 << 8) + b3;
	};
	DecodeStream.prototype.getBytes = function(length, forceClamped) {
		if (forceClamped === void 0) forceClamped = false;
		var end;
		var pos = this.pos;
		if (length) {
			this.ensureBuffer(pos + length);
			end = pos + length;
			while (!this.eof && this.bufferLength < end) this.readBlock();
			var bufEnd = this.bufferLength;
			if (end > bufEnd) end = bufEnd;
		} else {
			while (!this.eof) this.readBlock();
			end = this.bufferLength;
		}
		this.pos = end;
		var subarray = this.buffer.subarray(pos, end);
		return forceClamped && !(subarray instanceof Uint8ClampedArray) ? new Uint8ClampedArray(subarray) : subarray;
	};
	DecodeStream.prototype.peekByte = function() {
		var peekedByte = this.getByte();
		this.pos--;
		return peekedByte;
	};
	DecodeStream.prototype.peekBytes = function(length, forceClamped) {
		if (forceClamped === void 0) forceClamped = false;
		var bytes = this.getBytes(length, forceClamped);
		this.pos -= bytes.length;
		return bytes;
	};
	DecodeStream.prototype.skip = function(n) {
		if (!n) n = 1;
		this.pos += n;
	};
	DecodeStream.prototype.reset = function() {
		this.pos = 0;
	};
	DecodeStream.prototype.makeSubStream = function(start, length) {
		var end = start + length;
		while (this.bufferLength <= end && !this.eof) this.readBlock();
		return new Stream(this.buffer, start, length);
	};
	DecodeStream.prototype.decode = function() {
		while (!this.eof) this.readBlock();
		return this.buffer.subarray(0, this.bufferLength);
	};
	DecodeStream.prototype.readBlock = function() {
		throw new MethodNotImplementedError(this.constructor.name, "readBlock");
	};
	DecodeStream.prototype.ensureBuffer = function(requested) {
		var buffer = this.buffer;
		if (requested <= buffer.byteLength) return buffer;
		var size = this.minBufferLength;
		while (size < requested) size *= 2;
		var buffer2 = new Uint8Array(size);
		buffer2.set(buffer);
		return this.buffer = buffer2;
	};
	return DecodeStream;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/streams/Ascii85Stream.js
var isSpace = function(ch) {
	return ch === 32 || ch === 9 || ch === 13 || ch === 10;
};
var Ascii85Stream = function(_super) {
	__extends(Ascii85Stream, _super);
	function Ascii85Stream(stream, maybeLength) {
		var _this = _super.call(this, maybeLength) || this;
		_this.stream = stream;
		_this.input = /* @__PURE__ */ new Uint8Array(5);
		if (maybeLength) maybeLength = .8 * maybeLength;
		return _this;
	}
	Ascii85Stream.prototype.readBlock = function() {
		var TILDA_CHAR = 126;
		var Z_LOWER_CHAR = 122;
		var EOF = -1;
		var stream = this.stream;
		var c = stream.getByte();
		while (isSpace(c)) c = stream.getByte();
		if (c === EOF || c === TILDA_CHAR) {
			this.eof = true;
			return;
		}
		var bufferLength = this.bufferLength;
		var buffer;
		var i;
		if (c === Z_LOWER_CHAR) {
			buffer = this.ensureBuffer(bufferLength + 4);
			for (i = 0; i < 4; ++i) buffer[bufferLength + i] = 0;
			this.bufferLength += 4;
		} else {
			var input = this.input;
			input[0] = c;
			for (i = 1; i < 5; ++i) {
				c = stream.getByte();
				while (isSpace(c)) c = stream.getByte();
				input[i] = c;
				if (c === EOF || c === TILDA_CHAR) break;
			}
			buffer = this.ensureBuffer(bufferLength + i - 1);
			this.bufferLength += i - 1;
			if (i < 5) {
				for (; i < 5; ++i) input[i] = 117;
				this.eof = true;
			}
			var t = 0;
			for (i = 0; i < 5; ++i) t = t * 85 + (input[i] - 33);
			for (i = 3; i >= 0; --i) {
				buffer[bufferLength + i] = t & 255;
				t >>= 8;
			}
		}
	};
	return Ascii85Stream;
}(DecodeStream);
//#endregion
//#region node_modules/pdf-lib/es/core/streams/AsciiHexStream.js
var AsciiHexStream = function(_super) {
	__extends(AsciiHexStream, _super);
	function AsciiHexStream(stream, maybeLength) {
		var _this = _super.call(this, maybeLength) || this;
		_this.stream = stream;
		_this.firstDigit = -1;
		if (maybeLength) maybeLength = .5 * maybeLength;
		return _this;
	}
	AsciiHexStream.prototype.readBlock = function() {
		var bytes = this.stream.getBytes(8e3);
		if (!bytes.length) {
			this.eof = true;
			return;
		}
		var maxDecodeLength = bytes.length + 1 >> 1;
		var buffer = this.ensureBuffer(this.bufferLength + maxDecodeLength);
		var bufferLength = this.bufferLength;
		var firstDigit = this.firstDigit;
		for (var i = 0, ii = bytes.length; i < ii; i++) {
			var ch = bytes[i];
			var digit = void 0;
			if (ch >= 48 && ch <= 57) digit = ch & 15;
			else if (ch >= 65 && ch <= 70 || ch >= 97 && ch <= 102) digit = (ch & 15) + 9;
			else if (ch === 62) {
				this.eof = true;
				break;
			} else continue;
			if (firstDigit < 0) firstDigit = digit;
			else {
				buffer[bufferLength++] = firstDigit << 4 | digit;
				firstDigit = -1;
			}
		}
		if (firstDigit >= 0 && this.eof) {
			buffer[bufferLength++] = firstDigit << 4;
			firstDigit = -1;
		}
		this.firstDigit = firstDigit;
		this.bufferLength = bufferLength;
	};
	return AsciiHexStream;
}(DecodeStream);
//#endregion
//#region node_modules/pdf-lib/es/core/streams/FlateStream.js
var codeLenCodeMap = new Int32Array([
	16,
	17,
	18,
	0,
	8,
	7,
	9,
	6,
	10,
	5,
	11,
	4,
	12,
	3,
	13,
	2,
	14,
	1,
	15
]);
var lengthDecode = new Int32Array([
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	65547,
	65549,
	65551,
	65553,
	131091,
	131095,
	131099,
	131103,
	196643,
	196651,
	196659,
	196667,
	262211,
	262227,
	262243,
	262259,
	327811,
	327843,
	327875,
	327907,
	258,
	258,
	258
]);
var distDecode = new Int32Array([
	1,
	2,
	3,
	4,
	65541,
	65543,
	131081,
	131085,
	196625,
	196633,
	262177,
	262193,
	327745,
	327777,
	393345,
	393409,
	459009,
	459137,
	524801,
	525057,
	590849,
	591361,
	657409,
	658433,
	724993,
	727041,
	794625,
	798721,
	868353,
	876545
]);
var fixedLitCodeTab = [new Int32Array([
	459008,
	524368,
	524304,
	524568,
	459024,
	524400,
	524336,
	590016,
	459016,
	524384,
	524320,
	589984,
	524288,
	524416,
	524352,
	590048,
	459012,
	524376,
	524312,
	589968,
	459028,
	524408,
	524344,
	590032,
	459020,
	524392,
	524328,
	59e4,
	524296,
	524424,
	524360,
	590064,
	459010,
	524372,
	524308,
	524572,
	459026,
	524404,
	524340,
	590024,
	459018,
	524388,
	524324,
	589992,
	524292,
	524420,
	524356,
	590056,
	459014,
	524380,
	524316,
	589976,
	459030,
	524412,
	524348,
	590040,
	459022,
	524396,
	524332,
	590008,
	524300,
	524428,
	524364,
	590072,
	459009,
	524370,
	524306,
	524570,
	459025,
	524402,
	524338,
	590020,
	459017,
	524386,
	524322,
	589988,
	524290,
	524418,
	524354,
	590052,
	459013,
	524378,
	524314,
	589972,
	459029,
	524410,
	524346,
	590036,
	459021,
	524394,
	524330,
	590004,
	524298,
	524426,
	524362,
	590068,
	459011,
	524374,
	524310,
	524574,
	459027,
	524406,
	524342,
	590028,
	459019,
	524390,
	524326,
	589996,
	524294,
	524422,
	524358,
	590060,
	459015,
	524382,
	524318,
	589980,
	459031,
	524414,
	524350,
	590044,
	459023,
	524398,
	524334,
	590012,
	524302,
	524430,
	524366,
	590076,
	459008,
	524369,
	524305,
	524569,
	459024,
	524401,
	524337,
	590018,
	459016,
	524385,
	524321,
	589986,
	524289,
	524417,
	524353,
	590050,
	459012,
	524377,
	524313,
	589970,
	459028,
	524409,
	524345,
	590034,
	459020,
	524393,
	524329,
	590002,
	524297,
	524425,
	524361,
	590066,
	459010,
	524373,
	524309,
	524573,
	459026,
	524405,
	524341,
	590026,
	459018,
	524389,
	524325,
	589994,
	524293,
	524421,
	524357,
	590058,
	459014,
	524381,
	524317,
	589978,
	459030,
	524413,
	524349,
	590042,
	459022,
	524397,
	524333,
	590010,
	524301,
	524429,
	524365,
	590074,
	459009,
	524371,
	524307,
	524571,
	459025,
	524403,
	524339,
	590022,
	459017,
	524387,
	524323,
	589990,
	524291,
	524419,
	524355,
	590054,
	459013,
	524379,
	524315,
	589974,
	459029,
	524411,
	524347,
	590038,
	459021,
	524395,
	524331,
	590006,
	524299,
	524427,
	524363,
	590070,
	459011,
	524375,
	524311,
	524575,
	459027,
	524407,
	524343,
	590030,
	459019,
	524391,
	524327,
	589998,
	524295,
	524423,
	524359,
	590062,
	459015,
	524383,
	524319,
	589982,
	459031,
	524415,
	524351,
	590046,
	459023,
	524399,
	524335,
	590014,
	524303,
	524431,
	524367,
	590078,
	459008,
	524368,
	524304,
	524568,
	459024,
	524400,
	524336,
	590017,
	459016,
	524384,
	524320,
	589985,
	524288,
	524416,
	524352,
	590049,
	459012,
	524376,
	524312,
	589969,
	459028,
	524408,
	524344,
	590033,
	459020,
	524392,
	524328,
	590001,
	524296,
	524424,
	524360,
	590065,
	459010,
	524372,
	524308,
	524572,
	459026,
	524404,
	524340,
	590025,
	459018,
	524388,
	524324,
	589993,
	524292,
	524420,
	524356,
	590057,
	459014,
	524380,
	524316,
	589977,
	459030,
	524412,
	524348,
	590041,
	459022,
	524396,
	524332,
	590009,
	524300,
	524428,
	524364,
	590073,
	459009,
	524370,
	524306,
	524570,
	459025,
	524402,
	524338,
	590021,
	459017,
	524386,
	524322,
	589989,
	524290,
	524418,
	524354,
	590053,
	459013,
	524378,
	524314,
	589973,
	459029,
	524410,
	524346,
	590037,
	459021,
	524394,
	524330,
	590005,
	524298,
	524426,
	524362,
	590069,
	459011,
	524374,
	524310,
	524574,
	459027,
	524406,
	524342,
	590029,
	459019,
	524390,
	524326,
	589997,
	524294,
	524422,
	524358,
	590061,
	459015,
	524382,
	524318,
	589981,
	459031,
	524414,
	524350,
	590045,
	459023,
	524398,
	524334,
	590013,
	524302,
	524430,
	524366,
	590077,
	459008,
	524369,
	524305,
	524569,
	459024,
	524401,
	524337,
	590019,
	459016,
	524385,
	524321,
	589987,
	524289,
	524417,
	524353,
	590051,
	459012,
	524377,
	524313,
	589971,
	459028,
	524409,
	524345,
	590035,
	459020,
	524393,
	524329,
	590003,
	524297,
	524425,
	524361,
	590067,
	459010,
	524373,
	524309,
	524573,
	459026,
	524405,
	524341,
	590027,
	459018,
	524389,
	524325,
	589995,
	524293,
	524421,
	524357,
	590059,
	459014,
	524381,
	524317,
	589979,
	459030,
	524413,
	524349,
	590043,
	459022,
	524397,
	524333,
	590011,
	524301,
	524429,
	524365,
	590075,
	459009,
	524371,
	524307,
	524571,
	459025,
	524403,
	524339,
	590023,
	459017,
	524387,
	524323,
	589991,
	524291,
	524419,
	524355,
	590055,
	459013,
	524379,
	524315,
	589975,
	459029,
	524411,
	524347,
	590039,
	459021,
	524395,
	524331,
	590007,
	524299,
	524427,
	524363,
	590071,
	459011,
	524375,
	524311,
	524575,
	459027,
	524407,
	524343,
	590031,
	459019,
	524391,
	524327,
	589999,
	524295,
	524423,
	524359,
	590063,
	459015,
	524383,
	524319,
	589983,
	459031,
	524415,
	524351,
	590047,
	459023,
	524399,
	524335,
	590015,
	524303,
	524431,
	524367,
	590079
]), 9];
var fixedDistCodeTab = [new Int32Array([
	327680,
	327696,
	327688,
	327704,
	327684,
	327700,
	327692,
	327708,
	327682,
	327698,
	327690,
	327706,
	327686,
	327702,
	327694,
	0,
	327681,
	327697,
	327689,
	327705,
	327685,
	327701,
	327693,
	327709,
	327683,
	327699,
	327691,
	327707,
	327687,
	327703,
	327695,
	0
]), 5];
var FlateStream = function(_super) {
	__extends(FlateStream, _super);
	function FlateStream(stream, maybeLength) {
		var _this = _super.call(this, maybeLength) || this;
		_this.stream = stream;
		var cmf = stream.getByte();
		var flg = stream.getByte();
		if (cmf === -1 || flg === -1) throw new Error("Invalid header in flate stream: " + cmf + ", " + flg);
		if ((cmf & 15) !== 8) throw new Error("Unknown compression method in flate stream: " + cmf + ", " + flg);
		if (((cmf << 8) + flg) % 31 !== 0) throw new Error("Bad FCHECK in flate stream: " + cmf + ", " + flg);
		if (flg & 32) throw new Error("FDICT bit set in flate stream: " + cmf + ", " + flg);
		_this.codeSize = 0;
		_this.codeBuf = 0;
		return _this;
	}
	FlateStream.prototype.readBlock = function() {
		var buffer;
		var len;
		var str = this.stream;
		var hdr = this.getBits(3);
		if (hdr & 1) this.eof = true;
		hdr >>= 1;
		if (hdr === 0) {
			var b = void 0;
			if ((b = str.getByte()) === -1) throw new Error("Bad block header in flate stream");
			var blockLen = b;
			if ((b = str.getByte()) === -1) throw new Error("Bad block header in flate stream");
			blockLen |= b << 8;
			if ((b = str.getByte()) === -1) throw new Error("Bad block header in flate stream");
			var check = b;
			if ((b = str.getByte()) === -1) throw new Error("Bad block header in flate stream");
			check |= b << 8;
			if (check !== (~blockLen & 65535) && (blockLen !== 0 || check !== 0)) throw new Error("Bad uncompressed block length in flate stream");
			this.codeBuf = 0;
			this.codeSize = 0;
			var bufferLength = this.bufferLength;
			buffer = this.ensureBuffer(bufferLength + blockLen);
			var end = bufferLength + blockLen;
			this.bufferLength = end;
			if (blockLen === 0) {
				if (str.peekByte() === -1) this.eof = true;
			} else for (var n = bufferLength; n < end; ++n) {
				if ((b = str.getByte()) === -1) {
					this.eof = true;
					break;
				}
				buffer[n] = b;
			}
			return;
		}
		var litCodeTable;
		var distCodeTable;
		if (hdr === 1) {
			litCodeTable = fixedLitCodeTab;
			distCodeTable = fixedDistCodeTab;
		} else if (hdr === 2) {
			var numLitCodes = this.getBits(5) + 257;
			var numDistCodes = this.getBits(5) + 1;
			var numCodeLenCodes = this.getBits(4) + 4;
			var codeLenCodeLengths = new Uint8Array(codeLenCodeMap.length);
			var i = void 0;
			for (i = 0; i < numCodeLenCodes; ++i) codeLenCodeLengths[codeLenCodeMap[i]] = this.getBits(3);
			var codeLenCodeTab = this.generateHuffmanTable(codeLenCodeLengths);
			len = 0;
			i = 0;
			var codes = numLitCodes + numDistCodes;
			var codeLengths = new Uint8Array(codes);
			var bitsLength = void 0;
			var bitsOffset = void 0;
			var what = void 0;
			while (i < codes) {
				var code = this.getCode(codeLenCodeTab);
				if (code === 16) {
					bitsLength = 2;
					bitsOffset = 3;
					what = len;
				} else if (code === 17) {
					bitsLength = 3;
					bitsOffset = 3;
					what = len = 0;
				} else if (code === 18) {
					bitsLength = 7;
					bitsOffset = 11;
					what = len = 0;
				} else {
					codeLengths[i++] = len = code;
					continue;
				}
				var repeatLength = this.getBits(bitsLength) + bitsOffset;
				while (repeatLength-- > 0) codeLengths[i++] = what;
			}
			litCodeTable = this.generateHuffmanTable(codeLengths.subarray(0, numLitCodes));
			distCodeTable = this.generateHuffmanTable(codeLengths.subarray(numLitCodes, codes));
		} else throw new Error("Unknown block type in flate stream");
		buffer = this.buffer;
		var limit = buffer ? buffer.length : 0;
		var pos = this.bufferLength;
		while (true) {
			var code1 = this.getCode(litCodeTable);
			if (code1 < 256) {
				if (pos + 1 >= limit) {
					buffer = this.ensureBuffer(pos + 1);
					limit = buffer.length;
				}
				buffer[pos++] = code1;
				continue;
			}
			if (code1 === 256) {
				this.bufferLength = pos;
				return;
			}
			code1 -= 257;
			code1 = lengthDecode[code1];
			var code2 = code1 >> 16;
			if (code2 > 0) code2 = this.getBits(code2);
			len = (code1 & 65535) + code2;
			code1 = this.getCode(distCodeTable);
			code1 = distDecode[code1];
			code2 = code1 >> 16;
			if (code2 > 0) code2 = this.getBits(code2);
			var dist = (code1 & 65535) + code2;
			if (pos + len >= limit) {
				buffer = this.ensureBuffer(pos + len);
				limit = buffer.length;
			}
			for (var k = 0; k < len; ++k, ++pos) buffer[pos] = buffer[pos - dist];
		}
	};
	FlateStream.prototype.getBits = function(bits) {
		var str = this.stream;
		var codeSize = this.codeSize;
		var codeBuf = this.codeBuf;
		var b;
		while (codeSize < bits) {
			if ((b = str.getByte()) === -1) throw new Error("Bad encoding in flate stream");
			codeBuf |= b << codeSize;
			codeSize += 8;
		}
		b = codeBuf & (1 << bits) - 1;
		this.codeBuf = codeBuf >> bits;
		this.codeSize = codeSize -= bits;
		return b;
	};
	FlateStream.prototype.getCode = function(table) {
		var str = this.stream;
		var codes = table[0];
		var maxLen = table[1];
		var codeSize = this.codeSize;
		var codeBuf = this.codeBuf;
		var b;
		while (codeSize < maxLen) {
			if ((b = str.getByte()) === -1) break;
			codeBuf |= b << codeSize;
			codeSize += 8;
		}
		var code = codes[codeBuf & (1 << maxLen) - 1];
		if (typeof codes === "number") console.log("FLATE:", code);
		var codeLen = code >> 16;
		var codeVal = code & 65535;
		if (codeLen < 1 || codeSize < codeLen) throw new Error("Bad encoding in flate stream");
		this.codeBuf = codeBuf >> codeLen;
		this.codeSize = codeSize - codeLen;
		return codeVal;
	};
	FlateStream.prototype.generateHuffmanTable = function(lengths) {
		var n = lengths.length;
		var maxLen = 0;
		var i;
		for (i = 0; i < n; ++i) if (lengths[i] > maxLen) maxLen = lengths[i];
		var size = 1 << maxLen;
		var codes = new Int32Array(size);
		for (var len = 1, code = 0, skip = 2; len <= maxLen; ++len, code <<= 1, skip <<= 1) for (var val = 0; val < n; ++val) if (lengths[val] === len) {
			var code2 = 0;
			var t = code;
			for (i = 0; i < len; ++i) {
				code2 = code2 << 1 | t & 1;
				t >>= 1;
			}
			for (i = code2; i < size; i += skip) codes[i] = len << 16 | val;
			++code;
		}
		return [codes, maxLen];
	};
	return FlateStream;
}(DecodeStream);
//#endregion
//#region node_modules/pdf-lib/es/core/streams/LZWStream.js
var LZWStream = function(_super) {
	__extends(LZWStream, _super);
	function LZWStream(stream, maybeLength, earlyChange) {
		var _this = _super.call(this, maybeLength) || this;
		_this.stream = stream;
		_this.cachedData = 0;
		_this.bitsCached = 0;
		var maxLzwDictionarySize = 4096;
		var lzwState = {
			earlyChange,
			codeLength: 9,
			nextCode: 258,
			dictionaryValues: new Uint8Array(maxLzwDictionarySize),
			dictionaryLengths: new Uint16Array(maxLzwDictionarySize),
			dictionaryPrevCodes: new Uint16Array(maxLzwDictionarySize),
			currentSequence: new Uint8Array(maxLzwDictionarySize),
			currentSequenceLength: 0
		};
		for (var i = 0; i < 256; ++i) {
			lzwState.dictionaryValues[i] = i;
			lzwState.dictionaryLengths[i] = 1;
		}
		_this.lzwState = lzwState;
		return _this;
	}
	LZWStream.prototype.readBlock = function() {
		var blockSize = 512;
		var estimatedDecodedSize = blockSize * 2;
		var decodedSizeDelta = blockSize;
		var i;
		var j;
		var q;
		var lzwState = this.lzwState;
		if (!lzwState) return;
		var earlyChange = lzwState.earlyChange;
		var nextCode = lzwState.nextCode;
		var dictionaryValues = lzwState.dictionaryValues;
		var dictionaryLengths = lzwState.dictionaryLengths;
		var dictionaryPrevCodes = lzwState.dictionaryPrevCodes;
		var codeLength = lzwState.codeLength;
		var prevCode = lzwState.prevCode;
		var currentSequence = lzwState.currentSequence;
		var currentSequenceLength = lzwState.currentSequenceLength;
		var decodedLength = 0;
		var currentBufferLength = this.bufferLength;
		var buffer = this.ensureBuffer(this.bufferLength + estimatedDecodedSize);
		for (i = 0; i < blockSize; i++) {
			var code = this.readBits(codeLength);
			var hasPrev = currentSequenceLength > 0;
			if (!code || code < 256) {
				currentSequence[0] = code;
				currentSequenceLength = 1;
			} else if (code >= 258) {
				if (code < nextCode) {
					currentSequenceLength = dictionaryLengths[code];
					for (j = currentSequenceLength - 1, q = code; j >= 0; j--) {
						currentSequence[j] = dictionaryValues[q];
						q = dictionaryPrevCodes[q];
					}
				} else currentSequence[currentSequenceLength++] = currentSequence[0];
			} else if (code === 256) {
				codeLength = 9;
				nextCode = 258;
				currentSequenceLength = 0;
				continue;
			} else {
				this.eof = true;
				delete this.lzwState;
				break;
			}
			if (hasPrev) {
				dictionaryPrevCodes[nextCode] = prevCode;
				dictionaryLengths[nextCode] = dictionaryLengths[prevCode] + 1;
				dictionaryValues[nextCode] = currentSequence[0];
				nextCode++;
				codeLength = nextCode + earlyChange & nextCode + earlyChange - 1 ? codeLength : Math.min(Math.log(nextCode + earlyChange) / .6931471805599453 + 1, 12) | 0;
			}
			prevCode = code;
			decodedLength += currentSequenceLength;
			if (estimatedDecodedSize < decodedLength) {
				do
					estimatedDecodedSize += decodedSizeDelta;
				while (estimatedDecodedSize < decodedLength);
				buffer = this.ensureBuffer(this.bufferLength + estimatedDecodedSize);
			}
			for (j = 0; j < currentSequenceLength; j++) buffer[currentBufferLength++] = currentSequence[j];
		}
		lzwState.nextCode = nextCode;
		lzwState.codeLength = codeLength;
		lzwState.prevCode = prevCode;
		lzwState.currentSequenceLength = currentSequenceLength;
		this.bufferLength = currentBufferLength;
	};
	LZWStream.prototype.readBits = function(n) {
		var bitsCached = this.bitsCached;
		var cachedData = this.cachedData;
		while (bitsCached < n) {
			var c = this.stream.getByte();
			if (c === -1) {
				this.eof = true;
				return null;
			}
			cachedData = cachedData << 8 | c;
			bitsCached += 8;
		}
		this.bitsCached = bitsCached -= n;
		this.cachedData = cachedData;
		return cachedData >>> bitsCached & (1 << n) - 1;
	};
	return LZWStream;
}(DecodeStream);
//#endregion
//#region node_modules/pdf-lib/es/core/streams/RunLengthStream.js
var RunLengthStream = function(_super) {
	__extends(RunLengthStream, _super);
	function RunLengthStream(stream, maybeLength) {
		var _this = _super.call(this, maybeLength) || this;
		_this.stream = stream;
		return _this;
	}
	RunLengthStream.prototype.readBlock = function() {
		var repeatHeader = this.stream.getBytes(2);
		if (!repeatHeader || repeatHeader.length < 2 || repeatHeader[0] === 128) {
			this.eof = true;
			return;
		}
		var buffer;
		var bufferLength = this.bufferLength;
		var n = repeatHeader[0];
		if (n < 128) {
			buffer = this.ensureBuffer(bufferLength + n + 1);
			buffer[bufferLength++] = repeatHeader[1];
			if (n > 0) {
				var source = this.stream.getBytes(n);
				buffer.set(source, bufferLength);
				bufferLength += n;
			}
		} else {
			n = 257 - n;
			var b = repeatHeader[1];
			buffer = this.ensureBuffer(bufferLength + n + 1);
			for (var i = 0; i < n; i++) buffer[bufferLength++] = b;
		}
		this.bufferLength = bufferLength;
	};
	return RunLengthStream;
}(DecodeStream);
//#endregion
//#region node_modules/pdf-lib/es/core/streams/decode.js
var decodeStream = function(stream, encoding, params) {
	if (encoding === PDFName.of("FlateDecode")) return new FlateStream(stream);
	if (encoding === PDFName.of("LZWDecode")) {
		var earlyChange = 1;
		if (params instanceof PDFDict) {
			var EarlyChange = params.lookup(PDFName.of("EarlyChange"));
			if (EarlyChange instanceof PDFNumber) earlyChange = EarlyChange.asNumber();
		}
		return new LZWStream(stream, void 0, earlyChange);
	}
	if (encoding === PDFName.of("ASCII85Decode")) return new Ascii85Stream(stream);
	if (encoding === PDFName.of("ASCIIHexDecode")) return new AsciiHexStream(stream);
	if (encoding === PDFName.of("RunLengthDecode")) return new RunLengthStream(stream);
	throw new UnsupportedEncodingError(encoding.asString());
};
var decodePDFRawStream = function(_a) {
	var dict = _a.dict, contents = _a.contents;
	var stream = new Stream(contents);
	var Filter = dict.lookup(PDFName.of("Filter"));
	var DecodeParms = dict.lookup(PDFName.of("DecodeParms"));
	if (Filter instanceof PDFName) stream = decodeStream(stream, Filter, DecodeParms);
	else if (Filter instanceof PDFArray) for (var idx = 0, len = Filter.size(); idx < len; idx++) stream = decodeStream(stream, Filter.lookup(idx, PDFName), DecodeParms && DecodeParms.lookupMaybe(idx, PDFDict));
	else if (!!Filter) throw new UnexpectedObjectTypeError([PDFName, PDFArray], Filter);
	return stream;
};
//#endregion
//#region node_modules/pdf-lib/es/core/embedders/PDFPageEmbedder.js
var fullPageBoundingBox = function(page) {
	var mediaBox = page.MediaBox();
	return {
		left: 0,
		bottom: 0,
		right: mediaBox.lookup(2, PDFNumber).asNumber() - mediaBox.lookup(0, PDFNumber).asNumber(),
		top: mediaBox.lookup(3, PDFNumber).asNumber() - mediaBox.lookup(1, PDFNumber).asNumber()
	};
};
var boundingBoxAdjustedMatrix = function(bb) {
	return [
		1,
		0,
		0,
		1,
		-bb.left,
		-bb.bottom
	];
};
var PDFPageEmbedder = function() {
	function PDFPageEmbedder(page, boundingBox, transformationMatrix) {
		this.page = page;
		var bb = boundingBox !== null && boundingBox !== void 0 ? boundingBox : fullPageBoundingBox(page);
		this.width = bb.right - bb.left;
		this.height = bb.top - bb.bottom;
		this.boundingBox = bb;
		this.transformationMatrix = transformationMatrix !== null && transformationMatrix !== void 0 ? transformationMatrix : boundingBoxAdjustedMatrix(bb);
	}
	PDFPageEmbedder.for = function(page, boundingBox, transformationMatrix) {
		return __awaiter(this, void 0, void 0, function() {
			return __generator(this, function(_a) {
				return [2, new PDFPageEmbedder(page, boundingBox, transformationMatrix)];
			});
		});
	};
	PDFPageEmbedder.prototype.embedIntoContext = function(context, ref) {
		return __awaiter(this, void 0, void 0, function() {
			var _a, Contents, Resources, decodedContents, _b, left, bottom, right, top, xObject;
			return __generator(this, function(_c) {
				_a = this.page.normalizedEntries(), Contents = _a.Contents, Resources = _a.Resources;
				if (!Contents) throw new MissingPageContentsEmbeddingError();
				decodedContents = this.decodeContents(Contents);
				_b = this.boundingBox, left = _b.left, bottom = _b.bottom, right = _b.right, top = _b.top;
				xObject = context.flateStream(decodedContents, {
					Type: "XObject",
					Subtype: "Form",
					FormType: 1,
					BBox: [
						left,
						bottom,
						right,
						top
					],
					Matrix: this.transformationMatrix,
					Resources
				});
				if (ref) {
					context.assign(ref, xObject);
					return [2, ref];
				} else return [2, context.register(xObject)];
			});
		});
	};
	PDFPageEmbedder.prototype.decodeContents = function(contents) {
		var newline = Uint8Array.of(CharCodes_default.Newline);
		var decodedContents = [];
		for (var idx = 0, len = contents.size(); idx < len; idx++) {
			var stream = contents.lookup(idx, PDFStream);
			var content = void 0;
			if (stream instanceof PDFRawStream) content = decodePDFRawStream(stream).decode();
			else if (stream instanceof PDFContentStream) content = stream.getUnencodedContents();
			else throw new UnrecognizedStreamTypeError(stream);
			decodedContents.push(content, newline);
		}
		return mergeIntoTypedArray.apply(void 0, decodedContents);
	};
	return PDFPageEmbedder;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/interactive/ViewerPreferences.js
var asEnum = function(rawValue, enumType) {
	if (rawValue === void 0) return void 0;
	return enumType[rawValue];
};
var NonFullScreenPageMode;
(function(NonFullScreenPageMode) {
	/**
	* After exiting FullScreen mode, neither the document outline nor thumbnail
	* images should be visible.
	*/
	NonFullScreenPageMode["UseNone"] = "UseNone";
	/** After exiting FullScreen mode, the document outline should be visible. */
	NonFullScreenPageMode["UseOutlines"] = "UseOutlines";
	/** After exiting FullScreen mode, thumbnail images should be visible. */
	NonFullScreenPageMode["UseThumbs"] = "UseThumbs";
	/**
	* After exiting FullScreen mode, the optional content group panel should be
	* visible.
	*/
	NonFullScreenPageMode["UseOC"] = "UseOC";
})(NonFullScreenPageMode || (NonFullScreenPageMode = {}));
var ReadingDirection;
(function(ReadingDirection) {
	/** The predominant reading order is Left to Right. */
	ReadingDirection["L2R"] = "L2R";
	/**
	* The predominant reading order is Right to left (including vertical writing
	* systems, such as Chinese, Japanese and Korean).
	*/
	ReadingDirection["R2L"] = "R2L";
})(ReadingDirection || (ReadingDirection = {}));
var PrintScaling;
(function(PrintScaling) {
	/** No page scaling. */
	PrintScaling["None"] = "None";
	PrintScaling["AppDefault"] = "AppDefault";
})(PrintScaling || (PrintScaling = {}));
var Duplex;
(function(Duplex) {
	/** The PDF reader should print single-sided. */
	Duplex["Simplex"] = "Simplex";
	/**
	* The PDF reader should print double sided and flip on the short edge of the
	* sheet.
	*/
	Duplex["DuplexFlipShortEdge"] = "DuplexFlipShortEdge";
	/**
	* The PDF reader should print double sided and flip on the long edge of the
	* sheet.
	*/
	Duplex["DuplexFlipLongEdge"] = "DuplexFlipLongEdge";
})(Duplex || (Duplex = {}));
var ViewerPreferences = function() {
	/** @ignore */
	function ViewerPreferences(dict) {
		this.dict = dict;
	}
	ViewerPreferences.prototype.lookupBool = function(key) {
		var returnObj = this.dict.lookup(PDFName.of(key));
		if (returnObj instanceof PDFBool) return returnObj;
	};
	ViewerPreferences.prototype.lookupName = function(key) {
		var returnObj = this.dict.lookup(PDFName.of(key));
		if (returnObj instanceof PDFName) return returnObj;
	};
	/** @ignore */
	ViewerPreferences.prototype.HideToolbar = function() {
		return this.lookupBool("HideToolbar");
	};
	/** @ignore */
	ViewerPreferences.prototype.HideMenubar = function() {
		return this.lookupBool("HideMenubar");
	};
	/** @ignore */
	ViewerPreferences.prototype.HideWindowUI = function() {
		return this.lookupBool("HideWindowUI");
	};
	/** @ignore */
	ViewerPreferences.prototype.FitWindow = function() {
		return this.lookupBool("FitWindow");
	};
	/** @ignore */
	ViewerPreferences.prototype.CenterWindow = function() {
		return this.lookupBool("CenterWindow");
	};
	/** @ignore */
	ViewerPreferences.prototype.DisplayDocTitle = function() {
		return this.lookupBool("DisplayDocTitle");
	};
	/** @ignore */
	ViewerPreferences.prototype.NonFullScreenPageMode = function() {
		return this.lookupName("NonFullScreenPageMode");
	};
	/** @ignore */
	ViewerPreferences.prototype.Direction = function() {
		return this.lookupName("Direction");
	};
	/** @ignore */
	ViewerPreferences.prototype.PrintScaling = function() {
		return this.lookupName("PrintScaling");
	};
	/** @ignore */
	ViewerPreferences.prototype.Duplex = function() {
		return this.lookupName("Duplex");
	};
	/** @ignore */
	ViewerPreferences.prototype.PickTrayByPDFSize = function() {
		return this.lookupBool("PickTrayByPDFSize");
	};
	/** @ignore */
	ViewerPreferences.prototype.PrintPageRange = function() {
		var PrintPageRange = this.dict.lookup(PDFName.of("PrintPageRange"));
		if (PrintPageRange instanceof PDFArray) return PrintPageRange;
	};
	/** @ignore */
	ViewerPreferences.prototype.NumCopies = function() {
		var NumCopies = this.dict.lookup(PDFName.of("NumCopies"));
		if (NumCopies instanceof PDFNumber) return NumCopies;
	};
	/**
	* Returns `true` if PDF readers should hide the toolbar menus when displaying
	* this document.
	* @returns Whether or not toolbars should be hidden.
	*/
	ViewerPreferences.prototype.getHideToolbar = function() {
		var _a, _b;
		return (_b = (_a = this.HideToolbar()) === null || _a === void 0 ? void 0 : _a.asBoolean()) !== null && _b !== void 0 ? _b : false;
	};
	/**
	* Returns `true` if PDF readers should hide the menu bar when displaying this
	* document.
	* @returns Whether or not the menu bar should be hidden.
	*/
	ViewerPreferences.prototype.getHideMenubar = function() {
		var _a, _b;
		return (_b = (_a = this.HideMenubar()) === null || _a === void 0 ? void 0 : _a.asBoolean()) !== null && _b !== void 0 ? _b : false;
	};
	/**
	* Returns `true` if PDF readers should hide the user interface elements in
	* the document's window (such as scroll bars and navigation controls),
	* leaving only the document's contents displayed.
	* @returns Whether or not user interface elements should be hidden.
	*/
	ViewerPreferences.prototype.getHideWindowUI = function() {
		var _a, _b;
		return (_b = (_a = this.HideWindowUI()) === null || _a === void 0 ? void 0 : _a.asBoolean()) !== null && _b !== void 0 ? _b : false;
	};
	/**
	* Returns `true` if PDF readers should resize the document's window to fit
	* the size of the first displayed page.
	* @returns Whether or not the window should be resized to fit.
	*/
	ViewerPreferences.prototype.getFitWindow = function() {
		var _a, _b;
		return (_b = (_a = this.FitWindow()) === null || _a === void 0 ? void 0 : _a.asBoolean()) !== null && _b !== void 0 ? _b : false;
	};
	/**
	* Returns `true` if PDF readers should position the document's window in the
	* center of the screen.
	* @returns Whether or not to center the document window.
	*/
	ViewerPreferences.prototype.getCenterWindow = function() {
		var _a, _b;
		return (_b = (_a = this.CenterWindow()) === null || _a === void 0 ? void 0 : _a.asBoolean()) !== null && _b !== void 0 ? _b : false;
	};
	/**
	* Returns `true` if the window's title bar should display the document
	* `Title`, taken from the document metadata (see [[PDFDocument.getTitle]]).
	* Returns `false` if the title bar should instead display the filename of the
	* PDF file.
	* @returns Whether to display the document title.
	*/
	ViewerPreferences.prototype.getDisplayDocTitle = function() {
		var _a, _b;
		return (_b = (_a = this.DisplayDocTitle()) === null || _a === void 0 ? void 0 : _a.asBoolean()) !== null && _b !== void 0 ? _b : false;
	};
	/**
	* Returns the page mode, which tells the PDF reader how to display the
	* document after exiting full-screen mode.
	* @returns The page mode after exiting full-screen mode.
	*/
	ViewerPreferences.prototype.getNonFullScreenPageMode = function() {
		var _a, _b;
		return (_b = asEnum((_a = this.NonFullScreenPageMode()) === null || _a === void 0 ? void 0 : _a.decodeText(), NonFullScreenPageMode)) !== null && _b !== void 0 ? _b : NonFullScreenPageMode.UseNone;
	};
	/**
	* Returns the predominant reading order for text.
	* @returns The text reading order.
	*/
	ViewerPreferences.prototype.getReadingDirection = function() {
		var _a, _b;
		return (_b = asEnum((_a = this.Direction()) === null || _a === void 0 ? void 0 : _a.decodeText(), ReadingDirection)) !== null && _b !== void 0 ? _b : ReadingDirection.L2R;
	};
	/**
	* Returns the page scaling option that the PDF reader should select when the
	* print dialog is displayed.
	* @returns The page scaling option.
	*/
	ViewerPreferences.prototype.getPrintScaling = function() {
		var _a, _b;
		return (_b = asEnum((_a = this.PrintScaling()) === null || _a === void 0 ? void 0 : _a.decodeText(), PrintScaling)) !== null && _b !== void 0 ? _b : PrintScaling.AppDefault;
	};
	/**
	* Returns the paper handling option that should be used when printing the
	* file from the print dialog.
	* @returns The paper handling option.
	*/
	ViewerPreferences.prototype.getDuplex = function() {
		var _a;
		return asEnum((_a = this.Duplex()) === null || _a === void 0 ? void 0 : _a.decodeText(), Duplex);
	};
	/**
	* Returns `true` if the PDF page size should be used to select the input
	* paper tray.
	* @returns Whether or not the PDF page size should be used to select the
	*          input paper tray.
	*/
	ViewerPreferences.prototype.getPickTrayByPDFSize = function() {
		var _a;
		return (_a = this.PickTrayByPDFSize()) === null || _a === void 0 ? void 0 : _a.asBoolean();
	};
	/**
	* Returns an array of page number ranges, which are the values used to
	* initialize the print dialog box when the file is printed. Each range
	* specifies the first (`start`) and last (`end`) pages in a sub-range of
	* pages to be printed. The first page of the PDF file is denoted by 0.
	* For example:
	* ```js
	* const viewerPrefs = pdfDoc.catalog.getOrCreateViewerPreferences()
	* const includesPage3 = viewerPrefs
	*   .getPrintRanges()
	*   .some(pr => pr.start =< 2 && pr.end >= 2)
	* if (includesPage3) console.log('printRange includes page 3')
	* ```
	* @returns An array of objects, each with the properties `start` and `end`,
	*          denoting page indices. If not, specified an empty array is
	*          returned.
	*/
	ViewerPreferences.prototype.getPrintPageRange = function() {
		var rng = this.PrintPageRange();
		if (!rng) return [];
		var pageRanges = [];
		for (var i = 0; i < rng.size(); i += 2) {
			var start = rng.lookup(i, PDFNumber).asNumber();
			var end = rng.lookup(i + 1, PDFNumber).asNumber();
			pageRanges.push({
				start,
				end
			});
		}
		return pageRanges;
	};
	/**
	* Returns the number of copies to be printed when the print dialog is opened
	* for this document.
	* @returns The default number of copies to be printed.
	*/
	ViewerPreferences.prototype.getNumCopies = function() {
		var _a, _b;
		return (_b = (_a = this.NumCopies()) === null || _a === void 0 ? void 0 : _a.asNumber()) !== null && _b !== void 0 ? _b : 1;
	};
	/**
	* Choose whether the PDF reader's toolbars should be hidden while the
	* document is active.
	* @param hideToolbar `true` if the toolbar should be hidden.
	*/
	ViewerPreferences.prototype.setHideToolbar = function(hideToolbar) {
		var HideToolbar = this.dict.context.obj(hideToolbar);
		this.dict.set(PDFName.of("HideToolbar"), HideToolbar);
	};
	/**
	* Choose whether the PDF reader's menu bar should be hidden while the
	* document is active.
	* @param hideMenubar `true` if the menu bar should be hidden.
	*/
	ViewerPreferences.prototype.setHideMenubar = function(hideMenubar) {
		var HideMenubar = this.dict.context.obj(hideMenubar);
		this.dict.set(PDFName.of("HideMenubar"), HideMenubar);
	};
	/**
	* Choose whether the PDF reader should hide user interface elements in the
	* document's window (such as scroll bars and navigation controls), leaving
	* only the document's contents displayed.
	* @param hideWindowUI `true` if the user interface elements should be hidden.
	*/
	ViewerPreferences.prototype.setHideWindowUI = function(hideWindowUI) {
		var HideWindowUI = this.dict.context.obj(hideWindowUI);
		this.dict.set(PDFName.of("HideWindowUI"), HideWindowUI);
	};
	/**
	* Choose whether the PDF reader should resize the document's window to fit
	* the size of the first displayed page.
	* @param fitWindow `true` if the window should be resized.
	*/
	ViewerPreferences.prototype.setFitWindow = function(fitWindow) {
		var FitWindow = this.dict.context.obj(fitWindow);
		this.dict.set(PDFName.of("FitWindow"), FitWindow);
	};
	/**
	* Choose whether the PDF reader should position the document's window in the
	* center of the screen.
	* @param centerWindow `true` if the window should be centered.
	*/
	ViewerPreferences.prototype.setCenterWindow = function(centerWindow) {
		var CenterWindow = this.dict.context.obj(centerWindow);
		this.dict.set(PDFName.of("CenterWindow"), CenterWindow);
	};
	/**
	* Choose whether the window's title bar should display the document `Title`
	* taken from the document metadata (see [[PDFDocument.setTitle]]). If
	* `false`, the title bar should instead display the PDF filename.
	* @param displayTitle `true` if the document title should be displayed.
	*/
	ViewerPreferences.prototype.setDisplayDocTitle = function(displayTitle) {
		var DisplayDocTitle = this.dict.context.obj(displayTitle);
		this.dict.set(PDFName.of("DisplayDocTitle"), DisplayDocTitle);
	};
	/**
	* Choose how the PDF reader should display the document upon exiting
	* full-screen mode. This entry is meaningful only if the value of the
	* `PageMode` entry in the document's [[PDFCatalog]] is `FullScreen`.
	*
	* For example:
	* ```js
	* import { PDFDocument, NonFullScreenPageMode, PDFName } from 'pdf-lib'
	*
	* const pdfDoc = await PDFDocument.create()
	*
	* // Set the PageMode
	* pdfDoc.catalog.set(PDFName.of('PageMode'),PDFName.of('FullScreen'))
	*
	* // Set what happens when full-screen is closed
	* const viewerPrefs = pdfDoc.catalog.getOrCreateViewerPreferences()
	* viewerPrefs.setNonFullScreenPageMode(NonFullScreenPageMode.UseOutlines)
	* ```
	*
	* @param nonFullScreenPageMode How the document should be displayed upon
	*                              exiting full screen mode.
	*/
	ViewerPreferences.prototype.setNonFullScreenPageMode = function(nonFullScreenPageMode) {
		assertIsOneOf(nonFullScreenPageMode, "nonFullScreenPageMode", NonFullScreenPageMode);
		var mode = PDFName.of(nonFullScreenPageMode);
		this.dict.set(PDFName.of("NonFullScreenPageMode"), mode);
	};
	/**
	* Choose the predominant reading order for text.
	*
	* This entry has no direct effect on the document's contents or page
	* numbering, but may be used to determine the relative positioning of pages
	* when displayed side by side or printed n-up.
	*
	* For example:
	* ```js
	* import { PDFDocument, ReadingDirection } from 'pdf-lib'
	*
	* const pdfDoc = await PDFDocument.create()
	* const viewerPrefs = pdfDoc.catalog.getOrCreateViewerPreferences()
	* viewerPrefs.setReadingDirection(ReadingDirection.R2L)
	* ```
	*
	* @param readingDirection The reading order for text.
	*/
	ViewerPreferences.prototype.setReadingDirection = function(readingDirection) {
		assertIsOneOf(readingDirection, "readingDirection", ReadingDirection);
		var direction = PDFName.of(readingDirection);
		this.dict.set(PDFName.of("Direction"), direction);
	};
	/**
	* Choose the page scaling option that should be selected when a print dialog
	* is displayed for this document.
	*
	* For example:
	* ```js
	* import { PDFDocument, PrintScaling } from 'pdf-lib'
	*
	* const pdfDoc = await PDFDocument.create()
	* const viewerPrefs = pdfDoc.catalog.getOrCreateViewerPreferences()
	* viewerPrefs.setPrintScaling(PrintScaling.None)
	* ```
	*
	* @param printScaling The print scaling option.
	*/
	ViewerPreferences.prototype.setPrintScaling = function(printScaling) {
		assertIsOneOf(printScaling, "printScaling", PrintScaling);
		var scaling = PDFName.of(printScaling);
		this.dict.set(PDFName.of("PrintScaling"), scaling);
	};
	/**
	* Choose the paper handling option that should be selected by default in the
	* print dialog.
	*
	* For example:
	* ```js
	* import { PDFDocument, Duplex } from 'pdf-lib'
	*
	* const pdfDoc = await PDFDocument.create()
	* const viewerPrefs = pdfDoc.catalog.getOrCreateViewerPreferences()
	* viewerPrefs.setDuplex(Duplex.DuplexFlipShortEdge)
	* ```
	*
	* @param duplex The double or single sided printing option.
	*/
	ViewerPreferences.prototype.setDuplex = function(duplex) {
		assertIsOneOf(duplex, "duplex", Duplex);
		var dup = PDFName.of(duplex);
		this.dict.set(PDFName.of("Duplex"), dup);
	};
	/**
	* Choose whether the PDF document's page size should be used to select the
	* input paper tray when printing. This setting influences only the preset
	* values used to populate the print dialog presented by a PDF reader.
	*
	* If PickTrayByPDFSize is true, the check box in the print dialog associated
	* with input paper tray should be checked. This setting has no effect on
	* operating systems that do not provide the ability to pick the input tray
	* by size.
	*
	* @param pickTrayByPDFSize `true` if the document's page size should be used
	*                          to select the input paper tray.
	*/
	ViewerPreferences.prototype.setPickTrayByPDFSize = function(pickTrayByPDFSize) {
		var PickTrayByPDFSize = this.dict.context.obj(pickTrayByPDFSize);
		this.dict.set(PDFName.of("PickTrayByPDFSize"), PickTrayByPDFSize);
	};
	/**
	* Choose the page numbers used to initialize the print dialog box when the
	* file is printed. The first page of the PDF file is denoted by 0.
	*
	* For example:
	* ```js
	* import { PDFDocument } from 'pdf-lib'
	*
	* const pdfDoc = await PDFDocument.create()
	* const viewerPrefs = pdfDoc.catalog.getOrCreateViewerPreferences()
	*
	* // We can set the default print range to only the first page
	* viewerPrefs.setPrintPageRange({ start: 0, end: 0 })
	*
	* // Or we can supply noncontiguous ranges (e.g. pages 1, 3, and 5-7)
	* viewerPrefs.setPrintPageRange([
	*   { start: 0, end: 0 },
	*   { start: 2, end: 2 },
	*   { start: 4, end: 6 },
	* ])
	* ```
	*
	* @param printPageRange An object or array of objects, each with the
	*                       properties `start` and `end`, denoting a range of
	*                       page indices.
	*/
	ViewerPreferences.prototype.setPrintPageRange = function(printPageRange) {
		if (!Array.isArray(printPageRange)) printPageRange = [printPageRange];
		var flatRange = [];
		for (var idx = 0, len = printPageRange.length; idx < len; idx++) {
			flatRange.push(printPageRange[idx].start);
			flatRange.push(printPageRange[idx].end);
		}
		assertEachIs(flatRange, "printPageRange", ["number"]);
		var pageRanges = this.dict.context.obj(flatRange);
		this.dict.set(PDFName.of("PrintPageRange"), pageRanges);
	};
	/**
	* Choose the default number of copies to be printed when the print dialog is
	* opened for this file.
	* @param numCopies The default number of copies.
	*/
	ViewerPreferences.prototype.setNumCopies = function(numCopies) {
		assertRange(numCopies, "numCopies", 1, Number.MAX_VALUE);
		assertInteger(numCopies, "numCopies");
		var NumCopies = this.dict.context.obj(numCopies);
		this.dict.set(PDFName.of("NumCopies"), NumCopies);
	};
	/** @ignore */
	ViewerPreferences.fromDict = function(dict) {
		return new ViewerPreferences(dict);
	};
	/** @ignore */
	ViewerPreferences.create = function(context) {
		return new ViewerPreferences(context.obj({}));
	};
	return ViewerPreferences;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/acroform/PDFAcroField.js
var tfRegex$1 = /\/([^\0\t\n\f\r\ ]+)[\0\t\n\f\r\ ]*(\d*\.\d+|\d+)?[\0\t\n\f\r\ ]+Tf/;
var PDFAcroField = function() {
	function PDFAcroField(dict, ref) {
		this.dict = dict;
		this.ref = ref;
	}
	PDFAcroField.prototype.T = function() {
		return this.dict.lookupMaybe(PDFName.of("T"), PDFString, PDFHexString);
	};
	PDFAcroField.prototype.Ff = function() {
		var numberOrRef = this.getInheritableAttribute(PDFName.of("Ff"));
		return this.dict.context.lookupMaybe(numberOrRef, PDFNumber);
	};
	PDFAcroField.prototype.V = function() {
		var valueOrRef = this.getInheritableAttribute(PDFName.of("V"));
		return this.dict.context.lookup(valueOrRef);
	};
	PDFAcroField.prototype.Kids = function() {
		return this.dict.lookupMaybe(PDFName.of("Kids"), PDFArray);
	};
	PDFAcroField.prototype.DA = function() {
		var da = this.dict.lookup(PDFName.of("DA"));
		if (da instanceof PDFString || da instanceof PDFHexString) return da;
	};
	PDFAcroField.prototype.setKids = function(kids) {
		this.dict.set(PDFName.of("Kids"), this.dict.context.obj(kids));
	};
	PDFAcroField.prototype.getParent = function() {
		var parentRef = this.dict.get(PDFName.of("Parent"));
		if (parentRef instanceof PDFRef) return new PDFAcroField(this.dict.lookup(PDFName.of("Parent"), PDFDict), parentRef);
	};
	PDFAcroField.prototype.setParent = function(parent) {
		if (!parent) this.dict.delete(PDFName.of("Parent"));
		else this.dict.set(PDFName.of("Parent"), parent);
	};
	PDFAcroField.prototype.getFullyQualifiedName = function() {
		var parent = this.getParent();
		if (!parent) return this.getPartialName();
		return parent.getFullyQualifiedName() + "." + this.getPartialName();
	};
	PDFAcroField.prototype.getPartialName = function() {
		var _a;
		return (_a = this.T()) === null || _a === void 0 ? void 0 : _a.decodeText();
	};
	PDFAcroField.prototype.setPartialName = function(partialName) {
		if (!partialName) this.dict.delete(PDFName.of("T"));
		else this.dict.set(PDFName.of("T"), PDFHexString.fromText(partialName));
	};
	PDFAcroField.prototype.setDefaultAppearance = function(appearance) {
		this.dict.set(PDFName.of("DA"), PDFString.of(appearance));
	};
	PDFAcroField.prototype.getDefaultAppearance = function() {
		var DA = this.DA();
		if (DA instanceof PDFHexString) return DA.decodeText();
		return DA === null || DA === void 0 ? void 0 : DA.asString();
	};
	PDFAcroField.prototype.setFontSize = function(fontSize) {
		var _a;
		var name = (_a = this.getFullyQualifiedName()) !== null && _a !== void 0 ? _a : "";
		var da = this.getDefaultAppearance();
		if (!da) throw new MissingDAEntryError(name);
		var daMatch = findLastMatch(da, tfRegex$1);
		if (!daMatch.match) throw new MissingTfOperatorError(name);
		var daStart = da.slice(0, daMatch.pos - daMatch.match[0].length);
		var daEnd = daMatch.pos <= da.length ? da.slice(daMatch.pos) : "";
		var fontName = daMatch.match[1];
		var modifiedDa = daStart + " /" + fontName + " " + fontSize + " Tf " + daEnd;
		this.setDefaultAppearance(modifiedDa);
	};
	PDFAcroField.prototype.getFlags = function() {
		var _a, _b;
		return (_b = (_a = this.Ff()) === null || _a === void 0 ? void 0 : _a.asNumber()) !== null && _b !== void 0 ? _b : 0;
	};
	PDFAcroField.prototype.setFlags = function(flags) {
		this.dict.set(PDFName.of("Ff"), PDFNumber.of(flags));
	};
	PDFAcroField.prototype.hasFlag = function(flag) {
		return (this.getFlags() & flag) !== 0;
	};
	PDFAcroField.prototype.setFlag = function(flag) {
		var flags = this.getFlags();
		this.setFlags(flags | flag);
	};
	PDFAcroField.prototype.clearFlag = function(flag) {
		var flags = this.getFlags();
		this.setFlags(flags & ~flag);
	};
	PDFAcroField.prototype.setFlagTo = function(flag, enable) {
		if (enable) this.setFlag(flag);
		else this.clearFlag(flag);
	};
	PDFAcroField.prototype.getInheritableAttribute = function(name) {
		var attribute;
		this.ascend(function(node) {
			if (!attribute) attribute = node.dict.get(name);
		});
		return attribute;
	};
	PDFAcroField.prototype.ascend = function(visitor) {
		visitor(this);
		var parent = this.getParent();
		if (parent) parent.ascend(visitor);
	};
	return PDFAcroField;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/annotation/BorderStyle.js
var BorderStyle = function() {
	function BorderStyle(dict) {
		this.dict = dict;
	}
	BorderStyle.prototype.W = function() {
		var W = this.dict.lookup(PDFName.of("W"));
		if (W instanceof PDFNumber) return W;
	};
	BorderStyle.prototype.getWidth = function() {
		var _a, _b;
		return (_b = (_a = this.W()) === null || _a === void 0 ? void 0 : _a.asNumber()) !== null && _b !== void 0 ? _b : 1;
	};
	BorderStyle.prototype.setWidth = function(width) {
		var W = this.dict.context.obj(width);
		this.dict.set(PDFName.of("W"), W);
	};
	BorderStyle.fromDict = function(dict) {
		return new BorderStyle(dict);
	};
	return BorderStyle;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/annotation/PDFAnnotation.js
var PDFAnnotation = function() {
	function PDFAnnotation(dict) {
		this.dict = dict;
	}
	PDFAnnotation.prototype.Rect = function() {
		return this.dict.lookup(PDFName.of("Rect"), PDFArray);
	};
	PDFAnnotation.prototype.AP = function() {
		return this.dict.lookupMaybe(PDFName.of("AP"), PDFDict);
	};
	PDFAnnotation.prototype.F = function() {
		var numberOrRef = this.dict.lookup(PDFName.of("F"));
		return this.dict.context.lookupMaybe(numberOrRef, PDFNumber);
	};
	PDFAnnotation.prototype.getRectangle = function() {
		var _a;
		var Rect = this.Rect();
		return (_a = Rect === null || Rect === void 0 ? void 0 : Rect.asRectangle()) !== null && _a !== void 0 ? _a : {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		};
	};
	PDFAnnotation.prototype.setRectangle = function(rect) {
		var x = rect.x, y = rect.y, width = rect.width, height = rect.height;
		var Rect = this.dict.context.obj([
			x,
			y,
			x + width,
			y + height
		]);
		this.dict.set(PDFName.of("Rect"), Rect);
	};
	PDFAnnotation.prototype.getAppearanceState = function() {
		var AS = this.dict.lookup(PDFName.of("AS"));
		if (AS instanceof PDFName) return AS;
	};
	PDFAnnotation.prototype.setAppearanceState = function(state) {
		this.dict.set(PDFName.of("AS"), state);
	};
	PDFAnnotation.prototype.setAppearances = function(appearances) {
		this.dict.set(PDFName.of("AP"), appearances);
	};
	PDFAnnotation.prototype.ensureAP = function() {
		var AP = this.AP();
		if (!AP) {
			AP = this.dict.context.obj({});
			this.dict.set(PDFName.of("AP"), AP);
		}
		return AP;
	};
	PDFAnnotation.prototype.getNormalAppearance = function() {
		var N = this.ensureAP().get(PDFName.of("N"));
		if (N instanceof PDFRef || N instanceof PDFDict) return N;
		throw new Error("Unexpected N type: " + (N === null || N === void 0 ? void 0 : N.constructor.name));
	};
	/** @param appearance A PDFDict or PDFStream (direct or ref) */
	PDFAnnotation.prototype.setNormalAppearance = function(appearance) {
		this.ensureAP().set(PDFName.of("N"), appearance);
	};
	/** @param appearance A PDFDict or PDFStream (direct or ref) */
	PDFAnnotation.prototype.setRolloverAppearance = function(appearance) {
		this.ensureAP().set(PDFName.of("R"), appearance);
	};
	/** @param appearance A PDFDict or PDFStream (direct or ref) */
	PDFAnnotation.prototype.setDownAppearance = function(appearance) {
		this.ensureAP().set(PDFName.of("D"), appearance);
	};
	PDFAnnotation.prototype.removeRolloverAppearance = function() {
		var AP = this.AP();
		AP === null || AP === void 0 || AP.delete(PDFName.of("R"));
	};
	PDFAnnotation.prototype.removeDownAppearance = function() {
		var AP = this.AP();
		AP === null || AP === void 0 || AP.delete(PDFName.of("D"));
	};
	PDFAnnotation.prototype.getAppearances = function() {
		var AP = this.AP();
		if (!AP) return void 0;
		return {
			normal: AP.lookup(PDFName.of("N"), PDFDict, PDFStream),
			rollover: AP.lookupMaybe(PDFName.of("R"), PDFDict, PDFStream),
			down: AP.lookupMaybe(PDFName.of("D"), PDFDict, PDFStream)
		};
	};
	PDFAnnotation.prototype.getFlags = function() {
		var _a, _b;
		return (_b = (_a = this.F()) === null || _a === void 0 ? void 0 : _a.asNumber()) !== null && _b !== void 0 ? _b : 0;
	};
	PDFAnnotation.prototype.setFlags = function(flags) {
		this.dict.set(PDFName.of("F"), PDFNumber.of(flags));
	};
	PDFAnnotation.prototype.hasFlag = function(flag) {
		return (this.getFlags() & flag) !== 0;
	};
	PDFAnnotation.prototype.setFlag = function(flag) {
		var flags = this.getFlags();
		this.setFlags(flags | flag);
	};
	PDFAnnotation.prototype.clearFlag = function(flag) {
		var flags = this.getFlags();
		this.setFlags(flags & ~flag);
	};
	PDFAnnotation.prototype.setFlagTo = function(flag, enable) {
		if (enable) this.setFlag(flag);
		else this.clearFlag(flag);
	};
	PDFAnnotation.fromDict = function(dict) {
		return new PDFAnnotation(dict);
	};
	return PDFAnnotation;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/annotation/AppearanceCharacteristics.js
var AppearanceCharacteristics = function() {
	function AppearanceCharacteristics(dict) {
		this.dict = dict;
	}
	AppearanceCharacteristics.prototype.R = function() {
		var R = this.dict.lookup(PDFName.of("R"));
		if (R instanceof PDFNumber) return R;
	};
	AppearanceCharacteristics.prototype.BC = function() {
		var BC = this.dict.lookup(PDFName.of("BC"));
		if (BC instanceof PDFArray) return BC;
	};
	AppearanceCharacteristics.prototype.BG = function() {
		var BG = this.dict.lookup(PDFName.of("BG"));
		if (BG instanceof PDFArray) return BG;
	};
	AppearanceCharacteristics.prototype.CA = function() {
		var CA = this.dict.lookup(PDFName.of("CA"));
		if (CA instanceof PDFHexString || CA instanceof PDFString) return CA;
	};
	AppearanceCharacteristics.prototype.RC = function() {
		var RC = this.dict.lookup(PDFName.of("RC"));
		if (RC instanceof PDFHexString || RC instanceof PDFString) return RC;
	};
	AppearanceCharacteristics.prototype.AC = function() {
		var AC = this.dict.lookup(PDFName.of("AC"));
		if (AC instanceof PDFHexString || AC instanceof PDFString) return AC;
	};
	AppearanceCharacteristics.prototype.getRotation = function() {
		var _a;
		return (_a = this.R()) === null || _a === void 0 ? void 0 : _a.asNumber();
	};
	AppearanceCharacteristics.prototype.getBorderColor = function() {
		var BC = this.BC();
		if (!BC) return void 0;
		var components = [];
		for (var idx = 0, len = BC === null || BC === void 0 ? void 0 : BC.size(); idx < len; idx++) {
			var component = BC.get(idx);
			if (component instanceof PDFNumber) components.push(component.asNumber());
		}
		return components;
	};
	AppearanceCharacteristics.prototype.getBackgroundColor = function() {
		var BG = this.BG();
		if (!BG) return void 0;
		var components = [];
		for (var idx = 0, len = BG === null || BG === void 0 ? void 0 : BG.size(); idx < len; idx++) {
			var component = BG.get(idx);
			if (component instanceof PDFNumber) components.push(component.asNumber());
		}
		return components;
	};
	AppearanceCharacteristics.prototype.getCaptions = function() {
		var CA = this.CA();
		var RC = this.RC();
		var AC = this.AC();
		return {
			normal: CA === null || CA === void 0 ? void 0 : CA.decodeText(),
			rollover: RC === null || RC === void 0 ? void 0 : RC.decodeText(),
			down: AC === null || AC === void 0 ? void 0 : AC.decodeText()
		};
	};
	AppearanceCharacteristics.prototype.setRotation = function(rotation) {
		var R = this.dict.context.obj(rotation);
		this.dict.set(PDFName.of("R"), R);
	};
	AppearanceCharacteristics.prototype.setBorderColor = function(color) {
		var BC = this.dict.context.obj(color);
		this.dict.set(PDFName.of("BC"), BC);
	};
	AppearanceCharacteristics.prototype.setBackgroundColor = function(color) {
		var BG = this.dict.context.obj(color);
		this.dict.set(PDFName.of("BG"), BG);
	};
	AppearanceCharacteristics.prototype.setCaptions = function(captions) {
		var CA = PDFHexString.fromText(captions.normal);
		this.dict.set(PDFName.of("CA"), CA);
		if (captions.rollover) {
			var RC = PDFHexString.fromText(captions.rollover);
			this.dict.set(PDFName.of("RC"), RC);
		} else this.dict.delete(PDFName.of("RC"));
		if (captions.down) {
			var AC = PDFHexString.fromText(captions.down);
			this.dict.set(PDFName.of("AC"), AC);
		} else this.dict.delete(PDFName.of("AC"));
	};
	AppearanceCharacteristics.fromDict = function(dict) {
		return new AppearanceCharacteristics(dict);
	};
	return AppearanceCharacteristics;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/annotation/PDFWidgetAnnotation.js
var PDFWidgetAnnotation = function(_super) {
	__extends(PDFWidgetAnnotation, _super);
	function PDFWidgetAnnotation() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	PDFWidgetAnnotation.prototype.MK = function() {
		var MK = this.dict.lookup(PDFName.of("MK"));
		if (MK instanceof PDFDict) return MK;
	};
	PDFWidgetAnnotation.prototype.BS = function() {
		var BS = this.dict.lookup(PDFName.of("BS"));
		if (BS instanceof PDFDict) return BS;
	};
	PDFWidgetAnnotation.prototype.DA = function() {
		var da = this.dict.lookup(PDFName.of("DA"));
		if (da instanceof PDFString || da instanceof PDFHexString) return da;
	};
	PDFWidgetAnnotation.prototype.P = function() {
		var P = this.dict.get(PDFName.of("P"));
		if (P instanceof PDFRef) return P;
	};
	PDFWidgetAnnotation.prototype.setP = function(page) {
		this.dict.set(PDFName.of("P"), page);
	};
	PDFWidgetAnnotation.prototype.setDefaultAppearance = function(appearance) {
		this.dict.set(PDFName.of("DA"), PDFString.of(appearance));
	};
	PDFWidgetAnnotation.prototype.getDefaultAppearance = function() {
		var DA = this.DA();
		if (DA instanceof PDFHexString) return DA.decodeText();
		return DA === null || DA === void 0 ? void 0 : DA.asString();
	};
	PDFWidgetAnnotation.prototype.getAppearanceCharacteristics = function() {
		var MK = this.MK();
		if (MK) return AppearanceCharacteristics.fromDict(MK);
	};
	PDFWidgetAnnotation.prototype.getOrCreateAppearanceCharacteristics = function() {
		var MK = this.MK();
		if (MK) return AppearanceCharacteristics.fromDict(MK);
		var ac = AppearanceCharacteristics.fromDict(this.dict.context.obj({}));
		this.dict.set(PDFName.of("MK"), ac.dict);
		return ac;
	};
	PDFWidgetAnnotation.prototype.getBorderStyle = function() {
		var BS = this.BS();
		if (BS) return BorderStyle.fromDict(BS);
	};
	PDFWidgetAnnotation.prototype.getOrCreateBorderStyle = function() {
		var BS = this.BS();
		if (BS) return BorderStyle.fromDict(BS);
		var bs = BorderStyle.fromDict(this.dict.context.obj({}));
		this.dict.set(PDFName.of("BS"), bs.dict);
		return bs;
	};
	PDFWidgetAnnotation.prototype.getOnValue = function() {
		var _a;
		var normal = (_a = this.getAppearances()) === null || _a === void 0 ? void 0 : _a.normal;
		if (normal instanceof PDFDict) {
			var keys = normal.keys();
			for (var idx = 0, len = keys.length; idx < len; idx++) {
				var key = keys[idx];
				if (key !== PDFName.of("Off")) return key;
			}
		}
	};
	PDFWidgetAnnotation.fromDict = function(dict) {
		return new PDFWidgetAnnotation(dict);
	};
	PDFWidgetAnnotation.create = function(context, parent) {
		return new PDFWidgetAnnotation(context.obj({
			Type: "Annot",
			Subtype: "Widget",
			Rect: [
				0,
				0,
				0,
				0
			],
			Parent: parent
		}));
	};
	return PDFWidgetAnnotation;
}(PDFAnnotation);
//#endregion
//#region node_modules/pdf-lib/es/core/acroform/PDFAcroTerminal.js
var PDFAcroTerminal = function(_super) {
	__extends(PDFAcroTerminal, _super);
	function PDFAcroTerminal() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	PDFAcroTerminal.prototype.FT = function() {
		var nameOrRef = this.getInheritableAttribute(PDFName.of("FT"));
		return this.dict.context.lookup(nameOrRef, PDFName);
	};
	PDFAcroTerminal.prototype.getWidgets = function() {
		var kidDicts = this.Kids();
		if (!kidDicts) return [PDFWidgetAnnotation.fromDict(this.dict)];
		var widgets = new Array(kidDicts.size());
		for (var idx = 0, len = kidDicts.size(); idx < len; idx++) {
			var dict = kidDicts.lookup(idx, PDFDict);
			widgets[idx] = PDFWidgetAnnotation.fromDict(dict);
		}
		return widgets;
	};
	PDFAcroTerminal.prototype.addWidget = function(ref) {
		this.normalizedEntries().Kids.push(ref);
	};
	PDFAcroTerminal.prototype.removeWidget = function(idx) {
		var kidDicts = this.Kids();
		if (!kidDicts) {
			if (idx !== 0) throw new IndexOutOfBoundsError(idx, 0, 0);
			this.setKids([]);
		} else {
			if (idx < 0 || idx > kidDicts.size()) throw new IndexOutOfBoundsError(idx, 0, kidDicts.size());
			kidDicts.remove(idx);
		}
	};
	PDFAcroTerminal.prototype.normalizedEntries = function() {
		var Kids = this.Kids();
		if (!Kids) {
			Kids = this.dict.context.obj([this.ref]);
			this.dict.set(PDFName.of("Kids"), Kids);
		}
		return { Kids };
	};
	PDFAcroTerminal.fromDict = function(dict, ref) {
		return new PDFAcroTerminal(dict, ref);
	};
	return PDFAcroTerminal;
}(PDFAcroField);
//#endregion
//#region node_modules/pdf-lib/es/core/acroform/PDFAcroButton.js
var PDFAcroButton = function(_super) {
	__extends(PDFAcroButton, _super);
	function PDFAcroButton() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	PDFAcroButton.prototype.Opt = function() {
		return this.dict.lookupMaybe(PDFName.of("Opt"), PDFString, PDFHexString, PDFArray);
	};
	PDFAcroButton.prototype.setOpt = function(opt) {
		this.dict.set(PDFName.of("Opt"), this.dict.context.obj(opt));
	};
	PDFAcroButton.prototype.getExportValues = function() {
		var opt = this.Opt();
		if (!opt) return void 0;
		if (opt instanceof PDFString || opt instanceof PDFHexString) return [opt];
		var values = [];
		for (var idx = 0, len = opt.size(); idx < len; idx++) {
			var value = opt.lookup(idx);
			if (value instanceof PDFString || value instanceof PDFHexString) values.push(value);
		}
		return values;
	};
	PDFAcroButton.prototype.removeExportValue = function(idx) {
		var opt = this.Opt();
		if (!opt) return;
		if (opt instanceof PDFString || opt instanceof PDFHexString) {
			if (idx !== 0) throw new IndexOutOfBoundsError(idx, 0, 0);
			this.setOpt([]);
		} else {
			if (idx < 0 || idx > opt.size()) throw new IndexOutOfBoundsError(idx, 0, opt.size());
			opt.remove(idx);
		}
	};
	PDFAcroButton.prototype.normalizeExportValues = function() {
		var _a, _b, _c, _d;
		var exportValues = (_a = this.getExportValues()) !== null && _a !== void 0 ? _a : [];
		var Opt = [];
		var widgets = this.getWidgets();
		for (var idx = 0, len = widgets.length; idx < len; idx++) {
			var widget = widgets[idx];
			var exportVal = (_b = exportValues[idx]) !== null && _b !== void 0 ? _b : PDFHexString.fromText((_d = (_c = widget.getOnValue()) === null || _c === void 0 ? void 0 : _c.decodeText()) !== null && _d !== void 0 ? _d : "");
			Opt.push(exportVal);
		}
		this.setOpt(Opt);
	};
	/**
	* Reuses existing opt if one exists with the same value (assuming
	* `useExistingIdx` is `true`). Returns index of existing (or new) opt.
	*/
	PDFAcroButton.prototype.addOpt = function(opt, useExistingOptIdx) {
		var _a;
		this.normalizeExportValues();
		var optText = opt.decodeText();
		var existingIdx;
		if (useExistingOptIdx) {
			var exportValues = (_a = this.getExportValues()) !== null && _a !== void 0 ? _a : [];
			for (var idx = 0, len = exportValues.length; idx < len; idx++) if (exportValues[idx].decodeText() === optText) existingIdx = idx;
		}
		var Opt = this.Opt();
		Opt.push(opt);
		return existingIdx !== null && existingIdx !== void 0 ? existingIdx : Opt.size() - 1;
	};
	PDFAcroButton.prototype.addWidgetWithOpt = function(widget, opt, useExistingOptIdx) {
		var optIdx = this.addOpt(opt, useExistingOptIdx);
		var apStateValue = PDFName.of(String(optIdx));
		this.addWidget(widget);
		return apStateValue;
	};
	return PDFAcroButton;
}(PDFAcroTerminal);
//#endregion
//#region node_modules/pdf-lib/es/core/acroform/PDFAcroCheckBox.js
var PDFAcroCheckBox = function(_super) {
	__extends(PDFAcroCheckBox, _super);
	function PDFAcroCheckBox() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	PDFAcroCheckBox.prototype.setValue = function(value) {
		var _a;
		if (value !== ((_a = this.getOnValue()) !== null && _a !== void 0 ? _a : PDFName.of("Yes")) && value !== PDFName.of("Off")) throw new InvalidAcroFieldValueError();
		this.dict.set(PDFName.of("V"), value);
		var widgets = this.getWidgets();
		for (var idx = 0, len = widgets.length; idx < len; idx++) {
			var widget = widgets[idx];
			var state = widget.getOnValue() === value ? value : PDFName.of("Off");
			widget.setAppearanceState(state);
		}
	};
	PDFAcroCheckBox.prototype.getValue = function() {
		var v = this.V();
		if (v instanceof PDFName) return v;
		return PDFName.of("Off");
	};
	PDFAcroCheckBox.prototype.getOnValue = function() {
		var widget = this.getWidgets()[0];
		return widget === null || widget === void 0 ? void 0 : widget.getOnValue();
	};
	PDFAcroCheckBox.fromDict = function(dict, ref) {
		return new PDFAcroCheckBox(dict, ref);
	};
	PDFAcroCheckBox.create = function(context) {
		var dict = context.obj({
			FT: "Btn",
			Kids: []
		});
		return new PDFAcroCheckBox(dict, context.register(dict));
	};
	return PDFAcroCheckBox;
}(PDFAcroButton);
//#endregion
//#region node_modules/pdf-lib/es/core/acroform/flags.js
var flag$1 = function(bitIndex) {
	return 1 << bitIndex;
};
/** From PDF spec table 221 */
var AcroFieldFlags;
(function(AcroFieldFlags) {
	/**
	* If set, the user may not change the value of the field. Any associated
	* widget annotations will not interact with the user; that is, they will not
	* respond to mouse clicks or change their appearance in response to mouse
	* motions. This flag is useful for fields whose values are computed or
	* imported from a database.
	*/
	AcroFieldFlags[AcroFieldFlags["ReadOnly"] = flag$1(0)] = "ReadOnly";
	/**
	* If set, the field shall have a value at the time it is exported by a
	* submit-form action (see 12.7.5.2, "Submit-Form Action").
	*/
	AcroFieldFlags[AcroFieldFlags["Required"] = flag$1(1)] = "Required";
	/**
	* If set, the field shall not be exported by a submit-form action
	* (see 12.7.5.2, "Submit-Form Action").
	*/
	AcroFieldFlags[AcroFieldFlags["NoExport"] = flag$1(2)] = "NoExport";
})(AcroFieldFlags || (AcroFieldFlags = {}));
/** From PDF spec table 226 */
var AcroButtonFlags;
(function(AcroButtonFlags) {
	/**
	* (Radio buttons only) If set, exactly one radio button shall be selected at
	* all times; selecting the currently selected button has no effect. If clear,
	* clicking the selected button deselects it, leaving no button selected.
	*/
	AcroButtonFlags[AcroButtonFlags["NoToggleToOff"] = flag$1(14)] = "NoToggleToOff";
	/**
	* If set, the field is a set of radio buttons; if clear, the field is a check
	* box. This flag may be set only if the Pushbutton flag is clear.
	*/
	AcroButtonFlags[AcroButtonFlags["Radio"] = flag$1(15)] = "Radio";
	/**
	* If set, the field is a pushbutton that does not retain a permanent value.
	*/
	AcroButtonFlags[AcroButtonFlags["PushButton"] = flag$1(16)] = "PushButton";
	/**
	* If set, a group of radio buttons within a radio button field that use the
	* same value for the on state will turn on and off in unison; that is if one
	* is checked, they are all checked. If clear, the buttons are mutually
	* exclusive (the same behavior as HTML radio buttons).
	*/
	AcroButtonFlags[AcroButtonFlags["RadiosInUnison"] = flag$1(25)] = "RadiosInUnison";
})(AcroButtonFlags || (AcroButtonFlags = {}));
/** From PDF spec table 228 */
var AcroTextFlags;
(function(AcroTextFlags) {
	/**
	* If set, the field may contain multiple lines of text; if clear, the field's
	* text shall be restricted to a single line.
	*/
	AcroTextFlags[AcroTextFlags["Multiline"] = flag$1(12)] = "Multiline";
	/**
	* If set, the field is intended for entering a secure password that should
	* not be echoed visibly to the screen. Characters typed from the keyboard
	* shall instead be echoed in some unreadable form, such as asterisks or
	* bullet characters.
	* > NOTE   To protect password confidentiality, readers should never store
	* >        the value of the text field in the PDF file if this flag is set.
	*/
	AcroTextFlags[AcroTextFlags["Password"] = flag$1(13)] = "Password";
	/**
	* If set, the text entered in the field represents the pathname of a file
	* whose contents shall be submitted as the value of the field.
	*/
	AcroTextFlags[AcroTextFlags["FileSelect"] = flag$1(20)] = "FileSelect";
	/**
	* If set, text entered in the field shall not be spell-checked.
	*/
	AcroTextFlags[AcroTextFlags["DoNotSpellCheck"] = flag$1(22)] = "DoNotSpellCheck";
	/**
	* If set, the field shall not scroll (horizontally for single-line fields,
	* vertically for multiple-line fields) to accommodate more text than fits
	* within its annotation rectangle. Once the field is full, no further text
	* shall be accepted for interactive form filling; for non-interactive form
	* filling, the filler should take care not to add more character than will
	* visibly fit in the defined area.
	*/
	AcroTextFlags[AcroTextFlags["DoNotScroll"] = flag$1(23)] = "DoNotScroll";
	/**
	* May be set only if the MaxLen entry is present in the text field dictionary
	* (see Table 229) and if the Multiline, Password, and FileSelect flags are
	* clear. If set, the field shall be automatically divided into as many
	* equally spaced positions, or combs, as the value of MaxLen, and the text
	* is laid out into those combs.
	*/
	AcroTextFlags[AcroTextFlags["Comb"] = flag$1(24)] = "Comb";
	/**
	* If set, the value of this field shall be a rich text string
	* (see 12.7.3.4, "Rich Text Strings"). If the field has a value, the RV
	* entry of the field dictionary (Table 222) shall specify the rich text
	* string.
	*/
	AcroTextFlags[AcroTextFlags["RichText"] = flag$1(25)] = "RichText";
})(AcroTextFlags || (AcroTextFlags = {}));
/** From PDF spec table 230 */
var AcroChoiceFlags;
(function(AcroChoiceFlags) {
	/**
	* If set, the field is a combo box; if clear, the field is a list box.
	*/
	AcroChoiceFlags[AcroChoiceFlags["Combo"] = flag$1(17)] = "Combo";
	/**
	* If set, the combo box shall include an editable text box as well as a
	* drop-down list; if clear, it shall include only a drop-down list. This
	* flag shall be used only if the Combo flag is set.
	*/
	AcroChoiceFlags[AcroChoiceFlags["Edit"] = flag$1(18)] = "Edit";
	/**
	* If set, the field's option items shall be sorted alphabetically. This flag
	* is intended for use by writers, not by readers. Conforming readers shall
	* display the options in the order in which they occur in the Opt array
	* (see Table 231).
	*/
	AcroChoiceFlags[AcroChoiceFlags["Sort"] = flag$1(19)] = "Sort";
	/**
	* If set, more than one of the field's option items may be selected
	* simultaneously; if clear, at most one item shall be selected.
	*/
	AcroChoiceFlags[AcroChoiceFlags["MultiSelect"] = flag$1(21)] = "MultiSelect";
	/**
	* If set, text entered in the field shall not be spell-checked. This flag
	* shall not be used unless the Combo and Edit flags are both set.
	*/
	AcroChoiceFlags[AcroChoiceFlags["DoNotSpellCheck"] = flag$1(22)] = "DoNotSpellCheck";
	/**
	* If set, the new value shall be committed as soon as a selection is made
	* (commonly with the pointing device). In this case, supplying a value for
	* a field involves three actions: selecting the field for fill-in,
	* selecting a choice for the fill-in value, and leaving that field, which
	* finalizes or "commits" the data choice and triggers any actions associated
	* with the entry or changing of this data. If this flag is on, then
	* processing does not wait for leaving the field action to occur, but
	* immediately proceeds to the third step.
	*
	* This option enables applications to perform an action once a selection is
	* made, without requiring the user to exit the field. If clear, the new
	* value is not committed until the user exits the field.
	*/
	AcroChoiceFlags[AcroChoiceFlags["CommitOnSelChange"] = flag$1(26)] = "CommitOnSelChange";
})(AcroChoiceFlags || (AcroChoiceFlags = {}));
//#endregion
//#region node_modules/pdf-lib/es/core/acroform/PDFAcroChoice.js
var PDFAcroChoice = function(_super) {
	__extends(PDFAcroChoice, _super);
	function PDFAcroChoice() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	PDFAcroChoice.prototype.setValues = function(values) {
		if (this.hasFlag(AcroChoiceFlags.Combo) && !this.hasFlag(AcroChoiceFlags.Edit) && !this.valuesAreValid(values)) throw new InvalidAcroFieldValueError();
		if (values.length === 0) this.dict.delete(PDFName.of("V"));
		if (values.length === 1) this.dict.set(PDFName.of("V"), values[0]);
		if (values.length > 1) {
			if (!this.hasFlag(AcroChoiceFlags.MultiSelect)) throw new MultiSelectValueError();
			this.dict.set(PDFName.of("V"), this.dict.context.obj(values));
		}
		this.updateSelectedIndices(values);
	};
	PDFAcroChoice.prototype.valuesAreValid = function(values) {
		var options = this.getOptions();
		var _loop_1 = function(idx, len) {
			var val = values[idx].decodeText();
			if (!options.find(function(o) {
				return val === (o.display || o.value).decodeText();
			})) return { value: false };
		};
		for (var idx = 0, len = values.length; idx < len; idx++) {
			var state_1 = _loop_1(idx, len);
			if (typeof state_1 === "object") return state_1.value;
		}
		return true;
	};
	PDFAcroChoice.prototype.updateSelectedIndices = function(values) {
		if (values.length > 1) {
			var indices = new Array(values.length);
			var options = this.getOptions();
			var _loop_2 = function(idx, len) {
				var val = values[idx].decodeText();
				indices[idx] = options.findIndex(function(o) {
					return val === (o.display || o.value).decodeText();
				});
			};
			for (var idx = 0, len = values.length; idx < len; idx++) _loop_2(idx, len);
			this.dict.set(PDFName.of("I"), this.dict.context.obj(indices.sort()));
		} else this.dict.delete(PDFName.of("I"));
	};
	PDFAcroChoice.prototype.getValues = function() {
		var v = this.V();
		if (v instanceof PDFString || v instanceof PDFHexString) return [v];
		if (v instanceof PDFArray) {
			var values = [];
			for (var idx = 0, len = v.size(); idx < len; idx++) {
				var value = v.lookup(idx);
				if (value instanceof PDFString || value instanceof PDFHexString) values.push(value);
			}
			return values;
		}
		return [];
	};
	PDFAcroChoice.prototype.Opt = function() {
		return this.dict.lookupMaybe(PDFName.of("Opt"), PDFString, PDFHexString, PDFArray);
	};
	PDFAcroChoice.prototype.setOptions = function(options) {
		var newOpt = new Array(options.length);
		for (var idx = 0, len = options.length; idx < len; idx++) {
			var _a = options[idx], value = _a.value, display = _a.display;
			newOpt[idx] = this.dict.context.obj([value, display || value]);
		}
		this.dict.set(PDFName.of("Opt"), this.dict.context.obj(newOpt));
	};
	PDFAcroChoice.prototype.getOptions = function() {
		var Opt = this.Opt();
		if (Opt instanceof PDFString || Opt instanceof PDFHexString) return [{
			value: Opt,
			display: Opt
		}];
		if (Opt instanceof PDFArray) {
			var res = [];
			for (var idx = 0, len = Opt.size(); idx < len; idx++) {
				var item = Opt.lookup(idx);
				if (item instanceof PDFString || item instanceof PDFHexString) res.push({
					value: item,
					display: item
				});
				if (item instanceof PDFArray) {
					if (item.size() > 0) {
						var first = item.lookup(0, PDFString, PDFHexString);
						var second = item.lookupMaybe(1, PDFString, PDFHexString);
						res.push({
							value: first,
							display: second || first
						});
					}
				}
			}
			return res;
		}
		return [];
	};
	return PDFAcroChoice;
}(PDFAcroTerminal);
//#endregion
//#region node_modules/pdf-lib/es/core/acroform/PDFAcroComboBox.js
var PDFAcroComboBox = function(_super) {
	__extends(PDFAcroComboBox, _super);
	function PDFAcroComboBox() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	PDFAcroComboBox.fromDict = function(dict, ref) {
		return new PDFAcroComboBox(dict, ref);
	};
	PDFAcroComboBox.create = function(context) {
		var dict = context.obj({
			FT: "Ch",
			Ff: AcroChoiceFlags.Combo,
			Kids: []
		});
		return new PDFAcroComboBox(dict, context.register(dict));
	};
	return PDFAcroComboBox;
}(PDFAcroChoice);
//#endregion
//#region node_modules/pdf-lib/es/core/acroform/PDFAcroNonTerminal.js
var PDFAcroNonTerminal = function(_super) {
	__extends(PDFAcroNonTerminal, _super);
	function PDFAcroNonTerminal() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	PDFAcroNonTerminal.prototype.addField = function(field) {
		var Kids = this.normalizedEntries().Kids;
		Kids === null || Kids === void 0 || Kids.push(field);
	};
	PDFAcroNonTerminal.prototype.normalizedEntries = function() {
		var Kids = this.Kids();
		if (!Kids) {
			Kids = this.dict.context.obj([]);
			this.dict.set(PDFName.of("Kids"), Kids);
		}
		return { Kids };
	};
	PDFAcroNonTerminal.fromDict = function(dict, ref) {
		return new PDFAcroNonTerminal(dict, ref);
	};
	PDFAcroNonTerminal.create = function(context) {
		var dict = context.obj({});
		return new PDFAcroNonTerminal(dict, context.register(dict));
	};
	return PDFAcroNonTerminal;
}(PDFAcroField);
//#endregion
//#region node_modules/pdf-lib/es/core/acroform/PDFAcroSignature.js
var PDFAcroSignature = function(_super) {
	__extends(PDFAcroSignature, _super);
	function PDFAcroSignature() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	PDFAcroSignature.fromDict = function(dict, ref) {
		return new PDFAcroSignature(dict, ref);
	};
	return PDFAcroSignature;
}(PDFAcroTerminal);
//#endregion
//#region node_modules/pdf-lib/es/core/acroform/PDFAcroText.js
var PDFAcroText = function(_super) {
	__extends(PDFAcroText, _super);
	function PDFAcroText() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	PDFAcroText.prototype.MaxLen = function() {
		var maxLen = this.dict.lookup(PDFName.of("MaxLen"));
		if (maxLen instanceof PDFNumber) return maxLen;
	};
	PDFAcroText.prototype.Q = function() {
		var q = this.dict.lookup(PDFName.of("Q"));
		if (q instanceof PDFNumber) return q;
	};
	PDFAcroText.prototype.setMaxLength = function(maxLength) {
		this.dict.set(PDFName.of("MaxLen"), PDFNumber.of(maxLength));
	};
	PDFAcroText.prototype.removeMaxLength = function() {
		this.dict.delete(PDFName.of("MaxLen"));
	};
	PDFAcroText.prototype.getMaxLength = function() {
		var _a;
		return (_a = this.MaxLen()) === null || _a === void 0 ? void 0 : _a.asNumber();
	};
	PDFAcroText.prototype.setQuadding = function(quadding) {
		this.dict.set(PDFName.of("Q"), PDFNumber.of(quadding));
	};
	PDFAcroText.prototype.getQuadding = function() {
		var _a;
		return (_a = this.Q()) === null || _a === void 0 ? void 0 : _a.asNumber();
	};
	PDFAcroText.prototype.setValue = function(value) {
		this.dict.set(PDFName.of("V"), value);
	};
	PDFAcroText.prototype.removeValue = function() {
		this.dict.delete(PDFName.of("V"));
	};
	PDFAcroText.prototype.getValue = function() {
		var v = this.V();
		if (v instanceof PDFString || v instanceof PDFHexString) return v;
	};
	PDFAcroText.fromDict = function(dict, ref) {
		return new PDFAcroText(dict, ref);
	};
	PDFAcroText.create = function(context) {
		var dict = context.obj({
			FT: "Tx",
			Kids: []
		});
		return new PDFAcroText(dict, context.register(dict));
	};
	return PDFAcroText;
}(PDFAcroTerminal);
//#endregion
//#region node_modules/pdf-lib/es/core/acroform/PDFAcroPushButton.js
var PDFAcroPushButton = function(_super) {
	__extends(PDFAcroPushButton, _super);
	function PDFAcroPushButton() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	PDFAcroPushButton.fromDict = function(dict, ref) {
		return new PDFAcroPushButton(dict, ref);
	};
	PDFAcroPushButton.create = function(context) {
		var dict = context.obj({
			FT: "Btn",
			Ff: AcroButtonFlags.PushButton,
			Kids: []
		});
		return new PDFAcroPushButton(dict, context.register(dict));
	};
	return PDFAcroPushButton;
}(PDFAcroButton);
//#endregion
//#region node_modules/pdf-lib/es/core/acroform/PDFAcroRadioButton.js
var PDFAcroRadioButton = function(_super) {
	__extends(PDFAcroRadioButton, _super);
	function PDFAcroRadioButton() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	PDFAcroRadioButton.prototype.setValue = function(value) {
		if (!this.getOnValues().includes(value) && value !== PDFName.of("Off")) throw new InvalidAcroFieldValueError();
		this.dict.set(PDFName.of("V"), value);
		var widgets = this.getWidgets();
		for (var idx = 0, len = widgets.length; idx < len; idx++) {
			var widget = widgets[idx];
			var state = widget.getOnValue() === value ? value : PDFName.of("Off");
			widget.setAppearanceState(state);
		}
	};
	PDFAcroRadioButton.prototype.getValue = function() {
		var v = this.V();
		if (v instanceof PDFName) return v;
		return PDFName.of("Off");
	};
	PDFAcroRadioButton.prototype.getOnValues = function() {
		var widgets = this.getWidgets();
		var onValues = [];
		for (var idx = 0, len = widgets.length; idx < len; idx++) {
			var onValue = widgets[idx].getOnValue();
			if (onValue) onValues.push(onValue);
		}
		return onValues;
	};
	PDFAcroRadioButton.fromDict = function(dict, ref) {
		return new PDFAcroRadioButton(dict, ref);
	};
	PDFAcroRadioButton.create = function(context) {
		var dict = context.obj({
			FT: "Btn",
			Ff: AcroButtonFlags.Radio,
			Kids: []
		});
		return new PDFAcroRadioButton(dict, context.register(dict));
	};
	return PDFAcroRadioButton;
}(PDFAcroButton);
//#endregion
//#region node_modules/pdf-lib/es/core/acroform/PDFAcroListBox.js
var PDFAcroListBox = function(_super) {
	__extends(PDFAcroListBox, _super);
	function PDFAcroListBox() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	PDFAcroListBox.fromDict = function(dict, ref) {
		return new PDFAcroListBox(dict, ref);
	};
	PDFAcroListBox.create = function(context) {
		var dict = context.obj({
			FT: "Ch",
			Kids: []
		});
		return new PDFAcroListBox(dict, context.register(dict));
	};
	return PDFAcroListBox;
}(PDFAcroChoice);
//#endregion
//#region node_modules/pdf-lib/es/core/acroform/utils.js
var createPDFAcroFields = function(kidDicts) {
	if (!kidDicts) return [];
	var kids = [];
	for (var idx = 0, len = kidDicts.size(); idx < len; idx++) {
		var ref = kidDicts.get(idx);
		var dict = kidDicts.lookup(idx);
		if (ref instanceof PDFRef && dict instanceof PDFDict) kids.push([createPDFAcroField(dict, ref), ref]);
	}
	return kids;
};
var createPDFAcroField = function(dict, ref) {
	if (isNonTerminalAcroField(dict)) return PDFAcroNonTerminal.fromDict(dict, ref);
	return createPDFAcroTerminal(dict, ref);
};
var isNonTerminalAcroField = function(dict) {
	var kids = dict.lookup(PDFName.of("Kids"));
	if (kids instanceof PDFArray) for (var idx = 0, len = kids.size(); idx < len; idx++) {
		var kid = kids.lookup(idx);
		if (kid instanceof PDFDict && kid.has(PDFName.of("T"))) return true;
	}
	return false;
};
var createPDFAcroTerminal = function(dict, ref) {
	var ftNameOrRef = getInheritableAttribute(dict, PDFName.of("FT"));
	var type = dict.context.lookup(ftNameOrRef, PDFName);
	if (type === PDFName.of("Btn")) return createPDFAcroButton(dict, ref);
	if (type === PDFName.of("Ch")) return createPDFAcroChoice(dict, ref);
	if (type === PDFName.of("Tx")) return PDFAcroText.fromDict(dict, ref);
	if (type === PDFName.of("Sig")) return PDFAcroSignature.fromDict(dict, ref);
	return PDFAcroTerminal.fromDict(dict, ref);
};
var createPDFAcroButton = function(dict, ref) {
	var _a;
	var ffNumberOrRef = getInheritableAttribute(dict, PDFName.of("Ff"));
	var ffNumber = dict.context.lookupMaybe(ffNumberOrRef, PDFNumber);
	var flags = (_a = ffNumber === null || ffNumber === void 0 ? void 0 : ffNumber.asNumber()) !== null && _a !== void 0 ? _a : 0;
	if (flagIsSet(flags, AcroButtonFlags.PushButton)) return PDFAcroPushButton.fromDict(dict, ref);
	else if (flagIsSet(flags, AcroButtonFlags.Radio)) return PDFAcroRadioButton.fromDict(dict, ref);
	else return PDFAcroCheckBox.fromDict(dict, ref);
};
var createPDFAcroChoice = function(dict, ref) {
	var _a;
	var ffNumberOrRef = getInheritableAttribute(dict, PDFName.of("Ff"));
	var ffNumber = dict.context.lookupMaybe(ffNumberOrRef, PDFNumber);
	if (flagIsSet((_a = ffNumber === null || ffNumber === void 0 ? void 0 : ffNumber.asNumber()) !== null && _a !== void 0 ? _a : 0, AcroChoiceFlags.Combo)) return PDFAcroComboBox.fromDict(dict, ref);
	else return PDFAcroListBox.fromDict(dict, ref);
};
var flagIsSet = function(flags, flag) {
	return (flags & flag) !== 0;
};
var getInheritableAttribute = function(startNode, name) {
	var attribute;
	ascend(startNode, function(node) {
		if (!attribute) attribute = node.get(name);
	});
	return attribute;
};
var ascend = function(startNode, visitor) {
	visitor(startNode);
	var Parent = startNode.lookupMaybe(PDFName.of("Parent"), PDFDict);
	if (Parent) ascend(Parent, visitor);
};
//#endregion
//#region node_modules/pdf-lib/es/core/acroform/PDFAcroForm.js
var PDFAcroForm = function() {
	function PDFAcroForm(dict) {
		this.dict = dict;
	}
	PDFAcroForm.prototype.Fields = function() {
		var fields = this.dict.lookup(PDFName.of("Fields"));
		if (fields instanceof PDFArray) return fields;
	};
	PDFAcroForm.prototype.getFields = function() {
		var Fields = this.normalizedEntries().Fields;
		var fields = new Array(Fields.size());
		for (var idx = 0, len = Fields.size(); idx < len; idx++) {
			var ref = Fields.get(idx);
			var dict = Fields.lookup(idx, PDFDict);
			fields[idx] = [createPDFAcroField(dict, ref), ref];
		}
		return fields;
	};
	PDFAcroForm.prototype.getAllFields = function() {
		var allFields = [];
		var pushFields = function(fields) {
			if (!fields) return;
			for (var idx = 0, len = fields.length; idx < len; idx++) {
				var field = fields[idx];
				allFields.push(field);
				var fieldModel = field[0];
				if (fieldModel instanceof PDFAcroNonTerminal) pushFields(createPDFAcroFields(fieldModel.Kids()));
			}
		};
		pushFields(this.getFields());
		return allFields;
	};
	PDFAcroForm.prototype.addField = function(field) {
		var Fields = this.normalizedEntries().Fields;
		Fields === null || Fields === void 0 || Fields.push(field);
	};
	PDFAcroForm.prototype.removeField = function(field) {
		var parent = field.getParent();
		var fields = parent === void 0 ? this.normalizedEntries().Fields : parent.Kids();
		var index = fields === null || fields === void 0 ? void 0 : fields.indexOf(field.ref);
		if (fields === void 0 || index === void 0) throw new Error("Tried to remove inexistent field " + field.getFullyQualifiedName());
		fields.remove(index);
		if (parent !== void 0 && fields.size() === 0) this.removeField(parent);
	};
	PDFAcroForm.prototype.normalizedEntries = function() {
		var Fields = this.Fields();
		if (!Fields) {
			Fields = this.dict.context.obj([]);
			this.dict.set(PDFName.of("Fields"), Fields);
		}
		return { Fields };
	};
	PDFAcroForm.fromDict = function(dict) {
		return new PDFAcroForm(dict);
	};
	PDFAcroForm.create = function(context) {
		return new PDFAcroForm(context.obj({ Fields: [] }));
	};
	return PDFAcroForm;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/structures/PDFCatalog.js
var PDFCatalog = function(_super) {
	__extends(PDFCatalog, _super);
	function PDFCatalog() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	PDFCatalog.prototype.Pages = function() {
		return this.lookup(PDFName.of("Pages"), PDFDict);
	};
	PDFCatalog.prototype.AcroForm = function() {
		return this.lookupMaybe(PDFName.of("AcroForm"), PDFDict);
	};
	PDFCatalog.prototype.getAcroForm = function() {
		var dict = this.AcroForm();
		if (!dict) return void 0;
		return PDFAcroForm.fromDict(dict);
	};
	PDFCatalog.prototype.getOrCreateAcroForm = function() {
		var acroForm = this.getAcroForm();
		if (!acroForm) {
			acroForm = PDFAcroForm.create(this.context);
			var acroFormRef = this.context.register(acroForm.dict);
			this.set(PDFName.of("AcroForm"), acroFormRef);
		}
		return acroForm;
	};
	PDFCatalog.prototype.ViewerPreferences = function() {
		return this.lookupMaybe(PDFName.of("ViewerPreferences"), PDFDict);
	};
	PDFCatalog.prototype.getViewerPreferences = function() {
		var dict = this.ViewerPreferences();
		if (!dict) return void 0;
		return ViewerPreferences.fromDict(dict);
	};
	PDFCatalog.prototype.getOrCreateViewerPreferences = function() {
		var viewerPrefs = this.getViewerPreferences();
		if (!viewerPrefs) {
			viewerPrefs = ViewerPreferences.create(this.context);
			var viewerPrefsRef = this.context.register(viewerPrefs.dict);
			this.set(PDFName.of("ViewerPreferences"), viewerPrefsRef);
		}
		return viewerPrefs;
	};
	/**
	* Inserts the given ref as a leaf node of this catalog's page tree at the
	* specified index (zero-based). Also increments the `Count` of each node in
	* the page tree hierarchy to accomodate the new page.
	*
	* Returns the ref of the PDFPageTree node into which `leafRef` was inserted.
	*/
	PDFCatalog.prototype.insertLeafNode = function(leafRef, index) {
		var pagesRef = this.get(PDFName.of("Pages"));
		return this.Pages().insertLeafNode(leafRef, index) || pagesRef;
	};
	PDFCatalog.prototype.removeLeafNode = function(index) {
		this.Pages().removeLeafNode(index);
	};
	PDFCatalog.withContextAndPages = function(context, pages) {
		var dict = /* @__PURE__ */ new Map();
		dict.set(PDFName.of("Type"), PDFName.of("Catalog"));
		dict.set(PDFName.of("Pages"), pages);
		return new PDFCatalog(dict, context);
	};
	PDFCatalog.fromMapWithContext = function(map, context) {
		return new PDFCatalog(map, context);
	};
	return PDFCatalog;
}(PDFDict);
//#endregion
//#region node_modules/pdf-lib/es/core/structures/PDFPageTree.js
var PDFPageTree = function(_super) {
	__extends(PDFPageTree, _super);
	function PDFPageTree() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	PDFPageTree.prototype.Parent = function() {
		return this.lookup(PDFName.of("Parent"));
	};
	PDFPageTree.prototype.Kids = function() {
		return this.lookup(PDFName.of("Kids"), PDFArray);
	};
	PDFPageTree.prototype.Count = function() {
		return this.lookup(PDFName.of("Count"), PDFNumber);
	};
	PDFPageTree.prototype.pushTreeNode = function(treeRef) {
		this.Kids().push(treeRef);
	};
	PDFPageTree.prototype.pushLeafNode = function(leafRef) {
		var Kids = this.Kids();
		this.insertLeafKid(Kids.size(), leafRef);
	};
	/**
	* Inserts the given ref as a leaf node of this page tree at the specified
	* index (zero-based). Also increments the `Count` of each page tree in the
	* hierarchy to accomodate the new page.
	*
	* Returns the ref of the PDFPageTree node into which `leafRef` was inserted,
	* or `undefined` if it was inserted into the root node (the PDFPageTree upon
	* which the method was first called).
	*/
	PDFPageTree.prototype.insertLeafNode = function(leafRef, targetIndex) {
		var Kids = this.Kids();
		var Count = this.Count().asNumber();
		if (targetIndex > Count) throw new InvalidTargetIndexError(targetIndex, Count);
		var leafsRemainingUntilTarget = targetIndex;
		for (var idx = 0, len = Kids.size(); idx < len; idx++) {
			if (leafsRemainingUntilTarget === 0) {
				this.insertLeafKid(idx, leafRef);
				return;
			}
			var kidRef = Kids.get(idx);
			var kid = this.context.lookup(kidRef);
			if (kid instanceof PDFPageTree) {
				if (kid.Count().asNumber() > leafsRemainingUntilTarget) return kid.insertLeafNode(leafRef, leafsRemainingUntilTarget) || kidRef;
				else leafsRemainingUntilTarget -= kid.Count().asNumber();
			}
			if (kid instanceof PDFPageLeaf) leafsRemainingUntilTarget -= 1;
		}
		if (leafsRemainingUntilTarget === 0) {
			this.insertLeafKid(Kids.size(), leafRef);
			return;
		}
		throw new CorruptPageTreeError(targetIndex, "insertLeafNode");
	};
	/**
	* Removes the leaf node at the specified index (zero-based) from this page
	* tree. Also decrements the `Count` of each page tree in the hierarchy to
	* account for the removed page.
	*
	* If `prune` is true, then intermediate tree nodes will be removed from the
	* tree if they contain 0 children after the leaf node is removed.
	*/
	PDFPageTree.prototype.removeLeafNode = function(targetIndex, prune) {
		if (prune === void 0) prune = true;
		var Kids = this.Kids();
		var Count = this.Count().asNumber();
		if (targetIndex >= Count) throw new InvalidTargetIndexError(targetIndex, Count);
		var leafsRemainingUntilTarget = targetIndex;
		for (var idx = 0, len = Kids.size(); idx < len; idx++) {
			var kidRef = Kids.get(idx);
			var kid = this.context.lookup(kidRef);
			if (kid instanceof PDFPageTree) {
				if (kid.Count().asNumber() > leafsRemainingUntilTarget) {
					kid.removeLeafNode(leafsRemainingUntilTarget, prune);
					if (prune && kid.Kids().size() === 0) Kids.remove(idx);
					return;
				} else leafsRemainingUntilTarget -= kid.Count().asNumber();
			}
			if (kid instanceof PDFPageLeaf) {
				if (leafsRemainingUntilTarget === 0) {
					this.removeKid(idx);
					return;
				} else leafsRemainingUntilTarget -= 1;
			}
		}
		throw new CorruptPageTreeError(targetIndex, "removeLeafNode");
	};
	PDFPageTree.prototype.ascend = function(visitor) {
		visitor(this);
		var Parent = this.Parent();
		if (Parent) Parent.ascend(visitor);
	};
	/** Performs a Post-Order traversal of this page tree */
	PDFPageTree.prototype.traverse = function(visitor) {
		var Kids = this.Kids();
		for (var idx = 0, len = Kids.size(); idx < len; idx++) {
			var kidRef = Kids.get(idx);
			var kid = this.context.lookup(kidRef);
			if (kid instanceof PDFPageTree) kid.traverse(visitor);
			visitor(kid, kidRef);
		}
	};
	PDFPageTree.prototype.insertLeafKid = function(kidIdx, leafRef) {
		var Kids = this.Kids();
		this.ascend(function(node) {
			var newCount = node.Count().asNumber() + 1;
			node.set(PDFName.of("Count"), PDFNumber.of(newCount));
		});
		Kids.insert(kidIdx, leafRef);
	};
	PDFPageTree.prototype.removeKid = function(kidIdx) {
		var Kids = this.Kids();
		if (Kids.lookup(kidIdx) instanceof PDFPageLeaf) this.ascend(function(node) {
			var newCount = node.Count().asNumber() - 1;
			node.set(PDFName.of("Count"), PDFNumber.of(newCount));
		});
		Kids.remove(kidIdx);
	};
	PDFPageTree.withContext = function(context, parent) {
		var dict = /* @__PURE__ */ new Map();
		dict.set(PDFName.of("Type"), PDFName.of("Pages"));
		dict.set(PDFName.of("Kids"), context.obj([]));
		dict.set(PDFName.of("Count"), context.obj(0));
		if (parent) dict.set(PDFName.of("Parent"), parent);
		return new PDFPageTree(dict, context);
	};
	PDFPageTree.fromMapWithContext = function(map, context) {
		return new PDFPageTree(map, context);
	};
	return PDFPageTree;
}(PDFDict);
//#endregion
//#region node_modules/pdf-lib/es/core/syntax/Numeric.js
var IsDigit = /* @__PURE__ */ new Uint8Array(256);
IsDigit[CharCodes_default.Zero] = 1;
IsDigit[CharCodes_default.One] = 1;
IsDigit[CharCodes_default.Two] = 1;
IsDigit[CharCodes_default.Three] = 1;
IsDigit[CharCodes_default.Four] = 1;
IsDigit[CharCodes_default.Five] = 1;
IsDigit[CharCodes_default.Six] = 1;
IsDigit[CharCodes_default.Seven] = 1;
IsDigit[CharCodes_default.Eight] = 1;
IsDigit[CharCodes_default.Nine] = 1;
var IsNumericPrefix = /* @__PURE__ */ new Uint8Array(256);
IsNumericPrefix[CharCodes_default.Period] = 1;
IsNumericPrefix[CharCodes_default.Plus] = 1;
IsNumericPrefix[CharCodes_default.Minus] = 1;
var IsNumeric = /* @__PURE__ */ new Uint8Array(256);
for (var idx = 0, len = 256; idx < len; idx++) IsNumeric[idx] = IsDigit[idx] || IsNumericPrefix[idx] ? 1 : 0;
//#endregion
//#region node_modules/pdf-lib/es/core/parser/BaseParser.js
var Newline$1 = CharCodes_default.Newline;
var CarriageReturn$1 = CharCodes_default.CarriageReturn;
var BaseParser = function() {
	function BaseParser(bytes, capNumbers) {
		if (capNumbers === void 0) capNumbers = false;
		this.bytes = bytes;
		this.capNumbers = capNumbers;
	}
	BaseParser.prototype.parseRawInt = function() {
		var value = "";
		while (!this.bytes.done()) {
			if (!IsDigit[this.bytes.peek()]) break;
			value += charFromCode(this.bytes.next());
		}
		var numberValue = Number(value);
		if (!value || !isFinite(numberValue)) throw new NumberParsingError(this.bytes.position(), value);
		return numberValue;
	};
	BaseParser.prototype.parseRawNumber = function() {
		var value = "";
		while (!this.bytes.done()) {
			var byte = this.bytes.peek();
			if (!IsNumeric[byte]) break;
			value += charFromCode(this.bytes.next());
			if (byte === CharCodes_default.Period) break;
		}
		while (!this.bytes.done()) {
			var byte = this.bytes.peek();
			if (!IsDigit[byte]) break;
			value += charFromCode(this.bytes.next());
		}
		var numberValue = Number(value);
		if (!value || !isFinite(numberValue)) throw new NumberParsingError(this.bytes.position(), value);
		if (numberValue > Number.MAX_SAFE_INTEGER) {
			if (this.capNumbers) {
				var msg = "Parsed number that is too large for some PDF readers: " + value + ", using Number.MAX_SAFE_INTEGER instead.";
				console.warn(msg);
				return Number.MAX_SAFE_INTEGER;
			} else {
				var msg = "Parsed number that is too large for some PDF readers: " + value + ", not capping.";
				console.warn(msg);
			}
		}
		return numberValue;
	};
	BaseParser.prototype.skipWhitespace = function() {
		while (!this.bytes.done() && IsWhitespace[this.bytes.peek()]) this.bytes.next();
	};
	BaseParser.prototype.skipLine = function() {
		while (!this.bytes.done()) {
			var byte = this.bytes.peek();
			if (byte === Newline$1 || byte === CarriageReturn$1) return;
			this.bytes.next();
		}
	};
	BaseParser.prototype.skipComment = function() {
		if (this.bytes.peek() !== CharCodes_default.Percent) return false;
		while (!this.bytes.done()) {
			var byte = this.bytes.peek();
			if (byte === Newline$1 || byte === CarriageReturn$1) return true;
			this.bytes.next();
		}
		return true;
	};
	BaseParser.prototype.skipWhitespaceAndComments = function() {
		this.skipWhitespace();
		while (this.skipComment()) this.skipWhitespace();
	};
	BaseParser.prototype.matchKeyword = function(keyword) {
		var initialOffset = this.bytes.offset();
		for (var idx = 0, len = keyword.length; idx < len; idx++) if (this.bytes.done() || this.bytes.next() !== keyword[idx]) {
			this.bytes.moveTo(initialOffset);
			return false;
		}
		return true;
	};
	return BaseParser;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/parser/ByteStream.js
var ByteStream = function() {
	function ByteStream(bytes) {
		this.idx = 0;
		this.line = 0;
		this.column = 0;
		this.bytes = bytes;
		this.length = this.bytes.length;
	}
	ByteStream.prototype.moveTo = function(offset) {
		this.idx = offset;
	};
	ByteStream.prototype.next = function() {
		var byte = this.bytes[this.idx++];
		if (byte === CharCodes_default.Newline) {
			this.line += 1;
			this.column = 0;
		} else this.column += 1;
		return byte;
	};
	ByteStream.prototype.assertNext = function(expected) {
		if (this.peek() !== expected) throw new NextByteAssertionError(this.position(), expected, this.peek());
		return this.next();
	};
	ByteStream.prototype.peek = function() {
		return this.bytes[this.idx];
	};
	ByteStream.prototype.peekAhead = function(steps) {
		return this.bytes[this.idx + steps];
	};
	ByteStream.prototype.peekAt = function(offset) {
		return this.bytes[offset];
	};
	ByteStream.prototype.done = function() {
		return this.idx >= this.length;
	};
	ByteStream.prototype.offset = function() {
		return this.idx;
	};
	ByteStream.prototype.slice = function(start, end) {
		return this.bytes.slice(start, end);
	};
	ByteStream.prototype.position = function() {
		return {
			line: this.line,
			column: this.column,
			offset: this.idx
		};
	};
	ByteStream.of = function(bytes) {
		return new ByteStream(bytes);
	};
	ByteStream.fromPDFRawStream = function(rawStream) {
		return ByteStream.of(decodePDFRawStream(rawStream).decode());
	};
	return ByteStream;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/syntax/Keywords.js
var Space = CharCodes_default.Space;
var CarriageReturn = CharCodes_default.CarriageReturn;
var Newline = CharCodes_default.Newline;
var stream = [
	CharCodes_default.s,
	CharCodes_default.t,
	CharCodes_default.r,
	CharCodes_default.e,
	CharCodes_default.a,
	CharCodes_default.m
];
var endstream = [
	CharCodes_default.e,
	CharCodes_default.n,
	CharCodes_default.d,
	CharCodes_default.s,
	CharCodes_default.t,
	CharCodes_default.r,
	CharCodes_default.e,
	CharCodes_default.a,
	CharCodes_default.m
];
var Keywords = {
	header: [
		CharCodes_default.Percent,
		CharCodes_default.P,
		CharCodes_default.D,
		CharCodes_default.F,
		CharCodes_default.Dash
	],
	eof: [
		CharCodes_default.Percent,
		CharCodes_default.Percent,
		CharCodes_default.E,
		CharCodes_default.O,
		CharCodes_default.F
	],
	obj: [
		CharCodes_default.o,
		CharCodes_default.b,
		CharCodes_default.j
	],
	endobj: [
		CharCodes_default.e,
		CharCodes_default.n,
		CharCodes_default.d,
		CharCodes_default.o,
		CharCodes_default.b,
		CharCodes_default.j
	],
	xref: [
		CharCodes_default.x,
		CharCodes_default.r,
		CharCodes_default.e,
		CharCodes_default.f
	],
	trailer: [
		CharCodes_default.t,
		CharCodes_default.r,
		CharCodes_default.a,
		CharCodes_default.i,
		CharCodes_default.l,
		CharCodes_default.e,
		CharCodes_default.r
	],
	startxref: [
		CharCodes_default.s,
		CharCodes_default.t,
		CharCodes_default.a,
		CharCodes_default.r,
		CharCodes_default.t,
		CharCodes_default.x,
		CharCodes_default.r,
		CharCodes_default.e,
		CharCodes_default.f
	],
	true: [
		CharCodes_default.t,
		CharCodes_default.r,
		CharCodes_default.u,
		CharCodes_default.e
	],
	false: [
		CharCodes_default.f,
		CharCodes_default.a,
		CharCodes_default.l,
		CharCodes_default.s,
		CharCodes_default.e
	],
	null: [
		CharCodes_default.n,
		CharCodes_default.u,
		CharCodes_default.l,
		CharCodes_default.l
	],
	stream,
	streamEOF1: __spreadArrays(stream, [
		Space,
		CarriageReturn,
		Newline
	]),
	streamEOF2: __spreadArrays(stream, [CarriageReturn, Newline]),
	streamEOF3: __spreadArrays(stream, [CarriageReturn]),
	streamEOF4: __spreadArrays(stream, [Newline]),
	endstream,
	EOF1endstream: __spreadArrays([CarriageReturn, Newline], endstream),
	EOF2endstream: __spreadArrays([CarriageReturn], endstream),
	EOF3endstream: __spreadArrays([Newline], endstream)
};
//#endregion
//#region node_modules/pdf-lib/es/core/parser/PDFObjectParser.js
var PDFObjectParser = function(_super) {
	__extends(PDFObjectParser, _super);
	function PDFObjectParser(byteStream, context, capNumbers) {
		if (capNumbers === void 0) capNumbers = false;
		var _this = _super.call(this, byteStream, capNumbers) || this;
		_this.context = context;
		return _this;
	}
	PDFObjectParser.prototype.parseObject = function() {
		this.skipWhitespaceAndComments();
		if (this.matchKeyword(Keywords.true)) return PDFBool.True;
		if (this.matchKeyword(Keywords.false)) return PDFBool.False;
		if (this.matchKeyword(Keywords.null)) return PDFNull_default;
		var byte = this.bytes.peek();
		if (byte === CharCodes_default.LessThan && this.bytes.peekAhead(1) === CharCodes_default.LessThan) return this.parseDictOrStream();
		if (byte === CharCodes_default.LessThan) return this.parseHexString();
		if (byte === CharCodes_default.LeftParen) return this.parseString();
		if (byte === CharCodes_default.ForwardSlash) return this.parseName();
		if (byte === CharCodes_default.LeftSquareBracket) return this.parseArray();
		if (IsNumeric[byte]) return this.parseNumberOrRef();
		throw new PDFObjectParsingError(this.bytes.position(), byte);
	};
	PDFObjectParser.prototype.parseNumberOrRef = function() {
		var firstNum = this.parseRawNumber();
		this.skipWhitespaceAndComments();
		var lookaheadStart = this.bytes.offset();
		if (IsDigit[this.bytes.peek()]) {
			var secondNum = this.parseRawNumber();
			this.skipWhitespaceAndComments();
			if (this.bytes.peek() === CharCodes_default.R) {
				this.bytes.assertNext(CharCodes_default.R);
				return PDFRef.of(firstNum, secondNum);
			}
		}
		this.bytes.moveTo(lookaheadStart);
		return PDFNumber.of(firstNum);
	};
	PDFObjectParser.prototype.parseHexString = function() {
		var value = "";
		this.bytes.assertNext(CharCodes_default.LessThan);
		while (!this.bytes.done() && this.bytes.peek() !== CharCodes_default.GreaterThan) value += charFromCode(this.bytes.next());
		this.bytes.assertNext(CharCodes_default.GreaterThan);
		return PDFHexString.of(value);
	};
	PDFObjectParser.prototype.parseString = function() {
		var nestingLvl = 0;
		var isEscaped = false;
		var value = "";
		while (!this.bytes.done()) {
			var byte = this.bytes.next();
			value += charFromCode(byte);
			if (!isEscaped) {
				if (byte === CharCodes_default.LeftParen) nestingLvl += 1;
				if (byte === CharCodes_default.RightParen) nestingLvl -= 1;
			}
			if (byte === CharCodes_default.BackSlash) isEscaped = !isEscaped;
			else if (isEscaped) isEscaped = false;
			if (nestingLvl === 0) return PDFString.of(value.substring(1, value.length - 1));
		}
		throw new UnbalancedParenthesisError(this.bytes.position());
	};
	PDFObjectParser.prototype.parseName = function() {
		this.bytes.assertNext(CharCodes_default.ForwardSlash);
		var name = "";
		while (!this.bytes.done()) {
			var byte = this.bytes.peek();
			if (IsWhitespace[byte] || IsDelimiter[byte]) break;
			name += charFromCode(byte);
			this.bytes.next();
		}
		return PDFName.of(name);
	};
	PDFObjectParser.prototype.parseArray = function() {
		this.bytes.assertNext(CharCodes_default.LeftSquareBracket);
		this.skipWhitespaceAndComments();
		var pdfArray = PDFArray.withContext(this.context);
		while (this.bytes.peek() !== CharCodes_default.RightSquareBracket) {
			var element = this.parseObject();
			pdfArray.push(element);
			this.skipWhitespaceAndComments();
		}
		this.bytes.assertNext(CharCodes_default.RightSquareBracket);
		return pdfArray;
	};
	PDFObjectParser.prototype.parseDict = function() {
		this.bytes.assertNext(CharCodes_default.LessThan);
		this.bytes.assertNext(CharCodes_default.LessThan);
		this.skipWhitespaceAndComments();
		var dict = /* @__PURE__ */ new Map();
		while (!this.bytes.done() && this.bytes.peek() !== CharCodes_default.GreaterThan && this.bytes.peekAhead(1) !== CharCodes_default.GreaterThan) {
			var key = this.parseName();
			var value = this.parseObject();
			dict.set(key, value);
			this.skipWhitespaceAndComments();
		}
		this.skipWhitespaceAndComments();
		this.bytes.assertNext(CharCodes_default.GreaterThan);
		this.bytes.assertNext(CharCodes_default.GreaterThan);
		var Type = dict.get(PDFName.of("Type"));
		if (Type === PDFName.of("Catalog")) return PDFCatalog.fromMapWithContext(dict, this.context);
		else if (Type === PDFName.of("Pages")) return PDFPageTree.fromMapWithContext(dict, this.context);
		else if (Type === PDFName.of("Page")) return PDFPageLeaf.fromMapWithContext(dict, this.context);
		else return PDFDict.fromMapWithContext(dict, this.context);
	};
	PDFObjectParser.prototype.parseDictOrStream = function() {
		var startPos = this.bytes.position();
		var dict = this.parseDict();
		this.skipWhitespaceAndComments();
		if (!this.matchKeyword(Keywords.streamEOF1) && !this.matchKeyword(Keywords.streamEOF2) && !this.matchKeyword(Keywords.streamEOF3) && !this.matchKeyword(Keywords.streamEOF4) && !this.matchKeyword(Keywords.stream)) return dict;
		var start = this.bytes.offset();
		var end;
		var Length = dict.get(PDFName.of("Length"));
		if (Length instanceof PDFNumber) {
			end = start + Length.asNumber();
			this.bytes.moveTo(end);
			this.skipWhitespaceAndComments();
			if (!this.matchKeyword(Keywords.endstream)) {
				this.bytes.moveTo(start);
				end = this.findEndOfStreamFallback(startPos);
			}
		} else end = this.findEndOfStreamFallback(startPos);
		var contents = this.bytes.slice(start, end);
		return PDFRawStream.of(dict, contents);
	};
	PDFObjectParser.prototype.findEndOfStreamFallback = function(startPos) {
		var nestingLvl = 1;
		var end = this.bytes.offset();
		while (!this.bytes.done()) {
			end = this.bytes.offset();
			if (this.matchKeyword(Keywords.stream)) nestingLvl += 1;
			else if (this.matchKeyword(Keywords.EOF1endstream) || this.matchKeyword(Keywords.EOF2endstream) || this.matchKeyword(Keywords.EOF3endstream) || this.matchKeyword(Keywords.endstream)) nestingLvl -= 1;
			else this.bytes.next();
			if (nestingLvl === 0) break;
		}
		if (nestingLvl !== 0) throw new PDFStreamParsingError(startPos);
		return end;
	};
	PDFObjectParser.forBytes = function(bytes, context, capNumbers) {
		return new PDFObjectParser(ByteStream.of(bytes), context, capNumbers);
	};
	PDFObjectParser.forByteStream = function(byteStream, context, capNumbers) {
		if (capNumbers === void 0) capNumbers = false;
		return new PDFObjectParser(byteStream, context, capNumbers);
	};
	return PDFObjectParser;
}(BaseParser);
//#endregion
//#region node_modules/pdf-lib/es/core/parser/PDFObjectStreamParser.js
var PDFObjectStreamParser = function(_super) {
	__extends(PDFObjectStreamParser, _super);
	function PDFObjectStreamParser(rawStream, shouldWaitForTick) {
		var _this = _super.call(this, ByteStream.fromPDFRawStream(rawStream), rawStream.dict.context) || this;
		var dict = rawStream.dict;
		_this.alreadyParsed = false;
		_this.shouldWaitForTick = shouldWaitForTick || (function() {
			return false;
		});
		_this.firstOffset = dict.lookup(PDFName.of("First"), PDFNumber).asNumber();
		_this.objectCount = dict.lookup(PDFName.of("N"), PDFNumber).asNumber();
		return _this;
	}
	PDFObjectStreamParser.prototype.parseIntoContext = function() {
		return __awaiter(this, void 0, void 0, function() {
			var offsetsAndObjectNumbers, idx, len, _a, objectNumber, offset, object, ref;
			return __generator(this, function(_b) {
				switch (_b.label) {
					case 0:
						if (this.alreadyParsed) throw new ReparseError("PDFObjectStreamParser", "parseIntoContext");
						this.alreadyParsed = true;
						offsetsAndObjectNumbers = this.parseOffsetsAndObjectNumbers();
						idx = 0, len = offsetsAndObjectNumbers.length;
						_b.label = 1;
					case 1:
						if (!(idx < len)) return [3, 4];
						_a = offsetsAndObjectNumbers[idx], objectNumber = _a.objectNumber, offset = _a.offset;
						this.bytes.moveTo(this.firstOffset + offset);
						object = this.parseObject();
						ref = PDFRef.of(objectNumber, 0);
						this.context.assign(ref, object);
						if (!this.shouldWaitForTick()) return [3, 3];
						return [4, waitForTick()];
					case 2:
						_b.sent();
						_b.label = 3;
					case 3:
						idx++;
						return [3, 1];
					case 4: return [2];
				}
			});
		});
	};
	PDFObjectStreamParser.prototype.parseOffsetsAndObjectNumbers = function() {
		var offsetsAndObjectNumbers = [];
		for (var idx = 0, len = this.objectCount; idx < len; idx++) {
			this.skipWhitespaceAndComments();
			var objectNumber = this.parseRawInt();
			this.skipWhitespaceAndComments();
			var offset = this.parseRawInt();
			offsetsAndObjectNumbers.push({
				objectNumber,
				offset
			});
		}
		return offsetsAndObjectNumbers;
	};
	PDFObjectStreamParser.forStream = function(rawStream, shouldWaitForTick) {
		return new PDFObjectStreamParser(rawStream, shouldWaitForTick);
	};
	return PDFObjectStreamParser;
}(PDFObjectParser);
//#endregion
//#region node_modules/pdf-lib/es/core/parser/PDFXRefStreamParser.js
var PDFXRefStreamParser = function() {
	function PDFXRefStreamParser(rawStream) {
		this.alreadyParsed = false;
		this.dict = rawStream.dict;
		this.bytes = ByteStream.fromPDFRawStream(rawStream);
		this.context = this.dict.context;
		var Size = this.dict.lookup(PDFName.of("Size"), PDFNumber);
		var Index = this.dict.lookup(PDFName.of("Index"));
		if (Index instanceof PDFArray) {
			this.subsections = [];
			for (var idx = 0, len = Index.size(); idx < len; idx += 2) {
				var firstObjectNumber = Index.lookup(idx + 0, PDFNumber).asNumber();
				var length_1 = Index.lookup(idx + 1, PDFNumber).asNumber();
				this.subsections.push({
					firstObjectNumber,
					length: length_1
				});
			}
		} else this.subsections = [{
			firstObjectNumber: 0,
			length: Size.asNumber()
		}];
		var W = this.dict.lookup(PDFName.of("W"), PDFArray);
		this.byteWidths = [
			-1,
			-1,
			-1
		];
		for (var idx = 0, len = W.size(); idx < len; idx++) this.byteWidths[idx] = W.lookup(idx, PDFNumber).asNumber();
	}
	PDFXRefStreamParser.prototype.parseIntoContext = function() {
		if (this.alreadyParsed) throw new ReparseError("PDFXRefStreamParser", "parseIntoContext");
		this.alreadyParsed = true;
		this.context.trailerInfo = {
			Root: this.dict.get(PDFName.of("Root")),
			Encrypt: this.dict.get(PDFName.of("Encrypt")),
			Info: this.dict.get(PDFName.of("Info")),
			ID: this.dict.get(PDFName.of("ID"))
		};
		return this.parseEntries();
	};
	PDFXRefStreamParser.prototype.parseEntries = function() {
		var entries = [];
		var _a = this.byteWidths, typeFieldWidth = _a[0], offsetFieldWidth = _a[1], genFieldWidth = _a[2];
		for (var subsectionIdx = 0, subsectionLen = this.subsections.length; subsectionIdx < subsectionLen; subsectionIdx++) {
			var _b = this.subsections[subsectionIdx], firstObjectNumber = _b.firstObjectNumber, length_2 = _b.length;
			for (var objIdx = 0; objIdx < length_2; objIdx++) {
				var type = 0;
				for (var idx = 0, len = typeFieldWidth; idx < len; idx++) type = type << 8 | this.bytes.next();
				var offset = 0;
				for (var idx = 0, len = offsetFieldWidth; idx < len; idx++) offset = offset << 8 | this.bytes.next();
				var generationNumber = 0;
				for (var idx = 0, len = genFieldWidth; idx < len; idx++) generationNumber = generationNumber << 8 | this.bytes.next();
				if (typeFieldWidth === 0) type = 1;
				var objectNumber = firstObjectNumber + objIdx;
				var entry = {
					ref: PDFRef.of(objectNumber, generationNumber),
					offset,
					deleted: type === 0,
					inObjectStream: type === 2
				};
				entries.push(entry);
			}
		}
		return entries;
	};
	PDFXRefStreamParser.forStream = function(rawStream) {
		return new PDFXRefStreamParser(rawStream);
	};
	return PDFXRefStreamParser;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/parser/PDFParser.js
var PDFParser = function(_super) {
	__extends(PDFParser, _super);
	function PDFParser(pdfBytes, objectsPerTick, throwOnInvalidObject, capNumbers) {
		if (objectsPerTick === void 0) objectsPerTick = Infinity;
		if (throwOnInvalidObject === void 0) throwOnInvalidObject = false;
		if (capNumbers === void 0) capNumbers = false;
		var _this = _super.call(this, ByteStream.of(pdfBytes), PDFContext.create(), capNumbers) || this;
		_this.alreadyParsed = false;
		_this.parsedObjects = 0;
		_this.shouldWaitForTick = function() {
			_this.parsedObjects += 1;
			return _this.parsedObjects % _this.objectsPerTick === 0;
		};
		_this.objectsPerTick = objectsPerTick;
		_this.throwOnInvalidObject = throwOnInvalidObject;
		return _this;
	}
	PDFParser.prototype.parseDocument = function() {
		return __awaiter(this, void 0, void 0, function() {
			var prevOffset, offset;
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						if (this.alreadyParsed) throw new ReparseError("PDFParser", "parseDocument");
						this.alreadyParsed = true;
						this.context.header = this.parseHeader();
						_a.label = 1;
					case 1:
						if (!!this.bytes.done()) return [3, 3];
						return [4, this.parseDocumentSection()];
					case 2:
						_a.sent();
						offset = this.bytes.offset();
						if (offset === prevOffset) throw new StalledParserError(this.bytes.position());
						prevOffset = offset;
						return [3, 1];
					case 3:
						this.maybeRecoverRoot();
						if (this.context.lookup(PDFRef.of(0))) {
							console.warn("Removing parsed object: 0 0 R");
							this.context.delete(PDFRef.of(0));
						}
						return [2, this.context];
				}
			});
		});
	};
	PDFParser.prototype.maybeRecoverRoot = function() {
		var isValidCatalog = function(obj) {
			return obj instanceof PDFDict && obj.lookup(PDFName.of("Type")) === PDFName.of("Catalog");
		};
		if (!isValidCatalog(this.context.lookup(this.context.trailerInfo.Root))) {
			var indirectObjects = this.context.enumerateIndirectObjects();
			for (var idx = 0, len = indirectObjects.length; idx < len; idx++) {
				var _a = indirectObjects[idx], ref = _a[0], object = _a[1];
				if (isValidCatalog(object)) this.context.trailerInfo.Root = ref;
			}
		}
	};
	PDFParser.prototype.parseHeader = function() {
		while (!this.bytes.done()) {
			if (this.matchKeyword(Keywords.header)) {
				var major = this.parseRawInt();
				this.bytes.assertNext(CharCodes_default.Period);
				var minor = this.parseRawInt();
				var header = PDFHeader.forVersion(major, minor);
				this.skipBinaryHeaderComment();
				return header;
			}
			this.bytes.next();
		}
		throw new MissingPDFHeaderError(this.bytes.position());
	};
	PDFParser.prototype.parseIndirectObjectHeader = function() {
		this.skipWhitespaceAndComments();
		var objectNumber = this.parseRawInt();
		this.skipWhitespaceAndComments();
		var generationNumber = this.parseRawInt();
		this.skipWhitespaceAndComments();
		if (!this.matchKeyword(Keywords.obj)) throw new MissingKeywordError(this.bytes.position(), Keywords.obj);
		return PDFRef.of(objectNumber, generationNumber);
	};
	PDFParser.prototype.matchIndirectObjectHeader = function() {
		var initialOffset = this.bytes.offset();
		try {
			this.parseIndirectObjectHeader();
			return true;
		} catch (e) {
			this.bytes.moveTo(initialOffset);
			return false;
		}
	};
	PDFParser.prototype.parseIndirectObject = function() {
		return __awaiter(this, void 0, void 0, function() {
			var ref, object;
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						ref = this.parseIndirectObjectHeader();
						this.skipWhitespaceAndComments();
						object = this.parseObject();
						this.skipWhitespaceAndComments();
						this.matchKeyword(Keywords.endobj);
						if (!(object instanceof PDFRawStream && object.dict.lookup(PDFName.of("Type")) === PDFName.of("ObjStm"))) return [3, 2];
						return [4, PDFObjectStreamParser.forStream(object, this.shouldWaitForTick).parseIntoContext()];
					case 1:
						_a.sent();
						return [3, 3];
					case 2:
						if (object instanceof PDFRawStream && object.dict.lookup(PDFName.of("Type")) === PDFName.of("XRef")) PDFXRefStreamParser.forStream(object).parseIntoContext();
						else this.context.assign(ref, object);
						_a.label = 3;
					case 3: return [2, ref];
				}
			});
		});
	};
	PDFParser.prototype.tryToParseInvalidIndirectObject = function() {
		var startPos = this.bytes.position();
		var msg = "Trying to parse invalid object: " + JSON.stringify(startPos) + ")";
		if (this.throwOnInvalidObject) throw new Error(msg);
		console.warn(msg);
		var ref = this.parseIndirectObjectHeader();
		console.warn("Invalid object ref: " + ref);
		this.skipWhitespaceAndComments();
		var start = this.bytes.offset();
		var failed = true;
		while (!this.bytes.done()) {
			if (this.matchKeyword(Keywords.endobj)) failed = false;
			if (!failed) break;
			this.bytes.next();
		}
		if (failed) throw new PDFInvalidObjectParsingError(startPos);
		var end = this.bytes.offset() - Keywords.endobj.length;
		var object = PDFInvalidObject.of(this.bytes.slice(start, end));
		this.context.assign(ref, object);
		return ref;
	};
	PDFParser.prototype.parseIndirectObjects = function() {
		return __awaiter(this, void 0, void 0, function() {
			var initialOffset;
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						this.skipWhitespaceAndComments();
						_a.label = 1;
					case 1:
						if (!(!this.bytes.done() && IsDigit[this.bytes.peek()])) return [3, 8];
						initialOffset = this.bytes.offset();
						_a.label = 2;
					case 2:
						_a.trys.push([
							2,
							4,
							,
							5
						]);
						return [4, this.parseIndirectObject()];
					case 3:
						_a.sent();
						return [3, 5];
					case 4:
						_a.sent();
						this.bytes.moveTo(initialOffset);
						this.tryToParseInvalidIndirectObject();
						return [3, 5];
					case 5:
						this.skipWhitespaceAndComments();
						this.skipJibberish();
						if (!this.shouldWaitForTick()) return [3, 7];
						return [4, waitForTick()];
					case 6:
						_a.sent();
						_a.label = 7;
					case 7: return [3, 1];
					case 8: return [2];
				}
			});
		});
	};
	PDFParser.prototype.maybeParseCrossRefSection = function() {
		this.skipWhitespaceAndComments();
		if (!this.matchKeyword(Keywords.xref)) return;
		this.skipWhitespaceAndComments();
		var objectNumber = -1;
		var xref = PDFCrossRefSection.createEmpty();
		while (!this.bytes.done() && IsDigit[this.bytes.peek()]) {
			var firstInt = this.parseRawInt();
			this.skipWhitespaceAndComments();
			var secondInt = this.parseRawInt();
			this.skipWhitespaceAndComments();
			var byte = this.bytes.peek();
			if (byte === CharCodes_default.n || byte === CharCodes_default.f) {
				var ref = PDFRef.of(objectNumber, secondInt);
				if (this.bytes.next() === CharCodes_default.n) xref.addEntry(ref, firstInt);
				else xref.addDeletedEntry(ref, firstInt);
				objectNumber += 1;
			} else objectNumber = firstInt;
			this.skipWhitespaceAndComments();
		}
		return xref;
	};
	PDFParser.prototype.maybeParseTrailerDict = function() {
		this.skipWhitespaceAndComments();
		if (!this.matchKeyword(Keywords.trailer)) return;
		this.skipWhitespaceAndComments();
		var dict = this.parseDict();
		var context = this.context;
		context.trailerInfo = {
			Root: dict.get(PDFName.of("Root")) || context.trailerInfo.Root,
			Encrypt: dict.get(PDFName.of("Encrypt")) || context.trailerInfo.Encrypt,
			Info: dict.get(PDFName.of("Info")) || context.trailerInfo.Info,
			ID: dict.get(PDFName.of("ID")) || context.trailerInfo.ID
		};
	};
	PDFParser.prototype.maybeParseTrailer = function() {
		this.skipWhitespaceAndComments();
		if (!this.matchKeyword(Keywords.startxref)) return;
		this.skipWhitespaceAndComments();
		var offset = this.parseRawInt();
		this.skipWhitespace();
		this.matchKeyword(Keywords.eof);
		this.skipWhitespaceAndComments();
		this.matchKeyword(Keywords.eof);
		this.skipWhitespaceAndComments();
		return PDFTrailer.forLastCrossRefSectionOffset(offset);
	};
	PDFParser.prototype.parseDocumentSection = function() {
		return __awaiter(this, void 0, void 0, function() {
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0: return [4, this.parseIndirectObjects()];
					case 1:
						_a.sent();
						this.maybeParseCrossRefSection();
						this.maybeParseTrailerDict();
						this.maybeParseTrailer();
						this.skipJibberish();
						return [2];
				}
			});
		});
	};
	/**
	* This operation is not necessary for valid PDF files. But some invalid PDFs
	* contain jibberish in between indirect objects. This method is designed to
	* skip past that jibberish, should it exist, until it reaches the next
	* indirect object header, an xref table section, or the file trailer.
	*/
	PDFParser.prototype.skipJibberish = function() {
		this.skipWhitespaceAndComments();
		while (!this.bytes.done()) {
			var initialOffset = this.bytes.offset();
			var byte = this.bytes.peek();
			if (byte >= CharCodes_default.Space && byte <= CharCodes_default.Tilde) {
				if (this.matchKeyword(Keywords.xref) || this.matchKeyword(Keywords.trailer) || this.matchKeyword(Keywords.startxref) || this.matchIndirectObjectHeader()) {
					this.bytes.moveTo(initialOffset);
					break;
				}
			}
			this.bytes.next();
		}
	};
	/**
	* Skips the binary comment following a PDF header. The specification
	* defines this binary comment (section 7.5.2 File Header) as a sequence of 4
	* or more bytes that are 128 or greater, and which are preceded by a "%".
	*
	* This would imply that to strip out this binary comment, we could check for
	* a sequence of bytes starting with "%", and remove all subsequent bytes that
	* are 128 or greater. This works for many documents that properly comply with
	* the spec. But in the wild, there are PDFs that omit the leading "%", and
	* include bytes that are less than 128 (e.g. 0 or 1). So in order to parse
	* these headers correctly, we just throw out all bytes leading up to the
	* first indirect object header.
	*/
	PDFParser.prototype.skipBinaryHeaderComment = function() {
		this.skipWhitespaceAndComments();
		try {
			var initialOffset = this.bytes.offset();
			this.parseIndirectObjectHeader();
			this.bytes.moveTo(initialOffset);
		} catch (e) {
			this.bytes.next();
			this.skipWhitespaceAndComments();
		}
	};
	PDFParser.forBytesWithOptions = function(pdfBytes, objectsPerTick, throwOnInvalidObject, capNumbers) {
		return new PDFParser(pdfBytes, objectsPerTick, throwOnInvalidObject, capNumbers);
	};
	return PDFParser;
}(PDFObjectParser);
//#endregion
//#region node_modules/pdf-lib/es/core/annotation/flags.js
var flag = function(bitIndex) {
	return 1 << bitIndex;
};
/** From PDF spec table 165 */
var AnnotationFlags;
(function(AnnotationFlags) {
	/**
	* If set, do not display the annotation if it does not belong to one of the
	* standard annotation types and no annotation handler is available. If clear,
	* display such an unknown annotation using an appearance stream specified by
	* its appearance dictionary, if any.
	*/
	AnnotationFlags[AnnotationFlags["Invisible"] = flag(0)] = "Invisible";
	/**
	* If set, do not display or print the annotation or allow it to interact with
	* the user, regardless of its annotation type or whether an annotation
	* handler is available.
	*
	* In cases where screen space is limited, the ability to hide and show
	* annotations selectively can be used in combination with appearance streams
	* to display auxiliary pop-up information similar in function to online help
	* systems.
	*/
	AnnotationFlags[AnnotationFlags["Hidden"] = flag(1)] = "Hidden";
	/**
	* If set, print the annotation when the page is printed. If clear, never
	* print the annotation, regardless of whether it is displayed on the screen.
	*
	* This can be useful for annotations representing interactive pushbuttons,
	* which would serve no meaningful purpose on the printed page.
	*/
	AnnotationFlags[AnnotationFlags["Print"] = flag(2)] = "Print";
	/**
	* If set, do not scale the annotation’s appearance to match the magnification
	* of the page. The location of the annotation on the page (defined by the
	* upper-left corner of its annotation rectangle) shall remain fixed,
	* regardless of the page magnification.
	*/
	AnnotationFlags[AnnotationFlags["NoZoom"] = flag(3)] = "NoZoom";
	/**
	* If set, do not rotate the annotation’s appearance to match the rotation of
	* the page. The upper-left corner of the annotation rectangle shall remain in
	* a fixed location on the page, regardless of the page rotation.
	*/
	AnnotationFlags[AnnotationFlags["NoRotate"] = flag(4)] = "NoRotate";
	/**
	* If set, do not display the annotation on the screen or allow it to interact
	* with the user. The annotation may be printed (depending on the setting of
	* the Print flag) but should be considered hidden for purposes of on-screen
	* display and user interaction.
	*/
	AnnotationFlags[AnnotationFlags["NoView"] = flag(5)] = "NoView";
	/**
	* If set, do not allow the annotation to interact with the user. The
	* annotation may be displayed or printed (depending on the settings of the
	* NoView and Print flags) but should not respond to mouse clicks or change
	* its appearance in response to mouse motions.
	*
	* This flag shall be ignored for widget annotations; its function is
	* subsumed by the ReadOnly flag of the associated form field.
	*/
	AnnotationFlags[AnnotationFlags["ReadOnly"] = flag(6)] = "ReadOnly";
	/**
	* If set, do not allow the annotation to be deleted or its properties
	* (including position and size) to be modified by the user. However, this
	* flag does not restrict changes to the annotation’s contents, such as the
	* value of a form field.
	*/
	AnnotationFlags[AnnotationFlags["Locked"] = flag(7)] = "Locked";
	/**
	* If set, invert the interpretation of the NoView flag for certain events.
	*
	* A typical use is to have an annotation that appears only when a mouse
	* cursor is held over it.
	*/
	AnnotationFlags[AnnotationFlags["ToggleNoView"] = flag(8)] = "ToggleNoView";
	/**
	* If set, do not allow the contents of the annotation to be modified by the
	* user. This flag does not restrict deletion of the annotation or changes to
	* other annotation properties, such as position and size.
	*/
	AnnotationFlags[AnnotationFlags["LockedContents"] = flag(9)] = "LockedContents";
})(AnnotationFlags || (AnnotationFlags = {}));
//#endregion
//#region node_modules/pdf-lib/es/api/objects.js
var asPDFName = function(name) {
	return name instanceof PDFName ? name : PDFName.of(name);
};
var asPDFNumber = function(num) {
	return num instanceof PDFNumber ? num : PDFNumber.of(num);
};
var asNumber = function(num) {
	return num instanceof PDFNumber ? num.asNumber() : num;
};
//#endregion
//#region node_modules/pdf-lib/es/api/rotations.js
var RotationTypes;
(function(RotationTypes) {
	RotationTypes["Degrees"] = "degrees";
	RotationTypes["Radians"] = "radians";
})(RotationTypes || (RotationTypes = {}));
var degrees = function(degreeAngle) {
	assertIs(degreeAngle, "degreeAngle", ["number"]);
	return {
		type: RotationTypes.Degrees,
		angle: degreeAngle
	};
};
var Radians = RotationTypes.Radians;
var Degrees = RotationTypes.Degrees;
var degreesToRadians = function(degree) {
	return degree * Math.PI / 180;
};
var radiansToDegrees = function(radian) {
	return radian * 180 / Math.PI;
};
var toRadians = function(rotation) {
	return rotation.type === Radians ? rotation.angle : rotation.type === Degrees ? degreesToRadians(rotation.angle) : error("Invalid rotation: " + JSON.stringify(rotation));
};
var toDegrees = function(rotation) {
	return rotation.type === Radians ? radiansToDegrees(rotation.angle) : rotation.type === Degrees ? rotation.angle : error("Invalid rotation: " + JSON.stringify(rotation));
};
var reduceRotation = function(degreeAngle) {
	if (degreeAngle === void 0) degreeAngle = 0;
	var quadrants = degreeAngle / 90 % 4;
	if (quadrants === 0) return 0;
	if (quadrants === 1) return 90;
	if (quadrants === 2) return 180;
	if (quadrants === 3) return 270;
	return 0;
};
var adjustDimsForRotation = function(dims, degreeAngle) {
	if (degreeAngle === void 0) degreeAngle = 0;
	var rotation = reduceRotation(degreeAngle);
	return rotation === 90 || rotation === 270 ? {
		width: dims.height,
		height: dims.width
	} : {
		width: dims.width,
		height: dims.height
	};
};
var rotateRectangle = function(rectangle, borderWidth, degreeAngle) {
	if (borderWidth === void 0) borderWidth = 0;
	if (degreeAngle === void 0) degreeAngle = 0;
	var x = rectangle.x, y = rectangle.y, w = rectangle.width, h = rectangle.height;
	var r = reduceRotation(degreeAngle);
	var b = borderWidth / 2;
	if (r === 0) return {
		x: x - b,
		y: y - b,
		width: w,
		height: h
	};
	else if (r === 90) return {
		x: x - h + b,
		y: y - b,
		width: h,
		height: w
	};
	else if (r === 180) return {
		x: x - w + b,
		y: y - h + b,
		width: w,
		height: h
	};
	else if (r === 270) return {
		x: x - b,
		y: y - w + b,
		width: h,
		height: w
	};
	else return {
		x: x - b,
		y: y - b,
		width: w,
		height: h
	};
};
//#endregion
//#region node_modules/pdf-lib/es/api/operators.js
var clip = function() {
	return PDFOperator.of(PDFOperatorNames_default.ClipNonZero);
};
var cos = Math.cos;
var sin = Math.sin;
var tan = Math.tan;
var concatTransformationMatrix = function(a, b, c, d, e, f) {
	return PDFOperator.of(PDFOperatorNames_default.ConcatTransformationMatrix, [
		asPDFNumber(a),
		asPDFNumber(b),
		asPDFNumber(c),
		asPDFNumber(d),
		asPDFNumber(e),
		asPDFNumber(f)
	]);
};
var translate = function(xPos, yPos) {
	return concatTransformationMatrix(1, 0, 0, 1, xPos, yPos);
};
var scale = function(xPos, yPos) {
	return concatTransformationMatrix(xPos, 0, 0, yPos, 0, 0);
};
var rotateRadians = function(angle) {
	return concatTransformationMatrix(cos(asNumber(angle)), sin(asNumber(angle)), -sin(asNumber(angle)), cos(asNumber(angle)), 0, 0);
};
var rotateDegrees = function(angle) {
	return rotateRadians(degreesToRadians(asNumber(angle)));
};
var skewRadians = function(xSkewAngle, ySkewAngle) {
	return concatTransformationMatrix(1, tan(asNumber(xSkewAngle)), tan(asNumber(ySkewAngle)), 1, 0, 0);
};
var setDashPattern = function(dashArray, dashPhase) {
	return PDFOperator.of(PDFOperatorNames_default.SetLineDashPattern, ["[" + dashArray.map(asPDFNumber).join(" ") + "]", asPDFNumber(dashPhase)]);
};
var LineCapStyle;
(function(LineCapStyle) {
	LineCapStyle[LineCapStyle["Butt"] = 0] = "Butt";
	LineCapStyle[LineCapStyle["Round"] = 1] = "Round";
	LineCapStyle[LineCapStyle["Projecting"] = 2] = "Projecting";
})(LineCapStyle || (LineCapStyle = {}));
var setLineCap = function(style) {
	return PDFOperator.of(PDFOperatorNames_default.SetLineCapStyle, [asPDFNumber(style)]);
};
var LineJoinStyle;
(function(LineJoinStyle) {
	LineJoinStyle[LineJoinStyle["Miter"] = 0] = "Miter";
	LineJoinStyle[LineJoinStyle["Round"] = 1] = "Round";
	LineJoinStyle[LineJoinStyle["Bevel"] = 2] = "Bevel";
})(LineJoinStyle || (LineJoinStyle = {}));
var setGraphicsState = function(state) {
	return PDFOperator.of(PDFOperatorNames_default.SetGraphicsStateParams, [asPDFName(state)]);
};
var pushGraphicsState = function() {
	return PDFOperator.of(PDFOperatorNames_default.PushGraphicsState);
};
var popGraphicsState = function() {
	return PDFOperator.of(PDFOperatorNames_default.PopGraphicsState);
};
var setLineWidth = function(width) {
	return PDFOperator.of(PDFOperatorNames_default.SetLineWidth, [asPDFNumber(width)]);
};
var appendBezierCurve = function(x1, y1, x2, y2, x3, y3) {
	return PDFOperator.of(PDFOperatorNames_default.AppendBezierCurve, [
		asPDFNumber(x1),
		asPDFNumber(y1),
		asPDFNumber(x2),
		asPDFNumber(y2),
		asPDFNumber(x3),
		asPDFNumber(y3)
	]);
};
var appendQuadraticCurve = function(x1, y1, x2, y2) {
	return PDFOperator.of(PDFOperatorNames_default.CurveToReplicateInitialPoint, [
		asPDFNumber(x1),
		asPDFNumber(y1),
		asPDFNumber(x2),
		asPDFNumber(y2)
	]);
};
var closePath = function() {
	return PDFOperator.of(PDFOperatorNames_default.ClosePath);
};
var moveTo = function(xPos, yPos) {
	return PDFOperator.of(PDFOperatorNames_default.MoveTo, [asPDFNumber(xPos), asPDFNumber(yPos)]);
};
var lineTo = function(xPos, yPos) {
	return PDFOperator.of(PDFOperatorNames_default.LineTo, [asPDFNumber(xPos), asPDFNumber(yPos)]);
};
var stroke = function() {
	return PDFOperator.of(PDFOperatorNames_default.StrokePath);
};
var fill = function() {
	return PDFOperator.of(PDFOperatorNames_default.FillNonZero);
};
var fillAndStroke = function() {
	return PDFOperator.of(PDFOperatorNames_default.FillNonZeroAndStroke);
};
var endPath = function() {
	return PDFOperator.of(PDFOperatorNames_default.EndPath);
};
var nextLine = function() {
	return PDFOperator.of(PDFOperatorNames_default.NextLine);
};
var showText = function(text) {
	return PDFOperator.of(PDFOperatorNames_default.ShowText, [text]);
};
var beginText = function() {
	return PDFOperator.of(PDFOperatorNames_default.BeginText);
};
var endText = function() {
	return PDFOperator.of(PDFOperatorNames_default.EndText);
};
var setFontAndSize = function(name, size) {
	return PDFOperator.of(PDFOperatorNames_default.SetFontAndSize, [asPDFName(name), asPDFNumber(size)]);
};
var setLineHeight = function(lineHeight) {
	return PDFOperator.of(PDFOperatorNames_default.SetTextLineHeight, [asPDFNumber(lineHeight)]);
};
var TextRenderingMode;
(function(TextRenderingMode) {
	TextRenderingMode[TextRenderingMode["Fill"] = 0] = "Fill";
	TextRenderingMode[TextRenderingMode["Outline"] = 1] = "Outline";
	TextRenderingMode[TextRenderingMode["FillAndOutline"] = 2] = "FillAndOutline";
	TextRenderingMode[TextRenderingMode["Invisible"] = 3] = "Invisible";
	TextRenderingMode[TextRenderingMode["FillAndClip"] = 4] = "FillAndClip";
	TextRenderingMode[TextRenderingMode["OutlineAndClip"] = 5] = "OutlineAndClip";
	TextRenderingMode[TextRenderingMode["FillAndOutlineAndClip"] = 6] = "FillAndOutlineAndClip";
	TextRenderingMode[TextRenderingMode["Clip"] = 7] = "Clip";
})(TextRenderingMode || (TextRenderingMode = {}));
var setTextMatrix = function(a, b, c, d, e, f) {
	return PDFOperator.of(PDFOperatorNames_default.SetTextMatrix, [
		asPDFNumber(a),
		asPDFNumber(b),
		asPDFNumber(c),
		asPDFNumber(d),
		asPDFNumber(e),
		asPDFNumber(f)
	]);
};
var rotateAndSkewTextRadiansAndTranslate = function(rotationAngle, xSkewAngle, ySkewAngle, x, y) {
	return setTextMatrix(cos(asNumber(rotationAngle)), sin(asNumber(rotationAngle)) + tan(asNumber(xSkewAngle)), -sin(asNumber(rotationAngle)) + tan(asNumber(ySkewAngle)), cos(asNumber(rotationAngle)), x, y);
};
var drawObject = function(name) {
	return PDFOperator.of(PDFOperatorNames_default.DrawObject, [asPDFName(name)]);
};
var setFillingGrayscaleColor = function(gray) {
	return PDFOperator.of(PDFOperatorNames_default.NonStrokingColorGray, [asPDFNumber(gray)]);
};
var setStrokingGrayscaleColor = function(gray) {
	return PDFOperator.of(PDFOperatorNames_default.StrokingColorGray, [asPDFNumber(gray)]);
};
var setFillingRgbColor = function(red, green, blue) {
	return PDFOperator.of(PDFOperatorNames_default.NonStrokingColorRgb, [
		asPDFNumber(red),
		asPDFNumber(green),
		asPDFNumber(blue)
	]);
};
var setStrokingRgbColor = function(red, green, blue) {
	return PDFOperator.of(PDFOperatorNames_default.StrokingColorRgb, [
		asPDFNumber(red),
		asPDFNumber(green),
		asPDFNumber(blue)
	]);
};
var setFillingCmykColor = function(cyan, magenta, yellow, key) {
	return PDFOperator.of(PDFOperatorNames_default.NonStrokingColorCmyk, [
		asPDFNumber(cyan),
		asPDFNumber(magenta),
		asPDFNumber(yellow),
		asPDFNumber(key)
	]);
};
var setStrokingCmykColor = function(cyan, magenta, yellow, key) {
	return PDFOperator.of(PDFOperatorNames_default.StrokingColorCmyk, [
		asPDFNumber(cyan),
		asPDFNumber(magenta),
		asPDFNumber(yellow),
		asPDFNumber(key)
	]);
};
var beginMarkedContent = function(tag) {
	return PDFOperator.of(PDFOperatorNames_default.BeginMarkedContent, [asPDFName(tag)]);
};
var endMarkedContent = function() {
	return PDFOperator.of(PDFOperatorNames_default.EndMarkedContent);
};
//#endregion
//#region node_modules/pdf-lib/es/api/colors.js
var ColorTypes;
(function(ColorTypes) {
	ColorTypes["Grayscale"] = "Grayscale";
	ColorTypes["RGB"] = "RGB";
	ColorTypes["CMYK"] = "CMYK";
})(ColorTypes || (ColorTypes = {}));
var grayscale = function(gray) {
	assertRange(gray, "gray", 0, 1);
	return {
		type: ColorTypes.Grayscale,
		gray
	};
};
var rgb = function(red, green, blue) {
	assertRange(red, "red", 0, 1);
	assertRange(green, "green", 0, 1);
	assertRange(blue, "blue", 0, 1);
	return {
		type: ColorTypes.RGB,
		red,
		green,
		blue
	};
};
var cmyk = function(cyan, magenta, yellow, key) {
	assertRange(cyan, "cyan", 0, 1);
	assertRange(magenta, "magenta", 0, 1);
	assertRange(yellow, "yellow", 0, 1);
	assertRange(key, "key", 0, 1);
	return {
		type: ColorTypes.CMYK,
		cyan,
		magenta,
		yellow,
		key
	};
};
var Grayscale = ColorTypes.Grayscale;
var RGB = ColorTypes.RGB;
var CMYK = ColorTypes.CMYK;
var setFillingColor = function(color) {
	return color.type === Grayscale ? setFillingGrayscaleColor(color.gray) : color.type === RGB ? setFillingRgbColor(color.red, color.green, color.blue) : color.type === CMYK ? setFillingCmykColor(color.cyan, color.magenta, color.yellow, color.key) : error("Invalid color: " + JSON.stringify(color));
};
var setStrokingColor = function(color) {
	return color.type === Grayscale ? setStrokingGrayscaleColor(color.gray) : color.type === RGB ? setStrokingRgbColor(color.red, color.green, color.blue) : color.type === CMYK ? setStrokingCmykColor(color.cyan, color.magenta, color.yellow, color.key) : error("Invalid color: " + JSON.stringify(color));
};
var componentsToColor = function(comps, scale) {
	if (scale === void 0) scale = 1;
	return (comps === null || comps === void 0 ? void 0 : comps.length) === 1 ? grayscale(comps[0] * scale) : (comps === null || comps === void 0 ? void 0 : comps.length) === 3 ? rgb(comps[0] * scale, comps[1] * scale, comps[2] * scale) : (comps === null || comps === void 0 ? void 0 : comps.length) === 4 ? cmyk(comps[0] * scale, comps[1] * scale, comps[2] * scale, comps[3] * scale) : void 0;
};
var colorToComponents = function(color) {
	return color.type === Grayscale ? [color.gray] : color.type === RGB ? [
		color.red,
		color.green,
		color.blue
	] : color.type === CMYK ? [
		color.cyan,
		color.magenta,
		color.yellow,
		color.key
	] : error("Invalid color: " + JSON.stringify(color));
};
//#endregion
//#region node_modules/pdf-lib/es/api/svgPath.js
var cx = 0;
var cy = 0;
var px = 0;
var py = 0;
var sx = 0;
var sy = 0;
var parameters = /* @__PURE__ */ new Map([
	["A", 7],
	["a", 7],
	["C", 6],
	["c", 6],
	["H", 1],
	["h", 1],
	["L", 2],
	["l", 2],
	["M", 2],
	["m", 2],
	["Q", 4],
	["q", 4],
	["S", 4],
	["s", 4],
	["T", 2],
	["t", 2],
	["V", 1],
	["v", 1],
	["Z", 0],
	["z", 0]
]);
var parse = function(path) {
	var cmd;
	var ret = [];
	var args = [];
	var curArg = "";
	var foundDecimal = false;
	var params = 0;
	for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
		var c = path_1[_i];
		if (parameters.has(c)) {
			params = parameters.get(c);
			if (cmd) {
				if (curArg.length > 0) args[args.length] = +curArg;
				ret[ret.length] = {
					cmd,
					args
				};
				args = [];
				curArg = "";
				foundDecimal = false;
			}
			cmd = c;
		} else if ([" ", ","].includes(c) || c === "-" && curArg.length > 0 && curArg[curArg.length - 1] !== "e" || c === "." && foundDecimal) {
			if (curArg.length === 0) continue;
			if (args.length === params) {
				ret[ret.length] = {
					cmd,
					args
				};
				args = [+curArg];
				if (cmd === "M") cmd = "L";
				if (cmd === "m") cmd = "l";
			} else args[args.length] = +curArg;
			foundDecimal = c === ".";
			curArg = ["-", "."].includes(c) ? c : "";
		} else {
			curArg += c;
			if (c === ".") foundDecimal = true;
		}
	}
	if (curArg.length > 0) {
		if (args.length === params) {
			ret[ret.length] = {
				cmd,
				args
			};
			args = [+curArg];
			if (cmd === "M") cmd = "L";
			if (cmd === "m") cmd = "l";
		} else args[args.length] = +curArg;
	}
	ret[ret.length] = {
		cmd,
		args
	};
	return ret;
};
var apply = function(commands) {
	cx = cy = px = py = sx = sy = 0;
	var cmds = [];
	for (var i = 0; i < commands.length; i++) {
		var c = commands[i];
		if (c.cmd && typeof runners[c.cmd] === "function") {
			var cmd = runners[c.cmd](c.args);
			if (Array.isArray(cmd)) cmds = cmds.concat(cmd);
			else cmds.push(cmd);
		}
	}
	return cmds;
};
var runners = {
	M: function(a) {
		cx = a[0];
		cy = a[1];
		px = py = null;
		sx = cx;
		sy = cy;
		return moveTo(cx, cy);
	},
	m: function(a) {
		cx += a[0];
		cy += a[1];
		px = py = null;
		sx = cx;
		sy = cy;
		return moveTo(cx, cy);
	},
	C: function(a) {
		cx = a[4];
		cy = a[5];
		px = a[2];
		py = a[3];
		return appendBezierCurve(a[0], a[1], a[2], a[3], a[4], a[5]);
	},
	c: function(a) {
		var cmd = appendBezierCurve(a[0] + cx, a[1] + cy, a[2] + cx, a[3] + cy, a[4] + cx, a[5] + cy);
		px = cx + a[2];
		py = cy + a[3];
		cx += a[4];
		cy += a[5];
		return cmd;
	},
	S: function(a) {
		if (px === null || py === null) {
			px = cx;
			py = cy;
		}
		var cmd = appendBezierCurve(cx - (px - cx), cy - (py - cy), a[0], a[1], a[2], a[3]);
		px = a[0];
		py = a[1];
		cx = a[2];
		cy = a[3];
		return cmd;
	},
	s: function(a) {
		if (px === null || py === null) {
			px = cx;
			py = cy;
		}
		var cmd = appendBezierCurve(cx - (px - cx), cy - (py - cy), cx + a[0], cy + a[1], cx + a[2], cy + a[3]);
		px = cx + a[0];
		py = cy + a[1];
		cx += a[2];
		cy += a[3];
		return cmd;
	},
	Q: function(a) {
		px = a[0];
		py = a[1];
		cx = a[2];
		cy = a[3];
		return appendQuadraticCurve(a[0], a[1], cx, cy);
	},
	q: function(a) {
		var cmd = appendQuadraticCurve(a[0] + cx, a[1] + cy, a[2] + cx, a[3] + cy);
		px = cx + a[0];
		py = cy + a[1];
		cx += a[2];
		cy += a[3];
		return cmd;
	},
	T: function(a) {
		if (px === null || py === null) {
			px = cx;
			py = cy;
		} else {
			px = cx - (px - cx);
			py = cy - (py - cy);
		}
		var cmd = appendQuadraticCurve(px, py, a[0], a[1]);
		px = cx - (px - cx);
		py = cy - (py - cy);
		cx = a[0];
		cy = a[1];
		return cmd;
	},
	t: function(a) {
		if (px === null || py === null) {
			px = cx;
			py = cy;
		} else {
			px = cx - (px - cx);
			py = cy - (py - cy);
		}
		var cmd = appendQuadraticCurve(px, py, cx + a[0], cy + a[1]);
		cx += a[0];
		cy += a[1];
		return cmd;
	},
	A: function(a) {
		var cmds = solveArc(cx, cy, a);
		cx = a[5];
		cy = a[6];
		return cmds;
	},
	a: function(a) {
		a[5] += cx;
		a[6] += cy;
		var cmds = solveArc(cx, cy, a);
		cx = a[5];
		cy = a[6];
		return cmds;
	},
	L: function(a) {
		cx = a[0];
		cy = a[1];
		px = py = null;
		return lineTo(cx, cy);
	},
	l: function(a) {
		cx += a[0];
		cy += a[1];
		px = py = null;
		return lineTo(cx, cy);
	},
	H: function(a) {
		cx = a[0];
		px = py = null;
		return lineTo(cx, cy);
	},
	h: function(a) {
		cx += a[0];
		px = py = null;
		return lineTo(cx, cy);
	},
	V: function(a) {
		cy = a[0];
		px = py = null;
		return lineTo(cx, cy);
	},
	v: function(a) {
		cy += a[0];
		px = py = null;
		return lineTo(cx, cy);
	},
	Z: function() {
		var cmd = closePath();
		cx = sx;
		cy = sy;
		return cmd;
	},
	z: function() {
		var cmd = closePath();
		cx = sx;
		cy = sy;
		return cmd;
	}
};
var solveArc = function(x, y, coords) {
	var rx = coords[0], ry = coords[1], rot = coords[2], large = coords[3], sweep = coords[4], ex = coords[5], ey = coords[6];
	var segs = arcToSegments(ex, ey, rx, ry, large, sweep, rot, x, y);
	var cmds = [];
	for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
		var seg = segs_1[_i];
		var bez = segmentToBezier.apply(void 0, seg);
		cmds.push(appendBezierCurve.apply(void 0, bez));
	}
	return cmds;
};
var arcToSegments = function(x, y, rx, ry, large, sweep, rotateX, ox, oy) {
	var th = rotateX * (Math.PI / 180);
	var sinTh = Math.sin(th);
	var cosTh = Math.cos(th);
	rx = Math.abs(rx);
	ry = Math.abs(ry);
	px = cosTh * (ox - x) * .5 + sinTh * (oy - y) * .5;
	py = cosTh * (oy - y) * .5 - sinTh * (ox - x) * .5;
	var pl = px * px / (rx * rx) + py * py / (ry * ry);
	if (pl > 1) {
		pl = Math.sqrt(pl);
		rx *= pl;
		ry *= pl;
	}
	var a00 = cosTh / rx;
	var a01 = sinTh / rx;
	var a10 = -sinTh / ry;
	var a11 = cosTh / ry;
	var x0 = a00 * ox + a01 * oy;
	var y0 = a10 * ox + a11 * oy;
	var x1 = a00 * x + a01 * y;
	var y1 = a10 * x + a11 * y;
	var sfactorSq = 1 / ((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)) - .25;
	if (sfactorSq < 0) sfactorSq = 0;
	var sfactor = Math.sqrt(sfactorSq);
	if (sweep === large) sfactor = -sfactor;
	var xc = .5 * (x0 + x1) - sfactor * (y1 - y0);
	var yc = .5 * (y0 + y1) + sfactor * (x1 - x0);
	var th0 = Math.atan2(y0 - yc, x0 - xc);
	var thArc = Math.atan2(y1 - yc, x1 - xc) - th0;
	if (thArc < 0 && sweep === 1) thArc += 2 * Math.PI;
	else if (thArc > 0 && sweep === 0) thArc -= 2 * Math.PI;
	var segments = Math.ceil(Math.abs(thArc / (Math.PI * .5 + .001)));
	var result = [];
	for (var i = 0; i < segments; i++) {
		var th2 = th0 + i * thArc / segments;
		var th3 = th0 + (i + 1) * thArc / segments;
		result[i] = [
			xc,
			yc,
			th2,
			th3,
			rx,
			ry,
			sinTh,
			cosTh
		];
	}
	return result;
};
var segmentToBezier = function(cx1, cy1, th0, th1, rx, ry, sinTh, cosTh) {
	var a00 = cosTh * rx;
	var a01 = -sinTh * ry;
	var a10 = sinTh * rx;
	var a11 = cosTh * ry;
	var thHalf = .5 * (th1 - th0);
	var t = 8 / 3 * Math.sin(thHalf * .5) * Math.sin(thHalf * .5) / Math.sin(thHalf);
	var x1 = cx1 + Math.cos(th0) - t * Math.sin(th0);
	var y1 = cy1 + Math.sin(th0) + t * Math.cos(th0);
	var x3 = cx1 + Math.cos(th1);
	var y3 = cy1 + Math.sin(th1);
	var x2 = x3 + t * Math.sin(th1);
	var y2 = y3 - t * Math.cos(th1);
	return [
		a00 * x1 + a01 * y1,
		a10 * x1 + a11 * y1,
		a00 * x2 + a01 * y2,
		a10 * x2 + a11 * y2,
		a00 * x3 + a01 * y3,
		a10 * x3 + a11 * y3
	];
};
var svgPathToOperators = function(path) {
	return apply(parse(path));
};
//#endregion
//#region node_modules/pdf-lib/es/api/operations.js
var drawLinesOfText = function(lines, options) {
	var operators = [
		pushGraphicsState(),
		options.graphicsState && setGraphicsState(options.graphicsState),
		beginText(),
		setFillingColor(options.color),
		setFontAndSize(options.font, options.size),
		setLineHeight(options.lineHeight),
		rotateAndSkewTextRadiansAndTranslate(toRadians(options.rotate), toRadians(options.xSkew), toRadians(options.ySkew), options.x, options.y)
	].filter(Boolean);
	for (var idx = 0, len = lines.length; idx < len; idx++) operators.push(showText(lines[idx]), nextLine());
	operators.push(endText(), popGraphicsState());
	return operators;
};
var drawImage = function(name, options) {
	return [
		pushGraphicsState(),
		options.graphicsState && setGraphicsState(options.graphicsState),
		translate(options.x, options.y),
		rotateRadians(toRadians(options.rotate)),
		scale(options.width, options.height),
		skewRadians(toRadians(options.xSkew), toRadians(options.ySkew)),
		drawObject(name),
		popGraphicsState()
	].filter(Boolean);
};
var drawPage = function(name, options) {
	return [
		pushGraphicsState(),
		options.graphicsState && setGraphicsState(options.graphicsState),
		translate(options.x, options.y),
		rotateRadians(toRadians(options.rotate)),
		scale(options.xScale, options.yScale),
		skewRadians(toRadians(options.xSkew), toRadians(options.ySkew)),
		drawObject(name),
		popGraphicsState()
	].filter(Boolean);
};
var drawLine = function(options) {
	var _a, _b;
	return [
		pushGraphicsState(),
		options.graphicsState && setGraphicsState(options.graphicsState),
		options.color && setStrokingColor(options.color),
		setLineWidth(options.thickness),
		setDashPattern((_a = options.dashArray) !== null && _a !== void 0 ? _a : [], (_b = options.dashPhase) !== null && _b !== void 0 ? _b : 0),
		moveTo(options.start.x, options.start.y),
		options.lineCap && setLineCap(options.lineCap),
		moveTo(options.start.x, options.start.y),
		lineTo(options.end.x, options.end.y),
		stroke(),
		popGraphicsState()
	].filter(Boolean);
};
var drawRectangle = function(options) {
	var _a, _b;
	return [
		pushGraphicsState(),
		options.graphicsState && setGraphicsState(options.graphicsState),
		options.color && setFillingColor(options.color),
		options.borderColor && setStrokingColor(options.borderColor),
		setLineWidth(options.borderWidth),
		options.borderLineCap && setLineCap(options.borderLineCap),
		setDashPattern((_a = options.borderDashArray) !== null && _a !== void 0 ? _a : [], (_b = options.borderDashPhase) !== null && _b !== void 0 ? _b : 0),
		translate(options.x, options.y),
		rotateRadians(toRadians(options.rotate)),
		skewRadians(toRadians(options.xSkew), toRadians(options.ySkew)),
		moveTo(0, 0),
		lineTo(0, options.height),
		lineTo(options.width, options.height),
		lineTo(options.width, 0),
		closePath(),
		options.color && options.borderWidth ? fillAndStroke() : options.color ? fill() : options.borderColor ? stroke() : closePath(),
		popGraphicsState()
	].filter(Boolean);
};
var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
/** @deprecated */
var drawEllipsePath = function(config) {
	var x = asNumber(config.x);
	var y = asNumber(config.y);
	var xScale = asNumber(config.xScale);
	var yScale = asNumber(config.yScale);
	x -= xScale;
	y -= yScale;
	var ox = xScale * KAPPA;
	var oy = yScale * KAPPA;
	var xe = x + xScale * 2;
	var ye = y + yScale * 2;
	var xm = x + xScale;
	var ym = y + yScale;
	return [
		pushGraphicsState(),
		moveTo(x, ym),
		appendBezierCurve(x, ym - oy, xm - ox, y, xm, y),
		appendBezierCurve(xm + ox, y, xe, ym - oy, xe, ym),
		appendBezierCurve(xe, ym + oy, xm + ox, ye, xm, ye),
		appendBezierCurve(xm - ox, ye, x, ym + oy, x, ym),
		popGraphicsState()
	];
};
var drawEllipseCurves = function(config) {
	var centerX = asNumber(config.x);
	var centerY = asNumber(config.y);
	var xScale = asNumber(config.xScale);
	var yScale = asNumber(config.yScale);
	var x = -xScale;
	var y = -yScale;
	var ox = xScale * KAPPA;
	var oy = yScale * KAPPA;
	var xe = x + xScale * 2;
	var ye = y + yScale * 2;
	var xm = x + xScale;
	var ym = y + yScale;
	return [
		translate(centerX, centerY),
		rotateRadians(toRadians(config.rotate)),
		moveTo(x, ym),
		appendBezierCurve(x, ym - oy, xm - ox, y, xm, y),
		appendBezierCurve(xm + ox, y, xe, ym - oy, xe, ym),
		appendBezierCurve(xe, ym + oy, xm + ox, ye, xm, ye),
		appendBezierCurve(xm - ox, ye, x, ym + oy, x, ym)
	];
};
var drawEllipse = function(options) {
	var _a, _b, _c;
	return __spreadArrays([
		pushGraphicsState(),
		options.graphicsState && setGraphicsState(options.graphicsState),
		options.color && setFillingColor(options.color),
		options.borderColor && setStrokingColor(options.borderColor),
		setLineWidth(options.borderWidth),
		options.borderLineCap && setLineCap(options.borderLineCap),
		setDashPattern((_a = options.borderDashArray) !== null && _a !== void 0 ? _a : [], (_b = options.borderDashPhase) !== null && _b !== void 0 ? _b : 0)
	], options.rotate === void 0 ? drawEllipsePath({
		x: options.x,
		y: options.y,
		xScale: options.xScale,
		yScale: options.yScale
	}) : drawEllipseCurves({
		x: options.x,
		y: options.y,
		xScale: options.xScale,
		yScale: options.yScale,
		rotate: (_c = options.rotate) !== null && _c !== void 0 ? _c : degrees(0)
	}), [options.color && options.borderWidth ? fillAndStroke() : options.color ? fill() : options.borderColor ? stroke() : closePath(), popGraphicsState()]).filter(Boolean);
};
var drawSvgPath = function(path, options) {
	var _a, _b, _c;
	return __spreadArrays([
		pushGraphicsState(),
		options.graphicsState && setGraphicsState(options.graphicsState),
		translate(options.x, options.y),
		rotateRadians(toRadians((_a = options.rotate) !== null && _a !== void 0 ? _a : degrees(0))),
		options.scale ? scale(options.scale, -options.scale) : scale(1, -1),
		options.color && setFillingColor(options.color),
		options.borderColor && setStrokingColor(options.borderColor),
		options.borderWidth && setLineWidth(options.borderWidth),
		options.borderLineCap && setLineCap(options.borderLineCap),
		setDashPattern((_b = options.borderDashArray) !== null && _b !== void 0 ? _b : [], (_c = options.borderDashPhase) !== null && _c !== void 0 ? _c : 0)
	], svgPathToOperators(path), [options.color && options.borderWidth ? fillAndStroke() : options.color ? fill() : options.borderColor ? stroke() : closePath(), popGraphicsState()]).filter(Boolean);
};
var drawCheckMark = function(options) {
	var size = asNumber(options.size);
	/*********************** Define Check Mark Points ***************************/
	var p2x = -.25;
	var p2y = -.49;
	var p3y = .475;
	var p3x = .69;
	var p1x = -.675;
	var p1y = -((p1x - p2x) * (p3x - p2x)) / (p3y - p2y) + p2y;
	return [
		pushGraphicsState(),
		options.color && setStrokingColor(options.color),
		setLineWidth(options.thickness),
		translate(options.x, options.y),
		moveTo(p1x * size, p1y * size),
		lineTo(p2x * size, p2y * size),
		lineTo(p3x * size, p3y * size),
		stroke(),
		popGraphicsState()
	].filter(Boolean);
};
var rotateInPlace = function(options) {
	return options.rotation === 0 ? [translate(0, 0), rotateDegrees(0)] : options.rotation === 90 ? [translate(options.width, 0), rotateDegrees(90)] : options.rotation === 180 ? [translate(options.width, options.height), rotateDegrees(180)] : options.rotation === 270 ? [translate(0, options.height), rotateDegrees(270)] : [];
};
var drawCheckBox = function(options) {
	var outline = drawRectangle({
		x: options.x,
		y: options.y,
		width: options.width,
		height: options.height,
		borderWidth: options.borderWidth,
		color: options.color,
		borderColor: options.borderColor,
		rotate: degrees(0),
		xSkew: degrees(0),
		ySkew: degrees(0)
	});
	if (!options.filled) return outline;
	var width = asNumber(options.width);
	var height = asNumber(options.height);
	var checkMarkSize = Math.min(width, height) / 2;
	var checkMark = drawCheckMark({
		x: width / 2,
		y: height / 2,
		size: checkMarkSize,
		thickness: options.thickness,
		color: options.markColor
	});
	return __spreadArrays([pushGraphicsState()], outline, checkMark, [popGraphicsState()]);
};
var drawRadioButton = function(options) {
	var width = asNumber(options.width);
	var height = asNumber(options.height);
	var outlineScale = Math.min(width, height) / 2;
	var outline = drawEllipse({
		x: options.x,
		y: options.y,
		xScale: outlineScale,
		yScale: outlineScale,
		color: options.color,
		borderColor: options.borderColor,
		borderWidth: options.borderWidth
	});
	if (!options.filled) return outline;
	var dot = drawEllipse({
		x: options.x,
		y: options.y,
		xScale: outlineScale * .45,
		yScale: outlineScale * .45,
		color: options.dotColor,
		borderColor: void 0,
		borderWidth: 0
	});
	return __spreadArrays([pushGraphicsState()], outline, dot, [popGraphicsState()]);
};
var drawButton = function(options) {
	var background = drawRectangle({
		x: asNumber(options.x),
		y: asNumber(options.y),
		width: asNumber(options.width),
		height: asNumber(options.height),
		borderWidth: options.borderWidth,
		color: options.color,
		borderColor: options.borderColor,
		rotate: degrees(0),
		xSkew: degrees(0),
		ySkew: degrees(0)
	});
	var lines = drawTextLines(options.textLines, {
		color: options.textColor,
		font: options.font,
		size: options.fontSize,
		rotate: degrees(0),
		xSkew: degrees(0),
		ySkew: degrees(0)
	});
	return __spreadArrays([pushGraphicsState()], background, lines, [popGraphicsState()]);
};
var drawTextLines = function(lines, options) {
	var operators = [
		beginText(),
		setFillingColor(options.color),
		setFontAndSize(options.font, options.size)
	];
	for (var idx = 0, len = lines.length; idx < len; idx++) {
		var _a = lines[idx], encoded = _a.encoded, x = _a.x, y = _a.y;
		operators.push(rotateAndSkewTextRadiansAndTranslate(toRadians(options.rotate), toRadians(options.xSkew), toRadians(options.ySkew), x, y), showText(encoded));
	}
	operators.push(endText());
	return operators;
};
var drawTextField = function(options) {
	var x = asNumber(options.x);
	var y = asNumber(options.y);
	var width = asNumber(options.width);
	var height = asNumber(options.height);
	var borderWidth = asNumber(options.borderWidth);
	var padding = asNumber(options.padding);
	var clipX = x + borderWidth / 2 + padding;
	var clipY = y + borderWidth / 2 + padding;
	var clipWidth = width - (borderWidth / 2 + padding) * 2;
	var clipHeight = height - (borderWidth / 2 + padding) * 2;
	var clippingArea = [
		moveTo(clipX, clipY),
		lineTo(clipX, clipY + clipHeight),
		lineTo(clipX + clipWidth, clipY + clipHeight),
		lineTo(clipX + clipWidth, clipY),
		closePath(),
		clip(),
		endPath()
	];
	var background = drawRectangle({
		x,
		y,
		width,
		height,
		borderWidth: options.borderWidth,
		color: options.color,
		borderColor: options.borderColor,
		rotate: degrees(0),
		xSkew: degrees(0),
		ySkew: degrees(0)
	});
	var lines = drawTextLines(options.textLines, {
		color: options.textColor,
		font: options.font,
		size: options.fontSize,
		rotate: degrees(0),
		xSkew: degrees(0),
		ySkew: degrees(0)
	});
	var markedContent = __spreadArrays([beginMarkedContent("Tx"), pushGraphicsState()], lines, [popGraphicsState(), endMarkedContent()]);
	return __spreadArrays([pushGraphicsState()], background, clippingArea, markedContent, [popGraphicsState()]);
};
var drawOptionList = function(options) {
	var x = asNumber(options.x);
	var y = asNumber(options.y);
	var width = asNumber(options.width);
	var height = asNumber(options.height);
	var lineHeight = asNumber(options.lineHeight);
	var borderWidth = asNumber(options.borderWidth);
	var padding = asNumber(options.padding);
	var clipX = x + borderWidth / 2 + padding;
	var clipY = y + borderWidth / 2 + padding;
	var clipWidth = width - (borderWidth / 2 + padding) * 2;
	var clipHeight = height - (borderWidth / 2 + padding) * 2;
	var clippingArea = [
		moveTo(clipX, clipY),
		lineTo(clipX, clipY + clipHeight),
		lineTo(clipX + clipWidth, clipY + clipHeight),
		lineTo(clipX + clipWidth, clipY),
		closePath(),
		clip(),
		endPath()
	];
	var background = drawRectangle({
		x,
		y,
		width,
		height,
		borderWidth: options.borderWidth,
		color: options.color,
		borderColor: options.borderColor,
		rotate: degrees(0),
		xSkew: degrees(0),
		ySkew: degrees(0)
	});
	var highlights = [];
	for (var idx = 0, len = options.selectedLines.length; idx < len; idx++) {
		var line = options.textLines[options.selectedLines[idx]];
		highlights.push.apply(highlights, drawRectangle({
			x: line.x - padding,
			y: line.y - (lineHeight - line.height) / 2,
			width: width - borderWidth,
			height: line.height + (lineHeight - line.height) / 2,
			borderWidth: 0,
			color: options.selectedColor,
			borderColor: void 0,
			rotate: degrees(0),
			xSkew: degrees(0),
			ySkew: degrees(0)
		}));
	}
	var lines = drawTextLines(options.textLines, {
		color: options.textColor,
		font: options.font,
		size: options.fontSize,
		rotate: degrees(0),
		xSkew: degrees(0),
		ySkew: degrees(0)
	});
	var markedContent = __spreadArrays([beginMarkedContent("Tx"), pushGraphicsState()], lines, [popGraphicsState(), endMarkedContent()]);
	return __spreadArrays([pushGraphicsState()], background, highlights, clippingArea, markedContent, [popGraphicsState()]);
};
//#endregion
//#region node_modules/pdf-lib/es/api/errors.js
var EncryptedPDFError = function(_super) {
	__extends(EncryptedPDFError, _super);
	function EncryptedPDFError() {
		var _this = this;
		_this = _super.call(this, "Input document to `PDFDocument.load` is encrypted. You can use `PDFDocument.load(..., { ignoreEncryption: true })` if you wish to load the document anyways.") || this;
		return _this;
	}
	return EncryptedPDFError;
}(Error);
var FontkitNotRegisteredError = function(_super) {
	__extends(FontkitNotRegisteredError, _super);
	function FontkitNotRegisteredError() {
		var _this = this;
		_this = _super.call(this, "Input to `PDFDocument.embedFont` was a custom font, but no `fontkit` instance was found. You must register a `fontkit` instance with `PDFDocument.registerFontkit(...)` before embedding custom fonts.") || this;
		return _this;
	}
	return FontkitNotRegisteredError;
}(Error);
var ForeignPageError = function(_super) {
	__extends(ForeignPageError, _super);
	function ForeignPageError() {
		var _this = this;
		_this = _super.call(this, "A `page` passed to `PDFDocument.addPage` or `PDFDocument.insertPage` was from a different (foreign) PDF document. If you want to copy pages from one PDFDocument to another, you must use `PDFDocument.copyPages(...)` to copy the pages before adding or inserting them.") || this;
		return _this;
	}
	return ForeignPageError;
}(Error);
var RemovePageFromEmptyDocumentError = function(_super) {
	__extends(RemovePageFromEmptyDocumentError, _super);
	function RemovePageFromEmptyDocumentError() {
		var _this = this;
		_this = _super.call(this, "PDFDocument has no pages so `PDFDocument.removePage` cannot be called") || this;
		return _this;
	}
	return RemovePageFromEmptyDocumentError;
}(Error);
var NoSuchFieldError = function(_super) {
	__extends(NoSuchFieldError, _super);
	function NoSuchFieldError(name) {
		var _this = this;
		var msg = "PDFDocument has no form field with the name \"" + name + "\"";
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return NoSuchFieldError;
}(Error);
var UnexpectedFieldTypeError = function(_super) {
	__extends(UnexpectedFieldTypeError, _super);
	function UnexpectedFieldTypeError(name, expected, actual) {
		var _a, _b;
		var _this = this;
		var expectedType = expected === null || expected === void 0 ? void 0 : expected.name;
		var actualType = (_b = (_a = actual === null || actual === void 0 ? void 0 : actual.constructor) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : actual;
		var msg = "Expected field \"" + name + "\" to be of type " + expectedType + ", " + ("but it is actually of type " + actualType);
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return UnexpectedFieldTypeError;
}(Error);
(function(_super) {
	__extends(MissingOnValueCheckError, _super);
	function MissingOnValueCheckError(onValue) {
		var _this = this;
		var msg = "Failed to select check box due to missing onValue: \"" + onValue + "\"";
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return MissingOnValueCheckError;
})(Error);
var FieldAlreadyExistsError = function(_super) {
	__extends(FieldAlreadyExistsError, _super);
	function FieldAlreadyExistsError(name) {
		var _this = this;
		var msg = "A field already exists with the specified name: \"" + name + "\"";
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return FieldAlreadyExistsError;
}(Error);
var InvalidFieldNamePartError = function(_super) {
	__extends(InvalidFieldNamePartError, _super);
	function InvalidFieldNamePartError(namePart) {
		var _this = this;
		var msg = "Field name contains invalid component: \"" + namePart + "\"";
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return InvalidFieldNamePartError;
}(Error);
(function(_super) {
	__extends(FieldExistsAsNonTerminalError, _super);
	function FieldExistsAsNonTerminalError(name) {
		var _this = this;
		var msg = "A non-terminal field already exists with the specified name: \"" + name + "\"";
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return FieldExistsAsNonTerminalError;
})(Error);
var RichTextFieldReadError = function(_super) {
	__extends(RichTextFieldReadError, _super);
	function RichTextFieldReadError(fieldName) {
		var _this = this;
		var msg = "Reading rich text fields is not supported: Attempted to read rich text field: " + fieldName;
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return RichTextFieldReadError;
}(Error);
var CombedTextLayoutError = function(_super) {
	__extends(CombedTextLayoutError, _super);
	function CombedTextLayoutError(lineLength, cellCount) {
		var _this = this;
		var msg = "Failed to layout combed text as lineLength=" + lineLength + " is greater than cellCount=" + cellCount;
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return CombedTextLayoutError;
}(Error);
var ExceededMaxLengthError = function(_super) {
	__extends(ExceededMaxLengthError, _super);
	function ExceededMaxLengthError(textLength, maxLength, name) {
		var _this = this;
		var msg = "Attempted to set text with length=" + textLength + " for TextField with maxLength=" + maxLength + " and name=" + name;
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return ExceededMaxLengthError;
}(Error);
var InvalidMaxLengthError = function(_super) {
	__extends(InvalidMaxLengthError, _super);
	function InvalidMaxLengthError(textLength, maxLength, name) {
		var _this = this;
		var msg = "Attempted to set maxLength=" + maxLength + ", which is less than " + textLength + ", the length of this field's current value (name=" + name + ")";
		_this = _super.call(this, msg) || this;
		return _this;
	}
	return InvalidMaxLengthError;
}(Error);
//#endregion
//#region node_modules/pdf-lib/es/api/text/alignment.js
var TextAlignment;
(function(TextAlignment) {
	TextAlignment[TextAlignment["Left"] = 0] = "Left";
	TextAlignment[TextAlignment["Center"] = 1] = "Center";
	TextAlignment[TextAlignment["Right"] = 2] = "Right";
})(TextAlignment || (TextAlignment = {}));
//#endregion
//#region node_modules/pdf-lib/es/api/text/layout.js
var MIN_FONT_SIZE = 4;
var MAX_FONT_SIZE = 500;
var computeFontSize = function(lines, font, bounds, multiline) {
	if (multiline === void 0) multiline = false;
	var fontSize = MIN_FONT_SIZE;
	while (fontSize < MAX_FONT_SIZE) {
		var linesUsed = 0;
		for (var lineIdx = 0, lineLen = lines.length; lineIdx < lineLen; lineIdx++) {
			linesUsed += 1;
			var words = lines[lineIdx].split(" ");
			var spaceInLineRemaining = bounds.width;
			for (var idx = 0, len = words.length; idx < len; idx++) {
				var word = idx === len - 1 ? words[idx] : words[idx] + " ";
				var widthOfWord = font.widthOfTextAtSize(word, fontSize);
				spaceInLineRemaining -= widthOfWord;
				if (spaceInLineRemaining <= 0) {
					linesUsed += 1;
					spaceInLineRemaining = bounds.width - widthOfWord;
				}
			}
		}
		if (!multiline && linesUsed > lines.length) return fontSize - 1;
		var height = font.heightAtSize(fontSize);
		if ((height + height * .2) * linesUsed > Math.abs(bounds.height)) return fontSize - 1;
		fontSize += 1;
	}
	return fontSize;
};
var computeCombedFontSize = function(line, font, bounds, cellCount) {
	var cellWidth = bounds.width / cellCount;
	var cellHeight = bounds.height;
	var fontSize = MIN_FONT_SIZE;
	var chars = charSplit(line);
	while (fontSize < MAX_FONT_SIZE) {
		for (var idx = 0, len = chars.length; idx < len; idx++) {
			var c = chars[idx];
			if (font.widthOfTextAtSize(c, fontSize) > cellWidth * .75) return fontSize - 1;
		}
		if (font.heightAtSize(fontSize, { descender: false }) > cellHeight) return fontSize - 1;
		fontSize += 1;
	}
	return fontSize;
};
var lastIndexOfWhitespace = function(line) {
	for (var idx = line.length; idx > 0; idx--) if (/\s/.test(line[idx])) return idx;
};
var splitOutLines = function(input, maxWidth, font, fontSize) {
	var _a;
	var lastWhitespaceIdx = input.length;
	while (lastWhitespaceIdx > 0) {
		var line = input.substring(0, lastWhitespaceIdx);
		var encoded = font.encodeText(line);
		var width = font.widthOfTextAtSize(line, fontSize);
		if (width < maxWidth) return {
			line,
			encoded,
			width,
			remainder: input.substring(lastWhitespaceIdx) || void 0
		};
		lastWhitespaceIdx = (_a = lastIndexOfWhitespace(line)) !== null && _a !== void 0 ? _a : 0;
	}
	return {
		line: input,
		encoded: font.encodeText(input),
		width: font.widthOfTextAtSize(input, fontSize),
		remainder: void 0
	};
};
var layoutMultilineText = function(text, _a) {
	var alignment = _a.alignment, fontSize = _a.fontSize, font = _a.font, bounds = _a.bounds;
	var lines = lineSplit(cleanText(text));
	if (fontSize === void 0 || fontSize === 0) fontSize = computeFontSize(lines, font, bounds, true);
	var height = font.heightAtSize(fontSize);
	var lineHeight = height + height * .2;
	var textLines = [];
	var minX = bounds.x;
	var minY = bounds.y;
	var maxX = bounds.x + bounds.width;
	var maxY = bounds.y + bounds.height;
	var y = bounds.y + bounds.height;
	for (var idx = 0, len = lines.length; idx < len; idx++) {
		var prevRemainder = lines[idx];
		while (prevRemainder !== void 0) {
			var _b = splitOutLines(prevRemainder, bounds.width, font, fontSize), line = _b.line, encoded = _b.encoded, width = _b.width, remainder = _b.remainder;
			var x = alignment === TextAlignment.Left ? bounds.x : alignment === TextAlignment.Center ? bounds.x + bounds.width / 2 - width / 2 : alignment === TextAlignment.Right ? bounds.x + bounds.width - width : bounds.x;
			y -= lineHeight;
			if (x < minX) minX = x;
			if (y < minY) minY = y;
			if (x + width > maxX) maxX = x + width;
			if (y + height > maxY) maxY = y + height;
			textLines.push({
				text: line,
				encoded,
				width,
				height,
				x,
				y
			});
			prevRemainder = remainder === null || remainder === void 0 ? void 0 : remainder.trim();
		}
	}
	return {
		fontSize,
		lineHeight,
		lines: textLines,
		bounds: {
			x: minX,
			y: minY,
			width: maxX - minX,
			height: maxY - minY
		}
	};
};
var layoutCombedText = function(text, _a) {
	var fontSize = _a.fontSize, font = _a.font, bounds = _a.bounds, cellCount = _a.cellCount;
	var line = mergeLines(cleanText(text));
	if (line.length > cellCount) throw new CombedTextLayoutError(line.length, cellCount);
	if (fontSize === void 0 || fontSize === 0) fontSize = computeCombedFontSize(line, font, bounds, cellCount);
	var cellWidth = bounds.width / cellCount;
	var height = font.heightAtSize(fontSize, { descender: false });
	var y = bounds.y + (bounds.height / 2 - height / 2);
	var cells = [];
	var minX = bounds.x;
	var minY = bounds.y;
	var maxX = bounds.x + bounds.width;
	var maxY = bounds.y + bounds.height;
	var cellOffset = 0;
	var charOffset = 0;
	while (cellOffset < cellCount) {
		var _b = charAtIndex(line, charOffset), char = _b[0], charLength = _b[1];
		var encoded = font.encodeText(char);
		var width = font.widthOfTextAtSize(char, fontSize);
		var x = bounds.x + (cellWidth * cellOffset + cellWidth / 2) - width / 2;
		if (x < minX) minX = x;
		if (y < minY) minY = y;
		if (x + width > maxX) maxX = x + width;
		if (y + height > maxY) maxY = y + height;
		cells.push({
			text: line,
			encoded,
			width,
			height,
			x,
			y
		});
		cellOffset += 1;
		charOffset += charLength;
	}
	return {
		fontSize,
		cells,
		bounds: {
			x: minX,
			y: minY,
			width: maxX - minX,
			height: maxY - minY
		}
	};
};
var layoutSinglelineText = function(text, _a) {
	var alignment = _a.alignment, fontSize = _a.fontSize, font = _a.font, bounds = _a.bounds;
	var line = mergeLines(cleanText(text));
	if (fontSize === void 0 || fontSize === 0) fontSize = computeFontSize([line], font, bounds);
	var encoded = font.encodeText(line);
	var width = font.widthOfTextAtSize(line, fontSize);
	var height = font.heightAtSize(fontSize, { descender: false });
	var x = alignment === TextAlignment.Left ? bounds.x : alignment === TextAlignment.Center ? bounds.x + bounds.width / 2 - width / 2 : alignment === TextAlignment.Right ? bounds.x + bounds.width - width : bounds.x;
	var y = bounds.y + (bounds.height / 2 - height / 2);
	return {
		fontSize,
		line: {
			text: line,
			encoded,
			width,
			height,
			x,
			y
		},
		bounds: {
			x,
			y,
			width,
			height
		}
	};
};
//#endregion
//#region node_modules/pdf-lib/es/api/form/appearances.js
/********************* Appearance Provider Functions **************************/
var normalizeAppearance = function(appearance) {
	if ("normal" in appearance) return appearance;
	return { normal: appearance };
};
var tfRegex = /\/([^\0\t\n\f\r\ ]+)[\0\t\n\f\r\ ]+(\d*\.\d+|\d+)[\0\t\n\f\r\ ]+Tf/;
var getDefaultFontSize = function(field) {
	var _a, _b;
	var daMatch = (_b = findLastMatch((_a = field.getDefaultAppearance()) !== null && _a !== void 0 ? _a : "", tfRegex).match) !== null && _b !== void 0 ? _b : [];
	var defaultFontSize = Number(daMatch[2]);
	return isFinite(defaultFontSize) ? defaultFontSize : void 0;
};
var colorRegex = /(\d*\.\d+|\d+)[\0\t\n\f\r\ ]*(\d*\.\d+|\d+)?[\0\t\n\f\r\ ]*(\d*\.\d+|\d+)?[\0\t\n\f\r\ ]*(\d*\.\d+|\d+)?[\0\t\n\f\r\ ]+(g|rg|k)/;
var getDefaultColor = function(field) {
	var _a;
	var daMatch = findLastMatch((_a = field.getDefaultAppearance()) !== null && _a !== void 0 ? _a : "", colorRegex).match;
	var _b = daMatch !== null && daMatch !== void 0 ? daMatch : [], c1 = _b[1], c2 = _b[2], c3 = _b[3], c4 = _b[4], colorSpace = _b[5];
	if (colorSpace === "g" && c1) return grayscale(Number(c1));
	if (colorSpace === "rg" && c1 && c2 && c3) return rgb(Number(c1), Number(c2), Number(c3));
	if (colorSpace === "k" && c1 && c2 && c3 && c4) return cmyk(Number(c1), Number(c2), Number(c3), Number(c4));
};
var updateDefaultAppearance = function(field, color, font, fontSize) {
	var _a;
	if (fontSize === void 0) fontSize = 0;
	var da = [setFillingColor(color).toString(), setFontAndSize((_a = font === null || font === void 0 ? void 0 : font.name) !== null && _a !== void 0 ? _a : "dummy__noop", fontSize).toString()].join("\n");
	field.setDefaultAppearance(da);
};
var defaultCheckBoxAppearanceProvider = function(checkBox, widget) {
	var _a, _b, _c;
	var widgetColor = getDefaultColor(widget);
	var fieldColor = getDefaultColor(checkBox.acroField);
	var rectangle = widget.getRectangle();
	var ap = widget.getAppearanceCharacteristics();
	var bs = widget.getBorderStyle();
	var borderWidth = (_a = bs === null || bs === void 0 ? void 0 : bs.getWidth()) !== null && _a !== void 0 ? _a : 0;
	var rotation = reduceRotation(ap === null || ap === void 0 ? void 0 : ap.getRotation());
	var _d = adjustDimsForRotation(rectangle, rotation), width = _d.width, height = _d.height;
	var rotate = rotateInPlace(__assign(__assign({}, rectangle), { rotation }));
	var black = rgb(0, 0, 0);
	var borderColor = (_b = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBorderColor())) !== null && _b !== void 0 ? _b : black;
	var normalBackgroundColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor());
	var downBackgroundColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor(), .8);
	var textColor = (_c = widgetColor !== null && widgetColor !== void 0 ? widgetColor : fieldColor) !== null && _c !== void 0 ? _c : black;
	if (widgetColor) updateDefaultAppearance(widget, textColor);
	else updateDefaultAppearance(checkBox.acroField, textColor);
	var options = {
		x: 0 + borderWidth / 2,
		y: 0 + borderWidth / 2,
		width: width - borderWidth,
		height: height - borderWidth,
		thickness: 1.5,
		borderWidth,
		borderColor,
		markColor: textColor
	};
	return {
		normal: {
			on: __spreadArrays(rotate, drawCheckBox(__assign(__assign({}, options), {
				color: normalBackgroundColor,
				filled: true
			}))),
			off: __spreadArrays(rotate, drawCheckBox(__assign(__assign({}, options), {
				color: normalBackgroundColor,
				filled: false
			})))
		},
		down: {
			on: __spreadArrays(rotate, drawCheckBox(__assign(__assign({}, options), {
				color: downBackgroundColor,
				filled: true
			}))),
			off: __spreadArrays(rotate, drawCheckBox(__assign(__assign({}, options), {
				color: downBackgroundColor,
				filled: false
			})))
		}
	};
};
var defaultRadioGroupAppearanceProvider = function(radioGroup, widget) {
	var _a, _b, _c;
	var widgetColor = getDefaultColor(widget);
	var fieldColor = getDefaultColor(radioGroup.acroField);
	var rectangle = widget.getRectangle();
	var ap = widget.getAppearanceCharacteristics();
	var bs = widget.getBorderStyle();
	var borderWidth = (_a = bs === null || bs === void 0 ? void 0 : bs.getWidth()) !== null && _a !== void 0 ? _a : 0;
	var rotation = reduceRotation(ap === null || ap === void 0 ? void 0 : ap.getRotation());
	var _d = adjustDimsForRotation(rectangle, rotation), width = _d.width, height = _d.height;
	var rotate = rotateInPlace(__assign(__assign({}, rectangle), { rotation }));
	var black = rgb(0, 0, 0);
	var borderColor = (_b = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBorderColor())) !== null && _b !== void 0 ? _b : black;
	var normalBackgroundColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor());
	var downBackgroundColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor(), .8);
	var textColor = (_c = widgetColor !== null && widgetColor !== void 0 ? widgetColor : fieldColor) !== null && _c !== void 0 ? _c : black;
	if (widgetColor) updateDefaultAppearance(widget, textColor);
	else updateDefaultAppearance(radioGroup.acroField, textColor);
	var options = {
		x: width / 2,
		y: height / 2,
		width: width - borderWidth,
		height: height - borderWidth,
		borderWidth,
		borderColor,
		dotColor: textColor
	};
	return {
		normal: {
			on: __spreadArrays(rotate, drawRadioButton(__assign(__assign({}, options), {
				color: normalBackgroundColor,
				filled: true
			}))),
			off: __spreadArrays(rotate, drawRadioButton(__assign(__assign({}, options), {
				color: normalBackgroundColor,
				filled: false
			})))
		},
		down: {
			on: __spreadArrays(rotate, drawRadioButton(__assign(__assign({}, options), {
				color: downBackgroundColor,
				filled: true
			}))),
			off: __spreadArrays(rotate, drawRadioButton(__assign(__assign({}, options), {
				color: downBackgroundColor,
				filled: false
			})))
		}
	};
};
var defaultButtonAppearanceProvider = function(button, widget, font) {
	var _a, _b, _c, _d, _e;
	var widgetColor = getDefaultColor(widget);
	var fieldColor = getDefaultColor(button.acroField);
	var widgetFontSize = getDefaultFontSize(widget);
	var fieldFontSize = getDefaultFontSize(button.acroField);
	var rectangle = widget.getRectangle();
	var ap = widget.getAppearanceCharacteristics();
	var bs = widget.getBorderStyle();
	var captions = ap === null || ap === void 0 ? void 0 : ap.getCaptions();
	var normalText = (_a = captions === null || captions === void 0 ? void 0 : captions.normal) !== null && _a !== void 0 ? _a : "";
	var downText = (_c = (_b = captions === null || captions === void 0 ? void 0 : captions.down) !== null && _b !== void 0 ? _b : normalText) !== null && _c !== void 0 ? _c : "";
	var borderWidth = (_d = bs === null || bs === void 0 ? void 0 : bs.getWidth()) !== null && _d !== void 0 ? _d : 0;
	var rotation = reduceRotation(ap === null || ap === void 0 ? void 0 : ap.getRotation());
	var _f = adjustDimsForRotation(rectangle, rotation), width = _f.width, height = _f.height;
	var rotate = rotateInPlace(__assign(__assign({}, rectangle), { rotation }));
	var black = rgb(0, 0, 0);
	var borderColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBorderColor());
	var normalBackgroundColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor());
	var downBackgroundColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor(), .8);
	var bounds = {
		x: borderWidth,
		y: borderWidth,
		width: width - borderWidth * 2,
		height: height - borderWidth * 2
	};
	var normalLayout = layoutSinglelineText(normalText, {
		alignment: TextAlignment.Center,
		fontSize: widgetFontSize !== null && widgetFontSize !== void 0 ? widgetFontSize : fieldFontSize,
		font,
		bounds
	});
	var downLayout = layoutSinglelineText(downText, {
		alignment: TextAlignment.Center,
		fontSize: widgetFontSize !== null && widgetFontSize !== void 0 ? widgetFontSize : fieldFontSize,
		font,
		bounds
	});
	var fontSize = Math.min(normalLayout.fontSize, downLayout.fontSize);
	var textColor = (_e = widgetColor !== null && widgetColor !== void 0 ? widgetColor : fieldColor) !== null && _e !== void 0 ? _e : black;
	if (widgetColor || widgetFontSize !== void 0) updateDefaultAppearance(widget, textColor, font, fontSize);
	else updateDefaultAppearance(button.acroField, textColor, font, fontSize);
	var options = {
		x: 0 + borderWidth / 2,
		y: 0 + borderWidth / 2,
		width: width - borderWidth,
		height: height - borderWidth,
		borderWidth,
		borderColor,
		textColor,
		font: font.name,
		fontSize
	};
	return {
		normal: __spreadArrays(rotate, drawButton(__assign(__assign({}, options), {
			color: normalBackgroundColor,
			textLines: [normalLayout.line]
		}))),
		down: __spreadArrays(rotate, drawButton(__assign(__assign({}, options), {
			color: downBackgroundColor,
			textLines: [downLayout.line]
		})))
	};
};
var defaultTextFieldAppearanceProvider = function(textField, widget, font) {
	var _a, _b, _c, _d;
	var widgetColor = getDefaultColor(widget);
	var fieldColor = getDefaultColor(textField.acroField);
	var widgetFontSize = getDefaultFontSize(widget);
	var fieldFontSize = getDefaultFontSize(textField.acroField);
	var rectangle = widget.getRectangle();
	var ap = widget.getAppearanceCharacteristics();
	var bs = widget.getBorderStyle();
	var text = (_a = textField.getText()) !== null && _a !== void 0 ? _a : "";
	var borderWidth = (_b = bs === null || bs === void 0 ? void 0 : bs.getWidth()) !== null && _b !== void 0 ? _b : 0;
	var rotation = reduceRotation(ap === null || ap === void 0 ? void 0 : ap.getRotation());
	var _e = adjustDimsForRotation(rectangle, rotation), width = _e.width, height = _e.height;
	var rotate = rotateInPlace(__assign(__assign({}, rectangle), { rotation }));
	var black = rgb(0, 0, 0);
	var borderColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBorderColor());
	var normalBackgroundColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor());
	var textLines;
	var fontSize;
	var padding = textField.isCombed() ? 0 : 1;
	var bounds = {
		x: borderWidth + padding,
		y: borderWidth + padding,
		width: width - (borderWidth + padding) * 2,
		height: height - (borderWidth + padding) * 2
	};
	if (textField.isMultiline()) {
		var layout = layoutMultilineText(text, {
			alignment: textField.getAlignment(),
			fontSize: widgetFontSize !== null && widgetFontSize !== void 0 ? widgetFontSize : fieldFontSize,
			font,
			bounds
		});
		textLines = layout.lines;
		fontSize = layout.fontSize;
	} else if (textField.isCombed()) {
		var layout = layoutCombedText(text, {
			fontSize: widgetFontSize !== null && widgetFontSize !== void 0 ? widgetFontSize : fieldFontSize,
			font,
			bounds,
			cellCount: (_c = textField.getMaxLength()) !== null && _c !== void 0 ? _c : 0
		});
		textLines = layout.cells;
		fontSize = layout.fontSize;
	} else {
		var layout = layoutSinglelineText(text, {
			alignment: textField.getAlignment(),
			fontSize: widgetFontSize !== null && widgetFontSize !== void 0 ? widgetFontSize : fieldFontSize,
			font,
			bounds
		});
		textLines = [layout.line];
		fontSize = layout.fontSize;
	}
	var textColor = (_d = widgetColor !== null && widgetColor !== void 0 ? widgetColor : fieldColor) !== null && _d !== void 0 ? _d : black;
	if (widgetColor || widgetFontSize !== void 0) updateDefaultAppearance(widget, textColor, font, fontSize);
	else updateDefaultAppearance(textField.acroField, textColor, font, fontSize);
	return __spreadArrays(rotate, drawTextField({
		x: 0 + borderWidth / 2,
		y: 0 + borderWidth / 2,
		width: width - borderWidth,
		height: height - borderWidth,
		borderWidth: borderWidth !== null && borderWidth !== void 0 ? borderWidth : 0,
		borderColor,
		textColor,
		font: font.name,
		fontSize,
		color: normalBackgroundColor,
		textLines,
		padding
	}));
};
var defaultDropdownAppearanceProvider = function(dropdown, widget, font) {
	var _a, _b, _c;
	var widgetColor = getDefaultColor(widget);
	var fieldColor = getDefaultColor(dropdown.acroField);
	var widgetFontSize = getDefaultFontSize(widget);
	var fieldFontSize = getDefaultFontSize(dropdown.acroField);
	var rectangle = widget.getRectangle();
	var ap = widget.getAppearanceCharacteristics();
	var bs = widget.getBorderStyle();
	var text = (_a = dropdown.getSelected()[0]) !== null && _a !== void 0 ? _a : "";
	var borderWidth = (_b = bs === null || bs === void 0 ? void 0 : bs.getWidth()) !== null && _b !== void 0 ? _b : 0;
	var rotation = reduceRotation(ap === null || ap === void 0 ? void 0 : ap.getRotation());
	var _d = adjustDimsForRotation(rectangle, rotation), width = _d.width, height = _d.height;
	var rotate = rotateInPlace(__assign(__assign({}, rectangle), { rotation }));
	var black = rgb(0, 0, 0);
	var borderColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBorderColor());
	var normalBackgroundColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor());
	var padding = 1;
	var bounds = {
		x: borderWidth + padding,
		y: borderWidth + padding,
		width: width - (borderWidth + padding) * 2,
		height: height - (borderWidth + padding) * 2
	};
	var _e = layoutSinglelineText(text, {
		alignment: TextAlignment.Left,
		fontSize: widgetFontSize !== null && widgetFontSize !== void 0 ? widgetFontSize : fieldFontSize,
		font,
		bounds
	}), line = _e.line, fontSize = _e.fontSize;
	var textColor = (_c = widgetColor !== null && widgetColor !== void 0 ? widgetColor : fieldColor) !== null && _c !== void 0 ? _c : black;
	if (widgetColor || widgetFontSize !== void 0) updateDefaultAppearance(widget, textColor, font, fontSize);
	else updateDefaultAppearance(dropdown.acroField, textColor, font, fontSize);
	return __spreadArrays(rotate, drawTextField({
		x: 0 + borderWidth / 2,
		y: 0 + borderWidth / 2,
		width: width - borderWidth,
		height: height - borderWidth,
		borderWidth: borderWidth !== null && borderWidth !== void 0 ? borderWidth : 0,
		borderColor,
		textColor,
		font: font.name,
		fontSize,
		color: normalBackgroundColor,
		textLines: [line],
		padding
	}));
};
var defaultOptionListAppearanceProvider = function(optionList, widget, font) {
	var _a, _b;
	var widgetColor = getDefaultColor(widget);
	var fieldColor = getDefaultColor(optionList.acroField);
	var widgetFontSize = getDefaultFontSize(widget);
	var fieldFontSize = getDefaultFontSize(optionList.acroField);
	var rectangle = widget.getRectangle();
	var ap = widget.getAppearanceCharacteristics();
	var bs = widget.getBorderStyle();
	var borderWidth = (_a = bs === null || bs === void 0 ? void 0 : bs.getWidth()) !== null && _a !== void 0 ? _a : 0;
	var rotation = reduceRotation(ap === null || ap === void 0 ? void 0 : ap.getRotation());
	var _c = adjustDimsForRotation(rectangle, rotation), width = _c.width, height = _c.height;
	var rotate = rotateInPlace(__assign(__assign({}, rectangle), { rotation }));
	var black = rgb(0, 0, 0);
	var borderColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBorderColor());
	var normalBackgroundColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor());
	var options = optionList.getOptions();
	var selected = optionList.getSelected();
	if (optionList.isSorted()) options.sort();
	var text = "";
	for (var idx = 0, len = options.length; idx < len; idx++) {
		text += options[idx];
		if (idx < len - 1) text += "\n";
	}
	var padding = 1;
	var bounds = {
		x: borderWidth + padding,
		y: borderWidth + padding,
		width: width - (borderWidth + padding) * 2,
		height: height - (borderWidth + padding) * 2
	};
	var _d = layoutMultilineText(text, {
		alignment: TextAlignment.Left,
		fontSize: widgetFontSize !== null && widgetFontSize !== void 0 ? widgetFontSize : fieldFontSize,
		font,
		bounds
	}), lines = _d.lines, fontSize = _d.fontSize, lineHeight = _d.lineHeight;
	var selectedLines = [];
	for (var idx = 0, len = lines.length; idx < len; idx++) {
		var line = lines[idx];
		if (selected.includes(line.text)) selectedLines.push(idx);
	}
	var blue = rgb(153 / 255, 193 / 255, 218 / 255);
	var textColor = (_b = widgetColor !== null && widgetColor !== void 0 ? widgetColor : fieldColor) !== null && _b !== void 0 ? _b : black;
	if (widgetColor || widgetFontSize !== void 0) updateDefaultAppearance(widget, textColor, font, fontSize);
	else updateDefaultAppearance(optionList.acroField, textColor, font, fontSize);
	return __spreadArrays(rotate, drawOptionList({
		x: 0 + borderWidth / 2,
		y: 0 + borderWidth / 2,
		width: width - borderWidth,
		height: height - borderWidth,
		borderWidth: borderWidth !== null && borderWidth !== void 0 ? borderWidth : 0,
		borderColor,
		textColor,
		font: font.name,
		fontSize,
		color: normalBackgroundColor,
		textLines: lines,
		lineHeight,
		selectedColor: blue,
		selectedLines,
		padding
	}));
};
//#endregion
//#region node_modules/pdf-lib/es/api/PDFEmbeddedPage.js
/**
* Represents a PDF page that has been embedded in a [[PDFDocument]].
*/
var PDFEmbeddedPage = function() {
	function PDFEmbeddedPage(ref, doc, embedder) {
		this.alreadyEmbedded = false;
		assertIs(ref, "ref", [[PDFRef, "PDFRef"]]);
		assertIs(doc, "doc", [[PDFDocument, "PDFDocument"]]);
		assertIs(embedder, "embedder", [[PDFPageEmbedder, "PDFPageEmbedder"]]);
		this.ref = ref;
		this.doc = doc;
		this.width = embedder.width;
		this.height = embedder.height;
		this.embedder = embedder;
	}
	/**
	* Compute the width and height of this page after being scaled by the
	* given `factor`. For example:
	* ```js
	* embeddedPage.width  // => 500
	* embeddedPage.height // => 250
	*
	* const scaled = embeddedPage.scale(0.5)
	* scaled.width  // => 250
	* scaled.height // => 125
	* ```
	* This operation is often useful before drawing a page with
	* [[PDFPage.drawPage]] to compute the `width` and `height` options.
	* @param factor The factor by which this page should be scaled.
	* @returns The width and height of the page after being scaled.
	*/
	PDFEmbeddedPage.prototype.scale = function(factor) {
		assertIs(factor, "factor", ["number"]);
		return {
			width: this.width * factor,
			height: this.height * factor
		};
	};
	/**
	* Get the width and height of this page. For example:
	* ```js
	* const { width, height } = embeddedPage.size()
	* ```
	* @returns The width and height of the page.
	*/
	PDFEmbeddedPage.prototype.size = function() {
		return this.scale(1);
	};
	/**
	* > **NOTE:** You probably don't need to call this method directly. The
	* > [[PDFDocument.save]] and [[PDFDocument.saveAsBase64]] methods will
	* > automatically ensure all embeddable pages get embedded.
	*
	* Embed this embeddable page in its document.
	*
	* @returns Resolves when the embedding is complete.
	*/
	PDFEmbeddedPage.prototype.embed = function() {
		return __awaiter(this, void 0, void 0, function() {
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						if (!!this.alreadyEmbedded) return [3, 2];
						return [4, this.embedder.embedIntoContext(this.doc.context, this.ref)];
					case 1:
						_a.sent();
						this.alreadyEmbedded = true;
						_a.label = 2;
					case 2: return [2];
				}
			});
		});
	};
	/**
	* > **NOTE:** You probably don't want to call this method directly. Instead,
	* > consider using the [[PDFDocument.embedPdf]] and
	* > [[PDFDocument.embedPage]] methods, which will create instances of
	* > [[PDFEmbeddedPage]] for you.
	*
	* Create an instance of [[PDFEmbeddedPage]] from an existing ref and embedder
	*
	* @param ref The unique reference for this embedded page.
	* @param doc The document to which the embedded page will belong.
	* @param embedder The embedder that will be used to embed the page.
	*/
	PDFEmbeddedPage.of = function(ref, doc, embedder) {
		return new PDFEmbeddedPage(ref, doc, embedder);
	};
	return PDFEmbeddedPage;
}();
//#endregion
//#region node_modules/pdf-lib/es/api/PDFFont.js
/**
* Represents a font that has been embedded in a [[PDFDocument]].
*/
var PDFFont = function() {
	function PDFFont(ref, doc, embedder) {
		this.modified = true;
		assertIs(ref, "ref", [[PDFRef, "PDFRef"]]);
		assertIs(doc, "doc", [[PDFDocument, "PDFDocument"]]);
		assertIs(embedder, "embedder", [[CustomFontEmbedder, "CustomFontEmbedder"], [StandardFontEmbedder, "StandardFontEmbedder"]]);
		this.ref = ref;
		this.doc = doc;
		this.name = embedder.fontName;
		this.embedder = embedder;
	}
	/**
	* > **NOTE:** You probably don't need to call this method directly. The
	* > [[PDFPage.drawText]] method will automatically encode the text it is
	* > given.
	*
	* Encodes a string of text in this font.
	*
	* @param text The text to be encoded.
	* @returns The encoded text as a hex string.
	*/
	PDFFont.prototype.encodeText = function(text) {
		assertIs(text, "text", ["string"]);
		this.modified = true;
		return this.embedder.encodeText(text);
	};
	/**
	* Measure the width of a string of text drawn in this font at a given size.
	* For example:
	* ```js
	* const width = font.widthOfTextAtSize('Foo Bar Qux Baz', 36)
	* ```
	* @param text The string of text to be measured.
	* @param size The font size to be used for this measurement.
	* @returns The width of the string of text when drawn in this font at the
	*          given size.
	*/
	PDFFont.prototype.widthOfTextAtSize = function(text, size) {
		assertIs(text, "text", ["string"]);
		assertIs(size, "size", ["number"]);
		return this.embedder.widthOfTextAtSize(text, size);
	};
	/**
	* Measure the height of this font at a given size. For example:
	* ```js
	* const height = font.heightAtSize(24)
	* ```
	*
	* The `options.descender` value controls whether or not the font's
	* descender is included in the height calculation.
	*
	* @param size The font size to be used for this measurement.
	* @param options The options to be used when computing this measurement.
	* @returns The height of this font at the given size.
	*/
	PDFFont.prototype.heightAtSize = function(size, options) {
		var _a;
		assertIs(size, "size", ["number"]);
		assertOrUndefined(options === null || options === void 0 ? void 0 : options.descender, "options.descender", ["boolean"]);
		return this.embedder.heightOfFontAtSize(size, { descender: (_a = options === null || options === void 0 ? void 0 : options.descender) !== null && _a !== void 0 ? _a : true });
	};
	/**
	* Compute the font size at which this font is a given height. For example:
	* ```js
	* const fontSize = font.sizeAtHeight(12)
	* ```
	* @param height The height to be used for this calculation.
	* @returns The font size at which this font is the given height.
	*/
	PDFFont.prototype.sizeAtHeight = function(height) {
		assertIs(height, "height", ["number"]);
		return this.embedder.sizeOfFontAtHeight(height);
	};
	/**
	* Get the set of unicode code points that can be represented by this font.
	* @returns The set of unicode code points supported by this font.
	*/
	PDFFont.prototype.getCharacterSet = function() {
		if (this.embedder instanceof StandardFontEmbedder) return this.embedder.encoding.supportedCodePoints;
		else return this.embedder.font.characterSet;
	};
	/**
	* > **NOTE:** You probably don't need to call this method directly. The
	* > [[PDFDocument.save]] and [[PDFDocument.saveAsBase64]] methods will
	* > automatically ensure all fonts get embedded.
	*
	* Embed this font in its document.
	*
	* @returns Resolves when the embedding is complete.
	*/
	PDFFont.prototype.embed = function() {
		return __awaiter(this, void 0, void 0, function() {
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						if (!this.modified) return [3, 2];
						return [4, this.embedder.embedIntoContext(this.doc.context, this.ref)];
					case 1:
						_a.sent();
						this.modified = false;
						_a.label = 2;
					case 2: return [2];
				}
			});
		});
	};
	/**
	* > **NOTE:** You probably don't want to call this method directly. Instead,
	* > consider using the [[PDFDocument.embedFont]] and
	* > [[PDFDocument.embedStandardFont]] methods, which will create instances
	* > of [[PDFFont]] for you.
	*
	* Create an instance of [[PDFFont]] from an existing ref and embedder
	*
	* @param ref The unique reference for this font.
	* @param doc The document to which the font will belong.
	* @param embedder The embedder that will be used to embed the font.
	*/
	PDFFont.of = function(ref, doc, embedder) {
		return new PDFFont(ref, doc, embedder);
	};
	return PDFFont;
}();
//#endregion
//#region node_modules/pdf-lib/es/api/PDFImage.js
/**
* Represents an image that has been embedded in a [[PDFDocument]].
*/
var PDFImage = function() {
	function PDFImage(ref, doc, embedder) {
		assertIs(ref, "ref", [[PDFRef, "PDFRef"]]);
		assertIs(doc, "doc", [[PDFDocument, "PDFDocument"]]);
		assertIs(embedder, "embedder", [[JpegEmbedder, "JpegEmbedder"], [PngEmbedder, "PngEmbedder"]]);
		this.ref = ref;
		this.doc = doc;
		this.width = embedder.width;
		this.height = embedder.height;
		this.embedder = embedder;
	}
	/**
	* Compute the width and height of this image after being scaled by the
	* given `factor`. For example:
	* ```js
	* image.width  // => 500
	* image.height // => 250
	*
	* const scaled = image.scale(0.5)
	* scaled.width  // => 250
	* scaled.height // => 125
	* ```
	* This operation is often useful before drawing an image with
	* [[PDFPage.drawImage]] to compute the `width` and `height` options.
	* @param factor The factor by which this image should be scaled.
	* @returns The width and height of the image after being scaled.
	*/
	PDFImage.prototype.scale = function(factor) {
		assertIs(factor, "factor", ["number"]);
		return {
			width: this.width * factor,
			height: this.height * factor
		};
	};
	/**
	* Get the width and height of this image after scaling it as large as
	* possible while maintaining its aspect ratio and not exceeding the
	* specified `width` and `height`. For example:
	* ```
	* image.width  // => 500
	* image.height // => 250
	*
	* const scaled = image.scaleToFit(750, 1000)
	* scaled.width  // => 750
	* scaled.height // => 375
	* ```
	* The `width` and `height` parameters can also be thought of as the width
	* and height of a box that the scaled image must fit within.
	* @param width The bounding box's width.
	* @param height The bounding box's height.
	* @returns The width and height of the image after being scaled.
	*/
	PDFImage.prototype.scaleToFit = function(width, height) {
		assertIs(width, "width", ["number"]);
		assertIs(height, "height", ["number"]);
		var imgWidthScale = width / this.width;
		var imgHeightScale = height / this.height;
		var scale = Math.min(imgWidthScale, imgHeightScale);
		return this.scale(scale);
	};
	/**
	* Get the width and height of this image. For example:
	* ```js
	* const { width, height } = image.size()
	* ```
	* @returns The width and height of the image.
	*/
	PDFImage.prototype.size = function() {
		return this.scale(1);
	};
	/**
	* > **NOTE:** You probably don't need to call this method directly. The
	* > [[PDFDocument.save]] and [[PDFDocument.saveAsBase64]] methods will
	* > automatically ensure all images get embedded.
	*
	* Embed this image in its document.
	*
	* @returns Resolves when the embedding is complete.
	*/
	PDFImage.prototype.embed = function() {
		return __awaiter(this, void 0, void 0, function() {
			var _a, doc, ref;
			return __generator(this, function(_b) {
				switch (_b.label) {
					case 0:
						if (!this.embedder) return [2];
						if (!this.embedTask) {
							_a = this, doc = _a.doc, ref = _a.ref;
							this.embedTask = this.embedder.embedIntoContext(doc.context, ref);
						}
						return [4, this.embedTask];
					case 1:
						_b.sent();
						this.embedder = void 0;
						return [2];
				}
			});
		});
	};
	/**
	* > **NOTE:** You probably don't want to call this method directly. Instead,
	* > consider using the [[PDFDocument.embedPng]] and [[PDFDocument.embedJpg]]
	* > methods, which will create instances of [[PDFImage]] for you.
	*
	* Create an instance of [[PDFImage]] from an existing ref and embedder
	*
	* @param ref The unique reference for this image.
	* @param doc The document to which the image will belong.
	* @param embedder The embedder that will be used to embed the image.
	*/
	PDFImage.of = function(ref, doc, embedder) {
		return new PDFImage(ref, doc, embedder);
	};
	return PDFImage;
}();
//#endregion
//#region node_modules/pdf-lib/es/api/image/alignment.js
var ImageAlignment;
(function(ImageAlignment) {
	ImageAlignment[ImageAlignment["Left"] = 0] = "Left";
	ImageAlignment[ImageAlignment["Center"] = 1] = "Center";
	ImageAlignment[ImageAlignment["Right"] = 2] = "Right";
})(ImageAlignment || (ImageAlignment = {}));
//#endregion
//#region node_modules/pdf-lib/es/api/form/PDFField.js
var assertFieldAppearanceOptions = function(options) {
	assertOrUndefined(options === null || options === void 0 ? void 0 : options.x, "options.x", ["number"]);
	assertOrUndefined(options === null || options === void 0 ? void 0 : options.y, "options.y", ["number"]);
	assertOrUndefined(options === null || options === void 0 ? void 0 : options.width, "options.width", ["number"]);
	assertOrUndefined(options === null || options === void 0 ? void 0 : options.height, "options.height", ["number"]);
	assertOrUndefined(options === null || options === void 0 ? void 0 : options.textColor, "options.textColor", [[Object, "Color"]]);
	assertOrUndefined(options === null || options === void 0 ? void 0 : options.backgroundColor, "options.backgroundColor", [[Object, "Color"]]);
	assertOrUndefined(options === null || options === void 0 ? void 0 : options.borderColor, "options.borderColor", [[Object, "Color"]]);
	assertOrUndefined(options === null || options === void 0 ? void 0 : options.borderWidth, "options.borderWidth", ["number"]);
	assertOrUndefined(options === null || options === void 0 ? void 0 : options.rotate, "options.rotate", [[Object, "Rotation"]]);
};
/**
* Represents a field of a [[PDFForm]].
*
* This class is effectively abstract. All fields in a [[PDFForm]] will
* actually be an instance of a subclass of this class.
*
* Note that each field in a PDF is represented by a single field object.
* However, a given field object may be rendered at multiple locations within
* the document (across one or more pages). The rendering of a field is
* controlled by its widgets. Each widget causes its field to be displayed at a
* particular location in the document.
*
* Most of the time each field in a PDF has only a single widget, and thus is
* only rendered once. However, if a field is rendered multiple times, it will
* have multiple widgets - one for each location it is rendered.
*
* This abstraction of field objects and widgets is defined in the PDF
* specification and dictates how PDF files store fields and where they are
* to be rendered.
*/
var PDFField = function() {
	function PDFField(acroField, ref, doc) {
		assertIs(acroField, "acroField", [[PDFAcroTerminal, "PDFAcroTerminal"]]);
		assertIs(ref, "ref", [[PDFRef, "PDFRef"]]);
		assertIs(doc, "doc", [[PDFDocument, "PDFDocument"]]);
		this.acroField = acroField;
		this.ref = ref;
		this.doc = doc;
	}
	/**
	* Get the fully qualified name of this field. For example:
	* ```js
	* const fields = form.getFields()
	* fields.forEach(field => {
	*   const name = field.getName()
	*   console.log('Field name:', name)
	* })
	* ```
	* Note that PDF fields are structured as a tree. Each field is the
	* descendent of a series of ancestor nodes all the way up to the form node,
	* which is always the root of the tree. Each node in the tree (except for
	* the form node) has a partial name. Partial names can be composed of any
	* unicode characters except a period (`.`). The fully qualified name of a
	* field is composed of the partial names of all its ancestors joined
	* with periods. This means that splitting the fully qualified name on
	* periods and taking the last element of the resulting array will give you
	* the partial name of a specific field.
	* @returns The fully qualified name of this field.
	*/
	PDFField.prototype.getName = function() {
		var _a;
		return (_a = this.acroField.getFullyQualifiedName()) !== null && _a !== void 0 ? _a : "";
	};
	/**
	* Returns `true` if this field is read only. This means that PDF readers
	* will not allow users to interact with the field or change its value. See
	* [[PDFField.enableReadOnly]] and [[PDFField.disableReadOnly]].
	* For example:
	* ```js
	* const field = form.getField('some.field')
	* if (field.isReadOnly()) console.log('Read only is enabled')
	* ```
	* @returns Whether or not this is a read only field.
	*/
	PDFField.prototype.isReadOnly = function() {
		return this.acroField.hasFlag(AcroFieldFlags.ReadOnly);
	};
	/**
	* Prevent PDF readers from allowing users to interact with this field or
	* change its value. The field will not respond to mouse or keyboard input.
	* For example:
	* ```js
	* const field = form.getField('some.field')
	* field.enableReadOnly()
	* ```
	* Useful for fields whose values are computed, imported from a database, or
	* prefilled by software before being displayed to the user.
	*/
	PDFField.prototype.enableReadOnly = function() {
		this.acroField.setFlagTo(AcroFieldFlags.ReadOnly, true);
	};
	/**
	* Allow users to interact with this field and change its value in PDF
	* readers via mouse and keyboard input. For example:
	* ```js
	* const field = form.getField('some.field')
	* field.disableReadOnly()
	* ```
	*/
	PDFField.prototype.disableReadOnly = function() {
		this.acroField.setFlagTo(AcroFieldFlags.ReadOnly, false);
	};
	/**
	* Returns `true` if this field must have a value when the form is submitted.
	* See [[PDFField.enableRequired]] and [[PDFField.disableRequired]].
	* For example:
	* ```js
	* const field = form.getField('some.field')
	* if (field.isRequired()) console.log('Field is required')
	* ```
	* @returns Whether or not this field is required.
	*/
	PDFField.prototype.isRequired = function() {
		return this.acroField.hasFlag(AcroFieldFlags.Required);
	};
	/**
	* Require this field to have a value when the form is submitted.
	* For example:
	* ```js
	* const field = form.getField('some.field')
	* field.enableRequired()
	* ```
	*/
	PDFField.prototype.enableRequired = function() {
		this.acroField.setFlagTo(AcroFieldFlags.Required, true);
	};
	/**
	* Do not require this field to have a value when the form is submitted.
	* For example:
	* ```js
	* const field = form.getField('some.field')
	* field.disableRequired()
	* ```
	*/
	PDFField.prototype.disableRequired = function() {
		this.acroField.setFlagTo(AcroFieldFlags.Required, false);
	};
	/**
	* Returns `true` if this field's value should be exported when the form is
	* submitted. See [[PDFField.enableExporting]] and
	* [[PDFField.disableExporting]].
	* For example:
	* ```js
	* const field = form.getField('some.field')
	* if (field.isExported()) console.log('Exporting is enabled')
	* ```
	* @returns Whether or not this field's value should be exported.
	*/
	PDFField.prototype.isExported = function() {
		return !this.acroField.hasFlag(AcroFieldFlags.NoExport);
	};
	/**
	* Indicate that this field's value should be exported when the form is
	* submitted in a PDF reader. For example:
	* ```js
	* const field = form.getField('some.field')
	* field.enableExporting()
	* ```
	*/
	PDFField.prototype.enableExporting = function() {
		this.acroField.setFlagTo(AcroFieldFlags.NoExport, false);
	};
	/**
	* Indicate that this field's value should **not** be exported when the form
	* is submitted in a PDF reader. For example:
	* ```js
	* const field = form.getField('some.field')
	* field.disableExporting()
	* ```
	*/
	PDFField.prototype.disableExporting = function() {
		this.acroField.setFlagTo(AcroFieldFlags.NoExport, true);
	};
	/** @ignore */
	PDFField.prototype.needsAppearancesUpdate = function() {
		throw new MethodNotImplementedError(this.constructor.name, "needsAppearancesUpdate");
	};
	/** @ignore */
	PDFField.prototype.defaultUpdateAppearances = function(_font) {
		throw new MethodNotImplementedError(this.constructor.name, "defaultUpdateAppearances");
	};
	PDFField.prototype.markAsDirty = function() {
		this.doc.getForm().markFieldAsDirty(this.ref);
	};
	PDFField.prototype.markAsClean = function() {
		this.doc.getForm().markFieldAsClean(this.ref);
	};
	PDFField.prototype.isDirty = function() {
		return this.doc.getForm().fieldIsDirty(this.ref);
	};
	PDFField.prototype.createWidget = function(options) {
		var _a;
		var textColor = options.textColor;
		var backgroundColor = options.backgroundColor;
		var borderColor = options.borderColor;
		var borderWidth = options.borderWidth;
		var degreesAngle = toDegrees(options.rotate);
		var caption = options.caption;
		var x = options.x;
		var y = options.y;
		var width = options.width + borderWidth;
		var height = options.height + borderWidth;
		var hidden = Boolean(options.hidden);
		var pageRef = options.page;
		assertMultiple(degreesAngle, "degreesAngle", 90);
		var widget = PDFWidgetAnnotation.create(this.doc.context, this.ref);
		var rect = rotateRectangle({
			x,
			y,
			width,
			height
		}, borderWidth, degreesAngle);
		widget.setRectangle(rect);
		if (pageRef) widget.setP(pageRef);
		var ac = widget.getOrCreateAppearanceCharacteristics();
		if (backgroundColor) ac.setBackgroundColor(colorToComponents(backgroundColor));
		ac.setRotation(degreesAngle);
		if (caption) ac.setCaptions({ normal: caption });
		if (borderColor) ac.setBorderColor(colorToComponents(borderColor));
		var bs = widget.getOrCreateBorderStyle();
		if (borderWidth !== void 0) bs.setWidth(borderWidth);
		widget.setFlagTo(AnnotationFlags.Print, true);
		widget.setFlagTo(AnnotationFlags.Hidden, hidden);
		widget.setFlagTo(AnnotationFlags.Invisible, false);
		if (textColor) {
			var newDa = ((_a = this.acroField.getDefaultAppearance()) !== null && _a !== void 0 ? _a : "") + "\n" + setFillingColor(textColor).toString();
			this.acroField.setDefaultAppearance(newDa);
		}
		return widget;
	};
	PDFField.prototype.updateWidgetAppearanceWithFont = function(widget, font, _a) {
		var normal = _a.normal, rollover = _a.rollover, down = _a.down;
		this.updateWidgetAppearances(widget, {
			normal: this.createAppearanceStream(widget, normal, font),
			rollover: rollover && this.createAppearanceStream(widget, rollover, font),
			down: down && this.createAppearanceStream(widget, down, font)
		});
	};
	PDFField.prototype.updateOnOffWidgetAppearance = function(widget, onValue, _a) {
		var normal = _a.normal, rollover = _a.rollover, down = _a.down;
		this.updateWidgetAppearances(widget, {
			normal: this.createAppearanceDict(widget, normal, onValue),
			rollover: rollover && this.createAppearanceDict(widget, rollover, onValue),
			down: down && this.createAppearanceDict(widget, down, onValue)
		});
	};
	PDFField.prototype.updateWidgetAppearances = function(widget, _a) {
		var normal = _a.normal, rollover = _a.rollover, down = _a.down;
		widget.setNormalAppearance(normal);
		if (rollover) widget.setRolloverAppearance(rollover);
		else widget.removeRolloverAppearance();
		if (down) widget.setDownAppearance(down);
		else widget.removeDownAppearance();
	};
	PDFField.prototype.createAppearanceStream = function(widget, appearance, font) {
		var _a;
		var context = this.acroField.dict.context;
		var _b = widget.getRectangle(), width = _b.width, height = _b.height;
		var Resources = font && { Font: (_a = {}, _a[font.name] = font.ref, _a) };
		var stream = context.formXObject(appearance, {
			Resources,
			BBox: context.obj([
				0,
				0,
				width,
				height
			]),
			Matrix: context.obj([
				1,
				0,
				0,
				1,
				0,
				0
			])
		});
		return context.register(stream);
	};
	/**
	* Create a FormXObject of the supplied image and add it to context.
	* The FormXObject size is calculated based on the widget (including
	* the alignment).
	* @param widget The widget that should display the image.
	* @param alignment The alignment of the image.
	* @param image The image that should be displayed.
	* @returns The ref for the FormXObject that was added to the context.
	*/
	PDFField.prototype.createImageAppearanceStream = function(widget, image, alignment) {
		var _a;
		var _b;
		var context = this.acroField.dict.context;
		var rectangle = widget.getRectangle();
		var ap = widget.getAppearanceCharacteristics();
		var bs = widget.getBorderStyle();
		var borderWidth = (_b = bs === null || bs === void 0 ? void 0 : bs.getWidth()) !== null && _b !== void 0 ? _b : 0;
		var rotation = reduceRotation(ap === null || ap === void 0 ? void 0 : ap.getRotation());
		var rotate = rotateInPlace(__assign(__assign({}, rectangle), { rotation }));
		var adj = adjustDimsForRotation(rectangle, rotation);
		var imageDims = image.scaleToFit(adj.width - borderWidth * 2, adj.height - borderWidth * 2);
		var options = {
			x: borderWidth,
			y: borderWidth,
			width: imageDims.width,
			height: imageDims.height,
			rotate: degrees(0),
			xSkew: degrees(0),
			ySkew: degrees(0)
		};
		if (alignment === ImageAlignment.Center) {
			options.x += (adj.width - borderWidth * 2) / 2 - imageDims.width / 2;
			options.y += (adj.height - borderWidth * 2) / 2 - imageDims.height / 2;
		} else if (alignment === ImageAlignment.Right) {
			options.x = adj.width - borderWidth - imageDims.width;
			options.y = adj.height - borderWidth - imageDims.height;
		}
		var imageName = this.doc.context.addRandomSuffix("Image", 10);
		var appearance = __spreadArrays(rotate, drawImage(imageName, options));
		var Resources = { XObject: (_a = {}, _a[imageName] = image.ref, _a) };
		var stream = context.formXObject(appearance, {
			Resources,
			BBox: context.obj([
				0,
				0,
				rectangle.width,
				rectangle.height
			]),
			Matrix: context.obj([
				1,
				0,
				0,
				1,
				0,
				0
			])
		});
		return context.register(stream);
	};
	PDFField.prototype.createAppearanceDict = function(widget, appearance, onValue) {
		var context = this.acroField.dict.context;
		var onStreamRef = this.createAppearanceStream(widget, appearance.on);
		var offStreamRef = this.createAppearanceStream(widget, appearance.off);
		var appearanceDict = context.obj({});
		appearanceDict.set(onValue, onStreamRef);
		appearanceDict.set(PDFName.of("Off"), offStreamRef);
		return appearanceDict;
	};
	return PDFField;
}();
//#endregion
//#region node_modules/pdf-lib/es/api/form/PDFCheckBox.js
/**
* Represents a check box field of a [[PDFForm]].
*
* [[PDFCheckBox]] fields are interactive boxes that users can click with their
* mouse. This type of [[PDFField]] has two states: `on` and `off`. The purpose
* of a check box is to enable users to select from one or more options, where
* each option is represented by a single check box. Check boxes are typically
* square in shape and display a check mark when they are in the `on` state.
*/
var PDFCheckBox = function(_super) {
	__extends(PDFCheckBox, _super);
	function PDFCheckBox(acroCheckBox, ref, doc) {
		var _this = _super.call(this, acroCheckBox, ref, doc) || this;
		assertIs(acroCheckBox, "acroCheckBox", [[PDFAcroCheckBox, "PDFAcroCheckBox"]]);
		_this.acroField = acroCheckBox;
		return _this;
	}
	/**
	* Mark this check box. This operation is analogous to a human user clicking
	* a check box to fill it in a PDF reader. This method will update the
	* underlying state of the check box field to indicate it has been selected.
	* PDF libraries and readers will be able to extract this value from the
	* saved document and determine that it was selected.
	*
	* For example:
	* ```js
	* const checkBox = form.getCheckBox('some.checkBox.field')
	* checkBox.check()
	* ```
	*
	* This method will mark this check box as dirty, causing its appearance
	* streams to be updated when either [[PDFDocument.save]] or
	* [[PDFForm.updateFieldAppearances]] is called. The updated appearance
	* streams will display a check mark inside the widgets of this check box
	* field.
	*/
	PDFCheckBox.prototype.check = function() {
		var _a;
		var onValue = (_a = this.acroField.getOnValue()) !== null && _a !== void 0 ? _a : PDFName.of("Yes");
		this.markAsDirty();
		this.acroField.setValue(onValue);
	};
	/**
	* Clears this check box. This operation is analogous to a human user clicking
	* a check box to unmark it in a PDF reader. This method will update the
	* underlying state of the check box field to indicate it has been deselected.
	* PDF libraries and readers will be able to extract this value from the
	* saved document and determine that it was not selected.
	*
	* For example:
	* ```js
	* const checkBox = form.getCheckBox('some.checkBox.field')
	* checkBox.uncheck()
	* ```
	*
	* This method will mark this check box as dirty. See [[PDFCheckBox.check]]
	* for more details about what this means.
	*/
	PDFCheckBox.prototype.uncheck = function() {
		this.markAsDirty();
		this.acroField.setValue(PDFName.of("Off"));
	};
	/**
	* Returns `true` if this check box is selected (either by a human user via
	* a PDF reader, or else programmatically via software). For example:
	* ```js
	* const checkBox = form.getCheckBox('some.checkBox.field')
	* if (checkBox.isChecked()) console.log('check box is selected')
	* ```
	* @returns Whether or not this check box is selected.
	*/
	PDFCheckBox.prototype.isChecked = function() {
		var onValue = this.acroField.getOnValue();
		return !!onValue && onValue === this.acroField.getValue();
	};
	/**
	* Show this check box on the specified page. For example:
	* ```js
	* const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
	* const page = pdfDoc.addPage()
	*
	* const form = pdfDoc.getForm()
	* const checkBox = form.createCheckBox('some.checkBox.field')
	*
	* checkBox.addToPage(page, {
	*   x: 50,
	*   y: 75,
	*   width: 25,
	*   height: 25,
	*   textColor: rgb(1, 0, 0),
	*   backgroundColor: rgb(0, 1, 0),
	*   borderColor: rgb(0, 0, 1),
	*   borderWidth: 2,
	*   rotate: degrees(90),
	* })
	* ```
	* This will create a new widget for this check box field.
	* @param page The page to which this check box widget should be added.
	* @param options The options to be used when adding this check box widget.
	*/
	PDFCheckBox.prototype.addToPage = function(page, options) {
		var _a, _b, _c, _d, _e, _f;
		assertIs(page, "page", [[PDFPage, "PDFPage"]]);
		assertFieldAppearanceOptions(options);
		if (!options) options = {};
		if (!("textColor" in options)) options.textColor = rgb(0, 0, 0);
		if (!("backgroundColor" in options)) options.backgroundColor = rgb(1, 1, 1);
		if (!("borderColor" in options)) options.borderColor = rgb(0, 0, 0);
		if (!("borderWidth" in options)) options.borderWidth = 1;
		var widget = this.createWidget({
			x: (_a = options.x) !== null && _a !== void 0 ? _a : 0,
			y: (_b = options.y) !== null && _b !== void 0 ? _b : 0,
			width: (_c = options.width) !== null && _c !== void 0 ? _c : 50,
			height: (_d = options.height) !== null && _d !== void 0 ? _d : 50,
			textColor: options.textColor,
			backgroundColor: options.backgroundColor,
			borderColor: options.borderColor,
			borderWidth: (_e = options.borderWidth) !== null && _e !== void 0 ? _e : 0,
			rotate: (_f = options.rotate) !== null && _f !== void 0 ? _f : degrees(0),
			hidden: options.hidden,
			page: page.ref
		});
		var widgetRef = this.doc.context.register(widget.dict);
		this.acroField.addWidget(widgetRef);
		widget.setAppearanceState(PDFName.of("Off"));
		this.updateWidgetAppearance(widget, PDFName.of("Yes"));
		page.node.addAnnot(widgetRef);
	};
	/**
	* Returns `true` if any of this check box's widgets do not have an
	* appearance stream for its current state. For example:
	* ```js
	* const checkBox = form.getCheckBox('some.checkBox.field')
	* if (checkBox.needsAppearancesUpdate()) console.log('Needs update')
	* ```
	* @returns Whether or not this check box needs an appearance update.
	*/
	PDFCheckBox.prototype.needsAppearancesUpdate = function() {
		var _a;
		var widgets = this.acroField.getWidgets();
		for (var idx = 0, len = widgets.length; idx < len; idx++) {
			var widget = widgets[idx];
			var state = widget.getAppearanceState();
			var normal = (_a = widget.getAppearances()) === null || _a === void 0 ? void 0 : _a.normal;
			if (!(normal instanceof PDFDict)) return true;
			if (state && !normal.has(state)) return true;
		}
		return false;
	};
	/**
	* Update the appearance streams for each of this check box's widgets using
	* the default appearance provider for check boxes. For example:
	* ```js
	* const checkBox = form.getCheckBox('some.checkBox.field')
	* checkBox.defaultUpdateAppearances()
	* ```
	*/
	PDFCheckBox.prototype.defaultUpdateAppearances = function() {
		this.updateAppearances();
	};
	/**
	* Update the appearance streams for each of this check box's widgets using
	* the given appearance provider. If no `provider` is passed, the default
	* appearance provider for check boxs will be used. For example:
	* ```js
	* const checkBox = form.getCheckBox('some.checkBox.field')
	* checkBox.updateAppearances((field, widget) => {
	*   ...
	*   return {
	*     normal: { on: drawCheckBox(...), off: drawCheckBox(...) },
	*     down: { on: drawCheckBox(...), off: drawCheckBox(...) },
	*   }
	* })
	* ```
	* @param provider Optionally, the appearance provider to be used for
	*                 generating the contents of the appearance streams.
	*/
	PDFCheckBox.prototype.updateAppearances = function(provider) {
		var _a;
		assertOrUndefined(provider, "provider", [Function]);
		var widgets = this.acroField.getWidgets();
		for (var idx = 0, len = widgets.length; idx < len; idx++) {
			var widget = widgets[idx];
			var onValue = (_a = widget.getOnValue()) !== null && _a !== void 0 ? _a : PDFName.of("Yes");
			if (!onValue) continue;
			this.updateWidgetAppearance(widget, onValue, provider);
		}
		this.markAsClean();
	};
	PDFCheckBox.prototype.updateWidgetAppearance = function(widget, onValue, provider) {
		var appearances = normalizeAppearance((provider !== null && provider !== void 0 ? provider : defaultCheckBoxAppearanceProvider)(this, widget));
		this.updateOnOffWidgetAppearance(widget, onValue, appearances);
	};
	/**
	* > **NOTE:** You probably don't want to call this method directly. Instead,
	* > consider using the [[PDFForm.getCheckBox]] method, which will create an
	* > instance of [[PDFCheckBox]] for you.
	*
	* Create an instance of [[PDFCheckBox]] from an existing acroCheckBox and ref
	*
	* @param acroCheckBox The underlying `PDFAcroCheckBox` for this check box.
	* @param ref The unique reference for this check box.
	* @param doc The document to which this check box will belong.
	*/
	PDFCheckBox.of = function(acroCheckBox, ref, doc) {
		return new PDFCheckBox(acroCheckBox, ref, doc);
	};
	return PDFCheckBox;
}(PDFField);
//#endregion
//#region node_modules/pdf-lib/es/api/form/PDFDropdown.js
/**
* Represents a dropdown field of a [[PDFForm]].
*
* [[PDFDropdown]] fields are interactive text boxes that display a single
* element (the currently selected value). The purpose of a dropdown is to
* enable users to select a single option from a set of possible options. Users
* can click on a dropdown to view the full list of options it provides.
* Clicking on an option in the list will cause it to be selected and displayed
* in the dropdown's text box. Some dropdowns allow users to enter text
* directly into the box from their keyboard, rather than only being allowed to
* choose an option from the list (see [[PDFDropdown.isEditable]]).
*/
var PDFDropdown = function(_super) {
	__extends(PDFDropdown, _super);
	function PDFDropdown(acroComboBox, ref, doc) {
		var _this = _super.call(this, acroComboBox, ref, doc) || this;
		assertIs(acroComboBox, "acroComboBox", [[PDFAcroComboBox, "PDFAcroComboBox"]]);
		_this.acroField = acroComboBox;
		return _this;
	}
	/**
	* Get the list of available options for this dropdown. These options will be
	* displayed to users who click on this dropdown in a PDF reader.
	* For example:
	* ```js
	* const dropdown = form.getDropdown('some.dropdown.field')
	* const options = dropdown.getOptions()
	* console.log('Dropdown options:', options)
	* ```
	* @returns The options for this dropdown.
	*/
	PDFDropdown.prototype.getOptions = function() {
		var rawOptions = this.acroField.getOptions();
		var options = new Array(rawOptions.length);
		for (var idx = 0, len = options.length; idx < len; idx++) {
			var _a = rawOptions[idx], display = _a.display, value = _a.value;
			options[idx] = (display !== null && display !== void 0 ? display : value).decodeText();
		}
		return options;
	};
	/**
	* Get the selected options for this dropdown. These are the values that were
	* selected by a human user via a PDF reader, or programatically via
	* software.
	* For example:
	* ```js
	* const dropdown = form.getDropdown('some.dropdown.field')
	* const selections = dropdown.getSelected()
	* console.log('Dropdown selections:', selections)
	* ```
	* > **NOTE:** Note that PDF readers only display one selected option when
	* > rendering dropdowns. However, the PDF specification does allow for
	* > multiple values to be selected in a dropdown. As such, the `pdf-lib`
	* > API supports this. However, in most cases the array returned by this
	* > method will contain only a single element (or no elements).
	* @returns The selected options in this dropdown.
	*/
	PDFDropdown.prototype.getSelected = function() {
		var values = this.acroField.getValues();
		var selected = new Array(values.length);
		for (var idx = 0, len = values.length; idx < len; idx++) selected[idx] = values[idx].decodeText();
		return selected;
	};
	/**
	* Set the list of options that are available for this dropdown. These are
	* the values that will be available for users to select when they view this
	* dropdown in a PDF reader. Note that preexisting options for this dropdown
	* will be removed. Only the values passed as `options` will be available to
	* select.
	* For example:
	* ```js
	* const dropdown = form.getDropdown('planets.dropdown')
	* dropdown.setOptions(['Earth', 'Mars', 'Pluto', 'Venus'])
	* ```
	* @param options The options that should be available in this dropdown.
	*/
	PDFDropdown.prototype.setOptions = function(options) {
		assertIs(options, "options", [Array]);
		var optionObjects = new Array(options.length);
		for (var idx = 0, len = options.length; idx < len; idx++) optionObjects[idx] = { value: PDFHexString.fromText(options[idx]) };
		this.acroField.setOptions(optionObjects);
	};
	/**
	* Add to the list of options that are available for this dropdown. Users
	* will be able to select these values in a PDF reader. In addition to the
	* values passed as `options`, any preexisting options for this dropdown will
	* still be available for users to select.
	* For example:
	* ```js
	* const dropdown = form.getDropdown('rockets.dropdown')
	* dropdown.addOptions(['Saturn IV', 'Falcon Heavy'])
	* ```
	* @param options New options that should be available in this dropdown.
	*/
	PDFDropdown.prototype.addOptions = function(options) {
		assertIs(options, "options", ["string", Array]);
		var optionsArr = Array.isArray(options) ? options : [options];
		var existingOptions = this.acroField.getOptions();
		var newOptions = new Array(optionsArr.length);
		for (var idx = 0, len = optionsArr.length; idx < len; idx++) newOptions[idx] = { value: PDFHexString.fromText(optionsArr[idx]) };
		this.acroField.setOptions(existingOptions.concat(newOptions));
	};
	/**
	* Select one or more values for this dropdown. This operation is analogous
	* to a human user opening the dropdown in a PDF reader and clicking on a
	* value to select it. This method will update the underlying state of the
	* dropdown to indicate which values have been selected. PDF libraries and
	* readers will be able to extract these values from the saved document and
	* determine which values were selected.
	*
	* For example:
	* ```js
	* const dropdown = form.getDropdown('best.superhero.dropdown')
	* dropdown.select('One Punch Man')
	* ```
	*
	* This method will mark this dropdown as dirty, causing its appearance
	* streams to be updated when either [[PDFDocument.save]] or
	* [[PDFForm.updateFieldAppearances]] is called. The updated streams will
	* display the selected option inside the widgets of this dropdown.
	*
	* **IMPORTANT:** The default font used to update appearance streams is
	* [[StandardFonts.Helvetica]]. Note that this is a WinAnsi font. This means
	* that encoding errors will be thrown if the selected option for this field
	* contains characters outside the WinAnsi character set (the latin alphabet).
	*
	* Embedding a custom font and passing it to
	* [[PDFForm.updateFieldAppearances]] or [[PDFDropdown.updateAppearances]]
	* allows you to generate appearance streams with characters outside the
	* latin alphabet (assuming the custom font supports them).
	*
	* Selecting an option that does not exist in this dropdown's option list
	* (see [[PDFDropdown.getOptions]]) will enable editing on this dropdown
	* (see [[PDFDropdown.enableEditing]]).
	*
	* > **NOTE:** PDF readers only display one selected option when rendering
	* > dropdowns. However, the PDF specification does allow for multiple values
	* > to be selected in a dropdown. As such, the `pdf-lib` API supports this.
	* > However, it is not recommended to select more than one value with this
	* > method, as only one will be visible. [[PDFOptionList]] fields are better
	* > suited for displaying multiple selected values.
	*
	* @param options The options to be selected.
	* @param merge Whether or not existing selections should be preserved.
	*/
	PDFDropdown.prototype.select = function(options, merge) {
		if (merge === void 0) merge = false;
		assertIs(options, "options", ["string", Array]);
		assertIs(merge, "merge", ["boolean"]);
		var optionsArr = Array.isArray(options) ? options : [options];
		var validOptions = this.getOptions();
		if (optionsArr.find(function(option) {
			return !validOptions.includes(option);
		})) this.enableEditing();
		this.markAsDirty();
		if (optionsArr.length > 1 || optionsArr.length === 1 && merge) this.enableMultiselect();
		var values = new Array(optionsArr.length);
		for (var idx = 0, len = optionsArr.length; idx < len; idx++) values[idx] = PDFHexString.fromText(optionsArr[idx]);
		if (merge) {
			var existingValues = this.acroField.getValues();
			this.acroField.setValues(existingValues.concat(values));
		} else this.acroField.setValues(values);
	};
	/**
	* Clear all selected values for this dropdown. This operation is equivalent
	* to selecting an empty list. This method will update the underlying state
	* of the dropdown to indicate that no values have been selected.
	* For example:
	* ```js
	* const dropdown = form.getDropdown('some.dropdown.field')
	* dropdown.clear()
	* ```
	* This method will mark this text field as dirty. See [[PDFDropdown.select]]
	* for more details about what this means.
	*/
	PDFDropdown.prototype.clear = function() {
		this.markAsDirty();
		this.acroField.setValues([]);
	};
	/**
	* Set the font size for this field. Larger font sizes will result in larger
	* text being displayed when PDF readers render this dropdown. Font sizes may
	* be integer or floating point numbers. Supplying a negative font size will
	* cause this method to throw an error.
	*
	* For example:
	* ```js
	* const dropdown = form.getDropdown('some.dropdown.field')
	* dropdown.setFontSize(4)
	* dropdown.setFontSize(15.7)
	* ```
	*
	* > This method depends upon the existence of a default appearance
	* > (`/DA`) string. If this field does not have a default appearance string,
	* > or that string does not contain a font size (via the `Tf` operator),
	* > then this method will throw an error.
	*
	* @param fontSize The font size to be used when rendering text in this field.
	*/
	PDFDropdown.prototype.setFontSize = function(fontSize) {
		assertPositive(fontSize, "fontSize");
		this.acroField.setFontSize(fontSize);
		this.markAsDirty();
	};
	/**
	* Returns `true` if users are allowed to edit the selected value of this
	* dropdown directly and are not constrained by the list of available
	* options. See [[PDFDropdown.enableEditing]] and
	* [[PDFDropdown.disableEditing]]. For example:
	* ```js
	* const dropdown = form.getDropdown('some.dropdown.field')
	* if (dropdown.isEditable()) console.log('Editing is enabled')
	* ```
	* @returns Whether or not this dropdown is editable.
	*/
	PDFDropdown.prototype.isEditable = function() {
		return this.acroField.hasFlag(AcroChoiceFlags.Edit);
	};
	/**
	* Allow users to edit the selected value of this dropdown in PDF readers
	* with their keyboard. This means that the selected value of this dropdown
	* will not be constrained by the list of available options. However, if this
	* dropdown has any available options, users will still be allowed to select
	* from that list.
	* For example:
	* ```js
	* const dropdown = form.getDropdown('some.dropdown.field')
	* dropdown.enableEditing()
	* ```
	*/
	PDFDropdown.prototype.enableEditing = function() {
		this.acroField.setFlagTo(AcroChoiceFlags.Edit, true);
	};
	/**
	* Do not allow users to edit the selected value of this dropdown in PDF
	* readers with their keyboard. This will constrain the selected value of
	* this dropdown to the list of available options. Users will only be able
	* to select an option from that list.
	* For example:
	* ```js
	* const dropdown = form.getDropdown('some.dropdown.field')
	* dropdown.disableEditing()
	* ```
	*/
	PDFDropdown.prototype.disableEditing = function() {
		this.acroField.setFlagTo(AcroChoiceFlags.Edit, false);
	};
	/**
	* Returns `true` if the option list of this dropdown is always displayed
	* in alphabetical order, irrespective of the order in which the options
	* were added to the dropdown. See [[PDFDropdown.enableSorting]] and
	* [[PDFDropdown.disableSorting]]. For example:
	* ```js
	* const dropdown = form.getDropdown('some.dropdown.field')
	* if (dropdown.isSorted()) console.log('Sorting is enabled')
	* ```
	* @returns Whether or not this dropdown's options are sorted.
	*/
	PDFDropdown.prototype.isSorted = function() {
		return this.acroField.hasFlag(AcroChoiceFlags.Sort);
	};
	/**
	* Always display the option list of this dropdown in alphabetical order,
	* irrespective of the order in which the options were added to this dropdown.
	* For example:
	* ```js
	* const dropdown = form.getDropdown('some.dropdown.field')
	* dropdown.enableSorting()
	* ```
	*/
	PDFDropdown.prototype.enableSorting = function() {
		this.acroField.setFlagTo(AcroChoiceFlags.Sort, true);
	};
	/**
	* Do not always display the option list of this dropdown in alphabetical
	* order. Instead, display the options in whichever order they were added
	* to the list. For example:
	* ```js
	* const dropdown = form.getDropdown('some.dropdown.field')
	* dropdown.disableSorting()
	* ```
	*/
	PDFDropdown.prototype.disableSorting = function() {
		this.acroField.setFlagTo(AcroChoiceFlags.Sort, false);
	};
	/**
	* Returns `true` if multiple options can be selected from this dropdown's
	* option list. See [[PDFDropdown.enableMultiselect]] and
	* [[PDFDropdown.disableMultiselect]]. For example:
	* ```js
	* const dropdown = form.getDropdown('some.dropdown.field')
	* if (dropdown.isMultiselect()) console.log('Multiselect is enabled')
	* ```
	* @returns Whether or not multiple options can be selected.
	*/
	PDFDropdown.prototype.isMultiselect = function() {
		return this.acroField.hasFlag(AcroChoiceFlags.MultiSelect);
	};
	/**
	* Allow users to select more than one option from this dropdown's option
	* list. For example:
	* ```js
	* const dropdown = form.getDropdown('some.dropdown.field')
	* dropdown.enableMultiselect()
	* ```
	*/
	PDFDropdown.prototype.enableMultiselect = function() {
		this.acroField.setFlagTo(AcroChoiceFlags.MultiSelect, true);
	};
	/**
	* Do not allow users to select more than one option from this dropdown's
	* option list. For example:
	* ```js
	* const dropdown = form.getDropdown('some.dropdown.field')
	* dropdown.disableMultiselect()
	* ```
	*/
	PDFDropdown.prototype.disableMultiselect = function() {
		this.acroField.setFlagTo(AcroChoiceFlags.MultiSelect, false);
	};
	/**
	* Returns `true` if the selected option should be spell checked by PDF
	* readers. Spell checking will only be performed if this dropdown allows
	* editing (see [[PDFDropdown.isEditable]]). See
	* [[PDFDropdown.enableSpellChecking]] and
	* [[PDFDropdown.disableSpellChecking]]. For example:
	* ```js
	* const dropdown = form.getDropdown('some.dropdown.field')
	* if (dropdown.isSpellChecked()) console.log('Spell checking is enabled')
	* ```
	* @returns Whether or not this dropdown can be spell checked.
	*/
	PDFDropdown.prototype.isSpellChecked = function() {
		return !this.acroField.hasFlag(AcroChoiceFlags.DoNotSpellCheck);
	};
	/**
	* Allow PDF readers to spell check the selected option of this dropdown.
	* For example:
	* ```js
	* const dropdown = form.getDropdown('some.dropdown.field')
	* dropdown.enableSpellChecking()
	* ```
	*/
	PDFDropdown.prototype.enableSpellChecking = function() {
		this.acroField.setFlagTo(AcroChoiceFlags.DoNotSpellCheck, false);
	};
	/**
	* Do not allow PDF readers to spell check the selected option of this
	* dropdown. For example:
	* ```js
	* const dropdown = form.getDropdown('some.dropdown.field')
	* dropdown.disableSpellChecking()
	* ```
	*/
	PDFDropdown.prototype.disableSpellChecking = function() {
		this.acroField.setFlagTo(AcroChoiceFlags.DoNotSpellCheck, true);
	};
	/**
	* Returns `true` if the option selected by a user is stored, or "committed",
	* when the user clicks the option. The alternative is that the user's
	* selection is stored when the user leaves this dropdown field (by clicking
	* outside of it - on another field, for example). See
	* [[PDFDropdown.enableSelectOnClick]] and
	* [[PDFDropdown.disableSelectOnClick]]. For example:
	* ```js
	* const dropdown = form.getDropdown('some.dropdown.field')
	* if (dropdown.isSelectOnClick()) console.log('Select on click is enabled')
	* ```
	* @returns Whether or not options are selected immediately after they are
	*          clicked.
	*/
	PDFDropdown.prototype.isSelectOnClick = function() {
		return this.acroField.hasFlag(AcroChoiceFlags.CommitOnSelChange);
	};
	/**
	* Store the option selected by a user immediately after the user clicks the
	* option. Do not wait for the user to leave this dropdown field (by clicking
	* outside of it - on another field, for example). For example:
	* ```js
	* const dropdown = form.getDropdown('some.dropdown.field')
	* dropdown.enableSelectOnClick()
	* ```
	*/
	PDFDropdown.prototype.enableSelectOnClick = function() {
		this.acroField.setFlagTo(AcroChoiceFlags.CommitOnSelChange, true);
	};
	/**
	* Wait to store the option selected by a user until they leave this dropdown
	* field (by clicking outside of it - on another field, for example).
	* For example:
	* ```js
	* const dropdown = form.getDropdown('some.dropdown.field')
	* dropdown.disableSelectOnClick()
	* ```
	*/
	PDFDropdown.prototype.disableSelectOnClick = function() {
		this.acroField.setFlagTo(AcroChoiceFlags.CommitOnSelChange, false);
	};
	/**
	* Show this dropdown on the specified page. For example:
	* ```js
	* const ubuntuFont = await pdfDoc.embedFont(ubuntuFontBytes)
	* const page = pdfDoc.addPage()
	*
	* const form = pdfDoc.getForm()
	* const dropdown = form.createDropdown('best.gundam')
	* dropdown.setOptions(['Exia', 'Dynames'])
	* dropdown.select('Exia')
	*
	* dropdown.addToPage(page, {
	*   x: 50,
	*   y: 75,
	*   width: 200,
	*   height: 100,
	*   textColor: rgb(1, 0, 0),
	*   backgroundColor: rgb(0, 1, 0),
	*   borderColor: rgb(0, 0, 1),
	*   borderWidth: 2,
	*   rotate: degrees(90),
	*   font: ubuntuFont,
	* })
	* ```
	* This will create a new widget for this dropdown field.
	* @param page The page to which this dropdown widget should be added.
	* @param options The options to be used when adding this dropdown widget.
	*/
	PDFDropdown.prototype.addToPage = function(page, options) {
		var _a, _b, _c, _d, _e, _f, _g;
		assertIs(page, "page", [[PDFPage, "PDFPage"]]);
		assertFieldAppearanceOptions(options);
		if (!options) options = {};
		if (!("textColor" in options)) options.textColor = rgb(0, 0, 0);
		if (!("backgroundColor" in options)) options.backgroundColor = rgb(1, 1, 1);
		if (!("borderColor" in options)) options.borderColor = rgb(0, 0, 0);
		if (!("borderWidth" in options)) options.borderWidth = 1;
		var widget = this.createWidget({
			x: (_a = options.x) !== null && _a !== void 0 ? _a : 0,
			y: (_b = options.y) !== null && _b !== void 0 ? _b : 0,
			width: (_c = options.width) !== null && _c !== void 0 ? _c : 200,
			height: (_d = options.height) !== null && _d !== void 0 ? _d : 50,
			textColor: options.textColor,
			backgroundColor: options.backgroundColor,
			borderColor: options.borderColor,
			borderWidth: (_e = options.borderWidth) !== null && _e !== void 0 ? _e : 0,
			rotate: (_f = options.rotate) !== null && _f !== void 0 ? _f : degrees(0),
			hidden: options.hidden,
			page: page.ref
		});
		var widgetRef = this.doc.context.register(widget.dict);
		this.acroField.addWidget(widgetRef);
		var font = (_g = options.font) !== null && _g !== void 0 ? _g : this.doc.getForm().getDefaultFont();
		this.updateWidgetAppearance(widget, font);
		page.node.addAnnot(widgetRef);
	};
	/**
	* Returns `true` if this dropdown has been marked as dirty, or if any of
	* this dropdown's widgets do not have an appearance stream. For example:
	* ```js
	* const dropdown = form.getDropdown('some.dropdown.field')
	* if (dropdown.needsAppearancesUpdate()) console.log('Needs update')
	* ```
	* @returns Whether or not this dropdown needs an appearance update.
	*/
	PDFDropdown.prototype.needsAppearancesUpdate = function() {
		var _a;
		if (this.isDirty()) return true;
		var widgets = this.acroField.getWidgets();
		for (var idx = 0, len = widgets.length; idx < len; idx++) if (!(((_a = widgets[idx].getAppearances()) === null || _a === void 0 ? void 0 : _a.normal) instanceof PDFStream)) return true;
		return false;
	};
	/**
	* Update the appearance streams for each of this dropdown's widgets using
	* the default appearance provider for dropdowns. For example:
	* ```js
	* const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
	* const dropdown = form.getDropdown('some.dropdown.field')
	* dropdown.defaultUpdateAppearances(helvetica)
	* ```
	* @param font The font to be used for creating the appearance streams.
	*/
	PDFDropdown.prototype.defaultUpdateAppearances = function(font) {
		assertIs(font, "font", [[PDFFont, "PDFFont"]]);
		this.updateAppearances(font);
	};
	/**
	* Update the appearance streams for each of this dropdown's widgets using
	* the given appearance provider. If no `provider` is passed, the default
	* appearance provider for dropdowns will be used. For example:
	* ```js
	* const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
	* const dropdown = form.getDropdown('some.dropdown.field')
	* dropdown.updateAppearances(helvetica, (field, widget, font) => {
	*   ...
	*   return drawTextField(...)
	* })
	* ```
	* @param font The font to be used for creating the appearance streams.
	* @param provider Optionally, the appearance provider to be used for
	*                 generating the contents of the appearance streams.
	*/
	PDFDropdown.prototype.updateAppearances = function(font, provider) {
		assertIs(font, "font", [[PDFFont, "PDFFont"]]);
		assertOrUndefined(provider, "provider", [Function]);
		var widgets = this.acroField.getWidgets();
		for (var idx = 0, len = widgets.length; idx < len; idx++) {
			var widget = widgets[idx];
			this.updateWidgetAppearance(widget, font, provider);
		}
		this.markAsClean();
	};
	PDFDropdown.prototype.updateWidgetAppearance = function(widget, font, provider) {
		var appearances = normalizeAppearance((provider !== null && provider !== void 0 ? provider : defaultDropdownAppearanceProvider)(this, widget, font));
		this.updateWidgetAppearanceWithFont(widget, font, appearances);
	};
	/**
	* > **NOTE:** You probably don't want to call this method directly. Instead,
	* > consider using the [[PDFForm.getDropdown]] method, which will create an
	* > instance of [[PDFDropdown]] for you.
	*
	* Create an instance of [[PDFDropdown]] from an existing acroComboBox and ref
	*
	* @param acroComboBox The underlying `PDFAcroComboBox` for this dropdown.
	* @param ref The unique reference for this dropdown.
	* @param doc The document to which this dropdown will belong.
	*/
	PDFDropdown.of = function(acroComboBox, ref, doc) {
		return new PDFDropdown(acroComboBox, ref, doc);
	};
	return PDFDropdown;
}(PDFField);
//#endregion
//#region node_modules/pdf-lib/es/api/form/PDFOptionList.js
/**
* Represents an option list field of a [[PDFForm]].
*
* [[PDFOptionList]] fields are interactive lists of options. The purpose of an
* option list is to enable users to select one or more options from a set of
* possible options. Users are able to see the full set of options without
* first having to click on the field (though scrolling may be necessary).
* Clicking an option in the list will cause it to be selected and displayed
* with a highlighted background. Some option lists allow users to select
* more than one option (see [[PDFOptionList.isMultiselect]]).
*/
var PDFOptionList = function(_super) {
	__extends(PDFOptionList, _super);
	function PDFOptionList(acroListBox, ref, doc) {
		var _this = _super.call(this, acroListBox, ref, doc) || this;
		assertIs(acroListBox, "acroListBox", [[PDFAcroListBox, "PDFAcroListBox"]]);
		_this.acroField = acroListBox;
		return _this;
	}
	/**
	* Get the list of available options for this option list. These options will
	* be displayed to users who view this option list in a PDF reader.
	* For example:
	* ```js
	* const optionList = form.getOptionList('some.optionList.field')
	* const options = optionList.getOptions()
	* console.log('Option List options:', options)
	* ```
	* @returns The options for this option list.
	*/
	PDFOptionList.prototype.getOptions = function() {
		var rawOptions = this.acroField.getOptions();
		var options = new Array(rawOptions.length);
		for (var idx = 0, len = options.length; idx < len; idx++) {
			var _a = rawOptions[idx], display = _a.display, value = _a.value;
			options[idx] = (display !== null && display !== void 0 ? display : value).decodeText();
		}
		return options;
	};
	/**
	* Get the selected options for this option list. These are the values that
	* were selected by a human user via a PDF reader, or programatically via
	* software.
	* For example:
	* ```js
	* const optionList = form.getOptionList('some.optionList.field')
	* const selections = optionList.getSelected()
	* console.log('Option List selections:', selections)
	* ```
	* @returns The selected options for this option list.
	*/
	PDFOptionList.prototype.getSelected = function() {
		var values = this.acroField.getValues();
		var selected = new Array(values.length);
		for (var idx = 0, len = values.length; idx < len; idx++) selected[idx] = values[idx].decodeText();
		return selected;
	};
	/**
	* Set the list of options that are available for this option list. These are
	* the values that will be available for users to select when they view this
	* option list in a PDF reader. Note that preexisting options for this
	* option list will be removed. Only the values passed as `options` will be
	* available to select.
	*
	* For example:
	* ```js
	* const optionList = form.getOptionList('planets.optionList')
	* optionList.setOptions(['Earth', 'Mars', 'Pluto', 'Venus'])
	* ```
	*
	* This method will mark this option list as dirty, causing its appearance
	* streams to be updated when either [[PDFDocument.save]] or
	* [[PDFForm.updateFieldAppearances]] is called. The updated streams will
	* display the options this field contains inside the widgets of this text
	* field (with selected options highlighted).
	*
	* **IMPORTANT:** The default font used to update appearance streams is
	* [[StandardFonts.Helvetica]]. Note that this is a WinAnsi font. This means
	* that encoding errors will be thrown if this field contains any options
	* with characters outside the WinAnsi character set (the latin alphabet).
	*
	* Embedding a custom font and passing it to
	* [[PDFForm.updateFieldAppearances]] or [[PDFOptionList.updateAppearances]]
	* allows you to generate appearance streams with characters outside the
	* latin alphabet (assuming the custom font supports them).
	*
	* @param options The options that should be available in this option list.
	*/
	PDFOptionList.prototype.setOptions = function(options) {
		assertIs(options, "options", [Array]);
		this.markAsDirty();
		var optionObjects = new Array(options.length);
		for (var idx = 0, len = options.length; idx < len; idx++) optionObjects[idx] = { value: PDFHexString.fromText(options[idx]) };
		this.acroField.setOptions(optionObjects);
	};
	/**
	* Add to the list of options that are available for this option list. Users
	* will be able to select these values in a PDF reader. In addition to the
	* values passed as `options`, any preexisting options for this option list
	* will still be available for users to select.
	* For example:
	* ```js
	* const optionList = form.getOptionList('rockets.optionList')
	* optionList.addOptions(['Saturn IV', 'Falcon Heavy'])
	* ```
	* This method will mark this option list as dirty. See
	* [[PDFOptionList.setOptions]] for more details about what this means.
	* @param options New options that should be available in this option list.
	*/
	PDFOptionList.prototype.addOptions = function(options) {
		assertIs(options, "options", ["string", Array]);
		this.markAsDirty();
		var optionsArr = Array.isArray(options) ? options : [options];
		var existingOptions = this.acroField.getOptions();
		var newOptions = new Array(optionsArr.length);
		for (var idx = 0, len = optionsArr.length; idx < len; idx++) newOptions[idx] = { value: PDFHexString.fromText(optionsArr[idx]) };
		this.acroField.setOptions(existingOptions.concat(newOptions));
	};
	/**
	* Select one or more values for this option list. This operation is analogous
	* to a human user opening the option list in a PDF reader and clicking on one
	* or more values to select them. This method will update the underlying state
	* of the option list to indicate which values have been selected. PDF
	* libraries and readers will be able to extract these values from the saved
	* document and determine which values were selected.
	* For example:
	* ```js
	* const optionList = form.getOptionList('best.superheroes.optionList')
	* optionList.select(['One Punch Man', 'Iron Man'])
	* ```
	* This method will mark this option list as dirty. See
	* [[PDFOptionList.setOptions]] for more details about what this means.
	* @param options The options to be selected.
	* @param merge Whether or not existing selections should be preserved.
	*/
	PDFOptionList.prototype.select = function(options, merge) {
		if (merge === void 0) merge = false;
		assertIs(options, "options", ["string", Array]);
		assertIs(merge, "merge", ["boolean"]);
		var optionsArr = Array.isArray(options) ? options : [options];
		assertIsSubset(optionsArr, "option", this.getOptions());
		this.markAsDirty();
		if (optionsArr.length > 1 || optionsArr.length === 1 && merge) this.enableMultiselect();
		var values = new Array(optionsArr.length);
		for (var idx = 0, len = optionsArr.length; idx < len; idx++) values[idx] = PDFHexString.fromText(optionsArr[idx]);
		if (merge) {
			var existingValues = this.acroField.getValues();
			this.acroField.setValues(existingValues.concat(values));
		} else this.acroField.setValues(values);
	};
	/**
	* Clear all selected values for this option list. This operation is
	* equivalent to selecting an empty list. This method will update the
	* underlying state of the option list to indicate that no values have been
	* selected.
	* For example:
	* ```js
	* const optionList = form.getOptionList('some.optionList.field')
	* optionList.clear()
	* ```
	* This method will mark this option list as dirty. See
	* [[PDFOptionList.setOptions]] for more details about what this means.
	*/
	PDFOptionList.prototype.clear = function() {
		this.markAsDirty();
		this.acroField.setValues([]);
	};
	/**
	* Set the font size for the text in this field. There needs to be a
	* default appearance string (DA) set with a font value specified
	* for this to work. For example:
	* ```js
	* const optionList = form.getOptionList('some.optionList.field')
	* optionList.setFontSize(4);
	* ```
	* @param fontSize The font size to set the font to.
	*/
	/**
	* Set the font size for this field. Larger font sizes will result in larger
	* text being displayed when PDF readers render this option list. Font sizes
	* may be integer or floating point numbers. Supplying a negative font size
	* will cause this method to throw an error.
	*
	* For example:
	* ```js
	* const optionList = form.getOptionList('some.optionList.field')
	* optionList.setFontSize(4)
	* optionList.setFontSize(15.7)
	* ```
	*
	* > This method depends upon the existence of a default appearance
	* > (`/DA`) string. If this field does not have a default appearance string,
	* > or that string does not contain a font size (via the `Tf` operator),
	* > then this method will throw an error.
	*
	* @param fontSize The font size to be used when rendering text in this field.
	*/
	PDFOptionList.prototype.setFontSize = function(fontSize) {
		assertPositive(fontSize, "fontSize");
		this.acroField.setFontSize(fontSize);
		this.markAsDirty();
	};
	/**
	* Returns `true` if the options of this option list are always displayed
	* in alphabetical order, irrespective of the order in which the options
	* were added to the option list. See [[PDFOptionList.enableSorting]] and
	* [[PDFOptionList.disableSorting]]. For example:
	* ```js
	* const optionList = form.getOptionList('some.optionList.field')
	* if (optionList.isSorted()) console.log('Sorting is enabled')
	* ```
	* @returns Whether or not this option list is sorted.
	*/
	PDFOptionList.prototype.isSorted = function() {
		return this.acroField.hasFlag(AcroChoiceFlags.Sort);
	};
	/**
	* Always display the options of this option list in alphabetical order,
	* irrespective of the order in which the options were added to this option
	* list.
	* For example:
	* ```js
	* const optionList = form.getOptionList('some.optionList.field')
	* optionList.enableSorting()
	* ```
	*/
	PDFOptionList.prototype.enableSorting = function() {
		this.acroField.setFlagTo(AcroChoiceFlags.Sort, true);
	};
	/**
	* Do not always display the options of this option list in alphabetical
	* order. Instead, display the options in whichever order they were added
	* to this option list. For example:
	* ```js
	* const optionList = form.getOptionList('some.optionList.field')
	* optionList.disableSorting()
	* ```
	*/
	PDFOptionList.prototype.disableSorting = function() {
		this.acroField.setFlagTo(AcroChoiceFlags.Sort, false);
	};
	/**
	* Returns `true` if multiple options can be selected from this option list.
	* See [[PDFOptionList.enableMultiselect]] and
	* [[PDFOptionList.disableMultiselect]]. For example:
	* ```js
	* const optionList = form.getOptionList('some.optionList.field')
	* if (optionList.isMultiselect()) console.log('Multiselect is enabled')
	* ```
	* @returns Whether or not multiple options can be selected.
	*/
	PDFOptionList.prototype.isMultiselect = function() {
		return this.acroField.hasFlag(AcroChoiceFlags.MultiSelect);
	};
	/**
	* Allow users to select more than one option from this option list.
	* For example:
	* ```js
	* const optionList = form.getOptionList('some.optionList.field')
	* optionList.enableMultiselect()
	* ```
	*/
	PDFOptionList.prototype.enableMultiselect = function() {
		this.acroField.setFlagTo(AcroChoiceFlags.MultiSelect, true);
	};
	/**
	* Do not allow users to select more than one option from this option list.
	* For example:
	* ```js
	* const optionList = form.getOptionList('some.optionList.field')
	* optionList.disableMultiselect()
	* ```
	*/
	PDFOptionList.prototype.disableMultiselect = function() {
		this.acroField.setFlagTo(AcroChoiceFlags.MultiSelect, false);
	};
	/**
	* Returns `true` if the option selected by a user is stored, or "committed",
	* when the user clicks the option. The alternative is that the user's
	* selection is stored when the user leaves this option list field (by
	* clicking outside of it - on another field, for example). See
	* [[PDFOptionList.enableSelectOnClick]] and
	* [[PDFOptionList.disableSelectOnClick]]. For example:
	* ```js
	* const optionList = form.getOptionList('some.optionList.field')
	* if (optionList.isSelectOnClick()) console.log('Select on click is enabled')
	* ```
	* @returns Whether or not options are selected immediately after they are
	*          clicked.
	*/
	PDFOptionList.prototype.isSelectOnClick = function() {
		return this.acroField.hasFlag(AcroChoiceFlags.CommitOnSelChange);
	};
	/**
	* Store the option selected by a user immediately after the user clicks the
	* option. Do not wait for the user to leave this option list field (by
	* clicking outside of it - on another field, for example). For example:
	* ```js
	* const optionList = form.getOptionList('some.optionList.field')
	* optionList.enableSelectOnClick()
	* ```
	*/
	PDFOptionList.prototype.enableSelectOnClick = function() {
		this.acroField.setFlagTo(AcroChoiceFlags.CommitOnSelChange, true);
	};
	/**
	* Wait to store the option selected by a user until they leave this option
	* list field (by clicking outside of it - on another field, for example).
	* For example:
	* ```js
	* const optionList = form.getOptionList('some.optionList.field')
	* optionList.disableSelectOnClick()
	* ```
	*/
	PDFOptionList.prototype.disableSelectOnClick = function() {
		this.acroField.setFlagTo(AcroChoiceFlags.CommitOnSelChange, false);
	};
	/**
	* Show this option list on the specified page. For example:
	* ```js
	* const ubuntuFont = await pdfDoc.embedFont(ubuntuFontBytes)
	* const page = pdfDoc.addPage()
	*
	* const form = pdfDoc.getForm()
	* const optionList = form.createOptionList('best.gundams')
	* optionList.setOptions(['Exia', 'Dynames', 'Kyrios', 'Virtue'])
	* optionList.select(['Exia', 'Virtue'])
	*
	* optionList.addToPage(page, {
	*   x: 50,
	*   y: 75,
	*   width: 200,
	*   height: 100,
	*   textColor: rgb(1, 0, 0),
	*   backgroundColor: rgb(0, 1, 0),
	*   borderColor: rgb(0, 0, 1),
	*   borderWidth: 2,
	*   rotate: degrees(90),
	*   font: ubuntuFont,
	* })
	* ```
	* This will create a new widget for this option list field.
	* @param page The page to which this option list widget should be added.
	* @param options The options to be used when adding this option list widget.
	*/
	PDFOptionList.prototype.addToPage = function(page, options) {
		var _a, _b, _c, _d, _e, _f, _g;
		assertIs(page, "page", [[PDFPage, "PDFPage"]]);
		assertFieldAppearanceOptions(options);
		if (!options) options = {};
		if (!("textColor" in options)) options.textColor = rgb(0, 0, 0);
		if (!("backgroundColor" in options)) options.backgroundColor = rgb(1, 1, 1);
		if (!("borderColor" in options)) options.borderColor = rgb(0, 0, 0);
		if (!("borderWidth" in options)) options.borderWidth = 1;
		var widget = this.createWidget({
			x: (_a = options.x) !== null && _a !== void 0 ? _a : 0,
			y: (_b = options.y) !== null && _b !== void 0 ? _b : 0,
			width: (_c = options.width) !== null && _c !== void 0 ? _c : 200,
			height: (_d = options.height) !== null && _d !== void 0 ? _d : 100,
			textColor: options.textColor,
			backgroundColor: options.backgroundColor,
			borderColor: options.borderColor,
			borderWidth: (_e = options.borderWidth) !== null && _e !== void 0 ? _e : 0,
			rotate: (_f = options.rotate) !== null && _f !== void 0 ? _f : degrees(0),
			hidden: options.hidden,
			page: page.ref
		});
		var widgetRef = this.doc.context.register(widget.dict);
		this.acroField.addWidget(widgetRef);
		var font = (_g = options.font) !== null && _g !== void 0 ? _g : this.doc.getForm().getDefaultFont();
		this.updateWidgetAppearance(widget, font);
		page.node.addAnnot(widgetRef);
	};
	/**
	* Returns `true` if this option list has been marked as dirty, or if any of
	* this option list's widgets do not have an appearance stream. For example:
	* ```js
	* const optionList = form.getOptionList('some.optionList.field')
	* if (optionList.needsAppearancesUpdate()) console.log('Needs update')
	* ```
	* @returns Whether or not this option list needs an appearance update.
	*/
	PDFOptionList.prototype.needsAppearancesUpdate = function() {
		var _a;
		if (this.isDirty()) return true;
		var widgets = this.acroField.getWidgets();
		for (var idx = 0, len = widgets.length; idx < len; idx++) if (!(((_a = widgets[idx].getAppearances()) === null || _a === void 0 ? void 0 : _a.normal) instanceof PDFStream)) return true;
		return false;
	};
	/**
	* Update the appearance streams for each of this option list's widgets using
	* the default appearance provider for option lists. For example:
	* ```js
	* const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
	* const optionList = form.getOptionList('some.optionList.field')
	* optionList.defaultUpdateAppearances(helvetica)
	* ```
	* @param font The font to be used for creating the appearance streams.
	*/
	PDFOptionList.prototype.defaultUpdateAppearances = function(font) {
		assertIs(font, "font", [[PDFFont, "PDFFont"]]);
		this.updateAppearances(font);
	};
	/**
	* Update the appearance streams for each of this option list's widgets using
	* the given appearance provider. If no `provider` is passed, the default
	* appearance provider for option lists will be used. For example:
	* ```js
	* const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
	* const optionList = form.getOptionList('some.optionList.field')
	* optionList.updateAppearances(helvetica, (field, widget, font) => {
	*   ...
	*   return drawOptionList(...)
	* })
	* ```
	* @param font The font to be used for creating the appearance streams.
	* @param provider Optionally, the appearance provider to be used for
	*                 generating the contents of the appearance streams.
	*/
	PDFOptionList.prototype.updateAppearances = function(font, provider) {
		assertIs(font, "font", [[PDFFont, "PDFFont"]]);
		assertOrUndefined(provider, "provider", [Function]);
		var widgets = this.acroField.getWidgets();
		for (var idx = 0, len = widgets.length; idx < len; idx++) {
			var widget = widgets[idx];
			this.updateWidgetAppearance(widget, font, provider);
		}
		this.markAsClean();
	};
	PDFOptionList.prototype.updateWidgetAppearance = function(widget, font, provider) {
		var appearances = normalizeAppearance((provider !== null && provider !== void 0 ? provider : defaultOptionListAppearanceProvider)(this, widget, font));
		this.updateWidgetAppearanceWithFont(widget, font, appearances);
	};
	/**
	* > **NOTE:** You probably don't want to call this method directly. Instead,
	* > consider using the [[PDFForm.getOptionList]] method, which will create
	* > an instance of [[PDFOptionList]] for you.
	*
	* Create an instance of [[PDFOptionList]] from an existing acroListBox and
	* ref
	*
	* @param acroComboBox The underlying `PDFAcroListBox` for this option list.
	* @param ref The unique reference for this option list.
	* @param doc The document to which this option list will belong.
	*/
	PDFOptionList.of = function(acroListBox, ref, doc) {
		return new PDFOptionList(acroListBox, ref, doc);
	};
	return PDFOptionList;
}(PDFField);
//#endregion
//#region node_modules/pdf-lib/es/api/form/PDFRadioGroup.js
/**
* Represents a radio group field of a [[PDFForm]].
*
* [[PDFRadioGroup]] fields are collections of radio buttons. The purpose of a
* radio group is to enable users to select one option from a set of mutually
* exclusive choices. Each choice in a radio group is represented by a radio
* button. Radio buttons each have two states: `on` and `off`. At most one
* radio button in a group may be in the `on` state at any time. Users can
* click on a radio button to select it (and thereby automatically deselect any
* other radio button that might have already been selected). Some radio
* groups allow users to toggle a selected radio button `off` by clicking on
* it (see [[PDFRadioGroup.isOffToggleable]]).
*
* Note that some radio groups allow multiple radio buttons to be in the `on`
* state at the same type **if** they represent the same underlying value (see
* [[PDFRadioGroup.isMutuallyExclusive]]).
*/
var PDFRadioGroup = function(_super) {
	__extends(PDFRadioGroup, _super);
	function PDFRadioGroup(acroRadioButton, ref, doc) {
		var _this = _super.call(this, acroRadioButton, ref, doc) || this;
		assertIs(acroRadioButton, "acroRadioButton", [[PDFAcroRadioButton, "PDFAcroRadioButton"]]);
		_this.acroField = acroRadioButton;
		return _this;
	}
	/**
	* Get the list of available options for this radio group. Each option is
	* represented by a radio button. These radio buttons are displayed at
	* various locations in the document, potentially on different pages (though
	* typically they are stacked horizontally or vertically on the same page).
	* For example:
	* ```js
	* const radioGroup = form.getRadioGroup('some.radioGroup.field')
	* const options = radioGroup.getOptions()
	* console.log('Radio Group options:', options)
	* ```
	* @returns The options for this radio group.
	*/
	PDFRadioGroup.prototype.getOptions = function() {
		var exportValues = this.acroField.getExportValues();
		if (exportValues) {
			var exportOptions = new Array(exportValues.length);
			for (var idx = 0, len = exportValues.length; idx < len; idx++) exportOptions[idx] = exportValues[idx].decodeText();
			return exportOptions;
		}
		var onValues = this.acroField.getOnValues();
		var onOptions = new Array(onValues.length);
		for (var idx = 0, len = onOptions.length; idx < len; idx++) onOptions[idx] = onValues[idx].decodeText();
		return onOptions;
	};
	/**
	* Get the selected option for this radio group. The selected option is
	* represented by the radio button in this group that is turned on. At most
	* one radio button in a group can be selected. If no buttons in this group
	* are selected, `undefined` is returned.
	* For example:
	* ```js
	* const radioGroup = form.getRadioGroup('some.radioGroup.field')
	* const selected = radioGroup.getSelected()
	* console.log('Selected radio button:', selected)
	* ```
	* @returns The selected option for this radio group.
	*/
	PDFRadioGroup.prototype.getSelected = function() {
		var value = this.acroField.getValue();
		if (value === PDFName.of("Off")) return void 0;
		var exportValues = this.acroField.getExportValues();
		if (exportValues) {
			var onValues = this.acroField.getOnValues();
			for (var idx = 0, len = onValues.length; idx < len; idx++) if (onValues[idx] === value) return exportValues[idx].decodeText();
		}
		return value.decodeText();
	};
	/**
	* Select an option for this radio group. This operation is analogous to a
	* human user clicking one of the radio buttons in this group via a PDF
	* reader to toggle it on. This method will update the underlying state of
	* the radio group to indicate which option has been selected. PDF libraries
	* and readers will be able to extract this value from the saved document and
	* determine which option was selected.
	*
	* For example:
	* ```js
	* const radioGroup = form.getRadioGroup('best.superhero.radioGroup')
	* radioGroup.select('One Punch Man')
	* ```
	*
	* This method will mark this radio group as dirty, causing its appearance
	* streams to be updated when either [[PDFDocument.save]] or
	* [[PDFForm.updateFieldAppearances]] is called. The updated appearance
	* streams will display a dot inside the widget of this check box field
	* that represents the selected option.
	*
	* @param option The option to be selected.
	*/
	PDFRadioGroup.prototype.select = function(option) {
		assertIs(option, "option", ["string"]);
		assertIsOneOf(option, "option", this.getOptions());
		this.markAsDirty();
		var onValues = this.acroField.getOnValues();
		var exportValues = this.acroField.getExportValues();
		if (exportValues) {
			for (var idx = 0, len = exportValues.length; idx < len; idx++) if (exportValues[idx].decodeText() === option) this.acroField.setValue(onValues[idx]);
		} else for (var idx = 0, len = onValues.length; idx < len; idx++) {
			var value = onValues[idx];
			if (value.decodeText() === option) this.acroField.setValue(value);
		}
	};
	/**
	* Clear any selected option for this dropdown. This will result in all
	* radio buttons in this group being toggled off. This method will update
	* the underlying state of the dropdown to indicate that no radio buttons
	* have been selected.
	* For example:
	* ```js
	* const radioGroup = form.getRadioGroup('some.radioGroup.field')
	* radioGroup.clear()
	* ```
	* This method will mark this radio group as dirty. See
	* [[PDFRadioGroup.select]] for more details about what this means.
	*/
	PDFRadioGroup.prototype.clear = function() {
		this.markAsDirty();
		this.acroField.setValue(PDFName.of("Off"));
	};
	/**
	* Returns `true` if users can click on radio buttons in this group to toggle
	* them off. The alternative is that once a user clicks on a radio button
	* to select it, the only way to deselect it is by selecting on another radio
	* button in the group. See [[PDFRadioGroup.enableOffToggling]] and
	* [[PDFRadioGroup.disableOffToggling]]. For example:
	* ```js
	* const radioGroup = form.getRadioGroup('some.radioGroup.field')
	* if (radioGroup.isOffToggleable()) console.log('Off toggling is enabled')
	* ```
	*/
	PDFRadioGroup.prototype.isOffToggleable = function() {
		return !this.acroField.hasFlag(AcroButtonFlags.NoToggleToOff);
	};
	/**
	* Allow users to click on selected radio buttons in this group to toggle
	* them off. For example:
	* ```js
	* const radioGroup = form.getRadioGroup('some.radioGroup.field')
	* radioGroup.enableOffToggling()
	* ```
	* > **NOTE:** This feature is documented in the PDF specification
	* > (Table 226). However, most PDF readers do not respect this option and
	* > prevent users from toggling radio buttons off even when it is enabled.
	* > At the time of this writing (9/6/2020) Mac's Preview software did
	* > respect the option. Adobe Acrobat, Foxit Reader, and Google Chrome did
	* > not.
	*/
	PDFRadioGroup.prototype.enableOffToggling = function() {
		this.acroField.setFlagTo(AcroButtonFlags.NoToggleToOff, false);
	};
	/**
	* Prevent users from clicking on selected radio buttons in this group to
	* toggle them off. Clicking on a selected radio button will have no effect.
	* The only way to deselect a selected radio button is to click on a
	* different radio button in the group. For example:
	* ```js
	* const radioGroup = form.getRadioGroup('some.radioGroup.field')
	* radioGroup.disableOffToggling()
	* ```
	*/
	PDFRadioGroup.prototype.disableOffToggling = function() {
		this.acroField.setFlagTo(AcroButtonFlags.NoToggleToOff, true);
	};
	/**
	* Returns `true` if the radio buttons in this group are mutually exclusive.
	* This means that when the user selects a radio button, only that specific
	* button will be turned on. Even if other radio buttons in the group
	* represent the same value, they will not be enabled. The alternative to
	* this is that clicking a radio button will select that button along with
	* any other radio buttons in the group that share the same value. See
	* [[PDFRadioGroup.enableMutualExclusion]] and
	* [[PDFRadioGroup.disableMutualExclusion]].
	* For example:
	* ```js
	* const radioGroup = form.getRadioGroup('some.radioGroup.field')
	* if (radioGroup.isMutuallyExclusive()) console.log('Mutual exclusion is enabled')
	* ```
	*/
	PDFRadioGroup.prototype.isMutuallyExclusive = function() {
		return !this.acroField.hasFlag(AcroButtonFlags.RadiosInUnison);
	};
	/**
	* When the user clicks a radio button in this group it will be selected. In
	* addition, any other radio buttons in this group that share the same
	* underlying value will also be selected. For example:
	* ```js
	* const radioGroup = form.getRadioGroup('some.radioGroup.field')
	* radioGroup.enableMutualExclusion()
	* ```
	* Note that this option must be enabled prior to adding options to the
	* radio group. It does not currently apply retroactively to existing
	* radio buttons in the group.
	*/
	PDFRadioGroup.prototype.enableMutualExclusion = function() {
		this.acroField.setFlagTo(AcroButtonFlags.RadiosInUnison, false);
	};
	/**
	* When the user clicks a radio button in this group only it will be selected.
	* No other radio buttons in the group will be selected, even if they share
	* the same underlying value. For example:
	* ```js
	* const radioGroup = form.getRadioGroup('some.radioGroup.field')
	* radioGroup.disableMutualExclusion()
	* ```
	* Note that this option must be disabled prior to adding options to the
	* radio group. It does not currently apply retroactively to existing
	* radio buttons in the group.
	*/
	PDFRadioGroup.prototype.disableMutualExclusion = function() {
		this.acroField.setFlagTo(AcroButtonFlags.RadiosInUnison, true);
	};
	/**
	* Add a new radio button to this group on the specified page. For example:
	* ```js
	* const page = pdfDoc.addPage()
	*
	* const form = pdfDoc.getForm()
	* const radioGroup = form.createRadioGroup('best.gundam')
	*
	* const options = {
	*   x: 50,
	*   width: 25,
	*   height: 25,
	*   textColor: rgb(1, 0, 0),
	*   backgroundColor: rgb(0, 1, 0),
	*   borderColor: rgb(0, 0, 1),
	*   borderWidth: 2,
	*   rotate: degrees(90),
	* }
	*
	* radioGroup.addOptionToPage('Exia', page, { ...options, y: 50 })
	* radioGroup.addOptionToPage('Dynames', page, { ...options, y: 110 })
	* ```
	* This will create a new radio button widget for this radio group field.
	* @param option The option that the radio button widget represents.
	* @param page The page to which the radio button widget should be added.
	* @param options The options to be used when adding the radio button widget.
	*/
	PDFRadioGroup.prototype.addOptionToPage = function(option, page, options) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _j;
		assertIs(option, "option", ["string"]);
		assertIs(page, "page", [[PDFPage, "PDFPage"]]);
		assertFieldAppearanceOptions(options);
		var widget = this.createWidget({
			x: (_a = options === null || options === void 0 ? void 0 : options.x) !== null && _a !== void 0 ? _a : 0,
			y: (_b = options === null || options === void 0 ? void 0 : options.y) !== null && _b !== void 0 ? _b : 0,
			width: (_c = options === null || options === void 0 ? void 0 : options.width) !== null && _c !== void 0 ? _c : 50,
			height: (_d = options === null || options === void 0 ? void 0 : options.height) !== null && _d !== void 0 ? _d : 50,
			textColor: (_e = options === null || options === void 0 ? void 0 : options.textColor) !== null && _e !== void 0 ? _e : rgb(0, 0, 0),
			backgroundColor: (_f = options === null || options === void 0 ? void 0 : options.backgroundColor) !== null && _f !== void 0 ? _f : rgb(1, 1, 1),
			borderColor: (_g = options === null || options === void 0 ? void 0 : options.borderColor) !== null && _g !== void 0 ? _g : rgb(0, 0, 0),
			borderWidth: (_h = options === null || options === void 0 ? void 0 : options.borderWidth) !== null && _h !== void 0 ? _h : 1,
			rotate: (_j = options === null || options === void 0 ? void 0 : options.rotate) !== null && _j !== void 0 ? _j : degrees(0),
			hidden: options === null || options === void 0 ? void 0 : options.hidden,
			page: page.ref
		});
		var widgetRef = this.doc.context.register(widget.dict);
		var apStateValue = this.acroField.addWidgetWithOpt(widgetRef, PDFHexString.fromText(option), !this.isMutuallyExclusive());
		widget.setAppearanceState(PDFName.of("Off"));
		this.updateWidgetAppearance(widget, apStateValue);
		page.node.addAnnot(widgetRef);
	};
	/**
	* Returns `true` if any of this group's radio button widgets do not have an
	* appearance stream for their current state. For example:
	* ```js
	* const radioGroup = form.getRadioGroup('some.radioGroup.field')
	* if (radioGroup.needsAppearancesUpdate()) console.log('Needs update')
	* ```
	* @returns Whether or not this radio group needs an appearance update.
	*/
	PDFRadioGroup.prototype.needsAppearancesUpdate = function() {
		var _a;
		var widgets = this.acroField.getWidgets();
		for (var idx = 0, len = widgets.length; idx < len; idx++) {
			var widget = widgets[idx];
			var state = widget.getAppearanceState();
			var normal = (_a = widget.getAppearances()) === null || _a === void 0 ? void 0 : _a.normal;
			if (!(normal instanceof PDFDict)) return true;
			if (state && !normal.has(state)) return true;
		}
		return false;
	};
	/**
	* Update the appearance streams for each of this group's radio button widgets
	* using the default appearance provider for radio groups. For example:
	* ```js
	* const radioGroup = form.getRadioGroup('some.radioGroup.field')
	* radioGroup.defaultUpdateAppearances()
	* ```
	*/
	PDFRadioGroup.prototype.defaultUpdateAppearances = function() {
		this.updateAppearances();
	};
	/**
	* Update the appearance streams for each of this group's radio button widgets
	* using the given appearance provider. If no `provider` is passed, the
	* default appearance provider for radio groups will be used. For example:
	* ```js
	* const radioGroup = form.getRadioGroup('some.radioGroup.field')
	* radioGroup.updateAppearances((field, widget) => {
	*   ...
	*   return {
	*     normal: { on: drawRadioButton(...), off: drawRadioButton(...) },
	*     down: { on: drawRadioButton(...), off: drawRadioButton(...) },
	*   }
	* })
	* ```
	* @param provider Optionally, the appearance provider to be used for
	*                 generating the contents of the appearance streams.
	*/
	PDFRadioGroup.prototype.updateAppearances = function(provider) {
		assertOrUndefined(provider, "provider", [Function]);
		var widgets = this.acroField.getWidgets();
		for (var idx = 0, len = widgets.length; idx < len; idx++) {
			var widget = widgets[idx];
			var onValue = widget.getOnValue();
			if (!onValue) continue;
			this.updateWidgetAppearance(widget, onValue, provider);
		}
	};
	PDFRadioGroup.prototype.updateWidgetAppearance = function(widget, onValue, provider) {
		var appearances = normalizeAppearance((provider !== null && provider !== void 0 ? provider : defaultRadioGroupAppearanceProvider)(this, widget));
		this.updateOnOffWidgetAppearance(widget, onValue, appearances);
	};
	/**
	* > **NOTE:** You probably don't want to call this method directly. Instead,
	* > consider using the [[PDFForm.getOptionList]] method, which will create an
	* > instance of [[PDFOptionList]] for you.
	*
	* Create an instance of [[PDFOptionList]] from an existing acroRadioButton
	* and ref
	*
	* @param acroRadioButton The underlying `PDFAcroRadioButton` for this
	*                        radio group.
	* @param ref The unique reference for this radio group.
	* @param doc The document to which this radio group will belong.
	*/
	PDFRadioGroup.of = function(acroRadioButton, ref, doc) {
		return new PDFRadioGroup(acroRadioButton, ref, doc);
	};
	return PDFRadioGroup;
}(PDFField);
//#endregion
//#region node_modules/pdf-lib/es/api/form/PDFSignature.js
/**
* Represents a signature field of a [[PDFForm]].
*
* [[PDFSignature]] fields are digital signatures. `pdf-lib` does not
* currently provide any specialized APIs for creating digital signatures or
* reading the contents of existing digital signatures.
*/
var PDFSignature = function(_super) {
	__extends(PDFSignature, _super);
	function PDFSignature(acroSignature, ref, doc) {
		var _this = _super.call(this, acroSignature, ref, doc) || this;
		assertIs(acroSignature, "acroSignature", [[PDFAcroSignature, "PDFAcroSignature"]]);
		_this.acroField = acroSignature;
		return _this;
	}
	PDFSignature.prototype.needsAppearancesUpdate = function() {
		return false;
	};
	/**
	* > **NOTE:** You probably don't want to call this method directly. Instead,
	* > consider using the [[PDFForm.getSignature]] method, which will create an
	* > instance of [[PDFSignature]] for you.
	*
	* Create an instance of [[PDFSignature]] from an existing acroSignature and
	* ref
	*
	* @param acroSignature The underlying `PDFAcroSignature` for this signature.
	* @param ref The unique reference for this signature.
	* @param doc The document to which this signature will belong.
	*/
	PDFSignature.of = function(acroSignature, ref, doc) {
		return new PDFSignature(acroSignature, ref, doc);
	};
	return PDFSignature;
}(PDFField);
//#endregion
//#region node_modules/pdf-lib/es/api/form/PDFTextField.js
/**
* Represents a text field of a [[PDFForm]].
*
* [[PDFTextField]] fields are boxes that display text entered by the user. The
* purpose of a text field is to enable users to enter text or view text values
* in the document prefilled by software. Users can click on a text field and
* input text via their keyboard. Some text fields allow multiple lines of text
* to be entered (see [[PDFTextField.isMultiline]]).
*/
var PDFTextField = function(_super) {
	__extends(PDFTextField, _super);
	function PDFTextField(acroText, ref, doc) {
		var _this = _super.call(this, acroText, ref, doc) || this;
		assertIs(acroText, "acroText", [[PDFAcroText, "PDFAcroText"]]);
		_this.acroField = acroText;
		return _this;
	}
	/**
	* Get the text that this field contains. This text is visible to users who
	* view this field in a PDF reader.
	*
	* For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* const text = textField.getText()
	* console.log('Text field contents:', text)
	* ```
	*
	* Note that if this text field contains no underlying value, `undefined`
	* will be returned. Text fields may also contain an underlying value that
	* is simply an empty string (`''`). This detail is largely irrelevant for
	* most applications. In general, you'll want to treat both cases the same
	* way and simply consider the text field to be empty. In either case, the
	* text field will appear empty to users when viewed in a PDF reader.
	*
	* An error will be thrown if this is a rich text field. `pdf-lib` does not
	* support reading rich text fields. Nor do most PDF readers and writers.
	* Rich text fields are based on XFA (XML Forms Architecture). Relatively few
	* PDFs use rich text fields or XFA. Unlike PDF itself, XFA is not an ISO
	* standard. XFA has been deprecated in PDF 2.0:
	* * https://en.wikipedia.org/wiki/XFA
	* * http://blog.pdfshareforms.com/pdf-2-0-release-bid-farewell-xfa-forms/
	*
	* @returns The text contained in this text field.
	*/
	PDFTextField.prototype.getText = function() {
		var value = this.acroField.getValue();
		if (!value && this.isRichFormatted()) throw new RichTextFieldReadError(this.getName());
		return value === null || value === void 0 ? void 0 : value.decodeText();
	};
	/**
	* Set the text for this field. This operation is analogous to a human user
	* clicking on the text field in a PDF reader and typing in text via their
	* keyboard. This method will update the underlying state of the text field
	* to indicate what text has been set. PDF libraries and readers will be able
	* to extract these values from the saved document and determine what text
	* was set.
	*
	* For example:
	* ```js
	* const textField = form.getTextField('best.superhero.text.field')
	* textField.setText('One Punch Man')
	* ```
	*
	* This method will mark this text field as dirty, causing its appearance
	* streams to be updated when either [[PDFDocument.save]] or
	* [[PDFForm.updateFieldAppearances]] is called. The updated streams will
	* display the text this field contains inside the widgets of this text
	* field.
	*
	* **IMPORTANT:** The default font used to update appearance streams is
	* [[StandardFonts.Helvetica]]. Note that this is a WinAnsi font. This means
	* that encoding errors will be thrown if this field contains text outside
	* the WinAnsi character set (the latin alphabet).
	*
	* Embedding a custom font and passing it to
	* [[PDFForm.updateFieldAppearances]] or [[PDFTextField.updateAppearances]]
	* allows you to generate appearance streams with characters outside the
	* latin alphabet (assuming the custom font supports them).
	*
	* If this is a rich text field, it will be converted to a standard text
	* field in order to set the text. `pdf-lib` does not support writing rich
	* text strings. Nor do most PDF readers and writers. See
	* [[PDFTextField.getText]] for more information about rich text fields and
	* their deprecation in PDF 2.0.
	*
	* @param text The text this field should contain.
	*/
	PDFTextField.prototype.setText = function(text) {
		assertOrUndefined(text, "text", ["string"]);
		var maxLength = this.getMaxLength();
		if (maxLength !== void 0 && text && text.length > maxLength) throw new ExceededMaxLengthError(text.length, maxLength, this.getName());
		this.markAsDirty();
		this.disableRichFormatting();
		if (text) this.acroField.setValue(PDFHexString.fromText(text));
		else this.acroField.removeValue();
	};
	/**
	* Get the alignment for this text field. This value represents the
	* justification of the text when it is displayed to the user in PDF readers.
	* There are three possible alignments: left, center, and right. For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* const alignment = textField.getAlignment()
	* if (alignment === TextAlignment.Left) console.log('Text is left justified')
	* if (alignment === TextAlignment.Center) console.log('Text is centered')
	* if (alignment === TextAlignment.Right) console.log('Text is right justified')
	* ```
	* @returns The alignment of this text field.
	*/
	PDFTextField.prototype.getAlignment = function() {
		var quadding = this.acroField.getQuadding();
		return quadding === 0 ? TextAlignment.Left : quadding === 1 ? TextAlignment.Center : quadding === 2 ? TextAlignment.Right : TextAlignment.Left;
	};
	/**
	* Set the alignment for this text field. This will determine the
	* justification of the text when it is displayed to the user in PDF readers.
	* There are three possible alignments: left, center, and right. For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	*
	* // Text will be left justified when displayed
	* textField.setAlignment(TextAlignment.Left)
	*
	* // Text will be centered when displayed
	* textField.setAlignment(TextAlignment.Center)
	*
	* // Text will be right justified when displayed
	* textField.setAlignment(TextAlignment.Right)
	* ```
	* This method will mark this text field as dirty. See
	* [[PDFTextField.setText]] for more details about what this means.
	* @param alignment The alignment for this text field.
	*/
	PDFTextField.prototype.setAlignment = function(alignment) {
		assertIsOneOf(alignment, "alignment", TextAlignment);
		this.markAsDirty();
		this.acroField.setQuadding(alignment);
	};
	/**
	* Get the maximum length of this field. This value represents the maximum
	* number of characters that can be typed into this field by the user. If
	* this field does not have a maximum length, `undefined` is returned.
	* For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* const maxLength = textField.getMaxLength()
	* if (maxLength === undefined) console.log('No max length')
	* else console.log(`Max length is ${maxLength}`)
	* ```
	* @returns The maximum number of characters allowed in this field, or
	*          `undefined` if no limit exists.
	*/
	PDFTextField.prototype.getMaxLength = function() {
		return this.acroField.getMaxLength();
	};
	/**
	* Set the maximum length of this field. This limits the number of characters
	* that can be typed into this field by the user. This also limits the length
	* of the string that can be passed to [[PDFTextField.setText]]. This limit
	* can be removed by passing `undefined` as `maxLength`. For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	*
	* // Allow between 0 and 5 characters to be entered
	* textField.setMaxLength(5)
	*
	* // Allow any number of characters to be entered
	* textField.setMaxLength(undefined)
	* ```
	* This method will mark this text field as dirty. See
	* [[PDFTextField.setText]] for more details about what this means.
	* @param maxLength The maximum number of characters allowed in this field, or
	*                  `undefined` to remove the limit.
	*/
	PDFTextField.prototype.setMaxLength = function(maxLength) {
		assertRangeOrUndefined(maxLength, "maxLength", 0, Number.MAX_SAFE_INTEGER);
		this.markAsDirty();
		if (maxLength === void 0) this.acroField.removeMaxLength();
		else {
			var text = this.getText();
			if (text && text.length > maxLength) throw new InvalidMaxLengthError(text.length, maxLength, this.getName());
			this.acroField.setMaxLength(maxLength);
		}
	};
	/**
	* Remove the maximum length for this text field. This allows any number of
	* characters to be typed into this field by the user. For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* textField.removeMaxLength()
	* ```
	* Calling this method is equivalent to passing `undefined` to
	* [[PDFTextField.setMaxLength]].
	*/
	PDFTextField.prototype.removeMaxLength = function() {
		this.markAsDirty();
		this.acroField.removeMaxLength();
	};
	/**
	* Display an image inside the bounds of this text field's widgets. For example:
	* ```js
	* const pngImage = await pdfDoc.embedPng(...)
	* const textField = form.getTextField('some.text.field')
	* textField.setImage(pngImage)
	* ```
	* This will update the appearances streams for each of this text field's widgets.
	* @param image The image that should be displayed.
	*/
	PDFTextField.prototype.setImage = function(image) {
		var fieldAlignment = this.getAlignment();
		var alignment = fieldAlignment === TextAlignment.Center ? ImageAlignment.Center : fieldAlignment === TextAlignment.Right ? ImageAlignment.Right : ImageAlignment.Left;
		var widgets = this.acroField.getWidgets();
		for (var idx = 0, len = widgets.length; idx < len; idx++) {
			var widget = widgets[idx];
			var streamRef = this.createImageAppearanceStream(widget, image, alignment);
			this.updateWidgetAppearances(widget, { normal: streamRef });
		}
		this.markAsClean();
	};
	/**
	* Set the font size for this field. Larger font sizes will result in larger
	* text being displayed when PDF readers render this text field. Font sizes
	* may be integer or floating point numbers. Supplying a negative font size
	* will cause this method to throw an error.
	*
	* For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* textField.setFontSize(4)
	* textField.setFontSize(15.7)
	* ```
	*
	* > This method depends upon the existence of a default appearance
	* > (`/DA`) string. If this field does not have a default appearance string,
	* > or that string does not contain a font size (via the `Tf` operator),
	* > then this method will throw an error.
	*
	* @param fontSize The font size to be used when rendering text in this field.
	*/
	PDFTextField.prototype.setFontSize = function(fontSize) {
		assertPositive(fontSize, "fontSize");
		this.acroField.setFontSize(fontSize);
		this.markAsDirty();
	};
	/**
	* Returns `true` if each line of text is shown on a new line when this
	* field is displayed in a PDF reader. The alternative is that all lines of
	* text are merged onto a single line when displayed. See
	* [[PDFTextField.enableMultiline]] and [[PDFTextField.disableMultiline]].
	* For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* if (textField.isMultiline()) console.log('Multiline is enabled')
	* ```
	* @returns Whether or not this is a multiline text field.
	*/
	PDFTextField.prototype.isMultiline = function() {
		return this.acroField.hasFlag(AcroTextFlags.Multiline);
	};
	/**
	* Display each line of text on a new line when this field is displayed in a
	* PDF reader. For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* textField.enableMultiline()
	* ```
	* This method will mark this text field as dirty. See
	* [[PDFTextField.setText]] for more details about what this means.
	*/
	PDFTextField.prototype.enableMultiline = function() {
		this.markAsDirty();
		this.acroField.setFlagTo(AcroTextFlags.Multiline, true);
	};
	/**
	* Display each line of text on the same line when this field is displayed
	* in a PDF reader. For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* textField.disableMultiline()
	* ```
	* This method will mark this text field as dirty. See
	* [[PDFTextField.setText]] for more details about what this means.
	*/
	PDFTextField.prototype.disableMultiline = function() {
		this.markAsDirty();
		this.acroField.setFlagTo(AcroTextFlags.Multiline, false);
	};
	/**
	* Returns `true` if this is a password text field. This means that the field
	* is intended for storing a secure password. See
	* [[PDFTextField.enablePassword]] and [[PDFTextField.disablePassword]].
	* For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* if (textField.isPassword()) console.log('Password is enabled')
	* ```
	* @returns Whether or not this is a password text field.
	*/
	PDFTextField.prototype.isPassword = function() {
		return this.acroField.hasFlag(AcroTextFlags.Password);
	};
	/**
	* Indicate that this text field is intended for storing a secure password.
	* For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* textField.enablePassword()
	* ```
	* Values entered into password text fields should not be displayed on the
	* screen by PDF readers. Most PDF readers will display the value as
	* asterisks or bullets. PDF readers should never store values entered by the
	* user into password text fields. Similarly, applications should not
	* write data to a password text field.
	*
	* **Please note that this method does not cause entered values to be
	* encrypted or secured in any way! It simply sets a flag that PDF software
	* and readers can access to determine the _purpose_ of this field.**
	*/
	PDFTextField.prototype.enablePassword = function() {
		this.acroField.setFlagTo(AcroTextFlags.Password, true);
	};
	/**
	* Indicate that this text field is **not** intended for storing a secure
	* password. For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* textField.disablePassword()
	* ```
	*/
	PDFTextField.prototype.disablePassword = function() {
		this.acroField.setFlagTo(AcroTextFlags.Password, false);
	};
	/**
	* Returns `true` if the contents of this text field represent a file path.
	* See [[PDFTextField.enableFileSelection]] and
	* [[PDFTextField.disableFileSelection]]. For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* if (textField.isFileSelector()) console.log('Is a file selector')
	* ```
	* @returns Whether or not this field should contain file paths.
	*/
	PDFTextField.prototype.isFileSelector = function() {
		return this.acroField.hasFlag(AcroTextFlags.FileSelect);
	};
	/**
	* Indicate that this text field is intended to store a file path. The
	* contents of the file stored at that path should be submitted as the value
	* of the field. For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* textField.enableFileSelection()
	* ```
	*/
	PDFTextField.prototype.enableFileSelection = function() {
		this.acroField.setFlagTo(AcroTextFlags.FileSelect, true);
	};
	/**
	* Indicate that this text field is **not** intended to store a file path.
	* For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* textField.disableFileSelection()
	* ```
	*/
	PDFTextField.prototype.disableFileSelection = function() {
		this.acroField.setFlagTo(AcroTextFlags.FileSelect, false);
	};
	/**
	* Returns `true` if the text entered in this field should be spell checked
	* by PDF readers. See [[PDFTextField.enableSpellChecking]] and
	* [[PDFTextField.disableSpellChecking]]. For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* if (textField.isSpellChecked()) console.log('Spell checking is enabled')
	* ```
	* @returns Whether or not this field should be spell checked.
	*/
	PDFTextField.prototype.isSpellChecked = function() {
		return !this.acroField.hasFlag(AcroTextFlags.DoNotSpellCheck);
	};
	/**
	* Allow PDF readers to spell check the text entered in this field.
	* For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* textField.enableSpellChecking()
	* ```
	*/
	PDFTextField.prototype.enableSpellChecking = function() {
		this.acroField.setFlagTo(AcroTextFlags.DoNotSpellCheck, false);
	};
	/**
	* Do not allow PDF readers to spell check the text entered in this field.
	* For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* textField.disableSpellChecking()
	* ```
	*/
	PDFTextField.prototype.disableSpellChecking = function() {
		this.acroField.setFlagTo(AcroTextFlags.DoNotSpellCheck, true);
	};
	/**
	* Returns `true` if PDF readers should allow the user to scroll the text
	* field when its contents do not fit within the field's view bounds. See
	* [[PDFTextField.enableScrolling]] and [[PDFTextField.disableScrolling]].
	* For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* if (textField.isScrollable()) console.log('Scrolling is enabled')
	* ```
	* @returns Whether or not the field is scrollable in PDF readers.
	*/
	PDFTextField.prototype.isScrollable = function() {
		return !this.acroField.hasFlag(AcroTextFlags.DoNotScroll);
	};
	/**
	* Allow PDF readers to present a scroll bar to the user when the contents
	* of this text field do not fit within its view bounds. For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* textField.enableScrolling()
	* ```
	* A horizontal scroll bar should be shown for singleline fields. A vertical
	* scroll bar should be shown for multiline fields.
	*/
	PDFTextField.prototype.enableScrolling = function() {
		this.acroField.setFlagTo(AcroTextFlags.DoNotScroll, false);
	};
	/**
	* Do not allow PDF readers to present a scroll bar to the user when the
	* contents of this text field do not fit within its view bounds. For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* textField.disableScrolling()
	* ```
	*/
	PDFTextField.prototype.disableScrolling = function() {
		this.acroField.setFlagTo(AcroTextFlags.DoNotScroll, true);
	};
	/**
	* Returns `true` if this is a combed text field. This means that the field
	* is split into `n` equal size cells with one character in each (where `n`
	* is equal to the max length of the text field). The result is that all
	* characters in this field are displayed an equal distance apart from one
	* another. See [[PDFTextField.enableCombing]] and
	* [[PDFTextField.disableCombing]]. For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* if (textField.isCombed()) console.log('Combing is enabled')
	* ```
	* Note that in order for a text field to be combed, the following must be
	* true (in addition to enabling combing):
	* * It must not be a multiline field (see [[PDFTextField.isMultiline]])
	* * It must not be a password field (see [[PDFTextField.isPassword]])
	* * It must not be a file selector field (see [[PDFTextField.isFileSelector]])
	* * It must have a max length defined (see [[PDFTextField.setMaxLength]])
	* @returns Whether or not this field is combed.
	*/
	PDFTextField.prototype.isCombed = function() {
		return this.acroField.hasFlag(AcroTextFlags.Comb) && !this.isMultiline() && !this.isPassword() && !this.isFileSelector() && this.getMaxLength() !== void 0;
	};
	/**
	* Split this field into `n` equal size cells with one character in each
	* (where `n` is equal to the max length of the text field). This will cause
	* all characters in the field to be displayed an equal distance apart from
	* one another. For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* textField.enableCombing()
	* ```
	*
	* In addition to calling this method, text fields must have a max length
	* defined in order to be combed (see [[PDFTextField.setMaxLength]]).
	*
	* This method will also call the following three methods internally:
	* * [[PDFTextField.disableMultiline]]
	* * [[PDFTextField.disablePassword]]
	* * [[PDFTextField.disableFileSelection]]
	*
	* This method will mark this text field as dirty. See
	* [[PDFTextField.setText]] for more details about what this means.
	*/
	PDFTextField.prototype.enableCombing = function() {
		if (this.getMaxLength() === void 0) console.warn("PDFTextFields must have a max length in order to be combed");
		this.markAsDirty();
		this.disableMultiline();
		this.disablePassword();
		this.disableFileSelection();
		this.acroField.setFlagTo(AcroTextFlags.Comb, true);
	};
	/**
	* Turn off combing for this text field. For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* textField.disableCombing()
	* ```
	* See [[PDFTextField.isCombed]] and [[PDFTextField.enableCombing]] for more
	* information about what combing is.
	*
	* This method will mark this text field as dirty. See
	* [[PDFTextField.setText]] for more details about what this means.
	*/
	PDFTextField.prototype.disableCombing = function() {
		this.markAsDirty();
		this.acroField.setFlagTo(AcroTextFlags.Comb, false);
	};
	/**
	* Returns `true` if this text field contains rich text. See
	* [[PDFTextField.enableRichFormatting]] and
	* [[PDFTextField.disableRichFormatting]]. For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* if (textField.isRichFormatted()) console.log('Rich formatting enabled')
	* ```
	* @returns Whether or not this field contains rich text.
	*/
	PDFTextField.prototype.isRichFormatted = function() {
		return this.acroField.hasFlag(AcroTextFlags.RichText);
	};
	/**
	* Indicate that this field contains XFA data - or rich text. For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* textField.enableRichFormatting()
	* ```
	* Note that `pdf-lib` does not support reading or writing rich text fields.
	* Nor do most PDF readers and writers. Rich text fields are based on XFA
	* (XML Forms Architecture). Relatively few PDFs use rich text fields or XFA.
	* Unlike PDF itself, XFA is not an ISO standard. XFA has been deprecated in
	* PDF 2.0:
	* * https://en.wikipedia.org/wiki/XFA
	* * http://blog.pdfshareforms.com/pdf-2-0-release-bid-farewell-xfa-forms/
	*/
	PDFTextField.prototype.enableRichFormatting = function() {
		this.acroField.setFlagTo(AcroTextFlags.RichText, true);
	};
	/**
	* Indicate that this is a standard text field that does not XFA data (rich
	* text). For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* textField.disableRichFormatting()
	* ```
	*/
	PDFTextField.prototype.disableRichFormatting = function() {
		this.acroField.setFlagTo(AcroTextFlags.RichText, false);
	};
	/**
	* Show this text field on the specified page. For example:
	* ```js
	* const ubuntuFont = await pdfDoc.embedFont(ubuntuFontBytes)
	* const page = pdfDoc.addPage()
	*
	* const form = pdfDoc.getForm()
	* const textField = form.createTextField('best.gundam')
	* textField.setText('Exia')
	*
	* textField.addToPage(page, {
	*   x: 50,
	*   y: 75,
	*   width: 200,
	*   height: 100,
	*   textColor: rgb(1, 0, 0),
	*   backgroundColor: rgb(0, 1, 0),
	*   borderColor: rgb(0, 0, 1),
	*   borderWidth: 2,
	*   rotate: degrees(90),
	*   font: ubuntuFont,
	* })
	* ```
	* This will create a new widget for this text field.
	* @param page The page to which this text field widget should be added.
	* @param options The options to be used when adding this text field widget.
	*/
	PDFTextField.prototype.addToPage = function(page, options) {
		var _a, _b, _c, _d, _e, _f, _g;
		assertIs(page, "page", [[PDFPage, "PDFPage"]]);
		assertFieldAppearanceOptions(options);
		if (!options) options = {};
		if (!("textColor" in options)) options.textColor = rgb(0, 0, 0);
		if (!("backgroundColor" in options)) options.backgroundColor = rgb(1, 1, 1);
		if (!("borderColor" in options)) options.borderColor = rgb(0, 0, 0);
		if (!("borderWidth" in options)) options.borderWidth = 1;
		var widget = this.createWidget({
			x: (_a = options.x) !== null && _a !== void 0 ? _a : 0,
			y: (_b = options.y) !== null && _b !== void 0 ? _b : 0,
			width: (_c = options.width) !== null && _c !== void 0 ? _c : 200,
			height: (_d = options.height) !== null && _d !== void 0 ? _d : 50,
			textColor: options.textColor,
			backgroundColor: options.backgroundColor,
			borderColor: options.borderColor,
			borderWidth: (_e = options.borderWidth) !== null && _e !== void 0 ? _e : 0,
			rotate: (_f = options.rotate) !== null && _f !== void 0 ? _f : degrees(0),
			hidden: options.hidden,
			page: page.ref
		});
		var widgetRef = this.doc.context.register(widget.dict);
		this.acroField.addWidget(widgetRef);
		var font = (_g = options.font) !== null && _g !== void 0 ? _g : this.doc.getForm().getDefaultFont();
		this.updateWidgetAppearance(widget, font);
		page.node.addAnnot(widgetRef);
	};
	/**
	* Returns `true` if this text field has been marked as dirty, or if any of
	* this text field's widgets do not have an appearance stream. For example:
	* ```js
	* const textField = form.getTextField('some.text.field')
	* if (textField.needsAppearancesUpdate()) console.log('Needs update')
	* ```
	* @returns Whether or not this text field needs an appearance update.
	*/
	PDFTextField.prototype.needsAppearancesUpdate = function() {
		var _a;
		if (this.isDirty()) return true;
		var widgets = this.acroField.getWidgets();
		for (var idx = 0, len = widgets.length; idx < len; idx++) if (!(((_a = widgets[idx].getAppearances()) === null || _a === void 0 ? void 0 : _a.normal) instanceof PDFStream)) return true;
		return false;
	};
	/**
	* Update the appearance streams for each of this text field's widgets using
	* the default appearance provider for text fields. For example:
	* ```js
	* const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
	* const textField = form.getTextField('some.text.field')
	* textField.defaultUpdateAppearances(helvetica)
	* ```
	* @param font The font to be used for creating the appearance streams.
	*/
	PDFTextField.prototype.defaultUpdateAppearances = function(font) {
		assertIs(font, "font", [[PDFFont, "PDFFont"]]);
		this.updateAppearances(font);
	};
	/**
	* Update the appearance streams for each of this text field's widgets using
	* the given appearance provider. If no `provider` is passed, the default
	* appearance provider for text fields will be used. For example:
	* ```js
	* const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
	* const textField = form.getTextField('some.text.field')
	* textField.updateAppearances(helvetica, (field, widget, font) => {
	*   ...
	*   return drawTextField(...)
	* })
	* ```
	* @param font The font to be used for creating the appearance streams.
	* @param provider Optionally, the appearance provider to be used for
	*                 generating the contents of the appearance streams.
	*/
	PDFTextField.prototype.updateAppearances = function(font, provider) {
		assertIs(font, "font", [[PDFFont, "PDFFont"]]);
		assertOrUndefined(provider, "provider", [Function]);
		var widgets = this.acroField.getWidgets();
		for (var idx = 0, len = widgets.length; idx < len; idx++) {
			var widget = widgets[idx];
			this.updateWidgetAppearance(widget, font, provider);
		}
		this.markAsClean();
	};
	PDFTextField.prototype.updateWidgetAppearance = function(widget, font, provider) {
		var appearances = normalizeAppearance((provider !== null && provider !== void 0 ? provider : defaultTextFieldAppearanceProvider)(this, widget, font));
		this.updateWidgetAppearanceWithFont(widget, font, appearances);
	};
	/**
	* > **NOTE:** You probably don't want to call this method directly. Instead,
	* > consider using the [[PDFForm.getTextField]] method, which will create an
	* > instance of [[PDFTextField]] for you.
	*
	* Create an instance of [[PDFTextField]] from an existing acroText and ref
	*
	* @param acroText The underlying `PDFAcroText` for this text field.
	* @param ref The unique reference for this text field.
	* @param doc The document to which this text field will belong.
	*/
	PDFTextField.of = function(acroText, ref, doc) {
		return new PDFTextField(acroText, ref, doc);
	};
	return PDFTextField;
}(PDFField);
//#endregion
//#region node_modules/pdf-lib/es/api/StandardFonts.js
var StandardFonts;
(function(StandardFonts) {
	StandardFonts["Courier"] = "Courier";
	StandardFonts["CourierBold"] = "Courier-Bold";
	StandardFonts["CourierOblique"] = "Courier-Oblique";
	StandardFonts["CourierBoldOblique"] = "Courier-BoldOblique";
	StandardFonts["Helvetica"] = "Helvetica";
	StandardFonts["HelveticaBold"] = "Helvetica-Bold";
	StandardFonts["HelveticaOblique"] = "Helvetica-Oblique";
	StandardFonts["HelveticaBoldOblique"] = "Helvetica-BoldOblique";
	StandardFonts["TimesRoman"] = "Times-Roman";
	StandardFonts["TimesRomanBold"] = "Times-Bold";
	StandardFonts["TimesRomanItalic"] = "Times-Italic";
	StandardFonts["TimesRomanBoldItalic"] = "Times-BoldItalic";
	StandardFonts["Symbol"] = "Symbol";
	StandardFonts["ZapfDingbats"] = "ZapfDingbats";
})(StandardFonts || (StandardFonts = {}));
//#endregion
//#region node_modules/pdf-lib/es/api/form/PDFForm.js
/**
* Represents the interactive form of a [[PDFDocument]].
*
* Interactive forms (sometimes called _AcroForms_) are collections of fields
* designed to gather information from a user. A PDF document may contains any
* number of fields that appear on various pages, all of which make up a single,
* global interactive form spanning the entire document. This means that
* instances of [[PDFDocument]] shall contain at most one [[PDFForm]].
*
* The fields of an interactive form are represented by [[PDFField]] instances.
*/
var PDFForm = function() {
	function PDFForm(acroForm, doc) {
		var _this = this;
		this.embedDefaultFont = function() {
			return _this.doc.embedStandardFont(StandardFonts.Helvetica);
		};
		assertIs(acroForm, "acroForm", [[PDFAcroForm, "PDFAcroForm"]]);
		assertIs(doc, "doc", [[PDFDocument, "PDFDocument"]]);
		this.acroForm = acroForm;
		this.doc = doc;
		this.dirtyFields = /* @__PURE__ */ new Set();
		this.defaultFontCache = Cache.populatedBy(this.embedDefaultFont);
	}
	/**
	* Returns `true` if this [[PDFForm]] has XFA data. Most PDFs with form
	* fields do not use XFA as it is not widely supported by PDF readers.
	*
	* > `pdf-lib` does not support creation, modification, or reading of XFA
	* > fields.
	*
	* For example:
	* ```js
	* const form = pdfDoc.getForm()
	* if (form.hasXFA()) console.log('PDF has XFA data')
	* ```
	* @returns Whether or not this form has XFA data.
	*/
	PDFForm.prototype.hasXFA = function() {
		return this.acroForm.dict.has(PDFName.of("XFA"));
	};
	/**
	* Disconnect the XFA data from this [[PDFForm]] (if any exists). This will
	* force readers to fallback to standard fields if the [[PDFDocument]]
	* contains any. For example:
	*
	* For example:
	* ```js
	* const form = pdfDoc.getForm()
	* form.deleteXFA()
	* ```
	*/
	PDFForm.prototype.deleteXFA = function() {
		this.acroForm.dict.delete(PDFName.of("XFA"));
	};
	/**
	* Get all fields contained in this [[PDFForm]]. For example:
	* ```js
	* const form = pdfDoc.getForm()
	* const fields = form.getFields()
	* fields.forEach(field => {
	*   const type = field.constructor.name
	*   const name = field.getName()
	*   console.log(`${type}: ${name}`)
	* })
	* ```
	* @returns An array of all fields in this form.
	*/
	PDFForm.prototype.getFields = function() {
		var allFields = this.acroForm.getAllFields();
		var fields = [];
		for (var idx = 0, len = allFields.length; idx < len; idx++) {
			var _a = allFields[idx], acroField = _a[0], ref = _a[1];
			var field = convertToPDFField(acroField, ref, this.doc);
			if (field) fields.push(field);
		}
		return fields;
	};
	/**
	* Get the field in this [[PDFForm]] with the given name. For example:
	* ```js
	* const form = pdfDoc.getForm()
	* const field = form.getFieldMaybe('Page1.Foo.Bar[0]')
	* if (field) console.log('Field exists!')
	* ```
	* @param name A fully qualified field name.
	* @returns The field with the specified name, if one exists.
	*/
	PDFForm.prototype.getFieldMaybe = function(name) {
		assertIs(name, "name", ["string"]);
		var fields = this.getFields();
		for (var idx = 0, len = fields.length; idx < len; idx++) {
			var field = fields[idx];
			if (field.getName() === name) return field;
		}
	};
	/**
	* Get the field in this [[PDFForm]] with the given name. For example:
	* ```js
	* const form = pdfDoc.getForm()
	* const field = form.getField('Page1.Foo.Bar[0]')
	* ```
	* If no field exists with the provided name, an error will be thrown.
	* @param name A fully qualified field name.
	* @returns The field with the specified name.
	*/
	PDFForm.prototype.getField = function(name) {
		assertIs(name, "name", ["string"]);
		var field = this.getFieldMaybe(name);
		if (field) return field;
		throw new NoSuchFieldError(name);
	};
	/**
	* Get the button field in this [[PDFForm]] with the given name. For example:
	* ```js
	* const form = pdfDoc.getForm()
	* const button = form.getButton('Page1.Foo.Button[0]')
	* ```
	* An error will be thrown if no field exists with the provided name, or if
	* the field exists but is not a button.
	* @param name A fully qualified button name.
	* @returns The button with the specified name.
	*/
	PDFForm.prototype.getButton = function(name) {
		assertIs(name, "name", ["string"]);
		var field = this.getField(name);
		if (field instanceof PDFButton) return field;
		throw new UnexpectedFieldTypeError(name, PDFButton, field);
	};
	/**
	* Get the check box field in this [[PDFForm]] with the given name.
	* For example:
	* ```js
	* const form = pdfDoc.getForm()
	* const checkBox = form.getCheckBox('Page1.Foo.CheckBox[0]')
	* checkBox.check()
	* ```
	* An error will be thrown if no field exists with the provided name, or if
	* the field exists but is not a check box.
	* @param name A fully qualified check box name.
	* @returns The check box with the specified name.
	*/
	PDFForm.prototype.getCheckBox = function(name) {
		assertIs(name, "name", ["string"]);
		var field = this.getField(name);
		if (field instanceof PDFCheckBox) return field;
		throw new UnexpectedFieldTypeError(name, PDFCheckBox, field);
	};
	/**
	* Get the dropdown field in this [[PDFForm]] with the given name.
	* For example:
	* ```js
	* const form = pdfDoc.getForm()
	* const dropdown = form.getDropdown('Page1.Foo.Dropdown[0]')
	* const options = dropdown.getOptions()
	* dropdown.select(options[0])
	* ```
	* An error will be thrown if no field exists with the provided name, or if
	* the field exists but is not a dropdown.
	* @param name A fully qualified dropdown name.
	* @returns The dropdown with the specified name.
	*/
	PDFForm.prototype.getDropdown = function(name) {
		assertIs(name, "name", ["string"]);
		var field = this.getField(name);
		if (field instanceof PDFDropdown) return field;
		throw new UnexpectedFieldTypeError(name, PDFDropdown, field);
	};
	/**
	* Get the option list field in this [[PDFForm]] with the given name.
	* For example:
	* ```js
	* const form = pdfDoc.getForm()
	* const optionList = form.getOptionList('Page1.Foo.OptionList[0]')
	* const options = optionList.getOptions()
	* optionList.select(options[0])
	* ```
	* An error will be thrown if no field exists with the provided name, or if
	* the field exists but is not an option list.
	* @param name A fully qualified option list name.
	* @returns The option list with the specified name.
	*/
	PDFForm.prototype.getOptionList = function(name) {
		assertIs(name, "name", ["string"]);
		var field = this.getField(name);
		if (field instanceof PDFOptionList) return field;
		throw new UnexpectedFieldTypeError(name, PDFOptionList, field);
	};
	/**
	* Get the radio group field in this [[PDFForm]] with the given name.
	* For example:
	* ```js
	* const form = pdfDoc.getForm()
	* const radioGroup = form.getRadioGroup('Page1.Foo.RadioGroup[0]')
	* const options = radioGroup.getOptions()
	* radioGroup.select(options[0])
	* ```
	* An error will be thrown if no field exists with the provided name, or if
	* the field exists but is not a radio group.
	* @param name A fully qualified radio group name.
	* @returns The radio group with the specified name.
	*/
	PDFForm.prototype.getRadioGroup = function(name) {
		assertIs(name, "name", ["string"]);
		var field = this.getField(name);
		if (field instanceof PDFRadioGroup) return field;
		throw new UnexpectedFieldTypeError(name, PDFRadioGroup, field);
	};
	/**
	* Get the signature field in this [[PDFForm]] with the given name.
	* For example:
	* ```js
	* const form = pdfDoc.getForm()
	* const signature = form.getSignature('Page1.Foo.Signature[0]')
	* ```
	* An error will be thrown if no field exists with the provided name, or if
	* the field exists but is not a signature.
	* @param name A fully qualified signature name.
	* @returns The signature with the specified name.
	*/
	PDFForm.prototype.getSignature = function(name) {
		assertIs(name, "name", ["string"]);
		var field = this.getField(name);
		if (field instanceof PDFSignature) return field;
		throw new UnexpectedFieldTypeError(name, PDFSignature, field);
	};
	/**
	* Get the text field in this [[PDFForm]] with the given name.
	* For example:
	* ```js
	* const form = pdfDoc.getForm()
	* const textField = form.getTextField('Page1.Foo.TextField[0]')
	* textField.setText('Are you designed to act or to be acted upon?')
	* ```
	* An error will be thrown if no field exists with the provided name, or if
	* the field exists but is not a text field.
	* @param name A fully qualified text field name.
	* @returns The text field with the specified name.
	*/
	PDFForm.prototype.getTextField = function(name) {
		assertIs(name, "name", ["string"]);
		var field = this.getField(name);
		if (field instanceof PDFTextField) return field;
		throw new UnexpectedFieldTypeError(name, PDFTextField, field);
	};
	/**
	* Create a new button field in this [[PDFForm]] with the given name.
	* For example:
	* ```js
	* const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
	* const page = pdfDoc.addPage()
	*
	* const form = pdfDoc.getForm()
	* const button = form.createButton('cool.new.button')
	*
	* button.addToPage('Do Stuff', font, page)
	* ```
	* An error will be thrown if a field already exists with the provided name.
	* @param name The fully qualified name for the new button.
	* @returns The new button field.
	*/
	PDFForm.prototype.createButton = function(name) {
		assertIs(name, "name", ["string"]);
		var nameParts = splitFieldName(name);
		var parent = this.findOrCreateNonTerminals(nameParts.nonTerminal);
		var button = PDFAcroPushButton.create(this.doc.context);
		button.setPartialName(nameParts.terminal);
		addFieldToParent(parent, [button, button.ref], nameParts.terminal);
		return PDFButton.of(button, button.ref, this.doc);
	};
	/**
	* Create a new check box field in this [[PDFForm]] with the given name.
	* For example:
	* ```js
	* const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
	* const page = pdfDoc.addPage()
	*
	* const form = pdfDoc.getForm()
	* const checkBox = form.createCheckBox('cool.new.checkBox')
	*
	* checkBox.addToPage(page)
	* ```
	* An error will be thrown if a field already exists with the provided name.
	* @param name The fully qualified name for the new check box.
	* @returns The new check box field.
	*/
	PDFForm.prototype.createCheckBox = function(name) {
		assertIs(name, "name", ["string"]);
		var nameParts = splitFieldName(name);
		var parent = this.findOrCreateNonTerminals(nameParts.nonTerminal);
		var checkBox = PDFAcroCheckBox.create(this.doc.context);
		checkBox.setPartialName(nameParts.terminal);
		addFieldToParent(parent, [checkBox, checkBox.ref], nameParts.terminal);
		return PDFCheckBox.of(checkBox, checkBox.ref, this.doc);
	};
	/**
	* Create a new dropdown field in this [[PDFForm]] with the given name.
	* For example:
	* ```js
	* const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
	* const page = pdfDoc.addPage()
	*
	* const form = pdfDoc.getForm()
	* const dropdown = form.createDropdown('cool.new.dropdown')
	*
	* dropdown.addToPage(font, page)
	* ```
	* An error will be thrown if a field already exists with the provided name.
	* @param name The fully qualified name for the new dropdown.
	* @returns The new dropdown field.
	*/
	PDFForm.prototype.createDropdown = function(name) {
		assertIs(name, "name", ["string"]);
		var nameParts = splitFieldName(name);
		var parent = this.findOrCreateNonTerminals(nameParts.nonTerminal);
		var comboBox = PDFAcroComboBox.create(this.doc.context);
		comboBox.setPartialName(nameParts.terminal);
		addFieldToParent(parent, [comboBox, comboBox.ref], nameParts.terminal);
		return PDFDropdown.of(comboBox, comboBox.ref, this.doc);
	};
	/**
	* Create a new option list field in this [[PDFForm]] with the given name.
	* For example:
	* ```js
	* const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
	* const page = pdfDoc.addPage()
	*
	* const form = pdfDoc.getForm()
	* const optionList = form.createOptionList('cool.new.optionList')
	*
	* optionList.addToPage(font, page)
	* ```
	* An error will be thrown if a field already exists with the provided name.
	* @param name The fully qualified name for the new option list.
	* @returns The new option list field.
	*/
	PDFForm.prototype.createOptionList = function(name) {
		assertIs(name, "name", ["string"]);
		var nameParts = splitFieldName(name);
		var parent = this.findOrCreateNonTerminals(nameParts.nonTerminal);
		var listBox = PDFAcroListBox.create(this.doc.context);
		listBox.setPartialName(nameParts.terminal);
		addFieldToParent(parent, [listBox, listBox.ref], nameParts.terminal);
		return PDFOptionList.of(listBox, listBox.ref, this.doc);
	};
	/**
	* Create a new radio group field in this [[PDFForm]] with the given name.
	* For example:
	* ```js
	* const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
	* const page = pdfDoc.addPage()
	*
	* const form = pdfDoc.getForm()
	* const radioGroup = form.createRadioGroup('cool.new.radioGroup')
	*
	* radioGroup.addOptionToPage('is-dog', page, { y: 0 })
	* radioGroup.addOptionToPage('is-cat', page, { y: 75 })
	* ```
	* An error will be thrown if a field already exists with the provided name.
	* @param name The fully qualified name for the new radio group.
	* @returns The new radio group field.
	*/
	PDFForm.prototype.createRadioGroup = function(name) {
		assertIs(name, "name", ["string"]);
		var nameParts = splitFieldName(name);
		var parent = this.findOrCreateNonTerminals(nameParts.nonTerminal);
		var radioButton = PDFAcroRadioButton.create(this.doc.context);
		radioButton.setPartialName(nameParts.terminal);
		addFieldToParent(parent, [radioButton, radioButton.ref], nameParts.terminal);
		return PDFRadioGroup.of(radioButton, radioButton.ref, this.doc);
	};
	/**
	* Create a new text field in this [[PDFForm]] with the given name.
	* For example:
	* ```js
	* const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
	* const page = pdfDoc.addPage()
	*
	* const form = pdfDoc.getForm()
	* const textField = form.createTextField('cool.new.textField')
	*
	* textField.addToPage(font, page)
	* ```
	* An error will be thrown if a field already exists with the provided name.
	* @param name The fully qualified name for the new radio group.
	* @returns The new radio group field.
	*/
	PDFForm.prototype.createTextField = function(name) {
		assertIs(name, "name", ["string"]);
		var nameParts = splitFieldName(name);
		var parent = this.findOrCreateNonTerminals(nameParts.nonTerminal);
		var text = PDFAcroText.create(this.doc.context);
		text.setPartialName(nameParts.terminal);
		addFieldToParent(parent, [text, text.ref], nameParts.terminal);
		return PDFTextField.of(text, text.ref, this.doc);
	};
	/**
	* Flatten all fields in this [[PDFForm]].
	*
	* Flattening a form field will take the current appearance for each of that
	* field's widgets and make them part of their page's content stream. All form
	* fields and annotations associated are then removed. Note that once a form
	* has been flattened its fields can no longer be accessed or edited.
	*
	* This operation is often used after filling form fields to ensure a
	* consistent appearance across different PDF readers and/or printers.
	* Another common use case is to copy a template document with form fields
	* into another document. In this scenario you would load the template
	* document, fill its fields, flatten it, and then copy its pages into the
	* recipient document - the filled fields will be copied over.
	*
	* For example:
	* ```js
	* const form = pdfDoc.getForm();
	* form.flatten();
	* ```
	*/
	PDFForm.prototype.flatten = function(options) {
		if (options === void 0) options = { updateFieldAppearances: true };
		if (options.updateFieldAppearances) this.updateFieldAppearances();
		var fields = this.getFields();
		for (var i = 0, lenFields = fields.length; i < lenFields; i++) {
			var field = fields[i];
			var widgets = field.acroField.getWidgets();
			for (var j = 0, lenWidgets = widgets.length; j < lenWidgets; j++) {
				var widget = widgets[j];
				var page = this.findWidgetPage(widget);
				var widgetRef = this.findWidgetAppearanceRef(field, widget);
				var xObjectKey = page.node.newXObject("FlatWidget", widgetRef);
				var rectangle = widget.getRectangle();
				var operators = __spreadArrays([pushGraphicsState(), translate(rectangle.x, rectangle.y)], rotateInPlace(__assign(__assign({}, rectangle), { rotation: 0 })), [drawObject(xObjectKey), popGraphicsState()]).filter(Boolean);
				page.pushOperators.apply(page, operators);
			}
			this.removeField(field);
		}
	};
	/**
	* Remove a field from this [[PDFForm]].
	*
	* For example:
	* ```js
	* const form = pdfDoc.getForm();
	* const ageField = form.getFields().find(x => x.getName() === 'Age');
	* form.removeField(ageField);
	* ```
	*/
	PDFForm.prototype.removeField = function(field) {
		var widgets = field.acroField.getWidgets();
		var pages = /* @__PURE__ */ new Set();
		for (var i = 0, len = widgets.length; i < len; i++) {
			var widget = widgets[i];
			var widgetRef = this.findWidgetAppearanceRef(field, widget);
			var page = this.findWidgetPage(widget);
			pages.add(page);
			page.node.removeAnnot(widgetRef);
		}
		pages.forEach(function(page) {
			return page.node.removeAnnot(field.ref);
		});
		this.acroForm.removeField(field.acroField);
		var fieldKids = field.acroField.normalizedEntries().Kids;
		var kidsCount = fieldKids.size();
		for (var childIndex = 0; childIndex < kidsCount; childIndex++) {
			var child = fieldKids.get(childIndex);
			if (child instanceof PDFRef) this.doc.context.delete(child);
		}
		this.doc.context.delete(field.ref);
	};
	/**
	* Update the appearance streams for all widgets of all fields in this
	* [[PDFForm]]. Appearance streams will only be created for a widget if it
	* does not have any existing appearance streams, or the field's value has
	* changed (e.g. by calling [[PDFTextField.setText]] or
	* [[PDFDropdown.select]]).
	*
	* For example:
	* ```js
	* const courier = await pdfDoc.embedFont(StandardFonts.Courier)
	* const form = pdfDoc.getForm()
	* form.updateFieldAppearances(courier)
	* ```
	*
	* **IMPORTANT:** The default value for the `font` parameter is
	* [[StandardFonts.Helvetica]]. Note that this is a WinAnsi font. This means
	* that encoding errors will be thrown if any fields contain text with
	* characters outside the WinAnsi character set (the latin alphabet).
	*
	* Embedding a custom font and passing that as the `font`
	* parameter allows you to generate appearance streams with non WinAnsi
	* characters (assuming your custom font supports them).
	*
	* > **NOTE:** The [[PDFDocument.save]] method will call this method to
	* > update appearances automatically if a form was accessed via the
	* > [[PDFDocument.getForm]] method prior to saving.
	*
	* @param font Optionally, the font to use when creating new appearances.
	*/
	PDFForm.prototype.updateFieldAppearances = function(font) {
		assertOrUndefined(font, "font", [[PDFFont, "PDFFont"]]);
		font = font !== null && font !== void 0 ? font : this.getDefaultFont();
		var fields = this.getFields();
		for (var idx = 0, len = fields.length; idx < len; idx++) {
			var field = fields[idx];
			if (field.needsAppearancesUpdate()) field.defaultUpdateAppearances(font);
		}
	};
	/**
	* Mark a field as dirty. This will cause its appearance streams to be
	* updated by [[PDFForm.updateFieldAppearances]].
	* ```js
	* const form = pdfDoc.getForm()
	* const field = form.getField('foo.bar')
	* form.markFieldAsDirty(field.ref)
	* ```
	* @param fieldRef The reference to the field that should be marked.
	*/
	PDFForm.prototype.markFieldAsDirty = function(fieldRef) {
		assertOrUndefined(fieldRef, "fieldRef", [[PDFRef, "PDFRef"]]);
		this.dirtyFields.add(fieldRef);
	};
	/**
	* Mark a field as dirty. This will cause its appearance streams to not be
	* updated by [[PDFForm.updateFieldAppearances]].
	* ```js
	* const form = pdfDoc.getForm()
	* const field = form.getField('foo.bar')
	* form.markFieldAsClean(field.ref)
	* ```
	* @param fieldRef The reference to the field that should be marked.
	*/
	PDFForm.prototype.markFieldAsClean = function(fieldRef) {
		assertOrUndefined(fieldRef, "fieldRef", [[PDFRef, "PDFRef"]]);
		this.dirtyFields.delete(fieldRef);
	};
	/**
	* Returns `true` is the specified field has been marked as dirty.
	* ```js
	* const form = pdfDoc.getForm()
	* const field = form.getField('foo.bar')
	* if (form.fieldIsDirty(field.ref)) console.log('Field is dirty')
	* ```
	* @param fieldRef The reference to the field that should be checked.
	* @returns Whether or not the specified field is dirty.
	*/
	PDFForm.prototype.fieldIsDirty = function(fieldRef) {
		assertOrUndefined(fieldRef, "fieldRef", [[PDFRef, "PDFRef"]]);
		return this.dirtyFields.has(fieldRef);
	};
	PDFForm.prototype.getDefaultFont = function() {
		return this.defaultFontCache.access();
	};
	PDFForm.prototype.findWidgetPage = function(widget) {
		var pageRef = widget.P();
		var page = this.doc.getPages().find(function(x) {
			return x.ref === pageRef;
		});
		if (page === void 0) {
			var widgetRef = this.doc.context.getObjectRef(widget.dict);
			if (widgetRef === void 0) throw new Error("Could not find PDFRef for PDFObject");
			page = this.doc.findPageForAnnotationRef(widgetRef);
			if (page === void 0) throw new Error("Could not find page for PDFRef " + widgetRef);
		}
		return page;
	};
	PDFForm.prototype.findWidgetAppearanceRef = function(field, widget) {
		var _a;
		var refOrDict = widget.getNormalAppearance();
		if (refOrDict instanceof PDFDict && (field instanceof PDFCheckBox || field instanceof PDFRadioGroup)) {
			var value = field.acroField.getValue();
			var ref = (_a = refOrDict.get(value)) !== null && _a !== void 0 ? _a : refOrDict.get(PDFName.of("Off"));
			if (ref instanceof PDFRef) refOrDict = ref;
		}
		if (!(refOrDict instanceof PDFRef)) {
			var name_1 = field.getName();
			throw new Error("Failed to extract appearance ref for: " + name_1);
		}
		return refOrDict;
	};
	PDFForm.prototype.findOrCreateNonTerminals = function(partialNames) {
		var nonTerminal = [this.acroForm];
		for (var idx = 0, len = partialNames.length; idx < len; idx++) {
			var namePart = partialNames[idx];
			if (!namePart) throw new InvalidFieldNamePartError(namePart);
			var parent_1 = nonTerminal[0], parentRef = nonTerminal[1];
			var res = this.findNonTerminal(namePart, parent_1);
			if (res) nonTerminal = res;
			else {
				var node = PDFAcroNonTerminal.create(this.doc.context);
				node.setPartialName(namePart);
				node.setParent(parentRef);
				var nodeRef = this.doc.context.register(node.dict);
				parent_1.addField(nodeRef);
				nonTerminal = [node, nodeRef];
			}
		}
		return nonTerminal;
	};
	PDFForm.prototype.findNonTerminal = function(partialName, parent) {
		var fields = parent instanceof PDFAcroForm ? this.acroForm.getFields() : createPDFAcroFields(parent.Kids());
		for (var idx = 0, len = fields.length; idx < len; idx++) {
			var _a = fields[idx], field = _a[0], ref = _a[1];
			if (field.getPartialName() === partialName) {
				if (field instanceof PDFAcroNonTerminal) return [field, ref];
				throw new FieldAlreadyExistsError(partialName);
			}
		}
	};
	/**
	* > **NOTE:** You probably don't want to call this method directly. Instead,
	* > consider using the [[PDFDocument.getForm]] method, which will create an
	* > instance of [[PDFForm]] for you.
	*
	* Create an instance of [[PDFForm]] from an existing acroForm and embedder
	*
	* @param acroForm The underlying `PDFAcroForm` for this form.
	* @param doc The document to which the form will belong.
	*/
	PDFForm.of = function(acroForm, doc) {
		return new PDFForm(acroForm, doc);
	};
	return PDFForm;
}();
var convertToPDFField = function(field, ref, doc) {
	if (field instanceof PDFAcroPushButton) return PDFButton.of(field, ref, doc);
	if (field instanceof PDFAcroCheckBox) return PDFCheckBox.of(field, ref, doc);
	if (field instanceof PDFAcroComboBox) return PDFDropdown.of(field, ref, doc);
	if (field instanceof PDFAcroListBox) return PDFOptionList.of(field, ref, doc);
	if (field instanceof PDFAcroText) return PDFTextField.of(field, ref, doc);
	if (field instanceof PDFAcroRadioButton) return PDFRadioGroup.of(field, ref, doc);
	if (field instanceof PDFAcroSignature) return PDFSignature.of(field, ref, doc);
};
var splitFieldName = function(fullyQualifiedName) {
	if (fullyQualifiedName.length === 0) throw new Error("PDF field names must not be empty strings");
	var parts = fullyQualifiedName.split(".");
	for (var idx = 0, len = parts.length; idx < len; idx++) if (parts[idx] === "") throw new Error("Periods in PDF field names must be separated by at least one character: \"" + fullyQualifiedName + "\"");
	if (parts.length === 1) return {
		nonTerminal: [],
		terminal: parts[0]
	};
	return {
		nonTerminal: parts.slice(0, parts.length - 1),
		terminal: parts[parts.length - 1]
	};
};
var addFieldToParent = function(_a, _b, partialName) {
	var parent = _a[0], parentRef = _a[1];
	var field = _b[0], fieldRef = _b[1];
	var entries = parent.normalizedEntries();
	var fields = createPDFAcroFields("Kids" in entries ? entries.Kids : entries.Fields);
	for (var idx = 0, len = fields.length; idx < len; idx++) if (fields[idx][0].getPartialName() === partialName) throw new FieldAlreadyExistsError(partialName);
	parent.addField(fieldRef);
	field.setParent(parentRef);
};
//#endregion
//#region node_modules/pdf-lib/es/api/sizes.js
var PageSizes = {
	"4A0": [4767.87, 6740.79],
	"2A0": [3370.39, 4767.87],
	A0: [2383.94, 3370.39],
	A1: [1683.78, 2383.94],
	A2: [1190.55, 1683.78],
	A3: [841.89, 1190.55],
	A4: [595.28, 841.89],
	A5: [419.53, 595.28],
	A6: [297.64, 419.53],
	A7: [209.76, 297.64],
	A8: [147.4, 209.76],
	A9: [104.88, 147.4],
	A10: [73.7, 104.88],
	B0: [2834.65, 4008.19],
	B1: [2004.09, 2834.65],
	B2: [1417.32, 2004.09],
	B3: [1000.63, 1417.32],
	B4: [708.66, 1000.63],
	B5: [498.9, 708.66],
	B6: [354.33, 498.9],
	B7: [249.45, 354.33],
	B8: [175.75, 249.45],
	B9: [124.72, 175.75],
	B10: [87.87, 124.72],
	C0: [2599.37, 3676.54],
	C1: [1836.85, 2599.37],
	C2: [1298.27, 1836.85],
	C3: [918.43, 1298.27],
	C4: [649.13, 918.43],
	C5: [459.21, 649.13],
	C6: [323.15, 459.21],
	C7: [229.61, 323.15],
	C8: [161.57, 229.61],
	C9: [113.39, 161.57],
	C10: [79.37, 113.39],
	RA0: [2437.8, 3458.27],
	RA1: [1729.13, 2437.8],
	RA2: [1218.9, 1729.13],
	RA3: [864.57, 1218.9],
	RA4: [609.45, 864.57],
	SRA0: [2551.18, 3628.35],
	SRA1: [1814.17, 2551.18],
	SRA2: [1275.59, 1814.17],
	SRA3: [907.09, 1275.59],
	SRA4: [637.8, 907.09],
	Executive: [521.86, 756],
	Folio: [612, 936],
	Legal: [612, 1008],
	Letter: [612, 792],
	Tabloid: [792, 1224]
};
//#endregion
//#region node_modules/pdf-lib/es/api/PDFDocumentOptions.js
var ParseSpeeds;
(function(ParseSpeeds) {
	ParseSpeeds[ParseSpeeds["Fastest"] = Infinity] = "Fastest";
	ParseSpeeds[ParseSpeeds["Fast"] = 1500] = "Fast";
	ParseSpeeds[ParseSpeeds["Medium"] = 500] = "Medium";
	ParseSpeeds[ParseSpeeds["Slow"] = 100] = "Slow";
})(ParseSpeeds || (ParseSpeeds = {}));
//#endregion
//#region node_modules/pdf-lib/es/api/PDFEmbeddedFile.js
/**
* Represents a file that has been embedded in a [[PDFDocument]].
*/
var PDFEmbeddedFile = function() {
	function PDFEmbeddedFile(ref, doc, embedder) {
		this.alreadyEmbedded = false;
		this.ref = ref;
		this.doc = doc;
		this.embedder = embedder;
	}
	/**
	* > **NOTE:** You probably don't need to call this method directly. The
	* > [[PDFDocument.save]] and [[PDFDocument.saveAsBase64]] methods will
	* > automatically ensure all embeddable files get embedded.
	*
	* Embed this embeddable file in its document.
	*
	* @returns Resolves when the embedding is complete.
	*/
	PDFEmbeddedFile.prototype.embed = function() {
		return __awaiter(this, void 0, void 0, function() {
			var ref, Names, EmbeddedFiles, EFNames, AF;
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						if (!!this.alreadyEmbedded) return [3, 2];
						return [4, this.embedder.embedIntoContext(this.doc.context, this.ref)];
					case 1:
						ref = _a.sent();
						if (!this.doc.catalog.has(PDFName.of("Names"))) this.doc.catalog.set(PDFName.of("Names"), this.doc.context.obj({}));
						Names = this.doc.catalog.lookup(PDFName.of("Names"), PDFDict);
						if (!Names.has(PDFName.of("EmbeddedFiles"))) Names.set(PDFName.of("EmbeddedFiles"), this.doc.context.obj({}));
						EmbeddedFiles = Names.lookup(PDFName.of("EmbeddedFiles"), PDFDict);
						if (!EmbeddedFiles.has(PDFName.of("Names"))) EmbeddedFiles.set(PDFName.of("Names"), this.doc.context.obj([]));
						EFNames = EmbeddedFiles.lookup(PDFName.of("Names"), PDFArray);
						EFNames.push(PDFHexString.fromText(this.embedder.fileName));
						EFNames.push(ref);
						/**
						* The AF-Tag is needed to achieve PDF-A3 compliance for embedded files
						*
						* The following document outlines the uses cases of the associated files (AF) tag.
						* See:
						* https://www.pdfa.org/wp-content/uploads/2018/10/PDF20_AN002-AF.pdf
						*/
						if (!this.doc.catalog.has(PDFName.of("AF"))) this.doc.catalog.set(PDFName.of("AF"), this.doc.context.obj([]));
						AF = this.doc.catalog.lookup(PDFName.of("AF"), PDFArray);
						AF.push(ref);
						this.alreadyEmbedded = true;
						_a.label = 2;
					case 2: return [2];
				}
			});
		});
	};
	/**
	* > **NOTE:** You probably don't want to call this method directly. Instead,
	* > consider using the [[PDFDocument.attach]] method, which will create
	* instances of [[PDFEmbeddedFile]] for you.
	*
	* Create an instance of [[PDFEmbeddedFile]] from an existing ref and embedder
	*
	* @param ref The unique reference for this file.
	* @param doc The document to which the file will belong.
	* @param embedder The embedder that will be used to embed the file.
	*/
	PDFEmbeddedFile.of = function(ref, doc, embedder) {
		return new PDFEmbeddedFile(ref, doc, embedder);
	};
	return PDFEmbeddedFile;
}();
//#endregion
//#region node_modules/pdf-lib/es/api/PDFJavaScript.js
/**
* Represents JavaScript that has been embedded in a [[PDFDocument]].
*/
var PDFJavaScript = function() {
	function PDFJavaScript(ref, doc, embedder) {
		this.alreadyEmbedded = false;
		this.ref = ref;
		this.doc = doc;
		this.embedder = embedder;
	}
	/**
	* > **NOTE:** You probably don't need to call this method directly. The
	* > [[PDFDocument.save]] and [[PDFDocument.saveAsBase64]] methods will
	* > automatically ensure all JavaScripts get embedded.
	*
	* Embed this JavaScript in its document.
	*
	* @returns Resolves when the embedding is complete.
	*/
	PDFJavaScript.prototype.embed = function() {
		return __awaiter(this, void 0, void 0, function() {
			var _a, catalog, context, ref, Names, Javascript, JSNames;
			return __generator(this, function(_b) {
				switch (_b.label) {
					case 0:
						if (!!this.alreadyEmbedded) return [3, 2];
						_a = this.doc, catalog = _a.catalog, context = _a.context;
						return [4, this.embedder.embedIntoContext(this.doc.context, this.ref)];
					case 1:
						ref = _b.sent();
						if (!catalog.has(PDFName.of("Names"))) catalog.set(PDFName.of("Names"), context.obj({}));
						Names = catalog.lookup(PDFName.of("Names"), PDFDict);
						if (!Names.has(PDFName.of("JavaScript"))) Names.set(PDFName.of("JavaScript"), context.obj({}));
						Javascript = Names.lookup(PDFName.of("JavaScript"), PDFDict);
						if (!Javascript.has(PDFName.of("Names"))) Javascript.set(PDFName.of("Names"), context.obj([]));
						JSNames = Javascript.lookup(PDFName.of("Names"), PDFArray);
						JSNames.push(PDFHexString.fromText(this.embedder.scriptName));
						JSNames.push(ref);
						this.alreadyEmbedded = true;
						_b.label = 2;
					case 2: return [2];
				}
			});
		});
	};
	/**
	* > **NOTE:** You probably don't want to call this method directly. Instead,
	* > consider using the [[PDFDocument.addJavaScript]] method, which will
	* create instances of [[PDFJavaScript]] for you.
	*
	* Create an instance of [[PDFJavaScript]] from an existing ref and script
	*
	* @param ref The unique reference for this script.
	* @param doc The document to which the script will belong.
	* @param embedder The embedder that will be used to embed the script.
	*/
	PDFJavaScript.of = function(ref, doc, embedder) {
		return new PDFJavaScript(ref, doc, embedder);
	};
	return PDFJavaScript;
}();
//#endregion
//#region node_modules/pdf-lib/es/core/embedders/JavaScriptEmbedder.js
var JavaScriptEmbedder = function() {
	function JavaScriptEmbedder(script, scriptName) {
		this.script = script;
		this.scriptName = scriptName;
	}
	JavaScriptEmbedder.for = function(script, scriptName) {
		return new JavaScriptEmbedder(script, scriptName);
	};
	JavaScriptEmbedder.prototype.embedIntoContext = function(context, ref) {
		return __awaiter(this, void 0, void 0, function() {
			var jsActionDict;
			return __generator(this, function(_a) {
				jsActionDict = context.obj({
					Type: "Action",
					S: "JavaScript",
					JS: PDFHexString.fromText(this.script)
				});
				if (ref) {
					context.assign(ref, jsActionDict);
					return [2, ref];
				} else return [2, context.register(jsActionDict)];
			});
		});
	};
	return JavaScriptEmbedder;
}();
//#endregion
//#region node_modules/pdf-lib/es/api/PDFDocument.js
/**
* Represents a PDF document.
*/
var PDFDocument = function() {
	function PDFDocument(context, ignoreEncryption, updateMetadata) {
		var _this = this;
		/** The default word breaks used in PDFPage.drawText */
		this.defaultWordBreaks = [" "];
		this.computePages = function() {
			var pages = [];
			_this.catalog.Pages().traverse(function(node, ref) {
				if (node instanceof PDFPageLeaf) {
					var page = _this.pageMap.get(node);
					if (!page) {
						page = PDFPage.of(node, ref, _this);
						_this.pageMap.set(node, page);
					}
					pages.push(page);
				}
			});
			return pages;
		};
		this.getOrCreateForm = function() {
			var acroForm = _this.catalog.getOrCreateAcroForm();
			return PDFForm.of(acroForm, _this);
		};
		assertIs(context, "context", [[PDFContext, "PDFContext"]]);
		assertIs(ignoreEncryption, "ignoreEncryption", ["boolean"]);
		this.context = context;
		this.catalog = context.lookup(context.trailerInfo.Root);
		this.isEncrypted = !!context.lookup(context.trailerInfo.Encrypt);
		this.pageCache = Cache.populatedBy(this.computePages);
		this.pageMap = /* @__PURE__ */ new Map();
		this.formCache = Cache.populatedBy(this.getOrCreateForm);
		this.fonts = [];
		this.images = [];
		this.embeddedPages = [];
		this.embeddedFiles = [];
		this.javaScripts = [];
		if (!ignoreEncryption && this.isEncrypted) throw new EncryptedPDFError();
		if (updateMetadata) this.updateInfoDict();
	}
	/**
	* Load an existing [[PDFDocument]]. The input data can be provided in
	* multiple formats:
	*
	* | Type          | Contents                                               |
	* | ------------- | ------------------------------------------------------ |
	* | `string`      | A base64 encoded string (or data URI) containing a PDF |
	* | `Uint8Array`  | The raw bytes of a PDF                                 |
	* | `ArrayBuffer` | The raw bytes of a PDF                                 |
	*
	* For example:
	* ```js
	* import { PDFDocument } from 'pdf-lib'
	*
	* // pdf=string
	* const base64 =
	*  'JVBERi0xLjcKJYGBgYEKCjUgMCBvYmoKPDwKL0ZpbHRlciAvRmxhdGVEZWNvZGUKL0xlbm' +
	*  'd0aCAxMDQKPj4Kc3RyZWFtCniccwrhMlAAwaJ0Ln2P1Jyy1JLM5ERdc0MjCwUjE4WQNC4Q' +
	*  '6cNlCFZkqGCqYGSqEJLLZWNuYGZiZmbkYuZsZmlmZGRgZmluDCQNzc3NTM2NzdzMXMxMjQ' +
	*  'ztFEKyuEK0uFxDuAAOERdVCmVuZHN0cmVhbQplbmRvYmoKCjYgMCBvYmoKPDwKL0ZpbHRl' +
	*  'ciAvRmxhdGVEZWNvZGUKL1R5cGUgL09ialN0bQovTiA0Ci9GaXJzdCAyMAovTGVuZ3RoID' +
	*  'IxNQo+PgpzdHJlYW0KeJxVj9GqwjAMhu/zFHkBzTo3nCCCiiKIHPEICuJF3cKoSCu2E8/b' +
	*  '20wPIr1p8v9/8kVhgilmGfawX2CGaVrgcAi0/bsy0lrX7IGWpvJ4iJYEN3gEmrrGBlQwGs' +
	*  'HHO9VBX1wNrxAqMX87RBD5xpJuddqwd82tjAHxzV1U5LPgy52DKXWnr1Lheg+j/c/pzGVr' +
	*  'iqV0VlwZPXGPCJjElw/ybkwUmeoWgxesDXGhHJC/D/iikp1Av80ptKU0FdBEe25pPihAM1' +
	*  'u6ytgaaWfs2Hrz35CJT1+EWmAKZW5kc3RyZWFtCmVuZG9iagoKNyAwIG9iago8PAovU2l6' +
	*  'ZSA4Ci9Sb290IDIgMCBSCi9GaWx0ZXIgL0ZsYXRlRGVjb2RlCi9UeXBlIC9YUmVmCi9MZW' +
	*  '5ndGggMzgKL1cgWyAxIDIgMiBdCi9JbmRleCBbIDAgOCBdCj4+CnN0cmVhbQp4nBXEwREA' +
	*  'EBAEsCwz3vrvRmOOyyOoGhZdutHN2MT55fIAVocD+AplbmRzdHJlYW0KZW5kb2JqCgpzdG' +
	*  'FydHhyZWYKNTEwCiUlRU9G'
	*
	* const dataUri = 'data:application/pdf;base64,' + base64
	*
	* const pdfDoc1 = await PDFDocument.load(base64)
	* const pdfDoc2 = await PDFDocument.load(dataUri)
	*
	* // pdf=Uint8Array
	* import fs from 'fs'
	* const uint8Array = fs.readFileSync('with_update_sections.pdf')
	* const pdfDoc3 = await PDFDocument.load(uint8Array)
	*
	* // pdf=ArrayBuffer
	* const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
	* const arrayBuffer = await fetch(url).then(res => res.arrayBuffer())
	* const pdfDoc4 = await PDFDocument.load(arrayBuffer)
	*
	* ```
	*
	* @param pdf The input data containing a PDF document.
	* @param options The options to be used when loading the document.
	* @returns Resolves with a document loaded from the input.
	*/
	PDFDocument.load = function(pdf, options) {
		if (options === void 0) options = {};
		return __awaiter(this, void 0, void 0, function() {
			var _a, ignoreEncryption, _b, parseSpeed, _c, throwOnInvalidObject, _d, updateMetadata, _e, capNumbers, bytes, context;
			return __generator(this, function(_f) {
				switch (_f.label) {
					case 0:
						_a = options.ignoreEncryption, ignoreEncryption = _a === void 0 ? false : _a, _b = options.parseSpeed, parseSpeed = _b === void 0 ? ParseSpeeds.Slow : _b, _c = options.throwOnInvalidObject, throwOnInvalidObject = _c === void 0 ? false : _c, _d = options.updateMetadata, updateMetadata = _d === void 0 ? true : _d, _e = options.capNumbers, capNumbers = _e === void 0 ? false : _e;
						assertIs(pdf, "pdf", [
							"string",
							Uint8Array,
							ArrayBuffer
						]);
						assertIs(ignoreEncryption, "ignoreEncryption", ["boolean"]);
						assertIs(parseSpeed, "parseSpeed", ["number"]);
						assertIs(throwOnInvalidObject, "throwOnInvalidObject", ["boolean"]);
						bytes = toUint8Array(pdf);
						return [4, PDFParser.forBytesWithOptions(bytes, parseSpeed, throwOnInvalidObject, capNumbers).parseDocument()];
					case 1:
						context = _f.sent();
						return [2, new PDFDocument(context, ignoreEncryption, updateMetadata)];
				}
			});
		});
	};
	/**
	* Create a new [[PDFDocument]].
	* @returns Resolves with the newly created document.
	*/
	PDFDocument.create = function(options) {
		if (options === void 0) options = {};
		return __awaiter(this, void 0, void 0, function() {
			var _a, updateMetadata, context, pageTree, pageTreeRef, catalog;
			return __generator(this, function(_b) {
				_a = options.updateMetadata, updateMetadata = _a === void 0 ? true : _a;
				context = PDFContext.create();
				pageTree = PDFPageTree.withContext(context);
				pageTreeRef = context.register(pageTree);
				catalog = PDFCatalog.withContextAndPages(context, pageTreeRef);
				context.trailerInfo.Root = context.register(catalog);
				return [2, new PDFDocument(context, false, updateMetadata)];
			});
		});
	};
	/**
	* Register a fontkit instance. This must be done before custom fonts can
	* be embedded. See [here](https://github.com/Hopding/pdf-lib/tree/master#fontkit-installation)
	* for instructions on how to install and register a fontkit instance.
	*
	* > You do **not** need to call this method to embed standard fonts.
	*
	* For example:
	* ```js
	* import { PDFDocument } from 'pdf-lib'
	* import fontkit from '@pdf-lib/fontkit'
	*
	* const pdfDoc = await PDFDocument.create()
	* pdfDoc.registerFontkit(fontkit)
	* ```
	*
	* @param fontkit The fontkit instance to be registered.
	*/
	PDFDocument.prototype.registerFontkit = function(fontkit) {
		this.fontkit = fontkit;
	};
	/**
	* Get the [[PDFForm]] containing all interactive fields for this document.
	* For example:
	* ```js
	* const form = pdfDoc.getForm()
	* const fields = form.getFields()
	* fields.forEach(field => {
	*   const type = field.constructor.name
	*   const name = field.getName()
	*   console.log(`${type}: ${name}`)
	* })
	* ```
	* @returns The form for this document.
	*/
	PDFDocument.prototype.getForm = function() {
		var form = this.formCache.access();
		if (form.hasXFA()) {
			console.warn("Removing XFA form data as pdf-lib does not support reading or writing XFA");
			form.deleteXFA();
		}
		return form;
	};
	/**
	* Get this document's title metadata. The title appears in the
	* "Document Properties" section of most PDF readers. For example:
	* ```js
	* const title = pdfDoc.getTitle()
	* ```
	* @returns A string containing the title of this document, if it has one.
	*/
	PDFDocument.prototype.getTitle = function() {
		var title = this.getInfoDict().lookup(PDFName.Title);
		if (!title) return void 0;
		assertIsLiteralOrHexString(title);
		return title.decodeText();
	};
	/**
	* Get this document's author metadata. The author appears in the
	* "Document Properties" section of most PDF readers. For example:
	* ```js
	* const author = pdfDoc.getAuthor()
	* ```
	* @returns A string containing the author of this document, if it has one.
	*/
	PDFDocument.prototype.getAuthor = function() {
		var author = this.getInfoDict().lookup(PDFName.Author);
		if (!author) return void 0;
		assertIsLiteralOrHexString(author);
		return author.decodeText();
	};
	/**
	* Get this document's subject metadata. The subject appears in the
	* "Document Properties" section of most PDF readers. For example:
	* ```js
	* const subject = pdfDoc.getSubject()
	* ```
	* @returns A string containing the subject of this document, if it has one.
	*/
	PDFDocument.prototype.getSubject = function() {
		var subject = this.getInfoDict().lookup(PDFName.Subject);
		if (!subject) return void 0;
		assertIsLiteralOrHexString(subject);
		return subject.decodeText();
	};
	/**
	* Get this document's keywords metadata. The keywords appear in the
	* "Document Properties" section of most PDF readers. For example:
	* ```js
	* const keywords = pdfDoc.getKeywords()
	* ```
	* @returns A string containing the keywords of this document, if it has any.
	*/
	PDFDocument.prototype.getKeywords = function() {
		var keywords = this.getInfoDict().lookup(PDFName.Keywords);
		if (!keywords) return void 0;
		assertIsLiteralOrHexString(keywords);
		return keywords.decodeText();
	};
	/**
	* Get this document's creator metadata. The creator appears in the
	* "Document Properties" section of most PDF readers. For example:
	* ```js
	* const creator = pdfDoc.getCreator()
	* ```
	* @returns A string containing the creator of this document, if it has one.
	*/
	PDFDocument.prototype.getCreator = function() {
		var creator = this.getInfoDict().lookup(PDFName.Creator);
		if (!creator) return void 0;
		assertIsLiteralOrHexString(creator);
		return creator.decodeText();
	};
	/**
	* Get this document's producer metadata. The producer appears in the
	* "Document Properties" section of most PDF readers. For example:
	* ```js
	* const producer = pdfDoc.getProducer()
	* ```
	* @returns A string containing the producer of this document, if it has one.
	*/
	PDFDocument.prototype.getProducer = function() {
		var producer = this.getInfoDict().lookup(PDFName.Producer);
		if (!producer) return void 0;
		assertIsLiteralOrHexString(producer);
		return producer.decodeText();
	};
	/**
	* Get this document's creation date metadata. The creation date appears in
	* the "Document Properties" section of most PDF readers. For example:
	* ```js
	* const creationDate = pdfDoc.getCreationDate()
	* ```
	* @returns A Date containing the creation date of this document,
	*          if it has one.
	*/
	PDFDocument.prototype.getCreationDate = function() {
		var creationDate = this.getInfoDict().lookup(PDFName.CreationDate);
		if (!creationDate) return void 0;
		assertIsLiteralOrHexString(creationDate);
		return creationDate.decodeDate();
	};
	/**
	* Get this document's modification date metadata. The modification date
	* appears in the "Document Properties" section of most PDF readers.
	* For example:
	* ```js
	* const modification = pdfDoc.getModificationDate()
	* ```
	* @returns A Date containing the modification date of this document,
	*          if it has one.
	*/
	PDFDocument.prototype.getModificationDate = function() {
		var modificationDate = this.getInfoDict().lookup(PDFName.ModDate);
		if (!modificationDate) return void 0;
		assertIsLiteralOrHexString(modificationDate);
		return modificationDate.decodeDate();
	};
	/**
	* Set this document's title metadata. The title will appear in the
	* "Document Properties" section of most PDF readers. For example:
	* ```js
	* pdfDoc.setTitle('🥚 The Life of an Egg 🍳')
	* ```
	*
	* To display the title in the window's title bar, set the
	* `showInWindowTitleBar` option to `true` (works for _most_ PDF readers).
	* For example:
	* ```js
	* pdfDoc.setTitle('🥚 The Life of an Egg 🍳', { showInWindowTitleBar: true })
	* ```
	*
	* @param title The title of this document.
	* @param options The options to be used when setting the title.
	*/
	PDFDocument.prototype.setTitle = function(title, options) {
		assertIs(title, "title", ["string"]);
		var key = PDFName.of("Title");
		this.getInfoDict().set(key, PDFHexString.fromText(title));
		if (options === null || options === void 0 ? void 0 : options.showInWindowTitleBar) this.catalog.getOrCreateViewerPreferences().setDisplayDocTitle(true);
	};
	/**
	* Set this document's author metadata. The author will appear in the
	* "Document Properties" section of most PDF readers. For example:
	* ```js
	* pdfDoc.setAuthor('Humpty Dumpty')
	* ```
	* @param author The author of this document.
	*/
	PDFDocument.prototype.setAuthor = function(author) {
		assertIs(author, "author", ["string"]);
		var key = PDFName.of("Author");
		this.getInfoDict().set(key, PDFHexString.fromText(author));
	};
	/**
	* Set this document's subject metadata. The subject will appear in the
	* "Document Properties" section of most PDF readers. For example:
	* ```js
	* pdfDoc.setSubject('📘 An Epic Tale of Woe 📖')
	* ```
	* @param subject The subject of this document.
	*/
	PDFDocument.prototype.setSubject = function(subject) {
		assertIs(subject, "author", ["string"]);
		var key = PDFName.of("Subject");
		this.getInfoDict().set(key, PDFHexString.fromText(subject));
	};
	/**
	* Set this document's keyword metadata. These keywords will appear in the
	* "Document Properties" section of most PDF readers. For example:
	* ```js
	* pdfDoc.setKeywords(['eggs', 'wall', 'fall', 'king', 'horses', 'men'])
	* ```
	* @param keywords An array of keywords associated with this document.
	*/
	PDFDocument.prototype.setKeywords = function(keywords) {
		assertIs(keywords, "keywords", [Array]);
		var key = PDFName.of("Keywords");
		this.getInfoDict().set(key, PDFHexString.fromText(keywords.join(" ")));
	};
	/**
	* Set this document's creator metadata. The creator will appear in the
	* "Document Properties" section of most PDF readers. For example:
	* ```js
	* pdfDoc.setCreator('PDF App 9000 🤖')
	* ```
	* @param creator The creator of this document.
	*/
	PDFDocument.prototype.setCreator = function(creator) {
		assertIs(creator, "creator", ["string"]);
		var key = PDFName.of("Creator");
		this.getInfoDict().set(key, PDFHexString.fromText(creator));
	};
	/**
	* Set this document's producer metadata. The producer will appear in the
	* "Document Properties" section of most PDF readers. For example:
	* ```js
	* pdfDoc.setProducer('PDF App 9000 🤖')
	* ```
	* @param producer The producer of this document.
	*/
	PDFDocument.prototype.setProducer = function(producer) {
		assertIs(producer, "creator", ["string"]);
		var key = PDFName.of("Producer");
		this.getInfoDict().set(key, PDFHexString.fromText(producer));
	};
	/**
	* Set this document's language metadata. The language will appear in the
	* "Document Properties" section of some PDF readers. For example:
	* ```js
	* pdfDoc.setLanguage('en-us')
	* ```
	*
	* @param language An RFC 3066 _Language-Tag_ denoting the language of this
	*                 document, or an empty string if the language is unknown.
	*/
	PDFDocument.prototype.setLanguage = function(language) {
		assertIs(language, "language", ["string"]);
		var key = PDFName.of("Lang");
		this.catalog.set(key, PDFString.of(language));
	};
	/**
	* Set this document's creation date metadata. The creation date will appear
	* in the "Document Properties" section of most PDF readers. For example:
	* ```js
	* pdfDoc.setCreationDate(new Date())
	* ```
	* @param creationDate The date this document was created.
	*/
	PDFDocument.prototype.setCreationDate = function(creationDate) {
		assertIs(creationDate, "creationDate", [[Date, "Date"]]);
		var key = PDFName.of("CreationDate");
		this.getInfoDict().set(key, PDFString.fromDate(creationDate));
	};
	/**
	* Set this document's modification date metadata. The modification date will
	* appear in the "Document Properties" section of most PDF readers. For
	* example:
	* ```js
	* pdfDoc.setModificationDate(new Date())
	* ```
	* @param modificationDate The date this document was last modified.
	*/
	PDFDocument.prototype.setModificationDate = function(modificationDate) {
		assertIs(modificationDate, "modificationDate", [[Date, "Date"]]);
		var key = PDFName.of("ModDate");
		this.getInfoDict().set(key, PDFString.fromDate(modificationDate));
	};
	/**
	* Get the number of pages contained in this document. For example:
	* ```js
	* const totalPages = pdfDoc.getPageCount()
	* ```
	* @returns The number of pages in this document.
	*/
	PDFDocument.prototype.getPageCount = function() {
		if (this.pageCount === void 0) this.pageCount = this.getPages().length;
		return this.pageCount;
	};
	/**
	* Get an array of all the pages contained in this document. The pages are
	* stored in the array in the same order that they are rendered in the
	* document. For example:
	* ```js
	* const pages = pdfDoc.getPages()
	* pages[0]   // The first page of the document
	* pages[2]   // The third page of the document
	* pages[197] // The 198th page of the document
	* ```
	* @returns An array of all the pages contained in this document.
	*/
	PDFDocument.prototype.getPages = function() {
		return this.pageCache.access();
	};
	/**
	* Get the page rendered at a particular `index` of the document. For example:
	* ```js
	* pdfDoc.getPage(0)   // The first page of the document
	* pdfDoc.getPage(2)   // The third page of the document
	* pdfDoc.getPage(197) // The 198th page of the document
	* ```
	* @returns The [[PDFPage]] rendered at the given `index` of the document.
	*/
	PDFDocument.prototype.getPage = function(index) {
		var pages = this.getPages();
		assertRange(index, "index", 0, pages.length - 1);
		return pages[index];
	};
	/**
	* Get an array of indices for all the pages contained in this document. The
	* array will contain a range of integers from
	* `0..pdfDoc.getPageCount() - 1`. For example:
	* ```js
	* const pdfDoc = await PDFDocument.create()
	* pdfDoc.addPage()
	* pdfDoc.addPage()
	* pdfDoc.addPage()
	*
	* const indices = pdfDoc.getPageIndices()
	* indices // => [0, 1, 2]
	* ```
	* @returns An array of indices for all pages contained in this document.
	*/
	PDFDocument.prototype.getPageIndices = function() {
		return range(0, this.getPageCount());
	};
	/**
	* Remove the page at a given index from this document. For example:
	* ```js
	* pdfDoc.removePage(0)   // Remove the first page of the document
	* pdfDoc.removePage(2)   // Remove the third page of the document
	* pdfDoc.removePage(197) // Remove the 198th page of the document
	* ```
	* Once a page has been removed, it will no longer be rendered at that index
	* in the document.
	* @param index The index of the page to be removed.
	*/
	PDFDocument.prototype.removePage = function(index) {
		var pageCount = this.getPageCount();
		if (this.pageCount === 0) throw new RemovePageFromEmptyDocumentError();
		assertRange(index, "index", 0, pageCount - 1);
		this.catalog.removeLeafNode(index);
		this.pageCount = pageCount - 1;
	};
	/**
	* Add a page to the end of this document. This method accepts three
	* different value types for the `page` parameter:
	*
	* | Type               | Behavior                                                                            |
	* | ------------------ | ----------------------------------------------------------------------------------- |
	* | `undefined`        | Create a new page and add it to the end of this document                            |
	* | `[number, number]` | Create a new page with the given dimensions and add it to the end of this document  |
	* | `PDFPage`          | Add the existing page to the end of this document                                   |
	*
	* For example:
	* ```js
	* // page=undefined
	* const newPage = pdfDoc.addPage()
	*
	* // page=[number, number]
	* import { PageSizes } from 'pdf-lib'
	* const newPage1 = pdfDoc.addPage(PageSizes.A7)
	* const newPage2 = pdfDoc.addPage(PageSizes.Letter)
	* const newPage3 = pdfDoc.addPage([500, 750])
	*
	* // page=PDFPage
	* const pdfDoc1 = await PDFDocument.create()
	* const pdfDoc2 = await PDFDocument.load(...)
	* const [existingPage] = await pdfDoc1.copyPages(pdfDoc2, [0])
	* pdfDoc1.addPage(existingPage)
	* ```
	*
	* @param page Optionally, the desired dimensions or existing page.
	* @returns The newly created (or existing) page.
	*/
	PDFDocument.prototype.addPage = function(page) {
		assertIs(page, "page", [
			"undefined",
			[PDFPage, "PDFPage"],
			Array
		]);
		return this.insertPage(this.getPageCount(), page);
	};
	/**
	* Insert a page at a given index within this document. This method accepts
	* three different value types for the `page` parameter:
	*
	* | Type               | Behavior                                                                       |
	* | ------------------ | ------------------------------------------------------------------------------ |
	* | `undefined`        | Create a new page and insert it into this document                             |
	* | `[number, number]` | Create a new page with the given dimensions and insert it into this document   |
	* | `PDFPage`          | Insert the existing page into this document                                    |
	*
	* For example:
	* ```js
	* // page=undefined
	* const newPage = pdfDoc.insertPage(2)
	*
	* // page=[number, number]
	* import { PageSizes } from 'pdf-lib'
	* const newPage1 = pdfDoc.insertPage(2, PageSizes.A7)
	* const newPage2 = pdfDoc.insertPage(0, PageSizes.Letter)
	* const newPage3 = pdfDoc.insertPage(198, [500, 750])
	*
	* // page=PDFPage
	* const pdfDoc1 = await PDFDocument.create()
	* const pdfDoc2 = await PDFDocument.load(...)
	* const [existingPage] = await pdfDoc1.copyPages(pdfDoc2, [0])
	* pdfDoc1.insertPage(0, existingPage)
	* ```
	*
	* @param index The index at which the page should be inserted (zero-based).
	* @param page Optionally, the desired dimensions or existing page.
	* @returns The newly created (or existing) page.
	*/
	PDFDocument.prototype.insertPage = function(index, page) {
		var pageCount = this.getPageCount();
		assertRange(index, "index", 0, pageCount);
		assertIs(page, "page", [
			"undefined",
			[PDFPage, "PDFPage"],
			Array
		]);
		if (!page || Array.isArray(page)) {
			var dims = Array.isArray(page) ? page : PageSizes.A4;
			page = PDFPage.create(this);
			page.setSize.apply(page, dims);
		} else if (page.doc !== this) throw new ForeignPageError();
		var parentRef = this.catalog.insertLeafNode(page.ref, index);
		page.node.setParent(parentRef);
		this.pageMap.set(page.node, page);
		this.pageCache.invalidate();
		this.pageCount = pageCount + 1;
		return page;
	};
	/**
	* Copy pages from a source document into this document. Allows pages to be
	* copied between different [[PDFDocument]] instances. For example:
	* ```js
	* const pdfDoc = await PDFDocument.create()
	* const srcDoc = await PDFDocument.load(...)
	*
	* const copiedPages = await pdfDoc.copyPages(srcDoc, [0, 3, 89])
	* const [firstPage, fourthPage, ninetiethPage] = copiedPages;
	*
	* pdfDoc.addPage(fourthPage)
	* pdfDoc.insertPage(0, ninetiethPage)
	* pdfDoc.addPage(firstPage)
	* ```
	* @param srcDoc The document from which pages should be copied.
	* @param indices The indices of the pages that should be copied.
	* @returns Resolves with an array of pages copied into this document.
	*/
	PDFDocument.prototype.copyPages = function(srcDoc, indices) {
		return __awaiter(this, void 0, void 0, function() {
			var copier, srcPages, copiedPages, idx, len, srcPage, copiedPage, ref;
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						assertIs(srcDoc, "srcDoc", [[PDFDocument, "PDFDocument"]]);
						assertIs(indices, "indices", [Array]);
						return [4, srcDoc.flush()];
					case 1:
						_a.sent();
						copier = PDFObjectCopier.for(srcDoc.context, this.context);
						srcPages = srcDoc.getPages();
						copiedPages = new Array(indices.length);
						for (idx = 0, len = indices.length; idx < len; idx++) {
							srcPage = srcPages[indices[idx]];
							copiedPage = copier.copy(srcPage.node);
							ref = this.context.register(copiedPage);
							copiedPages[idx] = PDFPage.of(copiedPage, ref, this);
						}
						return [2, copiedPages];
				}
			});
		});
	};
	/**
	* Get a copy of this document.
	*
	* For example:
	* ```js
	* const srcDoc = await PDFDocument.load(...)
	* const pdfDoc = await srcDoc.copy()
	* ```
	*
	* > **NOTE:**  This method won't copy all information over to the new
	* > document (acroforms, outlines, etc...).
	*
	* @returns Resolves with a copy this document.
	*/
	PDFDocument.prototype.copy = function() {
		return __awaiter(this, void 0, void 0, function() {
			var pdfCopy, contentPages, idx, len;
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0: return [4, PDFDocument.create()];
					case 1:
						pdfCopy = _a.sent();
						return [4, pdfCopy.copyPages(this, this.getPageIndices())];
					case 2:
						contentPages = _a.sent();
						for (idx = 0, len = contentPages.length; idx < len; idx++) pdfCopy.addPage(contentPages[idx]);
						if (this.getAuthor() !== void 0) pdfCopy.setAuthor(this.getAuthor());
						if (this.getCreationDate() !== void 0) pdfCopy.setCreationDate(this.getCreationDate());
						if (this.getCreator() !== void 0) pdfCopy.setCreator(this.getCreator());
						if (this.getModificationDate() !== void 0) pdfCopy.setModificationDate(this.getModificationDate());
						if (this.getProducer() !== void 0) pdfCopy.setProducer(this.getProducer());
						if (this.getSubject() !== void 0) pdfCopy.setSubject(this.getSubject());
						if (this.getTitle() !== void 0) pdfCopy.setTitle(this.getTitle());
						pdfCopy.defaultWordBreaks = this.defaultWordBreaks;
						return [2, pdfCopy];
				}
			});
		});
	};
	/**
	* Add JavaScript to this document. The supplied `script` is executed when the
	* document is opened. The `script` can be used to perform some operation
	* when the document is opened (e.g. logging to the console), or it can be
	* used to define a function that can be referenced later in a JavaScript
	* action. For example:
	* ```js
	* // Show "Hello World!" in the console when the PDF is opened
	* pdfDoc.addJavaScript(
	*   'main',
	*   'console.show(); console.println("Hello World!");'
	* );
	*
	* // Define a function named "foo" that can be called in JavaScript Actions
	* pdfDoc.addJavaScript(
	*   'foo',
	*   'function foo() { return "foo"; }'
	* );
	* ```
	* See the [JavaScript for Acrobat API Reference](https://www.adobe.com/content/dam/acom/en/devnet/acrobat/pdfs/js_api_reference.pdf)
	* for details.
	* @param name The name of the script. Must be unique per document.
	* @param script The JavaScript to execute.
	*/
	PDFDocument.prototype.addJavaScript = function(name, script) {
		assertIs(name, "name", ["string"]);
		assertIs(script, "script", ["string"]);
		var embedder = JavaScriptEmbedder.for(script, name);
		var ref = this.context.nextRef();
		var javaScript = PDFJavaScript.of(ref, this, embedder);
		this.javaScripts.push(javaScript);
	};
	/**
	* Add an attachment to this document. Attachments are visible in the
	* "Attachments" panel of Adobe Acrobat and some other PDF readers. Any
	* type of file can be added as an attachment. This includes, but is not
	* limited to, `.png`, `.jpg`, `.pdf`, `.csv`, `.docx`, and `.xlsx` files.
	*
	* The input data can be provided in multiple formats:
	*
	* | Type          | Contents                                                       |
	* | ------------- | -------------------------------------------------------------- |
	* | `string`      | A base64 encoded string (or data URI) containing an attachment |
	* | `Uint8Array`  | The raw bytes of an attachment                                 |
	* | `ArrayBuffer` | The raw bytes of an attachment                                 |
	*
	* For example:
	* ```js
	* // attachment=string
	* await pdfDoc.attach('/9j/4AAQSkZJRgABAQAAAQABAAD/2wBD...', 'cat_riding_unicorn.jpg', {
	*   mimeType: 'image/jpeg',
	*   description: 'Cool cat riding a unicorn! 🦄🐈🕶️',
	*   creationDate: new Date('2019/12/01'),
	*   modificationDate: new Date('2020/04/19'),
	* })
	* await pdfDoc.attach('data:image/jpeg;base64,/9j/4AAQ...', 'cat_riding_unicorn.jpg', {
	*   mimeType: 'image/jpeg',
	*   description: 'Cool cat riding a unicorn! 🦄🐈🕶️',
	*   creationDate: new Date('2019/12/01'),
	*   modificationDate: new Date('2020/04/19'),
	* })
	*
	* // attachment=Uint8Array
	* import fs from 'fs'
	* const uint8Array = fs.readFileSync('cat_riding_unicorn.jpg')
	* await pdfDoc.attach(uint8Array, 'cat_riding_unicorn.jpg', {
	*   mimeType: 'image/jpeg',
	*   description: 'Cool cat riding a unicorn! 🦄🐈🕶️',
	*   creationDate: new Date('2019/12/01'),
	*   modificationDate: new Date('2020/04/19'),
	* })
	*
	* // attachment=ArrayBuffer
	* const url = 'https://pdf-lib.js.org/assets/cat_riding_unicorn.jpg'
	* const arrayBuffer = await fetch(url).then(res => res.arrayBuffer())
	* await pdfDoc.attach(arrayBuffer, 'cat_riding_unicorn.jpg', {
	*   mimeType: 'image/jpeg',
	*   description: 'Cool cat riding a unicorn! 🦄🐈🕶️',
	*   creationDate: new Date('2019/12/01'),
	*   modificationDate: new Date('2020/04/19'),
	* })
	* ```
	*
	* @param attachment The input data containing the file to be attached.
	* @param name The name of the file to be attached.
	* @returns Resolves when the attachment is complete.
	*/
	PDFDocument.prototype.attach = function(attachment, name, options) {
		if (options === void 0) options = {};
		return __awaiter(this, void 0, void 0, function() {
			var bytes, embedder, ref, embeddedFile;
			return __generator(this, function(_a) {
				assertIs(attachment, "attachment", [
					"string",
					Uint8Array,
					ArrayBuffer
				]);
				assertIs(name, "name", ["string"]);
				assertOrUndefined(options.mimeType, "mimeType", ["string"]);
				assertOrUndefined(options.description, "description", ["string"]);
				assertOrUndefined(options.creationDate, "options.creationDate", [Date]);
				assertOrUndefined(options.modificationDate, "options.modificationDate", [Date]);
				assertIsOneOfOrUndefined(options.afRelationship, "options.afRelationship", AFRelationship);
				bytes = toUint8Array(attachment);
				embedder = FileEmbedder.for(bytes, name, options);
				ref = this.context.nextRef();
				embeddedFile = PDFEmbeddedFile.of(ref, this, embedder);
				this.embeddedFiles.push(embeddedFile);
				return [2];
			});
		});
	};
	/**
	* Embed a font into this document. The input data can be provided in multiple
	* formats:
	*
	* | Type            | Contents                                                |
	* | --------------- | ------------------------------------------------------- |
	* | `StandardFonts` | One of the standard 14 fonts                            |
	* | `string`        | A base64 encoded string (or data URI) containing a font |
	* | `Uint8Array`    | The raw bytes of a font                                 |
	* | `ArrayBuffer`   | The raw bytes of a font                                 |
	*
	* For example:
	* ```js
	* // font=StandardFonts
	* import { StandardFonts } from 'pdf-lib'
	* const font1 = await pdfDoc.embedFont(StandardFonts.Helvetica)
	*
	* // font=string
	* const font2 = await pdfDoc.embedFont('AAEAAAAVAQAABABQRFNJRx/upe...')
	* const font3 = await pdfDoc.embedFont('data:font/opentype;base64,AAEAAA...')
	*
	* // font=Uint8Array
	* import fs from 'fs'
	* const font4 = await pdfDoc.embedFont(fs.readFileSync('Ubuntu-R.ttf'))
	*
	* // font=ArrayBuffer
	* const url = 'https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf'
	* const ubuntuBytes = await fetch(url).then(res => res.arrayBuffer())
	* const font5 = await pdfDoc.embedFont(ubuntuBytes)
	* ```
	* See also: [[registerFontkit]]
	* @param font The input data for a font.
	* @param options The options to be used when embedding the font.
	* @returns Resolves with the embedded font.
	*/
	PDFDocument.prototype.embedFont = function(font, options) {
		if (options === void 0) options = {};
		return __awaiter(this, void 0, void 0, function() {
			var _a, subset, customName, features, embedder, bytes, fontkit, _b, ref, pdfFont;
			return __generator(this, function(_c) {
				switch (_c.label) {
					case 0:
						_a = options.subset, subset = _a === void 0 ? false : _a, customName = options.customName, features = options.features;
						assertIs(font, "font", [
							"string",
							Uint8Array,
							ArrayBuffer
						]);
						assertIs(subset, "subset", ["boolean"]);
						if (!isStandardFont(font)) return [3, 1];
						embedder = StandardFontEmbedder.for(font, customName);
						return [3, 7];
					case 1:
						if (!canBeConvertedToUint8Array(font)) return [3, 6];
						bytes = toUint8Array(font);
						fontkit = this.assertFontkit();
						if (!subset) return [3, 3];
						return [4, CustomFontSubsetEmbedder.for(fontkit, bytes, customName, features)];
					case 2:
						_b = _c.sent();
						return [3, 5];
					case 3: return [4, CustomFontEmbedder.for(fontkit, bytes, customName, features)];
					case 4:
						_b = _c.sent();
						_c.label = 5;
					case 5:
						embedder = _b;
						return [3, 7];
					case 6: throw new TypeError("`font` must be one of `StandardFonts | string | Uint8Array | ArrayBuffer`");
					case 7:
						ref = this.context.nextRef();
						pdfFont = PDFFont.of(ref, this, embedder);
						this.fonts.push(pdfFont);
						return [2, pdfFont];
				}
			});
		});
	};
	/**
	* Embed a standard font into this document.
	* For example:
	* ```js
	* import { StandardFonts } from 'pdf-lib'
	* const helveticaFont = pdfDoc.embedFont(StandardFonts.Helvetica)
	* ```
	* @param font The standard font to be embedded.
	* @param customName The name to be used when embedding the font.
	* @returns The embedded font.
	*/
	PDFDocument.prototype.embedStandardFont = function(font, customName) {
		assertIs(font, "font", ["string"]);
		if (!isStandardFont(font)) throw new TypeError("`font` must be one of type `StandardFonts`");
		var embedder = StandardFontEmbedder.for(font, customName);
		var ref = this.context.nextRef();
		var pdfFont = PDFFont.of(ref, this, embedder);
		this.fonts.push(pdfFont);
		return pdfFont;
	};
	/**
	* Embed a JPEG image into this document. The input data can be provided in
	* multiple formats:
	*
	* | Type          | Contents                                                      |
	* | ------------- | ------------------------------------------------------------- |
	* | `string`      | A base64 encoded string (or data URI) containing a JPEG image |
	* | `Uint8Array`  | The raw bytes of a JPEG image                                 |
	* | `ArrayBuffer` | The raw bytes of a JPEG image                                 |
	*
	* For example:
	* ```js
	* // jpg=string
	* const image1 = await pdfDoc.embedJpg('/9j/4AAQSkZJRgABAQAAAQABAAD/2wBD...')
	* const image2 = await pdfDoc.embedJpg('data:image/jpeg;base64,/9j/4AAQ...')
	*
	* // jpg=Uint8Array
	* import fs from 'fs'
	* const uint8Array = fs.readFileSync('cat_riding_unicorn.jpg')
	* const image3 = await pdfDoc.embedJpg(uint8Array)
	*
	* // jpg=ArrayBuffer
	* const url = 'https://pdf-lib.js.org/assets/cat_riding_unicorn.jpg'
	* const arrayBuffer = await fetch(url).then(res => res.arrayBuffer())
	* const image4 = await pdfDoc.embedJpg(arrayBuffer)
	* ```
	*
	* @param jpg The input data for a JPEG image.
	* @returns Resolves with the embedded image.
	*/
	PDFDocument.prototype.embedJpg = function(jpg) {
		return __awaiter(this, void 0, void 0, function() {
			var bytes, embedder, ref, pdfImage;
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						assertIs(jpg, "jpg", [
							"string",
							Uint8Array,
							ArrayBuffer
						]);
						bytes = toUint8Array(jpg);
						return [4, JpegEmbedder.for(bytes)];
					case 1:
						embedder = _a.sent();
						ref = this.context.nextRef();
						pdfImage = PDFImage.of(ref, this, embedder);
						this.images.push(pdfImage);
						return [2, pdfImage];
				}
			});
		});
	};
	/**
	* Embed a PNG image into this document. The input data can be provided in
	* multiple formats:
	*
	* | Type          | Contents                                                     |
	* | ------------- | ------------------------------------------------------------ |
	* | `string`      | A base64 encoded string (or data URI) containing a PNG image |
	* | `Uint8Array`  | The raw bytes of a PNG image                                 |
	* | `ArrayBuffer` | The raw bytes of a PNG image                                 |
	*
	* For example:
	* ```js
	* // png=string
	* const image1 = await pdfDoc.embedPng('iVBORw0KGgoAAAANSUhEUgAAAlgAAAF3...')
	* const image2 = await pdfDoc.embedPng('data:image/png;base64,iVBORw0KGg...')
	*
	* // png=Uint8Array
	* import fs from 'fs'
	* const uint8Array = fs.readFileSync('small_mario.png')
	* const image3 = await pdfDoc.embedPng(uint8Array)
	*
	* // png=ArrayBuffer
	* const url = 'https://pdf-lib.js.org/assets/small_mario.png'
	* const arrayBuffer = await fetch(url).then(res => res.arrayBuffer())
	* const image4 = await pdfDoc.embedPng(arrayBuffer)
	* ```
	*
	* @param png The input data for a PNG image.
	* @returns Resolves with the embedded image.
	*/
	PDFDocument.prototype.embedPng = function(png) {
		return __awaiter(this, void 0, void 0, function() {
			var bytes, embedder, ref, pdfImage;
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						assertIs(png, "png", [
							"string",
							Uint8Array,
							ArrayBuffer
						]);
						bytes = toUint8Array(png);
						return [4, PngEmbedder.for(bytes)];
					case 1:
						embedder = _a.sent();
						ref = this.context.nextRef();
						pdfImage = PDFImage.of(ref, this, embedder);
						this.images.push(pdfImage);
						return [2, pdfImage];
				}
			});
		});
	};
	/**
	* Embed one or more PDF pages into this document.
	*
	* For example:
	* ```js
	* const pdfDoc = await PDFDocument.create()
	*
	* const sourcePdfUrl = 'https://pdf-lib.js.org/assets/with_large_page_count.pdf'
	* const sourcePdf = await fetch(sourcePdfUrl).then((res) => res.arrayBuffer())
	*
	* // Embed page 74 of `sourcePdf` into `pdfDoc`
	* const [embeddedPage] = await pdfDoc.embedPdf(sourcePdf, [73])
	* ```
	*
	* See [[PDFDocument.load]] for examples of the allowed input data formats.
	*
	* @param pdf The input data containing a PDF document.
	* @param indices The indices of the pages that should be embedded.
	* @returns Resolves with an array of the embedded pages.
	*/
	PDFDocument.prototype.embedPdf = function(pdf, indices) {
		if (indices === void 0) indices = [0];
		return __awaiter(this, void 0, void 0, function() {
			var srcDoc, _a, srcPages;
			return __generator(this, function(_b) {
				switch (_b.label) {
					case 0:
						assertIs(pdf, "pdf", [
							"string",
							Uint8Array,
							ArrayBuffer,
							[PDFDocument, "PDFDocument"]
						]);
						assertIs(indices, "indices", [Array]);
						if (!(pdf instanceof PDFDocument)) return [3, 1];
						_a = pdf;
						return [3, 3];
					case 1: return [4, PDFDocument.load(pdf)];
					case 2:
						_a = _b.sent();
						_b.label = 3;
					case 3:
						srcDoc = _a;
						srcPages = pluckIndices(srcDoc.getPages(), indices);
						return [2, this.embedPages(srcPages)];
				}
			});
		});
	};
	/**
	* Embed a single PDF page into this document.
	*
	* For example:
	* ```js
	* const pdfDoc = await PDFDocument.create()
	*
	* const sourcePdfUrl = 'https://pdf-lib.js.org/assets/with_large_page_count.pdf'
	* const sourceBuffer = await fetch(sourcePdfUrl).then((res) => res.arrayBuffer())
	* const sourcePdfDoc = await PDFDocument.load(sourceBuffer)
	* const sourcePdfPage = sourcePdfDoc.getPages()[73]
	*
	* const embeddedPage = await pdfDoc.embedPage(
	*   sourcePdfPage,
	*
	*   // Clip a section of the source page so that we only embed part of it
	*   { left: 100, right: 450, bottom: 330, top: 570 },
	*
	*   // Translate all drawings of the embedded page by (10, 200) units
	*   [1, 0, 0, 1, 10, 200],
	* )
	* ```
	*
	* @param page The page to be embedded.
	* @param boundingBox
	* Optionally, an area of the source page that should be embedded
	* (defaults to entire page).
	* @param transformationMatrix
	* Optionally, a transformation matrix that is always applied to the embedded
	* page anywhere it is drawn.
	* @returns Resolves with the embedded pdf page.
	*/
	PDFDocument.prototype.embedPage = function(page, boundingBox, transformationMatrix) {
		return __awaiter(this, void 0, void 0, function() {
			var embeddedPage;
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						assertIs(page, "page", [[PDFPage, "PDFPage"]]);
						return [4, this.embedPages([page], [boundingBox], [transformationMatrix])];
					case 1:
						embeddedPage = _a.sent()[0];
						return [2, embeddedPage];
				}
			});
		});
	};
	/**
	* Embed one or more PDF pages into this document.
	*
	* For example:
	* ```js
	* const pdfDoc = await PDFDocument.create()
	*
	* const sourcePdfUrl = 'https://pdf-lib.js.org/assets/with_large_page_count.pdf'
	* const sourceBuffer = await fetch(sourcePdfUrl).then((res) => res.arrayBuffer())
	* const sourcePdfDoc = await PDFDocument.load(sourceBuffer)
	*
	* const page1 = sourcePdfDoc.getPages()[0]
	* const page2 = sourcePdfDoc.getPages()[52]
	* const page3 = sourcePdfDoc.getPages()[73]
	*
	* const embeddedPages = await pdfDoc.embedPages([page1, page2, page3])
	* ```
	*
	* @param page
	* The pages to be embedded (they must all share the same context).
	* @param boundingBoxes
	* Optionally, an array of clipping boundaries - one for each page
	* (defaults to entirety of each page).
	* @param transformationMatrices
	* Optionally, an array of transformation matrices - one for each page
	* (each page's transformation will apply anywhere it is drawn).
	* @returns Resolves with an array of the embedded pdf pages.
	*/
	PDFDocument.prototype.embedPages = function(pages, boundingBoxes, transformationMatrices) {
		if (boundingBoxes === void 0) boundingBoxes = [];
		if (transformationMatrices === void 0) transformationMatrices = [];
		return __awaiter(this, void 0, void 0, function() {
			var idx, len, currPage, nextPage, context, maybeCopyPage, embeddedPages, idx, len, page, box, matrix, embedder, ref;
			var _a;
			return __generator(this, function(_b) {
				switch (_b.label) {
					case 0:
						if (pages.length === 0) return [2, []];
						for (idx = 0, len = pages.length - 1; idx < len; idx++) {
							currPage = pages[idx];
							nextPage = pages[idx + 1];
							if (currPage.node.context !== nextPage.node.context) throw new PageEmbeddingMismatchedContextError();
						}
						context = pages[0].node.context;
						maybeCopyPage = context === this.context ? function(p) {
							return p;
						} : PDFObjectCopier.for(context, this.context).copy;
						embeddedPages = new Array(pages.length);
						idx = 0, len = pages.length;
						_b.label = 1;
					case 1:
						if (!(idx < len)) return [3, 4];
						page = maybeCopyPage(pages[idx].node);
						box = boundingBoxes[idx];
						matrix = transformationMatrices[idx];
						return [4, PDFPageEmbedder.for(page, box, matrix)];
					case 2:
						embedder = _b.sent();
						ref = this.context.nextRef();
						embeddedPages[idx] = PDFEmbeddedPage.of(ref, this, embedder);
						_b.label = 3;
					case 3:
						idx++;
						return [3, 1];
					case 4:
						(_a = this.embeddedPages).push.apply(_a, embeddedPages);
						return [2, embeddedPages];
				}
			});
		});
	};
	/**
	* > **NOTE:** You shouldn't need to call this method directly. The [[save]]
	* > and [[saveAsBase64]] methods will automatically ensure that all embedded
	* > assets are flushed before serializing the document.
	*
	* Flush all embedded fonts, PDF pages, and images to this document's
	* [[context]].
	*
	* @returns Resolves when the flush is complete.
	*/
	PDFDocument.prototype.flush = function() {
		return __awaiter(this, void 0, void 0, function() {
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0: return [4, this.embedAll(this.fonts)];
					case 1:
						_a.sent();
						return [4, this.embedAll(this.images)];
					case 2:
						_a.sent();
						return [4, this.embedAll(this.embeddedPages)];
					case 3:
						_a.sent();
						return [4, this.embedAll(this.embeddedFiles)];
					case 4:
						_a.sent();
						return [4, this.embedAll(this.javaScripts)];
					case 5:
						_a.sent();
						return [2];
				}
			});
		});
	};
	/**
	* Serialize this document to an array of bytes making up a PDF file.
	* For example:
	* ```js
	* const pdfBytes = await pdfDoc.save()
	* ```
	*
	* There are a number of things you can do with the serialized document,
	* depending on the JavaScript environment you're running in:
	* * Write it to a file in Node or React Native
	* * Download it as a Blob in the browser
	* * Render it in an `iframe`
	*
	* @param options The options to be used when saving the document.
	* @returns Resolves with the bytes of the serialized document.
	*/
	PDFDocument.prototype.save = function(options) {
		if (options === void 0) options = {};
		return __awaiter(this, void 0, void 0, function() {
			var _a, useObjectStreams, _b, addDefaultPage, _c, objectsPerTick, _d, updateFieldAppearances, form, Writer;
			return __generator(this, function(_e) {
				switch (_e.label) {
					case 0:
						_a = options.useObjectStreams, useObjectStreams = _a === void 0 ? true : _a, _b = options.addDefaultPage, addDefaultPage = _b === void 0 ? true : _b, _c = options.objectsPerTick, objectsPerTick = _c === void 0 ? 50 : _c, _d = options.updateFieldAppearances, updateFieldAppearances = _d === void 0 ? true : _d;
						assertIs(useObjectStreams, "useObjectStreams", ["boolean"]);
						assertIs(addDefaultPage, "addDefaultPage", ["boolean"]);
						assertIs(objectsPerTick, "objectsPerTick", ["number"]);
						assertIs(updateFieldAppearances, "updateFieldAppearances", ["boolean"]);
						if (addDefaultPage && this.getPageCount() === 0) this.addPage();
						if (updateFieldAppearances) {
							form = this.formCache.getValue();
							if (form) form.updateFieldAppearances();
						}
						return [4, this.flush()];
					case 1:
						_e.sent();
						Writer = useObjectStreams ? PDFStreamWriter : PDFWriter;
						return [2, Writer.forContext(this.context, objectsPerTick).serializeToBuffer()];
				}
			});
		});
	};
	/**
	* Serialize this document to a base64 encoded string or data URI making up a
	* PDF file. For example:
	* ```js
	* const base64String = await pdfDoc.saveAsBase64()
	* base64String // => 'JVBERi0xLjcKJYGBgYEKC...'
	*
	* const base64DataUri = await pdfDoc.saveAsBase64({ dataUri: true })
	* base64DataUri // => 'data:application/pdf;base64,JVBERi0xLjcKJYGBgYEKC...'
	* ```
	*
	* @param options The options to be used when saving the document.
	* @returns Resolves with a base64 encoded string or data URI of the
	*          serialized document.
	*/
	PDFDocument.prototype.saveAsBase64 = function(options) {
		if (options === void 0) options = {};
		return __awaiter(this, void 0, void 0, function() {
			var _a, dataUri, otherOptions, bytes, base64;
			return __generator(this, function(_b) {
				switch (_b.label) {
					case 0:
						_a = options.dataUri, dataUri = _a === void 0 ? false : _a, otherOptions = __rest(options, ["dataUri"]);
						assertIs(dataUri, "dataUri", ["boolean"]);
						return [4, this.save(otherOptions)];
					case 1:
						bytes = _b.sent();
						base64 = encodeToBase64(bytes);
						return [2, dataUri ? "data:application/pdf;base64," + base64 : base64];
				}
			});
		});
	};
	PDFDocument.prototype.findPageForAnnotationRef = function(ref) {
		var pages = this.getPages();
		for (var idx = 0, len = pages.length; idx < len; idx++) {
			var page = pages[idx];
			var annotations = page.node.Annots();
			if ((annotations === null || annotations === void 0 ? void 0 : annotations.indexOf(ref)) !== void 0) return page;
		}
	};
	PDFDocument.prototype.embedAll = function(embeddables) {
		return __awaiter(this, void 0, void 0, function() {
			var idx, len;
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						idx = 0, len = embeddables.length;
						_a.label = 1;
					case 1:
						if (!(idx < len)) return [3, 4];
						return [4, embeddables[idx].embed()];
					case 2:
						_a.sent();
						_a.label = 3;
					case 3:
						idx++;
						return [3, 1];
					case 4: return [2];
				}
			});
		});
	};
	PDFDocument.prototype.updateInfoDict = function() {
		var pdfLib = "pdf-lib (https://github.com/Hopding/pdf-lib)";
		var now = /* @__PURE__ */ new Date();
		var info = this.getInfoDict();
		this.setProducer(pdfLib);
		this.setModificationDate(now);
		if (!info.get(PDFName.of("Creator"))) this.setCreator(pdfLib);
		if (!info.get(PDFName.of("CreationDate"))) this.setCreationDate(now);
	};
	PDFDocument.prototype.getInfoDict = function() {
		var existingInfo = this.context.lookup(this.context.trailerInfo.Info);
		if (existingInfo instanceof PDFDict) return existingInfo;
		var newInfo = this.context.obj({});
		this.context.trailerInfo.Info = this.context.register(newInfo);
		return newInfo;
	};
	PDFDocument.prototype.assertFontkit = function() {
		if (!this.fontkit) throw new FontkitNotRegisteredError();
		return this.fontkit;
	};
	return PDFDocument;
}();
function assertIsLiteralOrHexString(pdfObject) {
	if (!(pdfObject instanceof PDFHexString) && !(pdfObject instanceof PDFString)) throw new UnexpectedObjectTypeError([PDFHexString, PDFString], pdfObject);
}
//#endregion
//#region node_modules/pdf-lib/es/api/PDFPageOptions.js
var BlendMode;
(function(BlendMode) {
	BlendMode["Normal"] = "Normal";
	BlendMode["Multiply"] = "Multiply";
	BlendMode["Screen"] = "Screen";
	BlendMode["Overlay"] = "Overlay";
	BlendMode["Darken"] = "Darken";
	BlendMode["Lighten"] = "Lighten";
	BlendMode["ColorDodge"] = "ColorDodge";
	BlendMode["ColorBurn"] = "ColorBurn";
	BlendMode["HardLight"] = "HardLight";
	BlendMode["SoftLight"] = "SoftLight";
	BlendMode["Difference"] = "Difference";
	BlendMode["Exclusion"] = "Exclusion";
})(BlendMode || (BlendMode = {}));
//#endregion
//#region node_modules/pdf-lib/es/api/PDFPage.js
/**
* Represents a single page of a [[PDFDocument]].
*/
var PDFPage = function() {
	function PDFPage(leafNode, ref, doc) {
		this.fontSize = 24;
		this.fontColor = rgb(0, 0, 0);
		this.lineHeight = 24;
		this.x = 0;
		this.y = 0;
		assertIs(leafNode, "leafNode", [[PDFPageLeaf, "PDFPageLeaf"]]);
		assertIs(ref, "ref", [[PDFRef, "PDFRef"]]);
		assertIs(doc, "doc", [[PDFDocument, "PDFDocument"]]);
		this.node = leafNode;
		this.ref = ref;
		this.doc = doc;
	}
	/**
	* Rotate this page by a multiple of 90 degrees. For example:
	* ```js
	* import { degrees } from 'pdf-lib'
	*
	* page.setRotation(degrees(-90))
	* page.setRotation(degrees(0))
	* page.setRotation(degrees(90))
	* page.setRotation(degrees(180))
	* page.setRotation(degrees(270))
	* ```
	* @param angle The angle to rotate this page.
	*/
	PDFPage.prototype.setRotation = function(angle) {
		var degreesAngle = toDegrees(angle);
		assertMultiple(degreesAngle, "degreesAngle", 90);
		this.node.set(PDFName.of("Rotate"), this.doc.context.obj(degreesAngle));
	};
	/**
	* Get this page's rotation angle in degrees. For example:
	* ```js
	* const rotationAngle = page.getRotation().angle;
	* ```
	* @returns The rotation angle of the page in degrees (always a multiple of
	*          90 degrees).
	*/
	PDFPage.prototype.getRotation = function() {
		var Rotate = this.node.Rotate();
		return degrees(Rotate ? Rotate.asNumber() : 0);
	};
	/**
	* Resize this page by increasing or decreasing its width and height. For
	* example:
	* ```js
	* page.setSize(250, 500)
	* page.setSize(page.getWidth() + 50, page.getHeight() + 100)
	* page.setSize(page.getWidth() - 50, page.getHeight() - 100)
	* ```
	*
	* Note that the PDF specification does not allow for pages to have explicit
	* widths and heights. Instead it defines the "size" of a page in terms of
	* five rectangles: the MediaBox, CropBox, BleedBox, TrimBox, and ArtBox. As a
	* result, this method cannot directly change the width and height of a page.
	* Instead, it works by adjusting these five boxes.
	*
	* This method performs the following steps:
	*   1. Set width & height of MediaBox.
	*   2. Set width & height of CropBox, if it has same dimensions as MediaBox.
	*   3. Set width & height of BleedBox, if it has same dimensions as MediaBox.
	*   4. Set width & height of TrimBox, if it has same dimensions as MediaBox.
	*   5. Set width & height of ArtBox, if it has same dimensions as MediaBox.
	*
	* This approach works well for most PDF documents as all PDF pages must
	* have a MediaBox, but relatively few have a CropBox, BleedBox, TrimBox, or
	* ArtBox. And when they do have these additional boxes, they often have the
	* same dimensions as the MediaBox. However, if you find this method does not
	* work for your document, consider setting the boxes directly:
	*   * [[PDFPage.setMediaBox]]
	*   * [[PDFPage.setCropBox]]
	*   * [[PDFPage.setBleedBox]]
	*   * [[PDFPage.setTrimBox]]
	*   * [[PDFPage.setArtBox]]
	*
	* @param width The new width of the page.
	* @param height The new height of the page.
	*/
	PDFPage.prototype.setSize = function(width, height) {
		assertIs(width, "width", ["number"]);
		assertIs(height, "height", ["number"]);
		var mediaBox = this.getMediaBox();
		this.setMediaBox(mediaBox.x, mediaBox.y, width, height);
		var cropBox = this.getCropBox();
		var bleedBox = this.getBleedBox();
		var trimBox = this.getTrimBox();
		var artBox = this.getArtBox();
		var hasCropBox = this.node.CropBox();
		var hasBleedBox = this.node.BleedBox();
		var hasTrimBox = this.node.TrimBox();
		var hasArtBox = this.node.ArtBox();
		if (hasCropBox && rectanglesAreEqual(cropBox, mediaBox)) this.setCropBox(mediaBox.x, mediaBox.y, width, height);
		if (hasBleedBox && rectanglesAreEqual(bleedBox, mediaBox)) this.setBleedBox(mediaBox.x, mediaBox.y, width, height);
		if (hasTrimBox && rectanglesAreEqual(trimBox, mediaBox)) this.setTrimBox(mediaBox.x, mediaBox.y, width, height);
		if (hasArtBox && rectanglesAreEqual(artBox, mediaBox)) this.setArtBox(mediaBox.x, mediaBox.y, width, height);
	};
	/**
	* Resize this page by increasing or decreasing its width. For example:
	* ```js
	* page.setWidth(250)
	* page.setWidth(page.getWidth() + 50)
	* page.setWidth(page.getWidth() - 50)
	* ```
	*
	* This method uses [[PDFPage.setSize]] to set the page's width.
	*
	* @param width The new width of the page.
	*/
	PDFPage.prototype.setWidth = function(width) {
		assertIs(width, "width", ["number"]);
		this.setSize(width, this.getSize().height);
	};
	/**
	* Resize this page by increasing or decreasing its height. For example:
	* ```js
	* page.setHeight(500)
	* page.setHeight(page.getWidth() + 100)
	* page.setHeight(page.getWidth() - 100)
	* ```
	*
	* This method uses [[PDFPage.setSize]] to set the page's height.
	*
	* @param height The new height of the page.
	*/
	PDFPage.prototype.setHeight = function(height) {
		assertIs(height, "height", ["number"]);
		this.setSize(this.getSize().width, height);
	};
	/**
	* Set the MediaBox of this page. For example:
	* ```js
	* const mediaBox = page.getMediaBox()
	*
	* page.setMediaBox(0, 0, 250, 500)
	* page.setMediaBox(mediaBox.x, mediaBox.y, 50, 100)
	* page.setMediaBox(15, 5, mediaBox.width - 50, mediaBox.height - 100)
	* ```
	*
	* See [[PDFPage.getMediaBox]] for details about what the MediaBox represents.
	*
	* @param x The x coordinate of the lower left corner of the new MediaBox.
	* @param y The y coordinate of the lower left corner of the new MediaBox.
	* @param width The width of the new MediaBox.
	* @param height The height of the new MediaBox.
	*/
	PDFPage.prototype.setMediaBox = function(x, y, width, height) {
		assertIs(x, "x", ["number"]);
		assertIs(y, "y", ["number"]);
		assertIs(width, "width", ["number"]);
		assertIs(height, "height", ["number"]);
		var mediaBox = this.doc.context.obj([
			x,
			y,
			x + width,
			y + height
		]);
		this.node.set(PDFName.MediaBox, mediaBox);
	};
	/**
	* Set the CropBox of this page. For example:
	* ```js
	* const cropBox = page.getCropBox()
	*
	* page.setCropBox(0, 0, 250, 500)
	* page.setCropBox(cropBox.x, cropBox.y, 50, 100)
	* page.setCropBox(15, 5, cropBox.width - 50, cropBox.height - 100)
	* ```
	*
	* See [[PDFPage.getCropBox]] for details about what the CropBox represents.
	*
	* @param x The x coordinate of the lower left corner of the new CropBox.
	* @param y The y coordinate of the lower left corner of the new CropBox.
	* @param width The width of the new CropBox.
	* @param height The height of the new CropBox.
	*/
	PDFPage.prototype.setCropBox = function(x, y, width, height) {
		assertIs(x, "x", ["number"]);
		assertIs(y, "y", ["number"]);
		assertIs(width, "width", ["number"]);
		assertIs(height, "height", ["number"]);
		var cropBox = this.doc.context.obj([
			x,
			y,
			x + width,
			y + height
		]);
		this.node.set(PDFName.CropBox, cropBox);
	};
	/**
	* Set the BleedBox of this page. For example:
	* ```js
	* const bleedBox = page.getBleedBox()
	*
	* page.setBleedBox(0, 0, 250, 500)
	* page.setBleedBox(bleedBox.x, bleedBox.y, 50, 100)
	* page.setBleedBox(15, 5, bleedBox.width - 50, bleedBox.height - 100)
	* ```
	*
	* See [[PDFPage.getBleedBox]] for details about what the BleedBox represents.
	*
	* @param x The x coordinate of the lower left corner of the new BleedBox.
	* @param y The y coordinate of the lower left corner of the new BleedBox.
	* @param width The width of the new BleedBox.
	* @param height The height of the new BleedBox.
	*/
	PDFPage.prototype.setBleedBox = function(x, y, width, height) {
		assertIs(x, "x", ["number"]);
		assertIs(y, "y", ["number"]);
		assertIs(width, "width", ["number"]);
		assertIs(height, "height", ["number"]);
		var bleedBox = this.doc.context.obj([
			x,
			y,
			x + width,
			y + height
		]);
		this.node.set(PDFName.BleedBox, bleedBox);
	};
	/**
	* Set the TrimBox of this page. For example:
	* ```js
	* const trimBox = page.getTrimBox()
	*
	* page.setTrimBox(0, 0, 250, 500)
	* page.setTrimBox(trimBox.x, trimBox.y, 50, 100)
	* page.setTrimBox(15, 5, trimBox.width - 50, trimBox.height - 100)
	* ```
	*
	* See [[PDFPage.getTrimBox]] for details about what the TrimBox represents.
	*
	* @param x The x coordinate of the lower left corner of the new TrimBox.
	* @param y The y coordinate of the lower left corner of the new TrimBox.
	* @param width The width of the new TrimBox.
	* @param height The height of the new TrimBox.
	*/
	PDFPage.prototype.setTrimBox = function(x, y, width, height) {
		assertIs(x, "x", ["number"]);
		assertIs(y, "y", ["number"]);
		assertIs(width, "width", ["number"]);
		assertIs(height, "height", ["number"]);
		var trimBox = this.doc.context.obj([
			x,
			y,
			x + width,
			y + height
		]);
		this.node.set(PDFName.TrimBox, trimBox);
	};
	/**
	* Set the ArtBox of this page. For example:
	* ```js
	* const artBox = page.getArtBox()
	*
	* page.setArtBox(0, 0, 250, 500)
	* page.setArtBox(artBox.x, artBox.y, 50, 100)
	* page.setArtBox(15, 5, artBox.width - 50, artBox.height - 100)
	* ```
	*
	* See [[PDFPage.getArtBox]] for details about what the ArtBox represents.
	*
	* @param x The x coordinate of the lower left corner of the new ArtBox.
	* @param y The y coordinate of the lower left corner of the new ArtBox.
	* @param width The width of the new ArtBox.
	* @param height The height of the new ArtBox.
	*/
	PDFPage.prototype.setArtBox = function(x, y, width, height) {
		assertIs(x, "x", ["number"]);
		assertIs(y, "y", ["number"]);
		assertIs(width, "width", ["number"]);
		assertIs(height, "height", ["number"]);
		var artBox = this.doc.context.obj([
			x,
			y,
			x + width,
			y + height
		]);
		this.node.set(PDFName.ArtBox, artBox);
	};
	/**
	* Get this page's width and height. For example:
	* ```js
	* const { width, height } = page.getSize()
	* ```
	*
	* This method uses [[PDFPage.getMediaBox]] to obtain the page's
	* width and height.
	*
	* @returns The width and height of the page.
	*/
	PDFPage.prototype.getSize = function() {
		var _a = this.getMediaBox();
		return {
			width: _a.width,
			height: _a.height
		};
	};
	/**
	* Get this page's width. For example:
	* ```js
	* const width = page.getWidth()
	* ```
	*
	* This method uses [[PDFPage.getSize]] to obtain the page's size.
	*
	* @returns The width of the page.
	*/
	PDFPage.prototype.getWidth = function() {
		return this.getSize().width;
	};
	/**
	* Get this page's height. For example:
	* ```js
	* const height = page.getHeight()
	* ```
	*
	* This method uses [[PDFPage.getSize]] to obtain the page's size.
	*
	* @returns The height of the page.
	*/
	PDFPage.prototype.getHeight = function() {
		return this.getSize().height;
	};
	/**
	* Get the rectangle defining this page's MediaBox. For example:
	* ```js
	* const { x, y, width, height } = page.getMediaBox()
	* ```
	*
	* The MediaBox of a page defines the boundaries of the physical medium on
	* which the page is to be displayed/printed. It may include extended area
	* surrounding the page content for bleed marks, printing marks, etc...
	* It may also include areas close to the edges of the medium that cannot be
	* marked because of physical limitations of the output device. Content
	* falling outside this boundary may safely be discarded without affecting
	* the meaning of the PDF file.
	*
	* @returns An object defining the lower left corner of the MediaBox and its
	*          width & height.
	*/
	PDFPage.prototype.getMediaBox = function() {
		return this.node.MediaBox().asRectangle();
	};
	/**
	* Get the rectangle defining this page's CropBox. For example:
	* ```js
	* const { x, y, width, height } = page.getCropBox()
	* ```
	*
	* The CropBox of a page defines the region to which the contents of the page
	* shall be clipped when displayed or printed. Unlike the other boxes, the
	* CropBox does not necessarily represent the physical page geometry. It
	* merely imposes clipping on the page contents.
	*
	* The CropBox's default value is the page's MediaBox.
	*
	* @returns An object defining the lower left corner of the CropBox and its
	*          width & height.
	*/
	PDFPage.prototype.getCropBox = function() {
		var _a;
		var cropBox = this.node.CropBox();
		return (_a = cropBox === null || cropBox === void 0 ? void 0 : cropBox.asRectangle()) !== null && _a !== void 0 ? _a : this.getMediaBox();
	};
	/**
	* Get the rectangle defining this page's BleedBox. For example:
	* ```js
	* const { x, y, width, height } = page.getBleedBox()
	* ```
	*
	* The BleedBox of a page defines the region to which the contents of the
	* page shall be clipped when output in a production environment. This may
	* include any extra bleed area needed to accommodate the physical
	* limitations of cutting, folding, and trimming equipment. The actual
	* printed page may include printing marks that fall outside the BleedBox.
	*
	* The BleedBox's default value is the page's CropBox.
	*
	* @returns An object defining the lower left corner of the BleedBox and its
	*          width & height.
	*/
	PDFPage.prototype.getBleedBox = function() {
		var _a;
		var bleedBox = this.node.BleedBox();
		return (_a = bleedBox === null || bleedBox === void 0 ? void 0 : bleedBox.asRectangle()) !== null && _a !== void 0 ? _a : this.getCropBox();
	};
	/**
	* Get the rectangle defining this page's TrimBox. For example:
	* ```js
	* const { x, y, width, height } = page.getTrimBox()
	* ```
	*
	* The TrimBox of a page defines the intended dimensions of the finished
	* page after trimming. It may be smaller than the MediaBox to allow for
	* production-related content, such as printing instructions, cut marks, or
	* color bars.
	*
	* The TrimBox's default value is the page's CropBox.
	*
	* @returns An object defining the lower left corner of the TrimBox and its
	*          width & height.
	*/
	PDFPage.prototype.getTrimBox = function() {
		var _a;
		var trimBox = this.node.TrimBox();
		return (_a = trimBox === null || trimBox === void 0 ? void 0 : trimBox.asRectangle()) !== null && _a !== void 0 ? _a : this.getCropBox();
	};
	/**
	* Get the rectangle defining this page's ArtBox. For example:
	* ```js
	* const { x, y, width, height } = page.getArtBox()
	* ```
	*
	* The ArtBox of a page defines the extent of the page's meaningful content
	* (including potential white space).
	*
	* The ArtBox's default value is the page's CropBox.
	*
	* @returns An object defining the lower left corner of the ArtBox and its
	*          width & height.
	*/
	PDFPage.prototype.getArtBox = function() {
		var _a;
		var artBox = this.node.ArtBox();
		return (_a = artBox === null || artBox === void 0 ? void 0 : artBox.asRectangle()) !== null && _a !== void 0 ? _a : this.getCropBox();
	};
	/**
	* Translate this page's content to a new location on the page. This operation
	* is often useful after resizing the page with [[setSize]]. For example:
	* ```js
	* // Add 50 units of whitespace to the top and right of the page
	* page.setSize(page.getWidth() + 50, page.getHeight() + 50)
	*
	* // Move the page's content from the lower-left corner of the page
	* // to the top-right corner.
	* page.translateContent(50, 50)
	*
	* // Now there are 50 units of whitespace to the left and bottom of the page
	* ```
	* See also: [[resetPosition]]
	* @param x The new position on the x-axis for this page's content.
	* @param y The new position on the y-axis for this page's content.
	*/
	PDFPage.prototype.translateContent = function(x, y) {
		assertIs(x, "x", ["number"]);
		assertIs(y, "y", ["number"]);
		this.node.normalize();
		this.getContentStream();
		var start = this.createContentStream(pushGraphicsState(), translate(x, y));
		var startRef = this.doc.context.register(start);
		var end = this.createContentStream(popGraphicsState());
		var endRef = this.doc.context.register(end);
		this.node.wrapContentStreams(startRef, endRef);
	};
	/**
	* Scale the size, content, and annotations of a page.
	*
	* For example:
	* ```js
	* page.scale(0.5, 0.5);
	* ```
	*
	* @param x The factor by which the width for the page should be scaled
	*          (e.g. `0.5` is 50%).
	* @param y The factor by which the height for the page should be scaled
	*          (e.g. `2.0` is 200%).
	*/
	PDFPage.prototype.scale = function(x, y) {
		assertIs(x, "x", ["number"]);
		assertIs(y, "y", ["number"]);
		this.setSize(this.getWidth() * x, this.getHeight() * y);
		this.scaleContent(x, y);
		this.scaleAnnotations(x, y);
	};
	/**
	* Scale the content of a page. This is useful after resizing an existing
	* page. This scales only the content, not the annotations.
	*
	* For example:
	* ```js
	* // Bisect the size of the page
	* page.setSize(page.getWidth() / 2, page.getHeight() / 2);
	*
	* // Scale the content of the page down by 50% in x and y
	* page.scaleContent(0.5, 0.5);
	* ```
	* See also: [[scaleAnnotations]]
	* @param x The factor by which the x-axis for the content should be scaled
	*          (e.g. `0.5` is 50%).
	* @param y The factor by which the y-axis for the content should be scaled
	*          (e.g. `2.0` is 200%).
	*/
	PDFPage.prototype.scaleContent = function(x, y) {
		assertIs(x, "x", ["number"]);
		assertIs(y, "y", ["number"]);
		this.node.normalize();
		this.getContentStream();
		var start = this.createContentStream(pushGraphicsState(), scale(x, y));
		var startRef = this.doc.context.register(start);
		var end = this.createContentStream(popGraphicsState());
		var endRef = this.doc.context.register(end);
		this.node.wrapContentStreams(startRef, endRef);
	};
	/**
	* Scale the annotations of a page. This is useful if you want to scale a
	* page with comments or other annotations.
	* ```js
	* // Scale the content of the page down by 50% in x and y
	* page.scaleContent(0.5, 0.5);
	*
	* // Scale the content of the page down by 50% in x and y
	* page.scaleAnnotations(0.5, 0.5);
	* ```
	* See also: [[scaleContent]]
	* @param x The factor by which the x-axis for the annotations should be
	*          scaled (e.g. `0.5` is 50%).
	* @param y The factor by which the y-axis for the annotations should be
	*          scaled (e.g. `2.0` is 200%).
	*/
	PDFPage.prototype.scaleAnnotations = function(x, y) {
		assertIs(x, "x", ["number"]);
		assertIs(y, "y", ["number"]);
		var annots = this.node.Annots();
		if (!annots) return;
		for (var idx = 0; idx < annots.size(); idx++) {
			var annot = annots.lookup(idx);
			if (annot instanceof PDFDict) this.scaleAnnot(annot, x, y);
		}
	};
	/**
	* Reset the x and y coordinates of this page to `(0, 0)`. This operation is
	* often useful after calling [[translateContent]]. For example:
	* ```js
	* // Shift the page's contents up and to the right by 50 units
	* page.translateContent(50, 50)
	*
	* // This text will shifted - it will be drawn at (50, 50)
	* page.drawText('I am shifted')
	*
	* // Move back to (0, 0)
	* page.resetPosition()
	*
	* // This text will not be shifted - it will be drawn at (0, 0)
	* page.drawText('I am not shifted')
	* ```
	*/
	PDFPage.prototype.resetPosition = function() {
		this.getContentStream(false);
		this.x = 0;
		this.y = 0;
	};
	/**
	* Choose a default font for this page. The default font will be used whenever
	* text is drawn on this page and no font is specified. For example:
	* ```js
	* import { StandardFonts } from 'pdf-lib'
	*
	* const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
	* const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
	* const courierFont = await pdfDoc.embedFont(StandardFonts.Courier)
	*
	* const page = pdfDoc.addPage()
	*
	* page.setFont(helveticaFont)
	* page.drawText('I will be drawn in Helvetica')
	*
	* page.setFont(timesRomanFont)
	* page.drawText('I will be drawn in Courier', { font: courierFont })
	* ```
	* @param font The default font to be used when drawing text on this page.
	*/
	PDFPage.prototype.setFont = function(font) {
		assertIs(font, "font", [[PDFFont, "PDFFont"]]);
		this.font = font;
		this.fontKey = this.node.newFontDictionary(this.font.name, this.font.ref);
	};
	/**
	* Choose a default font size for this page. The default font size will be
	* used whenever text is drawn on this page and no font size is specified.
	* For example:
	* ```js
	* page.setFontSize(12)
	* page.drawText('I will be drawn in size 12')
	*
	* page.setFontSize(36)
	* page.drawText('I will be drawn in size 24', { fontSize: 24 })
	* ```
	* @param fontSize The default font size to be used when drawing text on this
	*                 page.
	*/
	PDFPage.prototype.setFontSize = function(fontSize) {
		assertIs(fontSize, "fontSize", ["number"]);
		this.fontSize = fontSize;
	};
	/**
	* Choose a default font color for this page. The default font color will be
	* used whenever text is drawn on this page and no font color is specified.
	* For example:
	* ```js
	* import { rgb, cmyk, grayscale } from 'pdf-lib'
	*
	* page.setFontColor(rgb(0.97, 0.02, 0.97))
	* page.drawText('I will be drawn in pink')
	*
	* page.setFontColor(cmyk(0.4, 0.7, 0.39, 0.15))
	* page.drawText('I will be drawn in gray', { color: grayscale(0.5) })
	* ```
	* @param fontColor The default font color to be used when drawing text on
	*                  this page.
	*/
	PDFPage.prototype.setFontColor = function(fontColor) {
		assertIs(fontColor, "fontColor", [[Object, "Color"]]);
		this.fontColor = fontColor;
	};
	/**
	* Choose a default line height for this page. The default line height will be
	* used whenever text is drawn on this page and no line height is specified.
	* For example:
	* ```js
	* page.setLineHeight(12);
	* page.drawText('These lines will be vertically \n separated by 12 units')
	*
	* page.setLineHeight(36);
	* page.drawText('These lines will be vertically \n separated by 24 units', {
	*   lineHeight: 24
	* })
	* ```
	* @param lineHeight The default line height to be used when drawing text on
	*                   this page.
	*/
	PDFPage.prototype.setLineHeight = function(lineHeight) {
		assertIs(lineHeight, "lineHeight", ["number"]);
		this.lineHeight = lineHeight;
	};
	/**
	* Get the default position of this page. For example:
	* ```js
	* const { x, y } = page.getPosition()
	* ```
	* @returns The default position of the page.
	*/
	PDFPage.prototype.getPosition = function() {
		return {
			x: this.x,
			y: this.y
		};
	};
	/**
	* Get the default x coordinate of this page. For example:
	* ```js
	* const x = page.getX()
	* ```
	* @returns The default x coordinate of the page.
	*/
	PDFPage.prototype.getX = function() {
		return this.x;
	};
	/**
	* Get the default y coordinate of this page. For example:
	* ```js
	* const y = page.getY()
	* ```
	* @returns The default y coordinate of the page.
	*/
	PDFPage.prototype.getY = function() {
		return this.y;
	};
	/**
	* Change the default position of this page. For example:
	* ```js
	* page.moveTo(0, 0)
	* page.drawText('I will be drawn at the origin')
	*
	* page.moveTo(0, 25)
	* page.drawText('I will be drawn 25 units up')
	*
	* page.moveTo(25, 25)
	* page.drawText('I will be drawn 25 units up and 25 units to the right')
	* ```
	* @param x The new default position on the x-axis for this page.
	* @param y The new default position on the y-axis for this page.
	*/
	PDFPage.prototype.moveTo = function(x, y) {
		assertIs(x, "x", ["number"]);
		assertIs(y, "y", ["number"]);
		this.x = x;
		this.y = y;
	};
	/**
	* Change the default position of this page to be further down the y-axis.
	* For example:
	* ```js
	* page.moveTo(50, 50)
	* page.drawText('I will be drawn at (50, 50)')
	*
	* page.moveDown(10)
	* page.drawText('I will be drawn at (50, 40)')
	* ```
	* @param yDecrease The amount by which the page's default position along the
	*                  y-axis should be decreased.
	*/
	PDFPage.prototype.moveDown = function(yDecrease) {
		assertIs(yDecrease, "yDecrease", ["number"]);
		this.y -= yDecrease;
	};
	/**
	* Change the default position of this page to be further up the y-axis.
	* For example:
	* ```js
	* page.moveTo(50, 50)
	* page.drawText('I will be drawn at (50, 50)')
	*
	* page.moveUp(10)
	* page.drawText('I will be drawn at (50, 60)')
	* ```
	* @param yIncrease The amount by which the page's default position along the
	*                  y-axis should be increased.
	*/
	PDFPage.prototype.moveUp = function(yIncrease) {
		assertIs(yIncrease, "yIncrease", ["number"]);
		this.y += yIncrease;
	};
	/**
	* Change the default position of this page to be further left on the x-axis.
	* For example:
	* ```js
	* page.moveTo(50, 50)
	* page.drawText('I will be drawn at (50, 50)')
	*
	* page.moveLeft(10)
	* page.drawText('I will be drawn at (40, 50)')
	* ```
	* @param xDecrease The amount by which the page's default position along the
	*                  x-axis should be decreased.
	*/
	PDFPage.prototype.moveLeft = function(xDecrease) {
		assertIs(xDecrease, "xDecrease", ["number"]);
		this.x -= xDecrease;
	};
	/**
	* Change the default position of this page to be further right on the y-axis.
	* For example:
	* ```js
	* page.moveTo(50, 50)
	* page.drawText('I will be drawn at (50, 50)')
	*
	* page.moveRight(10)
	* page.drawText('I will be drawn at (60, 50)')
	* ```
	* @param xIncrease The amount by which the page's default position along the
	*                  x-axis should be increased.
	*/
	PDFPage.prototype.moveRight = function(xIncrease) {
		assertIs(xIncrease, "xIncrease", ["number"]);
		this.x += xIncrease;
	};
	/**
	* Push one or more operators to the end of this page's current content
	* stream. For example:
	* ```js
	* import {
	*   pushGraphicsState,
	*   moveTo,
	*   lineTo,
	*   closePath,
	*   setFillingColor,
	*   rgb,
	*   fill,
	*   popGraphicsState,
	* } from 'pdf-lib'
	*
	* // Draw a green triangle in the lower-left corner of the page
	* page.pushOperators(
	*   pushGraphicsState(),
	*   moveTo(0, 0),
	*   lineTo(100, 0),
	*   lineTo(50, 100),
	*   closePath(),
	*   setFillingColor(rgb(0.0, 1.0, 0.0)),
	*   fill(),
	*   popGraphicsState(),
	* )
	* ```
	* @param operator The operators to be pushed.
	*/
	PDFPage.prototype.pushOperators = function() {
		var operator = [];
		for (var _i = 0; _i < arguments.length; _i++) operator[_i] = arguments[_i];
		assertEachIs(operator, "operator", [[PDFOperator, "PDFOperator"]]);
		var contentStream = this.getContentStream();
		contentStream.push.apply(contentStream, operator);
	};
	/**
	* Draw one or more lines of text on this page. For example:
	* ```js
	* import { StandardFonts, rgb } from 'pdf-lib'
	*
	* const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
	* const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
	*
	* const page = pdfDoc.addPage()
	*
	* page.setFont(helveticaFont)
	*
	* page.moveTo(5, 200)
	* page.drawText('The Life of an Egg', { size: 36 })
	*
	* page.moveDown(36)
	* page.drawText('An Epic Tale of Woe', { size: 30 })
	*
	* page.drawText(
	*   `Humpty Dumpty sat on a wall \n` +
	*   `Humpty Dumpty had a great fall; \n` +
	*   `All the king's horses and all the king's men \n` +
	*   `Couldn't put Humpty together again. \n`,
	*   {
	*     x: 25,
	*     y: 100,
	*     font: timesRomanFont,
	*     size: 24,
	*     color: rgb(1, 0, 0),
	*     lineHeight: 24,
	*     opacity: 0.75,
	*   },
	* )
	* ```
	* @param text The text to be drawn.
	* @param options The options to be used when drawing the text.
	*/
	PDFPage.prototype.drawText = function(text, options) {
		var _a, _b, _c, _d, _e, _f, _g;
		if (options === void 0) options = {};
		assertIs(text, "text", ["string"]);
		assertOrUndefined(options.color, "options.color", [[Object, "Color"]]);
		assertRangeOrUndefined(options.opacity, "opacity.opacity", 0, 1);
		assertOrUndefined(options.font, "options.font", [[PDFFont, "PDFFont"]]);
		assertOrUndefined(options.size, "options.size", ["number"]);
		assertOrUndefined(options.rotate, "options.rotate", [[Object, "Rotation"]]);
		assertOrUndefined(options.xSkew, "options.xSkew", [[Object, "Rotation"]]);
		assertOrUndefined(options.ySkew, "options.ySkew", [[Object, "Rotation"]]);
		assertOrUndefined(options.x, "options.x", ["number"]);
		assertOrUndefined(options.y, "options.y", ["number"]);
		assertOrUndefined(options.lineHeight, "options.lineHeight", ["number"]);
		assertOrUndefined(options.maxWidth, "options.maxWidth", ["number"]);
		assertOrUndefined(options.wordBreaks, "options.wordBreaks", [Array]);
		assertIsOneOfOrUndefined(options.blendMode, "options.blendMode", BlendMode);
		var _h = this.setOrEmbedFont(options.font), oldFont = _h.oldFont, newFont = _h.newFont, newFontKey = _h.newFontKey;
		var fontSize = options.size || this.fontSize;
		var wordBreaks = options.wordBreaks || this.doc.defaultWordBreaks;
		var textWidth = function(t) {
			return newFont.widthOfTextAtSize(t, fontSize);
		};
		var lines = options.maxWidth === void 0 ? lineSplit(cleanText(text)) : breakTextIntoLines(text, wordBreaks, options.maxWidth, textWidth);
		var encodedLines = new Array(lines.length);
		for (var idx = 0, len = lines.length; idx < len; idx++) encodedLines[idx] = newFont.encodeText(lines[idx]);
		var graphicsStateKey = this.maybeEmbedGraphicsState({
			opacity: options.opacity,
			blendMode: options.blendMode
		});
		var contentStream = this.getContentStream();
		contentStream.push.apply(contentStream, drawLinesOfText(encodedLines, {
			color: (_a = options.color) !== null && _a !== void 0 ? _a : this.fontColor,
			font: newFontKey,
			size: fontSize,
			rotate: (_b = options.rotate) !== null && _b !== void 0 ? _b : degrees(0),
			xSkew: (_c = options.xSkew) !== null && _c !== void 0 ? _c : degrees(0),
			ySkew: (_d = options.ySkew) !== null && _d !== void 0 ? _d : degrees(0),
			x: (_e = options.x) !== null && _e !== void 0 ? _e : this.x,
			y: (_f = options.y) !== null && _f !== void 0 ? _f : this.y,
			lineHeight: (_g = options.lineHeight) !== null && _g !== void 0 ? _g : this.lineHeight,
			graphicsState: graphicsStateKey
		}));
		if (options.font) {
			if (oldFont) this.setFont(oldFont);
			else this.resetFont();
		}
	};
	/**
	* Draw an image on this page. For example:
	* ```js
	* import { degrees } from 'pdf-lib'
	*
	* const jpgUrl = 'https://pdf-lib.js.org/assets/cat_riding_unicorn.jpg'
	* const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer())
	*
	* const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)
	* const jpgDims = jpgImage.scale(0.5)
	*
	* const page = pdfDoc.addPage()
	*
	* page.drawImage(jpgImage, {
	*   x: 25,
	*   y: 25,
	*   width: jpgDims.width,
	*   height: jpgDims.height,
	*   rotate: degrees(30),
	*   opacity: 0.75,
	* })
	* ```
	* @param image The image to be drawn.
	* @param options The options to be used when drawing the image.
	*/
	PDFPage.prototype.drawImage = function(image, options) {
		var _a, _b, _c, _d, _e, _f, _g;
		if (options === void 0) options = {};
		assertIs(image, "image", [[PDFImage, "PDFImage"]]);
		assertOrUndefined(options.x, "options.x", ["number"]);
		assertOrUndefined(options.y, "options.y", ["number"]);
		assertOrUndefined(options.width, "options.width", ["number"]);
		assertOrUndefined(options.height, "options.height", ["number"]);
		assertOrUndefined(options.rotate, "options.rotate", [[Object, "Rotation"]]);
		assertOrUndefined(options.xSkew, "options.xSkew", [[Object, "Rotation"]]);
		assertOrUndefined(options.ySkew, "options.ySkew", [[Object, "Rotation"]]);
		assertRangeOrUndefined(options.opacity, "opacity.opacity", 0, 1);
		assertIsOneOfOrUndefined(options.blendMode, "options.blendMode", BlendMode);
		var xObjectKey = this.node.newXObject("Image", image.ref);
		var graphicsStateKey = this.maybeEmbedGraphicsState({
			opacity: options.opacity,
			blendMode: options.blendMode
		});
		var contentStream = this.getContentStream();
		contentStream.push.apply(contentStream, drawImage(xObjectKey, {
			x: (_a = options.x) !== null && _a !== void 0 ? _a : this.x,
			y: (_b = options.y) !== null && _b !== void 0 ? _b : this.y,
			width: (_c = options.width) !== null && _c !== void 0 ? _c : image.size().width,
			height: (_d = options.height) !== null && _d !== void 0 ? _d : image.size().height,
			rotate: (_e = options.rotate) !== null && _e !== void 0 ? _e : degrees(0),
			xSkew: (_f = options.xSkew) !== null && _f !== void 0 ? _f : degrees(0),
			ySkew: (_g = options.ySkew) !== null && _g !== void 0 ? _g : degrees(0),
			graphicsState: graphicsStateKey
		}));
	};
	/**
	* Draw an embedded PDF page on this page. For example:
	* ```js
	* import { degrees } from 'pdf-lib'
	*
	* const pdfDoc = await PDFDocument.create()
	* const page = pdfDoc.addPage()
	*
	* const sourcePdfUrl = 'https://pdf-lib.js.org/assets/with_large_page_count.pdf'
	* const sourcePdf = await fetch(sourcePdfUrl).then((res) => res.arrayBuffer())
	*
	* // Embed page 74 from the PDF
	* const [embeddedPage] = await pdfDoc.embedPdf(sourcePdf, 73)
	*
	* page.drawPage(embeddedPage, {
	*   x: 250,
	*   y: 200,
	*   xScale: 0.5,
	*   yScale: 0.5,
	*   rotate: degrees(30),
	*   opacity: 0.75,
	* })
	* ```
	*
	* The `options` argument accepts both `width`/`height` and `xScale`/`yScale`
	* as options. Since each of these options defines the size of the drawn page,
	* if both options are given, `width` and `height` take precedence and the
	* corresponding scale variants are ignored.
	*
	* @param embeddedPage The embedded page to be drawn.
	* @param options The options to be used when drawing the embedded page.
	*/
	PDFPage.prototype.drawPage = function(embeddedPage, options) {
		var _a, _b, _c, _d, _e;
		if (options === void 0) options = {};
		assertIs(embeddedPage, "embeddedPage", [[PDFEmbeddedPage, "PDFEmbeddedPage"]]);
		assertOrUndefined(options.x, "options.x", ["number"]);
		assertOrUndefined(options.y, "options.y", ["number"]);
		assertOrUndefined(options.xScale, "options.xScale", ["number"]);
		assertOrUndefined(options.yScale, "options.yScale", ["number"]);
		assertOrUndefined(options.width, "options.width", ["number"]);
		assertOrUndefined(options.height, "options.height", ["number"]);
		assertOrUndefined(options.rotate, "options.rotate", [[Object, "Rotation"]]);
		assertOrUndefined(options.xSkew, "options.xSkew", [[Object, "Rotation"]]);
		assertOrUndefined(options.ySkew, "options.ySkew", [[Object, "Rotation"]]);
		assertRangeOrUndefined(options.opacity, "opacity.opacity", 0, 1);
		assertIsOneOfOrUndefined(options.blendMode, "options.blendMode", BlendMode);
		var xObjectKey = this.node.newXObject("EmbeddedPdfPage", embeddedPage.ref);
		var graphicsStateKey = this.maybeEmbedGraphicsState({
			opacity: options.opacity,
			blendMode: options.blendMode
		});
		var xScale = options.width !== void 0 ? options.width / embeddedPage.width : options.xScale !== void 0 ? options.xScale : 1;
		var yScale = options.height !== void 0 ? options.height / embeddedPage.height : options.yScale !== void 0 ? options.yScale : 1;
		var contentStream = this.getContentStream();
		contentStream.push.apply(contentStream, drawPage(xObjectKey, {
			x: (_a = options.x) !== null && _a !== void 0 ? _a : this.x,
			y: (_b = options.y) !== null && _b !== void 0 ? _b : this.y,
			xScale,
			yScale,
			rotate: (_c = options.rotate) !== null && _c !== void 0 ? _c : degrees(0),
			xSkew: (_d = options.xSkew) !== null && _d !== void 0 ? _d : degrees(0),
			ySkew: (_e = options.ySkew) !== null && _e !== void 0 ? _e : degrees(0),
			graphicsState: graphicsStateKey
		}));
	};
	/**
	* Draw an SVG path on this page. For example:
	* ```js
	* import { rgb } from 'pdf-lib'
	*
	* const svgPath = 'M 0,20 L 100,160 Q 130,200 150,120 C 190,-40 200,200 300,150 L 400,90'
	*
	* // Draw path as black line
	* page.drawSvgPath(svgPath, { x: 25, y: 75 })
	*
	* // Change border style and opacity
	* page.drawSvgPath(svgPath, {
	*   x: 25,
	*   y: 275,
	*   borderColor: rgb(0.5, 0.5, 0.5),
	*   borderWidth: 2,
	*   borderOpacity: 0.75,
	* })
	*
	* // Set fill color and opacity
	* page.drawSvgPath(svgPath, {
	*   x: 25,
	*   y: 475,
	*   color: rgb(1.0, 0, 0),
	*   opacity: 0.75,
	* })
	*
	* // Draw 50% of original size
	* page.drawSvgPath(svgPath, {
	*   x: 25,
	*   y: 675,
	*   scale: 0.5,
	* })
	* ```
	* @param path The SVG path to be drawn.
	* @param options The options to be used when drawing the SVG path.
	*/
	PDFPage.prototype.drawSvgPath = function(path, options) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _j;
		if (options === void 0) options = {};
		assertIs(path, "path", ["string"]);
		assertOrUndefined(options.x, "options.x", ["number"]);
		assertOrUndefined(options.y, "options.y", ["number"]);
		assertOrUndefined(options.scale, "options.scale", ["number"]);
		assertOrUndefined(options.rotate, "options.rotate", [[Object, "Rotation"]]);
		assertOrUndefined(options.borderWidth, "options.borderWidth", ["number"]);
		assertOrUndefined(options.color, "options.color", [[Object, "Color"]]);
		assertRangeOrUndefined(options.opacity, "opacity.opacity", 0, 1);
		assertOrUndefined(options.borderColor, "options.borderColor", [[Object, "Color"]]);
		assertOrUndefined(options.borderDashArray, "options.borderDashArray", [Array]);
		assertOrUndefined(options.borderDashPhase, "options.borderDashPhase", ["number"]);
		assertIsOneOfOrUndefined(options.borderLineCap, "options.borderLineCap", LineCapStyle);
		assertRangeOrUndefined(options.borderOpacity, "options.borderOpacity", 0, 1);
		assertIsOneOfOrUndefined(options.blendMode, "options.blendMode", BlendMode);
		var graphicsStateKey = this.maybeEmbedGraphicsState({
			opacity: options.opacity,
			borderOpacity: options.borderOpacity,
			blendMode: options.blendMode
		});
		if (!("color" in options) && !("borderColor" in options)) options.borderColor = rgb(0, 0, 0);
		var contentStream = this.getContentStream();
		contentStream.push.apply(contentStream, drawSvgPath(path, {
			x: (_a = options.x) !== null && _a !== void 0 ? _a : this.x,
			y: (_b = options.y) !== null && _b !== void 0 ? _b : this.y,
			scale: options.scale,
			rotate: (_c = options.rotate) !== null && _c !== void 0 ? _c : degrees(0),
			color: (_d = options.color) !== null && _d !== void 0 ? _d : void 0,
			borderColor: (_e = options.borderColor) !== null && _e !== void 0 ? _e : void 0,
			borderWidth: (_f = options.borderWidth) !== null && _f !== void 0 ? _f : 0,
			borderDashArray: (_g = options.borderDashArray) !== null && _g !== void 0 ? _g : void 0,
			borderDashPhase: (_h = options.borderDashPhase) !== null && _h !== void 0 ? _h : void 0,
			borderLineCap: (_j = options.borderLineCap) !== null && _j !== void 0 ? _j : void 0,
			graphicsState: graphicsStateKey
		}));
	};
	/**
	* Draw a line on this page. For example:
	* ```js
	* import { rgb } from 'pdf-lib'
	*
	* page.drawLine({
	*   start: { x: 25, y: 75 },
	*   end: { x: 125, y: 175 },
	*   thickness: 2,
	*   color: rgb(0.75, 0.2, 0.2),
	*   opacity: 0.75,
	* })
	* ```
	* @param options The options to be used when drawing the line.
	*/
	PDFPage.prototype.drawLine = function(options) {
		var _a, _b, _c, _d, _e;
		assertIs(options.start, "options.start", [[Object, "{ x: number, y: number }"]]);
		assertIs(options.end, "options.end", [[Object, "{ x: number, y: number }"]]);
		assertIs(options.start.x, "options.start.x", ["number"]);
		assertIs(options.start.y, "options.start.y", ["number"]);
		assertIs(options.end.x, "options.end.x", ["number"]);
		assertIs(options.end.y, "options.end.y", ["number"]);
		assertOrUndefined(options.thickness, "options.thickness", ["number"]);
		assertOrUndefined(options.color, "options.color", [[Object, "Color"]]);
		assertOrUndefined(options.dashArray, "options.dashArray", [Array]);
		assertOrUndefined(options.dashPhase, "options.dashPhase", ["number"]);
		assertIsOneOfOrUndefined(options.lineCap, "options.lineCap", LineCapStyle);
		assertRangeOrUndefined(options.opacity, "opacity.opacity", 0, 1);
		assertIsOneOfOrUndefined(options.blendMode, "options.blendMode", BlendMode);
		var graphicsStateKey = this.maybeEmbedGraphicsState({
			borderOpacity: options.opacity,
			blendMode: options.blendMode
		});
		if (!("color" in options)) options.color = rgb(0, 0, 0);
		var contentStream = this.getContentStream();
		contentStream.push.apply(contentStream, drawLine({
			start: options.start,
			end: options.end,
			thickness: (_a = options.thickness) !== null && _a !== void 0 ? _a : 1,
			color: (_b = options.color) !== null && _b !== void 0 ? _b : void 0,
			dashArray: (_c = options.dashArray) !== null && _c !== void 0 ? _c : void 0,
			dashPhase: (_d = options.dashPhase) !== null && _d !== void 0 ? _d : void 0,
			lineCap: (_e = options.lineCap) !== null && _e !== void 0 ? _e : void 0,
			graphicsState: graphicsStateKey
		}));
	};
	/**
	* Draw a rectangle on this page. For example:
	* ```js
	* import { degrees, grayscale, rgb } from 'pdf-lib'
	*
	* page.drawRectangle({
	*   x: 25,
	*   y: 75,
	*   width: 250,
	*   height: 75,
	*   rotate: degrees(-15),
	*   borderWidth: 5,
	*   borderColor: grayscale(0.5),
	*   color: rgb(0.75, 0.2, 0.2),
	*   opacity: 0.5,
	*   borderOpacity: 0.75,
	* })
	* ```
	* @param options The options to be used when drawing the rectangle.
	*/
	PDFPage.prototype.drawRectangle = function(options) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
		if (options === void 0) options = {};
		assertOrUndefined(options.x, "options.x", ["number"]);
		assertOrUndefined(options.y, "options.y", ["number"]);
		assertOrUndefined(options.width, "options.width", ["number"]);
		assertOrUndefined(options.height, "options.height", ["number"]);
		assertOrUndefined(options.rotate, "options.rotate", [[Object, "Rotation"]]);
		assertOrUndefined(options.xSkew, "options.xSkew", [[Object, "Rotation"]]);
		assertOrUndefined(options.ySkew, "options.ySkew", [[Object, "Rotation"]]);
		assertOrUndefined(options.borderWidth, "options.borderWidth", ["number"]);
		assertOrUndefined(options.color, "options.color", [[Object, "Color"]]);
		assertRangeOrUndefined(options.opacity, "opacity.opacity", 0, 1);
		assertOrUndefined(options.borderColor, "options.borderColor", [[Object, "Color"]]);
		assertOrUndefined(options.borderDashArray, "options.borderDashArray", [Array]);
		assertOrUndefined(options.borderDashPhase, "options.borderDashPhase", ["number"]);
		assertIsOneOfOrUndefined(options.borderLineCap, "options.borderLineCap", LineCapStyle);
		assertRangeOrUndefined(options.borderOpacity, "options.borderOpacity", 0, 1);
		assertIsOneOfOrUndefined(options.blendMode, "options.blendMode", BlendMode);
		var graphicsStateKey = this.maybeEmbedGraphicsState({
			opacity: options.opacity,
			borderOpacity: options.borderOpacity,
			blendMode: options.blendMode
		});
		if (!("color" in options) && !("borderColor" in options)) options.color = rgb(0, 0, 0);
		var contentStream = this.getContentStream();
		contentStream.push.apply(contentStream, drawRectangle({
			x: (_a = options.x) !== null && _a !== void 0 ? _a : this.x,
			y: (_b = options.y) !== null && _b !== void 0 ? _b : this.y,
			width: (_c = options.width) !== null && _c !== void 0 ? _c : 150,
			height: (_d = options.height) !== null && _d !== void 0 ? _d : 100,
			rotate: (_e = options.rotate) !== null && _e !== void 0 ? _e : degrees(0),
			xSkew: (_f = options.xSkew) !== null && _f !== void 0 ? _f : degrees(0),
			ySkew: (_g = options.ySkew) !== null && _g !== void 0 ? _g : degrees(0),
			borderWidth: (_h = options.borderWidth) !== null && _h !== void 0 ? _h : 0,
			color: (_j = options.color) !== null && _j !== void 0 ? _j : void 0,
			borderColor: (_k = options.borderColor) !== null && _k !== void 0 ? _k : void 0,
			borderDashArray: (_l = options.borderDashArray) !== null && _l !== void 0 ? _l : void 0,
			borderDashPhase: (_m = options.borderDashPhase) !== null && _m !== void 0 ? _m : void 0,
			graphicsState: graphicsStateKey,
			borderLineCap: (_o = options.borderLineCap) !== null && _o !== void 0 ? _o : void 0
		}));
	};
	/**
	* Draw a square on this page. For example:
	* ```js
	* import { degrees, grayscale, rgb } from 'pdf-lib'
	*
	* page.drawSquare({
	*   x: 25,
	*   y: 75,
	*   size: 100,
	*   rotate: degrees(-15),
	*   borderWidth: 5,
	*   borderColor: grayscale(0.5),
	*   color: rgb(0.75, 0.2, 0.2),
	*   opacity: 0.5,
	*   borderOpacity: 0.75,
	* })
	* ```
	* @param options The options to be used when drawing the square.
	*/
	PDFPage.prototype.drawSquare = function(options) {
		if (options === void 0) options = {};
		var size = options.size;
		assertOrUndefined(size, "size", ["number"]);
		this.drawRectangle(__assign(__assign({}, options), {
			width: size,
			height: size
		}));
	};
	/**
	* Draw an ellipse on this page. For example:
	* ```js
	* import { grayscale, rgb } from 'pdf-lib'
	*
	* page.drawEllipse({
	*   x: 200,
	*   y: 75,
	*   xScale: 100,
	*   yScale: 50,
	*   borderWidth: 5,
	*   borderColor: grayscale(0.5),
	*   color: rgb(0.75, 0.2, 0.2),
	*   opacity: 0.5,
	*   borderOpacity: 0.75,
	* })
	* ```
	* @param options The options to be used when drawing the ellipse.
	*/
	PDFPage.prototype.drawEllipse = function(options) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
		if (options === void 0) options = {};
		assertOrUndefined(options.x, "options.x", ["number"]);
		assertOrUndefined(options.y, "options.y", ["number"]);
		assertOrUndefined(options.xScale, "options.xScale", ["number"]);
		assertOrUndefined(options.yScale, "options.yScale", ["number"]);
		assertOrUndefined(options.rotate, "options.rotate", [[Object, "Rotation"]]);
		assertOrUndefined(options.color, "options.color", [[Object, "Color"]]);
		assertRangeOrUndefined(options.opacity, "opacity.opacity", 0, 1);
		assertOrUndefined(options.borderColor, "options.borderColor", [[Object, "Color"]]);
		assertRangeOrUndefined(options.borderOpacity, "options.borderOpacity", 0, 1);
		assertOrUndefined(options.borderWidth, "options.borderWidth", ["number"]);
		assertOrUndefined(options.borderDashArray, "options.borderDashArray", [Array]);
		assertOrUndefined(options.borderDashPhase, "options.borderDashPhase", ["number"]);
		assertIsOneOfOrUndefined(options.borderLineCap, "options.borderLineCap", LineCapStyle);
		assertIsOneOfOrUndefined(options.blendMode, "options.blendMode", BlendMode);
		var graphicsStateKey = this.maybeEmbedGraphicsState({
			opacity: options.opacity,
			borderOpacity: options.borderOpacity,
			blendMode: options.blendMode
		});
		if (!("color" in options) && !("borderColor" in options)) options.color = rgb(0, 0, 0);
		var contentStream = this.getContentStream();
		contentStream.push.apply(contentStream, drawEllipse({
			x: (_a = options.x) !== null && _a !== void 0 ? _a : this.x,
			y: (_b = options.y) !== null && _b !== void 0 ? _b : this.y,
			xScale: (_c = options.xScale) !== null && _c !== void 0 ? _c : 100,
			yScale: (_d = options.yScale) !== null && _d !== void 0 ? _d : 100,
			rotate: (_e = options.rotate) !== null && _e !== void 0 ? _e : void 0,
			color: (_f = options.color) !== null && _f !== void 0 ? _f : void 0,
			borderColor: (_g = options.borderColor) !== null && _g !== void 0 ? _g : void 0,
			borderWidth: (_h = options.borderWidth) !== null && _h !== void 0 ? _h : 0,
			borderDashArray: (_j = options.borderDashArray) !== null && _j !== void 0 ? _j : void 0,
			borderDashPhase: (_k = options.borderDashPhase) !== null && _k !== void 0 ? _k : void 0,
			borderLineCap: (_l = options.borderLineCap) !== null && _l !== void 0 ? _l : void 0,
			graphicsState: graphicsStateKey
		}));
	};
	/**
	* Draw a circle on this page. For example:
	* ```js
	* import { grayscale, rgb } from 'pdf-lib'
	*
	* page.drawCircle({
	*   x: 200,
	*   y: 150,
	*   size: 100,
	*   borderWidth: 5,
	*   borderColor: grayscale(0.5),
	*   color: rgb(0.75, 0.2, 0.2),
	*   opacity: 0.5,
	*   borderOpacity: 0.75,
	* })
	* ```
	* @param options The options to be used when drawing the ellipse.
	*/
	PDFPage.prototype.drawCircle = function(options) {
		if (options === void 0) options = {};
		var _a = options.size, size = _a === void 0 ? 100 : _a;
		assertOrUndefined(size, "size", ["number"]);
		this.drawEllipse(__assign(__assign({}, options), {
			xScale: size,
			yScale: size
		}));
	};
	PDFPage.prototype.setOrEmbedFont = function(font) {
		var oldFont = this.font;
		var oldFontKey = this.fontKey;
		if (font) this.setFont(font);
		else this.getFont();
		return {
			oldFont,
			oldFontKey,
			newFont: this.font,
			newFontKey: this.fontKey
		};
	};
	PDFPage.prototype.getFont = function() {
		if (!this.font || !this.fontKey) {
			var font = this.doc.embedStandardFont(StandardFonts.Helvetica);
			this.setFont(font);
		}
		return [this.font, this.fontKey];
	};
	PDFPage.prototype.resetFont = function() {
		this.font = void 0;
		this.fontKey = void 0;
	};
	PDFPage.prototype.getContentStream = function(useExisting) {
		if (useExisting === void 0) useExisting = true;
		if (useExisting && this.contentStream) return this.contentStream;
		this.contentStream = this.createContentStream();
		this.contentStreamRef = this.doc.context.register(this.contentStream);
		this.node.addContentStream(this.contentStreamRef);
		return this.contentStream;
	};
	PDFPage.prototype.createContentStream = function() {
		var operators = [];
		for (var _i = 0; _i < arguments.length; _i++) operators[_i] = arguments[_i];
		var dict = this.doc.context.obj({});
		return PDFContentStream.of(dict, operators);
	};
	PDFPage.prototype.maybeEmbedGraphicsState = function(options) {
		var opacity = options.opacity, borderOpacity = options.borderOpacity, blendMode = options.blendMode;
		if (opacity === void 0 && borderOpacity === void 0 && blendMode === void 0) return;
		var graphicsState = this.doc.context.obj({
			Type: "ExtGState",
			ca: opacity,
			CA: borderOpacity,
			BM: blendMode
		});
		return this.node.newExtGState("GS", graphicsState);
	};
	PDFPage.prototype.scaleAnnot = function(annot, x, y) {
		var selectors = [
			"RD",
			"CL",
			"Vertices",
			"QuadPoints",
			"L",
			"Rect"
		];
		for (var idx = 0, len = selectors.length; idx < len; idx++) {
			var list = annot.lookup(PDFName.of(selectors[idx]));
			if (list instanceof PDFArray) list.scalePDFNumbers(x, y);
		}
		var inkLists = annot.lookup(PDFName.of("InkList"));
		if (inkLists instanceof PDFArray) for (var idx = 0, len = inkLists.size(); idx < len; idx++) {
			var arr = inkLists.lookup(idx);
			if (arr instanceof PDFArray) arr.scalePDFNumbers(x, y);
		}
	};
	/**
	* > **NOTE:** You probably don't want to call this method directly. Instead,
	* > consider using the [[PDFDocument.addPage]] and [[PDFDocument.insertPage]]
	* > methods, which can create instances of [[PDFPage]] for you.
	*
	* Create an instance of [[PDFPage]] from an existing leaf node.
	*
	* @param leafNode The leaf node to be wrapped.
	* @param ref The unique reference for the page.
	* @param doc The document to which the page will belong.
	*/
	PDFPage.of = function(leafNode, ref, doc) {
		return new PDFPage(leafNode, ref, doc);
	};
	/**
	* > **NOTE:** You probably don't want to call this method directly. Instead,
	* > consider using the [[PDFDocument.addPage]] and [[PDFDocument.insertPage]]
	* > methods, which can create instances of [[PDFPage]] for you.
	*
	* Create an instance of [[PDFPage]].
	*
	* @param doc The document to which the page will belong.
	*/
	PDFPage.create = function(doc) {
		assertIs(doc, "doc", [[PDFDocument, "PDFDocument"]]);
		var dummyRef = PDFRef.of(-1);
		var pageLeaf = PDFPageLeaf.withContextAndParent(doc.context, dummyRef);
		return new PDFPage(pageLeaf, doc.context.register(pageLeaf), doc);
	};
	return PDFPage;
}();
//#endregion
//#region node_modules/pdf-lib/es/api/form/PDFButton.js
/**
* Represents a button field of a [[PDFForm]].
*
* [[PDFButton]] fields are interactive controls that users can click with their
* mouse. This type of [[PDFField]] is not stateful. The purpose of a button
* is to perform an action when the user clicks on it, such as opening a print
* modal or resetting the form. Buttons are typically rectangular in shape and
* have a text label describing the action that they perform when clicked.
*/
var PDFButton = function(_super) {
	__extends(PDFButton, _super);
	function PDFButton(acroPushButton, ref, doc) {
		var _this = _super.call(this, acroPushButton, ref, doc) || this;
		assertIs(acroPushButton, "acroButton", [[PDFAcroPushButton, "PDFAcroPushButton"]]);
		_this.acroField = acroPushButton;
		return _this;
	}
	/**
	* Display an image inside the bounds of this button's widgets. For example:
	* ```js
	* const pngImage = await pdfDoc.embedPng(...)
	* const button = form.getButton('some.button.field')
	* button.setImage(pngImage, ImageAlignment.Center)
	* ```
	* This will update the appearances streams for each of this button's widgets.
	* @param image The image that should be displayed.
	* @param alignment The alignment of the image.
	*/
	PDFButton.prototype.setImage = function(image, alignment) {
		if (alignment === void 0) alignment = ImageAlignment.Center;
		var widgets = this.acroField.getWidgets();
		for (var idx = 0, len = widgets.length; idx < len; idx++) {
			var widget = widgets[idx];
			var streamRef = this.createImageAppearanceStream(widget, image, alignment);
			this.updateWidgetAppearances(widget, { normal: streamRef });
		}
		this.markAsClean();
	};
	/**
	* Set the font size for this field. Larger font sizes will result in larger
	* text being displayed when PDF readers render this button. Font sizes may
	* be integer or floating point numbers. Supplying a negative font size will
	* cause this method to throw an error.
	*
	* For example:
	* ```js
	* const button = form.getButton('some.button.field')
	* button.setFontSize(4)
	* button.setFontSize(15.7)
	* ```
	*
	* > This method depends upon the existence of a default appearance
	* > (`/DA`) string. If this field does not have a default appearance string,
	* > or that string does not contain a font size (via the `Tf` operator),
	* > then this method will throw an error.
	*
	* @param fontSize The font size to be used when rendering text in this field.
	*/
	PDFButton.prototype.setFontSize = function(fontSize) {
		assertPositive(fontSize, "fontSize");
		this.acroField.setFontSize(fontSize);
		this.markAsDirty();
	};
	/**
	* Show this button on the specified page with the given text. For example:
	* ```js
	* const ubuntuFont = await pdfDoc.embedFont(ubuntuFontBytes)
	* const page = pdfDoc.addPage()
	*
	* const form = pdfDoc.getForm()
	* const button = form.createButton('some.button.field')
	*
	* button.addToPage('Do Stuff', page, {
	*   x: 50,
	*   y: 75,
	*   width: 200,
	*   height: 100,
	*   textColor: rgb(1, 0, 0),
	*   backgroundColor: rgb(0, 1, 0),
	*   borderColor: rgb(0, 0, 1),
	*   borderWidth: 2,
	*   rotate: degrees(90),
	*   font: ubuntuFont,
	* })
	* ```
	* This will create a new widget for this button field.
	* @param text The text to be displayed for this button widget.
	* @param page The page to which this button widget should be added.
	* @param options The options to be used when adding this button widget.
	*/
	PDFButton.prototype.addToPage = function(text, page, options) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
		assertOrUndefined(text, "text", ["string"]);
		assertOrUndefined(page, "page", [[PDFPage, "PDFPage"]]);
		assertFieldAppearanceOptions(options);
		var widget = this.createWidget({
			x: ((_a = options === null || options === void 0 ? void 0 : options.x) !== null && _a !== void 0 ? _a : 0) - ((_b = options === null || options === void 0 ? void 0 : options.borderWidth) !== null && _b !== void 0 ? _b : 0) / 2,
			y: ((_c = options === null || options === void 0 ? void 0 : options.y) !== null && _c !== void 0 ? _c : 0) - ((_d = options === null || options === void 0 ? void 0 : options.borderWidth) !== null && _d !== void 0 ? _d : 0) / 2,
			width: (_e = options === null || options === void 0 ? void 0 : options.width) !== null && _e !== void 0 ? _e : 100,
			height: (_f = options === null || options === void 0 ? void 0 : options.height) !== null && _f !== void 0 ? _f : 50,
			textColor: (_g = options === null || options === void 0 ? void 0 : options.textColor) !== null && _g !== void 0 ? _g : rgb(0, 0, 0),
			backgroundColor: (_h = options === null || options === void 0 ? void 0 : options.backgroundColor) !== null && _h !== void 0 ? _h : rgb(.75, .75, .75),
			borderColor: options === null || options === void 0 ? void 0 : options.borderColor,
			borderWidth: (_j = options === null || options === void 0 ? void 0 : options.borderWidth) !== null && _j !== void 0 ? _j : 0,
			rotate: (_k = options === null || options === void 0 ? void 0 : options.rotate) !== null && _k !== void 0 ? _k : degrees(0),
			caption: text,
			hidden: options === null || options === void 0 ? void 0 : options.hidden,
			page: page.ref
		});
		var widgetRef = this.doc.context.register(widget.dict);
		this.acroField.addWidget(widgetRef);
		var font = (_l = options === null || options === void 0 ? void 0 : options.font) !== null && _l !== void 0 ? _l : this.doc.getForm().getDefaultFont();
		this.updateWidgetAppearance(widget, font);
		page.node.addAnnot(widgetRef);
	};
	/**
	* Returns `true` if this button has been marked as dirty, or if any of this
	* button's widgets do not have an appearance stream. For example:
	* ```js
	* const button = form.getButton('some.button.field')
	* if (button.needsAppearancesUpdate()) console.log('Needs update')
	* ```
	* @returns Whether or not this button needs an appearance update.
	*/
	PDFButton.prototype.needsAppearancesUpdate = function() {
		var _a;
		if (this.isDirty()) return true;
		var widgets = this.acroField.getWidgets();
		for (var idx = 0, len = widgets.length; idx < len; idx++) if (!(((_a = widgets[idx].getAppearances()) === null || _a === void 0 ? void 0 : _a.normal) instanceof PDFStream)) return true;
		return false;
	};
	/**
	* Update the appearance streams for each of this button's widgets using
	* the default appearance provider for buttons. For example:
	* ```js
	* const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
	* const button = form.getButton('some.button.field')
	* button.defaultUpdateAppearances(helvetica)
	* ```
	* @param font The font to be used for creating the appearance streams.
	*/
	PDFButton.prototype.defaultUpdateAppearances = function(font) {
		assertIs(font, "font", [[PDFFont, "PDFFont"]]);
		this.updateAppearances(font);
	};
	/**
	* Update the appearance streams for each of this button's widgets using
	* the given appearance provider. If no `provider` is passed, the default
	* appearance provider for buttons will be used. For example:
	* ```js
	* const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
	* const button = form.getButton('some.button.field')
	* button.updateAppearances(helvetica, (field, widget, font) => {
	*   ...
	*   return {
	*     normal: drawButton(...),
	*     down: drawButton(...),
	*   }
	* })
	* ```
	* @param font The font to be used for creating the appearance streams.
	* @param provider Optionally, the appearance provider to be used for
	*                 generating the contents of the appearance streams.
	*/
	PDFButton.prototype.updateAppearances = function(font, provider) {
		assertIs(font, "font", [[PDFFont, "PDFFont"]]);
		assertOrUndefined(provider, "provider", [Function]);
		var widgets = this.acroField.getWidgets();
		for (var idx = 0, len = widgets.length; idx < len; idx++) {
			var widget = widgets[idx];
			this.updateWidgetAppearance(widget, font, provider);
		}
	};
	PDFButton.prototype.updateWidgetAppearance = function(widget, font, provider) {
		var appearances = normalizeAppearance((provider !== null && provider !== void 0 ? provider : defaultButtonAppearanceProvider)(this, widget, font));
		this.updateWidgetAppearanceWithFont(widget, font, appearances);
	};
	/**
	* > **NOTE:** You probably don't want to call this method directly. Instead,
	* > consider using the [[PDFForm.getButton]] method, which will create an
	* > instance of [[PDFButton]] for you.
	*
	* Create an instance of [[PDFButton]] from an existing acroPushButton and ref
	*
	* @param acroPushButton The underlying `PDFAcroPushButton` for this button.
	* @param ref The unique reference for this button.
	* @param doc The document to which this button will belong.
	*/
	PDFButton.of = function(acroPushButton, ref, doc) {
		return new PDFButton(acroPushButton, ref, doc);
	};
	return PDFButton;
}(PDFField);
//#endregion
//#region node_modules/pdf-lib/es/index.js
var es_exports = /* @__PURE__ */ __exportAll({
	AcroButtonFlags: () => AcroButtonFlags,
	AcroChoiceFlags: () => AcroChoiceFlags,
	AcroFieldFlags: () => AcroFieldFlags,
	AcroTextFlags: () => AcroTextFlags,
	AnnotationFlags: () => AnnotationFlags,
	BlendMode: () => BlendMode,
	ColorTypes: () => ColorTypes,
	CombedTextLayoutError: () => CombedTextLayoutError,
	CorruptPageTreeError: () => CorruptPageTreeError,
	EncryptedPDFError: () => EncryptedPDFError,
	ExceededMaxLengthError: () => ExceededMaxLengthError,
	FieldAlreadyExistsError: () => FieldAlreadyExistsError,
	FontkitNotRegisteredError: () => FontkitNotRegisteredError,
	ForeignPageError: () => ForeignPageError,
	ImageAlignment: () => ImageAlignment,
	IndexOutOfBoundsError: () => IndexOutOfBoundsError,
	InvalidAcroFieldValueError: () => InvalidAcroFieldValueError,
	InvalidFieldNamePartError: () => InvalidFieldNamePartError,
	InvalidMaxLengthError: () => InvalidMaxLengthError,
	InvalidPDFDateStringError: () => InvalidPDFDateStringError,
	InvalidTargetIndexError: () => InvalidTargetIndexError,
	LineCapStyle: () => LineCapStyle,
	LineJoinStyle: () => LineJoinStyle,
	MethodNotImplementedError: () => MethodNotImplementedError,
	MissingDAEntryError: () => MissingDAEntryError,
	MissingKeywordError: () => MissingKeywordError,
	MissingPDFHeaderError: () => MissingPDFHeaderError,
	MissingPageContentsEmbeddingError: () => MissingPageContentsEmbeddingError,
	MissingTfOperatorError: () => MissingTfOperatorError,
	MultiSelectValueError: () => MultiSelectValueError,
	NextByteAssertionError: () => NextByteAssertionError,
	NoSuchFieldError: () => NoSuchFieldError,
	NumberParsingError: () => NumberParsingError,
	PDFArrayIsNotRectangleError: () => PDFArrayIsNotRectangleError,
	PDFDocument: () => PDFDocument,
	PDFInvalidObjectParsingError: () => PDFInvalidObjectParsingError,
	PDFObjectParsingError: () => PDFObjectParsingError,
	PDFParsingError: () => PDFParsingError,
	PDFStreamParsingError: () => PDFStreamParsingError,
	PageEmbeddingMismatchedContextError: () => PageEmbeddingMismatchedContextError,
	PageSizes: () => PageSizes,
	ParseSpeeds: () => ParseSpeeds,
	PrivateConstructorError: () => PrivateConstructorError,
	RemovePageFromEmptyDocumentError: () => RemovePageFromEmptyDocumentError,
	ReparseError: () => ReparseError,
	RichTextFieldReadError: () => RichTextFieldReadError,
	RotationTypes: () => RotationTypes,
	StalledParserError: () => StalledParserError,
	StandardFontValues: () => StandardFontValues,
	StandardFonts: () => StandardFonts,
	TextAlignment: () => TextAlignment,
	TextRenderingMode: () => TextRenderingMode,
	UnbalancedParenthesisError: () => UnbalancedParenthesisError,
	UnexpectedFieldTypeError: () => UnexpectedFieldTypeError,
	UnexpectedObjectTypeError: () => UnexpectedObjectTypeError,
	UnrecognizedStreamTypeError: () => UnrecognizedStreamTypeError,
	UnsupportedEncodingError: () => UnsupportedEncodingError,
	adjustDimsForRotation: () => adjustDimsForRotation,
	appendBezierCurve: () => appendBezierCurve,
	appendQuadraticCurve: () => appendQuadraticCurve,
	arrayAsString: () => arrayAsString,
	asNumber: () => asNumber,
	asPDFName: () => asPDFName,
	asPDFNumber: () => asPDFNumber,
	assertEachIs: () => assertEachIs,
	assertInteger: () => assertInteger,
	assertIs: () => assertIs,
	assertIsOneOf: () => assertIsOneOf,
	assertIsOneOfOrUndefined: () => assertIsOneOfOrUndefined,
	assertIsSubset: () => assertIsSubset,
	assertMultiple: () => assertMultiple,
	assertOrUndefined: () => assertOrUndefined,
	assertPositive: () => assertPositive,
	assertRange: () => assertRange,
	assertRangeOrUndefined: () => assertRangeOrUndefined,
	backtick: () => backtick,
	beginMarkedContent: () => beginMarkedContent,
	beginText: () => beginText,
	breakTextIntoLines: () => breakTextIntoLines,
	byAscendingId: () => byAscendingId,
	bytesFor: () => bytesFor,
	canBeConvertedToUint8Array: () => canBeConvertedToUint8Array,
	charAtIndex: () => charAtIndex,
	charFromCode: () => charFromCode,
	charFromHexCode: () => charFromHexCode,
	charSplit: () => charSplit,
	cleanText: () => cleanText,
	clip: () => clip,
	closePath: () => closePath,
	cmyk: () => cmyk,
	colorToComponents: () => colorToComponents,
	componentsToColor: () => componentsToColor,
	concatTransformationMatrix: () => concatTransformationMatrix,
	copyStringIntoBuffer: () => copyStringIntoBuffer,
	createPDFAcroField: () => createPDFAcroField,
	createPDFAcroFields: () => createPDFAcroFields,
	createTypeErrorMsg: () => createTypeErrorMsg,
	createValueErrorMsg: () => createValueErrorMsg,
	decodeFromBase64: () => decodeFromBase64,
	decodeFromBase64DataUri: () => decodeFromBase64DataUri,
	defaultButtonAppearanceProvider: () => defaultButtonAppearanceProvider,
	defaultCheckBoxAppearanceProvider: () => defaultCheckBoxAppearanceProvider,
	defaultDropdownAppearanceProvider: () => defaultDropdownAppearanceProvider,
	defaultOptionListAppearanceProvider: () => defaultOptionListAppearanceProvider,
	defaultRadioGroupAppearanceProvider: () => defaultRadioGroupAppearanceProvider,
	defaultTextFieldAppearanceProvider: () => defaultTextFieldAppearanceProvider,
	degrees: () => degrees,
	degreesToRadians: () => degreesToRadians,
	drawButton: () => drawButton,
	drawCheckBox: () => drawCheckBox,
	drawCheckMark: () => drawCheckMark,
	drawEllipse: () => drawEllipse,
	drawEllipsePath: () => drawEllipsePath,
	drawImage: () => drawImage,
	drawLine: () => drawLine,
	drawLinesOfText: () => drawLinesOfText,
	drawObject: () => drawObject,
	drawOptionList: () => drawOptionList,
	drawPage: () => drawPage,
	drawRadioButton: () => drawRadioButton,
	drawRectangle: () => drawRectangle,
	drawSvgPath: () => drawSvgPath,
	drawTextField: () => drawTextField,
	drawTextLines: () => drawTextLines,
	encodeToBase64: () => encodeToBase64,
	endMarkedContent: () => endMarkedContent,
	endPath: () => endPath,
	endText: () => endText,
	error: () => error,
	escapeRegExp: () => escapeRegExp,
	escapedNewlineChars: () => escapedNewlineChars,
	fill: () => fill,
	fillAndStroke: () => fillAndStroke,
	findLastMatch: () => findLastMatch,
	getType: () => getType,
	grayscale: () => grayscale,
	hasSurrogates: () => hasSurrogates,
	hasUtf16BOM: () => hasUtf16BOM,
	highSurrogate: () => highSurrogate,
	isNewlineChar: () => isNewlineChar,
	isStandardFont: () => isStandardFont,
	isType: () => isType,
	isWithinBMP: () => isWithinBMP,
	last: () => last,
	layoutCombedText: () => layoutCombedText,
	layoutMultilineText: () => layoutMultilineText,
	layoutSinglelineText: () => layoutSinglelineText,
	lineSplit: () => lineSplit,
	lineTo: () => lineTo,
	lowSurrogate: () => lowSurrogate,
	mergeIntoTypedArray: () => mergeIntoTypedArray,
	mergeLines: () => mergeLines,
	mergeUint8Arrays: () => mergeUint8Arrays,
	moveTo: () => moveTo,
	nextLine: () => nextLine,
	normalizeAppearance: () => normalizeAppearance,
	numberToString: () => numberToString,
	padStart: () => padStart,
	parseDate: () => parseDate,
	pdfDocEncodingDecode: () => pdfDocEncodingDecode,
	pluckIndices: () => pluckIndices,
	popGraphicsState: () => popGraphicsState,
	pushGraphicsState: () => pushGraphicsState,
	radiansToDegrees: () => radiansToDegrees,
	range: () => range,
	rectanglesAreEqual: () => rectanglesAreEqual,
	reduceRotation: () => reduceRotation,
	reverseArray: () => reverseArray,
	rgb: () => rgb,
	rotateAndSkewTextRadiansAndTranslate: () => rotateAndSkewTextRadiansAndTranslate,
	rotateDegrees: () => rotateDegrees,
	rotateInPlace: () => rotateInPlace,
	rotateRadians: () => rotateRadians,
	rotateRectangle: () => rotateRectangle,
	scale: () => scale,
	setDashPattern: () => setDashPattern,
	setFillingCmykColor: () => setFillingCmykColor,
	setFillingColor: () => setFillingColor,
	setFillingGrayscaleColor: () => setFillingGrayscaleColor,
	setFillingRgbColor: () => setFillingRgbColor,
	setFontAndSize: () => setFontAndSize,
	setGraphicsState: () => setGraphicsState,
	setLineCap: () => setLineCap,
	setLineHeight: () => setLineHeight,
	setLineWidth: () => setLineWidth,
	setStrokingCmykColor: () => setStrokingCmykColor,
	setStrokingColor: () => setStrokingColor,
	setStrokingGrayscaleColor: () => setStrokingGrayscaleColor,
	setStrokingRgbColor: () => setStrokingRgbColor,
	setTextMatrix: () => setTextMatrix,
	showText: () => showText,
	singleQuote: () => singleQuote,
	sizeInBytes: () => sizeInBytes,
	skewRadians: () => skewRadians,
	sortedUniq: () => sortedUniq,
	stroke: () => stroke,
	sum: () => sum,
	toCharCode: () => toCharCode,
	toCodePoint: () => toCodePoint,
	toDegrees: () => toDegrees,
	toHexString: () => toHexString,
	toHexStringOfMinLength: () => toHexStringOfMinLength,
	toRadians: () => toRadians,
	toUint8Array: () => toUint8Array,
	translate: () => translate,
	typedArrayFor: () => typedArrayFor,
	utf16Decode: () => utf16Decode,
	utf16Encode: () => utf16Encode,
	values: () => values,
	waitForTick: () => waitForTick
});
//#endregion
export { es_exports as t };
