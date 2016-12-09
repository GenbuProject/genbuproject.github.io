(function () {
	let Error = document.getElementsByTagName("ErrorCode");
	
	if (Error.length != 0 && Error.attributes["Href"]) {
		var CodeListGetter = new XMLHttpRequest();
			CodeListGetter.open("GET", Error.attributes["Href"].value, false);
			
			CodeListGetter.onload = function (Event) {
				if (Error.attributes["Value"]) {
					location.href = JSON.parse(CodeListGetter.response)[parseInt(Error.attributes["Value"].value)];
				}
			}
			
			CodeListGetter.send(null);
	}
})();