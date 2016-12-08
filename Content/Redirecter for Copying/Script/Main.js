var QuerySort = function () {
	var Querys = {};
	
	for (var i = 0; i < location.search.substr(1).split("&").length; i++) {
		Querys[location.search.substr(1).split("&")[i].split("=")[0].toUpperCase()] = location.search.substr(1).split("&")[i].split("=")[1];
	}
	
	return Querys;
}

function Init() {
	var Query = QuerySort();
	
	if (Query.URL && Query.REDIRECT_URL) {
		var Getter = new XMLHttpRequest();
			Getter.open(Query.TYPE != undefined ? Query.TYPE.toUpperCase() : "GET", Query.URL, true);
			
			Getter.onload = function () {
				document.getElementById("Contents").value = Getter.responseText;
				
				document.getElementById("Contents").addEventListener("click", function () {
					document.getElementById("Contents").select();
					document.execCommand("copy");
				});
				
				document.getElementById("Contents").click();
				
				location.href = Query.REDIRECT_URL;
			}
			
			Getter.send(null);
	}
}