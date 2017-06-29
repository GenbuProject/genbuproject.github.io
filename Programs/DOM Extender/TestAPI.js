//#{using} DOMExtender
(function (info) {
	const VERSION = 3.0;

	if (info && DOM) {
		if (info instanceof DOM.APIInfo && info.version >= VERSION) {
			//処理
		} else {
			throw new EvalError("Not matching for the version");
		}
	} else {
		throw new EvalError("Do not load without DOM Extender");
	}
});