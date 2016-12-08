var QuerySort = function () {
	var Querys = {};
	
	for (var i = 0; i < location.search.substr(1).split("&").length; i++) {
		Querys[location.search.substr(1).split("&")[i].split("=")[0].toUpperCase()] = location.search.substr(1).split("&")[i].split("=")[1];
	}
	
	return Querys;
}

function Init() {
	var Query = QuerySort();
	
	if (Query.URL) {
		location.href = Query.URL;
	}
}