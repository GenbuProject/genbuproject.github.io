window.Args = [];

let Cvs = [],
	Ctx = [];
	
window.addEventListener("DOMContentLoaded", function () {
	for (let i = 0; i < DOM(":Canvas").length; i++) {
		Args[i] = [0, 0, 50, 50, "#000000", 1, 0, 0, 1, 0, 0];
		
		Cvs[i] = DOM("#Cvs" + (i + 1)),
		Ctx[i] = Cvs[i].getContext("2d");
		
		Cvs[i].width = DOM.width,
		Cvs[i].height = DOM.height;
		
		/*/
		 *[0] = 開始X
		 *[1] = 開始Y
		 *[2] = 幅
		 *[3] = 高さ
		 *[4] = 塗りつぶし色
		 *[5] = 伸縮X
		 *[6] = 傾斜Y(deg)
		 *[7] = 傾斜X(deg)
		 *[8] = 伸縮Y
		 *[9] = 開始X
		 *[10] = 開始Y
		/*/
		setInterval(function () {
			Ctx[i].setTransform(1, 0, 0, 1, 0, 0);
			Ctx[i].clearRect(0, 0, Cvs[i].clientWidth, Cvs[i].clientHeight);
			
			Ctx[i].fillStyle = Args[i][4];
			
			Ctx[i].setTransform(Args[i][5] ? Args[i][5] : 1, DOM.Util.DegToRad(Args[i][6]), DOM.Util.DegToRad(Args[i][7]), Args[i][8] ? Args[i][8] : 1, Args[i][9], Args[i][10]);
			Ctx[i].fillRect(Args[i][0], Args[i][1], Args[i][2], Args[i][3]);
		}, 1);
	}
	
	let Form = window.open("Form.html", "Form", [
		"Width=" + (DOM.width / 5 * 3),
		"Height=" + (DOM.height / 8 * 3),
		
		"Left=" + (DOM.width - (DOM.width / 6)),
		"Top=0"
	].join(", "));
	
	window.addEventListener("unload", function () {
		Form.close();
	});
});