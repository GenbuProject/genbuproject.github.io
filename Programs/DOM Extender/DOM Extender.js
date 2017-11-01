(function () {
	let Info = (function () {
		let VGetter = new XMLHttpRequest();
			VGetter.open("GET", "https://genbuproject.github.io/Programs/DOM Extender/API.Info", false);
			VGetter.send(null);
			
		return JSON.parse(VGetter.response);
	})();
	
	let SGetter = new XMLHttpRequest();
		SGetter.open("GET", Info.DirURL + Info.Name + " " + Info.Version + ".js", false);
		SGetter.send(null);
	
	eval(SGetter.response);
})();