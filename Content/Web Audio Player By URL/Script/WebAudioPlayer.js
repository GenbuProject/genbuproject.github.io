var Version = "v1.0";

function Play() {
	var Request = location.search.substr(1).split("&");
	var Querys = {};
	
	for (var i = 0; i < Request.length; i++) {
		Querys[Request[i].split("=")[0].toUpperCase()] = Request[i].split("=")[1];
	}
	
	var Player = new Audio(Querys.URL);
		Player.controls = "Controls";
		if (Querys.LOOP) Player.loop = Querys.LOOP.toLowerCase() == "true" ? true : Querys.LOOP.toLowerCase() == "false" ? false : false;
		
		Player.play();
		
	document.body.appendChild(Player);
}