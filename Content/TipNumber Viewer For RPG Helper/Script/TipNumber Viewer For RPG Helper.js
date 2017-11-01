function View(File) {
	var Reader = new FileReader();
		Reader.readAsArrayBuffer(File);
		
		Reader.onload = function () {
			var Link = URL.createObjectURL(
				new Blob(
					[Reader.result],
					{type: "image/png"}
				)
			);
			
			var Img = new Image();
				Img.src = Link;
				
				Img.onload = function () {
					console.log(Img);
					
					var Cvs = document.getElementById("Canvas");
						Cvs.width = Img.width;
						Cvs.height = Img.height;
						
					var Ctx = Cvs.getContext("2d");
						Ctx.clearRect(0, 0, Img.width, Img.height);
						Ctx.drawImage(Img, 0, 0);
						
					for (var y = 0; y < Img.height / 16; y++) {
						for (var x = 0; x < Img.width / 16; x++) {
							Ctx.font = '8px "Meiryo"';
							Ctx.fillStyle = "Red";
							
							Ctx.fillText(x + y * 8, x * 16, (y + 1) * 16, 16);
						}
					}
				}
		}
}
