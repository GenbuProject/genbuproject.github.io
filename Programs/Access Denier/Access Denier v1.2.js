/*/
 *#######################################################################
 *Access Denier v1.2
 *Copyright (C) 2016 Genbu Project All Rights Reversed.
 *#######################################################################
/*/
(function () {
	let sha = document.createElement("Script");
		sha.src = "https://caligatio.github.io/jsSHA/sha.js";
		
		sha.onload = function () {
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
									let Querys = location.querySort();
									
									!Querys.ID ? Querys.ID = "" : null,
									!Querys.PASSWORD ? Querys.PASSWORD = "" : null;

									if (Error[i].attributes["Value"]) {
										if (Error[i].attributes["ID"] && Error[i].attributes["Password"]) {
											if (Error[i].attributes["Type"]) {
												Error[i].attributes["Type"].value == "Hash" ? (function () {
													let Protector = [];
														Protector[0] = new jsSHA("SHA-512", "TEXT"),
														Protector[1] = new jsSHA("SHA-512", "TEXT");
														
														Protector[0].update(Querys.ID),
														Protector[1].update(Querys.PASSWORD);
														
													if (Protector[0].getHash("HEX") != Error[i].attributes["ID"].value || Protector[1].getHash("HEX") != Error[i].attributes["Password"].value) {
														location.href = JSON.parse(CodeListGetter.response)[Error[i].attributes["Value"].value];
													}
												})() : Error[i].attributes["Type"].value == "HMAC" ? (function () {
													let Protector = [];
														Protector[0] = new jsSHA("SHA-512", "TEXT"),
														Protector[1] = new jsSHA("SHA-512", "TEXT");
														
														Protector[0].setHMACKey(Error[i].attributes["Key"] ? Error[i].attributes["Key"].value : "", "TEXT"),
														Protector[1].setHMACKey(Error[i].attributes["Key"] ? Error[i].attributes["Key"].value : "", "TEXT");
														
														Protector[0].update(Querys.ID),
														Protector[1].update(Querys.PASSWORD);
														
													if (Protector[0].getHMAC("HEX") != Error[i].attributes["ID"].value || Protector[1].getHMAC("HEX") != Error[i].attributes["Password"].value) {
														location.href = JSON.parse(CodeListGetter.response)[Error[i].attributes["Value"].value];
													}
												})() : (function () {
													if (Querys.ID != Error[i].attributes["ID"].value || Querys.PASSWORD != Error[i].attributes["Password"].value) {
														location.href = JSON.parse(CodeListGetter.response)[Error[i].attributes["Value"].value];
													}
												})();
											} else {
												if (Querys.ID != Error[i].attributes["ID"].value || Querys.PASSWORD != Error[i].attributes["Password"].value) {
													location.href = JSON.parse(CodeListGetter.response)[Error[i].attributes["Value"].value];
												}
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
		}
		
	document.head.appendChild(sha);
})();