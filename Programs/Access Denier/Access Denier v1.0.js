/*/
 *#######################################################################
 *Access Denier v1.0
 *Copyright (C) 2016-2020 Genbu Project All Rights Reversed.
 *#######################################################################
/*/
(function () {
	let Error = document.getElementsByTagName("ErrorCode");
	
	if (Error.length != 0) {
		for (let i = 0; i < Error.length; i++) {
			if (Error[i].attributes["Href"]) {
				var CodeListGetter = new XMLHttpRequest();
					CodeListGetter.open("GET", Error[i].attributes["Href"].value, false);
					
					CodeListGetter.onload = function (Event) {
						if (Error[i].attributes["Value"]) {
							location.href = JSON.parse(CodeListGetter.response)[Error[i].attributes["Value"].value];
						}
					}
					
					CodeListGetter.send(null);
			}
		}
	}
})();