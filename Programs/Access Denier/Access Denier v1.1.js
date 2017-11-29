/*/
 *#######################################################################
 *Access Denier v1.1
 *Copyright (C) 2016-2020 Genbu Project All Rights Reversed.
 *#######################################################################
/*/
(function () {
	location.querySort = function () {
		var Querys = {};
		
		for (var i = 0; i < location.search.substr(1).split("&").length; i++) {
			Querys[location.search.substr(1).split("&")[i].split("=")[0].toUpperCase()] = location.search.substr(1).split("&")[i].split("=")[1];
		}
		
		return Querys;
	}
})();

(function () {
	let Error = document.getElementsByTagName("ErrorCode");
	
	if (Error.length != 0) {
		for (let i = 0; i < Error.length; i++) {
			if (Error[i].attributes["Href"]) {
				var CodeListGetter = new XMLHttpRequest();
					CodeListGetter.open("GET", Error[i].attributes["Href"].value, false);
					
					CodeListGetter.onload = function (Event) {
						if (Error[i].attributes["Value"]) {
							if (Error[i].attributes["ID"] && Error[i].attributes["Password"]) {
								let Querys = location.querySort();
								
								if (Querys.ID != Error[i].attributes["ID"].value || Querys.PASSWORD != Error[i].attributes["Password"].value) {
									location.href = JSON.parse(CodeListGetter.response)[Error[i].attributes["Value"].value];
								}
							} else {
								location.href = JSON.parse(CodeListGetter.response)[Error[i].attributes["Value"].value];
							}
						}
					}
					
					CodeListGetter.send(null);
			}
		}
	}
})();