"#{using} DOMExtender";

(DOM && DOM.version >= 3.0) ? (function () {
	console.log("Successed.");
})() : (function () {
	throw new EvalError("Do not load without DOM Extender!");
})();